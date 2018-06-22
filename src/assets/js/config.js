/*北斗 7
雨量计 F
渗压计 I
深部测斜仪 E 固定式测斜仪
水位计 J
倾角计 A
裂缝计 C
*/

 // var interface_url = 'http://192.168.20.23:8080/';
// var interface_url = 'http://192.168.20.23:8181/';
// var interface_url = 'http://192.168.20.23:8282/';
// var interface_url = 'http://192.168.1.43:8080/';//李志明
// var interface_url = 'http://192.168.1.56:8080/';//崔敏
// var interface_url = 'http://192.168.1.59:8080/';//崔敏


//var interface_url = 'http://10.161.8.16:9999/';

// 城市公共平台—内网资源服务目录（空间）
// http://10.160.131.2:8300/OneMapServer/rest/services/

//  城市公共平台—互联网资源服务目录（空间）
// http://218.5.185.66:6069/arcgis/rest/services/ZZKFQ 


/*map原1
// 外网
// var interface_url = 'http://36.110.66.204:9090/';
// var interface_url = 'http://192.168.20.39:9090/';

// 20170628新地图服务器
var map_api_vec = 'http://218.5.185.66:6069/arcgis/rest/services/ZZKFQ/CGCS2000_KFQMAP/MapServer';//底图
var map_api_cva = 'http://218.5.185.66:6069/arcgis/rest/services/ZZKFQ/CGCS2000_KFQMAP_ZJ/MapServer';

map原2*/


 // var interface_url = 'http://10.160.131.2:8880/';
var interface_url = 'http://192.168.20.23:8080/';

// 平面图
 var map_api_vec = 'http://10.160.131.2:8300/OneMapServer/rest/services/SLDZDT2000/MapServer';
 var map_api_cva = 'http://10.160.131.2:8300/OneMapServer/rest/services/SLDZDTZJ2000/MapServer';
// 影像图
// var map_api_vec = 'http://10.160.131.2:8300/OneMapServer/rest/services/YXDZDT2000/MapServer';
// var map_api_cva = map_api_vec;




/*map新1
// 内网，为了程序修改内外网，map原是外网，map新是内网
var interface_url = 'http://10.160.131.2:8880/';

// 平面图
var map_api_vec = 'http://10.160.131.2:8300/OneMapServer/rest/services/SLDZDT2000/MapServer';
var map_api_cva = 'http://10.160.131.2:8300/OneMapServer/rest/services/SLDZDTZJ2000/MapServer';


// 影像图
// var map_api_vec = 'http://10.160.131.2:8300/OneMapServer/rest/services/YXDZDT2000/MapServer';
// var map_api_cva = 'http://10.160.131.2:8300/OneMapServer/rest/services/YXDZDTZJ2000/MapServer';

// 数字正射影像
// var map_api_vec = 'http://10.160.131.2:8300/OneMapServer/rest/services/DOM2000/MapServer';
//var map_api_vec = 'http://10.160.131.2:8300/OneMapServer/rest/services/YXDT2000/MapServer';
//var map_api_cva = map_api_vec;
map新2*/



// (year,month,week,day,hour,minute,second, millisecond，其中常用的是day或hour)

// 用于验证是否是管理员
var administrator = false;

var W_config = {};
W_config.title = '城市安全监测系统';

// 接口请求方式
W_config.getData = {};
W_config.getData.type = "get";//get
W_config.getData.respType = "text";//text发送格式，6-26要求发送json

W_config.getData.contentType = "application/javascript;charset=UTF-8"; //默认
// W_config.getData.contentType = "application/x-www-form-urlencoded; charset=UTF-8"; //解决post发送变option

// W_config.getData.contentType_postDataType = "application/x-www-form-urlencoded; charset=UTF-8"; //解决post发送变option

// W_config.getData.contentType = "application/json";//发送协议
W_config.getData.dataType = "jsonp";//jsonp，接收格式

var export_word_img = [];

// 经度，J=0.9995*J0+0.0748
// 纬度，W=0.9982*W0+0.0465
var map;
var ismap = false;
var ismap_fun = false;//验证调用方式
var popup;

//上传备用
var uploadBase = [];



var color = {}
// 红
color.gules = [191,0,0];
color.gules16 = '#bf0000';
// 黄
color.yellow = [222,160,0];
color.yellow16 = '#dea000';
// 绿
color.green = [46,191,0];
color.green16 = '#2ebf00';

// 各个图表的标注
var img_text = {};
     img_text.textStyle_color = "#ccc";
    //img_text.textStyle_color = "#000";
    img_text.textStyle_fontWeight = "normal";
    img_text.textStyle_fontSize = "12";

// 走势图颜色
var echarts_color = ['#ff7e7a','#90d2ff', '#b878ff', '#ff9c79', '#a4ffd5','#b8ff8c',  '#ff96fc', '#f1ffa7','#ffec56', '#a7ddff', '#ffec56'];

//为了避免多个设备覆盖，重造假坐标
var map_coordinate = {};

map_coordinate.modify = {
    // 院仔水库S1
    devcode_3506I00070010J13:{
        devlat: 24.369589470825197,
        devlon: 118.01098825378418,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end

    },
    // 院仔水库Y3
    devcode_3506I00070010F14:{
        devlat: 24.36621226767456,
        devlon: 118.01384561596848,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 弯桥水库S1
    devcode_3506I00090010J01:{
        devlat: 24.37953992068437,
        devlon: 118.02657471654422,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 湾桥水库Y5
    devcode_3506I00090010F02:{
        devlat: 24.378477818391563,
        devlon: 118.02465679092407,
        setOffset: {
            x:-10,
            y:-3
        },
        setAlign:'end'
    },
    // 院桥水库S1
    devcode_3506I00060010J13:{
        devlat: 24.36727065857002,
        devlon: 118.00695741255362,
        setOffset: {
            x:-10,
            y:-3
        },
        setAlign:'end'
    },
    // 厦大附中Y2
    devcode_3506N00040010F11:{
        devlat: 24.360445,
        devlon: 118.038572,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 黄村林水库Y4
    devcode_3506I00080010F02:{
        devlat: 24.393558,
        devlon: 118.039897,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 四区公寓Y6
    devcode_3506I00110010F01:{
        devlat: 24.352028,
        devlon: 118.077072,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 第一医院Y1
    devcode_3506N00030010F16:{
        devlat: 24.38085,
        devlon: 118.04265,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 静湖公园F1
    devcode_3506I00140010F01:{
        devlat: 24.40126,
        devlon: 118.04614,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 汤洋雨量F2
    devcode_3506I00120010F01:{
        devlat: 24.39691,
        devlon: 118.02409,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 双鱼岛对岸F3
    devcode_3506I00130010F01:{
        devlat: 24.38873,
        devlon: 118.06018,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 双鱼岛Y7
    devcode_3506I00100010F91:{
        devlat: 24.378831,
        devlon: 118.077392,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 加走湖水库S1
    devcode_3506I00050010J06:{
        devlat: 24.397388,
        devlon: 118.044606,
        setOffset: {
            x:5,
            y:-3
        },
        setAlign:'start'//end
    },
    // 黄村林水库S1
    devcode_3506I00080010J01:{
        devlat: 24.392285833300203,
        devlon: 118.03876410383495,
        setOffset: {
            x:-10,
            y:-3
        },
        setAlign:'end'
    },


    
};