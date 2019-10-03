<template>
  <div class="login">
    <HeaderQiita msg="Welcome to Your Vue.js App" />
    <Qiita msg="Welcome to Your Vue.js App" />
    <Footer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import HeaderQiita from "@/components/HeaderQiita.vue";
import Qiita from "@/components/Qiita.vue";

export default {
  name: "login",
  components: {
    Footer,
    HeaderQiita,
    Qiita
  }
};
</script>


