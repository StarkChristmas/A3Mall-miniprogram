// components/count-down/index.js
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {
    nowTime: {
      type: [String,Number],
      value: "0"
    },
    startTime: {
        type: [String,Number],
        value: "0"
    },
    endTime: {
        type: [String,Number],
        value: "0"
    },
    startText: {
        type: String,
        value: "距开始仅剩："
    },
    endText: {
        type: String,
        value: "距结束仅剩："
    },
    finishText: {
        type: String,
        value: "活动己结束"
    },
    dayText: {
        type: String,
        value: "天"
    },
    hourText: {
        type: String,
        value: "小时"
    },
    minuteText: {
        type: String,
        value: "分"
    },
    secondText: {
        type: String,
        value: "秒"
    },
    theme: {
        type: String,
        value: "simple"
    },
    fillZero: {
        type: Object,
        value: {
          day    : {  count : 86400, num : 2,  def : '00' },
          hour   : {  count : 3600,  num : 2,  def : '00' },
          minute : {  count : 60,    num : 2,  def : '00' },
          second : {  count : 1 ,    num : 2,  def : '00' }
        }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: {
      day: "",
      hour: "",
      minute: "",
      second: ""
    },
    before: "",
    after: "",
    current: 0,
    start: 0,
    end: 0,
    total: 0,
    tips: "",
    isShow: false,
    timer: null
  },

  observers: {
    'endTime': function (endTime){
      this.run();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    run(){
        if(this.properties.nowTime == undefined || this.properties.startTime == undefined || this.properties.endTime == undefined){
            return ;
        }

        this.data.now = this.properties.nowTime;
        this.data.start = this.properties.startTime;
        this.data.end = this.properties.endTime;
        this.data.total = this.data.end - this.data.now;
        
        this.updateStatus(false);
        this.message(false,"");
        if(this.data.total <= 0){
            this.message(false,this.properties.finishText);
            return ;
        }else if(this.properties.nowTime < this.properties.startTime){
            this.setData({ before: this.properties.startText });
        }else if(this.properties.nowTime > this.properties.startTime && this.properties.endTime > this.properties.nowTime){
            this.setData({ before: this.properties.endText });
            this.updateStatus(true);
        }

        this.data.timer = setInterval(()=>{
            this.runTime();
        },1000);
    },
    runTime(){
        if(this.data.total <= 0){
            this.data.timer && clearInterval(this.data.timer);
            this.message(false,this.properties.finishText);
            this.updateStatus(false);
            return ;
        }
        
        let dateTime = this.data.total;
        for(let i in this.properties.fillZero){
            let data = this.properties.fillZero[i];
            let flag = dateTime >= data.count ? true : false;
            if(!flag){
              this.setTimeText(i,data.def);
            }

            if(flag){
              //console.log(this.data.time[i])
                let value = Math.floor(dateTime / data.count);
                // this.data.time[i] = this.fill(value.toString(),data.num);
                // this.setData({ [`time.${i}`]: this.fill(value.toString(),data.num) });
                this.setTimeText(i,this.fill(value.toString(),data.num));
                dateTime -= value * data.count;
            }
        }

        this.data.total--;
        this.message(true);
    },
    
    setTimeText(name,value){
      switch(name){
        case "day":
          this.setData({ "time.day": value });
          break;
        case "hour":
          this.setData({ "time.hour": value });
          break;
        case "minute":
          this.setData({ "time.minute": value });
          break;
        case "second":
          this.setData({ "time.second": value });
          break;
      }
    },
    fill(i,n){
        let str = '' + i;
        while(str.length < n){
            str = '0' + str;
        }

        return str;
    },
    message(status,msg){
        this.setData({
          tips: msg || "",
          isShow: status
        });
    },
    updateStatus(status){
        this.triggerEvent("onstatus",{ status: status },{  });
    }
  }
})
