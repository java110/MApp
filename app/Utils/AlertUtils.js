import {Component} from 'react'
import {
    Alert
} from 'react-native'

showAlert = (msg) => {
    Alert.alert('提示', msg);
}

export default showAlert