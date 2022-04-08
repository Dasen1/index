// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false

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

  },


  // 退出登录
  logoOut(){
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

  // 信息修改
  infoUpdata(){
    this.setData({
      isShow:true
     })
  },

  // 好的按钮
   onayClick(){
     this.setData({
      isShow:false
     })
   }
})