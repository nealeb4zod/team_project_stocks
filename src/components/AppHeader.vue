<template>
  <div>
    <div id="header">
    <img src="../assets/Investably_logo.svg" alt="" />
    
  </div>
  <button v-if="!(userName === '')" v-on:click="logoutUser" class="submit-button">Logout</button>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'app-header',
  props: ['userName'],
  methods: {
    logoutUser() {
      eventBus.$emit('logout-user');
    },
  },
};
</script>

<style>
#header {
  display: flex;
  flex-flow: row;
  justify-content: center;
  margin: 0;
}

img {
  width: 150px;
  padding: 16px 16px 16px 16px;
}

/* #header {
  background-color: #262629;
} */
</style>
