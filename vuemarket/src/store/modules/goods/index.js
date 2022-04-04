import Vue from 'vue'
import {getHotKeywordsData, getSearchData, getGoodsAttrsData} from "../../../api/search";

export default {
    namespaced: true,
    state: {
        historyKeywords: localStorage['historyKeywords'] ? JSON.parse(localStorage['historyKeywords']) :[] ,
        hotKeywords: [],
        cid: "",
        priceData: {
            isHide: false,
            items: [
                {minPrice: 1, maxPrice: 50, active: false},
                {minPrice: 51, maxPrice: 99, active: false},
                {minPrice: 100, maxPrice: 300, active: false},
                {minPrice: 301, maxPrice: 1000, active: false},
                {minPrice: 1001, maxPrice: 4000, active: false},
                {minPrice: 4001, maxPrice: 9999, active: false},
            ]
        },
        minPrice: "",
        maxPrice: "",
        attrs: [],
        params: [],
        total: 0,
        searchData: []
    },
    mutations: {
        //设置历史记录
        ["SET_HISTORYKEYWORDS"](state, payload) {
            state.historyKeywords = payload.historyKeywords;
            localStorage['historyKeywords'] = JSON.stringify(state.historyKeywords);
        },
        //清除历史记录
        ["CLEAR_HISTORYWORDS"](state, payload) {
            localStorage.removeItem('historyKeywords');
            state.historyKeywords = [];
        },
        //设置热词搜索
        ['SET_HOTKEYWORDS'](state, payload) {
            state.hotKeywords = payload.hotKeywords;
        },
        //设置搜索数据
        ['SET_SEARCHDATA'](state, payload) {
            state.searchData = payload.searchData;
            state.total = payload.total;
        },
        ['ADD_SEARCHDATA'](state, payload) {
            if (state.searchData.length > 0) {
                for (let i = 0; i < payload.data.length; i++) {
                    state.searchData.push(payload.data[i]);
                }
            }
        },
        //选择分类
        ['SET_CID'](state, payload) {
            state.cid = payload.cid;
        },
        //是否隐藏价格
        ['HIDE_PRICE'](state, payload) {
            state.priceData.isHide = !state.priceData.isHide;
        },
        //设置最低价
        ['SET_MINPRICE'](state, payload) {
            state.minPrice = payload.minPrice;
            state.minPrice = state.minPrice.replace(/[^\d|\.]/g, '');
        },
        //设置最高价
        ['SET_MAXPRICE'](state, payload) {
            state.maxPrice = payload.maxPrice;
            state.maxPrice = state.maxPrice.replace(/[^\d|\.]/g, '');
        },
        //选择既定价格
        ['SELECT_PRICE'](state, payload) {
            for (let i = 0; i < state.priceData.items.length; i++) {
                if (state.priceData.items[i].active) {
                    state.priceData.items[i].active = false;
                    break;
                }
            }
            state.priceData.items[payload.index].active = !state.priceData.items[payload.index].active;
            Vue.set(state.priceData.items, payload.index, state.priceData.items[payload.index]);
            state.minPrice = state.priceData.items[payload.index].minPrice;
            state.maxPrice = state.priceData.items[payload.index].maxPrice;
        },
        //获取商品属性
        ['SET_ATTRS'](state, payload) {
            state.attrs = payload.attrs;
        },
        //设置商品属性是否可见
        ['HIDE_ATTR'](state, payload) {
            if (state.attrs.length > 0) {
                for (let i = 0; i < state.attrs.length; i++) {
                    if (i === payload.index) {
                        state.attrs[i].show = !state.attrs[i].show;
                        break;
                    }
                }
                Vue.set(state.attrs, payload.index, state.attrs[payload.index]);
            }
        },
        //选中商品属性
        ['SELECT_ATTR'](state, payload) {
            if (state.attrs.length > 0) {
                // for (let i = 0; i < state.attrs.length; i++) {
                //     if (i === payload.index) {
                //         for (let j = 0; j < state.attrs[i].param.length; j++) {
                //             if (j === payload.index2) {
                //                 state.attrs[i].param[j].active = !state.attrs[i].param[j].active;
                //             }
                //         }
                //     }
                // }

                state.attrs[payload.index].param[payload.index2].active = !state.attrs[payload.index].param[payload.index2].active;
                Vue.set(state.attrs[payload.index].param, payload.index2, state.attrs[payload.index].param[payload.index2]);
                // state.params.push(state.attrs[payload.index].param[payload.index2].pid);
            }
        },
        ['SET_PARAM'](state, payload) {
            if (state.attrs.length > 0) {
                for (let i = 0; i < state.attrs.length; i++) {
                    for (let j = 0; j < state.attrs[i].param.length; j++) {
                        if (state.attrs[i].param[j].active) {
                            state.params.push(state.attrs[i].param[j].pid);
                        }
                    }
                }
            }
        },
        //重置
        ['RESET_SCREEN'](state, payload) {
            state.cid = "";
            //清除价格
            for (let i = 0; i < state.priceData.items.length; i++) {
                if (state.priceData.items[i].active) {
                    state.priceData.items[i].active = false;
                    break;
                }
            }
            state.minPrice = "";
            state.maxPrice = "";
            //清除属性
            if (state.attrs.length > 0) {
                for (let i = 0; i < state.attrs.length; i++) {
                    for (let j = 0; j < state.attrs[i].param.length; j++) {
                        if (state.attrs[i].param[j].active) {
                            state.attrs[i].param[j].active = false;
                        }
                    }
                }
                state.params = [];
            }
        }


    },
    actions: {
        //获取热词
        getHotKeywords(context, payload) {
            getHotKeywordsData().then(res => {
                if (res.code === 200) {
                    context.commit("SET_HOTKEYWORDS", {hotKeywords: res.data})
                }
            })
        },
        //搜索
        search(context, payload) {
            getSearchData(payload).then(res => {
                let totalItem = 0;
                let pageNum = 0;
                if (res.code === 200) {
                    totalItem = res.pageinfo.total;
                    pageNum = res.pageinfo.pagenum;
                    context.commit("SET_SEARCHDATA", {searchData: res.data, total: totalItem})
                } else {
                    context.commit("SET_SEARCHDATA", {searchData: [], total: 0})
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },
        //搜索滑动页码的数据
        addSearch(context, payload) {
            getSearchData(payload).then(res => {
                if (res.code === 200) {
                    context.commit("ADD_SEARCHDATA", {data: res.data})
                }
            })
        },
        //选择分类
        selectClassify(context, payload) {
            if (context.rootState.classify.classify.length > 0) {
                for (let i = 0; i < context.rootState.classify.classify.length; i++) {
                    if (context.rootState.classify.classify[i].active) {
                        context.rootState.classify.classify[i].active = false;
                        break;
                    }
                }
                context.rootState.classify.classify[payload.index].active = true;
                Vue.set(context.rootState.classify.classify, payload.index, context.rootState.classify.classify[payload.index]);
                let cid = context.rootState.classify.classify[payload.index].active ? context.rootState.classify.classify[payload.index].cid : "";
                context.commit("SET_CID", {cid: cid})
            }
            if (payload.success) {
                payload.success();
            }
        },
        //获取商品属性
        getAttrs(context, payload) {
            getGoodsAttrsData(payload.kwords).then(res => {
                if (res.code === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].show = true;
                        for (let j = 0; j < res.data[i].param.length; j++) {
                            res.data[i].param[j].active = false;
                        }
                    }
                    context.commit('SET_ATTRS', {attrs: res.data});
                } else {
                    context.commit('SET_ATTRS', {attrs: []})
                }
                if (payload.success) {
                    payload.success();
                }
            })
        },
        resetScreen(context) {
            if (context.rootState.classify.classify.length > 0) {
                for (let i = 0; i < context.rootState.classify.classify.length; i++) {
                    if (context.rootState.classify.classify[i].active) {
                        context.rootState.classify.classify[i].active = false;
                        break;
                    }
                }
                context.commit("RESET_SCREEN");
            }
        }
    }
}