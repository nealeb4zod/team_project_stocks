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
      listOfUserHeldStocks: [
        {
          symbol: 'AAPL',
          name: 'APPLE',
          quantity: 1500,
          date: '2020-12-06',
          purchasedPrice: 100,
          currentPrice: 125,
        },
        {
          symbol: 'TSLA',
          name: 'TESLA',
          quantity: 2000,
          date: '2020-03-04',
          purchasedPrice: 500,
          currentPrice: 700,
        },
      ],
    };
  },
  methods: {
    getStockQuote(symbol) {
      let url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.VUE_APP_IEX_API_TOKEN}`;

      return fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data.close;
        });
    },

    updateStockList(stockArray, newStockObject) {
      this.getStockQuote(newStockObject.symbol).then((currentPrice) => {
        newStockObject.currentPrice = currentPrice;
        const index = stockArray.findIndex(
          (stock) => stock.symbol === newStockObject.symbol
        );

        if (index === -1) {
          stockArray.push(newStockObject);
        } else {
          stockArray[index].quantity += newStockObject.quantity;
        }
      });
    },
  },
  mounted() {
    eventBus.$on('add-stock-to-user-list', (selectedStock) => {
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
  // for loop for each stock
  // create a total value variable for the For loop to update
  // get stock quote, for last price
  // take current price and subtract purchase price = sum
  // multiply SUM by number of stock
};
</script>

<style>
.stock-table {
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 400px 100px 200px 200px 200px 200px;
}
</style>
