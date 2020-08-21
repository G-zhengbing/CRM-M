<template>
  <div>
    <div class="shade" v-if="type.classify == 'shade'">
      <Modal v-model="showShade" title="分配" @on-cancel="colse">
        <Select
          v-model="form.sale_name"
          style="width:150px;margin-bottom:20px"
          @on-change="selected"
          placeholder="选择人员"
        >
          <Option
            v-for="(list,i) in fenpeiList"
            :key="i"
            :value="list.login_name"
          >{{list.login_name}}</Option>
        </Select>
        <Input v-model="form.assign_note" type="textarea" :rows="4" placeholder="分配说明" />
        <div slot="footer">
          <Button type="text" size="large" @click="colse">取消</Button>
          <Button type="primary" size="large" @click="confirm">确定</Button>
        </div>
      </Modal>
    </div>
    <!--  -->
    <Modal v-model="showFenpei" @on-cancel="no">
      <p>是否分配给{{form.sale_name}} ?</p>
      <div slot="footer">
        <Button type="text" size="large" @click="no">取消</Button>
        <Button type="primary" size="large" @click="yes">确定</Button>
      </div>
    </Modal>
    <!--  -->
    <div v-if="type.classify == 'datalis'">
      <Modal
        class="modal"
        width="1100"
        v-model="type.classify == 'datalis'"
        title="学员详情"
        @on-cancel="followUpColse"
      >
        <Form :model="form" label-position="top" style="height:500px;overflow-y:auto;">
          <Row>
            <Col span="4">
              <FormItem style="width:150px;" label="学员姓名">
                <Input readonly v-model="type.data.student_name" placeholder="姓名"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="注册手机">
                <Input :title="type.data.tel" readonly v-model="type.data.mobile" placeholder="手机号"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="备用电话">
                <Input readonly v-model="type.data.spare_phone" placeholder="电话"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="性别">
                <Select v-model="type.data.sex" style="width:150px" placeholder="性别" disabled>
                  <Option :value="1">男</Option>
                  <Option :value="2">女</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="年龄">
                <Input disabled v-model="type.data.age" placeholder="年龄"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="年级">
                <Select v-model="type.data.grade" style="width:150px" placeholder="年级" disabled>
                  <Option :value="1">一年级</Option>
                  <Option :value="2">二年级</Option>
                  <Option :value="3">三年级</Option>
                  <Option :value="4">四年级</Option>
                  <Option :value="5">五年级</Option>
                  <Option :value="6">六年级</Option>
                  <Option :value="7">七年级</Option>
                  <Option :value="8">八年级</Option>
                  <Option :value="9">九年级</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="微信昵称">
                <Input readonly v-model="type.data.wechat_nick_name" placeholder="学员微信昵称"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="微信号">
                <Input readonly v-model="type.data.wechat_id" placeholder="请输入微信号"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="城市">
                <Input readonly v-model="type.data.area" placeholder="请输入城市"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="学校">
                <Input readonly v-model="type.data.school" placeholder="就读学校"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="教材版本">
                <Select
                  v-model="type.data.textbook_version"
                  style="width:150px"
                  placeholder="教材版本"
                  disabled
                >
                  <Option v-for="(list,i) in vaersion" :value="i*1" :key="i">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="科目">
                <Select v-model="type.data.subject" style="width:150px" placeholder="科目" disabled>
                  <Option v-for="(list,i) in subject" :key="i*1" :value="list">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="意向度" style="margin-left: 10px">
                <RadioGroup v-model="type.data.intention_option">
                  <Radio label="1" disabled>高</Radio>
                  <Radio label="2" disabled>中</Radio>
                  <Radio label="3" disabled>低</Radio>
                  <Radio label="4" disabled>无</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="呼出请况">
                <RadioGroup class="radios" v-model="type.data.phone_status">
                  <Radio :label="1" disabled>正常接听</Radio>
                  <Radio :label="2" disabled>无人接听</Radio>
                  <Radio :label="3" disabled>空号</Radio>
                  <Radio :label="4" disabled>挂断</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="回访内容">
                <Input
                  readonly
                  v-model="vist_content"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入回访内容"
                />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="下次回访">
                <DatePicker
                  readonly
                  style="margin:0"
                  v-model="type.data.next_follow_time"
                  format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  :title="item"
                  confirm
                  placeholder="下次回访日期"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="24">
              <span class="record">跟进记录</span>
              <p class="record-header">
                <i>回访内容</i>
                <span>跟进人</span>
                <span>回访时间</span>
              </p>
              <ul class="record-footer">
                <li v-for="(item,i) in type.data.visit_content" :key="i">
                  <i>{{item.visit_content}}</i>
                  <span>{{item.sale_name}}</span>
                  <p>{{item.time}}</p>
                </li>
              </ul>
            </Col>
            <Col span="24">
              <span class="record">订单记录</span>
              <p class="record-header">
                <i>购买课程</i>
                <span>年级</span>
                <span>科目</span>
                <span>购买时间</span>
              </p>
              <ul class="record-footer">
                <li v-for="(item,i) in type.data.order" :key="i">
                  <i>{{item.product_name}}</i>
                  <span>{{item.grade}}</span>
                  <span>{{item.subject}}</span>
                  <p>{{item.create_time}}</p>
                </li>
              </ul>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="followUpColse">取消</Button>
        </div>
      </Modal>
    </div>
    <!--  -->
    <template v-if="type.classify == 'followUp'">
      <Modal
        class="modal"
        width="1100"
        v-model="type.classify == 'followUp'"
        title="线索跟进"
        @on-cancel="followUpColse"
      >
        <ul class="tabs">
          <li @click="tab(1)" :class="[num == 1? 'active' : '']">
            <span>跟进</span>
          </li>
          <li
            v-if=" type.status == 'studentpay'"
            @click="tab(2)"
            :class="[num == 2? 'active' : '']"
          >
            <span>订单</span>
          </li>
          <li @click="tab(3)" :class="[num == 3? 'active' : '']">
            <span>预约单</span>
          </li>
        </ul>
        <Form :model="followForm" label-position="top" v-if="num ==1">
          <div style="display:flex;">
            <div style="flex:1">
              <Row>
                <Col span="8">
                  <FormItem style="width:150px;" label="学员姓名">
                    <Input v-model="followForm.student_name" placeholder="姓名"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style="width:150px;" label="注册手机">
                    <Input :title="followForm.tel" v-model="followForm.tel" placeholder="手机号"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style="width:150px;" label="备用电话">
                    <Input v-model="followForm.spare_phone" placeholder="电话"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="性别">
                    <Select v-model="followForm.sex" style="width:150px" placeholder="性别">
                      <Option :value="1">男</Option>
                      <Option :value="2">女</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style="width:150px;" label="年龄">
                    <Input v-model="followForm.age" placeholder="年龄"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="年级">
                    <Select v-model="followForm.grade" style="width:150px" placeholder="年级">
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
                <Col span="8">
                  <FormItem style="width:150px;" label="微信昵称">
                    <Input v-model="followForm.wechat_nick_name" placeholder="学员微信昵称"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style="width:150px;" label="微信号">
                    <Input v-model="followForm.wechat_id" placeholder="请输入微信号"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style="width:150px;" label="城市">
                    <Input v-model="followForm.area" placeholder="请输入城市"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style="width:150px;" label="学校">
                    <Input v-model="followForm.school" placeholder="就读学校"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="教材版本">
                    <Select
                      v-model="followForm.textbook_version"
                      style="width:150px"
                      placeholder="教材版本"
                    >
                      <Option v-for="(list,i) in vaersion" :value="i*1" :key="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="科目">
                    <Select v-model="followForm.subject" style="width:150px" placeholder="科目">
                      <Option v-for="(list,i) in subject" :value="i*1" :key="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="10">
                  <FormItem label="意向度" style="margin-left: 10px">
                    <RadioGroup v-model="followForm.intention_option">
                      <Radio :label="1">高</Radio>
                      <Radio :label="2">中</Radio>
                      <Radio :label="3">低</Radio>
                      <Radio :label="4">无</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span="14">
                  <FormItem label="呼出请况">
                    <RadioGroup class="radios" v-model="phone_status">
                      <Radio :label="1">正常接听</Radio>
                      <Radio :label="2">无人接听</Radio>
                      <Radio :label="3">空号</Radio>
                      <Radio :label="4">挂断</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem
                    label="发送短信"
                    v-if="type.data.many_calls == 2 && type.data.phone_status == 2"
                  >
                    <Button type="text" size="large" @click="send">发送未接通短信提醒</Button>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="回访内容">
                    <Input v-model="vist_content" type="textarea" :rows="3" placeholder="请输入回访内容" />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="下次回访">
                    <DatePicker
                      style="margin:0"
                      v-model="followForm.next_follow_time"
                      format="yyyy-MM-dd HH:mm"
                      type="datetime"
                      :options="optionsDate"
                      :title="item"
                      confirm
                      placeholder="下次回访日期"
                    ></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div style="border-left:1px solid #ccc;margin:0 15px"></div>
            <div style="flex:1;height:500px;overflow-y:auto">
              <Row>
                <Col span="24">
                  <ul class="record-footer">
                    <li v-if="followForm.visit_content" class="visit" v-for="(item,i) in followForm.visit_content" :key="i">
                        <div>
                          {{item.time}}&nbsp;&nbsp;&nbsp;<a href="javascript:;">跟进人:</a>
                          {{item.sale_name}}。
                          </br>
                          <a href="javascript:;">内容:</a>
                          {{item.visit_content }}
                        </div>
                    </li>
                    <li v-else>
                      暂无跟进记录
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
        <template v-if="num ==2">
          <div style="minHeight:500px">
            <p class="record-header">
              <i>购买课程</i>
              <span>年级</span>
              <span>科目</span>
              <span>购买时间</span>
            </p>
            <ul class="record-footer">
              <li v-for="(item,i) in followForm.order" :key="i">
                <i>{{item.product_name}}</i>
                <span>{{item.grade}}</span>
                <span>{{item.subject}}</span>
                <span>{{item.create_time}}</span>
              </li>
            </ul>
          </div>
        </template>
        <template v-if="num == 3">
          <Table border :columns="columns" :data="orderList" height="500"></Table>
        </template>
        <div slot="footer">
          <Button class="followup" type="warning" size="large" @click="followUpRemoveOk">移出</Button>
          <Button class="order" type="warning" size="large" @click="createOrder">订单</Button>
          <Button class="sendSMS" type="warning" size="large" @click="openSms">发送信息</Button>
          <Button type="text" size="large" @click="followUpColse">取消</Button>
          <Button :loading="disableBtn" type="primary" size="large" @click="genjin">确定</Button>
        </div>
      </Modal>
    </template>
    <!--  -->
    <template>
      <Modal
        class="modal"
        width="500"
        v-model="type.classify == 'ringupFollowUp'"
        title="拨打电话"
        @on-cancel="followUpColse"
      >
        <RadioGroup class="radios" v-model="ringupType">
          <Radio :label="1">注册手机号</Radio>
          <Radio :label="2">备用手机号</Radio>
        </RadioGroup>
        <div slot="footer">
          <Button type="text" size="large" @click="followUpColse">取消</Button>
          <Button type="primary" size="large" @click="ringup">确定</Button>
        </div>
      </Modal>
    </template>
    <Loading v-show="Loading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
