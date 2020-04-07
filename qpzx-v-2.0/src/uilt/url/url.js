const LOGINURL = "http://39.107.156.22/canpoint/api/login" //登陆
const GETUSER = "http://39.107.156.22/canpoint/api/me" //获取用户信息
const LOGINOUT = "http://39.107.156.22/canpoint/api/logout" //退出登录
const KEHULIST = "http://39.107.156.22/canpoint/api/clues" //待分配/已分配/公共客户
const FENPEI = "http://39.107.156.22/canpoint/api/sales" //分配人员
const ANALLOT = "http://39.107.156.22/canpoint/api/paid_allocated" //已下单待分配
const FENPAIXS = "http://39.107.156.22/canpoint/api/assign_clue" //分派线索
const GENJIN = "http://39.107.156.22/canpoint/api/clues" //线索跟进 
const YIRUGONG = "http://39.107.156.22/canpoint/api/clue_status" //移入/移除
const MONEY = "http://39.107.156.22/canpoint/api/order" //订单列表
const YUQI = "http://39.107.156.22/canpoint/api/overdue_clue" //逾期未回访
const UPDATA = "http://39.107.156.22/canpoint/api/reset" //修改密码
const JINRI = "http://39.107.156.22/canpoint/api/points_clue" //今日新分
const RETURN = "http://39.107.156.22/canpoint/api/return_list" //今日回访
const ERWEIMA = "http://39.107.156.22/canpoint/api/create_qrcode" //新生成二维码
const DELEERWEIMA = "http://39.107.156.22/canpoint/api/offline_qrcode" //删除二维码
const HOMEDATA = "http://39.107.156.22/canpoint/api/data_statistics" //首页数据
const ERWEIMALIST = "http://39.107.156.22/canpoint/api/channels_list" //二维码list
const ERWEIMACITY = "http://39.107.156.22/canpoint/api/city" //二维码城市
const TYPESHOOL = "http://39.107.156.22/canpoint/api/type_school" //类型/学校
const QUDAO = "http://39.107.156.22/canpoint/api/channel_account" //渠道转介绍
const DINGDAN = "http://39.107.156.22/canpoint/api/add_order" //创建订单
const DAORU ="http://39.107.156.22/canpoint/api/export" //导入
const HUCHU = "http://39.107.156.22/canpoint/api/callcellphone"//呼出
const PAYSTUDENT = "http://39.107.156.22/canpoint/api/paid_account" //我的付费学员
const UPLIST = "http://39.107.156.22/canpoint/api/attend_class" //上可列表
const TECHSTU = "http://39.107.156.22/canpoint/api/head_clue" // 教务/我的学员
const TECPAY = "http://39.107.156.22/canpoint/api/order_clue" //教务/付费学员
const TEPAYSTU = "http://39.107.156.22/canpoint/api/batch_assign"//教务/付费学员/分配
const TEPAYLIST = "http://39.107.156.22/canpoint/api/head_master" //教务/付费学员/班主任列表
const TEPCHE = "http://39.107.156.22/canpoint/api/order_update" //班主任跟进
const TEPREPORT = "http://39.107.156.22/canpoint/api/learn_report" //学情报告
const TEPADDREPORT = "http://39.107.156.22/canpoint/api/order_report" //新增学情报告
const REFER = 'http://39.107.156.22/canpoint/api/screen_list' //渠道来源列表
const MINECLIENT = "http://39.107.156.22/canpoint/api/mine_clues"//我的客户
const NOTIFICATION = "http://39.107.156.22/canpoint/api/action_list"//我的客户/消息提醒
const PONESTATUS = "http://liveh5.canpoint.net/send_message" //跟进/发送短信验证码
const CLIENTTYPE = "http://39.107.156.22/canpoint/api/order_product" //创建订单/选择课程
const RESERVED = "http://39.107.156.22/canpoint/api/mine_appoint_list" //全部预约单/
const USERRESERVED = "http://39.107.156.22/canpoint/api/appoint_list" //用户预约单列表
const CREATERESERVED = "http://39.107.156.22/canpoint/api/appoint_store" //创建预约单
const TEACHERLIST  = "http://39.107.156.22/canpoint/api/coach_list" //教师管理
const CREATEDTEACHERS = "http://39.107.156.22/canpoint/api/coach_store" //新建教师
const UPDATATEACHERS = "http://39.107.156.22/canpoint/api/modify_coach" //修改教师
const CLICKTEACHER = "http://39.107.156.22/canpoint/api/available_coach_list" //预约选老师
const QIANDAO = "http://39.107.156.22/canpoint/api/batch_stage" //签到/缺席/预约批量
const APPRAISAL  = "http://39.107.156.22/canpoint/api/appiont_modify"//查看测评
const GETTIMEBLOCK = "http://39.107.156.22/canpoint/api/timeblock"//时间块转换时间段
const STATISTICS = "http://39.107.156.22/canpoint/api/call_phone" //统计分析

//liveapi.canpoint.net
// 39.107.156.22/canpoint

export {
  STATISTICS,
  GETTIMEBLOCK,
  UPDATATEACHERS,
  APPRAISAL,
  QIANDAO,
  CLICKTEACHER,
  RETURN,
  CREATEDTEACHERS,
  TEACHERLIST,
  CREATERESERVED,
  USERRESERVED,
  RESERVED,
  NOTIFICATION,
  CLIENTTYPE,
  PONESTATUS,
  MINECLIENT,
  REFER,
  TEPADDREPORT,
  TEPREPORT,
  TEPCHE,
  TEPAYLIST,
  TEPAYSTU,
  TECPAY,
  TECHSTU,
  UPLIST,
  PAYSTUDENT,
  ANALLOT,
  LOGINURL,
  GETUSER,
  LOGINOUT,
  KEHULIST,
  FENPEI,
  FENPAIXS,
  GENJIN,
  YIRUGONG,
  MONEY,
  YUQI,
  UPDATA,
  JINRI,
  ERWEIMA,
  DELEERWEIMA,
  HOMEDATA,
  ERWEIMALIST,
  ERWEIMACITY,
  TYPESHOOL,
  QUDAO,
  DINGDAN,
  DAORU,
  HUCHU
}
