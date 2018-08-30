
import {StyleSheet} from 'react-native'

const PersonListViewStyles=StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#F5F5F5',
        backgroundColor:'#FFF',
        height:70,
        alignItems:'center'
    },
    itemValueImage:{
        height:60,
        width:60,
        borderRadius:5
    }
});

export default PersonListViewStyles