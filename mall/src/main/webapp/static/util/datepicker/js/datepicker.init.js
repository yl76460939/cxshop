	
$(function () {
})

var initTime = {
    time: '',
    timecycle:'',
    backstartdate: "",
    backenddate: "",
    isFirst: false,
    init: function () {
        initTime.get();
    },
    checkDate: function () {
        search.isChecked = true;
        var year1 = search.startdate.substr(0, 4);
        var year2 = search.enddate.substr(0, 4);
        var month1 = search.startdate.substr(5, 2);
        var month2 = search.enddate.substr(5, 2);
        var day1 = search.startdate.substr(8, 2);
        var day2 = search.enddate.substr(8, 2);

        temp1 = year1 + "/" + month1 + "/" + day1;
        temp2 = year2 + "/" + month2 + "/" + day2;

        var dateaa = new Date(temp1);
        var datebb = new Date(temp2);
        var date = datebb.getTime() - dateaa.getTime();
        var time = Math.floor(date / (1000 * 60 * 60 * 24));

        var len = (year2 - year1) * 12 + (month2 - month1) + 1;
        if (search.timeCycle == "2" && len > 48) {
            messagePrompt("最多可选择48个月！");
            search.isChecked = false;
        } else if (search.timeCycle == "1" && time > 210) {
            //messagePrompt("最多可选择30个周！");
            search.isChecked = false;
        }
    },
    get: function (divId,args,selDayTime,selWeekTime) {
        var me = this;
        args = args ? args : 
        	[{ cycle: 'week', startTime: selWeekTime.start, endTime: selWeekTime.end }, { cycle: 'month' }, { cycle: 'season' }, { cycle: 'year' }, { cycle: 'day', text: '日期选择', isDefault: true, startTime: selDayTime.start, endTime: selDayTime.end } ];
        var callBack = {
            //周期切换回调方法 返回周期类型  不需要回调则不定义
            cycleClickCallback: function (cycle) {
                //周期类别
                var timecycle = cycle;
                if (timecycle == "day") {
                    search.timeCycle = 0;
                }
                else if (timecycle == "week") {
                    search.timeCycle = 1;
                }
                else if (timecycle == "month"){
                    search.timeCycle = 2;
                }
                else if (timecycle == "season"){
                    search.timeCycle = 3;
                }
                else if (timecycle == "year") {
                    search.timeCycle = 4;
                }
            },
            //开始时间选择后回调方法 返回时间   不需要回调则不定义
            startTimeClickCallback: function (time1, time2) {
                search.startdate = time2;
                me.backstartdate = time2;
                var starttime = new Date(search.startdate.replace(/-/g, "/"));
                var endtime = new Date(me.backenddate.replace(/-/g, "/"));
                if (starttime > endtime) {
                    search.startdate = endtime.format("yyyy-MM-dd");
                    search.enddate = starttime.format("yyyy-MM-dd");
                } else {
                    search.startdate = starttime.format("yyyy-MM-dd");
                    search.enddate = endtime.format("yyyy-MM-dd");
                }
                initTime.checkDate();
            },
            //结束时间选择后回调方法 返回时间   不需要回调则不定义
            endTimeClickCallback: function (time1, time2) {
                search.enddate = time2;
                me.backenddate = time2;
                var starttime = new Date(me.backstartdate.replace(/-/g, "/"));
                var endtime = new Date(search.enddate.replace(/-/g, "/"));
                if (starttime > endtime) {
                    search.startdate = endtime.format("yyyy-MM-dd");
                    search.enddate = starttime.format("yyyy-MM-dd");
                } else {
                    search.startdate = starttime.format("yyyy-MM-dd");
                    search.enddate = endtime.format("yyyy-MM-dd");
                }
                initTime.checkDate();
            }
        }
        //callBack：回调方法 
        //args:传入需要显示的周期  
        //都为string类型则默认第一个选中，设置{ cycle: 'week', isDefault: true }则周度选中 
        //如果设置默认选中存在多个则取第一个
      // me.time = new timeCycle(divId, callBack, args);
    }
}




var search = {
	iDataType: '0',
	selDayTime: {},
	selWeekTime: {},
    //获得某季度起始时间
    getSeasonTime: function (season) {
        //月份从0-11  
        if (season == "一") {
            return "01|03";
        }
        if (season == "二") {
            return "04|06";
        }
        if (season == "三") {
            return "07|09";
        }
        if (season == "四") {
            return "10|12";
        }
    }
}
