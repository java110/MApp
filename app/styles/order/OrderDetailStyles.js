import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const holdScreenWidth = Dimensions.get('window').width;
const newsScreenWidth = holdScreenWidth - 140;
const screenWidth = holdScreenWidth * 0.20;
const OrderDetailStyles=StyleSheet.create({
    container: {
        flex: 1,
    },
    body:{
        backgroundColor:'#FFF'
    },
    rowDataHeaderView:{
        height:50,
        backgroundColor:'#EDEDED',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:20,
    },
    rowDataHeaderViewText:{
        fontSize:14,

    },
    rowDataHeaderView_1:{
        flexDirection:'row',
        alignItems:'center',
    },
    rowDataHeaderView_1_image:{
        width:22,
        height:22,
        tintColor:'#F24E3E'
    },
    orderItemsView:{
        height:80,
        flexDirection:'row',
        alignItems:'center'

    },
    orderItemsImage:{
        height:40,
        width:40,
    }
});

export default OrderDetailStyles