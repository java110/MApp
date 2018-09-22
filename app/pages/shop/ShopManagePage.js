import React,{Component} from 'react';

import {View, Image, Text, Platform, ScrollView, TouchableOpacity, ListView} from 'react-native';

import shopMobx from '../../mobx/shop/ShopMobx';
import CommonStyles from "../../styles/CommonStyles";
import ShopManageStyles from "../../styles/shop/ShopManageStyles";
import {observer} from "mobx-react";
import {Button} from "teaset";

import {
    PlusSearchHeaderView
} from 'Java110';

@observer
export default class ShopManagePage extends Component{


    // 构造
      constructor(props) {
        super(props);

          this.dsLeft = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          const dsRight = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          shopMobx.flushCatalogDataCheckStatus();
          let leftData = shopMobx.catalogData.slice();
          let shopItemData = shopMobx.shopItemData.slice();
        // 初始状态
        this.state = {
            rightDataSource : dsRight.cloneWithRows(shopItemData),
            leftDataSource : this.dsLeft.cloneWithRows(leftData),
        };
        this._onBackPage = this._onBackPage.bind(this);
        this._onSearch = this._onSearch.bind(this);
        this._onPlus = this._onPlus.bind(this);
        this._onPressMenu = this._onPressMenu.bind(this);
      }

    /**
     * 渲染页面
     * @returns {XML}
     */
      render(){
          console.log("render 方法执行",shopMobx.catalogData);
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
            <TouchableOpacity
                onPress={() => {this._onPressMenu(rowData.itemName,rowData.action)}}
                activeOpacity={0.5}
                style={[ShopManageStyles.cellBackStyle,{backgroundColor:rowData.check?'#FFF':'#F3F3F3'}]}
            >
                <View style={ShopManageStyles.cellBackStyleView}>
                    <Text style={ShopManageStyles.leftViewText} numberOfLines={2}>{rowData.itemName}</Text>
                </View>
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
                <View style={ShopManageStyles.rightViewRowUp}>
                    <View style={ShopManageStyles.rightViewRowLeft}>
                        <Image source={{uri:logoUri}} style={ShopManageStyles.shopLogo}/>
                    </View>

                    <View style={ShopManageStyles.rightViewRowRight}>
                        <Text style={ShopManageStyles.rightViewRowRightTitle} numberOfLines={1}>{rowData.name}</Text>
                        <View style={ShopManageStyles.rightViewRowRight_row}>
                            <Text style={ShopManageStyles.rightViewRowRightText}>库    存:</Text>
                            <Text style={[ShopManageStyles.rightViewRowRightText,ShopManageStyles.marginLeftText]} numberOfLines={1}>{rowData.shopCount}</Text>
                        </View>
                        <View style={ShopManageStyles.rightViewRowRight_row}>
                            <Text style={ShopManageStyles.rightViewRowRightText}>售    价:</Text>
                            <Text style={[ShopManageStyles.rightViewRowRightText,ShopManageStyles.marginLeftText,ShopManageStyles.colorText]} numberOfLines={1}>￥{rowData.salePrice}</Text>
                        </View>
                        <View style={ShopManageStyles.rightViewRowRight_row}>
                            <Text style={ShopManageStyles.rightViewRowRightText}>有效期:</Text>
                            <Text style={[ShopManageStyles.rightViewRowRightText,ShopManageStyles.marginLeftText]} numberOfLines={1}>{rowData.endDate}</Text>
                        </View>
                    </View>
                </View>
                <View style={ShopManageStyles.rightViewRowDown}>
                    <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={ShopManageStyles.rightViewRowDownButton} title="下架" onPress={() => {}}/>
                    <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={ShopManageStyles.rightViewRowDownButton} title="推荐" onPress={() => {}}/>
                    <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={[ShopManageStyles.rightViewRowDownButton]} title="修改商品" onPress={() => {}}/>
                    <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={ShopManageStyles.rightViewRowDownButton} title="查看商品" onPress={() => {}}/>
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
        console.log("componentWillReceiveProps方法调用");
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
        this.props.navigation.navigate("AddShop",{});
    }

    _onPressMenu(itemName,action){
        shopMobx.flushCatalogDataCheckStatusByCatalogId(action);
        let leftData = shopMobx.catalogData.slice();
        this.setState({
            leftDataSource : this.dsLeft.cloneWithRows(leftData),
        });
    }
}