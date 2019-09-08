<template>
  <div class="common-header">
    <nav class="navbar navbar-light bg-warning">
      <div class="mx-auto" style="width: 200px;">
        <router-link to="/"><img alt="Vue logo" class="logo" src="../assets/swarm_logo.png" width="50%"/></router-link>
      </div>
      <button class="btn btn-outline-success my-2 my-sm-0">Search</button>

    </nav>
  </div>
</template>

<script>
export default {
  name: "common-header",
  props: {
    msg: String
  }
};
</script>
