// pages/ques/my-ques.js
Page({
  data: {
    myQuesList: []
  },

  onLoad() {
    this.loadMyQues();
  },

  onShow() {
    this.loadMyQues();
  },

  // 加载我的问题
  loadMyQues() {
    // 获取或创建用户信息
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo || !userInfo.id) {
      // 如果没有用户信息，创建一个固定的用户ID
      userInfo = {
        id: 'user_' + Date.now(),
        name: '用户' + Math.floor(Math.random() * 1000),
        avatar: ''
      };
      wx.setStorageSync('userInfo', userInfo);
    }
    
    const allQues = wx.getStorageSync('quesList') || [];
    
    // 筛选当前用户发布的问题
    const myQuesList = allQues.filter(item => item.userId === userInfo.id);
    
    // 按时间排序（最新的在前）
    myQuesList.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime));
    
    this.setData({
      myQuesList
    });
  },

  // 跳转到问题详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/ques/ques-detail?id=${id}`
    });
  },

  // 删除问题
  deleteQues(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这个问题吗？',
      success: (res) => {
        if (res.confirm) {
          let quesList = wx.getStorageSync('quesList') || [];
          quesList = quesList.filter(item => item.id !== id);
          wx.setStorageSync('quesList', quesList);
          
          this.loadMyQues();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 去发布
  goToPublish() {
    wx.navigateTo({
      url: '/pages/ques/ques-publish'
    });
  }
});
