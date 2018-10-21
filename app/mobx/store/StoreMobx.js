import { observable, action, runInAction, autorun, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
import SysConfig from '../../config/SysConfig';
import _ from 'lodash';
import StoreConst from '../../constants/StoreConst';

/**
 * 商户 处理类
 * add by wuxw 2018-10-10
 */
class StoreMobx {

  // 构造
  constructor() {
    this._initDays();
    this._initHours();
  }


  @observable
  storeInfo: Object = {
    addr: '',
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
    this.deleteStoreAttrBySpecCd(key)
    storeAttr.specCd = key;
    storeAttr.value = value;
    this.storeInfo.storeAttr.push(storeAttr);
    console.log('refreshStoreInfoOfStoreAttr',this.storeInfo);
  }
  /**
   * 向对象storeInfo 的 storePhoto 刷入数据
   * @param {属性名称} key 
   * @param {属性} value 
   */
  @action
  refreshStoreInfoOfStorePhoto(key, value) {
    let storePhoto = {};
    //服务端生成返回
    let storePhotoId = Date.now() + "";
    storePhoto.storePhotoTypeCd = key;
    storePhoto.photo = value;
    storePhoto.storePhotoId = storePhotoId;
    this.storeInfo.storePhoto.push(storePhoto);
  }
  /**
   * 向对象storeInfo 的 storeCerdentials 刷入数据
   * @param {属性名称} key 
   * @param {属性} value 
   */
  @action
  refreshStoreInfoOfStoreCerdentials(storeCerdentialsId, credentialsCd, value, validityPeriod, positivePhoto, negativePhoto) {
    let storeCerdentials = {};
    //服务端生成返回
    if (storeCerdentialsId != '-1') {
      this.deleteStoreCerdentialsByCredentialsId(storeCerdentialsId)
    } else {
      storeCerdentialsId = Date.now() + "";
    }
    storeCerdentialsId = Date.now() + "";
    storeCerdentials.storeCerdentialsId = storeCerdentialsId,
      storeCerdentials.credentialsCd = credentialsCd,
      storeCerdentials.value = value;
    storeCerdentials.validityPeriod = validityPeriod;
    storeCerdentials.positivePhoto = positivePhoto;
    storeCerdentials.negativePhoto = negativePhoto;
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

  compare(itemValue) {
    return (a, b) => {
      let value1 = a[itemValue];
      let value2 = b[itemValue];
      return value1 - value2;
    }
  }

  @observable
  days: Array = [

  ];

  @observable
  hours: Array = [

  ];

  /**
   * 初始化星期
   */
  _initDays() {
    var Days = { "1": "星期一", "2": "星期二", "3": "星期三", "4": "星期四", "5": "星期五", "6": "星期六", "7": "星期日" };
    for (let dayIndex = 1; dayIndex < 8; dayIndex++) {
      let day = {
        check: 0,
        id: dayIndex+'',
        value: Days[dayIndex]
      };
      this.days.push(day);
    }
  }
  /**
   * 获取星期
   */
  @action
  getDays(specCd) {
    let tempDays = _.cloneDeep(this.days.slice());
    //属性中获取当前选中的值
    let tmpStoreAttr = this.getStoreAttrOfStoreInfo(specCd);
    let dayId = null;
    if (tmpStoreAttr.length > 0) {
      dayId = tmpStoreAttr[0].value;
    }
    if (dayId == null) {
      return tempDays.sort(this.compare('id'))
    }

    for (let dayIndex = 0; dayIndex < tempDays.length; dayIndex++) {
      if (tempDays[dayIndex].id == dayId) {
        tempDays[dayIndex].check = 1
      } else {
        tempDays[dayIndex].check = 0
      }
    }
    return tempDays.sort(this.compare('id'));
  }

  /**
   * 根据ID显示中文名
   * @param {ID} id 
   */
  @action
  getDayName(dayId){
      console.log('getDayName',dayId)
      for(let tmpDayIndex = 0;tmpDayIndex < this.days.length; tmpDayIndex ++){
        if(this.days[tmpDayIndex].id == dayId+''){
          return this.days[tmpDayIndex].value;
        }
      }
      return "";
  }

  /**
   * 初始化时间
   */
  _initHours() {
    for (let dayIndex = 0; dayIndex < 25; dayIndex++) {
      let hour = {
        check: 0,
        id: dayIndex+'',
        value: dayIndex < 10 ? '0' + dayIndex + ':00' : dayIndex + ':00'
      };
      this.hours.push(hour);
    }
  }

  @action
  getHours(specCd) {
    let tempHours = _.cloneDeep(this.hours.slice());
    //属性中获取当前选中的值
    let tmpStoreAttr = this.getStoreAttrOfStoreInfo(specCd);
    let hourId = null;
    if (tmpStoreAttr.length > 0) {
      hourId = tmpStoreAttr[0].value;
    }
    if (hourId == null) {
      return tempHours.sort(this.compare('id'))
    }

    for (let hourIndex = 0; hourIndex < tempHours.length; hourIndex++) {
      if (tempHours[hourIndex].id == hourId) {
        tempHours[hourIndex].check = 1
      } else {
        tempHours[hourIndex].check = 0
      }
    }
    return tempHours.sort(this.compare('id'))

  }

  /**
   * 根据时间ID查询显示名称
   * @param {时间ID} hourId 
   */
  @action
  getHourName(hourId){
    for(let tmpHourIndex = 0;tmpHourIndex < this.hours.length; tmpHourIndex ++){
      if(this.hours[tmpHourIndex].id == hourId){
        return this.hours[tmpHourIndex].value;
      }
    }
    return "";
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
  getRegeoByLocation(latitude, longitude) {
    let url = SysConfig.amapWebRegeoUrl.replace("@KEY@", SysConfig.amapWebKey).replace("@LOCATION@", longitude + "," + latitude);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //请求失败
        if (responseJson.status != "1") {
          return;
        }
        let tmpRegeocode = responseJson.regeocode;
        let addressComponent = tmpRegeocode.addressComponent;
        let province = addressComponent.province;
        let city = addressComponent.city;
        let district = addressComponent.district;
        //let address = responseJson.regeocode.formatted_address;
        this.refreshStoreInfoProperty('addr', province + city + district);
        console.log(url, storeMobx.storeInfo);
        return responseJson;
      }).catch(error => {
        console.error(error);
      });
  }


  /**
   * 刷新对象地址
   */
  refreshStoreInfo() {
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
    console.log('getStorePhotoOfStoreInfo', key);
    let tmpStorePhoto = this.storeInfo.storePhoto;
    let returnStorePhoto = [];

    for (let tmpStorePhotoIndex = 0; tmpStorePhotoIndex < tmpStorePhoto.length; tmpStorePhotoIndex++) {
      if (tmpStorePhoto[tmpStorePhotoIndex].storePhotoTypeCd == key) {
        returnStorePhoto.push(tmpStorePhoto[tmpStorePhotoIndex]);
      }
    }
    return returnStorePhoto;
  }

  /**
   * 根据属性规格查询属性值
   * @param {属性规格} specCd 
   * 详情查看 https://github.com/java110/MicroCommunity/wiki/dictionary
   */
  @action
  getStoreAttrOfStoreInfo(specCd) {
    let tmpStoreAttr = this.storeInfo.storeAttr;
    let returnStoreAttr = [];

    for (let tmpStoreAttrIndex = 0; tmpStoreAttrIndex < tmpStoreAttr.length; tmpStoreAttrIndex++) {
      if (tmpStoreAttr[tmpStoreAttrIndex].specCd == specCd) {
        returnStoreAttr.push(tmpStoreAttr[tmpStoreAttrIndex]);
      }
    }
    return returnStoreAttr;
  }

  /**
   * 根据证件类型查询证件
   * @param {证件类型} credentialsCd 
   */
  @action
  getStoreCerdentialsOfStoreInfo(credentialsCd) {
    let tmpStoreCerdentials = this.storeInfo.storeCerdentials;
    let returnStoreCerdentials = [];

    for (let tmpStoreCerdentialsIndex = 0; tmpStoreCerdentialsIndex < tmpStoreCerdentials.length; tmpStoreCerdentialsIndex++) {
      if (tmpStoreCerdentials[tmpStoreCerdentialsIndex].credentialsCd == credentialsCd) {
        returnStoreCerdentials.push(tmpStoreCerdentials[tmpStoreCerdentialsIndex]);
      }
    }

    return returnStoreCerdentials;
  }

  /**
   * 根据证件类型查询证件
   * @param {证件ID} credentialsId 
   */
  @action
  deleteStoreCerdentialsByCredentialsId(credentialsId) {
    let tmpStoreCerdentials = this.storeInfo.storeCerdentials;
    let tempStoreCerdentials = [];
    for (let tmpStoreCerdentialsIndex = 0; tmpStoreCerdentialsIndex < tmpStoreCerdentials.length; tmpStoreCerdentialsIndex++) {
      if (tmpStoreCerdentials[tmpStoreCerdentialsIndex].storeCerdentialsId != credentialsId) {
        tempStoreCerdentials.push(tmpStoreCerdentials[tmpStoreCerdentialsIndex]);
      }
    }
    this.storeInfo.storeCerdentials = tempStoreCerdentials;
  }

  @action
  deleteStoreAttrBySpecCd(specCd) {
    let tmpStoreAttr = this.storeInfo.storeAttr;
    let tempStoreAttr = [];

    for (let tmpStoreAttrIndex = 0; tmpStoreAttrIndex < tmpStoreAttr.length; tmpStoreAttrIndex++) {
      if (tmpStoreAttr[tmpStoreAttrIndex].specCd != specCd) {
        tempStoreAttr.push(tmpStoreAttr[tmpStoreAttrIndex]);
      }
    }
    this.storeInfo.storeAttr = tempStoreAttr;
  }

  /**
   * 根据照片ID删除照片
   * @param {照片ID} photoId 
   */
  @action
  deleteStorePhotoOfStoreInfo(photoId) {
    console.log('deleteStorePhotoOfStoreInfo', photoId);
    let tmpStorePhoto = this.storeInfo.storePhoto;
    let returnStorePhoto = [];

    for (let tmpStorePhotoIndex = 0; tmpStorePhotoIndex < tmpStorePhoto.length; tmpStorePhotoIndex++) {
      if (tmpStorePhoto[tmpStorePhotoIndex].storePhotoId != photoId) {
        returnStorePhoto.push(tmpStorePhoto[tmpStorePhotoIndex]);
      }
    }

    this.storeInfo.storePhoto = returnStorePhoto;
  }

  @action
  saveStoreInfo(){
    //保存数据至远程服务器，远程服务做校验

    //将storeInfo 数据保存到硬盘中
    this.saveStoreInfoToPhone();

  }

   /**
     * 保存数据
     */
    saveStoreInfoToPhone(){
      console.log("saveStoreInfoToPhone");
      // 先从手机中加载数据
      this.reloadStoreInfoFromPhone().then((tmpStoreInfos)=>{
        console.log("saveStoreInfoToPhone",tmpStoreInfos);
          if(tmpStoreInfos == null || tmpStoreInfos.length ==0){
            tmpStoreInfos=[]; 
          } 
          tmpStoreInfos.push(this.storeInfo);
          return tmpStoreInfos;
      }).then((tmpStoreInfos)=>{
        AsyncStorage.setItem(StoreConst.SAVE_STORE_INFO_KEY, JSON.stringify(tmpStoreInfos),(error)=>{
          if (error){
              console.log("存值失败",error);
          }else{
              console.log('存值成功!');
              //这里调用后端发起保存数据
          }
        });
      }).catch((error)=>{
        console.error("保存商户信息失败",error);
      })
      

      
  }

  /**
   * 加载 商户数据
   * @returns {Promise.<void>} 多个商户
   */
  reloadStoreInfoFromPhone = async () =>{
      try {
          const value = await AsyncStorage.getItem(StoreConst.SAVE_STORE_INFO_KEY);
          if (value !== null) {
              let valueObj = JSON.parse(value);
              console.log('reloadStoreInfoFromPhone',valueObj);
              return valueObj;
          }
          return null;
      } catch (error) {
          // Error retrieving data
          console.log("_retrieveData ",error)
      }
      
  }



}




storeMobx = new StoreMobx();

export default storeMobx