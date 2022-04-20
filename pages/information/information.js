// pages/information/information.js
import { getCompanyInfo, } from "../../api/home"
import {  postSmsSendCode, postCompanyAddUpdate, } from '../../api/authentication'
import { postByToken } from "../../api/order"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoUser: {}, //页面加载的用户信息

    isShow: false,
    isShowData: false,
    fromPage: {}, //企业认证信息

    send: true,  //倒计时跟发送
    alreadySend: false,
    second: 60,

    // 燃气公司列表
    itemsDeta: [], //回显
    index: 0,
    isShow: 1, //模块页码
    items: [
      { value: '1', name: '是法人本人申请', checked: "true" },
      { value: '0', name: '否，是法人授权给本人申请' },
    ],
    // 是否法人申请显示状态
    pageIsShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载获取企业认证信息
    this.companyInfo()
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

  //发送验证码手机号获取
  sendInput: function (e) {
    this.data.fromPage.applyPhoneNumber = e.detail.value
  },
  // 页面加载获取认证信息数据
  async companyInfo() {
    let dataID = wx.getStorageSync("info")
    if (dataID.companyId) {
      let dataList = await getCompanyInfo(dataID.companyId)
      // console.log(dataList,"这是啥东西")
      //  是否法人申请
      if (dataList.isBossApply) {
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value == dataList.isBossApply
        }
        this.setData({
          items,
          pageIsShow: false
        })
      } else {
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value == dataList.isBossApply
        }
        this.setData({
          items,
          pageIsShow: true
        })
      }
      this.setData({
        fromPage: dataList
      })
    }
  },
  // --------------------------------------------------
  // 发送短信验证码
  sendCode: async function () {
    if (!this.data.fromPage.applyPhoneNumber) {
      return wx.showToast({
        title: "请输入手机号码!",
        icon: "none",
        duration: 2000
      })
    }
    await postSmsSendCode({ sendScene: "ENTERPRISE_AUTH", phoneNumber: this.data.fromPage.applyPhoneNumber })

    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },
  // 倒计时功能
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  // 点击单选 -是否法人申请
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == 1) {
      this.data.fromPage.isBossApply = 1
      this.setData({
        pageIsShow: false
      })
    } else {
      this.data.fromPage.isBossApply = 0
      this.setData({
        pageIsShow: true
      })
    }
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  },

  // 上传图片及附件
  async dataApd(e) {
    let listId = e.currentTarget.dataset.item
    console.log(listId)
    // return
    const that = this
    const token = wx.getStorageSync('token')
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://frloan.test.forhua.cc/api/upload/disk', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            Authorization: token
          },
          formData: {
            uploadScene: "BANK_FILE"
          },
          success(res) {
            let page_v = JSON.parse(res.data)
            switch (listId) {
              case 4:
                that.setData({
                  ['fromPage.authPersonFileUrl']: page_v.result
                })//授权文件
                break;
              case 5:
                that.setData({
                  ['fromPage.authPersonIdCardFrontUrl']: page_v.result
                })//授权人正
                break;
              case 6:
                that.setData({
                  ['fromPage.authPersonIdCardReverseUrl']: page_v.result
                })//授权人反
                break;

            }
          }
        })
      }
    })
  },

  async formSubmit(e) {
    // 将修改信息跟元数据合并到一起
    let list = e.detail.value
    let dataPage = this.data.fromPage

    let data = wx.getStorageSync("info")
    let listNew = {
      ...dataPage,
      ...list,
      id: data.companyId ? data.companyId : ""
    }
    console.log(listNew, "啥啊啊啊")
    // 处理燃气公司数组
    listNew.fuelGasCompanyIdList = listNew.fuelGasCompanyList.map((item) => {
      return item.id
    })
    // console.log(dataset, "啥啊")

    // return
    if (listNew.isBossApply == 1) {
      if (!listNew.applyPhoneNumber) {
        return wx.showToast({
          title: "请输入手机号!",
          icon: "none",
          duration: 2000
        })
      }
      if (!listNew.verifyCode) {
        return wx.showToast({
          title: "请输入验证码!",
          icon: "none",
          duration: 2000
        })
      }
    } else {
      if (listNew.isBossApply == 0) {
        if (!listNew.applyPhoneNumber) {
          return wx.showToast({
            title: "请输入手机号!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.verifyCode) {
          return wx.showToast({
            title: "请输入验证码!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.authPersonName) {
          return wx.showToast({
            title: "请授权人授权人姓名!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.authPersonIdCardNumber) {
          return wx.showToast({
            title: "请输入授权人身份证号!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.businessLicenseUrl) {
          return wx.showToast({
            title: "请上传营业执照!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.bossIdCardFrontUrl) {
          return wx.showToast({
            title: "请上传法人身份证正面照!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.bossIdCardReverseUrl) {
          return wx.showToast({
            title: "请上传法人身份证国徽面!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.authPersonFileUrl) {
          return wx.showToast({
            title: "请上传授权代办文件!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.authPersonIdCardFrontUrl) {
          return wx.showToast({
            title: "请上传被授权人身份证正面照!",
            icon: "none",
            duration: 2000
          })
        }
        if (!listNew.authPersonIdCardReverseUrl) {
          return wx.showToast({
            title: "请被授权人国徽面!",
            icon: "none",
            duration: 2000
          })
        }
      }
    }
    // 需要提交后端接口数据
    try {
      await postCompanyAddUpdate({ ...listNew })
      const dataInfo = await postByToken()
      wx.setStorageSync('info', dataInfo)  //存储用户信息
      wx.showModal({
        showCancel: false,
        // title: '认证',
        // cancelText: "取消",
        confirmText: "我知道了",
        content: '企业认证信息修改成功',
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: "/pages/my/my" // 你的登陆页面地址
            });
          }
        }
      })
    } catch (e) {
      console.log(e)
      wx.showToast({
        title: e,
        icon: 'none',
        duration: 1500
      })
    }
  }

})