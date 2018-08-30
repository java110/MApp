import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';



const MyHeaderStyles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F24E3E',
        justifyContent:'flex-end'
    },
    headerImage:{
        height:80,
        width:80,
        borderRadius: 40
    },
    headerText:{
        fontSize:18,
        color:'#fff',
        marginTop:10,
        marginBottom:20
    }
});

export default MyHeaderStyles