<template>
  <div>
    <div class="stock-table">
      <div>
        {{ stock.symbol }}
      </div>
      <!-- the !handleClick hides the graph when you click, after it is visible. -->
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
      <div>
         <button v-on:click="handleClick">
           View Graph
         </button>
      </div>
    </div>
    <individual-stock-graph v-if='selectedStock === stock ' :stock='stock'></individual-stock-graph>
  </div>
</template>

<script>
import IndividualStockGraphVue from './IndividualStockGraph.vue';
import {eventBus} from '../main.js'
export default {
  name: 'individual-stock',
  props: ['stock', 'selectedStock'],
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
  methods: {
    handleClick() {
      eventBus.$emit('stock-selected', this.stock)
    }
  }
};
</script>

<style>

</style>
