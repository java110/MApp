import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import PropTypes from 'prop-types';

/**
 * 两个选项卡 
 */
export default class TwoTabView extends Component {

    static propTypes = {
        oneName: PropTypes.string.isRequired,
        twoName: PropTypes.string.isRequired,
        _onOneClick: PropTypes.func.isRequired,
        _onTwoClick: PropTypes.func.isRequired,
    };


    constructor(props) {
        super(props);

        this.state = {
            tabCheck: 'on',
        };
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.halfView]}
                    onPress={() => {
                        this.setState({
                            tabCheck: 'on'
                        });
                        this.props._onOneClick();
                    }
                    }>
                    <View style={[styles.halfContextView, this.state.tabCheck == 'on' ? styles.tabCheckOn:null]}>
                        <Text style={[styles.text, this.state.tabCheck == 'on' ?styles.tabCheckTextOn:null]}>{this.props.oneName}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.halfView}
                    onPress={() => {
                        this.setState({
                            tabCheck: 'off'
                        });
                        this.props._onTwoClick();
                    }}>
                    <View style={[styles.halfContextView,this.state.tabCheck == 'off' ? styles.tabCheckOn:null]}>
                        <Text style={[styles.text, this.state.tabCheck == 'off' ?styles.tabCheckTextOn:null]}>{this.props.twoName}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
}

const screenWidth = Dimensions.get('window').width;
const halfScreenWidth = screenWidth / 2;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    halfView: {
        flex: 1,
        alignItems: 'center',
        width: halfScreenWidth,
    },
    halfContextView: {
        height: 45,
        alignItems: 'center',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
    },
    tabCheckOn: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#F24E3E',
    },
    text: {
        fontSize: 14,
        fontWeight:"400",
    },
    tabCheckTextOn: {
        color: '#F24E3E',
    }
});