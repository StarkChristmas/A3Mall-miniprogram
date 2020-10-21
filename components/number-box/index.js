// components/number-box/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: [Number, String],
      value: 1
    },
    index: {
      type: [Number, String],
      value: 0
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 100
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: 0
  },

  ready() {
    this.setData({ inputValue: this.properties.value });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    calcValue(event){
      let type = event.currentTarget.dataset.type;
      if (this.properties.disabled) {
        return;
      }

      let value = this.data.inputValue;
      if (type === "minus") {
        value -= 1;
        if (value < this.properties.min) {
          return;
        }
        if(value > this.properties.max){
          value = this.properties.max
        }
      } else if (type === "plus") {
        value += 1;
        if (value > this.properties.max) {
          return;
        }
        if(value < this.properties.min){
          value = this.properties.min
        }
      }

      this.setData({ inputValue: value });
      this.updateTriggerEvent(value);
    },
    onBindInput(event){
      let value = event.detail.value;
      if(value <= 0){
        return ;
      }

      value = +value;
      if (value > this.properties.max) {
        value = this.properties.max;
      } else if (value < this.properties.min) {
        value = this.properties.min;
      }

      this.setData({ inputValue: value });
      this.updateTriggerEvent(value);
    },
    updateTriggerEvent(value){
      this.triggerEvent("number",{ value: value, index: parseInt(this.properties.index) });
    }
  }
})
