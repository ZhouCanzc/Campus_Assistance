// pages/ques/ques.js
Page({
  data: {
    quesList: [],
    pageNum: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad() {
    this.loadQuesList();
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadQuesList(true);
  },

  // 加载问题列表
  loadQuesList(refresh = false) {
    // 从缓存中获取数据
    const allQues = wx.getStorageSync('quesList') || [];
    
    // 确保每个问题都有正确的点赞数
    allQues.forEach(ques => {
      if (!ques.likedUsers) {
        ques.likedUsers = [];
      }
      // 根据 likedUsers 数组计算点赞数
      ques.likeCount = ques.likedUsers.length;
    });
    
    // 按时间排序（最新的在前）
    allQues.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime));
    
    this.setData({
      quesList: allQues
    });
  },

  // 加载更多
  loadMore() {
    // 可以后续扩展分页功能
  },

  // 检查登录状态
  checkLogin() {
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
              url: '/pages/login/login?from=ques'
            });
          }
        }
      });
      return false;
    }
    return true;
  },

  // 跳转到发布页面
  goToPublish() {
    if (!this.checkLogin()) return;
    
    wx.navigateTo({
      url: '/pages/ques/ques-publish'
    });
  },

  // 跳转到问题详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/ques/ques-detail?id=${id}`
    });
  },

  // 跳转到我的发布
  goToMyQues() {
    if (!this.checkLogin()) return;
    
    wx.navigateTo({
      url: '/pages/ques/my-ques'
    });
  }
});