<template>
  <div class="shade">
    <Card>
      <p slot="title" v-if="$parent.isUpdata">编辑专题</p>
      <p slot="title" v-else>新建专题</p>
      <p slot="extra" class="extra" @click="close">×</p>
      <p class="contanner">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
          <FormItem label="专题标题" prop="title">
            <Input v-model="form.title" placeholder="请输入专题标题"></Input>
          </FormItem>
          <FormItem label="副标题" prop="subtitle">
            <Input v-model="form.subtitle" placeholder="请输入副标题"></Input>
          </FormItem>
          <FormItem label="专题图片展示" v-if="form.event_pic">
            <div class="demo-upload-list">
              <img :src="'http://liveapi.canpoint.net/' + form.event_pic">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/' + form.event_pic)"></Icon>
              </div>
            </div>
            <Modal title="View Image" v-model="visible">
              <img :src="imgName" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem label="专题图片" prop="event_pic" class="active_span">
            <span class="active_red">*</span>
            <template v-if="uploadList.length>=1">
              <div class="demo-upload-list" v-for="item in uploadList">
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
            <img :src="imgName" v-if="visible" style="width: 100%">
          </Modal> -->
          </FormItem>
          <FormItem label="专题内容" prop="content" class="active_span">
            <span class="active_red">*</span>
            <Wangeditor v-model="form.content"  :catchData="catchData" ref="wangditor"/>
          </FormItem>
          <FormItem label="状态" prop="status" class="label-left active_span">
            <span class="active_red active_red_a">*</span>
            <RadioGroup v-model="form.status">
              <Radio :label="1">启用</Radio>
              <Radio :label="2">隐藏</Radio>
            </RadioGroup>
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
import Wangeditor from '../../uilt/wangeditor/Wangeditor'
import { mapActions} from 'vuex'
import axios from 'axios'
import storage from '../../uilt/storage'
import { ADDSPECIAL_URL ,UPDATASPECIAL_URL} from '../../uilt/url/Murl'
import qs from 'qs'
export default {
  components:{
    Wangeditor
  },
  props:["item"],
  data() {
    return {
      wangditor:'',
      imgWidth:'',
      imgHeight:"",
      fileObj:{},
      imgName: '',
      visible: false,
      uploadList: [],
      form: {},
      ruleValidate: {
        title: [
          { required: true, message: '专题标题不能为空', trigger: 'blur'}
        ],
        subtitle: [
          { required: true, message: '专题副标题不能为空', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    ...mapActions(["getSpecialList"]),
    //富文本
    catchData(val){
      var value  = encodeURI(encodeURI(val))
      this.form.content = val
    },
    handleView (item) {
      if(this.$parent.isUpdata){
        this.imgName = item
      }else{
        this.imgName = this.uploadList[0].url;
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
        var img = new Image()
        img.src = reader.result
        _this.uploadList.push(file)
        _this.imgHeight = img.height*1
        _this.imgWidth = img.width*1
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
      this.$parent.isSpeMessage = false;
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$parent.isUpdata){
            var formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('subtitle',this.form.subtitle);
            formData.append('content',this.form.content);
            formData.append('status',this.form.status);
            formData.append('event_pic',this.uploadList[0]);
            let config = {
              headers: {
                'Content-Type': 'multipart/json',
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post(UPDATASPECIAL_URL+"/" +this.form.id,formData,config)
            .then((response) => {
              if(response.data.code == 100001 && response.data.error){
                this.$Message.error(response.data.error);
                return
              }
              if(response.data.code==200 && response.data.ret == true){
                this.$Message.success("修改成功");
                this.getSpecialList()
              }
              this.$parent.isSpeMessage = false
            })      
          }else{
            if(this.uploadList.length == 0){
              this.$Message.warning('请选择要上传的图片')
              return
            }
            // if(this.imgWidth > 750){
            //   this.$Message.warning('图片宽度超出比例')
            //   this.uploadList = []
            //   return
            // }
            // if(this.imgHeight > 250){
            //   this.$Message.warning('图片高度超出比例')
            //   this.uploadList = []
            //   return
            // }
            if(!this.form.content){
              this.$Message.warning('请填写专题内容')
              return
            }
            var formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('subtitle',this.form.subtitle);
            formData.append('content',this.form.content);
            formData.append('status',this.form.status);
            formData.append('event_pic',this.uploadList[0]);
            let config = {
              headers: {
                'Content-Type': 'x-www-form-urlencoded;charset=utf-8',
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post(ADDSPECIAL_URL,formData,config)
            .then((response) => {
              if(response.data.code == 100001 && response.data.error){
                this.$Message.error(response.data.error);
                return
              }
              if(response.data.code==200 && response.data.ret == true){
                this.$Message.success("新增成功");
                this.getSpecialList()
              }
              this.$parent.isSpeMessage = false
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
        status: '启用'
      }
      this.uploadList = 0
    }
  },
  mounted(){
    if(this.$parent.isUpdata){
      this.form =  this.item
      this.$refs.wangditor.text = this.item.content
    }else{
      this.uploadList.length = 0
      this.form={
        status : 1
      }
    }
  }
};
</script>

<style scoped>
.active_red_a{
  left: -50px;
}
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
  height: 910px;
}
</style>