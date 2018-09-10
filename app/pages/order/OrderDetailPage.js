import React,{Component} from 'react';

import {View, Text, Image, TouchableOpacity, Platform, ScrollView, ListView,PermissionsAndroid,Alert} from 'react-native';

import {Badge, Button} from 'teaset';


import orderMobx from "../../mobx/order/OrderMobx";
import OrderDetailStyles from "../../styles/order/OrderDetailStyles";

import CommonStyles from "../../styles/CommonStyles";
import ContextHeaderPage from "../ContextHeaderPage";
import {observer} from "mobx-react";
import ESC from "../../../components/ecs/Ecs";
import BleModule from '../../../components/print/BleModule';


global.BluetoothManager = new BleModule();
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
            orderAttrDataSource:orderAttrDs.cloneWithRows([]),
            isConnected: false
        };

          this._onBackPage = this._onBackPage.bind(this);
          this._onCallUser = this._onCallUser.bind(this);

          this._printShopDetail=this._printShopDetail.bind(this);
          this._connect = this._connect.bind(this);
          this._write = this._write.bind(this);
          this.alert = this.alert.bind(this);
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
                        <Button type = "default" titleStyle = {{color:'#F24E3E'}} size="sm" style={OrderDetailStyles.OrderInfoButton} title="打印订单" onPress={() => {this._printShopDetail()}}/>
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
        BluetoothManager.start();
        this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral',this.handleConnectPeripheral);
        this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral',this.handleDisconnectPeripheral);
        //1.0 获取蓝牙ID
        let blueToothId = "57:4C:54:16:7D:1F";
        this._connect(blueToothId)

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

    componentWillUnmount(){
        this.connectPeripheralListener.remove();
        this.disconnectPeripheralListener.remove();
        if(this.state.isConnected){
            BluetoothManager.disconnect();  //退出时断开蓝牙连接
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

    /**
     * 商品答应
     * @private
     */
    _printShopDetail(){
        BluetoothManager.isPeripheralConnected()
            .then((isConnected) => {
                if (isConnected) {
                    console.log('Peripheral is connected!');
                    this._write();
                } else {
                    console.log('Peripheral is NOT connected!');
                    this.alert("无法连接打印机，请检查蓝牙是否连接正确");
                }
            }).catch(error=>{
            this.alert("无法连接打印机，请检查蓝牙是否连接正确");
        });

    }

    /**
     * 连接蓝牙设备
     * @param id
     * @private
     */
    _connect(id){
        //当前蓝牙正在连接时不能打开另一个连接进程
        if(BluetoothManager.isConnecting){
            console.log('当前蓝牙正在连接时不能打开另一个连接进程');
            return;
        }

        BluetoothManager.connect(id)
            .then(peripheralInfo=>{
                this.setState({
                    isConnected:true
                });
            })
            .catch(err=>{
                this.alert("连接打印机失败");
            })
    }

    /**
     * 写数据
     * @param index
     * @private
     */
    _write(index = 0){

        let orderInfo = orderMobx.currentOrderInfo;

        let items = orderInfo.items;
        let shops = [];
        for(let itemIndex = 0;itemIndex<items.length;itemIndex++){
            let item = items[itemIndex];
            let shop = {
                name:item.name,
                count:"x"+item.count,
                price:item.price
            };
            shops.push(shop);
        }

        let printParam = {
            title:"微小区",
            author:"java110",
            shops:shops,
            total:orderInfo.payMoney,
            tranId:orderInfo.orderId,
            shopName:"他乡客栈",
            userName:orderInfo.userName,
            orderTime:orderInfo.deliveryTime
        };

        BluetoothManager.write(ESC.print(printParam),index)
            .then(()=>{
                this.bluetoothReceiveData = [];
            })
            .catch(err=>{
                this.alert('发送失败');
            })
    }

    alert(text){
        Alert.alert('提示',text,[{ text:'确定',onPress:()=>{ } }]);
    }

    //蓝牙设备已连接
    handleConnectPeripheral=(args)=>{
        console.log('BleManagerConnectPeripheral:', args);
    }

    //蓝牙设备已断开连接
    handleDisconnectPeripheral=(args)=>{
        console.log('BleManagerDisconnectPeripheral:', args);
        BluetoothManager.initUUID();  //断开连接后清空UUID

    }

}