import React,{Component} from 'react';

import {View,Text, TouchableOpacity, Image,TextInput} from 'react-native';

export default class SearchInput extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._doSoSearch= this._doSoSearch.bind(this);
      }

    render(){
        return (
            <View style={{ paddingRight: 15, paddingLeft: 15,backgroundColor: "#fff",flex:1}}>
                <View style={{ flex:1, flexDirection: 'row', justifyContent:'space-between',alignItems: 'center' }} >
                    <View style={{flexDirection: 'row',alignItems: 'center',marginLeft:5}}>
                        <Image source={require('../icon/search/search.png')} style={{ width: 15, height: 15 }}></Image>
                        <TextInput underlineColorAndroid="transparent" placeholder={this.props.placeholder} style={{ marginLeft: 0, width: 200 }}
                                   onChangeText={this.props._onChangeText}
                                   value={this.props.inputValue}
                                   ref="keyWordInput"
                                   onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                        </TextInput>
                    </View>
                    <TouchableOpacity onPress={() => { this._doSoSearch() }} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{ color: '#0391ff', fontSize: 14 }}>搜索</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _doSoSearch(){
        this.refs.keyWordInput.blur();
        this.props._soSearch();

    }
}