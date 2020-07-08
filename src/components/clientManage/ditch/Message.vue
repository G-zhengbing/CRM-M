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
           <Col span="24">
            <FormItem>
              <Input v-model="form.title" placeholder="标题">
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem>
               <Select v-model="form.demand_type">
                <Option :value="i" v-for="(list,i) in cityRefre" :key="i">{{list}}</Option>
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
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="save">确定生成</Button>
        <Button type="primary" size="large" @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>