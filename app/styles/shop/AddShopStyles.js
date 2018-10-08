import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

/**
 * 订单列表页样式
 */
const AddShopStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        backgroundColor: '#F3F3F3'
    },
    shopInfoTitleView:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
    },
    shopInfoTitleViewText:{
        fontSize:16,
    },
    shopInfoTitleViewTextSmall:{
        fontSize:12,
    },
    shopItemView:{
        //height:60,
        //flex:1,
    },
    shopItemRowView:{
        height:45,
    }
});


export default AddShopStyles