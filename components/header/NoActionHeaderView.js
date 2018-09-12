import React,{Component} from 'react'

import { AppRegistry, Text, View ,Image,Platform,BackHandler,TouchableOpacity,Dimensions,StyleSheet} from 'react-native';


/**
 * 没有操作按钮的头信息
 *
 * _onBackPage 返回时调用方法
 * backPageName 返回按钮名称
 * currentPageName 当前页面名称
 *
 * add by wuxw 2018-09-12
 */
export default class NoActionHeaderView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
        //const store = this.props.store;
      }

      render(){
          return (
              <View style={ ((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios') ?styles.container:styles.container_android_low}>

                  <View style={styles.header}>
                      <TouchableOpacity style={styles.leftButtonIcon} onPress={this._onBackPage.bind(this)} activeOpacity={1}>

                              <Image source={require('../../icon/header/back.png')} style={styles.backImage}/>
                              <Text style={styles.headerText}>{this.props.backPageName}</Text>

                      </TouchableOpacity>
                      <View style={styles.centerView}>
                          <Text style={styles.headerText}>{this.props.currentPageName}</Text>
                      </View>
                      <View style={styles.rightView}>

                      </View>
                  </View>
              </View>
          );
      }

    /**
     * 返回
     * @private
     */
    _onBackPage(){
        if(this.props.hasOwnProperty("_onBackPage")){
            this.props._onBackPage();
        }
    }

}

const holdScreenWidth = Dimensions.get('window').width;
const screenWidth = holdScreenWidth /3;
const styles=StyleSheet.create({
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
        width:screenWidth
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
        fontSize:16
    },
    centerView:{
        width:screenWidth,
        justifyContent:'center',
        alignItems:'center',
    },
    rightView:{
        width:screenWidth,
        justifyContent:'flex-end',
    }
});