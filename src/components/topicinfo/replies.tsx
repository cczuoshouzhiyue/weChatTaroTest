import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, RichText} from '@tarojs/components'
import {myTimeToLocal} from '../../util/date'
import './index.less'
const  isweapp=process.env.TARO_ENV=="weapp"
export default class Replies extends Component {

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
    admire = (item) => {
      this.props.onAdmire && this.props.onAdmire(item)
    };
    replayContent = (item) => {
      this.props.onReplayContent && this.props.onReplayContent(item)
    };
    render() {
      const { replies } = this.props;
      return (<View className='replies'>
        {replies.map((item, index) => {
          return (
          <View className='replies-info' key={item.id}>
            <View className='replies-left'>
              <View className='replies-author'>
                <Image className='topicinfo-repliy-image'  src={item.author?item.author.avatar_url:''} />
              </View>

              <View className='replies-content'>
                <View className='replies-title'>
                  <Text className='loginname'>{item.author?item.author.loginname:''}</Text>
                  <Text className='floor'>{(index+1)+'楼'}</Text>
                  <Text className='time'>{myTimeToLocal(item.create_at)}</Text>
                </View>
                <View className='topicinfo-repliy-right-content'>
                  {
                    isweapp?<RichText nodes={item.content} />:<View dangerouslySetInnerHTML={{__html:item.content}} ></View>
                  }
                </View>
              </View>
              </View>

            <View className='replies-right'>
              <Image  className='topicinfo-repliy-image' onClick={this.admire.bind(this,item)}  src={item.is_uped?require('../../assets/img/myzan.png'):require('../../assets/img/zan.png')} />
              <Text className='topicinfo-repliy-text'>{item.ups.length}</Text>
              <Image onClick={this.replayContent.bind(this, item)} className='topicinfo-repliy-image' src={require('../../assets/img/zhuan.png')} />
            </View>
          </View>
          )
        })}
      </View>)
    }
}
