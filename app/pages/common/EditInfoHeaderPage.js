import React,{Component} from 'react';

import {View,Text,TouchableOpacity,Platform} from 'react-native';
import ContextHeaderStyles from "../../styles/ContextHeaderStyles";
import EditInfoHeaderStyles from "../../styles/common/EditInfoHeaderStyles";

/**
 * 修改页面 头部信息
 *
 *
 * 取消    名称      完成
 *
 * add by wuxw 2018-08-23
 */
export default class EditInfoHeaderPage extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._onBackPage = this._onBackPage.bind(this);
        this._onComplete = this._onComplete.bind(this);
      }


      render(){
          return (
              <View style={ ((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios') ?EditInfoHeaderStyles.container:EditInfoHeaderStyles.container_android_low}>

                  <View style={EditInfoHeaderStyles.header}>
                      <TouchableOpacity style={EditInfoHeaderStyles.leftButtonIcon} onPress={this._onBackPage} activeOpacity={1}>
                          <Text style={EditInfoHeaderStyles.headerText}>取消</Text>
                      </TouchableOpacity>
                      <View style={EditInfoHeaderStyles.centerView}>
                          <Text style={EditInfoHeaderStyles.centerText}>{this.props.currentPageName}</Text>
                      </View>
                      <TouchableOpacity style={EditInfoHeaderStyles.rightButtonIcon} onPress={this._onComplete} activeOpacity={1}>
                          <Text style={EditInfoHeaderStyles.headerText}>完成</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      }

    /**
     * 取消按钮 返回
     * @private
     */
    _onBackPage(){
        this.props.navigation.pop();
    }

    /**
     * 点击完成
     * @private
     */
    _onComplete(){
        this.props._onComplete();
    }

}