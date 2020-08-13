<template>
  <div class="box">
    <!-- <canvas ref="canvas"></canvas> -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
      <polygon
        points="100,10 40,180 190,60 10,60 160,180"
        style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"
      />
    </svg>-->
    <video
      style="width:200px"
      :loop="true"
      poster="../../assets/logo.png"
      :muted="true"
      controls
      :autoplay="false"
      controlslist="nodownload"
      src="../../assets/hzw.mp4"
    ></video>
  </div>
</template>

<script>
export default {
  mounted() {
    // var canvas = this.$refs.canvas.getContext("2d");
    // //图片
    // var img = new Image();
    // img.src = "../../assets/img/beijing/png8.png";
    // canvas.drawImage(img, 0, 0);
    //渐变
    // var grd = canvas.createLinearGradient(0,0,170,50)
    // grd.addColorStop(0,'red')
    // grd.addColorStop(1,'pink')
    // canvas.fillStyle = grd
    // canvas.fillRect(0,0,175,50)
    //圆
    // canvas.fillStyle = '#ff0000'
    // canvas.beginPath()
    // canvas.arc(20,18,15,0,Math.PI*2,true)
    // canvas.closePath()
    // canvas.fill()
    //矩形
    // canvas.fillStyle = '#ccc'
    // canvas.fillRect(0,0,160,80)
    // canvas.moveTo(10,10)
    // canvas.lineTo(150,30)
    // canvas.lineTo(10,30)
    // canvas.closePath(10,50)
    // canvas.stroke()
  }
};
</script>

<style scoped>
</style>