import React,{Component} from 'react';

import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions,Modal} from 'react-native';

import PropTypes from 'prop-types';


/***
 * 照片展示
 * 
 * currentPhotoDatas 当前照片
 * add by wuxw 2018-10-17 
 */
export default class ViewImageView extends Component{

    static propTypes = {
        currentPhotoDatas: PropTypes.array.isRequired,
        photoDesc:PropTypes.string.isRequired,
    };
    constructor(props){
        super(props);
        this.state={
            imageModelShow:false,
            currentPhotoData:{},
        }
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    /**
     * 页面渲染
     */
    render(){
        return (
            <View style={style.container}>
                {this._renderViewImage()}
                {this._renderViewImageDesc()}
                {this._renderViewFullImage()}
            </View>
        );
    }

    /**
     * 显示照片或拍照
     */
    _renderViewImage(){
        let tmpImage =[];
        console.log('_renderViewImage',this.props.currentPhotoDatas);
        if(this.props.currentPhotoDatas != null && this.props.currentPhotoDatas.length>0){
            for(let showPhotoIndex = 0; showPhotoIndex < this.props.currentPhotoDatas.length;showPhotoIndex ++){
                let tmpCurrentImage = this.props.currentPhotoDatas[showPhotoIndex];
                tmpImage.push(<TouchableOpacity style={style.showPhotoView} key={showPhotoIndex} onPress={()=>{
                                    this.setState({
                                        imageModelShow:true,
                                        currentPhotoData:tmpCurrentImage
                                    })
                                }}>
                                <Image 
                                    source={tmpCurrentImage}
                                    style={style.showPhotoViewImage}>
                                </Image>
                            </TouchableOpacity>);
            }
        }
        return (
            <View style={style.ViewImageOrTakePhotoView}>
                {tmpImage}    
            </View>
        );
    }


    /**
     * 照片上传提示
     */
    _renderViewImageDesc(){
        return (
            <View style={style.uploadImageDescView}>
                <Text style={style.uploadImageDescViewText}>{this.props.photoDesc}</Text>
            </View>
        );
    }

    /**
     * 展示单个照片
     */
    _renderViewFullImage(){
        return(
            <Modal
                visible={this.state.imageModelShow}
                animationType='slide'
                transparent={true}
                onRequestClose={() => this.onRequestClose()}
                onShow={() => {
                }}
            >

            <TouchableOpacity style={style.modelView} onPress={()=>{this.onRequestClose()}}>
                <Image
                    source={this.state.currentPhotoData}
                    style={style.modelViewImage}
                />
            </TouchableOpacity>
                
            </Modal>
        );
    }


    componentWillReceiveProps(props){
        this.setState({
            imageModelShow:props.imageModelShow,
        });
    }


    onRequestClose() {
        this.setState({
            imageModelShow:false,
            currentPhotoData:{},
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
    },
    modelView:{
        flex:1,
        backgroundColor:'#000',
        justifyContent:'center',
    },
    modelViewImage:{
        //width:holdScreenWidth,
        height:300,
    }
});

