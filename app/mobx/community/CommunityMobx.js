import { observable, action } from 'mobx';
import { AsyncStorage, Alert } from 'react-native';

import CommunityConst from '../../constants/CommunityConst';
import AsyncStorageUtils from '../../Utils/AsynStorageUtils';

/**
 * 小区 处理类
 * 
 * add by wuxw 2018-10-27
 */
class CommunityMobx {

  // 构造
  constructor() {

  }

  @observable
  communityInfos: Array = [];

  @observable
  currentCommunityInfo: Object = {};

  /**
   * 商户入驻小区信息
   */
  @observable
  storeEnterCommunitys: Array = [];


  /**
   * 根据精度维度获取附近的小区
   * @param {精度} longitude 
   * @param {维度} latitude 
   * 
   * @return [] 小区信息
   */
  @action
  getNearCommunity(longitude, latitude) {
    //调用后端服务
    this.getTempCommunity();
  }


  /**
   * 根据小区ID刷新 currentCommunityInfo
   * @param {小区Id} communityId 
   */
  @action
  refreshCurrentCommunityInfoByCommunityId(communityId) {

    //从网络中查询刷新到 currentCommunityInfo 对象上

    this.getTempCurrentCommunityInfo(communityId);

  }



  /**
   * 搜索小区
   * @param {搜索值} searchValue 
   */
  @action
  searchCommunity(searchValue) {
    if (searchValue == null || searchValue == '') {
      //调服务重新查询数据
      this.getTempCommunity();
      return;
    }

    //根据 至去查询小区名称
    this.getTempSearchCommunity();
  }

  getTempCommunity() {
    this.communityInfos = [
      {
        id: '12345678',
        name: '格兰小镇1',
        address: '青海省西宁市城中区申宁路6号格兰小镇',
        tel: '17797193942',
        mapX: '',
        mapY: '',
      },
      {
        id: '12345677',
        name: '格兰小镇2',
        address: '青海省西宁市城中区申宁路6号格兰小镇',
        tel: '17797193942',
        mapX: '',
        mapY: '',
      },
      {
        id: '12345676',
        name: '格兰小镇3',
        address: '青海省西宁市城中区申宁路6号格兰小镇',
        tel: '17797193942',
        mapX: '',
        mapY: '',
      },
      {
        id: '12345675',
        name: '格兰小镇4',
        address: '青海省西宁市城中区申宁路6号格兰小镇',
        tel: '17797193942',
        mapX: '',
        mapY: '',
      }, {
        id: '12345674',
        name: '格兰小镇5',
        address: '青海省西宁市城中区申宁路6号格兰小镇',
        tel: '17797193942',
        mapX: '',
        mapY: '',
      }
    ]
  }

  getTempSearchCommunity() {
    this.communityInfos = [
      {
        id: '12345679',
        name: '东方丽都',
        address: '青海省西宁市城中区申宁路6号格兰小镇',
        tel: '17797193942',
        mapX: '',
        mapY: '',
      }
    ]
  }

  getTempCurrentCommunityInfo(communityId) {
    this.getTempCommunity();

    for (let communityIndex = 0; communityIndex < this.communityInfos.length; communityIndex++) {
      if (this.communityInfos[communityIndex].id == communityId) {
        this.currentCommunityInfo = this.communityInfos[communityIndex];
        break;
      }
    }
  }

  /**
   * 提交审核
   * 
   */
  @action
  submitAudit(storeInfo) {
    if (storeInfo == null || storeInfo == {}) {
      Alert.alert('提示', '没有选择商户')
      return;
    }
  
    //调用后台保存数据

    //这里先保存至手机
    this.saveStoreAndCommunityToPhone(storeInfo);
  }


  /**
    * 保存数据
    */
   saveStoreAndCommunityToPhone(storeInfo) {
    console.log("saveStoreAndCommunityToPhone");
    let tmpStoreInfos = []
    AsyncStorageUtils._get(CommunityConst.SAVE_SHOP_COMMUNITY_RELATION_KEY, (error, result) => {
      if (error) {
        return new Promise(function (resolve, reject) {
          reject('读取[' + StoreConst.SAVE_STORE_INFO_KEY + ']数据失败' + error);
        });
      }
    }).then((result) => {
      console.log('saveStoreAndCommunityToPhone result', result);
      if (result != null && result != '') {
        tmpStoreInfos = JSON.parse(result);
      }
      return tmpStoreInfos;
    }).then((tmpStoreInfos) => {
      let storeAndCommunity ={
        community:this.currentCommunityInfo,
        store:storeInfo
      }
      tmpStoreInfos.push(storeAndCommunity);
      return tmpStoreInfos;
    }).then((tmpStoreInfos) => {
      AsyncStorageUtils._save(CommunityConst.SAVE_SHOP_COMMUNITY_RELATION_KEY, JSON.stringify(tmpStoreInfos), (error) => {
        if (error) {
          console.log("存值失败", error);
        } else {
          console.log('存值成功!');
          //这里调用后端发起保存数据
          //this._reInitStoreInfo();
        }
      })
    }).catch((error) => {
      console.log('saveStoreInfoToPhone', error);
    });
  }

  /**
   * 刷新 商户入驻小区信息
   */
  @action
  refreshStoreEnterCommunity() {
    //首先从本地加载数据
    AsyncStorageUtils._get(CommunityConst.SAVE_SHOP_COMMUNITY_RELATION_KEY, (error, result) => {
      if (error) {
        return new Promise(function (resolve, reject) {
          reject('读取[' + CommunityConst.SAVE_SHOP_COMMUNITY_RELATION_KEY + ']数据失败' + error);
        });
      }
    }).then((result) => {
      console.log('refreshStoreEnterCommunity result', result);
      if (result != null && result != '') {
        tmpStoreInfos = JSON.parse(result);
        this.storeEnterCommunitys = tmpStoreInfos;
      }
    }).catch((error) => {
      console.log('refreshStoreEnterCommunity', error);
    });
    //异步请求服务器加载数据
  }
}

communityMobx = new CommunityMobx();

export default communityMobx