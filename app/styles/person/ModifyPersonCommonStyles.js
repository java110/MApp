import { StyleSheet} from 'react-native';


const ModifyPersonCommonStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body:{
        backgroundColor:'#F5F5F5'
    },
    header:{
        /*paddingTop:10,*/
        height:60
    },
    header_android_low:{
        /*paddingTop:10,*/
        height:45
    },
    textInputStyle:{
        marginTop:2,
backgroundColor:'#fff'

    },
    leftButtonIcon:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
});


export default ModifyPersonCommonStyles