export default {
  components: {
    Loading,
  },
  props: ["type"],
  mounted() {
    if (this.type.classify == "shade") {
      this.getFenpeiList();
    }
    if (this.type.classify == "followUp") {
      this.followForm.id = this.type.data.id;
      this.followForm.student_name = this.type.data.student_name;
      this.followForm.tel = this.type.data.tel;
      this.followForm.spare_phone = this.type.data.spare_phone;
      this.followForm.sex = this.type.data.sex;
      this.followForm.age = this.type.data.age;
      this.followForm.grade = this.type.data.grade;
      this.followForm.wechat_nick_name = this.type.data.wechat_nick_name;
      this.followForm.wechat_id = this.type.data.wechat_id;
      this.followForm.area = this.type.data.area;
      this.followForm.school = this.type.data.school;
      this.followForm.textbook_version = this.type.data.textbook_version;
      this.followForm.subject = this.type.data.subject;
      this.followForm.intention_option = this.type.data.intention_option;
      this.followForm.visit_content = this.type.data.visit_content;
      this.followForm.order = this.type.data.order;
    }
  },
  computed: {
    ...mapState({
      fenpeiList: (state) => state.daiban.fenpeiList,
      refer: (state) => state.daiban.refer,
    }),
  },
  methods: {
    //跟进tab
    tab(num) {
      this.num = num;
      if (num == 3) {
        this.orderList = this.type.data.appoint;
      }
    },
    openSms() {
      this.$parent.MODtype = true;
      this.$parent.followForm = this.followForm;
    },
    //跟进/订单
    createOrder() {
      this.$parent.showMine = true;
      this.$parent.type.classify = "order";
    },
    //跟进/移出
    followUpRemoveOk() {
      if (!this.vist_content) {
        this.$Message.error("请先填写回访内容");
        return;
      }
      this.isLoading = true;
      this.removeData({ uid: this.type.data.id, note: this.vist_content }).then(
        (res) => {
          if (res.data.ret) {
            this.$Message.success("移出成功");
          }
          this.isLoading = false;
          this.$parent.show = false;
          this.followUpColse();
        }
      );
    },
    //选择呼出手机号
    ringup() {
      this.$parent.show = false;
      this.RingUp({ form: this.type.data, status: this.ringupType })
        .then((res) => {
          this.$parent.show = true;
          this.type.classify = "followUp";
          if (res.data.code == 200) {
            this.$Message.success("呼出成功");
          }
          if (res.data.code == 1000) {
            this.$Message.error({
              content: res.data.error,
              duration: 4,
            });
          }
          this.isLoading = false;
        })
        .catch((e) => {
          if (e) {
            this.isLoading = false;
          }
        });
    },
    //发送短信
    send() {
      this.sendPone(this.type.data.tel).then(() => {
        this.$Message.success("发送成功");
      });
    },
    //跟进（关闭）
    followUpColse() {
      if (this.type.status == "mineclient") {
        this.getClientList({ form: this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "studentpay") {
        this.getStudentList({ form: this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "notvisit") {
        this.getXinfenList({ form: this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "followup") {
        this.getFollowUpList({ form: this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "notcallback") {
        this.getYuQiList({ form: this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "notification") {
        this.getNotificationList({
          form: this.type.form,
          page: this.type.page,
        });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "reserved") {
        this.getReservedList({ ...this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "public") {
        this.getPublicList({ page: this.type.page, form: this.type.form });
        this.$parent.show = false;
      } else {
        this.getKehuList({
          status: storage.getTabStatus(),
          page: this.type.page,
          form: this.type.form,
        });
        this.$parent.show = false;
      }
    },
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        shi +
        ":" +
        fen +
        ":" +
        miao;
      return d;
    },
    //跟进
    genjin() {
      if (this.vist_content == "") {
        this.$Message.error("回访内容是必填的");
        return;
      }
      if (!this.phone_status) {
        this.$Message.error("呼出情况是必选的");
        return;
      }
      this.followForm.phone_status = this.phone_status;
      this.followForm.note = this.note_content;
      this.followForm.order = [];
      if (this.vist_content) {
        this.followForm.visit_content = this.vist_content;
      } else {
        this.followForm.visit_content = "";
      }
      this.Loading = true;
      this.disableBtn = true;
      if (this.type.status == "notvisit") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getXinfenList({ form: this.type.form, page: this.type.page });
        });
        return;
      } else if (this.type.status == "followup") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getFollowUpList({ status: storage.getTabStatus() });
        });
        return;
      } else if (this.type.status == "notcallback") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getYuQiList({ form: this.type.form, page: this.type.page });
        });
        return;
      } else if (this.type.status == "mineclient") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getClientList({ form: this.type.form, page: this.type.page });
        });
        return;
      } else if (this.type.status == "studentpay") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getStudentList({ form: this.type.form, page: this.type.page });
        });
        return;
      } else if (this.type.status == "notification") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getNotificationList({
            form: this.type.form,
            page: this.type.page,
          });
        });
        return;
      } else {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus(),
        }).then((res) => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          } else {
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          // 来自公共资源池呼出刷新
          if (this.type.from == "public") {
            return this.getPublicList({
              form: this.type.form,
              page: this.type.page,
            });
          }
        });
      }
      this.disableBtn = false;
    },
    ...mapMutations(["setXiaoshowId"]),
    ...mapActions([
      "getFenpeiList",
      "removeData",
      "RingUp",
      "getReservedList",
      "getNotificationList",
      "sendPone",
      "getStudentList",
      "getClientList",
      "fenPai",
      "Genjin",
      "getPublicList",
      "getKehuList",
      "getXinfenList",
      "getFollowUpList",
      "getYuQiList",
    ]),
    no() {
      this.showFenpei = false;
      this.$parent.show = false;
    },
    yes() {
      this.Loading = true;
      this.showFenpei = false;
      this.fenPai({ form: this.form, status: this.$parent.num }).then((res) => {
        if (res.data.ret) {
          this.$Message.success("分配成功");
        } else {
          this.$Message.error(res.data.ret);
        }
        this.$parent.show = false;
        this.$parent.checkall = "";
        this.Loading = false;
      });
    },
    colse() {
      this.showShade = false;
      this.$parent.show = false;
    },
    confirm() {
      if (!this.form.sale_name) {
        this.$Message.error("请选择人员再分配");
        return;
      }
      this.showShade = false;
      this.showFenpei = true;
    },
    selected(e) {
      for (var i = 0; i < this.fenpeiList.length; i++) {
        if (this.fenpeiList[i].login_name == this.form.sale_name) {
          this.setXiaoshowId(this.fenpeiList[i]);
        }
      }
    },
  },
  data() {
    return {
      columns: [
        { title: "试听课程", key: "course_name" },
        { title: "年级/科目", key: "grade_subject" },
        { title: "教师", key: "coach_id" },
        { title: "上课日期", key: "date_time", width: 150 },
        { title: "状态", key: "appoint_status" },
        {
          title: "备注",
          key: "note",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        { title: "创建人", key: "create_user", align: "center" },
        { title: "创建时间", key: "create_time", width: 170 },
      ],
      num: 1,
      followForm: {},
      showRemove: false,
      removeNote: "",
      disableBtn: false,
      ringupType: 1,
      optionsDate: {
        disabledDate: (time) => {
          let curDate = new Date().getTime();
          let three = 7 * 24 * 3600 * 1000;
          let threeMonths = curDate + three;
          return time.getTime() < Date.now() || time.getTime() > threeMonths;
        },
      },
      phone_status: "",
      intention: storage.getDaiban().screen_list.inter_nation,
      subject: storage.getDaiban().screen_list.subject,
      vaersion: storage.getDaiban().screen_list.book_version,
      vist_content: "",
      note_content: "",
      object: {},
      Loading: false,
      showFenpei: false,
      showShade: true,
      form: {},
      item: null,
    };
  },
};
</script>

