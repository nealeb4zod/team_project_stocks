
<template>
  <div>
    <app-header :userName="userName"></app-header>
    <div class='container'>
      <div class='child'>
    <login-box element id='login-box' :userList="userList" v-if="userName === ''"></login-box>
    </div>
    </div>
    <div v-if="!(userName === '')">
    
      <user-box :userName="userName"></user-box>
    
      <total-value :totalValue="totalValue"></total-value>
      <search-box :userName="userName"></search-box>
      <list-of-stocks
        :listOfUserHeldStocks="listOfUserHeldStocks"
      ></list-of-stocks>
    </div>
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
      let url = `http://localhost:3000/iex-data/quote/${symbol}`;
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

body {
  background-color: #262629;
}

.container {
  display: flex;
  justify-content: center;

}

.child {
  padding: 250px;
  
}

.stock-table {
  margin-left: 20px;
  display: inline-grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
  padding-bottom: 15px;
  padding-top: 15px;

}
.stock-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
  scroll-padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid black;
  background-color: white;
  padding-bottom: 15px;
  margin-top: 30px;
}

.stock-table:hover{
    color: blue;
    font-size: 20px;
    text-decoration: bold;
    margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
}
.submit-button{
height: 30px;
width: 70px;
}
.stock{
  padding-bottom: 30px;
}
</style>
