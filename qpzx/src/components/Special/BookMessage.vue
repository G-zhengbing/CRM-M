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
              <FormItem label="介绍展示" v-if="form.book_banner">
                <div class="demo-upload-list">
                  <img :src="'http://liveapi.canpoint.net/'+form.book_banner">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/'+form.book_banner)"></Icon>
                  </div>
                </div>
                <Modal title="查看" v-model="visible">
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
                  action="http://liveapi.canpoint.net/api/store_book" 
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <p>只能上传jpg/png格式文件，文件不能超过2M 图片尺寸：73 * 73 像素</p>
              </FormItem>
            </Col>
            </template>
            <Col span="24">
              <FormItem label="推广地址" prop="location_url">
                <Input v-model="form.location_url" placeholder="请输入推广地址"></Input>
              </FormItem>
            </Col>
            <template>
            <Col span="24">
              <FormItem label="课节目录" prop="lesson_list" class="active_span">
                <span class="active_red">*</span>
                 <div class="catalog">
                  <p @click="addLessons">+添加课节</p>
                  <ul>
                    <li v-for="(item,i) in videoArr" :key="i">
                      <span class="filetitle">第{{i+1}}节</span><Input style="width:300px;flex:1;" v-model="item.file_name" placeholder="请输入该课程标题"></Input> <input v-model="item.file_url" type="hidden"><span class="filevideo">选择上传视频文件<input type="file" ref="file" @change="uploadMp4($event,i)"></span><span class="filename">{{item.file_url}}</span> <i class="video-icon" @click="removeVideo(i)"><Icon type="ios-trash-outline" /></i>
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
                        <Row>
                          <Col span="24" style="margin-left:25px;">
                            <FormItem prop="status" class="label-left active_span">
                            <span class="active_red active_red_a">*</span>
                            <RadioGroup v-model="form.location1_position_type">
                              <Radio :label="1">有赞课程链接</Radio>
                              <Radio :label="2">直播课录播课</Radio>
                            </RadioGroup>
                          </FormItem>
                          </Col>
                          <Col span="24">
                            <FormItem prop="location1_url" v-show="form.location1_position_type == 1">
                              <Input v-model="form.location1_url" placeholder="有赞课程链接"></Input>
                            </FormItem>
                          </Col>
                          <Col span="12" v-show="form.location1_position_type == 2">
                            <FormItem>
                              <Select v-model="form.location1_type" placeholder="请选择" @on-change="getSelClass">
                                <Option :value="1">直播课</Option> 
                                <Option :value="2">录播课</Option> 
                              </Select>
                            </FormItem>
                          </Col>
                          <Col span="12" v-show="form.location1_position_type == 2">
                            <FormItem prop="location1_product_id">
                              <Select v-model="form.location1_product_id" placeholder="请选择">
                                <Option :value="item.id" v-for="(item,i) in classList" :key="i">{{item.course_name}}</Option>
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>
                        <FormItem prop="location_pic1" class="active_span">
                          <template>
                          <div class="demo-upload-list" v-for="item in tuione">
                              <img :src="item.url">
                              <div class="demo-upload-list-cover">
                              <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
                              </div>
                          </div>
                          </template>
                          <Upload ref="upload" :show-upload-list="false" 
                          :format="['jpg','gif','png']"
                          :max-size="2048" 
                          :before-upload="handleBeforeUpload2" 
                          :on-format-error="handleFormatError2" 
                          :on-exceeded-size="handleMaxSize2" 
                          type="drag" 
                          action="http://liveapi.canpoint.net/api/store_book" 
                          style="display: inline-block;width:58px;">
                          <div style="width: 58px;height:58px;line-height: 58px;">
                              <Icon type="ios-camera" size="20"></Icon>
                          </div>
                          </Upload>
                        </FormItem>
                        <span>推荐图1展示</span>
                        <FormItem v-if="form.location_pic1">
                          <div class="demo-upload-list">
                            <img :src="'http://liveapi.canpoint.net/'+form.location_pic1">
                            <div class="demo-upload-list-cover">
                              <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/'+form.location_pic1)"></Icon>
                            </div>
                          </div>
                          <Modal title="查看" v-model="visible">
                            <img :src="imgName" style="width: 100%">
                          </Modal>
                        </FormItem>
                        </div>
                    </div>
                    <div class="recommend">
                      <div class="recommendTow">
                            <span>推荐位2</span>
                            <Row>
                              <Col span="24" style="margin-left:25px;">
                                <FormItem prop="status" class="label-left active_span">
                                <span class="active_red active_red_a">*</span>
                                <RadioGroup v-model="form.location2_position_type">
                                  <Radio :label="1">有赞课程链接</Radio>
                                  <Radio :label="2">直播课录播课</Radio>
                                </RadioGroup>
                              </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem prop="location2_url" v-show="form.location2_position_type == 1">
                                  <Input v-model="form.location2_url" placeholder="有赞课程链接"></Input>
                                </FormItem>
                              </Col>
                              <Col span="12" v-show="form.location2_position_type == 2">
                                <FormItem>
                                  <Select v-model="form.location2_type" placeholder="请选择"  @on-change="getSelClass2">
                                    <Option :value="1">直播课</Option> 
                                    <Option :value="2">录播课</Option> 
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="12" v-show="form.location2_position_type == 2">
                                <FormItem prop="location2_product_id">
                                  <Select v-model="form.location2_product_id" placeholder="请选择">
                                    <Option :value="item.id" v-for="(item,i) in classList2" :key="i">{{item.course_name}}</Option> 
                                  </Select>
                                </FormItem>
                              </Col>
                            </Row>
                            <FormItem prop="location_pic2" class="active_span">
                            <template>
                            <div class="demo-upload-list" v-for="item in tuitow">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
                                </div>
                            </div>
                            </template>
                            <Upload ref="upload" :show-upload-list="false" 
                            :format="['jpg','gif','png']"
                            :max-size="2048" 
                            :before-upload="handleBeforeUpload3" 
                            :on-format-error="handleFormatError3" 
                            :on-exceeded-size="handleMaxSize3" 
                            type="drag" 
                            action="http://liveapi.canpoint.net/api/store_book" 
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                            </Upload>
                            </FormItem>
                            <span>推荐图2展示</span>
                            <FormItem v-if="form.location_pic2">
                          <div class="demo-upload-list">
                            <img :src="'http://liveapi.canpoint.net/'+form.location_pic2">
                            <div class="demo-upload-list-cover">
                              <Icon type="ios-eye-outline" @click.native="handleView('http://liveapi.canpoint.net/'+form.location_pic2)"></Icon>
                            </div>
                          </div>
                          <Modal title="查看" v-model="visible">
                            <img :src="imgName" style="width: 100%">
                          </Modal>
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
      active1:1,
      active2:1,
      classList:[],
      classList2:[],
      bookUId:0,
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
      tuione:[],
      tuitow:[],
      form: {
        location1_position_type:1,
        location2_position_type:1
      },
      ruleValidate: {
        grade: [
          { required: true, message: '年级不能为空'}
        ],
        book_name: [
          { required: true, message: '书籍名称不能为空', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '科目不能为空'}
        ]
        ,
        location_url: [
          { required: true, message: '推广地址是必填的'}
        ]
      }
    };
  },
  methods: {
    ...mapActions(["getBookList","getClassList"]),
    setActive1(){
    },
    //课列表1
    getSelClass(val){
      this.getClassList(val).then(res=>{
        this.classList = res.data.data
      })
    },
    //课列表2
    getSelClass2(val){
      this.getClassList(val).then(res=>{
        this.classList2 = res.data.data
      })
    },
    //推荐2
    handleRemove3(file){
      this.tuitow.splice(this.tuitow.indexOf(file), 1)
    },
    handleBeforeUpload3(file){
      const check = this.tuitow.length;
      if (check >=3) {
        this.$Message.error('最多只能上传3张图片');
        return;
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function (e) {
        file.url = reader.result
        _this.tuitow.push(file)
      }
    },
    handleFormatError3(file){
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件' + file.name + '格式不正确，请选择jpg或png。'
      });
    },
    handleMaxSize3(file){
      this.$Notice.warning({
        title: '超过档案大小限制',
        desc: '文件 ' + file.name + '太大了，不超过2M。'
      });
    },
    //推荐1
    handleRemove2(file){
      this.tuione.splice(this.tuione.indexOf(file), 1)
    },
    handleBeforeUpload2(file){
      const check = this.tuione.length;
      if (check >=3) {
        this.$Message.error('最多只能上传3张图片');
        return;
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function (e) {
        file.url = reader.result
        _this.tuione.push(file)
      }
    },
    handleFormatError2(file){
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件' + file.name + '格式不正确，请选择jpg或png。'
      });
    },
    handleMaxSize2(file){
      this.$Notice.warning({
        title: '超过档案大小限制',
        desc: '文件 ' + file.name + '太大了，不超过2M。'
      });
    },
    // 
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
      this.videoArr.push({file_name:"",file_url:""})
    },
    deleTime(num){
      this.timeArr.splice(num,1)
    },
    addGradeTime(){
      this.timeArr.push({file_name:"",file_url:''})
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
        formData.append('file_url',file)
        axios.post("http://liveapi.canpoint.net/api/book_fileload",formData,config).then((response)=>{
        if(response.data.error){
          _this.$Message.error(response.data.error);
          return;
        }
        if(response.status == 200 && response.data){
          _this.videoArr[i].file_url = response.data.data.upload_url
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
            var formData = new FormData();
            formData.append('grade',this.form.grade);
            formData.append('subject',this.form.subject);
            formData.append('book_name',this.form.book_name);
            formData.append('book_banner',this.uploadList[0]?this.uploadList[0]:"");
            formData.append('location_pic1',this.tuione[0]?this.tuione[0]:"");
            formData.append('location_pic2',this.tuitow[0]?this.tuitow[0]:"");
            formData.append('location_url',this.form.location_url);
            formData.append('location2_position_type',this.form.location2_position_type);
            formData.append('location1_position_type',this.form.location1_position_type);
            formData.append('location1_url',this.form.location1_url);
            formData.append('location2_url',this.form.location2_url);
            formData.append('location1_product_id',this.form.location1_product_id);
            formData.append('location2_product_id',this.form.location2_product_id);
            formData.append('lesson_list',JSON.stringify(this.videoArr));
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "bearer " + storage.get()
              }
            };
            axios.post("http://liveapi.canpoint.net/api/modify_book"+'/'+this.item.id,formData,config)
            .then((response) => {
              if(response.data.code == 100001 && response.data.error){
                this.$Message.error(response.data.error);
              }
              if(response.data.code==200 && response.data.ret == true){
                this.$Message.success("修改成功");
                this.getBookList()
                this.$parent.isBookMessage = false
              }
            })
          }else{
            if(this.uploadList.length == 0){
              this.$Message.warning('请选择要上传的介绍头图图片')
              return
            }
            if(this.tuione.length == 0){
              this.$Message.warning('请选择要上传的推荐图1图片')
              return
            }
             if(this.tuitow.length == 0){
              this.$Message.warning('请选择要上传的推荐图2图片')
              return
            }
            var formData = new FormData();
            formData.append('grade',this.form.grade);
            formData.append('subject',this.form.subject);
            formData.append('book_name',this.form.book_name);
            formData.append('book_banner',this.uploadList[0]?this.uploadList[0]:"");
            formData.append('location_pic1',this.tuione[0]?this.tuione[0]:"");
            formData.append('location_pic2',this.tuitow[0]?this.tuitow[0]:"");
            formData.append('location_url',this.form.location_url);
            formData.append('location2_position_type',this.form.location2_position_type);
            formData.append('location1_position_type',this.form.location1_position_type);
            formData.append('location1_url',this.form.location1_url?this.form.location1_url:"");
            formData.append('location2_url',this.form.location2_url?this.form.location2_url:"");
            formData.append('location1_product_id',this.form.location1_product_id?this.form.location1_product_id:"");
            formData.append('location2_product_id',this.form.location2_product_id?this.form.location2_product_id:"");
            formData.append('lesson_list',JSON.stringify(this.videoArr));
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
                storage.savaBookId(response.data.data.book_id)
                this.$Message.success("新增成功");
                this.getBookList()
                this.$parent.isBookMessage = false
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
      this.getSelClass(this.item.location1_type)
      this.getSelClass2(this.item.location2_type)
      for(var i=0;i<this.item.lesson_list.length;i++){
        for(var k in this.item.lesson_list[i]){
          if(k == "id"){
            delete this.item.lesson_list[i][k];
          }
          if(k == "book_id"){
            delete this.item.lesson_list[i][k];
          }
          if(k == "is_delete"){
            delete this.item.lesson_list[i][k];
          }
        }
      }
      this.timeArr = this.item.lesson_list?this.item.lesson_list :[]
      this.videoArr = this.item.lesson_list?this.item.lesson_list :[]
    }else{
      this.uploadList.length = 0
      this.tuione.length = 0
      this.tuitow.length = 0
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