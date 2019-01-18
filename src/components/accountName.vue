<template>
  <dir>
    <picker @change="onChange" :value="index" :range="accountName">
      <i class="fa fa-bars current">当前账本：{{accountName[index]}}</i>
    </picker>
  </dir>
</template>


<script>
import store from '../store/store';

export default {
  data() {
      return {}
  },
  computed: {
      accountName() {
          return store.state.accountName;
      },
      index() {
          return store.state.index
      }
  },

  methods: {
        onChange(e) {
            let index = e.mp.detail.value;
            store.commit('changeIndex', index);
        }
    }
};
</script>


<style>
picker {
    font-size: 28rpx;
    color: green;
    margin-left: 20rpx;
}
</style>
