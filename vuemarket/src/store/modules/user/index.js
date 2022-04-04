import {
    loginData,
    userRegData,
    safeUserData,
    safeOutLoginData,
    checkVCodeData,
    isCellphoneReg,
    getUserinfoData,
    uploadHeadData,
    updateUserInfoData,
    modUserCellphoneData,
    modUserPasswordData,
    addFavsData,
    getFavsData,
    delFavsData
} from "../../../api/user";

export default {
    namespaced: true,
    state: {
        uid: localStorage['uid'] ? localStorage['uid'] : "",
        nickname: localStorage['nickname'] ? localStorage['nickname'] : "",
        authToken: localStorage['authToken'] ? localStorage['authToken'] : "",
        isLogin: localStorage['isLogin'] ? localStorage['isLogin'] : false,
        head: "",
        points: 0,
        favs: []
    },
    mutations: {
        ["SET_LOGIN"](state, payload) {
            state.uid = payload.uid;
            state.nickname = payload.nickname;
            state.isLogin = payload.isLogin;
            state.authToken = payload.authToken;
            localStorage["uid"] = payload.uid;
            localStorage['nickname'] = payload.nickname;
            localStorage['isLogin'] = payload.isLogin;
            localStorage["authToken"] = payload.authToken;
        },
        ["OUT_LOGIN"](state) {
            state.uid = "";
            state.nickname = "";
            state.authToken = "";
            state.isLogin = false;
            state.head = "";
            state.points = 0;
            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem("authToken");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("cartData");
        },
        ["SET_USERINFO"](state, payload) {
            state.nickname = payload.nickname;
            state.head = payload.head;
            state.points = payload.points;
        },
        //我的收藏
        ['GET_FAVS'](state, payload) {
            state.favs = payload.favs;
        },
        ['GET_FAVS_PAGE'](state, payload) {
            state.favs.push(...payload.favs);
        },
        //删除收藏
        ['DEL_FAVS'](state, payload) {
            state.favs.splice(payload.index, 1);
        }
    },
    actions: {
        //会员登录
        login(conText, payload) {
            loginData(payload).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_LOGIN", {
                        uid: res.data.uid,
                        nickname: res.data.nickname,
                        isLogin: true,
                        authToken: res.data.auth_token
                    });
                }
                if (payload.success) {
                    payload.success(res)
                }
            })
        },
        //会员注册
        userReg(context, payload) {
            userRegData(payload).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        //安全退出
        outLogin(context) {
            safeOutLoginData({uid: context.state.uid}).then(res => {
                // console.log(res);
                context.rootState.cart.cartData = [];
            });
            context.commit("OUT_LOGIN");
        },
        //会员安全认证
        safeUser(conText, payload) {
            // console.log(conText.state.uid);
            safeUserData({uid: conText.state.uid, auth_token: conText.state.authToken}).then(res => {
                if (res.code !== 200) {
                    conText.commit("OUT_LOGIN");
                }
                if (payload.success) {
                    payload.success(res)
                }
            });
        },
        //验证图文验证码
        checkVCode(context, payload) {
            return checkVCodeData(payload).then(res => {
                return res;
            })
        },
        //验证手机号是否被注册过
        isReged(context, payload) {
            return isCellphoneReg(payload).then(res => {
                return res;
            })
        },
        //获取会员信息
        getUserinfo(context, payload) {
            getUserinfoData(context.state.uid).then(res => {
                if (res.code === 200) {
                    context.commit("SET_USERINFO", {
                        nickname: res.data.nickname,
                        head: res.data.head,
                        points: res.data.points
                    })
                    if (payload && payload.success) {
                        payload.success(res);
                    }
                }
            })
        },

        //上传头像
        uploadHead(context, payload) {
            uploadHeadData({...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        // 修改用户信息
        updateUserInfo(context, payload) {
            updateUserInfoData({uid: context.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //更改绑定手机
        modUserCellphone(context, payload) {
            modUserCellphoneData({uid: context.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //修改用户密码
        modUserPassword(context, payload) {
            modUserPasswordData({uid: context.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //我的收藏
        getFavs(context, payload) {
            getFavsData({uid: context.state.uid, ...payload}).then(res => {
                let pageNum = 0;
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    context.commit("GET_FAVS", {favs: res.data})
                } else {
                    context.commit("GET_FAVS", {favs: []})
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },
        getFavsPage(context, payload) {
            getFavsData({uid: context.state.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    context.commit("GET_FAVS_PAGE", {favs: res.data})
                }
            })
        },

        //添加收藏
        addFavs(context, payload) {
            addFavsData({uid: context.state.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            })
        },

        //删除收藏
        delFavs(context, payload) {
            delFavsData({uid: context.state.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    context.commit("DEL_FAVS", {index: payload.index});
                }
                if (payload.success) {
                    payload.success(res);
                }
            })
        }
    }
}