
<template>
  <div v-html="payGateWay">{{payGateWay}}</div>
</template>
<script>
import store from '../../store/index'
export default {
  name: "payGateWay",
  data() {
    return {
      payGateWay: ""
    };
  },
  mounted() {
    let form = store.state.payType;
    this.payGateWay = form;
    // this.$nextTick(() => {
    //   document.getElementById("paymentSubmit").submit();
    // });
  }
};
</script>