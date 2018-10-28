import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions } from 'react-native';


const holdScreenWidth = Dimensions.get('window').width;
const communityInfoLeftWidth = holdScreenWidth * 0.6;
const communityInfoRightWidth = holdScreenWidth * 0.35;
const CommunityStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        backgroundColor: '#F3F3F3'
    },
    header: {
        /*height:135,*/
        height: 60
    },
    header_android_low: {
        /*height:120,*/
        height: 45
    },
    searchView: {
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        //marginBottom: 10,
    },
    communityView:{
        marginTop: 10,
        backgroundColor:'#FFF',
        paddingLeft:10,
        paddingRight:10,
    },
    communityRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    communityRowLeftView:{
        height:70,
        justifyContent:'center',

    },
    communityRowRightView:{
        height:70,
        justifyContent:'center',
        marginRight:10,
    },
    communityNameText:{
        fontSize:16,
        color:'#333',
    },
    communityAddressText:{
        fontSize:12,
        color:'#999',
        marginTop:3,
    },
    enterCommunityButton: {
        //marginLeft:10,
        backgroundColor: '#FFF',
        borderColor: '#F24E3E',
        borderWidth: 1,
    },


    communityBlockView:{
        //marginBottom:10,
          marginTop:10,
          paddingLeft:10,
          paddingRight:10,
          backgroundColor:'#FFF',
          paddingBottom:10,
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
      rowDataStoreHeaderView:{
        borderBottomWidth:1.5,
        borderBottomColor:"#DEDEDE"
      },
      rowDataHeaderViewText:{
          fontSize:16,
          color:'#333',
  
      },
      communityBaseView:{
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#FFF',
    },
    communityDetailInfoView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        height:32,
    },
    communityDetailInfoRowView:{
        flexDirection:'row',
    },
    communityDetailInfoRowViewLeft:{
      width:communityInfoLeftWidth,
    },
    communityDetailInfoRowViewRight:{
        width:communityInfoRightWidth,
    },
    communityDetailInfoHeaderView:{
        height:30,
    },
    communityDetailInfoHeaderText:{
        fontSize:16,
        color:"#555",
    },
    communityDetailInfoText:{
        fontSize:14,
        color:"#7B7B7B",
    },
    communityDetailInfoTextValue:{
        fontSize:12,
        color:"#7B7B7B",
    },
    selectStoreView:{
        marginTop:10,
    },
    storeItemRow:{
        height:50,
    },

    viewBottom:{
        position: 'absolute',
        bottom: 0,
        width:holdScreenWidth,
        height:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFF',   
        borderTopColor:'#F3F3F3',
        borderTopWidth:1,
    },

    communityTabView:{
        height:45,
    },

    auditView:{
        flex:1,
        backgroundColor:'#FFF',
        flexDirection:'row',
        //marginTop:10,
    },
    auditImageView:{
        height:120,
        width:100,
        marginTop:15,
        //justifyContent:'center',
        alignItems:'center',
    },
    auditViewImage:{
        height:80,
        width:80,
        
        borderRadius:10,
    },
    auditTextView:{
        height:120,
        marginTop:10,
        //justifyContent:'center',
    },
    auditViewText:{
        height:80,
    },
    auditTextName:{
        fontSize:16,
        color:'#333',

    },
    auditText:{
        marginTop:2,
        fontSize:12,
    }
});

export default CommunityStyles