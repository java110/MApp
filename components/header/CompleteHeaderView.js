import React,{Component} from 'react';

import {View,Text,Image, TouchableOpacity,StyleSheet,Platform} from 'react-native';


/**
 * 右边是完成 头信息 组件
 *
 *  用法：
 *
 * _onBackPage 返回时调用方法
 * currentPageName 当前页面名称
 * _onComplete 点击添加按钮调用函数
 * add by wuxw 2018-09-07
 */
export default class CompleteHeaderView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    /**
     * 渲染页面
     * @returns {XML}
     */
      render(){

          return(

              <View style={ ((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios') ?styles.container:styles.container_android_low}>

                  <View style={styles.header}>
                      <TouchableOpacity style={styles.leftButtonIcon} onPress={this._onBackPage.bind(this)} activeOpacity={1}>
                          <Text style={styles.headerText}>取消</Text>
                      </TouchableOpacity>
                      <View style={styles.centerView}>
                          <Text style={styles.centerText}>{this.props.currentPageName}</Text>
                      </View>
                      <TouchableOpacity style={styles.rightButtonIcon} onPress={this._onComplete.bind(this)} activeOpacity={1}>
                          <Text style={styles.headerText}>完成</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      }


    /**
     * 返回
     * @private
     */
    _onBackPage(){
        if(this.props.hasOwnProperty("_onBackPage")){
            this.props._onBackPage();
        }
    }

    /**
     * 点击添加按钮
     * @private
     */
    _onComplete(){
        if(this.props.hasOwnProperty("_onComplete")){
            this.props._onComplete();
        }
    }
}
/**
 * 样式
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F24E3E',
        justifyContent:'flex-end',
        paddingBottom:10
    },
    container_android_low:{
        flex: 1,
        backgroundColor:'#F24E3E',
        /*justifyContent:'flex-end',*/
        justifyContent:'center',
        /*paddingBottom:5*/
    },
    header:{
        /*paddingTop:10,*/
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    leftButtonIcon:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:10,
    },
    rightButtonIcon:{
        marginRight:10,
    },
    backImage:{
        height:25,
        width:25,
        tintColor:'#FFF',
        marginLeft:2
    },
    rightImage:{
        height:22,
        width:22,
        tintColor:'#FFF',
        marginRight:10
    },
    headerText:{
        color:'#FFF',
        fontSize:14
    },
    centerText:{
        color:'#FFF',
        fontSize:16
    }



});