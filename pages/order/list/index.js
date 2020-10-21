// pages/order/list/index.js

import { getOrderList,getOrderListCancel } from "../../../api/http";
import { toast } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: 1,
    result: [],
    page: 1,
    pageStatus: 1, // 0.隐藏 1.正在加载 2.没有更多内容 3.加载完成
    isEmpty: false,
    isLoading: true // 是否允许加载数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ activeId: options.id });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDataList();
  },

  getOrderDataList(){
    getOrderList({
      type: this.data.activeId,
      page: this.data.page
    }).then((result)=>{
      if(result.status == -1){
        if(this.data.page == 1 && result.data.list <= 0){
          this.setData({  isEmpty: true, isLoading: false,pageStatus: 0 });
        }else{
          this.setData({ isEmpty: false, isLoading: false,pageStatus: 2 });
        }
      }else if(result.status == 1){
        if(result.data.list <= 0 && this.data.page == 1){
          this.setData({ isEmpty: true, isLoading: false,pageStatus: 0 });
        }else{
          this.data.page++; 
          this.setData({
            page: this.data.page,
            isEmpty: false, 
            isLoading: true,
            pageStatus: 3,
            result: this.data.result.concat(result.data.list)
          });
        }
      }
    }).catch(error=>{
      this.setData({ isEmpty: true, isLoading: false,pageStatus: 0 });
    });
  },

  go(event){
    let url = event.currentTarget.dataset.url;
    wx.navigateTo({ url: url });
  },

  tabClick(event){
    let id = event.currentTarget.dataset.id;
    this.setData({ activeId: id,result: [],page: 1 });
    this.getOrderDataList();
  },

  cancel(event){
    let order_id = event.currentTarget.dataset.id;
    wx.showLoading({ title: '加载数据中...' });
    getOrderListCancel({
      order_id: order_id
    }).then(res=>{
      wx.hideLoading();
      if(res.status){
        let index = this.data.result.findIndex((value)=>{
          return value.order_id == order_id;
        });

        this.data.result.splice(index,1);
        this.setData({ result: this.data.result });
        toast(res.info);
      }else{
        toast(res.info);
      }
    }).catch(err=>{
      wx.hideLoading();
      toast("网络出错，请检查网络是否连接");
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isLoading === false){
      return ;
    } 

    this.setData({ pageStatus: 1 });

    this.getOrderDataList();
  }

})