<template>
  <div class="FirestoreRequest-main-container">
    <AppButton
      label="Send Request"
      theme="orange"
      @button-click="sendRequest"
    />
    <span :class="[requestClass]">{{ requestState }}</span>
    <div class="request">
      <div><strong>Request Data:</strong></div>
      <div :class="['requestData', requestClass]">{{ requestData }}</div>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import AppButton from "~/components/ui/AppButton";

export default {
  data() {
    return {
      requestState: "",
      collection: "dropdowns",
      requestData: {
        label: "Select an Aspect",
        type: "aspects",
        data: [
          { id: -1, name: "------ MAJOR ASPECTS ------" },
          { id: 1, name: "Conjunction (0°)" },
          { id: 2, name: "Sextile (60°)" },
          { id: 3, name: "Square (90°)" },
          { id: 4, name: "Trine (120°)" },
          { id: 5, name: "Opposition (360°)" }
        ]
      },
      requestClass: ""
    };
  },
  components: {
    AppButton
  },
  mounted() {},
  methods: {
    sendRequest() {
      db.collection(this.collection)
        .doc()
        .set(this.requestData)
        .then(() => {
          this.requestState = "Request OK";
          this.requestClass = "green";
        })
        .catch(error => {
          this.requestState = error;
          this.requestClass = "red";
        });
    }
  }
};
</script>

<style lang="scss">
.FirestoreRequest-main-container {
  .request {
    margin: 20px 0;
  }
  .requestData {
    margin: 10px 0;
  }
  .green {
    color: rgb(3, 254, 3);
  }
  .red {
    color: red;
  }
}
</style>