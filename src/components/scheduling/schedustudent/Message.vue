<template>
  <div class="box">
    <Modal
    width="1200"
      v-model="type.classify == 'createdCourse'"
      title="添加课节"
      @on-ok="createdCourse"
      @on-cancel="$parent.show = false"
      class-name="vertical-center-modal"
    >
      <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="80" style="maxHeight:500px;overflow-y:auto">
        <FormItem label="课程卡" prop="card_id">
          <Select v-model="form.card_id" placeholder="请选择" style="width:350px">
            <Option :value="list.id" v-for="(list,i) in courseCard" :key="i">{{list.card_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="周数量" prop="times">
          <Input v-model="form.times" placeholder="请输入课节数" style="width:200px"></Input>
        </FormItem>
        <FormItem label="开课日期" prop="start_date">
          <span class="required"></span>
          <DatePicker :options="optionsDate" type="date" placeholder="请选择" @on-change="getTimes"></DatePicker>
        </FormItem>
        <FormItem label="每周规律">
          <span class="required"></span>
          <div class="content">
            <div class="content-left">
              <ul>
                <li>-</li>
                <li>07:00 - 07:30</li>
                <li>07:30 - 08:00</li>
                <li>08:00 - 08:30</li>
                <li>08:30 - 09:00</li>
                <li>09:00 - 09:30</li>
                <li>09:30 - 10:00</li>
                <li>10:00 - 10:30</li>
                <li>10:30 - 11:00</li>
                <li>11:00 - 11:30</li>
                <li>11:30 - 12:00</li>
                <li>12:00 - 12:30</li>
                <li>12:30 - 13:00</li>
                <li>13:00 - 13:30</li>
                <li>13:30 - 14:00</li>
                <li>14:00 - 14:30</li>
                <li>14:30 - 15:00</li>
                <li>15:00 - 15:30</li>
                <li>15:30 - 16:00</li>
                <li>16:00 - 16:30</li>
                <li>16:30 - 17:00</li>
                <li>17:00 - 17:30</li>
                <li>17:30 - 18:00</li>
                <li>18:00 - 18:30</li>
                <li>18:30 - 19:00</li>
                <li>19:00 - 19:30</li>
                <li>19:30 - 20:00</li>
                <li>20:00 - 20:30</li>
                <li>20:30 - 21:00</li>
                <li>21:00 - 21:30</li>
                <li>21:30 - 22:00</li>
                <li>22:00 - 22:30</li>
                <li>22:30 - 23:00</li>
                <li>23:00 - 23:30</li>
                <li>23:30 - 24:00</li>
              </ul>
            </div>
            <div class="content-right">
              <ul class="content-right-header">
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
                <li>日</li>
              </ul>
              <div class="content-right-footer">
                <ul>
                  <li
                    v-for="(k,i) in num"
                    :key="i"
                    :class="{active:timeBlock(k-1) == 'ok'}"
                    @click="getNum(i,$event)"
                    v-if="k> 14"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<63}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*2"
                    v-if=" k > num"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<111}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*3"
                    v-if=" k > num*2"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<159}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*4"
                    v-if=" k > num*3"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<207}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*5"
                    v-if=" k > num*4"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<255}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*6"
                    v-if=" k > num*5"
                    :key="i"
                  ></li>
                </ul>
                <ul>
                  <li
                    :class="{active:timeBlock(k-1) == 'ok',hidden:k<303}"
                    @click="getNum(i,$event)"
                    v-for="(k,i) in num*7"
                    v-if=" k > num*6"
                    :key="i"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem label="年级" prop="grade">
          <Select v-model="form.grade" placeholder="请选择" style="width:200px">
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
        <FormItem label="科目" prop="subject">
          <Select v-model="form.subject" placeholder="请选择" style="width:200px">
            <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
          </Select>
        </FormItem>
        <FormItem label="授课教师" prop="coach_id">
          <Select
            v-model="form.coach_id"
            placeholder="请选择"
            filterable
            style="width:200px"
            @on-open-change="getTeacherData"
          >
            <Option :value="list.id" v-for="(list,i) in teacherList" :key="i">{{list.name}}</Option>
          </Select>
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
        <FormItem label="班主任" prop="header_id">
          <Select v-model="form.header_id" placeholder="请选择" style="width:200px">
            <Option :value="list.id" v-for="(list,i) in header_list" :key="i">{{list.login_name}}</Option>
          </Select>
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
  },
  data() {
    return {
      optionsDate: {
        disabledDate: date => {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      setActive: [],
      acArr: [],
      showTimeBlock: false,
      num: 48,
      header_list: storage.getDaiban().header_list,
      imgName: "",
      uploadList: [],
      disableBtn: false,
      subject: storage.getDaiban().screen_list.subject,
      form: {},
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
    //获取老师列表
    getTeacherData(item) {
      if (item) {
        if (this.form.grade && this.form.subject) {
          this.getTeacherList({
            type: 4,
            form: { grade: this.form.grade, subject: this.form.subject }
          });
        }else{
          this.$Message.error('请先选择年级和科目')
        }
      }
    },
    getTimes(value) {
      this.form.start_date = this.datePicker(value);
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
    timeBlock(value) {
      if (this.setActive.indexOf(value) > -1) {
        return "ok";
      } else {
        return "no";
      }
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
    //获取当前时间块
    getNum(num, e) {
      var arr = this.acArr;
      e.path[0].className = "active";
      if (JSON.stringify(e.target.nextSibling) == "null") {
        this.$Message.error("当前时间块不可选");
        e.path[0].className = " ";
        return;
      } else if (e.target.nextSibling.className == "active") {
        this.$Message.error("当前时间块不可重叠");
        e.path[0].className = " ";
        return;
      }

      if (e.target.nextSibling) {
        e.target.nextSibling.className = "actives";
      } else {
        this.$Message.error("当前时间块不可选");
        e.path[0].className = " ";
        return;
      }
      if (arr.indexOf(num) > -1) {
        arr.splice(arr.indexOf(num), 1);
        e.path[0].className = " ";
        // e.target.previousSibling.className = " ";
        e.target.nextSibling.className = " ";
      } else {
        arr.push(num);
      }
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
      var arr = [];
      for (var i = 0; i < this.acArr.length; i++) {
        arr.push([this.acArr[i] + "/" + (this.acArr[i] + 1)]);
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          if (arr.length == 0) {
            this.$Message.error("每周规律是必选的");
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
          formData.append(
            "card_id",
            this.form.card_id ? this.form.card_id : ""
          );
          formData.append("grade", this.form.grade);
          formData.append("subject", this.form.subject);
          formData.append(
            "course_desc",
            this.form.course_desc ? this.form.course_desc : ""
          );
          formData.append("header_id", this.form.header_id);
          formData.append("times_block", arr);
          // formData.append(
          //   "uploadList",
          //   this.uploadList[0] ? this.uploadList[0] : ""
          // );
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