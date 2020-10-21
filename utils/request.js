
import config from '../config';
import { userStatus } from "../lib/users";

module.exports = {

  create(options={},auth){
      if(auth && !userStatus()){
        return getApp().onLogin();
        //return users.login().then(()=>{ this.create(options,auth); });
      }
      
      let token = "";
      if(getApp()){
        token = getApp().globalData.token;
      }

      options.url = config.HTTP_WEB_API_URL + "api" + options.url;
      return new Promise(function (resolve, reject){
        wx.request({
          url: options.url,
          data: options.data || {},
          method: options.method || "GET",
          header: {
            'content-type' : 'application/json',
            'Auth-Token'   : token
          },
          success (res) {
            if(res.data.status == '-1001'){
              getApp().onLogin();
            }else{
              resolve(res.data);
            }
          },
          fail(res){
            reject({ "status" : "-99", "info" : "网络连接错误" });
          }
        })
      });
  },

  get(url="",params={},auth=false){
    return this.create({
      url: url, data: params, method: "GET"
    },auth);
  },

  post(url="",params={},auth=false){
    return this.create({
      url: url, data: params, method: "POST"
    },auth);
  }

};