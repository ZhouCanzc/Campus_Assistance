// pages/my-accept/my-accept.js
Page({
  data: {
    currentFilter: 'all',
    taskList: [],
    taskStats: {
      total: 0,
      inprogress: 0,
      completed: 0
    }
  },

  onLoad(options) {
    this.checkLoginStatus()
  },

  onShow() {
    this.loadTaskData()
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn')
    if (!isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '请先登录后查看接单任务',
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

  // 加载任务数据
  loadTaskData() {
    if (!this.checkLoginStatus()) return
    
    const userInfo = wx.getStorageSync('userInfo')
    const studentId = userInfo.studentId
    const tasks = wx.getStorageSync(`tasks_${studentId}`) || {
      published: [],
      accepted: [],
      completed: [],
      favorites: []
    }
    
    const acceptedTasks = tasks.accepted
    
    // 计算统计
    const stats = {
      total: acceptedTasks.length,
      inprogress: acceptedTasks.filter(task => task.status === 'accepted').length,
      completed: acceptedTasks.filter(task => task.status === 'completed').length
    }
    
    this.setData({
      taskStats: stats,
      taskList: this.filterTasks(acceptedTasks, this.data.currentFilter)
    })
  },

  // 过滤任务
  filterTasks(tasks, filter) {
    if (filter === 'all') return tasks
    if (filter === 'inprogress') return tasks.filter(task => task.status === 'accepted')
    if (filter === 'completed') return tasks.filter(task => task.status === 'completed')
    return tasks
  },

  // 改变筛选条件
  changeFilter(e) {
    const filter = e.currentTarget.dataset.filter
    const userInfo = wx.getStorageSync('userInfo')
    const studentId = userInfo.studentId
    const tasks = wx.getStorageSync(`tasks_${studentId}`) || { accepted: [] }
    
    this.setData({
      currentFilter: filter,
      taskList: this.filterTasks(tasks.accepted, filter)
    })
  },

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      'accepted': '进行中',
      'completed': '已完成',
      'cancelled': '已取消'
    }
    return statusMap[status] || '未知'
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 去首页接单
  goToIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // 查看任务详情
  viewTaskDetail(e) {
    const taskId = e.currentTarget.dataset.id
    const task = this.data.taskList.find(t => t.id === taskId)
    
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
发布人：${task.publisher.name}
联系电话：${task.publisher.phone}
${task.description ? `描述：${task.description}` : ''}
        `,
        showCancel: false,
        confirmText: '知道了'
      })
    }
  },

  // 完成任务
  completeTask(e) {
    const taskId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认完成',
      content: '确认已送达并完成任务吗？',
      success: (res) => {
        if (res.confirm) {
          this.updateTaskStatus(taskId, 'completed')
        }
      }
    })
  },

  // 取消接单
  cancelAccept(e) {
    const taskId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认取消',
      content: '确定要取消接单吗？取消后可能影响您的信用分',
      success: (res) => {
        if (res.confirm) {
          this.updateTaskStatus(taskId, 'cancelled')
        }
      }
    })
  },

  // 评价发布人
  ratePublisher(e) {
    const taskId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '评价发布人',
      content: '请对发布人的任务描述和配合度进行评价',
      confirmText: '去评价',
      success: (res) => {
        if (res.confirm) {
          // 跳转到评价页面（这里先模拟）
          wx.showToast({
            title: '评价功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 更新任务状态
  updateTaskStatus(taskId, newStatus) {
    const userInfo = wx.getStorageSync('userInfo')
    const studentId = userInfo.studentId
    let tasks = wx.getStorageSync(`tasks_${studentId}`) || {
      published: [],
      accepted: [],
      completed: [],
      favorites: []
    }
    
    // 更新任务状态
    tasks.accepted = tasks.accepted.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus }
      }
      return task
    })
    
    // 如果任务完成，移动到completed数组
    if (newStatus === 'completed') {
      const completedTask = tasks.accepted.find(task => task.id === taskId)
      if (completedTask) {
        tasks.accepted = tasks.accepted.filter(task => task.id !== taskId)
        tasks.completed.push(completedTask)
      }
    }
    
    // 保存到本地存储
    wx.setStorageSync(`tasks_${studentId}`, tasks)
    
    // 更新钱包余额
    if (newStatus === 'completed') {
      const task = tasks.completed.find(t => t.id === taskId)
      if (task) {
        const wallet = wx.getStorageSync(`wallet_${studentId}`) || {
          balance: 0,
          frozen: 0,
          totalIncome: 0
        }
        wallet.balance += task.reward
        wallet.totalIncome += task.reward
        wx.setStorageSync(`wallet_${studentId}`, wallet)
      }
    }
    
    // 重新加载数据
    this.loadTaskData()
    
    wx.showToast({
      title: '操作成功',
      icon: 'success'
    })
  }
})