// pages/components/midpag.js
import { postOpinInfo, postByToken, postSendCode } from "../../../api/order"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: Boolean,
      value: true
    },
    isShow: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    codeId: "",
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    },
    moved: function () {
    },
    detached: function () {

    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {

    },
    resize: function () {

    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    datasetNum(add) {
      let res = add
      let _this = this
      // 判断code是否有效
      wx.checkSession({
        success(resd) {
          wx.login({
            success: async code => {
              let data = {}
              data.code = code.code
              data.encryptedData = res.encryptedData
              data.iv = res.iv
              try {
                const orders = await postOpinInfo(data)
                wx.setStorageSync('token', orders)
                // 接口请求成功跳转首页关闭弹窗
                const dataInfo = await postByToken()
                wx.setStorageSync('info', dataInfo)
                _this.setData({
                  isShow: false
                })
                _this.triggerEvent('callSomeFun')
              } catch (e) {
                console.log(e,)
              }
            }
          })
        },

        fail() {
          // 重新获取code
          wx.login({
            success: res => {
              _this.setData({
                codeId: res.code
              })
            }
          })
          // 重新加载执行
          _this.datasetNum(res)
        }
      })
    },

    // 获取手机号登录
    handleGetPhoneNumber: function (e) {
      let res = e.detail
      this.datasetNum(res)
    },
    // 获取微信头像登录
    // getUserProfile: function () {
    //   // 获取微信用户跟code
    //   wx.getUserProfile({
    //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //     success: (res) => {
    //       wx.login({
    //         success: async code => {
    //           let data = {}
    //           data.code = code.code
    //           data.rawData = res.rawData
    //           data.signature = res.signature
    //           data.encryptedData = res.encryptedData
    //           data.iv = res.iv
    //           try {
    //             const orders = await postOpinInfo(data)
    //             wx.setStorageSync('token', orders)
    //             // 接口请求成功跳转首页关闭弹窗
    //             const dataInfo = await postByToken()
    //             console.log(dataInfo, "这是用户信息")
    //             wx.switchTab({
    //               url: `/pages/index/index`,
    //             })
    //             this.setData({
    //               isShow: false
    //             })
    //           } catch (e) {
    //             console.log(e,)
    //             this.setData({
    //               isShow: true
    //             })
    //           }
    //         }
    //       })
    //     }
    //   })
    // },

    // 跳转到手机登录
    skipClick: function () {
      wx.navigateTo({
        url: '/pages/mobilelogin/mobilelogin'
      })
    }
  }
})
