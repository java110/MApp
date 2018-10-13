import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';


const holdScreenWidth = Dimensions.get('window').width;
const CommunityStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    body:{
        backgroundColor:'#F3F3F3'
    },
    header:{
        /*height:135,*/
        height:60
    },
    header_android_low:{
        /*height:120,*/
        height:45
    },
    
});

export default CommunityStyles