<template>
  <div class="newReport">
    <Button v-if="btn" type="primary" @click="modal10 = true">添加学情报告</Button>
    <span v-else @click="btnSelect" style="cursor: pointer;">查看</span>
    <Modal
      title="填写/查看学情报告"
      v-model="modal10"
      class-name="vertical-center-modal-1"
      @on-ok="confirm"
      @on-cancel="cancel"
    >
      <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem prop="attendance">
            <h4 class="title">课堂出勤情况</h4>
            <div class="select">
              <RadioGroup v-model="formValidate.attendance" vertical>
                <Radio label="1" :disabled="!btn">按时出勤，从不请假、迟到、早退</Radio>
                <Radio label="2" :disabled="!btn">基本按时出勤，偶尔请假，及时看回放，不迟到不早退</Radio>
                <Radio label="3" :disabled="!btn">偶尔出勤，很少看回放，进场迟到、早退</Radio>
                <Radio label="4" :disabled="!btn">从不按时出勤，从不看回放</Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem prop="work_completion_status">
            <h4 class="title">作业完成情况</h4>
            <div class="select">
              <RadioGroup v-model="formValidate.work_completion_status" vertical>
                <Radio label="1" :disabled="!btn">按时提交作业，无论作业难度大小，全部完成</Radio>
                <Radio label="2" :disabled="!btn">部分完成作业，个别难点须老师点拨</Radio>
                <Radio label="3" :disabled="!btn">完成很少部分作业</Radio>
                <Radio label="4" :disabled="!btn">未提交作业</Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem prop="learning_attitude">
            <h4 class="title">课堂表现-学习态度</h4>
            <div class="select">
              <RadioGroup v-model="formValidate.learning_attitude" vertical>
                <Radio label="1" :disabled="!btn">积极与老师互动，回答问题</Radio>
                <Radio label="2" :disabled="!btn">认真听讲</Radio>
                <Radio label="3" :disabled="!btn">听讲但不投入</Radio>
                <Radio label="4" :disabled="!btn">上课走神</Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem prop="learning_ability">
            <h4 class="title">课堂表现-学习能力</h4>
            <div class="select">
              <RadioGroup v-model="formValidate.learning_ability" vertical>
                <Radio label="1" :disabled="!btn">学习能力强，举一反三</Radio>
                <Radio label="2" :disabled="!btn">基本能理解，运用</Radio>
                <Radio label="3" :disabled="!btn">理解能力弱，需反复强调</Radio>
                <Radio label="4" :disabled="!btn">跟不上节奏，须单独辅导</Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem prop="overall_evaluation">
            <h4 class="title">总体评价</h4>
            <div class="select">
              <RadioGroup v-model="formValidate.overall_evaluation">
                <Radio label="1" :disabled="!btn">优秀</Radio>
                <Radio label="2" :disabled="!btn">良好</Radio>
                <Radio label="3" :disabled="!btn">中等</Radio>
                <Radio label="4" :disabled="!btn">薄弱</Radio>
              </RadioGroup>
            </div>
          </FormItem>
          <FormItem prop="desc">
            <h4 class="title">班主任评语</h4>
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 4,maxRows: 5}"
              placeholder="此处为班主任评语内容"
              style="margin-top: 5px;"
              :disabled="!btn"
            ></Input>
          </FormItem>
          <FormItem>
            <Row v-for="(item,index) in templateData" :key="index">
              <Col span="17">
                <span>{{item.title}}</span>
              </Col>
              <Col span="7" style="text-align: right;">
                <Button @click="examine(index)">查看</Button>
                <Button @click="copy" class="copyBtn" :data-clipboard-text="item.content">复制</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { LEARNINGREPORTINFO, CREATELEARNINGREPORT } from "@/uilt/url/url";
import qs from "qs";

