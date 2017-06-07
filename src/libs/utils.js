'use strict'
import store from '../vuex/store'
import Notification from '../components/notification/main.js'

/**
 * @about  默认图
 * @param 无
 * @return 无
 * @author bob
 */
exports.defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAAAWcElEQVR4Xu3diW4bxxJGYSr7vjp5/wfyeyRx9n2PL35eVNBpNDeLtkjWJ4CwLJHDqVOlg+plhnePHz9+utlsNk+fPt3c3d3lW18IIIBACwJ3BNgiz4JEAIEFgX8FmN/pANUIAgh0IvCvAMmvU9rFigAC26avhsAEqCAQQKAbAUPgbhkXLwII/EtAB6gYEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAE2roGnT59u7u7utgTyfX3Vz+rn4/9vDdfI4NZiE89hAgR4mNHNPmMlwFl2syBGUV47mMRa8dyy5K89T8/z/AnwedK9gmPvEsDq5/Wza5Xg2O3W96MEx3QR4hUU7xlOkQDPAPHaDrEa7h4SYWJ86aWXto9xyDwPl/O7S5LHHNcY+z///KMDvLbiPfP5EuCZgV7D4WYBzh3dPC/48ssvb1599dXt45VXXtkK7hSJPiSTXd1q5PfXX39tfv/9983ff/+9jeeSxP2QzDq9NwF2yvYQ6zHD2JLCW2+9tXnvvfc2+fe1117bK4pzSmTXwsypKZuH7jnHyO+3337bfP/995tff/1188cff/wnrnPGcer5ev6LI0CAL471xbxTiW2XBPPHnw4p/6bre//99zcff/zx9vt0g9f4NXd41QH++OOPmx9++GH7MAd4jZm93zkT4P34XeWrx3mxEt38x5+fZ77vzTff3Mrv0aNH26fk53/++ed/uqVRpJe8qjoufGQon690gV9//fXmyy+/JMCrrOb7nTQB3o/fVb760PC3OsB0e++8887mo48+2j4ivl9++WU7bMy82errkgWYc0tMGcZnSB+5Z+gbAT558sSCyFVW8/1OmgDvx+8qX32sANMBRhSR34cffrhdMMhQMbIoAa42UheU+8yjrc5xtY3llASke03nF/Glo43cI/USYH5/jnM/5Zw892EJEODD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4nnPjwDPy/NqjnZoL2AtiOQqjMyXPXr0aDt3mJsLZCi8+rr0RYSKKRLMZXb5N1eW5DNIchfp8UsHeDWlfK8TJcB74bvOF4975lZ792obTKLL9pEIMDcPSOeU/X638FUyz3XF9bnEtaFbF3gLGT4uBgI8jtNNPetQ9zcPh+suzLl2dr4F/Woe8FIEMsc5dnXpZDP8rbva5Pvx9zrAmyr5ncEQYI88/yfKUwSY59aNSDNsrC7w0BzgJQjkkAAzp5kbLMy38b8UgTcszRceMgG+cOSX8Yar+brVau78s0sQ2zkIJq56zNcy30qM5+B068cgwFvP8CK+cQ5w1xaWUZDHbnO5pEWQQ9t8Vr+/1D2NDUv0hYVMgC8M9eW80akCPPbML0mAOec5zn2d3SnPPZaH510+AQK8/Bw9lzM8ZQh8y0PCVad7y/E+l2K64oMS4BUn73mc+qV1cc8jRsdEoAgQoFpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIECAagABBNoSIMC2qRc4AggQoBpAAIG2BAiwbeoFjgACBKgGEECgLQECbJt6gSOAAAGqAQQQaEuAANumXuAIIPA/yu9euh7u2+cAAAAASUVORK5CYII=';
exports.spaceGif = "data:image/png;base64,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";

/**
 * @about 根据url判断是内部跳转还是跳出页面，并进行跳转
 * @param
 *      url:{链接(http://www.baidu.com),内部跳转({name:'test'})},
 *      $router:路由
 * @return 无返回值，进行页面跳转
 * @author bob
 */
exports.go = function (url, $router, replace) {
    if (/^javas/.test(url) || !url) {
        return;
    }
    if (url.showError) {
        Notification.error({
            title: '错误',
            message: url.showError
        });
        return;
    }
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url));
    if (useRouter) {
        if (replace || url.urlreplace) {
            $router.replace(url);
        } else {
            $router.push(url);
        }

    } else {
        window.open(url, '_blank');
    }
}

