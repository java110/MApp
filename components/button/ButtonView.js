import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Modal,StyleSheet,Dimensions} from 'react-native';

import PropTypes from 'prop-types';

/**
 * 删除按钮
 *
 * _onClick 属性
 * add by wuxw 2018-09-11
 */
export default class ButtonView extends Component{

    static propTypes ={
        _onClick:PropTypes.func.isRequired,
        _viewButtonName:PropTypes.string.isRequired
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
   
        };
    }

    render(){

        let modalBackgroundStyle = {
            backgroundColor: this.state.showModalBackGroundColor ? 'rgba(0, 0, 0, 0.3)' : null,
        };

        return (
            <View style={[styles.container,this.props.buttonStyle]}>
                <TouchableOpacity style={styles.exitView} 
                    onPress={()=>{this.props._onClick()}}>
                    <Text style={styles.exitText}>{this.props._viewButtonName}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/**
 * 样式
 */
const fullWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('window').width * 0.94;
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    exitView:{
        backgroundColor:'#F24E3E',
        height:40,
        width:screenWidth,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    exitText:{
        fontSize:16,color:'#FFF'
    },
    personImageModel:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        //backgroundColor:'rgba(0, 0, 0, 0.3)'
    },

    modalView:{
        height:125,
        width:screenWidth,

    },

    modelViewSelect:{
        backgroundColor:'#FFF',
        borderRadius:10,
    },
    modelViewSelectRowLine:{
        borderBottomWidth:1,
        borderBottomColor:'#F5F5F5',
    },
    modelViewSelectRow:{
        height:53,
        justifyContent:'center',
        alignItems:'center'
    },
    modelViewSelectText:{
        fontSize:18,

    },
    modelButtonText:{
        color:'#F24E3E'
    },
    modelViewSelectCancel:{
        marginTop:8,

    },

});

