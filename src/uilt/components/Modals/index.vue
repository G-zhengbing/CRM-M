<template>
  <div class="Modals">
		<CreatedOrder :v-if="type == 'CreatedOrder'" :showMod="showMod" :row="row" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    showMod: {
      type: Boolean,
      required: true
    },
  }
};
</script>

<style>
</style>