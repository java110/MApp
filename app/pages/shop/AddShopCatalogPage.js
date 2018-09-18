import React,{Component} from 'react';

import {View,Text,Image, TouchableOpacity,Platform,TextInput} from 'react-native';

import PlusHeaderView from "../../../components/header/PlusHeaderView";

import shopMobx from "../../mobx/shop/ShopMobx";
import AddShopCatalogStyles from "../../styles/shop/AddShopCatalogStyles";
import CompleteHeaderView from "../../../components/header/CompleteHeaderView";
import CommonStyles from "../../styles/CommonStyles";

export default class AddShopCatalogPage extends Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            catalogSeq:(shopMobx.catalogData.length+1)+"",
        };

        shopMobx.reloadShopCatalogData();

          this._onComplete = this._onComplete.bind(this);
          this._onBackPage = this._onBackPage.bind(this);
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
                    currentPageName={"添加目录"}
                    _onComplete={this._onComplete}
                    _onBackPage = {this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 添加目录组件
     * @private
     */
    _renderCatalogBody(){

        return (
            <View style={AddShopCatalogStyles.catalogBodyView}>
                <View style={AddShopCatalogStyles.catalogBodyView_1}>
                    <View>
                        <Text>目录名称</Text>
                    </View>
                    <View>
                        <TextInput
                            style={AddShopCatalogStyles.catalogBodyView_1_text}
                            placeholder={"必填，请输入目录名称"}
                            clearButtonMode={'while-editing'}
                            multiline={false}
                            maxLength={12}
                            underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({catalogName:text})}
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
                            value={this.state.catalogSeq}
                            placeholder={"必填，请输入目录序号"}
                            clearButtonMode={'while-editing'}
                            multiline={false}
                            maxLength={12}
                            underlineColorAndroid='transparent'
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                const newText = text.replace(/[^\d]+/, "");
                                this.setState({catalogSeq:newText})
                            }}
                        ></TextInput>
                    </View>
                </View>
            </View>
        );


    }

    /**
     * 添加目录
     * @private
     */
    _onComplete(){
        //this.props.navigation.navigate("AddShopCatalog",{})
        shopMobx.addShopCatalog(this.state.catalogName,this.state.catalogSeq);
        this._onBackPage();
    }

    /**
     * 返回
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();
    }

}