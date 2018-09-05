
import React,{Component} from 'react';

import { AppRegistry, Text, View} from 'react-native';

import MyStyles from '../styles/MyStyles';

import MyHeaderPage from './MyHeaderPage';
import MyContextPage from './MyContextPage';

/**
 * 我的 页面设计
 */
export default class MyPage extends Component{

    constructor(props){
        super(props);
        this.state={
            userId:'123456',
            userName:'java110官方',
            userImage:require('../images/ic.png')
        };
    }

    /**
     *
     * @returns {XML}
     */
    render(){
        console.log("进入我的页面");
        return (
            <View style={MyStyles.container}>
                <View style={MyStyles.header}>
                    <MyHeaderPage {... this.state}  {... this.props}/>
                </View>
                <View>
                    <MyContextPage {... this.state} {... this.props}/>
                </View>
            </View>
        );
    }

    componentWillMount() {
        console.log('mypage componentWillMount 调用了');
    }

    componentDidMount() {
        console.log('mypage componentDidMount 调用了');
    }

    componentWillUnmount() {
        console.log('mypage componentWillUnmount 调用了');
    }
}