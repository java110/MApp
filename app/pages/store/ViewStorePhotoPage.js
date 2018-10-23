import React,{Component} from 'react';

import {View,Text,Image,Platform,ScrollView} from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import CommonStyles from "../../styles/CommonStyles";

import {
    NoActionHeaderView,
    ViewImageView
} from 'Java110'
import StoreStyles from '../../styles/store/StoreStyles';
/**
 * 展示图片
 * 
 * add by wuxw 2018-10-18
 */
export default class ViewStorePhotoPage extends Component{

    constructor(props){
        super(props);
        let {pageTitle,storeInfo,storePhotoType} = this.props.navigation.state.params;
        this.state={
            currentPageName:pageTitle,
            imageModelShow:false,
            storeInfo:storeInfo,
            storePhotoType:storePhotoType,
        };

        this._onBackPage = this._onBackPage.bind(this);
        this._getStorePhotoOfStoreInfo = this._getStorePhotoOfStoreInfo.bind(this);

    }


    /**
     * 页面渲染
     */
    render(){

        return(
            <View style={[StoreStyles.container,StoreStyles.body]}>
                {
                    this._renderMain()
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
                    {this._renderViewImage()}
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
    _renderViewImage(){
        let tmpStorePhotos = this._getStorePhotoOfStoreInfo(this.state.storePhotoType);
        let photoData = [];
        for(let tmpStorePhotosIndex = 0; tmpStorePhotosIndex < tmpStorePhotos.length; tmpStorePhotosIndex++){
            photoData.push({uri:tmpStorePhotos[tmpStorePhotosIndex].photo,id:tmpStorePhotos[tmpStorePhotosIndex].storePhotoId});
        }

        return (
            <View style={StoreStyles.uploadImageView}>
                {
                    tmpStorePhotos.length > 0?
                        <ViewImageView
                        imageModelShow={this.state.imageModelShow}
                        currentPhotoDatas={photoData}
                        photoDesc={this.state.currentPageName+"照片展示区"}   
                        />
                    :null
                }     
            </View>
        );
    }

    _getStorePhotoOfStoreInfo(key) {
        let tmpStorePhoto = this.state.storeInfo.storePhoto;
        let returnStorePhoto = [];
    
        for (let tmpStorePhotoIndex = 0; tmpStorePhotoIndex < tmpStorePhoto.length; tmpStorePhotoIndex++) {
          if (tmpStorePhoto[tmpStorePhotoIndex].storePhotoTypeCd == key) {
            returnStorePhoto.push(tmpStorePhoto[tmpStorePhotoIndex]);
          }
        }
        return returnStorePhoto;
      }

     /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }

}