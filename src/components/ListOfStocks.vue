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
.stock-table:hover {
  color: blue;
  font-size: 20px;
  text-decoration: bold;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 100px 250px 100px 150px 150px 150px 150px 200px;
}

.stock {
  padding-bottom: 30px;
}
</style>
