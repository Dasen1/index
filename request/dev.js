const current = 'dev' //区分开发环境和生产环境，
const profiles = {
  'dev': {
    'online': false,
    // 'baseURL': 'http://192.168.0.104:10001' //后端本地环境地址
    // 'baseURL': 'http://47.111.16.57:10001' //测试环境地址
    'baseURL': 'http://frloan.test.forhua.cc/api' //正式环境地址
  },
  'prod': {
    'online': true,
    'baseURL': '正式环境'//生产环境地址
  }
}
const ENV = profiles[current]
module.exports = ENV
