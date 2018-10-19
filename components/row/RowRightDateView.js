import React,{Component} from 'react';

import {View,Image,Text,TouchableOpacity,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker'
/**
 * 时间行
 *
 *  leftText 左侧显示的文字
 *  _onChangeDate 文本改变回调方法
 *  date 输入框值
 * add by wuxw 2018-09-20
 */
export default class RowRightDateView extends Component{


    static propTypes ={
        leftText:PropTypes.string.isRequired,
        date:PropTypes.string.isRequired,
        _onChangeDate:PropTypes.func.isRequired,
        textPlaceholder:PropTypes.string.isRequired,
    };


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            date:this.props.date,
        };

        this._onChangeDate = this._onChangeDate.bind(this);
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
                      <DatePicker
                          style={{width: 200}}
                          date={this.state.date}
                          mode="date"
                          placeholder={this.props.textPlaceholder}
                          format="YYYY-MM-DD"
                          minDate="2018-01-01"
                          maxDate="2099-01-01"
                          confirmBtnText="确定"
                          cancelBtnText="取消"
                          showIcon={false}
                          customStyles={{
                              dateInput: {
                                  marginLeft: 5,
                                  borderWidth:0,
                                  alignItems:'flex-start',
                              },
                              placeholderText:{
                                  color:'#aaaaaa'
                              }
                              // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this._onChangeDate(date)}}
                      />
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
    _onChangeDate(date){
        if(this.props.hasOwnProperty("_onChangeDate")){
            this.props._onChangeDate(date);
        }

        this.setState({
            date : date
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
        marginLeft:0,
    },
    rowViewRightImage:{
        height:12,
        width:12
    },
});