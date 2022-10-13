<template>
  <div class="LatestInterpretations__container">{{this.latest}}</div>
</template>

<script>
export default {
  props: {
    latest: Array
  }
};
</script>

<style lang="scss">
.LatestInterpretations {

  &__container {
   margin-bottom: 30px;
  }

}
</style>