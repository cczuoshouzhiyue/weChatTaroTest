//显示抽屉
import * as types from '../reducers/menu/action_type'
export function showDrawer(){
  return (dispatch)=>{
    dispatch({type: types.showDrawer })
  }
}

export function closeDrawer(){
  return (dispatch)=>{
    dispatch({type: types.hideDrawer })
  }
}

export function changeCata(data){
  return (dispatch)=>{
    dispatch({type: types.changeCata,currentCata: data })
  }
}
