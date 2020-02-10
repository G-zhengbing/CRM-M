<template>
  <div class="box">
    <DaibanMessage v-if="show" :type="type" ref="message" />
    <header class="main-header">
      <ul>
        <li>
          <i></i>
          <span>首页</span>
        </li>
        <li>
          <i></i>
          <span>资源池</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <ul class="tabs">
              <li @click="tab(1)" :class="[num == 1? 'active' : '']" v-if="$store.state.cId != 2">
                <span>未下单待分配</span>
              </li>
              <li @click="tab(3)" :class="[num == 3? 'active' : '']" v-if="$store.state.cId != 2">
                <span>已下单待分配</span>
              </li>
              <li @click="tab(2)" :class="[num == 2? 'active' : '']">
                <span>已分配</span>
              </li>
            </ul>
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="4">
                  <FormItem label="学员电话" style="width:230px;">
                    <Input v-model="form.mobile" placeholder="请输入学员电话" @on-change="seekKuhu"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="渠道类型">
                    <Select v-model="form.refer" style="width:150px" @on-change="seekKuhu">
                      <Option v-for="(list,i) in refer" :key="i" :value="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="年级">
                    <Select v-model="form.grade" style="width:150px" @on-change="seekKuhu">
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
                  <FormItem label="科目">
                    <Select v-model="form.subject" style="width:150px" @on-change="seekKuhu">
                      <Option value="1">数学</Option>
                      <Option value="2">英语</Option>
                      <Option value="3">语文</Option>
                      <Option value="4">物理</Option>
                      <Option value="5">化学</Option>
                      <Option value="6">政治</Option>
                      <Option value="7">生物</Option>
                      <Option value="8">地理</Option>
                      <Option value="9">历史</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="意向度" v-if="num == 2">
                    <Select
                      v-model="form.intention_option"
                      style="width:150px"
                      @on-change="seekKuhu"
                    >
                      <Option :value="1">A高</Option>
                      <Option :value="2">B中</Option>
                      <Option :value="3">C低</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="约课状态" v-if="num == 2">
                    <Select v-model="form.is_course" style="width:150px" @on-change="seekKuhu">
                      <Option :value="1">未约课</Option>
                      <Option :value="2">已约课</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <div class="allot" @click="allot" v-if="num != 2">
              <span>{{'已选择'+ checkall.length + '条'}}</span>
              <p>分配</p>
            </div>
            <Table
              ref="table"
              :isChecked="isChecked"
              :columns="columns"
              :data="dataArr"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @childer1="getBtnClick1"
              @childer2="getBtnClick2"
              @childer3="getBtnClick3"
              @childer5="getBtnClick5"
              @childer4="getBtnClick4"
              @childer6="getBtnClick6"
              @page-change="pageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import Table from "../../uilt/table/TablePlus";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import DaibanMessage from "../../uilt/newErweima/DaibanMessage";
