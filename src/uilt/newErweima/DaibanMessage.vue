<template>
  <div class="boxs">
    <div class="shade" v-if="type.classify == 'shade'">
      <Modal v-model="showShade" title="分配" @on-cancel="colse">
        <template v-if="type.status == 'payingstudent'">
          <Select
            v-model="form.sale_name"
            style="width:150px;margin-bottom:20px"
            @on-change="selected"
            placeholder="选择人员"
          >
            <Option
              v-for="(list,i) in payList"
              :key="i"
              :value="list.login_name"
            >{{list.login_name}}</Option>
          </Select>
        </template>
        <template v-else>
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
        </template>
        <Input
          v-if="type.status != 'payingstudent'"
          v-model="form.assign_note"
          type="textarea"
          :rows="4"
          placeholder="分配说明"
        />
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
    <div class="message" v-if="message">
      <span>操作成功</span>
    </div>
    <!--  -->
    <div v-else-if="type.classify == 'datalis'">
      <Modal
        class="modal"
        width="1100"
        v-model="type.classify == 'datalis'"
        title="学员详情"
        @on-cancel="followUpColse"
        :styles="{'margin-top' : '-70px'}"
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
                <Input readonly v-model="type.data.age" placeholder="年龄"></Input>
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
              <FormItem style="width:150px;" label="学员地区">
                <Input readonly v-model="type.data.area" placeholder="请输入学员地区"></Input>
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
              <FormItem label="意向科目">
                <Select v-model="type.data.subject" style="width:150px" placeholder="意向科目" disabled>
                  <Option v-for="(list,i) in subject" :key="i*1" :value="list">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="意向度">
                <Select
                  v-model="type.data.intention_option"
                  style="width:150px"
                  placeholder="意向度"
                  disabled
                >
                  <Option v-for="(list,i) in intention" :key="i*1" :value="list">{{list}}</Option>
                </Select>
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
                  disabled
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
                  disabled
                  style="margin:0"
                  v-model="type.data.next_follow_time"
                  format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  class="datepicker"
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
        :styles="{'margin-top' : '-70px'}"
        class="modal"
        width="1100"
        v-model="type.classify == 'followUp'"
        title="线索跟进"
        @on-cancel="followUpColse"
      >
        <Form :model="followForm" label-position="top" style="height:500px;overflow-y:auto;">
          <Row>
            <Col span="4">
              <FormItem style="width:150px;" label="学员姓名">
                <Input v-model="followForm.student_name" placeholder="姓名"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="注册手机">
                <Input :title="followForm.tel" readonly v-model="followForm.tel" placeholder="手机号"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="备用电话">
                <Input v-model="followForm.spare_phone" placeholder="电话"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="性别">
                <Select v-model="followForm.sex" style="width:150px" placeholder="性别">
                  <Option :value="1">男</Option>
                  <Option :value="2">女</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="年龄">
                <Input v-model="followForm.age" placeholder="年龄"></Input>
              </FormItem>
            </Col>
            <Col span="4">
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
            <Col span="4">
              <FormItem style="width:150px;" label="微信昵称">
                <Input v-model="followForm.wechat_nick_name" placeholder="学员微信昵称"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="微信号">
                <Input v-model="followForm.wechat_id" placeholder="请输入微信号"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="学员地区">
                <Input v-model="followForm.area" placeholder="请输入学员地区"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem style="width:150px;" label="学校">
                <Input v-model="followForm.school" placeholder="就读学校"></Input>
              </FormItem>
            </Col>
            <Col span="4">
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
            <Col span="4">
              <FormItem label="意向科目">
                <Select v-model="followForm.subject" style="width:150px" placeholder="意向科目">
                  <Option v-for="(list,i) in subject" :value="i*1" :key="i">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="意向度">
                <Select v-model="followForm.intention_option" style="width:150px" placeholder="意向度">
                  <Option v-for="(list,i) in intention" :value="i *1" :key="i">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
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
                <Input v-model="vist_content" type="textarea" :rows="4" placeholder="请输入回访内容" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="下次回访">
                <DatePicker
                  style="margin:0"
                  v-model="followForm.next_follow_time"
                  format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  class="datepicker"
                  :options="optionsDate"
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
                <li v-for="(item,i) in followForm.visit_content" :key="i">
                  <i>{{item.visit_content}}</i>
                  <span>{{item.sale_name}}</span>
                  <span>{{item.time}}</span>
                </li>
              </ul>
            </Col>
            <Col span="24" v-if="type.status == 'studentpay'">
              <span class="record">订单记录</span>
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
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button class="followup" type="warning" size="large" @click="followUpRemoveOk">移出</Button>
          <Button class="order" type="warning" size="large" @click="createOrder">订单</Button>
          <Button type="text" size="large" @click="followUpColse">取消</Button>
          <Button :loading="disableBtn" type="primary" size="large" @click="genjin">确定</Button>
        </div>
      </Modal>
    </template>
    <!--  -->
    <template>
      <Modal
        :styles="{'margin-top' : '-70px'}"
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
    <!--  -->
    <div class="shiftOut" v-if="type.classify == 'shiftOut'">
      <p>确定将此客户移入至公共客户区域?</p>
      <div>
        <button class="btn confirm" @click="shiftOut">是</button>
        <button class="btn cancel" @click="no">否</button>
      </div>
    </div>
    <!--  -->
    <div class="shiftOut" v-if="type.classify == 'shiftTo'">
      <p>确定将此客户移入至代办客户区域?</p>
      <div>
        <button class="btn confirm" @click="shiftOut">是</button>
        <button class="btn cancel" @click="no">否</button>
      </div>
    </div>
    <div class="followUp dingdan" v-if="type.classify == 'dingdan'">
      <i @click="$parent.show = false">×</i>
      <div class="context">
        <div class="shade-top">
          <div>
            <img src="../../assets/img/touxiang/png24.png" alt />
            <span>创建订单</span>
          </div>
        </div>
        <div class="shade-bottom">
          <ul>
            <li>
              上课老师:
              <input type="text" v-model="object.class_coach" style="width:150px" />
            </li>
            <li>
              报班金额:
              <input
                type="text"
                onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                v-model="object.order_amount"
                style="width:150px"
              />
              <span>/元</span>
            </li>
            <li class="noRight">
              下单金额:
              <input
                type="text"
                onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                v-model="object.pay_amount"
                style="width:150px"
              />
              <span>/元</span>
            </li>

            <li>
              上课时间:
              <DatePicker
                v-model="dingdanNext"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                class="datepicker"
                :lang="lang"
                confirm
                @confirm="setNextTime"
              ></DatePicker>
            </li>

            <li>
              报班时间 :
              <DatePicker
                value-format=" yyyy-MM-dd HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
                v-model="dingdanClass"
                type="datetime"
                class="datepicker"
                :lang="lang"
                confirm
                @confirm="setClassTime"
              ></DatePicker>
            </li>
          </ul>
          <div class="btnThree">
            <span @click="dingdan">确定</span>
            <span class="cancel" @click="$parent.show = false">取消</span>
          </div>
        </div>
      </div>
    </div>
    <div class="followUp dingdan ding" v-if="type.classify == 'ding'">
      <i @click="$parent.show = false">×</i>
      <div class="context">
        <div class="shade-top">
          <div>
            <img src="../../assets/img/touxiang/png24.png" alt />
            <span v-if="type.status == 'ding'">订单详情</span>
            <span v-else>创建订单</span>
          </div>
        </div>
        <div class="shade-bottom">
          <ul>
            <li>
              上课老师:
              <input type="text" v-model="type.data.class_coach" readonly="readonly" />
            </li>
            <li>
              报班金额:
              <input type="text" v-model="type.data.order_amount" readonly="readonly" />
              <span>/元</span>
            </li>
            <li class="noRight">
              下单金额:
              <input type="text" v-model="type.data.pay_amount" readonly="readonly" />
              <span>/元</span>
            </li>

            <li>
              上课时间:
              <DatePicker
                v-model="type.data.class_time"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                class="datepicker"
                :lang="lang"
                confirm
                @confirm="setNextTime"
              ></DatePicker>
            </li>

            <li>
              报班时间 :
              <DatePicker
                value-format=" yyyy-MM-dd HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
                v-model="type.data.entry_time"
                type="datetime"
                class="datepicker"
                :lang="lang"
                confirm
                @confirm="setClassTime"
              ></DatePicker>
            </li>
          </ul>
          <div class="btnThree">
            <span @click="dingdan" v-if="type.status != 'ding'">确定</span>
            <span class="cancel" @click="$parent.show = false" v-else>取消</span>
          </div>
        </div>
      </div>
    </div>
    <div class="report" v-if="type.classify == 'report'">
      <div class="report-top">
        <span>学情报告</span>
        <i @click="$parent.show = false">×</i>
      </div>
      <div class="contanner">
        <div class="report-content">
          <div>
            <span>报告内容:</span>
            <div>
              <textarea
                v-model="reportContent"
                class="textarea textlet"
                cols="30"
                placeholder="请输入报告内容"
                rows="10"
              ></textarea>
            </div>
          </div>
          <h4>报告记录</h4>
          <p>
            <i>报告内容</i>
            <span>提交时间</span>
            <span>提交人</span>
          </p>
          <ul>
            <li v-for="(item,i) in report" :key="i">
              <i>{{item.order_report}}</i>
              <span>{{item.create_time}}</span>
              <span>{{item.master_id}}</span>
            </li>
          </ul>
        </div>
        <div class="report-bottom">
          <p class="confirm" @click="$parent.show = false">
            <span>取消</span>
          </p>
          <p @click="addreport">
            <span>确定</span>
          </p>
        </div>
      </div>
    </div>
    </Modal>-->
    <Loading v-show="Loading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../loading/loading";
