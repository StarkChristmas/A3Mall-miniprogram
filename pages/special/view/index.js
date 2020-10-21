// pages/goods/view/index.js
import { getSpeciaDetail } from "../../../api/http";
import { toast,navigateTo } from "../../../utils/util";

const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSkuStatus: false,
    images: [],
    cartCount: 0,
    current: 0,
    products: {},
    attribute: [],
    comments: [],
    item: {},
    goods_id: 0,

    maxHeight:0,
    number: 1,
    minNumber:1,
    maxNumber:0,
    specSelected: '',
    selectedSku:[],
    goodsPrice: "0.00",
    goodsStockNumber: "",
    selectedGoodsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ goods_id: options.id });
    let info = wx.getSystemInfoSync();
    this.setData({ maxHeight: info.windowHeight - 200 });
    if(App.globalData.userinfo != null && App.globalData.userinfo.shop_count > 0){
      this.setData({ cartCount: App.globalData.userinfo.shop_count });
    }
  },

  onBuy(){
    if(this.data.isSkuStatus == false){
      this.setData({ isSkuStatus: !this.data.isSkuStatus });
      return ;
    }

    if(!this.data.selectedGoodsInfo.isSubmit){
      toast("请选择规格！");
      return false;
    }

    if(!App.globalData.userStatus){
      App.onLogin();
      return false;
    }
    
    navigateTo("cart/confirm/index",{
      id: this.data.selectedGoodsInfo.id,
      sku_id: this.data.selectedGoodsInfo.selectedSku.id,
      num: this.data.selectedGoodsInfo.num,
      type: "special"
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getSpeciaDetail({
      id: this.data.goods_id
    }).then((result)=>{
      this.setData({
        products:   result.data.goods,
        attribute:  result.data.attr,
        comments:   result.data.comments,
        item:       result.data.item,
        images:     result.data.photo
      });

      this.initGoodsInfo();
      this.setGoodsSkuInfo();
    });
  },

  initGoodsInfo(){
    this.setData({
      goodsStockNumber  : this.data.products.store_nums,
      goodsPrice        : this.data.products.sell_price,
      selectedGoodsInfo : {
        id              : this.data.products.id,
        num             : this.data.number,
        isSubmit        : true,
        selectedSku     : { id: "", specSelected: "" }
      }
    });
  },

  setGoodsSkuInfo(){
    if(this.data.attribute.length <= 0){
        return ;
    }

    let arr = [];
    let selectedSku = [];
    this.setData({ selectedSku: [] });

    for(let obj in this.data.attribute){
        for(let index in this.data.attribute[obj]['list']){
            if(this.data.attribute[obj]['list'][index]['selected'] && !this.data.attribute[obj]['list'][index]['disable']){
                selectedSku.push(this.data.attribute[obj]['list'][index]);
                arr.push({ name: this.data.attribute[obj].name, value: this.data.attribute[obj]['list'][index].value });
            }
        }
    }

    let selectedIndex = [];
    for(let obj in selectedSku){
        selectedIndex.push(selectedSku[obj].pid+"_"+selectedSku[obj].id);
    }

    if(this.data.attribute.length == selectedIndex.length && this.data.item[selectedIndex.join("_")] != undefined){
      let g = this.data.item[selectedIndex.join("_")];
      if(this.data.number >= g.store_nums){
          this.setData({ number: g.store_nums });
      }

      this.setData({ 
        goodsPrice                          : g.sell_price,
        goodsStockNumber                    : g.store_nums,
        "selectedGoodsInfo.selectedSku.id"  : g.product_id,
        "selectedGoodsInfo.isSubmit"        : true
       });
    }else{
        this.setData({ "selectedGoodsInfo.isSubmit": false });
    }

    this.setData({ specSelected: "" });
    let s = [];
    for(let i in arr){
        s.push(arr[i].name + ":" + arr[i].value);
    }

    this.setData({ selectedSku: selectedSku });
    if(s.length > 0){
      this.setData({ 
        "selectedGoodsInfo.selectedSku.specSelected": s.join(","),
        specSelected: "己选择：" + s.join(",") 
      });
    }
  },

  onSwiperChange(event){
    this.setData({ current: event.detail.current });
  },

  minus(){
    if(this.data.number <= 1){
        return ;
    }

    let number = this.data.number - 1;
    this.setData({
      number: number,
      "selectedGoodsInfo.num": number
    });
  },

  plus(){
      if(this.data.number >= this.data.goodsStockNumber){
          return ;
      }

      let number = this.data.number + 1;
      this.setData({
        number: number,
        "selectedGoodsInfo.num": number
      });
  },

  checkStatus(id, pid){
      let attr = this.data.attribute;
      let flag = false;
      for(let i in attr){
          if(id != attr[i]['id']){
              continue;
          }

          for(let j in attr[i]['list']){
              let value = attr[i]['list'][j];
              if((id == value['pid'] && pid == value['id']) && value['disable']){
                  flag = true;
                  break;
              }
          }
      }

      return flag;
  },

  onSelected(event){
    let id = event.currentTarget.dataset.id;
    let pid = event.currentTarget.dataset.childid;
    if(this.checkStatus(id, pid)){
        return ;
    }
    
    let specArray = [];
    for(let i in this.data.attribute){
        specArray[i] = "[A-Za-z0-9_\\:\\,]+";
        if(id == this.data.attribute[i]['id']){
            for(let j in this.data.attribute[i]['list']){
                let value = this.data.attribute[i]['list'][j];
                if(id == value['pid'] && pid == value['id']){
                    let flag = !value.selected;
                    this.setData({
                      [`attribute[${i}].list[${j}].selected`] : flag
                    });

                    if(flag == true){
                        specArray[i] = value.pid+":"+value.id;
                    }
                }else{
                  this.setData({
                    [`attribute[${i}].list[${j}].selected`] : false
                  });
                }
            }
        }
    }

    for(let i in this.data.attribute){
      for(let j in this.data.attribute[i]['list']){
          let value = this.data.attribute[i]['list'][j];
          let temp = specArray.slice();
          temp[i] = value.pid + ":" + value.id;
          let flag = true;
          for(let j in this.data.item){
              let reg = new RegExp(temp.join(","));
              if(reg.test(this.data.item[j].key) && this.data.item[j].store_nums > 0) {
                  flag = false;
              }
          }

          this.setData({
            [`attribute[${i}].list[${j}].disable`] : flag
          });
          

      }
    }

    this.setGoodsSkuInfo();
  },

  onClose(){
    this.setData({ isSkuStatus: !this.data.isSkuStatus });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})