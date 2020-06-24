/**
 * 设置接口
 */
import { BASEURL } from './env'

// 信息设置
export const CREATEMESSAGE = BASEURL + "create_message" // 创建短信模板
export const MESSAGELIST = BASEURL + "message_list" // 短信模板列表
export const DELETEMESSAGE = BASEURL + "delete_message" // 删除短信模板
export const STATUSMESSAGE = BASEURL + "status_message" // 停用短信模板
export const SENDTEMPLATE = BASEURL + "send_template" // 提交审核短信模板

// 信息分配
export const UPDATEUSERMESSAGELIMIT = BASEURL + "update_user_message_limit" // 短信分配权限设置
export const UPDATEUSERMESSAGELIMITSUM = BASEURL + "update_system_month_message_limit" // 每月总短信分配权限设置

// 信息发送
export const MESSAGETEMPLATELIST = BASEURL + "message_template_list" // 短信下拉列表渲染
export const SENDMESSAGE = BASEURL + "send_message" // 发送短信

