var icon = {}
/*北斗 7
雨量计 F
渗压计 I
深部测斜仪 E
水位计 J
裂缝计 A*/
icon.equipment = function(val,jsonpara,equipmentId){
    // console.log(val);
    // console.log(jsonpara);
    // console.log(equipmentId);
    var data = {}
    data.img = "images/icon/";

    // val+=1;

    // val = Number(val);
    // jsonpara.para_a = Number(jsonpara.para_a);
    // jsonpara.para_b = Number(jsonpara.para_b);
    // jsonpara.para_c = Number(jsonpara.para_c);
    // jsonpara.para_d = Number(jsonpara.para_d);
    // jsonpara.para_e = Number(jsonpara.para_e);
    // jsonpara.para_f = Number(jsonpara.para_f);
    // console.log(jsonpara);
    if(equipmentId == '7' || equipmentId == '北斗'){
        // 北斗要跟xy以及z比较，任何一个超过都红
        // val = Math.abs(val);
        data.img += 'bd';

        if(Math.abs(val.xy) >= jsonpara.para_e || Math.abs(val.z) >= jsonpara.para_f){
            data.text_color = color.gules;//红
            data.img += "2";
        }else if(Math.abs(val.xy) >= jsonpara.para_a || Math.abs(val.z) >= jsonpara.para_b){
            data.text_color = color.yellow;//黄
            data.img += "1";
        }else {
            data.text_color = color.green;//绿
            data.img += "0";
        }
    }else if(equipmentId == 'F' || equipmentId == '雨量计'){
        data.img += 'yuliangji';
        if(val >= jsonpara.para_c){
            data.text_color = color.gules;//红
            data.img += "2";
        }else if(val >= jsonpara.para_b){
            data.text_color = color.yellow;//黄
            data.img += "1";
        }else{
            data.text_color = color.green;//绿
            data.img += "0";
        }
    }else if(equipmentId == 'I' || equipmentId == '渗压计'){
        data.img += 'shenyaji';
        // 王总 2017/9/27 11:17:29
        // 边坡的只能用p，水库的用h最好
        var val_i;
        if(['3506I0006','3506I0007','3506I0008','3506I0009','3506I0005'].indexOf(getQueryString("buildcode")) > -1){
            // 水库
            val_i = val.h;
            if(val_i >= jsonpara.para_c){
                data.text_color = color.gules;//红
                data.img += "2";
            }else if(val_i >= jsonpara.para_b){
                data.text_color = color.yellow;//黄
                data.img += "1";
            }else{
                data.text_color = color.green;//绿
                data.img += "0";
            }

        }else{
            // 边坡
            val_i = val.p;

            if(val_i >= jsonpara.para_e){
                data.text_color = color.gules;//红
                data.img += "2";
            }else if(val_i >= jsonpara.para_d){
                data.text_color = color.yellow;//黄
                data.img += "1";
            }else{
                data.text_color = color.green;//绿
                data.img += "0";
            }
        }


    }else if(equipmentId == 'E' || equipmentId == '深部测斜仪'){
        data.img += 'cexieyi';
        if(val >= jsonpara.para_a){
            data.text_color = color.gules;//红
            data.img += "2";
        }else{
            data.text_color = color.green;//绿
            data.img += "0";
        }
    }else if(equipmentId == 'J' || equipmentId == '水位计'){
        data.img += 'shuiweiji';
        if(val >= jsonpara.para_b){
            data.text_color = color.gules;//红
            data.img += "2";
        }else if(val >= jsonpara.para_e){
            data.text_color = color.yellow;//黄
            data.img += "1";
        }else{
            data.text_color = color.green;//绿
            data.img += "0";
        }
    }else if(equipmentId == 'A' || equipmentId == '裂缝计'){
        data.img += 'liefengji';
        if(val >= jsonpara.para_a){
            data.text_color = color.gules;//红
            data.img += "1";
        }else{
            data.text_color = color.green;//绿
            data.img += "0";
        }

    }


    data.img += ".png";

    // console.log(data);

    return data;
}




