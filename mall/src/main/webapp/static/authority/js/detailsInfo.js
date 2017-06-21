$(function() {

	var table = $('#detailsInfo').DataTable({
		"language" : {
			"processing" : '处理中...',
			"lengthMenu" : "每页显示 _MENU_ 条记录",
			"zeroRecords" : "<div class='record_nothing'></div>",
			"info" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"infoEmpty" : "",
			"emptyTable" : "<div class='record_nothing'></div>",
			"search" : "搜索",
			"infoFiltered" : "(从 _MAX_ 条数据中检索)",
			"paginate" : {
				"first" : "首页",
				"previous" : "上一页",
				"next" : "下一页",
				"last" : "尾页"
			}
		},
		"paginate" : false,
		"pagingType" : "full_numbers",
		"displayLength" : 10,
		"processing" : false,
		"serverSide" : false,
		"searching" : true,
		scrollX : true,
		data : JSON.parse(details),
		columns : [ {
			"data" : "roleName"
		}, {
			"data" : "remark"
		}, {
			"data" : "menuName"
		}, {
			"class" : 'details-control',
			"orderable" : false,
			"data" : null,
			"defaultContent" : ''
		} ],
		columnDefs : [ {
			"render" : function(data, type, row) {
				return "<strong>" + data + "</strong>";
			},
			"targets" : 2
		} ]
	});
	$('#detailsInfo tbody').on('click', 'td.details-control', function() {
		var tr = $(this).closest('tr');
		var row = table.row(tr);
		if (row.child.isShown()) {
			row.child.hide();
			tr.removeClass('shown');
		} else {
			var rtz = format(row.data());
			row.child(rtz[0]).show();
			$('#'+rtz[1]).DataTable({
				"language" : {
					"processing" : '处理中...',
					"lengthMenu" : "每页显示 _MENU_ 条记录",
					"zeroRecords" : "<div class='record_nothing'></div>",
					"info" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					"infoEmpty" : "",
					"emptyTable" : "<div class='record_nothing'></div>",
					"search" : "搜索",
					"infoFiltered" : "(从 _MAX_ 条数据中检索)",
					"paginate" : {
						"first" : "首页",
						"previous" : "上一页",
						"next" : "下一页",
						"last" : "尾页"
					}
				},
				"paginate" : true,
				"pagingType" : "full_numbers",
				"displayLength" : 10,
				"processing" : false,
				"serverSide" : false,
				"searching" : true,
				"ordering":false
			});
			tr.addClass('shown');
		}
	});
})

function format(d) {
	var cityArr = d.city.split(",");
	var countArr = d.counts.split(",");
	var row = "";
	for (var index = 0; index < cityArr.length; index++) {
		row += "<tr><td>" + cityArr[index] + "</td><td>" + countArr[index]
				+ "</td></tr>";
	}
	var tempId = new Date().getTime();
	var htm = '<div class="detailSubContent"><table id=' + tempId
			+ ' class="stripe row-border order-column dataTable" cellpadding="5"'
			+ 'cellspacing="0" border="0">'
			+ '<thead><tr>' + '<th>城市名称</th>' + '<th>可下载条数</th>'
			+ '</tr></thead>' + row + '</table></div>'
	return [htm,tempId];
}