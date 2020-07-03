<template>
  <div class="shade">
    <Card class="box-form">
      <p slot="title" v-if="$parent.isUpdata">编辑资料</p>
      <p slot="title" v-else>新建资料</p>
      <p slot="extra" class="extra" @click="close">×</p>
      <p class="contanner ">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem label="资料合集名称" prop="materials_name">
          <Input v-model="form.materials_name" placeholder="请输入资料名称"></Input>
        </FormItem>
        <FormItem>
          <div class="catalog">
            <p @click="addLessons">+添加资料</p>
            <ul>
              <li v-for="(item,i) in dataArr" :key="i">
                <Select v-model="item.grade" placeholder="请选择" style="width:288px;margin-right:20px;">
                  <Option :value="1">一年级</Option> 
                  <Option :value="2">二年级</Option> 
                  <Option :value="3">三年级</Option> 
                  <Option :value="4">四年级</Option> 
                  <Option :value="5">五年级</Option> 
                  <Option :value="6">六年级</Option> 
                  <Option :value="7">七年级</Option> 
                  <Option :value="8">八年级</Option> 
                  <Option :value="9">九年级</Option> 
                </Select>
                <Select v-model="item.subject" placeholder="请选择" style="width:288px;margin-right:20px;">
                  <Option :value="1">数学</Option> 
                  <Option :value="2">英语</Option> 
                  <Option :value="3">语文</Option> 
                  <Option :value="4">物理</Option> 
                  <Option :value="5">化学</Option> 
                  <Option :value="6">政治</Option> 
                  <Option :value="7">生物</Option> 
                  <Option :value="8">地理</Option> 
                  <Option :value="9">历史</Option> 
                </Select>
                <span class="filevideo">选择上传文件<input type="file" ref="file" @change="getFiles($event,i)" accept=".docx,.doc,.pdf" multiple="multiplt" name="file_url"></span>
                <input v-model="item.file_url" type="hidden">
                <span style="width:150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-show="item.file_name" :title="item.file_name">{{"已上传:"+item.file_name}}</span>
                <div style="width:30px;">
                  <i><Icon type="ios-trash-outline" @click="deleData(i)"/></i>
                </div>
              </li>
            </ul>
          </div>
        </FormItem>
        <FormItem label="是否首页展示" prop="is_hot" class="label-left">
          <RadioGroup v-model="form.is_hot">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
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
import { mapActions } from 'vuex'
import storage from '../../../uilt/storage'
import { UPDATADATA_URL,ADDDATA_URL } from "../../../uilt/url/Murl";
import { MATERIALUPLOAD } from "../../../uilt/url/url";
import axios from "axios"
export default {
  props:["item"],
  data() {
    return {
      videoIndex:0,
      dataArr:[],
      addArr:[],
      form: {},
      ruleValidate: {
        materials_name: [
          { required: true, message: '资料名称不能为空', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '年级不能为空'}
        ],
        subject: [
          { required: true, message: '科目不能为空'}
        ],
        is_hot:[{ required: true}]
      }
    };
  },
  methods: {
    ...mapActions(["addDataList","updataDataList","getDatabankList"]),
    deleData(num){
      this.dataArr.splice(num,1)
    },
    addLessons(){
      this.videoIndex++
      this.dataArr.push({grade:"",subject:"",file_url:"",file_name:""})
    },
    getFiles(event,num){
      var file = event.target.files;
      for(var i = 0;i<file.length;i++){
        // 上传类型判断
        var imgName = file[i].name;
        var idx = imgName.lastIndexOf(".");  
        if (idx != -1){
          var ext = imgName.substr(idx+1).toUpperCase();
          ext = ext.toLowerCase( ); 
          if (ext!='pdf' && ext!='doc' && ext!='docx')return
        }
        var formData = new FormData()
        formData.append("file_url",file[0])
          let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "bearer " + storage.get()
          }
        };
        axios.post(MATERIALUPLOAD,formData,config).then((response)=>{
          if(response.data.error){
            this.$Message.error(response.data.error);
            return
          }
          if(response.status == 200 && response.data.ret){
            this.dataArr[num].file_url = response.data.data.upload_url
            this.dataArr[num].file_name = response.data.data.real_name
          }
        })
      }
    },
    close() {
      this.$parent.isDataMessage = false;
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$parent.isUpdata){
            var formData = new FormData();
            formData.append('materials_name', this.form.materials_name);
            formData.append('is_hot',this.form.is_hot);
            formData.append('material_list',JSON.stringify(this.dataArr));
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post(UPDATADATA_URL + "/" + this.form.id,formData,config)
              .then((response) => {
                if(response.data.code == 100001 && response.data.error){
                  this.$Message.error(response.data.error);
                }
                if(response.data.code==200 && response.data.ret == true){
                  this.$Message.success("修改成功");
                  this.getDatabankList()
                  this.$parent.isDataMessage = false
                }
              })
          }else{
            //新增课程
            var formData = new FormData();
            formData.append('materials_name', this.form.materials_name);
            formData.append('is_hot',this.form.is_hot);
            formData.append('material_list',JSON.stringify(this.dataArr));
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post(ADDDATA_URL,formData,config)
              .then((response) => {
                if(response.data.code == 100001 && response.data.error){
                  this.$Message.error(response.data.error);
                }
                if(response.data.code==200 && response.data.ret == true){
                  this.$Message.success("新增成功");
                  this.getDatabankList()
                  this.$parent.isDataMessage = false
                }
              })
            }
        } else {
          this.$Message.error('请完整填写正确信息');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
       
    }
  },
  mounted () {
    if(this.$parent.isUpdata){ 
      this.form =  this.item
      this.dataArr = this.item.materials_list
    }
  }
};
</script>

<style scoped>
.box-form{
  height: 468px;
  overflow-y: auto;
}
.catalog ul li i{
  font-size: 20px;
  height: 100%;
  line-height: 40px;
  cursor: pointer;
  display: none;
  position: relative;
}
.catalog ul li span.filevideo input{
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.catalog ul li:hover i{
  display: block;
}
.catalog ul li span.filevideo{
  position: relative;
  margin: 0 10px;
  height: 30px;
  border: 1px solid #ccc;
  width: 230px;
  text-align: center;
}
.catalog ul li span.filetitle{
  margin: 0 10px;
}
.catalog ul li span.filename{
  width: 200px;
  color: #aaa5a5;
}
.catalog ul li{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top:5px;
}
.catalog ul{
  display: flex;
  flex-direction: column;
}
.catalog p{
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  color:#6699ff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.catalog{
  display: flex;
  flex-direction: column;
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
  height: 520px;
}
</style>