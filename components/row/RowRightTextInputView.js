import React,{Component} from 'react';

import {View,Image,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import PropTypes from 'prop-types';
/**
 * 一行 右边是图片的组件
 *
 *  viewId ID 可以写一个不重复的值，将在_onClick 时回传
 *  leftText 左侧显示的文字
 *  textPlaceholder placeholder
 *  _onChangeText 文本改变回调方法
 *  inputValue 输入框值
 * add by wuxw 2018-09-20
 */
export default class RowRightTextInputView extends Component{


    static propTypes ={
        leftText:PropTypes.string.isRequired,
        textPlaceholder:PropTypes.string.isRequired,
        _onChangeText:PropTypes.func.isRequired,
    };


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            inputValue:this.props.inputValue,
        };

        this._onChangeText = this._onChangeText.bind(this);
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
                      <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={this.props.textPlaceholder}
                          style={{ marginLeft: 0, width: 220,}}
                          onChangeText={(value)=>{this._onChangeText(value)}}
                          keyboardType={this.props.keyboardText}
                          value={this.state.inputValue}
                          onBlur={()=>{if(this.props.hasOwnProperty('onBlur')){this.props.onBlur()}}}
                          ref="keyWordInput"
                          onSubmitEditing={() => { this.refs.keyWordInput.blur() }}/>
                  </View>
              </View>
          </View>
        );
    }

    componentWillReceiveProps(props){
        this.setState({
            inputValue : props.inputValue
        });  
    }

    /**
     * 点击
     * @param data 当前数据
     * @private
     */
    _onChangeText(value){
        if(this.props.hasOwnProperty("_onChangeText")){
            this.props._onChangeText(value);
        }

        this.setState({
            inputValue : value
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
        marginLeft:5,
    },
    rowViewRightImage:{
        height:12,
        width:12
    },
});