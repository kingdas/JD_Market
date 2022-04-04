import Vue from 'vue'
import Vuex from 'vuex';
import user from "./modules/user";
import index from "./modules/index";
import classify from "./modules/classify";
import goods from "./modules/goods";
import reviews from "./modules/classify/reviews";
import cart from "./modules/cart";
import address from "./modules/address";
import order from "./modules/order";

Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {
        user,
        index,
        classify,
        goods,
        reviews,
        cart,
        address,
        order
    }
});

export default store;