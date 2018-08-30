
import React,{Component} from 'react';

import {AppRegistry, Text, View, Platform, ListView, TouchableOpacity, Image, ScrollView} from 'react-native';

import IndexStyles from '../../styles/IndexStyles';
import IndexHeaderPage from "./IndexHeaderPage";
import Swiper from 'react-native-swiper';

export default class IndexPage extends Component{

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const newsDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let data = [
            {
                imagePath:require("../../images/openStore.png"),
                name:"开店",
                routeName:"",
            },
            {
                imagePath:require("../../images/Auditing.png"),
                name:"审核",
                routeName:"",
            },
            {
                imagePath:require("../../images/buy.png"),
                name:"营销中心",
                routeName:"",
            },
            {
                imagePath:require("../../images/storeMenu.png"),
                name:"门店动态",
                routeName:"",
            },
            {
                imagePath:require("../../images/marketMenu.png"),
                name:"服务市场",
                routeName:"",
            },
            {
                imagePath:require("../../images/sampleMenu.png"),
                name:"素材",
                routeName:"",
            },
            {
                imagePath:require("../../images/logisticsMenu.png"),
                name:"物流",
                routeName:"",
            },
            {
                imagePath:require("../../images/moreMenu.png"),
                name:"更多",
                routeName:"",
            }
        ];
        let newsData = [{
            title:"24种吸引人的营销文章标题写法,总有一个适合你！测试测试车是否is地方是电话费",
            newsImage:require('../../images/news_1.png'),
            author:"小米科技",
            viewCount:1179,
            like:45
        },
            {
                title:"24种吸引人的营销文章标题写法,总有一个适合你！",
                newsImage:require('../../images/news_1.png'),
                author:"小米科技",
                viewCount:1179,
                like:45
            }
        ];



        this.state={
            dataSource : ds.cloneWithRows(data),
            newsDataSource: newsDs.cloneWithRows(newsData),
            newsDataSize:newsData.length,
            swiperShow:false,
        };

        this._onPressMenu = this._onPressMenu.bind(this);

