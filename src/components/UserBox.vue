<template>
  <div class="top-info">
    <h2>Welcome, {{ userName }}.</h2>
  </div>
</template>

<script>
export default {
  name: 'user-box',
  props: ['userName'],
};
</script>

<style>
#user-box {
  padding-bottom: 10px;
}
</style>
