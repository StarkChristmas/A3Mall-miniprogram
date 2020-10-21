import request from "./../utils/request";

export function getHomeCommon() {
  return request.get("/index");
}

export function getHomeList(param) {
  return request.get("/index/list",param);
}

export function login(param){
  return request.post("/auth",param);
}

export function getCategoryList() {
  return new Promise((resolve, reject)=>{
      request.get("/category").then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(err)
      });
  });
}

export function searchKeywords(params) {
    return new Promise((resolve, reject) => {
        request.get("/search/keywords",params).then((result)=>{
            resolve(result)
        }).catch(err=>[
            reject(err)
        ]);
    })
}

export function getSearchKeywords() {
  return new Promise((resolve, reject) => {
      request.get("/search").then((result)=>{
          resolve(result)
      }).catch(err=>[
          reject(err)
      ]);
  })
}

export function getGoodsList(params) {
  return new Promise((resolve, reject) => {
      request.get("/goods/list",params).then((result)=>{
          resolve(result)
      }).catch((error)=>{
          reject(error)
      });
  });
}

export function getGoodsDetail(params) {
    return new Promise((resolve, reject) => {
        request.get("/goods/view",params).then((result)=>{
            resolve(result);
        }).catch(err=>{
            reject(err);
        });
    });
}

export function goodsDetailAddCart(params) {
    return new Promise((resolve, reject) => {
        request.post("/cart/add",params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}

export function goodsDetailFavorite(params) {
    return new Promise((resolve, reject) => {
        request.get("/goods/favorite",params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err);
        });
    });
}

export function getSearchList(params) {
  return new Promise((resolve, reject) => {
      request.get("/search/list",params).then((result)=>{
          resolve(result)
      }).catch((error)=>{
          reject(error)
      });
  })
}

export function getCouponReceive(params) {
  return new Promise((resolve, reject) => {
      request.get("/bonus/receive",params,true).then(res=>{
          resolve(res);
      }).catch(err=>{
          reject(err);
      });
  });
}

export function getCouponLoad(params) {
  return new Promise((resolve, reject) => {
      request.get("/bonus",params,true).then(result=>{
          resolve(result);
      }).catch((error)=>{
          reject(err);
      });
  });
}

export function getRegimentList(params) {
  return new Promise((resolve, reject) => {
      request.get("/regiment",params).then((result)=>{
          resolve(result)
      }).catch((error)=>{
          reject(error)
      });
  });
}

export function getRegimentDetail(params) {
  return new Promise((resolve, reject) => {
      request.get("/regiment/view",params).then((result)=>{
          resolve(result);
      }).catch(err=>{
          reject(error)
      });
  });
}

export function getSecondList(params) {
  return new Promise((resolve, reject) => {
      request.get("/second",params).then((result)=>{
          resolve(result)
      }).catch((error)=>{
          reject(error)
      });
  });
}

export function getSecondDetail(params) {
  return new Promise((resolve, reject) => {
      request.get("/second/view",params).then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(error)
      });
  })
}

export function getSpecialList(params) {
    return new Promise((resolve, reject) => {
        request.get("/special",params).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        });
    })
}

export function getSpeciaDetail(params) {
    return new Promise((resolve, reject) => {
        request.get("/special/view",params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(error)
        });
    })
}

export function getPointList(params) {
    return new Promise((resolve, reject) => {
        request.get("/point",params).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        });
    });
}

export function getPointDetail(params) {
    return new Promise((resolve, reject) => {
        request.get("/point/view",params).then((result)=>{
            resolve(result);
        }).catch(error=>{
            reject(error)
        });
    });
}

export function getNewsList(params) {
    return new Promise((resolve, reject) => {
        request.get("/news",params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}

export function getNewsDetail(params) {
    return new Promise((resolve, reject) => {
        request.get("/news/view",params).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        });
    })
}

export function getCartList(params) {
    return new Promise((resolve,reject)=>{
        request.get("/cart",params,true).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}

export function deleteCart(params) {
    return new Promise((resolve,reject)=>{
        request.post("/cart/delete",params,true).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    });
}

export function updateCartGoods(params) {
    return new Promise((resolve,reject)=>{
        request.post("/cart/change",params,true).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        });
    });
}

export function getCartConfirm(params) {
    return new Promise((resolve,reject)=>{
        request.get("/order/confirm",params,true).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err);
        });
    });
}

export function createOrder(params) {
    return new Promise((resolve,reject)=>{
        request.post("/order/create",params,true).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        });
    });
}

export function getCartInfo(params) {
    return new Promise((resolve,reject)=>{
        request.get("/order/info",params).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err);
        });
    });
}


export function getOrderConfirmDelivery(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/confirm_delivery",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderDeliveryList(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/delivery",params).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        });
    })
}

export function getOrderDetail(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/detail",params).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        });
    })
}

export function getOrderExpress(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/express",params).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        });
    })
}

export function getOrderDetailPayment(params) {
    return new Promise((resolve, reject) => {
        request.get("/order/payment",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderDetailCancel(params) {
    return new Promise((resolve, reject) => {
        request.get("/order/cancel",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function sendOrderEvaluate(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/do_evaluate",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderEvaluate(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/evaluate",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderList(params) {
    return new Promise((resolve, reject) => {
        request.get("/order/list",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderListCancel(params) {
    return new Promise((resolve, reject) => {
        request.get("/order/cancel",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderRefund(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/refund",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function sendOrderRefund(params) {
    return new Promise((resolve, reject) => {
        request.post("/order/apply_refund",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getOrderService(params) {
    return new Promise((resolve, reject) => {
        request.get("/order/service",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getUcenter() {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/info",{},true).then((res)=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    });
}

export function getCollectList(params) {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/favorite",params,true).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        });
    })
}

export function deleteCollect(params) {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/favorite_delete",params,true).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error);
        });
    })
}

export function getAddress() {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/address/list",{},true).then((res)=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    });
}

export function getAddressData(params) {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/address",params,true).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err);
        });
    });
}

export function setDefaultAddress(params){
    return new Promise((resolve, reject) => {
        request.post("/ucenter/address/set_address",params).then((res)=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    });
}

export function editorAddress(params) {
    return new Promise((resolve, reject) => {
        request.post("/ucenter/address/save",params).then((res)=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    });
}

export function editorAddressDelete(params) {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/address/delete",params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getWallet() {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/wallet",{},true).then((res)=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function getCoupon(params) {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/coupon",params,true).then(result=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        });
    })
}

export function getUcenterPointList(params) {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/point",params,true).then((res) => {
            resolve(res)
        }).catch((error) => {
            reject(error)
        });
    })
}

export function getUserInfo() {
    return new Promise((resolve, reject) => {
        request.get("/ucenter/get_setting",{},true).then((res)=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}

export function editUserInfo(params) {
    return new Promise((resolve, reject) => {
        request.post("/ucenter/setting",params,true).then((res)=>{
            resolve(res);
        }).catch(err=>{
            reject(err)
        });
    })
}