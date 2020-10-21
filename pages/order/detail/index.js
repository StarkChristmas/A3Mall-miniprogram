// pages/order/detail/index.js

import { getOrderDetail,getOrderDetailCancel,getOrderDetailPayment } from "../../../api/http";
import { toast,navigateTo } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isError: false,
    orderId: 0,
    active: 0,
    stepsOptions:[
      {
        title: '待付款'
      },{
        title: '待发货'
      },{
        title: '待收货'
      },{
        title: '待评价'
      },{
        title: '己完成'
      }
    ],
    payment: "wechat",
    order:{
      accept_name: "",
      address: "",
      create_time: "",
      item: [],
      mobile: "",
      order_amount: "",
      order_no: "",
      pay_status: "",
      pay_type: "",
      payable_freight: '',
      payable_amount: "",
      promotions: "",
      real_amount: "",
      region: "",
      type: "",
      users_price:"0.00",
      order_status: 1
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
    this.getOrderDetailData();
  },

  onSelectPayment(event){
    let value = event.currentTarget.dataset.pay;
    this.setData({ payment: value });
  },

  go(event){
    let url = event.currentTarget.dataset.url;
    wx.navigateTo({ url: url });
  },

  getOrderDetailData(){
    this.setData({ isError: false });
    getOrderDetail({
      id: this.data.orderId
    }).then((res)=>{
      if(res.status){
        this.setData({ active: res.data.active, order: res.data });
      }else{
        this.setData({ isError: true });
      }
    }).catch((err)=>{
      this.setData({ isError: true });
    });
  },

  cancel(){
    wx.showLoading();
    getOrderDetailCancel({
      order_id: this.data.orderId
    }).then(res=>{
      wx.hideLoading();
      if(res.status){
        toast(res.info);
        navigateTo("order/list/index",{ id: 1 });
      }else{
        toast(res.info);
      }
    }).catch(err=>{
      wx.hideLoading();
      toast("网络出错，请检查网络是否连接");
    });
  },

  goPay(){
    wx.showLoading();

    getOrderDetailPayment({
      order_id: this.data.orderId,
      payment_id: this.data.payment,
      source: 3
    }).then(res=>{
      wx.hideLoading();
      if(res.status){
        this.resultOrderData(res.data);
      }else{
        toast(res.info);
      }
    }).catch(err=>{
      wx.hideLoading();
      toast("网络出错，请检查网络是否连接");
    });
  },

  resultOrderData(data){
    getApp().updateUserInfo({ shop_count: data.shop_count });
    switch (data.pay+"") {
      case "0":
        this.setData({ order: [] });
        this.getOrderDetailData();
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
                this.setData({ order: [] });
                this.getOrderDetailData();
              }
            });
          },
          fail (res) { 
            toast("支付失败，原因：" + JSON.stringify(res));
          }
        });
        break;
      case "99":
        toast(data.msg);
        break;

    }
  }

})