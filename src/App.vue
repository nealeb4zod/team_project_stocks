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
        },
        {
          symbol: 'TSLA',
          name: 'TESLA',
          quantity: 2000,
          date: '2020-03-04',
        },
      ],
    };
  },
  methods: {
    getStockQuote(symbol) {
      let url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.VUE_APP_IEX_API_TOKEN}`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data.close);
        });
    },
  },
  mounted() {
    this.getStockQuote('AAPL');
  },
  computed: {
    totalValue() {},
  },
};
</script>

<style></style>
