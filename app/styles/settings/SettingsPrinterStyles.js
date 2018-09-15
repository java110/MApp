import {StyleSheet,Dimensions} from 'react-native';

const SettingsPrinterStyles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F3F3F3'
    },
    listView:{
        marginTop:15,
    },
    printerItem:{
        marginTop:10,
        flexDirection:'row',
        height:40,
        backgroundColor:'#FFF',
        justifyContent:'space-between',
        alignItems:'center'
    },
    printerItemTextView:{
        marginLeft:10
    },
    printerItemText:{
        fontSize:16,
        color:'#333'
    },
    printerItemSwitchView:{
        marginRight:10
    },
    printDesc:{
        marginTop:10,
        marginLeft:10,
    },
    printDescText:{
        fontSize:12,
        color:"#888"
    },
    printerItemInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        height:40,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:8,
    },
    testPrinterView:{
        marginTop:10,
        backgroundColor:'#FFF',
        height:45,
        justifyContent:'center',
    },
    testPrinterText:{
        marginLeft:20,
        fontSize:16,
        color:'#000'
    }

});

export default SettingsPrinterStyles