// pages/mobilelogin/mobilelogin.js
import { postSendCode, postPhoneLogin, postByToken } from "../../api/order"
let phoneNumber = ""
let phoneCode = ""
let sendScene = "CUSTOMER_PHONE_LOGIN"  //短信验证场景
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,

    send: true,  //倒计时跟发送
    alreadySend: false,
    second: 60,

  },
  getPhoneNumber(e) {
    // 获取输入手机号
    phoneNumber = e.detail.value
  },
  getPhoneCode(e) {
    // 获取输入验证码
    phoneCode = e.detail.value

  },

   // 发送短信验证码
  //  sendCode: async function () {
  //   if (!this.data.fromPage.applyPhoneNumber) {
  //     return wx.showToast({
  //       title: "请输入手机号码!",
  //       icon: "none",
  //       duration: 2000
  //     })
  //   }
  //   await postSmsSendCode({ sendScene: "ENTERPRISE_AUTH", phoneNumber: this.data.fromPage.applyPhoneNumber })

  //   this.setData({
  //     alreadySend: true,
  //     send: false
  //   })
  //   this.timer()
  // },
  // 倒计时功能
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  // 获取验证码
  async sendCode() {
    if (!phoneNumber) {
      wx.showToast({
        title: "请先输入手机号",
        icon: 'none',
        duration: 1500
      })
      return
    }
    try {
      const data = await postSendCode({ sendScene: sendScene, phoneNumber: phoneNumber })
      this.setData({
        alreadySend: true,
        send: false
      })
      this.timer()

    } catch (e) {
      console.log(e)
    }
  },
  // 同意用户手册
  checkboxChange: function (e) {
    if (e.detail.value.includes('1')) {
      this.setData({ isShow: true })
    } else {
      this.setData({ isShow: false })
    }
  },

  // 登录
  async loadByPhone() {
    if (!phoneNumber) {
      wx.showToast({
        title: "请先输入手机号",
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!phoneCode) {
      wx.showToast({
        title: "请先输入手机验证码",
        icon: 'none',
        duration: 1500
      })
      return
    }
    // if (!this.data.isShow) {
    //   wx.showToast({
    //     title: "请先同意用户手册",
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return
    // }

    try {
      //  获取token  通过token获取用户讯息
      const dataToken = await postPhoneLogin({ phoneNumber: phoneNumber, verifyCode: phoneCode })
      wx.setStorageSync('token', dataToken)  //存储token
      const dataInfo = await postByToken()
      wx.setStorageSync('info', dataInfo)  //存储用户信息
      // 跳转首页
       wx.switchTab({
              url: `/pages/index/index`,
            })
    } catch (e) {
         wx.showToast({
           title: `${e}`,
           icon:"none",
           duration:2000
         })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})