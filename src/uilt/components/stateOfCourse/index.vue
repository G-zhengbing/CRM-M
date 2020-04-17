<template>
  <div class="stateOfCourse">
    <i-switch size="large">
      <span slot="open">上架</span>
      <span slot="close">下架</span>
    </i-switch>
  </div>
</template>

<script>
export default {
  props: {
    userIndex: {
      type: Number,
      required: false
    }
  }
};
</script>

<style>
</style>