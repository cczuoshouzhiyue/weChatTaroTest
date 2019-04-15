import * as types from './action_type'
import {TOPIC_STATE} from './state'
export default function topList (preState = TOPIC_STATE, action) {
  switch (action.type) {
    case types.GETTOPICINFO:
      return {...preState, list: action.list};
    case types.GETNEXTTOPICINFO:
      return {...preState, list: preState.list.concat(action.list), page: action.page};
    case types.GETTOPICINFODETAIL:
      return {...preState, topicinfo: {...action.topicinfo, replies: []}, replies: action.topicinfo.replies,};
    default:
      return {...preState}
  }
}


