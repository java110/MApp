import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import WelcomeStyles from '../styles/WelcomeStyles'
import CommonConst from '../constants/CommonConst';
import loginMobx from '../mobx/login/LoginMobx';


/***
 * 欢迎页面
 * 这里可以显示广告
 * state
 * props
 *
 */

export default class WelcomePage extends Component {

    constructor() {
        super();
        this.ifLoginFlag = CommonConst.LOGIN_TOKEN_TIMEOUT;
        this.state = {
            canClickEnter: false,
        }
    }
    render() {
        let wel = this.state.canClickEnter ? <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home', {}) }} activeOpacity={1}>
            <Image style={WelcomeStyles.backImage} source={require("../images/welcome.png")}></Image>
        </TouchableOpacity>
            : <Image style={WelcomeStyles.backImage} source={require("../images/welcome.png")}></Image>;
        return (
            wel
        );
    }

    componentDidMount() {
        loginMobx.login(this.loginCallBack);
        this.timer = setTimeout(() => {
            let nextPage =
                (this.ifLoginFlag == CommonConst.LOGIN_TOKEN_TIMEOUT || this.ifLoginFlag == CommonConst.LOGIN_TOKEN_FAIL)
                    ? 'Login' : 'Home';
            this.props.navigation.navigate(nextPage, {});
            this.timer && clearTimeout(this.timer);
        }, 3000)
    }

    /**
     * 登录回调
     * @param {登录标志} ifOky 
     */
    loginCallBack(ifOky) {
        this.ifLoginFlag = ifOky;
    }

    componentWillUnmount() {
        //this.timer && clearTimeout(this.timer);
    }
}
