import React,{Component} from 'react';

import {View,Image, Text, TextInput,Platform} from 'react-native';
import CommonStyles from "../../styles/CommonStyles";
import AddShopStyles from "../../styles/shop/AddShopStyles";
import CompleteHeaderView from "../../../components/header/CompleteHeaderView";
import RowRightHasImageView from "../../../components/row/RowRightHasImageView";
import RowRightTextInputView from "../../../components/row/RowRightTextInputView";

/**
 * 添加商品
 *
 *
 *
 * add by wuxw 2018-09-20
 */
export default class AddShopPage extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            shopName:"",
        };

        this._onComplete = this._onComplete.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
        this._onShopItemClick = this._onShopItemClick.bind(this);
      }

    /**
     * 页面渲染
     */
    render(){
        return (

            <View style={AddShopStyles.container}>
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
    _renderHeader(){

        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?CommonStyles.header:CommonStyles.header_android_low}>
                <CompleteHeaderView
                    currentPageName={"添加商品"}
                    _onComplete={this._onComplete}
                    _onBackPage = {this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 显示商品信息
     * @private
     */
    _renderShopInfo(){
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
    _renderShopInfoTitle(){
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
    _renderShopInfoContent(){

        return (
            <View style={AddShopStyles.shopItemView}>
                <RowRightHasImageView
                    viewId="1"
                    leftText="商品logo"
                    imageData={{url:""}}
                    _onClick = {this._onShopItemClick}
                    style={AddShopStyles.shopItemRowView}
                    />
                <RowRightTextInputView
                    viewId="2"
                    leftText="商品名称"
                    textPlaceholder={"请输入商品名称，必填"}
                    _onChangeText = {this._onShopItemClick}
                    inputValue={this.state.shopName}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightHasImageView
                    viewId="3"
                    leftText="其他"
                    imageData={{url:""}}
                    _onClick = {this._onShopItemClick}
                    style={AddShopStyles.shopItemRowView}
                />
            </View>
        );
    }



    /**
     * 添加目录
     * @private
     */
    _onComplete(){
        //this.props.navigation.navigate("AddShopCatalog",{})

        this._onBackPage();
    }

    /**
     * 返回
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();
    }

    /**
     * 点击
     * @param viewId
     * @private
     */
    _onShopItemClick(viewId:String){

    }
}