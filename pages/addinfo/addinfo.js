// pages/addinfo/addinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPage: {
      name: "", //账号名称
      bIdType: "", //公司名称
      bIdNumber: "", //纳税人识别号
      certDueDate: "",//法人姓名
      tradeType: "", //法人身份证号
      registerType: "", //法人手机号
      frName:"",// 申请人手机号
      inputCode:"" //手机验证码
    }
    ,
    itemsDeta: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国', checked: 'true' },
      { value: 'BRA', name: '巴西' },
      { value: 'JPN', name: '日本' },
      { value: 'ENG', name: '英国' },
      { value: 'FRA', name: '法国' }
    ],
    index: 0,
    isShow: 1,
    items: [
      { value: '1', name: '是法人本人申请' },
      { value: '2', name: '否，是法人授权给本人申请', checked: 'true' },
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
  checkboxChange: function (e) {
    // 获取燃气公司跟纳税人识别号一起传后端才能进行下一步
    console.log(e.detail.value,"啥啊这是")
  },
  // 上传图片及附件
  dataApd(){
    console.log("123")
  },

  // 点击下一步校验纳税人识别号跟燃气公司是否匹配
  nextTop(){
    console.log(this.data.fromPage,"啥啊")
    console.log("我点了")
    this.setData({
      isShow: 2
    })
  },
  // 表单提交
  formSubmit(e) {
    let data = e.detail.value
    // 获取表单数据 提交到后端接口 并跳转首页
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  // 表单重置
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },

  // 点击上一步
  lastStep(){
    console.log("我点了")
    this.setData({
      isShow:1
    })
  },

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