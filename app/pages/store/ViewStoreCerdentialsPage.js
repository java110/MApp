import React, { Component } from 'react';

import { View, Text, Image, Platform, ScrollView } from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import CommonStyles from "../../styles/CommonStyles";

import {
    NoActionHeaderView,
    ViewImageView,
    RowRightHasTextView
} from 'Java110'
import StoreStyles from '../../styles/store/StoreStyles';
/**
 * 展示营业执照
 * 
 * add by wuxw 2018-10-24
 */
export default class ViewStoreCerdentialsPage extends Component {

    constructor(props) {
        super(props);
        let { pageTitle, storeInfo, credentialsCd } = this.props.navigation.state.params;
        let tmpStoreCerdentials = this._getStoreCerdentialsOfStoreInfo(credentialsCd, storeInfo);
        this.state = {
            currentPageName: pageTitle,
            imageModelShow: false,
            storeInfo: storeInfo,
            credentialsCd: credentialsCd,
            storeCerdentials: tmpStoreCerdentials,
        };

        this._onBackPage = this._onBackPage.bind(this);
        this._getStoreCerdentialsOfStoreInfo = this._getStoreCerdentialsOfStoreInfo.bind(this);

    }


    /**
     * 页面渲染
     */
    render() {

        return (
            <View style={[StoreStyles.container, StoreStyles.body]}>
                {
                    this._renderMain()
                }

            </View>
        );
    }

    /**
     * 主界面
     */
    _renderMain() {
        return (
            <View style={StoreStyles.container}>
                {this._renderHeader()}
                {
                    this.state.storeCerdentials != null ?
                        this._renderCerdentialsMain()
                        : null
                }
            </View>
        );
    }

    _renderCerdentialsMain() {
        return (
            <ScrollView>
                {this._renderViewImage()}
                {this._renderCerdentialsInfo()}
            </ScrollView>
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
     * 加载照片组件
     */
    _renderViewImage() {

        let tmpStoreCerdentials = this.state.storeCerdentials;
        let photoData = [];

        let positivePhoto = tmpStoreCerdentials.positivePhoto;
        let negativePhoto = tmpStoreCerdentials.negativePhoto;
        if (positivePhoto != null || positivePhoto != '') {
            photoData.push({ uri: positivePhoto, id: tmpStoreCerdentials.storeCerdentialsId });
        }
        if (negativePhoto != null || negativePhoto != '') {
            photoData.push({ uri: negativePhoto, id: tmpStoreCerdentials.storeCerdentialsId + '1' });
        }


        return (
            <View style={StoreStyles.uploadImageView}>
                {
                    photoData.length > 0 ?
                        <ViewImageView
                            imageModelShow={this.state.imageModelShow}
                            currentPhotoDatas={photoData}
                            photoDesc={this.state.currentPageName + "照片展示区"}
                        />
                        : null
                }
            </View>
        );
    }

    /**
     * 根据证件类型查询证件信息
     * @param {证件类型} key 
     */
    _getStoreCerdentialsOfStoreInfo(key, storeInfo) {
        let tmpStoreCerdentials = storeInfo.storeCerdentials;


        for (let tmpStoreCerdentialsIndex = 0; tmpStoreCerdentialsIndex < tmpStoreCerdentials.length; tmpStoreCerdentialsIndex++) {
            if (tmpStoreCerdentials[tmpStoreCerdentialsIndex].credentialsCd == key) {
                return tmpStoreCerdentials[tmpStoreCerdentialsIndex];
            }
        }
        return null;
    }

    /**
   * 证件 信息展示
   */
    _renderCerdentialsInfo() {
        return (
            <View style={StoreStyles.businessLicenceView}>
                {
                    this.state.storeCerdentials.value != null && this.state.storeCerdentials.value != '' ?
                        <RowRightHasTextView
                            leftText="注册号"
                            rightText={this.state.storeCerdentials.value}
                            _onClick={() => {}}
                            style={StoreStyles.storeItemRow}
                        />
                        : null
                }
                {
                    this.state.storeCerdentials.validityPeriod != null && this.state.storeCerdentials.validityPeriod != '' ?
                        <RowRightHasTextView
                            leftText="有效期"
                            rightText={this.state.storeCerdentials.validityPeriod}
                            _onClick={() => {}}
                            style={StoreStyles.storeItemRow}
                        />
                        : null
                }
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