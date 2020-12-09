<template>
  <div>
    <div class="stock-header">
      <div>
        Symbol:
      </div>
      <div>
        Name:
      </div>
      <div>
        Quantity:
      </div>
      <div>
        Purchased Price:
      </div>
      <div>
        Purchased date:
      </div>
      <div>
        Current Price:
      </div>
      <div>
        Stock Value:
      </div>
    </div>

    <individual-stock
      v-for="(stock, index) in listOfUserHeldStocks"
      :key="index"
      :stock="stock"
    ></individual-stock>
  </div>
</template>

<script>
import IndividualStockVue from './IndividualStock.vue';

export default {
  name: 'list-of-stocks',
  props: ['listOfUserHeldStocks'],
  components: {
    'individual-stock': IndividualStockVue,
  },
};
</script>

<style>
.stock-table {
  display: grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 20px;
  background-color: white;
}
.stock-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding-top: 10px;
  padding-left: 20px;
  display: grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  background-color: white;
  padding-bottom: 15px;
  margin-top: 30px;
}

.stock-table:hover {
  font-size: 16.5px;
  text-decoration: bold;
  display: grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
}
</style>
