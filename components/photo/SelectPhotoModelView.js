import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Modal, StyleSheet,Dimensions } from 'react-native';

import ImageCropPicker from 'react-native-image-crop-picker';

import PropTypes from 'prop-types';
/**
 * 拍照或从相册中选择
 */
export default class SelectPhotoModelView extends Component {

    static propTypes ={
        imageModelShow:PropTypes.bool.isRequired,
        _onOpenPhoto:PropTypes.func.isRequired,
        _onSelectPhoto:PropTypes.func.isRequired,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            imageModelShow: false,
            showModalBackGroundColor: false,

        };

        this.onShowSelectPhoto = this.onShowSelectPhoto.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
        this.onCloseSelectPhoto = this.onCloseSelectPhoto.bind(this);
        this._onOpenPhoto = this._onOpenPhoto.bind(this);
        this._onSelectPhoto = this._onSelectPhoto.bind(this);
        this._onViewPhoto = this._onViewPhoto.bind(this);
    }

    /**
     * 渲染页面
     */
    render() {
        return (
            <View style={styles.container}>
                {this.renderSelectModel()}
            </View>
        );
    }

    /**
     *  拍照和从相册中选择 对话框
     */
    renderSelectModel() {

        let modalBackgroundStyle = {
            backgroundColor: this.state.showModalBackGroundColor ? 'rgba(0, 0, 0, 0.3)' : null,
        };
        return (
            <Modal
                visible={this.state.imageModelShow}
                animationType='slide'
                transparent={true}
                onRequestClose={() => this.onRequestClose()}
                onShow={() => {
                    this.setState({
                        showModalBackGroundColor: true
                    })
                }}
            >
                <View style={[styles.personImageModel, modalBackgroundStyle]}>
                    <View style={styles.modalView}>
                        <View style={styles.modelViewSelect}>
                            <TouchableOpacity style={[styles.modelViewSelectRow, styles.modelViewSelectRowLine]}
                                onPress={this._onOpenPhoto}>
                                <Text style={styles.modelViewSelectText}>拍照</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modelViewSelectRow} onPress={this._onSelectPhoto}>
                                <Text style={styles.modelViewSelectText}>从相册选择</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[styles.modelViewSelect, styles.modelViewSelectRow, styles.modelViewSelectCancel]}
                            onPress={this.onCloseSelectPhoto}>
                            <Text style={styles.modelViewSelectText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    componentWillReceiveProps(props){
        this.setState({
            imageModelShow:props.imageModelShow,
        });
    }

    /**
    * 选择照片
    */
    onShowSelectPhoto(message) {
        //this.setState({imageModelShow:true});
        this.setState({
            imageModelShow: true
        });
    }

    onCloseSelectPhoto() {
        this.setState({
            showModalBackGroundColor: false,
            imageModelShow: false
        })
    }

    onRequestClose() {
        this.setState({
            showModalBackGroundColor: false,
            imageModelShow: false
        });
    }

     //打开拍照
     _onOpenPhoto(){

        if(this.props.hasOwnProperty("_onOpenPhoto")){
            this.props._onOpenPhoto();
        }
    }

      /**
     * 相册中选择
     * @private
     */
    _onSelectPhoto(){
        ImageCropPicker.openPicker({ 
            multiple: false,
            mediaType:'photo',
            cropperToolbarColor: '#F24E3E',
         })
            .then(images => { 
                console.log(images);
                //需要去截图
                ImageCropPicker.openCropper({
                    cropping: true,
                    path: images.path,
                    width: 100,
                    height: 100,
                    mediaType: 'photo',
                    maxWidth: 600,
                    maxHeight: 600,
                    includeBase64: true,
                    cropperCircleOverlay: true,
                    showCropGuidelines: false,
                    hideBottomControls: true,
                    cropperToolbarColor: '#F24E3E',
                    cropperToolbarTitle: "截取图像",
                    compressImageMaxWidth: 100,
                    compressImageMaxHeight: 100,

                }).then(image => {
                    console.log('received cropped image', image);
                    const cameraImageContext = 'data:image/png;base64,' + image.data;
                    if(this.props.hasOwnProperty("_onSelectPhoto")){
                        this.props._onSelectPhoto(cameraImageContext);
                    }

                }).catch(e => {
                    console.log(e);
                    alert(e.message ? e.message : e);
                });
             });
    }

    _onViewPhoto(data){
        this.setState({
            cameraImagePath:data.path
        });
        this._onClosePhoto();

        this.setState({
            cameraImageModelShow:true,
        })
    }

}


/**
 * 以下为样式
 * @type {{container: {flex: number, backgroundColor: string}}}
 */
const screenWidth = Dimensions.get('window').width * 0.94;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    personImageModel: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    modalView: {
        height: 200,
        width: screenWidth,

    },
    modelViewSelect: {
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    modelViewSelectRowLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    modelViewSelectRow: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelViewSelectText: {
        fontSize: 20,

    },
    modelViewSelectCancel: {
        marginTop: 15,

    },

});