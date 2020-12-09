<template>
  <div>
    <h4>Current value: {{(100 * totalValue - (100 * totalValue % 1)) / 100 }}</h4>
  </div>
</template>

<script>
export default {
  name: 'total-value',
  props: ['totalValue'],
};
</script>

<style></style>
