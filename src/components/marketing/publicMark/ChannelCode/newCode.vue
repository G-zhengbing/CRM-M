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
            <Input v-model="formValidate.codeName" placeholder="请输入二维码名称"></Input>
          </FormItem>
          <FormItem label="推送类型" prop="pushType">
            <RadioGroup v-model="formValidate.pushType">
              <Radio label="1">图文推送</Radio>
              <Radio label="2">文字推送</Radio>
              <Radio label="3">小程序卡片</Radio>
            </RadioGroup>
          </FormItem>
          <template v-if="formValidate.pushType == '1'">
            <FormItem label="图文标题" prop="imgText_title">
              <Input v-model="formValidate.imgText_title" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="图文封面">
              <Input v-model="formValidate.imgUrl" style="width: 500px"></Input>
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="uploadImg"
                :show-upload-list="false"
                style="display: inline;"
              >
                <Button type="primary">上传图片</Button>
              </Upload>
            </FormItem>
            <FormItem label="图文描述" prop="imgText_describe">
              <Input v-model="formValidate.imgText_describe" placeholder="请输入图文描述"></Input>
            </FormItem>
            <FormItem label="图文链接" prop="imgText_url">
              <Input v-model="formValidate.imgText_url" placeholder="请输入图文链接"></Input>
            </FormItem>
          </template>
          <template v-if="formValidate.pushType == '2'">
            <FormItem label="推送文字">
              <WangEditor v-model="formValidate.pushText" :catchData="catchData" ref="wangditor" />
            </FormItem>
            <FormItem label="推送图片">
              <Input v-model="formValidate.imgUrl" style="width: 500px"></Input>
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="uploadImg"
                :show-upload-list="false"
                style="display: inline;"
              >
                <Button type="primary">上传图片</Button>
              </Upload>
              <p>扫码关注推送图片，不填写则不推送；</p>
            </FormItem>
          </template>
          <template v-if="formValidate.pushType == '3'">
            <FormItem label="小程序appid" prop="miniAppid">
              <Input v-model="formValidate.miniAppid" placeholder="请输入小程序appid"></Input>
            </FormItem>
            <FormItem label="小程序路径">
              <Input v-model="formValidate.name" placeholder="pages/index/index"></Input>
            </FormItem>
            <FormItem label="小程序简介" prop="miniIntro">
              <Input v-model="formValidate.miniIntro" placeholder="请输入小程序简介"></Input>
            </FormItem>
            <FormItem label="小程序图片">
              <Input v-model="formValidate.imgUrl" style="width: 500px"></Input>
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                :before-upload="uploadImg"
                :show-upload-list="false"
                style="display: inline;"
              >
                <Button type="primary">上传图片</Button>
              </Upload>
            </FormItem>
          </template>
          <FormItem label="二维码类型" prop="codeType">
            <RadioGroup v-model="formValidate.codeType" @on-change="codeTypeChange">
              <Radio label="1">临时二维码</Radio>
              <Radio label="2">永久二维码</Radio>
            </RadioGroup>
          </FormItem>
          <template v-if="formValidate.codeType == 1">
            <FormItem label="过期时间" prop="timeTem">
              <Input v-model="formValidate.timeTem" placeholder="请输入过期时间"></Input>
              <p>临时二维码过期时间, 最大为30天（2592000秒）</p>
            </FormItem>
          </template>
          <FormItem v-else label="过期时间">
            <Input v-model="formValidate.timePer" placeholder="永久" disabled></Input>
          </FormItem>
          <FormItem label="粉丝标签" prop="fans_label">
            <Select v-model="formValidate.fans_label" placeholder="请选择粉丝标签">
              <Option value="1">a</Option>
              <Option value="2">b</Option>
              <Option value="3">c</Option>
            </Select>
            <p>粉丝扫码关注自动打标签，标签自动同步至微信公众号后台；</p>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import WangEditor from "@/uilt/wangeditor/Wangeditor";
import { UPLOADIMAGE } from "@/uilt/url/Murl";
import { GETLABELLIST } from "@/uilt/url/marketing";
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
    }
  },
  data() {
    return {
      isLoading: false,
      modal1: this.showMod,
      formValidate: {
        pushType: "1",
        codeType: "2",
        imgUrl: ""
      },
      ruleValidate: {
        codeName: [
          { required: true, message: "请输入二维码名称", trigger: "blur" }
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
        timeTem: [
          { required: true, message: "请输入过期时间", trigger: "change" }
        ],
        miniAppid: [
          { required: true, message: "请输入小程序Appid", trigger: "change" }
        ],
        miniIntro: [
          { required: true, message: "请输入小程序简介", trigger: "change" }
        ],
        pushType: [{ required: true, message: "请选择", trigger: "change" }],
        codeType: [{ required: true, message: "请选择", trigger: "change" }],
        fans_label: [
          { required: true, message: "请选择粉丝标签", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    async uploadImg(file) {
      let reader = new FileReader();
      var formData = new FormData();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        file.url = reader.result;
        formData.append("file", file);
        this.$request({
          method: "post",
          url: UPLOADIMAGE,
          data: formData
        }).then(res => {
          this.formValidate.imgUrl =
            "http://liveapi.canpoint.net/api/" + res.data.data.value;
        });
      };
      return false;
    },
    // 二维码类型切换
    codeTypeChange(index) {
      console.log(index == 2);
    },
    //富文本
    catchData(val) {
      var value = encodeURI(encodeURI(val));
      this.formValidate.content = val;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (this.formValidate.codeType == "1") {
            if (this.formValidate.timeTem) {
              this.formValidate.time = this.formValidate.timeTem;
            } else {
              this.$Message.error("请输入过期时间");
              val = false;
            }
          } else if (this.formValidate.codeType == "2") {
            // 永久发0
            this.formValidate.time = "0";
          }
          if (this.formValidate.pushType == "2") {
            if (!this.formValidate.pushText) {
              this.$Message.error("请输入推送文字");
              val = false;
            }
          } else if (this.formValidate.pushType == "3") {
            if (!this.formValidate.imgUrl) {
              this.$Message.error("请选择图片");
              val = false;
            }
            if (!this.formValidate.miniIntro) {
              this.$Message.error("请输入图文描述");
              val = false;
            }
          }
          if (val) {
            this.$emit("changeShowMod", false);
            this.$Message.success("创建成功");
          }
          this.modal1 = true;
        });
    },
    cancel() {
      this.$emit("changeShowMod", false);
    },
    async getLabelList() {
      let res = await this.$request({
        url: GETLABELLIST
      });
      console.log(res);
    }
  },
  created() {
    this.getLabelList();
  }
};
</script>

<style scoped>
.content {
  height: 600px;
  overflow: auto;
}
</style>