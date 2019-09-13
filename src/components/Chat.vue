<template>
  <div class="chat">

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-left">
            <div class="card-header bg-warning">chat {{ user.uid }} </div>

            <div class="card-body">
              <h4 class="card-title text-left text-warning">hogeeeeeee</h4>

              <div class="media">
                <div v-if="user.photoURL"><img class="mr-3" :src="user.photoURL" width="40px"></div>
                <!-- <div v-else><img class="mr-3" src="../assets/fantasy_game_character_slime.png" width="40px"></div> -->
                <div v-else><img class="mr-3" src="https://picsum.photos/200" width="40px"></div>
                <div class="media-body">
                  <h5 class="mt-0">{{ user.email }}</h5>
                  user display name => {{ user.displayName }}
                </div>
              </div>
              <div class="v-margin25"></div>
              <form>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Example select</label>
                  <select class="form-control" id="exampleFormControlSelect1" v-model="field1">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Example textarea</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="text"></textarea>
                </div>
                <div class="v-margin25"></div>
                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
              </form>
                <button @click="dbAdd" class="btn btn-warning">
                  <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  db add
                </button>

              <div class="v-margin25"></div>
              <button @click="dbRefer" class="btn btn-warning">
                <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                db refer
              </button>
              <div class="v-margin25"></div>
              <!-- <button @click="debug" class="btn btn-info">debug</button> -->
              <!-- <div class="v-margin25"></div> -->
            </div>
          </div>
          <div class="v-margin25"></div>

          <div v-for="(comment, key, index) in comments" :key="index">
            <div class="card">
              <div class="card-header">
                <img class="mr-3" src="https://picsum.photos/200" width="40px">
                {{ comment.username }} {{ comment.createdAt.seconds | toDate }}
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ comment.field1 }}</h5>
                <p class="card-text">{{ comment.text }}</p>
                <a href="#" class="btn btn-info">Go somewhere</a>
              </div>
            </div>
            <div class="v-margin25"></div>
          </div>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>

        </div>

      </div>

      <div class="v-margin25"></div>
    </div>

  </div>
</template>

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
    db.collection("chat").doc("room1").collection('messages').orderBy("createdAt", 'desc').limit(5)
    .onSnapshot(res => {
      console.log('mounted start');
      // console.log('cnt = ' + this.cnt);
      let array = [];
      res.docs.forEach(doc => {
        // console.log(doc.id, "=>", doc.data());
        let tmpArray = JSON.parse(JSON.stringify(doc.data()));
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
    dbRefer () {
      this.show = true;
      let dbRef = db.collection('chat').doc('room1').collection('messages').orderBy("createdAt", 'desc').limit(5);
      let allData = dbRef.get()
        .then(snapshot => {
          let array = [];
          snapshot.forEach(doc => {
            // console.log(doc.id, "=>", doc.data());
            let tmpArray = JSON.parse(JSON.stringify(doc.data()));
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
    },
    dbAdd () {
      this.show = true;
      db.collection('chat').doc('room1').collection('messages').add({
        username: this.user.email,
        field1: this.field1,
        text: this.text,
        createdAt: new Date()
      }).then(result => {
        console.log('db insert success');
        // console.log(result);
        this.show = false;
      }).catch(error => {
        console.log('db insert error')
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
            let tmpArray = JSON.parse(JSON.stringify(doc.data()));
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


