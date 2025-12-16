// pages/my-favorites/my-favorites.js
Page({
  data: {
    favoriteList: []
  },

  onLoad(options) {
    this.checkLoginStatus()
  },

  onShow() {
    this.loadFavoriteData()
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    if (!isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '请先登录后查看收藏任务',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            wx.navigateBack()
          }
        }
      })
      return false
    }
    return true
  },

  // 加载收藏数据
  loadFavoriteData() {
    if (!this.checkLoginStatus()) return
    
    const userInfo = wx.getStorageSync('userInfo')
    const studentId = userInfo.studentId
    const tasks = wx.getStorageSync(`tasks_${studentId}`) || {
      published: [],
      accepted: [],
      completed: [],
      favorites: []
    }
    
    this.setData({
      favoriteList: tasks.favorites || []
    })
  },

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      'pending': '待接单',
      'accepted': '已接单',
      'completed': '已完成',
      'cancelled': '已取消'
    }
    return statusMap[status] || '未知'
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 去首页
  goToIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // 查看任务详情
  viewTaskDetail(e) {
    const taskId = e.currentTarget.dataset.id
    const task = this.data.favoriteList.find(t => t.id === taskId)
    
    if (task) {
      wx.showModal({
        title: task.title,
        content: `
类型：${task.type === 'express' ? '快递代取' : task.type === 'buy' ? '商品代买' : '急事代办'}
状态：${this.getStatusText(task.status)}
酬劳：¥${task.reward}
发布时间：${task.createTime}
截止时间：${task.deadline}
取件地址：${task.pickupLocation}
送达地址：${task.deliveryLocation}
${task.publisher ? `发布人：${task.publisher.name}\n信用分：${task.publisher.creditScore || 100}` : ''}
${task.description ? `描述：${task.description}` : ''}
        `,
        showCancel: false,
        confirmText: '知道了'
      })
    }
  },

  // 接单
  acceptTask(e) {
    const taskId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认接单',
      content: '确定要接取这个任务吗？接单后需要在规定时间内完成',
      success: (res) => {
        if (res.confirm) {
          this.addToAcceptedTasks(taskId)
        }
      }
    })
  },

  // 添加到接单任务
  addToAcceptedTasks(taskId) {
    const userInfo = wx.getStorageSync('userInfo')
    const studentId = userInfo.studentId
    let tasks = wx.getStorageSync(`tasks_${studentId}`) || {
      published: [],
      accepted: [],
      completed: [],
      favorites: []
    }
    
    // 找到收藏的任务
    const favoriteTask = tasks.favorites.find(task => task.id === taskId)
    
    if (!favoriteTask) {
      wx.showToast({
        title: '任务不存在',
        icon: 'error'
      })
      return
    }
    
    // 添加到接单任务
    const acceptedTask = {
      ...favoriteTask,
      status: 'accepted',
      acceptTime: new Date().toLocaleString()
    }
    
    tasks.accepted.push(acceptedTask)
    
    // 从收藏中移除
    tasks.favorites = tasks.favorites.filter(task => task.id !== taskId)
    
    // 保存到本地存储
    wx.setStorageSync(`tasks_${studentId}`, tasks)
    
    // 重新加载数据
    this.loadFavoriteData()
    
    wx.showToast({
      title: '接单成功',
      icon: 'success'
    })
  },

  // 取消收藏
  removeFavorite(e) {
    const taskId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏这个任务吗？',
      success: (res) => {
        if (res.confirm) {
          this.removeFromFavorites(taskId)
        }
      }
    })
  },

  // 从收藏中移除
  removeFromFavorites(taskId) {
    const userInfo = wx.getStorageSync('userInfo')
    const studentId = userInfo.studentId
    let tasks = wx.getStorageSync(`tasks_${studentId}`) || {
      published: [],
      accepted: [],
      completed: [],
      favorites: []
    }
    
    // 从收藏中移除
    tasks.favorites = tasks.favorites.filter(task => task.id !== taskId)
    
    // 保存到本地存储
    wx.setStorageSync(`tasks_${studentId}`, tasks)
    
    // 重新加载数据
    this.loadFavoriteData()
    
    wx.showToast({
      title: '已取消收藏',
      icon: 'success'
    })
  }
})