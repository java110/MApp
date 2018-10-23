import React,{Component} from 'react';

import {AsyncStorage} from 'react-native';

/**
 * 存储工具类
 */
export default class AsyncStorageUtils{


    /**
     * 保存数据到手机中
     * 
     * @param key 键
     * @param value 值
     * @param callback 回调函数参数为 error
     * 
     * @return Promise<void>
     */
    static _save(key,value,callback) {
        return AsyncStorage.setItem(key,value,callback);
    }

    /**
     * 根据KEY查询 数据
     * @param {键} key 
     * @param {回调函数 参数为error result} callback 
     * @return Promise<string | null>
     */
    static _get(key,callback){
        return AsyncStorage.getItem(key,callback);
    }

    /**
     * 根据KEY删除 数据
     * @param {键} key 
     * @param {回调函数 参数为error} callback 
     * @return Promise<void>
     */
    static _delete(key,callback){
        return AsyncStorage.removeItem(key,callback);
    }

}