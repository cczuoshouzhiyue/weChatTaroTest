import { accessUserToken, getUserInfo } from '../api/index'
import Taro from '@tarojs/taro'
import * as types from "../reducers/user/action_type"

export function setAccessUserToken (params){
  return async dispatch =>{
    let result = await accessUserToken(params);
    if (result) {
      dispatch({type: types.LOGINSUCCESS, cacheKey: params.accesstoken, loginName: result});
      return  true
    }
    dispatch({type: types.LOGINFAIL, cacheKey: null, loginName: {}})
    return  false
  }
}

export async function getUserInfoFn(params) {
  return await getUserInfo(params)
}


export function valideUser(params) {
  if (params && params.cacheKey) {
    Taro.navigateTo({
      url: '/pages/user/index'
    });
    return true
  }
  return false
}
