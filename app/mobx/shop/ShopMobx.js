import {observable, action, runInAction, autorun} from 'mobx';
import ShopMenu from "../../constants/ShopMenu";


/**
 * 商品 处理类
 * add by wuxw 2018-09-06
 */
class ShopMobx{


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
            routeName:"OrderList",
            menuCd:ShopMenu.MENU_CD_NO_SURE,
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
        this.catalogData = this.catalogData.sort(this.compare('itemValue'));
    }



    flushListData(){
        let listDataTmp = this.catalogData;

        this.catalogData = [];

        this.catalogData = listDataTmp;

    }

}




shopMobx = new ShopMobx();

export default shopMobx