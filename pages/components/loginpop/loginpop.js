// pages/components/midpag.js
import { postOpinInfo, postByToken } from "../../../api/order"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // console.log("走了么1")
    },
    moved: function () {
      // console.log("走了么2")
    },
    detached: function () {
      // console.log("走了么3")
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {
      // console.log("走了么啊2")
    },
    resize: function () {
      // console.log("走了么啊3")
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    // handleGetPhoneNumber: (e) => {
    //   console.log(e, ",-------------")
    // },
    getUserProfile: function () {
      // 获取微信用户跟code
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res, "这是啥")
          wx.login({
            success: async code => {
              console.log(code, "这是code")
              let data = {}
              data.code = code.code
              data.rawData = res.rawData
              data.signature = res.signature
              data.encryptedData = res.encryptedData
              data.iv = res.iv
              try {
                const orders = await postOpinInfo(data)
                wx.setStorageSync('token', orders)
                // 接口请求成功跳转首页关闭弹窗
                const dataInfo = await postByToken()
                console.log(dataInfo, "这是用户信息")
                wx.switchTab({
                  url: `/pages/index/index`,
                })
                this.setData({
                  isShow: false
                })
              } catch (e) {
                console.log(e,)
                this.setData({
                  isShow: true
                })
              }
            }
          })
        }
      })
    },

    // 跳转到手机登录
    skipClick: function () {
      wx.navigateTo({
        url: '/pages/mobilelogin/mobilelogin'
      })
    }
  }
})
