<template>
  <div class="box">
    <Form :model="seekForm">
      <Row class-name="exclusive">
        <Col span="3">
          <FormItem>
            <Input v-model="seekForm.name" placeholder="教师姓名" @on-change="seekClick"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Input v-model="seekForm.mobile" placeholder="联系方式" @on-change="seekMobile"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="seekForm.subject" @on-change="seekClick" placeholder="科目">
              <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="2">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
        <Col span="24">
          <Button type="primary" @click="showTeacher">添加教师</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="columns" :data="teacherData" @on-selection-change="selectionChange"></Table>
    <Page
      @on-change="pageChange"
      :total="total"
      :current="currentPage"
      :page-size="pageSize"
      show-total
      show-elevator
      class="ive-page"
    />

    <Loading v-show="isLoading" />
    <Modal width="1100" v-model="showTeacherMessage" :title="`${text}教师`" @on-cancel="colseModal">
      <Form
        v-if="showTeacherMessage"
        ref="form"
        :model="form"
        label-position="left"
        :rules="ruleValidate"
        style="height:500px;overflow-y:auto;"
        :show-message="false"
      >
        <Row class-name="exclusive">
          <Col span="24">教师基本信息</Col>
          <Col span="4">
            <FormItem label="教师姓名" prop="name">
              <Input v-model="form.name" placeholder="请输入教师姓名"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="性别" prop="sex">
              <Select v-model="form.sex">
                <Option :value="1">男</Option>
                <Option :value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="联系方式" prop="tel">
              <Input v-model="form.tel" placeholder="请输入联系方式"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="教授科目" prop="subject">
              <Select v-model="form.subject">
                <Option :value="i*1" v-for="(list,i) in subject" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="教授年级" prop="grade">
              <Select multiple v-model="form.grade" :max-tag-count="1">
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
          <Col span="4">
            <FormItem label="教师等级" prop="level">
              <Select v-model="form.level">
                <Option :value="1">中级</Option>
                <Option :value="2">高级</Option>
                <Option :value="3">特一级</Option>
                <Option :value="4">特二级</Option>
                <Option :value="5">特三级</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              label="所在城市"
              prop="address_province_id"
              style="display:flex;flex-direction:column"
            >
              <div class="dateplc">
                <Select
                  @on-open-change="getProv"
                  v-model="form.address_province_id"
                  style="width:100px"
                >
                  <Option :value="list.Id" v-for="(list,i) in provinceList" :key="i">{{list.Name}}</Option>
                </Select>
                <Select v-model="form.address_city_id" style="width:100px">
                  <Option :value="list.Id" v-for="(list,i) in city" :key="i">{{list.Name}}</Option>
                </Select>
              </div>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="classin账号" prop="classin_user">
              <Input v-model="form.classin_user" placeholder="请输入classin账号"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="招商银行卡号" prop="bank_card_id">
              <Input v-model="form.bank_card_id" placeholder="请输入16位招商银行卡号"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="招商银行开户行" prop="bank_card_open">
              <Input v-model="form.bank_card_open" placeholder="请输入招商银行开户行"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="教授类型" prop="type">
              <RadioGroup v-model="form.type">
                <Radio :label="1">班课</Radio>
                <Radio :label="4">一对一</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="10" style="display:flex" class="actives">
            <span>*</span>
            <FormItem label="老师头像" prop="avatar" class="active_span" style="margin-left:20px">
              <template>
                <div class="demo-upload-list" v-for="(item,i) in uploadList" :key="i">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </div>
              </template>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','gif','png']"
                :max-size="2048"
                :before-upload="handleBeforeUpload"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="老师头像展示" v-if="form.avatar">
              <div class="demo-upload-list">
                <img :src="'http://liveapi.canpoint.net/'+form.avatar" />
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView('http://liveapi.canpoint.net/'+form.avatar)"
                  ></Icon>
                </div>
              </div>
              <Modal title="预览图" v-model="visible">
                <img :src="imgName" style="width: 100%" />
              </Modal>
            </FormItem>
          </Col>
          <Col span="10" style="display:flex">
            <FormItem label="招商银行卡" prop="bank_card_pic" class="active_span">
              <template>
                <div class="demo-upload-list" v-for="(item,i) in uploadList2" :key="i">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
                  </div>
                </div>
              </template>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','gif','png']"
                :max-size="2048"
                :before-upload="handleBeforeUpload2"
                :on-format-error="handleFormatError2"
                :on-exceeded-size="handleMaxSize2"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="招商银行卡展示" v-if="form.bank_card_pic">
              <div class="demo-upload-list">
                <img :src="'http://liveapi.canpoint.net/'+form.bank_card_pic" />
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView2('http://liveapi.canpoint.net/'+form.bank_card_pic)"
                  ></Icon>
                </div>
              </div>
              <Modal title="预览图" v-model="visible">
                <img :src="imgName2" style="width: 100%" />
              </Modal>
            </FormItem>
          </Col>
          <Col span="10" style="display:flex">
            <FormItem label="身份证正面照" prop="identity_id_pic1" class="active_span">
              <template>
                <div class="demo-upload-list" v-for="(item,i) in uploadList4" :key="i">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove4(item)"></Icon>
                  </div>
                </div>
              </template>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','gif','png']"
                :max-size="2048"
                :before-upload="handleBeforeUpload4"
                :on-format-error="handleFormatError4"
                :on-exceeded-size="handleMaxSize4"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="身份证正面照展示" v-if="form.identity_id_pic1">
              <div class="demo-upload-list">
                <img :src="'http://liveapi.canpoint.net/'+form.identity_id_pic1" />
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView4('http://liveapi.canpoint.net/'+form.identity_id_pic1)"
                  ></Icon>
                </div>
              </div>
              <Modal title="预览图" v-model="visible">
                <img :src="imgName4" style="width: 100%" />
              </Modal>
            </FormItem>
          </Col>
          <Col span="10" style="display:flex">
            <FormItem label="身份证背面照" prop="identity_id_pic2" class="active_span">
              <template>
                <div class="demo-upload-list" v-for="(item,i) in uploadList5" :key="i">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove5(item)"></Icon>
                  </div>
                </div>
              </template>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','gif','png']"
                :max-size="2048"
                :before-upload="handleBeforeUpload5"
                :on-format-error="handleFormatError5"
                :on-exceeded-size="handleMaxSize5"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="身份证背面照展示" v-if="form.identity_id_pic2">
              <div class="demo-upload-list">
                <img :src="'http://liveapi.canpoint.net/'+form.identity_id_pic2" />
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView5('http://liveapi.canpoint.net/'+form.identity_id_pic2)"
                  ></Icon>
                </div>
              </div>
              <Modal title="预览图" v-model="visible">
                <img :src="imgName5" style="width: 100%" />
              </Modal>
            </FormItem>
          </Col>
          <Col span="10" style="display:flex">
            <FormItem label="教师资格证" prop="teacher_nvq_pic" class="active_span">
              <template>
                <div class="demo-upload-list" v-for="(item,i) in uploadList7" :key="i">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove7(item)"></Icon>
                  </div>
                </div>
              </template>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :format="['jpg','gif','png']"
                :max-size="2048"
                :before-upload="handleBeforeUpload7"
                :on-format-error="handleFormatError7"
                :on-exceeded-size="handleMaxSize7"
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="教师资格证展示" v-if="form.teacher_nvq_pic">
              <div class="demo-upload-list">
                <img :src="'http://liveapi.canpoint.net/'+form.teacher_nvq_pic" />
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView7('http://liveapi.canpoint.net/'+form.teacher_nvq_pic)"
                  ></Icon>
                </div>
              </div>
              <Modal title="预览图" v-model="visible">
                <img :src="imgName7" style="width: 100%" />
              </Modal>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="教师视频简介">
              <Input v-model="form.teacher_userinfo_video" placeholder="请输入视频链接"></Input>
            </FormItem>
            <FormItem label="教师资料简介">
              <Input
                v-model="form.teacher_userinfo_desc"
                type="textarea"
                :autosize="{minRows: 5,maxRows: 8}"
                placeholder="请输入..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="createdTeacher('form')">确定</Button>
        <Button @click="handleReset('form')" style="margin-left: 8px">取消</Button>
      </div>
      <div slot="footer" style="display:none"></div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../../uilt/loading/loading";
