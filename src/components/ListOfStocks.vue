<template>
  <div>
    <div class="stock-table">
      <div>
        Symbol:
      </div>
      <div>
        Name:
      </div>
      <div>
        Quantity:
      </div>
      <div>
        Purchased Price:
      </div>
      <div>
        Purchased date:
      </div>
      <div>
        Current Price:
      </div>
      <div>
        Stock Value:
      </div>
    </div>
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