/**
 * @about 根据url判断是内部跳转还是跳出页面，并进行跳转
 * @param
 *      url:{链接(http://www.baidu.com),内部跳转({name:'test'})},
 *      $router:路由
 * @return 无返回值，进行页面跳转
 * @author bob
 */
exports.back = function ($router, step) {
    let stp = step ? -step : -1;
    $router.go(stp);
}


/**
 * @about 更新sessionStorage user信息
 * @param
 *      user:user信息
 * @return 无
 * @author bob
 */
exports.setUser = function (user) {
    store.commit('UPDATE_USER', user);
    if (typeof user == "object") {
        user = JSON.stringify(user);
    }
    window.sessionStorage.setItem('adminuser', user);
}

/**
 * @about 检查用户是否登录
 * @param
 *      user:user信息
 * @return 无
 * @author bob
 */
exports.checkUser = function () {
    let flag = false;
    //检查用户是否登录
    exports.ajax({
        url: "/seller/seller/login/check",
        silence: true,
        async: false,
        success: function (res) {
            if(res.result && res.result.flag == "yes"){
                flag = true;
                //exports.setUser({"phone":res.result.phone});
            }else{
                exports.setUser("");
            }

        }
    });
    return flag;
}

/**
 * @about 显示loading
 * @param
 *      text:显示文字，选填，默认值  '拼命加载中'
 * @return 无
 * @author bob
 */
exports.loadingShow = function (text) {
    let txt = text || "拼命加载中";
    store.commit("UPDATE_LOADING", {"isshow": true, "text": txt});
}
/**
 * @about 隐藏loading
 * @param 无
 * @return 无
 * @author bob
 */
exports.loadingHide = function () {
    store.commit("UPDATE_LOADING", {"isshow": false, "text": "拼命加载中"});
}


/**
 * @about 操作sessionStorage
 * @param 无
 * @return 无
 * @author bob
 */
exports.setSession = function (name, value) {
    if (typeof value == "object") {
        value = JSON.stringify(value);
    }
    sessionStorage.setItem(name, value);
}

exports.getSession = function (name) {
    return sessionStorage.getItem(name);
}
exports.delSession = function (name) {
    if (sessionStorage.getItem(name)) {
        sessionStorage.removeItem(name);
    }
}


/**
 * @about 格式化时间
 * @param
 *      date:{number或date}毫秒时间，必填
 *      fmt:{string}需要生成的时间格式，选填 默认  MM-dd hh:mm
 * @return string   格式化时间字符串
 * @author bob
 */
exports.formatTime = function (date, format) {
    if (typeof date == "number") {
        date = new Date(date);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var fmt = format || "yyyy-MM-dd hh:mm";
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    } else {
        return date;
    }

}

/**
 * @about 格式化价格
 * @param
 *      s:{string}  要转化的价格的数目，单位 “分”
 * @return string   格式化的价格字符串
 * @author bob
 */
exports.formatPrice = function (s) {
    var n = 2;
    s = parseInt(s) / 100 + "";
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}


/**
 * @about 包含loading的显隐
 * @param
 *      obj:{
*             "url":"/app/demo",//请求url，必填
*             "dataType":"json",//数据格式，选填，默认json
*             "type":"POST",//请求类型，选填，默认POST
*             "data":{},//请求参数，选填，默认{}
*             "success":function(){},//成功回调，选填，默认function(){}
*             "error":function(){},//error回调，选填，默认function(){}
*             "async": true,//是否异步，选填，默认true
*             "message": '拼命加载中',//请求时的文字，选填，默认  拼命加载中
*             "stringify": 提交数据是否需要stringify，默认不stringify
*           }
 * @return 无
 * @author bob
 */
