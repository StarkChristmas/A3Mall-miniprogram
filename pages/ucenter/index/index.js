// pages/ucenter/index/index.js

import { getUcenter } from "../../../api/http";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    amount:0.00,
    coupon:0,
    avatar: "",
    order_count: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {
    getApp().getUserCartCount();
    if(!app.globalData.userStatus){
      app.onLogin();
    }else{
      this.getUsersData();
    }
  },

  getUsersData(){
    getUcenter().then((res)=>{
      if(res.status){
        this.setData({
          username    : res.data.nickname || res.data.username || res.data.mobile,
          amount      : res.data.amount,
          coupon      : res.data.coupon_count,
          order_count : res.data.order_count
        });
      }
  });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})