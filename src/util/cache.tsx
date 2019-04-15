import Taro from '@tarojs/taro';

export function setCache(key:string, value: object):void {
  const params = JSON.stringify(value);
  Taro.setStorageSync(key, params)
}

export function getCache (key: string):any {
   const result: any = Taro.getStorageSync( key );
   if (result) {
     return  JSON.parse(result)
   }
   return  null
}
