<template>
  <div>
    <h1>Signs interpretations</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <Search
      :mode="mode"
      :data="[signs]"
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
      selections: [1],
      collection: "signs"
    };
  },
  mixins: [interpretationMixin],
  fetch({ store }) {
    if (_.isEmpty(store.state.dropdowns.signs)) {
      return getDropdownsData("signs", "setSigns", store);
    }
  },
  computed: mapState({
    signs: state => state.dropdowns.signs
  })
};
</script>

<style lang="scss">
</style>
