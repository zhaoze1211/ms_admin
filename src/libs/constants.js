/**
 * @about ��ҳ����
 *@param  ��
 * @return ��
 * @author bob
 */
exports.pagination={
	"pageSizes":[20, 50, 100, 500],
	"pageSize":15,
	"layout":"total, prev, pager, next, jumper"
}

/**
 * @about 订购应用状态
 *
 * @author yy
 */
exports.adStatus={

	"dzf":"DFK",     //待支付
	"dfh":"DFH",//待发货
	"yfh":"DSH",//已发货
	"jywc":"YSH", //交易完成
	"yqx":"YGB", //已取消
	"tkz":"PENDING",//退款中
	"tkwc":"AGREE",//同意完成
	"tkgb":"REJECT",//退款关闭
	"tkgb2":"CANCEL",//退款关闭
	"jtk":0,
	"thtk":1,
	"htnull":'空',
	"httkz":'退款中',
	"httkcg":'退款成功',
	"httksb":'退款失败'

}
/**
 *@about 订购应用   页面(三种状态：立即订购   待续费    已订购)
 *@param
 * 		   adStatus：订购应用状态
 * @return "status":status,
			"type":"",
			"text":"",
 * @author yy
 */
exports.adStatusView = function(status,breadName){
	let ads = exports.adStatus,
		result = {
			"status":status,
			"type":"",
			"text":"",
			"httxt":"",
		};
    if(status == ads.dzf){//待支付
//			result.type = "info";
			result.text = "等待付款";
			result.httxt="等待买家付款";
			result.btnText = "去支付";
			result.btnHide = true;
		}else if(status == ads.dfh){//待发货
//			result.type = "xv";
			result.text = "待发货";
			result.httxt="等待商家发货";
			result.btnText = "申请退款";
			result.btnHide = true;

		}else if(status == ads.yfh){
//			result.type = "gray";//已发货
			result.text = "等待收货";
			result.httxt="等待买家收货";
			result.btnText = "申请退款";
			result.btnHide = true;
		}else if(status == ads.jywc){
			result.httxt="交易完成";
			result.text = "交易完成";
		}else if(status == ads.yqx){
			result.text = "已取消";
			result.btnHide = false;
			result.httxt="订单已取消";
		}else if(status == ads.tkz){//退款中
//			result.type = "info";
			result.text = "退款处理中";
//			result.btnText = "去支付";
			result.btnHide = false;
		}else if(status == ads.tkwc){//退款完成
//			result.type = "xv";
			result.text = "退款完成";
//			result.btnText = "申请退款";
			result.btnHide = false;

		}else if(status == ads.tkgb||status == ads.tkgb2){
//			result.type = "gray";//退款关闭
			result.text = "退款关闭";
//			result.btnText = "申请退款";
			result.btnHide = false;
		}else if(status == ads.jtk){
//			result.type = "gray";//退款关闭
			result.text = "仅退款";
//			result.btnText = "申请退款";
			result.btnHide = false;
		}else if(status == ads.thtk){
//			result.type = "gray";//退款关闭
			result.text = "退货退款";
//			result.btnText = "申请退款";
			result.btnHide = false;
		}
	return result;
}

//订单状态
exports.convertStatus=function (status) {
    switch (status){
        case "DCL":
            return "退款处理中";
        case "TKTY":
            return "退款处理中";
        case "TKQR":
            return "退款处理中";
        case "TKWC":
            return "退款成功";
        case "TKGB":
            return "退款关闭";
    }
}
