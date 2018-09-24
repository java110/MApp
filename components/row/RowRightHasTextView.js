import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
/**
 * 一行 右边是文字的组件
 *
 *  viewId ID 可以写一个不重复的值，将在_onClick 时回传
 *  leftText 左侧显示的文字
 *  rightText 右侧文字
 *  _onClick 点击回调方法
 *
 * add by wuxw 2018-09-20
 */
export default class RowRightHasTextView extends Component {


    static propTypes = {
        leftText: PropTypes.string.isRequired,
        rightText: PropTypes.string.isRequired,
        _onClick: PropTypes.func.isRequired
    };


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this._onClick = this._onClick.bind(this);
    }

    /**
     * 渲染
     */
    render() {
        return (
            <TouchableOpacity
                onPress={this._onClick}
                style={[styles.rowView, this.props.style]}
            >
                <View style={styles.rowView_0}>
                    <View>
                        <Text style={styles.rowViewText}>{this.props.leftText}</Text>
                    </View>
                    <View style={styles.rowView_1}>
                        {
                            this.props.hasOwnProperty('rightText') && this.props.rightText == '' ?
                            null :
                            <Text style={styles.rowViewText}>{this.props.rightText}</Text>
                        }
                        <Image
                            source={require('../../icon/listview/more.png')}
                            style={styles.rowViewRightImage}
                        ></Image>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 点击
     * @param data 当前数据
     * @private
     */
    _onClick() {
        if (this.props.hasOwnProperty("_onClick")) {
            this.props._onClick();
        }
    }
}

/**
 * 样式
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingRight: 10,
    },
    rowViewText: {
        fontSize: 16,
        color: '#333'
    },
    rowView_0: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#F3F3F3",
    },
    rowView_1: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rowViewRightValueImage: {
        height: 60,
        width: 60,
        marginRight: 5,
        borderRadius: 5
    },
    rowViewRightImage: {
        height: 12,
        width: 12
    },
});