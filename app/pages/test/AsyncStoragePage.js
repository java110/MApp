import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    AsyncStorage,
    Button,
    Alert
} from 'react-native';

import AsyncStorageUtils from '../../Utils/AsynStorageUtils';

export default class AsyncStoragePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            newText:'',
        }
        this._save = this._save.bind(this);
        this._get = this._get.bind(this);
        

    }

    render () {
        return (
            <View style={styles.container}>
                <TextInput 
                    value={this.state.text}
                    placeholder='请输入内容'
                    onChangeText={(text)=>{
                        this.setState({text:text});
                    }}
                />
                <Button
                    title="保存"
                    onPress={()=>{this._save()}}
                />
                <Button
                    title="查询"
                    onPress={()=>{this._get()}}
                />

                <Text>读取内容：{this.state.newText}</Text>
            </View>
        )
    }

    _save(){
        AsyncStorageUtils._save("wuxw_20181022",this.state.text,(error)=>{
            if(!error){
                Alert.alert('保存成功！！！')
            }
        })
    }

    _get(){
        AsyncStorageUtils._get('wuxw_20181022',(error,result)=>{
            if(!error){
                Alert.alert(result);     
            }
            return '456';
        }).then((result)=>{
            return '123';
        }).then((res)=>{
            Alert.alert("结果："+res);
            this.setState({
                newText:res,
                text:'fuck me !!!!',
            });
            this._save();
            
        }).catch((error)=>{
            Alert.alert(error);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
})
