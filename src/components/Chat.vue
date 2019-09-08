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
              <!-- <p class="card-text">With supposrting text below as a natural lead-in to additional content.</p> -->

              <div class="media">
                <div v-if="user.photoURL"><img class="mr-3" :src="user.photoURL" width="40px"></div>
                <div v-else><img class="mr-3" src="../assets/fantasy_game_character_slime.png" width="40px"></div>
                <div class="media-body">
                  <h5 class="mt-0">{{ user.email }}</h5>
                  user display name => {{ user.displayName }}
                </div>
              </div>

              <div class="v-margin25"></div>
              <button @click="doLogout" class="btn btn-warning">ログアウト</button>
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
import store from "../store";
import Firebase from "../firebase";

export default {
  name: "chat",
  components: {
  },
  data () {
    return {
      // username: firebase.auth().currentUser.email
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    doLogout () {
      Firebase.logout();
    }
  }
};
</script>


