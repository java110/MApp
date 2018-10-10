import React,{Component} from 'react';

import {View,Text,Image,TextInput, Platform} from 'react-native';

import AddShopStyles from "../../styles/shop/AddShopStyles";
import CommonStyles from "../../styles/CommonStyles";
import shopMobx from '../../mobx/shop/ShopMobx';

import {
    NoActionHeaderView,
    RowRightTextView,
    RowRightImageView
} from 'Java110';

/**
 * 展示商品信息页面
 * 
 * add by wuxw 2018-10-09 
 */
export default class ViewShopPage extends Component{


    constructor(props){
        super(props);

        let {shopId} = this.props.navigation.state.params;

        this.state = {
            shopId:shopId,
            shopLogo: shopMobx.getShopColumnValueByColumnNameAndShopId('shopLogo',shopId),
            shopName: shopMobx.getShopColumnValueByColumnNameAndShopId('name',shopId),
            shopPrice: shopMobx.getShopColumnValueByColumnNameAndShopId('salePrice',shopId),
            openShopCount: shopMobx.getShopColumnValueByColumnNameAndShopId('openShopCount',shopId),
            shopCount: shopMobx.getShopColumnValueByColumnNameAndShopId('shopCount',shopId),
            shopDesc: shopMobx.getShopColumnValueByColumnNameAndShopId('shopDescribe',shopId),
            startDate:shopMobx.getShopColumnValueByColumnNameAndShopId('startDate',shopId),
            endDate: shopMobx.getShopColumnValueByColumnNameAndShopId('endDate',shopId),
            catalogId: shopMobx.getShopColumnValueByColumnNameAndShopId('catalogId',shopId),
            catalogName:shopMobx.getCatalogName(shopMobx.getShopColumnValueByColumnNameAndShopId('catalogId',shopId)),
        };

        this._onBackPage = this._onBackPage.bind(this);
    }


    /**
     * 页面渲染
     * add by wuxw 2018-10-09
     */
    render(){
        return (
            <View style={AddShopStyles.container}>
                {this.renderShopInfo()}
            </View>
        );
    }

    renderShopInfo() {
        return (
            <View>
                {this._renderHeader()}
                {this._renderShopInfo()}
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
                    currentPageName={"商品信息"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 显示商品信息
     * @private
     */
    _renderShopInfo() {
        return (
            <View>
               {this._renderShopInfoTitle()}
                {this._renderShopInfoContent()}
            </View>
        );
    }

    /**
     * 商品title信息
     * @returns {XML}
     * @private
     */
    _renderShopInfoTitle() {
        return (
            <View style={AddShopStyles.shopInfoTitleView}>
                <Text style={AddShopStyles.shopInfoTitleViewText}>商品信息</Text>
                <Text style={AddShopStyles.shopInfoTitleViewTextSmall}>(商品信息越详细，关注的买家越多)</Text>
            </View>
        );
    }

    /**
     * 内容
     * @returns {XML}
     * @private
     */
    _renderShopInfoContent() {

        return (
            <View style={AddShopStyles.shopItemView}>
                <RowRightImageView
                    leftText="商品logo"
                    imageData={{ uri: this.state.shopLogo }}
                    style={[AddShopStyles.shopItemRowView, { height: 70 }]}
                />
                <RowRightTextView
                    leftText="商品名称"
                    rightText={this.state.shopName}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightTextView
                    leftText="所属目录"
                    rightText={this.state.catalogName}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightTextView
                    leftText="商品价格"
                    rightText={this.state.shopPrice}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightTextView
                    leftText="显示库存"
                    rightText={this.state.openShopCount == 'Y'?'是':'否'}
                    style={AddShopStyles.shopItemRowView}
                />
                {
                    this.state.openShopCount == 'Y' ?
                        <RowRightTextView
                            leftText="库存数量"
                            rightText={this.state.shopCount}
                            style={AddShopStyles.shopItemRowView}
                        />
                        : null
                }

                <RowRightTextView
                    leftText="商品描述"
                    rightText={this.state.shopDesc}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightTextView
                    leftText="开始时间"
                    rightText={this.state.startDate}
                    style={AddShopStyles.shopItemRowView}
                />

                <RowRightTextView
                    leftText="结束时间"
                    rightText={this.state.endDate}
                    style={AddShopStyles.shopItemRowView}
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