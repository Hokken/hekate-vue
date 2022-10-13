<template>
  <div class="Interpretations__container">
    <InterpretationsFilters @filter-clicked="doFilterClicked" v-if="data.interpretations" />
    <Interpretation
      v-for="(interpretation, index) in slicedInterpretations"
      :key="index"
      :text="interpretation.text"
      :userData="getUserData(interpretation.uid)[0]"
      :date="getReadableDateLocal(interpretation.created)"
      :uid="interpretation.uid"
      :id="interpretation.id"
      :collection="collection"
    />
    <AppButton
      v-if="data.interpretations && this.numberOfInterpretationsToShow < data.interpretations.length"
      class="Interpretations__loadMore"
      label="SHOW MORE"
      theme="grey"
      @button-click="loadMore"
    />
  </div>
</template>

<script>
import Interpretation from "./Interpretation";
import InterpretationsFilters from "./InterpretationsFilters";
import { getReadableDate } from "../../utils/index";
import AppButton from "~/components/ui/AppButton";
export default {
  props: {
    data: Object,
    collection: String
  },
  data: () => {
    return {
      numberOfInterpretationsToShow: 2,
      filters: [
        { type: "date", active: true, order: "desc" },
        { type: "likes", active: false, order: "desc" },
        { type: "random", active: false }
      ]
    };
  },
  components: {
    Interpretation,
    InterpretationsFilters,
    AppButton
  },
  updated: function() {
    // console.log(this.data);
  },
  methods: {
    getUserData(uid) {
      return this.data.usersData.filter(user => {
        return user.uid === uid;
      });
      /*if (filtered.length > 0) {
        return filtered[0].displayName;
      } else {
        return "Unknown user";
      }*/
    },
    getReadableDateLocal(milliseconds) {
      return getReadableDate(milliseconds);
    },
    loadMore() {
      this.numberOfInterpretationsToShow += this.numberOfInterpretationsToShow;
    },
    doFilterClicked(type) {
      const filter = this.getFilterByType(type); 
      this.setFilterActive(filter);
          
      switch (type) {
        case "date":
         
          filter.order = filter.order === "desc" ? "asc" : "desc";
          break;
        default:
      }
    },
    getActiveFilter() {
      return this.filters.filter(item => item.active === true);
    },
    setFilterActive(toActivate){
    this.filters.forEach(filter => {
      filter.active = false;
    })
    toActivate.active = true;
    },
    getFilterByType(type) {     
      return _.find(this.filters, (filter) => {
        if(filter.type === type) {
          return true;
        }
      })
    },
    doFilterpretations(data) {
      const filter = this.getActiveFilter()[0];
      switch (filter.type) {
        case "date":
          return _.orderBy(data, ["created"], [filter.order]);
        case "likes":
          return;
        case "random":
          return _.shuffle(data);
        default:
          return this.slicedInterpretations;
      }
    }
  },
  computed: {
    slicedInterpretations: function() {
      if (this.data.interpretations === undefined) return [];
      const filteredInterpretations = this.doFilterpretations(
        this.data.interpretations
      );
      const slice = filteredInterpretations.slice(
        0,
        this.numberOfInterpretationsToShow
      );
      return slice;
    }
  }
};
</script>

<style lang='scss'>
.Interpretations {
  &__loadMore {
    width: 100%;
  }
}
</style>