var get = {};

// 根据devcode"3506N00010010701"获取归属的单位，以及属性
get.devlist = function(code,build){
    // console.log(code);
        /*北斗 7
        雨量计 F
        渗压计 I
        深部测斜仪 E
        水位计 J
        裂缝计 A*/
    var unitlist = {
        7:{
            para_a:[{name:'位移',unit:'mm'}],
            para_b:[{name:'沉降',unit:'mm'}]
        },
        F:{
            para_c:[{name:'大雨',unit:'mm'}],
            para_d:[{name:'暴雨',unit:'mm'}],
            para_e:[{name:'大暴雨',unit:'mm'}]
        },
        I:{
            para_a:[
                {name:'水位',unit:'m'},
                {name:'压强',unit:'kpa'}
            ]
        },
        E:{
            para_a:[{name:'位移',unit:'mm'}]
        },
        J:{
            para_c:[{name:'设洪水位',unit:'m'}],
            para_d:[{name:'校核洪水位',unit:'m'}]
        },
        A:{
            para_a:[{name:'宽度变化',unit:'mm'}]
        }
    }

    code_l5 = get.codeField(code,4,1);//地区
    code_r3 = get.codeField(code,-3,1);//设备

    build = build || code_r3;

    // console.log(code_l5);
    // console.log(code_r3);
    // console.log(build);


        //3506I00050010I08，加走湖，渗压计，l5=I，r3=I。是渗压计

    // if(code_l5 == 'I'){
    //     // code_l5 I 水库，N 边坡
    //     if(code_r3 == 'I'){
    //         // unitlist.I.para_a = {name:'水位',unit:'m'};
    //         unitlist.I.para_a = {name:'压强',unit:'kpa'};
    //     }
    // }else if(code_l5 == 'N'){


    //     if(code_r3 == 'I'){
    //         unitlist.I.para_a = {name:'压强',unit:'kpa'};
    //     }
    // }
    
    return unitlist[build];
}


// 获取字符中的字符段
get.codeField = function(code,num,length){
    //code，起始，长度
    length = length || 1;
    return code.substr(num,length);
}
// 获取code下的数据单位
get.codeUnit = function(letter,field_name){
    //c_type对象字母，数据字段名
    
}
get.codeType = function(code){
    var equipment = {};
// console.log(code);
    // if(code.length == 9){
        // buildcode 3506I0005
        // equipment.build = code.substr(5,1);

    // }else if(code.length == 16){
        // devcode 3506I00050010J06
        equipment.build = code.substr(5,1);

        equipment.equipment = code.substr(-3,1);
        if(equipment.equipment)
            equipment.devalias = get.equipment_name(equipment.equipment);
    // }
    return equipment;
}
//根据type获取所属图标
get.icon = function(type){
    // name: "北斗", type: "7", num: 5, devlist: Array(5)...
    var img;
    switch(type){
        case '7':
          img = 'images/icon/bd0.png';
          break;
        case 'F':
          img = 'images/icon/yuliangji0.png';
          break;
        case 'I':
          img = 'images/icon/shenyaji0.png';
          break;
        case 'E':
          img = 'images/icon/cexieyi0.png';
          break;
        case 'J':
          img = 'images/icon/shuiweiji0.png';
          break;
        case 'C'://裂缝计
        case 'A'://倾角计
          img = 'images/icon/liefengji0.png';
          break;
    }
    return img;
}
get.equipment_name = function(type){
    // name: "北斗", type: "7", num: 5, devlist: Array(5)...
    var name;
    switch(type){
        case '7':
          name = '北斗';
          break;
        case 'F':
          name = '雨量计';
          break;
        case 'I':
          name = '渗压计';
          break;
        case 'E':
          name = '固定式测斜仪';//深部测斜仪
          break;
        case 'J':
          name = '水位计';
          break;
        case 'C':
        case 'A':
          name = '裂缝计';
          break;
    }
    return name;
}

