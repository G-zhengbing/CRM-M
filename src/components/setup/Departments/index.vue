<template>
  <div class="Departments">
    <!-- 面包屑 -->
    <bread-crumb>
      <template slot="title">部门和用户</template>
    </bread-crumb>
    <Card class="card">
      <Row>
        <Col span="6">
          <p>公司组织架构</p>
          <div style="padding-left: 20px;">
            <p style="padding: 20px 0">
              全品直播中心
              <Icon type="ios-create-outline" :size="20" style="padding-left: 10px;" />
            </p>
            <Tree :data="data5" :render="renderContent" class="demo-tree-render"></Tree>
          </div>
        </Col>
        <Col span="18">
          <div class="one-title">
            <span>用户列表</span>
            <Button type="primary" @click="editSwitch = true">新增用户</Button>
          </div>
          <div class="title">
            <div class="left">
              <span style="padding-left: 10px;padding-right:5px;">已选{{num}}条</span>
              <Button type="primary">禁用</Button>
            </div>
            <div class="right" style="padding-right: 10px;">
              <Input v-model="value" placeholder="请输入用户名或手机号" style="width: 300px" />
              <Button type="primary">查询</Button>
            </div>
          </div>
          <Table
            height="400"
            @on-selection-change="selectItem"
            border
            ref="selection"
            :columns="columns"
            :data="dataList"
          ></Table>
        </Col>
      </Row>
      <PagingBox
        :total="total"
        :per_page="per_page"
        :current_page="current_page"
        :last_page="last_page"
        @changePages="changePages"
      />
    </Card>
    <!-- 新增/编辑用户 -->
    <Modal
      title="新增/编辑用户"
      v-model="editSwitch"
      class-name="vertical-center-modal-1"
      @on-ok="editConfirm"
      @on-cancel="editCancel"
    >
      <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="姓名" prop="UserName">
            <Input v-model="formValidate.UserName" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <Select v-model="formValidate.sex" placeholder="性别" style="width: 300px">
              <Option value="beijing">班课</Option>
              <Option value="shanghai">一对一</Option>
            </Select>
          </FormItem>
          <FormItem label="手机号" prop="mobile">
            <Input v-model="formValidate.mobile" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="邮箱">
            <Input v-model="formValidate.className" placeholder="请输入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="部门" prop="branch">
            <Select v-model="formValidate.branch" placeholder="部门" style="width: 300px">
              <Option value="beijing">语文</Option>
              <Option value="shanghai">数学</Option>
            </Select>
          </FormItem>
          <FormItem label="角色" prop="role">
            <Select v-model="formValidate.role" placeholder="角色" style="width: 300px">
              <Option value="beijing">语文</Option>
              <Option value="shanghai">数学</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 添加部门 -->
    <Modal
      title="添加部门"
      v-model="addSwitch"
      class-name="vertical-center-modal-1"
      @on-ok="addConfirm"
      @on-cancel="addCancel"
    >
      <div class="content">
        <Form :model="addFormItem" :label-width="80">
          <FormItem label="上级部门" style="width: 400px;margin: 0 auto;">
            <Input v-model="addFormItem.input" placeholder="请输入部门名称" disabled></Input>
          </FormItem>
          <FormItem label="部门名称" style="width: 400px;margin: 0 auto;">
            <Input v-model="addFormItem.input" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 修改部门名称 -->
    <Modal
      title="编辑部门"
      v-model="editNameSwitch"
      class-name="vertical-center-modal-1"
      @on-ok="editNameConfirm"
      @on-cancel="editNameCancel"
    >
      <div class="content">
        <Form :model="editNameFormItem" :label-width="80">
          <FormItem label="部门名称" style="width: 400px;margin: 0 auto;">
            <Input v-model="addFormItem.input" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Departments",
  data() {
    return {
      // table 表格数据
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "UserName",
          align: "center"
        },
        {
          title: "手机号",
          key: "student_name",
          align: "center"
        },
        {
          title: "角色",
          key: "student_name",
          align: "center"
        },
        {
          title: "部门",
          key: "student_name",
          align: "center"
        },
        {
          title: "最近登录时间",
          key: "student_name",
          align: "center"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.row = params.row;
                      this.editSwitch = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // this.createdOrder(params.row);
                    }
                  }
                },
                "禁用"
              ),
              // 暂不更新，待需求
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         // this.createdOrder(params.row);
              //       }
              //     }
              //   },
              //   "交接"
              // )
            ]);
          }
        }
      ],
      dataList: [
        {
          student_name: "test",
          UserName: "123"
        }
      ],

      // 树形控件数据
      treeData: {},
      data5: [
        {
          title: "部门1",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "ios-folder-outline"
                    },
                    style: {
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "ios-add",
                        type: "primary"
                      }),
                      style: {
                        width: "64px"
                      },
                      on: {
                        click: () => {
                          this.addSwitch = true
                          this.treeData = data
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: [
            {
              title: "child 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  expand: true
                },
                {
                  title: "leaf 1-1-2",
                  expand: true
                }
              ]
            },
            {
              title: "child 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  expand: true
                },
                {
                  title: "leaf 1-2-1",
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      },

      // 下面是form表单获取数据
      formValidate: {},
      // 验证
      ruleValidate: {
        UserName: [
          { required: true, message: "请输入姓名", trigger: "change" }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        branch: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ],
        role: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ]
      },
      addFormItem: {},
      editNameFormItem: {},

      // 这是页面内展示数据
      num: 0, // 选择条数
      value: "", // 手机号查询条件
      row: "", // 当前选择的用户信息

      // 下面是开关数据
      editSwitch: false, // 编辑开关
      addSwitch: false, // 添加部门开关
      editNameSwitch: false, // 修改部门开关

      // 下列为分页数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    // 选择整行信息
    selectItem(selection) {
      this.Items = selection;
    },
    // 树状图的核心数据渲染
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [h("span", data.title)]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "md-create"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    // 修改
                    this.editNameSwitch = true;
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    // 添加
                    this.addSwitch = true;
                    this.treeData = data
                    // this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                on: {
                  click: () => {
                    // 删除
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    // 改变页码
    changePages(val) {
      // this.formItem.page = val;
      // this.getUserData();
    },
    // 点击确认回调，验证表单,不填写不让关
    editConfirm() {
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
            return (this.editSwitch = true);
          }
          // 这里写编辑成功发送请求

          this.formValidate = {};
        });
    },
    // 点击取消回调，重置表单
    editCancel() {
      this.$refs["formValidate"].resetFields();
      this.formValidate = {};
    },
    // 添加按钮回调
    addConfirm() {
      console.log(this.treeData)
      this.append(this.treeData)
    },
    addCancel() {
      this.addFormItem = {};
    },
    // 修改部门按钮回调
    editNameConfirm() {},
    editNameCancel() {
      this.editNameFormItem = {};
    }
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  overflow: hidden;
}
/* title */
.title {
  height: 60px;
  background-color: #f3f3f3;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.demo-tree-render .ivu-tree-title {
  width: 100%;
}
.one-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  box-sizing: border-box;
}
</style>
<style>
.ivu-tree-title {
  width: 100%;
}
.vertical-center-modal-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal-1 .ivu-modal {
  top: 0;
}
</style>