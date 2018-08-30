import React,{Component} from 'react'

import {View, Image, Text, TouchableOpacity,Platform} from 'react-native'
import IndexHeaderStyles from "../../styles/index/IndexHeaderStyles";


/**
 * 首页头部
 * add by wuxw 2018-08-25
 */
export default class IndexHeaderPage extends Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    /**
     * 重绘页面
     */
    render(){

        return(

            <View style={[IndexHeaderStyles.container,IndexHeaderStyles.headerView]}>
                {/* 侵入式 头部部分 */}
                {
                    ((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?
                        <View style={IndexHeaderStyles.topBlank}></View>:
                        null
                }
                <View >
                    <View style={IndexHeaderStyles.headerView_1}>
                        <TouchableOpacity>
                            <Image style={IndexHeaderStyles.headerView_1_left_image} source={require('../../images/message.png')}/>
                        </TouchableOpacity>
                        <View>
                            <Text style={IndexHeaderStyles.headerView_1_center_text}>{this.props.pageTitle}</Text>
                        </View>
                        <TouchableOpacity>
                            {/* 这里没有想好放啥*/}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}