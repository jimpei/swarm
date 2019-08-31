<template>
  <div class="hello">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm"></div>
          <div class="col-sm"></div>
          <div class="col-sm"></div>
          <div class="col-sm"><button type="button" class="btn btn-outline-light">Login</button></div>
        </div>
        <div class="container">

        <div cslass="v-margin62"></div>
        <img alt="Vue logo" src="../assets/swarm_logo.png" height="112"/>
        <div class="v-margin25"></div>
        <div class="row">
          <!-- <div class="col"><button type="button" class="btn btn-dark">Primary</button></div> -->
          <!-- <div class="col"><button type="button" class="btn btn-dark">Primary</button></div> -->
          <div class="w-100">
            <div class="col"><button type="button" class="btn btn-dark">Primary</button></div>
          </div>
        </div>
        <div class="v-margin25"></div>
        <h2>{{ msg }}</h2>
        <div class="v-margin25"></div>
        <img alt="Vue logo" src="../assets/swarm_phone.png" height="735"/>

        <ul>
          <li>
            <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
          </li>
          <li>
            <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
              >Forum</a
            >
          </li>
          <li>
            <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
              >Community Chat</a
            >
          </li>
          <li>
            <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
              >Twitter</a
            >
          </li>
          <li>
            <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
          </li>
        </ul>
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
</template>

<script>
export default {
  name: "HelloWorld",
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
  color: #42b983;
}
.v-margin62 {
   margin: 62px 0;
}
.v-margin25 {
   margin: 25px 0;
}
</style>
