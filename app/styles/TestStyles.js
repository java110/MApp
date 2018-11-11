import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width * 0.94;
const TestStyles = StyleSheet.create({

    container:{
        flex:10
    },
    body:{
        backgroundColor:'#F5F5F5'
    },
    header:{
        marginTop:15
    },



});

export default TestStyles;
