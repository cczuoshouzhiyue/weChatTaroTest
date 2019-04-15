import * as types from './action_type'
import {setCache, getCache} from "../../util/cache";


const DEFAULT_USER_STATE = {
  loginName: {
    loginname: '',
    avatar_url: ''
  }
};
const CACHE_KEY = 'cnode-user-key';
const user_state = getCache(CACHE_KEY) ? getCache(CACHE_KEY) : DEFAULT_USER_STATE;
const USER_STATE = {...user_state};

export default function user (preState = USER_STATE, action) {
  switch (action.type) {
    case types.LOGINSUCCESS:
      const successState =  {...preState, cacheKey: action.cacheKey, loginName: action.loginName};
      setCache(CACHE_KEY,successState );
      return  successState;
    case types.LOGINFAIL:
      const failState = {...preState, cacheKey: action.cacheKey, loginName: action.loginName};
      setCache(CACHE_KEY,failState );
      return failState;
    default:
      return {...preState}
  }
}


