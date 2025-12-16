// index.js
Page({
  /*data: {
    pendingOrders: 5 // 待接单数量，可以根据实际情况调整
  },*/

  onLoad: function() {
    console.log('首页加载');
  },

  // 导航到代取快递页面
  navigateToExpress: function() {
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
    wx.showToast({
      title: '陪替服务',
      icon: 'none'
    });
    wx.navigateTo({
      url: '/pages/toast/toast'
    });
  },

  // 导航到陪替服务页面
  navigateToRent: function() {
    wx.showToast({
      title: '租借物品',
      icon: 'none'
    });
    wx.navigateTo({
      url: '/pages/rent/rent'
    });
  }
})