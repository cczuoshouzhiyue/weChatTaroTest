import {MENU_STATE} from './state'
import * as types from './action_type'
export default function menu (preState = MENU_STATE, action) {
   switch (action.type) {
     case types.showDrawer:
       return {...preState, showDrawer: true}
     case types.hideDrawer:
       return  {...preState,showDrawer:false};
     case types.changeCata:
       return {...preState, currentCata: action.currentCata}
     default:
       return{ ...preState }
   }
}