import storage from "../storage";
export default {
  components: {
    Loading
  },
  props: ["type"],
  mounted() {
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
      // this.followForm.next_follow_time = this.type.data.next_follow_time;
      this.followForm.visit_content = this.type.data.visit_content;
      this.followForm.order = this.type.data.order;
    }
    if (this.type.classify == "report") {
      this.getReport(this.type.data.id);
    }
    if (this.type.data) {
      if (this.type.data.class_date) {
        this.classTime = this.type.data.class_date;
      }
      if (this.type.data.next_follow_time) {
        this.nextTime = this.type.data.next_follow_time;
      }
    }
  },
  computed: {
    ...mapState({
      report: state => state.minestudent.report,
      payList: state => state.payingstudent.payList,
      fenpeiList: state => state.daiban.fenpeiList,
      refer: state => state.daiban.refer
    })
  },
  methods: {
    //跟进/订单
    createOrder() {
      this.$parent.showMine = true;
      this.$parent.type.classify = "order";
    },
    //跟进/移出
    followUpRemoveOk() {
      if (this.vist_content == "") {
        this.$Message.error("请先填写回访内容");
        return;
      }
      this.isLoading = true;
      this.removeData({ uid: this.type.data.id, note: this.vist_content }).then(
        res => {
          if (res.data.ret) {
            this.$Message.success("移出成功");
          }
          this.isLoading = false;
          this.showRemove = false;
          this.$parent.show = false;
          this.followUpColse();
        }
      );
    },
    //选择呼出手机号
    ringup() {
      this.$parent.show = false;
      this.RingUp({ form: this.type.data, status: this.ringupType })
        .then(res => {
          this.$parent.show = true;
          this.type.classify = "followUp";
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
    //发送短信
    send() {
      this.sendPone(this.type.data.tel).then(() => {
        this.$Message.success("发送成功");
      });
    },
    //新增学情报告
    addreport() {
      this.isLoading = true;
      this.addRepost({
        id: this.type.data.id,
        order_report: this.reportContent
      }).then(() => {
        this.isLoading = false;
        this.$parent.show = false;
      });
    },
    dingdan() {
      if (!this.object.class_coach) {
        alert("请输入上课的老师");
        return;
      } else if (!this.object.order_amount) {
        alert("请输入报班金额");
        return;
      } else if (!this.object.pay_amount) {
        alert("请输入下单金额");
        return;
      } else if (this.dingdanNext == "") {
        alert("请选择上课的时间");
        return;
      } else if (this.dingdanClass == "") {
        alert("请选择报班的时间");
        return;
      }
      this.isLoading = true;
      this.updataDing({ cid: this.type.data.id, item: this.object }).then(
        res => {
          this.isLoading = false;
          this.$parent.show = false;
        }
      );
    },
    followUpColse() {
      if (this.type.status == "mineclient") {
        this.getClientList({ form: this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "reserved") {
        this.$parent.show = false;
        this.getReservedList({ form: this.type.form, page: this.type.page });
        return;
      } else if (this.type.status == "reservedall") {
        this.$parent.show = false;
        this.getReservedAllList({
          form: this.type.form,
          page: this.type.page
        });
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
          page: this.type.page
        });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "reserved") {
        this.getReservedList({ ...this.type.form, page: this.type.page });
        this.$parent.show = false;
        return;
      } else if (this.type.status == "paystudent") {
        this.getPaystudent({ page: 1, form: {} });
        this.$parent.show = false;
      } else if (this.type.status == "uplist") {
        this.getUplist({ page: 1, form: {} });
        this.$parent.show = false;
      } else if (this.type.status == "minestudent") {
        this.getmStudent({ page: 1, form: {} });
        this.$parent.show = false;
      } else {
        this.getKehuList({ status: storage.getTabStatus() });
        this.$parent.show = false;
      }
    },
    setNextTime(time) {
      if (this.type.classify == "followUp") {
        this.type.data.next_follow_time = this.datePicker(time);
      } else {
        this.object.class_time = this.datePicker(time);
      }
    },
    setClassTime(time) {
      if (this.type.classify == "followUp") {
        this.type.data.class_date = this.datePicker(time);
      } else {
        this.object.entry_time = this.datePicker(time);
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
    shiftOut() {
      this.Loading = true;
      this.ShiftOut(this.type).then(res => {
        if (this.type.classify == "shiftOut") {
          if (this.type.status == "notvisit") {
            this.getXinfenList({ form: this.type.form, page: this.type.page });
          } else if (this.type.status == "followup") {
            this.getFollowUpList({
              form: this.type.form,
              page: this.type.page
            });
          } else {
            this.getKehuList({ status: storage.getTabStatus() });
          }
        } else {
          this.getPublicList({});
        }
        this.message = true;
        this.Loading = false;
        setTimeout(() => {
          this.message = false;
          this.$parent.show = false;
        }, 2000);
      });
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
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
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
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
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
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getYuQiList({ form: this.type.form, page: this.type.page });
        });
        return;
      } else if (this.type.status == "paystudent") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getPaystudent({ page: "", form: {} });
        });
        return;
      } else if (this.type.status == "uplist") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getUplist({ page: "", form: {} });
        });
        return;
      } else if (this.type.status == "minestudent") {
        let cid = this.type.data.id;
        let content = this.type.data.visit_content;
        this.setmStudent({ cid, content }).then(res => {
          this.$parent.show = false;
          this.Loading = false;
          this.getmStudent({ page: "", form: {} });
        });
        return;
      } else if (this.type.status == "mineclient") {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
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
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
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
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getNotificationList({
            form: this.type.form,
            page: this.type.page
          });
        });
        return;
      } else {
        this.Genjin({
          type: this.followForm,
          status: storage.getTabStatus()
        }).then(res => {
          if (res.data.ret) {
            this.$Message.success("跟进成功");
          }else{
            this.$Message.error(res.data.error);
          }
          this.$parent.show = false;
          this.Loading = false;
          this.getKehuList({ status: storage.getTabStatus() });
        });
      }
      this.disableBtn = false;
    },
    ...mapMutations(["setXiaoshowId", "setType", "setXiaoshowIdPay"]),
    ...mapActions([
      "getReservedAllList",
      "removeData",
      "RingUp",
      "getReservedList",
      "getNotificationList",
      "sendPone",
      "getStudentList",
      "getClientList",
      "getFenStu",
      "addRepost",
      "getReport",
      "setmStudent",
      "getmStudent",
      "setPayStu",
      "getPayList",
      "getReferList",
      "fenPai",
      "Genjin",
      "ShiftOut",
      "getPublicList",
      "getXinfenList",
      "getKehuList",
      "getXinfenList",
      "getFollowUpList",
      "getFollowUpList",
      "updataDing",
      "getYuQiList",
      "getPaystudent",
      "getUplist"
    ]),
    no() {
      this.showFenpei = false;
      this.$parent.show = false;
    },
    yes() {
      this.Loading = true;
      this.showFenpei = false;
      if (this.type.status == "payingstudent") {
        this.setPayStu({ form: this.form }).then(res => {
          this.message = false;
          this.$parent.show = false;
          this.Loading = false;
        });
      } else {
        this.fenPai({ form: this.form, status: this.$parent.num }).then(res => {
          this.message = false;
          this.$parent.show = false;
          this.$parent.checkall = "";
          this.Loading = false;
        });
      }
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
      if (this.type.status == "payingstudent") {
        for (var i = 0; i < this.payList.length; i++) {
          if (this.payList[i].login_name == this.form.sale_name) {
            this.setXiaoshowIdPay(this.payList[i]);
          }
        }
      } else {
        for (var i = 0; i < this.fenpeiList.length; i++) {
          if (this.fenpeiList[i].login_name == this.form.sale_name) {
            this.setXiaoshowId(this.fenpeiList[i]);
          }
        }
      }
    }
  },
  data() {
    return {
      followForm: {},
      showRemove: false,
      removeNote: "",
      disableBtn: false,
      ringupType: 1,
      optionsDate: {
        disabledDate: time => {
          let curDate = new Date().getTime();
          let three = 7 * 24 * 3600 * 1000;
          let threeMonths = curDate + three;
          return time.getTime() < Date.now() || time.getTime() > threeMonths;
        }
      },
      phone_status: "",
      intention: storage.getDaiban().screen_list.inter_nation,
      subject: storage.getDaiban().screen_list.subject,
      vaersion: storage.getDaiban().screen_list.book_version,
      reportContent: "",
      isHuchu: true,
      vist_content: "",
      note_content: "",
      dingdanClass: "",
      dingdanNext: "",
      object: {},
      nextTime: "",
      classTime: "",
      Loading: false,
      message: false,
      showFenpei: false,
      showShade: true,
      form: {},
      item: null,
      time: null,
      isItem: false
    };
  }
};
</script>

