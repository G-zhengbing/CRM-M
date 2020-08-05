const GRADE = [
	{ id:1,title:'一年级' },
	{ id:2,title:'二年级' },
	{ id:3,title:'三年级' },
	{ id:4,title:'四年级' },
	{ id:5,title:'五年级' },
	{ id:6,title:'六年级' },
	{ id:7,title:'七年级' },
	{ id:8,title:'八年级' },
	{ id:9,title:'九年级' },
	{ id:10,title:'高一' },
	{ id:11,title:'高二' },
	{ id:12,title:'高三' }
]

const SMALL_GRADE = [
	{ id:6,title:'小学' },
	{ id:7,title:'七年级' },
	{ id:8,title:'八年级' },
	{ id:9,title:'九年级' },
	{ id:10,title:'高一' },
	{ id:11,title:'高二' },
	{ id:12,title:'高三' }
]

const CLASS = [
	{ id:1,title:'中级' },
	{ id:2,title:'高级' },
	{ id:3,title:'特级' }
]

const COURSE_NUMBER =[
	{ id:1,title:1 },
	{ id:10,title:10 },
	{ id:30,title:30},
	{ id:50,title:50 },
	{ id:100,title:100 },
	{ id:150,title:150},
	{ id:200,title:200 }
]

const VISIT_NUMBER = [
	{ id:0,title:'0次' },
	{ id:1,title:'1次' },
	{ id:2,title:'2次'},
	{ id:3,title:'3次' },
	{ id:4,title:'4次' },
	{ id:5,title:'5次'},
	{ id:6,title:'6次' },
	{ id:7,title:'6次以上'}
]

const INTENTION_OPTION = [
	{ id:1,title:'高' },
	{ id:2,title:'中' },
	{ id:3,title:'低' },
	{ id:4,title:'无' }
]

const GENDER =[
	{id:1,title:'男'},
	{id:2,title:'女'}
]

const IS_LIVE = [
	{id:1,title:'是'},
	{id:2,title:'否'}
]

const PAGE_NUMBER = [
	{id:20,title:'每页显示20条'},
	{id:50,title:'每页显示50条'},
	{id:100,title:'每页显示100条'}
]

export default {
	GRADE, //年级
	SMALL_GRADE, //年级（1-6）小学
	CLASS ,//课时包等级
	COURSE_NUMBER,//课时数
	VISIT_NUMBER,//回访次数
	INTENTION_OPTION,//意向度
	GENDER,//性别
	IS_LIVE,//是否住校
	PAGE_NUMBER,//每页显示条数
}