exports.ajax = function (obj) {
    if (!obj.url) {
        return;
    }
    let bpath = basepath;
    if (obj.ignoreBase) {
        bpath = "";
    }

    let url = bpath + obj.url,
        dataType = obj.dataType ? obj.dataType : 'json',
        contentType = obj.contentType ? obj.contentType : 'application/json',
        type = obj.type ? obj.type : 'POST',
        async = obj.async === false ? false : true,
        params = obj.data ? obj.data : {};
    if (obj.stringify !== false) {
        params = JSON.stringify(params);
    }

    if(!obj.silence){
        exports.loadingShow(obj.message);
    }

    $.ajax({
        xhrFields: {
           withCredentials: true
        },
        crossDomain: true,
        url: url,
        dataType: dataType,
        contentType: contentType,
        type: type,
        async: async,
        data: params,
        success: function (data) {
            if(!obj.silence){
                exports.loadingHide();
            }
            if (data.code=="SUCCESS") {
                if (obj.success) {
                    obj.success(data);
                }
            }else if(data.code == "auth_seller_error"){
                exports.setUser("");
                window.location.reload();
            } else {
                if(obj.silence){
                    return;
                }
                if (obj.success) {
                    obj.success(data);
                }
                // Notification.error({
                //     title: '错误',
                //     message: data.message
                // });
            }
        },
        error: function (o, xhr, property) {
            if(obj.silence){
                return;
            }
            exports.loadingHide();
            if (obj.error) {
                obj.error(o, xhr, property);
            } else {
                Notification.error({
                    title: '错误',
                    message: '网络繁忙，请稍后再试'
                });
            }

        }
    });
}
/**
 * @about emoji表情转换
 * @param
 *      value:{string} 消息内容，必填
 * @return string   带emoji表情的消息
 * @author bob
 */
exports.emoji = function(value) {
    var qqfaceMap = {"[微笑]":"0","[撇嘴]":"1","[色]":"2","[发呆]":"3","[得意]":"4","[流泪]":"5","[害羞]":"6","[闭嘴]":"7","[睡]":"8","[大哭]":"9","[尴尬]":"10","[发怒]":"11","[调皮]":"12","[呲牙]":"13","[惊讶]":"14","[难过]":"15","酷":"16","[冷汗]":"17","[抓狂]":"18","[吐]":"19","[偷笑]":"20","[愉快]":"21","[白眼]":"22","[傲慢]":"23","[饥饿]":"24","[困]":"25","[惊恐]":"26","[流汗]":"27","[憨笑]":"28","[悠闲]":"29","[奋斗]":"30","[咒骂]":"31","[疑问]":"32","[嘘]":"33","[晕]":"34","[疯了]":"35","[衰]":"36","[骷髅]":"37","[敲打]":"38","[再见]":"39","[擦汗]":"40","[抠鼻]":"41","[鼓掌]":"42","[糗大了]":"43","[坏笑]":"44","[左哼哼]":"45","[右哼哼]":"46","[哈欠]":"47","[鄙视]":"48","[委屈]":"49","[快哭了]":"50","[阴险]":"51","[亲亲]":"52","[吓]":"53","[可怜]":"54","[菜刀]":"55","[西瓜]":"56","[啤酒]":"57","[篮球]":"58","[乒乓]":"59","[咖啡]":"60","[饭]":"61","[猪头]":"62","[玫瑰]":"63","[凋谢]":"64","[嘴唇]":"65","[爱心]":"66","[心碎]":"67","[蛋糕]":"68","[闪电]":"69","[炸弹]":"70","[刀]":"71","[足球]":"72","[瓢虫]":"73","[便便]":"74","[月亮]":"75","[太阳]":"76","[礼物]":"77","[拥抱]":"78","[强]":"79","[弱]":"80","[握手]":"81","[胜利]":"82","[抱拳]":"83","[勾引]":"84","[拳头]":"85","[差劲]":"86","[爱你]":"87","[NO]":"88","[OK]":"89","[爱情]":"90","[飞吻]":"91","[跳跳]":"92","[发抖]":"93","[怄火]":"94","[转圈]":"95","[磕头]":"96","[回头]":"97","[跳绳]":"98","[投降]":"99","[激动]":"100","[乱舞]":"101","[献吻]":"102","[左太极]":"103","[右太极]":"104"};
    var str= "\\[微笑\\]|\\[撇嘴\\]|\\[色\\]|\\[发呆\\]|\\[得意\\]|\\[流泪\\]|\\[害羞\\]|\\[闭嘴\\]|\\[睡\\]|\\[大哭\\]|\\[尴尬\\]|\\[发怒\\]|\\[调皮\\]|\\[呲牙\\]|\\[惊讶\\]|\\[难过\\]|\\[酷\\]|\\[冷汗\\]|\\[抓狂\\]|\\[吐\\]|\\[偷笑\\]|\\[愉快\\]|\\[白眼\\]|\\[傲慢\\]|\\[饥饿\\]|\\[困\\]|\\[惊恐\\]|\\[流汗\\]|\\[憨笑\\]|\\[悠闲\\]|\\[奋斗\\]|\\[咒骂\\]|\\[疑问\\]|\\[嘘\\]|\\[晕\\]|\\[疯了\\]|\\[衰\\]|\\[骷髅\\]|\\[敲打\\]|\\[再见\\]|\\[擦汗\\]|\\[抠鼻\\]|\\[鼓掌\\]|\\[糗大了\\]|\\[坏笑\\]|\\[左哼哼\\]|\\[右哼哼\\]|\\[哈欠\\]|\\[鄙视\\]|\\[委屈\\]|\\[快哭了\\]|\\[阴险\\]|\\[亲亲\\]|\\[吓\\]|\\[可怜\\]|\\[菜刀\\]|\\[西瓜\\]|\\[啤酒\\]|\\[篮球\\]|\\[乒乓\\]|\\[咖啡\\]|\\[饭\\]|\\[猪头\\]|\\[玫瑰\\]|\\[凋谢\\]|\\[嘴唇\\]|\\[爱心\\]|\\[心碎\\]|\\[蛋糕\\]|\\[闪电\\]|\\[炸弹\\]|\\[刀\\]|\\[足球\\]|\\[瓢虫\\]|\\[便便\\]|\\[月亮\\]|\\[太阳\\]|\\[礼物\\]|\\[拥抱\\]|\\[强\\]|\\[弱\\]|\\[握手\\]|\\[胜利\\]|\\[抱拳\\]|\\[勾引\\]|\\[拳头\\]|\\[差劲\\]|\\[爱你\\]|\\[NO\\]|\\[OK\\]|\\[爱情\\]|\\[飞吻\\]|\\[跳跳\\]|\\[发抖\\]|\\[怄火\\]|\\[转圈\\]|\\[磕头\\]|\\[回头\\]|\\[跳绳\\]|\\[投降\\]|\\[激动\\]|\\[乱舞\\]|\\[献吻\\]|\\[左太极\\]|\\[右太极\\]";
    var reg = new RegExp(str,'g');
    var result = value.replace(reg,function(r){
        return '<img class="qqemoji qqemoji'+qqfaceMap[r]+'" src="'+exports.spaceGif+'">';
    });
    return result;
}

