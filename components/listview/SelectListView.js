import React,{Component} from 'react';

import { AppRegistry, Text, View,Image,ListView,Alert,TouchableOpacity,Linking,StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

/**
 * 简单listview 类似
 *
 * 文字      值>
 *
 * 属性：
 *
 * data:
 *  [
 *      {
 *          itemId:"123",
 *          itemName:"选项一",
 *          action:"ON"
 *      }
 *  ]
 *
 * _onSelect 函数
 * 回传 data对象中的action过来
 *
 */
export default class SelectListView extends Component{

    static propTypes ={
        data:PropTypes.array.isRequired,
        _onSelect:PropTypes.func.isRequired
    };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.ds = ds;
        this.state = {
            dataSource : ds.cloneWithRows(this.props.data)
        };
      }


    render(){
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
                renderSeparator={this._renderSeparator}
            />
        );
    }

    _renderRow(rowData){

        return (
            <TouchableOpacity onPress={()=>this.props._onSelect(rowData.itemId)} activeOpacity={0.5}>
                <View style={styles.container}>
                    <View style={styles.itemStart}>
                        <Text style={styles.itemText}>{rowData.itemName}</Text>
                    </View>
                    <View style={styles.itemEnd}>
                        {
                            rowData.action == 'ON'?
                                <Image style={styles.itemActionImage} source={require("../../icon/listview/check.png")}/>
                                :null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 组件完成
     */
    componentWillReceiveProps(newProps) {
        //console.log("SimpleListView componentWillReceiveProps",newProps.data);
        this.setState({
            dataSource : this.ds.cloneWithRows(newProps.data)
        })
    }

    /**
     * 行与行之间的空白
     * @param sectionID
     * @param rowID
     * @param adjacentRowHighlighted
     * @returns {XML}
     * @private
     */
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View style={{height:1}}>

            </View>
        );
    }

};


const styles =StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FFF',
        height:44,
        alignItems:'center'
    },
    itemStart:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft:12,
        alignItems:'center'
    },
    itemEnd:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:12,
        alignItems:'center'
    },
    itemImage:{
        height:22,
        width:22,
        resizeMode:'cover',
        tintColor:'#696969'
    },
    itemActionImage:{
        height:12,
        width:12
    },
    itemText:{
        marginLeft:8,
        color:'#000',
        fontSize:16
    }
});