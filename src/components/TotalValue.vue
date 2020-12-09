<template>
  <div class="top-info">
    <h2>
      Total Value: {{ (100 * totalValue - ((100 * totalValue) % 1)) / 100 }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'total-value',
  props: ['totalValue'],
};
</script>

<style></style>
