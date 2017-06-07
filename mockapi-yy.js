//login
Mock.mock(basepath + "/user/login", 'post', {
  "success": true,
  "msg": "成功",
  "data": {
  	"id":1,
    "mobile": 13555555555,
  }
});
//register
Mock.mock(basepath + "/user/reg", 'post', {
  "success": true,
  "msg": "成功",
  "data": {
	  "success": false,
	  "msg": "验证码输入错误",
	  "obj": null
	}
});
//code
Mock.mock(basepath + "/user/sendCode", 'post', {
  "success": true,
  "msg": "成功",
  "data": {
	  "success": false,
	  "msg": "发送失败",
	  "obj": null
	}
});
//forget
Mock.mock(basepath + "/user/updatePwd", 'post', {
  "success": true,
  "msg": "成功",
  "data": {
	  "success": false,
	  "msg": "验证码输入错误",
	  "obj": null
	}
});
//recharge
Mock.mock(basepath + "/recharge", 'post', {
  "success": true,
  "msg": "成功",
  "data": {
	  "id":1,
	}
});