// pages/order/express/index.js

import { getOrderExpress } from "../../../api/http";
import { toast } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isError: false,
    active: 0,
    order:{
      express:{
        expName: "",
        number: "",
        takeTime: "",
        updateTime: ""
      },
      accept_name: "",
      address: "",
      create_time: "",
      mobile: "",
      order_no: "",
      region: ""
    },
    stepsOptions:[]
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
    getOrderExpress({ id: this.data.orderId }).then((res)=>{
      if(res.status){
        let stepsOptions = [];
        res.data.express.list.forEach((item,index)=>{
          stepsOptions.push({
            title: item.time,
            desc: item.status
          });
        });
        this.setData({ order: res.data, stepsOptions: stepsOptions });
      }else{
        toast(res.info);
      }
    }).catch((err)=>{
      this.setData({ isError: true });
      toast("网络出错，请检查网络是否连接");
    });
  },

  

})