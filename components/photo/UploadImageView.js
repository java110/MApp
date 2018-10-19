import React,{Component} from 'react';

import {View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import SelectPhotoModelView from './SelectPhotoModelView';

/***
 * 照片上传
 * 
 * requiredPhotoCount 要求上传额个数
 * currentPhotoDatas 当前照片
 * _onOpenPhoto 打开相机
 * _onSelectPhoto 本地选择照片
 * _deletePhoto 删除照片
 * add by wuxw 2018-10-17 
 */
export default class UploadImageView extends Component{

    static propTypes = {
        requiredPhotoCount: PropTypes.number.isRequired,
        currentPhotoDatas: PropTypes.array.isRequired,
        _onOpenPhoto:PropTypes.func.isRequired,
        _onSelectPhoto:PropTypes.func.isRequired,
        _deletePhoto:PropTypes.func.isRequired,
    };
    constructor(props){
        super(props);
        this.state={
            imageModelShow:false,
        }
    }


    /**
     * 页面渲染
     */
    render(){
        return (
            <View style={style.container}>
                {this._renderViewImageOrTakePhoto()}
                {this._renderShowSelectPhotoModel()}
            </View>
        );
    }

    /**
     * 显示照片或拍照
     */
    _renderViewImageOrTakePhoto(){
        return (
            <View style={style.ViewImageOrTakePhotoView}>
                {this._renderViewImage()}
                {this._renderTakePhoto()}
                
            </View>
        );
    }

    /**
     * 显示 照片
     */
    _renderViewImage(){

        let tmpImage = null;
        if(this.props.currentPhotoDatas != null && this.props.currentPhotoDatas.lenght>0){
            for(let showPhotoIndex = 0; showPhotoIndex < this.props.currentPhotoDatas.lenght;showPhotoIndex ++){
                tmpImage += <View style={style.showPhotoView}>
                                <Image 
                                source={this.props.currentPhotoDatas[showPhotoIndex]}
                                style={style.showPhotoViewImage}></Image>
                            </View>
            }
        }
        return (
            tmpImage
        );
    }

    /**
     * 拍照按钮 显示
     */
    _renderTakePhoto(){
        
        let tmpTakePhotoImage = 
                this.props.currentPhotoDatas == null || this.props.currentPhotoDatas.length < this.props.requiredPhotoCount?
                    <TouchableOpacity style={style.takeCameraView} onPress={()=>{
                        this.setState({
                            imageModelShow:true,
                        });
                    } }>
                        <Image
                                    source={require('../../icon/photo/openCamera.png')}
                                    style={style.takeCameraButtonImage}
                        />
                    </TouchableOpacity>
                :null;

        console.log("_renderTakePhoto",this.props.currentPhotoDatas);
        return (
            tmpTakePhotoImage
        );
    }

    /**
     * 显示点击 拍照按钮后出现 拍照 还是从相册中选择
     */
    _renderShowSelectPhotoModel(){
        return (
            <SelectPhotoModelView
                imageModelShow = {this.state.imageModelShow}
                _onOpenPhoto={this.props._onOpenPhoto}
                _onSelectPhoto={this.props._onSelectPhoto}
            />
        );
    }


    componentWillReceiveProps(props){
        this.setState({
            imageModelShow:props.imageModelShow,
        });
    }

}
/**
 * 样式
 */
let style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    ViewImageOrTakePhotoView:{
        flexDirection: 'row',
        //justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
        paddingLeft:10,
        paddingBottom:30,
    },
    takeCameraView:{
        borderWidth:1,
        borderColor:'#ccc',
        borderStyle : 'dashed',
        borderRadius:10,
        height:100,
        width:100,
        justifyContent:'center',
        alignItems:'center'
    },
    takeCameraButtonImage:{
        height:40,
        width:50,
        tintColor:'#ccc'
    },
    showPhotoView:{
        height:100,
        width:100,
    },
    showPhotoViewImage:{
        height:100,
        width:100,
    }
});

