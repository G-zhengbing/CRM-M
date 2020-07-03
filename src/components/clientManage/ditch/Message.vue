<template>
  <div>
    <Modal
      width="1400"
      v-model="type.classify == 'order'"
      title="新建渠道"
      @on-cancel="colseReserved"
      :closable="false"
      :mask-closable="false"
    >
      <Form :model="form" label-position="top" style="height:450px;overflow-y:auto;">
        <Row>
          <Col span="4">
            <FormItem>
              <Select v-model="form.grade" @on-change="seekClick" placeholder="年级">
                <Option :value="6">小学</Option>
                <Option :value="7">七年级</Option>
                <Option :value="8">八年级</Option>
                <Option :value="9">九年级</Option>
                <Option :value="10">高一</Option>
                <Option :value="11">高二</Option>
                <Option :value="12">高三</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Select v-model="form.level" @on-change="seekClick" placeholder="课时包等级">
                <Option :value="1">中级</Option>
                <Option :value="2">高级</Option>
                <Option :value="3">特级</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Select v-model="form.class_hour" @on-change="seekClick" placeholder="课时数">
                <Option :value="1">1</Option>
                <Option :value="10">10</Option>
                <Option :value="30">30</Option>
                <Option :value="50">50</Option>
                <Option :value="100">100</Option>
                <Option :value="150">150</Option>
                <Option :value="200">200</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
        <Table
          :loading="showTableLoading"
          border
          :columns="columns"
          :data="orderList"
          @on-selection-change="selectionChange"
          height="350"
        ></Table>
        <Page
          @on-change="pageChange"
          :total="total"
          :current="currentPage"
          :page-size="pageSize"
          show-total
          show-elevator
          class="ive-page"
        />
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="colseReserved">取消</Button>
        <Button type="primary" size="large" @click="createorder">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>