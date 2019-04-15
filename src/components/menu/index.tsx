import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {showDrawer, closeDrawer, changeCata} from '../../actions/menu'
import { AtDrawer, AtIcon} from 'taro-ui';
import './index.less'
import {getTopicInfo} from "../../actions/topicList";
import { valideUser } from '../../actions/user'


const mapStateToProps =(store) => ({...store.menu, user: store.user});
const mapDispatchToProps =  (dispatch) => {
  return{
    showMenu(){
      dispatch(showDrawer())
    },
    closeMenu(){
      dispatch(closeDrawer())
    },
    getTopicInfo(param){
      dispatch(getTopicInfo(param))
    },
    changeCataFn(data){
      dispatch(changeCata(data))
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Menu extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    state = {
      menuList:  []
    };
    componentWillMount() {
      this.getMenuList()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }
    showDrawer = () => {
      this.props.showMenu &&  this.props.showMenu()
    };
    closeDrawer = () => {
      this.props.closeMenu &&  this.props.closeMenu()
    };
    getMenuList = () => {
      const { cataData } = this.props;
      const menuList = []
      cataData.map(item => {
        menuList.push(item.value)
      });
      this.setState({
        menuList
      })
    };
    selectCurrentMenu = (index) => {
      const { cataData, currentCata } = this.props;
      const currentCataObj = cataData[index];
      if (currentCataObj.key === currentCata.key) {
        return
      }
      const params = {
        page: 1,
        limit: 20,
        tab: currentCataObj.key
      };
      this.props.changeCataFn && this.props.changeCataFn(currentCataObj)
      this.props.getTopicInfo && this.props.getTopicInfo(params)
    };
    login = () => {
      const { user } = this.props;
      if (valideUser(user)) {
        return
      }
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    };
    render() {
        const { currentCata, showDrawer } = this.props;
        const { menuList } = this.state;
        return (
            <View className='menu'>
              <AtDrawer show={showDrawer} onItemClick={this.selectCurrentMenu} items={menuList} onClose={this.closeDrawer} className='user-at-drawer' style='position:absolute;'/>
              <View className='menu-headers'>
                {/*<Image className='ml' onClick={this.showDrawer}  src={require('../../assets/img/cata.png')}/>*/}
                <AtIcon value='bullet-list' onClick={this.showDrawer} className='ml' size='30' color='#F00'></AtIcon>
                <Text>{currentCata.value}</Text>
                {/*<Image className='mr' src={require('../../assets/img/login.png')}/>*/}
                <AtIcon value='user' onClick={this.login} className='mr' size='30' color='#F00'></AtIcon>
              </View>
            </View>
        )
    }
}
