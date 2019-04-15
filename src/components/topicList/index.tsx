import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView } from '@tarojs/components'
import {connect} from '@tarojs/redux'
import Topic from './topic'
import {getTopicInfo, getNextTopicInfo} from '../../actions/topicList'
import './index.less'


const mapStateToProps =(store) => ({...store.topList, currentCata:store.menu.currentCata});
let isLoading = false;
const mapDispatchToProps =  (dispatch) => {
  return{
    getTopicInfo(param){
      dispatch(getTopicInfo(param))
    },
    getNextTopicInfo(param){
      dispatch(getNextTopicInfo(param))
    },
  }
};
@connect(mapStateToProps, mapDispatchToProps)
export default class TopicList extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    componentWillMount() {
      isLoading = false
      let  {page, limit, currentCata} = this.props;
      const params = {
        page,
        limit,
        tab: currentCata.key
      };
      this.props.getTopicInfo && this.props.getTopicInfo(params)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }
    componentWillReceiveProps (props) {
      if (props.list !== this.state.list) {
         return isLoading = false
      }
    }
    componentDidHide() {
    }
    onScrollToLower () {
      if (isLoading) {
        return
      }
      isLoading = true;
      let  {page, limit, currentCata} = this.props;
      const params = {
        page: page + 1,
        limit,
        tab: currentCata.key
      };
      this.props.getNextTopicInfo && this.props.getNextTopicInfo(params)
    }

    render() {
      const { list } = this.props
        return (
            <ScrollView scrollY={true} style={{height:'650PX'}}  onScrollToLower={this.onScrollToLower.bind(this)}>
              {list.map(item => <Topic item = {item} key = {item.id}/> }
            </ScrollView>
        )
    }
}
