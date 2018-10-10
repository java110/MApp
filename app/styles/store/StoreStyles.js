import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';


const holdScreenWidth = Dimensions.get('window').width;
const explainViewWidth = holdScreenWidth - 30;
const explainSmallTextWidth = holdScreenWidth - 65;
const screenWidth = holdScreenWidth /3;
const StoreStyles=StyleSheet.create({
    container: {
        flex: 1
    },
    body:{
        backgroundColor:'#F3F3F3'
    },
    header:{
        /*height:135,*/
        height:60
    },
    header_android_low:{
        /*height:120,*/
        height:45
    },
    explainView:{

    },
    
    explainViewTop:{
        marginTop:10,
        //height:270,
        alignItems:'center',
        backgroundColor:'#FFF',
        // flexDirection:'row',
        // justifyContent:'justifyContent',
    },
    explainViewRowTitle:{
        height:50,
        justifyContent:'center',
        width:explainViewWidth,
    },
    explainViewRow:{
        flexDirection:'row',
        width:explainViewWidth,
        marginBottom:20,
    },
    
    explainViewRowLeft:{
        marginTop:2,
        width:30,
        //alignItems:'center',
    },
    explainViewRowTextView:{
        marginLeft:5,
        //height:70,
    },
    explainViewRowBigText:{
        fontSize:18,
        color:'#333',
    },
    explainViewRowSmallText:{
        marginTop:5,
        fontSize:14,
        color:"#666",
        lineHeight:18,
        width:explainSmallTextWidth,
    },
    explainViewCenter:{
        marginTop:10,
        backgroundColor:'#FFF',
        alignItems:'center',
    },
    explainViewCenterRow:{
        
        width:explainViewWidth,
        paddingBottom:10,
        paddingLeft:10,
    },
    explainViewCenterRowText:{
        fontSize:14,
        color:"#666",
        lineHeight:18,
    },
    explainViewBottom:{
        marginTop:40,
    },
   
});

export default StoreStyles