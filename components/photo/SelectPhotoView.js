import React,{Component} from 'react';

import {View,Text, TouchableOpacity} from 'react-native';

/**
 * 拍照或从相册中选择
 */
export default class SelectPhotoView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    /**
     * 渲染页面
     */
    render(){
          return(
              <View>
                    <Text>123</Text>
              </View>
          );
      }

}


/**
 * 以下为样式
 * @type {{container: {flex: number, backgroundColor: string}}}
 */
const styles = {

    container:{
        flex:1,
        backgroundColor:'#F3F3F3'
    }

}