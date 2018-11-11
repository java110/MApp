import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import CommonConst from '../../constants/CommonConst';
import logStyles from '../../styles/logStyle/logStyles';


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
     };
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
                        <Image
                            source={require('../../images/userMessageCode.png')}
                            style={logStyles.rowViewLeftImage}
                        />
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
                        style={{ backgroundColor: '#F24E3E', borderColor: '#F24E3E' }}
                        title={this.state.sendMessageTitle}
                        disabled={this.state.isSendMessageCode}
                        onPress={() => { this._sendMessageCode() }}
                    />

                </View>

        </View>
    );





}





}