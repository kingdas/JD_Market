import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

//会员登录
export function loginData(data) {
    return request(config.baseApi + "/home/user/pwdlogin?token=" + config.token, "post", data)
}

//会员注册
export function userRegData(data) {
    return request(config.baseApi + "/home/user/reg?token=" + config.token, "post", data);
}

//会员安全认证
export function safeUserData(data) {
    return request(config.baseApi + "/home/user/safe?token=" + config.token, "post", data)
}

//安全退出
export function safeOutLoginData(data) {
    return request(config.baseApi + "/home/user/safeout?token=" + config.token, "post", data)
}

//验证图文验证码
export function checkVCodeData(data) {
    return request(config.baseApi + "/home/user/checkvcode?token=" + config.token, "post", data);
}

//验证手机号是否被注册过
export function isCellphoneReg(data) {
    return request(config.baseApi + "/home/user/isreg?token=" + config.token, "post", data);
}

//获取会员信息
export function getUserinfoData(uid) {
    return request(config.baseApi + "/user/myinfo/userinfo/uid/" + uid + "?token=" + config.token);
}

//上传头像
export function uploadHeadData(data) {
    return request(config.baseApi + "/user/myinfo/formdatahead?token=" + config.token, "file", data);
}

//修改会员信息
export function updateUserInfoData(data) {
    return request(config.baseApi + "/user/myinfo/updateuser?token=" + config.token, "post", data);
}

//修改绑定手机
export function modUserCellphoneData(data) {
    return request(config.baseApi + "/user/myinfo/updatecellphone?token=" + config.token, "post", data);
}

//修改密码
export function modUserPasswordData(data) {
    return request(config.baseApi + "/user/myinfo/modpwd?token=" + config.token, "post", data);
}

//加入收藏
export function addFavsData(data) {
    return request(config.baseApi + "/goods/fav?uid=" + data.uid + "&gid=" + data.gid + "&token=" + config.token);
}

//收藏列表
export function getFavsData(data) {
    return request(config.baseApi + "/user/fav/index?uid=" + data.uid + "&page=" + data.page + "&token=" + config.token)
}

//删除收藏
export function delFavsData(data) {
    return request(config.baseApi + "/user/fav/del?uid=" + data.uid + "&fid=" + data.fid + "&token=" + config.token);
}