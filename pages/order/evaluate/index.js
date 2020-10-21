// pages/order/evaluate/index.js

import { getOrderEvaluate,sendOrderEvaluate } from "../../../api/http";
import { toast,redirectTo } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isError: false,
    isSubmit: false,
    orderId: 0,
    rate: 1,
    rateList: [1,2,3,4,5],
    message: '',
    order:{
      item: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ orderId: options.id });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ isError: false });

    getOrderEvaluate({
      id: this.data.orderId
    }).then((res)=>{
      if(res.status){
        this.setData({ order: res.data });
      }else{
        toast(res.info);
      }
      
      this.setData({ isError: false });
    }).catch((err)=>{
      this.setData({ isError: true });
    });
  },

  bindTextInput: function (e) {
    this.setData({ message: e.detail.value });
  },

  onRateItem(event){
    let value = event.currentTarget.dataset.value;
    this.setData({ rate: value });
  },

  onEvaluateSubmit(){
    if(this.data.isSubmit){
      return false;
    }
    
    wx.showLoading();
    this.setData({ isSubmit: true });
    sendOrderEvaluate({
      id: this.data.orderId,
      message: this.data.message,
      rate: this.data.rate
    }).then(res=>{
      wx.hideLoading();
      if(res.status){
        redirectTo('order/detail/index',{
          id: this.data.orderId
        });
      }

      toast(res.info);
      this.setData({ isSubmit: false });
    }).catch(err=>{
      wx.hideLoading();
      this.setData({ isSubmit: false });
      toast("网络出错，请检查网络是否连接");
    });
  }
})