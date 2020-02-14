<template>
  <div class="shade">
    <Card>
      <p slot="title" v-if="$parent.isUpdata">编辑课程</p>
      <p slot="title" v-else>新建课程</p>
      <p slot="extra" class="extra" @click="close">×</p>
      <p class="contanner">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
          <Row>
            <Col span="10">
                <FormItem label="书籍名称" prop="book_name">
                    <Input v-model="form.book_name" placeholder="请输入副标题"></Input>
                </FormItem>
            </Col>
            <Col span="5" offset="2">
              <FormItem label="年级" prop="grade">
                <Select v-model="form.grade" placeholder="请选择">
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
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="科目" prop="subject">
                <Select v-model="form.subject" placeholder="请选择">
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
              </FormItem>
            </Col>
            <template>
            <Col span="24">
              <FormItem label="介绍头图" v-if="form.iamge_1 || form.iamge_2 || form.iamge_3">
                <div class="demo-upload-list" v-if="form.iamge_1">
                  <img :src="'http://liveapi.canpoint.net/'+form.iamge_1">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/'+form.iamge_1)"></Icon>
                  </div>
                </div>
                <div class="demo-upload-list" v-if="form.iamge_2">
                  <img :src="'http://liveapi.canpoint.net/'+form.iamge_2">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/'+form.iamge_2)"></Icon>
                  </div>
                </div>
                <div class="demo-upload-list" v-if="form.iamge_3">
                  <img :src="'http://liveapi.canpoint.net/'+form.iamge_3">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/'+form.iamge_3)"></Icon>
                  </div>
                </div>
                <Modal title="View Image" v-model="visible">
                  <img :src="imgName" style="width: 100%">
                </Modal>
              </FormItem>
            </col>
            <Col span="24">
              <FormItem label="介绍头图" prop="book_banner" class="active_span">
                <span class="active_red">*</span>
                <template>
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
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
                  action="http://liveapi.canpoint.net/api/create_products" 
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <p>只能上传jpg/png格式文件，文件不能超过2M 图片尺寸：73 * 73 像素</p>
              </FormItem>
            </Col>
            </template>
            <template>
            <Col span="24">
              <FormItem label="课节目录" prop="lesson_list" class="active_span">
                <span class="active_red">*</span>
                 <div class="catalog">
                  <p @click="addLessons">+添加课节</p>
                  <ul>
                    <li v-for="(item,i) in videoArr" :key="i">
                      <span class="filetitle">第{{i+1}}节</span><Input style="width:300px;flex:1;" v-model="item.value" placeholder="请输入该课程标题"></Input> <input v-model="item.value2" type="hidden"><span class="filevideo">选择上传视频文件<input type="file" ref="file" @change="uploadMp4($event,i)"></span><span class="filename">{{item.value2.split('/')[2]}}</span> <i class="video-icon" @click="removeVideo(i)"><Icon type="ios-trash-outline" /></i>
                    </li>
                  </ul>
                </div>
              </FormItem>
            </Col>
            <Col span="24">
                <FormItem label="推荐位" prop="course_list" class="active_span">
                  <span class="active_red">*</span>
                    <div class="recommend">
                            <div class="recommendOne">
                            <span>推荐位1</span>
                            <FormItem prop="image_1" class="active_span">
                            <template>
                            <div class="demo-upload-list" v-for="item in uploadList">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
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
                            action="http://liveapi.canpoint.net/api/create_products" 
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                            </Upload>
                        </FormItem>
                        </div>
                            <div class="recommendTow">
                            <span>推荐位2</span>
                            <FormItem prop="image_1" class="active_span">
                            <template>
                            <div class="demo-upload-list" v-for="item in uploadList">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
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
                            action="http://liveapi.canpoint.net/api/create_products" 
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                            </Upload>
                        </FormItem>
                        </div>
                        <div class="recommendThree">
                            <FormItem prop="sale_price">
                            <Input v-model="form.sale_price" placeholder="请输入推广地址"></Input>
                        </FormItem>
                        </div>
                    </div>
                </FormItem>
            </Col>
            </template>
          </Row>
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
import storage from '../../uilt/storage'
import axios from 'axios'
export default {
  props:["item"],
  data() {
    return {
      videoIndex:0,
      videoArr:[],
      index:0,
      timeArr:[],
      isVideo:false,
      uploadMp4List:[],
      file:[],
      imgUrl:"",
      imgName: '',
      visible: false,
      uploadList: [],
      form: {
      },
      ruleValidate: {
        grade: [
          { required: true, message: '年级不能为空'}
        ],
        book_name: [
          { required: true, message: '课程名称不能为空', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '科目不能为空'}
        ]
      }
    };
  },
  methods: {
    ...mapActions(["addCurrList","updataCurrList","getCurrList"]),
    removeVideo(num){
      this.videoArr.splice(num,1);
    },
    datePicker(time) {
      var d = new Date(time);
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate()
      return d;
    },
    addLessons(){
      this.videoIndex++
      this.videoArr.push({value:"",value2:"",index:this.videoIndex})
    },
    deleTime(num){
      this.timeArr.splice(num,1)
    },
    addGradeTime(){
      this.index++
      this.timeArr.push({value:"",value2:'',index:this.index})
    },
    getSelected(){
      if(this.form.type == 1){
        this.isVideo = false
      }else{
        this.isVideo = true
      }
    },
    //视频
    uploadMp4(e,i){
      let file = e.target.files[0]
      let reader = new FileReader()
      var formData = new FormData()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "bearer " + storage.get()
        }
      };
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function (e) {
        file.url = reader.result
        formData.append('file',file)
        axios.post("http://liveapi.canpoint.net/api/upload_file",formData,config).then((response)=>{
        if(response.error){
          _this.$Message.error(response.data.error);
          return;
        }
        if(response.status == 200 && response.data){
          _this.videoArr[i].value2 = response.data.data.value
        }
      })
      }
    },
    handleView (item) {
      if(this.$parent.isUpdata){
        this.imgName = item
      }else{
        this.imgName = this.uploadList.url;
      }
      this.visible = true;
    },
    handleRemove (file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件' + file.name + '格式不正确，请选择jpg或png。'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过档案大小限制',
        desc: '文件 ' + file.name + '太大了，不超过2M。'
      });
    },
    handleBeforeUpload (file) {
      const check = this.uploadList.length;
      if (check >=3) {
        this.$Message.error('最多只能上传3张图片');
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
    close() {
      this.$parent.isBookMessage = false;
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$parent.isUpdata){
            // var d = new Date(this.form.start_date);
            // var b = new Date(this.form.end_date);
            // var formData = new FormData();
            // formData.append('id', this.form.id);
            // formData.append('type', this.form.type);
            // formData.append('grade',this.form.grade);
            // formData.append('subject',this.form.subject);
            // formData.append('course_name',this.form.course_name);
            // formData.append('product_content',this.form.product_content);
            // formData.append('activity_price',this.form.activity_price);
            // formData.append('sale_price',this.form.sale_price);
            // if(this.form.type == 1){
            //   formData.append('start_date',d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
            //   formData.append('end_date',b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate());
            //   formData.append('course_list',JSON.stringify(this.timeArr));
            //   formData.append('class_type',this.form.class_type);
            //   formData.append('image_1',this.uploadList[0]?this.uploadList[0]:"");
            //   formData.append('image_2',this.uploadList[1]?this.uploadList[1]:"");
            //   formData.append('image_3',this.uploadList[2]?this.uploadList[2]:"");
            // }else{
            //   formData.append('class_hour',this.form.class_hour);
            //   formData.append('update_state',this.form.update_state?this.form.update_state:"");
            //   formData.append('course_list',JSON.stringify(this.videoArr));
            // }
            // let config = {
            //   headers: {
            //     'Content-Type': 'multipart/form-data',
            //     Authorization: "bearer " + storage.get()
            //   }
            // };
            // axios.post("http://liveapi.canpoint.net/api/update_products" , formData,config)
            // .then((response) => {
            //   if(response.data.code == 100001 && response.data.error){
            //     this.$Message.error(response.data.error);
            //   }
            //   if(response.data.code==200 && response.data.ret == true){
            //     this.$Message.success("修改成功");
            //     this.getCurrList()
            //     this.$parent.isCurrMessage = false
            //   }
            // })
          }else{
            var formData = new FormData();
            formData.append('grade',this.form.grade);
            formData.append('subject',this.form.subject);
            formData.append('course_name',this.form.course_name);
            formData.append('activity_price',this.form.activity_price); 
            formData.append('sale_price',this.form.sale_price);
            if(this.form.type == 1){
              if(this.form.type == 1 && this.uploadList.length == 0){
              this.$Message.warning('请选择要上传的图片')
              return
            }
              formData.append('start_date',d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
              formData.append('end_date',b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate());
              formData.append('course_list',JSON.stringify(this.timeArr));
              formData.append('class_type',this.form.class_type);
              formData.append('image_1',this.uploadList[0]?this.uploadList[0]:"");
              formData.append('image_2',this.uploadList[1]?this.uploadList[1]:"");
              formData.append('image_3',this.uploadList[2]?this.uploadList[2]:"");
            }else{
              formData.append('class_hour',this.form.class_hour);
              formData.append('update_state',this.form.update_state?this.form.update_state:"");
              formData.append('course_list',JSON.stringify(this.videoArr));
            }
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post("http://liveapi.canpoint.net/api/store_book",formData,config)
            .then((response) => {
              if(response.data.code == 100001 && response.data.error){
                this.$Message.error(response.data.error);
              }
              if(response.data.code==200 && response.data.ret == true){
                this.$Message.success("新增成功");
                this.getCurrList()
                this.$parent.isCurrMessage = false
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
    this.$refs.wangditor.text = ""
    if(this.$parent.isUpdata){
      this.form =  this.item
      this.timeArr = this.item.lesson_list?this.item.lesson_list :[]
      this.videoArr = this.item.lesson_list?this.item.lesson_list :[]
    }else{
      this.uploadList.length = 0
    }
  }
};
</script>

<style scoped>
.recommendThree{
    margin: 0 30px;
}
.recommend>.recommendTow{
    margin: 0 30px;
}
.recommend>.recommendOne{
    margin:0 30px;
}
.recommend{
width: 1040px;
height: 300px;
border: 1px solid;
display: flex;
flex-direction: column;
}
.catalog ul li:hover >i{
  display: block;
}
.video-icon{
  font-size: 20px;
  position: absolute;
  right: 10px;
  display: none;
}
.classurl{
  width: 168px;
  margin: 10px 0;
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
.catalog ul li span.filevideo{
  position: relative;
  margin: 0 10px;
  height: 30px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
}
.catalog ul li span.filetitle{
  margin: 0 10px;
}
.catalog ul li span.filename{
  width: 200px;
  color: #aaa5a5;
  padding: 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.catalog ul li{
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:5px;
  position: relative;
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
.cardTime:hover i{
  display: block;
}
.cardTime i{
  font-style: normal;
  font-size: 20px;
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
}
.boxTime{
  display: flex;
  flex-wrap: wrap;
}
.cardTime{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  width: 250px;
  height: 150px;
  flex-direction: column;
  cursor: pointer;
  position: relative;
}
.ivu-picker-panel-body.ivu-picker-panel-body-date{
  position: relative;
  z-index: 9999;
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
.ivu-form.ivu-form-label-right{
  height: 500px!important;
  overflow-y: auto!important;
}
.ivu-card.ivu-card-bordered {
  width: 1200px;
  height: 600px;
}
</style>