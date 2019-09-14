<template>
  <div class="login">
    <Header msg="Welcome to Your Vue.js App" />
    <Profile msg="Welcome to Your Vue.js App" />
    <Footer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Profile from "@/components/Profile.vue";

export default {
  name: "login",
  components: {
    Footer,
    Header,
    Profile
  }
};
</script>


