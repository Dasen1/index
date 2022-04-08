// index.js
// 获取应用实例
import { getImageList, } from "../../api/home"
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
    }  //获取导航的信息
  },
  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },

  onShow() {
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
         console.log(navHeight,navTop,menuButtonObject.height,navObjWid)
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
  onLoad() {

  },
  // 点击图片跳转链接
  onSwiperTap(e) {
    wx.navigateTo({
      url: "/pages/out/out?skiplinkurl="+ e.target.dataset.skiplinkurl
    })
  },

  // 页面加载获取轮播图
  async getImagePage() {
    let {list} = await getImageList()
    this.setData({
      background_img:list
     })
  },


  // 点击贷款进度
  fastClick() {
    // wx.navigateTo({
    //   url:"/pages/billcredit/billcredit"
    // })
    if (true) {
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
    }
  },


  // 贷款进度
  loansQuery() {
    wx.navigateTo({
      url: "/pages/lendingpace/lendingpace"
    })
  },
  // 贷款记录
  loansRecord() {
    wx.navigateTo({
      url: "/pages/loansrecord/loansrecord"
    })
  },
  // 贷款协议
  loansProtocol() {
    wx.navigateTo({
      url: "/pages/loanagreement/loanagreement"
    })
  },
  // 授信记录
  creditRecord() {
    wx.navigateTo({
      url: "/pages/creditrecord/creditrecord"
    })
  },
  // 还款计划
  repayment() {
    wx.navigateTo({
      url: "/pages/repayment/repayment"
    })
  },
  // 还款记录
  repaymentQuery() {
    wx.navigateTo({
      url: "/pages/repaymentrecord/repaymentrecord"
    })
  },

  async dataApi() {
    // try{
    //   const orders = await getAllOrder()
    //   console.log(orders,"这是个啥")
    // }catch(e){
    //   console.log(e,"这是请求失败了")
    // }
  },
})
