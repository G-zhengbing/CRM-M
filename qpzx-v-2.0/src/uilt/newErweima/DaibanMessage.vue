<template>
  <div class="boxs">
    <div class="shade" v-if="type.classify == 'shade'">
      <div class="contaner" v-if="showShade" :class="{paystu:type.status == 'payingstudent'}">
        <div>
          <div class="shade-top">
            <button class="btn">分配</button>
          </div>
          <div class="shade-content">
            <ul>
              <template v-if="type.status == 'payingstudent'">
                <li>
                  选择人员 :
                  <select class="selected info" v-model="form.sale_name" @change="selected()">
                    <option
                      v-for="(list,i) in payList"
                      :key="i"
                      :value="list.login_name"
                    >{{list.login_name}}</option>
                  </select>
                </li>
              </template>
              <template v-else>
                <li>
                  <select class="selected info" v-model="form.sale_name" @change="selected()">
                    <option
                      v-for="(list,i) in fenpeiList"
                      :key="i"
                      :value="list.login_name"
                    >{{list.login_name}}</option>
                  </select>
                </li>
              </template>
            </ul>
            <div class="text" v-if="type.status != 'payingstudent'">
              <span>分配说明 :&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div>
                <input readonly="readonly" type="text" />
                <textarea cols="30" rows="8" v-model="form.assign_note"></textarea>
              </div>
            </div>
            <div class="handel">
              <button class="btn confirm" @click="confirm">确定</button>
              <button class="btn cancel" @click="colse">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="fenpei shiftOut" v-if="showFenpei">
      <p>是否分配给{{form.sale_name}} ?</p>
      <div>
        <button class="btn confirm" @click="yes">是</button>
        <button class="btn cancel" @click="no">否</button>
      </div>
    </div>
    <!--  -->
    <div class="message" v-if="message">
      <span>操作成功</span>
    </div>
    <!--  -->
    <div class="datalis" v-else-if="type.classify == 'datalis'">
      <i @click="$parent.show = false" class="datalis-colse">×</i>
      <div class="context">
        <div class="shade-top">
          <div>
            <img src="../../assets/img/touxiang/png24.png" alt />
            <span>学员详情</span>
          </div>
        </div>
        <div class="shade-bottom">
          <ul>
            <li>
              学&nbsp;&nbsp;员&nbsp;姓&nbsp;名:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.student_name"
                :title="type.data.student_name"
              />
            </li>
            <li>
              跟&nbsp;&nbsp;&nbsp;&nbsp;进&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人:
              <input
                type="text"
                v-model="type.data.follow_sale_name"
                :title="type.data.follow_sale_name"
                readonly="readonly"
              />
            </li>
            <li class="noRight">
              渠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道:
              <input
                type="text"
                v-model="type.data.refer"
                :title="type.data.refer"
                readonly="readonly"
              />
            </li>
            <!--  -->
            <li>
              推&nbsp;&nbsp;&nbsp;荐&nbsp;&nbsp;&nbsp;&nbsp;人:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.recommend_name"
                :title="type.data.recommend_name"
              />
            </li>
            <li>
              创&nbsp;&nbsp;建&nbsp;&nbsp;时&nbsp;&nbsp;间:
              <input
                type="text"
                v-model="type.data.create_time"
                readonly="readonly"
                :title="type.data.create_time"
              />
            </li>
            <li class="noRight">
              学&nbsp;&nbsp;员&nbsp;&nbsp;电&nbsp;&nbsp;话:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.mobile"
                :title="type.data.mobile"
              />
            </li>
            <!--  -->
            <li>
              所 在 学 校 :
              <input type="text" readonly="readonly" v-model="type.data.school" />
            </li>
            <li>
              年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.age"
                :title="type.data.age"
              />
            </li>
            <li class="noRight">
              性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.sex"
                :title="type.data.sex"
              />
            </li>
            <!--  -->
            <li>
              所 在 年 级 :
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.grade"
                :title="type.data.grade"
              />
            </li>
            <li>
              意向科目:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.subject"
                :title="type.data.subject"
              />
            </li>
            <li class="noRight">
              是 &nbsp;否 &nbsp;约&nbsp; 课 :
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.is_course"
                :title="type.data.is_course"
              />
            </li>
            <!--  -->
            <li>
              意&nbsp;&nbsp;&nbsp;向&nbsp;&nbsp;&nbsp;&nbsp;度:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.intention_option"
                :title="type.data.intention_option"
              />
            </li>
            <li>
              下次跟进时间:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.next_follow_time"
                :title="type.data.next_follow_time"
              />
            </li>
            <li class="noRight">
              约&nbsp;&nbsp;课&nbsp;&nbsp;时&nbsp;&nbsp;间:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.class_date"
                :title="type.data.class_date"
              />
            </li>
            <li>
              跟进状态:
              <input
                type="text"
                readonly="readonly"
                v-model="type.data.follow_status"
                :title="type.data.follow_status"
              />
            </li>
          </ul>
          <div class="record">
            <span>跟进记录</span>
            <p>
              <i>回访内容</i>
              <span>跟进人</span>
              <span>回访时间</span>
            </p>
            <ul>
              <li v-for="(item,i) in type.data.visit_content">
                <i>{{item.visit_content}}</i>
                <span>{{item.sale_name}}</span>
                <p>{{item.time}}</p>
              </li>
            </ul>
          </div>
          <div class="record">
            <span>订单记录</span>
            <p>
              <i>购买课程</i>
              <span>年级</span>
              <span>科目</span>
              <span>购买时间</span>
            </p>
            <ul>
              <li v-for="(item,i) in type.data.order">
                <i>{{item.product_name}}</i>
                <span>{{item.grade}}</span>
                <span>{{item.subject}}</span>
                <p>{{item.create_time}}</p>
              </li>
            </ul>
          </div>
          <div class="operation" style="justify-content: center;">
            <span class="close" @click="$parent.show = false">关闭</span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="followUp" v-else-if="type.classify == 'followUp'">
      <i @click="followUpColse">×</i>
      <div class="context">
        <div class="shade-top">
          <div>
            <img src="../../assets/img/touxiang/png24.png" alt />
            <span>线索跟进</span>
          </div>
        </div>
        <div class="shade-bottom">
          <ul>
            <li>
              学员姓名:
              <input
                type="text"
                v-model="type.data.student_name"
                readonly="readonly"
                style="width:150px"
              />
            </li>
            <li>
              注册手机:
              <input
                type="text"
                v-model="type.data.mobile"
                readonly="readonly"
                style="width:150px"
              />
            </li>
            <li class="noRight">
              备用电话:
              <input
                type="text"
                v-model="type.data.spare_phone"
                readonly="readonly"
                style="width:150px"
              />
            </li>
            <li>
              微信昵称:
              <input
                type="text"
                v-model="type.data.nick_name"
                readonly="readonly"
                style="width:150px"
              />
            </li>
            <li>
              学校:
              <input
                type="text"
                v-model="type.data.school"
                readonly="readonly"
                style="width:150px"
              />
            </li>
            <li class="noRight">
              性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:
              <select
                class="selected"
                v-model="type.data.sex"
                :disabled="type.status == 'minestudent'"
              >
                <option value="1">男</option>
                <option value="2">女</option>
              </select>
            </li>
            <li>
              年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:
              <select
                class="selected"
                v-model="type.data.age"
                :disabled="type.status == 'minestudent'"
              >
                <option :value="list" v-for="(list,i) in 20" :key="i" v-if="list>=5">{{list + "岁"}}</option>
              </select>
            </li>

            <li>
              年级:
              <select
                class="selected"
                v-model="type.data.grade"
                :disabled="type.status == 'minestudent'"
              >
                <option value="1">一年级</option>
                <option value="2">二年级</option>
                <option value="3">三年级</option>
                <option value="4">四年级</option>
                <option value="5">五年级</option>
                <option value="6">六年级</option>
                <option value="7">七年级</option>
                <option value="8">八年级</option>
                <option value="9">九年级</option>
              </select>
            </li>

            <li class="noRight">
              意向科目:
              <select
                class="selected"
                v-model="type.data.subject"
                :disabled="type.status == 'minestudent'"
              >
                <option value="1">数学</option>
                <option value="2">英语</option>
                <option value="3">语文</option>
                <option value="4">物理</option>
                <option value="5">化学</option>
                <option value="6">政治</option>
                <option value="7">生物</option>
                <option value="8">地理</option>
                <option value="9">历史</option>
              </select>
            </li>
            <li>
              意&nbsp;向&nbsp; 度 :
              <select
                class="selected"
                v-model="type.data.intention_option"
                :disabled="type.status == 'minestudent'"
              >
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
                <option value="4">D</option>
                <option value="5">E</option>
              </select>
            </li>

            <li>
              约课状态 :
              <select
                class="selected"
                v-model="type.data.is_course"
                :disabled="type.status == 'minestudent'"
              >
                <option value="1">未约课</option>
                <option value="2">已约课</option>
              </select>
            </li>
            <li style="width:100%;">
              呼出情况:
              <RadioGroup class="radios" v-model="type.data.phone_status">
                <Radio :label="1" :disabled="type.status == 'minestudent'">正常接听</Radio>
                <Radio :label="2" :disabled="type.status == 'minestudent'">无人接听</Radio>
                <Radio :label="3" :disabled="type.status == 'minestudent'">空号</Radio>
                <Radio :label="4" :disabled="type.status == 'minestudent'">挂断</Radio>
              </RadioGroup>
            </li>
            <li style="width: 249px;">
              下次跟进时间:
              <DatePicker
                :disabled="type.status == 'minestudent'"
                v-model="nextTime"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                class="datepicker"
                :lang="lang"
                :title="item"
                confirm
                :not-before="new Date()"
                @confirm="setNextTime"
              ></DatePicker>
            </li>

            <li>
              约 课 时 间 :
              <DatePicker
                :disabled="type.status == 'minestudent'"
                value-format=" yyyy-MM-dd HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
                v-model="classTime"
                type="datetime"
                class="datepicker"
                :lang="lang"
                :title="time"
                confirm
                :not-before="new Date()"
                @confirm="setClassTime"
              ></DatePicker>
            </li>
          </ul>
          <div>
            <span>回访内容:</span>
            <div>
              <textarea
                v-model="vist_content"
                class="textarea textlet"
                cols="30"
                placeholder="请输入回访内容"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div class="record">
            <span>跟进记录</span>
            <p>
              <i>回访内容</i>
              <span>跟进人</span>
              <span>回访时间</span>
            </p>
            <ul>
              <li v-for="(item,i) in type.data.visit_content">
                <i>{{item.visit_content}}</i>
                <span>{{item.sale_name}}</span>
                <p>{{item.time}}</p>
              </li>
            </ul>
          </div>
          <div class="record">
            <span>订单记录</span>
            <p>
              <i>购买课程</i>
              <span>年级</span>
              <span>科目</span>
              <span>购买时间</span>
            </p>
            <ul>
              <li v-for="(item,i) in type.data.order">
                <i>{{item.product_name}}</i>
                <span>{{item.grade}}</span>
                <span>{{item.subject}}</span>
                <p>{{item.create_time}}</p>
              </li>
            </ul>
          </div>
          <div class="btnThree">
            <span style="margin: 0 60px;" @click="genjin">保存</span>
            <span class="cancel" @click="followUpColse">取消</span>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="shiftOut" v-else-if="type.classify == 'shiftOut'">
      <p>确定将此客户移入至公共客户区域?</p>
      <div>
        <button class="btn confirm" @click="shiftOut">是</button>
        <button class="btn cancel" @click="no">否</button>
      </div>
    </div>
    <!--  -->
    <div class="shiftOut" v-else-if="type.classify == 'shiftTo'">
      <p>确定将此客户移入至代办客户区域?</p>
      <div>
        <button class="btn confirm" @click="shiftOut">是</button>
        <button class="btn cancel" @click="no">否</button>
      </div>
    </div>
    <div class="followUp dingdan" v-else-if="type.classify == 'dingdan'">
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
    <div class="followUp dingdan ding" v-else-if="type.classify == 'ding'">
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
    <div class="report" v-else-if="type.classify == 'report'">
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
            <li v-for="(item,i) in report">
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
    <Loading v-show="Loading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import Loading from "../loading/loading";
