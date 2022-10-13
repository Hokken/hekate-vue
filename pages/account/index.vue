<template>
  <div class="AccountLayout">   
    <Account/>
  </div>
</template>

<script>
import Account from '~/components/Account/';
export default {
  components: {
    Account
  },
  data: () => {
    return {}
  },
  middleware: 'not-authenticated'
}
</script>

<style lang="scss">
.AccountLayout {
}
</style>