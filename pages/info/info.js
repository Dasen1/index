// pages/info/info.js
import { getMessageList } from "../../api/info"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    // 默认当前页
    pageNum: 1,
    total:0,
    nomore :false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    // 	//将第一页数据传递给DATA遍历组
    //   DATA: this.data.DATA1
    // })
    this.infoList()
  },
  infoList: async function () {
    // console.log(this.data.pageNum, "多少")
    try {
      wx.showLoading({
        title: '加载中',
      })
      const orders = await getMessageList({ pageNum: this.data.pageNum })
      this.setData({
        dataList: this.data.dataList.concat(orders.list),
        pageNum: orders.pageNum,
        total:orders.total
      })
      wx.hideLoading()
    } catch (e) {
      console.log(e)
    }
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
    console.log("到底了么")
    let index = this.data.pageNum
    console.log(index + 1, "啥啊")
    this.setData({
      pageNum: index + 1
    })
    if(this.data.dataList.length >= this.data.total){
      return this.setData({
        nomore:true
      })
    }

    console.log(this.data.pageNum, "多少ee")
    this.infoList()

    // var DATA = this.data.DATA.concat(this.data.DATA2)
    // //重新将数据导入视图层data
    // this.setData({
    //   DATA: DATA
    // })
  },
  onShow: function(){
    
    this.setData({
      dataList: [],
      // 默认当前页
      pageNum: 1,
      total:0,
      nomore :false,
    })
    this.infoList()
},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})