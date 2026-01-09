// pages/ques/ques-publish.js
Page({
  data: {
    content: '',
    images: []
  },

  // 内容输入
  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },

  // 选择图片
  chooseImage() {
    const that = this;
    const remainCount = 9 - this.data.images.length;
    
    wx.chooseImage({
      count: remainCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images: [...that.data.images, ...tempFilePaths]
        });
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images
    });
  },

  // 提交问题
  submitQues() {
    if (!this.data.content.trim()) {
      wx.showToast({
        title: '请输入问题描述',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '发布中...'
    });

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

    // 生成问题数据
    const quesData = {
      id: 'ques_' + Date.now(),
      content: this.data.content,
      images: this.data.images,
      userName: userInfo.name,
      userAvatar: userInfo.avatar,
      userId: userInfo.id,
      publishTime: new Date().toLocaleString('zh-CN'),
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      likedUsers: [],  // 初始化点赞用户列表
      comments: []
    };

    // 保存到本地存储
    let quesList = wx.getStorageSync('quesList') || [];
    quesList.unshift(quesData);
    wx.setStorageSync('quesList', quesList);

    wx.hideLoading();
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1500
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
