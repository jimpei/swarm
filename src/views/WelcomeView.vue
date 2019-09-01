<template>
  <div class="welcome">
    <Welcome msg="Welcome to Your Vue.js App" />
    <Footer msg="Welcome to Your Vue.js App" />
  </div>

</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "welcome",
  components: {
    Welcome,
    Footer
  }
};
</script>
