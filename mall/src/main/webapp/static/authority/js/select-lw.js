var _ssq_ = {};
$(function(){
		$('body').on('click','.select-lw', function(e){
			$(".select-lw").removeClass('open');
			var ul = $(this).find("ul");
			var mainDiv = $(this).find("div.main-lw");
			// 定位 top + 上边框
			var _top = mainDiv.position().top;
			var _left = mainDiv.position().left;
			var _height = mainDiv.height();
			
			ul.css({"top": (_top+_height+1)+"px"
				,"left": _left+"px"})
			$(this).toggleClass('open');
			e.stopPropagation();
		});
		
		// 单选
		$('body').on('click', '.select-lw ul li.s',function(e){
			var _this = $(this);
			// 设置 value 和 title
			var contentDiv = _this.parent().prev("div");
			var curValue = _this.attr('data-value');
			var curText = _this.text().replace("<i></i>","");
			_this.parent().parent().find("input[type='hidden']").val(curValue);
			contentDiv.text(curText);
			contentDiv.attr("data-value",curValue);
			contentDiv.attr("title",curValue);
			_this.addClass('selected').siblings().removeClass('selected');
			$('.select-lw').removeClass('open');
			// 回调
			var afterFun = _this.parent().parent().attr("data-function");
			if(afterFun){
				var callbackParam = {};
				callbackParam.parentId = _this.parent().parent().parent().attr("id");
				callbackParam.value = curValue;
				callbackParam.text = curText;
				eval(afterFun+"('"+JSON.stringify(callbackParam)+"')");
			}
			e.stopPropagation();
		});
		
		// 多选 中没选择的li
		$('body').on('click', '.select-lw ul li.m:not(.selected)',function(e){
			var _this = $(this);
			var curValue = _this.attr('data-value');
			if(curValue === "全部"){
				_this.siblings("li:not(.selected)").click();
				_this.addClass('selected');
				return;
			}
			_this.addClass('selected');
			var curText = _this.text().replace("<i></i>","");
			// 获取当前控件的value[]
			var valuesEle = _this.parent().siblings("input[type='hidden']");
			var values = valuesEle.val();
			var valuearray = values ? values.split(",") : [];
			var index = $.inArray(curValue,valuearray);
			
			// 不在已选中的数组中 添加
			if(index == -1){
				// 处理值
				valuearray.push(curValue);
				valuesEle.val(valuearray.join(","));
				// 处理显示text 和 title
				var contentEle = _this.parent().prev();
				var old = contentEle.text();
				contentEle.text((old ? old+"," : "") +curText);
				contentEle.attr((old ? old+"," : "") +curText);
			}
			
			// $('.select-lw').removeClass('open');
			e.stopPropagation();
		});
		
		// 多选 中已选中的li
		$('body').on('click', '.select-lw ul li.m.selected',function(e){
			var _this = $(this);
			_this.removeClass('selected');
			var curValue = _this.attr('data-value');
			var contentEle = _this.parent().prev();
			// 获取当前控件的value[]
			var valuesEle = _this.parent().siblings("input[type='hidden']");
			if(curValue === "全部"){
				_this.siblings().removeClass('selected');
				contentEle.text('').attr("title",'');
				valuesEle.val('');
				return;
			}
			// 如果全部按钮已被选中则去掉selected
			_this.siblings("li[data-value='全部']").removeClass("selected");
			var curValue = _this.attr('data-value');
			var curText = _this.text().replace("<i></i>","");
			
			var values = valuesEle.val();
			var valuearray = values ? values.split(",") : [];
			var index = $.inArray(curValue,valuearray);
			var arraySize = valuearray.length;
			// 不在已选中的数组中 添加
			if(index != -1){
				// 处理值
				valuearray.splice(index,1);
				valuesEle.val(valuearray.join(","));
				// 处理显示text 和 title
				var old = contentEle.text();
				var replaceTxt = curText;
				if(old.indexOf(","+curText)!== -1){
					replaceTxt = ","+curText;
				}else if(old.indexOf(curText+",")!== -1){
					replaceTxt = curText+",";
				}
				var txt =  old.replace(replaceTxt,"");
				contentEle.text(txt).attr("title",txt);
			}
			
			// $('.select-lw').removeClass('open');
			e.stopPropagation();
		});
		
		$(".city-drop-down").click(function(e){
			e.stopPropagation();
		})
		
		$(document).on('click', function(){
			$('.select-lw').removeClass('open');
		});
		
	});

	/**
	 * 
	 * @param list 
	 * @param defaultItem
	 * @param type
	 * @param isDef
	 */
	function adjustSelectBysHtm(config){
		var type = config.multiple ? 'm' : 's';
		var list = config.list;
		if(typeof list == 'undefined'){
			throw new Error("adjustSelectBysHtm.list is undefined");
			return;
		}
		
		// var htm = '<div class="content-lw input-sm">';
		var htm = '<div class="select-lw"';
		// 选择完后的回调函数名称
		if(config.chooseAfterFun){
			htm += ' data-function="'+config.chooseAfterFun+'"';
		}
		htm += '><input type="hidden" ';
		if(config.hideInputName){
			htm += 'name="'+config.hideInputName+'"';
		}
		
		htm += ' value="';
		// 默认值
		if(config.defChooseVal){
			htm += config.defChooseVal.value;
		}else if(!config.defChooseVal && config.chooseFirst){
			htm += list[0].value;
		}else if(!config.defChooseVal && config.chooseAll && config.needAll){
			var argsArr = [];
			for (var int = 0; int < list.length; int++) {
				argsArr.push(list[int].value);
			}
			htm += argsArr.length >0 ? argsArr.join(",") : "";
		}
		htm += '"><div class="main-lw">';
		// 默认值显示名称
		if(config.defChooseVal){
			htm += config.defChooseVal.name;
		}else if(!config.defChooseVal && config.chooseFirst){
			htm += list[0].name;
		}else if(!config.defChooseVal && config.chooseAll && config.needAll){
			var argsArr = [];
			for (var int = 0; int < list.length; int++) {
				argsArr.push(list[int].name);
			}
			htm += argsArr.length >0 ? argsArr.join(",") : "";
		}
		htm += '</div><ul>';
		if(config.needAll){
			htm += '<li data-value="全部"  class="'+type;
			if(!config.defChooseVal && config.chooseAll){
				htm += ' selected';
			}
			htm += '"><i></i>全部</li>';
		}
		
		var intIndex = 0;
		for(var item in list){
			htm += '<li data-value="'+list[item].value;
			htm += '" class="'+type;
			if(config.defChooseVal && config.defChooseVal.value == list[item].value){
				htm += ' selected';
			}else if(!config.defChooseVal && config.chooseFirst && intIndex === 0){
				htm += ' selected';
			}else if(!config.defChooseVal && config.chooseAll && config.needAll){
				htm += ' selected';
			}
			htm += '"><i></i>'+list[item].name+'</li>';
			intIndex ++;
		}
		
		htm += '</ul>';
		htm += '</div>';
		return htm;
	}
	
