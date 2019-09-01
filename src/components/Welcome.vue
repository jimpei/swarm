<template>
  <div class="welcome">
    <nav class="navbar navbar-light bg-warning">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <button class="btn btn-outline-light my-2 my-sm-0" type="submit"><router-link to="/login">Login</router-link></button>
      </form>
    </nav>
    <div class="p-3 mb-2 bg-warning text-white">

      <div class="v-margin25"></div>

      <div class="container">

        <div cslass="v-margin60"></div>
        <img alt="Vue logo" class="logo" src="../assets/swarm_logo.png" width="80%"/>
        <div class="v-margin25"></div>
        <div class="row">
          <div class="w-100">
            <div class="col"><button type="button" class="btn btn-dark">Primary</button></div>
          </div>
        </div>
        <div class="v-margin25"></div>
        <h2>{{ msg }}</h2>
        <div class="v-margin25"></div>
        <img alt="Vue logo" class="logo" src="../assets/swarm_phone.png" width="80%"/>
        <h3>Ecosystem</h3>
        <ul>
          <li>
            <a href="https://router.vuejs.org" target="_blank" rel="noopener"
              >vue-router</a
            >
          </li>
          <li>
            <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/vue-devtools#vue-devtools"
              target="_blank"
              rel="noopener"
              >vue-devtools</a
            >
          </li>
          <li>
            <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
              >vue-loader</a
            >
          </li>
          <li>
            <a
              href="https://github.com/vuejs/awesome-vue"
              target="_blank"
              rel="noopener"
              >awesome-vue</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ffffff;
}
.v-margin60 {
  margin: 60px 0;
}
.v-margin25 {
  margin: 25px 0;
}
.logo {
  max-width :350px;
}


</style>
