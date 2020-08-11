<template>
  <div>
    <Modal width="1400" v-model="item.classify == 'order'" title="选择课程" @on-cancel="colseReserved">
      <Form :model="form" label-position="top" style="height:450px;overflow-y:auto;">
        <Row class-name="exclusive">
          <Col span="4">
            <FormItem>
              <Select v-model="form.grade" @on-change="seekClick" placeholder="年级">
                <Option :value="list.id" v-for="(list,i) in contant.GRADE" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Select v-model="form.subject" placeholder="科目" @on-change="seekClick">
                <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
        <Table
          :loading="showTableLoading"
          border
          :columns="columns"
          :data="orderList"
          @on-selection-change="selectionChange"
          height="350"
        ></Table>
        <Page
          @on-change="pageChange"
          :total="total"
          :current="currentPage"
          :page-size="pageSize"
          show-total
          show-elevator
          class="ive-page"
        />
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="colseReserved">取消</Button>
        <Button type="primary" size="large" @click="createorder">确定</Button>
      </div>
    </Modal>
    <Modal width="700" v-model="showOrder" title="赠课" @on-cancel="showOrder = false">
      <Form :form="orderForm" label-position="left" style="height:450px;overflow-y:auto;">
        <FormItem label="基本信息"></FormItem>
        <div class="procude">
          <div class="procude-top">
            <span>{{items.title}}</span>
          </div>
          <div class="procued-content">
            <FormItem label="课程名称" class="type">
              <Input v-model="orderForm.course_name" readonly style="width:300px" />
            </FormItem>
            <FormItem label="课节数量" class="type">
              <Input readonly type="number" v-model="orderForm.class_hour" style="width:300px" />
            </FormItem>
          </div>
          <div class="procued-footer">
            <span>价格</span>
            <div>
              <!-- <span>共{{orderForm.class_hour * orderForm.goods_num}}课时，</span> -->
              <i>小计: {{orderForm.sale_price}}元</i>
            </div>
          </div>
        </div>
        <FormItem label="课程信息"></FormItem>
        <Table border :columns="orderColumns" :data="orderPay"></Table>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showOrder = false">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="createOrders">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import storage from "../../../uilt/storage";
import { GIVELESSONS, GIVELESSONSCREADORDER } from "../../url/url";
export default {
  props: ["item"],
  mounted() {
    this.getLessonsList();
  },
  data() {
    return {
      orderPay: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      showTableLoading: false,
      form: {},
      showOrder: false,
      items: {
        title: "微课"
      },
      price: 0,
      orderForm: {},
      disableBtn: false,
      orderColumns: [
        { title: "课程名称", key: "course_name" },
        { title: "年级", key: "grade" },
        { title: "科目", key: "subject" }
      ],
      orderPay: [],
      columns: [
        { type: "selection", width: 60 },
        { title: "课程名称", key: "course_name" },
        { title: "年级", key: "grade" },
        { title: "科目", key: "subject" },
        { title: "售价", key: "sale_price" }
        // { title: "活动价", key: "activity_price" }
      ],
      orderList: [],
      subject: storage.getDaiban().screen_list.subject
    };
  },
  methods: {
    utf_8(data) {
      var subject = this.subject;
      var grade = this.contant.GRADE;
      data.map((sj, k) => {
        for (var i in subject) {
          if (sj.subject == i) {
            sj.subject = subject[i];
          }
        }
        grade.map(gd => {
          if (sj.grade == gd.id) {
            sj.grade = gd.title;
          }
        });
      });
      return data;
    },
    //课列表
    async getLessonsList() {
      this.showTableLoading = true;
      let res = await this.$request({
        method: "get",
        url: GIVELESSONS,
        params: {
          ...this.form,
          page: this.currentPage
        }
      });
      if (res.data.ret) {
        this.orderList = this.utf_8(res.data.data.resources);
        this.total = res.data.data.links.total;
        this.pageSize = res.data.data.links.per_page;
        this.currentPage = res.data.data.links.current_page;
      } else {
        this.$Message.error(res.data.error);
      }
      this.showTableLoading = false;
    },
    createorder() {
      if (this.orderPay.length == 0) {
        this.$Message.error("未选择课程");
        return;
      } else if (this.orderPay.length > 1) {
        this.$Message.error("只可选择一条");
        return;
      }
      this.showOrder = true;
    },
    //分页
    pageChange(num) {
      this.currentPage = num;
      this.getLessonsList();
    },
    //全选/反选
    selectionChange(ay) {
      if (ay.length == 1) {
        this.orderForm = ay[0];
      } else {
        this.orderForm = {};
      }
      this.orderPay = ay;
    },
    //筛选
    seekClick() {
      this.currentPage = 1;
      this.getLessonsList();
    },
    //清除
    clear() {
      this.form = {};
      this.getLessonsList();
    },
    //关闭
    colseReserved() {
      this.$parent.showMessage = false;
    },
    //创建订单
    async createOrders() {
      let res = await this.$request({
        method: "post",
        url: GIVELESSONSCREADORDER,
        params: {
          account_id: this.item.data.account_id,
          product_id: this.orderPay[0].id
        }
      });
      if (res.data.ret) {
        this.$Message.success("赠课成功");
      } else {
        this.$Message.error(res.data.error);
      }
      this.colseReserved();
    }
  }
};
</script>