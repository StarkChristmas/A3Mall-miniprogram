// pages/cart/index/index.js

import { tabBarBadge,in_array,toast,navigateTo } from "../../../utils/util";
import { getCartList,deleteCart,updateCartGoods } from "../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDelete: false,
    isChecked: false,
    total: 0.00,
    result: [],
    page: 1,
    pageStatus: 1, // 0.隐藏 1.正在加载 2.没有更多内容 3.加载完成
    isEmpty: false,
    isLoading: true // 是否允许加载数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  onShow(){
    getApp().getUserCartCount();
    this.setData({ result: [], page: 1 });
    this.getCartDataList();
  },

  getCartDataList(){
    getCartList({  
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
          result.data.list.forEach((item,index)=>{
            result.data.list[index]['checked'] = false;
            result.data.list[index]['disabled'] = false;
          });
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

  onNumberEvent(event){
    let index = event.detail.index; // 商品ID
    let value = event.detail.value; // 商品数量
    let goods = this.data.result;
    for(let i in goods){
      if(goods[i].id==index){
        if(goods[i].goods_nums != value){
          updateCartGoods({
            id: goods[i].goods_id,
            sku_id: goods[i].product_id,
            num: value
          }).then((res)=>{
            if(res.status){
              this.setData({ [`result[${i}].goods_nums`]: value });
              tabBarBadge(res.data.count);
              getApp().updateUserInfo({ shop_count: res.data.count });
              this.onCalcGoodsPrice();
            }else{
              this.setData({ [`result[${i}].disabled`]: true });
            }
            
          }).catch((error)=>{
            this.setData({ [`result[${i}].disabled`]: true });
          });
        }
        break;
      }
    }
  },

  checkboxChange(event){
    let items = this.data.result,values = event.detail.value;

    this.setData({ isDelete: values.length });

    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      const item = items[i];
      if(in_array(item.id,values)){
        this.setData({ [`result[${i}].checked`] : true });
      }else{
        this.setData({ [`result[${i}].checked`] : false });
      }
    }

    this.onCalcGoodsPrice();
  },

  checkboxAll(event){
    let items = this.data.result;
    let value = event.detail.value;
    this.setData({ isDelete: value.length });

    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      this.setData({ [`result[${i}].checked`] : value.length });
    }

    this.onCalcGoodsPrice();
  },

  onCalcGoodsPrice(){
    let total = 0.00;
    this.data.result.forEach((item,index)=>{
      if(item.checked){
        total += parseFloat(item.price) * item.goods_nums;
      }
    });
    
    this.setData({ total: total });
  },

  onDeleteGoods(){
    let arr = [];
    let goods = this.data.result.filter((item)=>{
      if(item.checked){
        arr.push(item);
      }
      return !item.checked;
    });

    if(arr.length <= 0){
      return 0;
    }

    let id = [];
    arr.forEach((item)=>{
      id.push(item.id);
    });

    deleteCart({
      id: id.join(",")
    }).then((res)=>{
      tabBarBadge(res.data);
      getApp().updateUserInfo({ shop_count: res.data, isChecked: false });
      this.setData({ result: goods, isDelete: false });
    }).catch((err)=>{
      toast("删除失败，请稍后在试。");
    });
  },

  onSubmit(){
    let array = [];
    for(let i in this.data.result){
      if(this.data.result[i].checked){
        array.push(this.data.result[i].id);
      }
    }
    
    if(array.length <= 0){
      toast("请选择需要结算的商品");
      return false;
    }

    navigateTo("cart/confirm/index",{
      id: array.join(","),
      type: "cart"
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
    this.getCartDataList();
  }

})