<style scoped>
.sendSMS {
  position: absolute;
  left: 165px;
}
.order {
  position: absolute;
  left: 90px;
}
.followup {
  position: absolute;
  left: 20px;
}
.record-footer li.visit {
  letter-spacing: 1px;
  line-height: 25px;
  margin-bottom: 15px;
}
.record-footer li {
  display: flex;
  width: 100%;
}
.record-footer {
  display: flex;
  flex-direction: column;
}
.record-header > span {
  width: 130px;
}
.record-header > i {
  flex: 1;
}
.record-header {
  display: flex;
  height: 30px;
  line-height: 30px;
}
.record {
  width: 100%;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  background-color: rgba(242, 242, 242, 1);
  text-indent: 15px;
}

.shade-bottom div.record > ul > li > p {
  width: 100px;
}
.shade-bottom div.record > ul > li > span {
  width: 100px;
}
.shade-bottom div.record > ul > li > i {
  flex: 1;
}
.shade-bottom div.record > ul > li {
  display: flex;
  width: 100%;
  margin: 0;
}
.shade-bottom div.record > ul {
  display: flex;
}
.shade-bottom div.record > p > span {
  width: 100px;
}
.shade-bottom div.record > p > i {
  flex: 1;
}
.shade-bottom div.record > p {
  height: 30px;
  line-height: 30px;
  display: flex;
}
.shade-bottom div.record > span {
  width: 100%;
  display: inline-block;
  background: #666;
  color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  text-indent: 15px;
}
.shade-bottom div.record {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.shade-bottom ul li .radios {
  margin: -34px;
  margin-left: 100px;
}
</style>
