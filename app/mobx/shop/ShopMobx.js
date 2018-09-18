import {observable, action, runInAction, autorun} from 'mobx';
import {AsyncStorage} from 'react-native';
import ShopMenu from "../../constants/ShopMenu";
import ShopConst from "../../constants/ShopConst";


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
    shopItemData:Array = [{
        shopId:"1232132",
        catalogId:"123213",
        name:"北京方便面",
        hotBuy:"Y",
        salePrice:"1.50",
        openShopCount:"Y",
        shopCount:"10",
        startDate:"2018-07-07 11:04:00",
        endDate:"2019-07-07 11:04:00",
        shopAttr:[{
            attrId:"123456",
            specCd:"870987",
            value:"不错"
        }],
        shopPhoto:[{
            shopPhotoId:"122222",
            shopPhotoTypeCd:"L",
            photo:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611318920&di=a3018808c6cd6ddea6c87d540db5f98b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd6ca7bcb0a46f21fd8b1b87bfd246b600c33ae15.jpg"
        }],
        shopPreferential:{
            preferentialId:"12323",
            preferentialType:"N",
            preferentialValue:"30",
            preferentialStartDate:"2018-07-07 11:04:00",
            preferentialEndDate:"2019-07-07 11:04:00"
        },
        shopDescribe:"北京方便面"
    },{
        shopId:"1232132",
        catalogId:"123213",
        name:"北京方便面",
        hotBuy:"Y",
        salePrice:"1.50",
        openShopCount:"Y",
        shopCount:"10",
        startDate:"2018-07-07 11:04:00",
        endDate:"2019-07-07 11:04:00",
        shopAttr:[{
            attrId:"123456",
            specCd:"870987",
            value:"不错"
        }],
        shopPhoto:[{
            shopPhotoId:"122222",
            shopPhotoTypeCd:"L",
            photo:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611318920&di=a3018808c6cd6ddea6c87d540db5f98b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd6ca7bcb0a46f21fd8b1b87bfd246b600c33ae15.jpg"
        }],
        shopPreferential:{
            preferentialId:"12323",
            preferentialType:"N",
            preferentialValue:"30",
            preferentialStartDate:"2018-07-07 11:04:00",
            preferentialEndDate:"2019-07-07 11:04:00"
        },
        shopDescribe:"北京方便面"
    },{
        shopId:"1232132",
        catalogId:"123213",
        name:"北京方便面",
        hotBuy:"Y",
        salePrice:"1.50",
        openShopCount:"Y",
        shopCount:"10",
        startDate:"2018-07-07 11:04:00",
        endDate:"2019-07-07 11:04:00",
        shopAttr:[{
            attrId:"123456",
            specCd:"870987",
            value:"不错"
        }],
        shopPhoto:[{
            shopPhotoId:"122222",
            shopPhotoTypeCd:"L",
            photo:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611318920&di=a3018808c6cd6ddea6c87d540db5f98b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd6ca7bcb0a46f21fd8b1b87bfd246b600c33ae15.jpg"
        }],
        shopPreferential:{
            preferentialId:"12323",
            preferentialType:"N",
            preferentialValue:"30",
            preferentialStartDate:"2018-07-07 11:04:00",
            preferentialEndDate:"2019-07-07 11:04:00"
        },
        shopDescribe:"北京方便面"
    }
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

}




shopMobx = new ShopMobx();

export default shopMobx