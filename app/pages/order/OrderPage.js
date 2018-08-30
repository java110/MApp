import React,{Component} from 'react';

import {View, Image, Text, Platform, ScrollView, TouchableOpacity, ListView} from 'react-native';
import OrderStyles from "../../styles/order/OrderStyles";
import IndexHeaderPage from "../index/IndexHeaderPage";
import CountTag from "../common/CountTag";

export default class OrderPage extends Component{


    // 构造
      constructor(props) {
        super(props);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

          let data = [
              {
                  imagePath:require("../../images/openStore.png"),
                  name:"待确定",
                  routeName:"OrderList",
                  count:8,
              },
              {
                  imagePath:require("../../images/Auditing.png"),
                  name:"抢单中",
                  routeName:"OrderList",
                  count:101,
              },
              {
                  imagePath:require("../../images/buy.png"),
                  name:"待派送",
                  routeName:"OrderList",
                  count:0,
              },
              {
                  imagePath:require("../../images/logisticsMenu.png"),
                  name:"派送中",
                  routeName:"OrderList",
                  count:0,
              },
              {
                  imagePath:require("../../images/marketMenu.png"),
                  name:"已完成",
                  routeName:"OrderList",
                  count:0,
              },
              {
                  imagePath:require("../../images/sampleMenu.png"),
                  name:"退款/退货",
                  routeName:"OrderList",
                  count:0,
              },
              {
                  imagePath:require("../../images/storeMenu.png"),
                  name:"查询订单",
                  routeName:"OrderList",
                  count:0,
              },
              {
                  imagePath:require("../../images/openStore.png"),
                  name:"已确定",
                  routeName:"OrderList",
                  count:30,
              },
              {
                  imagePath:require("../../images/moreMenu.png"),
                  name:"全部订单",
                  routeName:"OrderList",
                  count:30,
              }];
        // 初始状态
        this.state = {
            dataSource : ds.cloneWithRows(data),
        };

        this._onPressMenu = this._onPressMenu.bind(this);
      }

    /**
     * 页面渲染
     * @returns {XML}
     */
      render(){

          return (
              <View style={[OrderStyles.container,OrderStyles.body]}>
                  <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?OrderStyles.header:OrderStyles.header_android_low}>
                      <IndexHeaderPage pageTitle={"订单管理"}/>
                  </View>

                  <ScrollView>
                      {this.renderOrderCountView()}
                      {this.renderOrderMenuView()}
                  </ScrollView>
              </View>
          );
      }



    /**
     * 显示订单量
     * @returns {XML}
     */
    renderOrderCountView(){
        return(
            <View style={OrderStyles.orderCountView}>
                <View style={[OrderStyles.orderCountViewCenter,OrderStyles.orderCountViewRightLine]}>
                    <Text style={OrderStyles.orderCountView_1}>1465</Text>
                    <Text style={OrderStyles.orderCountView_2}>昨日订单量</Text>
                </View>
                <View style={OrderStyles.orderCountViewCenter}>
                    <Text style={OrderStyles.orderCountView_1}>32</Text>
                    <Text style={OrderStyles.orderCountView_2}>今日订单量</Text>
                </View>
            </View>
        );
    }

    /**
     * 显示订单菜单类
     * @returns {XML}
     */
    renderOrderMenuView(){
        return (
            <View style={OrderStyles.menuView}>
                <View style={OrderStyles.orderInfoTitle}>
                    <Text style={OrderStyles.orderInfoTitleText}>订单服务</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          contentContainerStyle={OrderStyles.listViewStyle}
                          removeClippedSubviews={false}
                >

                </ListView>
            </View>
        );
    }


    _renderRow(rowData){

        return (
            <TouchableOpacity onPress={() => {this._onPressMenu(rowData.routeName,rowData.name)}} activeOpacity={0.5} style={OrderStyles.cellBackStyle}>
                <View style={OrderStyles.menuViewImageView}>
                    {
                        rowData.count == 0 ? null :<View style={OrderStyles.menuViewBadge}>
                            <CountTag style={{marginTop:-10}}
                                      text={rowData.count > 99 ? "99+" :rowData.count }/>
                        </View>
                    }

                    <Image source={rowData.imagePath} style={OrderStyles.menuViewImage}/>
                    <Text style={OrderStyles.menuViewText}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 点击菜单按钮
     * @private
     */
    _onPressMenu(routeName,name){
        let tmpName = name.endsWith('订单')?name:name+"订单";
        this.props.navigation.navigate(routeName,{'name':tmpName});
    }
}