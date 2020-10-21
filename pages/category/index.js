//index.js
//获取应用实例
const app = getApp()

import { getCategoryList } from "../../api/http";

Page({
  goodsHeight: [],
  menuHeight: [],
  scrollTopPos: 0,
  data: {
    windowWidth: null,
    windowHeight: null,
    currentIndex:0,
    selectId: "item-0",
    menuTop:0,
    scrollTop:0,
    category: []
  },

  onLoad: function () {
    // 获取设备宽高
    let search = 90 / 750 * wx.getSystemInfoSync().windowWidth;
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight - search
    });

    getCategoryList().then((result)=>{
      if(result.status){
        this.setData({
          category: result.data
        });
        this.setHeight();
      }
    });
  },

  onShow(){
    getApp().getUserCartCount();
  },

  changeMenu(e){
    this.setData({
      currentIndex: e.currentTarget.dataset.pos,
      selectId: "item-" + e.currentTarget.dataset.pos
    })
  },

  scrollEvent(event){
    if (this.goodsHeight.length == 0) {
      return;
    }

    let scrollTop = event.detail.scrollTop;
    let current = this.data.currentIndex;

    if (scrollTop >= this.scrollTopPos) {
      if (current + 1 < this.goodsHeight.length && scrollTop >= this.goodsHeight[current]) {
        this.setData({
          currentIndex: current + 1
        })
      }
    } else {
      if (current - 1 >= 0 && scrollTop < this.goodsHeight[current - 1]) {
        this.setData({
          currentIndex: current - 1
        })
      }
    }
    this.scrollTopPos = scrollTop;

    this.setData({
      menuTop: this.menuHeight[current] - this.data.windowHeight
    });
  },

  setHeight(){
    this.goodsHeight = [];
    let h = 0;
    const query = wx.createSelectorQuery();
    query.selectAll('.s-list').boundingClientRect();
    query.exec((res)=>{
      res[0].forEach((item) => {
        h += item.height;
        this.goodsHeight.push(h);
      })
    });

    this.menuHeight = [];
    let m = 0;
    const menu = wx.createSelectorQuery();
    menu.selectAll(".menu-item").boundingClientRect();
    menu.exec((res) => {
      res[0].forEach((item) => {
        m += item.height;
        this.menuHeight.push(m);
      })
    });
  },

  jump(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/list/index?id='+id,
    })
  },

  onSearch(){
    wx.navigateTo({
      url: '/pages/search/index/index'
    });
  }
})
