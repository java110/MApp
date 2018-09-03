import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Platform, ListView, Linking, Alert, ScrollView} from 'react-native';
import OrderListStyles from "../../styles/order/OrderListStyles";
import CommonStyles from "../../styles/CommonStyles";
import ContextHeaderPage from "../ContextHeaderPage";
import orderMobx from "../../mobx/order/OrderMobx";
import {Button} from "teaset";
import {observer} from "mobx-react";
/**
 * 订单列表页
 */
@observer
export default class OrderListPage extends Component{


    // 构造
      constructor(props) {
        super(props);
          const { params } = this.props.navigation.state;
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 初始状态
          console.log('OrderListPage:',orderMobx.orderListData.orders);
        this.state = {
            header:{backPageName:'订单',
                currentPageName:params.name,
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            },
            dataSource : ds.cloneWithRows(orderMobx.orderListData.orders.slice())
        };
        this._onBackPage = this._onBackPage.bind(this);
        this._onCallUser = this._onCallUser.bind(this);
        this._onOrderDetail = this._onOrderDetail.bind(this);
      }

    /**
     * 页面渲染
     */
    render(){

        return (
            <View style={[OrderListStyles.container,OrderListStyles.body]}>
                {this.renderHeader()}
                {this.renderOrderDatas()}
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
     * 渲染数据
     * @returns {XML}
     */
      renderOrderDatas(){
          return (
              <ScrollView>
                  <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this._renderRow.bind(this)}
                      renderSeparator={this._renderSeparator.bind(this)}
                  />
              </ScrollView>

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
                <View style={OrderListStyles.container}>
                    <View style={OrderListStyles.rowDataHeaderView}>
                        <View style={OrderListStyles.rowDataHeaderView_1}>
                            <Text style={OrderListStyles.rowDataHeaderViewText}>订单编号：{rowData.orderId}</Text>
                            <Text style={OrderListStyles.rowDataHeaderViewText}>({rowData.orderSeq})</Text>
                        </View>
                        <TouchableOpacity style={OrderListStyles.rowDataHeaderView_1} onPress={() => {this._onCallUser(rowData.userPhone)}} activeOpacity={0.5}>
                            <Image style={OrderListStyles.rowDataHeaderView_1_image} source={require('../../images/order_phone.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={OrderListStyles.rowDataBodyView}>
                        <View style={[OrderListStyles.rowDataBodyView_1_1,OrderListStyles.rowDataBodyViewHeight]}>
                            <Text style={OrderListStyles.rowDataBodyView_1_1_text}>收 货 人：</Text>
                            <Text style={OrderListStyles.rowDataBodyView_1_1_text}>{rowData.userName}</Text>

                        </View>
                        <View style={[OrderListStyles.rowDataBodyView_1_1,OrderListStyles.rowDataBodyViewHeight]}>
                            <Text style={OrderListStyles.rowDataBodyView_1_1_text}>收货地址：</Text>
                            <Text style={[OrderListStyles.rowDataBodyView_1_1_text,OrderListStyles.rowDataBodyView_1_1_text_address]} numberOfLines={2}>{rowData.address}</Text>
                        </View>
                        <View style={[OrderListStyles.rowDataBodyView_1_1,OrderListStyles.rowDataBodyViewHeight]}>
                            <Text style={OrderListStyles.rowDataBodyView_1_1_text}>派送时间：</Text>
                            <Text style={OrderListStyles.rowDataBodyView_1_1_text}>{rowData.deliveryTime}</Text>
                        </View>
                    </View>

                        <View style={OrderListStyles.rowDataFootView}>
                            <View style={OrderListStyles.rowDataFootView_1}>
                                <Text style={OrderListStyles.rowDataFootView_1_Text}>金额：</Text>
                                <Text style={[OrderListStyles.rowDataFootView_1_Text,OrderListStyles.rowDataFootView_1_money]}>{rowData.money}</Text>
                            </View>
                            <View style={OrderListStyles.rowDataFootView_1}>
                                <Text style={OrderListStyles.rowDataFootView_1_Text}>共计 {rowData.items.slice().length} 件</Text>
                            </View>
                            <View style={OrderListStyles.rowDataFootView_1}>
                                <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={OrderListStyles.rowDataFootViewButton} title="确定订单" onPress={() => {}}/>
                                <Button type = "default" size="sm" titleStyle = {{color:'#555',fontSize:12}} style={OrderListStyles.rowDataFootViewButton} title="详细订单" onPress={() => {this._onOrderDetail(rowData.orderId)}}/>
                            </View>
                        </View>
                </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height:9,backgroundColor:'#F3F3F3'}}>

            </View>
        );
    }


    componentDidMount() {
        console.log("OrderListPage --- componentDidMount");

        //这里加载数据

        /*this.setState({
            header:{
                currentPageName:"订单详情1",
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            },
        });*/
    }

    _onBackPage(){

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

    /**
     * 订单详情
     * @private
     */
    _onOrderDetail(orderId){
        //刷新当前订单ID
        //orderMobx.resetCurrentOrderId(orderId);

        this.props.navigation.navigate('OrderDetail',{"orderId":orderId,"backPageName":"返回"})
    }

}


