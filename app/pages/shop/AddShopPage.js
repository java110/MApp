import React, { Component } from 'react';

import { View, Image, Text, TextInput, Platform } from 'react-native';
import CommonStyles from "../../styles/CommonStyles";
import AddShopStyles from "../../styles/shop/AddShopStyles";

import {
    CompleteHeaderView,
    RowRightHasImageView,
    RowRightTextInputView,
    RowRightSwitchView,
    RowRightDateView,
    SelectPhotoView,
    CameraScreenView
} from 'Java110';

/**
 * 添加商品
 *
 *
 *
 * add by wuxw 2018-09-20
 */
export default class AddShopPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            shopLogo: "",
            shopName: "",
            shopPrice: "",
            openShopCount: "N",
            shopCount: "",
            shopDesc: "",
            startDate: "",
            endDate: "",
            imageModelShow:false,
            showTakePhoto:false,
        };

        this._onComplete = this._onComplete.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
        this._onShopItemClick = this._onShopItemClick.bind(this);
        this._onSwitchValueChange = this._onSwitchValueChange.bind(this);
        this._onOpenPhoto = this._onOpenPhoto.bind(this);
        this._onSelectPhoto = this._onSelectPhoto.bind(this);
        this._getPhotoData = this._getPhotoData.bind(this);
        this._onClosePhoto = this._onClosePhoto.bind(this);
    }

    /**
     * 页面渲染
     */
    render() {
        return (

            <View style={AddShopStyles.container}>
                {
                    this.state.showTakePhoto?
                    this._renderTakePhotoScreen()
                    :this.renderShopInfo()
                }
               
            </View>
        );
    }

    renderShopInfo(){
        return(
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
                <CompleteHeaderView
                    currentPageName={"添加商品"}
                    _onComplete={this._onComplete}
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
                {this._renderTakePhoto()}
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
                <RowRightHasImageView
                    leftText="商品logo"
                    imageData={{uri:this.state.shopLogo}}
                    _onClick={() => {this.setState({imageModelShow:true})}}
                    style={[AddShopStyles.shopItemRowView,{height:70}]}
                />
                <RowRightTextInputView
                    leftText="商品名称"
                    textPlaceholder={"请输入商品名称，必填"}
                    _onChangeText={(value) => { this.setState({ shopName: value, }) }}
                    inputValue={this.state.shopName}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightTextInputView
                    leftText="商品价格"
                    textPlaceholder={"请输入商品价格，必填，如12.00"}
                    _onChangeText={(value) => { this.setState({ shopPrice: value, }) }}
                    inputValue={this.state.shopPrice}
                    keyboardText={'numeric'}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightSwitchView
                    leftText="显示库存"
                    switchValue={false}
                    _onSwitchValueChange={(value) => { this._onSwitchValueChange(value) }}
                    style={AddShopStyles.shopItemRowView}
                />
                {
                    this.state.openShopCount == 'Y' ?
                        <RowRightTextInputView
                            leftText="库存数量"
                            textPlaceholder={"请输入商品数量，必填，如999"}
                            _onChangeText={(value) => { this.setState({ shopCount: value, }) }}
                            inputValue={this.state.shopCount}
                            keyboardText={'numeric'}
                            style={AddShopStyles.shopItemRowView}
                        />
                        : null
                }

                <RowRightTextInputView
                    leftText="商品描述"
                    textPlaceholder={"请输入商品描述，必填"}
                    _onChangeText={(value) => { this.setState({ shopDesc: value, }) }}
                    inputValue={this.state.shopDesc}
                    style={AddShopStyles.shopItemRowView}
                />
                <RowRightDateView
                    leftText="开始时间"
                    _onChangeDate={(date) => {
                        this.setState({
                            startDate: date,
                        })
                    }}
                    date={this.state.startDate}
                    textPlaceholder="请输入开始时间，必填"
                    style={AddShopStyles.shopItemRowView}
                />

                <RowRightDateView
                    leftText="结束时间"
                    _onChangeDate={(date) => {
                        this.setState({
                            endDate: date,
                        })
                    }}
                    textPlaceholder="请输入结束时间，必填"
                    date={this.state.endDate}
                    style={AddShopStyles.shopItemRowView}
                />
            </View>
        );
    }

    /**
     * 拍照組件
     */
    _renderTakePhoto() {
        return (
            <SelectPhotoView
                imageModelShow={this.state.imageModelShow}
                _onOpenPhoto={this._onOpenPhoto}
                _onSelectPhoto={this._onSelectPhoto}
            />
        );
    }

    /**
     * 显示拍照页面
     */
    _renderTakePhotoScreen(){
        return (
            <CameraScreenView
                _getPhotoData={this._getPhotoData}
                _onClosePhoto={this._onClosePhoto}
            />
        );
    }



    /**
     * 添加目录
     * @private
     */
    _onComplete() {
        //this.props.navigation.navigate("AddShopCatalog",{})

        this._onBackPage();
    }

    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }

    /**
     * 点击
     * @param viewId
     * @private
     */
    _onShopItemClick(viewId) {

    }

    /**
     * 开关类方法
     * @param viewId
     * @param value
     * @private
     */
    _onSwitchValueChange(value) {
        if (value == true) {
            this.setState({
                openShopCount: 'Y',
            });
        } else {
            this.setState({
                openShopCount: 'N',
            });
        }
    }

    /**
     * 打开相机
     */
    _onOpenPhoto(){
        this.setState({
            imageModelShow:false,
            showTakePhoto:true,
        });
    }

    /**
     * 相册中选取 图片
     */
    _onSelectPhoto(){

    }

    /**
     * 获取拍照信息
     * @param {照片信息} photoData 
     */
    _getPhotoData(photoData){
        this.setState({
            shopLogo:photoData,
            showTakePhoto:false,
        });
    }

    /**
     * 关闭拍照
     */
    _onClosePhoto(){
        this.setState({
            showTakePhoto:false,
        });
    }
}