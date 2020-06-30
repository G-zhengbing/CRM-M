<template>
  <div class="addBook">
    <Modal v-model="modal1" :title="isIn ? '编辑' : '添加'" @on-ok="ok" @on-cancel="cancel" width="40">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="二维码标题" prop="qrcode_title">
          <Input :disabled="isIn" v-model="formValidate.qrcode_title" placeholder="请输入二维码标题"></Input>
        </FormItem>
        <FormItem label="选择渠道码" prop="wechat_channel_code_id">
          <Select
            :disabled="isIn"
            v-model="formValidate.wechat_channel_code_id"
            placeholder="请选择渠道码"
          >
            <Option :value="item.id+''" v-for="item in wxCodeList" :key="item.id">{{item.code_name}}</Option>
          </Select>
          <p style="color: #ccc;padding-top: 10px;">请先去营销公众号管理创建渠道二维码</p>
        </FormItem>
        <FormItem label="视频封面">
          <img v-if="formValidate.video_image" :src="formValidate.video_image" class="imgUrl" />
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :before-upload="upVideoImg"
            :show-upload-list="false"
          >
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
        <FormItem label="视频ID" prop="videoid">
          <Input v-model="formValidate.videoid" placeholder="请输入视频ID"></Input>
        </FormItem>
        <FormItem label="视频简介" prop="video_desc">
          <Input
            v-model="formValidate.video_desc"
            type="textarea"
            :autosize="{minRows: 6,maxRows: 5}"
            placeholder="请输入视频简介"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import {
  CREATEINBOOKSUBLEVEL,
  GETWXCODELIST,
  UPDATEINBOOKSUBLEVEL,
  UPLOADIMAGE
} from "@/uilt/url/Murl";
export default {
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
      required: true
    },
    isIn: {
      type: Boolean,
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
      modal1: "",
      formValidate: {
        video_image: ""
      },
      wxCodeList: [],
      ruleValidate: {
        qrcode_title: [
          {
            required: true,
            message: "请输入二维码标题",
            trigger: "blur"
          }
        ],
        wechat_channel_code_id: [
          { required: true, message: "请选择渠道码", trigger: "change" }
        ],
        videoid: [
          {
            required: true,
            message: "请输入视频ID",
            trigger: "blur"
          }
        ],
        video_desc: [
          {
            required: true,
            message: "请输入视频简介",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getWxCodeList();
    if (this.isIn) {
      // 深拷贝，防止上一层数值改变
      Object.assign(this.formValidate, this.row);
      this.formValidate.wechat_channel_code_id += "";
    }
  },
  methods: {
    async upVideoImg(file) {
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
          // this.formValidate.video_image =
          //   "http://liveapi.canpoint.net" + res.data.data.value;
          this.formValidate.video_image =
            "http://39.107.156.22/canpoint" + res.data.data.value;
        });
      };
      return false;
    },
    // 编辑渠道码
    async editCood() {
      this.formValidate.id = this.row.id;
      let res = await this.$request({
        method: "POST",
        url: UPDATEINBOOKSUBLEVEL,
        data: qs.stringify(this.formValidate)
      });
      return res;
    },
    // 创建渠道码
    async creatCood() {
      this.formValidate.superior_id = this.row.id;
      let res = await this.$request({
        method: "POST",
        url: CREATEINBOOKSUBLEVEL,
        data: qs.stringify(this.formValidate)
      });
      return res;
    },
    //获取渠道码列表
    async getWxCodeList() {
      let res = await this.$request({
        method: "POST",
        url: GETWXCODELIST
      });
      this.wxCodeList = res.data.data;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (this.isIn) {
            this.editCood().then(res => {
              if (res.data.code == 100001) {
                this.$Message.error(res.data.error);
                this.modal1 = true;
              } else if (res.data.code == 200) {
                this.$Message.success("修改成功！");
                this.$emit("changeShowMod", false);
              }
            });
          } else {
            this.creatCood().then(res => {
              if (res.data.code == 100001) {
                this.$Message.error(res.data.error);
                this.modal1 = true;
              } else if (res.data.code == 200) {
                this.$Message.success("添加成功！");
                this.$emit("changeShowMod", false);
              }
            });
          }
        });
    },
    cancel() {
      this.$emit("changeShowMod", false, 1);
    }
  }
};
</script>

<style scoped>
.imgUrl {
  width: 100px;
  height: 100px;
}
</style>