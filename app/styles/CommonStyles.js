import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

/**
 * 公用样式
 */
const CommonStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    justifyContent:{
        justifyContent:'center'
    },
    alignItems:{
        alignItems:'center'
    },
    header:{
        /*paddingTop:10,*/
        height:60
    },
    header_android_low:{
        /*paddingTop:10,*/
        height:45
    },
});

export default CommonStyles