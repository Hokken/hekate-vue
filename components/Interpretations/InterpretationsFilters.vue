<template>
  <div class="InterpretationsFilters__main-container">
    <span class="InterpretationsFilters__label">FILTERS</span>
    <a @click.prevent="doFilterClick('date')" class="InterpretationsFilters__filter">By Date</a>
    <a @click.prevent="doFilterClick('likes')" class="InterpretationsFilters__filter">By Likes</a>
    <a @click.prevent="doFilterClick('random')" class="InterpretationsFilters__filter">Random Order</a>
</div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array
    }
  },
  components: {
    
  },
  methods: {
    doFilterClick(filter) {
      this.$emit('filter-clicked', filter);
    }
  }
};
</script>

<style lang="scss">
.InterpretationsFilters {
  &__main-container {
    // display: flex;
    position: sticky;
    top: 0;
    margin: 30px 0;
    background-color: $black;
    border-radius: 8px;
    padding: 25px 30px;
  }

  &__label {
    font-weight: bold;
    margin-right: 10px;
  }

  &__filter {
    margin: 0 5px;
    color: $orange;
    text-decoration: underline;
     &:hover {
      cursor: pointer;
    }
  }

  @media screen and (min-width: 900px) {
   
  }
}
</style>