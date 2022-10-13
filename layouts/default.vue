<template>
  <div class="AppContainer">
    <Nav />
    <Banner />
    <div class="DefaultLayoutContainer">
      <SideMenu />
      <div class="DefaultLayoutContent">
        <nuxt />
        <Notification v-if="this.$store.state.notification.show" />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "~/components/Nav/";
import Banner from "~/components/Banner/";
import SideMenu from "~/components/SideMenu/";
import Notification from "~/components/Notification/";

export default {
  components: {
    Nav,
    SideMenu,
    Banner,
    Notification
  },
  layout: "default"
};
</script>

<style lang="scss">
.AppContainer {
  display: flex;
  flex-direction: column;
}

.DefaultLayoutContainer {
  display: flex;
  height: 100%;
}

.DefaultLayoutContent {
  width: 100%;
  padding: 40px;
}

@media (min-width: 900px) {
  .DefaultLayoutContent {
    padding: 40px 70px;
  }
}
</style>
