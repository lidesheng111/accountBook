<template>
    <div class="container">
        <account-name />
        <div class="note-items-container" v-for="item in accountItems" :key="item">
            <p class="item-name">{{item.itemName}}</p>
            <p class="date">{{item.date}}</p>
            <p class="price">￥{{item.price}}</p>
            <p class="details">{{item.details}}</p>
        </div>    
    </div>
</template>


<script>
import store from '../../store/store';
import utils from '../../utils/index';
import AccountName from '../../components/accountName';

export default {
    components: {AccountName},
    data: {
        accountItems: '',
        index: ''
    },
    computed: {
        accountName() {
            return store.state.accountName;
        }
    },

    onLoad(options) {
        this.index = options.index;
    },
    mounted() {
        utils.db.collection('moneyInOut').get()
            .then( res => {
                console.log(res);
                this.accountItems = res.data
            })
            .catch( err => console.error(err) )
    },
}
</script>


<style>
.note-items-container {
    display: grid;
    grid-template-columns: 160rpx 140rpx 374rpx;
    grid-template-rows: 40rpx 40rpx;
    font-size: 24rpx;
    padding: 0 20rpx;
    height: 80rpx;
    margin: 50rpx 0;
    color: green;
    text-align: center;
    background: linear-gradient(#e5e7b6, #ecf0f3)
}

.item-name {
    position: relative;
    top: -40rpx;
    color: rgb(168, 218, 32);
    background-color: #daa677;
    border-radius: 50%;
    border: 8rpx solid #ecf0f3;
    font-size: 24rpx;
    padding: 5rpx;
    height: 64rpx;
    line-height: 64rpx;
    width: 130rpx;
    background: linear-gradient(#e5e7b6, #ecf0f3)
}
.date {
    width: 140rpx;
    grid-column: 2/3;
    align-self: center;
}
.price {
    width: 100rpx;
    grid-column: 2/3;
    align-self: center;
}
.details {
    width: 374rpx;
    grid-column: 3/4;
    grid-row: 1/3;
    align-self: center;
}
</style>