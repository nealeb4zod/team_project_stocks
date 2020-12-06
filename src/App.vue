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
        },
        {
          symbol: 'TSLA',
          name: 'TESLA',
          quantity: 2000,
          date: '2020-03-04',
          purchasedPrice: 500,
        },
      ],
      totalValueOfStock: null,
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
    async totalValue() {
      let totalValue = 0;
      for (let index = 0; index < this.listOfUserHeldStocks.length; index++) {
        let closingPrice = await this.getStockQuote(
          this.listOfUserHeldStocks[index].symbol
        );
        let priceDifference =
          closingPrice - this.listOfUserHeldStocks[index].purchasedPrice;
        let valueOfStock =
          priceDifference * this.listOfUserHeldStocks[index].quantity;
        console.log(valueOfStock);
        totalValue += valueOfStock;
      }
      console.log(totalValue);
      return totalValue;
    },
    updateStockList(stockArray, newStockObject) {
      const index = stockArray.findIndex(
        (stock) => stock.symbol === newStockObject.symbol
      );

      if (index === -1) {
        stockArray.push(newStockObject);
      } else {
        stockArray[index].quantity += newStockObject.quantity;
      }
    },
  },
  mounted() {
    this.totalValueOfStock = this.totalValue();
    eventBus.$on('add-stock-to-user-list', (selectedStock) => {
      this.updateStockList(this.listOfUserHeldStocks, selectedStock);
    });
  },
  computed: {},
  // for loop for each stock
  // create a total value variable for the For loop to update
  // get stock quote, for last price
  // take current price and subtract purchase price = sum
  // multiply SUM by number of stock
};
</script>

<style></style>
