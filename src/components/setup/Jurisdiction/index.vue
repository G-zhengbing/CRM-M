<template>
  <div class="Jurisdiction">
    <!-- 面包屑 -->
    <bread-crumb>
      <template slot="title">角色和权限</template>
    </bread-crumb>
    <Card class="card">
      <Row>
        <Col span="5">
          <div class="left-title">
            <b>角色</b>
            <Button type="primary" size="small" @click="Switch = true">新建角色</Button>
          </div>
          <Menu theme="light" active-name="1-1" @on-select="selectUser" style="float: right;">
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Menu>
        </Col>
        <Col span="19" style="padding-left: 15px;">
          <div class="right-title">
            <span>超级管理员权限设置</span>
            <Button type="primary">保存</Button>
          </div>
          <ul>
            <li>
              <div class="li-title">CMS管理</div>
              <CheckboxGroup v-model="CRMselect">
                <Checkbox
                  :label="index"
                  v-for="(item,index) in 100"
                  class="item"
                  :key="index"
                >{{item}}</Checkbox>
              </CheckboxGroup>
            </li>
            <li>
              <div class="li-title">设置</div>
              <CheckboxGroup v-model="SetUpSelect">
                <Checkbox label="香蕉"></Checkbox>
                <Checkbox label="苹果"></Checkbox>
                <Checkbox label="西瓜"></Checkbox>
              </CheckboxGroup>
            </li>
          </ul>
        </Col>
      </Row>
    </Card>
    <!-- 新建角色 -->
    <Modal
      title="新建角色"
      v-model="Switch"
      class-name="vertical-center-modal-1"
      @on-ok="Confirm"
      @on-cancel="Cancel"
    >
      <div class="content">
        <Form :model="formItem" :label-width="80">
          <FormItem label="角色名称" style="width: 400px;margin: 0 auto;">
            <Input v-model="formItem.input" placeholder="请输入部门名称"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "Jurisdiction",
  data() {
    return {
      Switch: false, // 新建角色开关
      CRMselect: [], // crm 权限选择
      SetUpSelect: [], // 设置 权限选择
      formItem: {},
    };
  },
  methods: {
    // 点击选择触发
    selectUser(name) {
      console.log(name);
    },
    // 点击确认回调
    Confirm() {},
    // 点击取消回调
    Cancel() {}
  }
};
</script>

<style scoped>
.left-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.right-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.li-title {
  background-color: #f2f2f2;
  padding: 10px;
  box-sizing: border-box;
}
.item {
  margin: 5px;
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