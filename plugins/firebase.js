import firebase from "firebase";
import "firebase/firestore";
import { logUser } from "@/utils/db/user";
import Cookies from "js-cookie";

export const config = {
  apiKey: process.env.NUXT_PUBLIC_APIKEY,
  authDomain: process.env.NUXT_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.NUXT_PUBLIC_DATABASEURL,
  projectId: process.env.NUXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NUXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NUXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NUXT_PUBLIC_APPID,
  measurementId: process.env.NUXT_PUBLIC_MEASUREMENTID
};

if (!firebase.apps.length) {
  console.log("initializing firebase and firestore");
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export default ({ store }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user || Object.keys(store.state.user).length > 0) {
      //console.log(user)
      console.log(user.email, " logged in");
      logUser(store, user);
    } else {
      store.commit("setUser", null);
      Cookies.remove("user");
      console.log(" logged out");
    }
  });
};
