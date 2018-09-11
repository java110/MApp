import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

/**
 * 订单列表页样式
 */
const AddShopCatalogStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        backgroundColor: '#F3F3F3'
    },

    catalogBodyView:{
        backgroundColor:'#FFF',
        height:120,
        marginTop:12,
        paddingLeft:10,
        paddingRight:10,
    },

    catalogBodyView_1:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        borderBottomColor:'#F3F3F3',
        borderBottomWidth:1,
    },
    catalogBodyView_1_text:{
        width:200,
        textAlign: "right"
    }
});


export default AddShopCatalogStyles