<template>
  <div class="login">
    <Header msg="Welcome to Your Vue.js App" />

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-right">
            <div class="card-body">
              <h4 class="card-title text-left text-warning">Swarmにログイン</h4>
                <div class="form-group">
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="username">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <button @click="mailSignIn" class="btn btn-warning">
                  <div class="text-center">
                    <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ログイン
                  </div>
                </button>

                <p class="card-text"><small class="text-muted">新規登録は<router-link to="/signup">こちら</router-link></small></p>
            </div>
          </div>
or
          <div class="card text-right">
            <div class="card-body">
              <div class="text-center">
                <div v-if="show" class="spinner-border spinner-border-sm text-warning" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <img @click="googleSignIn" class="max250" src="../assets/btn_google_signin_light_normal_web@2x.png" width="200"/>
            </div>
          </div>

        </div>
        <div class="v-margin25"></div>
        <router-link to="/activity"><button type="submit" class="btn btn-info">[debug] goto activity</button></router-link>

      </div>

      <div class="v-margin25"></div>
    </div>

    <Footer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import firebase from "@firebase/app";
import "@firebase/auth";
import store from "../store";
// import common from "../common";


export default {
  name: "login",
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
    mailSignIn () {
      this.show = true;
      console.log('[signIn] try mail sigin.');
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          // alert('mailSignIn Success! redirect to top page.');
          this.show = false;
          console.log('[signIn] mailSignIn Success! redirect to top page.');
          this.$router.push('/activity');
        },
        err => {
          alert(err.message);
          this.show = false;
          console.log('[signIn] mailSignIn error!');
        }
      )
    },
    googleSignIn () {
      this.show = true;
      console.log('[signIn] try google sigin.');
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        console.log('debug google signin success')
        this.show = false;
        this.$router.push('/activity');
        return;
      }).catch(error => {
        console.log('debug google signin error')
        this.show = false;
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

  }
};

</script>


