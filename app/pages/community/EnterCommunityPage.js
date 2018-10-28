import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, Platform, PermissionsAndroid, FlatList, ScrollView } from 'react-native';

import communityMobx from '../../mobx/community/CommunityMobx';
import storeMobx from '../../mobx/store/StoreMobx';
import CommunityStyles from '../../styles/community/CommunityStyles';
import CommonStyles from "../../styles/CommonStyles";
import { Badge, Button } from 'teaset';
import { observer } from "mobx-react";
import {
    NoActionHeaderView,
    SearchInput,
    ButtonView,
    RowRightHasTextView,
    SelectView,
} from 'Java110';

/**
 * 入驻小区 页面
 * 
 * add by wuxw 2018-10-10
 */
@observer
export default class EnterCommunityPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            enterCommunityFlag: false,
            selectStoreModelShow: false,
            currentCommunityId: ''
        };
        this._onBackPage = this._onBackPage.bind(this);
        this._doSearchCommunity = this._doSearchCommunity.bind(this);
        this._enterCommunity = this._enterCommunity.bind(this);
        this._onClickSubmitAudit = this._onClickSubmitAudit.bind(this);
        this._onSelectStore = this._onSelectStore.bind(this);
    }

    /**
     * 渲染页面
     */
    render() {
        return (
            <View style={CommunityStyles.container}>
                {this._renderHeader()}
                {
                    this.state.enterCommunityFlag
                        ? this._renderDoCommunity()
                        : this._renderViewCommunity()
                }
            </View>
        );
    }

    /**
     * 展示 附近的小区
     */
    _renderViewCommunity() {
        return (
            <View>
                {this._renderSearch()}
                {this._renderCommunityInfos()}
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
                    {
                        storeCount > 0
                            ? this._renderStoreInfo()
                            : null
                    }
                    {this._renderSelectStore()}
                </ScrollView>
                {this._renderCommunityBottom()}
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
                    currentPageName={"入驻小区"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 搜索小区
     */
    _renderSearch() {
        return (
            <View style={CommunityStyles.searchView}>
                <SearchInput
                    _onChangeText={text => this.setState({ searchValue: text })}
                    _soSearch={this._doSearchCommunity}
                    placeholder="请输入小区名称"
                    inputValue={this.state.searchValue}
                />
            </View>
        )

    }

    /**
     * 小区信息
     */
    _renderCommunityInfos() {
        return (
            <View style={CommunityStyles.communityView}>
                <FlatList
                    ref={(flatList) => this._communityFlatList = flatList}
                    data={communityMobx.communityInfos.slice()}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this._renderCommunityRow.bind(this)}
                    refreshing={false}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }

    /**
     *
     * @param rowData
     * @returns {XML}
     * @private
     */
    _renderCommunityRow(rowData) {
        //console.log("_renderLeftRow",rowData);
        rowData = rowData.item;
        return (
            <View style={CommunityStyles.communityRowView}>
                <View style={CommunityStyles.communityRowLeftView}>
                    <Text style={CommunityStyles.communityNameText}>{rowData.name}</Text>
                    <Text style={CommunityStyles.communityAddressText}>{rowData.address}</Text>
                </View>
                <View style={CommunityStyles.communityRowRightView}>
                    <Button
                        type="default"
                        titleStyle={{ color: '#F24E3E' }}
                        size="sm"
                        style={CommunityStyles.enterCommunityButton}
                        title="入驻"
                        onPress={() => { this._enterCommunity(rowData.id) }} />
                </View>
            </View>
        );
    }

    _renderSeparator() {
        return (
            <View style={{ height: 1, backgroundColor: '#F3F3F3' }}>

            </View>
        );
    }

    /**
     * 小区 和商户关联
     */
    _renderCommunityAndStore() {
        return (
            <View>
                {this._renderCommunityBaseInfo()}
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
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{communityMobx.currentCommunityInfo.name}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>地址</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{communityMobx.currentCommunityInfo.address}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>电话</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{communityMobx.currentCommunityInfo.tel}</Text>
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
                <View style={CommunityStyles.rowDataStoreHeaderView}>
                    <RowRightHasTextView
                        leftText="商户信息"
                        rightText={'其他商户'}
                        _onClick={() => { this.setState({ selectStoreModelShow: true, }) }}
                        style={CommunityStyles.storeItemRow}
                    />
                </View>
                <View style={CommunityStyles.communityView}>

                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>门店名称</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{storeMobx.currentAuditedStoreInfo.name}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>门店地址</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{storeMobx.currentAuditedStoreInfo.address}</Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>经营种类</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>
                            {storeMobx.currentAuditedStoreInfo.storeTypeCd
                                ? storeMobx.getStoreTypeNameByStoreTypeCd(storeMobx.currentAuditedStoreInfo.storeTypeCd)
                                : ''}
                        </Text>
                    </View>
                    <View style={CommunityStyles.communityDetailInfoView}>
                        <Text style={CommunityStyles.communityDetailInfoText}>门店电话</Text>
                        <Text style={CommunityStyles.communityDetailInfoTextValue}>{storeMobx.currentAuditedStoreInfo.tel}</Text>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 选择经营种类
     */
    _renderSelectStore() {
        //审核过的商户信息

        return (
            <SelectView
                selectModelShow={this.state.selectStoreModelShow}
                currentPageName={'选择商户'}
                data={storeMobx.selectAuditedStore.slice()}
                _onSelectCheck={(id) => {
                    this._onSelectStore(id);
                }}
                _onCancle={() => {
                    this.setState({
                        selectStoreModelShow: false,
                    });
                }}
            />
        );
    }

    /**
     * 审核按钮
     */
    _renderCommunityBottom() {
        return (
            <View style={CommunityStyles.viewBottom}>
                <ButtonView
                    _viewButtonName="提交审核"
                    _onClick={() => { this._onClickSubmitAudit() }}
                />
            </View>
        );
    }

    componentWillMount() {
        this.requestLocationPermission();
    }

    /**
     * 从远程服务器加载 附近的小区
     */
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let longitude = position.coords.longitude;
                let latitude = position.coords.latitude;

                console.log('StoreSelectCommunityPage componentDidMount', position);

                let community = communityMobx.getNearCommunity(longitude, latitude);
                this.setState({
                    community: community,
                    currentPosition: position
                });
            }
        );


        //刷新 审核过的商户
        this._refreshAuditedStores();

    }

    /**
     * 刷新 审核过的商户
     */
    _refreshAuditedStores() {
        storeMobx.getAuditedStore();
    }


    async requestLocationPermission() {
        try {
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Photo App Camera Permission',
                        'message': 'Cool Photo App needs access to your camera ' +
                            'so you can take awesome pictures.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the location");
                } else {
                    console.log("Camera permission denied")
                }
            }
        } catch (err) {
            console.warn(err)
        }
    }

    /**
     * 搜索小区
     */
    _doSearchCommunity() {
        communityMobx.searchCommunity(this.state.searchValue);
    }

    /**
     * 入驻小区
     */
    _enterCommunity(communityId) {
        communityMobx.refreshCurrentCommunityInfoByCommunityId(communityId);
        this.setState({
            currentCommunityId: communityId,
            enterCommunityFlag: true,
        });
    }

    /**
     * 选择 商户
     * @param {商户ID} storeId 
     */
    _onSelectStore(storeId) {
        storeMobx.refreshCurrentAuditedStoreInfo(storeId);
    }
    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }

    /**
     * 提交审核
     */
    _onClickSubmitAudit() {
        communityMobx.submitAudit(storeMobx.currentAuditedStoreInfo);
        this._onBackPage();
    }
}