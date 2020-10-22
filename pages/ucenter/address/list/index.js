// pages/ucenter/address/list/index.js

import { getAddress,editorAddressDelete,setDefaultAddress } from "../../../../api/http";
import { toast } from "../../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    isSelected: false,
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ isEmpty: false });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({isSelected: wx.getStorageSync('ORDER_CONFIRM_SELECT')});
    getAddress().then(res=>{
      if(res.status){
        this.setData({ result: res.data, isEmpty: res.data.length <= 0 ? true : false });
      }else{
        this.setData({ isEmpty: true });
      }
    }).catch(err=>{
      this.setData({ isEmpty: true });
    })
  },

  onSelected(event){
    let id = event.currentTarget.dataset.id;
    setDefaultAddress({
      id: id
    }).then(result=>{
      wx.navigateBack();
    }).catch(err=>{
      toast("请求网络出错，请稍后在试。");
    })
  },

  onEdit(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ucenter/address/editor/index?id=' + id
    });
  },

  onAdd(){
    wx.navigateTo({
      url: '/pages/ucenter/address/editor/index'
    })
  },

  onDelete(event){
    let id = event.currentTarget.dataset.id;
    let list = this.data.result.filter(function (item) {
      if(item.id != id){
          return item;
      }
    });

    this.setData({ result: list,isEmpty: list.length <= 0 ? true : false });
    editorAddressDelete({ id: id });
  }

})