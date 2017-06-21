var downLoadModuleId = 'LAND_FEEDBACK_INFO';
var datatables;
var mainIndex;

$(function(){
	initbreadcrumb([ {text : '权限管理'},{text : '用户注册'}]);
	renderLeftMenu('auth', 'user_reg');
	
	$(".floating-btn").click(function(){
		var iArr = [];
		var uArr = [];
		var invalid = [];
		$(".show-item-area table tr:not(:first-child)").
		each(function(){
			var td = $(this).find("td:eq(2)");
			// 0 插入id 和nickname
			// 1 修改nickname
			// 2 不需要处理
			// 3 不能处理 检查工号
			var flag = td.data("flag");
			var phoneNo = td.data("phoneNo");
			var workNo = td.data("workNo");
			if(flag == 0){
				iArr.push({phoneNo : phoneNo, workNo: workNo});
			}else if(flag == 1){
				uArr.push({phoneNo : phoneNo, workNo: workNo});
			}else{
				invalid.push({phoneNo : phoneNo, workNo: workNo});
			}
		})
		
		if(iArr.length > 0 || uArr.length > 0){
			var url = "authController/reg";
			$.post(url,{iArr: JSON.stringify(iArr), uArr: JSON.stringify(uArr)},
					function(result){
				if(result){
					//swal("注册成功", "", "success");
					var msg = "";
					if(result.s == 1){
						msg = "操作成功 ";
						if(result.i > 0){
							msg += " 插入"+result.i+" 条 ";
						}
						if(result.u > 0){
							msg += "更新 "+result.u+" 条 ";
						}
					}else{
						msg = "操作失败 ";
					}
					var notification = new NotificationFx({
						message : '<div class="ns-thumb">\
							<img src="static/main/images/user1.jpg"/></div>\
							<div class="ns-content">\
							<p>'+msg+'</p>\
							</div>',
						layout : 'right',
						ttl : 6000,
						effect : 'thumbslider',
						type : 'success', // notice, warning, error or success
						onClose : function() {
							
						}
					});
					notification.show();
				}else{
					swal("操作失败", "", "error");
				}
			}, 'json')
		}else{
			var notification = new NotificationFx({
				message : '<div class="ns-thumb">\
					<img src="static/main/images/user1.jpg"/></div>\
					<div class="ns-content">\
					<p>暂无数据需要处理 哟哟哟哟哟哟 goodbye</p>\
					</div>',
				layout : 'right',
				ttl : 6000,
				effect : 'thumbslider',
				type : 'success'
			});
			notification.show();
		}
	})
	
	$(".checkbutton").click(function(){
		var areaTxt = $.trim($(".inputTxtArea").val());
		if(!!!areaTxt){
			return;
		}
		var item = areaTxt.split(/\n/g);
		var table = $("<table class='transition'/>");
		var thead = "<tr><th>工号</th><th>手机号码</th><th>检测</th></tr>";
		table.append(thead);
		var userInfo = [];
		var count = 0,invalid = 0;
		item.forEach(function(v,k){
			var user = v.split(/\s/g);
			if(user[0] && user[1]){
				var workNo = user[0].replace(/\u200B/g,'');
				var phoneNo = user[1].replace(/\u200B/g,'');
				var tr = $("<tr/>");
				var itemHtm = "<td>"+workNo+"</td><td>"+phoneNo+
				"</td><td phoneno='"+phoneNo+"'><div class='loading'></div></td>";
				table.append(tr.append(itemHtm));
				userInfo.push({workNo: workNo, phoneNo: phoneNo});
			}else{
				invalid ++;
			}
			count ++;
		})
		//
		if(count > 0){
			var ht = "<span class='count'> 解析"+count+"行 </span>";
			ht += "<span class='count'>有效数据"+(count-invalid)+"条 </span>";
			if(invalid > 0){
				ht += "<span class='invalid'>无效数据"+invalid+"条</span>";
			}
			$(".prompt-title").html("<i></i><span>"+ht+"</span>").css("opacity",1);
		}
		
		if(userInfo.length > 0){
			$(".show-item-area").html(table);
			var url = "authController/check";
			$.ajax({
				url: url,
				data: {users: JSON.stringify(userInfo)},
				dataType: 'json',
				beforeSend:function(){
					$(".checkbutton").attr("disabled",true);
				},
				complete:function(){
					$(".checkbutton").attr("disabled",false);
					$(".floating-btn").css("opacity",1);
				},
				success: function(results){
					if(results){
						
						var update = 0,insert = 0;
						results.forEach(function(v){
							// 0 插入id 和nickname
							// 1 修改nickname
							// 2 不需要处理
							// 3 不能处理 检查工号
							var flag = v.flag;
							var clazz;
							
							if(flag == 0){
								insert ++;
							}else if(flag == 1){
								update ++;
							}
							
							if(flag == 2){
								clazz = "warning";
							}else if(flag == 3){
								clazz = "error";
							}
							var id = v.key;
							var td = $(".show-item-area td[phoneno='"+id+"']");
							td.data({"flag":v.flag,phoneNo:id,workNo: v.value});
							td.html("<div class='prompt'><i class='"+clazz+"'></i>"
									+v.msg+"</div>");
						})
						
						if(insert > 0 || update > 0){
							var h = $("<span/>");
							if(insert > 0){
								var i = $("<span/>").addClass("count").html("需注册 "+insert+" 人");
								h.append(i);
							}
							
							if(update > 0){
								var u = $("<span/>").addClass("count").html(" 需更新工号 "+update+" 人");
								h.append(u);
							}
							
							$(".prompt-title").append(h);
						}
					}
				}
			})
		}
	})
})
