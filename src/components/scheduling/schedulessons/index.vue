<template>
  <div>
    <div class="contaner">
      <Form :model="form">
        <Row class-name="exclusive">
          <Col span="3">
            <FormItem>
              <Input v-model="form.lesson_name" placeholder="课节名称" @on-change="seekClick"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Input v-model="form.student_name" @on-change="seekClick" placeholder="学员名称"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Input v-model="form.mobile" @on-change="seekMobile" placeholder="学员手机号"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Select @on-change="seekClick" v-model="form.grade" placeholder="年级">
                <Option :value="1">一年级</Option>
                <Option :value="2">二年级</Option>
                <Option :value="3">三年级</Option>
                <Option :value="4">四年级</Option>
                <Option :value="5">五年级</Option>
                <Option :value="6">六年级</Option>
                <Option :value="7">七年级</Option>
                <Option :value="8">八年级</Option>
                <Option :value="9">九年级</Option>
                <Option :value="10">高一</Option>
                <Option :value="11">高二</Option>
                <Option :value="12">高三</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Select v-model="form.subject" @on-change="seekClick" placeholder="科目">
                <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
              </Select>
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
              <Select v-model="form.status" @on-change="seekClick" placeholder="课状态">
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
                  v-model="form.lesson_time_start"
                  type="date"
                  placeholder="上课日期"
                  @on-change="getTimes"
                ></DatePicker>
                <DatePicker
                  v-model="form.lesson_time_end"
                  type="date"
                  placeholder="上课日期"
                  @on-change="getTimes"
                ></DatePicker>
              </div>
            </FormItem>
          </Col>
          <Col span="2">
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
    <Loading v-show="isLoading" />
    <Message :type="type" v-if="show" />
  </div>
</template>

<script>
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Message from "./Message";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "schedulessons"
);
export default {
  components: {
    Loading,
    Message
  },
  mounted() {
    this.form.lesson_time_start = this.datePicker(new Date())
    this.form.lesson_time_end = this.datePicker(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
    // console.log(this.form)
    this.isLoading = true;
    this.getLessonsList({
      form: this.form,
      page:1
    }).then(() => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState(["lessonsList", "currentPage", "pageSize", "total"])
  },
  data() {
    return {
      subjectList: storage.getDaiban().screen_list.subject,
      courseType: storage.getDaiban().screen_list.course_type,
      // startAccount: new Date(),
      // endAccount: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      show: false,
      type: {},
      isLoading: false,
      form: {
        lesson_time_start:this.datePicker(new Date()),
        lesson_time_end:this.datePicker(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      },
      columns: [
        { type: "selection", width: 60, fixed: "left" },
        { title: "课节名称", key: "lesson_name", width: "200", fixed: "left" },
        { title: "授课类型", key: "course_type", width: "100" },
        { title: "学员名称", key: "student_name", width: "100" },
        { title: "学员电话", key: "student_mobile", width: "130" },
        { title: "年级/科目", key: "grade_subject", width: "150" },
        // { title: "科目", key: "subject", width: "80" },
        { title: "状态", key: "status", width: "80" },
        { title: "上课日期", key: "lesson_date", width: "160" },
        { title: "上课时间", key: "lesson_time", width: "160" },
        { title: "授课教师", key: "coach_name", width: "185" },
        {
          title: "回放地址",
          key: "coach_name",
          width: "100",
          render: (h, params) => {
            if (params.row.is_show == 1) {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      props: {
                        type: "text",
                        size: "small"
                      },
                      click: () => {
                        this.goBank(params.row);
                      }
                    },
                    style: {
                      width: "fit-content",
                      cursor: "pointer",
                      color: "#2d8cf0"
                    },
                    class:'clickable'
                  },
                  "直播/回放"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    style: {
                      width: "100%",
                      display: "inline-block",
                      cursor: "pointer",
                      color: "#ccc"
                    }
                  },
                  "直播/回放"
                )
              ]);
            }
          }
        },
        { title: "创建时间", key: "create_time", width: "200" }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["getLessonsList"]),
    //回放地址
    goBank(item) {
      window.open(item.web_cast);
    },
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
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
      // this.startAccount = "";
      // this.endAccount = "";
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
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    //操作日期
    getTimes() {
      if (this.form.lesson_time_start && this.form.lesson_time_end) {
        this.form.lesson_time_start = this.datePicker(this.form.lesson_time_start);
        this.form.lesson_time_end = this.datePicker(this.form.lesson_time_end);
        this.seekClick();
      }else if(!this.form.lesson_time_start && !this.form.lesson_time_end){
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