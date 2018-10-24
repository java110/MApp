import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import StoreStyles from '../../styles/store/StoreStyles';
import CommonStyles from "../../styles/CommonStyles";

import {
    NoActionHeaderView,
    RowRightHasTextView,
} from 'Java110';
import StoreConst from '../../constants/StoreConst';
/**
 * 商户信息 页面
 * 
 * add by wuxw 2018-10-10
 */
export default class ViewStorePage extends Component {


    constructor(props) {
        super(props);
        let { storeId } = this.props.navigation.state.params;
        this.state = {
            storeId: storeId
        };
        this._initStoreAudit();
        this._onBackPage = this._onBackPage.bind(this);
        this._getStoreAttrShowText = this._getStoreAttrShowText.bind(this);
        this._getStoreAttrSelectDayShowText = this._getStoreAttrSelectDayShowText.bind(this);
        this._getStoreAttrSelectHourShowText = this._getStoreAttrSelectHourShowText.bind(this);
    }

    _initStoreAudit() {
        //刷新审核数据
        storeMobx.refreshAuditStoreInfos();
    }

    /**
     * 渲染页面
     */
    render() {
        return (
            <View style={[StoreStyles.container, StoreStyles.body]}>
                {this._renderHeader()}
                {this._renderStoreInfo()}
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
                    currentPageName={"商店信息"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }


    /**
     * 商户信息
     * 
     */
    _renderStoreInfo() {
        return (
            <View style={StoreStyles.storeView}>
                <ScrollView>
                    {this._renderStoreBaseInfo()}
                    {this._renderStoreCerdentialsInfo()}
                    {this._renderStoreOthersInfo()}
                    {this._renderSpace()}
                </ScrollView>
            </View>
        );
    }

    componentWillMount() {

        //加载数据
        let tempStoreInfos = storeMobx.auditStoreInfos.slice();
        //let currentStoreInfo = {};
        for (let tempStoreInfosIndex = 0; tempStoreInfosIndex < tempStoreInfos.length; tempStoreInfosIndex++) {
            if (tempStoreInfos[tempStoreInfosIndex].storeId == this.state.storeId) {
                this.setState({
                    storeInfo: tempStoreInfos[tempStoreInfosIndex],
                });
                break;
            }
        }
    }

    /**
     * 商户基本信息
     * 
     * 
     */
    _renderStoreBaseInfo() {

        return (
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>基本信息</Text>
                </View>

                <RowRightHasTextView
                    leftText="门店名称"
                    _onClick={() => { }}
                    rightText={this.state.storeInfo.name}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="门店地址"
                    rightText={this.state.storeInfo.address ? this.state.storeInfo.address : '无'}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="经营种类"
                    rightText={
                        this.state.storeInfo.storeTypeCd ?
                            storeMobx.getStoreTypeNameByStoreTypeCd(this.state.storeInfo.storeTypeCd) : '无'
                    }
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="门店电话"
                    rightText={this.state.storeInfo.tel}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="门头照"
                    rightText={''}
                    _onClick={() => {
                        this.props.navigation.navigate('ViewStorePhoto',
                            {
                                pageTitle: '门头照',
                                storeInfo: this.state.storeInfo,
                                storePhotoType: StoreConst.STORE_PHOTO_TYPE_CD_DOOR_HEADER,
                            }
                        )
                    }}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="内景照"
                    rightText={''}
                    _onClick={() => {
                        this.props.navigation.navigate('ViewStorePhoto',
                            {
                                pageTitle: '内景照',
                                storeInfo: this.state.storeInfo,
                                storePhotoType: StoreConst.STORE_PHOTO_TYPE_CD_INNER_PHOTO,
                            }
                        )
                    }}
                    style={StoreStyles.storeItemRow}
                />
            </View>
        );
    }


    /**
     * 证件信息
     */
    _renderStoreCerdentialsInfo() {


        return (
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>证件信息</Text>
                </View>

                <RowRightHasTextView
                    leftText="营业执照"
                    rightText={''}
                    _onClick={() => {
                        this.props.navigation.navigate('ViewStoreCerdentials',
                            {
                                pageTitle: '营业执照',
                                storeInfo: this.state.storeInfo,
                                credentialsCd: StoreConst.STORE_CREDENTIALS_CD_BUSINESS_LICENCE,
                            })
                    }
                    }
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="授权函"
                    rightText={''}
                    _onClick={() => {
                        this.props.navigation.navigate('ViewStoreCerdentials',
                            {
                                pageTitle: '授权函',
                                storeInfo: this.state.storeInfo,
                                credentialsCd: StoreConst.STORE_CREDENTIALS_CD_AUTHORIZATION_LETTER,
                            })
                    }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="经营许可证"
                    rightText={''}
                    _onClick={() => {
                        this.props.navigation.navigate('ViewStoreCerdentials',
                            {
                                pageTitle: '经营许可证',
                                storeInfo: this.state.storeInfo,
                                credentialsCd: StoreConst.STORE_CREDENTIALS_CD_BUSINESS_CERTIFICATE,
                            })
                    }}
                    style={StoreStyles.storeItemRow}
                />
            </View>
        );
    }


    /**
     * 其他信息，保存到 shopAttr 中
     */
    _renderStoreOthersInfo() {
        return (
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>其他信息</Text>
                </View>

                <RowRightHasTextView
                    leftText="品牌名称"
                    rightText={this._getStoreAttrShowText(StoreConst.STORE_ATTR_BRAND_NAME)}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="收款账户"
                    rightText={this._getStoreAttrShowText(StoreConst.STORE_ATTR_ACCOUNT)}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="营业起始日"
                    rightText={this._getStoreAttrSelectDayShowText(StoreConst.STORE_ATTR_START_DAY)}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="营业结束日"
                    rightText={this._getStoreAttrSelectDayShowText(StoreConst.STORE_ATTR_END_DAY)}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="营业起始时段"
                    rightText={this._getStoreAttrSelectHourShowText(StoreConst.STORE_ATTR_START_HOUR)}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="营业结束时段"
                    rightText={this._getStoreAttrSelectHourShowText(StoreConst.STORE_ATTR_END_HOUR)}
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />

            </View>
        );
    }

    _renderSpace(){
        return (
                <View style={StoreStyles.spaceView}></View>
        );
    }


    /**
     * 根据属性规格查询属性值 页面展示文本
     * @param {证件类型} cerdentialsCd 
     */
    _getStoreAttrShowText(specCd, mess = "") {
        let tmpStoreAttr = this.state.storeInfo.storeAttr;

        let returnStoreAttr = null;

        for (let tmpStoreAttrIndex = 0; tmpStoreAttrIndex < tmpStoreAttr.length; tmpStoreAttrIndex++) {
            if (tmpStoreAttr[tmpStoreAttrIndex].specCd == specCd) {
                returnStoreAttr = tmpStoreAttr[tmpStoreAttrIndex];
                break;
            }
        }
        let tmpText =
            returnStoreAttr != null
                ? returnStoreAttr.value
                : mess;
        return tmpText;
    }

    /**
     * 根据属性ID 查询属性值
     * @param {规格ID} specCd 
     * @param {提示语} mess 
     */
    _getStoreAttrSelectDayShowText(specCd, mess = "") {
        let tmpStoreAttr = this.state.storeInfo.storeAttr;

        let returnStoreAttr = null;

        for (let tmpStoreAttrIndex = 0; tmpStoreAttrIndex < tmpStoreAttr.length; tmpStoreAttrIndex++) {
            if (tmpStoreAttr[tmpStoreAttrIndex].specCd == specCd) {
                returnStoreAttr = tmpStoreAttr[tmpStoreAttrIndex];
                break;
            }
        }
        let tmpText =
            returnStoreAttr != null
                ? storeMobx.getDayName(returnStoreAttr.value)
                : mess;

        return tmpText;
    }

    /**
     * 根据属性ID 查询属性值
     * @param {规格ID} specCd 
     * @param {提示语} mess 
     */
    _getStoreAttrSelectHourShowText(specCd,mess = ""){
        let tmpStoreAttr = this.state.storeInfo.storeAttr;
        
        let returnStoreAttr = null;

        for (let tmpStoreAttrIndex = 0; tmpStoreAttrIndex < tmpStoreAttr.length; tmpStoreAttrIndex++) {
            if (tmpStoreAttr[tmpStoreAttrIndex].specCd == specCd) {
                returnStoreAttr = tmpStoreAttr[tmpStoreAttrIndex];
                break;
            }
        }
        console.log('_getStoreAttrSelectHourShowText',specCd,tmpStoreAttr,returnStoreAttr);
        let tmpText =
            returnStoreAttr != null
                ? storeMobx.getHourName(returnStoreAttr.value)
                : mess;

        return tmpText;
    }

    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }
}