import {observable, action, runInAction, autorun, computed} from 'mobx';
import {AsyncStorage} from 'react-native';
import ShopMenu from "../../constants/ShopMenu";
import ShopConst from "../../constants/ShopConst";

/**
 * 商品 处理类
 * add by wuxw 2018-09-06
 */
class ShopMobx{

    // 构造
      constructor() {
          this.reloadShopCatalog();
          this.reloadShopItemFromPhone();
      }


    @observable
    shopData:Array = [
        {
            imagePath:require("../../images/openStore.png"),
            name:"目录管理",
            routeName:"ShopCatalog",
            menuCd:ShopMenu.MENU_CD_NO_SURE,
        },
        {
            imagePath:require("../../images/Auditing.png"),
            name:"商品管理",
            routeName:"ShopManage",
            menuCd:ShopMenu.MENU_CD_NO_SURE,
        },
        {
            imagePath:require("../../images/sampleMenu.png"),
            name:"优惠管理",
            routeName:"OrderList",
            menuCd:ShopMenu.MENU_CD_NO_DELIVERY,
            count:0,
        },
        {
            imagePath:require("../../images/buy.png"),
            name:"未上架商品",
            routeName:"OrderList",
            menuCd:ShopMenu.MENU_CD_NO_DELIVERY,
            count:0,
        },
        {
            imagePath:require("../../images/logisticsMenu.png"),
            name:"推荐商品",
            routeName:"OrderList",
            menuCd:ShopMenu.MENU_CD_DELIVERY,
            count:0,
        },
        {
            imagePath:require("../../images/marketMenu.png"),
            name:"已下架商品",
            routeName:"OrderList",
            menuCd:ShopMenu.MENU_CD_COMPLETE,
            count:0,
        }];

    @observable
    catalogData:Array =[


    ];

    @observable
    shopItemData:Array = [];

    @observable
    currentModifyCatalogData:Object = {
        itemName:"",
        itemValue:"",
    };

    @action
    addShopCatalog(catalogName,catalogSeq){
        //调用后台服务保存数据
        let catalogId = Date.now()+""; // 这个需要后端返回
        this.catalogData.push({
                  itemName:catalogName,
                  itemValue:catalogSeq,
                  action:catalogId
        });

        this.catalogData = this.catalogData.sort(this.compare('itemValue'));

        //this.flushListData();
        this.saveShopCatalog();
        console.log("添加目录",this.catalogData);
    }

    /**
     * 编辑 商品目录
     * @param catalogId
     * @param catalogName
     * @param catalogSeq
     */
    @action
    editShopCatalog(catalogId){
        //调用远程服务刷数据



        let catalogSize = this.catalogData.length;

        for(let catalogIndex = 0; catalogIndex< catalogSize ; catalogIndex ++){
            let catalogObj = this.catalogData[catalogIndex];

            if(catalogObj.action == catalogId){
                catalogObj.itemName = this.currentModifyCatalogData.itemName;
                catalogObj.itemValue = this.currentModifyCatalogData.itemValue;
                //this.currentModifyCatalogData = catalogObj;
                break ;
            }
        }

        this.catalogData = this.catalogData.sort(this.compare('itemValue'));
        this.saveShopCatalog();
        console.log("editShopCatalog",this.catalogData);
    }

    compare(itemValue){
        return (a,b) =>{
            let value1 = a[itemValue];
            let value2 = b[itemValue];
            return value1 - value2;
        }
    }

    /**
     * 刷新当前修改的目录数据
     * @param catalogId
     */
    @action
    refreshCurrentModifyCatalogData(catalogId){
        let catalogSize = this.catalogData.length;

        for(let catalogIndex = 0; catalogIndex< catalogSize ; catalogIndex ++){
            let catalogObj = this.catalogData[catalogIndex];

            if(catalogObj.action == catalogId){
                this.currentModifyCatalogData = catalogObj;
                break ;
            }
        }

        console.log('refreshCurrentModifyCatalogData',this.currentModifyCatalogData);
    }


