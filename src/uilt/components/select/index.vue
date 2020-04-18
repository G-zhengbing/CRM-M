<template>
  <Form class="select" ref="formValidate" :model="formItem">
    <FormItem v-if="payingStudents">
      <Input v-model="formItem.order_sn" placeholder="订单编号" style="width: 80px;"></Input>
    </FormItem>
    <FormItem v-if="!studentName">
      <Input v-model="formItem.student_name" placeholder="学员姓名" style="width: 80px;"></Input>
    </FormItem>
    <FormItem v-if="!mobile">
      <Input v-model="formItem.mobile" placeholder="注册手机" style="width: 80px;"></Input>
    </FormItem>
    <FormItem v-if="auditionType">
      <Select v-model="formItem.type" placeholder="试听类型" style="width: 100px;">
        <Option :value="index" v-for="(item,index) in typeList" :key="index">{{item}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="condition">
      <Select v-model="formItem.appoint_status" placeholder="状态" style="width: 80px;">
        <Option :value="index" v-for="(item,index) in appoint_statusList" :key="index">{{item}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="!selectGrade">
      <Select v-model="formItem.grade" placeholder="选择年级" style="width: 100px;">
        <Option :value="index" v-for="(item,index) in gradeList" :key="index">{{item}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="payingStudents || chooseSubject" @click="getSubjectList">
      <Select
        v-model="formItem.subject"
        placeholder="选择科目"
        @on-open-change="getSubjectList"
        style="width: 100px;"
      >
        <Option :value="index" v-for="(item,index) in subjectList" :key="index">{{item}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="!classType">
      <Select
        v-model="formItem.class_type"
        placeholder="选择班级类型"
        @on-open-change="getClassTypeList"
        style="width: 120px;"
      >
        <Option :value="index" v-for="(item,index) in classTypeList" :key="index">{{item}}</Option>
      </Select>
    </FormItem>
    <!-- 接口暂时无法完善， -->
    <!-- <FormItem v-if="!lecturer">
      <Select v-model="formItem.lecturer" placeholder="主讲老师" style="width: 100px;">
        <Option value="chun">文文</Option>
        <Option value="qiu">艾艾</Option>
        <Option value="shu">妮妮</Option>
      </Select>
    </FormItem>-->
    <FormItem v-if="placeholder">
      <Select
        v-model="formItem.teacher_id"
        placeholder="班主任"
        @on-open-change="getClassTeacherList"
        style="width: 80px;"
      >
        <Option
          :value="item.teacher_id"
          v-for="item in classTeacherList"
          :key="item.teacher_id"
        >{{item.teacher_name}}</Option>
      </Select>
    </FormItem>
    
    <FormItem v-if="!classname">
      <Input v-model="formItem.course_name" placeholder="课程名称" style="width: 80px;"></Input>
    </FormItem>
    <FormItem v-if="courseType">
      <Select v-model="formItem.courseType" placeholder="课程类型" style="width:120px">
        <Option value="yi">一年级</Option>
        <Option value="er">二年级</Option>
        <Option value="san">三年级</Option>
      </Select>
    </FormItem>
    <FormItem v-if="chargeMode">
      <Select v-model="formItem.chargeMode" placeholder="收费模式" style="width:120px">
        <Option value="chun">语文</Option>
        <Option value="qiu">数学</Option>
        <Option value="shu">英语</Option>
      </Select>
    </FormItem>
    <FormItem v-if="courseState">
      <Select v-model="formItem.courseState" placeholder="课程状态" style="width:120px">
        <Option value="chun">春季班</Option>
        <Option value="qiu">秋季班</Option>
        <Option value="shu">暑假班</Option>
      </Select>
    </FormItem>
    <FormItem v-if="!allocateTime">
      <DatePicker
        v-model="formItem.allocateTime"
        type="datetimerange"
        placement="bottom-end"
        placeholder="分配时间 - 分配时间"
        style="width: 165px"
        @on-change="changeAllocateTimeDate"
      ></DatePicker>
    </FormItem>
    <FormItem v-if="turnOut">
      <Select
        v-model="formItem.class_attendance"
        placeholder="本周到课情况"
        style="width: 120px;"
        @on-open-change="getWeekClass"
      >
        <Option v-for="(item,index) in WeekClassList" :value="index" :key="index">{{item}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="turnOut">
      <Select
        v-model="formItem.delivery_of_work"
        placeholder="上周交作业情况"
        style="width: 120px;"
        @on-open-change="getHomeWork"
      >
        <Option v-for="(item,index) in HomeWorkList" :key="index" :value="index">{{item}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="teacherName">
      <Input v-model="formItem.teacherName" placeholder="教师姓名" style="width: 80px;"></Input>
    </FormItem>
    <FormItem v-if="teacherMobile">
      <Input v-model="formItem.teacherMobile" placeholder="联系方式" style="width: 80px;"></Input>
    </FormItem>
    <FormItem v-if="ProfessorSubject">
      <Select v-model="formItem.ProfessorSubject" placeholder="教授科目" style="width: 120px;">
        <Option value="dai">待确认</Option>
        <Option value="yijiao">已交</Option>
        <Option value="weijiao">未交</Option>
      </Select>
    </FormItem>
    <FormItem v-if="curriculumTime">
      <DatePicker
        v-model="formItem.curriculumTime"
        type="daterange"
        placement="bottom-end"
        placeholder="开课时间 - 开课时间"
        style="width: 165px"
      ></DatePicker>
    </FormItem>
    <FormItem v-if="firstState">
      <Select v-model="formItem.dial_up_situation" placeholder="首电呼出情况" style="width: 120px;">
        <Option value="1">已完成</Option>
        <Option value="2">进行中</Option>
        <Option value="3">超时</Option>
      </Select>
    </FormItem>
    <FormItem v-if="payingStudents">
      <DatePicker
        v-model="formItem.start_date"
        type="date"
        placeholder="开课时间"
        style="width: 120px;"
        @on-change="changeCurriculumTime"
      ></DatePicker>
    </FormItem>
    <FormItem v-if="!tradingHour">
      <DatePicker
        v-model="formItem.tradingHour"
        type="datetimerange"
        placement="bottom-end"
        placeholder="交易时间 - 交易时间"
        style="width: 165px"
        @on-change="changeDate"
      ></DatePicker>
    </FormItem>
    <!-- TODO: 拿到接口日期名字，可以使用on-change来注册事件进行转换格式 -->
    <FormItem v-if="courseDates">
      <DatePicker
        v-model="formItem.courseDates"
        type="datetimerange"
        placement="bottom-end"
        placeholder="上课日期 - 上课日期"
        @on-change="changeCourseData"
        style="width: 165px"
      ></DatePicker>
    </FormItem>
    <FormItem v-if="submissionTime">
      <DatePicker
        v-model="formItem.submissionTime"
        type="datetimerange"
        placement="bottom-end"
        placeholder="提交时间 - 提交时间"
        @on-change="changeSubmissionTime"
        style="width: 165px"
      ></DatePicker>
    </FormItem>
    <FormItem>
      <Button @click="deleteFormData" style="margin-left: 8px">清空选项</Button>
    </FormItem>
  </Form>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  props: {
    // 学员姓名
    studentName: {
      type: Boolean,
      required: false
    },
    // 注册手机
    mobile: {
      type: Boolean,
      required: false
    },
    // 首电呼出情况
    firstState: {
      type: Boolean,
      required: false
    },
    turnOut: {
      type: Boolean,
      required: false
    },
    // 付费学员页面
    payingStudents: {
      type: Boolean,
      required: false
    },
    // 主讲老师
    lecturer: {
      type: Boolean,
      required: false
    },
    // 课程名称
    classname: {
      type: Boolean,
      required: false
    },
    // 课程类型
    courseType: {
      type: Boolean,
      required: false
    },
    // 收费模式
    chargeMode: {
      type: Boolean,
      required: false
    },
    // 课程状态
    courseState: {
      type: Boolean,
      required: false
    },
    // 班主任
    placeholder: {
      type: Boolean,
      required: false
    },
    // 班级类型
    classType: {
      type: Boolean,
      required: false
    },
    // 选择科目
    chooseSubject: {
      type: Boolean,
      required: false
    },
    // 选择年级
    selectGrade: {
      type: Boolean,
      required: false
    },
    // 交易时间
    tradingHour: {
      type: Boolean,
      required: false
    },
    // 试听类型
    auditionType: {
      type: Boolean,
      required: false
    },
    // 状态
    condition: {
      type: Boolean,
      required: false
    },
    // 创建时间
    curriculumTime: {
      type: Boolean,
      required: false
    },
    // 上课日期
    courseDates: {
      type: Boolean,
      required: false
    },
    // 提交时间
    submissionTime: {
      type: Boolean,
      required: false
    },
    // 教师姓名
    teacherName: {
      type: Boolean,
      required: false
    },
    // 教师联系方式
    teacherMobile: {
      type: Boolean,
      required: false
    },
    // 教授科目
    ProfessorSubject: {
      type: Boolean,
      required: false
    },
    // 分配时间
    allocateTime: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    ...mapState({
      subjectList: state => state.selectState.subject,
      gradeList: state => state.selectState.grade,
      classTypeList: state => state.selectState.class_type,
      classTeacherList: state => state.selectState.classTeacher,
      WeekClassList: state => state.selectState.class_attendance,
      HomeWorkList: state => state.selectState.delivery_of_work,
      typeList: state => state.selectState.type,
      appoint_statusList: state => state.selectState.appoint_status
    })
  },
  data() {
    return {
      formItem: {
       
      }
      // subjectList: "", // 科目
      // gradeList: "", // 年级
      // classTypeList: "", // 班级类型
      // classTeacherList: "", // 班级类型
      // WeekClassList: "", // 本周到课情况
      // HomeWorkList: "" // 上周交作业情况
    };
  },
  watch: {
    formItem: {
      deep: true,
      handler(newName, oldName) {
        this.$emit("formData", newName);
      }
    }
  },
  methods: {
    changeCurriculumTime(time) {
      this.formItem.start_date = time;
    },
    // 转换date
    changeDate(time) {
      this.formItem.pay_start_time = time[0];
      this.formItem.pay_end_time = time[1];
    },
    // 转换date
    changeCourseData(time) {
      this.formItem.date_start_time = time[0];
      this.formItem.date_end_time = time[1];
    },
    // 转换date
    changeSubmissionTime(time) {
      this.formItem.create_start_time = time[0];
      this.formItem.create_end_time = time[1];
    },
    // 转换date
    changeAllocateTimeDate(time) {
      this.formItem.create_st_time = time[0];
      this.formItem.create_en_time = time[1];
    },
    // 点击清除选项
    deleteFormData() {
      this.formItem = {
        page: 1, // 页码
        page_num: "10" // 每页条数
      };
    },
    // 点击获取学科
    getSubjectList() {
      // this.subjectList = this.selectState.subject;
    },
    // 点击获取年级
    getGradeList() {
      // this.gradeList = this.selectState.grade;
    },
    // 点击获取班级类型
    getClassTypeList() {
      // this.classTypeList = this.selectState.class_type;
    },
    // 点击获取班主任
    getClassTeacherList() {
      // this.classTeacherList = this.selectState.classTeacher;
    },
    // 获取本周到课情况
    getWeekClass() {
      // this.WeekClassList = this.selectState.class_attendance;
    },
    // 获取上财交作业情况
    getHomeWork() {
      // this.HomeWorkList = this.selectState.delivery_of_work;
    }
  },
  created() {}
};
</script>
<style scoped>
form {
  /* width: 90%; */
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
}
.ivu-form-item {
  padding-left: 10px;
}
</style>
