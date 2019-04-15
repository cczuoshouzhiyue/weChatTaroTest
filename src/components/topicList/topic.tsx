import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {myTimeToLocal} from '../../util/date'
import './index.less'

export default class Topic extends Component {

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
    goDetail = (item) =>  {
      Taro.navigateTo({
        url: '/pages/detail/index?id=' + item.id
      })
    };
    render() {
        const { item } = this.props
        return (
            <View className='topic' onClick={this.goDetail.bind(this, item)}>
              <Image className='topic-header' src={item.author?item.author.avatar_url:''}/>
              <View className='topic-content'>
                <View className='topic-title'>
                  {item.top?<Text className='topic-up'>置顶</Text>:(item.tab=='share'?<Text className='topic-up blue'>分享</Text>:<Text className='topic-up blue'>问答</Text>)}
                  <Text className='title'>{item.title}</Text>
                </View>
                <View className='topic-info'>
                  <Text>{item.author?item.author.loginname:''}</Text>
                  <Text>{item.reply_count+'/'+item.visit_count}</Text>
                  <Text>创建时间{myTimeToLocal(item.create_at)}</Text>
                </View>
              </View>
            </View>
        )
    }
}
