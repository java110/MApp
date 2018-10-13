import { observable, action, runInAction, autorun, computed } from 'mobx';
import { AsyncStorage } from 'react-native';


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

  storeTypeData: Array = [
    {
      storeTypeCd: 1,
      check: 0,
      name: "饭店",
    },
    {
      storeTypeCd: 1,
      check: 0,
      name: "超市",
    },
    {
      storeTypeCd: 1,
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
    storeTypeData = storeTypeData.sort(this.compare('value'));
    return storeTypeData;
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




}




storeMobx = new StoreMobx();

export default storeMobx