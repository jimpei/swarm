<template>
  <div class="login">
    <nav class="navbar navbar-light bg-warning">
      <div class="mx-auto" style="width: 200px;">
        <router-link to="/"><img alt="Vue logo" class="logo" src="../assets/swarm_logo.png" width="50%"/></router-link>
      </div>
    </nav>

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-right">
            <div class="card-body">
              <h4 class="card-title text-left text-warning">Swarmにログイン</h4>
              <!-- <p class="card-text">With supposrting text below as a natural lead-in to additional content.</p> -->
              <form>
                <div class="form-group">
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-warning">ログイン</button>
              </form>
            </div>
          </div>
        </div>

      </div>

      <div class="v-margin25"></div>
    </div>

    <Footer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";

export default {
  name: "login",
  components: {
    Footer
  }
};
</script>


