<template>
    <div class="container">
        <div class="note-items-container" v-for="item in accountItems" :key="item">
            <p>{{item.date}}</p>
            <p>{{item.itemName}}</p>
            <p>{{item.details}}</p>
            <p>￥{{item.price}}</p>
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
}
.note-items-container p:nth-child(2) {
    color: #fff;
}
</style>