$(function(){
    if(myBrowser()=='IE' || myBrowser()=='Edge'){
        
        preLoadImg("/images/icon/bd0.png");
        preLoadImg("/images/icon/cexieyi0.png");
        preLoadImg("/images/icon/jizhunzhan0.png");
        preLoadImg("/images/icon/liefengji0.png");
        preLoadImg("/images/icon/map_back0.png");
        preLoadImg("/images/icon/shenyaji0.png");
        preLoadImg("/images/icon/shuiweiji0.png");
        preLoadImg("/images/icon/yuliangji0.png");

        if(!getQueryString("ie") && (window.location.pathname=='/' || window.location.pathname=="/index.html")){
            // preLoadImg();
            if(window.location.href.indexOf("?") <= -1){
                location.href = window.location.href + "?ie=11";
            }else{
                location.href = window.location.href + "&ie=11";
            }
        }
        // 不知道sb IE为啥不显示图片，艹
        var img = $('label img');
        // console.log(img);
        for(var a=0;a<img.length;a++){
            // console.log(img[a].src);

            img[a].src = img[a].src + "?s=1";
        }

        // var image = $('svg image');
        // for(var a=0;a<image.length;a++){
        //     // console.log(img[a].src);

        //     image[a].src = image[a].src + "?s=2"

        // }
    }
    if(myBrowser()=='IE' && ieEdition() == '<=8'){
        $("body").html('<h1>请用其他内核浏览器，或高于IE8的浏览器</h1>');
        $("body").css("display","block");
        alert('请用其他内核浏览器，或高于IE8的浏览器');
        return;
    }


    // $("body").css("display","block");
    // console.log(pageName());
    var login_ip = [
        "36.110.66.204",
        "36.110.66.204:9090",
        
        "127.0.0.1",
        "192.168.1.34",
        "192.168.20.39:9090",
        "192.168.20.39:8080",
        "192.168.20.23:8080"
    ];

    if(pageName() != 'login' && $.inArray(window.location.host, login_ip) != -1 && interface_url != 'http://10.160.131.2:8880/'){
        //验证是否登录
        $.ajax({
            type: "get",
            // contentType: W_config.getData.contentType,
            async: true,
            cache:true,
            url: interface_url+"zzcismp/user/login.shtml",
            dataType: "jsonp",
            jsonp: "callback",
            success: function(json){
                // console.log(json);
                // return;
                if(json.status == 1 || json.status == 0){
                    $("body").css("display","block");

                    //显示登录的用户
                    topUser(json);
                }else{
                    if($.cookie('login_auto')){
                        var data = {}
                        data.username = $.cookie('username');
                        data.password = $.cookie('password');
                        $.ajax({
                          type: W_config.getData.type,
                          contentType: W_config.getData.contentType,
                          async: false,
                          url: interface_url+"zzcismp/user/login.shtml",
                          data:dataFormat(data,W_config.getData.respType),
                          dataType: W_config.getData.dataType,
                          jsonp: "callback",
                          success: function(json){
                            // 1通过
                            // 3帐号密码错误
                            if(json.status != 1){
                              location.href="/login.html";
                            }else{
                                // console.log(json);
                                // topUser(json);
                                location.reload();
                            }
                          },
                          error: function(){
                           // alert('fail');
                          }
                        });
                    }else{
                        // alert("请登录");
                        location.href="/login.html";
                    }
                }

            },
            error: function(){
             // alert('fail');
            }
        });
    }else{
        $("body").css("display","block");
        topUser({
            admin:true,
            status:1,
            username:"admin"
        });
    }

    //时时获取坐标
    $(document).mousemove(function (e) {
        // $("p").text("X:" + e.pageX + "   Y:" + e.pageY);
        $("#platform").css({
            left: e.pageX+20,
            top: e.pageY+20,
            right: null
        });

    });


    //加载页头
    $.ajax({
        type: "get",
        url: "./public_header.html",
        success: function(html){
            $("nav ul").html(html);

            // 导航颜色
            $("nav>ul").on("mouseover",".target>ul>li>a",function(e) {
                $(this).parent().parent().parent().children("a").css("color","#37b3d5");
                // console.log(e);
            });
            $("nav>ul").on("mouseout",".target>ul>li>a",function(e) {
                // $(this).parent().parent().parent().children("a").css("color","#1f1f1f");
                $(this).parent().parent().parent().children("a").css("color","");
                // console.log(e);
            });
        }
    });
    // $("nav ul").load('./public_header.html',function(responseText,textStatus){
    //     if(textStatus == 'error'){
    //         // alert("加载失败...");
    //     }else{
    //         // 导航颜色
    //         $("nav>ul").on("mouseover",".target>ul>li>a",function(e) {
    //             $(this).parent().parent().parent().children("a").css("color","#37b3d5");
    //             // console.log(e);
    //         });
    //         $("nav>ul").on("mouseout",".target>ul>li>a",function(e) {
    //             // $(this).parent().parent().parent().children("a").css("color","#1f1f1f");
    //             $(this).parent().parent().parent().children("a").css("color","");
    //             // console.log(e);
    //         });
    //     }
    // });
    //加载用户
    $.ajax({
        type: "get",
        url: "./user.html",
        success: function(html){
            $("#container #top").html(html);

            //注销
            $("#top").on("click",".top_user button",function(e){
                $.ajax({
                    type: W_config.getData.type,
                    async: false,
                    url: interface_url+"zzcismp/user/logout.shtml",
                    dataType: W_config.getData.dataType,
                    jsonp: "callback",
                    success: function(json){
                        // console.log(json);
                        if(json.status == 1){
                            $.cookie('login_auto',null);
                            location.href="/login.html";
                        }else{
                            alert("注销失败");
                        }
                    },
                    error: function(){
                     // alert('fail');
                    }
                });
            });
        }
    });

    // $("#container #top").load('./user.html',function(responseText,textStatus){
    //     if(textStatus == 'error'){
    //         // alert("加载失败...");
    //     }else{
    //         //注销
    //         $("#top").on("click",".top_user button",function(e){
    //             $.ajax({
    //                 type: W_config.getData.type,
    //                 async: false,
    //                 url: interface_url+"zzcismp/user/logout.shtml",
    //                 dataType: W_config.getData.dataType,
    //                 jsonp: "callback",
    //                 success: function(json){
    //                     // console.log(json);
    //                     if(json.status == 1){
    //                         $.cookie('login_auto',null);
    //                         location.href="/login.html";
    //                     }else{
    //                         alert("注销失败");
    //                     }
    //                 },
    //                 error: function(){
    //                  // alert('fail');
    //                 }
    //             });


    //         });
    //     }
    // });


    $("body").on('click', '.u_users', function(event) {
        alert("你无权操作。");
    });
});



