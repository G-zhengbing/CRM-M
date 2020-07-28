<template>
  <div class="shade">
    <Card>
      <p slot="title" v-if="$parent.isUpdata">编辑课程</p>
      <p slot="title" v-else>新建课程</p>
      <p slot="extra" class="extra" @click="close">×</p>
      <p class="contanner">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
          <Row>
            <Col span="11">
              <FormItem label="课程类型" prop="type">
                <Select v-model="form.type" placeholder="请选择" @on-change="getSelected" :disabled="$parent.isUpdata">
                  <Option :value="1">直播</Option> 
                  <Option :value="2">微课</Option> 
                  <Option :value="3">一书一码</Option> 
                  <Option :value="4">一对一</Option> 
                </Select>
              </FormItem>
            </Col>
            <Col span="11">
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
            <Col span="11">
              <FormItem label="课程名称" prop="course_name">
                <Input v-model="form.course_name" placeholder="请输入副标题"></Input>
              </FormItem>
            </Col>
            <Col span="11">
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
            <Col span="11"  v-if="form.type == 1">
              <FormItem label="教师" prop="lecturer">
                <Select v-model="form.lecturer" placeholder="请选择">
                  <Option :value="list.id" v-for="(list,i) in currculumTeachs" :key="i">{{list.name}}</Option>
                </Select>
              </FormItem>
            </Col>
             <Col span="11"  v-if="form.type == 1">
              <FormItem label="班主任" prop="header_id">
                <Select v-model="form.header_id" placeholder="请选择">
                  <Option :value="list.id" v-for="(list,i) in header_list" :key="i">{{list.login_name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="10">
            <FormItem label="是否寄送教材" prop="is_address">
              <RadioGroup v-model="form.is_address">
                <Radio :label="1">
                  是
                </Radio>
                <Radio :label="2">
                  否
                </Radio>
              </RadioGroup>
            </FormItem>
            </Col>
            <template  v-if="form.type == 1">
            <Col span="24">
              <FormItem label="班级分类" prop="class_type">
                <RadioGroup v-model="form.class_type">
                  <Radio :label="1">春季班</Radio>
                  <Radio :label="2">秋季班</Radio>
                  <Radio :label="3">寒假班</Radio>
                  <Radio :label="4">暑假班</Radio>
                  <Radio :label="5">冲刺班</Radio>
                  <Radio :label="6">专项班</Radio>
                  <Radio :label="7">会员班</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="轮播图片展示" v-if="form.iamge_1 || form.iamge_2 || form.iamge_3">
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
            </Col>
            <Col span="24">
              <FormItem label="轮播图片" prop="image_1" class="active_span">
                <span class="required"></span>
                <template>
                  <div class="demo-upload-list" v-for="(item,i) in uploadList"  :key="i">
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
                <p>只能上传jpg/png格式文件，文件不能超过2M，图片尺寸：180px * 180px</p>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="课程周期" prop="start_date">
                <DatePicker v-model="form.start_date" @on-change="getStart" type="date" placeholder="选择该课程开始时间" style="width: 200px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem prop="end_date">
                <DatePicker  v-model="form.end_date" @on-change="getEnd" type="date" placeholder="选择该课程结束时间" style="width: 200px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="24" >
              <FormItem prop="course_list" label="开课日期"  class="active_span">
                <span class="required"></span>
                <div class="boxTime">
                   <div class="cardTime" v-for="(item,i) in timeArr" :key="i">
                    <i @click="deleTime(i)"><Icon type="ios-trash-outline" /></i>
                    <h5>第{{i+1}}节课</h5>
                    <DatePicker v-model="item.value" @on-change="item.value=$event" type="date" placeholder="课节日期" style="width: 168px;margin-bottom:10px;"></DatePicker>
                    <TimePicker v-model="item.value2" format="HH:mm" type="timerange" placeholder="课节时间" style="width: 168px"></TimePicker>
                    <Input class="classurl" v-model="item.value3" placeholder="请输入课程链接"></Input>
                  </div>
                   <div  class="cardTime" @click="addGradeTime">
                  <span style="color:#6699ff;" >+添加开课时间</span>
                </div>
                </div>
              </FormItem>
            </Col>
            </template>
            <template v-else>
              <Col span="24">
              <FormItem label="课节总数" prop="class_hour" style="width:436px;">
                <Input v-model="form.class_hour" placeholder="请输入课节总数"></Input>
              </FormItem>
              </Col>
               <Col span="24">
              <FormItem label="当前状态" prop="update_state">
                <Select v-model="form.update_state" placeholder="请选择" @on-change="getSelected" style="width:436px">
                  <Option :value="1">更新中</Option>
                  <Option :value="2">已完结</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="课节目录" prop="course_list" class="active_span">
                <span class="required"></span>
                 <div class="catalog">
                  <p @click="addLessons">+添加课节</p>
                  <ul>
                    <li v-for="(item,i) in videoArr" :key="i">
                      <div class="oneLine">
                        <span class="filetitle">第{{i+1}}节</span>
                          <Input style="width:300px;flex:1;" v-model="item.value" placeholder="请输入该课程标题"></Input>
                          <Input placeholder="请输入视频地址ID" style="width:400px;" v-model="item.value2" type="text"/>
                          <div class="upImg" >
                            <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleBeforeUpload1" :show-upload-list="false">
                              <Tooltip :content="item.video_image ? '已上传' : '未上传'" placement="top">
                                <Button icon="ios-cloud-upload-outline" @click="upImages(i)">上传图片</Button>
                              </Tooltip>
                            </Upload>
                          </div>
                      </div>
                      <div class="twoLine">
                        <Input style="width:300px;flex:1;margin-right:10px" v-model="item.video_desc" placeholder="课程简介" maxlength="35" show-word-limit></Input>
                        <i style="position: static;display: block;padding-right:10px;" class="video-icon" @click="removeVideo(i)"><Icon type="ios-trash-outline" /></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </FormItem>
            </Col>
            </template>
          </Row>
           <FormItem label="课程详情" prop="product_content">
				    <Wangeditor v-model="form.product_content"  :catchData="catchData" ref="wangditor"/>
          </FormItem>
        <FormItem label="售价" prop="sale_price">
          <Input v-model="form.sale_price" placeholder="请输入售价"></Input>
        </FormItem>
        <FormItem label="活动价" prop="activity_price">
          <Input v-model="form.activity_price" placeholder="请输入该课程优惠价格"></Input>
        </FormItem>
        <FormItem>
          <Button :loading="isSend" type="primary" @click="handleSubmit('form')">确定</Button>
          <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
      </p>
    </Card>
  </div>
</template>

<script>
import Wangeditor from '../../../uilt/wangeditor/Wangeditor'
import storage from '../../../uilt/storage'
import { UPLOADIMAGE } from '../../../uilt/url/Murl'
import { UPDATEPRODUCTS, CREATEPRODUCTS } from '../../../uilt/url/url'
import { createNamespacedHelpers } from 'vuex'
const  { mapState,mapActions } = createNamespacedHelpers('curriculum')
import axios from 'axios'
export default {
  props:["item"],
	components:{
		Wangeditor
  },
  computed:{  
    ...mapState(['currculumTeachs'])
  },
  data() {
    return {
      isSend:false,
      header_list: storage.getDaiban().header_list,
      // 用来控制上传哪个图片
      imageIndex: "",
      videoIndex:0,
      videoArr:[],
      index:0,
      timeArr:[],
      isVideo:false,
      uploadMp4List:[],
      endTime:"",
      startTime:"",
      end:"",
      start:"",
      file:[],
      imgUrl:"",
      imgName: '',
      visible: false,
      uploadList: [],
      form: {
        type:'1'
      },
      ruleValidate: {
        type: [
          { required: true, message: '课程类型不能为空'}
        ],
        grade: [
          { required: true, message: '年级不能为空'}
        ],
        course_name: [
          { required: true, message: '课程名称不能为空', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '科目不能为空'}
        ],
        class_hour: [
          { required: true, message: '课节数不能为空' }
        ],
        class_type:[
          { required: true, message: '班级分类是必选的' }
        ],
        sale_price: [
          { required: true, message: '售价不能为空', trigger: 'blur' }
        ],
        update_state:[
          { required: true, message: '当前状态是必选的' }
        ],
        product_content:[{ required: true, message: '课程详情是必填的'}],
        start_date:[{ required: true, message: '课程周期是必填的'}],
        is_address:[
          { required: true, message: '是否寄送教材是必选的' }
        ],
        lecturer:[
          { required: true, message: '教师是必选的' }
        ],
        header_id:[
          { required: true, message: '班主任是必选的' }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["addCurrList","updataCurrList","getCurrList","getCurrculumTeachs"]),
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
      this.videoArr.push({value:"",value2:"",index:this.videoIndex,video_image:""})
    },
    deleTime(num){
      this.timeArr.splice(num,1)
    },
    addGradeTime(){
      this.index++
      this.timeArr.push({value:"",value2:'',index:this.index,value3:''})
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
      // let file = e.target.files[0]
      // let reader = new FileReader()
      // var formData = new FormData()
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: "bearer " + storage.get()
      //   }
      // };
      // reader.readAsDataURL(file)
      // const _this = this
      // this.$parent.loading(true)
      // reader.onloadend = function (e) {
      //   file.url = reader.result
      //   formData.append('file',file)
      //   axios.post("http://liveapi.canpoint.net/api/upload_file",formData,config).then((response)=>{
      //   if(response.error){
      //     _this.$Message.error(response.data.error);
      //     return;
      //   }
      //   if(response.status == 200 && response.data){
      //     _this.videoArr[i].value2 = response.data.data.video_id
      //     _this.videoArr[i].value3 = file.name
      //   }
      //   _this.$parent.loading(false)
      // })
      // }
    },
    //课程结束日期
    getEnd(date){
      this.end = date
    },
    //课程开始日期
    getStart(date){
      this.start = date
    },
		catchData(val){
      this.form.product_content = val
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
    upImages(index){
      this.imageIndex = index
    },
    handleBeforeUpload1 (file,i) {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "bearer " + storage.get()
        }
      };
      var formData = new FormData()
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = (e) => {
        // 这是，图片地址，发送给后端
        formData.append('file',file);
        axios.post(UPLOADIMAGE,formData,config).then((response)=>{
        if(response.error){
          _this.$Message.error(response.data.error);
          return;
        }
        if(response.status == 200 && response.data){
          this.videoArr[this.imageIndex].video_image = `http://liveapi.canpoint.net${response.data.data.value}`
        }
      })
      }
    },
    close() {
      this.$parent.isCurrMessage = false;
    },
    handleSubmit (name) {
      this.isSend = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$parent.isUpdata){
            var d = new Date(this.form.start_date);
            var b = new Date(this.form.end_date);
            var formData = new FormData();
            formData.append('id', this.form.id);
            formData.append('type', this.form.type);
            formData.append('grade',this.form.grade);
            formData.append('subject',this.form.subject);
            formData.append('course_name',this.form.course_name);
            formData.append('product_content',this.form.product_content);
            formData.append('activity_price',this.form.activity_price?this.form.activity_price:"");
            formData.append('sale_price',this.form.sale_price);
            formData.append('is_address',this.form.is_address);
            // formData.append('show_type',this.form.show_type);
            if(this.form.type == 1){
              formData.append('start_date',d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
              formData.append('end_date',b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate());
              formData.append('course_list',JSON.stringify(this.timeArr));
              formData.append('class_type',this.form.class_type);
              formData.append('lecturer',this.form.lecturer);
              formData.append('header_id',this.form.header_id);
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
            axios.post(UPDATEPRODUCTS, formData,config)
            .then((response) => {
              if(response.data.ret == false && response.data.error){
                this.$Message.error(response.data.error);
              }
              if(response.data.code==200 && response.data.ret == true){
                this.$Message.success("修改成功");
                this.getCurrList({form:this.$parent.form,page:this.$parent.currentPage})
                this.$parent.isCurrMessage = false
              }
              this.isSend = false
            })
          }else{
            if(!this.form.product_content){
              this.$Message.warning('请填写专题内容')
              return
            }
            var d = new Date(this.form.start_date);
            var b = new Date(this.form.end_date);
            var formData = new FormData();
            formData.append('type', this.form.type);
            formData.append('grade',this.form.grade);
            formData.append('subject',this.form.subject);
            formData.append('course_name',this.form.course_name);
            formData.append('product_content',this.form.product_content);
            formData.append('activity_price',this.form.activity_price?this.form.activity_price:"");
            formData.append('sale_price',this.form.sale_price);
            formData.append('is_address',this.form.is_address);
            // formData.append('show_type',this.form.show_type);
            if(this.form.type == 1){
              if(this.form.type == 1 && this.uploadList.length == 0){
                this.$Message.warning('请选择要上传的图片')
                return
              }
              for(var i=0;i<this.timeArr.length;i++){
                if(this.timeArr[i].value == ''){
                  this.$Message.error(`第${i+1}节课节日期是必选的`);
                  return
                }else if(this.timeArr[i].value2[0] == '' ||this.timeArr[i].value2[1] == ''){
                  this.$Message.error(`第${i+1}节课节时间是必选的`);
                  return
                }else if(this.timeArr[i].value3 == ''){
                  this.$Message.error(`第${i+1}节课节链接是必填的`);
                  return
                }
              }
              formData.append('start_date',d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
              formData.append('end_date',b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate());
              formData.append('course_list',JSON.stringify(this.timeArr));
              formData.append('class_type',this.form.class_type);
              formData.append('image_1',this.uploadList[0]?this.uploadList[0]:"");
              formData.append('image_2',this.uploadList[1]?this.uploadList[1]:"");
              formData.append('image_3',this.uploadList[2]?this.uploadList[2]:"");
              formData.append('lecturer',this.form.lecturer);
              formData.append('header_id',this.form.header_id);
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
            axios.post(CREATEPRODUCTS,formData,config)
            .then((response) => {
              if(response.data.code == 100001 && response.data.error){
                this.$Message.error(response.data.error);
              }
              if(response.data.code==200 && response.data.ret == true){
                this.$Message.success("新增成功");
                this.getCurrList({form:this.$parent.form,page:this.$parent.currentPage})
                this.$parent.isCurrMessage = false
              }
              this.isSend = false
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
    this.getCurrculumTeachs()
    this.$refs.wangditor.text = ""
    if(this.$parent.isUpdata){
      this.form =  this.item
      this.$refs.wangditor.text = this.item.product_content
      this.timeArr = this.item.course_list?this.item.course_list :[]
      this.videoArr = this.item.course_list?this.item.course_list :[]
    }else{
      this.uploadList.length = 0
    }
  }
};
</script>

<style scoped>
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
.oneLine {
  display: flex;
  margin-top: 5px;
}
.twoLine {
  display: flex;
  padding-left: 55px;
  box-sizing: border-box;
  margin-bottom: 5px;
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
#wangeditor{
  position: relative;
  z-index: 99;
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