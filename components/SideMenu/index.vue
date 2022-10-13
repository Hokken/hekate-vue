<template>
  <div class="SideMenu__container">
    <div class="SideMenu__item SideMenu__header">INTERPRETATIONS</div>
    <nuxt-link class="SideMenu__item" to="/planets"><img class="SideMenu__item-icon" src="~assets/images/planets/sun.png"><span>Planets</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/signs"><img class="SideMenu__item-icon" src="~assets/images/signs/aries.png"><span>Signs</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/houses"><img class="SideMenu__item-icon" src="~assets/images/house.png"><span>Houses</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/aspects"><img class="SideMenu__item-icon" src="~assets/images/aspects/conjunction.png"><span>Aspects</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/planets-in-signs"><img class="SideMenu__item-icon" src="~assets/images/planets/sun.png"><img class="SideMenu__item-icon" src="~assets/images/signs/aries.png"><span>Planets in Signs</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/planets-in-houses"><img class="SideMenu__item-icon" src="~assets/images/planets/sun.png"><img class="SideMenu__item-icon" src="~assets/images/house.png"><span>Planets in Houses</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/houses-in-signs"><img class="SideMenu__item-icon" src="~assets/images/house.png"><img class="SideMenu__item-icon" src="~assets/images/signs/aries.png"><span>Houses in Signs</span></nuxt-link>
    <nuxt-link class="SideMenu__item" to="/planets-in-aspects"><img class="SideMenu__item-icon" src="~assets/images/planets/sun.png"><img class="SideMenu__item-icon" src="~assets/images/aspects/conjunction.png"><span>Planets in Aspects</span></nuxt-link>   
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.SideMenu {
  
  &__header {
    display: flex;  
    justify-content: center;  
    font-weight: bold;
    color: $lightGrey;
    background-color: $black;
  }
  &__container {
    display: flex;
    flex-direction: column;
    position: sticky;
    top:0;
    padding: 0;
    background-color:#272727;
    height: 100%;
    z-index: 1;
  }
  &__item {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    width: 100%;
    min-width: 165px;
    //border-top: 1px solid #3c3c3c;
    border-bottom: 1px solid #3d2f2f;
    white-space: nowrap;
    text-transform: uppercase;
    text-decoration: none;  
    &:last-child {
      border-bottom: none;
    }
    &:first-child {
      border-top: none;
    }
    & > span {
       margin-left: 8px;
    }
  }
  &__item-icon {
    width: 14px;
    height: auto;
  }
  &__item-icon + &__item-icon {
     margin-left: 3px;
  }
}
</style>