// 获取设备假坐标
map_coordinate.getNewCoordinate = function(devcode){
    return map_coordinate.modify["devcode_"+devcode];
}

// 字符补位
function text_fill(text,num,align){
    // text
    // num 总共位数
    // align 补位方向
    if(text.length >= num){
        return text;
    }else{
        var fill='';
        for (var i = 0; i < (num - text.length); i++) {
            fill += ' ';
        }
        if(align == 'left'){
            return fill+text;
        }else{
            //rigth
            return text+fill;
        }
    }
}
//获取当前文件名
function pageName(){
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length-1, b.length).toString(String).split(".");
    return c.slice(0, 1);
}

//数据发送格式
function dataFormat(data,type){
    var db;
    if(type == 'json'){
        db = JSON.stringify(data);
    }else{
        db = data;
    }

    return db;
}

// 处理页头用户功能显示
function topUser(data){
    var user = setInterval(function(){
        if(data.status == 1) {
            // console.log($("#top").children(".top_user").children("a").html());
            // if($("#top").children(".top_user").children("a").html() == "用户名："+data.username){
            //     clearInterval(user);
            // }
            $("#top").children('.top_user').css({display:"block"});
            $("#top").children(".top_login").css({display:"none"});
            // 修改用户名
            $("#top").children(".top_user").children("a").html("用户名："+data.username);


            //用户权限
            if(data.admin){
                //管理员
                administrator = true;

                $(".u_admin").css("display","inline-block");
                $(".u_users").css("display","none");

            }else{
                $(".u_admin").css("display","none");
                $(".u_users").css("display","inline-block");
            }

        }else{
            $(".top_user").css({display:"none"});
            $(".top_login").css({display:"block"});
        }


        // 更新logo
        if(pageName() == 'index'){
            $("#top").children('img').prop({
                src: 'images/logo.png'
            })
        }else{
            $("#top").children('img').prop({
                src: 'images/smalllogo.png'
            })
        }
    },500);

}


