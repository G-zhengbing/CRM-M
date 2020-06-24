<template>
  <div class="edit">
    <!-- 新增/编辑用户 -->
    <Modal
      :title="add ? '新增用户' : '编辑用户'"
      v-model="editSwitch1"
      class-name="vertical-center-modal-1"
      @on-ok="editConfirm"
      @on-cancel="editCancel"
    >
      <div class="content">
        <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="100" :show-message="false">
          <FormItem v-if="add" label="登录名" prop="user_name">
            <Input v-model="formValidate1.user_name" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem v-if="add" label="密码" prop="password">
            <Input v-model="formValidate1.password" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="姓名" prop="login_name">
            <Input v-model="formValidate1.login_name" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <Select v-model="formValidate1.sex" placeholder="性别" style="width: 300px">
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          </FormItem>
          <FormItem label="手机号" prop="mobile">
            <Input v-model="formValidate1.mobile" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate1.email" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="部门" prop="department_name">
            <Input
              v-model="formValidate1.department_name"
              placeholder="部门"
              style="width: 300px"
              @on-focus="branchSwitch = true"
            ></Input>
          </FormItem>
          <FormItem label="角色" prop="roles">
            <Select v-model="formValidate1.roles" multiple style="width: 300px" placeholder="角色">
              <Option v-for="item in cityList" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 新建用户，选择部门控件 -->
    <Modal
      title="选择部门"
      v-model="branchSwitch"
      class-name="vertical-center-modal-1"
      @on-ok="branchConfirm"
      @on-cancel="branchCancel(1)"
    >
      <div class="tree-content">
        <Tree :data="data4" @on-select-change="clickTree"></Tree>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import { CREATEADMINUSER } from "@/uilt/url/url";
export default {
  props: {
    editSwitch: {
      type: Boolean,
      required: true
    },
    cityList: {
      type: Array,
      required: true
    },
    formValidate: {
      type: Object,
      required: false
    },
    data4: {
      type: Array,
      required: true
    },
    add: {
      type: Number,
      required: true
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback("手机号格式不正确");
      } else {
        callback();
      }
    };
    return {
      editSwitch1: this.editSwitch, // 开关
      formValidate1: this.formValidate,
      branchSwitch: false,
      treeData: {},
      // 验证
      ruleValidate: {
        user_name: [
          {
            required: true,
            message: "请输入登录名",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ],
        login_name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: "blur"
          },
          { type: "email", message: "请填写正确格式邮箱", trigger: "blur" }
        ],
        mobile: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
        department_name: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 点击树节点时触发
    clickTree(data) {
      this.treeData = data;
    },
    // 新建用户内,部门,选择按钮回调
    branchConfirm() {
      if (this.treeData.length !== 0 && this.treeData.length !== undefined) {
        this.formValidate1.department_name = this.treeData[0].title;
        this.formValidate1.department_id = this.treeData[0].id;
      } else {
        if (!this.formValidate1.department_name) {
          this.formValidate1.department_name = "";
        }
      }
    },
    branchCancel(val) {},
    // 编辑页面，点击确认回调，验证表单,不填写不让关
    editConfirm() {
      this.$refs["formValidate1"]
        .validate(valid => {
          if (valid) {
            if (!this.formValidate1.roles || !this.formValidate1.roles.length) {
              this.$Message.error("角色为必选项!");
            } else {
            }
          } else {
            this.$Message.error("请填写必选项!");
          }
        })
        .then(async val => {
          // 表单验证有 bug 直接点击部门获取不到信息，所以换个显示方法
          if (!this.formValidate1.roles || !this.formValidate1.roles.length) {
            return (this.editSwitch1 = true);
          }
          // 验证不通过，不关闭弹窗
          if (!val) {
            return (this.editSwitch1 = true);
          }
          // 这里写编辑成功发送请求
          // 新增用户
          this.formValidate1.roles = this.formValidate1.roles.join(",");
          let res = await this.$request({
            method: "post",
            url: CREATEADMINUSER,
            data: qs.stringify(this.formValidate1)
          });
          if (res.data.code == 100001) {
            this.$Message.error(res.data.error);
            return (this.editSwitch1 = true);
          } else {
            this.$Message.success("成功!");
            // 完成清空
            this.editCancel();
          }
        });
    },
    // 编辑页面，点击取消回调，重置表单
    editCancel() {
      this.$refs["formValidate1"].resetFields();
      this.formValidate1 = {};
      this.$emit("closeEdit", false);
    }
  },
  created() {
    this.formValidate1.admin_member_id = this.formValidate.id;
  }
};
</script>

<style>
</style>