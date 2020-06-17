
<template>
  <div class="box">
    <NewErweima v-if="show" :type="type" />
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <Form :model="form" :label-width="35" >
            <Row style="margin-top:30px;">
              <Col span="4">
                <FormItem style="width:230px;">
                  <Input v-model="form.title" placeholder="标题"></Input>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem style="width:230px;">
                  <Select v-model="form.demand_type" style="width:150px" placeholder="渠道">
                    <Option v-for="(list,i) in refer" :key="i" :value="i">{{list}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem style="width:230px;">
                  <Input v-model="form.user_name" placeholder="使用人"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <div style="display:flex">
                    <DatePicker
                      type="datetime"
                      placeholder="开始时间"
                      style="width: 200px"
                      v-model="nextTime"
                      @on-ok="setNextTime"
                    ></DatePicker>
                    <DatePicker
                      type="datetime"
                      placeholder="结束时间"
                      style="width: 200px"
                      v-model="classTime"
                      @on-ok="setClassTime"
                    ></DatePicker>
                  </div>
                </FormItem>
              </Col>
              <Col span="4" style="margin-left:30px">
                <Button type="primary" @click="seek">查询</Button>
                <Button @click="clear">清空</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div class="section-bottom">
          <div style="margin: 0 46px;">
            <button class="updata button" @click="addErweima">+ 新建</button>
            <div></div>
          </div>
          <div style="margin:0 46px 20px;margin-top: -20px;">
            <TablePlus
              :columns="columns"
              :data="erweimaArr"
              :total="total"
              :currentPage="currentPage"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @childer1="getBtnClick1"
              @childer2="getBtnClick2"
              @childer3="getBtnClick3"
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
import TablePlus from "../uilt/table/TablePlus";
import NewErweima from "../uilt/newErweima/NewErweima";
import Loading from "../uilt/loading/loading";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  components: {
    TablePlus,
    NewErweima,
    Loading
  },
  computed: {
    ...mapGetters(["erweimaArr", "qudaoType"]),
    ...mapState({
      erweimaList: state => state.erweima.erweimaList,
      currentPage: state => state.erweima.currentPage,
      total: state => state.erweima.total,
      pageSize: state => state.erweima.pageSize,
      refer: state => state.erweima.refer
    })
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getErweimaList().then(res => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      isLoading: false,
      cid: [],
      checkall: [],
      classTime: "",
      nextTime: "",
      show: false,
      type: {},
      form: {
        page: 1
      },
      columns: [
        { type: "selection", width: "50", text: "center" },
        { type: "标题", key: "channel_title" },
        { type: "需求类型", key: "channel_type" },
        { type: "注册数量", key: "channel_accounnt" },
        { type: "已分配数", key: "channel_assign" },
        { type: "城市", key: "city" },
        { type: "学校", key: "school" },
        { type: "使用人", key: "channel_user" },
        { type: "生成人", key: "channel_user" },
        { type: "状态", key: "status" },
        { type: "创建日期", key: "create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [
            { text: "查看", type: "info" },
            { text: "撤回", type: "warning" },
            { text: "新建", type: "danger" }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCheckArr", "setCurrentPage", "setQudaoTypes"]),
    ...mapActions(["getErweimaList", "setDaoru"]),
    clear() {
      this.form = {};
      this.classTime = "";
      this.nextTime = "";
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getErweimaList({ ...this.form, page: num }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
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
    setClassTime() {
      this.form.create_end_time = this.datePicker(this.classTime);
    },
    setNextTime() {
      this.form.create_start_time = this.datePicker(this.nextTime);
    },
    getBtnClick1(item) {
      this.show = true;
      this.type.classify = "chakan";
      this.type.data = { ...item };
    },
    getBtnClick2(item) {
      this.show = true;
      this.type.classify = "erweima";
      this.type.status = "erji";
      this.type.data = { ...item };
    },
    getBtnClick3(item) {
      this.show = true;
      this.type.classify = "chehui";
      this.type.data = { ...item };
    },
    seek() {
      let page = 1;
      this.isLoading = true;
      this.getErweimaList({ ...this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    addErweima() {
      this.show = true;
      this.type.classify = "erweima";
    },
    selectionChange(item) {
      let arr = [];
      this.checkall = item;
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.cid = arr;
      this.setCheckArr(this.cid);
    }
  }
};
</script>

<style scoped>
.mx-datepicker.datepicker[data-v-765fd6a2] {
  margin-top: 0;
}
.remove.file {
  position: absolute;
  margin-left: -105px;
  width: 100px;
  height: 31px;
  margin-top: 10px;
  border-radius: 3px;
  opacity: 0;
  cursor: pointer;
}
.mx-datepicker.datepicker {
  margin-top: -50px;
  width: 172px;
  height: 25px;
}
.section-bottom .remove {
  width: 105px;
  height: 35px;
  background: #fff;
  border: 2px solid #1b73b0;
  color: #1b73b0;
}
.section-bottom .updata {
  width: 100px;
  height: 35px;
  color: #fff;
  margin: 10px 0 25px 0;
}
.button {
  border: none;
  background: #2d8cf0;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border: 2px solid #2d8cf0;
  box-sizing: border-box;
  text-align: center;
}
.box section .section-bottom {
  background-color: #fff;
  border-radius: 10px;
  height: 100%;
  max-height: 695px;
}
.section-top form label {
  margin-top: 15px;
  display: inline-block;
  margin-right: 60px;
}
.section-top form {
  margin: 0 46px;
}
.section-top form div .clear {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 27px;
  color: #1b73b0;
  font-size: 14px;
  outline: none;
  background: #fff;
}
.section-top form div .seek {
  color: #fff;
  width: 88px;
  height: 30px;
}
.section-top form div {
  display: inline-block;
  margin-top: 10px;
}
.section-top label {
  font-size: 14px;
  color: #333;
}
.section-top label input {
  border: none;
  border: 1px solid #c0c0c0;
  width: 130px;
  height: 34px;
  border-radius: 3px;
  outline: none;
  text-indent: 5px;
  box-sizing: border-box;
  margin-left: 20px;
}
.select {
  width: 130px;
  height: 34px;
  outline: none;
  border-color: #c0c0c0;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("../assets/img/xiala/png24.png") no-repeat scroll right center
    transparent;
  padding-right: 20px;
  background-size: 10px 6px;
  font-size: 14px;
  background-position-x: 145px;
  margin-left: 20px;
}
.box section > div .section-top {
  background-color: #fff;
  margin-bottom: 10px;
  height: 111px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box section > div {
  display: flex;
  flex-direction: column;
}
.box header ul li.active i {
  color: red;
}

.box header ul li span {
  font-size: 18px;
  color: #1b73b0;
}
.box header ul li i {
  color: red;
  font-size: 18px;
}
.box header ul li {
  margin-left: 20px;
  cursor: pointer;
}
.box header ul {
  display: flex;
  height: 100%;
}
.box header {
  height: 48px;
  background-color: #fff;
  line-height: 48px;
  min-height: 48px;
}
.active {
  color: red;
}
</style>