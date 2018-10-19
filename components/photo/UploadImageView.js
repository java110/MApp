import React,{Component} from 'react';

import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';

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
        photoDesc:PropTypes.string.isRequired,
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
                {this._renderUploadImageDesc()}
            </View>
        );
    }

    /**
     * 显示照片或拍照
     */
    _renderViewImageOrTakePhoto(){

        let tmpImage =[];
        console.log('_renderViewImage',this.props.currentPhotoDatas);
        if(this.props.currentPhotoDatas != null && this.props.currentPhotoDatas.length>0){
            for(let showPhotoIndex = 0; showPhotoIndex < this.props.currentPhotoDatas.length;showPhotoIndex ++){
                tmpImage.push(<View style={style.showPhotoView} key={showPhotoIndex}>
                                <Image 
                                source={this.props.currentPhotoDatas[showPhotoIndex]}
                                style={style.showPhotoViewImage}></Image>
                                <TouchableOpacity style={style.deleteImageView} onPress={()=>{
                                    this.props._deletePhoto(this.props.currentPhotoDatas[showPhotoIndex].id);
                                }}>
                                    <Image source={require('../../icon/button/delete.png')}
                                            style={style.deleteImage}
                                    />
                                </TouchableOpacity>
                            </View>);
            }
        }

        return (
            <View style={style.ViewImageOrTakePhotoView}>
                {tmpImage}
                {this._renderTakePhoto()}
                
            </View>
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
                    <View style={style.takeCameraButtonImageView}>
                        <Image
                                        source={require('../../icon/photo/openCamera.png')}
                                        style={style.takeCameraButtonImage}
                            />

                    </View> 
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

    /**
     * 照片上传提示
     */
    _renderUploadImageDesc(){
        return (
            <View style={style.uploadImageDescView}>
                <Text style={style.uploadImageDescViewText}>{this.props.photoDesc}</Text>
            </View>
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
const holdScreenWidth = Dimensions.get('window').width;
const cellWidth = holdScreenWidth /3;
const cellImageWidth = cellWidth-10;
let style = StyleSheet.create({
    container:{
        //flex:1,
        backgroundColor:'#FFF',
    },
    ViewImageOrTakePhotoView:{
        flexDirection: 'row',
        //justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
        //paddingTop:10,
        //paddingLeft:10,
        //paddingBottom:10,
    },
    takeCameraButtonImageView:{
        borderWidth:1,
        borderColor:'#ccc',
        borderStyle : 'dashed',
        borderRadius:10,
        height:cellImageWidth,
        width:cellImageWidth,
        justifyContent:'center',
        alignItems:'center'
    },
    deleteImageView:{
        position:'absolute',
        height:21,
        width:21,
        backgroundColor:'#FFF',
        borderRadius:21,
        borderWidth:0,
        right:10,
        top:5,
        justifyContent:'center',
        alignItems:'center',
    },
    deleteImage:{
        tintColor:'#333', 
        height:30,
        width:30,
    },
    takeCameraView:{
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        width:cellWidth
    },
    takeCameraButtonImage:{
        height:40,
        width:50,
        tintColor:'#ccc'
    },
    showPhotoView:{
        marginTop:10,
        height:cellImageWidth,
        justifyContent:'center',
        alignItems:'center',
        width:cellWidth,
        
    },
    showPhotoViewImage:{
        height:cellImageWidth,
        width:cellImageWidth,
        borderRadius:10,
    },
    uploadImageDescView:{
        //flex:1,
        height:40,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    uploadImageDescViewText:{
        fontSize:12,
        marginRight:15,
    }
});

