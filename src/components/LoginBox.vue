<template>
  <div>
    <form v-on:submit.prevent="loginUser" class="flex-form">
      <label for="user-name">User Name:</label>
      <select name="user-name" id="user-name" v-model="selectedUser">
        <option v-for="(user, index) in userList" :key="index" :value="user">{{
          user
        }}</option>
      </select>
      <input type="submit" value="Login" />
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

<style></style>
