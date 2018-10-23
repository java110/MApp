import React,{Component} from 'react';

import {View,Image,Text,TouchableOpacity,Platform,ScrollView} from 'react-native';

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
export default class ViewStorePage extends Component{

    
    constructor(props){
        super(props);
        let {storeId} = this.props.navigation.state.params;
        this.state={
            storeId:storeId
        };
        this._initStoreAudit();
        this._onBackPage = this._onBackPage.bind(this);
    }

    _initStoreAudit(){
        //刷新审核数据
        storeMobx.refreshAuditStoreInfos();
    }

    /**
     * 渲染页面
     */
    render(){
        return (
            <View  style={[StoreStyles.container, StoreStyles.body]}>
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
     * {this._renderStoreCerdentialsInfo()}
                    {this._renderStoreOthersInfo()}
                    {this._renderSpace()}
     */
    _renderStoreInfo(){
        return(
            <View style={StoreStyles.storeView}>
                <ScrollView>
                    {this._renderStoreBaseInfo()}
                    
                </ScrollView>
            </View>
        );
    }

    componentWillMount(){

        //加载数据
        let tempStoreInfos = storeMobx.auditStoreInfos.slice();
        //let currentStoreInfo = {};
        for(let tempStoreInfosIndex = 0; tempStoreInfosIndex< tempStoreInfos.length;tempStoreInfosIndex++){
            if(tempStoreInfos[tempStoreInfosIndex].storeId == this.state.storeId){
                this.setState({
                    storeInfo:tempStoreInfos[tempStoreInfosIndex],
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
    _renderStoreBaseInfo(){
        
        return(
            <View style={StoreStyles.storeInfo}>
                <View style={StoreStyles.storeInfoTitle}>
                    <Text style={StoreStyles.storeInfoTitleText}>基本信息</Text>
                </View>
                
                <RowRightHasTextView
                    leftText="门店名称"
                    _onClick={() => {}}
                    rightText={this.state.storeInfo.name}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="门店地址"
                    rightText={this.state.storeInfo.address ?this.state.storeInfo.address:'无'}
                    _onClick={() => {}}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="经营种类"
                    rightText={
                        this.state.storeInfo.storeTypeCd ? 
                        storeMobx.getStoreTypeNameByStoreTypeCd(this.state.storeInfo.storeTypeCd):'无'
                    }
                    _onClick={() => { }}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightHasTextView
                    leftText="门店电话"
                    rightText={this.state.storeInfo.tel}
                    _onClick={() => {}}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="门头照"
                    rightText={''}
                    _onClick={() => {
                        this.props.navigation.navigate('ViewStorePhoto',
                                {
                                    pageTitle:'门头照',
                                    storeInfo:this.state.storeInfo,
                                    storePhotoType:StoreConst.STORE_PHOTO_TYPE_CD_DOOR_HEADER,
                                }
                                )}}
                    style={StoreStyles.storeItemRow}
                />

                <RowRightHasTextView
                    leftText="内景照"
                    rightText={''}
                    _onClick={() => {this.props.navigation.navigate('ViewStorePhoto',
                    {
                        pageTitle:'内景照',
                        storeInfo:this.state.storeInfo,
                        storePhotoType:StoreConst.STORE_PHOTO_TYPE_CD_INNER_PHOTO,
                    }
                    )}}
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