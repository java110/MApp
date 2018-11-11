import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity,Alert } from 'react-native';
import { Button } from "teaset";
import CommonConst from '../../constants/CommonConst';
import logStyles from '../../styles/logStyle/logStyles';
import UserConst from '../../constants/UserConst';
import loginMobx from '../../mobx/login/LoginMobx';
export default class MessageLoginPage extends Component{

 constructor(props){
     super(props);
     this.state = {
        loginType: CommonConst.LOGIN_TYPE_IDENTIFYING_CODE,
        userPhone:"",
        userPasswd:"",
        loginMsg:"",
        userMessageCode: "",
        sendMessageTitle: "获取验证码",
        reUserPasswd: "",
        userType:UserConst.USER_TYPE_STORE,
        isSendMessageCode: false,
     };
     this.loginCallBack = this.loginCallBack.bind(this);
 }
render(){
    return(
        <View style={logStyles.container}>
           {this._messageHeader()}
           {this._messageContext()}

        </View>
    );
}

/**
     * 头信息
     */
_messageHeader(){
    return (
        <View style={logStyles.headerView}>
            <Image 
            source={require('../../images/logo.png')} 
            style={logStyles.headerViewImage}
            />
            <Text style={logStyles.headerViewText}>Home community</Text>
        </View>
    )
}


_messageContext(){
    return(
    <View style={logStyles.contextView}>
        {this._messageLoginfo()}
        {this._renderOtherLoginWay()}
    </View>
    )
}

_messageLoginfo(){
    return(
        <View style={logStyles.loginView}>
        {this.state.loginType == CommonConst.LOGIN_TYPE_IDENTIFYING_CODE ? this._rendermessageWordView() : null}
       </View>
    )

}

_rendermessageWordView(){
    return (
        <View>
            <View style={logStyles.loginRowView}>
                <Text style={logStyles.rowViewText}>手机号</Text>
                <TextInput underlineColorAndroid="transparent" 
                           style={logStyles.rowViewTextInput}
                           placeholder="请输入手机号码"
                           onChangeText={(value) => {this.setState(userPhone={userPhone:value})}}
                           value={this.state.userPhone}
                           ref="keyWordInput"
                           key="numeric"
                           onSubmitEditing={() => {this.refs.keyWordInput.blur()}}>
                </TextInput>
            </View>
            <View style={[logStyles.registerRowView, { justifyContent: 'space-between' }]}>
                    <View style={logStyles.registerRowMessageCodeView}>
                    <Text style={logStyles.rowViewText}>验证码</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder={"必填，请输入验证码"}
                            style={logStyles.rowViewTextInput}
                            onChangeText={(value) => { this.setState({ userMessageCode: value }) }}
                            value={this.state.userMessageCode}
                            ref="keyWordInput"
                            keyboardType='numeric'
                            onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                        </TextInput>
                    </View>
                    <Button
                        type="default"
                        size="sm"
                        titleStyle={{ color: '#FFF', fontSize: 12 }}
                        style={{ backgroundColor: '#F24E3E', borderColor: '#F24E3E' ,marginRight: 50}}
                        title={this.state.sendMessageTitle}
                        disabled={this.state.isSendMessageCode}
                        onPress={() => { this._sendMessageCode() }}
                    />

                </View>

                <TouchableOpacity style={logStyles.loginButtonView}
                    onPress={() => { loginMobx.loginIn(this.state.userPhone,this.state.userPasswd,this.loginCallBack);}}>
                    <Text style={logStyles.loginButtonText}>登录</Text>
                </TouchableOpacity>

                <View>
                    <Text>{this.state.loginMsg}</Text>
                </View>
                <TouchableOpacity style={logStyles.loginButtonWechatView}
                    onPress={() => { this.props.navigation.navigate('Register',{})}}>
                    <Text style={logStyles.loginButtonWechatText}>还没有账户，请注册</Text>
                </TouchableOpacity>
        </View>
    );





}

/**
     * 登录回调
     * @param {登录标志} ifOky 
     */
    loginCallBack(ifOky,msg = '成功') {
        if(ifOky == CommonConst.LOGIN_TOKEN_OK){
            this.props.navigation.navigate('Home', {});
            return;
        }
        this.setState({
            loginMsg:msg,
        })
    }
 /**
     * 发送验证码
     */
    _sendMessageCode() {

        if (this.state.userPhone == '') {
            Alert.alert("提示", "请输入手机号");
            return;
        }

        //将发送按钮改为true
        if (this.state.isSendMessageCode) {
            return;
        }
        this.setState({
            isSendMessageCode: true,
        });

        loginMobx.sendMessageCode(this.state.userPhone);

        let times = 60;
        this.timer = setInterval(() => {
            times--;
            let tmpSendMessageTitle = times + " 秒后再试";
            let tmpIsSendMessageCode = true;
            if (times < 1 && this.timer) {
                clearInterval(this.timer);
                tmpSendMessageTitle = "获取验证码";
                tmpIsSendMessageCode = false;
                this.setState({
                    isSendMessageCode: tmpIsSendMessageCode
                })
            }
            this.setState({
                sendMessageTitle: tmpSendMessageTitle
            });
        }, 1000)
    }


/**
     * 其他登录方式
     */
    _renderOtherLoginWay() {
        return (
            <View style={logStyles.otherLoginView}>
                <View style={logStyles.otherLoginTextView}>
                    <View style={logStyles.otherLoginLine}></View>
                    <Text style={logStyles.otherLoginText}>其他登录</Text>
                    <View style={logStyles.otherLoginLine}></View>
                </View>
                <View style={logStyles.otherLoginImageView}>
                    <TouchableOpacity
                        onPress={() => { }}
                        activeOpacity={0.5}
                        style={logStyles.otherLoginImagePress}
                    >
                        <Image
                            source={require('../../images/wechatLogin.png')}
                            style={logStyles.otherLoginImage}
                        />
                    </TouchableOpacity>
                    <View style={logStyles.otherLoginImageSpace}></View>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('Login',{}) }}
                        activeOpacity={0.5}
                        style={logStyles.otherLoginImagePress}
                    >
                        <Image
                            source={require('../../images/Messagepass.png')}
                            style={logStyles.otherLoginImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}