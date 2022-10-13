<template>
  <div>
    <h1>Planets in Houses interpretations</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <Search
      :mode="mode"
      :data="[planets, houses]"
      :selected="selections"
      @search-select-changed="doSelectChanged"
      @search-interpretations-clicked="searchInterpretations"
      @add-interpretation-clicked="mode='add'"
    ></Search>
    <AppEditor v-if="mode==='add'" @do-save="doSave" @do-close="doClose" />
    <LatestInterpretations v-if="showLatest" :latest="latest" />
    <Interpretations :collection="collection" :data="interpretationsData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDropdownsData } from "~/utils/db/static";
import { interpretationMixin } from "~/mixins";

export default {
  data() {
    return {
      selections: [1, 1],
      collection: "planets-in-houses"
    };
  },
  mixins: [interpretationMixin],
  fetch({ store }) {
    let promises = [];
    if (_.isEmpty(store.state.dropdowns.planets)) {
      promises.push(getDropdownsData("planets", "setPlanets", store));
    }
    if (_.isEmpty(store.state.dropdowns.houses)) {
      promises.push(getDropdownsData("houses", "setHouses", store));
    }
    return Promise.all(promises);
  },
  computed: mapState({
    planets: state => state.dropdowns.planets,
    houses: state => state.dropdowns.houses
  })
};
</script>

<style lang="scss">
</style>
