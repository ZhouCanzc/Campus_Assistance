// 全局订单管理模块
const orderManager = {
  // 初始化订单数据
  orders: {
    express: [
      {
        id: 1,
        price: 10,
        deadline: '12月11日 14:00前有效',
        status: 'expired',
        statusText: '已过期',
        statusClass: 'expired',
        pickupAddress: 'VVVV',
        pickupDetail: '222',
        deliveryAddress: '柔佛',
        deliveryDetail: '255',
        isUrgent: false,
        urgentLevel: '',
        publisher: '张三',
        publisherPhone: '13800138000',
        createTime: '2024-12-01 10:00',
        accepter: null
      },
      {
        id: 2,
        price: 5454,
        deadline: '12月07日 23:00前有效',
        status: 'accepted',
        statusText: '已接单',
        statusClass: 'accepted',
        pickupAddress: '啥时候',
        pickupDetail: '有时候',
        deliveryAddress: '这不是',
        deliveryDetail: '时候',
        isUrgent: true,
        urgentLevel: '特急',
        publisher: '李四',
        publisherPhone: '13800138001',
        createTime: '2024-12-02 09:00',
        accepter: '王五',
        accepterPhone: '13800138002'
      },
      {
        id: 3,
        price: 1200,
        deadline: '12月01日 20:00前有效',
        status: 'expired',
        statusText: '已过期',
        statusClass: 'expired',
        pickupAddress: '好的吧好的吧的举报电话都不',
        pickupDetail: '胡汉三',
        deliveryAddress: '菜鸟驿站',
        deliveryDetail: '的回调',
        isUrgent: false,
        urgentLevel: '',
        publisher: '赵六',
        publisherPhone: '13800138003',
        createTime: '2024-12-01 08:00',
        accepter: null
      },
      {
        id: 4,
        price: 8,
        deadline: '12月15日 18:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        pickupAddress: '菜鸟驿站A区',
        pickupDetail: '取件码：12-3-456',
        deliveryAddress: '学生公寓6号楼',
        deliveryDetail: '602室',
        isUrgent: true,
        urgentLevel: '紧急',
        publisher: '钱七',
        publisherPhone: '13800138004',
        createTime: '2024-12-10 14:00',
        accepter: null
      },
      {
        id: 5,
        price: 15,
        deadline: '12月14日 12:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        pickupAddress: '京东快递点',
        pickupDetail: '手机尾号1234',
        deliveryAddress: '图书馆门口',
        deliveryDetail: '一楼大厅',
        isUrgent: false,
        urgentLevel: '',
        publisher: '孙八',
        publisherPhone: '13800138005',
        createTime: '2024-12-10 15:00',
        accepter: null
      },
      {
        id: 6,
        price: 20,
        deadline: '12月10日 16:00前有效',
        status: 'completed',
        statusText: '已完成',
        statusClass: 'completed',
        pickupAddress: '顺丰快递柜',
        pickupDetail: '柜号B23',
        deliveryAddress: '食堂二楼',
        deliveryDetail: '靠窗位置',
        isUrgent: false,
        urgentLevel: '',
        publisher: '周九',
        publisherPhone: '13800138006',
        createTime: '2024-12-08 11:00',
        accepter: '吴十',
        accepterPhone: '13800138007'
      }
    ],
    buy: [
      {
        id: 101,
        price: 100,
        deadline: '11月13日 17:00前有效',
        status: 'accepted',
        statusText: '已接单',
        statusClass: 'accepted',
        title: '1',
        description: '1',
        isUrgent: true,
        urgentLevel: '特急',
        publisher: '张三',
        publisherPhone: '13800138000',
        createTime: '2024-11-10 09:00',
        accepter: '李四',
        accepterPhone: '13800138001'
      },
      {
        id: 102,
        price: 1,
        deadline: '12月08日 18:00前有效',
        status: 'accepted',
        statusText: '已接单',
        statusClass: 'accepted',
        title: '拿东西',
        description: '12345678911',
        isUrgent: true,
        urgentLevel: '紧急',
        publisher: '王五',
        publisherPhone: '13800138002',
        createTime: '2024-12-05 14:00',
        accepter: '赵六',
        accepterPhone: '13800138003'
      },
      {
        id: 103,
        price: 80,
        deadline: '02月28日 23:00前有效',
        status: 'accepted',
        statusText: '已接单',
        statusClass: 'accepted',
        title: '帮我买票',
        description: '111111',
        isUrgent: true,
        urgentLevel: '特急',
        publisher: '钱七',
        publisherPhone: '13800138004',
        createTime: '2024-12-01 10:00',
        accepter: '孙八',
        accepterPhone: '13800138005'
      },
      {
        id: 104,
        price: 0.01,
        deadline: '03月02日 17:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '帮我买早餐',
        description: '大吉吉',
        isUrgent: true,
        urgentLevel: '特急',
        publisher: '周九',
        publisherPhone: '13800138006',
        createTime: '2024-12-10 08:00',
        accepter: null
      },
      {
        id: 105,
        price: 15,
        deadline: '12月20日 12:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '帮买奶茶',
        description: '一点点，波霸奶茶少冰',
        isUrgent: false,
        urgentLevel: '',
        publisher: '吴十',
        publisherPhone: '13800138007',
        createTime: '2024-12-10 16:00',
        accepter: null
      },
      {
        id: 106,
        price: 25,
        deadline: '12月05日 18:00前有效',
        status: 'completed',
        statusText: '已完成',
        statusClass: 'completed',
        title: '代买文具',
        description: '笔记本和中性笔',
        isUrgent: false,
        urgentLevel: '',
        publisher: '郑十一',
        publisherPhone: '13800138008',
        createTime: '2024-12-03 13:00',
        accepter: '王十二',
        accepterPhone: '13800138009'
      }
    ],
    urgent: [
      {
        id: 201,
        price: 50,
        deadline: '12月12日 10:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '帮忙排队取号',
        description: '图书馆自习室排队取号',
        isUrgent: true,
        urgentLevel: '特急',
        publisher: '张三',
        publisherPhone: '13800138000',
        createTime: '2024-12-10 09:00',
        accepter: null
      },
      {
        id: 202,
        price: 30,
        deadline: '12月11日 15:00前有效',
        status: 'accepted',
        statusText: '已接单',
        statusClass: 'accepted',
        title: '代交作业',
        description: '帮忙交一份纸质作业到教务处',
        isUrgent: true,
        urgentLevel: '紧急',
        publisher: '李四',
        publisherPhone: '13800138001',
        createTime: '2024-12-09 14:00',
        accepter: '王五',
        accepterPhone: '13800138002'
      },
      {
        id: 203,
        price: 20,
        deadline: '12月10日 18:00前有效',
        status: 'completed',
        statusText: '已完成',
        statusClass: 'completed',
        title: '帮忙打印资料',
        description: '打印50页PPT资料',
        isUrgent: false,
        urgentLevel: '',
        publisher: '赵六',
        publisherPhone: '13800138003',
        createTime: '2024-12-08 11:00',
        accepter: '钱七',
        accepterPhone: '13800138004'
      },
      {
        id: 204,
        price: 100,
        deadline: '12月15日 09:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '代签到',
        description: '早上8点帮忙签到',
        isUrgent: true,
        urgentLevel: '特急',
        publisher: '孙八',
        publisherPhone: '13800138005',
        createTime: '2024-12-10 07:00',
        accepter: null
      },
      {
        id: 205,
        price: 15,
        deadline: '12月08日 20:00前有效',
        status: 'expired',
        statusText: '已过期',
        statusClass: 'expired',
        title: '帮忙占座',
        description: '自习室占座2小时',
        isUrgent: false,
        urgentLevel: '',
        publisher: '周九',
        publisherPhone: '13800138006',
        createTime: '2024-12-07 16:00',
        accepter: null
      }
    ],
    rent: [
      {
        id: 301,
        price: 20,
        deadline: '12月20日 18:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '租借自行车',
        description: '需要租借一辆自行车，使用一天',
        isUrgent: false,
        urgentLevel: '',
        publisher: '张三',
        publisherPhone: '13800138000',
        createTime: '2024-12-10 10:00',
        accepter: null
      },
      {
        id: 302,
        price: 50,
        deadline: '12月15日 12:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '租借相机',
        description: '需要租借单反相机拍摄活动',
        isUrgent: true,
        urgentLevel: '紧急',
        publisher: '李四',
        publisherPhone: '13800138001',
        createTime: '2024-12-10 14:00',
        accepter: null
      }
    ],
    company: [
      {
        id: 401,
        price: 30,
        deadline: '12月18日 14:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '陪同面试',
        description: '需要人陪同去公司面试，提供心理支持',
        isUrgent: false,
        urgentLevel: '',
        publisher: '张三',
        publisherPhone: '13800138000',
        createTime: '2024-12-10 10:00',
        accepter: null
      },
      {
        id: 402,
        price: 25,
        deadline: '12月16日 10:00前有效',
        status: 'pending',
        statusText: '待接单',
        statusClass: 'pending',
        title: '代替上课签到',
        description: '需要人代替上课签到，下午2点的课',
        isUrgent: true,
        urgentLevel: '紧急',
        publisher: '李四',
        publisherPhone: '13800138001',
        createTime: '2024-12-10 14:00',
        accepter: null
      }
    ]
  },

  // 获取订单列表
  getOrders: function(type) {
    return this.orders[type] || [];
  },

  // 添加新订单
  addOrder: function(type, orderData) {
    const newId = this.getNextId(type);
    
    // 获取当前用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    const userId = userInfo.id || userInfo.studentId || 'user_' + Date.now();
    
    const newOrder = {
      id: newId,
      ...orderData,
      status: 'pending',
      statusText: '待接单',
      statusClass: 'pending',
      publisher: orderData.contact || '匿名',
      publisherId: userId, // 保存发布者ID
      publisherPhone: orderData.phone || '',
      createTime: this.getCurrentTime(),
      accepter: null,
      accepterId: null // 接单者ID
    };
    
    this.orders[type].unshift(newOrder);
    return newOrder;
  },

  // 更新订单
  updateOrder: function(type, orderId, orderData) {
    const orders = this.orders[type];
    const orderIndex = orders.findIndex(o => o.id == orderId);
    
    if (orderIndex === -1) {
      return false;
    }
    
    const existingOrder = orders[orderIndex];
    
    // 只有待接单的订单才能编辑
    if (existingOrder.status !== 'pending') {
      wx.showToast({
        title: '只能编辑待接单的订单',
        icon: 'none'
      });
      return false;
    }
    
    // 保留原有的状态信息和创建时间
    const updatedOrder = {
      ...existingOrder,
      ...orderData,
      id: existingOrder.id,
      status: existingOrder.status,
      statusText: existingOrder.statusText,
      statusClass: existingOrder.statusClass,
      createTime: existingOrder.createTime,
      publisherId: existingOrder.publisherId,
      accepter: existingOrder.accepter,
      accepterId: existingOrder.accepterId
    };
    
    orders[orderIndex] = updatedOrder;
    return true;
  },

  // 接单
  acceptOrder: function(type, orderId, accepterInfo) {
    const orders = this.orders[type];
    const order = orders.find(o => o.id === orderId);
    if (order && order.status === 'pending') {
      // 获取当前用户信息
      const userInfo = wx.getStorageSync('userInfo') || {};
      const userId = userInfo.id || userInfo.studentId || 'user_' + Date.now();
      
      order.status = 'accepted';
      order.statusText = '已接单';
      order.statusClass = 'accepted';
      order.accepter = accepterInfo.name;
      order.accepterId = userId; // 保存接单者ID
      order.accepterPhone = accepterInfo.phone;
      return true;
    }
    return false;
  },

  // 完成订单
  completeOrder: function(type, orderId) {
    const orders = this.orders[type];
    const order = orders.find(o => o.id === orderId);
    if (order && order.status === 'accepted') {
      order.status = 'completed';
      order.statusText = '已完成';
      order.statusClass = 'completed';
      return true;
    }
    return false;
  },

  // 取消接单
  cancelOrder: function(type, orderId) {
    const orders = this.orders[type];
    const order = orders.find(o => o.id === orderId);
    if (order && order.status === 'accepted') {
      order.status = 'pending';
      order.statusText = '待接单';
      order.statusClass = 'pending';
      order.accepter = null;
      order.accepterId = null; // 清除接单者ID
      order.accepterPhone = null;
      return true;
    }
    return false;
  },

  // 获取下一个ID
  getNextId: function(type) {
    const orders = this.orders[type];
    if (orders.length === 0) return 1;
    const maxId = Math.max(...orders.map(o => o.id));
    return maxId + 1;
  },

  // 获取当前时间
  getCurrentTime: function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  // 通知页面更新
  notifyUpdate: function(type) {
    const pages = getCurrentPages();
    
    // 通知所有页面更新
    pages.forEach(page => {
      if (page && page.onOrderUpdate) {
        page.onOrderUpdate(type);
      }
    });
    
    // 特别通知个人中心页面更新统计数据
    const profilePage = pages.find(page => page.route && page.route.includes('profile/profile'));
    if (profilePage && profilePage.onOrderUpdate) {
      profilePage.onOrderUpdate(type);
    }
  }
};

module.exports = orderManager;
