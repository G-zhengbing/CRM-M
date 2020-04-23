<template>
  <div class="shade">
    <Card>
      <p slot="title" v-if="$parent.isUpdata">编辑广告</p>
      <p slot="title" v-else>新建广告</p>
      <p slot="extra" class="extra" @click="close">×</p>
      <p class="contanner">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
          <FormItem label="广告名称" prop="title">
            <Input v-model="form.title" placeholder="请输入广告名称"></Input>
          </FormItem>
           <FormItem label="广告图片展示" v-if="form.banner_pic">
            <div class="demo-upload-list" >
              <img :src=" 'http://liveapi.canpoint.net/' +form.banner_pic" alt="">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/' +form.banner_pic)"></Icon>
              </div>
            </div>
            <Modal title="View Image" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
          </Modal>
          </FormItem>
          <FormItem label="广告图片" prop="banner_pic" class="active_span">
            <span class="active_red">*</span>
            <template>
              <div class="demo-upload-list" v-for="(item,i) in uploadList"  :key="i">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <!-- <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon> -->
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </div>
            </template>
          <Upload ref="upload" :show-upload-list="false" 
            :format="['jpg','gif','png']"
            :max-size="2048" 
            :before-upload="handleBeforeUpload" 
            :on-format-error="handleFormatError" 
            :on-exceeded-size="handleMaxSize" 
            type="drag" 
            action="//jsonplaceholder.typicode.com/posts/" 
            style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
          </Upload>
          <p>只能上传jpg/png格式文件，文件不能超过2M，图片尺寸：180px * 180px</p>
          <!-- <Modal title="View Image" v-model="visible">
            <img :src="updateFile" v-if="visible" style="width: 100%">
          </Modal> -->
          </FormItem>
          <FormItem label="跳转链接" prop="link_url">
            <Input v-model="form.link_url" placeholder="跳转链接必须以http://(https://)开头;为空，则表示不跳转。"></Input>
          </FormItem>
          <FormItem label="状态" prop="status" class="label-left">
            <RadioGroup v-model="form.status">
              <Radio :label="1">启用</Radio>
              <Radio :label="2">隐藏</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="排序" prop="sort">
            <Select v-model="form.sort" placeholder="请选择">
              <Option :value="1">1</Option> 
              <Option :value="2">2</Option> 
              <Option :value="3">3</Option> 
              <Option :value="4">4</Option> 
              <Option :value="5">5</Option> 
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('form')">确定</Button>
            <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </p>
    </Card>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
import axios from 'axios'
import storage from '../../uilt/storage'
import { ADDADVER_URL,UPDATAADVER_URL } from '../../uilt/url/Murl'
import qs from 'qs'
export default {
  props:["item"],
  data() {
    return {
      updateFile:"",
      fileObj:{},
      imgName: '',
      visible: false,
      uploadList: [],
      form: {
        status:"隐藏"
      },
      ruleValidate: {
        title: [
          { required: true, message: '广告名称不能为空', trigger: 'blur'}
        ],
        status:[{ required: true}]
      }
    };
  },
  methods: {
    ...mapActions(["getAdverList"]),
    handleView (item) {
      if(this.$parent.isUpdata){
        this.imgName = item
        this.updateFile = item.url
      }else{
        this.imgName = item.url;
      }
      this.visible = true;
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length;
      if (check >=1) {
        this.$Message.error('最多只能上传1张图片');
        return;
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function (e) {
        file.url = reader.result
        _this.uploadList.push(file)
      }
    },
    handleRemove(file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    close() {
      this.$parent.isAdMessage = false;
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$parent.isUpdata){
          var formData = new FormData();
          formData.append('title', this.form.title);
          formData.append('link_url',this.form.link_url);
          formData.append('status',this.form.status);
          formData.append('sort',this.form.sort);
          formData.append('banner_pic',this.uploadList[0]);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: "bearer " + storage.get()
            }
          };
          axios.post(UPDATAADVER_URL + "/" + this.form.id,formData,config)
          .then((response) => {
            if(response.data.code == 100001 && response.data.error){
              this.$Message.error(response.data.error);
              return
            }
            if(response.data.code==200 && response.data.ret == true){
              this.$Message.success("修改成功");
              this.getAdverList()
            }
            this.$parent.isAdMessage = false
          })      
          }else{
          if(this.uploadList.length == 0){
            this.$Message.warning('请选择要上传的图片')
            return
          }
          var formData = new FormData();
          formData.append('title', this.form.title);
          formData.append('link_url',this.form.link_url);
          formData.append('status',this.form.status);
          formData.append('sort',this.form.sort);
          formData.append('banner_pic',this.uploadList[0]);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: "bearer " + storage.get()
            }
          };
          axios.post(ADDADVER_URL,formData,config)
          .then((response) => {
            if(response.data.code == 100001 && response.data.error){
              this.$Message.error(response.data.error);
              return
            }
            if(response.data.code==200 && response.data.ret == true){
              this.$Message.success("新增成功");
              this.getAdverList()
            }
            this.$parent.isAdMessage = false
          })      
          }
          this.form = {
            status : 1
          }
        } else {
          this.$Message.error('请完整填写正确信息');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
      this.form ={
        status: '隐藏'
      }
      this.uploadList = 0
    }
  },
  mounted(){
    if(this.$parent.isUpdata){
      this.form =  this.item
    }else{
      this.uploadList.length = 0
      this.form={
        status : 2
      }
    }
  }
};
</script>

<style scoped>
.demo-upload-list{
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
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
/*  */
.ivu-radio.ivu-radio-checked span{
  box-sizing: border-box;
}
.label-left{
  margin-left: -25px;
}
.contanner{
  margin: 20px 20px 20px 0;
}
.extra {
  font-size: 25px;
  cursor: pointer;
}
.shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}
.ivu-card.ivu-card-bordered {
  width: 1200px;
  height: 540px;
}
</style>