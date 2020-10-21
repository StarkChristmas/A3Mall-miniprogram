// pages/order/confirm_delivery/index.js

import { getOrderDeliveryList,getOrderConfirmDelivery } from "../../../api/http";
import { toast,redirectTo } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isError: false,
    isSubmit: false,
    orderId: 0,
    order:{
      item: [],
      order_amount: "",
      order_no: "",
      payable_freight: '',
      payable_amount: "",
      promotions: "",
      real_amount: ""
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
    getOrderDeliveryList({
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

  onConfirmDeliverySubmit(){
    if(this.data.isSubmit){
      return false;
    }
    
    wx.showLoading();
    this.setData({ isSubmit: true });
    getOrderConfirmDelivery({
      id: this.data.orderId
    }).then(res=>{
      wx.hideLoading();
      if(res.status){
        toast(res.info);
        redirectTo("order/detail/index",{
          id: this.data.orderId
        });
      }else{
        toast(res.info);
      }
      
      this.setData({ isSubmit: false });
    }).catch(err=>{
      wx.hideLoading();
      this.setData({ isSubmit: false });
      toast("网络出错，请检查网络是否连接");
    });
  }
  
})