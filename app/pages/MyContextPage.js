
import React,{Component} from 'react';

import { AppRegistry, Text, View,Image} from 'react-native';

import MyContextStyles from '../styles/MyContextStyles';
import CommonStyles from '../styles/CommonStyles'

import ListViewPage from './ListViewPage'

import PageActionConst from '../constants/PageActionConst';

/**
 * 我的 头部信息
 */
export default class MyContextPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [{message:'Settings',pageAction:PageActionConst.page,itemImage:require('../images/setting.png'),itemName:'设置',itemValue:'',itemActionImage:require('../images/more.png')},
                {message:'当前正在开发中',pageAction:PageActionConst.alert,itemImage:require('../images/report.png'),itemName:'意见反馈',itemValue:'',itemActionImage:require('../images/more.png')},
                {message:'当前正在开发中',pageAction:PageActionConst.alert,itemImage:require('../images/help.png'),itemName:'帮助中心',itemValue:'',itemActionImage:require('../images/more.png')},
                {message:'15897089471',pageAction:PageActionConst.tel,itemImage:require('../images/phone.png'),itemName:'客户热线',itemValue:'15897089471',itemActionImage:require('../images/more.png')},
                {message:'当前为最新版本v0.01',pageAction:PageActionConst.alert,itemImage:require('../images/flush.png'),itemName:'检查更新',itemValue:'',itemActionImage:require('../images/more.png')},
                {message:'Home',pageAction:PageActionConst.empty,itemImage:require('../images/about.png'),itemName:'关于',itemValue:'v0.01',itemActionImage:require('../images/more.png')}
            ]
        }
    }

    render(){
        return (
            <View style={[MyContextStyles.container]}>
                <View>
                    <ListViewPage {... this.state}  {... this.props}/>
                </View>
            </View>
        );
    }
}