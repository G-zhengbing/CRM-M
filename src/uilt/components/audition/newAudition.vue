<template>
  <div class="newAudition">
    <Button type="primary" @click="modal1 = true">新建预约</Button>
    <Modal
      v-model="modal1"
      title="新建预约试听"
      @on-ok="ok"
      @on-cancel="cancel"
      width="40"
      class-name="vertical-center-modal-1"
    >
      <div class="content">
        <!-- 时间段表格 -->
        <TimeTable
          :TimeSwitch="TimeSwitch"
          @closeTime="closeTime"
          @userSelectTime="userSelectTime"
        />
        <!-- 表单 -->
        <Form :model="formItem" :label-width="100">
          <FormItem label="预约试听类型">
            <RadioGroup v-model="formItem.type">
              <Radio label="4">一对一</Radio>
              <Radio label="1">班课</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="预约课程">
            <Input v-model="formItem.course_name" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="年级">
            <Select v-model="formItem.grade">
              <Option :value="index" v-for="(item,index) in gradeList" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="科目">
            <Select v-model="formItem.subject">
              <Option :value="index" v-for="(item,index) in subjectList" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="试听课日期">
            <DatePicker
              v-model="formItem.date_time"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              @on-change="changeCurriculumTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="试听课时段">
            <Input
              v-model="formItem.time_block"
              placeholder="选择时间范围"
              @on-focus="selectTime"
              @on-blur
            ></Input>
          </FormItem>
          <FormItem label="老师">
            <Select v-model="formItem.coach_id" @on-open-change="getTeacherList">
              <Option :value="item.id" v-for="item in teacherDataList" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注">
            <Input
              v-model="formItem.note"
              type="textarea"
              placeholder="请输入"
              :autosize="{minRows: 4,maxRows: 5}"
            ></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { AVAILABLECOACHLIST, APPOINTSTORE } from "@/uilt/url/url";
import qs from "qs";
import TimeTable from "./timeTable";
export default {
  components: {
    TimeTable
  },
  props: {
    row: {
      type: [Object, String],
      required: false
    },
  },
  computed: {
    ...mapState({
      subjectList: state => state.selectState.subject,
      gradeList: state => state.selectState.grade,
      userDataList: state => state.currentPage.dataList
    })
  },
  data() {
    return {
      modal1: false,
      TimeSwitch: false,
      formItem: {
        type: "",
        course_name: "",
        grade: "",
        subject: "",
        date_time: "",
        time_block: "",
        coach_id: "",
        note: "",
        // sector_type: "2" // 必填，定死是2
      },
      teacherDataList: []
    };
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    // 获取老师数据
    async getTeacherList() {
      let res = await this.$request({
        method: "get",
        url: AVAILABLECOACHLIST,
        params: {
          ...this.formItem
        }
      });
      this.teacherDataList = res.data.data;
    },
    // 获取用户选择的时候参数
    userSelectTime(index) {
      this.formItem.time_block = index;
    },
    // 关闭选择试听时段
    closeTime(val) {
      this.TimeSwitch = val;
    },
    // 点击开启选择试听时段
    selectTime() {
      this.TimeSwitch = true;
    },
    // 时间格式转换
    changeCurriculumTime(val) {
      this.formItem.date_time = val;
    },
    // 点OK
    async ok() {
      let res = await this.$request({
        method: "post",
        url: APPOINTSTORE,
        data: qs.stringify(this.formItem)
      });
      this.formItem = {};
      this.setRefresh(true)
    },
    // 点取消
    cancel() {
      this.formItem = {};
    }
  },
  created() {
    this.formItem.account_id = this.row.account_id
  }
};
</script>

<style scoped>
.content {
  height: 400px;
  overflow: auto;
}
.ivu-form-item {
  width: 95%;
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