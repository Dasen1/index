// pages/mobilelogin/mobilelogin.js
import {postSendCode} from "../../api/order"
let phoneNumber = ""
let phoneCode = ""
let sendScene = "CUSTOMER_PHONE_LOGIN"  //短信验证场景
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getPhoneNumber(e){
    // 获取输入手机号
    phoneNumber = e.detail.value
    console.log(e.detail.value,"手机号")
  },
 getPhoneCode(e){
    // 获取输入验证码
    phoneCode = e.detail.value
    
  },
 async sendPhoneCode(){
    // 点击发送短信
    if(!phoneNumber){
       wx.showToast({
        title:"请先输入手机号",
        icon: 'none',
        duration: 1500
      })
      return
    }
    try{
      const data = await postSendCode({sendScene:sendScene,phoneNumber:phoneNumber})

    }catch(e){
      console.log(e)
    }
  },
  loadByPhone(){
  // 点击登录
   


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