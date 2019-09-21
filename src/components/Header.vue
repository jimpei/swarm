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
      <div v-if="user.email">
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" to="/activity">Activity</router-link>
            <router-link class="dropdown-item" to="/profile">Profile</router-link>
            <router-link class="dropdown-item" to="/chat">Chat</router-link>
            <router-link class="dropdown-item" to="/geo">Geo</router-link>
            <router-link class="dropdown-item" to="/qiita">Qiita</router-link>
            <router-link class="dropdown-item" to="/scroll">MUGEN Scroll Test</router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="doLogout">ログアウト</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import store from "../store";
import common from "../common";

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
  methods: {
    doLogout () {
      common.logout();
    }
  }
};
</script>
