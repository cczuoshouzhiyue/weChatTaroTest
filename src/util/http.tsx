import Taro from '@tarojs/taro'
export function get(url, data) {
  return Taro.request({url, data, method: 'GET'})
}
export function post(url, data) {
  return Taro.request({header: {
      'content-type': 'application/json'
    },url, data, method: 'POST'})
}

