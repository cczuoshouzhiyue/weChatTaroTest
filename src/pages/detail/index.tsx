import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import { getTopicDetail, setUpreply, setReplyContent } from "../../actions/topicList";
import TopicInfo from '../../components/topicinfo/index'
import Replycontent from '../../components/topicinfo/replycontent'
import Replies from  '../../components/topicinfo/replies'
import {connect} from '@tarojs/redux'

const mapStateToProps =(store) => ({...store.topList, user: store.user});
const mapDispatchToProps =  (dispatch) => {
  return{
    getTopicDetail(params){
      dispatch(getTopicDetail(params))
    }
  }
};
@connect(mapStateToProps, mapDispatchToProps)
export default class Detail extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '话题详情'
    };
    state = {
      isShowReplayContent: false,
      currentData: {}
    };
    componentWillMount() {
     this.getDetailInfo()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }
    getDetailInfo = () => {
      const { id } = this.$router.params;
      const { user } = this.props;
      let params = {
        id: id,
        mdrender: true,
        accesstoken: user.cacheKey
      };
      this.props.getTopicDetail && this.props.getTopicDetail(params)
    };
    admire = (item) => {
      const { user } = this.props;
      const params = {
        replyid: item.id,
        accesstoken: user.cacheKey
      };
      setUpreply(params).then((result) => {
        if (result) {
          return this.getDetailInfo()
        }
        return Taro.showToast({title:'点赞失败', icon: 'none'})
      })
    };
    replayContent =(data)=> {
      this.setState({
        isShowReplayContent: true,
        currentData: data
      })
    };
    cancleReply = () => {
      this.setState({
        isShowReplayContent: false
      })
    };
    onOkReplayContent = (content) => {
      const { currentData } = this.state;
      const { user } = this.props;
      const params = {
        reply_id: currentData&&currentData.id || null,
        accesstoken: user.cacheKey,
        content: content,
        topicid:this.$router.params.id
      };
      setReplyContent (params).then((result) => {
       if (result) {
         this.cancleReply()
       }
     });

    };
    render() {
      const { topicinfo, replies } = this.props;
      const { isShowReplayContent } = this.state;
        return (
            <View className='topic-detail'>
              {isShowReplayContent ? <Replycontent onOkReplayContent={this.onOkReplayContent} onCancleReply={this.cancleReply}/>: ''}
              <TopicInfo info= {topicinfo}/>
              <Replies replies={replies} onAdmire={this.admire} onReplayContent={this.replayContent}/>
            </View>
        )
    }
}
