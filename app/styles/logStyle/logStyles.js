import { StyleSheet,Dimensions} from 'react-native';


const holdScreenWidth = Dimensions.get('window').width;
const holdScreenHeight = Dimensions.get('window').height;
const loginViewWidth = holdScreenWidth - 40;
const headerHeight = holdScreenHeight * 0.30;
const logStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
    },
    headerView: {
        backgroundColor: '#F24E3E',
        height: headerHeight,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerViewImage: {
        height: 90,
        width: 90,
    },
    headerViewText: {
        fontSize: 18,
        marginTop: -5,
        color: '#FFF',
        marginBottom: 20,
    },
    contextView: {
        alignItems: 'center',
    },
    loginView: {
        width: loginViewWidth,
        marginTop: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        //paddingBottom:20,
        paddingTop: 10,
        borderColor: '#CBCBCB',
        borderWidth: 1,
    },
    loginRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        marginTop: 10,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1.5,
    },
    rowViewText: {
        color: '#333',
        fontSize: 18,
    },
    rowViewTextInput: {
        marginLeft: 10,
        width: 200,
    },
    loginButtonView: {
        marginTop: 30,
        backgroundColor: '#F24E3E',
        height: 45,
        //width:screenWidth,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: 18, color: '#FFF'
    },
    loginButtonWechatView: {
        //marginTop:10,
        //backgroundColor: '#CBCBCB',
        height: 45,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center'
    },
    loginButtonWechatText: {
        fontSize: 14,
        color: '#777'
    },
    otherLoginView: {
        marginTop: 40,
    },
    otherLoginTextView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherLoginLine: {
        width: 100,
        height:1.5,
        backgroundColor: '#FFF',
    },
    otherLoginText: {
        fontSize: 14,
        marginLeft:10,
        marginRight:10,
    },
    otherLoginImageView: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherLoginImagePress: {     
        borderRadius: 80,
        backgroundColor: '#FFF',
    },
    otherLoginImage: {
        width: 50,
        height: 50,
        
    },
    otherLoginImageSpace:{
        width:100,
    },
    registerRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: loginViewWidth,
        height: 45,
        marginTop: 10,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1.5,
    },
    registerRowMessageCodeView: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomColor: '#F3F3F3',
        // borderBottomWidth: 1.5,
    },
    rowViewLeftImage: {
        marginLeft: 10,
        tintColor: '#F24E3E',
        height: 20,
        width: 20,
    }

});
export default logStyles