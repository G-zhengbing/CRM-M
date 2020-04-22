<template>
  <div class="boxs">
    <!-- 选择课程 -->
    <Modal
      width="1100"
      v-model="type.classify == 'order'"
      title="选择课程"
      @on-cancel="colseReserved"
      :styles="{'margin-top' : '-70px'}"
    >
      <Form :model="form" label-position="top" style="height:450px;overflow-y:auto;">
        <Row>
          <Col span="4">
            <FormItem>
              <Select
                v-model="form.grade"
                style="width:150px"
                @on-change="seekClick"
                placeholder="年级"
              >
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
              <Select
                v-model="form.level"
                style="width:150px"
                @on-change="seekClick"
                placeholder="课时包等级"
              >
                <Option :value="1">中级</Option>
                <Option :value="2">高级</Option>
                <Option :value="3">特级</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Select
                v-model="form.class_hour"
                style="width:150px"
                @on-change="seekClick"
                placeholder="课时数"
              >
                <Option :value="1">1</Option>
                <Option :value="10">10</Option>
                <Option :value="30">30</Option>
                <Option :value="50">50</Option>
                <Option :value="100">100</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4" style="text-indent: 60px">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
        <Table
          :loading="showTableLoading"
          border
          :columns="columns"
          :data="orderList"
          @on-selection-change="selectionChange"
          height="300"
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
    <!-- 创建订单 -->
    <Modal
      width="700"
      v-model="showOrder"
      title="创建订单"
      @on-cancel="showOrder = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <Form :form="orderForm" label-position="left" style="height:450px;overflow-y:auto;">
        <FormItem label="基本信息"></FormItem>
        <div class="procude">
          <div class="procude-top">
            <span>{{items.title}}</span>
            <i>×</i>
          </div>
          <div class="procued-content">
            <FormItem label="课程名称" class="type">
              <Input v-model="orderForm.course_name" readonly style="width:300px" />
            </FormItem>
            <FormItem label="购买数量" class="type">
              <Input
                type="number"
                v-model="orderForm.goods_num"
                @on-change="setTotalPrice"
                style="width:300px"
              />
            </FormItem>
            <!-- <FormItem label="报读年级">
              <Select v-model="orderForm.grade" style="width:300px" disabled>
                <Option :value="1">一年级</Option>
                <Option :value="2">二年级</Option>
                <Option :value="3">三年级</Option>
                <Option :value="4">四年级</Option>
                <Option :value="5">五年级</Option>
                <Option :value="6">六年级</Option>
                <Option :value="7">七年级</Option>
                <Option :value="8">八年级</Option>
                <Option :value="9">九年级</Option>
              </Select>
            </FormItem>-->
            <!-- <FormItem label="报读科目">
              <Select v-model="orderForm.subject" style="width:300px" disabled>
                <Option :value="i" v-for="(list,i) in subject">{{list}}</Option>
              </Select>
            </FormItem>-->
          </div>
          <div class="procued-footer">
            <span>价格</span>
            <div>
              <span>共{{orderForm.class_hour * orderForm.goods_num}}课时，</span>
              <i>小计: {{price?price :orderForm.total_price}}元</i>
            </div>
          </div>
        </div>
        <FormItem label="支付信息"></FormItem>
        <FormItem>
          <Table border :columns="orderColumns" :data="orderPay" height="100"></Table>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showOrder = false">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="createOrders">确定</Button>
      </div>
    </Modal>
    <!-- 预约试听 -->
    <Modal
      width="1100"
      v-model="type.classify == 'audition'"
      title="预约试听"
      @on-cancel="colseReserved"
      :styles="{'margin-top' : '-70px'}"
    >
      <Button type="primary" size="large" @click="createAudition">新建预约</Button>
      <Form label-position="top" style="height:500px;overflow-y:auto;">
        <Table
          border
          :columns="Acolumns"
          :data="notifiDatas"
          @on-selection-change="auditionSelectionChange"
          height="500"
        ></Table>
        <Page
          @on-change="auditionPageChange"
          :total="notifiTotal"
          :current="notifiCurrentPage"
          :page-size="notifiPageSize"
          show-total
          show-elevator
          class="ive-page"
        />
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="colseReserved">取消</Button>
        <!-- <Button type="primary" size="large" @click="audition">确定</Button> -->
      </div>
    </Modal>
    <!-- 新建预约试听 -->
    <Modal
      width="700"
      v-model="showCreateAudition"
      title="新建预约试听"
      @on-cancel="clearForm"
      :styles="{'margin-top' : '-70px'}"
    >
      <Form :form="createAuditionForm" label-position="top" style="height:500px;overflow-y:auto;">
        <Row>
          <Col span="24">
            <FormItem label="预约试听类型">
              <RadioGroup v-model="createAuditionForm.type">
                <Radio :label="4">一对一</Radio>
                <Radio :label="1">班课</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="预约课程">
              <Input v-model="createAuditionForm.course_name" placeholder="请输入预约课程"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="年级">
              <Select v-model="createAuditionForm.grade">
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
          <Col span="24">
              <FormItem label="教材版本">
                <Select v-model="createAuditionForm.textbook_version" placeholder="教材版本">
                  <Option v-for="(list,i) in vaersion" :value="i*1">{{list}}</Option>
                </Select>
              </FormItem>
            </Col>
          <Col span="24">
            <FormItem label="科目">
              <Select v-model="createAuditionForm.subject">
                <Option :value="i" v-for="(list,i) in subject">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="试听课日期">
              <DatePicker
                v-model="createAuditionForm.date_time"
                type="date"
                placeholder="选择日期"
                style="width: 300px"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="试听课时段">
              <!-- <TimePicker
                v-model="createAuditionForm.class_hour"
                type="time"
                placeholder="选择时间范围"
                style="width: 168px"
              ></TimePicker>-->
              <Input @on-focus="getFocus" v-model="time" placeholder="选择时间范围"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="老师">
              <Select v-model="createAuditionForm.coach_id" @on-open-change="getTeachers">
                <Option :value="list.id" v-for="(list,i) in teachersV">{{list.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="听课内容">
              <Input
                v-model="createAuditionForm.note"
                type="textarea"
                :autosize="{minRows: 5,maxRows: 15}"
                placeholder="请填写听课内容"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="clearForm">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="createAuditionOk">确定</Button>
      </div>
    </Modal>
    <Modal
      width="1100"
      v-model="showTimeBlock"
      title="开放时间"
      @on-cancel="showTimeBlock = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <div class="content">
        <div class="content-left">
          <ul>
            <li>-</li>
            <li>00:30 - 01:00</li>
            <li>01:00 - 01:30</li>
            <li>01:30 - 02:00</li>
            <li>02:00 - 02:30</li>
            <li>02:30 - 03:00</li>
            <li>03:00 - 03:30</li>
            <li>03:30 - 04:00</li>
            <li>04:00 - 04:30</li>
            <li>04:30 - 05:00</li>
            <li>05:00 - 05:30</li>
            <li>05:30 - 06:00</li>
            <li>06:00 - 06:30</li>
            <li>06:30 - 07:00</li>
            <li>07:00 - 07:30</li>
            <li>07:30 - 08:00</li>
            <li>08:00 - 08:30</li>
            <li>08:30 - 09:00</li>
            <li>09:00 - 09:30</li>
            <li>09:30 - 10:00</li>
            <li>10:00 - 10:30</li>
            <li>10:30 - 11:00</li>
            <li>11:00 - 11:30</li>
            <li>11:30 - 12:00</li>
            <li>12:00 - 12:30</li>
            <li>12:30 - 13:00</li>
            <li>13:00 - 13:30</li>
            <li>13:30 - 14:00</li>
            <li>14:00 - 14:30</li>
            <li>14:30 - 15:00</li>
            <li>15:00 - 15:30</li>
            <li>15:30 - 16:00</li>
            <li>16:00 - 16:30</li>
            <li>16:30 - 17:00</li>
            <li>17:00 - 17:30</li>
            <li>17:30 - 18:00</li>
            <li>18:00 - 18:30</li>
            <li>18:30 - 19:00</li>
            <li>19:00 - 19:30</li>
            <li>19:30 - 20:00</li>
            <li>20:00 - 20:30</li>
            <li>20:30 - 21:00</li>
            <li>21:00 - 21:30</li>
            <li>21:30 - 22:00</li>
            <li>22:00 - 22:30</li>
            <li>22:30 - 23:00</li>
            <li>23:00 - 23:30</li>
            <li>23:30 - 24:00</li>
          </ul>
        </div>
        <div class="content-right">
          <ul class="content-right-header">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ul>
          <div class="content-right-footer">
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 0}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num"
              ></li>
            </ul>
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 48}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num*2"
                v-if=" k > num"
              ></li>
            </ul>
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 96}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num*3"
                v-if=" k > num*2"
              ></li>
            </ul>
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 144}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num*4"
                v-if=" k > num*3"
              ></li>
            </ul>
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 192}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num*5"
                v-if=" k > num*4"
              ></li>
            </ul>
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 240}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num*6"
                v-if=" k > num*5"
              ></li>
            </ul>
            <ul>
              <li
                :class="{active:setActive == k,disable:k-1 % num == 288}"
                @click="getNum(i,$event)"
                v-for="(k,i) in num*7"
                v-if=" k > num*6"
              ></li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="showTimeBlock = false">取消</Button>
        <Button type="primary" size="large" @click="loseFocus">确定</Button>
      </div>
    </Modal>
    <!-- 签到 -->
    <Modal
      width="300"
      v-model="showSignin"
      title="签到"
      @on-cancel="showSignin = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <div>
        <p>是否完成上课？</p>
        <RadioGroup v-model="signinForm.type">
          <Radio :label="2">已上课</Radio>
          <Radio :label="3">缺席</Radio>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="showSignin = false">取消</Button>
        <Button type="primary" size="large" @click="signinOk">确定</Button>
      </div>
    </Modal>
    <!-- 查看测评 -->
    <Modal
      width="500"
      v-model="showAppraisal"
      title="查看测评"
      @on-cancel="showAppraisal = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <Form :form="appraisalForm" label-position="top" style="height:300px;overflow-y:auto;">
        <FormItem label="测评上传" prop="avatar" class="active_span">
          <template>
            <div class="demo-upload-list" v-for="item in uploadList">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </div>
          </template>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','gif','png']"
            :max-size="2048"
            :before-upload="handleBeforeUpload"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            action="http://liveapi.canpoint.net/api/create_products"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="测评报告">
          <Input
            v-model="appraisalForm.visit_content"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 15}"
            placeholder="请填写测评报告"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showAppraisal = false">取消</Button>
        <Button type="primary" size="large" @click="appraisalOk">确定</Button>
      </div>
    </Modal>
    <!-- 取消预约 -->
    <Modal
      width="300"
      v-model="showcallOff"
      title="取消预约"
      @on-cancel="showcallOff = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <div>
        <p>确定{{callOffForm.student_name}}取消预约？</p>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="showcallOff = false">取消</Button>
        <Button type="primary" size="large" @click="callOffOk">确定</Button>
      </div>
    </Modal>
    <!-- 转介绍 -->
    <Card style="width:500px" v-if="type.classify == 'introduce'">
      <p slot="title">转介绍</p>
      <a href="#" slot="extra" @click.prevent="closeIntroduce">
        <Icon type="md-close"></Icon>
      </a>
      <Form :model="introduceForm" label-position="left" :label-width="100">
        <FormItem label="注册手机">
          <Input v-model="signinMobile"></Input>
        </FormItem>
        <FormItem v-if="detectionData.status == 1">
          <span>{{detectionData.message}}</span>
          <a @click="createInt" href="javascript:;">立即创建？</a>
        </FormItem>
        <FormItem v-else-if="detectionData.status == 3">
          <span>{{detectionData.message}}</span>
        </FormItem>
        <FormItem v-else-if="detectionData.status == 2">
          <span>{{detectionData.message}}</span>现在
          <a @click="immigration" href="javascript:;">移入？</a>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="detection">检测</Button>
        </FormItem>
      </Form>
    </Card>
    <!-- 交接单 -->
    <Modal
      width="1100"
      v-model="type.classify == 'connect'"
      title="交接单"
      @on-cancel="colseReserved"
      :styles="{'margin-top' : '-70px'}"
    >
      <Form
        v-if="type.classify == 'connect'"
        :model="connectForm"
        label-position="top"
        style="height:500px;overflow-y:auto;"
      >
        <Row>
          <Col span="6">
            <FormItem label="学生姓名" prop="student_name">
              <Input v-model="connectForm.student_name" placeholder="请输入学生姓名" style="width:200px"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="性别" prop="sex">
              <Select v-model="connectForm.sex" style="width:200px">
                <Option :value="1">男</Option>
                <Option :value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="年级" prop="grade">
              <Select v-model="connectForm.grade" style="width:200px">
                <Option :value="1">一年级</Option>
                <Option :value="2">二年级</Option>
                <Option :value="3">三年级</Option>
                <Option :value="4">四年级</Option>
                <Option :value="5">五年级</Option>
                <Option :value="6">六年级</Option>
                <Option :value="7">七年级</Option>
                <Option :value="8">八年级</Option>
                <Option :value="9">九年级</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="住址" prop="reside_province_id">
              <Select
                @on-open-change="getProv"
                v-model="connectForm.reside_province_id"
                style="width:100px"
              >
                <Option :value="list.Id" v-for="(list,i) in provinceList">{{list.Name}}</Option>
              </Select>
              <Select v-model="connectForm.reside_city_id" style="width:100px">
                <Option :value="list.Id" v-for="(list,i) in city">{{list.Name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="注册手机" prop="mobile">
              <Input v-model="connectForm.mobile" placeholder="请输入注册手机" style="width:200px"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="家长联系方式" prop="spare_phone">
              <Input v-model="connectForm.spare_phone" placeholder="请输入家长联系方式" style="width:200px"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="微信号" prop="wechat_id">
              <Input v-model="connectForm.wechat_id" placeholder="请输入微信号" style="width:200px"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="家长微信号" prop="parent_wechat_id">
              <Input
                v-model="connectForm.parent_wechat_id"
                placeholder="请输入家长微信号"
                style="width:200px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="参加高考省份" prop="college_province_id">
              <Select
                @on-open-change="getProv"
                v-model="connectForm.college_province_id"
                style="width:100px"
              >
                <Option :value="list.Id" v-for="(list,i) in provinceList">{{list.Name}}</Option>
              </Select>
              <Select v-model="connectForm.college_city_id" style="width:100px">
                <Option :value="list.Id" v-for="(list,i) in city">{{list.Name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="教材版本" prop="textbook_version">
              <Select v-model="connectForm.textbook_version" style="width:200px">
                <Option :value="i" v-for="(list,i) in book_version">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="是否住校" prop="is_live">
              <Select v-model="connectForm.is_live" style="width:200px">
                <Option :value="1">是</Option>
                <Option :value="2">否</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="其他需求" prop="else_note">
              <Input v-model="connectForm.else_note" placeholder="请输入其他需求" style="width:200px"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="备注" prop="note">
              <Input
                :rows="10"
                type="textarea"
                v-model="connectForm.note"
                placeholder="应包含以下四点内容：

1、学习成绩及班级排名

2、学习家庭负责人及评价

3、学科弱点及偏科类型

4、其他"
              />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem>
              <Button @click="colseReserved" style="margin-left: 8px">取消</Button>
              <Button type="primary" @click="createConnect">确定</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="colseReserved">取消</Button>
        <Button type="primary" size="large" @click="createConnect">确定</Button>-->
      </div>
    </Modal>
    <!-- 移出 -->
    <Modal
      width="300"
      v-model="type.classify == 'remove'"
      title="确定要移出吗?"
      @on-cancel="colseReserved"
      :styles="{'margin-top' : '-70px'}"
    >
      <div>
        <Input v-model="removeNote" type="textarea" :rows="4" placeholder="请备注移出说明" />
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="colseReserved">取消</Button>
        <Button type="primary" size="large" @click="remove">确定</Button>
      </div>
    </Modal>
    <!-- 补款升级 -->
    <Modal
      width="800"
      v-model="type.classify == 'upgrade'"
      title="补款升级"
      @on-cancel="colseReserved"
      :styles="{'margin-top' : '-70px'}"
    >
      <Form
        v-if="type.classify == 'upgrade'"
        :model="upgradeForm"
        label-position="top"
        style="height:400px;overflow-y:auto;"
      >
        <Row>
          <Col span="8">
            <FormItem label="选择课时包">
              <Select
                v-model="upgradeForm.order_sn"
                style="width:150px"
                @on-change="getClass"
                placeholder="课时包"
              >
                <Option :value="i" v-for="(list,i) in accountList">{{list.product_name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <img src="../../assets/upgrade.png" alt />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="升级至">
              <Select
                v-model="upgradeForm.product_id"
                style="width:150px"
                @on-change="getClassAll"
                placeholder="课时包"
              >
                <Option :value="i" v-for="(list,i) in ordersnList">{{list.course_name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem class="tables">
              <ul>
                <li></li>
                <li>课程名称</li>
                <li>课程类型</li>
                <li>收费模式</li>
                <li>课时包等级</li>
                <li>课时总数</li>
                <li>总金额</li>
              </ul>
              <ul v-if="JSON.stringify(classNum) != '{}'">
                <li>升级前</li>
                <li>{{classNum.product_name}}</li>
                <li>一对一</li>
                <li>按课时</li>
                <li>{{classNum.product_level == 1? '中级':'中级' || classNum.product_level == 2? '高级':'高级' || classNum.product_level == 3? '特级':'特级'}}</li>
                <li>{{classNum.total_class_hour + '+' + classNum.give_class_hour}}</li>
                <li>{{classNum.pay_amount}}</li>
              </ul>
              <ul v-if="JSON.stringify(classAll) != '{}'">
                <li>升级后</li>
                <li>{{classAll.course_name}}</li>
                <li>一对一</li>
                <li>按课时</li>
                <li>{{classAll.level}}</li>
                <li>{{(classAll.class_hour + '+' + classAll.give_class_hour) }}</li>
                <li>{{classAll.total_price}}</li>
              </ul>
              <div v-else>暂无数据</div>
            </FormItem>
          </Col>
          <Col
            span="24"
            class="totalprice"
            v-if="JSON.stringify(classNum) != '{}' && JSON.stringify(classAll) != '{}'"
          >
            <p>{{classAll.total_price}}</p>
            <p style="margin:5px 0">{{ '-' + classNum.pay_amount}}</p>
            <div>
              <span>应补总计</span>
              {{classAll.total_price - classNum.pay_amount}}
            </div>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="colseReserved">取消</Button>
        <Button type="primary" size="large" @click="upgrade">确定</Button>
      </div>
    </Modal>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../../uilt/loading/loading";
import storage from "../../uilt/storage";
import axios from "axios";
import { APPRAISAL } from "../../uilt/url/url";
export default {
  props: ["type"],
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["notifiDatas"]),
    ...mapState({
      orderList: state => state.mineclient.clientData,
      currentPage: state => state.mineclient.clientCurrentpage,
      pageSize: state => state.mineclient.clientPagesize,
      total: state => state.mineclient.clientTotal,
      auditionTotal: state => state.mineclient.auditionTotal,
      auditionCurrentPage: state => state.mineclient.auditionCurrentPage,
      auditionPageSize: state => state.mineclient.auditionPageSize,
      auditionData: state => state.mineclient.auditionData,
      notifiTotal: state => state.mineclient.notifiTotal,
      notifiCurrentPage: state => state.mineclient.notifiCurrentPage,
      notifiPageSize: state => state.mineclient.notifiPageSize,
      notifiData: state => state.mineclient.notifiData,
      provinceList: state => state.mineclient.provinceList,
      city: state => state.mineclient.city,
      accountList: state => state.studentpay.accountList,
      ordersnList: state => state.studentpay.ordersnList
    })
  },
  mounted() {
    if (this.type.classify == "connect") {
      this.connectForm.account_id = this.type.data.id;
      this.connectForm.student_name = this.type.data.student_name;
      this.connectForm.sex = this.type.data.sex;
      this.connectForm.grade = this.type.data.grade;
      this.connectForm.reside_province_id = this.type.data.reside_province_id;
      this.connectForm.reside_city_id = this.type.data.reside_city_id;
      this.connectForm.wechat_id = this.type.data.wechat_id;
      this.connectForm.spare_phone = this.type.data.spare_phone;
      this.connectForm.parent_wechat_id = this.type.data.parent_wechat_id;
      this.connectForm.college_province_id = this.type.data.college_province_id;
      this.connectForm.college_city_id = this.type.data.college_city_id;
      this.connectForm.textbook_version = this.type.data.textbook_version;
      this.connectForm.is_live = this.type.data.is_live;
      this.connectForm.else_note = this.type.data.else_note;
      this.connectForm.note = this.type.data.note;
    }
    if (this.type.classify == "order") {
      this.showLoading = true;
      this.getClientType(...this.form).then(() => {
        this.showLoading = false;
      });
    } else if (this.type.classify == "audition") {
      this.showLoading = true;
      this.getUserReservedList({ page: 1, uid: this.type.data.id }).then(() => {
        this.showLoading = false;
      });
    }
  },
  data() {
    return {
      vaersion:storage.getDaiban().screen_list.book_version,
      upgradeColumns: [
        { title: "购买课程名称", key: "course_name", width: 200 },
        {
          title: "课程类型",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "一对一"
            );
          }
        },
        {
          title: "收费形式",
          // key: "wechat_nick_name",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "按课时"
            );
          }
        },
        // { title: "收费模式", key: "class_hour" },
        {
          title: "科目",
          // key: "give_class_hour",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "全科"
            );
          }
        }
      ],
      upgradeList: [],
      upgradeForm: {},
      showTableLoading: false,
      disableBtn: false,
      removeNote: "",
      isDisable: false,
      price: 0,
      book_version: storage.getDaiban().screen_list.book_version,
      myreg: /^[1][3,4,5,7,8,6,9][0-9]{9}$/,
      detectionData: "",
      connectForm: {
        account_id: "",
        student_name: "",
        sex: "",
        grade: "",
        reside_province_id: "",
        reside_city_id: "",
        wechat_id: "",
        spare_phone: "",
        parent_wechat_id: "",
        college_province_id: "",
        college_city_id: "",
        textbook_version: "",
        is_live: "",
        else_note: "",
        note: ""
      },
      showConnect: false,
      subject: storage.getDaiban().screen_list.subject,
      orderPay: [],
      orderColumns: [
        { title: "购买课程名称", key: "course_name", width: 200 },
        {
          title: "课程类型",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "一对一"
            );
          }
        },
        {
          title: "收费形式",
          // key: "wechat_nick_name",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "按课时"
            );
          }
        },
        // { title: "收费模式", key: "class_hour" },
        {
          title: "科目",
          // key: "give_class_hour",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "全科"
            );
          }
        }
      ],
      items: {
        title: "一对一"
      },
      orderForm: {
        goods_num: 1
      },
      showOrder: false,
      introduceForm: {},
      signinMobile: "",
      callOffItem: {},
      callOffForm: {},
      showcallOff: false,
      appraisalItem: {},
      showAppraisal: false,
      uploadList: [],
      imgName: "",
      visible: false,
      appraisalForm: {},
      signinItem: {},
      signinForm: {},
      showSignin: false,
      time: "",
      teachersV: [],
      showTimeBlock: false,
      acArr: [],
      setActive: 0,
      num: 48,
      subject: storage.getDaiban().screen_list.subject,
      createAuditionForm: {},
      showCreateAudition: false,
      Acolumns: [
        { title: "试听类型", key: "type" },
        { title: "试听课程", key: "course_name" },
        { title: "教师", key: "coach_id" },
        { title: "试听课日期", key: "date_time" },
        { title: "试听课时段", key: "time_block" },
        { title: "状态", key: "appoint_status" },
        { title: "创建人", key: "create_user" },
        { title: "创建时间", key: "create_time" },
        { title: "备注", key: "note", tooltip: true, ellipsis: true },
        {
          title: "操作",
          key: "action",
          align: "center",
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
                      this.signin(params.row);
                    }
                  }
                },
                "签到"
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
                      this.appraisal(params.row);
                    }
                  }
                },
                "查看测评"
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
                      this.subscribe(params.row);
                    }
                  }
                },
                "取消预约"
              )
            ]);
          }
        }
      ],
      checkall: "",
      showLoading: false,
      columns: [
        { type: "selection", width: 60 },
        { title: "课程名称", key: "course_name", width: 230 },
        {
          title: "课程类型",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "一对一"
            );
          }
        },
        {
          title: "收费模式",
          key: "wechat_nick_name",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "#333"
                }
              },
              "按课时"
            );
          }
        },
        { title: "课时包等级", key: "level" },
        { title: "课时数", key: "class_hour" },
        { title: "赠送课时", key: "give_class_hour" },
        { title: "售价", key: "sale_price" },
        { title: "活动价", key: "activity_price" },
        { title: "课时总金额", key: "total_price", width: 120 }
      ],
      form: {},
      classNum: {},
      classAll: {}
    };
  },
  methods: {
    ...mapMutations(["setClientCurrentpage", "setNotifiCurrentPage"]),
    ...mapActions([
      "createUpOrder",
      "getCity",
      "handover",
      "createOrderList",
      "introduceImmigration",
      "createIntroduce",
      "detectionMobile",
      "getIntroduce",
      "getProvince",
      "getYuQiList",
      "getFollowUpList",
      "getStudentList",
      "getClientList",
      "getXinfenList",
      "setSignin",
      "setTimeBlock",
      "getClientType",
      "getUserReservedList",
      "createdReserved",
      "getTeacherListN",
      "removeMineclient"
    ]),
    getClass(num) {
      this.classNum = this.accountList[num];
    },
    getClassAll(num) {
      this.classAll = this.ordersnList[num];
    },
    //补款升级
    upgrade() {
      var page = this.type.page;
      if (
        JSON.stringify(this.classNum) != "{}" &&
        JSON.stringify(this.classAll) != "{}"
      ) {
        this.upgradeForm.order_sn = this.classNum.order_sn;
        this.upgradeForm.product_id = this.classAll.id;
      }
      this.upgradeForm.account_id = this.type.data.id;
      this.createUpOrder(this.upgradeForm).then(res => {
        if (!res.data.ret) {
          this.$Message.error(res.data.error);
          this.$parent.showMine = false;
          this.getStudentList({ form:this.type.form, page });
          return;
        }
        if (res.data.ret) {
          this.$Message.success("订单升级成功");
          this.$parent.showMine = false;
          this.getStudentList({ form:this.type.form, page });
        }
      });
    },
    //移出
    remove() {
      if (!this.removeNote) {
        this.$Message.error("请填写移出说明");
        return;
      }
      this.isLoading = true;
      this.removeMineclient({
        uid: this.type.data.id,
        note: this.removeNote
      }).then(res => {
        if (res.data.ret) {
          this.$Message.success("移出成功");
        }
        this.colseReserved();
        this.isLoading = false;
      });
    },
    //重置交接单form表单
    handleReset(name) {
      this.$refs[name].resetFields();
      // this.colseReserved();
    },
    //转介绍/移入
    immigration() {
      this.isLoading = true;
      this.introduceImmigration(this.detectionData.account_id).then(res => {
        this.isLoading = false;
      });
    },
    //创建转介绍
    createInt() {
      var uid = "";
      this.isLoading = true;
      if (this.type.data) {
        uid = this.type.data.id;
      } else {
        uid = "";
      }
      this.createIntroduce({
        mobile: this.signinMobile,
        uid
      }).then(res => {
        if (res.data.ret) {
          this.$Message.success("创建成功");
          this.colseReserved();
        }
        this.isLoading = false;
      });
    },
    //省
    getProv() {
      this.getProvince().then(res => {
        if (res.data.ret) {
          this.getCity(this.connectForm.reside_province_id);
        }
      });
    },
    //创建交接单
    createConnect(name) {
      if (this.type.data.product_type == "一对一") {
        if (!this.connectForm.student_name) {
          this.$Message.error("学生姓名不能为空");
          return;
        } else if (!this.connectForm.sex) {
          this.$Message.error("性别不能为空");
          return;
        } else if (!this.connectForm.grade) {
          this.$Message.error("年级不能为空");
          return;
        } else if (!this.connectForm.reside_province_id) {
          this.$Message.error("住址省不能为空");
          return;
        } else if (!this.connectForm.reside_city_id) {
          this.$Message.error("住址市不能为空");
          return;
        } else if (!this.connectForm.wechat_id) {
          this.$Message.error("微信号不能为空");
          return;
        } else if (!this.connectForm.spare_phone) {
          this.$Message.error("家长联系方式不能为空");
          return;
        } else if (!this.connectForm.parent_wechat_id) {
          this.$Message.error("家长微信不能为空");
          return;
        } else if (!this.connectForm.college_province_id) {
          this.$Message.error("高考省不能为空");
          return;
        } else if (!this.connectForm.college_city_id) {
          this.$Message.error("高考市不能为空");
          return;
        } else if (!this.connectForm.textbook_version) {
          this.$Message.error("教材版本不能为空");
          return;
        } else if (!this.connectForm.is_live) {
          this.$Message.error("是否住校不能为空");
          return;
        } else if (!this.connectForm.else_note) {
          this.$Message.error("其他需求不能为空");
          return;
        } else if (!this.connectForm.note) {
          this.$Message.error("学员备注不能为空");
          return;
        }
      } else {
        if (!this.connectForm.student_name) {
          this.$Message.error("学生姓名不能为空");
          return;
        } else if (!this.connectForm.sex) {
          this.$Message.error("性别不能为空");
          return;
        } else if (!this.connectForm.grade) {
          this.$Message.error("年级不能为空");
          return;
        } else if (!this.connectForm.reside_province_id) {
          this.$Message.error("住址省不能为空");
          return;
        } else if (!this.connectForm.reside_city_id) {
          this.$Message.error("住址市不能为空");
          return;
        } else if (!this.connectForm.wechat_id) {
          this.$Message.error("微信号不能为空");
          return;
        }
      }
      this.isLoading = true;
      this.handover(this.connectForm).then(res => {
        if (res.data.ret) {
          this.$Message.success("创建成功");
          this.connectForm = {};
        } else {
          this.$Message.error(res.data.error);
        }
        this.$parent.showMine = false;
        this.isLoading = false;
      });
    },
    //计算总价
    setTotalPrice(num) {
      this.price =
        this.orderForm.total_price * num.target.valueAsNumber + ".00";
      if (num.target.valueAsNumber < 1) {
        this.orderForm.goods_num = 1;
        this.price = this.orderForm.total_price;
      }
    },
    //创建订单
    createOrders() {
      this.disableBtn = true;
      this.isLoading = true;
      this.createOrderList({
        aid: this.type.data.id,
        pid: this.orderPay[0].id,
        num: this.orderForm.goods_num
      }).then(res => {
        if (res.data.ret) {
          this.$Message.success("创建成功");
        }
        this.showOrder = false;
        this.isLoading = false;
        this.price = "";
        this.disableBtn = false;
        this.$parent.showMine = false;
      });
    },
    //检测
    detection() {
      if (!this.myreg.test(this.signinMobile)) {
        this.$Message.error("请填写正确的手机号码");
        return;
      }
      this.isLoading = true;
      this.detectionMobile(this.signinMobile).then(res => {
        this.detectionData = res.data.data;
        this.isLoading = false;
      });
    },
    //关闭转介绍
    closeIntroduce() {
      this.colseReserved();
    },
    //取消预约
    callOffOk() {
      this.setSignin({ uid: [this.callOffItem.id], status: 4 }).then(res => {
        if (res.data.ret) {
          this.$Message.success("预约取消成功");
          this.isLoading = true;
          this.getUserReservedList({
            page: 1,
            uid: this.type.data.id
          }).then(res => {});
        } else {
          this.$Message.success(res.data.error);
        }
        this.callOffForm = {};
        this.showcallOff = false;
        this.isLoading = false;
      });
    },
    //查看测评
    appraisalOk() {
      this.isLoading = true;
      var formData = new FormData();
      formData.append("assess_image", this.uploadList[0]);
      formData.append("visit_content", this.appraisalForm.visit_content);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + storage.get()
        }
      };
      axios
        .post(APPRAISAL + "/" + this.appraisalItem.id, formData, config)
        .then(response => {
          if (response.data.code == 100001 && response.data.error) {
            this.$Message.error(response.data.error);
          }
          if (response.data.code == 200 && response.data.ret == true) {
            this.$Message.success("新增测评成功");
            this.getUserReservedList({
              page: 1,
              uid: this.type.data.id
            }).then(res => {});
            this.showAppraisal = false;
          }
          this.appraisalForm = {};
          this.isLoading = false;
        });
    },
    //预览图片
    handleView() {
      if (this.isUpdata) {
        this.imgName = item;
      } else {
        this.imgName = this.uploadList.url;
      }
      this.visible = true;
    },
    //删除预览图片
    handleRemove(file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    //限制图片大小
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过档案大小限制",
        desc: "文件 " + file.name + "太大了，不超过2M。"
      });
    },
    //限制图片格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件" + file.name + "格式不正确，请选择jpg或png。"
      });
    },
    //上传图片
    handleBeforeUpload(file) {
      const check = this.uploadList.length;
      if (check >= 1) {
        this.$Message.error("最多只能上传1张图片");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList.push(file);
      };
    },
    //签到
    signinOk() {
      this.setSignin({
        uid: [this.signinItem.id],
        status: this.signinForm.type
      }).then(res => {
        if (res.data.ret) {
          this.$Message.success("签到成功");
          this.isLoading = true;
          this.getUserReservedList({
            page: 1,
            uid: this.type.data.id
          }).then(res => {});
        } else {
          this.$Message.success(res.data.error);
        }
        this.isLoading = false;
        this.showSignin = false;
        this.signinForm = {};
      });
    },
    //获取预约单老师列表
    getTeachers() {
      this.teachersV.length = 0;
      var form = {};
      this.createAuditionForm.date_time = this.datePicker(
        this.createAuditionForm.date_time
      );
      this.createAuditionForm.time_block = this.acArr[0];
      form.subject = this.createAuditionForm.subject;
      form.grade = this.createAuditionForm.grade;
      form.time_block = this.createAuditionForm.time_block;
      form.date_time = this.createAuditionForm.date_time;
      form.type = this.createAuditionForm.type;
      if (
        this.createAuditionForm.subject &&
        this.createAuditionForm.grade &&
        this.createAuditionForm.time_block &&
        this.createAuditionForm.date_time &&
        this.createAuditionForm.type
      ) {
        this.getTeacherListN(form).then(res => {
          if (!res.data.ret) {
            this.$Message.error(res.data.error);
            return;
          }
          if (res.data.data.length == 0) {
            this.$Message.error("暂无老师");
            this.getUserReservedList({ page: 1, uid: this.type.data.id });
          } else {
            this.teachersV = res.data.data;
          }
        });
      }
    },
    //点击时间块失去光标
    loseFocus() {
      this.showTimeBlock = false;
      this.createAuditionForm.time_block = this.acArr;
    },
    //点击时间块获取焦点
    getFocus() {
      this.showTimeBlock = true;
    },
    //获取当前时间块
    getNum(num, e) {
      var arr = this.acArr;
      e.path[0].className = "active";
      if (arr.indexOf(num) > -1) {
        arr.splice(arr.indexOf(num), 1);
        e.path[0].className = " ";
      } else {
        if (arr.length > 0) {
          this.$Message.error("只可选择一个时间段");
          e.path[0].className = " ";
        } else {
          arr.push(num);
          this.showLoading = true;
          this.setTimeBlock(num).then(res => {
            this.time = res.data;
            this.showLoading = false;
          });
        }
      }
    },
    //创建订单
    createorder() {
      if (this.orderPay.length == 0) {
        this.$Message.error("未选择课程");
        return;
      } else if (this.orderPay.length > 1) {
        this.$Message.error("只可选择一条");
        return;
      }
      this.showOrder = true;
      this.orderForm.goods_num = 1;
    },
    //取消预约
    subscribe(item) {
      this.showcallOff = true;
      this.callOffItem = item;
    },
    //查看测评
    appraisal(item) {
      this.showAppraisal = true;
      this.appraisalItem = item;
    },
    //新建预约/签到
    signin(item) {
      this.showSignin = true;
      this.signinItem = item;
    },
    //预约试听
    audition() {},
    //关闭预约试听
    colseReserved() {
      this.$parent.showMine = false;
      if (this.type.status == "notvisit") {
        this.getXinfenList({ form: this.type.form, page: this.type.page });
        return;
      } else if (this.type.status == "mineclient") {
        this.getClientList({ form: this.type.form, page: this.type.page });
        return;
      } else if (this.type.status == "studentpay") {
        this.getStudentList({ form: this.type.form, page: this.type.page });
        return;
      } else if (this.type.status == "followup") {
        this.getFollowUpList({ form: this.type.form, page: this.type.page });
        return;
      } else if (this.type.status == "notcallback") {
        this.getYuQiList({ form: this.type.form, page: this.type.page });
        return;
      }
    },
    //清空新建预约表单
    clearForm() {
      this.showCreateAudition = false;
      this.createAuditionForm = {};
    },
    //新建预约
    createAuditionOk() {
      if (!this.createAuditionForm.type) {
        this.$Message.error("预约试听类型不能为空");
        return;
      } else if (!this.createAuditionForm.course_name) {
        this.$Message.error("预约课程不能为空");
        return;
      } else if (!this.createAuditionForm.grade) {
        this.$Message.error("年级不能为空");
        return;
      } else if (!this.createAuditionForm.subject) {
        this.$Message.error("科目不能为空");
        return;
      } else if (!this.createAuditionForm.date_time) {
        this.$Message.error("试听课日期不能为空");
        return;
      } else if (!this.createAuditionForm.time_block) {
        this.$Message.error("试听课时段不能为空");
        return;
      } else if (!this.createAuditionForm.coach_id) {
        this.$Message.error("教师选项不能为空");
        return;
      } else if (!this.createAuditionForm.note) {
        this.$Message.error("备注不能为空");
        return;
      }
      this.showLoading = true;
      this.disableBtn = true;
      this.createAuditionForm.date_time = this.datePicker(
        this.createAuditionForm.date_time
      );
      this.createdReserved({
        form: this.createAuditionForm,
        uid: this.type.data.id
      }).then(res => {
        if (res.data.ret) {
          this.$Message.success("新建预约成功");
          this.getUserReservedList({ page: 1, uid: this.type.data.id });
          this.clearForm();
        } else {
          this.$Message.error(res.error);
        }
        this.showLoading = false;
        this.time = "";
        this.disableBtn = false;
      });
    },
    //新建预约
    createAudition() {
      this.showCreateAudition = true;
    },
    //预约试听分页
    auditionPageChange(num) {
      this.isLoading = true;
      this.setNotifiCurrentPage(num);
      this.getUserReservedList({ page: num, uid: this.type.data.id }).then(
        res => {
          this.isLoading = false;
          this.setNotifiCurrentPage(num);
        }
      );
    },
    //分页
    pageChange(num) {
      this.showTableLoading = true;
      this.setClientCurrentpage(num);
      this.getClientType({ ...this.form }).then(() => {
        this.showTableLoading = false;
      });
    },
    //预约试听表格多选按钮
    auditionSelectionChange() {},
    //表格多选按钮
    selectionChange(item) {
      if (item.length != 0) {
        this.orderForm = item[0];
      } else {
        this.orderForm = {};
      }
      this.orderPay = item;
      this.price = "";
    },
    //查询条件
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setClientCurrentpage(page);
      }
      this.showTableLoading = true;
      this.getClientType({ ...this.form, page }).then(res => {
        this.showTableLoading = false;
        this.setClientCurrentpage(page);
      });
    },
    //清空查询条件
    clear() {
      this.form = {};
      this.orderPay.length = 0;
      this.seekClick();
    },
    //设置返回的时间
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    }
  }
};
</script>

