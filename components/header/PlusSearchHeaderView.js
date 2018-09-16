import React,{Component} from 'react';

import {View,Text, Image, TouchableOpacity,StyleSheet,Platform,Dimensions,TextInput} from 'react-native';
import PropTypes from 'prop-types';
/**
 * 头部添加 搜索 组件
 *
 * 用法：
 *
 * _onBackPage 返回时调用方法
 * _onSearch 当前页面名称
 * _onPlus 点击添加按钮调用函数
 * placeholder 搜索提示
 *
 *
 * add by wuxw 2018-09-06
 */

export default class PlusSearchHeaderView extends Component{

    static propTypes ={
        _onBackPage:PropTypes.func.isRequired,
        _onSearch:PropTypes.func.isRequired,
        _onPlus:PropTypes.func.isRequired,
        placeholder:PropTypes.string.isRequired
    };



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            searchText:"",
        };

        this._onChangeText = this._onChangeText.bind(this);
    }

    /**
     * 页面渲染
     * @returns {XML}
     */
    render(){
        return (
            <View style={ ((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios') ?styles.container:styles.container_android_low}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftButtonIcon} onPress={this._onBackPage.bind(this)} activeOpacity={1}>
                        <Image source={require('../../icon/header/back.png')} style={styles.backImage}/>
                    </TouchableOpacity>
                    <View style={styles.centerView}>
                        <Image source={require('../../icon/search/search.png')} style={{ tintColor:'#FFF', width: 15, height: 15,marginLeft:20 }}></Image>
                        <TextInput underlineColorAndroid="transparent"
                                   placeholder={this.props.placeholder}
                                   placeholderTextColor="#FFF"
                                   style={{ marginLeft: 5, width: 180,backgroundColor:'#F20305',color:'#FFF',height:40 }}
                                   onChangeText={(value) => {this._onChangeText(value)}}
                                   value={this.state.searchText}
                                   ref="keyWordInput"
                                   onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                        </TextInput>
                    </View>
                    <View style={styles.rightView}>
                            <TouchableOpacity onPress={this._onPlus.bind(this)} activeOpacity={1}>
                                <Image source={require('../../icon/header/plus.png')} style={styles.rightImage}/>
                            </TouchableOpacity>

                    </View>
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

    _onChangeText(value){
        this.setState({
            searchText:value,
        });
        if(this.props.hasOwnProperty("_onSearch")){
            this.props._onSearch(value);
        }
    }

    /**
     * 点击添加按钮
     * @private
     */
    _onPlus(){
        if(this.props.hasOwnProperty("_onPlus")){
            this.props._onPlus();
        }
    }
}

const holdScreenWidth = Dimensions.get('window').width;
const screenWidth = holdScreenWidth /3;

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#F24E3E',
        justifyContent:'flex-end',
        //paddingBottom:10
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
        height:45,
    },
    leftButtonIcon:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:50
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
        fontSize:16
    },
    centerView:{
        width:200,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        height:30,
        backgroundColor:'#F20305'
    },
    rightView:{
        flexDirection:'row',
        width:50,
        justifyContent:'flex-end',
        alignItems:'center',
    }
});

