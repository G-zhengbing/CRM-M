<template>
  <div class="editCode">
    <Modal
      v-model="modal1"
      :title="row ? '修改二维码' : '新建二维码'"
      @on-ok="ok"
      @on-cancel="cancel"
      width="80"
    >
      <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="二维码名称" prop="codeName">
            <Input v-model="formValidate.name" placeholder="请输入二维码名称"></Input>
          </FormItem>
          <FormItem label="推送类型" prop="gender">
            <RadioGroup v-model="formValidate.type">
              <Radio :label="1">图文推送</Radio>
              <Radio :label="2">文字推送</Radio>
              <Radio :label="3">小程序卡片</Radio>
            </RadioGroup>
          </FormItem>
          <template v-if="formValidate.type == '1'">
            <FormItem label="图文标题" prop="imgText_title">
              <Input v-model="formValidate.name" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="图文封面">
              <Button type="primary">上传图片</Button>
            </FormItem>
            <FormItem label="图文描述" prop="imgText_describe">
              <Input v-model="formValidate.name" placeholder="请输入图文描述"></Input>
            </FormItem>
            <FormItem label="图文链接" prop="imgText_url">
              <Input v-model="formValidate.name" placeholder="请输入图文链接"></Input>
            </FormItem>
          </template>
          <template v-if="formValidate.type == '2'">
            <FormItem label="推送文字" prop="name">
              <WangEditor v-model="formValidate.content" :catchData="catchData" ref="wangditor" />
            </FormItem>
            <FormItem label="推送图片">
              <Button type="primary">上传图片</Button>
              <p>扫码关注推送图片，不填写则不推送；</p>
            </FormItem>
          </template>
          <template v-if="formValidate.type == '3'">
            <FormItem label="小程序appid" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入小程序appid"></Input>
            </FormItem>
            <FormItem label="小程序路径">
              <Input v-model="formValidate.name" placeholder="pages/index/index"></Input>
            </FormItem>
            <FormItem label="小程序简介" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入小程序简介"></Input>
            </FormItem>
            <FormItem label="小程序图片">
              <Button type="primary">上传图片</Button>
            </FormItem>
          </template>
          <FormItem label="二维码类型" prop="gender">
            <RadioGroup v-model="formValidate.codeType">
              <Radio :label="1">临时二维码</Radio>
              <Radio :label="2">永久二维码</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="过期时间" prop="time">
            <Input
              v-model="formValidate.name"
              :placeholder="formValidate.codeType == '2' ? '永久' : '请输入过期时间'"
              :disabled="formValidate.codeType == '2'"
            ></Input>
            <p v-if="formValidate.codeType == '1'">临时二维码过期时间, 最大为30天（2592000秒）</p>
          </FormItem>
          <FormItem label="粉丝标签" prop="fans_label">
            <Select v-model="formValidate.city" placeholder="请选择粉丝标签">
              <Option value="1">a</Option>
              <Option value="2">b</Option>
              <Option value="3">c</Option>
            </Select>
            <p>粉丝扫码关注自动打标签，标签自动同步至微信公众号后台；</p>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import WangEditor from "@/uilt/wangeditor/Wangeditor";
export default {
  components: {
    WangEditor
  },
  props: {
    row: {
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
      this.modal1 = val;
    },
    formValidate(val) {
      console.log(val);
    }
  },
  data() {
    return {
      modal1: this.showMod,
      formValidate: {
        type: 1,
        codeType: 2
      },
      ruleValidate: {
        codeName: [
          { required: true, message: "请输入二维码名称", trigger: "change" }
        ],
        imgText_title: [
          { required: true, message: "请输入标题", trigger: "change" }
        ],
        imgText_describe: [
          { required: true, message: "请输入图文描述", trigger: "change" }
        ],
        imgText_url: [
          { required: true, message: "请输入图文链接", trigger: "change" }
        ],
        time: [
          { required: true, message: "请输入过期时间", trigger: "change" }
        ],
        gender: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        fans_label: [
          { required: true, message: "请选择粉丝标签", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //富文本
    catchData(val) {
      var value = encodeURI(encodeURI(val));
      this.formValidate.content = val;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {
          console.log(valid);
        })
        .then(async val => {
          console.log(val);
          if (val) {
            this.$emit("changeShowMod", false);
          }
          this.modal1 = true;
        });
    },
    cancel() {
      this.$emit("changeShowMod", false);
    }
  }
};
</script>

<style scoped>
.content {
  height: 600px;
  overflow: auto;
}
</style>