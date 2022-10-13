<template>
  <div class="Search__main-container">
    <form class="Search__form">
      <div class="Search__select-container" v-for="(item, index) in data" :key="index">
        <label class="Search__label">{{ item.label }}</label>
        <select class="Search__select" @change="onSelectChange($event, index)">
          <option
            v-for="(option, i) in item.data"
            :key="i"
            :selected="selected[index] === option.id"
            :value="option.id"
            :disabled="option.id === -1"
          >{{ option.name }}</option>
        </select>
      </div>
      <div class="Search__buttons">
        <AppButton theme="orange" label="Search Interpretations" class="Search__submit" @button-click="searchInterpretations"/>
        <div v-show="mode !== 'add' && isAuthenticated()">
          <span class="Search__buttons-span">OR</span>
          <AppButton
            theme="green"
            label="Add Interpretation"
            class="Search__add"
            @button-click="addInterpretation"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AppButton from "~/components/ui/AppButton";
import { isAuthenticated } from "~/utils/";
export default {
  props: {
    data: {
      type: Array,
      required: true,
      isAuthenticated: isAuthenticated
    },
    mode: {
      type: String,
      default: "default"
    },
    selected: Array
  },
  data() {
    return {};
  },
  components: {
    AppButton
  },
  methods: {
    onSelectChange(e, selectId) {
      this.$emit("search-select-changed", selectId, e.target.value);
    },
    searchInterpretations() {
      this.$emit("search-interpretations-clicked");
    },
    addInterpretation() {
      this.$emit("add-interpretation-clicked");
    },
    isAuthenticated(){
      return isAuthenticated(this.$store);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.Search {
  
  &__main-container {
     margin: 30px 0;
     background-color: $black;
     border-radius: 8px;
     padding: 25px 30px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }
  &__label {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
  }
  &__select-container {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__select-container {
    display: flex;
    flex-direction: column;
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-top: 20px;
    &-span {
      margin: 0 10px;
    }
  }

  @media screen and (min-width: 900px) {
    &__select {
      min-width: 150px;
      max-width: 450px;
      margin-right: 15px;
    }
    &__submit {
      align-self: flex-end;
    }
    &__buttons {
      display: flex;
      width: 100%;
      align-self: flex-end;
      justify-content: left;
      &-span {
        margin: 0 10px;
      }
    }
  }
}
</style>