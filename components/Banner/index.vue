<template>
  <div class="Banner__main-container">
    <img src="~assets/images/bg.jpg" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.Banner {
  &__main-container {   
    width: 100%;
    height: 150px; 
    position: relative;  
    z-index: 2;   
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.4);

    @media (min-width: 1920px) {
       height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>