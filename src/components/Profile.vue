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
                <button @click="updateDisplayName" class="btn btn-warning ">
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

                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" @change="onFileChange">
                    <label class="custom-file-label" for="inputGroupFile04">{{ imageName }}</label>
                  </div>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="uploadImage">upload</button>
                  </div>
                </div>
                <img v-show="imageFilePreview" class="preview-item-file" :src="imageFilePreview" alt="" width="60px"/>

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
import "@firebase/storage";

export default {
  name: "profile",
  components: {
  },
  data () {
    return {
      displayName : '',
      imageName: '',
      imageFile: '',
      imageFilePreview: '',
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
    updateDisplayName () {
      console.log('updateDisplayName start');
      this.show = true;
      this.warning = false;
      if (this.displayName) {
        console.log('update displayName => ' + this.displayName);
        let user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.displayName
        }).then(() => {
          console.log('updateDisplayName success.');
          this.displayName = '';
          this.show = false;
        }).catch((error) => {
          console.log('updateDisplayName error.');
          this.show = false;
        });

      } else {
        console.log('no update.');
        this.warning = true;
        this.show = false;
      }
    },
    updatePhotoURL (imageUrl) {
      console.log('updatePhotoURL start');
      console.log('update PhotoURL => ' + imageUrl);

      let user = firebase.auth().currentUser;

      user.updateProfile({
        photoURL: imageUrl
      }).then(() => {
        console.log('updatePhotoURL success.');
        this.show = false;
      }).catch((error) => {
        console.log('updatePhotoURL error.');
        this.show = false;
      });
    },
    onFileChange(e) {
      console.log('onFileChange start');
      // console.log(e);
      const files = e.target.files || e.dataTransfer.files;
      this.imageFile = files[0];
      this.convertImageToPreview(files[0]);
      this.imageName = files[0].name;
    },
    convertImageToPreview(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageFilePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      console.log('upload start');
      console.log('image name : ' + this.imageName);
      this.show = true;
      // console.log(this.imageFile);
      let file = this.imageFile;
      const reader = new FileReader();
      reader.onloadend = e => {
        let blob = new Blob([e.target.result], { type: "image/jpeg" });
        let storageRef = firebase.storage().ref('images/' + file.name);
        storageRef.put(blob).then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            this.updatePhotoURL(downloadURL);
            this.imageFilePreview = '';
            this.imageFile = '';
            this.imageName = '';
          });
        });
      }
      reader.onerror = e => {
          console.log("Failed file read: " + e.toString());
      };
      reader.readAsArrayBuffer(file);
    }
  }
};
</script>


