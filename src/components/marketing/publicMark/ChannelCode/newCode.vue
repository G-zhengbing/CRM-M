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
          <FormItem label="二维码名称" prop="code_name">
            <Input v-model="formValidate.code_name" placeholder="请输入二维码名称"></Input>
          </FormItem>
          <FormItem label="推送类型" prop="code_type">
            <RadioGroup v-model="formValidate.code_type">
              <Radio :label="1">图文推送</Radio>
              <Radio :label="2">文字推送</Radio>
              <Radio :label="3">小程序卡片</Radio>
            </RadioGroup>
          </FormItem>
          <template v-if="formValidate.code_type == '1'">
            <FormItem label="图文标题" prop="code_title">
              <Input v-model="formValidate.code_title" placeholder="请输入标题"></Input>
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
            <FormItem label="图文描述" prop="image_desc">
              <Input v-model="formValidate.image_desc" placeholder="请输入图文描述"></Input>
            </FormItem>
            <FormItem label="图文链接" prop="image_skip_url">
              <Input v-model="formValidate.image_skip_url" placeholder="请输入图文链接"></Input>
            </FormItem>
          </template>
          <template v-if="formValidate.code_type == '2'">
            <FormItem label="推送文字">
              <WangEditor
                v-model="formValidate.text_content"
                :catchData="catchData"
                ref="wangditor"
              />
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
          <template v-if="formValidate.code_type == '3'">
            <FormItem label="小程序appid" prop="mini_program_appid">
              <Input v-model="formValidate.mini_program_appid" placeholder="请输入小程序appid"></Input>
            </FormItem>
            <FormItem label="小程序路径">
              <Input v-model="formValidate.mini_program_path" placeholder="pages/index/index"></Input>
            </FormItem>
            <FormItem label="小程序简介" prop="mini_program_desc">
              <Input v-model="formValidate.mini_program_desc" placeholder="请输入小程序简介"></Input>
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
          <FormItem label="二维码类型" prop="code_time_type">
            <RadioGroup v-model="formValidate.code_time_type">
              <Radio :label="1" :disabled="row ? true : false">临时二维码</Radio>
              <Radio :label="2" :disabled="row ? true : false">永久二维码</Radio>
            </RadioGroup>
          </FormItem>
          <template v-if="formValidate.code_time_type == 1">
            <FormItem label="过期时间" prop="timeTem">
              <Input
                v-model="formValidate.timeTem"
                placeholder="请输入过期时间"
                :disabled="row ? true : false"
              ></Input>
              <p>临时二维码过期时间, 最大为30天（2592000秒）</p>
            </FormItem>
          </template>
          <FormItem v-else label="过期时间">
            <Input v-model="formValidate.timePer" placeholder="永久" disabled></Input>
          </FormItem>
          <FormItem label="粉丝标签" prop="fan_label">
            <Select
              :disabled="row ? true : false"
              v-model="formValidate.fan_label"
              placeholder="请选择粉丝标签"
              @on-change="selectFan"
            >
              <Option v-for="item in labelList" :key="item.id" :value="item">{{item.name}}</Option>
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
import { CREATECODE, GETCODEINFO, UPDATECODE } from "@/uilt/url/marketing";
import qs from "qs";
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
      required: true
    },
    labelList: {
      type: Array,
      required: true
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
        code_type: 1,
        code_time_type: 2,
        imgUrl: ""
      },
      ruleValidate: {
        code_name: [
          { required: true, message: "请输入二维码名称", trigger: "blur" }
        ],
        code_title: [
          { required: true, message: "请输入标题", trigger: "change" }
        ],
        image_desc: [
          { required: true, message: "请输入图文描述", trigger: "change" }
        ],
        image_skip_url: [
          { required: true, message: "请输入图文链接", trigger: "change" }
        ],
        timeTem: [
          { required: true, message: "请输入过期时间", trigger: "change" }
        ],
        mini_program_appid: [
          { required: true, message: "请输入小程序Appid", trigger: "change" }
        ],
        mini_program_desc: [
          { required: true, message: "请输入小程序简介", trigger: "change" }
        ],
        code_type: [
          {
            required: true,
            type: "number",
            message: "请选择",
            trigger: "change"
          }
        ],
        code_time_type: [
          {
            required: true,
            type: "number",
            message: "请选择",
            trigger: "change"
          }
        ],
        fan_label: [
          {
            required: true,
            type: "object",
            message: "请选择粉丝标签",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 选择粉丝标签时触发
    selectFan(item) {
      this.formValidate.fan_label_id = item.id;
      this.formValidate.fan_label_name = item.name;
    },
    // 上传图片
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
    //富文本
    catchData(val) {
      var value = encodeURI(encodeURI(val));
      this.formValidate.text_content = val;
    },
    // 创建渠道
    async createCode() {
      this.isLoading = true;
      if (this.formValidate.code_type == "1") {
        this.formValidate.code_image = this.formValidate.imgUrl;
      } else if (this.formValidate.code_type == "2") {
        this.formValidate.text_image = this.formValidate.imgUrl;
      } else {
        this.formValidate.mini_program_image = this.formValidate.imgUrl;
      }
      if (this.row) {
        this.formValidate.id = this.row.id;
        let res = await this.$request({
          method: "post",
          url: UPDATECODE,
          data: qs.stringify(this.formValidate)
        });
        if (res.data.code == 100001) {
          this.$Message.error(res.data.error);
        } else {
          this.$emit("changeShowMod", false, 1);
          this.$Message.success("修改成功");
        }
      } else {
        let res = await this.$request({
          method: "post",
          url: CREATECODE,
          data: qs.stringify(this.formValidate)
        });
        if (res.data.code == 100001) {
          this.$Message.error(res.data.error);
        } else {
          this.$emit("changeShowMod", false, 1);
          this.$Message.success("创建成功");
        }
      }

      this.isLoading = false;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (this.formValidate.code_time_type == "1") {
            if (this.formValidate.timeTem) {
              this.formValidate.code_end_time = this.formValidate.timeTem;
            } else {
              this.$Message.error("请输入过期时间");
              val = false;
            }
          } else if (this.formValidate.code_time_type == "2") {
            // 永久发0
            this.formValidate.code_end_time = "0";
          }
          if (this.formValidate.code_type == "2") {
            if (!this.formValidate.text_content) {
              this.$Message.error("请输入推送文字");
              val = false;
            }
          } else if (this.formValidate.code_type == "3") {
            if (!this.formValidate.mini_program_image) {
              this.$Message.error("请选择图片");
              val = false;
            }
            if (!this.formValidate.mini_program_desc) {
              this.$Message.error("请输入图文描述");
              val = false;
            }
          }
          if (val) {
            this.createCode();
          }
          this.modal1 = true;
        });
    },
    cancel() {
      this.$emit("changeShowMod", false);
    },
    // 获取渠道码信息
    async getUserList() {
      let res = await this.$request({
        url: GETCODEINFO,
        params: {
          id: this.row.id
        }
      });
      this.formValidate = res.data.data;
      if (this.formValidate.code_type == "1") {
        this.formValidate.imgUrl = this.formValidate.code_image;
      } else if (this.formValidate.code_type == "2") {
        this.formValidate.imgUrl = this.formValidate.text_image;
      } else {
        this.formValidate.imgUrl = this.formValidate.mini_program_image;
      }
      this.formValidate.timeTem = this.formValidate.code_end_time;

      this.labelList.forEach(item => {
        if (this.formValidate.fan_label_id == item.id) {
          this.formValidate.fan_label = item;
        }
      });
    }
  },
  created() {
    if (this.row) {
      this.getUserList();
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