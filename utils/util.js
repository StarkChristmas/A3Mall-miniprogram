
/**
 * 动态设置当前页面的标题
 */
export function setTitle(title) {
  wx.setNavigationBarTitle({
    title: title
  });
}

/**
 * 设置navbar标题、颜色
 * @param frontColor 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
 * @param backgroundColor 背景颜色值，有效值为十六进制颜色
 */
export function setNavigationBar(frontColor,backgroundColor) {
  wx.setNavigationBarColor({
    frontColor: frontColor,
    backgroundColor: backgroundColor
  });
}

/**
 * 在当前页面显示导航条加载动画
 */
export function showNavigationBarLoading(){
  wx.showNavigationBarLoading();
}

/**
 * 在当前页面隐藏导航条加载动画
 */
export function hideNavigationBarLoading(){
  wx.hideNavigationBarLoading();
}

/**
 * 动态设置下拉背景字体、loading 图的样式
 * @param text 下拉背景字体、loading 图的样式 dark light
 */
export function setBackgroundTextStyle(text){
  wx.setBackgroundTextStyle({
    textStyle: text
  });
}

export function tabBarBadge(count=0,index=2){
  if(count){
    wx.setTabBarBadge({ index: index, text: count.toString() });
  }else{
    wx.removeTabBarBadge({ index: index })
  }
}

/**
 * 
 * @param msg 
 * @param icon success|loading|none
 * @param time 
 */
export function toast(msg,icon="none",duration=2000){
  return new Promise(function (reslove, reject){
    wx.showToast({
      title: msg,
      icon: icon,
      duration: duration,
      success() {
        reslove();
      },
      fail(){
        reject();
      }
    });
  });
}

/**
 * 显示成功提示框
 */
export function success(msg, callback,duration=2000) {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: duration,
    success() {
      callback && callback();
    }
  });
}

/**
 * 显示失败提示框
 */
export function error(msg, callback) {
  wx.showModal({
    title: '提示信息',
    content: msg,
    showCancel: false,
    success(res) {
      callback && callback();
    }
  });
}

export function confirm(title,content){
  return new Promise(function (reslove, reject){
    wx.showModal({
      title: title,
      content: content,
      success: function (res){
        if(res.confirm){
          reslove();
        }else{
          reject();
        }
      },
      fail: function (){
        reject();
      }
    });
  });
}

export function in_array(search,array){
	let flag = false;
	for(let i in array){
		if(array[i]==search){
			flag = true;
			break;
		}
	}

	return flag;
}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
 */
export function navigateTo(url,params){
	wx.navigateTo({
		url: parseUrl(url,params)
	})
}

/**
 * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
 */
export function redirectTo(url,params){
	wx.redirectTo({
		url: parseUrl(url,params)
	});
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 */
export function reLaunch(url,params){
	wx.reLaunch({
		url: parseUrl(url,params)
	});
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 */
export function switchTab(url){
	wx.switchTab({
		url: parseUrl(url)
	});
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 */
export function navigateBack(delta){
	wx.navigateBack({
		delta: delta
	});
}

/**
 * rpx转px
 * @param int num 
 */
export function rpx2px(num){
  let scale = 750 / wx.getSystemInfoSync().windowWidth;
  return (Number.isNaN(parseFloat(num)) ? 0 : parseFloat(num)) / scale;
}

function parseUrl(url,params={}){
	let arr = [];
	let string = '';
	for(let i in params){
		arr.push(i + "=" + params[i]);
	}
	
	string = "/pages/" + url;
	if(arr.length > 0){
		string += "?" + arr.join("&");
	}
	
	return string;
}