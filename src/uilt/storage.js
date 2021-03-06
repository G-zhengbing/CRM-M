const USERS = "INFORMATION"
const SESSION = window.sessionStorage
const LOCAL = window.localStorage
const USER = "USER_ITEM"
const TABSTATUS = "TAB_STATUS"
const USERCID = "USER_CID"
const MENUNUM = "MENUNUM"
const BOOKUID = "BOOKUID"
const DAIBAN = "DAIBAN"
const RESERVEDTAB = "RESERVEDTAB"
const RESERVEDALLTAB = "RESERVEDALLTAB"
const STATISTICS = "STATISTICS"
const MAINTABNUM = "MAINTABNUM"
const MINECLIENTTAB = "MINECLIENTTAB"

export default {
  getMineclientTab(){
    return JSON.parse(SESSION.getItem(MINECLIENTTAB) || 1)
  },
  savaMineclientTab(todo){
    SESSION.setItem(MINECLIENTTAB, JSON.stringify(todo))
  },
  getMaintabnum(){
    return JSON.parse(SESSION.getItem(MAINTABNUM) || 0)
  },
  savaMaintabnum(todo){
    SESSION.setItem(MAINTABNUM, JSON.stringify(todo))
  },
  getStatistics(){
    return JSON.parse(SESSION.getItem(STATISTICS) || '{}')
  },
  savaStatistics(todo){
    SESSION.setItem(STATISTICS, JSON.stringify(todo))
  },
  getReseredTab(){
    return JSON.parse(SESSION.getItem(RESERVEDTAB) || '{}')
  },
  savaReseredTab(todo){
    SESSION.setItem(RESERVEDTAB, JSON.stringify(todo))
  },
  getReseredAllTab(){
    return JSON.parse(SESSION.getItem(RESERVEDALLTAB) || '{}')
  },
  savaReseredAllTab(todo){
    SESSION.setItem(RESERVEDALLTAB, JSON.stringify(todo))
  },
  getDaiban(){
    return JSON.parse(SESSION.getItem(DAIBAN) || '{}')
  },
  savaDaiban(todo){
    SESSION.setItem(DAIBAN, JSON.stringify(todo))
  },
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
    return JSON.parse(LOCAL.getItem(MENUNUM) || '[]')
  },
  get() {
    return JSON.parse(SESSION.getItem(USERS) || '{}')
  },
  save(todo) {
    SESSION.setItem(USERS, JSON.stringify(todo))
  },
  clear() {
    SESSION.clear(USERS)
  },
  saveTabStatus(todo) {
    LOCAL.setItem(TABSTATUS, JSON.stringify(todo))
  },
  getTabStatus() {
    return JSON.parse(LOCAL.getItem(TABSTATUS) || null)
  }
}
