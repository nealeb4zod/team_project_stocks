<template>
  <div>
    <app-header></app-header>
    <user-box :userName="userName"></user-box>
    <total-value :totalValue="totalValue"></total-value>
    <graph-total-value></graph-total-value>
    <search-box></search-box>
    <list-of-stocks
      :listOfUserHeldStocks="listOfUserHeldStocks"
    ></list-of-stocks>
  </div>
</template>

<script>
import AppHeaderVue from './components/AppHeader.vue';
import GraphTotalValueVue from './components/GraphTotalValue.vue';
import ListOfStocksVue from './components/ListOfStocks.vue';
import SearchBoxVue from './components/SearchBox.vue';
import TotalValueVue from './components/TotalValue.vue';
import UserBoxVue from './components/UserBox.vue';

import { eventBus } from './main.js';
import StocksService from './services/StocksService';

export default {
  name: 'app',
  components: {
    'app-header': AppHeaderVue,
    'graph-total-value': GraphTotalValueVue,
    'list-of-stocks': ListOfStocksVue,
    'search-box': SearchBoxVue,
    'total-value': TotalValueVue,
    'user-box': UserBoxVue,
  },
  data() {
    return {
      userName: '',
      listOfUserHeldStocks: [],
    };
  },
  methods: {
    fetchStocks() {
      StocksService.getStocks().then((stocks) =>
        stocks.forEach((stock) => {
          this.updateStockList(this.listOfUserHeldStocks, stock);
        })
      );
    },
    getStockQuote(symbol) {
      let url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.VUE_APP_IEX_API_TOKEN}`;
      return fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data.latestPrice;
        });
    },
    updateStockList(stockArray, newStockObject) {
      this.getStockQuote(newStockObject.symbol).then((currentPrice) => {
        if (currentPrice === null) {
          currentPrice = 'Null';
        }
        newStockObject.currentPrice = currentPrice;
        stockArray.push(newStockObject);
      });
    },
  },
  mounted() {
    this.fetchStocks();
    eventBus.$on('add-stock-to-user-list', (selectedStock) => {
      StocksService.postStock(selectedStock).then((res) => {});
      this.updateStockList(this.listOfUserHeldStocks, selectedStock);
    });
  },
  computed: {
    totalValue() {
      let totalValueOfStock = 0;
      for (let index = 0; index < this.listOfUserHeldStocks.length; index++) {
        let priceDifference =
          this.listOfUserHeldStocks[index].currentPrice -
          this.listOfUserHeldStocks[index].purchasedPrice;
        let valueOfStock =
          priceDifference * this.listOfUserHeldStocks[index].quantity;
        totalValueOfStock += valueOfStock;
      }
      return totalValueOfStock;
    },
  },
};
</script>

<style>
.stock-table {
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 200px 100px 200px 200px 200px 200px 200px;
}
</style>