    @action
    refreshCurrentCatalogDataName(catalogName){
        this.currentModifyCatalogData.itemName= catalogName;

    }

    @action
    refreshCurrentCatalogDataSeq(catalogSeq){
        this.currentModifyCatalogData.itemValue= catalogSeq;

    }

    @action
    deleteCurrentCatalog(){

        //调用服务器删除

        let catalogSize = this.catalogData.length;
        let catalogDataTmp = [];
        for(let catalogIndex = 0; catalogIndex< catalogSize ; catalogIndex ++){
            let catalogObj = this.catalogData[catalogIndex];

            if(catalogObj.action !== this.currentModifyCatalogData.action){
                //this.currentModifyCatalogData = catalogObj;
                catalogDataTmp.push(catalogObj);
            }
        }
        this.catalogData = catalogDataTmp;

        this.saveShopCatalog();
        this.catalogData = this.catalogData.sort(this.compare('itemValue'));
    }



    flushListData(){
        let listDataTmp = this.catalogData;

        this.catalogData = [];

        this.catalogData = listDataTmp;
    }

    /**
     * 从磁盘中加载数据
     * add by wuxw 2018-09-18
     */
    @action
    reloadShopCatalogData(){
        this.reloadShopCatalog();
    }

    /**
     * 初始化刷第一个为true 其他都为false
     */
    @action
    flushCatalogDataCheckStatus(){
        let catalogsLength = this.catalogData.length;

        for(let catalogIndex = 0; catalogIndex < catalogsLength;catalogIndex ++){
            if(catalogIndex == 0){
                this.catalogData[catalogIndex].check=true;
                continue;
            }

            this.catalogData[catalogIndex].check=false;
        }
    }

    /**
     * 根据 目录ID 刷状态
     * 指定 目录ID 刷为true 其他为false
     * @param catalogId
     */
    @action
    flushCatalogDataCheckStatusByCatalogId(catalogId){
        let catalogsLength = this.catalogData.length;
        for(let catalogIndex = 0; catalogIndex < catalogsLength;catalogIndex ++){
            if(this.catalogData[catalogIndex].action == catalogId){
                this.catalogData[catalogIndex].check=true;
                continue;
            }

            this.catalogData[catalogIndex].check=false;
        }

        console.log("flushCatalogDataCheckStatusByCatalogId ",this.catalogData);
    }

    @action
    reflushTempCatalogData(catalogId,tmpCatalogData){
        for(let tmpIndex = 0 ; tmpIndex < tmpCatalogData.length;tmpIndex++){
            tmpCatalogData[tmpIndex].id = tmpCatalogData[tmpIndex].action;
            tmpCatalogData[tmpIndex].value = tmpCatalogData[tmpIndex].itemName;
            if(tmpCatalogData[tmpIndex].id == catalogId){
                tmpCatalogData[tmpIndex].check = '1';
            }else{
                tmpCatalogData[tmpIndex].check = '0';
            }
        }

        tmpCatalogData = tmpCatalogData.sort(this.compare('itemValue'));
        return tmpCatalogData;
    }
    
    @action
    getCatalogName(catalogId){
        for(let tmpIndex = 0 ; tmpIndex < this.catalogData.length;tmpIndex++){
            
            if(this.catalogData[tmpIndex].action == catalogId){
                return this.catalogData[tmpIndex].itemName;
            }
        }
    }

    @action
    getCatalogInfo(catalogId){
        for(let tmpIndex = 0 ; tmpIndex < this.catalogData.length;tmpIndex++){
            
            if(this.catalogData[tmpIndex].action == catalogId){
                return this.catalogData[tmpIndex];
            }
        }
    }

    /**
     * 保存数据
     */
    saveShopCatalog(){
        AsyncStorage.setItem(ShopConst.SAVE_CATALOG_KEY, JSON.stringify(this.catalogData),(error)=>{
            if (error){
                console.log("存值失败",error);
            }else{
                console.log('存值成功!');
                //这里调用后端发起保存数据
            }
        });
    }

