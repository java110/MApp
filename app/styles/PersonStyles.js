import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width * 0.94;
const PersonStyles=StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        /*paddingTop:10,*/
        height:60
    },
    header_android_low:{
        /*paddingTop:10,*/
        height:45
    },
    body:{
        height:200
    },
    rowSpace:{
        marginTop:15
    },
    personImageModel:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        //backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    modalView:{
        height:200,
        width:screenWidth,

    },
    modelViewSelect:{
        backgroundColor:'#FFF',
        borderRadius:5,
    },
    modelViewSelectRowLine:{
        borderBottomWidth:1,
        borderBottomColor:'#F5F5F5',
    },
    modelViewSelectRow:{
        height:55,
        justifyContent:'center',
        alignItems:'center'
    },
    modelViewSelectText:{
        fontSize:20,

    },
    modelViewSelectCancel:{
        marginTop:15,

    },

});

export default PersonStyles