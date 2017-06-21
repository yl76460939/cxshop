/*
	datepicker 年月日季度周 
*/
//外联js
1.jquery.js
2.<script src="<%=basepath%>static/util/datepicker/js/datepicker.main.js"></script>
3.<script src="<%=basepath%>static/util/datepicker/js/WdatePicker.js"></script>

//css
<link rel="stylesheet" href="<%=basepath%>static/util/datepicker/css/datepicker.css" />

//初始化
var timectrlId = 'divtime'; //容器ID

//回调 支持start和end时间点击回调 没有传空串 不要null
var callback = {
            //周期切换回调方法 返回周期类型  不需要回调则不定义
            cycleClickCallback: function (cycle) {
            },
            //开始时间选择后回调方法 返回时间   不需要回调则不定义
            startTimeClickCallback: function (time1, time2) {  
            },
            //结束时间选择后回调方法 返回时间   不需要回调则不定义
            endTimeClickCallback: function (time1, time2) {    
            }
        };
        
/**
  需要定义几个时间类型就写几个 starttime和endtime为时间默认值
  text 为显示的文字, isDefault 初始化时显示默认显示的类型
  */
var arguments = [{ cycle: 'week', startTime: '2001-01-01', endTime: '2001-12-01' },
            { cycle: 'month' , startTime: '2010-01-01',endTime: '2010-12-07'},
            { cycle: 'season' , startTime: '2011-01-01',endTime: '2011-12-07'},
            { cycle: 'year' , startTime: '2012-01-01',endTime: '2012-12-07'}, 
            { cycle: 'day', text: '日期选择', isDefault: true, startTime: '2013-01-01', endTime: '2013-12-01' } ];
var timectrl = new timeCycle(timectrlId, '', arguments);

timectrl.start;//返回开始时间 时间格式为 eg：2015-11-25
timectrl.startText;//返回显示的text eg：2015年第一季度
timectrl.end;//结束时间
timectrl.endText;//结束text
timectrl.cycle;//返回类型 week  month  season  year  day



/**
    面包屑 参考 landSupplyDetails.jsp
    */
<%-- 加载统一的bread-crumb --%>
<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
	
var crumb = [{
				text:'土地',
				href:''
			  },
	          {
	          	text:'土地供应统计查询',
	          	href:'views/land/landSupplyStatistics.jsp'
	           }];
	initbreadcrumb(crumb);










