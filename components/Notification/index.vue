<template >
  <div class="Notification__container">
    <div
      class="Notification__content"
      :class="type === 1 ? 'Notification__content--success' : 'Notification__content--error'"
    >{{message}}</div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  data: () => {
    return {};
  },
  components: {},
  mounted() {
    this.animateIn();
  },
  beforeDestroy() {},
  computed: {
    message() {
      return this.$store.state.notification.message;
    },
    type() {
      return this.$store.state.notification.type;
    }
  },
  methods: {
    animateIn() {
      gsap.from(".Notification__container", {
        opacity: 0,
        y: -68,
        duration: 0.3,
        onComplete: () => {
          this.doClose();
        }
      });
    },
    doClose() {
      gsap.to(".Notification__container", {
        opacity: 0,
        y: -68,
        duration: 0.3,
        delay: 3,
        onComplete: () => {
          this.$store.dispatch("setNotification", { show: false });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.Notification {
  &__container {
    z-index: 10;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 68px;
    padding: 10px;
    font-weight: bold;

    &--success {
      background-color: $green;
    }

    &--error {
      background-color: $red;
    }
  }
}
</style>