// pages/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    setIsShow:false

  },
  // 选中隐私协议
  checkboxChange: function (e) {
    if (e.detail.value.includes('1')) {
      this.setData({ isShow: true })
    } else {
      this.setData({ isShow: false })
    }
  },
  setCheckboxChange:function(e){
    if (e.detail.value.includes('2')) {
      this.setData({ setIsShow: true })
    } else {
      this.setData({ setIsShow: false })
    }
  },
  // 正常状态同意
  okayClick: function () {
    if(this.data.isShow){
      wx.navigateTo({
        url:"/pages/addinfo/addinfo"
      })
    }else{
      wx.showToast({
        title: '！请先同意隐私协议',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 置灰状态同意
  okayClick2(){
    wx.showToast({
      title: '！请先同意隐私协议',
      icon: 'none',
      duration: 2000
    })
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