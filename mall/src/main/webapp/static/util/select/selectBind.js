document.body.onclick = function (e) {
		    e = window.event || e;
		    var srcElement = e.srcElement || e.target;
		    var optionsDiv = ["areaMore","plateMore","propertyMore"];
		    var showCount = 0;
		    var showObj = "";
		    $.each(optionsDiv, function (i, j) {
		        if ($("#" + j).css("display") != "none"&&typeof $("#" + j).css("display")!="undefined") {
		            showCount++;
		            showObj = j;
		            if (showCount > 0) {
				        while (srcElement.nodeName.toLowerCase() != "a" &&srcElement.nodeName.toLowerCase() != "div" && srcElement.nodeName.toLowerCase() != "html" && srcElement.nodeName.toLowerCase() != "body") {
				            srcElement = srcElement.parentNode;
				        }
				        if (showObj.length > 0) {
				            showObj = showObj.substring(0, (showObj.length - 4))
				            if (srcElement.id.indexOf('savedis')<0 && srcElement.id.indexOf('canceldis')<0 &&srcElement != document.getElementById(showObj + "Open") && srcElement != document.getElementById(showObj)) {
				                $('#' + showObj + "More").hide();
				                $("#" + showObj).parent().removeClass('f_select_on');
				                $("#" + showObj).removeClass('f_select_on');
				            }
				        }
				    }
		           
		        }
		    })
	
		   
}


var selectControl={
		selectValues:'',
		intit:function(divid,data){
			$('#'+divid+"_value").val();//赋值给隐藏于，域
			$("#"+divid+" span").attr("title", "");
			$("#"+divid+" span").text("请选择");
			
			html='<div class="icon_caret02" style=" left:3%;"></div>'+
			     '<div class="overh" id="'+divid+'Open"> '+
			     '<input type="hidden" value="" id="'+divid+'_value" name="'+divid+'" />';
			
			$.each(data, function(index, item) {
				var label = item.label;
				var value = item.value+'0';
                html+='<a class="f_optionbox clearfix p08" href="javascript:">'+
  			  		  '<span class="sel_text fl" style="width:100%"> '+
					  '<input name="" type="checkbox" id="'+value+'" value="'+label+'" '+
					  '		class="form_check flat-grey" '+
					  '		style="position: absolute; opacity: 0;"> '+
					  ' <label style="width:80%;height:100%;" for="'+value+'" value="'+label+'" class="simple-label">'+label+'</label> '+
					  ' </span> '+
					  ' </a> ';
				
				
			});
			html+=
				 '</div>' +
				 '<div class="butbox butbox_bg"> '+
                 '<a href="javascript:" class="but_confirm" id="'+divid+'savedis">全选</a>'+
				 '<a href="javascript:" class="but_cancel ml10" id="'+divid+'canceldis">反选</a> '+
				 '</div>';  
			$('#'+divid+"More").html(html);
			$('#'+divid+'Open input[type="checkbox"].flat-grey')
            .iCheck({
				checkboxClass : 'icheckbox_minimal-blue',
			}).on('ifChanged',function(e){
				 //新加------------------------
                var objs = $("#"+divid+"Open").find("input[type=checkbox]:checked");
				var selectedValuesArr = [];
				var selectedTextsArr = [];
				$.each(objs, function(k, v) {
					selectedValuesArr.push(this.value);
					selectedTextsArr.push($(this).parent().next().text());
				})
				var selectedValues = selectedValuesArr.join(",");
				var selectedTexts = selectedTextsArr.join(",");
			
				if (selectedValues != "") {
					this.selectValues = selectedValues;
				} else {
					this.selectValues = "";
				}
				
				if(divid=='area'){
					var plateUrl = "bsctl/getPlate/"+$('#cityNO').val()+"/X?area="+this.selectValues;
					loadingSelectData("plate", plateUrl);
				}
				
				$('#'+divid+"_value").val(selectedValues);//赋值给隐藏于，域
				
				$("#"+divid+" span").attr("title", selectedTexts);
			
				if (selectedTexts == ""){
					$("#"+divid+" span").text("请选择");
				}	
				else{
					$("#"+divid+" span").text(string.subString(selectedTexts, 8, '...'));
				}
				//$("#"+divid+"More").hide();
				//$("#"+divid).removeClass("f_select_on");
                
                
                //-------------------------------
				
				
			});
			 $("#"+divid+"savedis").unbind("click").click(function () {
             	$('#'+divid+'Open input[type="checkbox"].flat-grey').iCheck('check');
             });
             //反选
             $("#"+divid+"canceldis").unbind("click").click(function () {
             	$('#'+divid+'Open input[type="checkbox"].flat-grey').iCheck('uncheck');
             });
			$("#"+divid+"Open a").unbind("click").click(function (e) { 
                e = window.event || e;
                var srcElement = e.srcElement || e.target;
               
                if (srcElement.tagName != 'INPUT') {
                	
                    if ($(this).find('input')[0].checked){
                        $(this).find('input').removeAttr('checked');
                    }
                    else{
                        $(this).find('input').attr('checked', 'checked');
                    }
                }
                
                
               
                
                
                
            });
			
			 
			$("#"+divid).unbind("click").click(function () {
	               // hiidenObjs.hide(this);
	                $(this).addClass("f_select_on");
	                $("#"+divid+"More").show();
	        });
			
			
			/*$("#"+divid+"savedis").unbind("click").click(function() {
				var objs = $("#"+divid+"Open").find("input[type=checkbox]:checked");
				var selectedValuesArr = [];
				var selectedTextsArr = [];
				$.each(objs, function(k, v) {
					selectedValuesArr.push(this.value);
					selectedTextsArr.push($(this).parent().next().text());
				})
				var selectedValues = selectedValuesArr.join(",");
				var selectedTexts = selectedTextsArr.join(",");
			
				if (selectedValues != "") {
					this.selectValues = selectedValues;
				} else {
					this.selectValues = "";
				}
				
				if(divid=='area'){
					var plateUrl = "bsctl/getPlate/"+$('#cityNO').val()+"/X?area="+this.selectValues;
					loadingSelectData("plate", plateUrl);
				}
				
				$('#'+divid+"_value").val(selectedValues);//赋值给隐藏于，域
				
				$("#"+divid+" span").attr("title", selectedTexts);
			
				if (selectedTexts == ""){
					$("#"+divid+" span").text("请选择");
				}	
				else{
					$("#"+divid+" span").text(string.subString(selectedTexts, 8, '...'));
				}
				$("#"+divid+"More").hide();
				$("#"+divid).removeClass("f_select_on");
				
			});
			
			
			
			$("#"+divid+"canceldis").unbind("click").click(
					function() {
						$("#"+divid+"More").hide();
						$("#"+divid).removeClass("f_select_on");
			});*/
	        
		}
		
};






