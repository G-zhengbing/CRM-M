<template>
  <div class="imageUpload">
    <div class="demo-upload-list" v-for="(item,index) in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="imgArr[index]" :title="item.url" />
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url,index)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :data="{assess_image: imageUrl, visit_content: ''}"
      multiple
      type="drag"
      :action="baseURL"
      style="display: inline-block;width:58px;"
    >
      <!-- 图标 -->
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgArr[index]" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { APPIONTMODIFY } from "@/uilt/url/url";
import qs from "qs";

export default {
  props: {
    userId: {
      type: Number,
      required: false
    },
    imageURLs: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList
    })
  },
  data() {
    return {
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [
        {
          status: "",
          url: "",
          showProgress: "",
          percentage: ""
        }
      ],
      uploadImg: {},
      imageUrl: "",
      baseURL: "",
      getimageUrl: "",
      index: 0,
      upListLength: 0,
      imageurltest: "",
      imgArr: []
    };
  },
  watch: {
    upListLength: {
      deep: true,
      handler(newName, oldName) {
        this.imageurltest = this.imageUrl[this.upListLength - 1];
      }
    }
  },
  methods: {
    // 查看大图
    handleView(url, index) {
      this.index = index;
      // this.getimageUrl = url
      // this.imgName = name;
      this.visible = true;
    },
    // 删除图片
    handleRemove(file) {
      // this.upListLength--;
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.imgArr = [];
    },
    // 上传成功钩子
    handleSuccess(res, file) {
      this.imageurltest = "";
      // this.upListLength++;
      this.imgArr.push(this.imageUrl);
      this.imageUrl = "";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 不正确，请选择jpg或png。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出限制",
        desc: "文件  " + file.name + " 不能超过2M."
      });
    },

    // 上传之前
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "最多可以上传一张照片."
        });
        return false
      }
      let reader = new FileReader();
      var formData = new FormData();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        file.url = reader.result;
        formData.append("assess_image", file);
        this.imageUrl = file.url;
        this.$request({
          method: "post",
          url: this.baseURL,
          data: formData
        }).then(res => {
          this.uploadList.push({
            status: "finished",
            percentage: 100
          });
          this.imageurltest = "";
          this.imgArr.push(this.imageUrl);
          this.imageUrl = "";
        });
      // this.$emit('uploadImg',formData)
      };
      this.uploadImg = formData;
      return false;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.baseURL = APPIONTMODIFY + "/" + this.userId;
    if (this.imageURLs) {
      this.uploadList.push({
        status: "finished"
      });
      this.imgArr = ["http://liveapi.canpoint.net/" + this.imageURLs];
    }
  }
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
