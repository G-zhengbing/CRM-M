<template>
  <div class="newSMS">
    <Modal v-model="modal5" title="新建短信模板" width="40" @on-ok="confirm" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="模板名称" prop="template_name">
          <Input v-model="formValidate.template_name" placeholder="请输入模板名称"></Input>
        </FormItem>
        <FormItem label="模板类型" prop="template_type">
          <RadioGroup v-model="formValidate.template_type">
            <Radio label="1">短信通知</Radio>
            <Radio label="2">推广短信</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="模板内容" prop="template_contents">
          <Input
            v-model="formValidate.template_contents"
            type="textarea"
            :autosize="{minRows: 6,maxRows: 5}"
            placeholder="模板签名 + 模板内容最多500字符"
          ></Input>
        </FormItem>

        <FormItem>
          <div v-if="formValidate.template_type == '1'">
            <p>说明：</p>
            <p>1.模板内容变量用${usermobile}进行表示</p>
            <p>2.模板内容不可含有“加微信”、“加公众号”等内容</p>
            <p>3.模板签名+模板内容最多500字符，70字符为1条短信，超过70字符则按每条短信67字符计算；</p>
          </div>
          <div v-else>
            <p>短信支持退订（结尾自动加上“回T退订”，占模板内容4个字数）</p>
            <p>1.推广短信及群发助手不支持加变量</p>
            <p>2.推广短信建议在结尾加上空格或其他字符，便于区分营销内容</p>
            <p>3.不能发送贷款/借款/中将/抽奖类短信</p>
          </div>
        </FormItem>

        <FormItem label="申请说明" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请描述您的业务使用场景"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import { CREATEMESSAGE } from "@/uilt/url/set";
export default {
  props: {
    showMod: {
      type: [Boolean, String],
      required: true
    }
  },
  watch: {
    showMod(val) {
      this.modal5 = val;
    }
  },
  data() {
    return {
      modal5: "",
      formValidate: {
        template_type: "1"
      },
      ruleValidate: {
        template_name: [
          {
            required: true,
            message: "请输入模板名称",
            trigger: "blur"
          }
        ],
        template_type: [
          { required: true, message: "请选择模板类型", trigger: "change" }
        ],
        template_contents: [
          {
            required: true,
            message: "请输入模板内容",
            trigger: "blur"
          },
          {
            type: "string",
            max: 500,
            message: "最多输入500字",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入申请说明",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 创建短信模板
    async creatSMSTemplate() {
      let res = await this.$request({
        method: 'POST',
        url: CREATEMESSAGE,
        data: qs.stringify(this.formValidate)
      })
      if(res.data.code == 200) {
        this.$Message.success('创建成功')
      } else {
        this.$Message.error('创建失败')
      } 
    },
    // 点击确认回调
    confirm() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          // 条件不满足，自动弹出
          if (!val) {
            return (this.modal5 = true);
          }
          this.creatSMSTemplate()
          this.$emit("changeShowMod", false);
        });
    },
    // 点击取消回调
    cancel() {
      this.$emit("changeShowMod", false);
    }
  }
};
</script>

<style scoped>
</style>