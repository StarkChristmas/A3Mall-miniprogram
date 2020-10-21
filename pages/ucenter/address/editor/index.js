// pages/ucenter/address/editor/index.js

import { getAddressData,editorAddress } from "../../../../api/http";
import { toast } from "../../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["请选择"],
    id: 0,
    name: "",
    tel: "",
    province: "",
    county: "",
    city: "",
    areaCode: [],
    addressDetail: "",
    is_default: false,
    area_name: '请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id == undefined ? 0 : options.id });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getAddressData({
      id: this.data.id
    }).then(res=>{
      if(res.status){
        let arr = res.data.area_name.split(",");
        this.setData({
          name: res.data.name,
          tel: res.data.tel,
          province: arr[0],
          county: arr[2],
          city: arr[1],
          addressDetail: res.data.addressDetail,
          is_default: res.data.isDefault ? true : false,
          area_name: res.data.area_name,
          region: arr
        });
      }
    });
  },

  onFormSubmit(event){
    let formdata = event.detail.value;
    if(formdata.name.length <= 0){
      toast("请填写用户名");
      return ;
    }

    if(!/^1[3-9]\d{9}$/.test(formdata.tel)){
      toast("您填写的手机号码不正确！");
      return ;
    }

    if(formdata.addressDetail.length <= 0){
      toast("请填写收货地址！");
      return ;
    }else if(formdata.addressDetail.length >= 120){
      toast("您填写的收货地址过长，请勿超过120个字符！");
      return ;
    }

    editorAddress({
      id: this.data.id,
      client_type: "1",
      name: formdata.name,
      tel: formdata.tel,
      province: this.data.province,
      county: this.data.county,
      city: this.data.city,
      areaCode: [],
      addressDetail: formdata.addressDetail,
      is_default: this.data.is_default ? 1 : 0,
    }).then((res)=>{
      if(res.status){
        wx.navigateBack();
      }else{
        toast(res.info);
      }
    })
  },

  switchChange(e){
    this.setData({ is_default: e.detail.value });
  },

  bindRegionChange: function (e) {
    this.setData({
      area_name : e.detail.value.join(","),
      region    : e.detail.value,
      province  : e.detail.value[0],
      county    : e.detail.value[2],
      city      : e.detail.value[1]
    })
  }

})