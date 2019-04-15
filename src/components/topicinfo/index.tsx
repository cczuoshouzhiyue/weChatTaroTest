import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, RichText} from '@tarojs/components'
import {myTimeToLocal} from '../../util/date'
import './index.less'

export default class TopicInfo extends Component {

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

    componentDidHide() {
    }

    render() {
      const { info } = this.props;
        return (
            <View className='info'>
              <View className='info-header'>
                <View className='topic-info-header-title'>{info.top?<Text className='topic-up'>置顶</Text>:(info.tab=='share'?<Text className='topic-up blue'>分享</Text>:<Text className='topic-up blue'>问答</Text>)}
                  <Text>{info.title}</Text>
                </View>
                <View className='topic-info-header-pie'>
                  <Text>{myTimeToLocal(info.create_at)}</Text>
                  <Text>{info.author? info.author.loginname:''}</Text>
                  <Text>{info.visit_count+'次浏览'}</Text>
                </View>
              </View>

              <View className='topic-info-body'>
                <RichText nodes={info.content} />
              </View>
              </View>

        )
    }
}
