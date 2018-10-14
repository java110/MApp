import React, { Component } from 'react';

import { View, Text, Image, Platform } from 'react-native';

import CommonStyles from "../../styles/CommonStyles";
import StoreStyles from '../../styles/store/StoreStyles';
import storeMobx from '../../mobx/store/StoreMobx';

import {
    NoActionHeaderView,
    RowRightTextInputView
} from 'Java110';

/**
 * 商户地址填写页面
 * 详细地址
 * 附近标志性建筑
 * 地图选择
 */
export default class AddStoreAddressPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageName: '门店地址',
        }

        this._onBackPage = this._onBackPage.bind(this);
    }

    render() {
        return(
            <View>
                {this._renderHeader()}
                {this._renderAddressInfo()}
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
                    currentPageName={this.state.currentPageName}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 填写地址信息
     */
    _renderAddressInfo(){
        return(
            <View>
                <RowRightTextInputView
                    leftText="详细地址"
                    textPlaceholder={"请输入门店地址，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('address',value) }}
                    rightText={storeMobx.storeInfo.address}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightTextInputView
                    leftText="附近地标"
                    textPlaceholder={"请输入附近地标，选填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('nearbyLandmarks',value) }}
                    rightText={storeMobx.storeInfo.nearbyLandmarks}
                    style={StoreStyles.storeItemRow}
                />
            </View>
        );
    }


    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }

}