// pages/cart/confirm/index.js

import { in_array, toast,redirectTo } from "../../../utils/util";
import { getCartConfirm,createOrder } from "../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      id: "",
      name: "",
      tel: "",
      address: ""
    },
    bonusId: '0',
    providerList: [],
    orderData: {
      item:{},
      real_amount: 0.00,
      real_freight: 0.00,
      payable_amount: 0.00,
      order_amount: 0.00,
      users_price:0.00,
      real_point: 0,
      type: 0
    },
    remarks: "",
    payment: "wechat",
    params:null,
    orderBtnFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    let id = options.id;
    let params = {
      id: id,type: type
    };

    if(in_array(type,["buy","point","second","regiment","special","group"])){
      params.sku_id = options.sku_id;
      params.num = options.num;
      if(options.kid){
        params.kid = options.kid;
      }
    }

    this.setData({ params: params });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderData();
  },

  getOrderData(){
    wx.showLoading({ title: "加载订单中...", mask: true });
    getCartConfirm(this.data.params).then((res)=>{
      wx.hideLoading();
      if(res.status){
        this.setData({ 
          orderData: res.data,
          address: res.data.address.default
         });
      }else{
        wx.setStorageSync("order_msg",res.info);
        wx.redirectTo({ url: '/pages/cart/msg/index' })
      }
    }).catch(err=>{
      wx.hideLoading();
      wx.setStorageSync("order_msg","加载出现错误，请稍后在试。");
      wx.redirectTo({ url: '/pages/cart/msg/index' })
    });
  },

  onSelectPayment(event){
    let value = event.currentTarget.dataset.pay;
    this.setData({ payment: value });
  },

  onInputRemarks(event){
    this.setData({ remarks: event.detail.value });
  },

  onSelectAddress(){
    wx.setStorageSync('ORDER_CONFIRM_SELECT', 1);
		wx.navigateTo({
      url: '/pages/ucenter/address/list/index'
    });
  },

  onOrderSubmit(){
    if(this.data.orderBtnFlag){
      return ;
    }

    this.setData({ orderBtnFlag: true });
    wx.showLoading({ title: "订单提交中...", mask: true });

    let params = {};
    Object.assign(params,{
      id: this.data.params.id,
      type: this.data.params.type,
      address_id: this.data.address.id,
      bonus_id: this.data.bonusId,
      payment: this.data.payment,
      remarks: this.data.remarks,
      source: 3
    },this.data.params);

    createOrder(params).then((res)=>{
      wx.hideLoading();
      if(res.status){
        this.resultOrderData(res.data);
      }else{
        toast(res.info);
      }
      
      this.setData({ orderBtnFlag: false });
    }).catch((err)=>{
      wx.hideLoading();
      this.setData({ orderBtnFlag: false });
      toast("网络连接错误，请检查网络是否可用");
    });
  },

  resultOrderData(data){
    getApp().updateUserInfo({ shop_count: data.shop_count });
    switch (data.pay+"") {
      case "0":
        redirectTo("order/detail/index",{ id: data.order_id });
        break;
      case "1":
        let params = data.result.params;
        wx.requestPayment({
          timeStamp: params.timeStamp,
          nonceStr: params.nonceStr,
          package: params.package,
          signType: params.signType,
          paySign: params.paySign,
          success (res) { 
            wx.showToast({
              title: "您己支付成功",
              icon: 'success',
              success() {
                redirectTo("order/detail/index",{ id: data.order_id });
              }
            });
          },
          fail (res) { 
            toast("支付失败，原因：" + JSON.stringify(res));
          }
        });
        break;
      case "99":
        wx.setStorageSync("order_msg",data.msg);
        wx.setStorageSync("order_id",data.order_id);
        redirectTo("cart/info/index");
        break;

    }
  },
  
  onUnload(){
    //wx.removeStorageSync("order_msg");
    //wx.removeStorageSync("order_id");
    wx.removeStorageSync("ORDER_CONFIRM_SELECT");
  }
})