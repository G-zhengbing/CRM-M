<template>
  <div>aaa</div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
			pid:this.$route.params.id
		};
  },
  mounted() {
    var url = window.location.href;
    if (url.split("?").length > 1) {
			store.commit("setCode", url.split('?')[1].split('&')[0].split('=')[1]);
			this.$router.push({path:`/order/${this.pid}`})
    }
  }
};
</script>

<style>
</style>