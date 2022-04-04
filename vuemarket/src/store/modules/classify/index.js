import Vue from "vue";
import {getClassifyData, getGoodsItemData, getGoodsDetailsData, getGoodsDetailsAttrsData} from "../../../api/goods";

export default {
    namespaced: true,
    state: {
        classify: [],
        goods: [],
        details: {},
        attrs: [],
    },
    mutations: {
        ['SET_CLASSIFY'](state, payload) {
            state.classify = payload.classify;
        },

        ['SELECT_ITEM'](state, payload) {
            if (state.classify.length > 0) {
                for (let i = 0; i < state.classify.length; i++) {
                    if (state.classify[i].active) {
                        state.classify[i].active = false;
                        break;
                    }
                }
                state.classify[payload.index].active = true;
                Vue.set(state.classify, payload.index, state.classify[payload.index]);
            }
        },

        ['SET_GOODS'](state, payload) {
            state.goods = payload.goods;
        },

        ['SET_DETAILS'](state, payload) {
            state.details = payload.details;
        },

        ['SET_DETAILS_ATTRS'](state, payload) {
            state.attrs = payload.attrs;
        },

        ['SELECT_ATTRS'](state, payload) {
            if (state.attrs.length > 0) {
                for (let i = 0; i < state.attrs[payload.index].values.length; i++) {
                    if (state.attrs[payload.index].values[i].active) {
                        state.attrs[payload.index].values[i].active = false;
                        break;
                    }
                }
                state.attrs[payload.index].values[payload.index2].active = true;
                Vue.set(state.attrs[payload.index].values, payload.index2, state.attrs[payload.index].values[payload.index2])
            }
        }

    },
    actions: {
        getClassify(context, payload) {
            getClassifyData().then(res => {
                if (res.code === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].active = false;
                    }
                    context.commit('SET_CLASSIFY', {classify: res.data})
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getGoods(context, payload) {
            getGoodsItemData(payload.cid).then(res => {
                if (res.code === 200) {
                    context.commit('SET_GOODS', {goods: res.data})
                    if (payload.success) {
                        payload.success();
                    }
                } else {
                    context.commit('SET_GOODS', {goods: []})
                }
            })
        },

        getGoodsDetails(context, payload) {
            getGoodsDetailsData(payload.gid).then(res => {
                if (res.code === 200) {
                    context.commit("SET_DETAILS", {details: res.data})
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },

        getGoodsDetailsAttrs(context, payload) {
            getGoodsDetailsAttrsData(payload.gid).then(res => {
                if (res.code === 200) {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            for (let j = 0; j < res.data[i].values.length; j++) {
                                res.data[i].values[j].active = false;
                            }
                        }
                    }
                    context.commit("SET_DETAILS_ATTRS", {attrs: res.data})
                }
            })
        }

    }
}