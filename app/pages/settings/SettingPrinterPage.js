import React,{Component} from 'react';

import {View,Image,Text, TouchableOpacity,Platform,Switch,Alert,AsyncStorage} from 'react-native';
import SettingsPrinterStyles from "../../styles/settings/SettingsPrinterStyles";
import CommonStyles from "../../styles/CommonStyles";
import NoActionHeaderView from "../../../components/header/NoActionHeaderView";
import SelectListView from "../../../components/listview/SelectListView";
import BleModule from '../../../components/print/BleModule';
import * as ESC from "../../../components/ecs/Ecs";
import PrintConst from "../../constants/PrintConst";

global.BluetoothManager = new BleModule();

/**
 * 打印机设置
 *
 * add by wuxw 2018-09-13
 */
export default class SettingPrinterPage extends Component{

    // 构造
      constructor(props) {
        super(props);

        let data = [];

        // 初始状态
        this.state = {
            data:data,
            scaning:false,
            isConnected:false,
            switchValue:false,
            showTestView:false,
            currentMachineId:"",
        };

        this.deviceMap = new Map();

        this._onBackPage= this._onBackPage.bind(this);
        this._onSwitchValueChange = this._onSwitchValueChange.bind(this);

        this._onSelect = this._onSelect.bind(this);

        this.alert = this.alert.bind(this);

        this._flushSelectOn = this._flushSelectOn.bind(this);

          this.write = this.write.bind(this);
          this._flushSelectOFF = this._flushSelectOFF.bind(this);
          this._ifHavePrinter =this._ifHavePrinter.bind(this);
      }

    /**
     * 渲染页面
     */
    render(){
        return(
            <View style={SettingsPrinterStyles.container}>
                {this.renderHeader()}
                {this.renderPrinterItem()}
                {this.state.switchValue?this.renderPrinterShowMachine():
                    this.renderPrinterDesc()}
            </View>
        );
    }

    /**
     * 头部信息
     *
     * add by wuxw 2018-09-12
     * @returns {XML}
     */
    renderHeader(){
        return(
            <View style={((Platform.OS === 'android' && Platform.Version >= 19) || Platform.OS ==='ios')?CommonStyles.header:CommonStyles.header_android_low}>
                <NoActionHeaderView
                    _onBackPage= {this._onBackPage}
                    backPageName="返回"
                    currentPageName = "打印设置"
                />
            </View>
        );
    }

    renderPrinterItem(){
        return (
            <View style={SettingsPrinterStyles.printerItem}>
                <View style={SettingsPrinterStyles.printerItemTextView}>
                    <Text style={SettingsPrinterStyles.printerItemText}>连接蓝牙打印机</Text>
                </View>

                <View style={SettingsPrinterStyles.printerItemSwitchView}>
                    <Switch
                        value={this.state.switchValue}
                        onTintColor='#F24E3E'
                        thumbTintColor='#FFFFFF'
                        onValueChange={(value)=>{this._onSwitchValueChange(value)}}
                    ></Switch>
                </View>
            </View>
        );
    }

    renderPrinterDesc(){
        return (
            <View style={SettingsPrinterStyles.printDesc}>
                <Text style={SettingsPrinterStyles.printDescText}>开启后，可连接周围的蓝牙打印机</Text>
            </View>
        );
    }

    /**
     * 展示可连接的设备
     */
    renderPrinterShowMachine(){
        return(
            <View>
                <View style={SettingsPrinterStyles.printerItemInfo}>
                    <Text>可连接设备</Text>
                    <Text>正在查找</Text>
                </View>

                {this.renderShowSearchedPrinter()}

                {this.state.showTestView?
                    this.renderTest():null}
            </View>
        );
    }

    /**
     * 展示搜素到的打印机设备
     */
    renderShowSearchedPrinter(){
        return (
            <View>
                <SelectListView
                    data={this.state.data}
                    _onSelect={this._onSelect}
                ></SelectListView>
            </View>
        );
    }

