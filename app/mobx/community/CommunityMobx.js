import { observable, action} from 'mobx';
import { AsyncStorage } from 'react-native';

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
  communityInfos : Array = [];

  @observable
  currentCommunityInfo : Object = {};


  /**
   * 根据精度维度获取附近的小区
   * @param {精度} longitude 
   * @param {维度} latitude 
   * 
   * @return [] 小区信息
   */
  @action
  getNearCommunity(longitude,latitude){
    //调用后端服务
    this.getTempCommunity();
  }


  /**
   * 根据小区ID刷新 currentCommunityInfo
   * @param {小区Id} communityId 
   */
  @action
  refreshCurrentCommunityInfoByCommunityId(communityId){

    //从网络中查询刷新到 currentCommunityInfo 对象上

    this.getTempCurrentCommunityInfo(communityId);
    
  }

  

  /**
   * 搜索小区
   * @param {搜索值} searchValue 
   */
  @action
  searchCommunity(searchValue){
     if(searchValue == null || searchValue == ''){
        //调服务重新查询数据
        this.getTempCommunity();
        return;
     }

     //根据 至去查询小区名称
     this.getTempSearchCommunity();
  }

  getTempCommunity(){
    this.communityInfos = [
      {
        id:'12345678',
        name:'格兰小镇1',
        address:'青海省西宁市城中区申宁路6号格兰小镇',
        tel:'17797193942',
        mapX:'',
        mapY:'',
      },
      {
        id:'12345677',
        name:'格兰小镇2',
        address:'青海省西宁市城中区申宁路6号格兰小镇',
        tel:'17797193942',
        mapX:'',
        mapY:'',
      },
      {
        id:'12345676',
        name:'格兰小镇3',
        address:'青海省西宁市城中区申宁路6号格兰小镇',
        tel:'17797193942',
        mapX:'',
        mapY:'',
      },
      {
        id:'12345675',
        name:'格兰小镇4',
        address:'青海省西宁市城中区申宁路6号格兰小镇',
        tel:'17797193942',
        mapX:'',
        mapY:'',
      },{
        id:'12345674',
        name:'格兰小镇5',
        address:'青海省西宁市城中区申宁路6号格兰小镇',
        tel:'17797193942',
        mapX:'',
        mapY:'',
      }
    ]
  }

  getTempSearchCommunity(){
    this.communityInfos = [
        {
          id:'12345679',
          name:'东方丽都',
          address:'青海省西宁市城中区申宁路6号格兰小镇',
          tel:'17797193942',
          mapX:'',
          mapY:'',
        }
      ]
  }

  getTempCurrentCommunityInfo(communityId){
        this.getTempCommunity();

        for(let communityIndex = 0 ; communityIndex < this.communityInfos.length;communityIndex ++){
            if(this.communityInfos[communityIndex].id == communityId){
                this.currentCommunityInfo = this.communityInfos[communityIndex];
                break;
            }
        }
  }
}

communityMobx = new CommunityMobx();

export default communityMobx