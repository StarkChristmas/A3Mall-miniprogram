// pages/ucenter/collect/index.js

import { getCollectList,deleteCollect } from "../../../api/http";
import { in_array,toast } from "../../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCollgctDataList();
  },

  getCollgctDataList(){
    getCollectList({
      page: this.data.page
    }).then(result=>{
      if(result.status == -1){
        if(this.data.page == 1 && result.data.list <= 0){
          this.setData({ isEmpty: true, isLoading: false,pageStatus: 0 });
        }else{
          this.setData({ isEmpty: false, isLoading: false,pageStatus: 2 });
        }
      }else if(result.status == 1){
        if(result.data.list <= 0 && this.data.page == 1){
          this.setData({ isEmpty: true, isLoading: false,pageStatus: 0 });
        }else{
          this.data.page++; 
          this.setData({
            point: result.data.point,
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

  checkboxChange(e){
    let items = this.data.result,values = e.detail.value;

    this.setData({ isShow: values.length });

    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      const item = items[i];
      if(in_array(item.id,values)){
        this.setData({ [`result[${i}].checked`] : true });
      }else{
        this.setData({ [`result[${i}].checked`] : false });
      }
    }
  },

  onDeleteCollect(){
    let arr = [];
    let result = this.data.result.filter((item)=>{
      if(item.checked){
        arr.push(item);
      }
      return !item.checked;
    });

    if(arr.length <= 0){
      toast("请选择要删除的内容");
      return ;
    }

    let id = [];
    arr.forEach((item)=>{
      id.push(item.id);
    })

    this.setData({ result: result,isEmpty: result.length <= 0 ? true : false });

    deleteCollect({
      id: id.join(",")
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isLoading === false){
      return ;
    } 

    this.setData({ pageStatus: 1 });
    this.getCollgctDataList();
  }
})