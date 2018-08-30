import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height * 0.25;
const MyStyles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column'
    },
    header:{
        /*paddingTop:10,*/
        height:screenHeight
    },
    body:{
        height:200
    }
});

export default MyStyles