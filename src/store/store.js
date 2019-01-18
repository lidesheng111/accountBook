import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        moneyInOut: [],
        accountName: ['M的账本', '出租房', '装修'],
        index: 0,
        accountItems: [],
    },

    getters: {
        accountName(state) {
            return state.accountName;
        },
        name(state) {
            return state.accountName[state.index];
        },
        accountItems(state) {
            return state.accountItems.filter( item => item.bookName == state.accountName[state.index]);
        }
    },

    mutations: {
        changeIndex(state, index) {
            state.index = index;
        },
        getAccountItems(state, items) {
            state.accountItems = items;
        }
    }
    
})