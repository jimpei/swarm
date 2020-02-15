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
// const firebaseConfig = {
//   apiKey: "AIzaSyDoZpWQyaJ3abTh4-vHJXVuz3jgplL92HM",
//   authDomain: "fir-auth-sample-76311.firebaseapp.com",
//   databaseURL: "https://fir-auth-sample-76311.firebaseio.com",
//   projectId: "fir-auth-sample-76311",
//   storageBucket: "fir-auth-sample-76311.appspot.com",
//   messagingSenderId: "977708225071",
//   appId: "1:977708225071:web:ca214305fe4c60e8146cda",
//   measurementId: "G-QJCFLBWQ3Z"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
