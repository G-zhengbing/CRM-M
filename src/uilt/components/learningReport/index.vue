<template>
  <div class="learningReport">
    <!-- <span class="btnSpan" @click="changeState">学情报告</span> -->
    <Modal
      title="学情报告"
      v-model="modal10"
      class-name="vertical-center-modal-1"
      width="85"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <!-- 按钮模块 -->
      <div class="content">
        <NewReport :btn="true" :userId="titleList.id" />
        <!-- 用户信息模块 -->
        <div class="userMessage">
          <span
            class="userParticulars"
          >{{titleList.student_name || '未命名'}}&nbsp;&nbsp;|&nbsp;&nbsp;{{titleList.mobile}}&nbsp;&nbsp;|&nbsp;&nbsp;{{selectState.grade[titleList.grade]}}&nbsp;&nbsp;|&nbsp;&nbsp;{{selectState.subject[titleList.subject]}}&nbsp;&nbsp;|&nbsp;&nbsp;{{selectState.class_type[titleList.class_type]}}&nbsp;&nbsp;|&nbsp;&nbsp;{{titleList.course_name}}</span>
          <div class="classMessage">
            <div class="left">
              <div class="theClass">
                <span>已到课/已补上/应到课</span>
                <span>{{titleList.class_has_arrived}}/{{titleList.have_been_filled}}/{{titleList.it_should_be_in_class}}</span>
              </div>
              <div class="theJob">
                <span>已交/补交/应交作业</span>
                <span>{{titleList.hand_over_homework}}/{{titleList.eepaired_operation}}/{{titleList.assignment_work}}</span>
              </div>
            </div>
            <div class="right">
              <div class="breathe-number">
                <span>呼出次数</span>
                <span>{{titleList.connect_duration_count}}</span>
              </div>
              <div class="exhalationLength">
                <span>呼出总时长</span>
                <span>{{titleList.connect_duration}}</span>
              </div>
              <div class="learningReport">
                <span>学情报告</span>
                <span>{{learning_report_type == 1 ? '待填写' : '已完成'}}</span>
              </div>
            </div>
          </div>
          <div class="userMessageTab">
            <Table border :columns="classColumns" :data="dataClassList"></Table>
          </div>
        </div>
        <!-- 跟进记录模块 -->
        <div class="follow">
          <div class="title">
            <span>跟进记录</span>
          </div>
          <div class="followContent">
            <Table :columns="followColumns" :data="followDataList"></Table>
          </div>
        </div>
        <!-- 学情报告 -->
        <div class="learningReport">
          <div class="title">
            <span>学情报告</span>
          </div>
          <div class="LRContent">
            <Table :columns="LRColumns" :data="LRDataList"></Table>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { LEARNINGREPORT } from "@/uilt/url/url";
import qs from "qs";

