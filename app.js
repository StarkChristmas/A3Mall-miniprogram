//app.js
import { toast } from './utils/util';

App({
  onLaunch: function (options) {
    this.getUserInfo();

    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    const updateManager = wx.getUpdateManager();
    
    // 监听向微信后台请求检查更新结果事件
    updateManager.onCheckForUpdate(function (res) {});

    // 监听小程序有版本更新事件
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate(); // 强制小程序重启并使用新版本
          }
        }
      });
    });

    // 监听小程序更新失败事件
    updateManager.onUpdateFailed(function () {
      return toast("新版本下载失败");
    });
  },

  getUserInfo(){
    let users = wx.getStorageSync("users");
    if(!users){
      return false;
    }
    
    this.globalData.userinfo = users;
    this.globalData.token = users.token;
    this.globalData.userStatus = true;
  
    return true;
  },

  getUserCartCount(index=2){
    let users = wx.getStorageSync("users");
    if(!users){
      return false;
    }

    if(users.shop_count <= 0){
      wx.removeTabBarBadge({ index: index });
      return false;
    }

    wx.setTabBarBadge({ index: index, text: users.shop_count.toString() });
  },

  updateUserInfo(obj){
    if(JSON.stringify(obj) == '{}'){
      return false;
    }

    let users = wx.getStorageSync("users");
    if(!users){
      return false;
    }
    
    for(let data in obj){
      users[data] = obj[data];
    }
    
    wx.setStorageSync('users', users);
    this.getUserInfo();
  },

  /**
   * 跳转至用户授权页
   */
  onLogin() {
    let pages = getCurrentPages();
    if (pages.length <= 0) {
      return false;
    }

    let currentPage = pages[pages.length - 1];
    if(currentPage.route == "pages/public/login/index"){
        return false;
    }

    wx.setStorageSync("currentPage", currentPage);
    wx.navigateTo({ url: "/pages/public/login/index" });

    return true;
  },
  
  globalData: {
    userinfo    : null,
    token       : "",
    userStatus  : false
  }
})