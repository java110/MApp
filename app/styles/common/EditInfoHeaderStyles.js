import { StyleSheet} from 'react-native';


const EditInfoHeaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F24E3E',
        justifyContent:'flex-end',
        paddingBottom:10
    },
    container_android_low:{
        flex: 1,
        backgroundColor:'#F24E3E',
        /*justifyContent:'flex-end',*/
        justifyContent:'center',
        /*paddingBottom:5*/
    },
    header:{
        /*paddingTop:10,*/
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    leftButtonIcon:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:10,
    },
    rightButtonIcon:{
        marginRight:10,
    },
    backImage:{
        height:25,
        width:25,
        tintColor:'#FFF',
        marginLeft:2
    },
    rightImage:{
        height:22,
        width:22,
        tintColor:'#FFF',
        marginRight:10
    },
    headerText:{
        color:'#FFF',
        fontSize:14
    },
    centerText:{
        color:'#FFF',
        fontSize:16
    }
});


export default EditInfoHeaderStyles