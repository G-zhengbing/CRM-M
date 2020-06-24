import { BASEURL } from '../env'

const STUDENTLIST = BASEURL + 'paid_accounts' //学员管理
const TEACHERLIST = BASEURL + 'coach_lists' //班课老师任列表
const CUORSECARD = BASEURL +'my_card' //课程卡 
const CREATEDLESSONS = BASEURL +'lesson_store' //添加课节一对一
const ADDCOURSE =BASEURL + 'create_fixed_schedule'//排课一对一
const COURSELIST = BASEURL +'Schedule_list'//课程管理列表
const LESSONSLIST = BASEURL + 'lesson_list' //课程/课节列表
const LESSONSSTUDENT = BASEURL +'get_account'//学生列表
const ADDLESSONSSTUDENT = BASEURL +'add_lesson_student'//班课添加课节学生
const ADDALLSTUDENT = BASEURL +'add_student'//班课添加课程学生
const SCHEDULESSONSLIST = BASEURL + 'system_lesson' //课节列表 
const UPDATELESSONLIST = BASEURL  + 'modify_lesson' //一对一课节修改
const CANCELLESSONS = BASEURL +'cancel_lesson'//一对一取消课节

export {
    CANCELLESSONS,
    UPDATELESSONLIST,
    SCHEDULESSONSLIST,
    ADDALLSTUDENT,
    ADDLESSONSSTUDENT,
    LESSONSSTUDENT,
    LESSONSLIST,
    STUDENTLIST,
    TEACHERLIST,
    CUORSECARD,
    CREATEDLESSONS,
    ADDCOURSE,
    COURSELIST
}