const LOGINURL = "http://liveapi.canpoint.net/api/login" //登陆
const GETUSER = "http://liveapi.canpoint.net/api/me" //获取用户信息
const LOGINOUT = "http://liveapi.canpoint.net/api/logout" //退出登录
const KEHULIST = "http://liveapi.canpoint.net/api/clues" //待分配/已分配/公共客户
const FENPEI = "http://liveapi.canpoint.net/api/sales" //分配人员
const ANALLOT = "http://liveapi.canpoint.net/api/paid_unallocated" //已下单待分配
const FENPAIXS = "http://liveapi.canpoint.net/api/assign_clue" //分派线索
const GENJIN = "http://liveapi.canpoint.net/api/clues" //线索跟进 
const YIRUGONG = "http://liveapi.canpoint.net/api/clue_status" //移入/移除
const MONEY = "http://liveapi.canpoint.net/api/order" //订单列表
const YUQI = "http://liveapi.canpoint.net/api/overdue_clue" //逾期未回访
const UPDATA = "http://liveapi.canpoint.net/api/reset" //修改密码
const JINRI = "http://liveapi.canpoint.net/api/return_visit" //未跟进/待回访
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

//liveapi.canpoint.net

export {
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
