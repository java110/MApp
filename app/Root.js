import React, { Component } from 'react';
import {observer, Provider} from 'mobx-react';
import * as RootStore  from './store/RootStore';

import RootStack from './Route';

@observer
export default class Root extends Component {
    render() {
        return (
            <Provider {... RootStore}>
                <RootStack/>
            </Provider>
        )
    }
}