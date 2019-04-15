import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button, Input, Textarea} from '@tarojs/components'
import Dialog from  '../../components/dialog/index'
import './index.less'
import {Input, Textarea} from "@tarojs/components";

export default class QuesModel extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    state = {
      inputValue: '',
      textareaValue: ''
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
    cancel = () => {
      this.props.onCancelQuesModel &&  this.props.onCancelQuesModel()
    };
    ok = () => {
      const {inputValue, textareaValue} = this.state
      if (!inputValue && !textareaValue) {
        Taro.showToast({title: '请输入', icon: 'none'})
        return
      }
      const param = {
        inputValue,
        textareaValue
      };
      this.props.onGetQuesModelValue && this.props.onGetQuesModelValue(param)
    };
    changeInput = (dom: object ) => {
      const  {value: inputValue}  = dom.detail
      this.setState({
        inputValue
      })
    };
   changeTextarea = (dom: object) => {
     const  {value: textareaValue}  = dom.detail
     this.setState({
       textareaValue
     })
   };

    render() {
        return (
          <Dialog>
            <View className='ques_content'>
              <View className='ques_body'>
                <Input focus onInput={this.changeInput} placeholder='请输入名称' className='ques_input'/>
                <Textarea onInput={this.changeTextarea} placeholder='请输入描述' className='ques_textarea'/>
              </View>
              <View className='ques_footer'>
                <Button className='ques_sub' onClick={this.ok}> 确定 </Button>
                <Button onClick={this.cancel}> 取消 </Button>
              </View>
            </View>
          </Dialog>
        )
    }
}
