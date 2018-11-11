/***
   测试表单页
 ***/

import React,{Component} from 'react';
import { AppRegistry,StyleSheet, Text, View ,Image,Platform,BackHandler,ToastAndroid} from 'react-native';
import TestStyles from "../styles/TestStyles";

export default class TestHome extends Component{
    //初始化构造时调用
    constructor(props){
        super(props);
        console.log("我是方法1constructor这里是对控件的一些状态进行初始化，由于该函数不同于getDefaultProps，在以后的过程中，会再次调用，所以可以将控制控件的状态的一些变量放在这里初始化，如控件上显示的文字，可以通过this.state来获取值，通过this.setState来修改state值");
        
    };

    componentWillMount(){
        console.log("我是方法2componentWillMount 调用了 准备加载组件。这个调用时机是在组件创建，并初始化了状态之后，在第一次绘制 render() 之前。可以在这里做一些业务初始化操作，也可以设置组件状态。这个函数在整个生命周期中只被调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次")
        if (Platform.OS === 'android') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress',
                this.onBackPressed);
        }
    }

    render(){
        console.log("我是方法3render！render是一个组件必须有的方法，形式为一个函数，渲染界面，并返回JSX或其他组件来构成DOM，和Android的XML布局、WPF的XAML布局类似，只能返回一个顶级元素");
        return(
            <View style={[TestStyles.container,TestStyles.header]}>
                <Text>hello word</Text>
            </View>
        )
    };

    componentDidUpdate(){
        console.log("调用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误");
    }

    componentDidMount() {
        console.log("componentDidMount 调用了  组件加载完成!")
    }

   
    
    componentWillUnmount(){
        console.log("componentWillUnmount 调用了")
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate 调用了")
        return true;
    }





}