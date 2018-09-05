import React,{Component} from 'react';
import { AppRegistry, Text, View ,Image,Dimensions,TouchableOpacity} from 'react-native';
import WelcomeStyles from '../styles/WelcomeStyles'


/***
 * 欢迎页面
 * 这里可以显示广告
 *
 */

export default class WelcomePage extends Component{

    constructor(){
        super();
        this.state={
            canClickEnter:false,
        }
    }
    render(){
        let wel = this.state.canClickEnter ? <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Home',{})}} activeOpacity={1}>
                <Image style={WelcomeStyles.backImage} source={require("../images/welcome.png")}></Image>
            </TouchableOpacity>
            : <Image style={WelcomeStyles.backImage} source={require("../images/welcome.png")}></Image>;
        return (
                wel
        );
    }

    componentDidMount(){
        console.log("componentDidMount 开始调用")
        setTimeout(() =>{
            this.props.navigation.navigate('Home',{})
        },3000)
    }
}
