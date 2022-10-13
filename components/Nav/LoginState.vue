<template>
  <div class="LoginState__container">
    <div class="LoginState__login-message" v-show="!authenticated">
      <nuxt-link to="/login">LOGIN</nuxt-link>
    </div>
    <div class="LoginState__login-info" v-show="authenticated">
      <nuxt-link to="/account">
        <img class="LoginState__photo" v-bind:src="photo" />
      </nuxt-link>
      <div @click="logout"><nuxt-link to="/">LOGOUT</nuxt-link></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  computed: mapState({
    photo: state => state.user.photoURL,
    userName: state => state.user.name,
    authenticated: state => {
      return Object.keys(state.user).length > 0;
    }
  }),
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$store.dispatch("setUser", {});
      this.$router.push("loggedout");
    }
  }
};
</script>

<style lang="scss">
.LoginState {
  &__container {
    display: flex;
    align-items: center;
    width: auto;
    margin-left: 5px;
  }
  &__login-info { 
    display: flex;
    align-items: center;
    width: auto;
    :nth-child(n) {
      margin-right: 5px;
    }
    :last-child {
      margin-right: 5px;
    }
  }
  &__login-message {
    margin: 0 20px;
  }
  &__photo {
    width: 40px;
    height: auto;
    border-radius: 50%;
  }
}
</style>
