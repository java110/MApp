import React,{Component} from 'react';

import {View,Text,Image,Platform} from 'react-native';

import storeMobx from '../../mobx/store/StoreMobx';

import CommonStyles from "../../styles/CommonStyles";

import {
    NoActionHeaderView,
    UploadImageView,
} from 'Java110'
import StoreStyles from '../../styles/store/StoreStyles';
/**
 * 添加图片 门头照
 * 
 * add by wuxw 2018-10-18
 */
export default class AddStoreDoorHeaderPage extends Component{

    constructor(props){
        super(props);
        this.state={
            currentPageName:'门头照'
        };

        this._onOpenPhoto = this._onOpenPhoto.bind(this);
        this._onBackPage = this._onBackPage.bind(this);
        this._onSelectPhoto = this._onSelectPhoto.bind(this);
        this._deletePhoto = this._deletePhoto.bind(this);

    }


    /**
     * 页面渲染
     */
    render(){

        return(
            <View style={[StoreStyles.container,StoreStyles.body]}>
                {this._renderHeader()}
                {this._renderUploadImage()}
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

    _renderUploadImage(){
        return (
            <View style={StoreStyles.uploadImageView}>
                <UploadImageView
                    requiredPhotoCount={1}
                    currentPhotoDatas={storeMobx.storeInfo.storePhoto.splice()}
                    _onOpenPhoto={()=>{
                        this._onOpenPhoto();
                    }}
                    _onSelectPhoto={()=>{
                        this._onSelectPhoto();
                    }}
                    _deletePhoto={()=>{
                        this._deletePhoto();
                    }}
                    
                    />
            </View>
        );
    }

    /**
     * 打开相机
     */
    _onOpenPhoto(){

    }

    /**
     * 从相册中选择
     */
    _onSelectPhoto(){

    }

    /**
     * 删除照片
     */
    _deletePhoto(){

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