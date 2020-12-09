<template>

  <div class="login-form">
    <form v-on:submit.prevent="loginUser" class="flex-form">
      <label for="user-name"> Welcome </label><br><br>
      <select name="user-name" id="user-name" v-model="selectedUser">
        <option v-for="(user, index) in userList" :key="index" :value="user">{{
          user
        }}</option>
      </select>
      <div id='login-button-div'>
      <input type="submit" class="login-button" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'login-box',
  props: ['userList'],
  data() {
    return {
      selectedUser: '',
    };
  },
  methods: {
    loginUser() {
      eventBus.$emit('login-user', this.selectedUser);
    },
  },
};
</script>

<style>
.login-form{
  align-content: center;
}
.login-button-div{
  align-content:center;
}

.login-button{
  margin-top: 48px;
}
</style>
