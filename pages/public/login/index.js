const App = getApp();

import * as users from "../../../lib/users";
import { toast } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 授权登录
   */
  getUserInfo(e) {
    wx.showLoading({ title: '加载数据中', mask: true });
    users.login().then(()=>{
      wx.hideLoading();
      wx.navigateBack();
    }).catch((error)=>{
      wx.hideLoading();
      toast(error);
    });
  },

  /** 
   * 暂不登录
   */
  onBackPage() {
    wx.switchTab({
      url: '/pages/index/index'
    })();
  }

})