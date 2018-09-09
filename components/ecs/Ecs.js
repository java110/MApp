const _ = require('lodash');
const Util = require('./util');
const Buffer = require('buffer').Buffer;
var iconv = require('iconv-lite');

const Common = {
    INIT: "1B 40",//初始化

    ALIGN_LEFT: "1B 61 00",//左对齐
    ALIGN_RIGHT: "1B 61 02",//居右对齐
    ALIGN_CENTER: "1B 61 01",//居中对齐

    UNDER_LINE: "1C 2D 01",//下划线

    PRINT_AND_NEW_LINE: "0A",//打印并换行

    FONT_SMALL: "1B 4D 01",//小号字体 9x17
    FONT_NORMAL: "1B 4D 00",//正常 12x24
    FONT_BOLD: "1B 45 01",//粗体

    FONT_HEIGHT_TIMES: '1B 21 10',
    FONT_WIDTH_TIMES: '1B 21 20',
    FONT_HEIGHT_WIDTH_TIMES: '1B 21 30',

    SOUND: "1B 42 02 02" // 蜂鸣 2次/100ms
};

const Config = {
    wordNumber: 48 // 可打印的字数，对应80mm纸张
};

let printArray = [];


function writeTextToDevice(text){
    let re = iconv.encode(text,'gbk')
    console.log("writeTextToDevice",Array.from(re));
    // return an array of bytes

    printArray = printArray.concat(Array.from(re));
    return re;
}

/*
function writeTextToDevice(str){
    var bytes = new Array();
    var len,c;
    len = str.length;
    for(var i = 0; i < len; i++){
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF){
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000800 && c <= 0x00FFFF){
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000080 && c <= 0x0007FF){
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        }else{
            bytes.push(c & 0xFF);
        }
    }
    printArray = printArray.concat(bytes);
    return bytes;
}
*/