/**
 * @about 照片预览
 * @param
 *
 * @return 无
 * @author zhaoze
 */
exports.layerPic = {
    gray: $('<div id="gray"></div>'),
    msg: $('<div id="msg"><div id="imgCon"></div></div>'),
    btn: $('<div class="rotateBtn" id="rotateBtn"></div>'),
    btnRight: $('<div class="out"><a id="rotateLeft" href="javascript:;" target="_blank" title="下载图片"></a><a href="javascript:;" id="rotateRight"></a></div>'),
    imgWidth: 0,
    imgHeight: 0,
    num: 0,
    init: function (img) {
        $("body").append(this.gray).append(this.msg);
        this.msg.append(this.btn);
        this.btn.append(this.btnRight);
        var imgSrc = $(img).attr("src");
        var img = new Image();
        var $this = this;
        img.onload = function () {
            var windowHeight = $(window).height();
            $this.msg.find("#imgCon").append('<img src="' + imgSrc + '"/>');
            if (this.height > windowHeight - 100) {
                $this.msg.height(windowHeight - 100);
                var newWith = this.width * (windowHeight - 100) / this.height;
                $this.msg.width(newWith);
                $this.imgWidth = newWith;
                $this.imgHeight = windowHeight - 100;
            } else {
                $this.msg.height(this.height);
                $this.msg.width(this.width);
                $this.imgWidth = this.width;
                $this.imgHeight = this.height;
            }
            $this.autoCenter();
        }
        img.src = imgSrc;
        this.gray.fadeIn();
        this.msg.fadeIn();
        this.gray.click(function () {
            $this.close(this);
        });
        $(window).resize(function () {
            $this.autoCenter();
        });
        this.btnRight.find("#rotateRight").click(function () {
            if (!window.addEventListener) {
                alert("请升级您的浏览器");
            } else {
                $this.rotateRight();//右旋转
            }
        });
        this.btnRight.find("#rotateLeft").attr("href",img.src);
    },
    autoCenter: function () {
        var w = $(window).width() - this.msg.width() - 10;
        var h = $(window).height() - this.msg.height() - 10;
        this.msg.css({left: w / 2, top: h / 2});
    },
    rotateLeft: function () {
        this.num++;
        this.msg.find("#imgCon").css({"transform": "rotate(" + 90 * this.num + "deg)"});
        this.rotatePosition();
    },
    rotateRight: function () {
        this.num--;
        this.msg.find("#imgCon").css({"transform": "rotate(" + 90 * this.num + "deg)"});
        this.rotatePosition();
    },
    rotatePosition: function () {
        var $imgCon = this.msg.find("#imgCon");
        var windowHeight = $(window).height();
        if (this.msg.width() > windowHeight - 100 && this.num % 2 != 0) {
            var newW = $(window).height() - 100;
            var newH = newW * this.imgHeight / this.imgWidth;
            this.msg.width(newW);
            this.msg.height(newH);
            var postop = $imgCon.position().top;
            this.btn.css({bottom: postop + 15 + "px"});
        } else if (this.msg.width() < windowHeight - 100 && this.num % 2 != 0) {
            var postop = $imgCon.position().top;
            this.btn.css({bottom: postop + 15 + "px"});
        } else {
            this.btn.css({bottom: "15px"});
            this.msg.width(this.imgWidth);
            this.msg.height(this.imgHeight);
        }
        this.autoCenter();
    },
    close: function (gray) {
        this.msg.find("#imgCon").empty();
        this.msg.remove();
        this.num = 0;
        this.btn.css({bottom: "20px"});
        this.msg.find("#imgCon").css({"transform": "rotate(0deg)", "top": "0px"});
        $(gray).remove();
    }
};

