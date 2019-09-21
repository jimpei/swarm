<template>
  <div id="app">
    <!-- <div class="p-3 mb-2 bg-primary text-white"> -->
      <!-- <div id="nav"> -->
        <!-- <router-link to="/">Home</router-link> | -->
        <!-- <router-link to="/login">Login</router-link> -->
      <!-- </div> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
@import "https://unpkg.com/aos@next/dist/aos.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

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
/* a {
  color: #ffffff;
} */
.v-margin60 {
  margin: 60px 0;
}
.v-margin25 {
  margin: 25px 0;
}
.logo {
  max-width :350px;
}
.max250 {
  max-width :250px;
}
.max-width-layout {
  max-width :600px;
}
.max-width-layout1400 {
  max-width :1400px;
}


</style>
