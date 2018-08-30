import { StyleSheet} from 'react-native';


const ModifyPersonSexStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sexContext:{
        marginTop:15,
    },
    sexRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:40,
        backgroundColor:'#FFF',
    },
    checkImage:{
        height:14,
        width:14,
        marginRight:15,
        tintColor:'#2879FF'

    },
    bottomLine:{
            borderBottomWidth:1,
            borderBottomColor:'#F5F5F5',
    },
    itemText:{
        marginLeft:12,
        color:'#000',
        fontSize:16
    }
});


export default ModifyPersonSexStyles