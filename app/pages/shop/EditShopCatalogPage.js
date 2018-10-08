import React,{Component} from 'react';

import {View,Text,Image, TouchableOpacity,Platform,TextInput} from 'react-native';

import PlusHeaderView from "../../../components/header/PlusHeaderView";

import shopMobx from "../../mobx/shop/ShopMobx";
import AddShopCatalogStyles from "../../styles/shop/AddShopCatalogStyles";
import CompleteHeaderView from "../../../components/header/CompleteHeaderView";
import CommonStyles from "../../styles/CommonStyles";
import {observer} from "mobx-react";

import DeleteButtonView from "../../../components/button/DeleteButtonView";

@observer
export default class EditShopCatalogPage extends Component{



    // 构造
      constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;
        // 初始状态
        this.state = {
            catalogId : params.catalogId,
        };


          this._onComplete = this._onComplete.bind(this);
          this._onBackPage = this._onBackPage.bind(this);
          this._onDelete = this._onDelete.bind(this);
      }

    /**
     * 渲染页面
     * @returns {XML}
     */
      render(){
          return (

              <View style={AddShopCatalogStyles.container}>
                  {this._renderHeader()}
                  {this._renderCatalogBody()}
                  {this._renderDeleteCatalog()}
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
                    currentPageName={"修改目录"}
                    _onComplete={this._onComplete}
                    _onBackPage = {this._onBackPage}
                />
            </View>
        );
    }

    componentWillMount() {

    }
    /**
     * 添加目录组件
     * @private
     */
    _renderCatalogBody(){
        console.log("_renderCatalogBody",this.state);
        return (
            <View style={AddShopCatalogStyles.catalogBodyView}>
                <View style={AddShopCatalogStyles.catalogBodyView_1}>
                    <View>
                        <Text>目录名称</Text>
                    </View>
                    <View>
                        <TextInput
                            style={AddShopCatalogStyles.catalogBodyView_1_text}
                            value={shopMobx.currentModifyCatalogData.itemName}
                            placeholder={"必填，请输入目录名称"}
                            clearButtonMode={'while-editing'}
                            multiline={false}
                            maxLength={12}
                            underlineColorAndroid='transparent'
                        onChangeText={(text) => {shopMobx.refreshCurrentCatalogDataName(text)}}
                        ></TextInput>
                    </View>
                </View>

                <View style={AddShopCatalogStyles.catalogBodyView_1}>
                    <View>
                        <Text>序号</Text>
                    </View>
                    <View>
                        <TextInput
                            style={AddShopCatalogStyles.catalogBodyView_1_text}
                            value={shopMobx.currentModifyCatalogData.itemValue}
                            placeholder={"必填，请输入目录序号"}
                            clearButtonMode={'while-editing'}
                            multiline={false}
                            maxLength={12}
                            underlineColorAndroid='transparent'
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, "");
                                shopMobx.refreshCurrentCatalogDataSeq(newText);
                            }}
                        ></TextInput>
                    </View>
                </View>
            </View>
        );


    }

    /**
     * 删除目录
     * @returns {XML}
     * @private
     */
    _renderDeleteCatalog(){
        return (
            <View style={{marginTop:12,flex:1}}>
                <DeleteButtonView
                    _onDelete = {this._onDelete}
                    _viewButtonName = "删除目录"
                    ></DeleteButtonView>
            </View>
        );
    }

    componentDidMount() {
        //获取当前需要修改商品目录信息
        shopMobx.refreshCurrentModifyCatalogData(this.state.catalogId);
        console.log("componentDidMount",this.state);
    }

    /**
     * 添加目录
     * @private
     */
    _onComplete(){
        //this.props.navigation.navigate("AddShopCatalog",{})
        shopMobx.editShopCatalog(this.state.catalogId);
        this._onBackPage();
    }

    /**
     * 返回
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();
    }

    _onDelete(){
        shopMobx.deleteCurrentCatalog();
        this._onBackPage();
    }

}