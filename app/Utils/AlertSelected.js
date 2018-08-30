import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');
const [aWidth] = [width-20];
const [left, top] = [0, 0];
const [middleLeft] = [(width - aWidth) / 2];

export default class AlertSelected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            title: "",
            choose0: "",
            choose1: "",
            hide: true,
            tipTextColor: '#333333',
            aHeight: 236,
        };
        this.entityList = [];//数据源
        this.callback = function () {
        };//回调方法
    }

    render() {
        if (this.state.hide) {
            return (<View />)
        } else {
            return (
                <View style={styles.container}>
                    <Animated.View style={styles.mask}>
                    </Animated.View>

                    <Animated.View style={[{
                        width: aWidth,
                        height: this.state.aHeight,
                        left: middleLeft,
                        ...Platform.select({
                            ios:{
                                bottom: - 20,
                            },
                        }),
                        alignItems: "center",
                        justifyContent: "space-between",
                    }, {
                        transform: [{
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, (height - this.state.aHeight - 34)]
                            }),
                        }]
                    }]}>
                        <View style={styles.content}>
                            <View style={styles.tipTitleView}>
                                <Text style={styles.tipTitleText}>{this.state.title}</Text>
                            </View>
                            {
                                this.entityList.map((item, i) => this.renderItem(item, i))
                            }
                        </View>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={'#f0f0f0'}
                            onPress={this.cancel.bind(this)}
                        >
                            <Text style={styles.buttonText}>取消</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            );
        }
    }

    renderItem(item, i) {
        return (
            <View style={styles.tipContentView}>
                <View style={{height: 0.5, backgroundColor: '#a9a9a9', width: aWidth}}/>
                <TouchableOpacity
                    key={i}
                    onPress={this.choose.bind(this, i)}
                >
                    <View style={styles.item}>
                        <Text style={{
                            color: this.state.tipTextColor,
                            fontSize: 17,
                            textAlign: "center",
                        }}>{item}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
        this.chooseTimer && clearTimeout(this.chooseTimer);
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,//一个用于定义曲线的渐变函数
                    duration: 200,//动画持续的时间（单位是毫秒），默认为200。
                    toValue: 0.8,//动画的最终值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start((finished) => this.setState({hide: true}));
    }

    //取消
    cancel(event) {
        if (!this.state.hide) {
            this.out();
        }
    }

    //选择
    choose(i) {
        if (!this.state.hide) {
            this.out();
            this.chooseTimer = setTimeout(()=>{
                this.callback(i);
            }, 200);
        }
    }

    /**
     * 弹出控件，最多支持3个选项(包括取消)
     * titile: 标题
     * entityList：选择项数据   数组
     * tipTextColor: 字体颜色
     * callback：回调方法
     */
    show(title, entityList, tipTextColor, callback) {
        this.entityList = entityList;
        this.callback = callback;

        if (this.state.hide) {
            if (entityList && entityList.length > 0) {
                let len = entityList.length;
                if (len === 1) {
                    this.setState({title: title, choose0: entityList[0], hide: false, tipTextColor: tipTextColor, aHeight: 180}, this.in);
                } else if (len === 2) {
                    this.setState({title: title, choose0: entityList[0], choose1: entityList[1], hide: false, tipTextColor: tipTextColor, aHeight: 236}, this.in);
                }
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#000000",
        opacity: 0.3,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    // 提示标题
    tipTitleView: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10
    },
    // 提示文字
    tipTitleText: {
        color: "#999999",
        fontSize: 14,
    },
    // 分割线
    tipContentView: {
        width: aWidth,
        height: 56,
        backgroundColor:'#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    item:{
        width: aWidth,
        height: 56,
        backgroundColor:'#fff',
        justifyContent: 'center',
        borderRadius: 5,
    },
    button: {
        height: 57,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,
    },
    // 取消按钮
    buttonText: {
        fontSize: 17,
        color: "#0084ff",
        textAlign: "center",
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 5,
    }
});
