import Taro, { Component, Config } from '@tarojs/taro';
import { View, Input, Button } from '@tarojs/components';
import { myTimeToLocal } from '../../util/date'
import './index.less'

export default class Panel extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillMount () {

  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  toDetail = (item) => {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + item.id
    })
  };
  render () {
    const { listData,title } = this.props
    return (
      <View className='topic-panel'>
        <View className='topic-panel-title'> {title}</View>
        {listData.map((item)=>{
          return  (<View onClick={this.toDetail.bind(this,item)} className='topic-panel-list' key={item.id}>
            <Image className='topic-panel-list-img' src={item.author.avatar_url} />
            <Text className='topic-panel-list-title'>{item.title}</Text>
            <Text className='topic-panel-list-date'>{myTimeToLocal(item.last_reply_at)}</Text>
          </View>)
        })
        }
      </View>
    )
  }
}