// get
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
    var title = null;
	if (r != null){
        // console.log(r);
        title = unescape(r[2]);

        if((myBrowser() != 'IE' && myBrowser() != 'Edge') || r[2].indexOf("%") >= 0)
            title = decodeURI(escape(title));

    }
    return title; 
}

// 字符串右移
var echartsExtend = {};
echartsExtend.yAxis_name = function (str){
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) 
            realLength += 1;
        else
            realLength += 2;
    }
    
    var name = ''; 
    for (var i = 1; i <= realLength; i++) {
        name+=' ';
    }
    return name+str;
}


// echartsExtend.yAxis_name = function (str){
//     var s = {};
//     switch(str){
//         case 1:
//           s = 
//           break;
//         case 2:
//           执行代码块 2
//           break;
//         default:
//           n 与 case 1 和 case 2 不同时执行的代码
//     }

//     return s;
// }
// 当前时间
// 时间戳转时间
function getNowFormatDate(datetime) {
    var date;
    if(datetime == 0){
        date = new Date();
    }else{
        date = new Date(datetime);
    }

    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var Hours = date.getHours()
    var Minutes = date.getMinutes()
    var Seconds = date.getSeconds()

    if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
    }
    if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + Hours + seperator2 + Minutes
            + seperator2 + Seconds;
    return currentdate;
}

// getDate辅助函数
function text_getDate(textdate){
    return getNowFormatDate(textdate);
    // textdate = textdate.split(/ |-|:/);
    // return getDate(textdate[0],textdate[1],textdate[2],textdate[3],textdate[4],textdate[5])
}
//时间戳获取时间
function getDate(datetime,year,month,date,hour,minute,second) {     
    datetime  = datetime.replace(/-/g,'/');
// alert(datetime);
    var now = new Date(datetime);

    var   year=now.getFullYear()+year;     
    var   month=now.getMonth()+month;     
    var   date=now.getDate()+date; 

    var   hour=now.getHours()+hour;     
    var   minute=now.getMinutes()+minute;     
    var   second=now.getSeconds()+second;     


    var date = new Date(year,month,date,hour,minute,second);

    return getNowFormatDate(date);
}

