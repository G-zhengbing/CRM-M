<template>
  <div class="box">
    <Modal
      width="800"
      v-model="type.classify == 'createdCourse'"
      :title="$parent.isUpdate? '编辑课程':'新增课程'"
      @on-ok="createdCourse"
      @on-cancel="$parent.show = false"
    >
      <Form
        :model="createdcourseForm"
        :rules="ruleValidate"
        :label-width="80"
        style="height:500px;overflow-y:auto;"
      >
        <FormItem label="授课类型" prop="gender">
          <RadioGroup v-model="createdcourseForm.gender">
            <Radio :label="1">班课</Radio>
            <Radio :label="2">一对一</Radio>
            <Radio :label="3">试听课</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="课程类型" prop="gender">
          <RadioGroup v-model="createdcourseForm.gender">
            <Radio :label="1">标准课</Radio>
            <Radio :label="2">公开课</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="课程名称" prop="name">
          <Input v-model="createdcourseForm.name" placeholder="请输入课程名称"></Input>
        </FormItem>
        <FormItem label="年级" prop="city">
          <Select v-model="createdcourseForm.city" placeholder="请选择">
            <Option :value="1">一年级</Option>
            <Option :value="2">二年级</Option>
            <Option :value="3">三年纪</Option>
            <Option :value="4">四年纪</Option>
            <Option :value="5">五年纪</Option>
            <Option :value="6">六年纪</Option>
            <Option :value="7">七年级</Option>
            <Option :value="8">八年级</Option>
            <Option :value="9">九年级</Option>
            <Option :value="10">高一</Option>
            <Option :value="11">高二</Option>
            <Option :value="12">高三</Option>
          </Select>
        </FormItem>
        <FormItem label="科目" prop="city">
          <Select v-model="createdcourseForm.city" placeholder="请选择">
            <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
          </Select>
        </FormItem>
        <FormItem label="测评图片展示" v-if="this.createdcourseForm.assess_image">
          <div class="demo-upload-list">
            <img :src="'http://liveapi.canpoint.net/'+ createdcourseForm.assess_image" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleView('http://liveapi.canpoint.net/'+createdcourseForm.assess_image)"
              ></Icon>
            </div>
          </div>
          <Modal title="预览图" v-model="visible">
            <img :src="imgName" style="width: 100%" />
          </Modal>
        </FormItem>
        <FormItem label="测评上传" prop="avatar" class="active_span">
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
        <FormItem label="课程简介" prop="desc">
          <Input
            v-model="createdcourseForm.desc"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 5}"
            placeholder="请输入课程简介"
          ></Input>
        </FormItem>
        <FormItem label="班主任" prop="city">
          <Select v-model="createdcourseForm.city" placeholder="请选择">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="课程有效期">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="请选择" v-model="createdcourseForm.date"></DatePicker>
          </FormItem>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="$parent.show = false">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import storage from "../../../uilt/storage";
export default {
  props: ["type"],
  data() {
    return {
      imgName: "",
      uploadList: [],
      disableBtn: false,
      subject: storage.getDaiban().subject,
      createdcourseForm: {},
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
    //创建课程
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //创建课程
    createdCourse() {}
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