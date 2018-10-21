import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, Platform,ScrollView } from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import StoreStyles from '../../styles/store/StoreStyles';
import CommonStyles from "../../styles/CommonStyles";
import { Badge } from 'teaset';
import { observer } from "mobx-react";
import {
    NoActionHeaderView,
    ButtonView,
    RowRightTextInputView,
    RowRightHasTextView,
    RowRightHasImageView,
    RowRightSwitchView,
    SelectView
} from 'Java110';
import StoreConst from '../../constants/StoreConst';
/**
 * 开店 页面
 * 
 * add by wuxw 2018-10-10
 */
@observer
export default class OpenStorePage extends Component {

    constructor(props) {
        super(props);
        let startHour = this._getStoreAttrShowText(StoreConst.STORE_ATTR_START_HOUR,'请选择');
        let endHour = this._getStoreAttrShowText(StoreConst.STORE_ATTR_END_HOUR,'请选择');
        let is24 = startHour == StoreConst.STORE_TIME_00 && endHour == StoreConst.STORE_TIME_24 ? true:false;
        this.state = {
            showExplain: true,
            currentPageName:"开店说明",
            storeTypeModelShow:false,
            storeTypePageName:"经营种类",
            startDayModelShow:false,
            startDayPageName:"选择营业起始日",
            endDayModelShow:false,
            endDayPageName:"选择营业结束日",
            startHourModelShow:false,
            startHourPageName:"选择营业起始时段",
            endHourModelShow:false,
            endHourPageName:"选择营业结束时段",
            is24:is24,
        };
        this._onBackPage = this._onBackPage.bind(this);

        this._onClickOpenStore = this._onClickOpenStore.bind(this);
        this._onClickCommitStore = this._onClickCommitStore.bind(this);
        this._getStoreCerdentialsShowText = this._getStoreCerdentialsShowText.bind(this);
    }

