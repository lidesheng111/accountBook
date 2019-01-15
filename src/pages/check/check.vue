<template>
    <div class="container">
        <div class="note-items-container" v-for="item in accountItems" :key="item">
            <p class="item-name">{{item.itemName}}</p>
            <p class="date">{{item.date}}</p>
            <p class="details">{{item.details}}</p>
            <p class="price">￥{{item.price}}</p>
        </div>
    </div>
</template>


<script>
import store from '../../store/store';
import utils from '../../utils/index';
export default {
    data: {
        accountItems: [],
    },
    mounted() {
        utils.db.collection('moneyInOut').get()
            .then( res => {
                console.log(res);
                this.accountItems = res.data
            })
            .catch( err => console.error(err) )
    }
}
</script>


<style>
.note-items-container {
    display: flex;
    font-size: 24rpx;
    /* background-color: #e5e7b6; */
    padding: 0 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 50rpx 0;
    color: green;
    text-align: center;
    background: linear-gradient(#e5e7b6, #ecf0f3)
}

.item-name {
    position: relative;
    top: -40rpx;
    color: white;
    background-color: #daa677;
    border-radius: 50%;
    border: 8rpx solid #ecf0f3;
    font-size: 24rpx;
    padding: 5rpx;
    height: 64rpx;
    line-height: 64rpx;
}
.date {
    width: 140rpx;
}
.price {
    width: 100rpx;
    position: absolute;
    right: 20rpx;
}
.details {
    width: 374rpx;
}
</style>