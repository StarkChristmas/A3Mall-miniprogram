
import { getSpecialList } from "../../../api/http";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterIndex: 0,
    priceOrder: 1,
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
    this.getGoodsData();
  },

  tabClick(event){
    let type = parseInt(event.currentTarget.dataset.type);
    if(this.data.filterIndex === type && type !== 2){
      return;
    }

    this.setData({ filterIndex: type });
    if(type === 2){
      this.setData({ priceOrder: this.data.priceOrder === 1 ? 2 : 1 });
    }else{
      this.setData({ priceOrder: 0 });
    }

    this.setData({ page: 1, result: [] });
    this.getGoodsData();
  },

  getGoodsData(){
    getSpecialList({ 
      page: this.data.page,
      type: this.data.filterIndex,
      sort: this.data.priceOrder
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.isLoading === false){
      return ;
    } 

    this.setData({ pageStatus: 1 });

    this.getGoodsData();
  },

  jump(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/special/view/index?id=' + id
    });
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})