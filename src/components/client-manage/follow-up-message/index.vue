<template>
  <Modal
    class="modal"
    width="1100"
    v-model="type.classify == 'followUp'"
    title="线索跟进"
    @on-cancel="followUpColse"
  >
    <ul class="tabs">
      <li @click="tab(1)" :class="[num == 1? 'active' : '']">
        <span>跟进</span>
      </li>
      <li
        v-if=" type.status == 'studentpay' || type.status == 'notcallback' || type.status == 'daiban'"
        @click="tab(2)"
        :class="[num == 2? 'active' : '']"
      >
        <span>订单</span>
      </li>
      <li @click="tab(3)" :class="[num == 3? 'active' : '']">
        <span>预约单</span>
      </li>
    </ul>
    <Form
      :model="followForm"
      label-position="top"
      v-if="num ==1"
      style="height:500px;overflow-y:auto"
    >
      <div style="display:flex;">
        <div style="flex:1">
          <Row>
            <Col span="8">
              <FormItem style="width:150px;" label="学员姓名">
                <Input v-model="followForm.student_name" placeholder="姓名"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="注册手机">
                <Input :title="followForm.tel" v-model="followForm.tel" placeholder="手机号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="备用电话">
                <Input v-model="followForm.spare_phone" placeholder="电话"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="性别">
                <Select v-model="followForm.sex" style="width:150px" placeholder="性别">
                  <Option :value="1">男</Option>
                  <Option :value="2">女</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="年龄">
                <Input v-model="followForm.age" placeholder="年龄"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="年级">
                <Select v-model="followForm.grade" style="width:150px" placeholder="年级">
                  <Option :value="1">一年级</Option>
                  <Option :value="2">二年级</Option>
                  <Option :value="3">三年级</Option>
                  <Option :value="4">四年级</Option>
                  <Option :value="5">五年级</Option>
                  <Option :value="6">六年级</Option>
                  <Option :value="7">七年级</Option>
                  <Option :value="8">八年级</Option>
                  <Option :value="9">九年级</Option>
                  <Option :value="10">高一</Option>
                  <Option :value="11">高二</Option>
                  <Option :value="12">高三</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="微信昵称">
                <Input v-model="followForm.wechat_nick_name" placeholder="学员微信昵称"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="微信号">
                <Input v-model="followForm.wechat_id" placeholder="请输入微信号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="城市">
                <Input v-model="followForm.area" placeholder="请输入城市"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem style="width:150px;" label="学校">
                <Input v-model="followForm.school" placeholder="就读学校"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="教材版本">
                <Select
                  v-model="followForm.textbook_version"
                  style="width:150px"
                  placeholder="教材版本"
                >
                  <Option v-for="(list,i) in vaersion" :value="i*1" :key="i">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="科目">
                <Select v-model="followForm.subject" style="width:150px" placeholder="科目">
                  <Option v-for="(list,i) in subject" :value="i*1" :key="i">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="14">
              <FormItem label="呼出请况">
                <RadioGroup class="radios" v-model="phone_status">
                  <Radio :label="1">正常接听</Radio>
                  <Radio :label="2">无人接听</Radio>
                  <Radio :label="3">空号</Radio>
                  <Radio :label="4">挂断</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="意向度" style="margin-left: 10px">
                <RadioGroup v-model="followForm.intention_option">
                  <Radio :label="1">高</Radio>
                  <Radio :label="2">中</Radio>
                  <Radio :label="3">低</Radio>
                  <Radio :label="4">无</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem
                label="发送短信"
                v-if="type.data.many_calls == 2 && type.data.phone_status == 2"
              >
                <Button type="text" size="large" @click="send">发送未接通短信提醒</Button>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="回访内容">
                <Input v-model="vist_content" type="textarea" :rows="3" placeholder="请输入回访内容" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="下次回访">
                <DatePicker
                  style="margin:0"
                  v-model="followForm.next_follow_time"
                  format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  :options="optionsDate"
                  :title="item"
                  confirm
                  placeholder="下次回访日期"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div style="border-left:1px solid #ccc;margin:0 15px"></div>
        <div style="flex:1;height:500px;overflow-y:auto">
          <Row>
            <Col span="24">
              <ul class="record-footer">
                <li v-if="JSON.stringify(followForm.visit_content) == 'null'">暂无跟进记录</li>
                <li v-else class="visit" v-for="(item,i) in followForm.visit_content" :key="i">
                  <div>
                    {{item.time}}&nbsp;&nbsp;&nbsp;
                    <a href="javascript:;">跟进人:</a>
                    {{item.sale_name}}。
										</br>
                    <a href="javascript:;">内容:</a>
                    {{item.visit_content }}
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
    <template v-if="num ==2">
      <div style="minHeight:500px">
        <p class="record-header">
          <i>购买课程</i>
          <span>年级</span>
          <span>科目</span>
          <span>购买时间</span>
        </p>
        <ul class="record-footer">
          <li v-for="(item,i) in followForm.order" :key="i">
            <i>{{item.product_name}}</i>
            <span>{{item.grade}}</span>
            <span>{{item.subject}}</span>
            <span>{{item.create_time}}</span>
          </li>
        </ul>
      </div>
    </template>
    <template v-if="num == 3">
      <Table border :columns="columns" :data="orderList" height="500"></Table>
    </template>
    <div slot="footer">
      <Button class="followup" type="warning" size="large" @click="followUpRemoveOk">移出</Button>
      <Button class="order" type="warning" size="large" @click="createOrder">订单</Button>
      <Button class="sendSMS" type="warning" size="large" @click="openSms">发送信息</Button>
      <Button type="text" size="large" @click="followUpColse">取消</Button>
      <Button :loading="disableBtn" type="primary" size="large" @click="genjin">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {};
</script>

<style>
</style>