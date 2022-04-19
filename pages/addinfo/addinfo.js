// pages/addinfo/addinfo.js
import { getFuelGasCompanyList, postSmsSendCode, postCompanyAddUpdate, postFuelGasCompanyCheck } from '../../api/authentication'
import { getCompanyInfo,getAompanyAuthTemplate } from '../../api/home'
import { postByToken } from "../../api/order"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fromPage: {
      companyAccountName: "", //账号名称
      companyName: "", //公司名称
      taxNumber: "", //纳税人识别号
      companyBossName: "",//法人姓名
      bossIdCardNumber: "", //法人身份证号
      bossPhoneNumber: "", //法人手机号
      applyPhoneNumber: "",// 申请人手机号
      verifyCode: "",//手机验证码
      rouderList: [], // 燃气公司传递
      authPersonName: "",//被授权人姓名
      authPersonIdCardNumber: "", //被授权人身份证号
      isBossApply: 1, //是否是法人

      businessLicenseUrl: "", //营业执照
      bossIdCardFrontUrl: "",      // 法人身份证头像面
      bossIdCardReverseUrl: "",// 法人身份证国徽面
      authPersonFileUrl: "",// 授权代办文件
      authPersonIdCardFrontUrl: "",// 被授权人身份证头像面，
      authPersonIdCardReverseUrl: "",// 国徽面
    }
    ,
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

    send: true,  //倒计时跟发送
    alreadySend: false,
    second: 60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFuelGas()
    this.dataPageDetail()
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

  // 页面加载获取已绑定数据
  dataPageDetail: async function () {
    let data = wx.getStorageSync("info")
    if (data.companyId) {
      let pageDetail = await getCompanyInfo(data.companyId)
      console.log(pageDetail, "哇")
      //  获取回显字段
      this.setData({
        ['fromPage.companyAccountName']: pageDetail.companyAccountName, //账号名称
        ['fromPage.companyName']: pageDetail.companyName,  //公司名称
        ['fromPage.taxNumber']: pageDetail.taxNumber,   // 纳税人识别号
        ['fromPage.companyBossName']: pageDetail.companyBossName,  // 法人姓名
        ['fromPage.bossIdCardNumber']: pageDetail.bossIdCardNumber, // 法人身份证
        ['fromPage.bossPhoneNumber']: pageDetail.bossPhoneNumber, //法人手机号

        ['fromPage.applyPhoneNumber']: pageDetail.applyPhoneNumber,  // 申请人手机号
        ['fromPage.authPersonName']: pageDetail.authPersonName,  // 被授权人姓名
        ['fromPage.authPersonIdCardNumber']: pageDetail.authPersonIdCardNumber,  // 被授权人身份证

        ['fromPage.businessLicenseUrl']: pageDetail.businessLicenseUrl,  // 营业执照
        ['fromPage.bossIdCardFrontUrl']: pageDetail.bossIdCardFrontUrl,  // 法人证 正面
        ['fromPage.bossIdCardReverseUrl']: pageDetail.bossIdCardReverseUrl,  // 法人国徽
        ['fromPage.authPersonFileUrl']: pageDetail.authPersonFileUrl,  // 授权代办文件
        ['fromPage.authPersonIdCardFrontUrl']: pageDetail.authPersonIdCardFrontUrl,  // 被授权证 正面
        ['fromPage.authPersonIdCardReverseUrl']: pageDetail.authPersonIdCardReverseUrl,  // 本授权人 国徽
        ['fromPage.isBossApply']: pageDetail.isBossApply //是否法人申请
      })

      //  获取燃气公司回显字段
      let list = this.data.itemsDeta
      let listPush = []
      let pageflex = list.map((item) => {
        pageDetail.fuelGasCompanyList.map((items) => {
          if (item.id == items.id) {
            item.checked = true
            listPush.push(items.id)
          }
        })
        return item
      })
      this.data.fromPage.rouderList = listPush
      // rouderList
      this.setData({
        itemsDeta: pageflex
      })
      //  是否法人申请
      if (pageDetail.isBossApply) {
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value == pageDetail.isBossApply
        }
        this.setData({
          items,
          pageIsShow: false
        })
      } else {
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value == pageDetail.isBossApply
        }
        this.setData({
          items,
          pageIsShow: true
        })
      }
    }
  },

  // 燃气公司选择
  checkboxChange: function (e) {
    // 获取燃气公司跟纳税人识别号一起传后端才能进行下一步
    this.data.fromPage.rouderList = e.detail.value
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
              case 1:
                console.log("走这里了么")
                that.setData({
                  ['fromPage.businessLicenseUrl']: page_v.result
                })//营业执照
                break;
              case 2:
                that.setData({
                  ['fromPage.bossIdCardFrontUrl']: page_v.result
                })//法人头像
                break;
              case 3:
                that.setData({
                  ['fromPage.bossIdCardReverseUrl']: page_v.result
                })//法人国徽
                break;
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

  // 下载默认样本
  async download(){
    let data =  await getAompanyAuthTemplate()
    // console.log(data,"返回内容")
  },


  // 表单提交
  async formSubmit(e) {
    // 第二页的提交
    if (this.data.isShow == 2) {
      let list = e.detail.value
      let listNew = this.data.fromPage
      if (listNew.isBossApply == 1) {
        if (!list.applyPhoneNumber) {
          return wx.showToast({
            title: "请输入手机号!",
            icon: "none",
            duration: 2000
          })
        }
        if (!list.verifyCode) {
          return wx.showToast({
            title: "请输入验证码!",
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
      } else {
        if (listNew.isBossApply == 0) {
          if (!list.applyPhoneNumber) {
            return wx.showToast({
              title: "请输入手机号!",
              icon: "none",
              duration: 2000
            })
          }
          if (!list.verifyCode) {
            return wx.showToast({
              title: "请输入验证码!",
              icon: "none",
              duration: 2000
            })
          }
          if (!list.authPersonName) {
            return wx.showToast({
              title: "请授权人授权人姓名!",
              icon: "none",
              duration: 2000
            })
          }
          if (!list.authPersonIdCardNumber) {
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
      let data = wx.getStorageSync("info")
      // 需要提交后端接口数据
      let page = {
        ...list,
        fuelGasCompanyIdList: listNew.rouderList, // "燃气公司"
        isBossApply: listNew.isBossApply,  // "" // "是否法人"
        businessLicenseUrl: listNew.businessLicenseUrl, //营业执照
        bossIdCardFrontUrl: listNew.bossIdCardFrontUrl,      // 法人身份证头像面
        bossIdCardReverseUrl: listNew.bossIdCardReverseUrl,// 法人身份证国徽面
        authPersonFileUrl: listNew.authPersonFileUrl,// 授权代办文件
        authPersonIdCardFrontUrl: listNew.authPersonIdCardFrontUrl,// 被授权人身份证头像面，
        authPersonIdCardReverseUrl: listNew.authPersonIdCardReverseUrl,// 国徽面
        id: data.companyId ? data.companyId : ""
      }
      try {
        await postCompanyAddUpdate({ ...page })
        const dataInfo = await postByToken()
        wx.setStorageSync('info', dataInfo)  //存储用户信息
        wx.showModal({
          showCancel:false,
          confirmText: "回首页",
          content: '企业认证信息上传成功',
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
      } catch (e) {
        wx.showToast({
          title: e,
          icon: 'none',
          duration: 1500
        })
      }


    }
    // 第一页的提交
    if (this.data.isShow == 1) {
      let fromData = e.detail.value
      if (fromData.companyAccountName && fromData.companyName && fromData.taxNumber
        && this.data.fromPage.rouderList.length && fromData.companyBossName && fromData.bossIdCardNumber && fromData.bossPhoneNumber
      ) {
      } else {
        return wx.showToast({
          title: "请将信息补充完整!",
          icon: "none",
          duration: 2000
        })
      }
      //  校验燃气公司跟企业税号是否匹配
      try {
        let dataset = await postFuelGasCompanyCheck({ fuelGasIdList: this.data.fromPage.rouderList, taxNumber: fromData.taxNumber })
        if (dataset) {
          this.setData({
            isShow: 2
          })
        }
      } catch (e) {
        return wx.showToast({
          title: e,
          icon: "none",
          duration: 2000
        })
      }


    }
  },
  // 表单重置
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },

  // 点击上一步
  lastStep() {
    this.setData({
      isShow: 1
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

  // 页面加载获取燃气公司列表
  getFuelGas: async function () {
    let company = await getFuelGasCompanyList()
    this.setData({
      itemsDeta: company
    })
  },

  //发送验证码手机号获取
  sendInput: function (e) {
    this.data.fromPage.applyPhoneNumber = e.detail.value
  },
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
  }

})