    /**
     * 加载 商品目录
     * @returns {Promise.<void>}
     */
    reloadShopCatalog = async () =>{
        try {
            const value = await AsyncStorage.getItem(ShopConst.SAVE_CATALOG_KEY);
            if (value !== null) {
                let valueObj = JSON.parse(value);
                this.catalogData = valueObj;

            }
        } catch (error) {
            // Error retrieving data
            console.log("_retrieveData ",error)
        }
    }

    /**
     * 添加商品信息
     */
    @action
    addShopItemData(stateInfo){

        let shopId = Date.now()+"";
        let shopPhotoId = Date.now()+"001";

        //目录ID
        let catalogId = stateInfo.catalogId;
        let shopItemInfo = {
            shopId:shopId,
            catalogId:catalogId,
            name:stateInfo.shopName,
            hotBuy:"N",
            salePrice:stateInfo.shopPrice,
            openShopCount:stateInfo.openShopCount,
            shopCount:stateInfo.shopCount,
            startDate:stateInfo.startDate,
            endDate:stateInfo.endDate,
            shopAttr:[],
            shopPhoto:[{
                shopPhotoId:shopPhotoId,
                shopPhotoTypeCd:"L",
                photo:stateInfo.shopLogo
            }],
            shopPreferential:{
            },
            shopDescribe:stateInfo.shopDesc,
        }

        if(!this._hasCatalogInShopItem(catalogId,this.shopItemData)){
            let shopData = {
                catalogId:catalogId,
                key:catalogId,
                catalogName:this.getCatalogInfo(catalogId).itemName,
                catalogSeq:this.getCatalogInfo(catalogId).itemValue,
                data:[shopItemInfo]
            };
            this.shopItemData.push(shopData);
        }else{
            for(let shopIndex = 0 ;shopIndex <this.shopItemData.length;shopIndex ++){
                if(this.shopItemData[shopIndex].catalogId == catalogId){
                    this.shopItemData[shopIndex].data.push(shopItemInfo);
                }
            }
        }

        this.shopItemData = this.shopItemData.sort(this.compare('catalogSeq'));

        //this.flushListData();
        this.saveShopItemToPhone();
    }

    @computed get shopItemDataList(){

        return this.refreshKeyFromShopItem();         
    }

    refreshKeyFromShopItem(){
        //刷key
        let tempShopItemData = this.shopItemData.map((v)=>{
            return {
                catalogId:v.catalogId,
                key:v.key,
                catalogName:v.catalogName,
                catalogSeq:v.catalogSeq,
                data:v.data.slice()
            }
        }).slice();

         for(let tmpShopItemIndex = 0;tmpShopItemIndex < tempShopItemData.length; tmpShopItemIndex++){
            tempShopItemData[tmpShopItemIndex].key = tmpShopItemIndex;
        }

        return tempShopItemData;
    }

    /**
     * 根据商品目录ID找key
     * @param {目录ID} catalogId 
     */
    @action
    getShopSectionKeyByCatalogId(catalogId){
        let tempShopItemData = this.refreshKeyFromShopItem();
        for(let tmpShopItemIndex = 0;tmpShopItemIndex < tempShopItemData.length; tmpShopItemIndex++){
            if(tempShopItemData[tmpShopItemIndex].catalogId == catalogId){
                return tempShopItemData[tmpShopItemIndex].key;
            }
        }

        return -1;
    }

    /**
     * 商品列表中是否已经存在 目录ID
     * @param {目录ID} catalogId 
     * @param {商品信息} shopItemData 
     */
    _hasCatalogInShopItem(catalogId,shopItemData){
        for(let shopIndex = 0 ;shopIndex <shopItemData.length;shopIndex ++){
            if(shopItemData[shopIndex].catalogId == catalogId){
                return true;
            }
        }

        return false;
    }

