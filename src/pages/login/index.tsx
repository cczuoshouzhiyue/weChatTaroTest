import Taro, { Component, Config } from '@tarojs/taro';
import { View, Input, Button } from '@tarojs/components';
import Header from '../../components/header/index'
import './index.less'
import {connect} from '@tarojs/redux'
import {setAccessUserToken} from "../../actions/user";

const mapStateToProps =(store) => ({});
const mapDispatchToProps =  (dispatch) => {
  return{
    setAccessUserToken(params){
      return dispatch(setAccessUserToken(params))
    },
  }
};
@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录'
  };
  state = {
    inputValue: ''
  };
  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  changeInput = (event) => {
    if (event && event.target) {
      this.setState({
        inputValue: event.target.value
      })
    }
  };
  submitLoginForScanCode = ()=> {
    let _this = this;
    Taro.scanCode({
      success (res) {
        _this.submitLoginFn(res.result)
      }
    })
  };
  submitLogin = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      return Taro.showToast({title:'请输入token', icon: 'none'})
    }
    this.submitLoginFn(inputValue)
  };
  submitLoginFn  =(value) => {
    this.props.setAccessUserToken && this.props.setAccessUserToken({accesstoken: value}).then((result)=>{
      if (!result) {
        Taro.showToast({title:'验证失败', icon: 'none'})
      }
      Taro.redirectTo({url: '/pages/user/index'})
    })
  };

  render () {
    return (
      <View className='login'>
        <Header/>
        <View className='login-content'>
          <Input type='text' onInput={this.changeInput} onBlur={this.changeInput} className='login-input' placeholder='请输入token'/>
          <Button className='scan-code' onClick={this.submitLoginForScanCode}>扫码登录</Button>
          <Button className='login-btn' onClick={this.submitLogin}>提交</Button>
        </View>
      </View>
    )
  }
}
