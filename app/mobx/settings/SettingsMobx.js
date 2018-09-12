import {observable, action, runInAction, autorun} from 'mobx';


/**
 * 商品 处理类
 * add by wuxw 2018-09-06
 */
class SettingsMobx {


    @observable
    settingsData:Array = [
        {
            itemName:"消息设置",
            itemValue:"",
            page:"Settings",
            params:{}
        },
        {
            itemName:"打印设置",
            itemValue:"",
            page:"SettingPrinter",
            params:{}
        }
    ]

}


settingsMobx = new SettingsMobx();

export default settingsMobx