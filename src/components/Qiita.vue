<template>
  <div class="qiita">
    <div class="jumbotron jumbotron-fluid bg-success text-white">
      <div class="container">
        <h1 class="display-4">Made in Qiita</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>

    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>

        <div class="mx-auto max-width-layout1300">
          <div v-show="debug">
            <div class="card shadow text-left">
              <div class="card-header bg-warning">Qiita </div>
              <div class="card-body">
                <h4 class="card-title text-left text-warning">hogeeeeeee</h4>
                <p>qiita_url<input v-model="in_qiita_url" placeholder="https://"></p>
                <p>qiita_id<input v-model="in_qiita_id" placeholder="https://"></p>
                <p>qiita_title<input v-model="in_qiita_title" placeholder="qiitaのタイトル"></p>
                <p>qiita_user<input v-model="in_qiita_user" placeholder="@jimpei"></p>
                <p>service_title<input v-model="in_service_title" placeholder="サービス"></p>
                <p>service_url<input v-model="in_service_url" placeholder="https//"></p>
                <p>tags<input v-model="in_tags" placeholder="php, vue, firebase"></p>

              <form>
                <div class="form-group row">
                  <div class="col-sm-8">
                    <img v-show="imageFilePreview" class="preview-item-file" :src="imageFilePreview" alt="" width="60px"/>
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
              </form>



                <div class="v-margin25"></div>
                <button @click="dbAdd" class="btn btn-warning">
                  <div v-if="show" class="spinner-border spinner-border-sm text-light" role="status">
                    <span class="sr-only">dbAdd...</span>
                  </div>
                  dbAdd
                </button>

              </div>
            </div>
          </div>
          <div class="v-margin25"></div>

          username filter
          <input v-model="user" placeholder="@jimpei, @yamuscle">
          tag filter
          <input v-model="tag" placeholder="php, vue">
          <button @click="dbRefer" class="btn btn-warning">filter</button>
          <div class="v-margin25"></div>

          <div class="row">
            <div v-for="(qiitaItem, key, index) in qiitaItems" :key="index" class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div class="card shape-radius">
                <img :src="qiitaItem.data().image_url" class="card-img-top shape-radius-top" alt="...">
                <div class="card-body">
                  <div class="text-right">
                    <div v-for="(tag, kkey, iindex) in qiitaItem.data().tags" :key="iindex" class="text-right badge badge-pill badge-success">
                      {{ tag }}
                    </div>
                  </div>
                  <h4 class="card-title"><strong><a :href="qiitaItem.data().service_url">{{ qiitaItem.data().service_title }}</a></strong></h4>
                  <p class="card-text">
                    <a :href="qiitaItem.data().qiita_url">{{ qiitaItem.data().qiita_title }}</a>
                  </p>
                  <!-- <button @click="dbDelete(comment.id)" class="btn btn-danger">delete {{ comment.id }}</button> -->
                </div>
                <div class="card-footer shape-radius-bottom">
                  <small class="text-muted">
                    {{ qiitaItem.data().create_date.seconds | toDate }} {{ qiitaItem.data().qiita_user }} 
                  </small>
                </div>
              </div>
              <div class="v-margin25"></div>
            </div>
          </div>

        </div>

      </div>
      <div class="v-margin25"></div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
// import store from "../store";
import {db} from "../firebase";

