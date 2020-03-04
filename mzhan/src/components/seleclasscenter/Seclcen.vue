<template>
  <div class="box">
    <scroller>
      <div class="header">
        <img @click="goHome" src="../../assets/img/fan.png" alt />
        <span>选课中心</span>
      </div>
      <div class="header-bottom">
        <p>选择年级</p>
        <p>正在招生</p>
      </div>
      <van-tabs @click="onClick">
        <van-tab title="数学">
          <ul>
            <li>
              <div class="title">
                <div class="title-top">
                  <span class="tag">数学</span>
                  <span class="classify">初一数学春季班</span>
                </div>
								<div class="title-bottom">
									<p>2020-02-06～2020-02-20</p>
									<p>
										<span>每周五</span> <i>10:30～12:00</i>
									</p>
								</div>
              </div>
              <div class="money">
								<img src="../../assets/logo.png" alt="">
								<i>111</i>
                <!-- <i v-if="item.update_state == 1">更新中</i>
                <i v-if="item.update_state == 2">已完结</i> -->
                <span>
                  <span>￥</span>
									{{1111}}
                  <!-- {{item.activity_price == "0.00"?item.sale_price:item.activity_price}} -->
                </span>
              </div>
            </li>
            <!-- <li @click="goXiangqing(item.id)" v-for="(item,i) in smallList">
              <div class="title">
                <div class="title-top">
                  <span class="tag">{{item.subject}}</span>
                  <span class="classify">{{item.course_name}}</span>
                </div>
              </div>
              <div class="money">
                <i v-if="item.update_state == 1">更新中</i>
                <i v-if="item.update_state == 2">已完结</i>
                <span>
                  <span>￥</span>
                  {{item.activity_price == "0.00"?item.sale_price:item.activity_price}}
                </span>
              </div>
            </li>-->
          </ul>
        </van-tab>
        <van-tab title="语文">内容 2</van-tab>
        <van-tab title="英语">内容 3</van-tab>
        <van-tab title="物理">内容4</van-tab>
        <van-tab title="地理">内容 5</van-tab>
      </van-tabs>
    </scroller>
  </div>
</template>

<script>
export default {
  methods: {
    onClick(name, title) {
      this.$toast(title);
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.money img{
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-left: 30px;
}
.title-bottom p{
	color: #999;
	margin: 20px 0 20px 10px;
}
.money > span {
  margin-right: 20px;
  font-size: 24px;
  color: #ee7428;
}
.money > i {
  font-size: 20px;
  color: #333;
  font-style: normal;
  display: inline-block;
  margin-right: 20px;
  flex: 1;
  margin-left: 20px;
}
.money {
  flex: 1;
  display: flex;
	align-items: center;
	border-top: 1px solid #DCDCDC;
}
.classify {
  width: 3.778rem;
  height: 0.32rem;
  color: #333;
  margin-top: 8px;
  font-size: 22px;
  margin-left: 20px;
  line-height: 20px;
}
.tag {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 22px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
  margin-top: 8px;
  margin-left: 10px;
}
.title-top {
  display: flex;
  align-items: center;
}
.title {
  padding: 0.266667rem;
}
ul {
  display: flex;
  flex-direction: column;
  margin: 0 0.266667rem;
}
li {
  width: 100%;
  height: 280px;
  background: #fff;
  border-radius: 0.126667rem;
  position: relative;
  margin-bottom: 0.233333rem;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.026667rem 0.053333rem 0 rgba(29, 29, 29, 0.15);
  border-radius: 0.08rem;
}
li:first-child {
  margin-top: 30px;
}
i {
  font-style: normal;
}
.header-bottom p:last-child {
  margin: 20px 40px 20px 20px;
}
.header-bottom p:first-child {
  margin: 20px 20px 20px 40px;
}
.header-bottom p {
  height: 70px;
  box-sizing: border-box;
  border: 1px solid #ff6b00;
  flex: 1;
  margin: 20px 40px;
  font-size: 0.4rem;
  color: #ff6b00;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
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
  background: #f3f3f3;
  width: 100%;
  display: flex;
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