import storage from "../storage";
export default {
  components: {
    DatePicker,
    Loading
  },
  props: ["type"],
  mounted() {
    if (this.type.classify == "report") {
      this.getReport(this.type.data.id);
    }
    if (this.type.classify == "shade") {
      if (this.type.status == "payingstudent") {
        this.getPayList();
      } else {
        this.getFenpeiList();
      }
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
      if (this.type.status == "notvisit") {
        this.getXinfenList();
        this.$parent.show = false;
        return;
      } else if (this.type.status == "followup") {
        this.getFollowUpList();
        this.$parent.show = false;
        return;
      } else if (this.type.status == "notcallback") {
        this.getYuQiList();
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
            this.getXinfenList();
          } else if (this.type.status == "followup") {
            this.getFollowUpList();
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
      this.type.data.note = this.note_content;
      this.type.data.order = [];
      if (this.vist_content) {
        this.type.data.visit_content = this.vist_content;
      } else {
        this.type.data.visit_content = "";
      }
      this.Loading = true;
      if (this.type.status == "notvisit") {
        this.Genjin({ type: this.type, status: storage.getTabStatus() }).then(
          res => {
            this.$parent.show = false;
            this.Loading = false;
            this.getXinfenList();
          }
        );
        return;
      } else if (this.type.status == "followup") {
        this.Genjin({ type: this.type, status: storage.getTabStatus() }).then(
          res => {
            this.$parent.show = false;
            this.Loading = false;
            this.getFollowUpList({ status: storage.getTabStatus() });
          }
        );
        return;
      } else if (this.type.status == "notcallback") {
        this.Genjin({ type: this.type, status: storage.getTabStatus() }).then(
          res => {
            this.$parent.show = false;
            this.Loading = false;
            this.getYuQiList();
          }
        );
        return;
      } else if (this.type.status == "paystudent") {
        this.Genjin({ type: this.type, status: storage.getTabStatus() }).then(
          res => {
            this.$parent.show = false;
            this.Loading = false;
            this.getPaystudent({ page: "", form: {} });
          }
        );
        return;
      } else if (this.type.status == "uplist") {
        this.Genjin({ type: this.type, status: storage.getTabStatus() }).then(
          res => {
            this.$parent.show = false;
            this.Loading = false;
            this.getUplist({ page: "", form: {} });
          }
        );
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
      } else {
        this.Genjin({ type: this.type, status: storage.getTabStatus() }).then(
          res => {
            this.$parent.show = false;
            this.Loading = false;
            this.getKehuList({ status: storage.getTabStatus() });
          }
        );
      }
    },
    ...mapMutations(["setXiaoshowId", "setType", "setXiaoshowIdPay"]),
    ...mapActions([
      "getFenStu",
      "addRepost",
      "getReport",
      "setmStudent",
      "getmStudent",
      "setPayStu",
      "getPayList",
      "getFenpeiList",
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
          this.$parent.isChecked = false;
          this.$parent.TableCheckedAll.length = 0;
        });
      } else {
        this.fenPai({ form: this.form, status: this.$parent.num }).then(res => {
          this.message = false;
          this.$parent.show = false;
          this.Loading = false;
          this.$parent.isChecked = false;
          this.$parent.TableCheckedAll.length = 0;
        });
      }
    },
    colse() {
      this.showShade = false;
      this.$parent.show = false;
    },
    confirm() {
      if (!this.form.sale_name) {
        alert("请选择人员再分配");
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
      isItem: false,
      lang: {
        days: ["一", "二", "三", "四", "五", "六", "日"],
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        pickers: ["未来7天", "未来30天", "前7天", "前30天"],
        placeholder: {
          date: "",
          dateRange: ""
        }
      }
    };
  }
};
</script>

<style scoped>
.datalis > i.datalis-colse {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 25px;
  cursor: pointer;
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
.datalis {
  width: 999px;
  height: 780px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  overflow-y: auto;
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
