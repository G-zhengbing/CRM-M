<template>
  <div class="newLecturer">
    <Button type="primary" @click="modal10 = true">添加讲师</Button>
    <Modal title="添加/编辑教师" width="70" v-model="modal10" class-name="vertical-center-modal-1">
      <div class="content">
        <div class="baseMessage">
          <h4 style="margin-bottom: 10px">教师基本信息</h4>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Row>
              <Col span="10">
                <FormItem label="教师姓名" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="性别" prop="city">
                  <Select v-model="formValidate.city" placeholder="请选择">
                    <Option value="beijing">男</Option>
                    <Option value="shanghai">女</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="联系方式" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="教授科目" prop="city">
                  <Select v-model="formValidate.city" placeholder="请选择">
                    <Option value="beijing">男</Option>
                    <Option value="shanghai">女</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="教授年级" prop="city">
                  <Select v-model="formValidate.city" placeholder="请选择">
                    <Option value="beijing">男</Option>
                    <Option value="shanghai">女</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="老师头像" prop="city">
                  <ImageUp />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div class="disparkTime">
          <h4>开放时间信息</h4>
					<TimeTable style="margin: 20px 0 0 30px;" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import ImageUp from "./imageUpload";
import TimeTable from "./timeTable";
export default {
  components: {
		ImageUp,
		TimeTable
  },
  data() {
    return {
      modal10: false,
      formValidate: {
        name: "",
        city: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
/* 设置高度 */
.content {
  height: 600px;
  overflow: auto;
}
</style>
<style>
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>