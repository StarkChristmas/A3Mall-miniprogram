// components/tips-box/index.js
Component({

  options:{
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: "empty"
    },
    text: {
      type: String,
      value: "亲，购物车还没有商品哦"
    },
    jump: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    go(){
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
})
