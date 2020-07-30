/**
 * 设置短信接口
 */
import { BASEURL } from './env'

// 信息设置
export const CREATEMESSAGE = BASEURL + "create_message" // 创建短信模板
export const MESSAGELIST = BASEURL + "message_list" // 短信模板列表
export const DELETEMESSAGE = BASEURL + "delete_message" // 删除短信模板
export const STATUSMESSAGE = BASEURL + "status_message" // 停用短信模板
export const SENDTEMPLATE = BASEURL + "send_template" // 提交审核短信模板

// 短信限制条数
export const UPDATEUSERMESSAGELIMIT = BASEURL + "update_user_message_limit" // 短信分配权限设置
export const UPDATEUSERMESSAGELIMITSUM = BASEURL + "update_system_month_message_limit" // 每月总短信分配权限设置

// 信息发送		// 客户管理内的发送按钮
export const MESSAGETEMPLATELIST = BASEURL + "message_template_list" // 短信下拉列表渲染
export const SENDMESSAGE = BASEURL + "send_message" // 发送短信

// 营销短信配置
export const SMSCONFIGURATIONINFO = BASEURL + "sms_configuration_info" // 获取营销短信设置
export const UPDATESMSCONFIGURATION = BASEURL + "update_sms_configuration" // 修改营销短信设置

// 营销 / 短信营销
// export const MESSAGELIST = BASEURL + "message_list" // 获取审核通过的短信模板列表
export const MASSTEXTINGRANGE = BASEURL + "mass_texting_range" // 营销短信群发范围数量
export const MASSTEXTINGRESIDUE = BASEURL + "mass_texting_residue" // 营销短信群发剩余数量
export const SENDMASSTEXTING = BASEURL + "send_mass_texting" // 发送批次短信