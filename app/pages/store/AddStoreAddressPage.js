import React, { Component } from 'react';

import { Alert,View, Text, Image,StyleSheet, PermissionsAndroid,Platform } from 'react-native';

import CommonStyles from "../../styles/CommonStyles";
import StoreStyles from '../../styles/store/StoreStyles';
import storeMobx from '../../mobx/store/StoreMobx';

import SysConfig from '../../config/SysConfig';

import {MapView} from 'react-native-amap3d';
import { observer } from "mobx-react";
import {
    NoActionHeaderView,
    RowRightTextInputView
} from 'Java110';

/**
 * 商户地址填写页面
 * 详细地址
 * 附近标志性建筑
 * 地图选择
 */
@observer
export default class AddStoreAddressPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageName: '门店地址',
            time: new Date(),
            mapLatitude:0,
            mapLongitude:0,
            latitude: 0,
            longitude: 0,
        }

        this._onBackPage = this._onBackPage.bind(this);
    }

    render() {
        return(
            <View style={{flex:1}}>
                {this._renderHeader()}
                {this._renderAddressInfo()}
                {this._renderAMaps()}
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
     * 填写地址信息
     */
    _renderAddressInfo(){
        
        return(
            <View>
                <RowRightTextInputView
                    leftText="省/市/区"
                    textPlaceholder={"请输入城市，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('addr',value) }}
                    inputValue={storeMobx.storeInfo.addr}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightTextInputView
                    leftText="详细地址"
                    textPlaceholder={"请输入门店地址，必填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('address',value) }}
                    onBlur={(value)=>{this._refreshStoreAddress(value)}}
                    inputValue={storeMobx.storeInfo.address}
                    style={StoreStyles.storeItemRow}
                />
                <RowRightTextInputView
                    leftText="附近地标"
                    textPlaceholder={"请输入附近地标，选填"}
                    _onChangeText={(value) => { storeMobx.refreshStoreInfoProperty('nearbyLandmarks',value) }}
                    inputValue={storeMobx.storeInfo.nearbyLandmarks}
                    style={StoreStyles.storeItemRow}
                />
            </View>
        );
    }

    /**
     * 引入地图
     */
    _renderAMaps(){
        return (
            <View style={StoreStyles.amapView}>
                <MapView style={StyleSheet.absoluteFill}
                    locationEnabled
                    zoomLevel={15}
                    mapType='standard'
                    coordinate={ {
                        latitude: this.state.mapLatitude,
                        longitude: this.state.mapLongitude,
                    }}
                    onLocation={({ nativeEvent }) =>{
                        this._refreshLatitudeAndLongitude(nativeEvent);
                    }}
                    >
                        <MapView.Marker
                        active
                        draggable
                        title="我的门店"
                        description={"请选择我的门店"}
                        onDragEnd={this._onDragEvent}
                        onInfoWindowPress={this._onInfoWindowPress}
                        coordinate={ {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}
                        />
                </MapView>
            </View>
        );
    }
  _onInfoWindowPress = () => Alert.alert('onInfoWindowPress');

  _refreshLatitudeAndLongitude(nativeEvent){
    if(this.state.mapLatitude == 0){
        this.setState({
            mapLatitude:nativeEvent.latitude,
            mapLongitude:nativeEvent.longitude,
            latitude:nativeEvent.latitude,
            longitude:nativeEvent.longitude,
        });
        console.log("_refreshLatitudeAndLongitude",nativeEvent,this.state);
        if(nativeEvent.latitude != 0){
            //调用接口刷新城市
            storeMobx.getRegeoByLocation(nativeEvent.latitude,nativeEvent.longitude);
        }
        
    }
  }
  
  _onDragEvent = ({ nativeEvent }) => {
        this.setState({
            latitude:nativeEvent.latitude,
            longitude:nativeEvent.longitude,
        });
        storeMobx.refreshStoreInfoProperty('mapX',nativeEvent.latitude);
        storeMobx.refreshStoreInfoProperty('mapY',nativeEvent.longitude);
        storeMobx.getRegeoByLocation(this.state.latitude,this.state.longitude);
  }

  /**
   * 刷新地址
   * 修改storeInfo 对象 address 值
   * 调用接口修改精度和维度
   * 
   * @param {地址} value 
   */
  _refreshStoreAddress(){
      let value = storeMobx.storeInfo.address;
      if(value == null || value == ''){
          return ;
      }
      value = storeMobx.storeInfo.addr + value;
    let url = SysConfig.amapWebGeoUrl.replace("@KEY@",SysConfig.amapWebKey).replace("@ADDRESS@",value);
    //storeMobx.refreshStoreInfoProperty('address',value);

    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("_refreshStoreAddress",url,responseJson);
            //请求失败
            if(responseJson.status != "1" || responseJson.count == 0){
                return;
            }
            let tmpGeocodes = responseJson.geocodes;
            let _location = tmpGeocodes[0].location;
           
            let locations = _location.split(',')
            this.setState({
                latitude:parseFloat(locations[1]),
                longitude:parseFloat(locations[0]),
                mapLatitude:parseFloat(locations[1]),
                mapLongitude:parseFloat(locations[0]),
            });
            storeMobx.refreshStoreInfoProperty('mapX',parseFloat(locations[1]));
            storeMobx.refreshStoreInfoProperty('mapY',parseFloat(locations[0]));
            console.log(storeMobx.storeInfo);  
          }).catch(error=>{
            console.error(error);
        });
  }

  componentWillMount() {
}
componentDidMount() {
    this.requestLocationPermission();
}

async requestLocationPermission() {
    try {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("Camera permission denied")
            }
        }
    } catch (err) {
        console.warn(err)
    }
}

componentWillUnmount() {

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


const styles = StyleSheet.create({
    customIcon: {
      width: 40,
      height: 40,
    },
    customInfoWindow: {
      backgroundColor: '#8bc34a',
      padding: 10,
      borderRadius: 10,
      elevation: 4,
      borderWidth: 2,
      borderColor: '#689F38',
      marginBottom: 5,
    },
    customMarker: {
      backgroundColor: '#009688',
      alignItems: 'center',
      borderRadius: 5,
      padding: 5,
    },
    markerText: {
      color: '#fff',
    },
  })
  