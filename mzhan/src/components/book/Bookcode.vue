<template>
  <div class="box">
    <scroller>
      <div class="header">
        <!-- <img @click="" src="../../../src/assets/img/fan.png" alt /> -->
        <span>书籍名称</span>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box{
  background: #f3f3f3;
}
.header > span {
  font-size: 30px;
  color: #333;
  text-align: center;
  flex: 1;
  margin-left: -40px;
}
.header {
  height: 110px;
  display: flex;
  align-items: center;
  background: #fff;
}
.header-bottom {
  height: 15px;
  background: #f3f3f3;
  width: 100%;
}
.header img {
  width: 44px;
  height: 24px;
  transform: rotate(180deg);
  margin-left: 40px;
  width: 24px;
  height: 40px;
}
</style>