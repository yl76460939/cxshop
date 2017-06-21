// 设置jQuery Ajax全局的参数
$.ajaxSetup({
	type : 'POST',
	error : function(XMLHttpRequest, textStatus, errorThrown) {

		if (XMLHttpRequest.status == '401') {
			swal({
				title : '登录超时!',
				text : '请重新登录',
				type : 'error'
			}, function() {
				location.href = $('base[href]').attr('href');
			});
		} else {
			swal('操作异常', '请联系管理员', 'error');
		}
	}
});

// 设置全局的data-tables参数
if ($.fn.dataTable) {
	$.extend($.fn.dataTable.defaults, {
		language : {
			processing : '处理中...',
			lengthMenu : "每页显示 _MENU_ 条记录",
			zeroRecords : "<div class='record_nothing'></div>",
			info : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			infoEmpty : "",
			emptyTable : "<div class='record_nothing'></div>",
			search : "搜索",
			infoFiltered : "(从 _MAX_ 条数据中检索)",
			paginate : {
				"first" : "首页",
				"previous" : "上一页",
				"next" : "下一页",
				"last" : "尾页"
			}
		},
		paginate : true,
		pagingType : "full_numbers",
		displayLength : 10,
		processing : false,
		serverSide : true,
		searching : false,
		dom : '<"top"i>rt<"bottom"flp><"clear">'
	});
}

function globalLoginOut(XMLHttpRequest) {
	if (XMLHttpRequest.status == "401") {
		swal({
			title : "登录超时!",
			text : "请重新登录",
			type : "error"
		}, function() {
			location.href = $('base[href]').attr('href');
		});
	}
}
