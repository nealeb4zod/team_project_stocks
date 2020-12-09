<template>
  <div class="login-form">
    <form v-on:submit.prevent="loginUser" class="flex-form">
      <h4>Login:</h4>
      <br />
      <label for="user-name">User Name:</label>
      <select name="user-name" id="user-name" v-model="selectedUser">
        <option v-for="(user, index) in userList" :key="index" :value="user">{{
          user
        }}</option>
      </select>
      <input type="submit" class="login-out-button" value="Login" />
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
.flex-form {
  display: flex;
  flex-flow: column;
  width: 70%;
}

.flex-form > input {
  margin: 0;
}

.login-form {
  margin-top: 100px;
  background: white;
  color: black;
  height: 400px;
  width: 300px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 25px;
  text-align: left;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

#user-name {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
