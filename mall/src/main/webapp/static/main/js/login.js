function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

$(function() {
	var loginInfo = getCookie("rmbPsd");
	if(loginInfo){
		// 格式化数据
		var loginObj = JSON.parse(loginInfo);
		// 转obj
		loginObj = JSON.parse(loginObj);
		var loginAccEle = $("#loginAccount");
		if(!loginAccEle.val() || loginAccEle.val() == loginObj.loginAccount){
			loginAccEle.val(loginObj.loginAccount);
			rememberStr = loginObj.loginPsd;
			if(loginObj.loginPsd){
				$("#loginPsd").val(loginObj.loginPsd);
				$("#rememberPsd").iCheck('check');
			}
			
		}
		
	}

	$('input[type="checkbox"].flat-grey').iCheck({
		checkboxClass : 'icheckbox_minimal-blue',
	});
	
	$("#loginPsd").on({"keydown" : function(event){
		if(event.keyCode == 13){
			$("#loginBtn").click();
		}
	}})
	
	$("body").on({"keydown" : function(event){
		if(event.keyCode == 13){
			$("#loginBtn").click();
		}
	}})
	
	// 登录按钮
	$("#loginBtn").click(function() {
		var loginAccount = $("#loginAccount").val();
		var loginPsd = $("#loginPsd").val();
		var config = {icon: 5,offset: ['100px']};
		if (loginAccount && loginPsd) {
			$.post(project_fullpath+"/login/login",
					{loginAccount:loginAccount,
					 loginPsd:loginPsd,
					 rememberPsd:$("#rememberPsd").is(':checked')},
			function(rzt){
				//0: 成功 ;1: 不存在用户 ;2: 密码错误 ;
				if(rzt.status == 0){
					var url = project_fullpath+"/authController/roleInit"
					location.href = url;
				}else{
					var msg = "由于系统抽风,所以只能重试或联系管理员";
					if(rzt.status == 1){
						msg = "用户不存在";
					}else if(rzt.status == 2){
						msg = "密码错误";
					}
					layer.msg(msg, {icon: 0,offset: ['102px']});
				}
					
			},'json')
		}else{
			layer.msg('尼玛，打酱油呢，账号密码都不填完?', {icon: 5,offset: ['102px']});
		}

	});

})

