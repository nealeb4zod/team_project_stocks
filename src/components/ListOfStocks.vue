<template>
  <div>
    <individual-stock
      v-for="(stock, index) in listOfUserHeldStocks"
      :key="index"
      :stock="stock"
    ></individual-stock>
  </div>
</template>

<script>
import IndividualStockVue from './IndividualStock.vue';

export default {
  name: 'list-of-stocks',
  props: ['listOfUserHeldStocks'],
  components: {
    'individual-stock': IndividualStockVue,
  },
};
</script>

<style></style>
