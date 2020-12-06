<template>
  <dir>
    {{ stock.symbol }} {{ stock.name }} {{ stock.quantity }}
    <individual-stock-graph></individual-stock-graph>
  </dir>
</template>

<script>
import IndividualStockGraphVue from './IndividualStockGraph.vue';
export default {
  name: 'individual-stock',
  props: ['stock'],
  components: {
    'individual-stock-graph': IndividualStockGraphVue,
  },
};
</script>

<style></style>
