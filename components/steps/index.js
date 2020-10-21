// components/steps/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    direction: {
      // 排列方向 row column
      type: String,
      default: 'row'
    },
    activeColor: {
      // 激活状态颜色
      type: String,
      default: '#1aad19'
    },
    deactiveColor: {
      // 未激活状态颜色
      type: String,
      default: '#999999'
    },
    active: {
      // 当前步骤
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default () {
        return []
      }
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

  }
})
