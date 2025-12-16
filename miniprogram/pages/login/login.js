// pages/login/login.js
Page({
  data: {
    studentId: '',
    password: '',
    confirmPassword: '',
    isRegisterMode: false,
    canSubmit: false
  },

  onLoad(options) {
    console.log('登录页面加载')
    // 检查是否从个人页面跳转过来
    if (options.from === 'profile') {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 学号输入
  onStudentIdInput(e) {
    const value = e.detail.value.replace(/\s+/g, '')
    this.setData({ studentId: value })
    this.checkSubmit()
  },

  // 密码输入
  onPasswordInput(e) {
    const value = e.detail.value.replace(/\s+/g, '')
    this.setData({ password: value })
    this.checkSubmit()
  },

  // 确认密码输入
  onConfirmPasswordInput(e) {
    const value = e.detail.value.replace(/\s+/g, '')
    this.setData({ confirmPassword: value })
    this.checkSubmit()
  },

  // 检查是否可以提交
  checkSubmit() {
    const { studentId, password, confirmPassword, isRegisterMode } = this.data
    
    let canSubmit = false
    
    if (isRegisterMode) {
      // 注册模式：学号、密码、确认密码都不能为空，且密码要一致
      canSubmit = studentId.length >= 6 && 
                  password.length >= 6 && 
                  confirmPassword.length >= 6 &&
                  password === confirmPassword
    } else {
      // 登录模式：学号和密码都不能为空
      canSubmit = studentId.length >= 6 && password.length >= 6
    }
    
    this.setData({ canSubmit })
  },

  // 切换登录/注册模式
  toggleMode() {
    const newMode = !this.data.isRegisterMode
    this.setData({ 
      isRegisterMode: newMode,
      password: '',
      confirmPassword: ''
    })
    this.checkSubmit()
  },

  // 处理登录/注册
  handleLogin() {
    const { studentId, password, confirmPassword, isRegisterMode } = this.data
    
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    if (isRegisterMode) {
      this.handleRegister(studentId, password)
    } else {
      this.handleUserLogin(studentId, password)
    }
  },

  // 用户登录
  handleUserLogin(studentId, password) {
    wx.showLoading({
      title: '登录中...',
    })
    
    // 模拟登录过程
    setTimeout(() => {
      wx.hideLoading()
      
      // 获取已注册用户列表
      const registeredUsers = wx.getStorageSync('registeredUsers') || []
      const user = registeredUsers.find(u => u.studentId === studentId && u.password === password)
      
      if (!user) {
        wx.showToast({
          title: '学号或密码错误',
          icon: 'error',
          duration: 2000
        })
        return
      }
      
      // 登录成功，获取或创建用户信息
      let userInfo = wx.getStorageSync(`userInfo_${studentId}`)
      if (!userInfo) {
        // 创建新用户信息
        userInfo = {
          studentId: studentId,
          nickName: `用户${studentId.substring(studentId.length - 4)}`,
          phone: '',
          avatarUrl: `https://ui-avatars.com/api/?name=${studentId}&background=4CAF50&color=fff`,
          creditScore: 100,
          registerTime: new Date().toISOString(),
          lastLoginTime: new Date().toISOString()
        }
        wx.setStorageSync(`userInfo_${studentId}`, userInfo)
      }
      
      // 保存登录状态
      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('isLoggedIn', true)
      wx.setStorageSync('currentStudentId', studentId)
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })
      
      // 返回个人页面
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/profile/profile'
        })
      }, 1500)
      
    }, 1000)
  },

  // 用户注册
  handleRegister(studentId, password) {
    wx.showLoading({
      title: '注册中...',
    })
    
    setTimeout(() => {
      wx.hideLoading()
      
      // 检查学号是否已注册
      const registeredUsers = wx.getStorageSync('registeredUsers') || []
      const isExist = registeredUsers.some(user => user.studentId === studentId)
      
      if (isExist) {
        wx.showToast({
          title: '该学号已注册',
          icon: 'error',
          duration: 2000
        })
        return
      }
      
      // 注册新用户
      const newUser = {
        studentId: studentId,
        password: password,
        registerTime: new Date().toISOString()
      }
      
      registeredUsers.push(newUser)
      wx.setStorageSync('registeredUsers', registeredUsers)
      
      // 创建用户信息
      const userInfo = {
        studentId: studentId,
        nickName: `用户${studentId.substring(studentId.length - 4)}`,
        phone: '',
        avatarUrl: `https://ui-avatars.com/api/?name=${studentId}&background=4CAF50&color=fff`,
        creditScore: 100,
        registerTime: new Date().toISOString(),
        lastLoginTime: new Date().toISOString()
      }
      wx.setStorageSync(`userInfo_${studentId}`, userInfo)
      
      // 初始化用户数据
      this.initUserData(studentId)
      
      // 自动登录
      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('isLoggedIn', true)
      wx.setStorageSync('currentStudentId', studentId)
      
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1500
      })
      
      // 跳转到个人中心
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/profile/profile'
        })
      }, 1500)
      
    }, 1500)
  },

  // 初始化用户数据
  initUserData(studentId) {
    // 初始化钱包数据
    const walletData = {
      balance: 0,
      frozen: 0,
      totalIncome: 0
    }
    wx.setStorageSync(`wallet_${studentId}`, walletData)
    
    // 初始化任务统计数据
    const taskStats = {
      published: 0,
      accepted: 0,
      completed: 0,
      favorites: 0,
      totalEarnings: 0
    }
    wx.setStorageSync(`taskStats_${studentId}`, taskStats)
    
    // 初始化任务列表
    const tasks = {
      published: [],
      accepted: [],
      completed: [],
      favorites: []
    }
    wx.setStorageSync(`tasks_${studentId}`, tasks)
    
    // 初始化地址列表
    wx.setStorageSync(`addresses_${studentId}`, [])
  },

  // 快速登录（测试用）
  quickLogin(e) {
    const studentId = e.currentTarget.dataset.id
    this.setData({
      studentId: studentId,
      password: '123456'
    })
    this.handleUserLogin(studentId, '123456')
  }
})