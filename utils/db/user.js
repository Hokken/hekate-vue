import 'firebase/firestore';
import { db } from "@/plugins/firebase";
import Cookies from "js-cookie";

export const logUser = (store, user) => {
  const users = db.collection("users");
  let userData;
  users
    .get()
    .then(snapshot => {
      let userFound = false;
      snapshot.forEach(doc => {
        if (doc.id === user.uid) {
          userFound = true;
          userData = {
            uid: user.uid,
            name: doc.data().name,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            websiteName: doc.data().websiteName,
            websiteURL: doc.data().websiteURL,
            businessDescription: doc.data().businessDescription,
            alternateEmail: doc.data().alternateEmail,
            useAlternateEmail: doc.data().useAlternateEmail
          };
          users
            .doc(doc.id)
            .set({ accessed: new Date().getTime() }, { merge: true });
          store.commit("setUser", userData);
          Cookies.set("user", userData);
        }
      });
      if (userFound === false) {
        console.log("user not found adding it");
        userData = {
          uid: user.uid,
          name: user.displayName,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          websiteName: "",
          websiteURL: "",
          businessDescription: "",
          alternateEmail: "",
          useAlternateEmail: false,
          created: new Date().getTime()
        };
        users.doc(user.uid).set(userData);
        store.commit("setUser", userData);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateUser = (uid, data, store) => {
    const users = db.collection("users");
    console.log(uid, data);
    return users.doc(uid).update(data)
      .then(() => {
        console.log('user updated');
        store.commit('setUser', { ...store.state.user, ...data });
        Cookies.set('user', { ...store.state.user, ...data });
        return Promise.resolve();
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject();
      })
  }