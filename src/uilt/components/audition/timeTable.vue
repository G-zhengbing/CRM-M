<template>
  <Modal v-model="modal1" width="60" title="选择试听课时段" @on-ok="ok" @on-cancel="cancel" class-name="vertical-center-modal-1">
    <div class="comtent">
      <div class="timeTable">
        <ul class="title">
          <li>时间段</li>
          <li>周一</li>
          <li>周二</li>
          <li>周三</li>
          <li>周四</li>
          <li>周五</li>
          <li>周六</li>
          <li>周日</li>
        </ul>
        <ul class="fll">
          <li v-for="item in timeData">{{item}}</li>
        </ul>
        <ul class="week">
          <li
            v-for="item in dataList"
            @click="selectTab(item-1)"
            :class="{'select': selectData == item-1 ? true : false}"
          >{{item-1}}</li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    TimeSwitch: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      modal1: this.TimeSwitch,
      timeData: [
        "00:00 - 00:30",
        "00:30 - 01:00",
        "01:00 - 01:30",
        "01:30 - 02:00",
        "02:00 - 02:30",
        "02:30 - 03:00",
        "03:00 - 03:30",
        "03:30 - 04:00",
        "04:00 - 04:30",
        "04:30 - 05:00",
        "05:00 - 05:30",
        "05:30 - 06:00",
        "06:00 - 06:30",
        "06:30 - 07:00",
        "07:00 - 07:30",
        "07:30 - 08:00",
        "08:00 - 08:30",
        "08:30 - 09:00",
        "09:00 - 09:30",
        "09:30 - 10:00",
        "10:00 - 10:30",
        "10:30 - 11:00",
        "11:00 - 11:30",
        "11:30 - 12:00",
        "12:00 - 12:30",
        "12:30 - 13:00",
        "13:00 - 13:30",
        "13:30 - 14:00",
        "14:00 - 14:30",
        "14:30 - 15:00",
        "15:00 - 15:30",
        "15:30 - 16:00",
        "16:00 - 16:30",
        "16:30 - 17:00",
        "17:00 - 17:30",
        "17:30 - 18:00",
        "18:00 - 18:30",
        "18:30 - 19:00",
        "19:00 - 19:30",
        "19:30 - 20:00",
        "20:00 - 20:30",
        "20:30 - 21:00",
        "21:00 - 21:30",
        "21:30 - 22:00",
        "22:00 - 22:30",
        "22:30 - 23:00",
        "23:00 - 23:30",
        "23:30 - 24:00",
      ],
      dataList: 336,
      // 选中的
      selectData: -1
    };
  },
  watch: {
    selectData: {
      deep: true,
      handler(newName, oldName) {}
    },
    // 解决子组件修改props值报错问题
    TimeSwitch(val) {
      this.modal1 = val;
    }
  },
  methods: {
    selectTab(index) {
      this.selectData = index
    },
    // 点OK
    ok() {
      this.$emit("closeTime", false);
      this.$emit("userSelectTime", this.selectData);
    },
    // 点取消
    cancel() {
      this.$emit("closeTime", false);
    }
  }
};
</script>

<style scoped>
.comtent {
  height: 600px;
  overflow: auto;
}
.timeTable {
  margin: 0 auto;
  width: 801px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
}
.title {
  overflow: hidden;
}
.fll {
  float: left;
}
.title li {
  float: left;
}
ul > li {
  width: 100px;
  /* background-color: #ccc; */
  border: 1px solid #ccc;
  border-bottom: 0;
  border-right: 0;
  text-align: center;
}
.week {
  height: 1040px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
}
/* 选中状态 */
.select {
  background: #007acc;
  color: #ccc;
}
</style>

<style>
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>