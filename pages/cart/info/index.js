// pages/cart/info/index.js

import { toast } from "../../../utils/util";
import { getCartInfo } from "../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_id = wx.getStorageSync("order_id");
    if(!order_id){
        wx.switchTab({ url: '/pages/index/index' });
    }

    let msg = wx.getStorageSync("order_msg");
    if(!msg){
      toast(msg);
    }

    getCartInfo({
      order_id: order_id
    }).then(res=>{
      if(res.status){
          this.setData({ order: res.data });
      }else{
        wx.switchTab({ url: '/pages/index/index' });
      }

      wx.removeStorageSync("order_msg");
      wx.removeStorageSync("order_id");
    }).catch(err=>{
      wx.switchTab({ url: '/pages/index/index' });
    });
  }

  
})