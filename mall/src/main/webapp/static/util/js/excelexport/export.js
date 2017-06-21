/**
 * excel导出
 */
var downLoadExcel = function(params) {
	var privUrl = "export/checkPrivilege";
	var downLoadUrl = "export/download";
	$.post(privUrl, params, function(x) {
		var comfrim = false;
		var promptMsg = "";
		// 如果没有通过
		if (!x.pass || x.resultNum == 0) {
			var title = "";
			if (x.status == 2) {// 版本号不一致导致不可下载
				promptMsg = '下载异常,请重新下载(版本号不一致)!';
			} else if (x.status == 3) {// 下载剩余条数为0
				promptMsg = "您今天在[" + x.moduleName + "]的剩余下载条数为0";
			} else if (x.resultNum == 0) {// 下载条数为0
				promptMsg = "没有检索到结果,请重新选择条件检索!";
			} else if (x.status == 0) {// 没有下载权限
				promptMsg = "您没有下载权限,请联系管理员!";
			} else if (x.status == 1 && x.resultNum>x.surplusNum){
				promptMsg = "当前下载条数:" + x.resultNum;
				promptMsg += "  可用下载条数:" + x.surplusNum;
				title = "可用下载条数不足,请联系管理员!";
			}
			swal({title:title,text:promptMsg,type:"error"});
		} else {
			promptMsg = "当前下载条数:" + x.resultNum;
			promptMsg += "  可用下载条数:" + x.surplusNum;
			swal({   
				title: "确认下载将扣除相应下载条数",   
				text: promptMsg,   
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#1caf9a",   
				confirmButtonText: "确认",
				}, 
				function(){   //进入下载
					if(typeof params === "object"){
						params = switchParams(params);
					}
					var expIframe = $("#commonExport");
					if(expIframe.size() == 0){
						expIframe = $("<iframe style='display:none;'>").attr("id","commonExport")
						.appendTo("body");
					}
					var tempSrc = downLoadUrl + '?' + params + '&versionNo=' + x.versionNo;
					expIframe.attr("src" ,tempSrc);
					// 更新notice信息
					$("#downloadnotice .notice-surplus-num").text(x.surplusNum-x.resultNum);
					
			});
		}
	}, 'json');

}

function getDownLoadNotice(){
	var url = "export/getNoticeInfo";
	$.ajax({
		url:url,
		data:{moduleId:downLoadModuleId},
		success:function(result){
			// pri_num surplus_num
			if(result){
				result = JSON.parse(result);
				var notice = '<span class="pull-right download-notice-1st" id="downloadnotice">';
				notice += '<i class="fa fa-bullhorn waring"></i>&nbsp;今日可用下载条数';
				notice += '<span class="notice-surplus-num">'+result.surplus_num+'</span>条</span>';
				$("#downLoadData").after(notice);
			}
		},
		//重写全局error
		error: function(){}
	})
}

function switchPars(obj) {
	var eleArr = [];
	if (arguments[1])
		obj.versionNo = arguments[1];
	for (var item in obj) {
		var ele = $("<input>").attr("name", item).attr("type", "hidden").attr(
				"value", obj[item]);
		eleArr.push(ele);
	}
	return eleArr;
}

function switchParams(object) {
	
	var uristr = "";
	for (var item in object) {
		uristr += item + '=' + object[item] + '&';
	}
	return uristr.substring(0, uristr.lastIndexOf('&'));
}