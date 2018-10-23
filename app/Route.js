/**
 * 路由文件
 *
 */
import React from 'react';
import {createStackNavigator} from 'react-navigation';
import HomePage from './pages/HomePage'
import WelcomePage from "./pages/WelcomePage";
import PersonPage from "./pages/PersonPage"
import CameraScreenPage from "./pages/CameraScreenPage";
import CameraImageViewPage from "./pages/CameraImageViewPage";
import ModifyPersonNamePage from "./pages/person/ModifyPersonNamePage";
import ModifyPersonAddressPage from "./pages/person/ModifyPersonAddressPage";
import ModifyPersonPasswordPage from "./pages/person/ModifyPersonPasswordPage";
import ModifyPersonSexPage from "./pages/person/ModifyPersonSexPage";
import OrderListPage from "./pages/order/OrderListPage";
import CodeReadingPage from "./pages/common/CodeReadingPage";
import OrderDetailPage from "./pages/order/OrderDetailPage";
import OrderPage from "./pages/order/OrderPage";
import QueryOrderListPage from "./pages/order/QueryOrderListPage";
import ShopPage from "./pages/shop/ShopPage";
import ShopCatalogPage from "./pages/shop/ShopCatalogPage";
import AddShopCatalogPage from "./pages/shop/AddShopCatalogPage";
import BlueToothPrinterPage from "./pages/test/BlueToothPrinterPage";
import EditShopCatalogPage from "./pages/shop/EditShopCatalogPage";
import SettingsPage from "./pages/settings/SettingsPage";
import SettingPrinterPage from "./pages/settings/SettingPrinterPage";
import ShopManagePage from "./pages/shop/ShopManagePage";
import AddShopPage from "./pages/shop/AddShopPage";

import EditShopPage from "./pages/shop/EditShopPage";
import ViewShopPage from "./pages/shop/ViewShopPage";
import DownlineShopPage from './pages/shop/DownlineShopPage';
import RecommendShopPage from './pages/shop/RecommendShopPage';
import StoreListPage from './pages/store/StoreListPage';
import StoreAuditPage from './pages/store/StoreAuditPage';
import ViewStorePage from './pages/store/ViewStorePage';
import OpenStorePage from './pages/store/OpenStorePage';
import EnterCommunityPage from './pages/community/EnterCommunityPage';
import AddStoreAddressPage from './pages/store/AddStoreAddressPage';
import AddStoreDoorHeaderPhotoPage from './pages/store/AddStoreDoorHeaderPhotoPage';
import AddStoreInnerPhotoPage from './pages/store/AddStoreInnerPhotoPage';
import AddBusinessLicencePage from './pages/store/AddBusinessLicencePage';
import AddAuthorizationLetterPage from './pages/store/AddAuthorizationLetterPage';
import AddBusinessCertificatePage from './pages/store/AddBusinessCertificatePage';
import AsyncStoragePage from './pages/test/AsyncStoragePage';
import ViewStorePhotoPage from './pages/store/ViewStorePhotoPage';

/**
 *
 *   this.props.navigation.navigate('Details') 将新路由推送到堆栈导航器（如果它尚未在堆栈中），否则它将跳转到该屏幕
     this.props.navigation.push('Details') 继续推送新路由
     this.props.navigation.popToTop() 返回到堆栈中的第一个屏幕
     this.props.navigation.goBack() 返回到上层路由

 ,
 {
     headerMode:'none',
     /\* 主屏幕的标题配置现在在这里 *\/
navigationOptions: {
    headerStyle: {
        backgroundColor: '#F24E3E',
    },
    headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
    },
}
}
 */
const RootStack = createStackNavigator({

    Welcome: {
        screen: WelcomePage
    },
    Order:{
        screen:OrderPage
    },
    Home: {
        screen: HomePage
    },
    Person:{
        screen:PersonPage
    },
        CameraScreen:{
            screen:CameraScreenPage
        },
        CameraImageView:{
        screen:CameraImageViewPage
        },
        ModifyPersonName:{
        screen:ModifyPersonNamePage
        },
        ModifyPersonAddress:{
        screen:ModifyPersonAddressPage
        },
        ModifyPersonPassword:{
        screen:ModifyPersonPasswordPage
        },
        ModifyPersonSex:{
        screen:ModifyPersonSexPage
        },
    OrderList:{
        screen:OrderListPage
    },
    QueryOrderList:{
        screen:QueryOrderListPage
    },
        CodeReading:{
        screen:CodeReadingPage
        },
        OrderDetail:{
        screen:OrderDetailPage
        },
    Shop:{
        screen:ShopPage
    },
    ShopCatalog:{
        screen:ShopCatalogPage
    },
    AddShopCatalog:{
        screen:AddShopCatalogPage
    },
    EditShopCatalog:{
        screen:EditShopCatalogPage
    },
    BlueToothPrinter:{
        screen:BlueToothPrinterPage
    },
    Settings:{
        screen:SettingsPage
    },
    SettingPrinter:{
        screen:SettingPrinterPage
    },
    ShopManage:{
        screen:ShopManagePage
    },
    AddShop:{
        screen:AddShopPage
    },
    EditShop:{
        screen:EditShopPage
    },
    
    ViewShop:{
        screen:ViewShopPage
    },
    DownlineShop:{
        screen:DownlineShopPage
    },
    RecommendShop:{
        screen:RecommendShopPage
    },
    StoreList:{
        screen:StoreListPage,
    },
    StoreAudit:{
        screen:StoreAuditPage,
    },
    ViewStore:{
        screen:ViewStorePage,
    },
    OpenStore:{
        screen:OpenStorePage,
    },
    EnterCommunity:{
        screen:EnterCommunityPage
    },
    AddStoreAddress:{
        screen:AddStoreAddressPage
    },
    AddStoreDoorHeaderPhoto:{
        screen:AddStoreDoorHeaderPhotoPage
    },
    AddStoreInnerPhoto:{
        screen:AddStoreInnerPhotoPage,
    },
    AddBusinessLicence:{
        screen:AddBusinessLicencePage
    },
    AddAuthorizationLetter:{
        screen:AddAuthorizationLetterPage
    },
    AddBusinessCertificate:{
        screen:AddBusinessCertificatePage
    },
    AsyncStorage:{
        screen:AsyncStoragePage
    },
    ViewStorePhoto:{
        screen:ViewStorePhotoPage
    }
    

},{
    headerMode:'none'});


export default RootStack;