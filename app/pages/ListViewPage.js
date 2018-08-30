import React,{Component} from 'react';

import { AppRegistry, Text, View,Image,ListView,Alert,TouchableOpacity,Linking} from 'react-native';

import ListViewStyles from '../styles/ListViewStyles';

import PAGE_ACTION from '../constants/PageActionConst';

/**
 *
 */
export default class ListViewPage extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log("ListViewPage",this.props);
        this.state={
            dataSource : ds.cloneWithRows(this.props.data)
        }

    }
    render(){

        return (
            <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this._renderRow.bind(this)}
            />
        );
    }
    _renderRow(rowData){

       return (
           <TouchableOpacity onPress={this._onPress.bind(this,rowData.pageAction,rowData.message)} activeOpacity={0.5}>
               <View style={ListViewStyles.container}>
                   <View style={ListViewStyles.itemStart}>
                       {rowData.hasOwnProperty('itemImage')?
                       <Image style={ListViewStyles.itemImage} source={rowData.itemImage}/>:null
                        }
                       <Text style={ListViewStyles.itemText}>{rowData.itemName}</Text>
                   </View>
                   <View style={ListViewStyles.itemEnd}>
                           <Text >{rowData.itemValue}</Text>
                       <Image style={ListViewStyles.itemActionImage} source={rowData.itemActionImage}/>
                   </View>
               </View>
           </TouchableOpacity>
       );
    }

    _onPress(pageAction,message){


        console.log(pageAction);
        if(pageAction === PAGE_ACTION.empty){
            // 为空时啥都不做
        }else if(pageAction === PAGE_ACTION.alert){
            //这里是弹窗
            Alert.alert('提示',message);
        }else if(pageAction === PAGE_ACTION.html){
            // 这里跳转默认的WebView
        }else if(pageAction === PAGE_ACTION.tel){
            const url = 'tel:'+message;
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    Alert.alert('提示','当前手机不支持');
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));

        }else if(pageAction === PAGE_ACTION.page){
            // 注意 这里的组件必须在route预先定义过
            this.props.navigation.navigate(message,{'data':message});
        }
    }
}