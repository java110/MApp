
import React,{Component} from 'react';

import { AppRegistry, Text, View,Image,TouchableOpacity} from 'react-native';

import MyHeaderStyles from '../styles/MyHeaderStyles';
import CommonStyles from '../styles/CommonStyles';


/**
 * 我的 头部信息
 */
 export default class MyHeaderPage extends Component{

    constructor(props){
        super(props);

        this._headerImageOnPress = this._headerImageOnPress.bind(this);
    }

    render(){
        return (
            <View style={[MyHeaderStyles.container,CommonStyles.alignItems]}>
                <View>
                    <TouchableOpacity  onPress={() =>{this._headerImageOnPress(this.props.userId)}} activeOpacity={1}>
                        <Image style={[MyHeaderStyles.headerImage]} source={this.props.userImage}
                                  />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[CommonStyles.alignItems,MyHeaderStyles.headerText]}>{this.props.userName}</Text>
                </View>
            </View>
        );
    }

    /**
     * 按头像
     * @param userId
     * @private
     */
    _headerImageOnPress(userId){
        this.props.navigation.navigate('Person',{'userId':userId});
    }
}