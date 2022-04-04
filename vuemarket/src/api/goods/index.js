import config from "../../assets/js/conf/config"
import {request} from "../../assets/js/utils/request";

export function getClassifyData() {
    return request(config.baseApi + "/home/category/menu?token=" + config.token);

}

export function getGoodsItemData(cid = "") {
    return request(config.baseApi + "/home/category/show?cid=" + cid + "&token=" + config.token);
}

export function getGoodsDetailsData(gid = "") {
    return request(config.baseApi + "/home/goods/info?gid=" + gid + "&type=details&token=" + config.token);
}

export function getGoodsDetailsAttrsData(gid = "") {
    return request(config.baseApi + "/home/goods/info?gid=" + gid + "&type=spec&token=" + config.token);
}