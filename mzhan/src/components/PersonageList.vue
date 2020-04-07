<template>
  <div class="box">
    <scroller>
      <div class="header">
        <img @click="goHome" src="../assets/img/fan.png" alt />
        <span>{{list.course_name}}</span>
      </div>
      <p class="header-bottom"></p>
      <ul>
        <li v-for="(item,i) in list.course_list">
          <i>{{item.value.split('T').length >1 ?item.value.split('T')[0] :item.value }}</i>
          <span>{{item.value2[0]== ''? '' : item.value2[0] + '-'}}{{item.value2[1] == "" ? '' :item.value2[1]}}</span>
          <p @click="goLearn(item.value3)" v-if="item.is_start == 2">
            进入学习
            <img src="../assets/img/fan.png" alt />
          </p>
          <p v-else>
            未开始
            <img src="../assets/img/fan.png" alt />
          </p>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import storeage from "../uilt/storage";
export default {
  mounted() {
    // console.log(this.list);
  },
  data() {
    return {
      list: storeage.getPersonageList()
    };
  },
  methods: {
    goHome() {
      this.$router.push("/personage");
    },
    goLearn(val) {
      window.location.href = val;
    }
  }
};
</script>

<style scoped>
ul li:last-child {
  /* border-bottom: none; */
}
ul li p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
ul li i {
  margin-right: 30px;
  font-size: 28px;
}
ul li span {
  flex: 1;
  display: inline-block;
  font-size: 28px;
}
ul li p img {
  width: 15px;
  margin-left: 20px;
}
ul li {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}
i {
  font-style: normal;
}
ul {
  display: flex;
  margin: 0 40px;
  flex-direction: column;
}
.header-bottom {
  height: 15px;
  background: #f3f3f3;
  width: 100%;
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