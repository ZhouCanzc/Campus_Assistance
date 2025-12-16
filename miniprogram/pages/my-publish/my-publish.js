// pages/my-publish/my-publish.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 筛选条件
    activeFilter: 'all',
    
    // 订单数据
    orderList: [],
    
    // 分页参数
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('我发布的订单页面加载')
    this.loadOrderList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次显示页面时刷新数据
    this.refreshOrderList()
  },

  /**
   * 加载订单列表
   */
  loadOrderList(isRefresh = false) {
    if (this.data.isLoading) return
    
    const pageNum = isRefresh ? 1 : this.data.pageNum
    
    this.setData({
      isLoading: true
    })
    
    // 模拟API请求
    setTimeout(() => {
      // 模拟数据
      const mockData = this.getMockOrderData(pageNum)
      
      if (isRefresh) {
        this.setData({
          orderList: mockData,
          pageNum: 2,
          hasMore: true
        })
      } else {
        this.setData({
          orderList: [...this.data.orderList, ...mockData],
          pageNum: pageNum + 1,
          hasMore: pageNum < 3 // 模拟只有3页数据
        })
      }
      
      this.setData({
        isLoading: false
      })
      
      if (isRefresh) {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '刷新成功',
          icon: 'success'
        })
      }
    }, 800)
  },

  /**
   * 刷新订单列表
   */
  refreshOrderList() {
    this.loadOrderList(true)
  },

  /**
   * 获取模拟订单数据
   */
  getMockOrderData(pageNum) {
    const statusMap = ['pending', 'accepted', 'completed', 'cancelled']
    const typeMap = ['express', 'shopping', 'errand']
    const titles = [
      '帮忙取快递到东区宿舍',
      '代买一杯奶茶',
      '急事代办：图书馆还书',
      '快递代取：京东快递',
      '代买药品：感冒药'
    ]
    
    const data = []
    const startIndex = (pageNum - 1) * this.data.pageSize
    
    for (let i = 0; i < this.data.pageSize; i++) {
      const status = statusMap[i % 4]
      const type = typeMap[i % 3]
      
      data.push({
        id: `order_${startIndex + i}`,
        title: titles[(startIndex + i) % titles.length],
        type: type,
        reward: (Math.random() * 20 + 5).toFixed(2),
        status: status,
        createTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        acceptorAvatar: status === 'accepted' || status === 'completed' ? '/images/default-avatar.png' : '',
        acceptorName: status === 'accepted' || status === 'completed' ? `同学${String.fromCharCode(65 + i)}` : ''
      })
    }
    
    // 根据筛选条件过滤
    return data.filter(item => {
      if (this.data.activeFilter === 'all') return true
      return item.status === this.data.activeFilter
    })
  },

  /**
   * 改变筛选条件
   */
  changeFilter(e) {
    const filter = e.currentTarget.dataset.filter
    
    if (this.data.activeFilter === filter) return
    
    this.setData({
      activeFilter: filter
    }, () => {
      // 筛选后重新加载数据
      this.refreshOrderList()
    })
  },

  /**
   * 获取状态对应的CSS类
   */
  getStatusClass(status) {
    return status
  },

  /**
   * 获取状态对应的文本
   */
  getStatusText(status) {
    const statusMap = {
      'pending': '待接单',
      'accepted': '已接单',
      'completed': '已完成',
      'cancelled': '已取消'
    }
    return statusMap[status] || '未知状态'
  },

  /**
   * 格式化时间
   */
  formatTime(timeString) {
    const date = new Date(timeString)
    const now = new Date()
    const diff = now - date
    
    // 如果是今天
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    
    // 如果是昨天
    const yesterday = new Date(now - 24 * 60 * 60 * 1000)
    if (date.toDateString() === yesterday.toDateString()) {
      return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    
    // 其他情况显示日期
    return date.toLocaleDateString('zh-CN')
  },

  /**
   * 查看订单详情
   */
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id
    console.log('查看订单详情:', orderId)
    
    // 跳转到订单详情页
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${orderId}&type=publish`
    })
  },

  /**
   * 取消订单
   */
  cancelOrder(e) {
    const orderId = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认取消',
      content: '确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟取消订单
          const orderList = this.data.orderList.map(item => {
            if (item.id === orderId) {
              return { ...item, status: 'cancelled' }
            }
            return item
          })
          
          this.setData({
            orderList: orderList
          })
          
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          })
        }
      }
    })
    
    // 阻止事件冒泡
    e.stopPropagation()
  },

  /**
   * 编辑订单
   */
  editOrder(e) {
    const orderId = e.currentTarget.dataset.id
    console.log('编辑订单:', orderId)
    
    // 跳转到编辑页面
    wx.navigateTo({
      url: `/pages/create-order/create-order?id=${orderId}`
    })
    
    // 阻止事件冒泡
    e.stopPropagation()
  },

  /**
   * 去创建订单
   */
  goToCreate() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log('用户下拉刷新')
    this.refreshOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('页面上拉触底')
    if (!this.data.isLoading && this.data.hasMore) {
      this.loadOrderList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '我发布的订单',
      path: '/pages/my-publish/my-publish'
    }
  }
})