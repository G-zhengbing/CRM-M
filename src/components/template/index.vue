<template>
  <div class="box">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
	mounted(){
		console.log(this.$refs.canvas)
		var canvas = this.$refs.canvas.getContext('2d')
		// canvas.fillStyle = '#ccc'
		// canvas.fillRect(0,0,160,80)
		canvas.moveTo(10,10)
		canvas.lineTo(150,30)
		canvas.lineTo(10,30)
		// canvas.closePath(10,50)
		canvas.stroke()
	}
};
</script>

<style scoped>

</style>