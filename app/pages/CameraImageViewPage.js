import React,{Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Slider, Image, NativeModules, ScrollView} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraImageViewStyles from "../styles/CameraImageViewStyles";

/*var ImagePicker = NativeModules.ImageCropPicker;*/

import ImageCropPicker from 'react-native-image-crop-picker';

/**
 * 拍照后照片展示
 */
export default class CameraImageViewPage extends Component{


    // 构造
      constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;
        // 初始状态
        this.state = {
            cameraImageContext:params.cameraImageContext,
            image: {uri: params.cameraImageContext},
        };

        this._onBack = this._onBack.bind(this);
        this._onSaveImage = this._onSaveImage.bind(this);

        this.cropLast = this.cropLast.bind(this);
      }

    /**
     * 渲染页面
     * @returns {XML}
     */
      render(){
          return (
          <View style={CameraImageViewStyles.container}>{this.renderCameraImage()}</View>
          );
      }

    /**
     * 渲染拍照照片
     * <Image style={CameraImageViewStyles.ImageView} source={{uri:this.state.cameraImagePath}}/>
     */
    renderCameraImage(){
        console.log("renderCameraImage:"+this.state.cameraImagePath);
        return (
            <View style={CameraImageViewStyles.cameraView}>
                <ScrollView>
                    <Image style={CameraImageViewStyles.ImageView} source={this.state.image}/>
                </ScrollView>

                <View style={CameraImageViewStyles.cameraAction}>
                    <TouchableOpacity onPress={this._onBack}>
                        <Text style={CameraImageViewStyles.actionText}>重拍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onSaveImage}>
                        <Text style={CameraImageViewStyles.actionText}>使用照片</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
      }

    /**
     * 返回
     * @private
     */
      _onBack(){
        this.props.navigation.pop();
      }

    /**
     * 保存照片
     * @private
     */
    _onSaveImage(){
          console.log(this.state.cameraImagePath);

        this.cropLast(false,true);
          //并且删除本地照片
    }

    cropLast() {
        if (!this.state.image) {
            return alert('No image', 'Before open cropping only, please select image');
        }
        ImageCropPicker.openCropper({
            cropping:true,
            path: this.state.image.uri,
            width: 200,
            height: 200,
            includeBase64:true,
            mediaType:'photo',
            cropperCircleOverlay:true,
            showCropGuidelines:false,
            hideBottomControls:true,

        }).then(image => {
            console.log('received cropped image', image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
            });
        }).catch(e => {
            console.log(e);
            alert(e.message ? e.message : e);
        });
    }
}