export default {
  name: "qiita",
  components: {
  },
  data () {
    return {
      debug: false,
      qiitaItems: [],
      user: '',
      tag: '',
      in_qiita_id: '',
      in_qiita_url: '',
      in_qiita_title: '',
      in_qiita_user: '',
      in_service_title: '',
      in_service_url: '',
      in_tags: '',
      show: false,
      imageName: '',
      imageFile: '',
      imageFilePreview: '',
      downloadURL: '',
    }
  },
  filters: {
    toDate (value) {
      let date = new Date(value * 1000);
      let month = date.getMonth() + 1;
      return date.getFullYear() + '/' + month + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
    }
  },
  mounted() {
    // yamuscle
    db.collection("qiita_items")
    .onSnapshot(res => {
      console.log('mounted start');
      // console.log('cnt = ' + this.cnt);
      let array = [];
      res.docs.forEach(doc => {
        // console.log(doc.id, "=>", doc.data());
        let tmpArray = doc;
        array.push(tmpArray);
      });
      console.dir(array);
      this.qiitaItems = array;
    });
  },
  computed: {
    // user() {
    //   return this.$store.getters.user;
    // }
  },
  methods: {
    dbRefer () {
      // orderBy("create_date", 'desc')
      let dbRef;
      if (this.user) {
        dbRef = db.collection('qiita_items').where("qiita_user", "==", this.user);
      } else {
        dbRef = db.collection('qiita_items');
      }
      if (this.tag) {
        dbRef = db.collection('qiita_items').where("tags", "array-contains", this.tag);
      } else {
        dbRef = db.collection('qiita_items');
      }
      let allData = dbRef.get()
        .then(snapshot => {
          let array = [];
          snapshot.forEach(doc => {
            // console.log(doc.id, "=>", doc.data());
            let tmpArray = doc;
            array.push(tmpArray);
          });
          console.dir(array);
          this.qiitaItems = array;
          // return array;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    dbAdd () {
      this.show = true;

      console.log(this.in_qiita_url);
      console.log(this.in_qiita_title);
      console.log(this.in_qiita_user);
      console.log(this.in_service_title);
      console.log(this.in_service_url);
      console.log(this.in_tags);
      console.log(this.downloadURL);

      this.show = false;
      // return;
      db.collection('qiita_items').doc(this.in_qiita_id).set({
        qiita_id: this.in_qiita_id,
        qiita_title: this.in_qiita_title,
        qiita_url: this.in_qiita_url,
        qiita_user: this.in_qiita_user,
        service_url: this.in_service_url,
        service_title: this.in_service_title,
        image_url: this.downloadURL,
        tags : [
          "jira",
          "javascript"
        ],
        create_date: new Date()
      }).then(result => {
        console.log('db insert success');
        this.show = false;
      }).catch(error => {
        console.log('db insert error')
        this.show = false;
      });
    },
    dbDelete (id) {
      this.show = true;
      db.collection('chat').doc('room1').collection('messages').doc(id).delete()
      .then(result => {
        console.log('db delete success');
        this.show = false;
      }).catch(error => {
        console.log('db delete error')
        this.show = false;
      });
    },
    infiniteHandler($state) {
      // console.log('debug cnt' + this.cnt);

      this.show = true;
      let dbRef = db.collection('chat').doc('room1').collection('messages').orderBy("createdAt", 'desc').limit(this.cnt);
      let allData = dbRef.get()
        .then(snapshot => {
          let array = [];
          snapshot.forEach(doc => {
            // console.log(doc.id, "=>", doc.data());
            // let tmpArray = JSON.parse(JSON.stringify(doc.data()));
            let tmpArray = doc;
            array.push(tmpArray);
          });
          console.dir(array);
          this.comments = array;
          this.show = false;
          // return array;
        })
        .catch(err => {
          console.log("Error getting documents", err);
          this.show = false;
        });

      this.cnt = this.cnt + 3;
      var cntMax = this.cnt;

      setTimeout( () => {
        // console.log(cntMax)
        if (cntMax > 15) {
          console.log('infinite-loading complete')
          $state.complete();
        } else {
          console.log('infinite-loading loaded')
          $state.loaded();
        }
      }, 2000 );

    },
    onFileChange(e) {
      // 画像フォームにファイルをセットしたら発火する
      console.log('onFileChange start');
      const files = e.target.files || e.dataTransfer.files;
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
      let uploadFileName = 'qiita/' + this.in_qiita_id + '_' + this.imageFile.name;
      console.log('upload file name : ' + uploadFileName);

      this.show = true;
      const reader = new FileReader();
      reader.onloadend = e => {
        let blob = new Blob([e.target.result], { type: "image/jpeg" });
        let storageRef = firebase.storage().ref(uploadFileName);
        storageRef.put(blob).then(snapshot => {
          // ユーザ情報にアイコンのURLをセットする
          snapshot.ref.getDownloadURL().then(downloadURL => {
            this.downloadURL = downloadURL;
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

<style scoped>
.shape-radius {
  border-radius: 30px 30px 30px 30px;
}
.shape-radius-top {
  border-radius: 30px 30px 0px 0px;
}
.shape-radius-bottom {
  border-radius: 0px 0px 30px 30px;
}
.card {
  box-shadow: 5px 5px 20px #dadada;
  transition: .2s;
}
.card:hover {
  box-shadow: none;
  transform: translate3d(0, 5px, 0);
}
</style>
