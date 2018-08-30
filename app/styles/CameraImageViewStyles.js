import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height-60;
const CameraImageViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView:{
        flex:1,
        justifyContent:'flex-end',
    },
    cameraAction:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#000'
    },
    ImageView:{
        height:screenHeight,
        width:screenWidth,
        resizeMode: 'contain'
    },
    cameraActionImageSmall:{
        tintColor:'#FFF',
        height:40,
        width:40
    },
    actionText:{
        color:'#FFF',
        fontSize:18,
        marginLeft:10,
        marginRight:10,
    }
});


export default CameraImageViewStyles