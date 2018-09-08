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

    @action
    addShopCatalog(catalogName,catalogSeq){
        this.catalogData.push({
                  itemName:catalogName,
                  itemValue:catalogSeq,
                  action:"QQQQ"
        });

        this.catalogData = this.catalogData.sort(this.compare('itemValue'));

        //this.flushListData();

        console.log("添加目录",this.catalogData);
    }

    compare(itemValue){
        return (a,b) =>{
            let value1 = a[itemValue];
            let value2 = b[itemValue];
            return value1 - value2;
        }
    }



    flushListData(){
        let listDataTmp = this.catalogData;

        this.catalogData = [];

        this.catalogData = listDataTmp;

    }

}




shopMobx = new ShopMobx();

export default shopMobx