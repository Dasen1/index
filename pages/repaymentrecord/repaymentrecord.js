// pages/repaymentrecord/repaymentrecord.js
import { getRepaymentRecordList, getBankListPage } from "../../api/repaymentPlan"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bjectArray: [],
    index: 0,
    // 默认当前页
    pageNum: 1,
    total: 0,
    nomore: false,
    dataList: [],
    date: '2022-01-01',//默认起始时间  
    date2: '',//默认结束时间 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageBack()
    this.setData({
      date2: this.getNowFormatDate()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 当前日期
  getNowFormatDate: function () {
    var date = new Date();
    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator + month + seperator + strDate;
    return currentdate;
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
    try {
      const orders = await getRepaymentRecordList({ repaymentStartTime: this.data.date, repaymentEndTime: this.data.date2, pageSize: 5, bankId: dataId, pageNum: this.data.pageNum })
      this.setData({
        dataList: this.data.dataList.concat(orders.list),
        pageNum: orders.pageNum,
        total: orders.total
      })
    } catch (e) {
      console.log(e)
    }

  },
  // 切换选择清空页面数据
  updata() {
    this.setData({
      dataList: [],
      pageNum: 1,
      total: 0,
      nomore: false,
    })
  },
  // 点击切换银行
  bindPickerChange: async function (e) {
    this.setData({
      index: e.detail.value
    })
    this.updata()
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
  },

  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    that.setData({
      date: e.detail.value,
    })
    this.updata()
    this.repayment()
  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
    })
    this.updata()
    this.repayment()
  }
})