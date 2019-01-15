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
/* .container {
    margin: 20rpx;
} */
.note-items-container {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    background-color: #b8bf55;
    padding: 0 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 50rpx 0;
}
/* .note-items-container p:nth-child(2) {
    color: #fff;
} */
.item-name {
    position: relative;
    top: -40rpx;
    color: white;
    background-color: #daa677;
    border-radius: 50%;
    border: 8rpx solid #ecf0f3;
}
</style>