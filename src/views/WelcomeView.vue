<template>
  <div class="welcome">
    <Header msg="Welcome to Your Vue.js App" />
    <!-- <Chat msg="Welcome to Your Vue.js App" /> -->
    <Welcome msg="Welcome to Your Vue.js App" />
  </div>

</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Welcome from "@/components/Welcome.vue";
import Chat from "@/components/Chat.vue";

export default {
  name: "welcome",
  components: {
    Header,
    Welcome
    // Chat
  }
};
</script>
