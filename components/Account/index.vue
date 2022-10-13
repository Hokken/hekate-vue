<template>
  <div class="Account__container">
    <form>
      <h1>Account Details</h1>
      <label for="name">Name</label>
      <input v-model="name" name="name" type="text" disabled />
      <label for="displayName">Display Name</label>
      <input v-model="displayName" name="displayName" type="text" />
      <label for="email">Email</label>
      <input v-model="email" name="email" type="text" disabled />
      <label for="alternateEmail">Alternate Email</label>
      <div class="Account__alternate-email-container">
        <input v-model="alternateEmail" name="alternateEmail" type="text" />
        <div class="Account__checkbox">
          <input
            class="Account__tick"
            type="checkbox"
            name="useAlternateEmail"
            v-model="useAlternateEmail"
          />
          <label for="useAlternateEmail">Use Alternate Email</label>
        </div>
      </div>
      <hr>
      <h1>Business Details</h1>
       <label for="websiteName">Website Name</label>
      <input v-model="websiteName" name="websiteName" type="text" />
       <label for="websiteURL">Website URL</label>
      <input v-model="websiteURL" name="websiteURL" type="text" />
       <label for="businessDescription">Business description</label>
      <textarea v-model="businessDescription" name="businessDescription" type="text" rows="6"/>
      <AppButton
        theme="orange"
        class="Account__AppButton"
        label="Save"
        @button-click="saveData"
        :disabled="disableButton"
      ></AppButton>
    </form>
  </div>
</template>

<script>
import { updateUser } from "~/utils/db/user";
import AppButton from "~/components/ui/AppButton";

export default {
  components: {
    AppButton
  },
  data: () => {
    return {
      updatedName: "",
      updatedWebsiteName:"",
      updatedWebsiteURL:"",
      updatedBusinessDescription:"",
      updatedAlternateEmail: "",
      updatedUseAlternateEmail: "",
      disableButton: false,
      notification: {
        type: 1,
        message: ""
      },
      showNotification: false
    };
  },
  computed: {
     businessDescription: {
      get() {
        return this.$store.state.user.businessDescription;
      },
      set(value) {
        this.updatedBusinessDescription = value;
      }
    },
     websiteURL: {
      get() {
        return this.$store.state.user.websiteURL;
      },
      set(value) {
        this.updatedWebsiteURL = value;
      }
    },
    websiteName: {
      get() {
        return this.$store.state.user.websiteName;
      },
      set(value) {
        this.updatedWebsiteName = value;
      }
    },
    name() {
      return this.$store.state.user.displayName;
    },
    displayName: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.updatedName = value;
      }
    },
    email() {
      return this.$store.state.user.email;
    },
    alternateEmail: {
      get() {
        return this.$store.state.user.alternateEmail;
      },
      set(value) {
        this.updatedAlternateEmail = value;
      }
    },
    useAlternateEmail: {
      get() {
        return this.$store.state.user.useAlternateEmail;
      },
      set(value) {
        this.updatedUseAlternateEmail = value;
      }
    }
  },
  methods: {
    saveData() {
      this.disableButton = true;
      updateUser(
        this.$store.state.user.uid,
        {
          name: this.updatedName !== "" ? this.updatedName : this.displayName,
          alternateEmail:
            this.updatedAlternateEmail !== ""
              ? this.updatedAlternateEmail
              : this.alternateEmail,
          useAlternateEmail:
            this.updatedUseAlternateEmail !== ""
              ? this.updatedUseAlternateEmail
              : this.useAlternateEmail,
               websiteName:
            this.updatedWebsiteName !== ""
              ? this.updatedWebsiteName
              : this.websiteName,
               websiteURL:
            this.updatedWebsiteURL !== ""
              ? this.updatedWebsiteURL
              : this.websiteURL,
               businessDescription:
            this.updatedBusinessDescription !== ""
              ? this.updatedBusinessDescription
              : this.businessDescription
        },
        this.$store
      )
        .then(() => {
          this.disableButton = false;
          this.$store.dispatch("setNotification", {
            show: true,
            type: 1,
            message: "Account data updated"
          });
        })
        .catch(() => {
          this.disableButton = false;
          this.$store.dispatch("setNotification", {
            show: true,
            type: 0,
            message:
              "There was a problem updating your account please try again later"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.Account {
  &__alternate-email-container {
    display: block;
    label {
      margin: 0;
    }
  }
  &__container input[type="text"],&__container textarea {
    width: 100%;
    max-width: 500px;
  }
  &__AppButton {
    margin-top: 20px;
  }
  &__checkbox {
    display: flex;
    align-items: center;
  }
  &__tick {
    margin: 0 5px 0 0;
  }
  &__update-feedback {
    margin-left: 5px;
  }
}
</style>