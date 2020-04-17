<template>
  <div class="tableBox">
    <div class="title">
      <!-- <div class="allocation" v-if="allocationData">
        <span>已选条{{Items.length}}数</span>
        <Signin v-if="allocationData == '签到'" :btnSignin="true" :Items="Items" style="display: inline-block;padding-left: 15px;"/>
        <Button v-if="allocationData == '删除'" class="btn" type="primary" @click="batchSignIn">批量删除</Button>
        <Allocation
          @refresh="refresh"
          :Items="Items"
          v-if="allocationData == '分配'"
          class="btn"
          :title="'批量分配'"
        />
      </div> -->
      <div class="select" v-if="selectData">
        <Select v-model="model1">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <NewCourse v-if="newCourse" />
    </div>
    <Table
      height="400"
      @on-selection-change="selectItem"
      border
      ref="selection"
      :columns="columns"
      :data="dataList"
    ></Table>
  </div>
</template>
<script>
import qs from "qs";

export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    // 判断是否显示每页条数
    selectData: {
      type: Boolean,
      required: false
    },
    // 判断是否显示分配按钮
    allocationData: {
      type: String,
      required: false
    },
    page_num: {
      type: String,
      required: false
    },
    newCourse: {
      type: Boolean,
      required: false
    },
    empty: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      cityList: [
        {
          value: "10",
          label: "每页显示10条"
        },
        {
          value: "20",
          label: "每页显示20条"
        },
        {
          value: "30",
          label: "每页显示30条"
        },
        {
          value: "40",
          label: "每页显示40条"
        },
        {
          value: "100",
          label: "每页显示100条"
        }
      ],
      model1: "10",
      number: 0, // 选择条数
      Items: [], // 选中的所有信息
      value: "2"
    };
  },
  watch: {
    model1(val) {
      this.$emit("pageNums", val);
    },
    // 监控每页条数，清空formdata自动变更
    page_num(val) {
      this.model1 = val;
    },
    // 切换页面，清空选中状态计数
    empty() {
      this.Items = [];
    }
  },
  methods: {
    // 批量签到
    batchSignIn() {

    },
    // 分配完毕，刷新页面
    refresh() {
      this.$emit("refresh");
    },
    // 选择整行信息
    selectItem(selection) {
      this.Items = selection;
    }
  }
};
</script>

<style scoped>
.tableBox {
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
}
.ivu-table-wrapper {
  /* width: 200%; */
  /* position: relative; */
  margin-top: 1px;
}
/* title */
.title {
  /* width: 200%; */
  height: 60px;
  background-color: #f3f3f3;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
}
/* 条数选择器 */
.select {
  float: right;
  margin-top: 18px;
  margin-right: 8px;
  width: 160px !important;
}

/* 分配 */
.allocation {
  float: left;
  line-height: 60px;
  /* width: 200px !important; */
  /* text-align: left; */
  overflow: hidden;
  padding-left: 8px;
}
.btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background-color: #169bd5;
  border-radius: 5px;
  float: right;
  color: #fff;
  text-align: center;
  margin-left: 6px;
  padding: 0;
  /* 强行居中，最为致命 */
  margin-top: 13px;
}
</style>
<style>
.demo-table-info-cell-firstCall {
  color: #008000 !important;
}
</style>
