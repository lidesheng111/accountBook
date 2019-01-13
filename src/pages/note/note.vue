<template>
  <div class="container">
    <p class="book-name">当前账本：{{bookName}}</p>
    <span class="in-box box" :class="{active: showingBox == 1}" @click="showingBox = 1">钱出</span>
    <span class="out-box box" :class="{active: showingBox == 2}" @click="showingBox = 2">钱进</span>
    <div class="in-items items-box" v-if="showingBox == 1">
      <p v-for="(item, index) in inItems" :key="item" @click="getItem(index)">{{item}}</p>
    </div>
    <div class="out-items items-box" v-if="showingBox == 2">
      <p v-for="(item, index) in outItems" :key="item" @click="getItem(index)">{{item}}</p>
    </div>
    <form class="from" @submit="onSubmit">
      <input class="details form-item" placeholder-class type="text" name="details" auto-focus="true" placeholder="账务备注">
      <div class="price-date">
        <input class="price form-item" placeholder-class type="digit" name="price" placeholder="￥0.00">
        <picker class="picker form-item" mode="date" @change="onDate">
          <view class="date">日期: {{date}}</view>
        </picker>
      </div>
      <button form-type="submit">提交</button>
    </form>
  </div>
</template>


<script>
import store from '../../store/store';
import utils from '../../utils/index';

export default {
  data: {
    inItems: [
      "喂肚子",
      "交通",
      "旅游",
      "通讯费",
      "房租",
      "水电",
      "穿的",
      "穿戴",
      "洗护化妆",
      "电子设备",
      "医疗",
      "保险",
      "理财",
      "还贷款",
      "借朋友",
      "还账",
      "请客",
      "打给父母",
      "孩子花销",
      "其它杂项"
    ],
    outItems: [
      "工资",
      "生意收入",
      "理财收入",
      "外快",
      "奖金",
      "加班费",
      "报销",
      "借钱",
      "零花钱",
      "其它进账"
    ],
    showingBox: 1,
    item: '',
    date: "0000-00-00",
    bookName: '',
  },

  onLoad(options) {
    console.log(options);
    this.bookName = options.bookName;
  },

  methods: {
    getItem(index) {
      this.item = this.inItems[index];
    },

    onDate(e) {
      this.date = e.mp.detail.value;
    },

    onSubmit(e) {
      let data = e.mp.detail.value;
      if (this.item.length == 0) {
        utils.warn('请选择分类');
      } else if (data.details.length == 0) {
        utils.warn('账务备注不能为空');
      } else if (data.price == 0) {
        utils.warn('金额不能为空');
      } else if (this.date == '0000-00-00') {
        utils.warn('请选择日期');
      } else {
          utils.db.collection('moneyInOut').add({
            data: {
                itemName: this.item, 
                details: e.mp.detail.value.details, 
                price: e.mp.detail.value.price, 
                date: this.date,
                bookName: this.bookName
            },
            success: res => {
              wx.navigateTo({
                url: '../check/main'
              })
            },
            fail: err => console.error(err)
          })
      }
    }
  }
};
</script>


<style>
.book-name {
  font-size: 28rpx;
  font-weight: 100;
  color: #ffd7a6;
  text-decoration: underline;
}
.box {
  display: inline-block;
  width: 335rpx;
  text-align: center;
  background-color: #ffd7a6;
  margin: 20rpx;
  padding: 10rpx 0;
  color: #201715;
  text-shadow: 0 0 2rpx #5f4139;
  letter-spacing: 40rpx;
}
.active {
    background-color: #daa677;
}

.items-box p {
  display: inline-block;
  border: 1rpx solid #daa677;
  border-radius: 10rpx;
  color: #daa677;
  background-color: #e1ffff;
  margin: 20rpx;
  font-size: 28rpx;
  padding: 5rpx 10rpx;
}
.items-box p:hover {
  background-color: #daa677;
  color: #201715;
}
.input-placeholder {
  color: #ffd7a6;
  font-size: 24rpx;
  letter-spacing: 5rpx;
}
form .form-item {
  margin: 20rpx;
  border: 1rpx solid #ffd7a6;
  color: #201715;
  font-size: 28rpx;
  height: 56rpx;
  line-height: 56rpx;
  text-align: center;
  background-color: #e1ffff;
}
.picker,
.price {
  width: 330rpx;
  display: inline-block;
}

.price-date {
    display: flex;
}
button {
    background-color: #ffd7a6;
    color: #fff;
    letter-spacing: 40rpx;
    margin-top: 100rpx;
}
</style>

