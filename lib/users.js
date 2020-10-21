import * as http from "../api/http";

const userStatus = function(){
  let token = "";
  let userStatus = false;
  
  if(getApp()){
    token = getApp().globalData.token;
    userStatus = getApp().globalData.userStatus;
  }

  if(token == "" || !userStatus){
    return false;
  }

  return true;
};

const userInfo = function (){
  return new Promise(function (reslove, reject){
    wx.getUserInfo({
      lang: 'zh_CN',
      success(res) {
        reslove(res);
      },
      fail(res){
        reject(res);
      }
    })
  });
};

const userLogin = function (){
  return new Promise(function (resolve, reject){
    wx.login({
      success(res){
        resolve(res);
      }
    });
  });
};

const userAuth = function(){
  return new Promise(function(resolve, reject){
    userLogin().then(user=>{
      userInfo().then(result=>{
        result.code = user.code;
        resolve(result);
      }).catch(error=>{
        reject(error);
      });
    });
  });
};

const login = function(){
  return new Promise((reslove, reject)=>{
    userAuth().then(result=>{
      http.login(result).then(res=>{
        getApp().globalData.userinfo = res.data;
        getApp().globalData.token = res.data.token;
        getApp().globalData.userStatus = true;
        wx.setStorageSync('users', res.data);
        if(res.status == 2){
          reslove();
        }else{
          reject(res.info);
        }
      });
    }).catch(()=>{
      reject("您无权限请求该接口");
    }); 
  });
};


module.exports = {
  userStatus,userAuth,
  login
};