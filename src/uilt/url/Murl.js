import { BASEURL } from './env'

const ADVER_URL = BASEURL + "banner" //广告列表
const ADDADVER_URL = BASEURL + "ad" //新增广告
const DELEADVER_URL = BASEURL + "delete_banner" //删除广告
const ADVEUPDOWN_URL = BASEURL + "line" //广告上线/下线
const UPDATAADVER_URL = BASEURL + "modify_banner" //广告修改

const SPECIAL_URL = BASEURL + "event" //专题列表
const DELESPECIAL_URL = BASEURL + "delete_event" //删除专题
const SPECIALUPDOWN_URL = BASEURL + "line_event" //专题上线/下线
const ADDSPECIAL_URL = BASEURL + "store_event" //新建专题
const UPDATASPECIAL_URL = BASEURL + "modify_event" //修改专题

const CURR_URL = BASEURL + "product_list" //课程列表
const ADDCURR_URL = BASEURL + "create_products" //新增课程
const CURRSHOW_URL = BASEURL + "update_show" //课程首页显示状态
const CURRUPDOWN_URL = BASEURL + "update_status" //课程上架/下架
const DELECURR_URL =BASEURL + "delete_products" //删除课程

const DATA_URL =BASEURL + "materials" //资料列表
const ADDDATA_URL = BASEURL + "store_material" //新建资料
const DELEDATA_URL = BASEURL + "delete_material" //删除资料
const DATASHOW = BASEURL + "line_material" //资料首页显示状态
const UPDATADATA_URL = BASEURL + "modify_material" //修改资料

const BOOK_URL = BASEURL + "list_book"//一书一码列表
const BOOK_REMOVE = BASEURL + "delete_book"//删除一书一码
const CLASS_LIST = BASEURL + "course_list" //课列表

const UPDATABOOK = BASEURL + "update_book" //修改书籍
const CREATEBOOK = BASEURL + "create_book" //创建书籍

const UPEXTENSION  = BASEURL + "extension" //上报推广
const UPLOADIMAGE = BASEURL + 'upload_image' // 上传图片

export {
  CREATEBOOK,
  UPDATABOOK,
  UPLOADIMAGE,
  UPEXTENSION,
  CLASS_LIST,
  BOOK_REMOVE,
  BOOK_URL,
  UPDATAADVER_URL,
  ADVER_URL,
  ADDADVER_URL,
  DELEADVER_URL,
  SPECIAL_URL,
  DELESPECIAL_URL,
  ADVEUPDOWN_URL,
  SPECIALUPDOWN_URL,
  ADDSPECIAL_URL,
  UPDATASPECIAL_URL,
  CURR_URL,
  ADDCURR_URL,
  CURRSHOW_URL,
  CURRUPDOWN_URL,
  DELECURR_URL,
  DATA_URL,
  ADDDATA_URL,
  DELEDATA_URL,
  DATASHOW,
  UPDATADATA_URL
}
