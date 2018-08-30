import {observable, action, runInAction, autorun} from 'mobx';
import {Alert} from 'react-native'
import PageActionConst from "../../constants/PageActionConst";
import VALUE_TYPE from "../../constants/ValueTypeConst";
import React from 'react';

 class PersonMobx{

    @observable
    personInfo: Object ={
        headerImage:require('../../images/ic.png')
    };

    @observable
    personUserNamePlaceHold:String = "请输入名称";

    @observable
    userName:String;

    @observable
    address:String;

    @observable
    password:String;

     @observable
     rePassword:String;

     @observable
     newPassword:String;

     @observable
     personAddressPlaceHold:String = "请输入地址";

     @observable
     sex :Number = 1;

    @observable
    personListData:Object = {
        data: [
            {
                message: '当前正在开发中',
                pageAction: PageActionConst.alert,
                itemName: '头像',
                itemValueType:VALUE_TYPE.IMAGE,
                itemValue: this.personInfo.headerImage,
                itemActionImage: require('../../images/more.png')
            },
            {
                message: 'ModifyPersonName',
                pageAction: PageActionConst.page,
                itemName: '名称',
                itemValueType:VALUE_TYPE.TEXT,
                itemValue: 'java110官方',
                itemActionImage: require('../../images/more.png')
            },
            {
                message: 'ModifyPersonSex',
                pageAction: PageActionConst.page,
                itemName: '性别',
                itemValueType:VALUE_TYPE.TEXT,
                itemValue: '男',
                itemActionImage: require('../../images/more.png')
            },
            {
                message: 'ModifyPersonAddress',
                pageAction: PageActionConst.page,
                itemName: '地址',
                itemValueType:VALUE_TYPE.TEXT,
                itemValue: '青海省西宁市',
                itemActionImage: require('../../images/more.png')
            },
            {
                message: 'ModifyPersonPassword',
                pageAction: PageActionConst.page,
                itemName: '修改密码',
                itemValueType:VALUE_TYPE.TEXT,
                itemValue: '',
                itemActionImage: require('../../images/more.png')
            }
        ]

    };

    // 构造
      /*constructor(props) {

          console.log("PersonMobx");
        // 初始状态
          this.personInfo = {
              headerImage:require('../../images/ic.png')
          };
          this.flushPersonListData();
      }*/

    @action
    modifyHeaderImage(imageData){
          console.log("modifyHeaderImage",imageData);
        this.personInfo = {
            headerImage:{uri:imageData}
        };
        //
        // this.flushPersonListData();

        let data = this.personListData.data;
        data[0].itemValue = this.personInfo.headerImage;
        this.flushPersonListData();
        //调后台服务保存数据

        console.log(this.personListData)
    }

    @action
    modifyUserName(userName){
        this.userName = userName;
    }

    @action
    modifyUserAddress(address){
        this.address = address;
    }

    @action
    modifyUserPassword(password){
        this.password = password;
    }

     @action
     modifyUserRePassword(rePassword){

         this.rePassword = rePassword;
     }

     @action
     modifyUserNewPassword(newPassword){
         this.newPassword = newPassword;
     }

    @action
    modifySex(sex){
         this.sex = sex;
    }

     @action
    commitUpdateUserName(){
        //let personListDataTmp = this.personListData;
        let data = this.personListData.data;
        console.log("PersonMobx",this.personListData);
        data[1].itemValue = this.userName;
        this.flushPersonListData();
    }

    @action
    commitUpdateAddress(){
        let data = this.personListData.data;
        console.log("PersonMobx",this.personListData);
        data[3].itemValue = this.address;
        this.flushPersonListData();

    }
     @action
     commitUpdatePassword(){
        if(this.rePassword !== this.password){
            return '两次原始密码不正确';
        }
         /*let data = this.personListData.data;
         console.log("PersonMobx",this.personListData);
         data[4].itemValue = this.address;
         this.flushPersonListData();*/
         return '0000';
     }

     @action
     commitUpdateSex(){
         let data = this.personListData.data;
         console.log("PersonMobx",this.personListData);
         data[2].itemValue = this.sex === 1 ? "男" : "女";
         this.flushPersonListData();

     }

    flushPersonListData(){
        let personListDataTmp = this.personListData;

        this.personListData = {};

        this.personListData = personListDataTmp;

    }

    showPersonInfo(){
        console.log(this.personInfo);
    }
}

personMobx = new PersonMobx();

export default personMobx