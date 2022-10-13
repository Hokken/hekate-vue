<template>
  <div class="LoginPage__container">
    <Login/>
  </div>
</template>

<script>
import Login from '~/components/Login/';
export default {
  components: {
    Login
  },
  middleware: 'authenticated'
};
</script>

<style lang="scss">
.LoginPage {
  &__container {
    text-align: center;
  }
}
</style>
