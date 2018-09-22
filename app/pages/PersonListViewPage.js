import React,{Component} from 'react'
//import ListViewPage from "./ListViewPage";
import ListViewStyles from "../styles/ListViewStyles";
import {Image, Text, TouchableOpacity, View,ListView,Alert,Linking} from "react-native";
import VALUE_TYPE from "../constants/ValueTypeConst";
import PersonListViewStyles from "../styles/PersionListViewStyles";
import PAGE_ACTION from "../constants/PageActionConst";


export default class PersonListViewPage extends Component{


    /*constructor(props) {
        super(props);
        this._onPersonPress = this._onPersonPress.bind(this);

    }*/

    constructor(props) {
        super(props);
        console.log("进入PersonListViewPage",props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.ds = ds;

        this._onPersonPress = this._onPersonPress.bind(this);
        this._readyData = this._readyData.bind(this);

    }

    _readyData(){
        console.log("PersonListViewPage constructor ",this.props);

        const store = this.props.store;

        console.log("personListData",store.personListData.data.slice());
        this.state={
            dataSource : this.ds.cloneWithRows(store.personListData.data.slice())
        };
    }

    render(){
        this._readyData();
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }



    _renderRow(rowData){
        return (
            <TouchableOpacity onPress={() =>{this._onPersonPress(rowData.pageAction,rowData.itemValueType,rowData.message,rowData.itemValue)}} activeOpacity={0.5}>
                {
                    rowData.itemValueType === VALUE_TYPE.IMAGE ?
                    <View style={PersonListViewStyles.container}>
                        <View style={ListViewStyles.itemStart}>
                            {rowData.hasOwnProperty('itemImage')?
                                <Image style={ListViewStyles.itemImage} source={rowData.itemImage}/>:null
                            }
                            <Text style={ListViewStyles.itemText}>{rowData.itemName}</Text>
                        </View>
                        <View style={ListViewStyles.itemEnd}>
                            <Image style={PersonListViewStyles.itemValueImage} source={rowData.itemValue}/>
                            <Image style={ListViewStyles.itemActionImage} source={rowData.itemActionImage}/>
                        </View>
                    </View>:
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

                }
            </TouchableOpacity>
        );
    }

    _onPersonPress(pageAction,itemValueType,message,itemValue){

        if(itemValueType === VALUE_TYPE.IMAGE){
            this.props.onShowSelectPhoto(message);
            return;
        }

        //super._onPress(pageAction,message)

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
            this.props.navigation.navigate(message,{'data':itemValue});
        }
    }
}