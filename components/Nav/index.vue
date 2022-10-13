<template>
  <div class="Nav__main-container">
    <div class="Nav__container">
      <nuxt-link to="/" class="Nav__logo">
        <img src="~assets/images/48x48.png" />
        <div>
          <div class="Nav__logo-title">HEKATE</div>
          <div class="Nav__logo-subtitle">Astrological Interpretations</div>
        </div>
      </nuxt-link>      
      <div class="Nav__right">
        <nuxt-link to="/">CONTACT US</nuxt-link>    
        <LoginState />                 
      </div> 
    </div>
  </div>
</template>
<script>
import LoginState from "~/components/Nav/LoginState";

export default {
  components: {
    LoginState
  }
};
</script>
<style lang="scss">
.Nav {
  &__main-container {
    width: 100%;   
    @include site-gradient;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.6);
    position:relative;
    z-index: 3;
  }
  &__container {
    display: flex;
    align-items: center;
    margin: auto;
    padding: 10px;
  }
  &__right {
    display: flex;
    align-items: center;
    width: auto;
    margin-left: auto;
    margin-right:20px;
  }
  &__logo {
    @extend .noLink;
    width: auto;
    display: flex;
    align-items: center;

    img {
      margin-right: 5px;
    }

    &-title {
      font-size: 2.5rem;
      font-weight: bold;
    }
    &-subtitle {
      font-size: 1.1rem;
    }
  }
}
</style>>