    renderTest(){

        return (
            <TouchableOpacity style={SettingsPrinterStyles.testPrinterView} onPress={()=>{this.write(0)}}>
                <Text style={SettingsPrinterStyles.testPrinterText}>打印测试页</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 选择
     * @private
     */
    _onSelect(itemId){
        //this._flushSelectOn(itemId);
        //this.disconnect();
        if(this.state.currentMachineId == itemId){
            return ;
        }
        this.connect(itemId);
    }

    /**
     * 返回实现函数
     * @private
     */
    _onBackPage(){
        this.props.navigation.goBack();

    }

    /**
     * itemId:value[0],
     itemName:value[1],
     action:"OFF"
     * @param itemId
     * @private
     */
    _flushSelectOn(itemId){

        let newData = this.state.data;

        for(let selectIndex = 0 ; selectIndex < newData.length;selectIndex ++){
            if(newData[selectIndex].itemId == itemId){
                newData[selectIndex].action = "ON";
            }
        }

        this.setState({
            data:newData
        });
    }

    /**
     * 开关切换方法
     * @param value
     * @private
     */
    _onSwitchValueChange(value){
        this.setState({
            switchValue:value,
        });
        if(value){
            this.scan();
        }else{
            this.disconnect();
        }
    }

    componentWillMount(){
        BluetoothManager.start();  //蓝牙初始化
        this.updateStateListener = BluetoothManager.addListener('BleManagerDidUpdateState',this.handleUpdateState);
        this.stopScanListener = BluetoothManager.addListener('BleManagerStopScan',this.handleStopScan);
        this.discoverPeripheralListener = BluetoothManager.addListener('BleManagerDiscoverPeripheral',this.handleDiscoverPeripheral);
        this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral',this.handleConnectPeripheral);
        this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral',this.handleDisconnectPeripheral);
       // this.updateValueListener = BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValue);
    }

    componentDidMount() {
        //判断是否曾经链接过，如果链接 则打开扫描按钮 扫描 是否曾经的链接的蓝牙打印机是否在之中，如果在之中则发起链接，显示信息
        this._retrieveData();

    }

    componentWillUnmount(){
        this.updateStateListener.remove();
        this.stopScanListener.remove();
        this.discoverPeripheralListener.remove();
        this.connectPeripheralListener.remove();
        this.disconnectPeripheralListener.remove();
       // this.updateValueListener.remove();
        if(this.state.isConnected){
            BluetoothManager.disconnect();  //退出时断开蓝牙连接
        }
    }


    alert(text){
        Alert.alert('提示',text,[{ text:'确定',onPress:()=>{ } }]);
    }


    scan(){
        if(this.state.scaning){  //当前正在扫描中
            BluetoothManager.stopScan();
            this.setState({scaning:false});
        }
        if(BluetoothManager.bluetoothState == 'on'){
            BluetoothManager.scan()
                .then(()=>{
                    this.setState({ scaning:true });
                }).catch(err=>{

            })
        }else{
            BluetoothManager.checkState();
            if(Platform.OS == 'ios'){
                this.alert('请开启手机蓝牙');
            }else{
                this.alert('请开启手机蓝牙',[
                    {
                        text:'取消',
                        onPress:()=>{ }
                    },
                    {
                        text:'打开',
                        onPress:()=>{ BluetoothManager.enableBluetooth() }
                    }
                ]);
            }

        }
    }

    //蓝牙状态改变
    handleUpdateState=(args)=>{
        console.log('BleManagerDidUpdateStatea:', args);
        BluetoothManager.bluetoothState = args.state;
        if(args.state == 'on'){  //蓝牙打开时自动搜索
            //this.scan();
        }
    }

    //扫描结束监听
    handleStopScan=()=>{
        console.log('BleManagerStopScan:','Scanning is stopped');
        this.setState({scaning:false});
    }





    connect(itemId){
        //当前蓝牙正在连接时不能打开另一个连接进程
        if(BluetoothManager.isConnecting){
            console.log('当前蓝牙正在连接时不能打开另一个连接进程');
            return;
        }
        if(this.state.scaning){  //当前正在扫描中，连接时关闭扫描
            BluetoothManager.stopScan();
            this.setState({scaning:false});
        }
        BluetoothManager.connect(itemId)
            .then(peripheralInfo=>{

                //连接成功，列表只显示已连接的设备
                this.setState({
                    isConnected:true,
                    currentMachineId:itemId,
                    showTestView:true,
                });

                this._flushSelectOn(itemId);
                let printInfo = {printId:itemId};

                this._storeData(PrintConst.PRINT_INFO_KEY,printInfo);
            })
            .catch(err=>{
                this.alert('连接失败');
            })
    }


    //搜索到一个新设备监听
    handleDiscoverPeripheral=(data)=>{
        // console.log('BleManagerDiscoverPeripheral:', data);
        console.log(data.id,data.name);
        let id;  //蓝牙连接id
        let macAddress;  //蓝牙Mac地址
        if(Platform.OS == 'android'){
            macAddress = data.id;
            id = macAddress;
        }else{
            //ios连接时不需要用到Mac地址，但跨平台识别同一设备时需要Mac地址
            //如果广播携带有Mac地址，ios可通过广播0x18获取蓝牙Mac地址，
            macAddress = BluetoothManager.getMacAddressFromIOS(data);
            id = data.id;
        }
        this.deviceMap.set(id,data.name);  //使用Map类型保存搜索到的蓝牙设备，确保列表不显示重复的设备

        let newData = this._deviceMapToDataArray();
        //判断是否已经连接过的打印机在其中
        this._ifHavePrinter(newData);
        this.setState({data:newData});

        console.log("handleDiscoverPeripheral",this.state.data);
    }

    /**
     * 如果已经有链接过打印机
     * @private
     */
    _ifHavePrinter(data){
        if(this.state.currentMachineId == ""){
            return ;
        }
        for (let dataIndex = 0 ; dataIndex < data.length;dataIndex++){
            if(data[dataIndex].itemId == this.state.currentMachineId){
                data[dataIndex].action = "ON";
                //发起连接
                this.connect(this.state.currentMachineId);
            }
        }

    }

    //蓝牙设备已连接
    handleConnectPeripheral=(args)=>{
        console.log('BleManagerConnectPeripheral:', args);
    }

    //蓝牙设备已断开连接
    handleDisconnectPeripheral=(args)=>{
        console.log('BleManagerDisconnectPeripheral:', args);
        let newData = this._deviceMapToDataArray();
        BluetoothManager.initUUID();  //断开连接后清空UUID
        this.setState({
            data:newData,
            isConnected:false,
            switchValue:false,
            showTestView:false,
            currentMachineId:"",
        });
    }


    /**
     * 将 deviceMap 转为 SelectListView 适配的数据
     * @returns {Array}
     * @private
     */
    _deviceMapToDataArray(){
        console.log("_deviceMapToDataArray",this.deviceMap);
        let newData = [];
        for(value of this.deviceMap){
            console.log("for ",value);
            let dataItem = {
                itemId:value[0],
                itemName:value[1],
                action:"OFF"
            };
            newData.push(dataItem);
        }
        return newData;
    }

    /**
     * 写数据
     * @param index
     * @private
     */
    write=(index)=>{

        let printParam = {
            title:"微小区",
            author:"java110测试",
            shops:[
                {
                    name:"青椒肉丝",
                    count:"x1",
                    price:"12.00"
                }
            ],
            total:"12.00",
            tranId:"20180909123456",
            shopName:"他乡客栈",
            userName:"java110测试",
            orderTime:"09/09 16:36:42"
        };

        BluetoothManager.write(ESC.print(printParam),index)
            .then(()=>{
                this.bluetoothReceiveData = [];
                this.setState({
                    writeData:this.state.text,
                    text:'',
                })
            })
            .catch(err=>{
                this.alert('发送失败');
            })
    }

    disconnect(){
        if(!this.state.isConnected){
            return ;
        }
       this._flushSelectOFF();
        BluetoothManager.disconnect();
        this.setState({
            isConnected:false,
            showTestView:false,
            currentMachineId:"",
        });
    }

    /**
     * itemId:value[0],
     itemName:value[1],
     action:"OFF"
     * @param itemId
     * @private
     */
    _flushSelectOFF(){

        let newData = this.state.data;

        for(let selectIndex = 0 ; selectIndex < newData.length;selectIndex ++){
                newData[selectIndex].action = "OFF";
        }

        this.setState({
            data:newData
        });
    }


    /**
     * store data
     * @param key
     * @param value
     * @returns {Promise.<void>}
     * @private
     */
    _storeData (key,value){
        console.log("_storeData:","进入",key,value);
        AsyncStorage.setItem(key, JSON.stringify(value),(error)=>{
            if (error){
                console.log("存值失败",error);
            }else{
                console.log('存值成功!');
            }
        });
    }

    /**
     * 查询数据
     * @returns {Promise.<void>}
     * @private
     */
    _retrieveData = async () =>{
        console.log("进入_retrieveData方法");
        try {
            const value = await AsyncStorage.getItem(PrintConst.PRINT_INFO_KEY);
            console.log("_retrieveData ",value);
            if (value !== null) {
                // We have data!!
                let valueObj = JSON.parse(value);
                //this._connect(valueObj.printId);
                this.setState({
                    currentMachineId:valueObj.printId,
                    switchValue:true,
                });
                this.scan();
            }
        } catch (error) {
            // Error retrieving data
            console.log("_retrieveData ",error)
        }
    }

}