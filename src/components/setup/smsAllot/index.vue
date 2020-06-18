<template>
  <div class="smsAllot">
    <div class="title">
      <span>每月分配上限：</span>
      <Input v-model="value" placeholder="请输入上限" style="width: 300px" />
			<p style="color: #ccc;margin-top:10px">注：编辑框为空或0则表示无上限</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
		return {
			value: ""
		}
	}
};
</script>

<style scoped>
.smsAllot {
	padding: 20px;
	margin-top: 20px;
}
</style>