        this._onPressMenuNews = this._onPressMenuNews.bind(this);
    }

    /**
     * 页面渲染
     *


     * @returns {XML}
     */
    render(){
        return (
            <View style={[IndexStyles.container,IndexStyles.body]}>
                <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?IndexStyles.header:IndexStyles.header_android_low}>
                    <IndexHeaderPage pageTitle={"微小区"}/>
                </View>
                <ScrollView>
                    {this.renderHeaderTool()}
                    {this.renderMenu()}
                    {this.renderBanner()}
                    {this.renderNews()}
                </ScrollView>
            </View>
        );
    }

    _renderRow(rowData){

        return (
            <TouchableOpacity onPress={this._onPressMenu} style={IndexStyles.cellBackStyle}>
                <View style={IndexStyles.menuViewImageView}>
                    <Image source={rowData.imagePath} style={IndexStyles.menuViewImage}/>
                    <Text style={IndexStyles.menuViewText}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPressMenu(){

    }





    _onPressMenuNews(){

    }

    renderBanner() {
                if(this.state.swiperShow){
                    return  (
                        <View style={IndexStyles.bannerView}>

                                    <Swiper
                                        style={IndexStyles.swiper}
                                        height={90}
                                        horizontal={true}
                                        loop={true}
                                        paginationStyle={{bottom: 5}}
                                        showsButtons={false}
                                        autoplayTimeout={4}
                                        autoplay={true}
                                    >
                                        <Image source={require('../../images/banner/banner_1.jpg')} style={IndexStyles.bannerViewImage}/>
                                        <Image source={require('../../images/banner/banner_2.jpg')} style={IndexStyles.bannerViewImage}/>
                                        <Image source={require('../../images/banner/banner_3.jpg')} style={IndexStyles.bannerViewImage}/>
                                    </Swiper>

                        </View>
                    );
                }else {
                    return (
                        <View style={IndexStyles.bannerView}>
                            <Image source={require('../../images/banner/banner_1.jpg')} style={IndexStyles.bannerViewImage}/>
                        </View>
                    );
                }

    }

    /**
     * 头部 工具
     * @returns {XML}
     */
    renderHeaderTool(){

        return (
            <View style={IndexStyles.headerView_2}>
                <TouchableOpacity style={IndexStyles.headerViewCenter}>
                    <View style={IndexStyles.headerViewCenter}>
                        <Image style={IndexStyles.headerView_2_image} source={require('../../images/scan.png')}></Image>
                    </View>
                    <View style={[IndexStyles.headerViewCenter,IndexStyles.headerView_2_text_top]}>
                        <Text style={IndexStyles.headerView_2_text}>扫一扫</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.headerViewCenter}>
                    <View style={IndexStyles.headerViewCenter}>
                        <Image style={IndexStyles.headerView_2_image} source={require('../../images/shopping.png')}></Image>
                    </View>
                    <View style={[IndexStyles.headerViewCenter,IndexStyles.headerView_2_text_top]}>
                        <Text style={IndexStyles.headerView_2_text}>商品</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.headerViewCenter}>
                    <View style={IndexStyles.headerViewCenter}>
                        <Image style={IndexStyles.headerView_2_image} source={require('../../images/write.png')}></Image>
                    </View>
                    <View style={[IndexStyles.headerViewCenter,IndexStyles.headerView_2_text_top]}>
                        <Text style={IndexStyles.headerView_2_text}>发动态</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={IndexStyles.headerViewCenter}>
                    <View style={IndexStyles.headerViewCenter}>
                        <Image style={IndexStyles.headerView_2_image} source={require('../../images/store.png')}></Image>
                    </View>
                    <View style={[IndexStyles.headerViewCenter,IndexStyles.headerView_2_text_top]}>
                        <Text style={IndexStyles.headerView_2_text}>门店</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    /**
     * 菜单类
     * @returns {XML}
     */
    renderMenu(){
        return (
            <View style={IndexStyles.menuView}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          contentContainerStyle={IndexStyles.listViewStyle}
                          removeClippedSubviews={false}
                >

                </ListView>
            </View>
        );
    }

    /**
     * 开发技巧
     * @returns {XML}
     */
    renderNews(){
        return (

            <View style={IndexStyles.newsView}>
                <View style={IndexStyles.newsViewTitle}>
                    <Text style={IndexStyles.newsViewTitleText}>开店技巧</Text>
                    <Image style={IndexStyles.newsViewTitleImage} source={require('../../images/news_more.png')}></Image>
                </View>
                <View style={IndexStyles.newsViewBody}>
                    <ListView dataSource={this.state.newsDataSource}
                              renderRow={this._renderRowNews.bind(this)}
                    >
                    </ListView>
                </View>
            </View>
        );
    }


    /**
     * 开发技巧 ListView 内容 渲染
     * @param rowData
     * @param sectionID
     * @param rowID
     * @param highlightRow
     * @returns {XML}
     * @private
     */
    _renderRowNews(rowData,sectionID, rowID, highlightRow){
        let tmpNewsSize = this.state.newsDataSize -1;
        //不是debug 模式下注释一下 不然卡死
        //console.log("IndexPage:",rowData,sectionID, rowID, highlightRow,tmpNewsSize);

        return (
            <TouchableOpacity onPress={this._onPressMenuNews} style={IndexStyles.newsViewRowData} activeOpacity={0.8}>
                <View style={(rowID == tmpNewsSize) ? IndexStyles.newViewRowDataAllLast: IndexStyles.newsViewRowDataAll}>
                    <View style={IndexStyles.newsViewRowDataLeft}>
                        <View style={IndexStyles.newsViewRowDataLeftView}>
                            <Text style={IndexStyles.newsViewRowDataLeftText} numberOfLines={2}>{rowData.title}</Text>
                        </View>
                        <View style={IndexStyles.newsViewRowDataLeftBottom}>
                            <View style={IndexStyles.flowRow}>
                                <Text style={[IndexStyles.newsViewRowDataLeftBottomText,IndexStyles.newsViewRowDataLeftBottomAuthorText]} numberOfLines={1}>{rowData.author}</Text>
                            </View>
                            <View style={[IndexStyles.flowRow,IndexStyles.newsViewRowDataLeftBottomMargeLeft]}>
                                <Image style={IndexStyles.newsViewCountImage} source={require('../../images/newsViewCount.png')}></Image>
                                <Text style={[IndexStyles.newsViewRowDataLeftBottomText,IndexStyles.newsViewRowDataLeftBottomTextMargeLeft]}>{rowData.viewCount}</Text>
                            </View>
                            <View style={[IndexStyles.flowRow,IndexStyles.newsViewRowDataLeftBottomMargeLeft]}>
                                <Image style={IndexStyles.newsViewLike} source={require('../../images/like.png')}></Image>
                                <Text style={[IndexStyles.newsViewRowDataLeftBottomText,IndexStyles.newsViewRowDataLeftBottomTextMargeLeft]}>{rowData.like}</Text>
                            </View>

                        </View>
                    </View>
                    <View>
                        <Image style={IndexStyles.newsImage} source={rowData.newsImage}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 1000)
    }


    _renderPage(data, pageID) {
        return (
            <TouchableOpacity onPress={() => { console.log(data.url)}} activeOpacity={1}>
            <Image
                source={data.imagePath}
                style={IndexStyles.BannerViewImage}/>
            </TouchableOpacity>
        );
    }


}