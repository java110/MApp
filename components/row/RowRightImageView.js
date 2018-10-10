import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
/**
 * 一行 右边是图片的组件
 *
 *  leftText 左侧显示的文字
 *  imageData 右侧图片数据
 *  _onClick 点击回调方法 可选
 *  style 样式
 * add by wuxw 2018-09-20
 */
export default class RowRightImageView extends Component {


    static propTypes = {
        leftText: PropTypes.string.isRequired,
        imageData: PropTypes.object.isRequired
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
        console.log("rowIamge", this.props.imageData);
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
                            this.props.imageData.hasOwnProperty('uri') && this.props.imageData.uri == '' ?
                            null :
                            <Image source={this.props.imageData}
                                style={styles.rowViewRightValueImage}
                            ></Image>
                        }
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