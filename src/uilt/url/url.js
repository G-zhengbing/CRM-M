import { BASEURL } from './env'

const PONESTATUS = "http://liveh5.canpoint.net/send_message" //跟进/发送短信验证码

const DELETETEACHER = BASEURL + 'delete_coach'
const LOGINURL = BASEURL + "login" //登陆
const GETUSER = BASEURL + "me" //获取用户信息
const LOGINOUT = BASEURL + "logout" //退出登录
const KEHULIST = BASEURL + "clues" //待分配/已分配/公共客户
const PUBLICCLUES = BASEURL + "public_clues" // 公共资源池
const FENPEI = BASEURL + "sales" //分配人员
const ANALLOT = BASEURL + "paid_allocated" //已下单待分配
const ASSIGNPAIDALLOCATED = BASEURL + "assign_paid_allocated" // 资源池,已下单待分配
const FENPAIXS = BASEURL + "assign_clue" //分派线索
const GENJIN = BASEURL + "clues" //线索跟进 
const YIRUGONG = BASEURL + "clue_status" //移入/移除
const MONEY = BASEURL + "order" //订单列表
const YUQI = BASEURL + "overdue_clue" //逾期未回访
const UPDATA = BASEURL + "reset" //修改密码
const JINRI = BASEURL + "points_clue" //今日新分
const RETURN = BASEURL + "return_list" //今日回访
const ERWEIMA = BASEURL + "create_qrcode" //新生成二维码
const DELEERWEIMA = BASEURL + "offline_qrcode" //删除二维码
const HOMEDATA = BASEURL + "data_statistics" //首页数据
const ERWEIMALIST = BASEURL + "channels_list" //二维码list
const ERWEIMACITY = BASEURL + "city" //二维码城市
const TYPESHOOL = BASEURL + "type_school" //类型/学校
const QUDAO = BASEURL + "channel_account" //渠道转介绍
const DINGDAN = BASEURL + "add_order" //创建订单
const DAORU = BASEURL + "export" //导入
const HUCHU = BASEURL + "callcellphone"//呼出
const PAYSTUDENT = BASEURL + "paid_account" //我的付费学员
const UPLIST = BASEURL + "attend_class" //上可列表
const TECHSTU = BASEURL + "head_clue" // 教务/我的学员
const TECPAY = BASEURL + "order_clue" //教务/付费学员
const TEPAYSTU = BASEURL + "batch_assign"//教务/付费学员/分配
const TEPAYLIST = BASEURL + "head_master" //教务/付费学员/班主任列表
const TEPCHE = BASEURL + "order_update" //班主任跟进
const TEPREPORT = BASEURL + "learn_report" //学情报告
const TEPADDREPORT = BASEURL + "order_report" //新增学情报告
// const REFER = "http://192.168.1.181:3000/api/" + 'screen_list' //渠道来源列表
const REFER = BASEURL + 'screen_list' //渠道来源列表
const SALES = BASEURL + 'sales' //渠道来源列表
const MINECLIENT = BASEURL + "mine_clues"//我的客户
const NOTIFICATION = BASEURL + "action_list"//我的客户/消息提醒
const CLIENTTYPE = BASEURL + "order_product" //创建订单/选择课程
const RESERVED = BASEURL + "mine_appoint_list" //预约单/
const RESERVEDAll = BASEURL + "system_appoint_list" //全部预约单/
const UPDATEAPPOINTMENTISSCHEDULE = BASEURL + "update_appointment_is_schedule" //全部预约单,是否排课
const USERRESERVED = BASEURL + "appoint_list" //用户预约单列表
const CREATERESERVED = BASEURL + "appoint_store" //创建预约单
const TEACHERLIST = BASEURL + "coach_list" //教师管理
const CREATEDTEACHERS = BASEURL + "coach_store" //新建教师
const UPDATATEACHERS = BASEURL + "modify_coach" //修改教师
const CLICKTEACHER = BASEURL + "available_coach_list" //预约选老师
const QIANDAO = BASEURL + "batch_stage" //签到/缺席/预约批量
const APPRAISAL = BASEURL + "appiont_modify"//查看测评
const GETTIMEBLOCK = BASEURL + "timeblock"//时间块转换时间段
const STATISTICS = BASEURL + "call_phone" //统计分析
const PROVINCE = BASEURL + "province" //省
const CITY = BASEURL + "p_city"//市
const CREATEINTRODUCE = BASEURL + "clue_regist"//转介绍/创建转介绍
const INTRODUCE = BASEURL + "get_mobile"//检测手机号
const IMPORTDATA = BASEURL + "upload_csv"//线索导入
const CREATEORDER = BASEURL + "create_order"//创建订单
const HANDOVER = BASEURL + "handover"//交接单
const IMPORTANT = BASEURL + 'import_order_list'//导入订单列表
const IMPORTCLUELIST = BASEURL + 'import_clue_list'//导入线索
const IMPORTLIST = BASEURL + "upload_csv"//导入线索
const ACCOUNTORDER = BASEURL + "account_order"//升级订单列表
const CREATEUPGRADE = BASEURL + "create_upgrade_order"//创建升级订单
const UPLOADORDER = BASEURL + "upload_order"//导入订单1
const UPLOADPRODUCTR = BASEURL + "upload_product"//导入订单2
const UPLOADCSVORDER = BASEURL + "upload_csv_order"//导入订单3