<style scoped>
.order {
  position: absolute;
  left: 90px;
}
.followup {
  position: absolute;
  left: 20px;
}
.record-footer li span {
  width: 150px;
}
.record-footer li i {
  flex: 1;
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
  width: 150px;
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
.report-bottom > p.confirm > span {
  color: #fff;
}
.report-bottom > p.confirm {
  background: #dbdbdb;
  margin-right: 15px;
}
.report-bottom > p > span {
  color: #fff;
}
.report-bottom > p > span.confirm {
  background: #dbdbdb;
}
.report-bottom > p {
  width: 120px;
  height: 40px;
  background: #1b73b0;
  color: #fff;
  font-size: 14px;
  display: inline-block;
  border-radius: 7px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.report-bottom {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.report-content > ul > li > span {
  width: 150px;
  text-align: center;
}
.report-content > ul > li > i {
  font-style: normal;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.report-content > ul > li {
  display: flex;
  height: 40px;
  line-height: 40px;
}
.report-content > ul {
  display: flex;
  flex-direction: column;
}
.report-content > p > span {
  width: 150px;
  text-align: center;
}
.report-content > p > i {
  font-style: normal;
  flex: 1;
}
.report-content > p {
  display: flex;
  border-bottom: 1px solid #999;
  height: 40px;
  line-height: 40px;
}
.report-content > h4 {
  height: 40px;
  line-height: 40px;
  background: #e8e8e8;
  text-indent: 10px;
  margin-top: 30px;
}
.report-content > div textarea {
  border: 1px solid #999;
  border-radius: 5px;
}
.report-content > div > div {
  flex: 1;
  margin-left: 15px;
}
.report-content > div {
  display: flex;
  margin-top: 15px;
}
.report > .report-top > i {
  font-style: normal;
  font-size: 25px;
  text-align: right;
  flex: 1;
  cursor: pointer;
  margin-right: 20px;
}
.report > .report-top {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #999;
}
.report > .report-top > span {
  font-size: 16px;
  color: #333;
  text-align: left;
  flex: 1;
  margin-left: 20px;
}
.report .contanner {
  margin: 0 20px;
}
.report {
  width: 900px;
  height: 520px;
  background: #fff;
  overflow-y: auto;
}
.contaner.paystu {
  height: 240px;
}
.shade-bottom div.record > ul > li > p {
  width: 150px;
}
.shade-bottom div.record > ul > li > span {
  width: 150px;
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
  width: 150px;
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
.ringdown > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ringdown .btn {
  background: #1b73b0;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 30px;
  margin-bottom: 10px;
  cursor: pointer;
}
.ringdown p {
  margin: 15px;
  font-size: 14px;
  color: #333;
}
.ringdown span {
  display: inline-block;
  background: #1b73b0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 13px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #fff;
}
.ringdown {
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.huchu span {
  padding: 25px 10px;
  color: #333;
  font-size: 14px;
  display: inline-block;
}
.huchu {
  background: #fff;
  border-radius: 10px;
}
.textlet {
  border-right: 1px solid #ccc;
}
.followUp.dingdan .shade-bottom ul li span {
  position: absolute;
  right: -25px;
}
.followUp.dingdan .shade-bottom ul li {
  position: relative;
}
.followUp.dingdan {
  height: 420px;
  width: 480px;
}
/*  */
.shiftOut p {
  margin-bottom: 20px;
}
.shiftOut div .btn.cancel {
  border: 2px solid #1b73b0;
  color: #1b73b0;
}
.shiftOut div .btn.confirm {
  background: #1b73b0;
  margin-right: 30px;
}
.shiftOut div .btn {
  width: 100px;
  height: 30px;
  cursor: pointer;
}
.shiftOut {
  width: 334px;
  height: 110px;
  border-radius: 10px;
  color: #333;
  font-size: 14px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mx-datepicker.datepicker {
  margin-top: -50px;
  width: 172px;
  height: 25px;
  margin-left: 100px;
  margin-top: -35px;
}
.mx-input {
  width: 130px !important;
  height: 25px;
}
/*  */
.textarea {
  resize: none;
  border: none;
  outline: none;
  width: 100%;
}
/*  */
.shade-content ul li {
  width: 209px;
  color: #333;
  font-size: 14px;
  margin: 30px 0;
}
/*  */
.operation .close {
  width: 150px;
  height: 35px;
  background-color: #1b73b0;
  color: #fff;
  font-size: 14px;
  display: inline-block;
  border-radius: 5px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
.selected.info {
  width: 130px;
  height: 34px;
  outline: none;
  border-color: #c0c0c0;
  border-radius: 5px;
  appearance: none;
  background: url("../../assets/img/xiala/png24.png") no-repeat scroll right
    center transparent;
  padding-right: 20px;
  background-size: 12px 7px;
  background-position-x: 110px;
  text-indent: 5px;
  float: right;
  line-height: 34px;
}
.selected {
  width: 150px;
  height: 34px;
  outline: none;
  border-color: #c0c0c0;
  border-radius: 5px;
  appearance: none;
  background: url("../../assets/img/xiala/png24.png") no-repeat scroll right
    center transparent;
  padding-right: 20px;
  background-size: 12px 7px;
  background-position-x: 124px;
  text-indent: 5px;
  float: right;
  line-height: 34px;
}
.shade-bottom ul li.noRight {
  margin-right: 0px;
}
.shade-bottom ul li {
  width: 251px;
  margin: 10px 63px 10px 0;
  font-size: 14px;
  color: #333;
  height: 34px;
  line-height: 34px;
}
.shade-bottom ul li input {
  border: none;
  border: 1px solid #c0c0c0;
  width: 143px;
  height: 34px;
  border-radius: 5px;
  outline: none;
  text-indent: 5px;
  box-sizing: border-box;
  margin-left: 20px;
  float: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;
  cursor: all-scroll;
}
.shade-bottom ul {
  display: flex;
  flex-wrap: wrap;
}
/*  */
.xiaci {
  margin-left: -26px;
  display: inline-block;
  margin-top: 10px;
}
.shade-bottom div.btnThree span.cancel {
  border: 2px solid #1b73b0;
  box-sizing: border-box;
  color: #1b73b0;
  background-color: #fff;
  line-height: 30px;
}
.shade-bottom div.btnThree span {
  display: inline-block;
  width: 100px;
  height: 35px;
  color: #fff;
  background-color: #1b73b0;
  text-align: center;
  line-height: 35px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 50px;
}
.btnThree {
  display: flex;
  justify-content: center;
}
.followUp .shade-bottom {
  text-align: left;
  position: relative;
}
.followUp {
  width: 1050px;
  height: 700px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  overflow-y: auto;
}

.shade-bottom div span {
  width: 80px;
  text-align: center;
}
.shade-bottom div {
  display: flex;
  width: 100%;
  font-size: 14px;
  color: #333;
  margin-top: 30px;
  margin-bottom: 20px;
}
.shade-bottom div div {
  border: 1px solid #ccc;
  height: 80px;
  text-indent: 5px;
  border-radius: 5px;
  padding: 5px;
  margin-top: 0;
}
.followUp > i {
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 10px;
  cursor: pointer;
  color: #666;
}
.context .shade-top img {
  width: 15px;
  height: 19px;
  margin-right: 5px;
}
.context .shade-top div {
  display: flex;
  background: #1b73b0;
  color: #fff;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.context {
  margin: 0 40px;
}
.message span {
  color: #333;
  font-size: 14px;
}
.message {
  width: 134px;
  height: 47px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  line-height: 47px;
}
/*  */
.shade-content .handel {
  margin: 40px auto;
}
.shade-content .btn.cancel {
  border: 2px solid #1b73b0;
  color: #1b73b0;
}
.shade-content .btn.confirm {
  background: #1b73b0;
  margin-right: 35px;
}
.shade-content .btn {
  width: 80px;
  height: 35px;
  cursor: pointer;
}
.shade-content .text span {
  display: inline-block;
}
.shade-content .text {
  font-size: 14px;
  color: #333;
  display: flex;
}
.shade-content .text textarea {
  resize: none;
  outline: none;
  border: none;
  overflow: hidden;
  text-indent: 2px;
}
input {
  border: none;
  outline: none;
}
.shade-content .text div {
  border: 1px solid #ccc;
  width: 491px;
  height: 138px;
  text-indent: 5px;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.shade-content {
  display: flex;
  flex-direction: column;
}

.shade-top {
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
}
.shade-top .btn {
  width: 80px;
  height: 35px;
  background: #1b73b0;
  margin-top: 20px;
}
.btn {
  border: none;
  outline: none;
  color: #fff;
  background: #fff;
  border-radius: 5px;
  font-size: 14px;
}
.boxs {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contaner {
  width: 736px;
  height: 390px;
  background: #fff;
  border-radius: 10px;
}
.contaner > div {
  margin: 0 50px;
}
</style>
