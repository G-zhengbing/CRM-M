<template>
  <div class="sendSMS">
    <!-- 发送信息 -->
    <Modal
      class="modal"
      width="40"
      v-model="sms"
      title="发送信息"
      :closable="false"
      :mask-closable="false"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="选择模板" prop="index">
          <Select v-model="formValidate.index" placeholder="请选择" @on-change="selectTem">
            <Option
              :value="index+''"
              v-for="(item,index) in SMSTemplate"
              :key="item.id"
            >{{item.template_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="短信内容">
          <Input
            disabled
            v-model="formValidate.message_content"
            type="textarea"
            :autosize="{minRows: 6,maxRows: 5}"
            placeholder="模板签名+模板内容最多500字符"
          ></Input>
        </FormItem>
        <FormItem label="请填写参数">
          <Input v-model="formValidate.data" placeholder="请输入参数"></Input>
        </FormItem>
      </Form>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" size="large" @click="sendSMS">发送</Button>
        <Button size="large" style="border: 1px solid #000;margin-left: 20px;" @click="closeSms">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
import { MESSAGETEMPLATELIST, SENDMESSAGE } from '@/uilt/url/setup'
export default {
	props: {
    followForm: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: false
    }
  },
  watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  data() {
    return {
			sms: this.showMod,
      formValidate: {},
      ruleValidate: {
        index: [{ required: true, message: "请选择模板", trigger: "change" }]
      },
      SMSTemplate: []
    };
  },
  methods: {
    selectTem(item) {
      this.formValidate.message_content = this.SMSTemplate[
        item
      ].template_contents;
      this.formValidate.message_template_id = this.SMSTemplate[item].id;
    },
    // 获取短信模板
    async getSMSTem() {
      let res = await this.$request({
        url: MESSAGETEMPLATELIST
      });
      this.SMSTemplate = res.data.data;
    },
    //跟进/发送信息
    sendSMS() {
			this.$refs["formValidate"].validate(async valid => {
				if(valid) {
					this.formValidate.account_id = this.followForm.id;
					let res = await this.$request({
						method: "POST",
						url: SENDMESSAGE,
						data: qs.stringify(this.formValidate)
					});
					if (res.data.code == 200) {
						this.$Message.success("操作成功");
						this.$emit("changeShowMod", false);
					} else if (res.data.code == 100001) {
						this.$Message.error(res.data.error);
					}
				} else {
					this.$Message.error('请选择短信模板！')
				}
			})
    },
    // 关闭短信弹窗
    closeSms() {
			this.$refs["formValidate"].resetFields();
      this.$emit("changeShowMod", false);
    }
	},
	created() {
		this.getSMSTem()
	}
};
</script>

<style>
</style>