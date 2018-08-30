import React,{Component} from 'react';

import {View, Text,TextInput,Platform,Alert} from 'react-native';

import personMobx from '../../mobx/person/PersonMobx';
import ModifyPersonCommonStyles from "../../styles/person/ModifyPersonCommonStyles";

import {observer} from "mobx-react";
import EditInfoHeaderPage from "../common/EditInfoHeaderPage";

/**
 * 修改 用户信息
 *
 * add by wuxw 2018-08-23
 */
@observer
export default class ModifyPersonPasswordPage extends Component{

// 构造
  constructor(props) {
    super(props);
    // 初始状态
      const { params } = this.props.navigation.state;
      this._onComplete = this._onComplete.bind(this);
    this.state = {
        _onComplete:this._onComplete,
        currentPageName:'修改密码'
      };

    //personMobx.modifyUserPassword(params.data);
  }


  render(){
      console.log("ModifyPersonNamePage render渲染");

      return (

          <View style={ModifyPersonCommonStyles.container}>
              <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?ModifyPersonCommonStyles.header:ModifyPersonCommonStyles.header_android_low}>
                <EditInfoHeaderPage {... this.state} {... this.props}/>
              </View>
              <View style={ModifyPersonCommonStyles.body}>
                  <View>
                    <TextInput style={ModifyPersonCommonStyles.textInputStyle} placeholder={'请输入当前密码'}
                               clearButtonMode={'while-editing'}
                               multiline={false}
                               maxLength={12}
                               underlineColorAndroid='transparent'
                               secureTextEntry={true}
                               onChangeText={(text) => personMobx.modifyUserPassword(text)}></TextInput>
                  </View>

                  <View>
                      <TextInput style={ModifyPersonCommonStyles.textInputStyle} placeholder={'请输入当前密码'}
                                 clearButtonMode={'while-editing'}
                                 multiline={false}
                                 maxLength={12}
                                 underlineColorAndroid='transparent'
                                 secureTextEntry={true}
                                 onChangeText={(text) => personMobx.modifyUserRePassword(text)}></TextInput>
                  </View>

                  <View>
                      <TextInput style={ModifyPersonCommonStyles.textInputStyle} placeholder={'请输入新密码'}
                                 clearButtonMode={'while-editing'}
                                 multiline={false}
                                 maxLength={12}
                                 underlineColorAndroid='transparent'
                                 secureTextEntry={true}
                                 onChangeText={(text) => personMobx.modifyUserNewPassword(text)}></TextInput>
                  </View>
              </View>
          </View>
      );
  }

    /**
     * 点击完成成
     * @private
     */
  _onComplete(){
        console.log("ModifyPersonNamePage 点击完成按钮");
        let returnMsg = personMobx.commitUpdatePassword();
        if('0000' === returnMsg){
            this.props.navigation.goBack();
        }else{
            Alert.alert('错误',returnMsg);
        }

  }

}