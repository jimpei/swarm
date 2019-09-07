<template>
  <div class="login">
    <Header msg="Welcome to Your Vue.js App" />

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-left">
            <div class="card-header bg-warning">welcome {{ username }}</div>
            <div class="card-body">
              <h4 class="card-title text-left text-warning">hogeeeeeee</h4>
              <!-- <p class="card-text">With supposrting text below as a natural lead-in to additional content.</p> -->

              <button @click="logout" class="btn btn-warning">ログアウト</button>
            </div>
          </div>
        </div>

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
import firebase from "firebase";

export default {
  name: "login",
  components: {
    Footer,
    Header
  },
  data () {
    return {
      username: firebase.auth().currentUser.email
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    }
  }
};
</script>


