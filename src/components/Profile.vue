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
              <form>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">アイコン</label>
                  <div class="col-sm-8">
                    <div v-if="user.photoURL">
                      <img class="mr-3" :src="user.photoURL" width="60px">
                      =>　
                      <img v-show="imageFilePreview" class="preview-item-file" :src="imageFilePreview" alt="" width="60px"/>
                    </div>
                    <div v-else>
                      <img class="mr-3" src="../assets/fantasy_game_character_slime.png" width="60px">
                      =>　
                      <img v-show="imageFilePreview" class="preview-item-file" :src="imageFilePreview" alt="" width="60px"/>
                    </div>
                  </div>
                </div>
                <div class="v-margin25"></div>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" @change="onFileChange">
                    <label class="custom-file-label" for="inputGroupFile04">{{ imageName }}</label>
                  </div>
                  <div class="input-group-append">
                    <button class="btn btn-warning" type="button" id="inputGroupFileAddon04" @click="uploadImage">アイコン更新</button>
                  </div>
                </div>
                <div class="v-margin25"></div>
                <div v-if="uploadSizeError" class="alert alert-warning" role="alert">
                  画像サイズは{{ uploadSizeMax | byteToKBite }} KB以下にしてください。
                </div>
                <div v-if="noImageError" class="alert alert-warning" role="alert">
                  画像以外はuploadできません。
                </div>

                <div class="v-margin25"></div>

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
              <div v-if="noChangeWarning" class="alert alert-warning" role="alert">
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
import "@firebase/storage";
import moment from "moment";

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
      uploadSizeMax : '500000',
      show: false,
      noChangeWarning: false,
      uploadSizeError: false,
      noImageError: false,
    }
  },
  filters: {
    byteToKBite (value) {
      return value.slice(0, -3);
    }
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
      this.noChangeWarning = false;
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
        this.noChangeWarning = true;
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
      // 画像フォームにファイルをセットしたら発火する
      console.log('onFileChange start');
      this.uploadSizeError = false;
      this.noImageError = false;
      const files = e.target.files || e.dataTransfer.files;

      // ファイルサイズが500kb以上の場合はエラーにする
      if (files[0].size > this.uploadSizeMax) {
        console.log('upload size(' +this.uploadSizeMax + ') error. this file size ' + files[0].size);
        this.uploadSizeError = true;
        return;
      }
      // 画像以外をuploadしたらエラー
      if (!files[0].type.match(/image/)) {
        console.log('no image error');
        this.noImageError = true;
        return;
      }

      this.imageFile = files[0];
      this.convertImageToPreview(files[0]);
      this.imageName = files[0].name;
    },
    convertImageToPreview(file) {
      // 画像をプレビュー用に保存する
      const reader = new FileReader();
      reader.onload = e => {
        this.imageFilePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      // 画像アップロードボタンメソッド
      console.log('upload start');
      console.log('image name : ' + this.imageName);
      let date = moment().format('YYYYMMDDHHmmss');
      let uploadFileName = 'images/' + this.user.uid + '/' + date + '_' + this.imageFile.name;
      console.log('upload file name : ' + uploadFileName);

      this.show = true;
      const reader = new FileReader();
      reader.onloadend = e => {
        let blob = new Blob([e.target.result], { type: "image/jpeg" });
        let storageRef = firebase.storage().ref(uploadFileName);
        storageRef.put(blob).then(snapshot => {
          // ユーザ情報にアイコンのURLをセットする
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
      reader.readAsArrayBuffer(this.imageFile);
    }
  }
};
</script>