import DatePicker from "vue2-datepicker";
import storage from "../../uilt/storage";
import Loading from "../../uilt/loading/loading";
export default {
  mounted() {
    this.setCurrentPage(1);
    this.setStatus();
    this.isLoading = true;
    if (storage.getTabStatus() == null) {
      this.num = 1;
      this.setStatusNum(1);
    } else {
      this.num = storage.getTabStatus();
      this.setStatusNum(storage.getTabStatus());
    }
    this.getKehuList({ status: this.num }).then(res => {
      this.isLoading = false;
    });
  },
  components: {
    Table,
    DaibanMessage,
    Loading,
    DatePicker
  },
  data() {
    return {
      lang: {
        days: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日"
        ],
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
      },
      Time: "",
      classTime: "",
      nextTime: "",
      TableCheckedAll: "",
      isChecked: true, //控制表格组件的全选
      isLoading: false,
      num: storage.getTabStatus() * 1,
      columns: [
        { type: "selection" },
        { type: "学员电话", key: "mobile" },
        { type: "在读学校", key: "school" },
        { type: "年级", key: "grade" },
        { type: "科目", key: "subject" },
        { type: "跟进状态", key: "follow_status" },
        { type: "用户状态", key: "account_status" },
        { type: "跟进人", key: "follow_sale_name" },
        { type: "约课状态", key: "is_course" },
        { type: "意向度", key: "intention_option" },
        { type: "约课时间", key: "class_date" },
        { type: "创建时间", key: "create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [{ text: "查看", type: "info" }]
        }
      ],
      show: false,
      checkall: [],
      cid: [],
      type: {
        page: 1,
        text: ""
      },
      form: {}
    };
  },
  methods: {
    ...mapMutations([
      "setCurrentPage",
      "setXiansuoId",
      "setGenjinType",
      "setStatusNum"
    ]),
    ...mapActions(["getKehuList", "getFenpeiList", "RingUp"]),
    getBtnClick6(item) {
      this.show = true;
      this.type.classify = "shade";
      this.setXiansuoId(item.id);
    },
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
    setTime(item) {
      this.form.class_date = this.datePicker(item);
    },
    setClassTime(item) {
      this.form.create_time_end = this.datePicker(item);
    },
    setNextTime(item) {
      this.form.create_time_start = this.datePicker(item);
    },
    clear() {
      this.form = {};
      this.Time = "";
      this.classTime = "";
      this.nextTime = "";
    },
    seekKuhu() {
      let page = 1;
      this.isLoading = true;
      this.getKehuList({ status: this.num, form: this.form, page }).then(
        res => {
          this.isLoading = false;
          this.setCurrentPage(page);
        }
      );
    },
    allot() {
      this.type.classify = "shade";
      if (this.checkall.length > 0) {
        this.show = true;
      }
    },
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getKehuList({ status: this.num, form: this.form }).then(res => {
        this.isLoading = false;
      });
    },
    getBtnClick1(item) {
      this.show = true;
      this.type.classify = "datalis";
      this.type.data = { ...item };
    },
    getBtnClick2(item) {
      this.show = true;
      this.type.classify = "shiftOut";
      this.type.data = { ...item };
    },
    getBtnClick3(item) {
      this.setGenjinType(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.Types };
    },
    getBtnClick4(item) {
      this.setGenjinType(item);
      this.isLoading = true;
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.Types };
      this.RingUp(item)
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
    getBtnClick5(item) {
      this.show = true;
      this.type.classify = "dingdan";
      this.type.data = { ...item };
    },
    selectionChange(item) {
      this.TableCheckedAll = this.$refs.table.checkedAll;
      this.cid.length = 0;
      let arr = [];
      this.checkall = item;
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.setXiansuoId(arr);
    },
    tab(num) {
      this.form = {};
      this.isLoading = true;
      storage.saveTabStatus(num);
      this.num = num;
      this.setStatusNum(num);
      this.setCurrentPage(1);
      this.setStatus();
      this.getKehuList({ status: this.num }).then(res => {
        this.isLoading = false;
      });
      this.TableCheckedAll = [];
    },
    setStatus() {
      for (var i = 0; i < this.columns.length; i++) {
        if (this.num == 1 || this.num == null) {
          this.columns[i].buttons = [{ text: "查看", type: "info" }];
        } else if (this.num == 3) {
          this.columns[i].buttons = [{ text: "分配", type: "success" }];
        } else if (this.$store.state.cId == 1) {
          this.columns[i].buttons = [
            // { text: "订单", type: "primary" },
            { text: "移出", type: "danger" },
            { text: "跟进", type: "warning" },
            { text: "查看", type: "info" },
            { text: "呼出", type: "link" }
          ];
        } else {
          this.columns[i].buttons = [
            // { text: "订单", type: "primary" },
            { text: "跟进", type: "warning" },
            { text: "查看", type: "info" },
            { text: "呼出", type: "link" }
          ];
        }
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.daiban.data,
      datas: state => state.daiban.datas,
      refer: state => state.daiban.refer,
      currentPage: state => state.daiban.currentPage,
      total: state => state.daiban.total,
      pageSize: state => state.daiban.pageSize,
      status: state => state.daiban.status
    }),
    ...mapGetters(["dataArr", "Types"])
  }
};
</script>
<style scoped>
.allot > p {
  border-left: 1px solid #fff;
}
.allot > p,
.allot > span {
  flex: 1;
  text-align: center;
}
.allot {
  display: flex;
  width: 150px;
  height: 30px;
  background: #1b73b0;
  color: #fff;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tabs li.active span {
  color: #1b73b0;
}
.tabs li.active {
  border: 1px solid #ccc;
  border-bottom: 1px solid #fff;
}
.main-section .main-section-bottom {
  margin-top: 0px !important;
}
.tabs li {
  height: 100%;
  line-height: 50px;
  margin-right: 30px;
  width: 100px;
  text-align: center;
  margin-top: 1px;
  cursor: pointer;
  box-sizing: border-box;
}
.tabs {
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 20px;
}
.main-section .main-section-top {
  height: 140px;
}
.handel {
  display: flex;
  margin-top: 10px;
}
.daiban-button.fBtn i {
  display: inline-block;
  margin: 0 5px;
}
.daiban-button.fBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-section-bottom ul.ul li {
  width: 100px;
  height: 30px;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
}
.main-section-bottom ul.ul {
  display: flex;
  border: 1px solid #1b73b0;
  width: 200px;
  border-radius: 5px;
  margin: 10px 0;
}
.main-section-bottom ul.ul li span {
  color: #1b73b0;
}
ul.ul li.active {
  background-color: #1b73b0;
  color: #fff;
}
ul.ul li.active span {
  color: #fff;
}
</style>