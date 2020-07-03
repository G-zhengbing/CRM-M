<template>
  <div class="newCourse">
    <Button class="btns" type="primary" @click="modal10 = true">新建课程</Button>
    <Modal
      title="新建/编辑课程"
      width="50"
      v-model="modal10"
      class-name="vertical-center-modal-1"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <div class="baseMessage">
          <h4>课程基础信息</h4>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Row>
              <Col span="12">
                <FormItem label="课程名称" prop="className">
                  <Input v-model="formValidate.className" placeholder="请输入"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="课程类型" prop="classType">
                  <Select v-model="formValidate.classType" placeholder="-请选择课程类型-">
                    <Option value="beijing">班课</Option>
                    <Option value="shanghai">一对一</Option>
                    <Option value="shenzhen">试听课</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label=" 适用科目" prop="subject">
                  <Select v-model="formValidate.subject" placeholder="-请选择适用科目-">
                    <Option value="beijing">语文</Option>
                    <Option value="shanghai">数学</Option>
                    <Option value="shenzhen">英语</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div class="chargeMode">
          <h4>收费模式</h4>
          <Row>
            <Col span="16">
              <Row style="margin: 10px 0;">
                <Col span="5" style="text-align: right;">按课时收费：</Col>
                <Col span="19">
                  <i-Switch v-model="switch1" @on-change="btnState1" />
                  <span class="hint">适合按课时包售卖的课程</span>
                </Col>
              </Row>
              <Row style="margin: 10px 0;">
                <Col span="5" style="text-align: right;">定价标准：</Col>
                <Col span="19">
                  <table class="table" cellspacing="0">
                    <tr>
                      <th style="width:120px">数量（课时）</th>
                      <th style="width:120px">总价（元）</th>
                      <th style="width:120px">操作</th>
                    </tr>
                    <tr v-for="(item,index) in hourList" :key="index">
                      <th>
                        <input
                          :disabled="!switch1"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          v-model="item.hour"
                        />
                      </th>
                      <th>
                        <input
                          :disabled="!switch1"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          v-model="item.totalPrices"
                        />
                      </th>
                      <th>
                        <Icon class="circle" type="md-remove" @click="deduction1(index)" />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <input
                          :disabled="!switch1"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          placeholder="请输入"
                          v-model="hourData.hour"
                        />
                      </th>
                      <th>
                        <input
                          :disabled="!switch1"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          placeholder="请输入"
                          v-model="hourData.totalPrices"
                        />
                      </th>
                      <th>
                        <Icon class="circle" type="md-remove" @click="empty1" />
                        <Icon class="circle" type="md-add" @click="addHourList" />
                      </th>
                    </tr>
                  </table>
                </Col>
              </Row>
            </Col>
            <Col span="16">
              <Row style="margin: 10px 0;">
                <Col span="5" style="text-align: right;">按时间收费：</Col>
                <Col span="19">
                  <i-Switch v-model="switch2" @on-change="btnState2" />
                  <span class="hint">适合按时间段售卖的课程，如月卡、季卡、半年卡、年卡</span>
                </Col>
              </Row>
              <Row style="margin: 10px 0;">
                <Col span="5" style="text-align: right;">定价标准：</Col>
                <Col span="19">
                  <table class="table" cellspacing="0">
                    <tr>
                      <th style="width:120px">数量</th>
                      <th style="width:120px">时间段</th>
                      <th style="width:120px">总价（元）</th>
                      <th style="width:120px">操作</th>
                    </tr>
                    <tr v-for="(item,index) in timeList">
                      <th>
                        <span>1</span>
                      </th>
                      <th>
                        <Select
                          :disabled="!switch2"
                          class="select"
                          v-model="item.timeQuantum"
                          size="small"
                        >
                          <Option value="month">月</Option>
                          <Option value="season">季</Option>
                          <Option value="year">年</Option>
                        </Select>
                      </th>
                      <th>
                        <input
                          :disabled="!switch2"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          v-model="item.totalPrices"
                        />
                      </th>
                      <th>
                        <Icon class="circle" type="md-remove" @click="deduction2(index)" />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <span>1</span>
                      </th>
                      <th>
                        <Select
                          :disabled="!switch2"
                          class="select"
                          v-model="timeData.timeQuantum"
                          size="small"
                        >
                          <Option value="yue">月</Option>
                          <Option value="season">季</Option>
                          <Option value="year">年</Option>
                        </Select>
                      </th>
                      <th>
                        <input
                          :disabled="!switch2"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          placeholder="请输入"
                          v-model="timeData.totalPrices"
                        />
                      </th>
                      <th>
                        <Icon class="circle" type="md-remove" @click="empty2" />
                        <Icon class="circle" type="md-add" @click="addTimeList" />
                      </th>
                    </tr>
                  </table>
                </Col>
              </Row>
            </Col>
            <Col span="16">
              <Row style="margin: 10px 0;">
                <Col span="5" style="text-align: right;">按期收费：</Col>
                <Col span="19">
                  <i-Switch v-model="switch3" @on-change="btnState3" />
                  <span class="hint">适合按期售卖的课程，如班课：春季班、秋季班、寒假班、暑假班等</span>
                </Col>
              </Row>
              <Row style="margin: 10px 0;">
                <Col span="5" style="text-align: right;">定价标准：</Col>
                <Col span="19">
                  <table class="table" cellspacing="0">
                    <tr>
                      <th style="width:120px">数量（课时）</th>
                      <th style="width:120px">总价（元）</th>
                    </tr>
                    <tr>
                      <th>
                        <input
                          :disabled="!switch3"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          placeholder="请输入"
                          v-model="expect.quantity"
                        />
                      </th>
                      <th>
                        <input
                          :disabled="!switch3"
                          type="text"
                          style="width: 80px;padding-left:5px;"
                          placeholder="请输入"
                          v-model="expect.totalPrices"
                        />
                      </th>
                    </tr>
                  </table>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 页面开关
      modal10: false,
      // 开关
      switch1: true,
      switch2: false,
      switch3: false,
      // 表单信息
      formValidate: {
        className: "",
        classType: "",
        subject: ""
      },
      // 验证
      ruleValidate: {
        className: [{ required: true, message: "请输入", trigger: "change" }],
        classType: [
          {
            required: true,
            message: "请选择课程类型",
            trigger: "blur"
          }
        ],
        subject: [
          {
            required: true,
            message: "请选择适用科目",
            trigger: "blur"
          }
        ]
      },
      // 课时列表
      hourData: {
        hour: "",
        totalPrices: ""
      },
      hourList: [
        { hour: 1, totalPrices: 2000 },
        { hour: 2, totalPrices: 2000 }
      ],
      // 按时间收费
      timeData: {
        timeQuantum: "",
        totalPrices: ""
      },
      timeList: [{ timeQuantum: "month", totalPrices: 30000 }],
      // 按期收费
      expect: {
        quantity: "",
        totalPrices: ""
      }
    };
  },
  methods: {
    // 点击最后时间收费减，清空input
    empty2() {
      this.timeData = {
        timeQuantum: "",
        totalPrices: ""
      };
    },
    addTimeList() {
      if (this.timeData.timeQuantum == "" && this.timeData.totalPrices == "") {
        return;
      }
      this.timeList.push(this.timeData);
      this.timeData = {
        timeQuantum: "",
        totalPrices: ""
      };
    },
    deduction2(index) {
      this.timeList.splice(index, 1);
    },
    // 点击课时减，减去当前项
    deduction1(index) {
      this.hourList.splice(index, 1);
    },
    // 点击课时收费添加
    addHourList() {
      if (this.hourData.hour == "" && this.hourData.totalPrices == "") {
        return;
      }
      this.hourList.push(this.hourData);
      this.hourData = {
        hour: "",
        totalPrices: ""
      };
    },
    // 点击最后课时减，清空input
    empty1() {
      this.hourData = {
        hour: "",
        totalPrices: ""
      };
    },
    // 按钮状态切换，不能共存
    btnState1(val) {
      if (val) {
        this.switch2 = false;
        this.switch3 = false;
      }
    },
    btnState2(val) {
      if (val) {
        this.switch1 = false;
        this.switch3 = false;
      }
    },
    btnState3(val) {
      if (val) {
        this.switch1 = false;
        this.switch2 = false;
      }
    },
    // 点击确认回调，验证表单,不填写不让关
    confirm() {
      this.$refs["formValidate"]
        .validate(valid => {
          if (valid) {
            this.$Message.success("成功!");
          } else {
            this.$Message.error("请填写必选项!");
          }
        })
        .then(val => {
          if (!val) {
            return (this.modal10 = true);
          }
        });
    },
    // 点击取消回调，重置表单
    cancel() {
      this.$refs["formValidate"].resetFields();
    }
  }
};
</script>

<style scoped>
/* 设置按钮样式 */
.btns {
  float: right;
  margin-top: 18px;
  margin-right: 8px;
}
/* 设置高度 */
.content {
  height: 600px;
  overflow: auto;
}
/* table样式 */
.table {
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
}
.table th {
  border: 1px solid #cccccc;
  height: 30px;
  border-bottom: 0;
  border-right: 0;
}
/* input 圆一点 */
.content .chargeMode input {
  border-radius: 2px;
  border: 1px solid #c1c1c1;
}
/* 圆圈 */
.circle {
  border: 1px solid #c1c1c1;
  border-radius: 50%;
  color: #c1c1c1;
}
/* 提示文字 */
.hint {
  font-size: 12px;
  color: #cccccc;
}
/* select样式 */
.select {
  width: 80px;
}
</style>
<style>
/* 页面居中 */
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>