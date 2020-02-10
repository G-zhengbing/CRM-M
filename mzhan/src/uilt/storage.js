const SESSION = window.sessionStorage
const LOCAL =window.localStorage
const CLASS_LIST = "CLASS_ITEM"
const FILE = "FILE_URL"
const TOKEN = 'TOKEN'
const DRAW = "DRAW"
const ADDRESS = "ADDRESS"
const ADDSITE = "ADDSITE"
const LOCATION = "LOCATION"

export default {
  get() {
    return JSON.parse(SESSION.getItem(CLASS_LIST) || '{}')
  },
  save(todo) {
    SESSION.setItem(CLASS_LIST, JSON.stringify(todo))
  },
  fileGet() {
    return JSON.parse(SESSION.getItem(FILE) || '{}')
  },
  fileSave(todo) {
    SESSION.setItem(FILE, JSON.stringify(todo))
  },
  getToken(){
	return JSON.parse(SESSION.getItem(TOKEN) || '{}')
  },
  saveToken(todo){
	SESSION.setItem(TOKEN, JSON.stringify(todo))
  },
  getDraw(){
	return JSON.parse(SESSION.getItem(DRAW) || '{}')
  },
  saveDraw(todo){
	SESSION.setItem(DRAW, JSON.stringify(todo))
  },
  clear(){
    SESSION.clear()
  },
  saveAddress(todo){
    LOCAL.setItem(ADDRESS, JSON.stringify(todo))
  },
  getADDRESS(){
    return JSON.parse(LOCAL.getItem(ADDRESS) || '{}')
  },
  clearLocal(){
    LOCAL.clear()
  },
  saveAddsite(todo){
    LOCAL.setItem(ADDSITE, JSON.stringify(todo))
  },
  getAddsite(){
    return JSON.parse(LOCAL.getItem(ADDSITE) || '{}')
  },
  saveLocation(todo){
    SESSION.setItem(LOCATION, JSON.stringify(todo))
  },
  getLocation(){
    return JSON.parse(SESSION.getItem(LOCATION) || '{}')
  }
}
