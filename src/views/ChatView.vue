<template>
  <div class="login">
    <Header msg="Welcome to Your Vue.js App" />
    <Chat msg="Welcome to Your Vue.js App" />
    <!-- <Footer msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Chat from "@/components/Chat.vue";

export default {
  name: "login",
  components: {
    Footer,
    Header,
    Chat
  }
};
</script>


