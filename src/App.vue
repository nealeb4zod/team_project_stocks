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
      listOfUserHeldStocks: [],
    };
  },
  methods: {
    getStockInfo() {},
  },
  mounted() {},
  computed: {
    totalValue() {},
  },
};
</script>

<style></style>
