import { observable, action } from 'mobx';

import { Alert } from 'react-native';

import AsyncStorageUtils from '../../Utils/AsynStorageUtils';
import CommonConst from '../../constants/CommonConst';
import CodeConst from '../../constants/CodeConst';

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
    @action
    login(callbackFunction) {
        console.log('login');
        //首先从本地加载数据
        AsyncStorageUtils._get(CommonConst.LOGIN_TOKEN_KEY, (error, result) => {
            console.log('login',result);
            if (error) {
                return new Promise(function (resolve, reject) {
                    reject('读取[' + CommunityConst.LOGIN_TOKEN_KEY + ']数据失败' + error);
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

    /**
     * 用户登录
     * @param {用户号码} userPhoto 
     * @param {用户密码} userPasswd 
     */
    @action
    loginIn(userPhoto, userPasswd, callbackFunction) {
        let resultInfo = {
        };
        //如果不是开发环境，调后端服务登录
        if (CommonConst.SYSTEM_ENVIRONMENTS_DEV != CommonConst.SYSTEM_ENVIRONMENTS) {

        }
        //如果是开发环境就写个固定值
        if (CommonConst.SYSTEM_ENVIRONMENTS_DEV == CommonConst.SYSTEM_ENVIRONMENTS) {
            resultInfo = {
                code: CodeConst.CODER_0000,
                msg: '成功',
                token: "123123123213",
            }
        }


        if (resultInfo.code == CodeConst.CODER_0000) {
            AsyncStorageUtils._save(CommonConst.LOGIN_TOKEN_KEY, resultInfo.token, (error) => {
                if (error) {
                    console.log("存值失败", error);
                    callbackFunction(CommonConst.LOGIN_TOKEN_FAIL,"登录失败："+error);
                } else {
                    console.log('存值成功!');
                    //这里调用后端发起保存数据
                    callbackFunction(CommonConst.LOGIN_TOKEN_OK);
                }
            }).catch((error) => {
                console.log('login', error);
                callbackFunction(CommonConst.LOGIN_TOKEN_FAIL,"登录失败："+error);
            });

            return;
        }

        callbackFunction(CommonConst.LOGIN_TOKEN_FAIL,"登录失败");

    }

    /**
     * 注册
     * @param {数据封装对象} tmpState 
     * @param {回调方法} callbackFunction 
     */
    @action
    registerIn(tmpState,callbackFunction){

    }
    /**
     * 点击后台发送验证码
     */
    @action
    sendMessageCode(userPhoto){

    }
}

loginMobx = new LoginMobx();

export default loginMobx