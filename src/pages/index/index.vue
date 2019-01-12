<template>
    <div class="container">
        <img class="bg" src="/static/images/plants.jpg" mode="widthFix"/>
        <img class="wood1 wood" src="/static/images/wood-s.png" mode="widthFix" @click="toNote">
        <img class="wood2 wood" src="/static/images/wood-s.png" mode="widthFix" @click="toCheck">
        <div class="notes text" @click="toNote">记账</div>
        <div class="check text" @click="toCheck">查看</div>
    </div>
</template>


<script>
export default {
    methods: {
        toNote() {
            wx.navigateTo({
                url: '/pages/note/main'
            })
        },
        toCheck() {
            wx.navigateTo({
                url: '/pages/check/main'
            })
        }
    }
}
</script>


<style>
.bg {
    width: 100%;
    position: fixed;
    z-index: -1;
}

.wood {
    width: 200rpx;
    margin: 100rpx;
    border-radius: 10rpx;
    box-shadow: 5rpx 10rpx 5rpx rgba(0, 0, 0, 0.8);
}
.wood1 {
    margin: 100rpx;
}
.wood2 {
    margin: 20rpx 100rpx;
}

.text {
    position: absolute;
    color: #201715;
    text-shadow:0 0 2rpx #5f4139;
    font-weight: 900;
    font-size: 48rpx;
    letter-spacing: 20rpx;
}
.notes {
    top: 130rpx;
    left: 140rpx;
}
.check {
    left: 140rpx;
    top: 382rpx;
}

</style>