export default {
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: false
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList,
      selectState: state => state.selectState,
      refresh: state => state.currentPage.refresh
    })
  },
  watch: {
    showMod(val) {
      this.modal5 = val;
    },
    refresh: {
      deep: true,
      handler(newName, oldName) {
        this.getUserData();
      }
    }
  },
  data() {
    return {
      modal10: this.showMod,
      classColumns: [
        {
          title: "学员姓名",
          key: "student_name",
          align: "center"
        },
        {
          title: "课节进度",
          key: "classSchedule",
          align: "center"
        },
        {
          title: "上课日期",
          key: "class_time",
          align: "center"
        },
        {
          title: "主讲老师",
          key: "lecturer",
          align: "center"
        },
        {
          title: "本周到课情况",
          key: "class_attendance",
          align: "center"
        },
        {
          title: "上周交作业情况",
          key: "delivery_of_work",
          align: "center"
        }
      ],
      dataClassList: [],
      followColumns: [
        {
          title: "回访内容",
          key: "visit_content",
          width: 800,
          className: "useBgc"
        },
        {
          title: "跟进人",
          key: "teacher_name",
          align: "center",
          className: "useBgc"
        },
        {
          title: "回访时间",
          key: "operation_time",
          width: 200,
          align: "center",
          className: "useBgc"
        }
      ],
      followDataList: [],
      LRDataList: [],
      LRColumns: [
        {
          title: "报告内容",
          key: "desc",
          width: 700
        },
        {
          title: "填写人",
          key: "teacher_name",
          width: 120,
          align: "center"
        },
        {
          title: "提交时间",
          key: "create_time",
          align: "center",
          width: 200
        },
        {
          title: "详情",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("NewReport", {
                props: {
                  type: "text",
                  size: "small",
                  userIndex: params.index
                },
                style: {
                  display: "inline",
                  padding: "4px"
                }
              })
            ]);
          }
        }
      ],
      mode: [],
      titleList: {},
      learning_report_type: ""
    };
  },
  methods: {
    confirm() {
      this.$emit("changeShowMod", false);
    },
    cancel() {
      this.$emit("changeShowMod", false);
    },
    ...mapMutations(["setCurrentPages", "setSelectState", "setLearningReport"]),
    // 点击按钮切换显示状态
    changeState() {
      // 切换是否显示页面
      this.modal10 = true;
      // 获取当前点击用户数据
      this.getUserData();
    },
    async getUserData() {
      this.mode.account_id = this.row.account_id;
      this.mode.product_id = this.row.product_id;

      let res = await this.$request({
        method: "post",
        url: LEARNINGREPORT,
        data: qs.stringify(this.mode)
      });
      this.titleList = res.data.data.title_data;
      this.dataClassList = res.data.data.class_data;
      this.dataClassList.map(item => {
        item.classSchedule =
          item.course_rate_of_progress + "/" + item.class_hour;
        item.class_attendance = this.selectState.class_attendance[
          item.class_attendance
        ];
        item.delivery_of_work = this.selectState.delivery_of_work[
          item.delivery_of_work
        ];
      });
      this.followDataList = res.data.data.follow_data;
      this.LRDataList = res.data.data.learning_report_data;
      this.learning_report_type = res.data.data.learning_report_type;
      // 子选项需要使用列表数据
      this.setLearningReport(this.LRDataList);
    }
  },
  created() {
    this.getUserData();
  }
};
</script>
	
<style scoped>
.btnSpan {
  cursor: pointer;
}
/* 设置高度 */
.content {
  height: 600px;
  overflow: auto;
}
/* 按钮样式 */
.select {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.select .thisWeek {
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #bababa;
  border-radius: 30px;
  color: #aeaeae;
  margin-right: 10px;
  cursor: pointer;
}
.select .thisMonth {
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #bababa;
  border-radius: 30px;
  color: #aeaeae;
  margin-right: 10px;
  cursor: pointer;
}
.pitchon {
  background: #aeaeae;
  color: #fff !important;
}
/* 用户信息 */
.userParticulars {
  display: block;
  margin: 20px 0;
}

.classMessage {
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  height: 70px;
  align-items: center;
}
.classMessage span {
  display: block;
  margin-bottom: 3px;
}
.classMessage .left {
  width: 300px;
  display: flex;
  text-align: center;
  justify-content: space-around;
}
.classMessage .right {
  width: 300px;
  display: flex;
  text-align: center;
  justify-content: space-around;
}
.userMessageTab {
  margin: 30px 0;
}
/* 跟进记录模块 */
.follow .title {
  height: 40px;
  line-height: 40px;
  background-color: #f2f2f2;
  padding-left: 20px;
}
.follow {
  margin: 30px 0;
}
/* 学情报告模块 */
.learningReport .title {
  height: 40px;
  line-height: 40px;
  background-color: #f2f2f2;
  padding-left: 20px;
}
</style>

<style>
.useBgc {
  background-color: #fff !important;
}
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>