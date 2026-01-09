// pages/ques/ques-detail.js
Page({
  data: {
    quesId: '',
    quesDetail: {},
    commentText: '',
    inputFocus: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        quesId: options.id
      });
      this.loadQuesDetail();
    }
  },

  // 加载问题详情
  loadQuesDetail() {
    const quesList = wx.getStorageSync('quesList') || [];
    const quesDetail = quesList.find(item => item.id === this.data.quesId);
    
    if (quesDetail) {
      // 初始化点赞用户列表（如果不存在）
      if (!quesDetail.likedUsers) {
        quesDetail.likedUsers = [];
      }
      
      // 获取当前用户信息
      const userInfo = wx.getStorageSync('userInfo') || {};
      const currentUserId = userInfo.id || userInfo.studentId;
      
      // 检查当前用户是否已点赞
      quesDetail.isLiked = currentUserId ? quesDetail.likedUsers.includes(currentUserId) : false;
      
      this.setData({
        quesDetail
      });
    } else {
      wx.showToast({
        title: '问题不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 预览图片
  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.quesDetail.images
    });
  },

  // 点赞/取消点赞
  toggleLike() {
    // 获取当前用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    const currentUserId = userInfo.id || userInfo.studentId;
    
    if (!currentUserId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    
    const quesDetail = this.data.quesDetail;
    
    // 初始化点赞用户列表（如果不存在）
    if (!quesDetail.likedUsers) {
      quesDetail.likedUsers = [];
    }
    
    // 检查用户是否已点赞
    const likedIndex = quesDetail.likedUsers.indexOf(currentUserId);
    
    if (likedIndex > -1) {
      // 已点赞，取消点赞
      quesDetail.likedUsers.splice(likedIndex, 1);
      quesDetail.isLiked = false;
      quesDetail.likeCount = quesDetail.likedUsers.length;
    } else {
      // 未点赞，添加点赞
      quesDetail.likedUsers.push(currentUserId);
      quesDetail.isLiked = true;
      quesDetail.likeCount = quesDetail.likedUsers.length;
    }

    this.setData({
      quesDetail
    });

    // 更新缓存
    this.updateQuesData();

    wx.showToast({
      title: quesDetail.isLiked ? '点赞成功' : '已取消点赞',
      icon: 'none',
      duration: 1000
    });
  },

  // 聚焦输入框
  focusInput() {
    this.setData({
      inputFocus: true
    });
  },

  // 评论输入
  onCommentInput(e) {
    this.setData({
      commentText: e.detail.value
    });
  },

  // 提交评论
  submitComment() {
    if (!this.data.commentText.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }

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

    const comment = {
      id: 'comment_' + Date.now(),
      userId: userInfo.id,
      userName: userInfo.name,
      userAvatar: userInfo.avatar,
      content: this.data.commentText,
      time: new Date().toLocaleString('zh-CN')
    };

    const quesDetail = this.data.quesDetail;
    if (!quesDetail.comments) {
      quesDetail.comments = [];
    }
    quesDetail.comments.push(comment);
    quesDetail.commentCount = quesDetail.comments.length;

    this.setData({
      quesDetail,
      commentText: '',
      inputFocus: false
    });

    // 更新缓存
    this.updateQuesData();

    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  },

  // 更新问题数据到缓存
  updateQuesData() {
    let quesList = wx.getStorageSync('quesList') || [];
    const index = quesList.findIndex(item => item.id === this.data.quesId);
    if (index !== -1) {
      quesList[index] = this.data.quesDetail;
      wx.setStorageSync('quesList', quesList);
    }
  }
});
