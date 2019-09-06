<template>
  <div class="login">
    <nav class="navbar navbar-light bg-warning">
      <div class="mx-auto" style="width: 200px;">
        <router-link to="/"><img alt="Vue logo" class="logo" src="../assets/swarm_logo.png" width="50%"/></router-link>
      </div>
    </nav>

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
                <button @click="mailSignIn" class="btn btn-warning">ログイン</button>
                <p class="card-text"><small class="text-muted">新規登録は<router-link to="/signup">こちら</router-link></small></p>
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
// @ is an alias to /src
import Footer from "@/components/Footer.vue";
import firebase from "firebase";

export default {
  name: "login",
  components: {
    Footer
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    mailSignIn: function () {
      console.log('[signIn] try mail sigin.');
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          // alert('mailSignIn Success! redirect to top page.');
          console.log('[signIn] mailSignIn Success! redirect to top page.');
          this.$router.push('/activity');
        },
        err => {
          alert(err.message);
          console.log('[signIn] mailSignIn error!');
        }
      )
    }

  }
};
</script>


