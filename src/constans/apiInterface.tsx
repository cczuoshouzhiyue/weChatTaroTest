const rootPath = 'https://cnodejs.org/api/v1';
const apiObject = {
  getTopicsInfo: rootPath + '/topics',   // 主题首页
  getTopicDetail: rootPath + '/topic/',   // 主题详情
  upreply: rootPath+'/reply/',//点赞
  checkusertoken:rootPath+'/accesstoken', //验证用户token
  getuserinfo:rootPath+'/user/',//获取用户信息
  replytopic: rootPath+'/topic/',//回复话题消息
  createtopic:rootPath+'/topics',//新建话题
};
export default apiObject
