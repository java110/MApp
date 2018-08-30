import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

/**
 * 订单列表页样式
 */
const OrderListStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    body:{
        backgroundColor:'#F3F3F3'
    },

    rowDataHeaderView:{
        height:40,
        backgroundColor:'#FFF',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:20,
    },
    rowDataHeaderViewText:{
        fontSize:14,

    },
    rowDataBodyView:{
        height:90,
        backgroundColor:'#FFF',
        paddingLeft:10,
        paddingRight:10,
        borderTopColor:"#F3F3F3",
        borderTopWidth:1,
        borderBottomColor:"#F3F3F3",
        borderBottomWidth:1


    },
    rowDataBodyViewHeight:{
        height:28,
    },
    rowDataHeaderView_1:{
        flexDirection:'row',
        alignItems:'center',
    },

    rowDataBodyView_1_1:{
        flexDirection:'row',
        alignItems:'center',
    },
    rowDataBodyView_1_1_text:{
        fontSize:12,
        color:'#666'
    },
    rowDataBodyView_1_1_text_address:{
        width:200
    },
    rowDataHeaderView_1_image:{
        width:22,
        height:22,
        tintColor:'#F24E3E'
    },


    rowDataFootView:{
        height:40,
        backgroundColor:'#FFF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-around',
    },
    rowDataFootView_1:{
        flexDirection:'row',
        alignItems:'center',
    },

    rowDataFootView_1_money:{
        color:'#F24E3E'
    },
    rowDataFootViewButton:{
        marginLeft:10,
    },
    rowDataFootView_1_Text:{
        fontSize:14,

    }



});

export default OrderListStyles