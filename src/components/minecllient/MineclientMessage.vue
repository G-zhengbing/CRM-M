<template>
  <div class="boxs">
    <!-- 选择课程 -->
    <Modal
      width="1400"
      v-model="type.classify == 'order'"
      title="选择课程"
      @on-cancel="colseReserved"
      :closable="false"
      :mask-closable="false"
    >
      <Form :model="form" label-position="top" style="height:450px;overflow-y:auto;">
        <Row class-name="exclusive">
          <Col span="4">
            <FormItem>
              <Select v-model="form.grade" @on-change="seekClick" placeholder="年级">
                <Option :value="list.id" v-for="(list,i) in contant.SMALL_GRADE" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Select v-model="form.level" @on-change="seekClick" placeholder="课时包等级">
                <Option :value="list.id" v-for="(list,i) in contant.CLASS" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Select v-model="form.class_hour" @on-change="seekClick" placeholder="课时数">
                <Option :value="list.id" v-for="(list,i) in contant.COURSE_NUMBER" :key="i">{{list.title}}</Option>
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
    <!-- 创建订单 -->
    <Modal width="700" v-model="showOrder" title="创建订单" @on-cancel="showOrder = false">
      <Form :form="orderForm" label-position="left" style="height:450px;overflow-y:auto;">
        <FormItem label="基本信息"></FormItem>
        <div class="procude">
          <div class="procude-top">
            <span>{{items.title}}</span>
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
        <Table border :columns="orderColumns" :data="orderPay"></Table>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showOrder = false">取消</Button>
        <Button :loading="disableBtn" type="primary" size="large" @click="createOrders">确定</Button>
      </div>
    </Modal>
    <!-- 预约试听 -->
    <Modal
      width="1200"
      v-model="type.classify == 'audition'"
      title="预约试听"
      @on-cancel="colseReserved"
    >
      <Button type="primary" size="large" @click="createAudition">新建预约</Button>
      <Form label-position="top" style="height:500px;overflow-y:auto;">
        <Table
          border
          :columns="Acolumns"
          :data="notifiDatas"
          @on-selection-change="auditionSelectionChange"
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
      </div>
    </Modal>
    <!-- 新建预约试听 -->
    <Modal width="700" v-model="showCreateAudition" title="新建预约试听" @on-cancel="clearForm">
      <Form :form="createAuditionForm" label-position="top" style="height:500px;overflow-y:auto;">
        <Row class-name="exclusive">
          <Col span="24">
            <FormItem label="预约试听类型">
              <RadioGroup v-model="createAuditionForm.type">
                <Radio :label="4">一对一</Radio>
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
                <Option :value="list.id" v-for="(list,i) in contant.GRADE" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="教材版本">
              <Select v-model="createAuditionForm.textbook_version" placeholder="教材版本">
                <Option v-for="(list,i) in vaersion" :value="i*1" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="科目">
              <Select v-model="createAuditionForm.subject">
                <Option :value="i" v-for="(list,i) in subject" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="试听课日期">
              <DatePicker
                v-model="auditionTimes"
                @on-change="auditionTime"
                type="date"
                placeholder="选择日期"
                style="width: 300px"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="试听课时段">
              <TimePicker
                @on-change="getStartTime()"
                v-model="createAuditionForm.start_time"
                format="HH:mm"
                placeholder="开始时间"
                style="width: 112px;margin-right:15px"
              ></TimePicker>
              <TimePicker
                v-model="createAuditionForm.end_time"
                format="HH:mm"
                placeholder="结束时间"
                style="width: 112px"
              ></TimePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="老师">
              <span
                v-if="selectTeacherList.length == 0"
                class="select-teacher"
                @click="getTeachers"
              >选择老师</span>
              <Tag
                v-if="selectTeacherList.length != 0"
                type="border"
                closable
                :color="tagColor"
                @on-close="closetag"
              >{{selectTeacherList[0].name}}</Tag>
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
    <!-- 选择老师 -->
    <Modal width="1200" v-model="showSelectTeacher" title="选择老师" @on-cancel="closeSelectTeacher">
      <Form label-position="top" style="height:520px;overflow-y:auto;">
        <Row class-name="exclusive">
          <Col span="4">
            <FormItem>
              <Input
                v-model="selectTeacherListForm.name"
                placeholder="教师姓名"
                @on-change="seekSelectForm"
              ></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <Input
                v-model="selectTeacherListForm.mobile"
                placeholder="手机号"
                @on-change="seekMobile"
              ></Input>
            </FormItem>
          </Col>
          <Col span="2">
            <Button type="primary" @click="clearSelectTeacher">清除</Button>
          </Col>
        </Row>
        <Table
          :loading="showAuditionloading"
          border
          :columns="selectTeacherColumns"
          :data="teachersV"
          @on-selection-change="selectTeacherSelectionChange"
        ></Table>
        <Page
          @on-change="selectTeacherPageChange"
          :total="selectTeacherTotal"
          :current="selectTeacherCurrentPage"
          :page-size="selectTeacherPageSize"
          show-total
          show-elevator
          class="ive-page"
        />
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="closeSelectTeacher">取消</Button>
        <Button type="primary" size="large" @click="selectTeacher">确定</Button>
      </div>
    </Modal>
    <!-- 教师详情 -->
    <Modal
      width="1200"
      v-model="showTeacherDetails"
      title="教师详情"
      @on-cancel="showTeacherDetails = false"
    >
      <Form :form="teacherDetailsForm" label-position="top" style="height:520px;overflow-y:auto;">
        <Row class-name="exclusive">
          <Col span="24">
            <FormItem label="教师视频简介">
              <Button type="text" @click="goTeacherVideo">查看视频</Button>
            </FormItem>
            <FormItem label="教师资料简介">
              <Input
                readonly
                v-model="teacherDetailsForm.teacher_userinfo_desc"
                type="textarea"
                :autosize="{minRows: 5,maxRows: 8}"
                placeholder="暂无..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showTeacherDetails = false">取消</Button>
      </div>
    </Modal>
    <!--  -->
    <!-- 查看测评 -->
    <Modal width="500" v-model="showAppraisal" title="查看测评" @on-cancel="showAppraisal = false">
      <Form :form="appraisalForm" label-position="top" style="height:300px;overflow-y:auto;">
        <FormItem label="测评图片展示" v-if="this.appraisalForm.assess_image">
          <div class="demo-upload-list">
            <img :src="'http://liveapi.canpoint.net/'+ appraisalForm.assess_image" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleView('http://liveapi.canpoint.net/'+appraisalForm.assess_image)"
              ></Icon>
            </div>
          </div>
          <Modal title="预览图" v-model="visible">
            <img :src="imgName" style="width: 100%" />
          </Modal>
        </FormItem>
        <FormItem label="测评上传" prop="avatar" class="active_span">
          <template>
            <div class="demo-upload-list" v-for="(item,i) in uploadList" :key="i">
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
    <Modal width="300" v-model="showcallOff" title="取消预约" @on-cancel="showcallOff = false">
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
      <p slot="title" v-if="type.types == 'createduser'">创建用户</p>
      <p slot="title" v-else>转介绍</p>
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
    <Modal width="1100" v-model="type.classify == 'connect'" title="交接单" @on-cancel="colseReserved">
      <Form
        v-if="type.classify == 'connect'"
        :model="connectForm"
        label-position="top"
        style="height:500px;overflow-y:auto;"
      >
        <Row class-name="exclusive">
          <Col span="4">
            <FormItem label="学生姓名" prop="student_name">
              <Input v-model="connectForm.student_name" placeholder="请输入学生姓名"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="性别" prop="sex">
              <Select v-model="connectForm.sex">
                <Option :value="list.id" v-for="(list,i) in contant.GENDER" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="年级" prop="grade">
              <Select v-model="connectForm.grade">
                <Option :value="list.id" v-for="(list,i) in contant.GRADE" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="4">
            <FormItem label="注册手机" prop="mobile">
              <Input v-model="connectForm.mobile" placeholder="请输入注册手机"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="家长联系方式" prop="spare_phone">
              <Input v-model="connectForm.spare_phone" placeholder="请输入家长联系方式"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="微信号" prop="wechat_id">
              <Input v-model="connectForm.wechat_id" placeholder="请输入微信号"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="家长微信号" prop="parent_wechat_id">
              <Input v-model="connectForm.parent_wechat_id" placeholder="请输入家长微信号"></Input>
            </FormItem>
          </Col>

          <Col span="4">
            <FormItem label="教材版本" prop="textbook_version">
              <Select v-model="connectForm.textbook_version">
                <Option :value="i" v-for="(list,i) in book_version" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="是否住校" prop="is_live">
              <Select v-model="connectForm.is_live">
                <Option :value="list.id" v-for="(list,i) in contant.IS_LIVE" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="其他需求" prop="else_note">
              <Input v-model="connectForm.else_note" placeholder="请输入其他需求"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="住址" prop="reside_province_id">
              <Select
                @on-open-change="getProv"
                v-model="connectForm.reside_province_id"
                style="width:100px"
              >
                <Option :value="list.Id" v-for="(list,i) in provinceList" :key="i">{{list.Name}}</Option>
              </Select>
              <Select v-model="connectForm.reside_city_id" style="width:100px">
                <Option :value="list.Id" v-for="(list,i) in city" :key="i">{{list.Name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="参加高考省份" prop="college_province_id">
              <Select
                @on-open-change="getProv"
                v-model="connectForm.college_province_id"
                style="width:100px"
              >
                <Option :value="list.Id" v-for="(list,i) in provinceList" :key="i">{{list.Name}}</Option>
              </Select>
              <Select v-model="connectForm.college_city_id" style="width:100px">
                <Option :value="list.Id" v-for="(list,i) in city" :key="i">{{list.Name}}</Option>
              </Select>
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
      <div slot="footer"></div>
    </Modal>
    <!-- 移出 -->
    <Modal
      width="500"
      v-model="type.classify == 'remove'"
      title="确定要移出吗?"
      @on-cancel="colseReserved"
    >
      <div v-if="type.classify == 'remove'">
        <Input
          readonly
          v-model="type.data.last_visit_content"
          type="textarea"
          :rows="8"
          placeholder="最后一次跟进内容"
        />
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="colseReserved">取消</Button>
        <Button type="primary" size="large" @click="remove">确定</Button>
      </div>
    </Modal>
    <!-- 补款升级 -->
    <Modal width="800" v-model="type.classify == 'upgrade'" title="补款升级" @on-cancel="colseReserved">
      <Form
        v-if="type.classify == 'upgrade'"
        :model="upgradeForm"
        label-position="top"
        style="height:400px;overflow-y:auto;"
      >
        <Row class-name="exclusive">
          <Col span="6">
            <FormItem label="选择课时包">
              <Select v-model="upgradeForm.order_sn" @on-change="getClass" placeholder="课时包">
                <Option :value="i" v-for="(list,i) in accountList" :key="i">{{list.product_name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem>
              <img src="../../assets/upgrade.png" alt />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="升级至">
              <Select
                v-if="ordersnList.length != 0"
                v-model="upgradeForm.product_id"
                @on-change="getClassAll"
                placeholder="课时包"
              >
                <Option :value="i" v-for="(list,i) in ordersnList" :key="i">{{list.level}} - {{list.course_name}}  ( ￥{{list.total_price}} )</Option>
              </Select>
              <Select v-else placeholder="课时包"></Select>
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
                <li
                  v-if="classNum.give_class_hour"
                >{{classNum.total_class_hour + '+' + classNum.give_class_hour}}</li>
                <li v-else>{{classNum.total_class_hour}}</li>
                <li>{{classNum.pay_amount}}</li>
              </ul>
              <ul v-if="JSON.stringify(classAll) != '{}'">
                <li>升级后</li>
                <li>{{classAll.course_name}}</li>
                <li>一对一</li>
                <li>按课时</li>
                <li>{{classAll.level}}</li>
                <li
                  v-if="classAll.give_class_hour"
                >{{(classAll.class_hour + '+' + classAll.give_class_hour) }}</li>
                <li v-else>{{classAll.class_hour}}</li>
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
import color from "../../uilt/hexadecimalColor/index";
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
  destroyed() {
    this.$parent.type.classify = "followUp";
  },
  data() {
    return {
      // 教师详情
      imgName: "",
      visible: false,
      teacherDetailsForm: {},
      showTeacherDetails: false,
      // 教师详情
      // <选择老师>
      selectTeacherListForm: {},
      tagColor: "",
      selectTeacherList: [],
      selectTeacherPageSize: 10,
      selectTeacherCurrentPage: 1,
      selectTeacherTotal: 0,
      showSelectTeacher: false,
      selectTeacherColumns: [
        { type: "selection", width: 60 },
        { title: "教师姓名", key: "name", width: 100 },
        {
          title: "手机号",
          key: "mobile",
          width: 130,
          render: (h, params) => {
            return h("div", [h("span", this.setMobile(params.row.mobile))]);
          }
        },
        {
          title: "性别",
          key: "sex",
          render: (h, params) => {
            return h("div", [h("span", params.row.sex == 1 ? "男" : "女")]);
          }
        },
        { title: "教授年级", key: "grade_ch", width: 300 },
        { title: "教授科目", key: "subject", width: 100 },
        {
          title: "教师简介",
          key: "teacher_userinfo_desc",
          width: 200,
          tooltip: true,
          ellipsis: true
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled: params.row.teacher_userinfo_video ? false : true
                  },
                  on: {
                    click: () => {
                      this.teacherDetails(params.row);
                    }
                  }
                },
                "视频简介"
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
                      this.callOut(params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
      ],
      showAuditionloading: false,
      // </选择老师>
      auditionTimes: "",
      isUpdata: false,
      vaersion: storage.getDaiban().screen_list.book_version,
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
        {
          title: "科目",
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
        {
          title: "科目",
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
      time: "",
      teachersV: [],
      setActive: 0,
      num: 48,
      subject: storage.getDaiban().screen_list.subject,
      createAuditionForm: {
        type:4
      },
      showCreateAudition: false,
      Acolumns: [
        { title: "试听课程", key: "course_name", width: 160 ,fixed:'left'},
        { title: "年级/科目", key: "grade_subject", width: 160 ,fixed:'left'},
        { title: "上课日期", key: "date_time", width: 160 },
        { title: "教师", key: "coach_id", width: 160 },
        { title: "状态", key: "appoint_status" , width: 160 },
        { title: "创建人", key: "create_user"  , width: 160},
        { title: "创建时间", key: "create_time", width: 200 },
        { title: "备注", key: "note", tooltip: true, ellipsis: true  , width: 160},
        {
          title: "回放地址",
          key: "coach_name",
          width: 150,
          fixed:'right',
          render: (h, params) => {
            if (
              params.row.appoint_status == "上课中" ||
              params.row.appoint_status == "已结束"
            ) {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      props: {
                        type: "text",
                        size: "small"
                      },
                      click: () => {
                        this.goBank(params.row);
                      }
                    },
                    style: {
                      width: "fit-content",
                      cursor: "pointer",
                      color: "#2d8cf0"
                    },
                    class: "clickable"
                  },
                  "直播/回放"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    style: {
                      width: "100%",
                      display: "inline-block",
                      cursor: "pointer",
                      color: "#ccc"
                    }
                  },
                  "直播/回放"
                )
              ]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
          fixed:'right',
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
                    size: "small",
                    disabled:
                      params.row.appoint_status == "已取消" ||
                      params.row.appoint_status == "已上课" ||
                      params.row.appoint_status == "缺席"
                        ? true
                        : false
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
    ...mapMutations([
      "setClientCurrentpage",
      "setNotifiCurrentPage",
      "setOrdersnList"
    ]),
    ...mapActions([
      "RingUp", //呼出
      "getOrdersnList",
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
    //隐藏手机号中间的几位
    setMobile(val) {
      var phone = val.toString();
      var str = phone.split("");
      for (var i = 0; i < str.length; i++) {
        if (i === 3 || i === 4 || i === 5 || i === 6) {
          str[i] = "*";
        }
      }
      return str.join("");
    },
    //获取时间块的第一个时间,设置第二个时间
    getStartTime() {
      let startNum = this.createAuditionForm.start_time.split(":")[0];
      let endNum = this.createAuditionForm.start_time.split(":")[1];
      var start = "";
      var end = "";
      if (endNum * 1 < 60) {
        if (endNum * 1 + 30 >= 60) {
          end = endNum * 1 + 30 - 60;
          start = startNum * 1 + 1;
          if (end < 10) {
            end = "0" + end;
          }
          if (start < 10) {
            start = "0" + start;
          }
        } else {
          start = startNum;
          end = endNum * 1 + 30;
        }
        this.createAuditionForm.end_time = start + ":" + end;
      }
    },
    //回放地址
    goBank(item) {
      window.open(item.web_cast);
    },
    //查看教师简介视频
    goTeacherVideo() {
      window.location.replace = this.teacherDetailsForm.teacher_userinfo_video;
    },
    //预览图片
    handleTeacherView(item) {
      this.imgName = item;
      this.visible = true;
    },
    //教师详情
    teacherDetails(item) {
      if (item.teacher_userinfo_video) {
        window.open(item.teacher_userinfo_video);
      }
    },
    //选择老师 查询
    seekSelectForm() {
      this.showAuditionloading = true;
      var form = {};
      form.subject = this.createAuditionForm.subject;
      form.grade = this.createAuditionForm.grade;
      form.start_time = this.createAuditionForm.start_time;
      form.end_time = this.createAuditionForm.end_time;
      form.date_time = this.auditionTimes;
      form.type = this.createAuditionForm.type;
      form.name = this.selectTeacherListForm.name;
      form.mobile = this.selectTeacherListForm.mobile;
      this.getTeacherListN({ form, page: this.selectTeacherCurrentPage }).then(
        res => {
          this.teachersV = res.data.data.resources;
          this.selectTeacherPageSize = res.data.data.links.per_page;
          this.selectTeacherCurrentPage = res.data.data.links.current_page;
          this.selectTeacherTotal = res.data.data.links.total;
          this.showAuditionloading = false;
        }
      );
    },
    //手机号
    seekMobile() {
      if (this.selectTeacherListForm.mobile.length >= 4) {
        this.seekSelectForm();
      }
    },
    //选择老师清除按钮
    clearSelectTeacher() {
      this.selectTeacherListForm = {};
      this.seekSelectForm();
    },
    //选择老师/呼出
    callOut(item) {
      this.showLoading = true;
      this.RingUp({ form: item })
        .then(res => {
          if (res.data.code == 200) {
            this.$Message.success("呼出成功");
          }
          if (res.data.code == 1000) {
            this.$Message.error({
              content: res.data.error,
              duration: 4
            });
          }
          this.showLoading = false;
        })
        .catch(e => {
          if (e) {
            this.showLoading = false;
          }
        });
    },
    //选择老师/详情
    details() {},
    //tag删除
    closetag() {
      this.selectTeacherList = [];
      this.randomTag();
    },
    //随机tag颜色
    randomTag() {
      var index = Math.floor(Math.random() * color.color.length);
      this.tagColor = color.color[index];
    },
    //选择老师
    selectTeacher() {
      if (this.selectTeacherList.length == 1) {
        this.showSelectTeacher = false;
        this.showCreateAudition = true;
        this.randomTag();
      } else {
        this.$Message.error("只可选择一位老师");
      }
    },
    //选择老师分页
    selectTeacherPageChange(num) {
      this.showAuditionloading = true;
      var form = {};
      form.subject = this.createAuditionForm.subject;
      form.grade = this.createAuditionForm.grade;
      form.start_time = this.createAuditionForm.start_time;
      form.end_time = this.createAuditionForm.end_time;
      form.date_time = this.auditionTimes;
      form.type = this.createAuditionForm.type;
      this.getTeacherListN({ form, page: num }).then(res => {
        this.teachersV = res.data.data.resources;
        this.selectTeacherPageSize = res.data.data.links.per_page;
        this.selectTeacherCurrentPage = res.data.data.links.current_page;
        this.selectTeacherTotal = res.data.data.links.total;
        this.showAuditionloading = false;
      });
    },
    //选择老师多选框
    selectTeacherSelectionChange(item) {
      this.selectTeacherList = item;
    },
    //关闭选择老师
    closeSelectTeacher() {
      this.showSelectTeacher = false;
      this.showCreateAudition = true;
    },
    auditionTime(date) {
      this.auditionTimes = date;
    },
    getClass(num) {
      this.classAll = [];
      this.setOrdersnList([]);
      this.upgradeForm.product_id = "";
      var form = {};
      if (this.accountList.length != 0) {
        if (this.accountList[num].product_level == "中级") {
          this.accountList[num].product_level = 1;
        } else if (this.accountList[num].product_level == "高级") {
          this.accountList[num].product_level = 2;
        } else if (this.accountList[num].product_level == "特级") {
          this.accountList[num].product_level = 3;
        }
        form.grade = this.accountList[num].product_grade;
        form.level = this.accountList[num].product_level;
        form.class_hour = this.accountList[num].total_class_hour;
        form.class_type = 1;
        this.getOrdersnList(form).then(res => {
          if (res.data.data.resources) {
            if (res.data.data.resources.length == 0) {
              this.$Message.error("当前订单不可升级");
            }
          }
        });
      }
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
      this.upgradeForm.account_id =
        this.type.data.id || this.type.data.account_id;
      this.createUpOrder(this.upgradeForm).then(res => {
        if (!res.data.ret) {
          this.$Message.error(res.data.error);
          this.$parent.showMine = false;
          this.getStudentList({ form: this.type.form, page });
          return;
        }
        if (res.data.ret) {
          this.$Message.success("订单升级成功");
          this.$parent.showMine = false;
          this.classNum = {};
          this.classAll = {};
          this.getStudentList({ form: this.type.form, page });
        }
      });
    },
    //移出
    remove() {
      this.isLoading = true;
      this.removeMineclient({
        uid: this.type.data.id
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
        aid: this.type.data.account_id
          ? this.type.data.account_id
          : this.type.data.id,
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
    appraisalOk(item) {
      this.isLoading = true;
      var formData = new FormData();
      formData.append(
        "assess_image",
        this.uploadList[0] ? this.uploadList[0] : ""
      );
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
          this.uploadList.length = 0;
          this.appraisalForm = {};
          this.isLoading = false;
        });
    },
    //预览图片
    handleView(item) {
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
    //获取预约单老师列表
    getTeachers(isShow) {
      this.showCreateAudition = false;
      this.showSelectTeacher = true;
      this.teachersV.length = 0;
      var form = {};
      form.subject = this.createAuditionForm.subject;
      form.grade = this.createAuditionForm.grade;
      form.start_time = this.createAuditionForm.start_time;
      form.end_time = this.createAuditionForm.end_time;
      form.date_time = this.auditionTimes;
      form.type = this.createAuditionForm.type;
      if (isShow) {
        if (
          this.createAuditionForm.subject &&
          this.createAuditionForm.grade &&
          this.createAuditionForm.start_time &&
          this.createAuditionForm.end_time &&
          this.auditionTimes &&
          this.createAuditionForm.type
        ) {
          this.getTeacherListN({ form }).then(res => {
            if (!res.data.ret) {
              this.$Message.error(res.data.error);
              return;
            }
            if (res.data.data.length == 0) {
              this.$Message.error("暂无老师");
              // this.getUserReservedList({ page: 1, uid: this.type.data.id });
            } else {
              this.teachersV = res.data.data.resources;
              this.selectTeacherPageSize = res.data.data.links.per_page;
              this.selectTeacherCurrentPage = res.data.data.links.current_page;
              this.selectTeacherTotal = res.data.data.links.total;
            }
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
      this.isUpdata = true;
      this.showAppraisal = true;
      this.appraisalItem = item;
      if (this.isUpdata) {
        this.appraisalForm.assess_image = item.assess_image;
        this.appraisalForm.visit_content = item.visit_content;
      }
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
      } else if (!this.auditionTimes) {
        this.$Message.error("试听课日期不能为空");
        return;
      } else if (!this.createAuditionForm.start_time) {
        this.$Message.error("开始时间不能为空");
        return;
      } else if (!this.createAuditionForm.end_time) {
        this.$Message.error("结束时间不能为空");
        return;
      } else if (this.selectTeacherList.length == 0) {
        this.$Message.error("教师选项不能为空");
        return;
      } else if (!this.createAuditionForm.note) {
        this.$Message.error("备注不能为空");
        return;
      }
      this.showLoading = true;
      this.disableBtn = true;
      this.createAuditionForm.date_time = this.auditionTimes;
      this.createAuditionForm.coach_id = this.selectTeacherList[0].id;
      this.createdReserved({
        form: this.createAuditionForm,
        uid: this.type.data.id
      }).then(res => {
        if (res.data.ret) {
          this.$Message.success("新建预约成功");
          this.getUserReservedList({ page: 1, uid: this.type.data.id });
          this.clearForm();
          this.showLoading = false;
          this.time = "";
          this.auditionTimes = "";
          this.selectTeacherList = [];
        } else {
          this.$Message.error(res.data.error);
        }
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
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        "-" +
        shi +
        "-" +
        fen;
      return d;
    },

    //设置返回当前时间
    datePickers(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d = shi + ":" + fen;
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