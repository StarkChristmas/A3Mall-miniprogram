// pages/search/index/index.js

import { getSearchKeywords } from "../../../api/http";
import { toast } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: [],
    value: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getSearchKeywords().then((result)=>{
      if(result.status){
        this.setData({ keywords: result.data });
      }
    });
  },

  onSearchHandle(event){
    this.setData({ value: event.detail.value });
  },

  onSearchSubmit(){
    if(this.data.value.length <= 0){
      toast("请输入搜索关键字");
      return false;
    }

    wx.navigateTo({
      url: '/pages/search/list/index?keywords=' + this.data.value,
    })
  },
  onSearch(event){
    let keywords = event.currentTarget.dataset.keywords;
    wx.navigateTo({
      url: '/pages/search/list/index?keywords=' + keywords,
    })
  }
})