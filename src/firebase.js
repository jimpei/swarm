import firebase from "@firebase/app";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAv6tanUdTFNFevBBrlDLcgpUz9tD23Cg4",
  authDomain: "swarm-16280.firebaseapp.com",
  databaseURL: "https://swarm-16280.firebaseio.com",
  projectId: "swarm-16280",
  storageBucket: "swarm-16280.appspot.com",
  messagingSenderId: "196507500794",
  appId: "1:196507500794:web:495a22fce344b6c1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
