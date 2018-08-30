/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootStack from "./app/Route"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
 render() {
        return <RootStack />;
    }

    /*//第二种写法
    render() {
        return (
            <View style={{flex: 1}}>
                <RootStack/>
            </View>
        )

    }*/
}
