import React,{Component} from 'react';

import {View,Image,Text,TouchableOpacity,StyleSheet,TextInput,Switch} from 'react-native';
import PropTypes from 'prop-types';
/**
 * 一行 右边是Switch 开关
 *
 *  viewId ID 可以写一个不重复的值，将在_onSwitchValueChange 时回传
 *  leftText 左侧显示的文字
 *  _onSwitchValueChange 开关转换
 *  switchValue 输入框值
 * add by wuxw 2018-09-20
 */
export default class RowRightSwitchView extends Component{


    static propTypes ={
        leftText:PropTypes.string.isRequired,
        _onSwitchValueChange:PropTypes.func.isRequired,
        switchValue:PropTypes.bool.isRequired,
    };


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            switchValue:this.props.switchValue,
        };

        this._onSwitchValueChange = this._onSwitchValueChange.bind(this);
      }

    /**
     * 渲染
     */
    render(){

        return (
          <View
              style={[styles.rowView,this.props.style]}
          >
              <View style={styles.rowView_0}>
                  <View style={[styles.rowView_1_left,this.props.style]}>
                      <Text style={styles.rowViewText}>{this.props.leftText}</Text>
                  </View>
                  <View style={styles.rowView_1}>
                      <Switch
                          value={this.state.switchValue}
                          onTintColor='#F24E3E'
                          thumbTintColor='#FFFFFF'
                          onValueChange={(value)=>{this._onSwitchValueChange(value)}}
                      ></Switch>
                  </View>
              </View>
          </View>
        );
    }

    /**
     * 点击
     * @param data 当前数据
     * @private
     */
    _onSwitchValueChange(value){
        if(this.props.hasOwnProperty("_onSwitchValueChange")){
            this.props._onSwitchValueChange(value);
        }

        this.setState({
            switchValue : value
        });
    }
}

/**
 * 样式
 */
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    rowView:{
        backgroundColor:'#FFF',
        paddingLeft:10,
        paddingRight:10,
    },
    rowViewText:{
        fontSize:16,
        color:'#333'
    },
    rowView_0:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:"#F3F3F3",
    },
    rowView_1_left:{
        //width:70,
        justifyContent:'center'
    },
    rowView_1:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:0,
    },
    rowViewRightImage:{
        height:12,
        width:12
    },
});