import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Platform, ScrollView, ListView} from 'react-native';

import {Button} from 'teaset';

import orderMobx from "../../mobx/order/OrderMobx";
import OrderDetailStyles from "../../styles/order/OrderDetailStyles";

import CommonStyles from "../../styles/CommonStyles";
import ContextHeaderPage from "../ContextHeaderPage";
import {observer} from "mobx-react";

/**
 * 订单详情页
 */
@observer
export default class OrderDetailPage extends Component{


    // 构造
      constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 初始状态
        this.state = {
            header:{backPageName:params.backPageName,
                currentPageName:"订单详情",
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            },
            orderId:params.orderId,
            ds : ds,
            dataSource : ds.cloneWithRows([])
        };

          this._onBackPage = this._onBackPage.bind(this);
          this._onCallUser = this._onCallUser.bind(this);
      }

    /**
     * 页面渲染
     * @returns {XML}
     */
    render(){

          return (
              <View style={[OrderDetailStyles.container,OrderDetailStyles.body]}>
                  {this.renderHeader()}
                  {this.renderBodyOrder()}
              </View>
          );
      }

    /**
     * 渲染头部信息
     * @returns {XML}
     */
    renderHeader(){
        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?CommonStyles.header:CommonStyles.header_android_low}>
                <ContextHeaderPage {... this.state.header} {... this.props}/>
            </View>
        );

    }

    /**
     * 订单信息
     * @returns {XML}
     */
    renderBodyOrder(){
        return (

            <ScrollView style={OrderDetailStyles.container}>
                <View style={OrderDetailStyles.rowDataHeaderView}>
                    <View style={OrderDetailStyles.rowDataHeaderView_1}>
                        <Text style={OrderDetailStyles.rowDataHeaderViewText}>订单编号：{orderMobx.currentOrderInfo.orderId}</Text>
                        <Text style={OrderDetailStyles.rowDataHeaderViewText}>({orderMobx.currentOrderInfo.orderSeq})</Text>
                    </View>
                    <TouchableOpacity style={OrderDetailStyles.rowDataHeaderView_1} onPress={() => {this._onCallUser(orderMobx.currentOrderInfo.userPhone)}} activeOpacity={0.5}>
                        <Image style={OrderDetailStyles.rowDataHeaderView_1_image} source={require('../../images/order_phone.png')} />
                    </TouchableOpacity>
                </View>

                {this.renderBodyOrderItem()}

            </ScrollView>
        );
    }

    /**
     * 订单项
     */
    renderBodyOrderItem(){


        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
                enableEmptySections={true}
            />

        );
    }

    /**
     * 渲染每行
     * @param rowData
     * @returns {XML}
     * @private
     */
    _renderRow(rowData){
        return (
            <View style={OrderDetailStyles.orderItemsView}>
                <View>
                    <Image style={OrderDetailStyles.orderItemsImage} source={{uri:rowData.imageUrl}}/>
                </View>
                <View>
                    <View>
                        <Text>{rowData.name}</Text>
                    </View>
                </View>
                <View>
                    <View><Text>￥{rowData.price}</Text></View>
                    <View><Text>X {rowData.count}</Text></View>
                </View>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height:1,backgroundColor:'#F3F3F3'}}>

            </View>
        );
    }

    componentWillMount() {
        console.log("OrderDetailPage componentWillMount ");

    }

    componentDidMount() {
        console.log("OrderDetailPage componentDidMount --- 订单ID：",this.state.orderId);

        //这里加载数据
        orderMobx.resetCurrentOrderInfo(this.state.orderId);

        this.setState({
            dataSource : this.state.ds.cloneWithRows(orderMobx.currentOrderInfo.items.slice())
        });
    }

    /**
     * 打电话
     * @param phoneNumber
     * @private
     */
    _onCallUser(phoneNumber){

        const url = 'tel:'+phoneNumber;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('提示','当前手机不支持');
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    _onBackPage(){

    }

}