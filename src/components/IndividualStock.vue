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
        {{ stock.purchasedPrice | toDollar }}
      </div>
      <div>
        {{ stock.date | moment('Do MMM YYYY') }}
      </div>
      <div>
        {{ stock.currentPrice | toDollar }}
      </div>
      <div>
        {{ ((100 * stockValue - ((100 * stockValue) % 1)) / 100) | toDollar }}
      </div>
      <div>
        <button v-on:click="handleClick">
          {{ text }}
        </button>
      </div>
    </div>
    <individual-stock-graph
      v-if="isActive"
      :stock="stock"
    ></individual-stock-graph>
  </div>
</template>

<script>
import IndividualStockGraphVue from './IndividualStockGraph.vue';

export default {
  name: 'individual-stock',
  props: ['stock'],
  data() {
    return {
      isActive: false,
      text: 'View Graph',
    };
  },
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
      this.isActive = !this.isActive;
      if (this.isActive) {
        this.text = 'Hide Graph';
      } else {
        this.text = 'View Graph';
      }
    },
  },
};
</script>

<style></style>
