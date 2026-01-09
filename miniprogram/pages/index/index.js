// index.js
Page({
  /*data: {
    pendingOrders: 5 // 待接单数量，可以根据实际情况调整
  },*/

  onLoad: function() {
    console.log('首页加载');
  },

  // 检查登录状态
  checkLogin: function() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false;
    if (!isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再使用该功能',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login?from=index'
            });
          }
        }
      });
      return false;
    }
    return true;
  },

  // 导航到代取快递页面
  navigateToExpress: function() {
    if (!this.checkLogin()) return;
    
    wx.showToast({
      title: '代取快递',
      icon: 'none'
    });
    // 实际开发中可以跳转到具体页面
     wx.navigateTo({
       url: '/pages/express/express'
     });
  },

  // 导航到代买服务页面
  navigateToBuy: function() {
    if (!this.checkLogin()) return;
    
    wx.showToast({
      title: '代买服务',
      icon: 'none'
    });
    wx.navigateTo({
      url: '/pages/buy-it/buy'
    });
  },

  // 导航到代办急事页面
  navigateToUrgent: function() {
    if (!this.checkLogin()) return;
    
    wx.showToast({
      title: '代办急事',
      icon: 'none'
    });
    wx.navigateTo({
      url: '/pages/urgent/urgent'
    });
  },

  // 导航到陪替服务页面
  navigateToCompany: function() {
    if (!this.checkLogin()) return;
    
    wx.showToast({
      title: '陪替服务',
      icon: 'none'
    });
    wx.navigateTo({
      url: '/pages/company/company'
    });
  },

  // 导航到租借物品页面
  navigateToRent: function() {
    if (!this.checkLogin()) return;
    
    wx.showToast({
      title: '租借物品',
      icon: 'none'
    });
    wx.navigateTo({
      url: '/pages/rent/rent'
    });
  }
})