import firebase from "@firebase/app";
import "@firebase/auth";
// import "@firebase/firestore";
import store from "./store";

// const firebaseConfig = {
//   apiKey: "AIzaSyAv6tanUdTFNFevBBrlDLcgpUz9tD23Cg4",
//   authDomain: "swarm-16280.firebaseapp.com",
//   databaseURL: "https://swarm-16280.firebaseio.com",
//   projectId: "swarm-16280",
//   storageBucket: "swarm-16280.appspot.com",
//   messagingSenderId: "196507500794",
//   appId: "1:196507500794:web:495a22fce344b6c1"
// };

export default {
  // init() {
  //   firebase.initializeApp(firebaseConfig);
  //   // firebase.firestore();
  //   // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  // },
  // login() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider);
  // },
  logout() {
    firebase.auth().signOut();
    store.commit("onAuthStateChanged", {});
    store.commit("onUserStatusChanged", false);
  },
  onAuth() {
    console.log("[firebase.js] onAuth().");
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      console.log("[firebase.js] store commit.");
      store.commit("onAuthStateChanged", user);
      store.commit("onUserStatusChanged", user.uid ? true : false);
    });
  }
};

// export const db = firebase.firestore();
