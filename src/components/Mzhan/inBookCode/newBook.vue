<template>
  <div class="newBook">
    <Modal
      v-model="modal1"
      :title="row ? '修改书箱' : '新建书籍'"
      @on-ok="ok"
      @on-cancel="cancel"
      width="60"
    >
      <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="书籍名称" prop="book_name">
            <Input v-model="formValidate.book_name" placeholder="请输入书籍名称"></Input>
          </FormItem>
          <FormItem label="顶部图片" prop="city">
            <img v-if="formValidate.TopimgUrl" :src="formValidate.TopimgUrl" class="imgUrl" />
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadImg"
              :show-upload-list="false"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="底部图片" prop="city">
            <img v-if="formValidate.BooimgUrl" :src="formValidate.BooimgUrl" class="imgUrl" />
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadBooImg"
              :show-upload-list="false"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="年级" prop="grade">
            <Select v-model="formValidate.grade" placeholder="请选择年级">
              <Option :value="item" v-for="(item,index) in grade_strList" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="科目" prop="subject">
            <Select v-model="formValidate.subject" placeholder="请选择科目">
              <Option :value="item" v-for="(item,index) in subjectList" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { UPLOADIMAGE } from "@/uilt/url/Murl";
import { SCREENLIST } from "@/uilt/url/url";
export default {
  props: {
    row: {
      type: [Object, String],
      required: false
    },
    showMod: {
      type: [Boolean, String],
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
      modal1: "",
      formValidate: {
        TopimgUrl: "",
        BooimgUrl: ""
      },
      ruleValidate: {
        book_name: [
          { required: true, message: "请输入书籍名称", trigger: "blur" }
        ],
        grade: [
          {
            required: true,
            message: "请选择年级",
            trigger: "change"
          }
        ],
        subject: [
          {
            required: true,
            message: "请选择科目",
            trigger: "change"
          }
        ]
      },
      subjectList: [],
      grade_strList: []
    };
  },
  methods: {
    // 获取年级科目，基本信息
    async getpublic() {
      let res = await this.$request({
        url: SCREENLIST
      });
      let subject = res.data.data.screen_list.subject;
      this.subjectList = Object.keys(subject)
        .map(item => subject[item])
        .filter(item => item.trim());
      this.subjectList.splice(this.subjectList.indexOf("全科"));
      this.grade_strList = res.data.data.screen_list.grade_str;
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
          // this.formValidate.TopimgUrl =
          // 	"http://liveapi.canpoint.net" + res.data.data.value;
          this.formValidate.TopimgUrl =
            "http://39.107.156.22/canpoint" + res.data.data.value;
        });
      };
      return false;
    },
    async uploadBooImg(file) {
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
          // this.formValidate.BooimgUrl =
          // 	"http://liveapi.canpoint.net" + res.data.data.value;
          this.formValidate.BooimgUrl =
            "http://39.107.156.22/canpoint" + res.data.data.value;
        });
      };
      return false;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (val) {
            if (this.formValidate.TopimgUrl && this.formValidate.BooimgUrl) {
              // 这里发送操作请求
              
              this.$Message.success("成功！");
              this.$emit("changeShowMod", false);
              return;
            }
            this.$Message.error("请选择图片!");
            this.modal1 = true;
          }
          this.modal1 = true;
        });
    },
    cancel() {
      this.$emit("changeShowMod", false);
    }
  },
  created() {
    this.getpublic();
  }
};
</script>

<style scoped>
.imgUrl {
  width: 100px;
  height: 100px;
}
</style>