import Clipboard from "clipboard";
export default {
  props: {
    userIndex: {
      type: Number,
      required: false
    },
    btn: {
      type: Boolean,
      required: false
    },
    userId: {
      type: Number,
      required: false
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.learningReport.dataList
    })
  },
  data() {
    return {
      modal10: false,
      formValidate: {
        attendance: "",
        work_completion_status: "",
        learning_attitude: "",
        learning_ability: "",
        overall_evaluation: "",
        desc: ""
      },
      ruleValidate: {
        attendance: [
          { required: true, message: "请认真选择!", trigger: "change" }
        ],
        work_completion_status: [
          { required: true, message: "请认真选择!", trigger: "change" }
        ],
        learning_attitude: [
          { required: true, message: "请认真选择!", trigger: "change" }
        ],
        learning_ability: [
          { required: true, message: "请认真选择!", trigger: "change" }
        ],
        overall_evaluation: [
          { required: true, message: "请认真选择!", trigger: "change" }
        ],
        desc: [
          {
            required: true,
            message: "请输入内!容",
            trigger: "blur"
          }
        ]
      },
      // 模版数据
      templateData: [
        {
          title: "模板一：按时出勤并且按时完成作业，课堂表现好",
          content:
            "亲爱的家长，孩子本月的学习态度非常好，按时出勤，按时提交作业，上课积极与老师互动，认真回答问题，看的出孩子是一个非常自律且对自己要求很高的学生，希望在接下来的学习生活中继续保持，再接再厉。孩子的健康成长离不开家长的认真陪伴，及时关注，老师希望咱们的爸爸妈妈能够和老师一起继续关注并督促孩子的学习，我们一起给孩子一个明朗的明天。"
        },
        {
          title: "模板二：按时出勤，没有按时完成作业",
          content:
            "亲爱的家长，孩子本月出勤状况很良好，看的出孩子对于学习还是很重视的，但是本月孩子的作业有几次没有按照提交，需要家长多关注一下，课业上的压力和难点都可以积极和老师沟通，希望在下个月的学习生活中，孩子还能继续保持按时出勤，作业有难题及时和老师沟通，我们一起努力给孩子一个明朗的明天。"
        },
        {
          title: "模板三：没有按时出勤，按时完成作业",
          content:
            "亲爱的家长，孩子本月的作业完成情况很好，看到出孩子的学习态度还是很认真的，但是孩子有几次没有按时观看咱们的直播课，希望家长关注一下，督促孩子尽量在直播中学习，在直播的课程中及时的和主讲老师互动，让主讲老师更清楚孩子的学习状态，这样的学习会更有针对性。希望在下个月的学习生活中，孩子还能继续保持按时完成作业，作业有难题及时和老师沟通，如果时间冲突不能看直播课，也要及时和老师请假哦，我们一起努力给孩子一个明朗的明天。"
        },
        {
          title: "模板四：没有按时出勤，没有按时完成作业",
          content:
            "亲爱的家长，孩子的本月学习进度有所滞缓哦，出勤状况和作业提交状况都不太理想，初中是在知识结构中起的是承上启下的作用，既可以把小学时落下的课程补上，又能够为将来的高中打下一个夯实的基础，孩子和家长一定不能放松哦，在下个月的学习生活中，老师希望家长能够和老师一起督促孩子按时出勤，按时提交作业，作业有难题及时和老师沟通，我们一起努力给孩子一个明朗的明天。"
        }
      ],
      copyValue: "123"
    };
  },
  methods: {
    ...mapMutations(["setRefresh"]),
    // 创建报告
    async createReport() {
      this.formValidate.account_id = this.userId;
      let res = await this.$request({
        method: "post",
        url: CREATELEARNINGREPORT,
        data: qs.stringify(this.formValidate)
      });
    },
    // 查看报告内容
    async btnSelect() {
      this.modal10 = true;
      let res = await this.$request({
        method: "get",
        url: LEARNINGREPORTINFO,
        params: {
          id: this.dataList[this.userIndex].id
        }
      });
      this.formValidate = res.data.data;
      for (let key in this.formValidate) {
        this.formValidate[key] = this.formValidate[key] + "";
      }
    },
    // 拷贝
    copy() {
      var clipboard = new Clipboard(".copyBtn");
      // clipboard.destroy();
    },
    // 查看按钮
    examine(index) {
      return this.$Modal.info({
        title: this.templateData[index].title,
        content: `<p>${this.templateData[index].content}</p>`,
        width: "500px"
      });
    },
    // 点击确认回调，验证表单,不填写不让关
    confirm() {
      this.$refs["formValidate"]
        .validate(valid => {
          if (valid) {
            if (this.btn) {
              this.createReport();
            }
            this.$Message.success("成功!");
            this.$refs["formValidate"].resetFields();
            this.setRefresh(true)
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
.content {
  height: 600px;
  overflow: auto;
}
.title {
  background-color: #f2f2f2;
  padding-left: 10px;
  box-sizing: border-box;
}
.select {
  margin: 10px 0 0 30px;
  box-sizing: border-box;
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