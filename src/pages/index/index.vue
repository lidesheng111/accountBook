<template>
    <div class="container">
        <img class="bg" src="cloud://test1009.7465-test1009/plants.jpg" mode="widthFix"/>
        <img class="wood1 wood" src="/static/images/wood-s.png" mode="widthFix" @click="toNote">
        <img class="wood2 wood" src="/static/images/wood-s.png" mode="widthFix" @click="toCheck">
        <div class="note text" @click="toNote">记账</div>
        <div class="check text" @click="toCheck">查看</div>
        <div v-if="showing" class="account-select">
            <p class="account-name" v-for="(item, index) in accountName" :key="item"><i class="fa fa-pencil-square-o" @click="onNavigate(index)">{{item}}</i></p>
            <i v-if="id==1" class="fa fa-plus">添加</i>
        </div>
    </div>
</template>


<script>
export default {
    data: {
       accountName: ['M的账本', '出租房', '装修'],
       showing: false,
       id: 1,
       i: 1
    },

    methods: {
        toNote() {
            if (this.i == 2) {
                // 说明刚切换过来
                this.id = 1;
                this.i = 1;
            } else if (this.i == 1) {
                this.showing = !this.showing;
                this.id = 1;
            }
        },
        toCheck() {
            if (this.i==1) {
                // 说明刚切换过来
                this.id = 2;
                this.i = 2;
            } else if (this.i==2) {
                this.showing = !this.showing;
                this.id = 2;
            }
        },
        onNavigate(index) {
            if (this.id == 1) {
                wx.navigateTo({
                    url: '/pages/note/main?bookName=' + this.accountName[index],
                })
            } else {
                wx.navigateTo({
                    url: '/pages/check/main?bookName=' + this.accountName[index],
                })
            }
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
.note {
    top: 130rpx;
    left: 140rpx;
}
.check {
    left: 140rpx;
    top: 382rpx;
}

.account-select {
    color: #31401c;
    font-size: 30rpx;
    font-weight: 100;
    margin-bottom: 10rpx;
    /* text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.8); */
    position: absolute;
    top: 100rpx;
    right: 50rpx;
    background-color: white;
    padding: 20rpx;
    border-radius: 20rpx;
    box-shadow: 2rpx 5rpx 10rpx rgba(0, 0, 0, 0.8)
}
</style>


