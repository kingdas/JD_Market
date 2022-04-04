import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    mode: "hash",//1、hash哈希：有#号。2、history历史：没有#号
    base: process.env.BASE_URL, //自动获取根目录路径
    scrollBehavior: (to, from, position) => {
        if (position) {
            return position
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./pages/home/main"),//路由懒加载解决首屏加载慢，性能优化
            meta: {keepAlive: false},
            redirect: "/index",
            children: [
                {
                    path: "index",
                    name: "index",
                    component: () => import("./pages/home/index"),
                    meta: {keepAlive: true, title: "商城"}
                },
                {
                    path: "cart",
                    name: "cart",
                    component: () => import("./pages/home/cart"),
                    meta: {keepAlive: false, title: "购物车"}
                },
                {
                    path: "my",
                    name: "my",
                    component: () => import("./pages/user/ucenter"),
                    meta: {keepAlive: false, title: "我的"}
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/home/login"),
            meta: {keepAlive: false}
        },
        {
            path: "/reg",
            name: "reg",
            component: () => import("./pages/home/reg"),
            meta: {keepAlive: false}
        },
        {
            path: "/ucenter",
            name: "ucenter",
            component: () => import("./pages/user/ucenter")
        },
        {
            path: "/order",
            name: "order",
            component: () => import("./pages/home/order"),
            meta: {auth: true, title: "我的订单"}
        },
        {
            path: "/order/end",
            name: "order-end",
            component: () => import("./pages/home/order/end"),
            meta: {auth: true, title: "下单"}
        },
        {
            path: "/address",
            name: "address",
            component: () => import("./pages/home/address"),
            meta: {auth: true, title: "选择收货地址"}
        },
        {
            path: "/address/add",
            name: "addAddress",
            component: () => import("./pages/home/address/addAddress"),
            meta: {auth: true, title: "添加收货地址"}
        },
        {
            path: "/address/mod",
            name: "modAddress",
            component: () => import("./pages/home/address/modAddress"),
            meta: {auth: true, title: "修改收货地址"}
        },
        {
            path: "/classify/classify",
            name: "classify-classify",
            component: () => import("./pages/home/goods/classify"),
            redirect: "/classify/classify/items",
            children: [
                {
                    path: "items",
                    name: "items",
                    component: () => import("./pages/home/goods/classify-item"),
                    meta: {title: "商品分类"}
                }
            ]
        },
        {
            path: "/classify/goods",
            name: "classify-goods",
            component: () => import("./pages/home/goods/search")
        },
        {
            path: "/goods/details",
            name: "details",
            component: () => import("./pages/home/goods/details"),
            redirect: "/goods/details/items",
            children: [
                {
                    path: "items",
                    name: "details-items",
                    component: () => import("./pages/home/goods/details-items")
                },
                {
                    path: "content",
                    name: "details-content",
                    component: () => import("./pages/home/goods/details-content")
                },
                {
                    path: "reviews",
                    name: "details-reviews",
                    component: () => import("./pages/home/goods/details-reviews")
                }
            ]
        },
        {
            path: "/user/order",
            name: "user-order",
            component: () => import("./pages/user/order"),
            redirect: "/user/order/list",
            meta: {auth: true},
            children: [
                {
                    path: "list",
                    name: "order-list",
                    component: () => import("./pages/user/order/list"),
                    meta: {auth: true}
                },
                {
                    path: "reviewOrders",
                    name: "review-orders",
                    component: () => import("./pages/user/order/review_orders"),
                    meta: {auth: true}
                }
            ]
        },
        {
            path: "/user/order/details",
            name: "order-details",
            component: () => import("./pages/user/order/details"),
            meta: {auth: true}
        },
        {
            path: "/user/order/addReviews",
            name: "add-reviews",
            component: () => import("./pages/user/order/add_reviews"),
            meta: {auth: true}
        },
        {
            path: "/user/profile",
            name: "user-profile",
            component: () => import("./pages/user/profile"),
            meta: {auth: true, title: "个人资料"}
        },
        {
            path: "/user/address",
            name: "user-address",
            component: () => import("./pages/user/address"),
            meta: {auth: true, title: "收货地址管理"}
        },
        {
            path: "/user/address/add",
            name: "user-address-add",
            component: () => import("./pages/user/address/add"),
            meta: {auth: true, title: "添加收货地址"}
        },
        {
            path: "/user/address/mod",
            name: "user-address-mod",
            component: () => import("./pages/user/address/mod"),
            meta: {auth: true, title: "修改收货地址"}
        },
        {
            path: "/user/modCellphone",
            name: "modUserCellphone",
            component: () => import("./pages/user/modCellphone"),
            meta: {auth: true, title: "修改手机号"}
        },
        {
            path: "/user/modPassword",
            name: "modUserPassword",
            component: () => import("./pages/user/modPassword"),
            meta: {auth: true, title: "修改用户密码"}
        },
        {
            path: "/user/favs",
            name: "userFavs",
            component: () => import("./pages/user/favs"),
            meta: {auth: true, title: "我的收藏"}
        },
        {
            path: "/skip",
            name: "skip",
            component: () => import("./pages/skip")
        },
        {
            path: "/test",
            name: "test",
            component: () => import("./pages/home/test")
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        if (Boolean(localStorage['isLogin'])) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});
export default router;