import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Platform, ScrollView, ListView,PermissionsAndroid} from 'react-native';

import {Badge, Button} from 'teaset';


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
          const orderAttrDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 初始状态
        this.state = {
            header:{backPageName:params.backPageName,
                currentPageName:"订单详情",
                //_onSetting:this._onSetting,
                _onBackPage:this._onBackPage
            },
            orderId:params.orderId,
            ds : ds,
            dataSource : ds.cloneWithRows([]),
            orderAttrDs : orderAttrDs,
            orderAttrDataSource:orderAttrDs.cloneWithRows([])
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
     *  {this.renderBodyOrderItem()}
     *  <View style={OrderDetailStyles.rowDataHeaderView}>
     <View style={OrderDetailStyles.rowDataHeaderView_1}>
     <Text style={OrderDetailStyles.rowDataHeaderViewText}>订单编号：{orderMobx.currentOrderInfo.orderId}</Text>
     <Text style={OrderDetailStyles.rowDataHeaderViewText}>({orderMobx.currentOrderInfo.orderSeq})</Text>
     </View>
     <TouchableOpacity style={OrderDetailStyles.rowDataHeaderView_1} onPress={() => {this._onCallUser(orderMobx.currentOrderInfo.userPhone)}} activeOpacity={0.5}>
     <Image style={OrderDetailStyles.rowDataHeaderView_1_image} source={require('../../images/order_phone.png')} />
     </TouchableOpacity>
     </View>
     * 订单信息
     * @returns {XML}
     */
    renderBodyOrder(){
        return (

            <ScrollView style={OrderDetailStyles.container}>


                {this.renderBodyOrderItemsInfo()}
                {this.renderBodyOrderInfo()}

                {this.renderBodyOrderBuyInfo()}

                {this.renderBodyOrderLogisticsInfo()}

            </ScrollView>
        );
    }

    /**
     * 订单项
     * renderSeparator={this._renderSeparator.bind(this)}
     */
    renderBodyOrderItemsInfo(){


        return (
            <View style={OrderDetailStyles.orderBlockView}>
                <View style={[OrderDetailStyles.rowDataHeaderView,{height:45}]}>
                    <Text style={OrderDetailStyles.rowDataHeaderViewOrderItemsText}>{orderMobx.currentOrderInfo.orderId}({orderMobx.currentOrderInfo.orderSeq})</Text>
                    <Text style={OrderDetailStyles.rowDataHeaderViewOrderItemsText}>{orderMobx.currentOrderInfo.orderTime}</Text>
                </View>
                <View style={OrderDetailStyles.orderView}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}

                        enableEmptySections={true}
                        style={OrderDetailStyles.listViewItem}
                    />
                    <View style={[OrderDetailStyles.orderDetailInfoView,OrderDetailStyles.OrderInfoButtonView]}>
                        <Button type = "default" titleStyle = {{color:'#F24E3E'}} size="sm" style={OrderDetailStyles.OrderInfoButton} title="打印订单" onPress={() => {this.props.navigation.navigate('BlueToothPrinter',{})}}/>
                        <Button type = "secondary" titleStyle = {{color:'#555'}} size="sm" style={[OrderDetailStyles.OrderInfoButton,OrderDetailStyles.orderInfoButtonPublic]} title="确定订单" onPress={() => {}}/>
                        <Button type = "secondary" titleStyle = {{color:'#555'}} size="sm" style={[OrderDetailStyles.OrderInfoButton,OrderDetailStyles.orderInfoButtonPublic]} title="退单" onPress={() => {}}/>
                    </View>
                </View>
            </View>
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
                <View style={OrderDetailStyles.orderItemsLeftView}>
                    <View style={OrderDetailStyles.orderItemsImageView}>
                        <Image style={OrderDetailStyles.orderItemsImage} source={{uri:rowData.imageUrl}}/>
                    </View>
                    <View style={OrderDetailStyles.orderItemsCenterTextView}>
                        <Text style={OrderDetailStyles.orderItemsCenterText_1}  numberOfLines={2}>{rowData.name}</Text>
                        <View style={OrderDetailStyles.orderItemsCenterTextView_1}>
                            <Text style={OrderDetailStyles.orderItemsCenterText_2}>库存:</Text>
                            <Text style={OrderDetailStyles.orderItemsCenterText_3}>{rowData.shopCount}</Text>
                        </View>

                        <View style={[OrderDetailStyles.orderItemsCenterTextView_1,OrderDetailStyles.badgeView]}>
                            <Badge type='square' style={OrderDetailStyles.commonBadge}>
                                <Text style={OrderDetailStyles.commonBadgeText}>{rowData.catalogName}</Text>
                            </Badge>
                            {
                                rowData.hotBuy == "Y" ?<Badge type='square' style={OrderDetailStyles.commonBadge}>
                                <Text style={OrderDetailStyles.commonBadgeText}>热卖</Text>
                                </Badge>:null
                            }

                            {
                                rowData.preferential == "Y" ?<Badge type='square' style={OrderDetailStyles.commonBadge}>
                                    <Text style={OrderDetailStyles.commonBadgeText}>优惠</Text>
                                </Badge>:null
                            }

                        </View>
                    </View>
                </View>
                <View style={OrderDetailStyles.orderItemsRightView}>
                    <View style={OrderDetailStyles.orderItemsRightTextView}>
                        <Text style={OrderDetailStyles.orderItemsRightText_1}>￥{rowData.price}</Text>
                        <Text style={OrderDetailStyles.orderItemsRightText_2}>x{rowData.count}</Text>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 订单属性信息渲染
     *
     * add by wuxw 2018-08-31
     * @param rowData
     * @returns {XML}
     * @private
     */
    _renderRowBak(rowData){

        return (

            <View style={OrderDetailStyles.orderDetailInfoView}>
                <Text style={OrderDetailStyles.OrderDetailInfoText}>{rowData.name} </Text>
                <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{rowData.count}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height:1,backgroundColor:'#F3F3F3'}}>

            </View>
        );
    }

    /**
     * 订单信息
     *
     * 主要展现：
     *   订单状态
     *   下单时间
     *   备注
     *   订单来源，
     *   订单金额
     *   应付金额
     *
     *   订单属性 (快递费用)
     *   <View style={OrderDetailStyles.orderDetailInfoView}>
     <Text style={OrderDetailStyles.OrderDetailInfoText}>订单编号</Text>
     <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.orderId}</Text>
     </View>
     <View style={OrderDetailStyles.orderDetailInfoView}>
     <Text style={OrderDetailStyles.OrderDetailInfoText}>序号</Text>
     <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.orderSeq}</Text>
     </View>
     <View style={OrderDetailStyles.orderDetailInfoView}>
     <Text style={OrderDetailStyles.OrderDetailInfoText}>下单时间</Text>
     <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.orderTime}</Text>
     </View>
     * add by wuxw 2018-08-31
     */
    renderBodyOrderInfo(){
        return (
            <View style={OrderDetailStyles.orderBlockView}>
            <View style={OrderDetailStyles.rowDataHeaderView}>
                <Text style={OrderDetailStyles.rowDataHeaderViewText}>订单信息</Text>
            </View>
            <View style={OrderDetailStyles.orderView}>

                <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>订单状态</Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.orderStatus}</Text>
                </View>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                    <Text style={OrderDetailStyles.OrderDetailInfoText}>订单来源</Text>
                    <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.orderSource}</Text>
                </View>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                    <Text style={OrderDetailStyles.OrderDetailInfoText}>订单备注</Text>
                    <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.remark}</Text>
                </View>
                {
                    this.renderOrderAttr()
                }
                <View style={OrderDetailStyles.orderDetailInfoView}>
                    <Text style={OrderDetailStyles.OrderDetailInfoText}>订单金额</Text>
                    <Text style={[OrderDetailStyles.OrderDetailInfoTextValue,OrderDetailStyles.OrderDetailInfoTextValueMoney]}>￥{orderMobx.currentOrderInfo.money}</Text>
                </View>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                    <Text style={OrderDetailStyles.OrderDetailInfoText}>应付金额</Text>
                    <Text style={[OrderDetailStyles.OrderDetailInfoTextValue,OrderDetailStyles.OrderDetailInfoTextValueMoney]}>￥{orderMobx.currentOrderInfo.payMoney}</Text>
                </View>

            </View>
            </View>
        );
    }


    /**
     * 买家信息
     *
     * 主要展现：
     *   买家账号
     *   收货姓名
     *   收货地址
     *   联系电话
     * add by wuxw 2018-08-31
     */
    renderBodyOrderBuyInfo(){
        return (
            <View style={OrderDetailStyles.orderBlockView}>
                <View style={OrderDetailStyles.rowDataHeaderView}>
                    <Text style={OrderDetailStyles.rowDataHeaderViewText}>买家收货信息</Text>
                </View>
            <View style={OrderDetailStyles.orderView}>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>买家账号</Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.userId}</Text>
                </View>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>收货姓名</Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.userName}</Text>

                </View>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>联系电话</Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.userPhone}</Text>
                </View>
                <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>收货地址</Text>
                        <Text style={[OrderDetailStyles.OrderDetailInfoTextValue,OrderDetailStyles.OrderDetailInfoTextValue_address]} numberOfLines={10}>{orderMobx.currentOrderInfo.address}</Text>
                </View>

            </View>
            </View>
        );
    }



    /**
     * 快递信息
     *
     * 主要展现：
     *   快递员姓名
     *   快递员电话
     *   快递公司
     * add by wuxw 2018-08-31
     */
    renderBodyOrderLogisticsInfo(){
        console.log("renderBodyOrderLogisticsInfo",orderMobx.currentOrderInfo);
        return (
            <View style={OrderDetailStyles.orderBlockView}>
                <View style={OrderDetailStyles.rowDataHeaderView}>
                    <Text style={OrderDetailStyles.rowDataHeaderViewText}>快递信息</Text>
                </View>
                <View style={OrderDetailStyles.orderView}>
                    <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>快递员姓名: </Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.logisticsInfo.logisticsName}</Text>
                    </View>
                    <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>快递员电话: </Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.logisticsInfo.phone}</Text>

                    </View>
                    <View style={OrderDetailStyles.orderDetailInfoView}>
                        <Text style={OrderDetailStyles.OrderDetailInfoText}>快递公司: </Text>
                        <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{orderMobx.currentOrderInfo.logisticsInfo.company}</Text>
                    </View>

                </View>
            </View>
        );
    }

    /**
     * 订单属性 显示
     */
    renderOrderAttr(){

        return(
            <ListView
                dataSource={this.state.orderAttrDataSource}
                renderRow={this._renderRowOrderAttr.bind(this)}
                enableEmptySections={true}
            />
        );
    }

    /**
     * 订单属性信息渲染
     *
     * add by wuxw 2018-08-31
     * @param rowData
     * @returns {XML}
     * @private
     */
    _renderRowOrderAttr(rowData){

        return (

            <View style={OrderDetailStyles.orderDetailInfoView}>
                    <Text style={OrderDetailStyles.OrderDetailInfoText}>{rowData.attrName}: </Text>
                    <Text style={OrderDetailStyles.OrderDetailInfoTextValue}>{rowData.attrValue}</Text>
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
            dataSource : this.state.ds.cloneWithRows(orderMobx.currentOrderInfo.items.slice()),
            orderAttrDataSource:this.state.orderAttrDs.cloneWithRows(orderMobx.currentOrderInfo.orderAttrs.slice())
        });


        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
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