function writeHexToDevice(hexString) {

    let str = hexString.toLowerCase().replace(" ","");
    let pos = 0;
    let len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    let hexA = new Array();
    for (let i = 0; i < len; i++) {
        let s = str.substr(pos, 2);
        let v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    console.log("writeHexToDevice",hexA);
    printArray = printArray.concat(hexA);
    return hexA;
}

function setConfig(config) {
    Object.assign(Config, config);
}

function leftRight(left, right, wordNumber = Config.wordNumber) {
    return left + Util.getSpace(wordNumber - Util.getWordsLength(left) - Util.getWordsLength(right)) + right;
}

function keyValue(name, value, wordNumber = Config.wordNumber) {
    const nameLen = Util.getWordsLength(name);
    let vArr = [], temp = '';
    _.each(value, (v, i) => {
        const tvLen = Util.getWordsLength(temp + v);
        const diff = tvLen - (wordNumber - nameLen);
        if (diff <= 0) {
            temp += v;
            if (i === value.length - 1) {
                vArr.push(temp);
            }
        } else {
            if (Util.isChinese(v) && diff === 1) {
                temp += ' ';
            }
            vArr.push(temp);
            temp = v;
        }
    });
    return _.map(vArr, (v, i) => {
        if (i === 0) {
            return name + v;
        } else {
            return Util.getSpace(name.length) + v;
        }
    }).join('');
}

/**
 * {
 *  title:"微小区",
 *  author:"java110",
 *  shops:[
 *      {
 *          name:"青椒肉丝",
 *          count:"x1",
 *          price:"12.00"
 *      }
 *  ],
 *  total:"110.00",
 *  tranId:"20180909123456",
 *  shopName:"他乡客栈",
 *  userName:"一纸荒年",
 *  orderTime:"09/09 16:36:42"
 * }
 * @returns {*}
 */
function print(printParam){

    printArray = [];
    // 一定要配置好
    Config.wordNumber = 32;


    ESC.init();
    ESC.alignCenter();
    ESC.printAndNewLine();
    ESC.alignCenter();
    ESC.fontBold();
    ESC.text('            '+printParam.title);
    ESC.printAndNewLine();
    ESC.printAndNewLine();
    ESC.fontSmall();
    ESC.text('            '+printParam.author);
    ESC.printAndNewLine();
    ESC.text(_.times(Config.wordNumber, () => '=').join(''));

    ESC.fontNormal();
    ESC.printAndNewLine();
    ESC.text('名称           数量       价格\n');
    for(let shopIndex = 0 ;shopIndex < printParam.shops.length;shopIndex ++){
        let shopItem = printParam.shops[shopIndex];
        ESC.text(ESC.Util.leftRight(shopItem.name, '', 16)
        + ESC.Util.leftRight(shopItem.count, '', 6)
        + ESC.Util.leftRight('', shopItem.price+"元\n", 10));

    }

    ESC.text(_.times(Config.wordNumber, () => '-').join(''));
    ESC.printAndNewLine();
    /*this.text('合计                   110.00元');*/
    ESC.text(ESC.Util.leftRight('合计', '', 24)
        + ESC.Util.leftRight('', printParam.total+"元", 8));
    ESC.printAndNewLine();
    ESC.text(_.times(Config.wordNumber, () => '-').join(''));
    ESC.printAndNewLine();

    /*this.text('交易号           20180908087817\n');*/
    ESC.text(ESC.Util.leftRight('交易号', '', 16)
        + ESC.Util.leftRight('', printParam.tranId+"\n", 16));
    ESC.text(ESC.Util.leftRight('门店名称', '', 16)
        + ESC.Util.leftRight('', printParam.shopName+"\n", 16));
    ESC.text(ESC.Util.leftRight('顾客名称', '', 16)
        + ESC.Util.leftRight('', printParam.userName, 16));
    ESC.printAndNewLine();

    ESC.text(_.times(Config.wordNumber, () => '-').join(''));
    ESC.printAndNewLine();
    ESC.text(ESC.Util.leftRight('下单时间', '', 16)
        + ESC.Util.leftRight('', printParam.orderTime, 16));
    ESC.printAndNewLine();
    ESC.text(_.times(Config.wordNumber, () => '-').join(''));

    ESC.printAndNewLine();
    ESC.printAndNewLine();
    ESC.printAndNewLine();
    ESC.printAndNewLine();
    ESC.printAndNewLine();
    ESC.printAndNewLine();

    ESC.sound();
    ESC.init();

    console.log("传输字节",printArray);

    return printArray;
}

const ESC = {
    Common,
    Util: {
        leftRight,
        keyValue,
    },
    setConfig,

    init(){
        writeHexToDevice(Common.INIT);
    },
    printAndNewLine(){
        writeHexToDevice(Common.PRINT_AND_NEW_LINE);
    },
    alignLeft(){
        writeHexToDevice(Common.ALIGN_LEFT);
    },
    alignCenter(){
        writeHexToDevice(Common.ALIGN_CENTER);
    },
    alignRight(){
        writeHexToDevice(Common.ALIGN_RIGHT);
    },

    underline(){
        writeHexToDevice(Common.UNDER_LINE);
    },

    fontSmall(){
        writeHexToDevice(Common.FONT_SMALL);
    },
    fontNormal(){
        writeHexToDevice(Common.FONT_NORMAL);
    },
    fontBold(){
        writeHexToDevice(Common.FONT_BOLD);
    },

    fontHeightTimes(){
        writeHexToDevice(Common.FONT_HEIGHT_TIMES);
    },
    fontHeightTimes(){
        writeHexToDevice(Common.FONT_WIDTH_TIMES);
    },
    fontHeightTimes(){
        writeHexToDevice(Common.FONT_HEIGHT_WIDTH_TIMES);
    },

    text(str){
        writeTextToDevice(str)
    },

    sound(){
        writeHexToDevice(Common.SOUND);
    },
    getByte(){
        return printArray;
    },

    resetByte(){
        printArray = [];
    },
    print(printParam){
        return print(printParam);
    }
};

module.exports = ESC;