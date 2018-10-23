import React,{Component} from 'react';

import {View,Image,Text,TouchableOpacity,Platform,FlatList} from 'react-native';

import StoreStyles from '../../styles/store/StoreStyles';
import CommonStyles from "../../styles/CommonStyles";
import StoreConst from '../../constants/StoreConst';
import {
    NoActionHeaderView,
} from 'Java110';
import { observer } from "mobx-react";
import storeMobx from '../../mobx/store/StoreMobx';

/**
 * 商户审核 页面
 * 
 * add by wuxw 2018-10-10
 */
@observer
export default class EnterStorePage extends Component{

    
    constructor(props){
        super(props);
        this.state={};

        //初始化数据
        this._initStoreAudit();
        this._onBackPage = this._onBackPage.bind(this);
    }

    _initStoreAudit(){
        //刷新审核数据
        storeMobx.refreshAuditStoreInfos();
    }

    /**
     * 渲染页面
     */
    render(){
        return (
            <View>
                {this._renderHeader()}
                {this._renderContext()}
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
                    currentPageName={"待开店"}
                    backPageName={"返回"}
                    _onBackPage={this._onBackPage}
                />
            </View>
        );
    }

    /**
     * 内容
     */
    _renderContext(){
        return(
            <View>
                <FlatList
                    ref={(flatList) => this._auditFlatList = flatList}
                    data={storeMobx.auditStoreInfos.slice()}
                    keyExtractor={(item, index) => item.storeId}
                    renderItem={this._renderAuditList.bind(this)}
                    refreshing={false}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    /**
     * 审核列表
     */
    _renderAuditList(rowData){
        rowData = rowData.item;
        let tmpStorePhoto = rowData.storePhoto.slice();
        let imageData = {uri:''};
        for (let tmpStorePhotoIndex = 0; tmpStorePhotoIndex < tmpStorePhoto.length; tmpStorePhotoIndex++) {
          if (tmpStorePhoto[tmpStorePhotoIndex].storePhotoTypeCd == StoreConst.STORE_PHOTO_TYPE_CD_DOOR_HEADER) {
            imageData.uri = tmpStorePhoto[tmpStorePhotoIndex].photo;
          }
        }

        return (
            <TouchableOpacity style={StoreStyles.auditView} onPress={()=>{
                this.props.navigation.navigate('ViewStore',{storeId:rowData.storeId})
            }}>
                <View style={StoreStyles.auditImageView}>
                    <Image
                        source={imageData}
                        style={StoreStyles.auditViewImage}
                    />
                </View>
                <View style={StoreStyles.auditTextView}>
                    <View style={StoreStyles.auditViewText}>
                        <Text style={StoreStyles.auditTextName}>{rowData.name}</Text>
                        <Text style={StoreStyles.auditText}>{rowData.address}</Text>
                        <Text style={StoreStyles.auditText}>创建时间: {rowData.createTime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height:9,backgroundColor:'#F3F3F3'}}>

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