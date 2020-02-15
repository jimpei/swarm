<template>
  <div class="chat">

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">
        <div class="row">

          <div class="col-md-4">
            <ul class="menu">
                <li class="active"><a href="#"># PC質問部屋</a></li>
                <li><a href="#"># 婚活部屋</a></li>
                <li><a href="#"># お得情報</a></li>
                <li><a href="#"># ジェットフォイル・フェリー運行情報</a></li>
            </ul>
          </div>

          <div class="col-md-8">
            <div class="mx-auto max-width-layout">

              <!-- メッセージデータ -->
              <div v-for="(comment, key, index) in comments" :key="index">
                <div class="card">
                  <div class="card-header">
                    <img class="mr-3" src="https://picsum.photos/200" width="40px">
                    {{ comment.data().username }} {{ comment.data().createdAt.seconds | toDate }}
                  </div>
                  <div class="card-body center">
                    <!-- <h5 class="card-title">{{ comment.data().field1 }}</h5> -->
                    <p class="card-text">{{ comment.data().text }}</p>
                    <button @click="dbDelete(comment.id)" class="btn btn-danger">x</button>
                  </div>
                </div>
                <div class="v-margin25"></div>
              </div>
              <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->

              <!-- 投稿フォーム -->

              <!-- ここまでがフォーム -->

              <!-- <div class="v-margin25"></div> -->
                <footer>
                    <div class="field is-grouped">
                        <!-- <input id="exampleFormControlTextarea1" v-model="text" class="input is-medium" type="text" placeholder="Message"/> -->
                        <div id="exampleFormControlTextarea1" class="long-text is-expanded">
                            <input v-model="text" class="input is-medium" type="text" placeholder="Message" />
                        </div>
                        <button @click="dbAdd" class="btn btn-warning control control-submit">
                          <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        投稿する
                        </button>
                    </div>
                </footer>

            </div>
          </div>
        </div>

      </div>

      <div class="v-margin25"></div>
    </div>
    

  </div>
</template>

<style scoped>
.long-text {
   width: 550px;
}

header{
    position:fixed;
    width:100%;
    background:#00d1b2;
    z-index:2;
    height:55px;
}

#app header h1{
    padding-left:10px;
    padding-top:8px;
    color:#ffffff;
}

.chaturl{
    padding-left:10px;
}

.chaturl a{
    color:#ffffff;
    font-size:14px;
}

.chaturl a:hover{
    text-decoration: underline;
}

footer{
    position:fixed;
    bottom:0px;
    width:100%;
    height:66px;
    border-top:1px solid #aaaaaa;
    background:#ffffff;
}

footer .field{
    padding:10px;
}

.button-submit{
    height:45px;
    line-height:1.0;
    width:100%;
}

.control-submit{
    width:20%;
}

#message-contents{
    z-index:1;
    padding: 55px 10px 76px 10px;
    background:#ffffff;
}

.message-wrapper{
    margin:20px 10px;
}

.message-wrapper .box{
    float:left;
}
.message-wrapper .box.mymessage{
    float:right;
}

.mymessage p{
    text-align: right;
}

.menu li {
  display: list-item;  /* 縦に並べる */
  list-style-type: none;
  text-transform: uppercase;
  padding: 0.5em;
  text-align: left;
  /* background: #; */
}
.footer {
    position:fixed;
    bottom:0px;
    width:100%;
    height:66px;
    border-top:1px solid #aaaaaa;
    background:#ffffff;
}
</style>

<script>
// @ is an alias to /src
// import firebase from "firebase";
import store from "../store";
import {db} from "../firebase";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "chat",
  components: {
    InfiniteLoading
  },
  data () {
    return {
      username: '',
      field1: 'A',
      text: '',
      createdAt: null,
      comments: [],
      show: false,
      cnt: 5
    }
  },
  filters: {
    toDate (value) {
      let date = new Date(value * 1000);
      let month = date.getMonth() + 1;
      return date.getFullYear() + '/' + month + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
    }
  },
  mounted() {
    db.collection("chat").doc("room1").collection('messages').orderBy("createdAt", 'desc')
    .onSnapshot(res => {
      console.log('mounted start');
      // console.log('cnt = ' + this.cnt);
      let array = [];
      res.docs.forEach(doc => {
        // console.log(doc.id, "=>", doc.data());
        let tmpArray = doc;
        array.push(tmpArray);
      });
      console.dir(array);
      this.comments = array;
    });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    doLogout () {
      common.logout();
    },
    // dbRefer () {
    //   this.show = true;
    //   let dbRef = db.collection('chat').doc('room1').collection('messages').orderBy("createdAt", 'desc').limit(5);
    //   let allData = dbRef.get()
    //     .then(snapshot => {
    //       let array = [];
    //       snapshot.forEach(doc => {
    //         // console.log(doc.id, "=>", doc.data());
    //         let tmpArray = doc;
    //         array.push(tmpArray);
    //       });
    //       console.dir(array);
    //       this.comments = array;
    //       this.show = false;
    //       // return array;
    //     })
    //     .catch(err => {
    //       console.log("Error getting documents", err);
    //       this.show = false;
    //     });
    // },
    dbAdd () {
      this.show = true;
      db.collection('chat').doc('room1').collection('messages').add({
        username: this.user.email,
        // field1: this.field1,
        field1: 'A',
        text: this.text,
        createdAt: new Date()
      }).then(result => {
        console.log('db insert success');

        // 入力フォームを初期化
        this.field1 = 'A';
        this.text = '';
        this.show = false;
      }).catch(error => {
        console.log('db insert error')
        this.show = false;
      });
    },
    dbDelete (id) {
      this.show = true;
      db.collection('chat').doc('room1').collection('messages').doc(id).delete()
      .then(result => {
        console.log('db delete success');
        this.show = false;
      }).catch(error => {
        console.log('db delete error')
        this.show = false;
      });
    },
    infiniteHandler($state) {
      // console.log('debug cnt' + this.cnt);

      this.show = true;
      let dbRef = db.collection('chat').doc('room1').collection('messages').orderBy("createdAt", 'desc').limit(this.cnt);
      let allData = dbRef.get()
        .then(snapshot => {
          let array = [];
          snapshot.forEach(doc => {
            // console.log(doc.id, "=>", doc.data());
            // let tmpArray = JSON.parse(JSON.stringify(doc.data()));
            let tmpArray = doc;
            array.push(tmpArray);
          });
          console.dir(array);
          this.comments = array;
          this.show = false;
          // return array;
        })
        .catch(err => {
          console.log("Error getting documents", err);
          this.show = false;
        });

      this.cnt = this.cnt + 3;
      var cntMax = this.cnt;

      setTimeout( () => {
        // console.log(cntMax)
        if (cntMax > 15) {
          console.log('infinite-loading complete')
          $state.complete();
        } else {
          console.log('infinite-loading loaded')
          $state.loaded();
        }
      }, 2000 );

    },
    debug () {
      console.log('debug start');
      console.log(this.user.email);
      console.log(new Date(1568103213*1000));
      console.log('debug end');
    }
  }
};
</script>


