import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Slider,Image,PermissionsAndroid,Platform  } from 'react-native';

import { RNCamera } from 'react-native-camera';

import ImageCropPicker from 'react-native-image-crop-picker';

import PropTypes from 'prop-types';

const landmarkSize = 2;

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

/**
 * 拍照组件
 * 
 * add by wuxw 2018-09-22
 */
export default class CameraScreenView extends Component {

    static propTypes = {
        _getPhotoData: PropTypes.func.isRequired,
        _onClosePhoto: PropTypes.func.isRequired,
    };
    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            depth: 0,
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            ratios: [],
            photoId: 1,
            showGallery: false,
            photos: [],
            faces: [],
        };

        this._onChangeCamera = this._onChangeCamera.bind(this);

        this._onClosePhoto = this._onClosePhoto.bind(this);

        this.takePicture = this.takePicture.bind(this);
        this.requestCameraPermission = this.requestCameraPermission.bind(this);
        this._getPhotoData = this._getPhotoData.bind(this);
    }

    getRatios = async function () {
        const ratios = await this.camera.getSupportedRatios();
        return ratios;
    };

    toggleView() {
        this.setState({
            showGallery: !this.state.showGallery,
        });
    }

    /**
     * 切换摄像头
     * @private
     */
    _onChangeCamera() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    setRatio(ratio) {
        this.setState({
            ratio,
        });
    }

    toggleWB() {
        this.setState({
            whiteBalance: wbOrder[this.state.whiteBalance],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    takePicture = async function () {
        //this.requestCameraPermission();
        if (this.camera) {
            const options = { quality: 0.5, width: 600, base64: true };
            this.camera.takePictureAsync(options).then(data => {
                console.log(data.base64);
                // 不需要截图
                if (Platform.OS === 'android' && Platform.Version <= 19) {
                    const cameraImageContext = 'data:image/png;base64,' + data.base64;
                    this._getPhotoData(cameraImageContext);
                } else {
                    //需要去截图
                    ImageCropPicker.openCropper({
                        cropping: true,
                        path: data.uri,
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
                        this._getPhotoData(cameraImageContext);

                    }).catch(e => {
                        console.log(e);
                        alert(e.message ? e.message : e);
                    });
                }
            });
        }
    };

    onFacesDetected = ({ faces }) => this.setState({ faces });
    /* onFaceDetectionError = state => console.warn('Faces detection error:', state);*/

    componentDidMount() {
        this.requestCameraPermission();
    }

    async requestCameraPermission() {
        try {
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': 'Cool Photo App Camera Permission',
                        'message': 'Cool Photo App needs access to your camera ' +
                            'so you can take awesome pictures.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the camera")
                } else {
                    console.log("Camera permission denied")
                }
            }
        } catch (err) {
            console.warn(err)
        }
    }


    renderCamera() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                onFacesDetected={this.onFacesDetected}
                onFaceDetectionError={this.onFaceDetectionError}
                focusDepth={this.state.depth}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            >
                <View style={styles.cameraView}>

                    <View style={styles.cameraAction}>
                        <TouchableOpacity onPress={this._onClosePhoto}>
                            <Image style={styles.cameraActionImageSmall} source={require('../../icon/photo/unfold.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.takePicture}>
                            <Image style={styles.cameraActionImage} source={require('../../icon/photo/camera.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onChangeCamera}>
                            <Image style={styles.cameraActionImageSmall} source={require('../../icon/photo/change_camera.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }


    /**
     * 关闭拍照
     * @private
     */
    _onClosePhoto() {
        if(this.props.hasOwnProperty("_onClosePhoto")){
            this.props._onClosePhoto();
        }
    }

    /**
     * 获取照片信息
     * @param {照片信息} photoData 
     */
    _getPhotoData(photoData){
        if(this.props.hasOwnProperty("_getPhotoData")){
            this.props._getPhotoData(photoData);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView:{
        flex:1,
        justifyContent:'flex-end',
    },
    cameraAction:{
        height:120,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#000'
    },
    cameraActionImage:{
        tintColor:'#FFF',
        height:70,
        width:70
    },
    cameraActionImageSmall:{
        tintColor:'#FFF',
        height:40,
        width:40
    }
});