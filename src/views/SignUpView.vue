<template>
  <div class="signup">
    <Header msg="Welcome to Your Vue.js App" />

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-right">
            <div class="card-body">
              <h4 class="card-title text-left text-warning">Swarmに新規登録</h4>
              <!-- <p class="card-text">With supposrting text below as a natural lead-in to additional content.</p> -->
              <div class="form-group">
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="username">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
              </div>

              <button @click="signUp" class="btn btn-warning">
                <div class="text-center">
                  <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  新規登録
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="v-margin25"></div>
        <router-link to="/activity"><button type="submit" class="btn btn-warning">[debug] goto activity</button></router-link>
      </div>

      <div class="v-margin25"></div>
    </div>

    <Footer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import firebase from "@firebase/app";
import "@firebase/auth";
import axios from 'axios';

export default {
  name: "signup",
  components: {
    Footer,
    Header
  },
  data () {
    return {
      username: '',
      password: '',
      show: false
    }
  },
  methods: {
     async signUp () {
      this.show = true;
      console.log('debug push signup button');
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(async user => {
          alert('Create account: ', user.email);
          // 初期アイコンの取得＆設定
          let url = await this.getRandomImageUrl();
          await this.updatePhotoURL(url)
          this.show = false;
          this.$router.push('/activity');
        })
        .catch(error => {
          alert(error.message)
          this.show = false;
        })
    },
    getRandomImageUrl () {
      return new Promise((resolve, reject) => {
        fetch('https://picsum.photos/200')
          .then(data => {
            console.log('image get success => ' + data.url);
            resolve(data.url);
          })
          .catch(error => {
            console.log('error');
            reject(error);
        });
      });
    },
    updatePhotoURL (imageUrl) {
      return new Promise((resolve, reject) => {
        console.log('updatePhotoURL start');
        console.log('update PhotoURL => ' + imageUrl);

        let user = firebase.auth().currentUser;

        user.updateProfile({
          photoURL: imageUrl
        }).then(() => {
          console.log('updatePhotoURL success.');
          resolve();
        }).catch((error) => {
          console.log('updatePhotoURL error.');
        });
      });
    }
  }
};
</script>


