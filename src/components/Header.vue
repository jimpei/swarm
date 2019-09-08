<template>
  <div class="common-header">
    <nav class="navbar navbar-light bg-warning">
      <div class="mx-auto" style="width: 200px;">
        <router-link to="/"><img alt="Vue logo" class="logo" src="../assets/swarm_logo.png" width="50%"/></router-link>
      </div>
      <div v-if="user.email">
        <div v-if="user.photoURL"><img class="mr-3" :src="user.photoURL" width="40px"></div>
        <div v-else><img class="mr-3" src="../assets/fantasy_game_character_slime.png" width="40px"></div>
      </div>

    </nav>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "common-header",
  props: {
    msg: String
  },
  data () {
    return {
      show : true
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
};
</script>
