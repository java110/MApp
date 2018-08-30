import {observable, action, runInAction, autorun} from 'mobx';
import {Alert} from 'react-native'


/**
 * 订单 数据封装及处理
 *
 * add by wuxw 2018-08-28
 */
class OrderMobx{
    /**
     * 订单数据封装 这里先写死，实际调用服务层查询
     *
     * orderId 订单编码
     * userName 用户名称
     * userPhone 用户手机号
     * address 地址
     * orderTime 下单时间
     * orderSource 订单来源
     * money 订单总计金额
     * deliveryTime 配送时间
     * items 订单包含数据项
     * @type {{}}
     */
    @observable
    orderListData:Object = {

        orders:[
            {
                orderId:"1234567890",
                orderSeq:"0001",
                userName:"吴(先生)",
                userPhone:"15897089471",
                address:"青海省西宁市城中区五四大街22号湟嘉华园3号楼1323",
                orderTime:"08-28 23:06",
                deliveryTime:"08-28 23:10",
                orderSource:"微信小程序",
                money:134.00,
                items:[
                    {
                        name:"青椒肉丝",
                        price:15.00,
                        count:1
                    }
                ]
            },
            {
                orderId:"1234567891",
                orderSeq:"0002",
                userName:"吴(先生)",
                userPhone:"15897089471",
                address:"青海省西宁市城中区五四大街22号湟嘉华园3号楼1323",
                orderTime:"08-28 23:06",
                deliveryTime:"08-28 23:10",
                orderSource:"app",
                money:134.00,
                items:[
                    {
                        name:"青椒肉丝",
                        price:15.00,
                        count:1
                    }
                ]
            },
            {
                orderId:"1234567893",
                orderSeq:"0003",
                userName:"吴(先生)",
                userPhone:"15897089471",
                address:"五四大街22号湟嘉华园3号楼1323",
                orderTime:"08-28 23:06",
                deliveryTime:"08-28 23:10",
                orderSource:"app商家版",
                money:134.00,
                items:[
                    {
                        name:"青椒肉丝",
                        price:15.00,
                        count:1
                    }
                ]
            },
            {
                orderId:"1234567894",
                orderSeq:"0004",
                userName:"吴(先生)",
                userPhone:"15897089471",
                address:"青海省西宁市城中区五四大街22号湟嘉华园3号楼1323",
                orderTime:"08-28 23:06",
                deliveryTime:"08-28 23:10",
                orderSource:"app商家版",
                money:134.00,
                items:[
                    {
                        name:"青椒肉丝",
                        price:15.00,
                        count:1
                    }
                ]
            },
            {
                orderId:"1234567895",
                orderSeq:"0005",
                userName:"吴(先生)",
                userPhone:"15897089471",
                address:"湟嘉华园3号楼1323",
                orderTime:"08-28 23:06",
                deliveryTime:"08-28 23:10",
                orderSource:"app商家版",
                money:134.00,
                items:[
                    {
                        name:"青椒肉丝",
                        price:15.00,
                        count:1
                    }
                ]
            }
        ]
    };

    @observable
    currentOrderInfo:Object={

    };

    /**
     * 重设 当前订单ID
     * @param orderId
     */
    @action
    resetCurrentOrderInfo(orderId){
       //这里调接口刷currentOrderInfo对象
        this.currentOrderInfo={
            orderId:"1234567891",
            orderSeq:"0002",
            userName:"吴(先生)",
            userPhone:"15897089471",
            address:"青海省西宁市城中区五四大街22号湟嘉华园3号楼1323",
            orderTime:"08-28 23:06",
            deliveryTime:"08-28 23:10",
            orderSource:"app",
            money:134.00,
            items:[
                {
                    name:"青椒肉丝",
                    price:15.00,
                    imageUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611318920&di=a3018808c6cd6ddea6c87d540db5f98b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd6ca7bcb0a46f21fd8b1b87bfd246b600c33ae15.jpg",
                    count:1
                }
            ]
        }
    }

    /**
     * 刷新数据
     */
    @action
    refreshOrderListData(){
        //
    }
}



orderMobx = new OrderMobx();

export default orderMobx