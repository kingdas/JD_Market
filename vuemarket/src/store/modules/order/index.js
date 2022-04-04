import {
    addOrderData,
    getOrderNumData,
    getOrderData,
    cancelOrderData,
    sureOrderData,
    getOrderDetailsData,
    getReviewOrdersData,
    getReviewItemsData,
    addReviewsData
} from "../../../api/order";

export default {
    namespaced: true,
    state: {
        orderNum: "",
        orders: [],
        orderInfo: {},
        reviewOrders: [],
        reviewItems: []
    },
    mutations: {
        //设置订单编号
        ['SET_ORDERNUM'](state, payload) {
            state.orderNum = payload.orderNum;
        },
        //设置订单列表
        ['SET_ORDERS'](state, payload) {
            state.orders = payload.orders;
        },
        ['SET_ORDERS_PAGE'](state, payload) {
            state.orders.push(...payload.orders);
        },
        //取消订单
        ['CANCEL_ORDER'](state, payload) {
            state.orders.splice(payload.index, 1);
        },
        //确认订单
        ['SURE_ORDER'](state, payload) {
            state.orders[payload.index].status = payload.status;
        },
        //订单信息
        ['SET_ORDERINFO'](state, payload) {
            state.orderInfo = payload.orderInfo;
        },
        //获取待评价订单列表
        ['SET_REVIEW_ORDERS'](state, payload) {
            state.reviewOrders = payload.reviewOrders;
        },
        //获取待评价订单列表分页
        ['SET_REVIEW_ORDERS_PAGE'](state, payload) {
            state.reviewOrders.push(...payload.reviewOrders);
        },
        //设置评价项
        ['SET_REVIEW_ITEMS'](state, payload) {
            state.reviewItems = payload.reviewItems;
        },
        //评价星级
        ['SET_REVIEW_SCORE'](state, payload) {
            for (let i = payload.index2 + 1; i < state.reviewItems[payload.index].scores.length; i++) {
                state.reviewItems[payload.index].scores[i].active = false;
            }
            for (let j = 0; j <= payload.index2; j++) {
                state.reviewItems[payload.index].scores[j].active = true;
            }
            state.reviewItems[payload.index].score = payload.score;
        }

    },
    actions: {
        //提交订单
        addOrder(context, payload) {
            addOrderData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //获取订单编号
        getOrderNum(context) {
            getOrderNumData(context.rootState.user.uid).then(res => {
                if (res.code === 200) {
                    context.commit("SET_ORDERNUM", {orderNum: res.data.ordernum});
                }
            })
        },

        //获取订单
        getOrder(context, payload) {
            getOrderData({uid: context.rootState.user.uid, ...payload}).then(res => {
                let pageNum = 0;
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    context.commit("SET_ORDERS", {orders: res.data});
                } else {
                    pageNum = 0;
                    context.commit("SET_ORDERS", {orders: []});
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },
        getOrderPage(context, payload) {
            getOrderData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    context.commit("SET_ORDERS_PAGE", {orders: res.data});
                }
            })
        },

        //取消订单
        cancelOrder(context, payload) {
            cancelOrderData({uid: context.rootState.user.uid, ...payload}).then(res => {
                    if (res.code === 200) {
                        context.commit("CANCEL_ORDER", {index: payload.index});
                    }
                }
            )
        },

        //确认订单
        sureOrder(context, payload) {
            sureOrderData({uid: context.rootState.user.uid, ordernum: payload.ordernum}).then(res => {
                if (res.code === 200) {
                    context.commit("SURE_ORDER", {index: payload.index, status: payload.status});
                }
            })
        },

        //获取订单详情
        getOrderDetails(context, payload) {
            getOrderDetailsData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    context.commit("SET_ORDERINFO", {orderInfo: res.data})
                }
            })
        },

        //获取评价列表
        getReviewOrders(context, payload) {
            getReviewOrdersData({uid: context.rootState.user.uid, ...payload}).then(res => {
                let pageNum = 0;
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    context.commit("SET_REVIEW_ORDERS", {reviewOrders: res.data})
                } else {
                    context.commit("SET_REVIEW_ORDERS", {reviewOrders: []});
                }

                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },

        //获取评价列表分页
        getReviewOrdersPage(context, payload) {
            getReviewOrdersData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    context.commit("SET_REVIEW_ORDERS_PAGE", {reviewOrders: res.data});
                }
            })
        },

        //获取评价项
        getReviewItems(context) {
            getReviewItemsData().then(res => {
                if (res.code === 200) {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i].score = 5;
                            res.data[i].scores = [
                                {
                                    value: 1,
                                    active: true
                                },
                                {
                                    value: 2,
                                    active: true
                                },
                                {
                                    value: 3,
                                    active: true
                                },
                                {
                                    value: 4,
                                    active: true
                                },
                                {
                                    value: 5,
                                    active: true
                                }
                            ]
                        }
                    }
                    context.commit("SET_REVIEW_ITEMS", {reviewItems: res.data})
                }
            })
        },

        //提交评价
        addReviews(context, payload) {
            addReviewsData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        }
    }
}