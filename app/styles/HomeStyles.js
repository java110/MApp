import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

/**
 * 欢迎界面样式
 */
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const HomeStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    menuIcon: {
        width: 26,
        height: 26,
        marginBottom:-2,
        tintColor:'#8a8a8a',
    },
    menuIconTextColor:{
        color:'#F24E3E'
    },
    menuIconImageColor:{
        tintColor:'#F24E3E'
    }
});

export default HomeStyles