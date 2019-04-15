/* eslint-disable react/no-unused-state,react/jsx-tag-spacing */
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Button, ScrollView} from '@tarojs/components'
import QuesModel from '../../components/quesModel/index'
import './index.less'

export default class Index extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '测试页面'
    }
    state = {
      isShowModel: false,
      list: [],
      liNode: null
    };
    componentWillMount() {
      const { name } = this.$router.params
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }
    quesSubmit = () => {
      this.setState({
        isShowModel: true
      });
    };
    cancelQuesModel = () =>{
      this.setState({
        isShowModel: false
      });
    };
    getQuesModelValue = (param: any) => {
      const list = this.state.list;
      list.push(param);
      this.setState({
        list
      }, ()=> {
        this.canvasLiNode(list);
        this.cancelQuesModel()
      })
    };
    canvasLiNode = (list: Array) => {
      let  liNode = null;
      if (list.length === 0) {
        return liNode
      }
      // liNode = list.map((item=> <Text key={item.intputValue}>{item.intputValue}</Text>))
      this.setState({
        liNode
      })
    };
    render() {
      const {isShowModel, liNode} = this.state;
        return (
            <View className='index'>
              <Text className='question_title'>问答实例</Text>
              <ScrollView>
                 <View>
                   {liNode}
                 </View>
              </ScrollView>
              {isShowModel ? <QuesModel onCancelQuesModel={this.cancelQuesModel} onGetQuesModelValue={this.getQuesModelValue} /> : ''}
              <Button className='question_btn' onClick={this.quesSubmit}>提交</Button>
            </View>
        )
    }
}
