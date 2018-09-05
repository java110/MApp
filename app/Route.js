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
        }
},{
    headerMode:'none'});


export default RootStack;