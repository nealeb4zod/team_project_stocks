<template>
  <div>
    <header>
      <app-header id="app-header" :userName="userName"></app-header>
    </header>
    <div v-if="userName === ''" class="container">
      <login-box
        element
        :userList="userList"
        v-if="userName === ''"
      ></login-box>
    </div>
    <div v-if="!(userName === '')">
      <user-box element id="user-box" :userName="userName"></user-box>
      <total-value id="total-value" :totalValue="totalValue"></total-value>
      <search-box id="search-box" :userName="userName"></search-box>
      <list-of-stocks
        :listOfUserHeldStocks="listOfUserHeldStocks"
      ></list-of-stocks>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import AppHeaderVue from './components/AppHeader.vue';
import ListOfStocksVue from './components/ListOfStocks.vue';
import LoginBoxVue from './components/LoginBox.vue';
import SearchBoxVue from './components/SearchBox.vue';
import TotalValueVue from './components/TotalValue.vue';
import UserBoxVue from './components/UserBox.vue';

import { eventBus } from './main.js';
import StocksService from './services/StocksService';

export default {
  name: 'app',
  components: {
    'app-header': AppHeaderVue,
    'list-of-stocks': ListOfStocksVue,
    'search-box': SearchBoxVue,
    'total-value': TotalValueVue,
    'user-box': UserBoxVue,
    'login-box': LoginBoxVue,
  },
  data() {
    return {
      userList: [],
      userName: '',
      listOfUserHeldStocks: [],
    };
  },
  methods: {
    fetchUsers() {
      StocksService.getUsers().then((userList) => {
        this.userList = userList.map((user) => user.userName);
      });
    },
    fetchStocks(userName) {
      StocksService.getUserStocks(userName).then((user) => {
        user.stocks.forEach((stock) => {
          this.updateStockList(this.listOfUserHeldStocks, stock);
        });
      });
    },
    getStockQuote(symbol) {
      let url = `${process.env.VUE_APP_API_URL}/iex-data/quote/${symbol}`;
      return fetch(url).then((res) => {
        return res.json();
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
    this.fetchUsers();
    eventBus.$on('add-stock-to-user-list', (selectedStock) => {
      StocksService.postStock(selectedStock).then((res) => {});
      this.updateStockList(this.listOfUserHeldStocks, selectedStock);
    });
    eventBus.$on('login-user', (selectedUser) => {
      this.userName = selectedUser;
      this.fetchStocks(this.userName);
    });
    eventBus.$on('logout-user', () => {
      this.userName = '';
      this.listOfUserHeldStocks = [];
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
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

body {
  background-color: rgb(233, 231, 231);
}

.container {
  justify-content: center;
  display: flex;
  margin: 0;
  background-color: #262629;
  height: 1000px;
}

.top-info {
  padding-left: 20px;
  background-color: lightgrey;
}

.login-out-button {
  height: 30px;
  width: 70px;
  float: right;
  margin-top: 7px;
  margin-right: 15px;
}

/* footer {
  background-color: #262629;
  width: 100%;
  height: 166px;
  position: absolute;
  bottom: 0;
  left: 0;

  flex: none;
} */
</style>
