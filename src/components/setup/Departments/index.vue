<template>
  <div class="Departments">
    <div class="contaner">
      <Row>
        <Col span="6">
          <p>公司组织架构</p>
          <div style="padding-left: 20px;">
            <p style="padding: 15px 0">
              <!-- 全品直播中心
              <Icon type="ios-create-outline" :size="20" style="padding-left: 10px;" />-->
            </p>
            <Tree :data="data5" :render="renderContent" class="demo-tree-render"></Tree>
          </div>
        </Col>
        <Col span="18">
          <div class="one-title">
            <span>用户列表</span>
            <Button type="primary" @click="editSwitch = true;add=1;formValidate = {};">新增用户</Button>
          </div>
          <div class="title">
            <div class="left">
              <span style="padding-left: 10px;padding-right:5px;">已选{{Items.length}}条</span>
              <Button type="primary" @click="forbiddenUser(Items)">禁用</Button>
              <Button type="primary" @click="outage()">停用</Button>
            </div>
            <div class="right" style="padding-right: 10px;">
              <Input v-model="value" placeholder="请输入用户名或手机号" style="width: 300px" />
              <Button type="primary" @click="getUserList">查询</Button>
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
    </div>
    <!-- 添加部门 -->
    <Modal
      title="添加部门"
      v-model="addSwitch"
      :styles="{top: '20%'}"
      @on-ok="addConfirm"
      @on-cancel="addCancel"
    >
      <div class="content">
        <Form :model="addFormItem" :label-width="80">
          <FormItem label="上级部门" style="width: 400px;margin: 0 auto;">
            <Input v-model="addFormItem.title" placeholder="全品直播中心" disabled></Input>
          </FormItem>
          <FormItem label="部门名称" style="width: 400px;margin: 0 auto;">
            <Input v-model="addFormItem.department_name" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 修改部门名称 -->
    <Modal
      title="编辑部门"
      v-model="editNameSwitch"
      :styles="{top: '20%'}"
      @on-ok="editNameConfirm"
      @on-cancel="editNameCancel"
    >
      <div class="content">
        <Form :model="editNameFormItem" :label-width="80">
          <FormItem label="部门名称" style="width: 400px;margin: 0 auto;">
            <Input v-model="editNameFormItem.department_name" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Edit
      :formValidate="formValidate"
      v-if="editSwitch"
      :data4="data4"
      :editSwitch="editSwitch"
      :cityList="cityList"
      :add="add"
      @closeEdit="closeEdit"
    />
  </div>
</template>

