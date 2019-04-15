import Taro from '@tarojs/taro';
import {get, post} from '../util/http'
import  apiObject  from  '../constans/apiInterface'

// 获取列表借口
export async function getTopicsInfo(params) {
  let result = await get (apiObject.getTopicsInfo, params)
  if (result && result.data&& result.data.success) {
    return result.data.data
  }
  return null
}

/*获取话题详情借口*/
export async function getTopicDetailInfo(params) {
  const url  = apiObject.getTopicDetail + params.id;
  let result = await get (url, params);
  if (result && result.data&& result.data.success) {
    return result.data.data
  }
  return null
}
// 点赞接口
export async function upreply( params) {
  const url =  apiObject.upreply + params.replyid + '/up';
  let result = await post (url, params);
  if (result && result.data&& result.data.success) {
    return true
  }
  return false
}

// 回复接口
export async  function  replyContent (params){
  const url = apiObject.replytopic + params.topicid + '/replies';
  let  result= await post(url, params);
  if(result&&result.data&&result.data.success){
    //成功评论
    return   result.data;
  }
    //评论失败
  Taro.showToast({title:'评论失败!',icon:'none'})
  return  false;
}


//登录接口

export async function accessUserToken (params) {
 const result = await post(apiObject.checkusertoken, params);
  if (result && result.data&& result.data.success) {
    return result.data
  }
  return false
  
}

// 获取用户信息接口

export async function getUserInfo (params) {
  const url = apiObject.getuserinfo + params.loginname
  const result = await get( url);
  if (result && result.data&& result.data.success) {
    return result.data
  }
  Taro.showToast({title:'拉取用户信息失败!',icon:'none'});
  return false
}

// 新建话题
export async function submitTopicFn (params) {
  const result = post(apiObject.createtopic, params);
  if (result && result.data && result.data.success) {
    return result.data
  }
  Taro.showToast({title:'新建话题失败!',icon:'none'});
  return false;
}