<style scoped>
.totalprice > div span {
  margin-right: 30px;
}
.totalprice {
  text-align: right;
}
.tables div {
  height: 30px;
  line-height: 30px;
  color: #333;
  text-align: center;
  border: 1px solid #ccc;
}
.tables ul li {
  flex: 1;
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: center;
  color: #333;
}
.tables ul {
  display: flex;
}
.procued-footer div {
  flex: 1;
  text-align: right;
}
.procued-footer {
  display: flex;
  border-top: 1px solid #ccc;
  align-items: center;
}
.procued-content .type {
  display: flex;
}
.procude-top i {
  flex: 1;
  font-size: 20px;
  cursor: pointer;
  text-align: right;
}
.procude-top {
  display: flex;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.procude {
  background-color: rgba(242, 242, 242, 1);
  padding: 10px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.dateplc {
  display: flex;
}
/* 时间块 */
.content-right-footer li.active {
  background-color: #2d8cf0;
}
.content-right-footer {
  display: flex;
  flex-wrap: wrap;
}
.content-right-header li.disable,
.content-right-footer li.disable {
  display: none;
}
.content-right-header li,
.content-right-footer li {
  width: 136px;
  padding: 3px 0;
  box-sizing: content-box;
  border: 1px solid #989898;
  margin-left: -1px;
  margin-top: -1px;
  text-align: center;
  cursor: pointer;
  height: 20.8px;
}
.content-right-header {
  height: 27px;
  background-color: #ccc;
  text-align: center;
  color: #333;
  display: flex;
  margin-bottom: 1px;
}
.content .content-right {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.content .content-left ul li {
  background-color: #ccc;
  text-align: center;
  color: #333;
  border: 1px solid #989898;
  margin-top: -1px;
  padding: 3px;
}
.content .content-left {
  width: 120px;
}
.content {
  display: flex;
}
/* 时间块 */
.order-title {
  display: inline-block;
  width: 5px;
  height: 10px;
  background-color: rgba(204, 204, 204, 1);
}
.boxs {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>