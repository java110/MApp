import { observable, action } from 'mobx';

import { Alert } from 'react-native';

import AsyncStorageUtils from '../../Utils/AsynStorageUtils';
import CommonConst from '../../constants/CommonConst';

/**
 * 登录 处理类
 * 
 * add by wuxw 2018-10-29
 */
class LoginMobx {


    // 构造
    constructor() {

    }


    //从手机中获取token 去服务端鉴权，如果鉴权成功免登录
    login(callbackFunction) {
        //首先从本地加载数据
        AsyncStorageUtils._get(CommonConst.LOGIN_TOKEN_KEY, (error, result) => {
            if (error) {
                return new Promise(function (resolve, reject) {
                    reject('读取[' + CommunityConst.SAVE_SHOP_COMMUNITY_RELATION_KEY + ']数据失败' + error);
                });
            }
        }).then((result) => {
            console.log('refreshStoreEnterCommunity result', result);
            if (result != null) {
                //调用后端鉴权
                callbackFunction(CommonConst.LOGIN_TOKEN_OK);
                return;
            }

            callbackFunction(CommonConst.LOGIN_TOKEN_FAIL);
        }).catch((error) => {
            console.log('login', error);
            callbackFunction(CommonConst.LOGIN_TOKEN_FAIL);
        });
        //异步请求服务器加载数据
    }
}

loginMobx = new LoginMobx();

export default loginMobx