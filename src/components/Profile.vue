<template>
  <div class="profile">

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>
      <div class="container">

        <div class="mx-auto max-width-layout">
          <div class="card text-left">
            <div class="card-header bg-warning font-weight-bold"><h4>ユーザ情報</h4></div>

            <div class="card-body">
              <h4 class="card-title text-left text-warning">ユーザ情報</h4>
              <!-- <p class="card-text">With supposrting text below as a natural lead-in to additional content.</p> -->

              <div class="media">
                <div v-if="user.photoURL"><img class="mr-3" :src="user.photoURL" width="60px"></div>
                <div v-else><img class="mr-3" src="../assets/fantasy_game_character_slime.png" width="60px"></div>
                <div class="media-body">
                  <form>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">ユーザ名</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" :value=user.displayName @change="displayName = $event.target.value">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
                      <div class="col-sm-8">
                        <input type="text" readonly class="form-control" id="staticEmail" :value=user.email>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="v-margin25"></div>
              <div class="text-right">
                <button @click="update" class="btn btn-warning ">
                  <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  更新
                </button>
              </div>
              <div class="v-margin25"></div>
              <div v-if="warning" class="alert alert-warning" role="alert">
                変更されていないので更新されなかったよ.
              </div>
            </div>
          </div>

        </div>

        <div class="v-margin25"></div>
      </div>

      <div class="v-margin25"></div>
    </div>

  </div>
</template>

<script>
import firebase from "@firebase/app";
import "@firebase/auth";

export default {
  
  name: "profile",
  components: {
  },
  data () {
    return {
      displayName : '',
      show: false,
      warning: false
    }
  },
  filters: {
  },
  mounted() {
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    update () {
      console.log('update start');
      this.show = true;
      this.warning = false;
      if (this.displayName) {
        console.log('update displayName => ' + this.displayName);
        let user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.displayName,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then( () => {
          console.log('update success.');
          this.displayName = '';
          this.show = false;
        }).catch((error) => {
          console.log('update error.');
          this.show = false;
        });

      } else {
        console.log('no update.');
        this.warning = true;
        this.show = false;
      }
    }
  }
};
</script>


