import Vue from "vue";
import {getGoodsReviewsData} from "../../../api/goods/reviews";

export default {
    namespaced: true,
    state: {
        reviews: [],
        total: 0
    },
    mutations: {
        ['SET_REVIEWS'](state, payload) {
            state.reviews = payload.reviews;
            state.total = payload.total;
        },
        ['SET_REVIEWS_PAGE'](state, payload) {
            state.reviews.push(...payload.reviews);
        }
    },
    actions: {
        getGoodsReviews(context, payload) {
            getGoodsReviewsData(payload.gid).then(res => {
                let pageNum = 0;
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    context.commit('SET_REVIEWS', {reviews: res.data, total: res.pageinfo.total})
                } else {
                    context.commit('SET_REVIEWS', {reviews: [], total: 0})
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },

        getGoodsReviewsPage(context, payload) {
            getGoodsReviewsData(payload.gid,payload.page).then(res => {
                if (res.code === 200) {
                    context.commit('SET_REVIEWS_PAGE', {reviews: res.data})
                }
            })
        }
    }
}