<template>
  <div class="login">
    <Header msg="Welcome to Your Vue.js App" />
    <Geo msg="Welcome to Your Vue.js App" />
    <Footer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Geo from "@/components/Geo.vue";

export default {
  name: "login",
  components: {
    Footer,
    Header,
    Geo
  }
};
</script>


