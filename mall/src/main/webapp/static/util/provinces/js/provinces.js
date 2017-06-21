document.body.onclick = function (e) {
		    e = window.event || e;
		    var srcElement = e.srcElement || e.target;
		    var optionsDiv = ["DistrictSelMore"];
		    var showCount = 0;
		    var showObj = "DistrictSelMore";
		    $.each(optionsDiv, function (i, j) {
		        if ($("#" + j).css("display") != "none") {
		            showCount++;
		            showObj = j;
		        }
		    })
		    if (showCount > 0) {
		        while (srcElement.nodeName.toLowerCase() != "a" && srcElement.nodeName.toLowerCase() != "div" && srcElement.nodeName.toLowerCase() != "html" && srcElement.nodeName.toLowerCase() != "body") {
		            srcElement = srcElement.parentNode;
		        }
		     
		        if (showObj.length > 0) {
		            showObj = showObj.substring(0, (showObj.length - 4))
		            if (srcElement.id !='savedis' && srcElement.id !='canceldis' &&
		            		srcElement != document.getElementById(showObj + "Open") && srcElement != document.getElementById(showObj)) {
		                $('#' + showObj + "More").hide();
		                $("#" + showObj).parent().removeClass('f_select_on');
		                $("#" + showObj).removeClass('f_select_on');
		            }
		        }
		    }
		}
		
		var CityAndDis = {
		    regionID: '',
		    province: '',
		    city: '',
		    district: '',
		    init: function () {
		        var me = this;
		        var cityArr = [{ name: '选择城市', value: "" }];
		        me.ImitateSelect({
		            textObj: 'citySel', contentObj: 'citySelOpen', data: cityArr, textColumn: 'name', valueColumn: 'value',
		            callback: function (info) {
		                me.city = info.value;
		            }
		        });
		    },
		    bindProvince: function (data,defaultKey,defaultValue) {
		    	if(typeof provincelist === 'string'){
		    		return;
		    	}
		        var me = this;
		        var _provincelist = new Array();
		        if (typeof data == "undefined") {
		            _provincelist = provincelist;
		        } else {
		        	if(defaultKey){
		        		_provincelist.push({ name: defaultKey, value: defaultValue });
		        	}else{
		        		_provincelist.push({ name: '选择省份', value: '' });
		        	}
		        	
					for(prov in data){
						var provObj = new Object();
						provObj.name = data[prov].name;
						provObj.value = data[prov].value;
						_provincelist.push(provObj);
		        	}
		        }
		        if (_provincelist != null) {
		            $("#provinceSelOpen").empty();
		            me.ImitateSelect({
		                textObj: 'provinceSel', contentObj: 'provinceSelOpen', data: _provincelist, textColumn: 'name', valueColumn: 'value',
		                callback: function (info) {
		                    me.province = info.value;
		                    $("#citySel span").text("选择城市");
		                    $("#DistrictSel span").text("选择区县");
		                    $("#DistrictSel").unbind("click");
		                    me.city = "";
		                    me.district = "";
		                    me.GetCity(info.value);
		                }
		            });
		            if (me.province != "") {
		                me.GetCity(me.province);
		            }
		        }
		    },
		    GetCity: function (pCode) {
		        var me = this;
		        var cityhtml = $("#citySel span").text();
		        $("#citySel span").text("选择城市");
		        var cityArr = new Array();
		        cityArr.push({ name: '选择城市', value: '' });
		        if (pCode != "") {
		        		var data = citylist[pCode];
		        		$.each(data,function(k,v){
		        			var obj = new Object();
	                        obj.name = v.name;
	                        obj.value = v.value;
	                        cityArr.push(obj);
		        		})
		                if (data != null) {
		                    me.ImitateSelect({
		                        textObj: 'citySel', contentObj: 'citySelOpen', data: cityArr, textColumn: 'name', valueColumn: 'value',
		                        callback: function (info) {
		                            me.city = info.value;
		                            me.GetDistrict(info.value);
		                        }
		                    });
		                    if (cityhtml != "选择城市") {
		                        /*$("#citySel span").text(cityhtml);
		                        var cityCode = data.where({ value: cityhtml, column: 'sCity' });
		                        me.GetDistrict(cityCode[0].sCode);*/
		                    }
		                }
		        } else {
		            me.ImitateSelect({
		                textObj: 'citySel', contentObj: 'citySelOpen', data: cityArr, textColumn: 'name', valueColumn: 'value',
		                callback: function (info) {
		                    me.city = info.value;
		                    me.GetDistrict(info.value);
		                }
		            });
		        }
		       
		    },
		    GetDistrict: function (cityCode) {
		    	var defaultVal = cityCode ? '全部区县' : '选择区县';
		        $("#DistrictSel span").text(defaultVal);
		        var me = this;
		        me.district = "";
		        if (cityCode != "") {
		        	var data = countylist[cityCode];
                    me.districrJson = data;
                    $("#DistrictSelMore").empty();
                    var disStr = '<div class="icon_caret02" style=" left:3%;"></div>';
                    disStr += '<div class="overh" id="DistrictSelOpen">';
                    var dataSel = data;
                    
                    $.each(dataSel, function (i, j) {
                        disStr += '<a class="f_optionbox clearfix p08" href="javascript:"><span class="sel_text fl" style="width:100%"><input name="" type="checkbox" id="' + j.value + i + '" value="' + j.value + '" class="form_check flat-grey"  /><label style="width:80%;height:100%;" for="' + j.value + i + '" value="' + j.value + '" class="simple-label">' + j.name + '</label></span></a>';
                    })
                    
                    disStr += '</div><div class="butbox butbox_bg"><a href="javascript:" class="but_confirm" id="savedis">全选</a><a href="javascript:" class="but_cancel ml10" id="canceldis">反选</a></div>';
                    $("#DistrictSelMore").html(disStr);
                    
                    $('#DistrictSelOpen input[type="checkbox"].flat-grey')
                    .iCheck({
        				checkboxClass : 'icheckbox_minimal-blue',
        			}).on('ifChanged', function(event){//
                        var objs = $("#DistrictSelOpen").find("input[type=checkbox]:checked");
                        var selectedValuesArr = [];
                        var selectedTextsArr = [];
                        $.each(objs,function(k,v){
                        	selectedValuesArr.push(this.value);
                        	selectedTextsArr.push($(this).parent().next().text());
                        })
                        var selectedValues = selectedValuesArr.join(",");
                        var selectedTexts = selectedTextsArr.join(",");
                        if (selectedValues != "") {
                            me.district = selectedValues;
                        }
                        else {
                            me.district = "";
                        }
                        $("#DistrictSel span").attr("title", selectedTexts);
                        if (selectedTexts == "")
                            $("#DistrictSel span").text("全部区县");
                        else
                            $("#DistrictSel span").text(string.subString(selectedTexts, 8, '...'));
                	});;
                    
                    $("#DistrictSel").unbind("click").click(function () {
                        $(this).addClass("f_select_on");
                        $("#DistrictSelMore").show();
                    })
                    //全部
                    $("#savedis").unbind("click").click(function () {
                    	$('#DistrictSelOpen input[type="checkbox"].flat-grey').iCheck('check');
                    });
                    //反选
                    $("#canceldis").unbind("click").click(function () {
                    	$('#DistrictSelOpen input[type="checkbox"].flat-grey').iCheck('uncheck');
                    });
		        } else {
		            $("#DistrictSelMore").empty();
		            var disStr = '<div class="icon_caret02" style=" left:3%;"></div>';
		            disStr += '<div class="overh" id="DistrictSelOpen">';
		            disStr += '<a class="f_optionbox clearfix p08" href="javascript:"><span class="sel_text fl"><span style="vertical-align: middle;"> 全部区县</span></span></a>';
		            disStr += '</div>';
		            
		            $("#DistrictSelMore").html(disStr);
		            
		            $("#DistrictSelOpen a").unbind("click").click(function (e) {
		                e = window.event || e;
		                var srcElement = e.srcElement || e.target;
		                if (srcElement.tagName != 'INPUT') {
		                    if ($(this).find('input')[0].checked)
		                        $(this).find('input').removeAttr('checked')
		                    else
		                        $(this).find('input').attr('checked', 'checked');
		                }
		            });
		            
		            $("#DistrictSel").unbind("click").click(function () {
		            	
		                hiidenObjs.hide(this);
		                $(this).addClass("f_select_on");
		                $("#DistrictSelMore").show();
		            })
		            me.city = "";
		        }
		        
		    },
		    ImitateSelect: function (paramter) {
		        var me = this;
		        me.textObj = paramter.textObj;
		        me.contentObj = paramter.contentObj;
		        me.data = paramter.data;
		        me.text = paramter.text;
		        me.textColumn = paramter.textColumn;
		        me.valueColumn = paramter.valueColumn;
		        me.callback = paramter.callback;

		        var to = typeof (me.textObj) == 'string' ? $('#' + me.textObj) : me.textObj;
		        var co = typeof (me.contentObj) == 'string' ? $('#' + me.contentObj) : me.contentObj;


		        var _index = 0;
		        (function (_co) {
		            var str = '<div class="icon_caret02" style=" left:3%;"></div><div class="chbh " >';
		            $.each(me.data, function (i, j) {
		                if (j.isChecked) _index = i;
		                str += '<a href="javascript:" class="f_optionbox clearfix p08" tvalue="' + (typeof (j) == 'string' ? j : j[me.valueColumn]) + '">' + (typeof (j) == 'string' ? j : j[me.textColumn]) + '</a>';
		            });
		            str += '</div>';
		            _co.html(str);
		        })(co);

		        //event
		        (function (_co, _to, callback) {
		            _to.unbind('click').click(function () {
		                _co.fadeIn('normal');
		                _to.addClass('f_select_on');
		                _co.find('a').unbind('click').click(function () {
		                    var v = $(this).attr('tvalue');
		                    var t = $(this).text();
		                    var f = typeof (_to.find('span')) == 'undefined' ? _to : _to.find('span');
		                    f.text((typeof me.text == 'undefined' || me.text == '') ? t : me.text + '：' + t);
		                    _co.hide();
		                    _to.removeClass('f_select_on');
		                    callback({ value: v, text: t });
		                });
		            });
		        })(co, to, me.callback);

		        $.documentClick(to, co);
		    }
		}