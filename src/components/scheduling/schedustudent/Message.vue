<template>
  <div class="box">
    <Modal
      width="1200"
      v-model="type.classify == 'createdCourse'"
      title="排课"
      @on-ok="createdCourse"
      @on-cancel="$parent.show = false"
      class-name="vertical-center-modal"
    >
      <Form
        ref="formValidate"
        :model="form"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem class="keep-left">
          <span style="color:red">您当前可用课时为 : {{courseCard}}</span>
        </FormItem>
        <Row>
          <Col span="3">
            <FormItem label="年级" prop="grade">
              <Select v-model="form.grade" placeholder="请选择" style="width:80px">
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
            <FormItem label="科目" prop="subject">
              <Select v-model="form.subject" placeholder="请选择" style="width:80px">
                <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="授课教师" prop="coach_id">
          <Select
            v-model="form.coach_id"
            placeholder="请选择"
            filterable
            style="width:225px"
            @on-open-change="getTeacherData"
          >
            <Option :value="list.id" v-for="(list,i) in teacherList" :key="i">{{list.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="班主任" prop="header_id">
          <Select v-model="form.header_id" placeholder="请选择" style="width:225px">
            <Option :value="list.id" v-for="(list,i) in header_list" :key="i">{{list.login_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开课日期" prop="start_date">
          <span class="required"></span>
          <DatePicker
            style="width:225px"
            v-model="form.start_date"
            :options="optionsDate"
            type="date"
            placeholder="请选择"
            @on-change="getTimes"
          ></DatePicker>
        </FormItem>
        <FormItem label="周数量" prop="times">
          <Input v-model="form.times" placeholder="请输入课节数" style="width:225px"></Input>
        </FormItem>
        <FormItem label="课程简介" prop="course_desc">
          <Input
            style="width:600px"
            v-model="form.course_desc"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 5}"
            placeholder="请输入课程简介"
          ></Input>
        </FormItem>
        <FormItem>
          <span class="required" style="left:-20px"></span>
          <div class="catalog">
            <p @click="addLessons">+添加时间块</p>
            <ul>
              <li v-for="(item,i) in dataArr" :key="i">
                <Select
                  v-model="item.week"
                  placeholder="请选择"
                  style="width:100px;margin-right:20px;"
                >
                  <Option :value="0">周一</Option>
                  <Option :value="1">周二</Option>
                  <Option :value="2">周三</Option>
                  <Option :value="3">周四</Option>
                  <Option :value="4">周五</Option>
                  <Option :value="5">周六</Option>
                  <Option :value="6">周七</Option>
                </Select>
                <TimePicker
                  @on-change="getStartTime(i)"
                  v-model="item.start_time"
                  format="HH:mm"
                  placeholder="开始时间"
                  style="width: 112px;margin-right:15px"
                ></TimePicker>
                <TimePicker
                  readonly
                  v-model="item.end_time"
                  format="HH:mm"
                  placeholder="结束时间"
                  style="width: 112px"
                ></TimePicker>
                <div style="width:30px;">
                  <i class="delete-icon">
                    <Icon type="ios-trash-outline" @click="deleData(i)" />
                  </i>
                </div>
              </li>
            </ul>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="$parent.show = false">取消</Button>
        <Button
          :loading="disableBtn"
          type="primary"
          size="large"
          @click="handleSubmit('formValidate')"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import storage from "../../../uilt/storage";
import axios from "axios";
import { ADDCOURSE } from "../../../uilt/url/scheduing/scheduing";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("schedustudent");
export default {
  props: ["type"],
  computed: {
    ...mapState(["teacherList", "courseCard"])
  },
  mounted() {
    this.getCoursecard(this.type.obj.id);
    this.form.start_date = this.datePickerDate(this.form.start_date);
  },
  data() {
    return {
      dataArr: [],
      optionsDate: {
        disabledDate: function(date) {
          return date < new Date(this.start_time.getTime() + 60000);
        }.bind(this)
      },
      start_time: new Date(),
      setActive: [],
      acArr: [],
      showTimeBlock: false,
      num: 48,
      header_list: storage.getDaiban().header_list,
      imgName: "",
      uploadList: [],
      disableBtn: false,
      subject: storage.getDaiban().screen_list.subject,
      form: {
        start_date: this.datePickerDate(),
        student_name: this.type.obj.student_name
      },
      ruleValidate: {
        card_id: [
          {
            required: true,
            message: "课程卡是必选的"
          }
        ],
        times: [
          {
            required: true,
            message: "开课日期是必填的",
            trigger: "blur"
          }
        ],
        coach_id: [
          {
            required: true,
            message: "授课教师是必选的"
          }
        ],
        grade: [
          {
            required: true,
            message: "年级是必选的"
          }
        ],
        subject: [
          {
            required: true,
            message: "科目是必选的"
          }
        ],
        header_id: [
          {
            required: true,
            message: "班主任是必选的"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["getTeacherList", "getCoursecard"]),
    //获取时间块的第一个时间,设置第二个时间
    getStartTime(i) {
      let startNum = this.dataArr[i].start_time.split(":")[0];
      let endNum = this.dataArr[i].start_time.split(":")[1];
      var start = "";
      var end = "";
      if (endNum * 1 < 60) {
        if (endNum * 1 + 50 >= 60) {
          end = endNum * 1 + 50 - 60;
          start = startNum * 1 + 1;
          if (end < 10) {
            end = "0" + end;
          }
          if (start < 10) {
            start = "0" + start;
          }
        } else {
          start = startNum;
          end = endNum * 1 + 50;
        }
        this.dataArr[i].end_time = start + ":" + end;
      }
    },
    //新增时间块
    addLessons() {
      this.dataArr.push({ week: "", start_time: "", end_time: "" });
    },
    //删除时间块
    deleData(num) {
      this.dataArr.splice(num, 1);
    },
    //获取老师列表
    getTeacherData(item) {
      if (item) {
        if (this.form.grade && this.form.subject) {
          this.getTeacherList({
            type: 4,
            form: { grade: this.form.grade, subject: this.form.subject }
          });
        } else {
          this.$Message.error("请先选择年级和科目");
        }
      }
    },
    getTimes(value) {
      this.form.start_date = this.datePicker(value);
    },
    //设置当前的后一天
    datePickerDate() {
      var d = new Date();
      return (
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + 1)
      );
    },
    //设置返回的时间
    datePicker(time) {
      var d = new Date(time);
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    //点击时间块失去光标
    loseFocus() {
      this.showTimeBlock = false;
      this.form.times_block = this.acArr;
    },
    //点击时间块获取焦点
    getFocus() {
      this.showTimeBlock = true;
    },
    //预览图片
    handleView(item) {
      if (this.isUpdata) {
        this.imgName = item;
      } else {
        this.imgName = this.uploadList.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove(file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload(file) {
      const check = this.uploadList.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList.push(file);
      };
    },
    //创建课程
    handleSubmit(name) {
      if (this.dataArr.length == 0) {
        this.$Message.error("时间块是必填的");
      } else {
        for (var i = 0; i < this.dataArr.length; i++) {
          if (this.dataArr[i].week.toString() == '') {
            this.$Message.error("周不能为空");
          } else if (!this.dataArr[i].start_time) {
            this.$Message.error("开始时间不能为空");
          }
        }
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.dataArr.length == 0) {
            this.$Message.error("时间块是必填的");
            return;
          }
          if (!this.form.start_date) {
            this.$Message.error("开课日期不能为空");
            return;
          }
          this.disableBtn = true;
          var formData = new FormData();
          formData.append("account_id", this.type.obj.id);
          formData.append("times", this.form.times);
          formData.append("start_date", this.form.start_date);
          formData.append(
            "coach_id",
            this.form.coach_id ? this.form.coach_id : ""
          );
          // formData.append(
          //   "card_id",
          //   this.form.card_id ? this.form.card_id : ""
          // );
          formData.append("grade", this.form.grade);
          formData.append("subject", this.form.subject);
          formData.append(
            "course_desc",
            this.form.course_desc ? this.form.course_desc : ""
          );
          formData.append("header_id", this.form.header_id);
          formData.append("times_block", JSON.stringify(this.dataArr));
          formData.append("student_name", this.form.student_name);
          formData.append(
            "mobile",
            JSON.stringify(this.type.obj.mobile).substr(-4)
          );
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "bearer " + storage.get()
            }
          };
          axios.post(ADDCOURSE, formData, config).then(response => {
            this.disableBtn = false;
            if (!response.data.ret) {
              this.$Message.error(response.data.error);
              return;
            } else if (response.data.data.lesson.class) {
              this.$Message.error(
                response.data.data.lesson.class + " 课程时间冲突"
              );
              return;
            } else if (response.data.data.lesson.coach) {
              this.$Message.error(
                response.data.data.lesson.coach + " 老师时间冲突"
              );
              return;
            } else {
              this.$Message.success("排课成功");
              this.$parent.show = false;
            }
          });
        }
      });
    },
    //创建课程
    createdCourse() {}
  }
};
</script>

<style scoped>
/* 当前时间块 */
.disabled {
  background: #dfdddd;
  cursor: no-drop;
  pointer-events: none;
}
/* 当前时间块 */
.required::after {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 14px;
  color: #ed4014;
}
.required {
  position: absolute;
  left: -80px;
  top: 0;
}
.hidden {
  display: none;
}
.time_block li {
  flex: 1;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.time_block {
  width: 1007px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.content-right-footer li.active {
  background-color: #2d8cf0;
}
.content-right-footer li.actives {
  background-color: #2d8cf0;
  cursor: no-drop;
  pointer-events: none;
}
.content-right-footer {
  display: flex;
  flex-wrap: wrap;
}
.content-right-header li,
.content-right-footer li {
  width: 126px;
  box-sizing: content-box;
  border: 1px solid #989898;
  margin-left: -1px;
  margin-top: -1px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  height: 29px;
}
.content-right-header li {
  background-color: #ccc;
}
.content-right-header {
  height: 27px;
  text-align: center;
  color: #333;
  display: flex;
  margin-bottom: 1px;
}
.content .content-right {
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.content .content-left ul li {
  background-color: #ccc;
  text-align: center;
  color: #333;
  border: 1px solid #989898;
  margin-top: -1px;
  height: 29px;
}
.content .content-left {
  width: 120px;
}
.content {
  display: flex;
  margin-right: 20px;
  position: relative;
}
/* 时间块 */
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>