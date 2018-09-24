import React,{Component} from 'react';

import {View,Text,TouchableOpacity,FlatList,StyleSheet,Modal,Dimensions,Platform,Image} from 'react-native';

import PropTypes from 'prop-types';


// import {
//     NoActionHeaderView
// } from 'Java110';

/**
 * 选择 选项 
 * 
 * data {id:"",value:"",isCheck:"0"}选项数据
 * _onSelectCheck 选择回调方法
 * selectModelShow 是否展示model
 * _onCancle 取消方法
 * add by wuxw 2018-09-24
 */
export default class SelectView extends Component{

    static propTypes = {
        selectModelShow:PropTypes.bool.isRequired,
        data: PropTypes.array.isRequired,
        _onSelectCheck: PropTypes.func.isRequired,
        _onCancle: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);

        this.state = {
            showModalBackGroundColor:false,
        };

        this._onSelectCheck=this._onSelectCheck.bind(this);
    }

    /**
     * 渲染页面
     */
    render(){
        return (
            <Modal
                visible={this.props.selectModelShow}
                animationType='slide'
                transparent={true}
                onRequestClose={() => this.onRequestClose()}
                onShow={() => {
                    this.setState({
                        showModalBackGroundColor: true
                    })
                }}
            >
              <View style={[styles.body]}>
                <View style={styles.modalView}>
                    {this._renderHeader()}
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        data={this.props.data}
                        keyExtractor={(item,index)=>item.id}
                        renderItem={this.renderOption.bind(this)}
                        refreshing={false}
                    />
                </View>
              </View>
          </Modal>
        );
    }

    /**
     * 头部信息
     * @returns {XML}
     * @private
     */
    _renderHeader() {

        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.leftButtonIcon} onPress={() =>{this.props._onCancle()}} activeOpacity={1}>
                        <Image source={require('../../icon/header/back.png')} style={styles.backImage}/>
                </TouchableOpacity>
                <View style={styles.centerView}>
                    <Text style={styles.headerText}>选择目录</Text>
                </View>
                <View style={styles.rightView}>

                </View>
            </View>
        );
    }

    /**
     * 每一行
     * @param {行数据} rowData 
     */
    renderOption(rowData){
        let item = rowData.item;
        return (
            <TouchableOpacity style={[styles.sexRow,styles.bottomLine]}
                                    onPress={() => this._onSelectCheck(item.id)}
                            activeOpacity={1}>
                      <Text style={styles.itemText}>{item.value}</Text>
                      {
                            item.check == 1 ? <Image style={styles.checkImage} source={require("../../icon/listview/check.png")}></Image> :null
                      }
            </TouchableOpacity>
        );
    }

    /**
     *  选择
     */
    _onSelectCheck(id){
        if(this.props.hasOwnProperty('_onSelectCheck')){
            this.props._onSelectCheck(id);
        }

        this.setState({
            showModalBackGroundColor:false,
        });
    }


}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const headerScreenWidth = screenWidth /3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        /*paddingTop:10,*/
        flexDirection:'row',
        height:35,
        backgroundColor:'#F24E3E',
        /*justifyContent:'flex-end',*/
        justifyContent:'center',
    },
    body:{
        height:screenHeight, 
        backgroundColor:'#F3F3F3',
        
    },
    modalView: {
        height: screenHeight,
        width:screenWidth,
    },
    textInputStyle:{
        marginTop:2,
        backgroundColor:'#fff'

    },
    leftButtonIcon:{
        flexDirection:'row',
        width:headerScreenWidth,
        justifyContent:'flex-start',
        alignItems:'center',
        
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
            borderBottomColor:'#F3F3F3',
    },
    itemText:{
        marginLeft:12,
        color:'#000',
        fontSize:16
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
        justifyContent:'center',
        alignItems:'center',
        width:headerScreenWidth,
    },
    rightView:{
        width:headerScreenWidth,
        justifyContent:'flex-end',
    }
});
