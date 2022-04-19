// pages/personaldata/personaldata.js
import { getCompanyInfo } from '../../api/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPage: {
      companyName: "",//公司名称
      taxNumber: "",//纳税人识别号
      companyBossName: "",//法人姓名
      bossIdCardNumber: "",//法人身份证号
      bossPhoneNumber: "",//法人手机号
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.infoList()
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

  // 页面加载获取认证过的企业信息回显
  infoList: async function () {
    let data = wx.getStorageSync("info")
    if (data.companyId) {
      let pageDetail = await getCompanyInfo(data.companyId)
      console.log(pageDetail, "啥啊嘎嘎嘎")
      this.setData({
        ["fromPage.companyName"]: pageDetail.companyName, //公司名称
        ["fromPage.taxNumber"]: pageDetail.taxNumber, //纳税人识别号
        ["fromPage.companyBossName"]: pageDetail.companyBossName, //法人姓名
        ["fromPage.bossIdCardNumber"]: pageDetail.bossIdCardNumber, //法人身份证号
        ["fromPage.bossPhoneNumber"]: pageDetail.bossPhoneNumber, //法人手机号
      })
    }
  },

  // 提交银行数据
  formSubmit: function (e) {
    let list = e.detail.value
    console.log(list,"什么")
    wx.showModal({
      showCancel:false,
      confirmText: "回首页",
      content: '银行认证信息信息上传成功，等待银行审核中！',
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: "/pages/index/index"
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})