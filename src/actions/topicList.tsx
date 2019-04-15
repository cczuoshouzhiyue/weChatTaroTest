//显示抽屉
import * as types from '../reducers/topic/action_type'
import {getTopicsInfo, getTopicDetailInfo, upreply, replyContent, submitTopicFn} from '../api/index'
export function getTopicInfo(params){
  return async dispatch =>{
    let result = await getTopicsInfo(params)
    if (result) {
      dispatch({type: types.GETTOPICINFO, list: result  })
    }
  }
}


export function getNextTopicInfo(params){
  return async dispatch =>{
    let result = await getTopicsInfo(params)
    if (result) {
      dispatch({type: types.GETNEXTTOPICINFO, list: result, page: params.page })
    }
  }
}

export function getTopicDetail(params){
  return async dispatch =>{
    let result = await getTopicDetailInfo(params)
    if (result) {
      dispatch({type: types.GETTOPICINFODETAIL, topicinfo: result })
    }
  }
}
// 点赞接口
export async function setUpreply(params){
  return  await upreply(params)
}


// 回复接口
export async  function setReplyContent(params){
  return  await replyContent(params)
}

// 新建话题
export async function submitTopic(params) {
  return  await submitTopicFn()
}
