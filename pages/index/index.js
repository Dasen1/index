// index.js
// 获取应用实例
import { getImageList, getBankListpage,getBankSkipInfo, getCustomerCheckIsCompany, getCompanyGrantCreditStatus } from "../../api/home"
const app = getApp()

Page({
  data: {
    background_img: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    isShow: false,

    globalData: {  //自定义导航栏获取刘海屏
      navHeight: "",
      navTop: "",
      navObj: "",
      navObjWid: ""
    }, //获取导航的信息

    // 银行信息
    backList: []
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },

  onShow() {
    // 页面进来先默认不展开
    this.setData({
      isShow: false
    })
    // 获取顶部胶囊详细信息
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width, // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.data.globalData.navHeight = navHeight; //导航栏总体高度
        this.data.globalData.navTop = navTop; //胶囊距离顶部距离
        this.data.globalData.navObj = menuButtonObject.height; //胶囊高度
        this.data.globalData.navObjWid = navObjWid; //胶囊宽度(包括右边距离)
      },
      fail(err) {
        console.log(err);
      }
    })

    // 页面加载验证是否登录
    const token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        isShow: true
      })
      return
    }
    // 页面加载请求轮播
    this.getImagePage()
  },
  // 页面加载请求银行数据
  async BankListpage() {
    let backList = await getBankListpage()
    this.setData({
      backList: backList.list
    })
  },

  onLoad(opt) {
    // 页面刷新时请求
    this.setData({
      isShow: false
    })
    const token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        isShow: true
      })
      return
    }
    // 页面加载请求轮播
    this.getImagePage()

  },
  // 点击图片跳转链接
  onSwiperTap(e) {
    wx.navigateTo({
      url: "/pages/out/out?skiplinkurl=" + e.target.dataset.skiplinkurl
    })
  },

  // 页面加载获取轮播图
  async getImagePage() {
    let { list } = await getImageList()
    this.setData({
      background_img: list
    })
     // 银行信息
     this.BankListpage()
  },

  // 跳转认证弹窗
  certification() {
    wx.showModal({
      // title: '认证',
      cancelText: "取消",
      confirmText: "开始认证",
      content: '您的企业还未认证，无贷款记录',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/authentication/authentication"
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 认证流程
  fastClick: async function (bankcode) {
    console.log(bankcode, "啥啊")
    //1.先验证是否绑定企业 -无绑定企业弹窗走企业认证-回首页
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }

    // 2.企业认证完-校验是否银行进行银行认证-无认证走银行认证-回首页
    let setInfo = wx.getStorageSync("info")
    console.log(bankcode,setInfo.companyId,"什么东西啊，“嘎嘎嘎")
    let bankIsShow = await getCompanyGrantCreditStatus({ bankCode: bankcode, companyId: setInfo.companyId })
    //  返回1  需要走银行认证
    //  返回2  审批中 弹窗将返回的信息修改好
    //  返回3 成功 直接跳转银行
    //  返回4 过期 直接跳转银行
    if(bankIsShow.cstType==1){
      wx.showModal({
        // title: '认证',
        cancelText: "取消",
        confirmText: "开始认证",
        content: '您的企业还未进行银行认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/personaldata/personaldata"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    if(bankIsShow.cstType==2){
      wx.showModal({
         showCancel: false,
        //  cancelText: "取消",
         confirmText: "我知道了",
         content: `${bankIsShow.feedBackDesc}`,
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
    
    if(bankIsShow.cstType==3){ //跳转银行小程序
      let data = await  getBankSkipInfo({companyId:setInfo.companyId,bankId:bankcode,pageFlag:0})
      var str = 'channel:LND,custMobile:18518760330,token:N9HXpg,pageFlag:0,from:2,sign:签名值';
      wx.navigateToMiniProgram({
        appId: 'wx30747c10946af5af',
        path: 'pages/entrance/index?param=' + encodeURIComponent(str),
        envVersion:"release",
        // extraData: {
        //   foo: 'bar'
        // },
        success(res) {
          // 打开成功
          console.log("成功了么")
        },
        fail(res){
          console.log(res,"跳转失败");
       }
      })
    }
    if(bankIsShow.cstType==4){

    }

 
    // 3.银行认证完判断是否有可贷款金额-无可贷提示银行审核中，请等待
    
    // 4.携带需要数据跳转银行小程序

  },
  //  快捷贷款
  fastLoan: function (e) {
    let bankcode = e.currentTarget.dataset.bankcode
    this.fastClick(bankcode)
  },
  // 快捷还款按钮
  quickPayment: function () {
   this.fastClick()
  //  跳转银行小程序方法
   
  },


  // 贷款进度
  async loansQuery() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/lendingpace/lendingpace"
    })
  },
  // 贷款记录
  async loansRecord() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/loansrecord/loansrecord"
    })
  },
  // 贷款协议
  async loansProtocol() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/loanagreement/loanagreement"
    })
  },
  // 授信记录
  async creditRecord() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/creditrecord/creditrecord"
    })
  },
  // 还款计划
  async repayment() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/repayment/repayment"
    })
  },
  // 还款记录
  async repaymentQuery() {
    let isShow = await getCustomerCheckIsCompany()
    if (!isShow) {
      this.certification()
      return false
    }
    wx.navigateTo({
      url: "/pages/repaymentrecord/repaymentrecord"
    })
  },
})
