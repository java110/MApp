import React,{Component} from 'react';

import {View,Text,Image, TouchableOpacity,Platform,ListView} from 'react-native';

import PlusHeaderView from "../../../components/header/PlusHeaderView";

import shopMobx from "../../mobx/shop/ShopMobx";
import ShopCatalogStyles from "../../styles/shop/ShopCatalogStyles";
import CommonStyles from "../../styles/CommonStyles";
import SimpleListView from "../../../components/listview/SimpleListView";

import {observer} from "mobx-react";

/**
 * 商品目录管理页面
 *
 * add by wuxw 2018-09-08
 */
@observer
export default class ShopCatalogPage extends Component{

    // 构造
      constructor(props) {
        super(props);
        this.currentPageName = "目录管理";
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 初始状态
        this.state = {
            dataSource : ds.cloneWithRows([])
        };
        this._onPlusCatalog = this._onPlusCatalog.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
        this._onPress = this._onPress.bind(this);
      }

    /**
     * 渲染页面
     */
    render(){
        console.log("shopCatalogPage","页面刷新");
        return(

            <View style={[ShopCatalogStyles.container,ShopCatalogStyles.body]}>
                {this._renderHeader()}
                {this._renderCatalogList()}
            </View>
        );


      }

    /**
     * 渲染头部信息
     * @returns {XML}
     * @private
     */
      _renderHeader(){

        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?CommonStyles.header:CommonStyles.header_android_low}>
            <PlusHeaderView
                    backPageName={"商品"}
                    currentPageName={this.currentPageName}
                    _onPlus={this._onPlusCatalog}
                    _onBackPage = {this._onBackPage}
                />
            </View>
        );
      }

    /**
     * 渲染 目录
     * @returns {XML}
     * @private
     */
      _renderCatalogList(){

          return (
              <View style={ShopCatalogStyles.catalogListView}>
                  <SimpleListView
                        data={shopMobx.catalogData.slice()}
                        _onPress={this._onPress}
                    />

              </View>
          );
      }


    /**
     * 点击
     * @param pageAction
     * @param message
     * @private
     */
    _onPress(action){
        this.props.navigation.navigate('EditShopCatalog',{catalogId:action});
    }





    /**
     * 添加目录
     * @private
     */
    _onPlusCatalog(){
        this.props.navigation.navigate("AddShopCatalog",{})
    }

    /**
     * 返回
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();
    }
}