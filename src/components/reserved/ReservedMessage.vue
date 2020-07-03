<template>
  <div class="box">
    <!-- 取消预约 -->
    <template v-if="type.classify == 'callOff'">
      <Modal
        width="300"
        v-model="type.classify == 'callOff'"
        title="取消预约"
        @on-cancel="$parent.showMoadl = false"
      >
        <div class="content">
          <p>确定{{type.data.student_name}}取消预约？</p>
        </div>
        <div slot="footer">
          <Button type="text" size="large" @click="$parent.showMoadl = false">取消</Button>
          <Button type="primary" size="large" @click="callOff">确定</Button>
        </div>
      </Modal>
    </template>
    <!-- 查看测评 -->
    <template v-if="type.classify == 'appraisal'">
      <Modal
        width="500"
        v-model="type.classify == 'appraisal'"
        title="查看测评"
        @on-cancel="$parent.showMoadl = false"
      >
        <Form :form="appraisalForm" label-position="top">
          <FormItem label="测评图片展示" v-if="isUpdata">
            <div class="demo-upload-list">
              <img :src="'http://liveapi.canpoint.net/'+ appraisalForm.assess_image" />
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  @click.native="handleView('http://liveapi.canpoint.net/'+appraisalForm.assess_image)"
                ></Icon>
              </div>
            </div>
            <Modal title="预览图" v-model="visible">
              <img :src="imgName" style="width: 100%" />
            </Modal>
          </FormItem>
          <FormItem label="测评图片" prop="avatar" class="active_span">
            <template>
              <div class="demo-upload-list" v-for="(item,i) in uploadList" :key="i">
                <img :src="item.url" />
                <div class="demo-upload-list-cover">
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </div>
            </template>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :format="['jpg','gif','png']"
              :max-size="2048"
              :before-upload="handleBeforeUpload"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag"
              action="http://liveapi.canpoint.net/api/create_products"
              style="display: inline-block;width:58px;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="测评报告">
            <Input
              v-model="appraisalForm.visit_content"
              type="textarea"
              :autosize="{minRows: 5,maxRows: 15}"
              placeholder="请填写测评报告"
            ></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="$parent.showMoadl = false">取消</Button>
          <Button type="primary" size="large" @click="appraisal">确定</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { APPRAISAL } from "../../uilt/url/url";
import axios from "axios";
import storage from "../../uilt/storage";
export default {
  props: ["type"],
  mounted() {
    if (this.type.classify == "appraisal") {
      this.isUpdata = true;
      this.appraisalForm.assess_image = this.type.data.assess_image;
      this.appraisalForm.visit_content = this.type.data.visit_content;
    }
  },
  data() {
    return {
      isUpdata: false,
      appraisalForm: {},
      form: {},
      uploadList: [],
      imgName: "",
      visible: false
    };
  },
  methods: {
    ...mapActions([
      "getReservedList",
      "setSignin",
      "setAppraisal",
      "getReservedAllList"
    ]),
    //查看测评
    appraisal() {
      this.isLoading = true;
      var formData = new FormData();
      formData.append("assess_image", this.uploadList[0]?this.uploadList[0]:'');
      formData.append("visit_content", this.appraisalForm.visit_content);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + storage.get()
        }
      };
      axios
        .post(APPRAISAL + "/" + this.type.data.id, formData, config)
        .then(response => {
          if (response.data.code == 100001 && response.data.error) {
            this.$Message.error(response.data.error);
          }
          if (response.data.code == 200 && response.data.ret == true) {
            this.$Message.success("新增测评成功");
            if (this.type.status == "reserved") {
              this.getReservedList({ tab_type: this.$parent.num }).then(res => {
                this.isLoading = false;
              });
            } else {
              this.getReservedAllList({ tab_type: this.$parent.num }).then(
                res => {
                  this.isLoading = false;
                }
              );
            }
            this.$parent.showMoadl = false;
          }
          this.isLoading = false;
        });
    },
    //预览图片
    handleView(item) {
      if (this.isUpdata) {
        this.imgName = item;
      } else {
        this.imgName = this.uploadList.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove(file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload(file) {
      const check = this.uploadList.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList.push(file);
      };
    },
    //取消预约
    callOff() {
      this.setSignin({ uid: this.type.data.id}).then(res => {
        if (res.data.ret) {
          this.$Message.success("预约取消成功");
          this.isLoading = true;
          if (this.type.status == "reserved") {
            this.getReservedList({ tab_type: this.$parent.num }).then(res => {
              this.isLoading = false;
            });
          } else {
            this.getReservedAllList({ tab_type: this.$parent.num }).then(
              res => {
                this.isLoading = false;
              }
            );
          }
        } else {
          this.$Message.success(res.data.error);
        }
        this.$parent.showMoadl = false;
      });
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
.dateplc {
  display: flex;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>