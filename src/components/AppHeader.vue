<template>
  <div>
    <div id="header">
      <img src="../assets/Investably_logo.svg" alt="" />
      <h1>investably</h1>
    </div>
    <button
      v-if="!(userName === '')"
      v-on:click="logoutUser"
      class="login-out-button"
    >
      Logout
    </button>
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
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
#header > h1 {
  color: #94caf0;
  padding-bottom: 20px;
}

img {
  width: 150px;
  /* padding: 8px; */
  margin: 40px;
}

#app-header {
  background-color: #262629;
  justify-content: center;
}
</style>
