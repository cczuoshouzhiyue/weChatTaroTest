import Taro, { Component, Config } from '@tarojs/taro';
import { View, Input, Button, Textarea, Picker} from '@tarojs/components';
import './index.less'
import {connect} from '@tarojs/redux'
import  { submitTopic } from '../../actions/topicList'
import {setAccessUserToken} from "../../actions/user";
import user from "../../reducers/user/user";

const mapStateToProps =(store) => ({...store.menu, user: store.user, topicinfo: store.topList.topicinfo});
const mapDispatchToProps =  (dispatch) => {
  return{
    setAccessUserToken(params){
      dispatch(setAccessUserToken(params))
    },
  }
};
@connect(mapStateToProps, mapDispatchToProps)
export default class Publish extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  state = {
    title:'',
    content:'',
    selectCata:null,
  };
  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  changeInputTitle  = (event) => {
    if (event && event.target) {
      this.setState({
        title: event.target.value
      })
    }
  };
  changeTextarea = (event) => {
    if (event && event.target) {
      this.setState({
        content: event.target.value
      })
    }
  };

  submitPublish = () => {
    const { user, topicinfo} = this.props;
    const {title, content, selectCata} = this.state;
    if (!title) {
     return  Taro.showToast({title: '请输入你要发布的标题', icon: 'none'})
    }
    if (!content) {
      return  Taro.showToast({title: '请输入要发布的内容', icon: 'none'})
    }
    if (!(selectCata && selectCata.value)){
      return  Taro.showToast({title: '请输入你要发布菜单', icon: 'none'})
    }
    const params = {
      title: title,
      tab:selectCata.key,
      accesstoken: user.cacheKey,
      topic_id: topicinfo.id,
      content: content
    };
    submitTopic(params).then((result) => {
      if (result) {
        Taro.navigateTo({
          url: '/pages/user/index'
        });
      }
    })
  };
   changeCata =(event) =>{
    let  { cataData}=this.props;
    this.setState({selectCata:cataData[event.detail.value]})
   };
    render () {
    const { cataData } = this.props;
    const { selectCata } = this.state;
    return (
      <View  className='publish-topic'>
        <Input  className='publish-topic-title' placeholder='请输入要发布的标题' onInput={this.changeInputTitle}/>
        <Textarea className='publish-topic-content' placeholder='请输入要发布的内容' onInput={this.changeTextarea}/>
        <Picker onChange={this.changeCata.bind(this)} range={ cataData } rangeKey='value' mode ='selector'>
          <View className='publish-topic-cata'>{selectCata?selectCata.value:'请选择'}</View>
        </Picker>
        <Button  className='publish-topic-btn' className='login-btn' onClick={this.submitPublish}>提交</Button>
      </View>
    )
  }
}
