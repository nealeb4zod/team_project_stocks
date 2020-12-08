<template>
  <div>
    <h2>Logged in User: {{ userName }}</h2>
  </div>
</template>

<script>
export default {
  name: 'user-box',
  props: ['userName'],
};
</script>

<style></style>
