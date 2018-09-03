import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const holdScreenWidth = Dimensions.get('window').width;
const newsScreenWidth = holdScreenWidth * 0.66;
const screenWidth = holdScreenWidth * 0.20;
const orderInfoLeftWidth = holdScreenWidth * 0.6;
const orderInfoRightWidth = holdScreenWidth * 0.35;
const orderButtonWidth = holdScreenWidth - 10;
const OrderDetailStyles=StyleSheet.create({
    container: {
        flex: 1,
    },
    body:{
        backgroundColor:'#F3F3F3'
    },

    orderBlockView:{
      //marginBottom:10,
        //marginTop:10,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#FFF',
        marginBottom:10,
    },
    rowDataHeaderView:{
        height:50,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
/*        paddingLeft:10,
        paddingRight:10,*/
        borderBottomWidth:1.5,
        borderBottomColor:"#DEDEDE"

    },
    rowDataHeaderViewText:{
        fontSize:16,
        color:'#333',

    },
    rowDataHeaderViewOrderItemsText:{
        fontSize:14,
        color:'#7B7B7B',

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

    listViewItem:{
      marginTop:5,
    },
    orderItemsView:{
        height:90,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    orderItemsImageView:{
        width:90,
        height:90,
        justifyContent:'center',
        alignItems:'flex-start'
    },

    orderItemsImage:{
        height:80,
        width:80,
        borderRadius: 4
    },

    orderItemsLeftView:{
        width:newsScreenWidth,
        height:90,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },

    orderItemsCenterTextView:{
        width:newsScreenWidth,
        height:70,
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },

    orderItemsCenterText_1:{
        fontSize:14,
        color:"#7B7B7B",
        width:newsScreenWidth,
        height:30
    },

    orderItemsCenterTextView_1:{
        flexDirection:'row',
    },
    orderItemsCenterText_2:{
        fontSize:12,
        color:"#7B7B7B",
    },
    orderItemsCenterText_3:{
        fontSize:12,
        color:"#7B7B7B",
        marginLeft:5,
    },

    badgeView:{
        marginTop:5
    },
    commonBadge:{
        backgroundColor: '#F24E3E',
        padding:5,
        marginRight:10
    },
    commonBadgeText:{color: '#fff',fontSize:12},


    orderItemsRightView:{
        width:60,
        height:90,
        justifyContent:'center',
        alignItems:'center'

    },

    orderItemsRightTextView:{
        width:60,
        height:70,
        justifyContent:'flex-start',
        alignItems:'flex-end',
    },
    orderItemsRightText_1:{
        fontSize:14,
        color:"#7B7B7B",
        height:30

    },
    orderItemsRightText_2:{
        fontSize:12,
        color:"#7B7B7B",
    },

    orderView:{
        //paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#FFF',
/*        borderBottomWidth:2,
        borderBottomColor:"#F3F3F3"*/

    },
    orderDetailInfoView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        height:32,
      /*  borderBottomWidth:0.5,
        borderBottomColor:"#F3F3F3"*/
    },
    orderDetailInfoRowView:{
        flexDirection:'row',
    },
    orderDetailInfoRowViewLeft:{
      width:orderInfoLeftWidth,
    },
    orderDetailInfoRowViewRight:{
        width:orderInfoRightWidth,
    },
    orderDetailInfoHeaderView:{
        height:30,
    },
    OrderDetailInfoHeaderText:{
        fontSize:16,
        color:"#555",
    },
    OrderDetailInfoText:{
        fontSize:14,
        color:"#7B7B7B",
    },
    OrderDetailInfoTextValue:{
        fontSize:12,
        color:"#7B7B7B",
    },
    OrderDetailInfoTextValue_address:{
        width:200
    },
    OrderDetailInfoTextValueMoney:{
        color:"#F24E3E",
    },
    OrderInfoButton:{
        marginLeft:10,
        backgroundColor:'#FFF',
        borderColor:'#F24E3E',
        borderWidth:1,
    },
    orderInfoButtonPublic:{
        borderColor:'#DEDEDE'
    },
    OrderInfoButtonView:{
        width:orderButtonWidth,
        height:42,
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:20
    }
});

export default OrderDetailStyles