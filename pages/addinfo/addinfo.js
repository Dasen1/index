// pages/addinfo/addinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    isShow: 1,
    items: [
      {value: '1', name: '是法人本人申请'},
      {value: '2', name: '否，是法人授权给本人申请', checked: 'true'},
    ]
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

  // 燃气公司选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 表单提交
  // 第一步 --
  formSubmit(e) {
    this.setData({
      isShow: 2
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  // 表单重置
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },
  // 表单提交
  // 第二步 --
  formSubmitInfo(e){
  console.log(e,"这是啥啊")
  },
  // 重置
  formResetInfo(e) {
  console.log(e,"这是第二步")
  },
  // // 点击上一步
  // lastStep(){
  //   console.log("我点了")
  //   this.setData({
  //     isShow:1
  //   })
  // }

  // 点击单选 -是否法人
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  }
})