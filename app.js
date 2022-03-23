// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('token') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('token', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // console.log(res,"走了嘎嘎")
    //     wx.getUserInfo({
    //       success:item =>{
    //         console.log(item,"走了嘎嘎")
    //         console.log(res,"hahahha")
    //       }
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})
