import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const holdScreenWidth = Dimensions.get('window').width;
const newsScreenWidth = holdScreenWidth - 140;
const screenWidth = holdScreenWidth * 0.20;
const IndexStyles=StyleSheet.create({
    container: {
        flex: 1,
    },
    body:{
        backgroundColor:'#F5F5F5'
    },
    header:{
        /*height:135,*/
        height:60
    },
    header_android_low:{
        /*height:120,*/
        height:45
    },

    headerView_2: {

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 8,
        backgroundColor: '#F24E3E',
        height:75,
    },
    headerView_2_image: {
        height: 32,
        width: 32,
        tintColor: '#FFF',
    },
    headerView_2_text: {
        fontSize: 14,
        color: '#FFF',
    },
    headerViewCenter: {
        justifyContent: 'center',
        alignItems:'center'
    },
    headerView_2_text_top: {
        marginTop: 5
    },

    menuView:{
        height:160,
        backgroundColor:'#fff',
        paddingTop:10

    },
    menuViewImage:{
        height:35,
        width:35,
        //tintColor:'#F24E3E'
    },
    menuViewText:{
        fontSize: 12,
        marginTop:5
    },
    listViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    cellBackStyle:{
        width:screenWidth,
        height:70,
        justifyContent:'space-around',
        alignItems:'center',
    },
    menuViewImageView:{
        alignItems:'center',
    },

    newsView:{
        backgroundColor:'#fff',
        marginTop:10,
    },
    newsViewTitle:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    newsViewTitleText:{
        fontSize:22,
        color:'#000',
        fontWeight:'700',
        marginLeft:15
    },
    newsViewTitleImage:{
        width:16,
        height:16,
        marginRight:15,
        tintColor:'#8a8a8a'
    },
    newsViewBody:{

    },
    newsViewRowData:{
        height:100,
        /*flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',*/
        paddingLeft:15,
        paddingRight:15,

    },
    newsViewRowDataAll:{
        borderBottomWidth:0.5,
        borderBottomColor:'#e8e8e8',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:100,

    },
    newViewRowDataAllLast:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:100,
    },
    newsViewCountImage:{
        height:10,
        width:10,
    },
    newsViewLike:{
        height:10,
        width:10,
    },
    newsImage:{
        height:80,
        width:100,
    },
    newsViewRowDataLeft:{
        justifyContent:'space-between',
        alignItems:'flex-start',
        width:newsScreenWidth,
    },
    newsViewRowDataLeftView:{
        marginTop:10,
    },
    newsViewRowDataLeftBottom:{
        flexDirection:'row',
        justifyContent:'flex-start',
        height:30,
    },
    newsViewRowDataLeftText:{
        fontSize:16,
        color:'#000',
        height:60,
    },
    flowRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
    },
    newsViewRowDataLeftBottomMargeLeft:{
        marginLeft:10,
    },
    newsViewRowDataLeftBottomTextMargeLeft:{
        marginLeft:5,
    },
    newsViewRowDataLeftBottomText:{
        color:'#8a8a8a',
        fontSize:12,
    },
    newsViewRowDataLeftBottomAuthorText:{
        width:50
    },
    bannerView:{
        height:90,
        marginTop:10

    },
    bannerViewImage:{
        flex: 1,
        height: 90,
        width:holdScreenWidth,
        resizeMode: 'stretch'
    },
    swiper:{}
});

export default IndexStyles