import React,{Component} from 'react';

import {View,Image,Text, TouchableOpacity,Platform} from 'react-native';
import SettingsPrinterStyles from "../../styles/settings/SettingsPrinterStyles";
import CommonStyles from "../../styles/CommonStyles";
import NoActionHeaderView from "../../../components/header/NoActionHeaderView";


/**
 * 打印机设置
 *
 * add by wuxw 2018-09-13
 */
export default class SettingPrinterPage extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._onBackPage= this._onBackPage.bind(this);
      }

    /**
     * 渲染页面
     */
    render(){
        return(
            <View style={SettingsPrinterStyles.container}>
                {this.renderHeader()}
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
                    backPageName="返回"
                    currentPageName = "打印设置"
                />
            </View>
        );
    }

    /**
     * 返回实现函数
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();

    }
}