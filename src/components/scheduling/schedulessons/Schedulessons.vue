<template>
  <div class="box" ref="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <Form :model="form" :label-width="30">
              <Row>
                 <Col span="3">
                  <FormItem
                    <Input v-model="form.course_name" placeholder="课程名称" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem>
                    <Select v-model="form.course_type" @on-change="seekClick" placeholder="授课类型">
                      <Option :value="i" v-for="(list,i) in courseType" :key="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem>
                    <Select v-model="form.status" @on-change="seekClick" placeholder="课程状态">
                      <Option :value="1">待上课</Option>
                      <Option :value="2">上课中</Option>
                      <Option :value="3">已结束</Option>
                      <Option :value="4">已取消</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startAccount"
                        type="date"
                        placeholder="上课日期"
                        @on-change="getTimes"
                      ></DatePicker>
                      <DatePicker
                        v-model="endAccount"
                        type="date"
                        placeholder="上课日期"
                        @on-change="getTimes"
                      ></DatePicker>
                    </div>
                  </FormItem>
                </Col>
                <Col span="4" style="text-indent: 60px">
                  <Button type="primary" @click="clear">清除</Button>
                </Col>
              </Row>
            </Form>
            <Table border :columns="columns" :data="lessonsList"></Table>
            <Page
              @on-change="pageChange"
              :total="total"
              :current="currentPage"
              :page-size="pageSize"
              show-total
              show-elevator
              class="ive-page"
            />
          </div>
        </div>
      </div>
    </section>
    <Loading v-show="isLoading" />
    <Lessonsmessage :type="type" v-if="show" />
  </div>
</template>

<script>
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Lessonsmessage from "./Lessonsmessage";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "schedulessons"
);
export default {
  components: {
    Loading,
    Lessonsmessage
  },
  mounted() {
    this.getLessonsList({});
  },
  computed: {
    ...mapState(["lessonsList", "currentPage", "pageSize", "total"])
  },
  data() {
    return {
      courseType:storage.getDaiban().screen_list.course_type,
      startAccount:'',
      endAccount:'',
      show: false,
      type: {},
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "课节名称", key: "course_name" },
        { title: "授课类型", key: "course_type" },
        { title: "状态", key: "status" },
        { title: "星期", key: "week_day" },
        { title: "开课日期", key: "lesson_date" },
        { title: "开课时间", key: "lesson_time" },
        { title: "授课教师", key: "coach_name" },
        { title: "创建时间", key: "create_time" }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["getLessonsList"]),
    //编辑
    update(item) {
      this.isUpdate = true;
      this.type.classify = "createdCourse";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.show = true;
    },
    //清空选线
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
      this.startAccount = "";
      this.endAccount = "";
      this.seekClick();
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getLessonsList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getLessonsList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    },
    //设置返回的时间
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    //操作日期
    getTimes() {
      if (this.startAccount && this.endAccount) {
        this.form.lesson_time_start = this.datePicker(this.startAccount);
        this.form.lesson_time_end = this.datePicker(this.endAccount);
        this.seekClick();
      }
    }
  }
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>