     /**
     * 保存数据
     */
    saveShopItemToPhone(){
        AsyncStorage.setItem(ShopConst.SAVE_SHOP_ITEM_INFO_KEY, JSON.stringify(this.shopItemData),(error)=>{
            if (error){
                console.log("存值失败",error);
            }else{
                console.log('存值成功!');
                //这里调用后端发起保存数据
            }
        });
    }

    /**
     * 加载 商品数据
     * @returns {Promise.<void>}
     */
    reloadShopItemFromPhone = async () =>{
        try {
            const value = await AsyncStorage.getItem(ShopConst.SAVE_SHOP_ITEM_INFO_KEY);
            if (value !== null) {
                let valueObj = JSON.parse(value);
                this.shopItemData = valueObj;

            }
        } catch (error) {
            // Error retrieving data
            console.log("_retrieveData ",error)
        }
    }

    /**
     * 根据对象属性名称和 商品ID获取对应属性值
     * @param {对象属性名} columnName 
     * @param {商品ID} shopId 
     */
    @action
    getShopColumnValueByColumnNameAndShopId(columnName,shopId){
        let shopItemDataSize = this.shopItemData.length;
        for(let shopItemIndex = 0;shopItemIndex < shopItemDataSize;shopItemIndex++){
            let data = this.shopItemData[shopItemIndex].data;

            for(let shopDataIndex = 0;shopDataIndex < data.length;shopDataIndex ++){
                let tempData = data[shopDataIndex];
                if(shopId == tempData.shopId){
                    return tempData[columnName];
                }
            }
        }

        return null;
    }

    @action
    editShopItemData(stateInfo){

        let shopItemDataSize = this.shopItemData.length;
        for(let shopItemIndex = 0;shopItemIndex < shopItemDataSize;shopItemIndex++){
            let data = this.shopItemData[shopItemIndex].data;

            for(let shopDataIndex = 0;shopDataIndex < data.length;shopDataIndex ++){
                let tempData = data[shopDataIndex];
                if(shopId == tempData.shopId){
                    _flushShopItemData(stateInfo,tempData);
                    
                }
            }
        }
    }
    /**
     * 将页面填写的数据刷到数据对象中
     * 
     * @param {页面填写数据} stateInfo 
     * @param {商品数据对象} shopData 
     */
    _flushShopItemData(stateInfo,shopData){
            shopData.catalogId=stateInfo.catalogId;
            shopData.name=stateInfo.shopName;
            shopData.salePrice=stateInfo.shopPrice;
            shopData.openShopCount=stateInfo.openShopCount;
            shopData.shopCount=stateInfo.shopCount;
            shopData.startDate=stateInfo.startDate;
            shopData.endDate=stateInfo.endDate;
            //保存头像信息
            for(let shopPhotoIndex = 0;shopPhotoIndex < shopData.shopPhoto.length;shopPhotoIndex ++){
                if(shopData.shopPhoto[shopPhotoIndex].shopPhotoTypeCd == 'L'){
                    shopData.shopPhoto[shopPhotoIndex].photo = stateInfo.shopLogo
                }
            }
            shopData.shopDescribe=stateInfo.shopDesc;
            this.saveShopItemToPhone();
    }

    @action
    deleteShopItemData(shopId){
        let shopItemDataSize = this.shopItemData.length;
        for(let shopItemIndex = 0;shopItemIndex < shopItemDataSize;shopItemIndex++){
            let data = this.shopItemData[shopItemIndex].data;
            if(data.length == 1){
                this.shopItemData.remove(this.shopItemData[shopItemIndex]);
                this.saveShopItemToPhone();
                return;
            }
            for(let shopDataIndex = 0;shopDataIndex < data.length;shopDataIndex ++){
                let tempData = data[shopDataIndex];
                if(shopId == tempData.shopId){
                    data.remove(tempData); 
                    this.saveShopItemToPhone();
                    return ;
                }
            }
        }
    }
}




shopMobx = new ShopMobx();

export default shopMobx