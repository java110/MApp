import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

/**
 * 欢迎界面样式
 */
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const WelcomeStyles=StyleSheet.create({
    backImage:{
        width: screenWidth,
        height: screenHeight
    }
});

export default WelcomeStyles