// pages/ucenter/wallet/index/index.js

import { getWallet } from "../../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: "0.00",
    rechange_amount: "0.00",
    consume_amount: "0.00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getWallet().then((res)=>{
      if(res.status){
          this.setData({
            amount: res.data.amount,
            rechange_amount: res.data.rechange_amount,
            consume_amount: res.data.consume_amount
          });
      }
    });
  }

})