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
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
          <FormItem label="书籍名称" prop="book_name">
            <Input v-model="formValidate.book_name" placeholder="请输入书籍名称"></Input>
          </FormItem>
          <FormItem label="顶部图片" prop="title_image">
            <img v-if="formValidate.title_image" :src="formValidate.title_image" class="imgUrl" />
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadImg"
              :show-upload-list="false"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="顶部图片跳转链接" prop="title_action_url">
            <Input v-model="formValidate.title_action_url" placeholder="请输入链接地址"></Input>
          </FormItem>
          <FormItem label="底部图片" prop="bottom_image">
            <img v-if="formValidate.bottom_image" :src="formValidate.bottom_image" class="imgUrl" />
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
              <Option :value="index" v-for="(item,index) in grade_strList" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="科目" prop="subject">
            <Select v-model="formValidate.subject" placeholder="请选择科目">
              <Option :value="index" v-for="(item,index) in subjectList" :key="index">{{item}}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import { mapState, mapActions } from "vuex";
import { UPLOADIMAGE, CREATEINBOOK, UPDATEINBOOK } from "@/uilt/url/Murl";
import { SCREENLIST } from "@/uilt/url/url";
export default {
  computed: {
    ...mapState({
      subjectList: state => state.screen_list.subject,
      grade_strList: state => state.screen_list.grade_str
    })
  },
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
        title_image: "",
        bottom_image: ""
      },
      ruleValidate: {
        book_name: [
          { required: true, message: "请输入书籍名称", trigger: "blur" }
        ],
        title_action_url: [
          { required: true, message: "请输入跳转地址", trigger: "blur" }
        ],
        title_image: [
          { required: true, message: "请选择顶部图片", trigger: "change" }
        ],
        bottom_image: [
          { required: true, message: "请选择底部图片", trigger: "change" }
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
      }
    };
  },
  created() {
    delete this.subjectList[-1];
    if (this.row) {
      this.formValidate = this.row;
      this.formValidate.subject =
        Object.keys(this.subjectList)
          .map(item => this.subjectList[item])
          .indexOf(this.row.subject) +
        1 +
        "";
      this.formValidate.grade =
        Object.keys(this.grade_strList)
          .map(item => this.grade_strList[item])
          .indexOf(this.row.grade) +
        1 +
        "";
    }
  },
  methods: {
    // 编辑书籍
    async editBook() {
      let res = await this.$request({
        method: "POST",
        url: UPDATEINBOOK,
        data: qs.stringify(this.formValidate)
      });
      return res;
    },
    // 新建书籍
    async createInBook() {
      let res = await this.$request({
        method: "POST",
        url: CREATEINBOOK,
        data: qs.stringify(this.formValidate)
      });
      return res;
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
          this.formValidate.title_image =
            "http://liveapi.canpoint.net" + res.data.data.value;
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
          this.formValidate.bottom_image =
            "http://liveapi.canpoint.net" + res.data.data.value;
        });
      };
      return false;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          if (val) {
            if (
              this.formValidate.title_image &&
              this.formValidate.bottom_image
            ) {
              // 这里发送操作请求
              this.row
                ? this.editBook().then(res => {
                    if (res.data.code == 100001) {
                      this.$Message.error(res.data.error);
                      this.modal1 = true;
                    } else if (res.data.code == 200) {
                      this.$Message.success("编辑成功！");
                      this.$emit("changeShowMod", false);
                    }
                  })
                : this.createInBook().then(res => {
                    if (res.data.code == 100001) {
                      this.$Message.error(res.data.error);
                      this.modal1 = true;
                    } else if (res.data.code == 200) {
                      this.$Message.success("新建成功！");
                      this.$emit("changeShowMod", false);
                    }
                  });
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
  }
};
</script>

<style scoped>
.imgUrl {
  width: 100px;
  height: 100px;
}
</style>