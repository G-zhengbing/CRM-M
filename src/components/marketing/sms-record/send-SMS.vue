<template>
  <div class="send-SMS">
    <Modal
      v-model="$parent.showModel"
      title="营销短信群发"
      @on-ok="ok"
      @on-cancel="cancel"
      width="40"
      :loading="loading"
    >
      <div class="content">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
          :show-message="false"
        >
          <FormItem label="选择渠道" prop="channel_id">
            <Select v-model="formValidate.channel_id" placeholder="请选择" @on-change="changeChannel">
              <Option :value="item.id" v-for="item in channel" :key="item.id">{{item.channel_title}}</Option>
            </Select>
          </FormItem>
          <FormItem label="短信模板" prop="sms_template_id">
            <Select
              v-model="formValidate.sms_template_id"
              placeholder="请选择"
              @on-change="changeChannel"
            >
              <Option
                :value="item.id"
                v-for="item in chooseChannel"
                :key="item.id"
              >{{item.template_name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="发送范围" prop="send_scope">
            <RadioGroup v-model="formValidate.send_scope" @on-change="getSMSResidueSum">
              <div v-if="showScope[2] !== -1">
                <Radio label="3">
                  公共资源池
                  <span>{{`${resourceSum.public_surplus || 0}/${resourceSum.public||0}`}}</span>
                </Radio>
              </div>
              <div v-if="showScope[0] !== -1">
                <Radio label="1">
                  资源池待分配
                  <span>{{`${resourceSum.resource_surplus || 0}/${resourceSum.resource||0}`}}</span>
                </Radio>
              </div>
              <div v-if="showScope[1] !== -1">
                <Radio label="2">
                  已分配
                  <span>{{`${resourceSum.allocated_surplus || 0}/${resourceSum.allocated||0}`}}</span>
                </Radio>
              </div>
            </RadioGroup>
          </FormItem>
          <FormItem label="发送条件" class="send">
            <div class="left">
              <RadioGroup
                v-model="formValidate.register_time_where"
                type="button"
                @on-change="getSMSResidueSum"
                style="display: block;margin-bottom: 5px;"
              >
                <Radio label="1">近7天注册</Radio>
                <Radio label="2">近一个月注册</Radio>
                <Radio label="3">近两个月注册</Radio>
              </RadioGroup>
              <RadioGroup
                v-model="formValidate.login_time_where"
                type="button"
                @on-change="getSMSResidueSum"
              >
                <Radio label="4">近7天活跃</Radio>
                <Radio label="5">近一个月活跃</Radio>
                <Radio label="6">近两个月活跃</Radio>
              </RadioGroup>
            </div>
            <div class="right">
              <Button type="primary" @click="clearState">清空</Button>
            </div>
          </FormItem>
          <FormItem label="本次发送" prop="send_count">
            <InputNumber
              :max="number"
              :min="0"
              v-model="formValidate.send_count"
              style="width: 60%;"
            ></InputNumber>
            <span style="padding-left: 10px;">/{{number}}</span>
          </FormItem>
        </Form>
      </div>
      <Loading v-show="isLoading" />
    </Modal>
  </div>
</template>

<script>
import {
  MESSAGELIST,
  MASSTEXTINGRANGE,
  MASSTEXTINGRESIDUE,
  SENDMASSTEXTING,
  SMSCONFIGURATIONINFO,
} from "@/uilt/url/setup";
import storage from "@/uilt/storage";
import qs from "qs";
export default {
  data() {
    return {
      isLoading: false,
      loading: true,
      formValidate: {
        // 组件默认值是 1，修改默认值
        code_name: 0,
      },
      ruleValidate: {
        sms_template_id: [
          {
            required: true,
            type: "number",
            trigger: "change",
          },
        ],
        channel_id: [
          {
            required: true,
            type: "number",
            trigger: "change",
          },
        ],
        send_scope: [
          {
            required: true,
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        send_count: [
          {
            required: true,
            type: "number",
            trigger: "blur",
          },
        ],
      },
      chooseChannel: [],
      channel: storage.getDaiban().channel,
      resourceSum: {},
      number: 0,
      selectChannel: "",
      send_the_scope: "",
      showScope: [],
    };
  },
  methods: {
    ok() {
      this.$refs["formValidate"].validate((val) => {
        if (val) {
          this.sendSMS().then(() => {
            this.$Message.success("发送成功");
            this.$parent.showModel = false;
          });
        } else {
          this.$Message.error("请填写必选项");
          // 不让表单关闭
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }
      });
    },
    cancel() {
      // console.log(this.$parent.showModel);
    },
    async sendSMS() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: SENDMASSTEXTING,
        data: qs.stringify(this.formValidate),
      });
      this.isLoading = false;
    },
    // 空发送条件
    clearState() {
      this.formValidate.register_time_where = "";
      this.formValidate.login_time_where = "";
      this.getSMSResidueSum();
    },
    async getChannel() {
      let res = await this.$request({
        url: SMSCONFIGURATIONINFO,
      });
      this.send_the_scope = res.data.data.send_the_scope.split(",");
      for (let a = 1; a <= 3; a++) {
        this.showScope.push(this.send_the_scope.indexOf(a.toString()));
      }
      this.selectChannel = res.data.data.the_specified_channel.split(",");
      let arr = this.selectChannel.map((item) => {
        return this.channel.filter((i) => {
          if (i.id == item) {
            return i;
          }
        });
      });
      this.channel = arr.flat(1);
    },
    async getSMSTemplate() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: MESSAGELIST,
        data: qs.stringify({status:2})
      });
      this.chooseChannel = res.data.data.data;
      this.isLoading = false;
    },
    async changeChannel() {
      if (this.formValidate.channel_id) {
        this.isLoading = true;
        let res = await this.$request({
          url: MASSTEXTINGRANGE,
          params: {
            channel_id: this.formValidate.channel_id,
            sms_template_id: this.formValidate.sms_template_id,
          },
        });
        this.resourceSum = res.data.data;
        this.isLoading = false;
        if (this.formValidate.send_scope) {
          this.getSMSResidueSum();
        }
      }
    },
    async getSMSResidueSum() {
      // 满足条件才能发送
      if (this.formValidate.send_scope && this.formValidate.channel_id) {
        this.isLoading = true;
        let res = await this.$request({
          url: MASSTEXTINGRESIDUE,
          params: {
            channel_id: this.formValidate.channel_id,
            send_scope: this.formValidate.send_scope,
            register_time_where: this.formValidate.register_time_where,
            login_time_where: this.formValidate.login_time_where,
            sms_template_id: this.formValidate.sms_template_id,
          },
        });
        this.number = res.data.data.number;
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getChannel();
    this.getSMSTemplate();
  },
};
</script>

<style scoped>
.left {
  display: inline-block;
}
.right {
  display: inline-block;
  margin-left: 20px;
}
</style>