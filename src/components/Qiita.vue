<template>
  <div class="qiita">

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-left">
            <div class="card-header bg-warning">Qiita </div>
            <div class="card-body">
              <h4 class="card-title text-left text-warning">hogeeeeeee</h4>
              <div class="v-margin25"></div>
              <button @click="dbRefer" class="btn btn-warning">
                <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                  <span class="sr-only">dbRefer...</span>
                </div>
                dbRefer
              </button>
              <div class="v-margin25"></div>
              <button @click="dbAdd" class="btn btn-warning">
                <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                  <span class="sr-only">dbAdd...</span>
                </div>
                dbAdd
              </button>

            </div>
          </div>
          <div class="v-margin25"></div>
        </div>

        <div class="mx-auto max-width-layout1000">
          <div class="card-columns">

            <div class="card p-3">
              <blockquote class="blockquote mb-0 card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">
                  <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </div>

            <div v-for="(qiitaItem, key, index) in qiitaItems" :key="index">
              <div class="card">
                <div class="card-header">
                  <!-- <img class="mr-3" src="https://picsum.photos/200" width="40px"> -->
                  {{ qiitaItem.data().username }} {{ qiitaItem.data().create_date.seconds | toDate }}
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ qiitaItem.data().qiita_url }}</h5>
                  <p class="card-text">{{ qiitaItem.data().qiita_user }}</p>
                  <!-- <button @click="dbDelete(comment.id)" class="btn btn-danger">delete {{ comment.id }}</button> -->
                </div>
              </div>
            </div>

            <div class="card p-3">
              <blockquote class="blockquote mb-0 card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">
                  <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

      </div>
      <div class="v-margin25"></div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import firebase from "firebase";
// import store from "../store";
import {db} from "../firebase";

export default {
  name: "qiita",
  components: {
  },
  data () {
    return {
      qiitaItems: [],
      // field1: 'A',
      // text: '',
      // createdAt: null,
      // comments: [],
      show: false,
      // cnt: 3
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
    // db.collection("chat").doc("room1").collection('messages').orderBy("createdAt", 'desc').limit(5)
    // .onSnapshot(res => {
    //   console.log('mounted start');
    //   // console.log('cnt = ' + this.cnt);
    //   let array = [];
    //   res.docs.forEach(doc => {
    //     // console.log(doc.id, "=>", doc.data());
    //     let tmpArray = doc;
    //     array.push(tmpArray);
    //   });
    //   console.dir(array);
    //   this.comments = array;
    // });
  },
  computed: {
    // user() {
    //   return this.$store.getters.user;
    // }
  },
  methods: {
    debug () {
      console.log('debug start');
    },
    dbRefer () {
      this.show = true;
      let dbRef = db.collection('qiita_items').orderBy("create_date", 'desc');
      let allData = dbRef.get()
        .then(snapshot => {
          let array = [];
          snapshot.forEach(doc => {
            // console.log(doc.id, "=>", doc.data());
            let tmpArray = doc;
            array.push(tmpArray);
          });
          console.dir(array);
          this.qiitaItems = array;
          this.show = false;
          // return array;
        })
        .catch(err => {
          console.log("Error getting documents", err);
          this.show = false;
        });
    },
    dbAdd () {
      this.show = true;
      db.collection('qiita_items').doc('7effbab8fa65f398b731').set({
        qiita_id: '7effbab8fa65f398b731',
        qiita_title: 'JIRA APIを使用してチケットを作成する',
        qiita_url: 'https://qiita.com/jimpei/items/7effbab8fa65f398b731',
        qiita_user: '@jimpei',
        service_title: 'hoge4',
        tags : [
          "jira",
          "javascript"
        ],
        create_date: new Date()
      }).then(result => {
        console.log('db insert success');
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

    }
  }
};
</script>
