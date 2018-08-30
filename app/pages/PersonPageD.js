import React,{Component} from 'react'

import {AppRegistry, StyleSheet, Text, View, Image, Platform, BackHandler, Alert, TouchableOpacity,Modal} from 'react-native';

import PersonStyles from '../styles/PersonStyles'
import ContextHeaderPage from "./ContextHeaderPage";
import PageActionConst from "../constants/PageActionConst";
import PersonListViewPage from "./PersonListViewPage";
import VALUE_TYPE from "../constants/ValueTypeConst";

//var ImagePicker = require('react-native-image-picker');

import ImagePicker from 'react-native-image-crop-picker';



export default class PersonPage extends Component{


    // 构造

      constructor(props) {
        super(props);
        console.log(props);
        // 初始状态
        const { params } = this.props.navigation.state;

          //图片选择器参数设置

          ImagePicker.openPicker({ width: 300, height: 400, cropping: true})
              .then(image => { console.log(image);});

        this.state = {
            imageModelShow :false,
            showModalBackGroundColor:false,
            userId:params.userId,
            header:{backPageName:'我的',
                currentPageName:'个人中心',
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            },
            listData: {
                data: [
                    {
                        message: '当前正在开发中',
                        pageAction: PageActionConst.alert,
                        itemName: '头像',
                        itemValueType:VALUE_TYPE.IMAGE,
                        itemValue: require('../images/ic.png'),
                        itemActionImage: require('../images/more.png')
                    },
                    {
                        message: '当前正在开发中',
                        pageAction: PageActionConst.alert,
                        itemName: '名称',
                        itemValueType:VALUE_TYPE.TEXT,
                        itemValue: 'java110官方',
                        itemActionImage: require('../images/more.png')
                    },
                    {
                        message: '当前正在开发中',
                        pageAction: PageActionConst.alert,
                        itemName: '性别',
                        itemValueType:VALUE_TYPE.TEXT,
                        itemValue: '男',
                        itemActionImage: require('../images/more.png')
                    },
                    {
                        message: '15897089471',
                        pageAction: PageActionConst.alert,
                        itemName: '地址',
                        itemValueType:VALUE_TYPE.TEXT,
                        itemValue: '青海省西宁市',
                        itemActionImage: require('../images/more.png')
                    },
                    {
                        message: '当前为最新版本v0.01',
                        pageAction: PageActionConst.alert,
                        itemName: '修改密码',
                        itemValueType:VALUE_TYPE.TEXT,
                        itemValue: '',
                        itemActionImage: require('../images/more.png')
                    }
                ]
            }
        };
        this._onBackPage = this._onBackPage.bind(this);

        this.choosePic = this.choosePic.bind(this);
        console.log(this);
      }

      render(){

          return (
              <View style={PersonStyles.container}>
                  <View style={PersonStyles.header}>
                      <ContextHeaderPage {... this.state.header} {... this.props}/>
                  </View>
                  <View style={PersonStyles.rowSpace}>
                      <PersonListViewPage {... this.state.listData}  {... this.props} onShowSelectPhoto={this.onShowSelectPhoto}  />
                  </View>
              </View>
          );
      }

      _onSetting(){
          Alert.alert('提示','正在开发中');
    }



    /**
     * 返回
     * @private
     */
    _onBackPage(){

    }

    pic(){
        // ImagePicker.openPicker({         //选择照片
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log(' 图片路径：'+ image);
        // });

        ImagePicker.openCamera({            //启动相机拍照
            width: 300,
            height: 400,
            cropping: false             //是否打开剪裁
        }).then(image => {
            console.log(image);
        });
    }

}