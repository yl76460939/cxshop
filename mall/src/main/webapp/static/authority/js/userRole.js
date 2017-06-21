	var datatables;
	$(function(){
		initbreadcrumb([ {text : '权限设置'}, {text : '用户角色关系设置'} ]);
		renderLeftMenu('auth', 'user_role');
		
		$.post('authController/after',function(result){
			if(result){
				var obj = JSON.parse(result);
				$(".activeNum").html(obj.active);
				$(".downLoadNum").html(obj.downloadCounts);
				$(".theHighest").html(obj.downloadMax);
			}
			
		});
		
		$("body").on("click",".prompt-div i",function(){
			$(this).parent().remove();
		})
		
		$("body").on("click",".tprompt-cancel-btn",function(){
			$(this).parents(".data-construction-wrap").remove();
		});
		
		// 修改用户角色
		$("#boxm").on("click",".nickname",function(){
			var row = JSON.parse($(this).attr('data-row'));
			var roleId = row.roleid;
			var roleName = row.rolename;
			var userId = row.user_id;
			var url = project_fullpath +"/authController/role";
		    $.post(url,function(rtz){
				var htm = '<ul class="checkbox-ul clearfix">';
				$.each(rtz,function(k,v){
					var selected = roleId == v.roleId ? 'selected':'';
					htm += '<li class="s '+selected+'" data-name="'+v.roleName+
					'" data-id="'+v.roleId+'"><span><i></i>'
					+v.roleName+' </span></li>';
				});
				htm += '</ul>';
				htm += '<div class="tprompt-btn-area">';
				htm += '<span class="role-sure-btn" ';
				htm += 'data-roleid="'+roleId+'" data-userid="'+userId+'">确定</span>';
				htm += '<span class="tprompt-cancel-btn">取消</span></div>';
				var tprompt = new window.tprompt({title:'修改角色:',info:htm});
				tprompt.show();
			},'json');
		})
		
		$("body").on("click",".role-sure-btn",function(){
			var _this = $(this);
			var params = [];
			$(this).parents(".info").
			find(".checkbox-ul>li.selected:not(.all,.exist)")
			.each(function(k,v){
				params.push($(this).data("id"));
			})
			if(params.length > 0){
				var roleId = params[0];
				var userId = _this.data('userid');
				var prevRoleId = _this.data('roleid');
				debugger;
				if(roleId && userId){
					$.post('authController/updateUserRole',
					{userId: userId,
						roleId: roleId, prevRoleId: prevRoleId},
					function(row){
						if(row){
							swal("保存成功 !!!! "+row, "", "success");
							// 刷新
						}
						
					},'json')
				}
				
			}
			$(this).parents(".data-construction-wrap").remove();
		})
		
		// 单选 角色
		$("body").on("click",".checkbox-ul>li.s",function(){
			if($(this).hasClass('selected')){
				return;
			}
			$(this).addClass('selected')
			.siblings(".selected").removeClass('selected');
		})
	})
	
	