<script>
import qs from "qs";
import {
  DELETE_USER,
  ADMINMERBERUSERLIST,
  CREATEDEPARTMENTNAME,
  UPDATEDEPARTMENTNAME,
  DELETEDEPARTMENTNAME,
  ADMINMERBERDEPARTMENTNAMELIST,
  ADMINMERBERROLELIST,
  PROHIBITADMINUSER
} from "@/uilt/url/url";
import Edit from "./edit";
export default {
  name: "Departments",
  components: {
    Edit
  },
  data() {
    return {
      // 编辑，用户，下拉列表，存数据
      cityList: [],
      // table 表格数据
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "登录名",
          key: "user_name",
          width: 120,
          align: "center"
        },
        {
          title: "用户名",
          key: "login_name",
          width: 120,
          align: "center"
        },
        {
          title: "手机号",
          key: "mobile",
          width: 130,
          align: "center"
        },
        {
          title: "部门",
          key: "department_name",
          width: 120,
          align: "center"
        },
        {
          title: "角色",
          key: "name",
          align: "center"
        },
        {
          title: "最近登录时间",
          key: "last_login_time",
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
                      this.formValidate = params.row;
                      this.add = 0;
                      this.editSwitch = true;
                    }
                  }
                },
                "编辑"
              )
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         if (params.row.is_delete == 0) {
              //           this.forbiddenUser(params.row.id);
              //           this.getUserList();
              //         } else {
              //           this.$Message.error("该帐号已禁用!");
              //         }
              //       }
              //     }
              //   },
              //   params.row.is_delete == 0 ? "禁用" : "已禁用"
              // ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         this.outage(params.row)
              //       }
              //     }
              //   },
              //   "停用"
              // )
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
      dataList: [],

      // 树形控件数据
      treeData: {},
      data4: [
        {
          title: "全品直播中心",
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
              [h("span", data.title)]
            );
          },
          children: []
        }
      ],
      data5: [
        {
          title: "全品直播中心",
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
                          this.addSwitch = true;
                          this.treeData = data;
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: []
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      },

      // 下面是form表单获取数据
      formValidate: {},

      addFormItem: {},
      editNameFormItem: {},

      // 这是页面内展示数据
      value: "", // 手机号查询条件
      Items: "", // 当前选择的用户信息

      // 下面是开关数据
      editSwitch: false, // 编辑开关
      addSwitch: false, // 添加部门开关
      editNameSwitch: false, // 修改部门开关
      add: 0,

      // 下列为分页数据
      total: 100,
      per_page: 10,
      current_page: 1,
      last_page: 1
    };
  },
  methods: {
    //停用
    async outage(val) {
      if (this.Items.length == 0) {
        this.$Message.error("请选择要停用的用户");
      } else {
        var arr = [];
        let uid = this.Items.map(i => {
          arr.push(i.id);
        });
        let res = await this.$request({
          method: "post",
          url: DELETE_USER,
          params: {
            admin_member_ids: JSON.stringify(arr)
          }
        });
        if (res.data.ret) {
          this.$Message.success("停用成功");
          this.getUserList();
        } else {
          this.$Message.error(res.data.error);
        }
      }
    },
    // 禁用用户
    async forbiddenUser(id) {
      if (typeof id === "object") {
        let arrId = [];
        id.map(item => {
          arrId.push(item.id);
        });
        id = arrId.join("，");
      }
      let res = await this.$request({
        method: "POST",
        url: PROHIBITADMINUSER,
        params: {
          admin_member_ids: id
        }
      });
      if (!res.data.error) {
        this.$Message.success("禁用成功!");
        this.getUserList();
      } else {
        this.$Message.error("禁用失败!");
      }
    },
    // 获取用户信息列表
    async getUserList() {
      let res = await this.$request({
        url: ADMINMERBERUSERLIST,
        params: {
          name_or_mobile: this.value,
          page: this.current_page
        }
      });
      this.dataList = res.data.data.resources;
      this.dataList.map(item => {
        item.name = item.role_names.join("，");
        item.sex = item.sex + "";
        item.mobile = item.mobile + "";
      });
      // 分页配置
      this.total = res.data.data.links.total;
      this.per_page = res.data.data.links.per_page;
      this.current_page = res.data.data.links.current_page;
      this.last_page = res.data.data.links.last_page;
    },
    // 获取用户角色下拉列表
    async getUserDataList() {
      let res = await this.$request({
        url: ADMINMERBERROLELIST
      });
      this.cityList = res.data.data;
    },
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
                    this.editNameFormItem.department_id = data.id;
                    this.editNameFormItem.department_name = data.title;
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
                    this.addFormItem.title = data.title;
                    this.addFormItem.superior = data.id;
                    this.addSwitch = true;
                    this.treeData = data;
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                on: {
                  click: () => {
                    if (data.children) {
                      return this.$Message.error("请优先删除下级分类!");
                    }
                    // 删除
                    this.$request({
                      method: "post",
                      url: DELETEDEPARTMENTNAME,
                      data: qs.stringify({
                        department_id: data.id,
                        is_delete: 2
                      })
                    }).then(res => {
                      if (res.data.code === 100001) {
                        this.$Message.error(res.data.error);
                      } else if (res.data.code === 200) {
                        this.remove(root, node, data);
                      }
                    });
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(data, id) {
      const children = data.children || [];
      children.push({
        id,
        title: this.addFormItem.department_name,
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
      this.current_page = val;
      this.getUserList();
    },
    closeEdit(Switch) {
      this.editSwitch = Switch;
      this.getUserList();
    },
    // 添加按钮回调
    async addConfirm() {
      let res = await this.$request({
        method: "post",
        url: CREATEDEPARTMENTNAME,
        data: qs.stringify(this.addFormItem)
      });
      // this.PermissionsTree();
      this.append(this.treeData, res.data.data[0]);
      this.addCancel();
    },
    addCancel() {
      this.addFormItem = {};
    },
    // 修改部门按钮回调
    async editNameConfirm() {
      let res = await this.$request({
        method: "post",
        url: UPDATEDEPARTMENTNAME,
        data: qs.stringify(this.editNameFormItem)
      });
      this.PermissionsTree();
      this.editNameCancel();
    },
    editNameCancel() {
      this.editNameFormItem = {};
    },
    // 权限树数据渲染
    async PermissionsTree() {
      let res = await this.$request({
        url: ADMINMERBERDEPARTMENTNAMELIST
      });
      this.data5[0].children = res.data.data;
      this.data4[0].children = res.data.data;
    }
  },
  created() {
    this.PermissionsTree();
    this.getUserList();
    this.getUserDataList();
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
.tree-content {
  height: 300px;
  overflow: hidden;
  overflow-y: auto;
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