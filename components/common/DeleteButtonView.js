import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Modal,StyleSheet,Dimensions} from 'react-native';

/**
 * 删除按钮
 *
 * _onDelete 属性
 * add by wuxw 2018-09-11
 */
export default class DeleteButtonView extends Component{


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            deleteModelShow:false,
            showModalBackGroundColor:false
        };
        this._onCloseSelect= this._onCloseSelect.bind(this);
        this._onDelete = this._onDelete.bind(this);

        this.onRequestClose = this.onRequestClose.bind(this);

        this._onShowDeleteModel = this._onShowDeleteModel.bind(this);
    }

    render(){

        let modalBackgroundStyle = {
            backgroundColor: this.state.showModalBackGroundColor ? 'rgba(0, 0, 0, 0.3)' : null,
        };

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.deleteView} onPress={()=>{this._onShowDeleteModel()}} >
                    <Text style={styles.deleteText}>删除目录</Text>
                </TouchableOpacity>

                <Modal
                    visible={this.state.deleteModelShow}
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
                                                  onPress={this._onDelete}>
                                    <Text style={styles.modelViewSelectText}>确定</Text>
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
            deleteModelShow:false
        })
    }

    /**
     * 删除
     * @private
     */
    _onDelete(){
        this._onCloseSelect();

        if(this.props.hasOwnProperty("_onDelete")){
            this.props._onDelete();
        }
    }

    _onShowDeleteModel(){
        this.setState({
            showModalBackGroundColor:true,
            deleteModelShow:true
        })
    }

    onRequestClose() {
        this.setState({
            showModalBackGroundColor:false,
            deleteModelShow:false
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
    deleteView:{
        backgroundColor:'#FFF',
        height:40,
        width:fullWidth,
        alignItems:'center',
        justifyContent:'center'
    },
    deleteText:{
        fontSize:16,color:'#F24E3E'
    },
    personImageModel:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        //backgroundColor:'rgba(0, 0, 0, 0.3)'
    },

    modalView:{
        height:150,
        width:screenWidth,

    },

    modelViewSelect:{
        backgroundColor:'#FFF',
        borderRadius:5,
    },
    modelViewSelectRowLine:{
        borderBottomWidth:1,
        borderBottomColor:'#F5F5F5',
    },
    modelViewSelectRow:{
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    modelViewSelectText:{
        fontSize:18,

    },
    modelViewSelectCancel:{
        marginTop:15,

    },

});

