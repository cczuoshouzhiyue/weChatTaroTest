import { combineReducers } from 'redux'
import  menu  from './menu/actions';
import topList from './topic/action';
import user from './user/user'
export default combineReducers({
  menu,
  topList,
  user
})
