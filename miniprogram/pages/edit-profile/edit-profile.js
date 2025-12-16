// pages/edit-profile/edit-profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    avatarUrl: '',
    nickName: '',
    studentId: '',
    phone: '',
    dormitory: '',
    
    // 加载状态
    isSaving: false,
    
    // 原始数据（用于比较是否修改）
    originalData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserProfile()
  },

  /**
   * 加载用户资料
   */
  loadUserProfile() {
    // 从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {}
    
    this.setData({
      avatarUrl: userInfo.avatarUrl || '',
      nickName: userInfo.nickName || '',
      studentId: userInfo.studentId || '',
      phone: userInfo.phone || '',
      dormitory: userInfo.dormitory || '',
      originalData: { ...userInfo }
    })
    
    console.log('加载的用户资料:', userInfo)
  },

  /**
   * 选择头像
   */
  chooseAvatar() {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.chooseImageFromAlbum()
        } else if (res.tapIndex === 1) {
          this.takePhoto()
        }
      }
    })
  },

  /**
   * 从相册选择图片
   */
  chooseImageFromAlbum() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.uploadAvatar(tempFilePath)
      }
    })
  },

  /**
   * 拍照
   */
  takePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.uploadAvatar(tempFilePath)
      }
    })
  },

  /**
   * 上传头像（模拟上传）
   */
  uploadAvatar(tempFilePath) {
    wx.showLoading({
      title: '上传中...',
    })
    
    // 模拟上传过程
    setTimeout(() => {
      wx.hideLoading()
      
      // 更新本地头像
      this.setData({
        avatarUrl: tempFilePath
      })
      
      wx.showToast({
        title: '头像更新成功',
        icon: 'success'
      })
    }, 1500)
  },

  /**
   * 昵称输入变化
   */
  onNickNameChange(e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  /**
   * 学号输入变化
   */
  onStudentIdChange(e) {
    this.setData({
      studentId: e.detail.value
    })
  },

  /**
   * 手机号输入变化
   */
  onPhoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 宿舍地址输入变化
   */
  onDormitoryChange(e) {
    this.setData({
      dormitory: e.detail.value
    })
  },

  /**
   * 保存资料
   */
  saveProfile() {
    // 验证数据
    if (!this.validateForm()) {
      return
    }
    
    this.setData({
      isSaving: true
    })
    
    // 模拟保存过程
    setTimeout(() => {
      // 更新本地存储
      const updatedUserInfo = {
        avatarUrl: this.data.avatarUrl,
        nickName: this.data.nickName,
        studentId: this.data.studentId,
        phone: this.data.phone,
        dormitory: this.data.dormitory,
        creditScore: this.data.originalData.creditScore || 100
      }
      
      wx.setStorageSync('userInfo', updatedUserInfo)
      
      this.setData({
        isSaving: false,
        originalData: updatedUserInfo
      })
      
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      
    }, 1500)
  },

  /**
   * 验证表单数据
   */
  validateForm() {
    const { nickName, studentId, phone, dormitory } = this.data
    
    if (!nickName || nickName.trim().length === 0) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return false
    }
    
    if (!studentId || studentId.trim().length === 0) {
      wx.showToast({
        title: '请输入学号',
        icon: 'none'
      })
      return false
    }
    
    if (!phone || phone.trim().length === 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }
    
    if (!dormitory || dormitory.trim().length === 0) {
      wx.showToast({
        title: '请输入宿舍地址',
        icon: 'none'
      })
      return false
    }
    
    return true
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 页面初次渲染完成
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 用户下拉刷新
    this.loadUserProfile()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 页面上拉触底
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '校园代取小程序',
      path: '/pages/index/index'
    }
  }
})