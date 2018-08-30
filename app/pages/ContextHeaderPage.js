import React,{Component} from 'react'

import { AppRegistry, Text, View ,Image,Platform,BackHandler,TouchableOpacity} from 'react-native';
import ContextHeaderStyles from "../styles/ContextHeaderStyles";
import {observer} from "mobx-react";

/**
 * 内容页 头部
 */
@observer
export default class ContextHeaderPage extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
        //const store = this.props.store;
      }

      render(){
          return (
              <View style={ ((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios') ?ContextHeaderStyles.container:ContextHeaderStyles.container_android_low}>

                  <View style={ContextHeaderStyles.header}>
                      <TouchableOpacity style={ContextHeaderStyles.leftButtonIcon} onPress={this._onBackPage.bind(this)} activeOpacity={1}>

                              <Image source={require('../images/back.png')} style={ContextHeaderStyles.backImage}/>
                              <Text style={ContextHeaderStyles.headerText}>{this.props.backPageName}</Text>

                      </TouchableOpacity>
                      <View style={ContextHeaderStyles.centerView}>
                          <Text style={ContextHeaderStyles.headerText}>{this.props.currentPageName}</Text>
                      </View>
                      <View style={ContextHeaderStyles.rightView}>
                          { this.props.hasOwnProperty('_onSetting')?
                              <TouchableOpacity onPress={this.props._onSetting} activeOpacity={1}>
                                  <Image source={require('../images/setting.png')} style={ContextHeaderStyles.rightImage}/>
                              </TouchableOpacity>:null
                          }

                      </View>
                  </View>
              </View>
          );
      }

      _onBackPage(){
          this.props._onBackPage();
          this.props.navigation.goBack();
      }


}