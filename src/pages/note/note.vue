<template>
  <div class="container">
    <account-name/>
    <span class="in-box box" :class="{active: showingBox == 1}" @click="showingBox = 1">钱出</span>
    <span class="out-box box" :class="{active: showingBox == 2}" @click="showingBox = 2">钱进</span>
    <div class="in-items items-box" v-if="showingBox == 1">
      <p
        v-for="(item, index) in inItems"
        :key="item"
        @click="getItem(index)"
        class="selected"
      >{{item}}</p>
    </div>
    <div class="out-items items-box" v-if="showingBox == 2">
      <p
        v-for="(item, index) in outItems"
        :key="item"
        @click="getItem(index)"
        :class="{active: isActive}"
      >{{item}}</p>
    </div>
    <form class="from" @submit="onSubmit">
      <input class="how form-item" type="text" placeholder=" 途径" placeholder-class :value="how">
      <input
        class="details form-item"
        placeholder-class
        type="text"
        name="details"
        auto-focus="true"
        :placeholder="details"
      >
      <div class="price-date">
        <input
          class="price form-item"
          placeholder-class
          type="digit"
          name="price"
          :placeholder="price"
        >
        <picker class="picker form-item" mode="date" @change="onDate">
          <view class="date">日期: {{date}}</view>
        </picker>
      </div>
      <button form-type="submit">提交</button>
    </form>
  </div>
</template>


<script>
import store from "../../store/store";
import utils from "../../utils/index";
import AccountName from "../../components/accountName";

export default {
  components: { AccountName },
  data: {
    inItems: [
      "喂肚子",
      "交通",
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
    item: "",
    date: "0000-00-00",
    bookName: "",
    how: "",
    details: "备注",
    price: "￥0.00",
    _id: "",
    accountItem: []
  },

  onLoad(options) {
    this.bookName = options.bookName;
    this._id = options._id;
  },

  mounted() {
    if (this._id != undefined) {
      utils.db
        .collection("moneyInOut")
        .where({ _id: this._id })
        .get({
          success: res => {
            this.how = res.data[0].itemName;
            this.details = res.data[0].details;
            this.price = res.data[0].price;
            this.date = res.data[0].date;
          },
          fail: err => console.error(err)
        });
    }
  },

  computed: {
    name() {
      return store.getters.name;
    }
  },

  methods: {
    getItem(index) {
      this.how = this.item = this.inItems[index];
    },

    onDate(e) {
      this.date = e.mp.detail.value;
    },

    onSubmit(e) {
      let data = e.mp.detail.value;
      if (this._id != undefined) {
        utils.db
          .collection("moneyInOut")
          .doc(this._id)
          .update({
            data: {
              itemName: this.how,
              details: data.details,
              price: data.price,
              date: this.date,
              bookName: this.name
            },
            success: res => {
              wx.navigateTo({
                url: "../check/main"
              });
            },
            fail: err => console.error(err)
          });
      } else {
        if (this.item.length == 0) {
          utils.warn("请选择分类");
        } else if (data.details.length == 0) {
          utils.warn("账务备注不能为空");
        } else if (data.price == 0) {
          utils.warn("金额不能为空");
        } else if (this.date == "0000-00-00") {
          utils.warn("请选择日期");
        } else {
          utils.db.collection("moneyInOut").add({
            data: {
              itemName: this.how,
              details: data.details,
              price: data.price,
              date: this.date,
              bookName: this.name
            },
            success: res => {
              wx.navigateTo({
                url: "../check/main"
              });
            },
            fail: err => console.error(err)
          });
        }
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
  color: #201715;
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
.selected {
  color: red;
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
  background-color: #fff;
  display: inline-block;
}
.how {
  width: 200rpx;
}
.details {
  width: 460rpx;
}
.picker,
.price {
  width: 330rpx;
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