// 计算时间差
function timeDifference(starttime,endtime){

    function timeDifference_getDate(datetime) {     
        datetime  = datetime.replace(/-/g,'/');
        return new Date(datetime);
    }

    var starttime=timeDifference_getDate(starttime,0,0,0,0,0,0);  //开始时间

    var endtime=timeDifference_getDate(endtime,0,0,0,0,0,0);    //结束时间

    var dates=endtime.getTime()-starttime.getTime()  //时间差的毫秒数

    // var now = new Date(dates);

    // console.log(now);

    var date_length_text = '';

    // var year=now.getFullYear() - 2;     
    // var month=now.getMonth();     
    // var date=now.getDate(); 

    // var hour=now.getHours() - 8;
    // var minute=now.getMinutes();     
    // var second=now.getSeconds();

    // console.log(year);
    // console.log(month);
    // console.log(date);
    // console.log(hour);
    // console.log(minute);
    // console.log(second);

    // if(year)
    //     date_length_text += year+"年";
    // if(month || year)
    //     date_length_text += month+"月";
    // if(date || year)
    //     date_length_text += date+"天";
    // if(hour || year)
    //     date_length_text += hour+"时";
    // if(minute || year)
    //     date_length_text += minute+"分";
    // if(second || year)
    //     date_length_text += second+"秒";


    return parseInt(dates/(34*3600*1000))+"天";
}
// 事件格式化,日期加上年月日，时分秒
function setDateFormat(date,Format){
    if(Format!=false)
        Format=true;
    var datetime = '';
    if(Format){
        var dt = {}
        dt.Y = date.substr(0,4);
        dt.m = date.substr(5,2);
        dt.d = date.substr(8,2);
        dt.H = date.substr(11,2);
        dt.i = date.substr(14,2);
        dt.s = date.substr(17,2);

        for(var k in dt){
            if(dt[k]){
                datetime += dt[k];

                if(k == 'Y')
                    datetime += "年";
                if(k == 'm')
                    datetime += "月";
                if(k == 'd')
                    datetime += "日 ";
                if(k == 'H')
                    datetime += "时";
                if(k == 'i')
                    datetime += "分";
                if(k == 's')
                    datetime += "秒";
            }
        }
    }else{
        date = date.replace("年","-");
        date = date.replace("月","-");
        date = date.replace("日","");
        date = date.replace("时",":");
        date = date.replace("分",":");
        date = date.replace("秒","");

        datetime = date
    }
    return datetime;
}
//判断浏览器
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    // console.log(userAgent);

    var isOpera = userAgent.indexOf("Opera") > -1;
    // console.log(userAgent);
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    }
    
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
      return "Chrome";
     }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("rv:11") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器

}
function ieEdition(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

    
    if(userAgent.indexOf("rv:11") > -1){
        return 11;
    }else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE 10.0;") > -1) {
        return 10;
    }else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE 9.0;") > -1){
        return 9;
    }else{
        return '<=8'
    }
}

var down = {};
down.canvas = function(canvas,name,replace){
    //replace 在下载表的时候用，具体原因不知道
    if(myBrowser() == 'IE'){
        if(ieEdition() >= 10){
            // ie10+
            var blob = canvas.msToBlob();
            navigator.msSaveBlob(blob, name);
        }else{
            var data;
            if(replace == 'image/octet-stream'){
                data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
            }else{
                data = canvas.toDataURL("image/png");
            }
            
            new_html = "<title>"+name+"</title><img src=\""+data+"\" title=\""+name+"\" alt=\""+name+"\">";
            // console.log(a);
            myWindow=window.open('','');
            myWindow.document.write(new_html);
            myWindow.focus();
        }
    }else{
        var saveLink = document.createElement('a');

        // 之前只支持chrome
        // saveLink.href = canvas.toDataURL("image/png");
        // saveLink.download = name;

        saveLink.setAttribute("href", canvas.toDataURL("image/png"));
        saveLink.setAttribute("download", name);
        document.body.appendChild(saveLink);

        // console.log(saveLink);

        saveLink.click();
    }
}

down.dom = function(dom,name){
    html2canvas(
        [dom],
        {
            logging: false,
            useCORS: false,
            proxy:   false,
            onrendered: function(canvas){
                // canvas 就是绘制的canvas是对象

                // var strDataURI = canvas.toDataURL();

                down.canvas(canvas,name,'image/octet-stream');
            }
        }
    );
}

function GetRandomNum(Min,Max){   
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
// 刷新频率
f5_time = 10*60000;
//删除加载中动画
function loading(id,background){
    if(background == "loading2") {
        background = "../images/loading2.gif";
    }

    $(id).css({
        backgroundImage: background
    });
}
// 预加载图片
function preLoadImg(url) { 
    var img = new Image(); 
    img.src = url; 
} 