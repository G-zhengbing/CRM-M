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
          <FormItem label="书籍名称" prop="code_name">
            <Input v-model="formValidate.TopimgUrl" placeholder="请输入书籍名称"></Input>
          </FormItem>
          <FormItem label="顶部图片" prop="city">
						<img v-if="formValidate.TopimgUrl" :src="formValidate.TopimgUrl" class="imgUrl">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadImg"
              :show-upload-list="false"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="底部图片" prop="city">
						<img v-if="formValidate.BooimgUrl" :src="formValidate.BooimgUrl" class="imgUrl">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadBooImg"
              :show-upload-list="false"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </FormItem>
          <FormItem label="年级" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择年级">
              <Option :value="item" v-for="item in 10" :key="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="科目" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择科目">
              <Option :value="item" v-for="item in 10" :key="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { UPLOADIMAGE } from "@/uilt/url/Murl";
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
      formValidate: {},
      ruleValidate: {
        code_name: [
          { required: true, message: "请输入二维码名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
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
						console.log(this.formValidate)
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
						console.log(this.formValidate)
        });
      };
      return false;
    },
    ok() {
      this.$refs["formValidate"]
        .validate(valid => {})
        .then(val => {
          this.$emit("changeShowMod", false);
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