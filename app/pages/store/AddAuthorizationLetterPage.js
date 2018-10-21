import React,{Component} from 'react';

import {View,Text,Image,Platform,ScrollView} from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import CommonStyles from "../../styles/CommonStyles";

import {
    NoActionHeaderView,
    UploadImageView,
    CameraScreenView,
} from 'Java110'
import StoreStyles from '../../styles/store/StoreStyles';
import StoreConst from '../../constants/StoreConst';


/**
 * 添加图片 授权函
 * 
 * add by wuxw 2018-10-21
 */
export default class AddAuthorizationLetterPage extends Component{

    constructor(props){
        super(props);
        //查询现在是否有照片信息
        let {storeCerdentialsId,credentialsCd,value,isLongTime,validityPeriod,positivePhoto,negativePhoto} 
            = this._refreshStoreCredentialsInfo();
        this.state={
            currentPageName:'授权函',
            showTakePhoto: false,
            imageModelShow:false,
            storeCerdentialsId:storeCerdentialsId,
            credentialsCd:credentialsCd,
            value:value,
            isLongTime:isLongTime,
            validityPeriod:validityPeriod,
            positivePhoto:positivePhoto,
            negativePhoto:negativePhoto
        };


        this._onOpenPhoto = this._onOpenPhoto.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
        this._onSelectPhoto = this._onSelectPhoto.bind(this);
        this._deletePhoto = this._deletePhoto.bind(this);
        this._getPhotoData = this._getPhotoData.bind(this);
        this._onClosePhoto = this._onClosePhoto.bind(this);
        this._refreshStoreCredentialsInfo = this._refreshStoreCredentialsInfo.bind(this);

    }

    /**
     * 刷新 证件信息（营业执照）
     */
    _refreshStoreCredentialsInfo(){
        let storeCerdentials = storeMobx.getStoreCerdentialsOfStoreInfo(StoreConst.STORE_CREDENTIALS_CD_AUTHORIZATION_LETTER);
        //如果有多个则取第一个
        if(storeCerdentials.length>0){
            return { 
                storeCerdentialsId:storeCerdentials[0].storeCerdentialsId,
                credentialsCd:storeCerdentials[0].credentialsCd,
                value:storeCerdentials[0].value,
                isLongTime:'Y',
                validityPeriod:StoreConst.STORE_CREDENTIALS_LONG_TIME,
                positivePhoto:storeCerdentials[0].positivePhoto,
                negativePhoto:storeCerdentials[0].negativePhoto
            };   
        }else{
            return {
                storeCerdentialsId:'-1',
                credentialsCd:StoreConst.STORE_CREDENTIALS_CD_AUTHORIZATION_LETTER,
                value:'',
                isLongTime:'Y',
                validityPeriod:StoreConst.STORE_CREDENTIALS_LONG_TIME,
                positivePhoto:'',
                negativePhoto:''
            }
        }

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
        let photoData = [];
        if(this.state.positivePhoto != ''){
            photoData.push({uri:this.state.positivePhoto,id:1});
        }

        return (
            <View style={StoreStyles.uploadImageView}>
                <UploadImageView
                    imageModelShow={this.state.imageModelShow}
                    requiredPhotoCount={1}
                    currentPhotoDatas={photoData}
                    photoDesc={"需要上传1张照片"}
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
                    <Text style={StoreStyles.uploadImageExampleTitleText}>营业执照样例</Text>
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
        this.setState({
            positivePhoto:cameraImageContext,
            imageModelShow: false,
        });
    }

    /**
     * 获取拍照信息
     * @param {照片信息} photoData 
     */
    _getPhotoData(photoData) {
        this.setState({
            positivePhoto:photoData,
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
        //storeMobx.deleteStorePhotoOfStoreInfo(photoId);
        if(photoId == 1){
            this.setState({
                    positivePhoto: '',
                });
        }
        // this.setState({
        //     showTakePhoto: false,
        // });
    }


     /**
     * 返回
     * @private
     */
    _onBackPage() {
        let {storeCerdentialsId,credentialsCd, value, validityPeriod, positivePhoto, negativePhoto} = this.state;
        //提交数据
        storeMobx.refreshStoreInfoOfStoreCerdentials(storeCerdentialsId,credentialsCd, value, validityPeriod, positivePhoto, negativePhoto);
        //刷新对象
        storeMobx.refreshStoreInfo();
        this.props.navigation.goBack();
    }

}