import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const CameraScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView:{
        flex:1,
        justifyContent:'flex-end',
    },
    cameraAction:{
        height:120,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#000'
    },
    cameraActionImage:{
        tintColor:'#FFF',
        height:70,
        width:70
    },
    cameraActionImageSmall:{
        tintColor:'#FFF',
        height:40,
        width:40
    }
});


export default CameraScreenStyles