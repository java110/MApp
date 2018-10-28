import React, { Component } from 'react';

import { View, Text, Image, Platform,FlatList,TouchableOpacity } from 'react-native';
import CommunityStyles from '../../styles/community/CommunityStyles';
import CommonStyles from "../../styles/CommonStyles";
import StoreConst from '../../constants/StoreConst';

import {
    NoActionHeaderView,
    TwoTabView
} from 'Java110';
import communityMobx from '../../mobx/community/CommunityMobx';
import { observer } from "mobx-react";
/**
 * 我入驻的小区
 * add by wuxw 2018-10-28
 */
@observer
export default class MyEnterCommunityPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this._onBackPage = this._onBackPage.bind(this);
        this._onOneClick = this._onOneClick.bind(this);
        this._onTwoClick = this._onTwoClick.bind(this);
    }


    /**
     * 加载 入驻小区数据
     */
    _initStoreEnterCommunity(){
        communityMobx.refreshStoreEnterCommunity();
    }

    render() {
        return (
            <View style={CommunityStyles.container}>
                {this._renderHeader()}
                {this._renderCommunityTab()}
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
                    currentPageName={"我的小区"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    _renderCommunityTab(){
        return (
            <View style={CommunityStyles.communityTabView}>
                <TwoTabView
                    oneName={"正在入驻"}
                    twoName={"成功入驻"}
                    _onOneClick={this._onOneClick}
                    _onTwoClick={this._onTwoClick}
                />
            </View>
        );
    }

    /**
     * 内容
     */
    _renderContext(){
        return(
            <View style={{marginTop:5}}>
                <FlatList
                    ref={(flatList) => this._auditFlatList = flatList}
                    data={communityMobx.storeEnterCommunitys.slice()}
                    keyExtractor={(item, index) => item.store.storeId}
                    renderItem={this._renderAuditList.bind(this)}
                    refreshing={false}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }

    /**
     * 审核列表
     */
    _renderAuditList(rowData){
        rowData = rowData.item;
        let tmpStorePhoto = rowData.store.storePhoto.slice();
        let imageData = {uri:''};
        for (let tmpStorePhotoIndex = 0; tmpStorePhotoIndex < tmpStorePhoto.length; tmpStorePhotoIndex++) {
          if (tmpStorePhoto[tmpStorePhotoIndex].storePhotoTypeCd == StoreConst.STORE_PHOTO_TYPE_CD_DOOR_HEADER) {
            imageData.uri = tmpStorePhoto[tmpStorePhotoIndex].photo;
          }
        }

        return (
            <TouchableOpacity style={CommunityStyles.auditView} onPress={()=>{
                this.props.navigation.navigate('ViewEnterCommunity',{storeId:rowData.store.storeId,communityId:rowData.community.id})
            }}>
                <View style={CommunityStyles.auditImageView}>
                    <Image
                        source={imageData}
                        style={CommunityStyles.auditViewImage}
                    />
                </View>
                <View style={CommunityStyles.auditTextView}>
                    <View style={CommunityStyles.auditViewText}>
                        <Text style={CommunityStyles.auditTextName}>{rowData.community.name}</Text>
                        <Text style={CommunityStyles.auditText}>小区地址: {rowData.community.address}</Text>
                        <Text style={CommunityStyles.auditText}>商户: {rowData.store.name}</Text>
                        <Text style={CommunityStyles.auditText}>商户地址: {rowData.store.address}</Text>
                        <Text style={CommunityStyles.auditText}>创建时间: {rowData.store.createTime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height:1,backgroundColor:'#F3F3F3'}}>

            </View>
        );
    }

    componentDidMount(){
        this._initStoreEnterCommunity();
    }

    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }

    _onOneClick(){

    }

    _onTwoClick(){

    }
}