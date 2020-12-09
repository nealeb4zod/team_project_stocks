<template>
  <div id="container">
    <highcharts class="stock" :options="stockOptions"> </highcharts>
  </div>
</template>

<script>
// needed imports to make the page responsive
import { eventBus } from '@/main.js';
// import StockService from '@/services/StockService.js'

export default {
  name: 'individual-stock-graph',
  props: ['stock'],
  data() {
    return {
      // title: this.stock.symbol,
      // closeValues: [],

      stockOptions: {
        rangeSelector: {
          selected: 1,
        },
        title: {
          text: this.stock.name,
        },
        yAxis: {
          title: {
            text: 'Stock price',
          },
        },
        xAxis: {
            categories: [],
          title: {
            text: 'Working days from today',
          },
        },
        series: [
          {
            symbol: this.stock.symbol,
            data: [],
            pointStart: 0,
            pointInterval: 1,
            tooltip: {
              valueDecimals: 1,
            },
          },
        ],
      },
    };
  },

  mounted() {
    this.getStockQuote(this.stock.symbol);
  },
  methods: {
    getStockQuote(symbol) {
      let url = `http://localhost:3000/iex-data/chart/${symbol}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.stockOptions.series[0].data = data.map((filteredData) => {
            return filteredData.closeValue;
          });
          this.stockOptions.xAxis.categories = data.map((filteredData) => {
            return filteredData.closeValueDate;
          });
        });
    },
  },
};
</script>

<style scoped></style>
