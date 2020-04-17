const BASEURL = "http://liveapi.canpoint.net/api/" // 基础地址

const LOGINURL = "http://liveapi.canpoint.net/api/login" //登陆
const GETUSER = "http://liveapi.canpoint.net/api/me" //获取用户信息
const LOGINOUT = "http://liveapi.canpoint.net/api/logout" //退出登录
const KEHULIST = "http://liveapi.canpoint.net/api/clues" //待分配/已分配/公共客户
const FENPEI = "http://liveapi.canpoint.net/api/sales" //分配人员
const ANALLOT = "http://liveapi.canpoint.net/api/paid_allocated" //已下单待分配
const FENPAIXS = "http://liveapi.canpoint.net/api/assign_clue" //分派线索
const GENJIN = "http://liveapi.canpoint.net/api/clues" //线索跟进 
const YIRUGONG = "http://liveapi.canpoint.net/api/clue_status" //移入/移除
const MONEY = "http://liveapi.canpoint.net/api/order" //订单列表
const YUQI = "http://liveapi.canpoint.net/api/overdue_clue" //逾期未回访
const UPDATA = "http://liveapi.canpoint.net/api/reset" //修改密码
const JINRI = "http://liveapi.canpoint.net/api/points_clue" //今日新分
const RETURN = "http://liveapi.canpoint.net/api/return_list" //今日回访
const ERWEIMA = "http://liveapi.canpoint.net/api/create_qrcode" //新生成二维码
const DELEERWEIMA = "http://liveapi.canpoint.net/api/offline_qrcode" //删除二维码
const HOMEDATA = "http://liveapi.canpoint.net/api/data_statistics" //首页数据
const ERWEIMALIST = "http://liveapi.canpoint.net/api/channels_list" //二维码list
const ERWEIMACITY = "http://liveapi.canpoint.net/api/city" //二维码城市
const TYPESHOOL = "http://liveapi.canpoint.net/api/type_school" //类型/学校
const QUDAO = "http://liveapi.canpoint.net/api/channel_account" //渠道转介绍
const DINGDAN = "http://liveapi.canpoint.net/api/add_order" //创建订单
const DAORU ="http://liveapi.canpoint.net/api/export" //导入
const HUCHU = "http://liveapi.canpoint.net/api/callcellphone"//呼出
const PAYSTUDENT = "http://liveapi.canpoint.net/api/paid_account" //我的付费学员
const UPLIST = "http://liveapi.canpoint.net/api/attend_class" //上可列表
const TECHSTU = "http://liveapi.canpoint.net/api/head_clue" // 教务/我的学员
const TECPAY = "http://liveapi.canpoint.net/api/order_clue" //教务/付费学员
const TEPAYSTU = "http://liveapi.canpoint.net/api/batch_assign"//教务/付费学员/分配
const TEPAYLIST = "http://liveapi.canpoint.net/api/head_master" //教务/付费学员/班主任列表
const TEPCHE = "http://liveapi.canpoint.net/api/order_update" //班主任跟进
const TEPREPORT = "http://liveapi.canpoint.net/api/learn_report" //学情报告
const TEPADDREPORT = "http://liveapi.canpoint.net/api/order_report" //新增学情报告
const REFER = 'http://liveapi.canpoint.net/api/screen_list' //渠道来源列表
const MINECLIENT = "http://liveapi.canpoint.net/api/mine_clues"//我的客户
const NOTIFICATION = "http://liveapi.canpoint.net/api/action_list"//我的客户/消息提醒
const PONESTATUS = "http://liveh5.canpoint.net/send_message" //跟进/发送短信验证码
const CLIENTTYPE = "http://liveapi.canpoint.net/api/order_product" //创建订单/选择课程
const RESERVED = "http://liveapi.canpoint.net/api/mine_appoint_list" //全部预约单/
const USERRESERVED = "http://liveapi.canpoint.net/api/appoint_list" //用户预约单列表
const CREATERESERVED = "http://liveapi.canpoint.net/api/appoint_store" //创建预约单
const TEACHERLIST  = "http://192.168.31.83:3000/api/coach_list" //教师管理
const CREATEDTEACHERS = "http://192.168.31.83:3000/api/coach_store" //新建教师
const UPDATATEACHERS = "http://192.168.31.83:3000/api/modify_coach" //修改教师
const CLICKTEACHER = "http://liveapi.canpoint.net/api/available_coach_list" //预约选老师
const QIANDAO = "http://liveapi.canpoint.net/api/batch_stage" //签到/缺席/预约批量
const APPRAISAL  = "http://liveapi.canpoint.net/api/appiont_modify"//查看测评
const GETTIMEBLOCK = "http://liveapi.canpoint.net/api/timeblock"//时间块转换时间段
const STATISTICS = "http://liveapi.canpoint.net/api/call_phone" //统计分析
const PROVINCE  = "http://liveapi.canpoint.net/api/province" //省
const CITY = "http://liveapi.canpoint.net/api/p_city"//市
const CREATEINTRODUCE = "http://liveapi.canpoint.net/api/clue_regist"//转介绍/创建转介绍
const INTRODUCE = "http://liveapi.canpoint.net/api/get_mobile"//检测手机号
const IMPORTDATA = "http://liveapi.canpoint.net/api/upload_csv"//线索导入
const CREATEORDER = "http://liveapi.canpoint.net/api/add_order"//创建订单
const HANDOVER  = "http://liveapi.canpoint.net/api/handover"//交接单
const IMPORTANT = 'http://liveapi.canpoint.net/api/import_list'//导入订单列表
const IMPORTLIST = "http://liveapi.canpoint.net/api/upload_csv"//导入线索

