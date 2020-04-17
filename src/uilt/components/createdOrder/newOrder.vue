<template>
  <div class="newOrder">
    <Modal v-model="modal5" title="创建订单" class-name="vertical-center-modal-1" width="60" @on-cancel="cancel" @on-ok="confirm">
      <div class="content">
        <div class="baseMessage">
          <span>基本信息</span>
          <div class="message">
            <div class="title">
              <span>一对一</span>
              <Icon type="ios-close" style="font-size: 25px" />
            </div>
            <div class="mes-contetn">
              <Form :label-width="80">
                <FormItem label="课程名称">
                  <Input v-model="Items.course_name" style="width: 300px" :readonly="true" />
                </FormItem>
                <FormItem label="购买数量">
                  <InputNumber :min="1" v-model="goods_num"></InputNumber>
                </FormItem>
              </Form>
            </div>
            <div class="footer">
              <span>价格</span>
              <span>共{{Items.class_hour * goods_num}}课时， 小计: {{Items.total_price * goods_num}}元</span>
            </div>
          </div>
        </div>

        <span>支付信息</span>
        <Table border :columns="columns" :data="dataList" />
      </div>
      <!-- <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="confirm">确定</Button>
      </div> -->
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { ADDORDER } from "@/uilt/url/url";
import qs from "qs";
export default {
  props: {
    account_id: {
      type: Number,
      required: true
    },
    Items: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      selectState: state => state.selectState
    })
  },
  data() {
    return {
      modal5: true,
      columns: [
        {
          title: "购买课程名称",
          key: "course_name",
          align: "center"
        },
        {
          title: "课程类型",
          key: "class_type",
          align: "center"
        },
        {
          title: "收费形式",
          key: "form_of_tariff",
          align: "center"
        },
        {
          title: "科目",
          key: "subject",
          align: "center"
        }
      ],
      dataList: [],
      goods_num: 1
    };
  },
  methods: {
    // 创建课程
    async createdOrder() {
      let res = await this.$request({
        method: "post",
        url: ADDORDER,
        data: qs.stringify({
          account_id: this.account_id,
          product_id: this.Items.id,
          goods_num: this.goods_num
        })
      });
      this.$Message.success("创建成功");
    },
    // 点击确认回调，验证表单,不填写不让关
    confirm() {
      this.createdOrder();
      this.$emit("closeBtn", false);
    },
    // 点击取消回调，重置表单
    cancel() {
      this.$emit("closeBtn", false);
    }
  },
  created() {
    this.dataList = [this.Items];
    if (this.dataList[0].subject == -1) {
      this.dataList[0].subject = "全科";
    } else {
      this.dataList[0].subject = this.selectState.subject[
        this.dataList[0].subject
      ];
    }
    this.dataList[0].class_type = "一对一";
    this.dataList[0].form_of_tariff = "按课时";
  }
};
</script>

<style scoped>
.content {
  height: 400px;
}
.message {
  height: 200px;
  background-color: #f2f2f2;
  padding: 10px;
}
.message .title {
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.message .footer {
  height: 30px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
.mes-contetn {
  margin-top: 10px;
}
</style>

<style>
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>