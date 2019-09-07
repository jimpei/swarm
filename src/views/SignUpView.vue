<template>
  <div class="signup">
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
              <h4 class="card-title text-left text-warning">Swarmに新規登録</h4>
              <!-- <p class="card-text">With supposrting text below as a natural lead-in to additional content.</p> -->
              <div class="form-group">
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="username">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
              </div>

              <button @click="signUp" class="btn btn-warning">新規登録</button>
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
import firebase from "firebase";

export default {
  name: "signup",
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
    signUp () {
      console.log('debug push signup button');
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          alert('Create account: ', user.email)
          this.$router.push('/login');
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
};
</script>


