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
          <FormItem label="短信模板" prop="a">
            <Select v-model="formValidate.a" placeholder="请选择">
              <Option
                :value="item.id"
                v-for="item in chooseChannel"
                :key="item.id"
              >{{item.template_name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="发送范围" prop="send_scope">
            <RadioGroup v-model="formValidate.send_scope" @on-change="getSMSResidueSum">
              <div>
                <Radio label="3">
                  公共资源池
                  <span>{{`${SMSResidueSum.public || 0}/${resourceSum.public||0}`}}</span>
                </Radio>
              </div>
              <div>
                <Radio label="1">
                  资源池待分配
                  <span>{{`${SMSResidueSum.resource || 0}/${resourceSum.resource||0}`}}</span>
                </Radio>
              </div>
              <div>
                <Radio label="2">
                  已分配
                  <span>{{`${SMSResidueSum.allocated || 0}/${resourceSum.allocated||0}`}}</span>
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
          <FormItem label="本次发送" prop="code_name">
            <InputNumber
              :max="number"
              :min="0"
              v-model="formValidate.code_name"
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
} from "@/uilt/url/setup";
import storage from "@/uilt/storage";
export default {
  data() {
    return {
      isLoading: false,
      loading: true,
      formValidate: {
        // 组件默认值是 1，修改默认值
        code_name: 0
      },
      ruleValidate: {
        a: [
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
        code_name: [
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
      SMSResidueSum: {},
      number: 0,
    };
  },
  methods: {
    ok() {
      this.$refs["formValidate"].validate((val) => {
        if (val) {
          this.$parent.showModel = false;
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
      console.log(this.$parent.showModel);
    },
    // 清空发送条件
    clearState() {
      this.formValidate.register_time_where = "";
      this.formValidate.login_time_where = "";
      this.getSMSResidueSum();
    },
    async getSMSTemplate() {
      this.isLoading = true;
      let res = await this.$request({
        method: "POST",
        url: MESSAGELIST,
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
          },
        });
        this.number = res.data.data.number;
        this.isLoading = false;
      }
    },
  },
  created() {
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