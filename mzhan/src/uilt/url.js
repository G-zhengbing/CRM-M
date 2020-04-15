const HOME = "http://39.107.156.22/canpoint/api/index" //M站首页

const REPID ="http://39.107.156.22/canpoint/api/code_receive" //快捷登陆
const PASSOWRD ="http://39.107.156.22/canpoint/api/password_receive" //密码登陆
const SEND = "http://39.107.156.22/canpoint/api/send_code" //发送验证码
const ISSIGNIN = "http://39.107.156.22/canpoint/api/mobile_exits" //是否已经注册
const SIGNIN = "http://39.107.156.22/canpoint/api/register" //注册
const UPDATEPASSWORD = "http://39.107.156.22/canpoint/api/modify_password" //修改密码

const UESR_DATA = 'http://39.107.156.22/canpoint/api/personal' //用户信息
const UPDATE_USER = "http://39.107.156.22/canpoint/api/update_data" //修改个人信息
const ORDER_LIST = "http://39.107.156.22/canpoint/api/personal" //订单课程列表
const DRAW = "http://39.107.156.22/canpoint/api/is_give" //是否免费领取
const GETDRAW = "http://39.107.156.22/canpoint/api/give_class" //免费领取微课
const ORDERDATA = "http://39.107.156.22/canpoint/api/get_order"//订单信息

const DATALIST = "http://39.107.156.22/canpoint/api/material_list" //资料列表
const DATACHILDER = "http://39.107.156.22/canpoint/api/material_detail" //资料合集

const FENXIANG = "http://39.107.156.22/canpoint/api/poster" //分享海报
const CLASSIFY = "http://39.107.156.22/canpoint/api/account_sign" //注册附加信息
const DATALISTS = "http://39.107.156.22/canpoint/api/subject_info" //详情页
const ORDER = "http://39.107.156.22/canpoint/api/create_order" //支付
const ADDSITE = "http://39.107.156.22/canpoint/api/create_address" //新建地址
const ADDRESS = "http://39.107.156.22/canpoint/api/address_list" //地址列表
const DELADDRESS = "http://39.107.156.22/canpoint/api/update_address" //删除/修改地址

const SMALL = "http://39.107.156.22/canpoint/api/subject_list" //免费课程列表

const DOWNSPOUT = "http://39.107.156.22/canpoint/api/book_info"//落地页
const VIDEO_LIST = "http://39.107.156.22/canpoint/api/book_video"//视频列表页
const CLASS_LIST = "http://39.107.156.22/canpoint/api/book_video"//课

const POINTS = "http://39.107.156.22/canpoint/api/material_view" //资料埋点
const CLASS = "http://39.107.156.22/canpoint/api/me_course_list" //我的课表
const COUNT = "http://liveapi.canpoint.net/api/report_count" //上报统计
export {
  ORDERDATA,
  COUNT,
  CLASS,
  POINTS,
  CLASS_LIST,
  VIDEO_LIST,
  DOWNSPOUT,
  SMALL,
  HOME,
  SEND,
  UESR_DATA,
  UPDATE_USER,
  ORDER_LIST,
  DRAW,
  GETDRAW,
  DATALIST,
  FENXIANG,
  CLASSIFY,
  DATALISTS,
  REPID,
  PASSOWRD,
  ORDER,
  ADDSITE,
  ADDRESS,
  DELADDRESS,
  DATACHILDER,
  ISSIGNIN,
  SIGNIN,
  UPDATEPASSWORD
}
