const USERS = "INFORMATION"
const SESSION = window.sessionStorage
const LOCAL = window.localStorage
const USER = "USER_ITEM"
const TABSTATUS = "TAB_STATUS"
const USERCID = "USER_CID"
const MENUNUM = "MENUNUM"
const BOOKUID = "BOOKUID"

export default {
  getBookId(){
    return JSON.parse(SESSION.getItem(BOOKUID) || '{}')
  },
  savaBookId(todo){
    SESSION.setItem(BOOKUID, JSON.stringify(todo))
  },
  setMenuNum(todo){
    LOCAL.setItem(MENUNUM, JSON.stringify(todo))
  },
  getMenuNum(){
    return JSON.parse(LOCAL.getItem(MENUNUM) || '{}')
  },
  get() {
    return JSON.parse(SESSION.getItem(USERS) || '{}')
  },
  save(todo) {
    SESSION.setItem(USERS, JSON.stringify(todo))
  },
  saveUser(todo) {
    SESSION.setItem(USER, JSON.stringify(todo))
  },
  clear() {
    SESSION.clear(USERS)
  },
  saveTabStatus(todo) {
    LOCAL.setItem(TABSTATUS, JSON.stringify(todo))
  },
  getTabStatus() {
    return JSON.parse(LOCAL.getItem(TABSTATUS) || null)
  },
  setUserCid(todo) {
    SESSION.setItem(USERCID, JSON.stringify(todo))
  },
  getUserCid() {
    return JSON.parse(SESSION.getItem(USERCID) || null)
  },
  getTokenTime(token){
    if(token == 403){
      window.location.href = "/"
    }
  }
}
