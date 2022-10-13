<template>
  <div>
    <h1>Houses in Signs interpretations</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <Search
      :mode="mode"
      :data="[houses, signs]"
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
      collection: "houses-in-signs"
    };
  },
  mixins: [interpretationMixin],
  fetch({ store }) {
    let promises = [];
    if (_.isEmpty(store.state.dropdowns.houses)) {
      promises.push(getDropdownsData("houses", "setHouses", store));
    }
    if (_.isEmpty(store.state.dropdowns.signs)) {
      promises.push(getDropdownsData("signs", "setSigns", store));
    }
    return Promise.all(promises);
  },
  computed: mapState({
    houses: state => state.dropdowns.houses,
    signs: state => state.dropdowns.signs
  })
};
</script>

<style lang="scss">
</style>
