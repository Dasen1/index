const current = 'dev' //区分开发环境和生产环境，
const profiles = {
  'dev': {
    'online': false,
    // 'baseURL': 'https://applets.zhiqi.cn' //开发环境地址
    'baseURL': 'http://192.168.0.104:10001' //本地环境地址
  },
  'prod': {
    'online': true,
    'baseURL': '正式环境'//生产环境地址
  }
}
const ENV = profiles[current]
module.exports = ENV
