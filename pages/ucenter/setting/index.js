// pages/ucenter/setting/index.js

import { getUserInfo,editUserInfo } from "../../../api/http";
import { toast } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    username: "",
    sex:"男",
    birthday:'',
    startDate: '1980-01-01',
    endDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    this.setData({
      endDate: date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
    });
    getUserInfo().then((res)=>{
      if(res.status){
        this.setData({
          username: res.data.nickname,
          sex:      this.data.array[res.data.sex - 1],
          birthday: res.data.birthday
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onUserHandle(event){
    this.setData({ username: event.detail.value });
  },

  onSubmit(){
    if(this.data.username.length <= 0){
      this.$utils.msg("请填写用户名");
      return ;
    }

    editUserInfo({
      username: this.data.username,
      sex: this.data.sex,
      birthday: this.data.birthday
    }).then((res)=>{
      toast(res.info);
    });
  },

  bindPickerChange(e){
    this.setData({
      sex: this.data.array[e.detail.value]
    });
  },

  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },

})