import React,{Component} from 'react';

import {View,Text,Image,Platform,ScrollView} from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import CommonStyles from "../../styles/CommonStyles";

import {
    NoActionHeaderView,
    UploadImageView,
    CameraScreenView
} from 'Java110'
import StoreStyles from '../../styles/store/StoreStyles';
import StoreConst from '../../constants/StoreConst';
/**
 * 添加图片 内景照
 * 
 * add by wuxw 2018-10-19
 */
export default class AddStoreInnerPhotoPage extends Component{

    constructor(props){
        super(props);
        this.state={
            currentPageName:'内景照',
            showTakePhoto: false,
            imageModelShow:false,
        };

        this._onOpenPhoto = this._onOpenPhoto.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
        this._onSelectPhoto = this._onSelectPhoto.bind(this);
        this._deletePhoto = this._deletePhoto.bind(this);
        this._getPhotoData = this._getPhotoData.bind(this);
        this._onClosePhoto = this._onClosePhoto.bind(this);

    }


    /**
     * 页面渲染
     */
    render(){

        return(
            <View style={[StoreStyles.container,StoreStyles.body]}>
                {
                    this.state.showTakePhoto ?
                    this._renderTakePhotoScreen()
                    :this._renderMain()
                }
                
            </View>
        );
    }

    /**
     * 主界面
     */
    _renderMain(){
        return(
            <View style={StoreStyles.container}>
                {this._renderHeader()}
                <ScrollView>
                    {this._renderUploadImage()}
                    {this._renderUploadImageExample()}
                </ScrollView>
                
            </View>
        );
    }

    
    /**
    * 头部信息
    * @returns {XML}
    * @private
    */
   _renderHeader() {
        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS === 'ios') ? CommonStyles.header : CommonStyles.header_android_low}>
                <NoActionHeaderView
                    currentPageName={this.state.currentPageName}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 加载照片组件
     */
    _renderUploadImage(){
        let tmpStorePhotos = storeMobx.getStorePhotoOfStoreInfo(StoreConst.STORE_PHOTO_TYPE_CD_INNER_PHOTO).slice();
        let photoData = [];
        for(let tmpStorePhotosIndex = 0; tmpStorePhotosIndex < tmpStorePhotos.length; tmpStorePhotosIndex++){
            photoData.push({uri:tmpStorePhotos[tmpStorePhotosIndex].photo,id:tmpStorePhotos[tmpStorePhotosIndex].storePhotoId});
        }

        console.log('_renderUploadImage',storeMobx.storeInfo,tmpStorePhotos,photoData);

        return (
            <View style={StoreStyles.uploadImageView}>
                <UploadImageView
                    imageModelShow={this.state.imageModelShow}
                    requiredPhotoCount={8}
                    currentPhotoDatas={photoData}
                    photoDesc={"需要上传2至8张照片"}
                    _onOpenPhoto={()=>{
                        this._onOpenPhoto();
                    }}
                    _onSelectPhoto={(cameraImageContext)=>{
                        this._onSelectPhoto(cameraImageContext);
                    }}
                    _deletePhoto={(photoId)=>{
                        this._deletePhoto(photoId);
                    }}
                    
                    />
            </View>
        );
    }

    /**
     * 举例图片
     */
    _renderUploadImageExample(){
        return (

            <View style={StoreStyles.uploadImageExampleView}>
                <View style={StoreStyles.uploadImageExampleTitleView}>
                    <Text style={StoreStyles.uploadImageExampleTitleText}>内景照样例</Text>
                </View>
                <Image
                    source={require('../../images/store/innerPhoto.png')}
                    style={StoreStyles.uploadImageExampleViewImage}
                />

            </View>
        );
    }

     /**
     * 显示拍照页面
     */
    _renderTakePhotoScreen() {
        return (
            <CameraScreenView
                _getPhotoData={this._getPhotoData}
                _onClosePhoto={this._onClosePhoto}
            />
        );
    }

    /**
     * 打开相机
     */
    _onOpenPhoto() {
        this.setState({
            imageModelShow: false,
            showTakePhoto: true,
        });
    }

    /**
     * 相册中选取 图片
     */
    _onSelectPhoto(cameraImageContext) {
        storeMobx.refreshStoreInfoOfStorePhoto(StoreConst.STORE_PHOTO_TYPE_CD_INNER_PHOTO,cameraImageContext);
        this.setState({
            imageModelShow: false,
        });
    }

    /**
     * 获取拍照信息
     * @param {照片信息} photoData 
     */
    _getPhotoData(photoData) {
        storeMobx.refreshStoreInfoOfStorePhoto(StoreConst.STORE_PHOTO_TYPE_CD_INNER_PHOTO,photoData);
        this.setState({
            showTakePhoto: false,
        });
    }

    /**
     * 关闭拍照
     */
    _onClosePhoto() {
        this.setState({
            showTakePhoto: false,
        });
    }
  

    /**
     * 删除照片
     */
    _deletePhoto(photoId){
        storeMobx.deleteStorePhotoOfStoreInfo(photoId);
        this.setState({
            showTakePhoto: false,
        });
    }


     /**
     * 返回
     * @private
     */
    _onBackPage() {
        //刷新对象
        storeMobx.refreshStoreInfo();
        this.props.navigation.goBack();
    }

}