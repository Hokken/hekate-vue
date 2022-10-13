<template>
  <div class="Interpretation__container">
    <div v-if="this.editing===false" class="Interpretation__content">
      <div class="Interpretation__header">
        <div class="Interpretations__details">
          <a href="#" @click.prevent="showUserInfo" class="Interpretation__details-author">{{userData.displayName}}</a> on the
          <span class="Interpretation__details-created">{{date}}</span>
          <span> - </span>
           <a :href="userData.websiteURL" class="Interpretation__details-website">visit author website</a>
        </div>
        <div class="Interpretation__tools">
          <a
            v-if="uid===this.$store.state.user.uid"
            class="Interpretation__tools-edit"
            @click="doEdit"
          >Edit</a>
          <a
            v-if="uid===this.$store.state.user.uid"
            class="Interpretation__tools-delete"
            @click="doDelete"
          >Delete</a>
        </div>
      </div>
      <div v-html="text" class="Interpretation__text"></div>
    </div>
    <AppEditor v-if="this.editing===true" @do-save="doSave" @do-close="doClose" :content="text" />
  </div>
</template>

<script>
import AppEditor from "~/components/AppEditor/";
import { updateInterpretation, deleteInterpretation } from "~/utils/db/interpretations";
import EventBus from '../../utils/event-bus'
export default {
  props: {
    text: String,
    date: String,
    userData: Object,
    uid: String,
    id: String,
    collection: String
  },
  components: {
    AppEditor
  },
  data: () => {
    return {
      editing: false
    };
  },
  mounted(){
   
  },
  methods: {
    showUserInfo(){
      alert(this.userData.businessDescription)
    },
    doClose() {
      this.editing = false;
    },
    doEdit() {
      this.editing = true;
    },
    async doDelete(){
      try {
      await deleteInterpretation(
        this.id,
        this.collection
      )
       this.$emit('interpretation-deleted', this.id);       
       EventBus.$emit('refresh-interpretations');
       this.$store.dispatch("setNotification", {
        show: true,
        type: 1,
        message: "interpretations deleted successfully"
      });
      } catch(error){
        this.$store.dispatch("setNotification", {
          show: true,
          type: 0,
          message: error
        });
      }
    },
    async doSave(html) {

      try {
      await updateInterpretation(
        this.id,
        this.collection,
        {text: html}
      )
      this.$emit('interpretation-updated', this.id, html);
      this.doClose();
      this.$store.dispatch("setNotification", {
        show: true,
        type: 1,
        message: "interpretations updated successfully"
      });
      EventBus.$emit('refresh-interpretations');
      } catch(error){
        this.$store.dispatch("setNotification", {
          show: true,
          type: 0,
          message: error
        });
      }
    },
  }
};
</script>

<style lang="scss">
.Interpretation {
  &__container {
    background-color: $black;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 8px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__details {
    flex-grow: 1;
    &-author {
      color: $orange;
    }

    &-created {
      color: $green;
    }
  }

  &__tools {
    &-edit, &-delete {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &__header {
    margin-bottom: 15px;
  }
}
</style>