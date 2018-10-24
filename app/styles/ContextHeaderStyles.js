import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';


const holdScreenWidth = Dimensions.get('window').width;
const screenWidth = holdScreenWidth /3;
const ContextHeaderStyles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F24E3E',
        justifyContent:'flex-end',
        paddingBottom:10
    },
    container_android_low:{
        flex: 1,
        backgroundColor:'#F24E3E',
        /*justifyContent:'flex-end',*/
        justifyContent:'center',
        /*paddingBottom:5*/
    },
    header:{
        /*paddingTop:10,*/
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    leftButtonIcon:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:screenWidth
    },
    backImage:{
        height:25,
        width:25,
        tintColor:'#FFF',
        marginLeft:2
    },
    rightImage:{
        height:22,
        width:22,
        tintColor:'#FFF',
        marginRight:10
    },
    headerText:{
        color:'#FFF',
        fontSize:16,
        fontWeight: '200',
    },
    centerView:{
        
        width:screenWidth,
        justifyContent:'center',
        alignItems:'center',
    },
    rightView:{
        width:screenWidth,
        justifyContent:'flex-end',
    }
});

export default ContextHeaderStyles