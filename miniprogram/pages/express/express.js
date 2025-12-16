// pages/express/express.js
// index.js
Page({
  data: {
    activeTab: 0  // 当前激活的Tab索引
  },

  // 切换Tab
  switchTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
    console.log('切换到Tab:', index);
  }
})