    /**
     * 渲染页面
     */
    render() {
        return (
            <View style={[StoreStyles.container, StoreStyles.body]}>
                {this._renderHeader()}
                {
                    this.state.showExplain
                        ? this._renderExplain()
                        : this._renderStoreInfo()
                }
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
    * 开店说明
    */
    _renderExplain() {
        return (
            <View style={StoreStyles.explainView}>
                <ScrollView >
                    {this._renderExplainTop()}
                    {this._renderExplainCenter()}
                    {this._renderSpace()}
                </ScrollView>       
                {this._renderExplainBottom()}
            </View>
        );
    }

    _renderExplainTop() {
        return (
            <View style={StoreStyles.explainViewTop}>
                <View style={StoreStyles.explainViewRowTitle}>
                    <Text style={StoreStyles.explainViewRowTitleText}>开店流程</Text>
                </View>

                <View style={StoreStyles.explainViewRow}>
                    <View style={StoreStyles.explainViewRowTopLine}></View>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={StoreStyles.customBadge}>
                            <Text style={StoreStyles.customBadgeText}>1</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>提交门店，补全证照</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>需要提交真实有效的信息</Text>
                    </View>
                </View>
                <View style={[StoreStyles.explainViewRow, { marginTop: -1 }]}>
                    <View style={StoreStyles.explainViewRowTopLine}></View>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={StoreStyles.customBadge}>
                            <Text style={StoreStyles.customBadgeText}>2</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>待审核</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>门店申请提交后，后台审核人员将在1-3个工作日内审核，请关注待审核页面</Text>
                    </View>
                </View>
                <View style={[StoreStyles.explainViewRow, { marginTop: -1 }]}>
                    <View style={StoreStyles.explainViewRowTopLine}></View>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={StoreStyles.customBadge}>
                            <Text style={StoreStyles.customBadgeText}>3</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>入驻小区</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>收到审核通过消息，在入驻小区页面选择小区入驻</Text>
                    </View>
                </View>
                <View style={[StoreStyles.explainViewRow, { marginTop: -1 }]}>
                    <View style={[StoreStyles.explainViewRowTopLine, { backgroundColor: '#FFF' }]}></View>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={StoreStyles.customBadge}>
                            <Text style={StoreStyles.customBadgeText}>4</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>正式开店，录入商品信息</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>收到审核通过消息，在商品页面添加商品信息</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderExplainCenter() {
        return (
            <View style={StoreStyles.explainViewCenter}>
                <View style={StoreStyles.explainViewRowTitle}>
                    <Text style={StoreStyles.explainViewRowTitleText}>收费说明</Text>
                </View>
                <View style={StoreStyles.explainViewCenterRow}>
                    <Text style={[StoreStyles.explainViewCenterRowText]}>根据您入驻的小区，收费方式收取</Text>
                    <Text style={[StoreStyles.explainViewCenterRowText, { marginTop: 5 }]}>注: 费用收取由系统自动收取，谨防上当</Text>
                </View>
            </View>
        );
    }

    _renderExplainBottom() {
        return (
            <View style={StoreStyles.viewBottom}>
                <ButtonView
                    _viewButtonName="马上开店"
                    _onClick={() => {this._onClickOpenStore()}}
                />
            </View>
        );
    }

    /**
     * 商户信息
     */
    _renderStoreInfo(){
        return(
            <View style={StoreStyles.storeView}>
                <ScrollView>
                    {this._renderStoreBaseInfo()}
                    {this._renderStoreCerdentialsInfo()}
                    {this._renderStoreOthersInfo()}
                    {this._renderSpace()}
                    {this._renderSelectStoreType()}
                    {this._renderSelectStartDay()}
                    {this._renderSelectEndDay()}
                    {this._renderSelectStartHour()}
                    {this._renderSelectEndHour()}
                </ScrollView>
                {this._renderStoreBottom()}  
            </View>
        );
    }

    /**
     * 商户基本信息
     * 
     * 
     */
    _renderStoreBaseInfo(){
        console.log("_renderStoreBaseInfo",storeMobx.storeInfo,storeMobx.storeInfo.address);

        let doorHeaderPhoto = 
            storeMobx.getStorePhotoOfStoreInfo(StoreConst.STORE_PHOTO_TYPE_CD_DOOR_HEADER).slice().length >0 
            ? "已上传"
            :"必填，请上传门头照";
        let innerPhotoLength = storeMobx.getStorePhotoOfStoreInfo(StoreConst.STORE_PHOTO_TYPE_CD_INNER_PHOTO).slice().length
        let innerPhoto = 
            innerPhotoLength >0 
            ? "已上传"+innerPhotoLength+"张照片"
            :"必填，请上传内景照";
        
        return(
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>基本信息</Text>
                </View>
                
                <RowRightTextInputView
                    leftText="门店名称"
                    textPlaceholder={"请输入门店名称，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('name',value) }}
                    inputValue={storeMobx.storeInfo.name}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="门店地址"
                    rightText={storeMobx.storeInfo.address ?storeMobx.storeInfo.address:'必填，请填写详细地址'}
                    _onClick={() => {this.props.navigation.navigate('AddStoreAddress',{})}}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="经营种类"
                    rightText={storeMobx.storeInfo.storeTypeCd ? storeMobx.getStoreTypeNameByStoreTypeCd(storeMobx.storeInfo.storeTypeCd):'必填，请选择'}
                    _onClick={() => { this.setState({storeTypeModelShow:true,}) }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightTextInputView
                    leftText="门店电话"
                    textPlaceholder={"请输入联系电话，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('tel',value) }}
                    keyboardText={'numeric'}
                    inputValue={storeMobx.storeInfo.tel}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="门头照"
                    rightText={doorHeaderPhoto}
                    _onClick={() => {this.props.navigation.navigate('AddStoreDoorHeaderPhoto',{})}}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="内景照"
                    rightText={innerPhoto}
                    _onClick={() => {this.props.navigation.navigate('AddStoreInnerPhoto',{})}}
                    style={StoreStyles.storeItemRow}
                />
            </View>
        );
    }

    /**
     * 根据证件类型 页面展示文本
     * @param {证件类型} cerdentialsCd 
     */
    _getStoreCerdentialsShowText(cerdentialsCd,mess = "必填，请上传"){
        let count = storeMobx.getStoreCerdentialsOfStoreInfo(cerdentialsCd).slice().length;
        let tmpText = 
            count >0 
            ? "已上传"
            :mess;

            return  tmpText;
    }

    /**
     * 证件信息
     */
    _renderStoreCerdentialsInfo(){
        

        return(
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>证件信息</Text>
                </View>
                
                <RowRightHasTextView
                    leftText="营业执照"
                    rightText={this._getStoreCerdentialsShowText(StoreConst.STORE_CREDENTIALS_CD_BUSINESS_LICENCE)}
                    _onClick={() => {this.props.navigation.navigate('AddBusinessLicence',{})}}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="授权函"
                    rightText={this._getStoreCerdentialsShowText(StoreConst.STORE_CREDENTIALS_CD_AUTHORIZATION_LETTER)}
                    _onClick={() => { this.props.navigation.navigate('AddAuthorizationLetter',{}) }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="经营许可证"
                    rightText={this._getStoreCerdentialsShowText(StoreConst.STORE_CREDENTIALS_CD_BUSINESS_CERTIFICATE,'选填')}
                    _onClick={() => { this.props.navigation.navigate('AddBusinessCertificate',{})  }}
                    style={StoreStyles.storeItemRow}
                />
            </View>
        );
    }

    /**
     * 根据属性规格查询属性值 页面展示文本
     * @param {证件类型} cerdentialsCd 
     */
    _getStoreAttrShowText(specCd,mess = ""){
        let tmpStoreAttr = storeMobx.getStoreAttrOfStoreInfo(specCd);
        let tmpText = 
            tmpStoreAttr.slice().length >0 
            ? tmpStoreAttr[0].value
            :mess;

            return  tmpText;
    }

    /**
     * 根据属性ID 查询属性值
     * @param {规格ID} specCd 
     * @param {提示语} mess 
     */
    _getStoreAttrSelectDayShowText(specCd,mess = ""){
        let tmpStoreAttr = storeMobx.getStoreAttrOfStoreInfo(specCd);
        let tmpText = 
            tmpStoreAttr.slice().length >0 
            ? storeMobx.getDayName(tmpStoreAttr[0].value)
            :mess;

            return  tmpText;
    }

    /**
     * 根据属性ID 查询属性值
     * @param {规格ID} specCd 
     * @param {提示语} mess 
     */
    _getStoreAttrSelectHourShowText(specCd,mess = ""){
        let tmpStoreAttr = storeMobx.getStoreAttrOfStoreInfo(specCd);
        let tmpText = 
            tmpStoreAttr.slice().length >0 
            ? storeMobx.getHourName(tmpStoreAttr[0].value)
            :mess;

            return  tmpText;
    }
    /**
     * 其他信息，保存到 shopAttr 中
     */
    _renderStoreOthersInfo(){
        return(
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>其他信息</Text>
                </View>
                
                <RowRightTextInputView
                    leftText="品牌名称"
                    textPlaceholder={"请输入品牌，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoOfStoreAttr(StoreConst.STORE_ATTR_BRAND_NAME,value) }}
                    rightText={this._getStoreAttrShowText(StoreConst.STORE_ATTR_BRAND_NAME)}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightTextInputView
                    leftText="收款账户"
                    textPlaceholder={"请输入收款账户，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoOfStoreAttr(StoreConst.STORE_ATTR_ACCOUNT,value) }}
                    rightText={this._getStoreAttrShowText(StoreConst.STORE_ATTR_ACCOUNT)}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="营业起始日"
                    rightText={this._getStoreAttrSelectDayShowText(StoreConst.STORE_ATTR_START_DAY,'请选择')}
                    _onClick={() => { this.setState({startDayModelShow:true}); }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="营业结束日"
                    rightText={this._getStoreAttrSelectDayShowText(StoreConst.STORE_ATTR_END_DAY,'请选择')}
                    _onClick={() => { this.setState({endDayModelShow:true}); }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightSwitchView
                    leftText="24小时"
                    switchValue={this.state.is24}
                    _onSwitchValueChange={(value) => { 
                        storeMobx.refreshStoreInfoOfStoreAttr('is24',value);
                        //如果是24 小时则将 开始时间和结束时间刷成 0点至 24点
                        if(value){
                            storeMobx.refreshStoreInfoProperty(StoreConst.STORE_ATTR_START_HOUR,StoreConst.STORE_TIME_00);
                            storeMobx.refreshStoreInfoProperty(StoreConst.STORE_ATTR_END_HOUR,StoreConst.STORE_TIME_24);
                        }else{
                        //如果不是24 小时 则删除之前开始时间和结束时间值
                            storeMobx.deleteStoreAttrBySpecCd(StoreConst.STORE_ATTR_START_HOUR);
                            storeMobx.deleteStoreAttrBySpecCd(StoreConst.STORE_ATTR_END_HOUR);
                        }
                        this.setState({is24:value});
                     }}
                    style={StoreStyles.storeItemRow}
                />
                {
                    this.state.is24?null:
                    <RowRightHasTextView
                    leftText="营业起始时段"
                    rightText={this._getStoreAttrSelectHourShowText(StoreConst.STORE_ATTR_START_HOUR,'请选择')}
                    _onClick={() => { this.setState({startHourModelShow:true});  }}
                    style={StoreStyles.storeItemRow}
                    />
                }
                {
                    this.state.is24?null:
                    <RowRightHasTextView
                        leftText="营业结束时段"
                        rightText={this._getStoreAttrSelectHourShowText(StoreConst.STORE_ATTR_END_HOUR,'请选择')}
                        _onClick={() => {this.setState({endHourModelShow:true});  }}
                        style={StoreStyles.storeItemRow}
                    />
                }
            </View>
        );
    }

    _renderStoreBottom() {
        return (
            <View style={StoreStyles.viewBottom}>
                <ButtonView
                    _viewButtonName="提交"
                    _onClick={() => {this._onClickCommitStore()}}
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
     * 选择经营种类
     */
    _renderSelectStoreType() {
        //封装目录信息
        let tmpStoreTypeData = storeMobx.getStoreTypeData();
        return (
            <SelectView
                selectModelShow={this.state.storeTypeModelShow}
                currentPageName={this.state.storeTypePageName}
                data={tmpStoreTypeData.slice()}
                _onSelectCheck={(id) => {
                    this._onSelectStoreType(id);
                }}
                _onCancle={()=>{
                    this.setState({
                        storeTypeModelShow:false,
                    });    
                }}
            />
        );
    }
    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }

    /**
     * 点击马上开店按钮
     */
    _onClickOpenStore(){
        this.setState({
            showExplain:false,
            currentPageName:"免费开店",
        });
    }
    /**
     * 提交
     */
    _onClickCommitStore(){
        //提交数据
        storeMobx.saveStoreInfo();
        //提示在审核中查看
        this._onBackPage();
    }


    /**
     * 选择商店种类
     */
    _onSelectStoreType(id) {
        storeMobx.refreshStoreInfoProperty('storeTypeCd',id);
        this.setState({
            storeTypePageName:"经营种类",
        });
    }

    /**
     * 选择营业起始日
     */
    _renderSelectStartDay() {
        //封装目录信息
        let tmpDays = storeMobx.getDays(StoreConst.STORE_ATTR_START_DAY);
        return (
            <SelectView
                selectModelShow={this.state.startDayModelShow}
                currentPageName={this.state.startDayPageName}
                data={tmpDays.slice()}
                _onSelectCheck={(id) => {
                    storeMobx.refreshStoreInfoOfStoreAttr(StoreConst.STORE_ATTR_START_DAY,id);
                    this.setState({
                        startDayPageName:"选择营业起始日",
                    });
                }}
                _onCancle={()=>{
                    this.setState({
                        startDayModelShow:false,
                    });    
                }}
            />
        );
    }

    /**
     * 选择营业结束日
     */
    _renderSelectEndDay() {
        //封装目录信息
        let tmpDays = storeMobx.getDays(StoreConst.STORE_ATTR_END_DAY);
        return (
            <SelectView
                selectModelShow={this.state.endDayModelShow}
                currentPageName={this.state.endDayPageName}
                data={tmpDays.slice()}
                _onSelectCheck={(id) => {
                    storeMobx.refreshStoreInfoOfStoreAttr(StoreConst.STORE_ATTR_END_DAY,id);
                    this.setState({
                        endDayPageName:"选择营业结束日",
                    });
                }}
                _onCancle={()=>{
                    this.setState({
                        endDayModelShow:false,
                    });    
                }}
            />
        );
    }

    /**
     * 选择营业起始时段
     */
    _renderSelectStartHour() {
        //封装目录信息
        let tmpDays = storeMobx.getHours(StoreConst.STORE_ATTR_START_HOUR);
        return (
            <SelectView
                selectModelShow={this.state.startHourModelShow}
                currentPageName={this.state.startHourPageName}
                data={tmpDays.slice()}
                _onSelectCheck={(id) => {
                    storeMobx.refreshStoreInfoOfStoreAttr(StoreConst.STORE_ATTR_START_HOUR,id);
                    this.setState({
                        startHourPageName:"选择营业起始时段",
                    });
                }}
                _onCancle={()=>{
                    this.setState({
                        startHourModelShow:false,
                    });    
                }}
            />
        );
    }

    /**
     * 选择营业结束时段
     */
    _renderSelectEndHour() {
        //封装目录信息
        let tmpDays = storeMobx.getHours(StoreConst.STORE_ATTR_END_HOUR);
        return (
            <SelectView
                selectModelShow={this.state.endHourModelShow}
                currentPageName={this.state.endHourPageName}
                data={tmpDays.slice()}
                _onSelectCheck={(id) => {
                    storeMobx.refreshStoreInfoOfStoreAttr(StoreConst.STORE_ATTR_END_HOUR,id);
                    this.setState({
                        endHourPageName:"选择营业结束时段",
                    });
                }}
                _onCancle={()=>{
                    this.setState({
                        endHourModelShow:false,
                    });    
                }}
            />
        );
    }
}