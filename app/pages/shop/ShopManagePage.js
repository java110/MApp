import React,{Component} from 'react';

import {View, Image, Text, Platform, ScrollView, TouchableOpacity, ListView,FlatList,SectionList} from 'react-native';

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
          shopMobx.flushCatalogDataCheckStatus();
        this.state = {
            leftData : shopMobx.catalogData.slice(),
        };

        this.pressLeft=false;
        this.pressLeftWait = false; //定时器是否在工作
        this.timers = [];
        this._onBackPage = this._onBackPage.bind(this);
        this._onSearch = this._onSearch.bind(this);
        this._onPlus = this._onPlus.bind(this);
        this._onPressMenu = this._onPressMenu.bind(this);
        this.itemChange = this.itemChange.bind(this);
        this._getItemLayout = this._getItemLayout.bind(this);
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
        let leftData = shopMobx.catalogData.slice();
        return(
            <View style={ShopManageStyles.leftView}>
                <FlatList
                    ref={(flatList)=>this._leftFlatList = flatList}
                    data={leftData}
                    keyExtractor={(item,index)=>item.action}
                    renderItem={this._renderLeftRow.bind(this)}
                    refreshing={false}
                    renderSeparator={this._renderSeparator}
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
    _renderLeftRow(rowData){
        //console.log("_renderLeftRow",rowData);
        rowData = rowData.item;
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
        let shopItemData = shopMobx.shopItemDataList;
        console.log("renderRightInfo",shopItemData);
        return(
            <View style={ShopManageStyles.rightView}>
                <SectionList
                    ref={(sectionList)=>this._sectionList = sectionList}
                    sections={shopItemData}
                    renderSectionHeader={this._renderRightHeader.bind(this)}
                    renderItem={this._renderRightRow.bind(this)}
                    keyExtractor={ (item) => item.shopId }
                    onViewableItemsChanged={ (info) => this.itemChange(info) }
                    getItemLayout={this._getItemLayout}
                />    
            </View>
        );
    }
    
    _getItemLayout(data, index) {
    // console.log("_getItemLayout",data,index);
    let [length, separator, header] = [118, 0, 25];
    // console.log("_getItemLayout",{length, offset: (length + separator) * index + header, index})
    // return {length, offset: (length + separator) * index + header, index};
    let tmpOffset = 0;
    for(let tmpIndex = 0 ;tmpIndex < index;tmpIndex ++){
        let dataCount = 0;
        for(let dataIndex = 0;dataIndex< data.length;dataIndex ++){
            dataCount += data[dataIndex].data.length+2;
            if(tmpIndex == 1 || tmpIndex == dataCount+1){
                tmpOffset = tmpOffset + header;
                break;
            }else if(tmpIndex == dataCount){ //这里应该是 section foot 不做处理
                break;
            }else if(tmpIndex == 0){
                tmpOffset == 0;
                break;
            }else if(tmpIndex < dataCount){
                tmpOffset = tmpOffset + length;
                break;
            }
        }
    }

    //console.log("_getItemLayout",data,index,tmpOffset);
    return {length, offset: tmpOffset, index};
    }

    _renderRightHeader({section}){
        return (
            <View style={ShopManageStyles.shopRightSectionTitleView}>
                <Text style={ShopManageStyles.shopRightSectionTitleText}>{section.catalogName}</Text>
            </View>
        );
    }

    _renderRightRow(rowData){
        //console.log('_renderRightRow',rowData);
        rowData = rowData.item;
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
                    <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={[ShopManageStyles.rightViewRowDownButton]} title="修改商品" onPress={() => {this.props.navigation.navigate('EditShop',{shopId:rowData.shopId})}}/>
                    <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={ShopManageStyles.rightViewRowDownButton} title="查看商品" onPress={() => {}}/>
                </View>
            </View>
        );
    }

    componentWillMount() {
        console.log("componentWillMount方法调用");
    }

    componentDidMount() {
        console.log("componentDidMount方法调用");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount方法调用");
        if(this.timers.length >0){
            for(let timerIndex = 0; timerIndex < this.timers.length;timerIndex++){
                clearTimeout(this.timers[timerIndex]);
            }
        }
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps方法调用");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate方法调用");
    }

    itemChange(info){
        console.log('itemChange pressLeft',this.pressLeft);
        if(this.pressLeft){ //说明在点击左边菜单，这里不做处理
            if(this.timers.length==0){
                let timer = setTimeout(()=>{
                    this.pressLeft = false;
                    this.timers.pop();
                    this.timer && clearTimeout(this.timer);
                },500);
                this.timers.push(timer);
            } 
            return ;
        }
        console.log("itemChange",info);
        let viewableItemsLenght = info.viewableItems.length;
        let catalogId ;
        if(viewableItemsLenght > 1){
            catalogId = info.viewableItems[1].section.catalogId;
        }else{
            catalogId = info.viewableItems[0].section.catalogId;
        }
        
        if (catalogId) {
            shopMobx.flushCatalogDataCheckStatusByCatalogId(catalogId);
            let leftData = shopMobx.catalogData.slice();
            this.setState({
                leftData : leftData,
            });
        }
      };


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
        
        // if(this.pressLeft){
        //     return ;
        // }
        this.pressLeft = true;
        shopMobx.flushCatalogDataCheckStatusByCatalogId(action);
        let leftData = shopMobx.catalogData.slice();
        this.setState({
            leftData : leftData,
        });
        //根据目录ID找 key
        let key = shopMobx.getShopSectionKeyByCatalogId(action);
        if(key == -1){ //当前目录没有商品信息
            this.pressLeft=false;
            return ;
        }
        console.log("_onPressMenu :: key",key);
        this._sectionList.scrollToLocation({ 
            sectionIndex: key,
            itemIndex: 0,
          viewOffset: 0, 
          viewPosition:0
        });

       
    }
}