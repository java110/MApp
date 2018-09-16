import React,{Component} from 'react';

import {View, Image, Text, Platform, ScrollView, TouchableOpacity, ListView} from 'react-native';

import shopMobx from '../../mobx/shop/ShopMobx';
import CommonStyles from "../../styles/CommonStyles";
import PlusSearchHeaderView from "../../../components/header/PlusSearchHeaderView";
import ShopManageStyles from "../../styles/shop/ShopManageStyles";
import {observer} from "mobx-react";

@observer
export default class ShopManagePage extends Component{


    // 构造
      constructor(props) {
        super(props);

          const dsLeft = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          const dsRight = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          let leftData = shopMobx.catalogData.slice();
          let shopItemData = shopMobx.shopItemData.slice();
        // 初始状态
        this.state = {
            rightDataSource : dsRight.cloneWithRows(shopItemData),
            leftDataSource : dsLeft.cloneWithRows(leftData),
        };

        this._onBackPage = this._onBackPage.bind(this);
        this._onSearch = this._onSearch.bind(this);
          this._onPlus = this._onPlus.bind(this);
      }

    /**
     * 渲染页面
     * @returns {XML}
     */
      render(){
          return (
              <View style={ShopManageStyles.container}>
                  {this.renderHeader()}
                  {this.renderBody()}
              </View>
          );
      }

    /**
     * 头部信息
     * @returns {XML}
     */
    renderHeader(){

          return (
              <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?CommonStyles.header:CommonStyles.header_android_low}>
                  <PlusSearchHeaderView
                      _onBackPage={this._onBackPage}
                      _onSearch={this._onSearch}
                      _onPlus={this._onPlus}
                      placeholder="请输入商品名称"
                  />
              </View>
          );

    }

    /**
     *  内容信息
     */
    renderBody(){
        return (
            <View style={[ShopManageStyles.container,ShopManageStyles.body]}>
                {this.renderLeftInfo()}
                {this.renderRightInfo()}
            </View>
        )
    }

    /**
     * 左边显示商品目录
     */
    renderLeftInfo(){
        return(
            <ScrollView style={ShopManageStyles.leftView}>
                <ListView
                    dataSource={this.state.leftDataSource}
                    renderRow={this._renderLeftRow.bind(this)}
                    contentContainerStyle={ShopManageStyles.listViewStyle}
                    removeClippedSubviews={false}
                    enableEmptySections={true}
                    renderSeparator={this._renderSeparator}
                />
            </ScrollView>
        );
    }

    /**
     *
     * @param rowData
     * @returns {XML}
     * @private
     */
    _renderLeftRow(rowData){
        return (
            <TouchableOpacity onPress={() => {this._onPressMenu(rowData.itemName,rowData.action)}} activeOpacity={0.5} style={ShopManageStyles.cellBackStyle}>
                <Text style={ShopManageStyles.leftViewText} numberOfLines={2}>{rowData.itemName}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 右边显示商品目录
     */
    renderRightInfo(){
        return(
            <ScrollView style={ShopManageStyles.rightView}>
                <ListView
                    dataSource={this.state.rightDataSource}
                    renderRow={this._renderRightRow.bind(this)}
                    contentContainerStyle={ShopManageStyles.listViewStyle}
                    removeClippedSubviews={false}
                    enableEmptySections={true}
                />
            </ScrollView>
        );
    }

    _renderRightRow(rowData){

        let logoUri = ""; //这里写为默认图片地址
        for(let shopPhoneIndex = 0 ; shopPhoneIndex < rowData.shopPhoto.length;shopPhoneIndex++){
            let sPhone = rowData.shopPhoto[shopPhoneIndex];
            if(sPhone.shopPhotoTypeCd == 'L'){
                logoUri = sPhone.photo;
                break;
            }
        }
        return (
            <View style={ShopManageStyles.rightViewRow}>
                <View style={ShopManageStyles.rightViewRowLeft}>
                    <Image source={{uri:logoUri}} style={ShopManageStyles.shopLogo}/>
                </View>

                <View style={ShopManageStyles.rightViewRowRight}>
                    <Text>{rowData.name}</Text>
                    <View>
                        <Text>售价</Text>
                        <Text>￥{rowData.salePrice}</Text>
                    </View>
                </View>
            </View>
        );
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps() {

    }

    /**
     * 返回按钮
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();
    }

    /**
     * 搜索
     * @private
     */
    _onSearch(value:String){
        console.log("搜索文本为：",value);
    }

    _onPlus(){
        this.props.navigation.navigate("Home",{});
    }
}