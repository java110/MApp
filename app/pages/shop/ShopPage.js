import React,{Component} from 'react';

import {View, Image, Text, Platform, ScrollView, TouchableOpacity, ListView} from 'react-native';
import ShopStyles from "../../styles/shop/ShopStyles";
import IndexHeaderPage from "../index/IndexHeaderPage";

import shopMobx from '../../mobx/shop/ShopMobx';

/**
 * 商品页面
 *
 * 主要展示 商品功能
 *
 * 增加商品
 *
 * 查看商品
 *
 * add by wuxw 2018-09-05
 */
export default class ShopPage extends Component{



    // 构造
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        let data = shopMobx.shopData.slice();
        // 初始状态
        this.state = {
            header:{backPageName:'',
                currentPageName:"商品管理",
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            },
            dataSource : ds.cloneWithRows(data),
        };

        this._onPressMenu = this._onPressMenu.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
    }

    /**
     *  {this.renderShopCountView()}
     * 页面渲染
     * @returns {XML}
     */
    render(){
        console.log("进入ShopPage页面 render");
        return (
            <View style={[ShopStyles.container,ShopStyles.body]}>
                {this.renderHeader()}

                <ScrollView>

                    {this.renderShopMenuView()}
                </ScrollView>
            </View>
        );
    }


    /**
     * 渲染头部信息
     * @returns {XML}
     */
    renderHeader(){
        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?ShopStyles.header:ShopStyles.header_android_low}>
                <IndexHeaderPage pageTitle={"商品管理"}/>
            </View>
        );

    }


    /**
     * 显示订单菜单类
     * @returns {XML}
     */
    renderShopMenuView(){
        return (
            <View style={ShopStyles.menuView}>
                <View style={ShopStyles.shopInfoTitle}>
                    <Text style={ShopStyles.shopInfoTitleText}>商品服务</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          contentContainerStyle={ShopStyles.listViewStyle}
                          removeClippedSubviews={false}
                >

                </ListView>
            </View>
        );
    }


    _renderRow(rowData){

        return (
            <TouchableOpacity onPress={() => {this._onPressMenu(rowData.routeName,rowData.name,rowData.menuCd)}} activeOpacity={0.5} style={ShopStyles.cellBackStyle}>
                <View style={ShopStyles.menuViewImageView}>
                    <Image source={rowData.imagePath} style={ShopStyles.menuViewImage}/>
                    <Text style={ShopStyles.menuViewText}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 点击菜单按钮
     *
     * @private
     */
    _onPressMenu(routeName,name,menuCd){
        let tmpName = name.endsWith('订单')?name:name+"订单";
        console.log("_onPressMenu",routeName);
        this.props.navigation.navigate(routeName,{'name':tmpName,'menuCd':menuCd});
    }


    _onBackPage(){

    }
}