import React,{Component} from 'react';

import {View,Image,Text, TouchableOpacity,Platform} from 'react-native';
import NoActionHeaderView from "../../../components/header/NoActionHeaderView";
import SettingsStyles from "../../styles/settings/SettingsStyles";
import CommonStyles from "../../styles/CommonStyles";
import NoIconMenuListView from "../../../components/listview/NoIconMenuListView";
import {observer} from "mobx-react";
import settingsMobx from '../../mobx/settings/SettingsMobx';
import ExitLoginButtonView from "../../../components/button/ExitLoginButtonView";

/**
 * 设置页面
 *
 * add by wuxw 2018-09-12
 */
@observer
export default class SettingsPage extends Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._onBackPage = this._onBackPage.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onExitLogin = this._onExitLogin.bind(this);
      }

    /**
     * 渲染页面
     */
    render(){

        return (
            <View style={SettingsStyles.container}>
                {this.renderHeader()}
                {this.renderListView()}
                {this.renderExitLoginCatalog()}
            </View>
        );
      }


    /**
     * 头部信息
     *
     * add by wuxw 2018-09-12
     * @returns {XML}
     */
    renderHeader(){
        return(
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?CommonStyles.header:CommonStyles.header_android_low}>
                <NoActionHeaderView
                    _onBackPage= {this._onBackPage}
                    backPageName="我的"
                    currentPageName = "设置中心"
                />
            </View>
        );
    }

    /**
     * list 数据
     */
    renderListView(){
        return(

            <View style={SettingsStyles.listView}>

                <NoIconMenuListView
                    data={settingsMobx.settingsData.slice()}
                    _onPress={this._onPress}
                >
                </NoIconMenuListView>

            </View>
        );
    }

    /**
     * 退出登录目录
     * @returns {XML}
     * @private
     */
    renderExitLoginCatalog(){
        return (
            <View style={{marginTop:12,flex:1}}>
                <ExitLoginButtonView
                    _onExitLogin = {this._onExitLogin}
                ></ExitLoginButtonView>
            </View>
        );
    }

    /**
     * 退出登录
     * @private
     */
    _onExitLogin(){
        //这里应该清除路由信息
        this.props.navigation.navigate("Home",{});
    }

    /**
     * 返回实现函数
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();

    }

    /**
     * 点击实现函数
     * @private
     */
    _onPress(page,param){
        this.props.navigation.navigate(page,param);
    }

}