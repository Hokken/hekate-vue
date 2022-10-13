import {
  addInterpretation,
  getInterpretations
} from "~/utils/db/interpretations";
import EventBus from '../utils/event-bus'
import Search from "~/components/Search/";
import Interpretations from "~/components/Interpretations/";
import LatestInterpretations from "~/components/Interpretations/LatestInterpretations/";
import AppEditor from "~/components/AppEditor/";
export const interpretationMixin = {
  components: {
    Search,
    AppEditor,
    Interpretations,
    LatestInterpretations
  },
  data() {
    return {
      mode: "default",
      showLatest: false,
      latest: [],
      interpretationsData: {}
    };
  },
  mounted(){  
   EventBus.$on('refresh-interpretations', () => {
     console.log('called')
     this.searchInterpretations();
   })
  },
  beforeDestroy(){
    EventBus.$off('refresh-interpretations');
  },
  methods: {
    doSelectChanged(selectId, value) {
      console.log(selectId)
      this.selections[selectId] = parseInt(value, 10);
      this.$router.push({ path: this.collection, query: { id: this.selections.join('-') }})
    },
    doClose() {
      this.mode = "default";
    },
    async doSave(html) {
      try {
        await addInterpretation(
          this.$store.state.user.uid,
          this.collection,
          this.selections,
          html
        );
        this.$store.dispatch("setNotification", {
          show: true,
          type: 1,
          message: "interpretations submitted successfully"
        });
        this.mode = "default";
        EventBus.$emit('refresh-interpretations');
      } catch (error) {
        this.$store.dispatch("setNotification", {
          show: true,
          type: 0,
          message: error
        });
      }
    },
    async searchInterpretations() {
      this.mode = "search";
      try {
        const result = await getInterpretations(
          this.collection,
          this.selections
        );
        this.interpretationsData = result;
      } catch (error) {
        this.interpretationsData = {};
        this.$store.dispatch("setNotification", {
          show: true,
          type: 0,
          message: error
        });
      }
    }
  },
  async asyncData({ query, store, route }) {
    if (query.id) {
      const ids = query.id.split("-").map(id => {
        return parseInt(id, 10);
      });
      try {
        if (ids >= 0) {
          const result = await getInterpretations(route.name, ids);
          return { interpretationsData: result};
        }
        console.log(1, ids)
        return {selections: ids}
      } catch (error) {
        if (ids >= 0) {
          store.dispatch("setNotification", {
            show: true,
            type: 0,
            message: error
          });
        }
        console.log(ids)
        return { selections: ids };
      }
    }
  },
};
