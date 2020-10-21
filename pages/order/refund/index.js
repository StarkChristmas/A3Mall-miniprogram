// pages/order/refund/index.js

import { getOrderRefund,sendOrderRefund } from "../../../api/http";
import { toast,redirectTo } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isError: false,
    isSubmit: false,
    orderId: 0,
    message: "",
    order:{
      item: [],
      order_amount: "",
      order_no: "",
      payable_freight: '',
      payable_amount: "",
      promotions: "",
      real_amount: "",
      is_refund:false,
      order_status: ""
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
    getOrderRefund({
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
  
  onRefundSubmit(){
    if(this.data.isSubmit){
      return false;
    }
    
    wx.showLoading();
    this.setData({ isSubmit: true });
    sendOrderRefund({
      id: this.data.orderId,
      message: this.data.message
    }).then(res=>{
      wx.hideLoading();
      if(res.status){
        toast(res.info);
        this.setData({ "order.is_refund": true });
        redirectTo("order/detail/index",{ id: this.data.orderId });
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