/**
 * @about 验证规则
 * @param
 * mobile：手机格式验证
 * vcode：验证码验证
 * noEmpty：不能为空
 * password：密码验证
 * password2：密码不一致验证
 * @return 无
 * @author zhaoze
 */

exports.rules = {
    mobile: [
        {required: true, message: '请输入手机号', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (!/^1\d{10}$/.test(value)) {
                    callback(new Error('手机号输入错误'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    code: [
        {required: true, message: '请输入邮编', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (!/^\d{6}$/.test(value)) {
                    callback(new Error('邮编输入错误'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    vcode: [
        {required: true, message: '请输入验证码', trigger: 'blur'}
    ],
    epy: [
        {required: true, message: '不能为空', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (value.trim()=="") {
                    callback(new Error('请输入内容'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    noEmpty: [
        {required: true, message: '不能为空', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (value.indexOf(" ") > -1) {
                    callback(new Error('不能包含空格'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    oldPassword: [
        {required: true, message: '请输入旧密码', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 20, message: '请输入6-20位数字、字母或常用符号，不能包含空格，字母区分大小写', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (value.indexOf(" ") > -1) {
                    callback(new Error('不能包含空格'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    number: [{required: true, message: '不能为空', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (!/^\d+$/.test(value)) {
                    callback(new Error('必须为数值类型'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }],
    select: [
        {required: true, message: '请选择', trigger: 'change'},
    ],
    bankNum: [
        {required: true, message: '请输入卡号', trigger: 'blur'},
        {min: 16, max: 19, message: '卡号有误', trigger: 'blur'},
    ],
    money: [{
        validator: (rule, value, callback) => {
            if (/^(0|0.0|0.00)$/.test(value)) {
                callback(new Error('金额不能为0'));
            } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value)) {
                callback(new Error('金额格式有误且最多输入两位小数'));
            } else {
                callback();
            }
        }, trigger: 'blur'
    }],
    http: [
        {
            validator: (rule, value, callback) => {
                if (!/^(http:\/\/|https:\/\/)/.test(value)) {
                    callback(new Error('网址必须http://或https://开头'));
                } else {
                    callback();
                }
            }, trigger: 'change'
        }],
    selectMore: [
        {
            validator: (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择'));
                } else {
                    callback();
                }
            }, trigger: 'change'
        }
    ]
};


exports.getUrl = function(url){
    if(url.indexOf("http") < 0){
        url = "/" + url;
    }
    return url;
}