// pages/news/view/detail.js

import { getNewsDetail } from "../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getNewsDetail({
      id: options.id
    }).then(res=>{
      this.setData({ isEmpty: false });
        if(res.status){
          this.setData({ result: res.data });
        }else{
          this.setData({ isEmpty: true });
        }
    }).catch(err=>{
        this.setData({ isEmpty: true });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})