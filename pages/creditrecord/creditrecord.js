// pages/loansrecord/loansrecord.js
import { getPushRecordList } from '../../api/repaymentPlan'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],

    pageNum: 1,
    total: 0,
    nomore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageList()
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
    let index = this.data.pageNum
    this.setData({
      pageNum: index + 1
    })
    if (this.data.dataList.length >= this.data.total) {
      return this.setData({
        nomore: true
      })
    }
    this.getPageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  // 页面加载数据
  getPageList: async function () {
    try {
      const orders = await getPushRecordList({ pageSize: 5, pageNum: this.data.pageNum })
      this.setData({
        dataList: this.data.dataList.concat(orders.list),
        pageNum: orders.pageNum,
        total: orders.total
      })
    } catch (e) {
      console.log(e)
    }
  },
  // 点击详情跳转
  clickDetail(e) {
    wx.navigateTo({
      url: "/pages/loansrecordDetail/loansrecordDetail?id=" + e.currentTarget.dataset.id
    })
  }

})