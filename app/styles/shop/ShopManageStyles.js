import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';
import ShopManagePage from "../../pages/shop/ShopManagePage";

const holdScreenWidth = Dimensions.get('window').width;
const shopCountViewWith = holdScreenWidth / 2;
const screenWidth = holdScreenWidth - 100;
const ShopManageStyles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F3F3F3'
    },

    body:{
        flexDirection:'row',
    },
    leftView:{
        width:90,
        backgroundColor:'#F3F3F3',
    },
    leftViewText:{
        fontSize:14,

    },

    cellBackStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        paddingLeft:10,
        paddingRight:10,
    },
    cellBackStyleView:{
        justifyContent:'center',
        alignItems:'center',
        height:40,
    },
    listViewStyle:{

    },
    rightView:{
        width:screenWidth,
        backgroundColor:"#FFF",
        paddingLeft:5,
        paddingTop:3,
    },
    rightViewRow:{
        //height:90,
        borderBottomWidth:1,
        borderBottomColor:"#F3F3F3"
    },
    rightViewRowUp:{
        //height:90,
        marginTop:8,
        flexDirection:'row',
    },
    rightViewRowLeft:{
        width:80,
        justifyContent:'center',
        alignItems:'center'
    },
    shopLogo:{
        height:70,
        width:70,
        borderRadius:10,
    },
    rightViewRowRight:{
        //marginTop:10,
    },
    rightViewRowRightTitle:{
        color:'#555',
        fontSize:14,
    },
    rightViewRowRight_row:{
        flexDirection:'row',

    },
    rightViewRowRightText:{
        fontSize:12,
    },
    marginLeftText:{
        marginLeft:8,
    },
    colorText:{
        color:"#F24E3E",
    },

    rightViewRowDown:{
        height:40,
        flexDirection:"row",
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:10,
    },
    rightViewRowDownButton:{
        marginLeft:10,
        borderColor:'#DEDEDE',
        borderWidth:1,
        height:24
    },

});

export default ShopManageStyles