import {observable, action, runInAction, autorun} from 'mobx';
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

        let shopItemInfo = {
            shopId:shopId,
            catalogId:"123213",
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
        this.shopItemData.push(shopItemInfo);

        this.shopItemData = this.shopItemData.sort(this.compare('shopId'));

        //this.flushListData();
        this.saveShopItemToPhone();
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
}




shopMobx = new ShopMobx();

export default shopMobx