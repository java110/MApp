import {observable, action, runInAction, autorun, computed} from 'mobx';
import {AsyncStorage} from 'react-native';


/**
 * 商户 处理类
 * add by wuxw 2018-10-10
 */
class StoreMobx{

    // 构造
      constructor() {

      }


      @observable
      storeInfo:Object ={

        storeAttr:[],
        storePhoto:[],
        storeCerdentials:[]
      };


      /**
       * 向对象storeInfo 刷入属性
       * 
       * @param {属性名称} key 
       * @param {属性} value 
       */
      @action
      refreshStoreInfoProperty(key,value){
          this.storeInfo[key]=value;
      }
      /**
       * 向对象storeInfo 的 storeAttr 刷入数据
       * @param {属性名称} key 
       * @param {属性} value 
       */
      @action
      refreshStoreInfoOfStoreAttr(key,value){
          let storeAttr = {};
          storeAttr.specCd = key,
          storeAttr.value=value;
          this.storeInfo.storeAttr.push(storeAttr);
      }
      /**
       * 向对象storeInfo 的 storePhoto 刷入数据
       * @param {属性名称} key 
       * @param {属性} value 
       */
      @action
      refreshStoreInfoOfStorePhoto(key,value){
        let storePhoto = {};
        storePhoto.storePhotoTypeCd = key,
        storePhoto.photo=value;
        this.storeInfo.storePhoto.push(storePhoto);
      }
      /**
       * 向对象storeInfo 的 storeCerdentials 刷入数据
       * @param {属性名称} key 
       * @param {属性} value 
       */
      @action
      refreshStoreInfoOfStoreCerdentials(credentialsCd,value,validityPeriod,positivePhoto,negativePhoto){
        let storeCerdentials = {};
        storeCerdentials.credentialsCd = credentialsCd,
        storeCerdentials.value=value;
        storeCerdentials.validityPeriod=validityPeriod;
        storeCerdentials.positivePhoto=negativePhoto;
        this.storeInfo.storeCerdentials.push(storeCerdentials);
      }



}




storeMobx = new StoreMobx();

export default storeMobx