
<template>
  <div class="box">
    <NewErweima v-if="show" :type="type" />
    <Form :model="form">
      <Row class-name="exclusive">
        <Col span="3">
          <FormItem>
            <Input v-model="form.title" placeholder="标题"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.demand_type" style="width:150px" placeholder="渠道">
              <Option v-for="(list,i) in refer" :key="i" :value="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Input v-model="form.user_name" placeholder="使用人"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <div class="dateplc">
              <DatePicker
                type="datetime"
                placeholder="开始时间"
                v-model="nextTime"
                @on-ok="setNextTime"
              ></DatePicker>
              <DatePicker
                type="datetime"
                placeholder="结束时间"
                v-model="classTime"
                @on-ok="setClassTime"
              ></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="4">
          <Button type="primary" @click="seek">查询</Button>
          <Button @click="clear">清空</Button>
        </Col>
      </Row>
    </Form>

    <Button type="primary" @click="addErweima">+ 新建</Button>

    <Table border :columns="columns" :data="erweimaArr" @on-selection-change="selectionChange"></Table>
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
  </div>
</template>

<script>
import NewErweima from "../uilt/newErweima/NewErweima";
import Loading from "../uilt/loading/loading";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  components: {
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
        { type: "selection", width: "60", text: "center" },
        { title: "标题", key: "channel_title" },
        { title: "需求类型", key: "channel_type" },
        { title: "注册数量", key: "channel_accounnt" },
        { title: "已分配数", key: "channel_assign" },
        { title: "城市", key: "city" },
        { title: "学校", key: "school" },
        { title: "使用人", key: "channel_user" },
        { title: "生成人", key: "channel_user" },
        { title: "状态", key: "status" },
        { title: "创建日期", key: "create_time" },
        {
          title: "操作",
          key: "action",
          align: "center",
          align: "center",
          width: 140,
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
                      this.look(params.row);
                    }
                  }
                },
                "查看"
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
                      this.recall(params.row);
                    }
                  }
                },
                "撤回"
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
                      this.add(params.row);
                    }
                  }
                },
                "新建"
              )
            ]);
          }
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
    look(item) {
      this.show = true;
      this.type.classify = "chakan";
      this.type.data = { ...item };
    },
    add(item) {
      this.show = true;
      this.type.classify = "erweima";
      this.type.status = "erji";
      this.type.data = { ...item };
    },
    recall(item) {
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