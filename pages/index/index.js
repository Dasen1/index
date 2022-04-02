// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    background: ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F0F220092145%2F200F2092145-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650879514&t=5b3595175a3be9cdd27898d4cb0f421b', 
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F7%2F11%2Fe23bfa96-6f7c-4c05-b4e7-0ee93d656d9f.jpg&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650879514&t=a73bf8aa9bdcb0d7046027bebf81f63c', 
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F041620104229%2F200416104229-2-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650879514&t=3d8baeb87c190b1d0814aae0db3494fc'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,

    isShow:false
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  // 页面加载验证是否登录
  onLoad() {
    const token = wx.getStorageSync('token')
    if(!token){
      this.setData({
        isShow :true
      })
    }
  },
  // 点击贷款进度
  fastClick(){
    // wx.navigateTo({
    //   url:"/pages/billcredit/billcredit"
    // })
    if(true){
      wx.showModal({
        // title: '认证',
        cancelText:"取消",
        confirmText:"开始认证",
        content: '您的企业还未认证，无贷款记录',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url:"/pages/authentication/authentication"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  

  // 贷款进度
  loansQuery(){
    wx.navigateTo({
      url:"/pages/lendingpace/lendingpace"
    })
  },
  // 贷款记录
  loansRecord(){
    wx.navigateTo({
      url:"/pages/loansrecord/loansrecord"
    })
  },
  // 贷款协议
  loansProtocol(){
    wx.navigateTo({
      url:"/pages/loanagreement/loanagreement"
    })
  },
  // 授信记录
  creditRecord(){
    wx.navigateTo({
      url:"/pages/creditrecord/creditrecord"
    })
  },
  // 还款计划
  repayment(){
    wx.navigateTo({
      url:"/pages/repayment/repayment"
    })
  },
  // 还款记录
  repaymentQuery(){
    wx.navigateTo({
      url:"/pages/repaymentrecord/repaymentrecord"
    })
  },

 async dataApi(){
          // try{
          //   const orders = await getAllOrder()
          //   console.log(orders,"这是个啥")
          // }catch(e){
          //   console.log(e,"这是请求失败了")
          // }
  },
})
