import React,{Component} from 'react'

import {AppRegistry, Text, View, Image, Platform, BackHandler, Alert, TouchableOpacity,Modal} from 'react-native';

import PersonStyles from '../styles/PersonStyles'
import ContextHeaderPage from "./ContextHeaderPage";

import PersonListViewPage from "./PersonListViewPage";

import RNCamera from 'react-native-camera';

import personMobx from '../mobx/person/PersonMobx'
import {observer} from "mobx-react";



@observer
export default class PersonPage extends Component<Props>{


    // 构造

      constructor(props) {
        super(props);
        console.log(props);
        // 初始状态
        const { params } = this.props.navigation.state;

        this.personMobx = this.props.personMobx;

        console.log("PersonPage",personMobx);

        let headerImage = personMobx.personInfo.headerImage;
        this.state = {
            imageModelShow :false,
            showModalBackGroundColor:false,
            cameraModelShow:false,
            cameraImageModelShow:false,
            cameraImagePath:"",
            CameraTypeModel:RNCamera.constants.Type.back,
            userId:params.userId,
            header:{backPageName:'我的',
                currentPageName:'个人中心',
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            }
        };
        this._onBackPage = this._onBackPage.bind(this);

        this.onShowSelectPhoto = this.onShowSelectPhoto.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
        this.onCloseSelectPhoto = this.onCloseSelectPhoto.bind(this);
        this._onOpenPhoto = this._onOpenPhoto.bind(this);
        this._onSelectPhoto = this._onSelectPhoto.bind(this);
        this._onViewPhoto = this._onViewPhoto.bind(this);
        console.log(this);
      }

      render(){
          console.log("PersonPage 重新刷页面");
          console.log(personMobx);
          let modalBackgroundStyle = {
              backgroundColor: this.state.showModalBackGroundColor ? 'rgba(0, 0, 0, 0.3)' : null,
          };
          console.log(Platform.OS+":"+Platform.Version);

          console.log(personMobx.personListData.data);
          return (

              <View style={PersonStyles.container}>

                  <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?PersonStyles.header:PersonStyles.header_android_low}>
                      <ContextHeaderPage store = {personMobx} {... this.state.header} {... this.props}/>
                  </View>
                  <View style={PersonStyles.rowSpace}>
                      <PersonListViewPage store = {personMobx}   {... this.props} onShowSelectPhoto={this.onShowSelectPhoto}  />
                  </View>

                  <Modal
                      visible={this.state.imageModelShow}
                      animationType='slide'
                      transparent={true}
                      onRequestClose={()=> this.onRequestClose()}
                      onShow={()=>{
                          this.setState({
                              showModalBackGroundColor:true
                          })
                      }}
                  >
                      <View  style={[PersonStyles.personImageModel,modalBackgroundStyle]}>
                          <View style={PersonStyles.modalView}>
                              <View style={PersonStyles.modelViewSelect}>
                                  <TouchableOpacity style={[PersonStyles.modelViewSelectRow,PersonStyles.modelViewSelectRowLine]}
                                                    onPress={this._onOpenPhoto}>
                                      <Text style={PersonStyles.modelViewSelectText}>拍照</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={PersonStyles.modelViewSelectRow} onPress={this._onSelectPhoto}>
                                      <Text style={PersonStyles.modelViewSelectText}>从相册选择</Text>
                                  </TouchableOpacity>
                              </View>

                              <TouchableOpacity style={[PersonStyles.modelViewSelect,PersonStyles.modelViewSelectRow,PersonStyles.modelViewSelectCancel]}
                                                onPress={this.onCloseSelectPhoto}>
                                  <Text style={PersonStyles.modelViewSelectText}>取消</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </Modal>

              </View>
          );
      }

      _onSetting(){
          Alert.alert('提示','正在开发中');
    }
    componentWillMount() {
        console.log('personpage componentWillMount 调用了');
    }

    componentDidMount() {
        console.log('personpage componentDidMount 调用了');
    }

    componentWillUnmount() {
        console.log('personpage componentWillUnmount 调用了');
    }

    /**
     * 选择照片
     */
    onShowSelectPhoto(message){
          //this.setState({imageModelShow:true});
        this.setState({
            imageModelShow: true
        });
    }

    onCloseSelectPhoto(){
        this.setState({
            showModalBackGroundColor:false,
            imageModelShow:false
        })
    }

    onRequestClose() {
        this.setState({
            showModalBackGroundColor:false,
            imageModelShow:false
        });
    }

    /**
     * 返回
     * @private
     */
    _onBackPage(){

    }
    //打开拍照
    _onOpenPhoto(){
        this.setState({
            imageModelShow:false,
            //cameraModelShow:true,
        });

        this.props.navigation.navigate('CameraScreen',{});
    }

    /**
     * 子页面调用修改数据
     * @private
     */
    _calBackUpdateData(){

    }



    /**
     * 点击拍照
     * @private
     */
    _onTakePhoto = async function(){
        if (this.camera) {
            this.camera.takePictureAsync().then(data => {
                console.log('data: ', data);
                this._onViewPhoto(data);
            });
        }
        /*if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this._onViewPhoto(data);
        }*/
        /*this.camera.capture()
            .then(function(data,_onViewPhoto){
                //alert("拍照成功！图片保存地址：\n"+data.path)
                console.log(data);



            })
            .catch(err => console.error(err));*/
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



    /**
     * 相册中选择
     * @private
     */
    _onSelectPhoto(){

    }
};
