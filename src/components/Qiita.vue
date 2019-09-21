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
                <button @click="debug" class="btn btn-warning">
                  <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  debug
                </button>
              <div class="v-margin25"></div>
            </div>
          </div>
          <div class="v-margin25"></div>
        </div>

        <div class="mx-auto max-width-layout1000">
          <div class="card-columns">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title that wraps to a new line</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
            <div class="card bg-primary text-white text-center p-3">
              <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                <footer class="blockquote-footer text-white">
                  <small>
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </div>
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has a regular title and short paragraphy of text below it.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
            <div class="card">
            </div>
            <div class="card p-3 text-right">
              <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">
                  <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </blockquote>
            </div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
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
      // username: '',
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
    db.collection("chat").doc("room1").collection('messages').orderBy("createdAt", 'desc').limit(5)
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
    // user() {
    //   return this.$store.getters.user;
    // }
  },
  methods: {
    debug () {
      console.log('debug start');
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
        field1: this.field1,
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

    }
  }
};
</script>


