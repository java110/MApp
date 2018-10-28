import React, { Component } from 'react';
import { View, Image, Text, Platform, TouchableOpacity,ScrollView } from 'react-native';


import {
    NoActionHeaderView,
} from 'Java110';
import communityMobx from '../../mobx/community/CommunityMobx';
import storeMobx from '../../mobx/store/StoreMobx';
import { observer } from "mobx-react";

import CommunityStyles from '../../styles/community/CommunityStyles';
import CommonStyles from "../../styles/CommonStyles";
/**
 * 商户入驻小区 展示页面
 * 
 * add by wuxw 2018-10-28
 */
@observer
export default class ViewEnterCommunityPage extends Component {

    constructor(props) {
        super(props);
        let {storeId,communityId} = this.props.navigation.state.params;
        this.state = {
            storeId:storeId,
            communityId:communityId,
            store:{},
            community:{}
        }

        this._onBackPage = this._onBackPage.bind(this);
    }


    /**
     * 渲染页面
     */
    render() {
        return (
            <View style={CommunityStyles.container}>
                {this._renderHeader()}
                {this._renderDoCommunity()}
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
                    currentPageName={"小区信息"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 提交审核
     */
    _renderDoCommunity() {
        //判断当前是否有审核过的商户
        let storeCount = storeMobx.selectAuditedStore.slice().length;
        return (
            <View style={CommunityStyles.container}>
                <ScrollView>
                    {this._renderCommunityBaseInfo()}
                    {this._renderStoreInfo()}
                </ScrollView>
            </View>
        );
    }


    _renderCommunityBaseInfo() {
        return (
            <View style={CommunityStyles.communityBlockView}>
                <View style={CommunityStyles.rowDataHeaderView}>
                    <Text style={CommunityStyles.rowDataHeaderViewText}>小区信息</Text>
                </View>
                <View style={CommunityStyles.communityBaseView}>

                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>名称</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{this.state.community.name}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>地址</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{this.state.community.address}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>电话</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{this.state.community.tel}</Text>
                    </View>
                </View>
            </View>
        );
    }


    /**
     * 选择商户信息
     */
    _renderStoreInfo() {
        return (
            <View style={CommunityStyles.communityBlockView}>
                <View style={CommunityStyles.rowDataHeaderView}>
                    <Text style={CommunityStyles.rowDataHeaderViewText}>商户信息</Text>
                </View>
                <View style={CommunityStyles.communityBaseView}>

                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>门店名称</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{this.state.store.name}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>门店地址</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{this.state.store.address}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>经营种类</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>
                            {this.state.store.storeTypeCd
                                ? storeMobx.getStoreTypeNameByStoreTypeCd(this.state.store.storeTypeCd)
                                : ''}
                        </Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>门店电话</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{this.state.store.tel}</Text>
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount(){
        let tmpStoreEnterCommunitys = communityMobx.storeEnterCommunitys.slice();

        for(let storeEnterCommunityIndex = 0 ; storeEnterCommunityIndex < tmpStoreEnterCommunitys.length;storeEnterCommunityIndex++){
            let tmpStoreEnterCommunity = tmpStoreEnterCommunitys[storeEnterCommunityIndex];

            if(tmpStoreEnterCommunity.store.storeId == this.state.storeId && tmpStoreEnterCommunity.community.id == this.state.communityId){

                this.setState({
                    store:tmpStoreEnterCommunity.store,
                    community:tmpStoreEnterCommunity.community,
                });

                break;
            }
        }
    }
    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }
}