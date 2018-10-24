/***
   主页
 ***/

import React,{Component} from 'react';
import { AppRegistry,StyleSheet, Text, View ,Image,Platform,BackHandler,ToastAndroid} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeStyles from '../styles/HomeStyles';
import MyPage from './MyPage'
import IndexPage from './index/IndexPage'
import OrderPage from "./order/OrderPage";
import ShopPage from './shop/ShopPage';


export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'index', //默认选中的选项卡
        }
    }

    render(){
        console.log("HomePage 页面刷新");
        return (
        <View style={HomeStyles.container}>
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab==='index'}
                    title="首页"
                    selectedTitleStyle={HomeStyles.menuIconTextColor}
                    renderIcon={()=><Image style={HomeStyles.menuIcon} source={require('../images/ic_index.png')} />}
                    renderSelectedIcon={() =>
                        <Image style={[HomeStyles.menuIcon,HomeStyles.menuIconImageColor]} source={require('../images/ic_index.png')}/>}
                    onPress={()=>this.setState({selectedTab:'index'})}
                >
                    {/*选项卡对应的页面*/}
                    <IndexPage {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab==='order'}
                    title="订单"
                    selectedTitleStyle={HomeStyles.menuIconTextColor}
                    renderIcon={()=><Image style={HomeStyles.menuIcon} source={require('../images/ic_order.png')} />}
                    renderSelectedIcon={() =>
                        <Image style={[HomeStyles.menuIcon,HomeStyles.menuIconImageColor]} source={require('../images/ic_order.png')}/>}
                    onPress={()=>this.setState({selectedTab:'order'})}
                >
                    <OrderPage {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab==='trading'}
                    title="商品"
                    selectedTitleStyle={HomeStyles.menuIconTextColor}
                    renderIcon={()=><Image style={HomeStyles.menuIcon} source={require('../images/ic_shop.png')} />}
                    renderSelectedIcon={() =>
                        <Image style={[HomeStyles.menuIcon,HomeStyles.menuIconImageColor]} source={require('../images/ic_shop.png')}/>}
                    onPress={()=>this.setState({selectedTab:'trading'})}
                >
                    <ShopPage {...this.props} />
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab==='my'}
                    title="我的"
                    selectedTitleStyle={HomeStyles.menuIconTextColor}
                    renderIcon={()=><Image style={HomeStyles.menuIcon} source={require('../images/ic_my.png')} />}
                    renderSelectedIcon={() =>
                        <Image style={[HomeStyles.menuIcon,HomeStyles.menuIconImageColor]} source={require('../images/ic_my.png')}/>}
                    onPress={()=>this.setState({selectedTab:'my'})}
                >
                    <MyPage {...this.props} />
                </TabNavigator.Item>
            </TabNavigator>
        </View>
        )
        ;
    }

    componentDidMount() {
        console.log("componentDidMount 调用了")
    }

    componentWillMount(){
        console.log("componentWillMount 调用了")
        if (Platform.OS === 'android') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress',
                this.onBackPressed);
        }
    }
    
    componentWillUnmount(){
        console.log("componentWillUnmount 调用了")
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate 调用了")
        return true;
    }

    componentWillReceiveProps(){
        console.log("componentWillReceiveProps 调用了")
    }

    componentWillUpdate(){
        console.log("componentWillUpdate 调用了")
    }

    componentDidUpdate(){
        console.log("componentDidUpdate 调用了")
    }

    onBackPressed = () => {
        const navigationState = this.props.navigation.state;
        const routeName = navigationState.routeName ;
        if (routeName === 'Home') {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress',this.onBackPressed)
            }
            //this.listener.remove();
            BackHandler.exitApp();
            return false;
        }
        return true;
    }
    
    onBackPressExit = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress',onBackPressed)
            }
            this.listener.remove();
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }

}
