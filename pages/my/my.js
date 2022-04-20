// pages/my/my.js
import { getCustomerCheckIsCompany } from "../../api/home"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoUser:{}, //页面加载的用户信息

    isShow: false,
    isShowData: false,
    fromPage: {}, //企业认证信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isShow: false
    })
    const token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        isShow: true
      })
      return
    }
   

    this.userInfo()
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
    // 页面切走关闭弹窗

    this.setData({
      isShow: false
    })
    const token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        isShow: true
      })
      return
    }
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

  },
  // 页面加载获取用户信息
  userInfo(){
     let data =  wx.getStorageSync("info")
     this.setData({
       infoUser:data
     })
  },

  // 跳转认证弹窗
  certification() {
    wx.showModal({
      // title: '认证',
      cancelText: "取消",
      confirmText: "开始认证",
      content: '您的企业还未认证，无贷款记录',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/authentication/authentication"
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  // 退出登录
  logoOut() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录么？',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()  //清空全部存储
          wx.switchTab({
            url: `/pages/index/index`,
          })
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },

  // 贷款进度
  async loansQuery() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/lendingpace/lendingpace"
    })
  },
  // 贷款记录
  async loansRecord() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/loansrecord/loansrecord"
    })
  },
  // 贷款协议
  async loansProtocol() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/loanagreement/loanagreement"
    })
  },
  // 授信记录
  async creditRecord() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/creditrecord/creditrecord"
    })
  },
  // 还款计划
  async repayment() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/repayment/repayment"
    })
  },
  // 还款记录
  async repaymentQuery() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/repaymentrecord/repaymentrecord"
    })
  },

  // 信息修改
  async infoUpdata() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/information/information"
    })
  },

})