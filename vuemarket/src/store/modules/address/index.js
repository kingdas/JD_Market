import Vue from "vue";
import {
    getAddressListData,
    getAddressInfoData,
    getDefaultAddressData,
    delAddressData,
    addAddressData,
    modAddressData
} from "../../../api/address";

export default {
    namespaced: true,
    state: {
        address: []
    },
    mutations: {
        ['SET_ADDRESS'](state, payload) {
            state.address = payload.address;
        },

        ['DEL_ADDRESS'](state, payload) {
            state.address.splice(payload.index, 1);
        }
    },
    actions: {
        //获取地址列表
        getAddressList(context) {
            getAddressListData(context.rootState.user.uid).then(res => {
                if (res.code === 200) {
                    context.commit("SET_ADDRESS", {address: res.data})
                }
            })
        },

        //获取单个地址信息
        getAddressInfo(context, payload) {
            getAddressInfoData({uid: context.rootState.user.uid, aid: payload.aid}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //获取默认地址
        getDefaultAddress(context, payload) {
            getDefaultAddressData(context.rootState.user.uid).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //删除收获地址
        delAddress(context, payload) {
            delAddressData({uid: context.rootState.user.uid, aid: payload.aid}).then(res => {
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success();
                    } else {
                        context.commit("DEL_ADDRESS", {index: payload.index})
                    }
                }
            })
        },

        //添加收货地址
        addAddress(context, payload) {
            addAddressData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //修改收货地址
        modAddress(context, payload) {
            modAddressData({uid: context.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        }
    }
}