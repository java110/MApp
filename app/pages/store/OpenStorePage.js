import React,{Component} from 'react';

import {View,Image,Text,TouchableOpacity,Platform} from 'react-native';

import StoreMbox from '../../mobx/store/StoreMobx';

import StoreStyles from '../../styles/store/StoreStyles';
import CommonStyles from "../../styles/CommonStyles";
import {Badge} from 'teaset';
import {
    NoActionHeaderView,
    ButtonView
} from 'Java110';
/**
 * 开店 页面
 * 
 * add by wuxw 2018-10-10
 */
export default class OpenStorePage extends Component{

    constructor(props){
        super(props);
        this.state={
            showExplain:true,
        };
        this._onBackPage = this._onBackPage.bind(this);
    }

    /**
     * 渲染页面
     */
    render(){
        return (
            <View style={[StoreStyles.container,StoreStyles.body]}>
                {this._renderHeader()}
                {
                    this.state.showExplain
                    ?this._renderExplain()
                    :null
                }
            </View>
        );
    }

     /**
     * 头部信息
     * @returns {XML}
     * @private
     */
    _renderHeader() {

        return (
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS === 'ios') ? CommonStyles.header : CommonStyles.header_android_low}>
                <NoActionHeaderView
                    currentPageName={"免费开店"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

     /**
     * 开店说明
     */
    _renderExplain(){
        return(
            <View style={StoreStyles.explainView}>
                {this._renderExplainTop()}
                {this._renderExplainCenter()}
                {this._renderExplainBottom()}
            </View>
        );
    }

    _renderExplainTop(){
        return (
            <View style={StoreStyles.explainViewTop}>
                <View style={StoreStyles.explainViewRowTitle}>
                    <Text style={{fontSize:18}}>开店流程</Text>
                </View>
                <View style={StoreStyles.explainViewRow}>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={{backgroundColor: '#F24E3E',width:24,height:24,borderRadius:12, paddingLeft: 0, paddingRight: 0}}>
                            <Text style={{color: '#fff',fontSize:18}}>1</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>提交门店，补全证照</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>需要提交真实有效的信息</Text>
                    </View>
                </View>
                <View style={StoreStyles.explainViewRow}>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={{backgroundColor: '#F24E3E',width:22,height:22,borderRadius:11, paddingLeft: 0, paddingRight: 0}}>
                            <Text style={{color: '#fff',fontSize:18}}>2</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>待审核</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>门店申请提交后，后台审核人员将在1-3个工作日内审核，并通知您结果</Text>
                    </View>
                </View>
                <View style={StoreStyles.explainViewRow}>
                    <View style={StoreStyles.explainViewRowLeft}>
                        <Badge style={{backgroundColor: '#F24E3E',width:22,height:22,borderRadius:11, paddingLeft: 0, paddingRight: 0}}>
                            <Text style={{color: '#fff',fontSize:18}}>3</Text>
                        </Badge>
                    </View>
                    <View style={StoreStyles.explainViewRowTextView}>
                        <Text style={StoreStyles.explainViewRowBigText}>正式开店，录入商品信息</Text>
                        <Text style={StoreStyles.explainViewRowSmallText}>收到审核通过消息，在商品页面添加商品信息</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderExplainCenter(){
        return (
            <View style={StoreStyles.explainViewCenter}>
                <View style={StoreStyles.explainViewRowTitle}>
                    <Text style={{fontSize:18}}>收费说明</Text>
                </View>
                <View style={StoreStyles.explainViewCenterRow}>
                    <Text style={[StoreStyles.explainViewCenterRowText]}>超市便利店: 每笔交易的0.01%</Text>
                    <Text style={[StoreStyles.explainViewCenterRowText,{marginTop:5}]}>非超市便利店: 每笔交易的0.02%</Text>
                    <Text style={[StoreStyles.explainViewCenterRowText,{marginTop:5}]}>注: 优惠期至2020年12月31日, 优惠期满后恢复为0.05%</Text>
                </View>
            </View>
        );
    }

    _renderExplainBottom(){
        return (
            <View style={StoreStyles.explainViewBottom}>
                <ButtonView
                    _viewButtonName="马上开店"
                    _onClick={()=>{}}
                />
            </View>
        );
    }


    /**
     * 返回
     * @private
     */
    _onBackPage() {
        this.props.navigation.goBack();
    }
}