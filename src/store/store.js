import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        moneyInOut: [],
        accountName: ['M的账本', '出租房', '装修'],
        index: 0,
    },

    mutations: {
        changeIndex(state, index) {
            state.index = index;
        }
    }
    
})