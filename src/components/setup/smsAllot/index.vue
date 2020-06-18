<template>
  <div class="smsAllot">
    <div class="title">
      <span>每月分配上限：</span>
      <Input v-model="value" placeholder="请输入上限" style="width: 300px" />
      <p style="color: #ccc;margin-top:10px">注：编辑框为空或0则表示无上限</p>
    </div>
    <div class="content">
      <div class="content_title">
        <ul>
          <li v-for="item in 5">
            <div>姓名</div>
            <div>每月条数</div>
          </li>
        </ul>
      </div>
      <div class="content_main">
        <ul>
          <li v-for="item in data1">
            <div>{{item.login_name}}</div>
            <Input v-model="item.weight" @on-blur="changeNum(item)" placeholder="100" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      data1: [
        {
          login_name: "刘畅",
          weight: 12
        }
      ]
    };
  },
  methods: {
    // 修改每月条数
    async changeNum() {}
  }
};
</script>

<style scoped>
.smsAllot {
  padding: 20px;
  margin-top: 20px;
}

/* 自定义表格 */
.content {
	margin-top: 10px;
}
.content ul {
  width: 100%;
  display: flex;
}
.content_title ul li {
  flex: 1;
}
.content_title ul li div {
  flex: 1;
}
.content ul li {
  display: flex;
  width: 20%;
}
.content ul li div {
  /* width: 80px; */
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdee2;
  text-align: center;
  background-color: #f8f8f9;
  overflow: hidden;
}

.content_main ul {
  height: 450px;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}

.content_main input {
  height: 30px;
}
</style>