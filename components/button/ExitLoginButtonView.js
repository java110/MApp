import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Modal,StyleSheet,Dimensions} from 'react-native';

import PropTypes from 'prop-types';

/**
 * 删除按钮
 *
 * _onExitLogin 属性
 * add by wuxw 2018-09-11
 */
export default class ExitLoginButtonView extends Component{

    static propTypes ={
        _onExitLogin:PropTypes.func.isRequired
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            exitModelShow:false,
            showModalBackGroundColor:false
        };
        this._onCloseSelect= this._onCloseSelect.bind(this);
        this._onExitLogin = this._onExitLogin.bind(this);

        this.onRequestClose = this.onRequestClose.bind(this);

        this._onShowExitModel = this._onShowExitModel.bind(this);
    }

    render(){

        let modalBackgroundStyle = {
            backgroundColor: this.state.showModalBackGroundColor ? 'rgba(0, 0, 0, 0.3)' : null,
        };

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.exitView} onPress={()=>{this._onShowExitModel()}} >
                    <Text style={styles.exitText}>退出登录</Text>
                </TouchableOpacity>

                <Modal
                    visible={this.state.exitModelShow}
                    animationType='slide'
                    transparent={true}
                    onRequestClose={()=> this.onRequestClose()}
                    onShow={()=>{
                        this.setState({
                            showModalBackGroundColor:true
                        })
                    }}
                >
                    <View  style={[styles.personImageModel,modalBackgroundStyle]}>
                        <View style={styles.modalView}>
                            <View style={styles.modelViewSelect}>
                                <TouchableOpacity style={[styles.modelViewSelectRow]}
                                                  onPress={this._onExitLogin}>
                                    <Text style={[styles.modelViewSelectText,styles.modelButtonText]}>确定退出</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={[styles.modelViewSelect,styles.modelViewSelectRow,styles.modelViewSelectCancel]}
                                              onPress={this._onCloseSelect}>
                                <Text style={styles.modelViewSelectText}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    _onCloseSelect(){
        this.setState({
            showModalBackGroundColor:false,
            exitModelShow:false
        })
    }

    /**
     * 删除
     * @private
     */
    _onExitLogin(){
        this._onCloseSelect();

        if(this.props.hasOwnProperty("_onExitLogin")){
            this.props._onExitLogin();
        }
    }

    _onShowExitModel(){
        this.setState({
            showModalBackGroundColor:true,
            exitModelShow:true
        })
    }

    onRequestClose() {
        this.setState({
            showModalBackGroundColor:false,
            exitModelShow:false
        });
    }

}

/**
 * 样式
 */
const fullWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('window').width * 0.94;
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    exitView:{
        backgroundColor:'#FFF',
        height:40,
        width:fullWidth,
        alignItems:'center',
        justifyContent:'center'
    },
    exitText:{
        fontSize:16,color:'#F24E3E'
    },
    personImageModel:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        //backgroundColor:'rgba(0, 0, 0, 0.3)'
    },

    modalView:{
        height:125,
        width:screenWidth,

    },

    modelViewSelect:{
        backgroundColor:'#FFF',
        borderRadius:10,
    },
    modelViewSelectRowLine:{
        borderBottomWidth:1,
        borderBottomColor:'#F5F5F5',
    },
    modelViewSelectRow:{
        height:53,
        justifyContent:'center',
        alignItems:'center'
    },
    modelViewSelectText:{
        fontSize:18,

    },
    modelButtonText:{
        color:'#F24E3E'
    },
    modelViewSelectCancel:{
        marginTop:8,

    },

});

