import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Textarea, Button} from '@tarojs/components'
import './index.less'
export default class Replycontent extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  state = {
    textArea: ''
  };
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }
  changeInput = (event) => {
    if (event && event.target) {
      this.setState({
        textArea: event.target.value
      })
    }
  };
  ok = () => {
    const { textArea } = this.state;
    if (!textArea){
      return Taro.showToast({title:'请输入评论内容', icon: 'none'})
    }
    this.props.onOkReplayContent && this.props.onOkReplayContent(textArea)
  };
  cancle = () => {
    this.props.onCancleReply &&  this.props.onCancleReply()
  };
  render() {
    return (<View className='reply-content'>
      <Textarea onInput={this.changeInput} placeholder='请输入回复内容' className='reply-content-text'></Textarea>
      <View className='reply-content-button'>
        <Button onClick={this.ok}>确定</Button>
        <Button onClick={this.cancle}>取消</Button>
      </View>
    </View>)
  }
}
