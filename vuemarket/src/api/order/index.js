import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

// 提交订单
export function addOrderData(params) {
    return request(config.baseApi + "/order/add?token=" + config.token, "post", params);
}

//获取订单编号
export function getOrderNumData(uid) {
    return request(config.baseApi + "/order/lastordernum?uid=" + uid + "&token=" + config.token);
}

//获取订单
export function getOrderData(params) {
    return request(config.baseApi + "/user/myorder/index?uid=" + params.uid + "&status=" + params.status + "&token=" + config.token + "&page=" + params.page);
}

//取消订单
export function cancelOrderData(params) {
    return request(config.baseApi + "/user/myorder/clearorder?uid=" + params.uid + "&ordernum=" + params.ordernum + "&token=" + config.token);
}

//确认订单
export function sureOrderData(params) {
    return request(config.baseApi + "/user/myorder/finalorder?uid=" + params.uid + "&ordernum=" + params.ordernum + "&token=" + config.token);
}

//订单详情
export function getOrderDetailsData(params) {
    return request(config.baseApi + "/user/myorder/desc?uid=" + params.uid + "&ordernum=" + params.ordernum + "&token=" + config.token);
}

//评价列表
export function getReviewOrdersData(params) {
    return request(config.baseApi + "/user/myorder/reviewOrder?uid=" + params.uid + "&token=" + config.token + "&page=" + params.page);
}

//获取评价项目选项
export function getReviewItemsData() {
    return request(config.baseApi + "/home/reviews/service?token=" + config.token);
}

//提交评价
export function addReviewsData(params) {
    return request(config.baseApi + "/home/reviews/add?token=" + config.token, "post", params);
}