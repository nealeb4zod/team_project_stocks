<template>
  <div id="container">
    <highcharts class="stock" :options="stockOptions">
      
    </highcharts>
  </div>
</template>

<script>
// needed imports to make the page responsive
import { eventBus } from '@/main.js'
// import StockService from '@/services/StockService.js'

export default {
  name: 'individual-stock-graph',
  props: ['stock'],
  data () {
    return {
      // title: this.stock.symbol,
      // closeValues: [],
     
      stockOptions: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: this.stock.name
        },
        yAxis: {
          title: {
            text: 'Stock price'
          }
        },
        xAxis: {
          title: {
            text: 'Working days from today'
          }
        },
        series: [{
          symbol: this.stock.symbol,
          data: [],
          pointStart: -18,
          pointInterval: 1,
          tooltip: {
            valueDecimals: 1
          }
        }]
        
      }
    }
  },

  mounted() {
    this.getStockQuote(this.stock.symbol)
    
  },
  methods: {
    getStockQuote(symbol) {
      let url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${process.env.VUE_APP_IEX_API_TOKEN}`;

      return fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.stockOptions.series[0].data = data.map((closeValue) =>{
            return closeValue.close;

          })
        });
    },
  }
};
</script>

<style scoped>


</style>
