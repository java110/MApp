import React,{Component} from 'react';

import {View, Text, TextInput, Platform, TouchableOpacity,Image} from 'react-native';

import personMobx from '../../mobx/person/PersonMobx';
import ModifyPersonCommonStyles from "../../styles/person/ModifyPersonCommonStyles";

import {observer} from "mobx-react";
import EditInfoHeaderPage from "../common/EditInfoHeaderPage";
import ModifyPersonSexStyles from "../../styles/person/ModifyPersonSexStyles";

/**
 * 修改 用户信息
 *
 * add by wuxw 2018-08-23
 */
@observer
export default class ModifyPersonSexPage extends Component{

// 构造
  constructor(props) {
    super(props);
    // 初始状态
      const { params } = this.props.navigation.state;
      this._onComplete = this._onComplete.bind(this);
    this.state = {
        _onComplete:this._onComplete,
        currentPageName:'修改性别'
      };

    personMobx.modifyUserAddress(params.data);
  }


  render(){
      console.log("ModifyPersonSexPage render渲染");
      console.log("personMobx 数据",personMobx);
      return (

          <View style={ModifyPersonCommonStyles.container}>
              <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?ModifyPersonCommonStyles.header:ModifyPersonCommonStyles.header_android_low}>
                <EditInfoHeaderPage {... this.state} {... this.props}/>
              </View>
              <View style={ModifyPersonCommonStyles.body}>
                  <TouchableOpacity style={[ModifyPersonSexStyles.sexRow,ModifyPersonSexStyles.bottomLine,ModifyPersonSexStyles.sexContext]}
                                    onPress={() => personMobx.modifySex(1)}>
                      <Text style={ModifyPersonSexStyles.itemText}>男</Text>
                      {
                            personMobx.sex === 1 ? <Image style={ModifyPersonSexStyles.checkImage} source={require("../../images/check.png")}></Image> :null
                      }
                  </TouchableOpacity>
                  <TouchableOpacity style={ModifyPersonSexStyles.sexRow}
                                    onPress={() => personMobx.modifySex(0)}>
                      <Text style={ModifyPersonSexStyles.itemText}>女</Text>
                      {
                          personMobx.sex === 0 ? <Image style={ModifyPersonSexStyles.checkImage} source={require("../../images/check.png")}></Image> :null
                      }
                  </TouchableOpacity>
              </View>
          </View>
      );
  }

    /**
     * 点击完成成
     * @private
     */
  _onComplete(){
        console.log("ModifyPersonSexPage 点击完成按钮");
        personMobx.commitUpdateSex();
        this.props.navigation.goBack();
  }

}