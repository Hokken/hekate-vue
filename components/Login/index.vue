<template>
  <div class="Login__container">
    <div id="firebaseui-auth-container"></div>   
  </div>
</template>

<script>

import firebase from "firebase";

export default { 
  mounted() {
    const firebaseui = require("firebaseui");
    const uiConfig = {
      signInSuccessUrl: "/",     
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    // console.log(ui.isPendingRedirect());
    ui.start("#firebaseui-auth-container", uiConfig);
    //  console.log(ui.isPendingRedirect());
  }
};
</script>

<style lang="scss">
.Login {
}
</style>