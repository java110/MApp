import { StyleSheet} from 'react-native';

/**
 * 首页头部样式
 */

const IndexHeaderStyles=StyleSheet.create({
        container: {
            flex: 1,
        },
        topBlank: {
            height: 15
        },
        headerView: {
            backgroundColor: '#F24E3E',
            //height:screenHeight
        },
        headerView_1: {
            height: 45,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerView_1_left_image: {
            height: 20,
            width: 20,
            tintColor: '#FFF',
            marginLeft: 10
        },
        headerView_1_center_text: {
            fontSize: 18,
            fontWeight: '200',
            color: '#FFF',
            marginLeft: -10
        }
    }
);

export default IndexHeaderStyles