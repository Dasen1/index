// pages/repayment/repayment.js
import { getRepaymentPlan, getBankListPage } from "../../api/repaymentPlan"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bjectArray: [],
    index: 0,
    bjectArrayId: [
      {
        id: 1,
        name: '未还款'
      },
      {
        id: 3,
        name: '已结清'
      },
    ],
    indexId: 0,


    dataList: [],
    // 默认当前页
    pageNum: 1,
    total: 0,
    nomore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageBack()
    //  this.repayment()
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
    this.repayment()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 页面加载获取分页
  repayment: async function () {
    // 当前选中的银行
    let dataId
    this.data.bjectArray.map((item, index) => {
      if (index == this.data.index) {
        dataId = item.id
      }
    })
    // 当前选中的状态
    let dataIndex
    this.data.bjectArrayId.map((item, index) => {
      if (index == this.data.indexId) {
        dataIndex = item.id
      }
    })
    try {
      const orders = await getRepaymentPlan({ repaymentStatus: dataIndex, companyId: dataId, pageNum: this.data.pageNum })
      this.setData({
        dataList: this.data.dataList.concat(orders.list),
        pageNum: orders.pageNum,
        total: orders.total
      })
    } catch (e) {
      console.log(e)
    }
  },

  // 点击跳转详情
  creditRecord: function (e) {
    // 还款记录详情
    wx.navigateTo({
      url: "/pages/creditdetail/creditdetail?companyid=" + e.target.dataset.companyid
    })
  },

  // 点击切换银行
  bindPickerChange: async function (e) {
    this.setData({
      index: e.detail.value
    })
    this.repayment()
  },
  // 点击切换状态
  bindPickerChangeId: function (e) {
    this.setData({
      indexId: e.detail.value
    })
    this.repayment()
  },
  // 页面加载获取银行
  getPageBack: async function () {
    let page = await getBankListPage()
    let dataList = []
    page.list.map((item) => {
      let aw = {
        name: item.bankName,
        id: item.id
      }
      dataList.push(aw)
    })
    this.setData({
      bjectArray: dataList
    })
    this.repayment()
  }


})