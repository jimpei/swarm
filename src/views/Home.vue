<template>
  <div class="home">
    <div class="p-3 mb-2 bg-warning text-white">
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
    <div class="card-body p-3 mb-2 bg-light text-darks">
      <blockquote class="blockquote mb-0">
        <p>Footer aaa.</p>
        <footer class="blockquote-footer">2019 Jimpei <cite title="Source Title">Source Title</cite></footer>
      </blockquote>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
