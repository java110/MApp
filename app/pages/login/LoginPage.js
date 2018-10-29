import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import CommonConst from '../../constants/CommonConst';


/**
 * 登录页面
 */
export default class LoginPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loginType: CommonConst.LOGIN_TYPE_PASSWORD
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                {this._renderContext()}
            </View>
        );
    }

    /**
     * 头信息
     */
    _renderHeader() {

        return (
            <View style={styles.headerView}>
                <Image
                    source={require('../../images/logo.png')}
                    style={styles.headerViewImage}
                />
                <Text style={styles.headerViewText}>Home community</Text>
            </View>
        );
    }

    _renderContext() {
        return (
            <View style={styles.contextView}>
                {this._renderLoginInfo()}
            </View>
        );
    }

    _renderLoginInfo() {
        return (
            <View style={styles.loginView}>
                {this.state.loginType == CommonConst.LOGIN_TYPE_PASSWORD ? this._renderLoginPassWordView() : null}
            </View>
        );
    }

    _renderLoginPassWordView() {
        return (
            <View>
                <View style={styles.loginRowView}>
                    <Text style={styles.rowViewText}>账号</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={"请输入手机号码"}
                        style={styles.rowViewTextInput}
                        onChangeText={() => { }}
                        value={""}
                        ref="keyWordInput"
                        keyboardType='numeric'
                        onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                </View>
                <View style={styles.loginRowView}>
                    <Text style={styles.rowViewText}>密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={"请输入密码"}
                        style={styles.rowViewTextInput}
                        onChangeText={() => { }}
                        secureTextEntry={true}
                        value={""}
                        ref="keyWordInput"
                        onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                </View>

                <TouchableOpacity style={styles.loginButtonView}
                    onPress={() => { }}>
                    <Text style={styles.loginButtonText}>登录</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButtonWechatView}
                    onPress={() => { }}>
                    <Text style={styles.loginButtonWechatText}>还没有账户，注册</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const holdScreenWidth = Dimensions.get('window').width;
const holdScreenHeight = Dimensions.get('window').height;
const loginViewWidth = holdScreenWidth - 40;
const headerHeight = holdScreenHeight * 0.30;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
    },
    headerView: {
        backgroundColor: '#F24E3E',
        height: headerHeight,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerViewImage: {
        height: 90,
        width: 90,
    },
    headerViewText: {
        fontSize: 18,
        marginTop: -5,
        color: '#FFF',
        marginBottom: 20,
    },
    contextView: {
        alignItems: 'center',
    },
    loginView: {
        width: loginViewWidth,
        marginTop: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        //paddingBottom:20,
        paddingTop: 10,
        borderColor: '#CBCBCB',
        borderWidth: 1,
    },
    loginRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        marginTop: 10,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1.5,
    },
    rowViewText: {
        color: '#333',
        fontSize: 18,
    },
    rowViewTextInput: {
        marginLeft: 10,
        width: 200,
    },
    loginButtonView: {
        marginTop:30,
        backgroundColor: '#F24E3E',
        height: 45,
        //width:screenWidth,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText:{
        fontSize:18,color:'#FFF'
    },
    loginButtonWechatView:{
        //marginTop:10,
        //backgroundColor: '#CBCBCB',
        height: 45,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center'
    },
    loginButtonWechatText:{
        fontSize:14,color:'#777'
    },
});