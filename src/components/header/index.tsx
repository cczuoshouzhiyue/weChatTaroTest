import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image } from '@tarojs/components'
import './index.less'


export default class Header extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }
  componentWillReceiveProps () {
  }
  componentDidHide() {
  }

  render() {
    let {loginname,avatar_url}=this.props;
    return (
     <View className='login-head'>
       <Image className='login-head-back' src={require('../../assets/img/loginBack.jpg')}/>
       <Image className='login-head-head' src={avatar_url?avatar_url:require('../../assets/img/head.png')} />
       <Image className='login-head-head' src={avatar_url?avatar_url:require('../../assets/img/head.png')} />
       {loginname?<Text className='login-head-name'>{loginname}</Text>:null}
     </View>
    )
  }
}
