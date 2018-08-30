import React,{Component} from 'react';
import { AppRegistry,StyleSheet,Dimensions} from 'react-native';

const holdScreenWidth = Dimensions.get('window').width;
const orderCountViewWith = holdScreenWidth / 2;
const screenWidth = holdScreenWidth /3;
const OrderStyles=StyleSheet.create({
    container: {
        flex: 1
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

    orderCountView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F24E3E',
        height:100,
    },
    orderCountViewCenter: {
        justifyContent: 'flex-start',
        alignItems:'center',
        width: orderCountViewWith,
        height:55
    },
    orderCountView_1:{
        color:'#FFF',
        fontSize:28,
        marginTop:-4,
        fontWeight:'500'
    },
    orderCountView_2:{
        color:'#FFF',
        fontSize:14,
    },
    orderCountViewRightLine:{
        borderRightWidth:0.5,
        borderRightColor:'#e8e8e8',
    },
    OrderCountView_1:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F24E3E',
        height:120,
    },
    OrderCountView_1_number:{
        color:'#FFF',
        fontSize:36,
    },
    OrderCountView_1_name:{
        color:'#FFF',
        fontSize:14,
        marginTop:15
    },
    menuView:{
        marginTop:10,
        height:340,
        backgroundColor:'#fff',

    },
    listViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
    },

    menuViewImageView:{
        alignItems:'center',
    },
    menuViewBadge:{
        width:screenWidth-30,
        alignItems:'flex-end'
    },

    cellBackStyle:{
        width:screenWidth,
        height:100,
        justifyContent:'space-around',
        alignItems:'center',
        borderWidth:0.5,
        borderColor:'#e8e8e8',
    },

    menuViewImage:{
        height:35,
        width:35,
        //tintColor:'#F24E3E'
    },

    menuViewText:{
        fontSize: 12,
        marginTop:10
    },

    orderInfoTitle:{
        height:40,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    orderInfoTitleText:{
        fontSize:16,
        marginLeft:15
    }
});

export default OrderStyles