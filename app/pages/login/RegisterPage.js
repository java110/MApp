import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import CommonConst from '../../constants/CommonConst';
import loginMobx from '../../mobx/login/LoginMobx';
import CommonStyles from "../../styles/CommonStyles";
import { Button,Checkbox } from "teaset";
import {
    NoActionHeaderView
} from "Java110";
import UserConst from '../../constants/UserConst';
/**
 * 注册页面
 * add by wuxw 2018-11-11
 */
export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sendMessageTitle: "获取验证码",
            isSendMessageCode: false,
            userName: "",
            userPhone: "",
            userMessageCode: "",
            userPasswd: "",
            loginMsg: "",
            reUserPasswd: "",
            userType:UserConst.USER_TYPE_STORE,
        };

        this._onBackPage = this._onBackPage.bind(this);
        this._sendMessageCode = this._sendMessageCode.bind(this);
    }

    /**
     * 页面刷新
     */
    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this._renderContext()}
            </View>
        );
    }
    /**
     * 头部信息
     * @returns {XML}
     * @private
     */
    _renderHeader() {
        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS === 'ios') ? CommonStyles.header : CommonStyles.header_android_low}>
                <NoActionHeaderView
                    currentPageName={"请注册"}
                    backPageName={"登录"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 注册信息
     */
    _renderContext() {
        return (
            <View style={styles.registerView}>
                <View style={styles.registerRowView}>

                    <Image
                        source={require('../../images/userName.png')}
                        style={styles.rowViewLeftImage}
                    />
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={"必填，请输入您的名称"}
                        style={styles.rowViewTextInput}
                        onChangeText={(value) => { this.setState({ userName: value }) }}
                        value={this.state.userName}
                        ref="keyWordInput"
                        keyboardType='numeric'
                        onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                </View>

                <View style={styles.registerRowView}>
                    <Image
                        source={require('../../images/userPhone.png')}
                        style={styles.rowViewLeftImage}
                    />
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={"必填，请输入手机号码"}
                        style={styles.rowViewTextInput}
                        onChangeText={(value) => { this.setState({ userPhone: value }) }}
                        value={this.state.userPhone}
                        ref="keyWordInput"
                        keyboardType='numeric'
                        onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                </View>

                <View style={[styles.registerRowView, { justifyContent: 'space-between' }]}>
                    <View style={styles.registerRowMessageCodeView}>
                        <Image
                            source={require('../../images/userMessageCode.png')}
                            style={styles.rowViewLeftImage}
                        />
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder={"必填，请输入验证码"}
                            style={styles.rowViewTextInput}
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
                        style={{ backgroundColor: '#F24E3E', borderColor: '#F24E3E' }}
                        title={this.state.sendMessageTitle}
                        disabled={this.state.isSendMessageCode}
                        onPress={() => { this._sendMessageCode() }}
                    />

                </View>

                <View style={styles.registerRowView}>
                    <Image
                        source={require('../../images/userPasswd.png')}
                        style={styles.rowViewLeftImage}
                    />
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={"必填，请输入密码"}
                        style={styles.rowViewTextInput}
                        onChangeText={(value) => { this.setState({ userPasswd: value }) }}
                        secureTextEntry={true}
                        value={this.userPasswd}
                        ref="keyWordInput"
                        onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                </View>

                <View style={styles.registerRowView}>
                    <Image
                        source={require('../../images/userPasswd.png')}
                        style={styles.rowViewLeftImage}
                    />
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={"必填，请确保两次密码一致"}
                        style={styles.rowViewTextInput}
                        onChangeText={(value) => { this.setState({ reUserPasswd: value }) }}
                        secureTextEntry={true}
                        value={this.reUserPasswd}
                        ref="keyWordInput"
                        onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                </View>

                <View style={styles.registerCheckboxRowView}>
                    <Checkbox
                        title='我是商家'
                        titleStyle={{ color: '#333', paddingLeft: 4,fontSize:14}}
                        checked={this.state.userType == UserConst.USER_TYPE_STORE?true:false}
                        onChange={checked => this.setState({  userType: UserConst.USER_TYPE_STORE })}
                    />
                    <Checkbox
                        title='我是物业'
                        titleStyle={{ color: '#333', paddingLeft: 4 }}
                        checked={this.state.userType == UserConst.USER_TYPE_PROPERTY?true:false}
                        onChange={checked => this.setState({ userType: UserConst.USER_TYPE_PROPERTY })}
                    />
                    <Checkbox
                        title='我是代理商'
                        titleStyle={{ color: '#333', paddingLeft: 4 }}
                        checked={this.state.userType == UserConst.USER_TYPE_AGENT?true:false}
                        onChange={checked => this.setState({ userType: UserConst.USER_TYPE_AGENT })}
                    />
                </View>

                <TouchableOpacity style={styles.registerButtonView}
                    onPress={() => { loginMobx.registerIn(this.state, this.loginCallBack); }}>
                    <Text style={styles.registerButtonText}>注册</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    /**
         * 返回
         * @private
         */
    _onBackPage() {
        this.props.navigation.goBack();
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
}

const holdScreenWidth = Dimensions.get('window').width;
const registerViewWidth = holdScreenWidth - 40;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    registerView: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: registerViewWidth,
        height: 45,
        marginTop: 10,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1.5,
    },
    registerRowMessageCodeView: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomColor: '#F3F3F3',
        // borderBottomWidth: 1.5,
    },
    rowViewText: {
        color: '#333',
        fontSize: 18,
    },
    rowViewLeftImage: {
        marginLeft: 10,
        tintColor: '#F24E3E',
        height: 20,
        width: 20,
    },
    rowViewTextInput: {
        marginLeft: 15,
        width: 250,
    },
    registerCheckboxRowView:{
        flexDirection:'row',
        justifyContent:'space-around',
        width: registerViewWidth,
        height:60,
    },
    registerButtonView: {
        marginTop: 30,
        backgroundColor: '#F24E3E',
        height: 45,
        width: registerViewWidth,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerButtonText: {
        fontSize: 18, color: '#FFF'
    },


});