const MATERIALUPLOAD = BASEURL + "material_upload"//资料上传
const PRODUCTINFOFILE = BASEURL + "product_info_file"//课程简介图片上传
const UPDATEPRODUCTS = BASEURL + "update_products"//课程修改
const CREATEPRODUCTS = BASEURL + "create_products"//新建课程

const PAYINGSTUDENT = BASEURL + "paying_student" //教务/付费学员
const CLASSTEACH = BASEURL + "teacher_list" //教务/select/班主任列表
const MASSDISTRIBUTION = BASEURL + "order_distribution" //教务/批量分配
const CLASSSTUDENTS = BASEURL + "class_user_list" //教务/班课学员
const VIPUSERLIST = BASEURL + "vip_user_list" // 一对一学员
const INCLASS = BASEURL + "class_start_user_list" //教务/班课开课中学员
const USERTRACK = BASEURL + "user_track" //教务/学员跟进
const CALLOUT = BASEURL + "callcellphone" //教务/呼出
const AVAILABLECOACHLIST = BASEURL + "available_coach_list" //教务/ 预约选老师
const APPOINTSTORE = BASEURL + "appoint_store" //教务/ 创建预约单
const MYRESERVATION = BASEURL + "appointment_class_list" //教务/ 我的预约单
const APPOINTMENTVIPCLASSLIST = BASEURL + "appointment_vip_class_list" // 一对一 我的预约单
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
const GETACCOUNTSFOLLOW = BASEURL + "get_accounts_follow" //教务/ 跟进，信息展示
const CALLRECORDSTATISTICS = BASEURL + "call_record_statistics" //教务/ 拨号预约统计分析

const ADMINMERBERUSERLIST = BASEURL + "admin_merber_user_list" //设置，人员列表查询
const CREATEDEPARTMENTNAME = BASEURL + "create_department_name" //设置，创建部门
const UPDATEDEPARTMENTNAME = BASEURL + "update_department_name" //设置，修改部门名称
const DELETEDEPARTMENTNAME = BASEURL + "delete_department_name" //设置，删除部门
const ADMINMERBERDEPARTMENTNAMELIST = BASEURL + "admin_merber_department_name_list" //设置，部门列表
const ADMINMERBERROLELIST = BASEURL + "admin_merber_role_list" //设置，获取角色列表
const CREATEADMINUSER = BASEURL + "create_admin_user" //设置，新增用户列表
const PROHIBITADMINUSER = BASEURL + "prohibit_admin_user" //设置，新增用户列表
const GETPERMISSIONLIST = BASEURL + "get_permission_list" //设置，获取权限列表
const UPDATEROLEPERMISSION = BASEURL + "update_role_permission" //设置，修改用户权限
const GETROLEPERMISSION = BASEURL + "get_role_permission" //设置，角色权限获取
const ADDROLE = BASEURL + "add_role" //设置，创建角色

const MEPERMISSION = BASEURL + "me_permission" //获取当前角色权限列表

const UPDATESALESWEIGHT = BASEURL + "update_sales_weight" // 修改设置权重分配权重比
const UPPERLIMIT = BASEURL + "update_user_assignment_task_channel_list_and_upper_limit" // 修改设置权重分配页面其他设置
const GETUPPERLIMIT = BASEURL + "get_user_assignment_task_channel_list_and_upper_limit" // 获取权重分配指定渠道列表

const SCREENLIST = BASEURL + "screen_list" //教务/ 公共接口，select状态栏

export {
  DELETETEACHER,
  GETUPPERLIMIT,
  UPPERLIMIT,
  UPDATESALESWEIGHT,
  ADDROLE,
  GETROLEPERMISSION,
  MEPERMISSION,
  UPDATEROLEPERMISSION,
  GETPERMISSIONLIST,
  PROHIBITADMINUSER,
  CREATEADMINUSER,
  ADMINMERBERROLELIST,
  ADMINMERBERDEPARTMENTNAMELIST,
  UPDATEDEPARTMENTNAME,
  DELETEDEPARTMENTNAME,
  CREATEDEPARTMENTNAME,
  ADMINMERBERUSERLIST,
  UPLOADCSVORDER,
  UPLOADPRODUCTR,
  UPLOADORDER,
  CALLRECORDSTATISTICS,
  UPDATEPRODUCTS,
  CREATEPRODUCTS,
  PRODUCTINFOFILE,
  MATERIALUPLOAD,
  RESERVEDAll,
  UPDATEAPPOINTMENTISSCHEDULE,
  CREATEUPGRADE,
  ACCOUNTORDER,
  GETACCOUNTSFOLLOW,
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
  APPOINTMENTVIPCLASSLIST,
  APPOINTSTORE,
  AVAILABLECOACHLIST,
  CALLOUT,
  USERTRACK,
  INCLASS,
  CLASSSTUDENTS,
  VIPUSERLIST,
  MASSDISTRIBUTION,
  CLASSTEACH,
  PAYINGSTUDENT,
  IMPORTLIST,
  IMPORTANT,
  IMPORTCLUELIST,
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
  SALES,
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
  ASSIGNPAIDALLOCATED,
  LOGINURL,
  GETUSER,
  LOGINOUT,
  KEHULIST,
  PUBLICCLUES,
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
