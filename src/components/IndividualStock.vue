<template>
  <div>
    <div class="stock-table">
      <div>
        {{ stock.symbol }}
      </div>
      <div>
        {{ stock.name }}
      </div>
      <div>
        {{ stock.quantity }}
      </div>
      <div>
        {{ stock.purchasedPrice }}
      </div>
      <div>
        {{ stock.date }}
      </div>
      <div>
        {{ stock.currentPrice }}
      </div>
      <div>
        {{ stockValue }}
      </div>
    </div>
    <individual-stock-graph></individual-stock-graph>
  </div>
</template>

<script>
import IndividualStockGraphVue from './IndividualStockGraph.vue';
export default {
  name: 'individual-stock',
  props: ['stock'],
  components: {
    'individual-stock-graph': IndividualStockGraphVue,
  },
  computed: {
    stockValue() {
      let priceDifference = this.stock.currentPrice - this.stock.purchasedPrice;
      let valueOfStock = priceDifference * this.stock.quantity;
      return valueOfStock;
    },
  },
};
</script>

<style>

</style>
