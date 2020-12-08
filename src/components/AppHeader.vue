<template>
  <div id="header">
    <img src="../assets/logo.png" alt="" />
    <h1>Investably</h1>
    <button v-if="!(userName === '')" v-on:click="logoutUser">Logout</button>
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
}
</style>
