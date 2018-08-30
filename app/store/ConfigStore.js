/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import {observable, action} from 'mobx';
import {AsyncStorage, ActivityIndicator, View} from 'react-native';


import React from 'react';


type ErrorInfo = {
    message: string,
    code: number,
}

class ConfigStore {

    @observable isError: boolean = false;
    @observable isLoading: boolean = false;
    @observable errorInfo: ErrorInfo;
    @observable loadingType: string;

    static customKey = null;

    @action.bound showLoading(text?: string) {
        // this.loadingType = type ? type : 'normal';
        // this.isLoading = true;

        if (ConfigStore.customKey) return;
        ConfigStore.customKey = Toast.show({
            text: text,
            icon:
                <View style={{width: 50, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='white' />
                </View>,
            position: 'center',
            duration: 1000000,
        });

    }

    @action.bound showErrorView(e: ErrorInfo) {
        this.isError = true;
        this.errorInfo = e;
    }

    @action.bound hideErrorView() {
        this.isError = false;
    }


}
export { ConfigStore };