import storage from "../../uilt/storage";
import { CREATEDTEACHERS, UPDATATEACHERS } from "../../uilt/url/url";
import axios from "axios";
export default {
  components: {
    Loading
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getTeacherList({ page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  watch: {
    showTeacherMessage(v) {
      if (!v) {
        this.acArr.length = 0;
      }
    }
  },
  computed: {
    ...mapGetters(["teacherData", "teacherTypes"]),
    ...mapState({
      data: state => state.teacher.teacherList,
      currentPage: state => state.teacher.currentPage,
      total: state => state.teacher.total,
      pageSize: state => state.teacher.pageSize,
      provinceList: state => state.mineclient.provinceList,
      city: state => state.mineclient.city
    })
  },
  data() {
    return {
      confirmLoaing: false,
      myreg: /^[1][3,4,5,7,8,6,9][0-9]{9}$/,
      imgName7: "",
      uploadList7: [],
      imgName6: "",
      uploadList6: [],
      imgName5: "",
      uploadList5: [],
      imgName4: "",
      uploadList4: [],
      imgName3: "",
      uploadList3: [],
      imgName2: "",
      uploadList2: [],
      activeArr: [],
      imgName: "",
      visible: false,
      seekForm: {},
      num: 48,
      setActive: [],
      acArr: [],
      isUpdata: false,
      uploadList: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "教师姓名不能为空",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "联系方式不能为空"
          }
        ],
        sex: [
          {
            required: true,
            message: "性别是必选的"
          }
        ],
        level: [
          {
            required: true,
            message: "教师等级是必选的"
          }
        ],
        mobile: [
          {
            required: true,
            message: "联系方式不能为空"
          }
        ],
        subject: [
          {
            required: true,
            message: "教授科目是必选的"
          }
        ],
        grade: [
          {
            required: true,
            message: "教授年级是必选的"
          }
        ],
        type: [
          {
            required: true,
            message: "课程类型是必选的"
          }
        ]
      },
      text: "添加",
      showTeacherMessage: false,
      subject: storage.getDaiban().screen_list.subject,
      course_type: storage.getDaiban().screen_list.course_type,
      show: false,
      type: {
        status: "teacher"
      },
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "教师姓名", key: "name" },
        { title: "性别", key: "sex" },
        { title: "联系方式", key: "mobile" },
        { title: "教师等级", key: "level" },
        { title: "年级", key: "grade_ch", width: 300 },
        { title: "教授科目", key: "subject" },
        { title: "推送Classin", key: "classin_id" },
        { title: "创建时间", key: "create_time", width: 170 },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.callOut(params.row);
                    }
                  }
                },
                "呼出"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.update(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      "deleteTearch",
      "getTeacherList",
      "createdTeachers",
      "getProvince",
      "getCity",
      "RingUp"
    ]),
    ...mapMutations(["setTeacherTypes", "setCurrentPage"]),
    //呼出
    callOut(item) {
      this.update(item);
      this.isLoading = true;
      this.RingUp({ form: item })
        .then(res => {
          if (res.data.code == 200) {
            this.$Message.success("呼出成功");
          }
          if (res.data.code == 1000) {
            this.$Message.error({
              content: res.data.error,
              duration: 4
            });
          }
          this.isLoading = false;
        })
        .catch(e => {
          if (e) {
            this.isLoading = false;
          }
        });
    },
    //删除教师
    delete(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确定要删除吗?</p>",
        onOk: () => {
          this.deleteTearch({ uid: item.id }).then(res => {
            if (!res.data.ret) {
              this.$Message.error(res.data.error);
            } else {
              this.$Message.success("删除成功");
            }
            this.isLoading = true;
            this.getTeacherList({
              ...this.seekForm,
              page: this.currentPage
            }).then(() => {
              this.isLoading = false;
            });
          });
        }
      });
    },
    //手机号
    seekMobile() {
      if (this.seekForm.mobile.length >= 4) {
        this.seekClick();
      }
    },
    timeBlock(value) {
      if (this.setActive.indexOf(value) > -1) {
        return "ok";
      } else {
        return "no";
      }
    },
    //获取省市
    getProv() {
      this.getProvince().then(res => {
        if (res.data.ret) {
          this.getCity(this.form.address_province_id);
        }
      });
    },
    //点击时间块失去光标
    loseFocus() {
      this.showTimeBlock = false;
      this.createAuditionForm.time_block = this.acArr;
    },
    //点击时间块获取焦点
    getFocus() {
      this.showTimeBlock = true;
    },
    //获取当前时间块
    getNum(num, e) {
      var arr = this.acArr;
      e.path[0].className = "active";
      if (arr.indexOf(num) > -1) {
        arr.splice(arr.indexOf(num), 1);
        e.path[0].className = " ";
      } else {
        arr.push(num);
      }
    },
    //重置form表单
    handleReset(name) {
      this.showTeacherMessage = false;
    },
    //创建教师
    createdTeacher(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isLoading = true;
          this.confirmLoaing = true;
          if (!this.myreg.test(this.form.tel)) {
            this.$Message.error("手机号码格式不正确");
            return;
          }
          if (this.form.bank_card_id) {
            if (this.form.bank_card_id.split("").length != 16) {
              this.$Message.error("招商银行卡号格式不正确");
              return;
            }
          }
          if (this.isUpdata) {
            var formData = new FormData();
            formData.append("coach_id", this.form.id);
            formData.append("name", this.form.name);
            formData.append("level", this.form.level);
            formData.append("sex", this.form.sex);
            formData.append("type", this.form.type ? this.form.type : "");
            formData.append("mobile", this.form.tel);
            formData.append("subject", this.form.subject);
            formData.append(
              "address_province_id",
              this.form.address_province_id ? this.form.address_province_id : ""
            );
            formData.append(
              "address_city_id",
              this.form.address_city_id ? this.form.address_city_id : ""
            );
            formData.append(
              "classin_user",
              this.form.classin_user ? this.form.classin_user : ""
            );
            formData.append(
              "bank_card_id",
              this.form.bank_card_id ? this.form.bank_card_id : ""
            );
            formData.append(
              "bank_card_pic",
              this.uploadList2[0] ? this.uploadList2[0] : ""
            );
            formData.append(
              "bank_card_open",
              this.form.bank_card_open ? this.form.bank_card_open : ""
            );
            formData.append(
              "identity_id_pic1",
              this.uploadList4[0] ? this.uploadList4[0] : ""
            );
            formData.append(
              "identity_id_pic2",
              this.uploadList5[0] ? this.uploadList5[0] : ""
            );
            formData.append(
              "nvq_pic",
              this.uploadList6[0] ? this.uploadList6[0] : ""
            );
            formData.append(
              "teacher_nvq_pic",
              this.uploadList7[0] ? this.uploadList7[0] : ""
            );
            formData.append("grade", `,${this.form.grade.join(",")},`);
            formData.append(
              "avatar",
              this.uploadList[0] ? this.uploadList[0] : ""
            );
            // formData.append("time_block", this.acArr.join(","));
            formData.append(
              "teacher_userinfo_desc",
              this.form.teacher_userinfo_desc
                ? this.form.teacher_userinfo_desc
                : ""
            );
            formData.append(
              "teacher_userinfo_video",
              this.form.teacher_userinfo_video
                ? this.form.teacher_userinfo_video
                : ""
            );
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post(UPDATATEACHERS, formData, config).then(response => {
              if (response.data.code == 100000 && response.data.error) {
                this.$Message.error(response.data.error);
                return;
              }
              if (response.data.code == 200 && response.data.ret == true) {
                this.$Message.success("修改成功");
                this.getTeacherList();
                this.showTeacherMessage = false;
              }
              this.isLoading = false;
              this.confirmLoaing = false;
              this.uploadList.length = 0;
              this.uploadList2.length = 0;
              this.uploadList3.length = 0;
              this.uploadList4.length = 0;
              this.uploadList5.length = 0;
              this.uploadList6.length = 0;
              this.uploadList7.length = 0;
            });
          } else {
            if (this.uploadList.length == 0) {
              this.$Message.error("老师头像是必填的");
              return;
            }
            // else if (this.acArr.length == 0) {
            //   this.$Message.error("开放时间是必选的");
            //   return;
            // }
            var formData = new FormData();
            formData.append("name", this.form.name);
            formData.append("level", this.form.level);
            formData.append("sex", this.form.sex);
            formData.append("type", this.form.type ? this.form.type : "");
            formData.append("mobile", this.form.tel);
            formData.append("subject", this.form.subject);
            formData.append("grade", `,${this.form.grade.join(",")},`);
            formData.append("avatar", this.uploadList[0]);
            // formData.append("time_block", this.acArr.join(","));
            formData.append(
              "address_province_id",
              this.form.address_province_id ? this.form.address_province_id : ""
            );
            formData.append(
              "address_city_id",
              this.form.address_city_id ? this.form.address_city_id : ""
            );
            formData.append(
              "classin_user",
              this.form.classin_user ? this.form.classin_user : ""
            );
            formData.append(
              "bank_card_id",
              this.form.bank_card_id ? this.form.bank_card_id : ""
            );
            formData.append(
              "bank_card_pic",
              this.uploadList2[0] ? this.uploadList2[0] : ""
            );
            formData.append(
              "bank_card_open",
              this.form.bank_card_open ? this.form.bank_card_open : ""
            );
            formData.append(
              "identity_id_pic1",
              this.uploadList4[0] ? this.uploadList4[0] : ""
            );
            formData.append(
              "identity_id_pic2",
              this.uploadList5[0] ? this.uploadList5[0] : ""
            );
            formData.append(
              "nvq_pic",
              this.uploadList6[0] ? this.uploadList6[0] : ""
            );
            formData.append(
              "teacher_nvq_pic",
              this.uploadList7[0] ? this.uploadList7[0] : ""
            );
            formData.append(
              "teacher_userinfo_desc",
              this.form.teacher_userinfo_desc
                ? this.form.teacher_userinfo_desc
                : ""
            );
            formData.append(
              "teacher_userinfo_video",
              this.form.teacher_userinfo_video
                ? this.form.teacher_userinfo_video
                : ""
            );
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post(CREATEDTEACHERS, formData, config).then(response => {
              if (response.data.code == 100000 && response.data.error) {
                this.$Message.error(response.data.error);
                return;
              }
              if (response.data.code == 200 && response.data.ret == true) {
                this.$Message.success("新增成功");
                this.getTeacherList({ page: 1 });
                this.showTeacherMessage = false;
              }
              this.isLoading = false;
              this.confirmLoaing = false;
              this.uploadList.length = 0;
              this.uploadList2.length = 0;
              this.uploadList3.length = 0;
              this.uploadList4.length = 0;
              this.uploadList5.length = 0;
              this.uploadList6.length = 0;
              this.uploadList7.length = 0;
            });
          }
        } else {
          this.$Message.error("请完整填写正确信息");
        }
      });
    },
    //预览图片
    handleView7(item) {
      if (this.isUpdata) {
        this.imgName7 = item;
      } else {
        this.imgName7 = this.uploadList7.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove7(file) {
      this.uploadList7.splice(this.uploadList7.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize7(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError7(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload7(file) {
      const check = this.uploadList7.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList7.push(file);
      };
    },
    //预览图片
    handleView6(item) {
      if (this.isUpdata) {
        this.imgName6 = item;
      } else {
        this.imgName6 = this.uploadList6.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove6(file) {
      this.uploadList6.splice(this.uploadList6.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize6(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError6(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload6(file) {
      const check = this.uploadList6.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList6.push(file);
      };
    },
    //预览图片
    handleView5(item) {
      if (this.isUpdata) {
        this.imgName5 = item;
      } else {
        this.imgName5 = this.uploadList5.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove5(file) {
      this.uploadList5.splice(this.uploadList5.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize5(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError5(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload5(file) {
      const check = this.uploadList5.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList5.push(file);
      };
    },
    //预览图片
    handleView4(item) {
      if (this.isUpdata) {
        this.imgName4 = item;
      } else {
        this.imgName4 = this.uploadList4.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove4(file) {
      this.uploadList4.splice(this.uploadList4.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize4(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError4(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload4(file) {
      const check = this.uploadList4.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList4.push(file);
      };
    },
    //预览图片
    handleView3(item) {
      if (this.isUpdata) {
        this.imgName3 = item;
      } else {
        this.imgName3 = this.uploadList3.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove3(file) {
      this.uploadList3.splice(this.uploadList3.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize3(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError3(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload3(file) {
      const check = this.uploadList3.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList3.push(file);
      };
    },
    //预览图片
    handleView2(item) {
      if (this.isUpdata) {
        this.imgName2 = item;
      } else {
        this.imgName2 = this.uploadList2.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove2(file) {
      this.uploadList2.splice(this.uploadList2.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize2(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError2(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload2(file) {
      const check = this.uploadList2.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList2.push(file);
      };
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
    //添加教师
    showTeacher() {
      this.text = "添加";
      this.acArr = [];
      this.isUpdata = false;
      this.form = {};
      this.showTeacherMessage = true;
    },
    //编辑
    update(item) {
      this.text = "编辑";
      for (var i = 0; i < item.grade.length; i++) {
        item.grade[i] = item.grade[i] * 1;
      }
      this.setActive = item.timeblock;
      this.acArr = item.timeblock;
      this.setTeacherTypes(item);
      this.isUpdata = true;
      this.showTeacherMessage = true;
      this.form = { ...this.teacherTypes };
      this.getProv();
    },
    //关闭modal
    colseModal() {
      this.getTeacherList();
    },
    //多选反选
    selectionChange() {},
    //清空查询条件
    clear() {
      this.seekForm = {};
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
      this.getTeacherList({ ...this.seekForm, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getTeacherList({ ...this.seekForm, page: num }).then(res => {
        this.isLoading = false;
      });
    }
  }
};
</script>
<style scoped>
.active_span .ivu-form-item-label {
  margin-left: 15px;
}
.actives > span {
  position: absolute;
  top: 7px;
  left: 0;
  font-size: 20px;
  color: red;
}
.actives {
  position: relative;
}
/*  */
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
.content-right-header {
  height: 27px;
  background-color: #ccc;
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