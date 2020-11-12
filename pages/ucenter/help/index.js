// pages/ucenter/help/index.js

import { toast } from "../../../utils/util";
import { gethelp } from "../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    list: []
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
    gethelp().then((res)=>{
      if(res.status){
          this.setData({ 
            list: res.data,
            active: res.data[0].id
          });
      }else{
        toast(res.info);
      }
    }).catch((error)=>{
      toast("网络出错，请检查网络是否连接");
    });
  },

  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.active) {
      this.setData({ active: e.currentTarget.dataset.index })
    } else {
      this.setData({ active: 0 })
    }
  }
})