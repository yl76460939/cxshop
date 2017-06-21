var moduleId = 'FEEDBACK_FAQPREVIEW';
$(function(){
	renderLeftMenu('feedback',moduleId.toLowerCase());
	var crumb = [{text:'帮助与反馈'},{text:'FAQ预览'}];
	initbreadcrumb(crumb);
	
	$(".ver-inline-menu").on("click",".type-toggle",function(){
		if($(this).parent().hasClass("active")){
			return;
		}
		var fid = $(this).attr("data-value");
		var url = project_fullpath +"/feedbackCtrl/queryFAQInfo";
		$.post(url,{fid:fid},function(result){
			var html = '<div id="tab_'+fid+'" class="tab-pane active">';
			html += '<div id="accordion'+fid+'" class="panel-group">';
			var ishave = false;
			$.each(result,function(k){
				var index = k+1;
				var curId = this.id;
				var isPublish = this.isPublish;
				var colorClass = this.colorClass;
				var itemOrderby = this.itemOrderby;
				var isOpen = false;
				if(!ishave && this.isOpen == 1){
					isOpen = true;
					ishave = true;
				}
				var title = this.title;
				var content = this.content;
				var color = "panel-default";
				if(colorClass == 2){
					color = "panel-success";
				}else if(colorClass == 3){
					color = "panel-warning";
				}else if(colorClass == 4){
					color = "panel-danger";
				}
				html += '<div class="panel '+color+'">';
				html += '<div class="panel-heading">';
				html += '<h4 class="panel-title">';
				html += '<a class="accordion-toggle" data-toggle="collapse" ';
				html += 'data-id="'+curId+'"';
				html += 'data-parent="#accordion'+fid+'" ';
				html += 'href="#accordion'+fid+'_'+index+'" ' ;
				html += 'aria-expanded="'+isOpen+'"> ';
				html += '<span class="isNum">'+index+'</span>. '+title+' </a>';
				html += '<i class="pull-right fa'+(isPublish == 1 ?" fa-bookmark-o":"")+'"></i>';
				html += '</h4></div>';
				html += '<div id="accordion'+fid+'_'+index+'" ';
				html += 'class="panel-collapse collapse '+ (isOpen ? 'in' : '')+'" ';
				html += 'aria-expanded="'+isOpen+'">';
				html += '<div class="panel-body">'+(content==null?"":content)+'</div>';
				html += '</div></div>';
			})
			$("#tab-content").html(html);
		},"json");
	})
})
