//index.js
//获取应用实例
const app = getApp();

import { getHomeCommon,getHomeList } from "../../api/http";

Page({
  data: {
    banner: null,
    category: null,
    notice: null,
    image: null,
    imageGroup: null,
    hot: null,
    recommend: null,
    page: 1,
    list: [],
    pageStatus: 1, // 0.隐藏 1.正在加载 2.没有更多内容 3.加载完成
    isEmpty: false,
    loading: false
  },

  onLoad: function () {
    getHomeCommon().then(result=>{
      this.setData({
        banner:     result.data.banner,
        category:   result.data.nav,
        notice:     result.data.notice,
        image:      result.data.img_1,
        imageGroup: result.data.img_2,
        hot:        result.data.hot,
        recommend:  result.data.recommend
      });
    });
  },

  onShow(){
    getApp().getUserCartCount();
  },

  onReachBottom(){
    if(this.data.isEmpty === true){
      return ;
    } 

    this.setData({ pageStatus: 1 });
    getHomeList({
      page: this.data.page
    }).then(result=>{
      if(result.status == -1){
        if(this.data.page == 1 && result.data.list <= 0){
          this.setData({ isEmpty: true,pageStatus: 0 });
        }else{
          this.setData({ isEmpty: false,pageStatus: 2 });
        }
      }else if(result.status == 1){
        if(result.data.list <= 0 && this.data.page == 1){
          this.setData({ isEmpty: true,pageStatus: 0 });
        }else{
          this.data.page++; 
          this.setData({
            page: this.data.page,
            isEmpty: false, 
            pageStatus: 3,
            list: this.data.list.concat(result.data.list)
          });
        }
      }
    })
  },

  onSearch(){
    wx.navigateTo({
      url: '/pages/search/index/index'
    });
  },

  onCategory(event){
    let url = event.currentTarget.dataset.url;
    console.log(url)
    switch(url){
      case "/category/index":
        wx.switchTab({
          url: '/pages/category/index'
        })
        break;
      case "/coupon":
        wx.navigateTo({
          url: '/pages/coupon/index'
        });
        break;
      case "/regiment":
        wx.navigateTo({
          url: '/pages/regiment/list/index'
        });
        break;
      case "/second":
          wx.navigateTo({
            url: '/pages/second/list/index'
          });
          break;
      case "/special":
          wx.navigateTo({
            url: '/pages/special/list/index'
          });
          break;
      case "/point":
          wx.navigateTo({
            url: '/pages/point/list/index'
          });
          break;
      case "/news":
          wx.navigateTo({
            url: '/pages/news/list/index'
          });
          break;
    }
  },

  onJumpGoods(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/view/index?id=' + id
    });
  },

  onNotice(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/view/detail?id=' + id
    });
  },

  onImage(event){
    let image = event.currentTarget.dataset.image;
    // wx.navigateTo({
    //   url: '/pages/news/view/detail?id=' + id
    // });
  }
})
