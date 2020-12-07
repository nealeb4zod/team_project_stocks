<template>
  <div class="demo">
    <form v-on:submit.prevent="addStockToUserList" id="autocomplete-form">
      <div class="autosuggest-container">
        <vue-autosuggest
          ref="auto-suggest"
          v-model="query"
          :limit="10"
          :suggestions="filteredOptions"
          @selected="onSelected"
          :get-suggestion-value="getSuggestionValue"
          :input-props="{
            id: 'autosuggest__input',
            placeholder: 'Start typing a stock name/symbol...',
          }"
        >
          <div
            slot-scope="{ suggestion }"
            style="display: flex; align-items: center;"
          >
            <div style="{ display: 'flex', color: 'navyblue'}">
              {{ suggestion.item.symbol }} - {{ suggestion.item.name }}
            </div>
          </div>
        </vue-autosuggest>
      </div>
      <div>
        <input
          id="quantity"
          type="number"
          v-model.number="quantity"
          name="quantity"
          placeholder="Quantity..."
        />
      </div>
      <div>
        <input
          id="purchasedPrice"
          type="number"
          v-model.number="purchasedPrice"
          name="purchasedPrice"
          placeholder="Purchased Price..."
        />
      </div>
      <div>
        <input type="date" name="date" id="date" v-model="date" />
      </div>
      <div>
        <input id="add-stock" type="submit" value="Add stock" />
      </div>
    </form>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';
import { eventBus } from '../main.js';
import StocksService from '../services/StocksService.js';

export default {
  name: 'search-box',
  components: {
    VueAutosuggest,
  },
  data() {
    return {
      symbols: [],
      query: '',
      selected: '',
      quantity: null,
      purchasedPrice: null,
      date: null,
      sectionConfigs: {
        default: {
          limit: 6,
        },
      },
    };
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.symbols.filter((option) => {
            return (
              option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
            );
          }),
        },
      ];
    },
  },
  mounted() {
    this.fetchSymbols();
  },
  methods: {
    onSelected(item) {
      this.selected = item.item;
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    addStockToUserList() {
      if (this.selected === '') {
        return;
      }
      let stockObject = {};
      stockObject.name = this.selected.name;
      stockObject.symbol = this.selected.symbol;
      stockObject.quantity = this.quantity;
      stockObject.purchasedPrice = this.purchasedPrice;
      stockObject.date = this.date;
      StocksService.postStock(stockObject).then((res) => {
        eventBus.$emit('add-stock-to-user-list', res);
        this.selected = this.query = '';
        this.quantity = this.date = null;
      });
    },
    fetchSymbols() {
      let url = `https://cloud.iexapis.com/stable/ref-data/symbols?token=${process.env.VUE_APP_IEX_API_TOKEN}`;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.symbols = data.map((symbol) => {
            let basicSymbol = {};
            basicSymbol.symbol = symbol.symbol;
            basicSymbol.name = symbol.name;
            return basicSymbol;
          });
        });
    },
  },
};
</script>

<style>
#quantity {
  padding: 0px;
  height: 31px;
  display: block;
}
#date {
  padding: 0px;
  height: 31px;
  display: block;
}
#add-stock {
  display: block;
  height: 35px;
}

#autocomplete-form {
  display: flex;
  flex-flow: row;
  align-items: space-between;
  margin: 10px;
}

input {
  width: 260px;
  padding: 0.5rem;
  margin-left: 10px;
}

ul {
  width: 100%;
  color: #7de38d;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
}
li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
li:hover {
  cursor: pointer;
}

.autosuggest-container {
  display: flex;
  justify-content: center;
}

#autosuggest {
  width: 100%;
  display: block;
}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}
</style>
