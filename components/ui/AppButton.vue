<template>
  <button :disabled="disabled" @click.prevent="doClick" :class="`AppButton__button AppButton--${theme}`">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: String,
    theme: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doClick() {
      this.$emit("button-click");
    }
  }
};
</script>

<style lang="scss">
.AppButton {
 
  &__button {
    padding: 8px 10px;
    border-radius: 5px;
    border: 0;
    height: auto;
    min-width: 50px;

    &:hover {
      cursor: pointer;
    }
  }
  &--orange {
    background-color: $orange;
    color: black;
  }
  &--black {
    background-color: $black;
    color: orange;
  }
  &--green {
    background-color: $green;
    color: white;
  }
  &--red {
    background-color: $red;
    color: white;
  }

  &--grey {
    background-color: $superLightGrey;
    color: $black;
  }

  &__button[disabled] {
    background-color: $lightGrey;
    color: $darkGrey;
  }
}
</style>