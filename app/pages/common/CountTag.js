import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';
const {width, height} = Dimensions.get('window');
//模块声名并导出
export default class CountTag extends Component {

    //默认属性
    static defaultProps = {
        fontSize: 14,//字体大小
        backgroundColor: '#F24E3E',//背景颜色
        color: '#ffffff',//字体颜色
        defaultWidth: 14,

    };
    //构造函数
    constructor(props) {
        super(props);
        this.state = { //状态机变量声明
        }
    }

    //渲染
    render() {
        return (
            <View
                style={[styles.contentStyle,this.props.style,{backgroundColor: this.props.backgroundColor,borderColor: this.props.backgroundColor,minWidth: this.props.defaultWidth,height: this.props.defaultWidth}]}>
                <Text numberOfLines={1}
                      style={{color: this.props.color,fontSize:this.props.fontSize,margin:3}}>{this.props.text}</Text>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    contentStyle: {
        borderRadius: 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});