import Vue from "vue";

export default {
    namespaced: true,
    state: {
        cartData: localStorage['cartData'] ? JSON.parse(localStorage['cartData']) : [],
    },
    getters: {
        freight(state) {
            if (state.cartData.length > 0) {
                let freights = [];
                for (let i = 0; i < state.cartData.length; i++) {
                    freights.push(state.cartData[i].freight);
                }
                return freights.length > 0 ? Math.max.apply(null, freights) : 0;
            } else {
                return 0;
            }
        },
        total(state) {
            if (state.cartData.length > 0) {
                let total = 0;
                for (let i = 0; i < state.cartData.length; i++) {
                    total += state.cartData[i].price * state.cartData[i].amount;
                }
                return parseFloat(total.toFixed(2));
            } else {
                return 0;
            }
        }
    },
    mutations: {
        //添加商品
        ['ADD_ITEM'](state, payload) {
            let isSame = false;
            if (state.cartData.length > 0) {
                for (let i = 0; i < state.cartData.length; i++) {
                    if (state.cartData[i].gid === payload.cartData.gid && JSON.stringify(state.cartData[i].attrs) === JSON.stringify(payload.cartData.attrs)) {
                        isSame = true;
                        state.cartData[i].amount = parseInt(state.cartData[i].amount) + parseInt(payload.cartData.amount);
                        break;
                    }
                }
            }

            if (!isSame) {
                state.cartData.push(payload.cartData)
            }

            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        //选择购物车中商品
        ['SELECT_ITEM'](state, payload) {
            state.cartData[payload.index].checked = !state.cartData[payload.index].checked;
            Vue.set(state.cartData, payload.index, state.cartData[payload.index])
            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        //删除购物车中商品
        ['DEL_ITEM'](state, payload) {
            state.cartData.splice(payload.index, 1);
            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        //减少购物车商品数量
        ['DEC_AMOUNT'](state, payload) {
            state.cartData[payload.index].amount > 1 ? --state.cartData[payload.index].amount : 1;
            Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        //设置购物车商品数量
        ['SET_AMOUNT'](state, payload) {
            state.cartData[payload.index].amount = payload.amount;
            state.cartData[payload.index].amount = parseInt(state.cartData[payload.index].amount.replace(/[^\d]/g, ""));
            if (!state.cartData[payload.index].amount) {
                state.cartData[payload.index].amount = 1;
            }
            Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        //增加购物车商品数量
        ['INC_AMOUNT'](state, payload) {
            state.cartData[payload.index].amount++;
            Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
            localStorage['cartData'] = JSON.stringify(state.cartData);
        },
        ['SELECT_ALL'](state, payload) {
            if (state.cartData.length > 0) {
                for (let i = 0; i < state.cartData.length; i++) {
                    state.cartData[i].checked = payload.checked;
                    Vue.set(state.cartData, i, state.cartData[i]);
                }
                localStorage['cartData'] = JSON.stringify(state.cartData);
            }
        }

    }
}