const PAYINGSTUDENT = BASEURL + "paying_student" //教务/付费学员
const CLASSTEACH = BASEURL + "teacher_list" //教务/select/班主任列表
const MASSDISTRIBUTION = BASEURL + "order_distribution" //教务/批量分配
const CLASSSTUDENTS = BASEURL + "class_user_list" //教务/班课学员
const INCLASS = BASEURL + "class_start_user_list" //教务/班课开课中学员
const USERTRACK = BASEURL + "user_track" //教务/学员跟进
const CALLOUT = BASEURL + "callcellphone" //教务/呼出
const AVAILABLECOACHLIST = BASEURL + "available_coach_list" //教务/ 预约选老师
const APPOINTSTORE = BASEURL + "appoint_store" //教务/ 创建预约单
const MYRESERVATION = BASEURL + "appointment_class_list" //教务/ 我的预约单
const LEARNINGREPORT = BASEURL + "learning_report" //教务/ 学情报告
const LEARNINGREPORTINFO = BASEURL + "learning_report_info" //教务/ 学情报告/查看报告
const CREATELEARNINGREPORT = BASEURL + "create_learning_report" //教务/ 学情报告/创建报告
const BATCHSTAGE = BASEURL + "batch_stage" //教务/ 签到按钮
const MINEAPPOINTLIST = BASEURL + "mine_appoint_list" //教务/ 签到按钮
const APPOINTLIST = BASEURL + "appoint_list" //教务/ 试听列表渲染
const APPIONTMODIFY = BASEURL + "appiont_modify" //教务/ 查看测评
const UPDATELEARNINGSTATE = BASEURL + "update_learning_state" //教务/ 本周到课状态，上周作业情况
const GETMOBILE = BASEURL + "get_mobile" //教务/ 转介绍
const ORDERPRODUCT = BASEURL + "order_product" //教务/ 订单 选择课程
const ADDORDER = BASEURL + "add_order" //教务/ 订单 创建订单
const GETACCOUNTSFOLLOW = BASEURL + "get_accounts_follow" //教务/ 跟进，信息展示

const SCREENLIST = BASEURL + "screen_list" //教务/ 公共接口，select状态栏

//liveapi.canpoint.net
// 39.107.156.22/canpoint

export {
  GETACCOUNTSFOLLOW,
  ADDORDER,
  ORDERPRODUCT,
  GETMOBILE,
  UPDATELEARNINGSTATE,
  APPIONTMODIFY,
  APPOINTLIST,
  MINEAPPOINTLIST,
  BATCHSTAGE,
  CREATELEARNINGREPORT,
  LEARNINGREPORTINFO,
  LEARNINGREPORT,
  SCREENLIST,
  MYRESERVATION,
  APPOINTSTORE,
  AVAILABLECOACHLIST,
  CALLOUT,
  USERTRACK,
  INCLASS,
  CLASSSTUDENTS,
  MASSDISTRIBUTION,
  CLASSTEACH,
  PAYINGSTUDENT,
  IMPORTLIST,
  IMPORTANT,
  HANDOVER,
  CREATEORDER,
  IMPORTDATA,
  INTRODUCE,
  CREATEINTRODUCE,
  CITY,
  PROVINCE,
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
