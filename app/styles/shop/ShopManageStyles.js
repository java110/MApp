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
        paddingLeft:10,
        paddingRight:10,
    },
    leftViewText:{
        fontSize:14,

    },

    cellBackStyle:{
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
        height:96,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:"#F3F3F3"
    },
    rightViewRowLeft:{
        width:90,
        justifyContent:'center',
        alignItems:'center'
    },
    shopLogo:{
        height:80,
        width:80,
        borderRadius:10,
    },
    rightViewRowRight:{
        marginTop:10,
    },
    rightViewRowRightTitle:{
        color:'#555',
        fontSize:16,
    },
    rightViewRowRight_row:{
        flexDirection:'row',

    },

});

export default ShopManageStyles