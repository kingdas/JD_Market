import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

export function getHotKeywordsData() {
    return request(config.baseApi + "/home/public/hotwords?token=" + config.token);
}

export function getSearchData(searchParam) {
    let kwords = searchParam.kwords ? searchParam.kwords : "";
    let param = searchParam.param && searchParam.param !== "[]" ? searchParam.param : "";
    let page = searchParam.page ? searchParam.page : "1";
    let price1 = searchParam.price1 ? searchParam.price1 : "";
    let price2 = searchParam.price2 ? searchParam.price2 : "";
    let otype = searchParam.otype ? searchParam.otype : "all";
    let cid = searchParam.cid ? searchParam.cid : "";

    // console.log(config.baseApi + "/home/goods/search?" +
    //     "kwords=" + kwords + "&param=" + param + "&page=" + page +
    //     "&price1=" + price1 + "&price2=" + price2 + "&otype=" + otype + "&cid=" + cid + "&token=" + config.token)

    return request(config.baseApi + "/home/goods/search?" +
        "kwords=" + kwords + "&param=" + param + "&page=" + page +
        "&price1=" + price1 + "&price2=" + price2 + "&otype=" + otype + "&cid=" + cid + "&token=" + config.token);
}

export function getGoodsAttrsData(kwords = ""){
    return request(config.baseApi+"/home/goods/param?kwords="+kwords+"&token="+config.token);
}