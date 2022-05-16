<template lang="pug">
  #app
    Cacl

</template>

<script>
import Vue from 'vue';

import Cacl from '@/pages/calc/index.vue';

export default Vue.extend({
  name: 'app',

  components: {
    Cacl,
  },
});

</script>

<style lang="sass">
#app
  font-family: $second-font-stack
  font-size: 14px
  line-height: 16px
</style>
