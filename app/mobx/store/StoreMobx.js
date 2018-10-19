import { observable, action, runInAction, autorun, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
import SysConfig from '../../config/SysConfig';

/**
 * 商户 处理类
 * add by wuxw 2018-10-10
 */
class StoreMobx {

  // 构造
  constructor() {

  }


  @observable
  storeInfo: Object = {
    addr:'',
    storeAttr: [],
    storePhoto: [],
    storeCerdentials: []
  };


  /**
   * 向对象storeInfo 刷入属性
   * 
   * @param {属性名称} key 
   * @param {属性} value 
   */
  @action
  refreshStoreInfoProperty(key, value) {
    this.storeInfo[key] = value;
  }
  /**
   * 向对象storeInfo 的 storeAttr 刷入数据
   * @param {属性名称} key 
   * @param {属性} value 
   */
  @action
  refreshStoreInfoOfStoreAttr(key, value) {
    let storeAttr = {};
    storeAttr.specCd = key,
      storeAttr.value = value;
    this.storeInfo.storeAttr.push(storeAttr);
  }
  /**
   * 向对象storeInfo 的 storePhoto 刷入数据
   * @param {属性名称} key 
   * @param {属性} value 
   */
  @action
  refreshStoreInfoOfStorePhoto(key, value) {
    let storePhoto = {};
    storePhoto.storePhotoTypeCd = key,
      storePhoto.photo = value;
    this.storeInfo.storePhoto.push(storePhoto);
  }
  /**
   * 向对象storeInfo 的 storeCerdentials 刷入数据
   * @param {属性名称} key 
   * @param {属性} value 
   */
  @action
  refreshStoreInfoOfStoreCerdentials(credentialsCd, value, validityPeriod, positivePhoto, negativePhoto) {
    let storeCerdentials = {};
    storeCerdentials.credentialsCd = credentialsCd,
      storeCerdentials.value = value;
    storeCerdentials.validityPeriod = validityPeriod;
    storeCerdentials.positivePhoto = negativePhoto;
    this.storeInfo.storeCerdentials.push(storeCerdentials);
  }
  
  @observable
  storeTypeData: Array = [
    {
      storeTypeCd: "1",
      check: 0,
      name: "饭店",
    },
    {
      storeTypeCd: "2",
      check: 0,
      name: "超市",
    },
    {
      storeTypeCd: "3",
      check: 0,
      name: "水果店",
    }
  ];

  @action
  getStoreTypeData() {

    //调服务查询当前支持 商店种类
    //这里先死   
    for (let tmpIndex = 0; tmpIndex < this.storeTypeData.length; tmpIndex++) {
      this.storeTypeData[tmpIndex].id = this.storeTypeData[tmpIndex].storeTypeCd;
      this.storeTypeData[tmpIndex].value = this.storeTypeData[tmpIndex].name;
      if (this.storeTypeData[tmpIndex].storeTypeCd == this.storeInfo.storeTypeCd) {
        this.storeTypeData[tmpIndex].check = '1';
      } else {
        this.storeTypeData[tmpIndex].check = '0';
      }
    }
    this.storeTypeData = this.storeTypeData.sort(this.compare('value'));
    return this.storeTypeData;
  }

  compare(itemValue){
    return (a,b) =>{
        let value1 = a[itemValue];
        let value2 = b[itemValue];
        return value1 - value2;
    }
}

  /**
   * 根据 商户类别编码 storeTypeCd 查询 名称
   * @param {商户类别编码} storeTypeCd 
   */
  @action
  getStoreTypeNameByStoreTypeCd(storeTypeCd) {
    for (let tmpIndex = 0; tmpIndex < this.storeTypeData.length; tmpIndex++) {
      if (this.storeTypeData[tmpIndex].storeTypeCd == storeTypeCd) {
          return this.storeTypeData[tmpIndex].name;
      }
    }
    return null;
  }

  @action
  getRegeoByLocation(latitude,longitude){
    let url = SysConfig.amapWebRegeoUrl.replace("@KEY@",SysConfig.amapWebKey).replace("@LOCATION@",longitude+","+latitude);
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            //请求失败
            if(responseJson.status != "1"){
                return;
            }
            let tmpRegeocode = responseJson.regeocode;
            let addressComponent = tmpRegeocode.addressComponent;
            let province = addressComponent.province;
            let city = addressComponent.city;
            let district = addressComponent.district; 
            //let address = responseJson.regeocode.formatted_address;
            this.refreshStoreInfoProperty('addr',province+city+district);
            console.log(url,storeMobx.storeInfo);  
            return responseJson;
          }).catch(error=>{
            console.error(error);
        });
  }


  /**
   * 刷新对象地址
   */
  refreshStoreInfo(){
      let tmpStoreInfo = this.storeInfo;

      this.storeInfo = {};

      this.storeInfo = tmpStoreInfo;
  }


  /**
   * 根据照片类型查询照片信息
   * 
   * @param {照片类型} key 
   * 
   * @returns {照片类型} storePhotoTypeCd ,{照片信息} photo
   */
  @action
  getStorePhotoOfStoreInfo(key) {

    let tmpStorePhoto = this.storeInfo.storePhoto;
    let returnStorePhoto = [];

    for(let tmpStorePhotoIndex = 0 ;tmpStorePhotoIndex < tmpStorePhoto.length;tmpStorePhotoIndex ++){
        if(tmpStorePhoto[tmpStorePhotoIndex].storePhotoTypeCd == key){
            returnStorePhoto.push(tmpStorePhoto[tmpStorePhotoIndex]);
        }
    }
    
    return returnStorePhoto;
  }




}




storeMobx = new StoreMobx();

export default storeMobx