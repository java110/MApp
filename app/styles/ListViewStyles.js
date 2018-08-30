import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';



const ListViewStyles=StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#F5F5F5',
        backgroundColor:'#FFF',
        height:44,
        alignItems:'center'
    },
    itemStart:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft:12,
        alignItems:'center'
    },
    itemEnd:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:12,
        alignItems:'center'
    },
    itemImage:{
        height:22,
        width:22,
        resizeMode:'cover',
        tintColor:'#696969'
    },
    itemActionImage:{
        height:12,
        width:12
    },
    itemText:{
        marginLeft:8,
        color:'#000',
        fontSize:16
    }
});

export default ListViewStyles