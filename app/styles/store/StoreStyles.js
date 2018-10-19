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
        flex:1,
    },
    
    explainViewTop:{
        marginTop:10,
        //height:270,
        alignItems:'center',
        backgroundColor:'#FFF',
        // flexDirection:'row',
        // justifyContent:'justifyContent',
    },
    explainViewRowTopLine:{marginLeft:15,backgroundColor:'#F24E3E',width:2},
    customBadge:{backgroundColor: '#F24E3E',width:22,height:22,borderRadius:11, paddingLeft: 0, paddingRight: 0},
    customBadgeText:{color: '#fff',fontSize:18},
    explainViewRowTitle:{
        height:50,
        justifyContent:'center',
        width:explainViewWidth,
    },
    explainViewRowTitleText:{
        fontSize: 18,
    },
    explainViewRow:{
        flexDirection:'row',
        width:explainViewWidth,
        alignItems:'stretch',
        //backgroundColor:"#666"
    },
    
    explainViewRowLeft:{
        //marginTop:2,
        marginLeft:-16,
        width:30,
        height:30,
        alignItems:'center',
    },
    explainViewRowTextView:{
        marginLeft:8,
        marginTop:-2,
        paddingBottom:20,
        //backgroundColor:"#666"
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
    spaceView:{
        height:80,
    },
    viewBottom:{
        position: 'absolute',
        bottom: 0,
        width:holdScreenWidth,
        height:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFF',   
        //marginTop:40,
        //width:60,
        borderTopColor:'#F3F3F3',
        borderTopWidth:1,
    },
    storeView:{
        flex:1,
    },

    storeInfo:{
        marginTop:10,
        backgroundColor:'#FFF',

    },
    storeInfoTitle:{
        height:40, 
        justifyContent:'center',
    },
    storeInfoTitleText:{
        color:'#333',
        fontSize:18,
        marginLeft:10,

    },
    storeItemRow:{
        height:45,
    },

    amapView:{
        flex:1,
        width:holdScreenWidth,
        //height:holdScreenWidth,
    },
    uploadImageView:{
        marginTop:10,
        height:150,
        //backgroundColor:'#FFF'
    }
   
});

export default StoreStyles