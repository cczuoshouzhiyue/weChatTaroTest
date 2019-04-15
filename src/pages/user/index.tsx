import Taro, { Component, Config } from '@tarojs/taro';
import { View, Input, Button } from '@tarojs/components';
import Header from '../../components/header/index'
import Panel from '../../components/user/panel'
import './index.less'
import {connect} from '@tarojs/redux'
import {setAccessUserToken, getUserInfoFn} from "../../actions/user";

const mapStateToProps =(store) => ({...store.user.loginName});
const mapDispatchToProps =  (dispatch) => {
  return{
    setAccessUserToken(params){
      dispatch(setAccessUserToken(params))
    },
  }
};
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '用户'
  };
  state = {
    recent_replies: [],
    recent_topics: []

  };
  componentWillMount () {
     this.getUserInfo()
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  getUserInfo = () => {
    const {loginname} = this.props;
    const params = {
      loginname
    };
    getUserInfoFn(params).then((result) => {
      this.setState({
        recent_replies: result.data.recent_replies,
        recent_topics: result.data.recent_topics
      })
    })
  };
  publishTopic = () => {
    Taro.redirectTo({url: '/pages/publish/index'})
  };
  render () {
    const { loginname, avatar_url} = this.props;
    const {recent_replies, recent_topics} = this.state;
    return (
      <View className='login'>
        <Header loginname={loginname}  avatar_url={avatar_url}/>
        <Panel listData={recent_replies} title='最近发布的话题'></Panel>
        <Panel listData={recent_topics} title='最近收到的回复'></Panel>
        <Button  className='publish_btn' onClick={this.publishTopic}>发布话题</Button>
      </View>
    )
  }
}
