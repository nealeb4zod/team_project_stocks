<template>
  <div id="container">
<highcharts class="stock" :constructor-type="stockChart" :options="stockOptions"></highcharts>
  </div>
</template>

<script>

export default {
  name: 'individual-stock-graph',
  // props: ['options'],
  data () {
    return {
      stockOptions: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: 'AAPL Stock Price'
        },
        series: [{
          symbol: 'AAPL',
          data: [10, 20, 10, 23, 65, 121, 44, 66, 98, 30, 32, 56, 25, 12, 53],
          pointStart: '2019-12-06',
          pointInterval: 1000 * 3600 * 24,
          tooltip: {
            valueDecimals: 2
          }
        }]
      }
    }
  },

  mounted() {
  }
};
</script>

<style scoped>
.stock {
  display: noflex;
  width: 70%;
  margin: 0 auto
}</style>
