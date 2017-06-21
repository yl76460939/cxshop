var OnpickedCallBack = {
    start: function (dp, me) {
        var tArr = dp.cal.getDateStr().split('-');
        var date = new Date(tArr[0], parseInt(tArr[1])-1, tArr[2]);
        var time = this.timeShow(date, $('#' + me.container + ' span[emt=spanTimeCycleStart]'), me);

        $('#' + me.container + ' input[class=hiddenTimeCycleStart]').val(time.start.format('yyyy-MM-dd'));
        me.start = time.start.format('yyyy-MM-dd');
        me.startText = time.timeStr;
        if (typeof me._startTimeClickCallback == 'function') me._startTimeClickCallback(dp.cal.getDateStr(), me.start);
    },
    end: function (dp, me) {
        var tArr = dp.cal.getDateStr().split('-');
        var date = new Date(tArr[0], parseInt(tArr[1]) - 1, tArr[2]);
        
        var time = this.timeShow(date, $('#' + me.container + ' span[emt=spanTimeCycleEnd]'), me);
        
        $('#' + me.container + ' input[class=hiddenTimeCycleEnd]').val(time.end.format('yyyy-MM-dd'));
        me.end = time.end.format('yyyy-MM-dd');
        me.endText = time.timeStr;
        if (typeof me._endTimeClickCallback == 'function') me._endTimeClickCallback(dp.cal.getDateStr(), me.end);
    },
    //显示选中的时间指标
    timeShow: function (date, showBox, me) {
        var cycle = me.cycle;
        var time = null;
        switch (cycle) {
            case 'day'://日度
                time = { start: date, end: date };
                var timeStr = string.format('{0}年{1}月{2}日', date.getFullYear(), time.start.getMonth() + 1, time.start.getDate());
                time.timeStr = timeStr;
                break;
            case 'week'://周度
                var timeArr = OnpickedCallBack.getCurrentWeekStartEnd(date);
                var w = OnpickedCallBack.getYearWeek(date.getFullYear(), date.getMonth() + 1, date.getDate());
                time = { start: timeArr[0], end: timeArr[1]};
                var timeStr = string.format('{0}年第{1}周{2}'
                    , date.getFullYear(), w,
                    me.set.isShowDetailDate == false ? '' : string.format('({0}月{1}日--{2}月{3}日)', time.start.getMonth() + 1, time.start.getDate(), time.end.getMonth() + 1, time.end.getDate())
                    );
                time.timeStr = string.format('{0}年第{1}周', date.getFullYear(), w);
                time.weekNum = w;
                break;
            case 'month'://月度
                
                var lastDay = this.getMonthDays(date.getFullYear(), date.getMonth() + 1);
                time = { start: new Date(date.getFullYear(), date.getMonth(), 1), end: new Date(date.getFullYear(), date.getMonth(), lastDay) }
                var timeStr = string.format('{0}年{1}月{2}', date.getFullYear(), time.start.getMonth() + 1,
                    me.set.isShowDetailDate == false ? '' : string.format('({0}月{1}日--{2}月{3}日)', time.start.getMonth() + 1, time.start.getDate(), time.end.getMonth() + 1, time.end.getDate())
                    );
                time.timeStr = string.format('{0}年{1}月', date.getFullYear(), time.start.getMonth() + 1);
                break;
            case 'season'://季度
                var q = OnpickedCallBack.getCurrentSeason(date);
                var timeArr = OnpickedCallBack.getCurrentSeasonStartEnd(date);
                time = { start: timeArr[0], end: timeArr[1]};
                var timeStr = string.format('{0}年第{1}季度{2}', date.getFullYear(), q,
                    me.set.isShowDetailDate == false ? '' : string.format('({0}月{1}日--{2}月{3}日)', time.start.getMonth() + 1, time.start.getDate(), time.end.getMonth() + 1, time.end.getDate())
                    );
                time.timeStr = string.format('{0}年第{1}季度', date.getFullYear(), q);
                break;
            case 'year'://年度
                time = { start: new Date(date.getFullYear(), 0, 1), end: new Date(date.getFullYear(), 11, 31) };
                var timeStr = string.format('{0}年{1}', date.getFullYear(),
                    me.set.isShowDetailDate == false ? '' : string.format('({0}月{1}日--{2}月{3}日)', time.start.getMonth() + 1, time.start.getDate(), time.end.getMonth() + 1, time.end.getDate())
                    );
                time.timeStr = string.format('{0}年', date.getFullYear());
                break;
        }
        if (showBox!=null) showBox.text(timeStr);
        return time;
    },//获取当前日期所在年份的第几周
    getYearWeek: function (a, b, c) {
        var d1 = new Date(a, b - 1, c), d2 = new Date(a, 0, 1),
        d = Math.round((d1 - d2) / 86400000);
        return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
    },
    //获取当前日期所在周度的起止日期
    getCurrentWeekStartEnd: function (date) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = date;
        //返回date是一周中的某一天  
        var week = currentDate.getDay();
        //返回date是一个月中的某一天  
        var month = currentDate.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);  
        //本周 周一  
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日  
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间  
        startStop.push(monday);//本周起始时间  
        //添加本周最后一天时间  
        startStop.push(sunday);//本周终止时间  
        //返回  
        return startStop;
    },
    //获取当前日期所在季度的起止日期
    getCurrentSeasonStartEnd: function (date) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = date;
        //获得当前月份1-12  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份  
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份  

        //获得本季度开始的日期  
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期

        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;
        var lastDay = this.getMonthDays(currentYear, quarterSeasonEndMonth + 1);
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, lastDay);
        //加入数组返回  
        startStop.push(quarterSeasonStartDate);
        startStop.push(quarterSeasonEndDate);
        //返回  
        return startStop;
    },
    //获取季度数
    getCurrentSeason: function (date) {
        var month = date.getMonth();
        var spring = '一'; //春  
        var summer = '二'; //夏  
        var fall = '三';   //秋  
        var winter = '四';//冬  
        //月份从0-11  
        if (month <3) {
            return spring;
        }
        if (month <6) {
            return summer;
        }

        if (month <9) {
            return fall;
        }
        return winter;
    }
    ,//获取当前季度起始月份
    getQuarterSeasonStartMonth: function (month) {
        var spring = 0; //春  
        var summer = 3; //夏  
        var fall = 6;   //秋  
        var winter = 9;//冬  
        //月份从0-11  
        if (month <3) {
            return spring;
        }
        if (month <6) {
            return summer;
        }

        if (month <9) {
            return fall;
        }

        return winter;
    }
    ,//获取本月度最后
    getMonthDays: function (year, month) {
        var new_year = year;    //取当前的年份  
        var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）  
        if (month > 12)            //如果当前大于12月，则年份转到下一年  
        {
            new_month -= 12;        //月份减  
            new_year++;            //年份增  
        }
        var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天  
        var t = (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
        return t;//获取当月最后一天日期
    }
}




/*container Div容器ID
args: 需要显示的周期
var args = ['all','day', { cycle: 'week',text:'按天', isDefault: true,startTime:'2014-01-01',endTime:'2014-10-31' }
                      , { cycle: 'month',startTime:'2014-01-01',endTime:'2014-10-31',min:'2014-01-01',max:'2014-12-31' } , 'season', 'year'];
        args:传入需要显示的周期   
        都为string类型则默认第一个选中，设置{ cycle: 'week', isDefault: true }则周度选中  
        如果设置默认选中存在多个则取第一个
set：需要配置的参数 {isShowDetailDate:'是否显示后面的具体日期//默认为隐藏',width:'宽度',startTime:'2014-01-01',endTime:'2014-10-31'} 
    注:这儿的startTime 和endTime 只第一次默认加载的时候呈现，再切换周期的时候则失效
*/
function timeCycle(container, callBack, args, set) {
    var me = this;
    if (typeof callBack == 'object') {
        //周期切换回调方法 返回周期类型
        me._cycleClickCallback = callBack.cycleClickCallback;
        //开始时间选择后回调方法 返回时间
        me._startTimeClickCallback = callBack.startTimeClickCallback;
        //结束时间选择后回调方法 返回时间
        me._endTimeClickCallback = callBack.endTimeClickCallback;
    }
    me.set = {}
    if (typeof set == 'object') {
        if (typeof set.isShowDetailDate != 'undefined') me.set.isShowDetailDate = set.isShowDetailDate;
        else me.set.isShowDetailDate = false;
        if (typeof set.width != 'undefined') me.set.width = set.width;
        if (typeof set.startTime != 'undefined') me.set.startTime = set.startTime;
        if (typeof set.endTime != 'undefined') me.set.endTime = set.endTime;
    } else me.set.isShowDetailDate = false; 
    me.container = container;
    //生成需要的HTML
    (function () {
        var _s = '<ul class="s_tab">';
        if (typeof args == 'undefined' || typeof args != 'object' || args.length == 0) {
            _s += '<li><a href="javascript:" cycle="day" class="timecycle">按天</a></li>';
            me.set.day = { min: '1900-01-01', max: '2999-12-31' }
            _s += '<li><a href="javascript:" cycle="week" class="timecycle">按周</a></li>'
            me.set.week = { min: '1900-01-01', max: '2999-12-31' }
            _s += '<li><a href="javascript:" cycle="month" class="timecycle">按月</a></li>'
            me.set.month = { min: '1900-01-01', max: '2999-12-31' }
            _s += '<li><a href="javascript:" cycle="season" class="timecycle">按季</a></li>'
            me.set.season = { min: '1900-01-01', max: '2999-12-31' }
            _s += '<li><a href="javascript:" cycle="year" class="timecycle">按年</a></li>'
            me.set.year = { min: '1900-01-01', max: '2999-12-31' }

        } else {
            var menutexts = { all: '不限', day: '按天', week: '按周', month: '按月', season: '按季', year: '按年' };
            $.each(args, function (i, j) {
                var _cycle = j;
                var menutext = '';
                if (typeof j == 'object') {
                    _cycle = j.cycle;
                    if (j.isDefault) me.cycle = _cycle;
                    me.set[_cycle] = {}
                    if (typeof j.startTime != 'undefined' && j.startTime != '') me.set[_cycle].startTime = j.startTime;
                    if (typeof j.endTime != 'undefined' && j.endTime != '') me.set[_cycle].endTime = j.endTime;
                    if (typeof j.text != 'undefined') menutext = j.text;
                } else me.set[_cycle] = {}

                if (!menutext) menutext = menutexts[_cycle];

                if (typeof j.min != 'undefined' && j.min != '') me.set[_cycle].min = j.min;
                else me.set[_cycle].min = '1900-01-01';
                if (typeof j.max != 'undefined' && j.max != '') me.set[_cycle].max = j.max;
                else me.set[_cycle].max = '2999-12-31';

                switch (_cycle) {
                    case 'all':
                        _s += '<li><a href="javascript:" cycle="all" class="timecycle">' + menutext + '</a></li>';
                        break;
                    case 'day':
                        _s += '<li><a href="javascript:" cycle="day" class="timecycle">' + menutext + '</a></li>';
                        break;
                    case 'week':
                        _s += '<li><a href="javascript:" cycle="week" class="timecycle">' + menutext + '</a></li>'
                        break;
                    case 'month':
                        _s += '<li><a href="javascript:" cycle="month" class="timecycle">' + menutext + '</a></li>'
                        break;
                    case 'season':
                        _s += '<li><a href="javascript:" cycle="season" class="timecycle">' + menutext + '</a></li>'
                        break;
                    case 'year':
                        _s += '<li><a href="javascript:" cycle="year" class="timecycle">' + menutext + '</a></li>'
                        break;
                }
            });
        }
        var width = '170px';
        if (typeof me.set.width != 'undefined') width = me.set.width;
        _s += '</ul>';
        _s += '<div class="base_timeCycle_timechange"><div style="width:' + width + ';position:relative;" class="form_select form_data ml10 fl clearfix" emt="timeCycleStart"><span class="fdata_text" emt="spanTimeCycleStart"></span><input type="hidden" class="hiddenTimeCycleStart" ></div><div class="base-timeCycle-timechange-start" style="display:none;position:absolute; *position:none;top:-2px;z-index:9999;"></div>';
        _s += '<span class="fl" style="text-align:center; line-height:28px;margin:0 5px;">至</span>';
        _s += '<div style="width:' + width + ';position:relative;" class="form_select form_data fl clearfix" emt="timeCycleEnd"><span class="fdata_text" emt="spanTimeCycleEnd"></span><input type="hidden" class="hiddenTimeCycleEnd"></div><div class="base-timeCycle-timechange-end" style="display:none;position:absolute;top:-2px;z-index:9999;"></div></div>';
        $('#' + me.container).html(_s).css('z-index','99999');
    })();

    

    if (typeof timeCycle._initialized == 'undefined') {
        //获取开始时间
        timeCycle.prototype.getStart = function () {
            return this.start;
        };
        timeCycle.prototype.getStartText = function () {
            return this.startText;
        };
        //获取结束时间
        timeCycle.prototype.getEnd = function () {
            //me.end = $('#' + this.container + ' input[name=hiddenTimeCycleEnd]').val();
            return this.end;
        };
        timeCycle.prototype.getEndText = function () {
            //me.end = $('#' + this.container + ' input[name=hiddenTimeCycleEnd]').val();
            return this.endText;
        };
        //获取周期类别
        timeCycle.prototype.getCycleType = function () {
            return this.cycle;
        }
        //隐藏周期
        timeCycle.prototype.hideCycleChange = function () {
            $('#' + this.container).find('ul').remove();
        };
        //隐藏时间
        timeCycle.prototype.hideTimeChange = function () {
            $('#' + this.container).find('.base_timeCycle_timechange').hide();
        }
        //隐藏时间
        timeCycle.prototype.showTimeChange = function () {
            $('#' + this.container).find('.base_timeCycle_timechange').show();
        };
        timeCycle._initialized = true;
    }
    //周期切换
    (function () {
        $('#' + me.container + ' a[class=timecycle]').unbind('click')
        .click(function () {
            var _cycle = $(this).attr('cycle');
            if (typeof _cycle != 'undefined' && (_cycle != me.cycle || typeof me._isload == 'undefined')) {
                if (typeof me._isload == 'undefined') me._isload = true;
                $('#' + me.container + ' a').removeClass('tab_on');
                $(this).addClass('tab_on');
                me.cycle = _cycle;

                //回调方法
                if (typeof me._cycleClickCallback == 'function') me._cycleClickCallback(me.cycle, me);
                //切换周期设置默认值
                (function () {
                    var startBox = $('#' + me.container + ' span[emt=spanTimeCycleStart]');
                    var endBox = $('#' + me.container + ' span[emt=spanTimeCycleEnd]');
                    var hiddenStart = $('#' + me.container + ' input[class=hiddenTimeCycleStart]');
                    var hiddenEnd = $('#' + me.container + ' input[class=hiddenTimeCycleEnd]');

                    var dateNow = me.set[me.cycle].max.toDate() > new Date() ? new Date() : me.set[me.cycle].max.toDate();//当前时间
                    var startDate = new Date();
                    $('#' + this.container).find('.base_timeCycle_timechange').show();
                    var s = 1000 * 60 * 60 * 24;//一天的毫秒数
                    switch (me.cycle) {
                        case 'day': //按日
                            (function () {
                                me.showTimeChange();
                                if (typeof me.set.day.startTime != 'undefined') startDate = me.set.day.startTime.toDate();
                                else {
                                    var _d = 14;//默认显示14天的数据
                                    startDate = new Date(dateNow.getTime() - s * _d);
                                }
                                if (typeof me.set.day.endTime != 'undefined') dateNow = me.set.day.endTime.toDate();

                                if (me.set.day.max.toDate() < dateNow) dateNow = me.set.day.max.toDate();
                                if (me.set.day.min.toDate() > startDate) startDate = me.set.day.min.toDate();
                            })();
                            break;
                        case 'week'://按周
                            (function () {
                                me.showTimeChange();
                                if (typeof me.set.week.endTime != 'undefined') dateNow = me.set.week.endTime.toDate();
                                else dateNow = new Date(dateNow.getTime() - s * 7)

                                if (typeof me.set.week.startTime != 'undefined') startDate = me.set.week.startTime.toDate();
                                else {
                                    var _w = 12;//默认显示12周
                                    startDate = new Date(new Date().getTime() - s * _w * 7);
                                }
                                
                                if (me.set.week.max.toDate() < dateNow) dateNow = me.set.week.max.toDate();
                                if (me.set.week.min.toDate() > startDate) startDate = me.set.week.min.toDate();
                            })();
                            break;
                        case 'month'://按月
                            (function () {
                                me.showTimeChange();
                                var t = { y: dateNow.getFullYear(), m: dateNow.getMonth(), d: dateNow.getDate() };
                                if (t.m > 0) t.m = t.m - 1;
                                else { t.m = 11; t.y = t.y - 1; }
                                dateNow = new Date(t.y, t.m, t.d);
                                var _m = 12;
                                var _ym = parseInt(_m / 12), _my = _m % 12;
                                t.y = t.y - _ym;
                                if (t.m >= _my) t.m = t.m - _my + 1;
                                else { t.m = 11; t.y = t.y - 1; }
                                startDate = new Date(t.y, t.m, t.d);
                                
                                if (typeof me.set.month.startTime != 'undefined') startDate = me.set.month.startTime.toDate();
                                if (typeof me.set.month.endTime != 'undefined') dateNow = me.set.month.endTime.toDate();

                                if (me.set.month.max.toDate() < dateNow) dateNow = me.set.month.max.toDate();
                                if (me.set.month.min.toDate() > startDate) startDate = me.set.month.min.toDate();
                            })();
                            break;
                        case 'season': //按季
                            (function () {
                                me.showTimeChange();
                                var _q = 4;
                                var _m = _q * 3;
                                var startm = OnpickedCallBack.getQuarterSeasonStartMonth(dateNow.getMonth());
                                var t = { y: dateNow.getFullYear(), m: dateNow.getMonth(), d: dateNow.getDate() };
                                //计算上一季度日期
                                if (startm == 0) { t.y = t.y - 1; t.m = 9 }
                                else t.m = t.m - 3;
                                dateNow = new Date(t.y, t.m, t.d);

                                //计算开始季度日期
                                var _ym = parseInt(_m / 12), _my = _m % 12;
                                t.y = t.y - _ym;
                                if (t.m >= _my) t.m = t.m - _my + 3;
                                else { t.m = 11; t.y = t.y - 1; }
                                startDate = new Date(t.y, t.m, t.d);
                                if (typeof me.set.season.startTime != 'undefined') startDate = me.set.season.startTime.toDate();
                                if (typeof me.set.season.endTime != 'undefined') dateNow = me.set.season.endTime.toDate();

                                if (me.set.season.max.toDate() < dateNow) dateNow = me.set.season.max.toDate();
                                if (me.set.season.min.toDate() > startDate) startDate = me.set.season.min.toDate();
                            })();
                            break;
                        case 'year': //按年
                            (function () {
                                me.showTimeChange();
                                var _y = 5;
                                var _year = dateNow.getFullYear();
                                if (_year == new Date().getFullYear())
                                    dateNow = new Date(_year - 1, 11, 31);
                                else
                                    dateNow = new Date(_year, 11, 31);
                                startDate = new Date(_year - _y, 0, 1);

                                if (typeof me.set.year.startTime != 'undefined') startDate = me.set.year.startTime.toDate();
                                if (typeof me.set.year.endTime != 'undefined') dateNow = me.set.year.endTime.toDate();

                                
                                if (me.set.year.max.toDate() < dateNow) dateNow = me.set.year.max.toDate();
                                
                                if (me.set.year.min.toDate() > startDate) startDate = me.set.year.min.toDate();
                            })();
                            break;
                        case 'all':
                            me.hideTimeChange();
                            break;
                    }



                    //判断是否有第一次的默认值
                    if (typeof me._initialized == 'undefined') {
                        me._initialized = true;
                        if (typeof me.set.startTime != 'undefined' && me.set.startTime != '') startDate = me.set.startTime.toDate();
                        if (typeof me.set.endTime != 'undefined' && me.set.endTime != '') dateNow = me.set.endTime.toDate();;
                    }
                    if (me.cycle != 'all') {
                        var startTime = OnpickedCallBack.timeShow(startDate, startBox, me);
                        var endTime = OnpickedCallBack.timeShow(dateNow, endBox, me);

                        me.start = startTime.start.format('yyyy-MM-dd');
                        me.startText = startTime.timeStr;
                        me.end = endTime.end.format('yyyy-MM-dd');
                        me.endText = endTime.timeStr;
                    }
                    else {
                        me.start = '';
                        me.startText = '';
                        me.end = '';
                        me.endText = '';
                    }
                    hiddenStart.val(me.start);
                    hiddenEnd.val(me.end);

                    $t.init(me,startDate, dateNow);

                    //回调
                    if (typeof me._startTimeClickCallback == 'function') me._startTimeClickCallback(me.start, me.start)
                    if (typeof me._endTimeClickCallback == 'function') me._endTimeClickCallback(me.end, me.end)

                })();
            }
            (function () {
                if (_cycle == 'all') {
                    $('#' + me.container + ' div').find('.base_timeCycle_timechange').hide();
                }
                else if (_cycle == 'day') {
                    $('#' + me.container + ' div[emt=timeCycleStart]').unbind('click')
                        .click(function () {

                            WdatePicker(
                                {
                                    firstDayOfWeek: 1
                                    //, skin: 'whyGreen'
                                    , minDate:me.set[_cycle].min
                                    , maxDate: me.set[_cycle].max
                                    , el: $('#' + me.container + ' input[class=hiddenTimeCycleStart]')[0]
                                    , onpicked: function (dp) { OnpickedCallBack.start(dp, me); }
                                });
                        });
                    $('#' + me.container + ' div[emt=timeCycleEnd]').unbind('click')
                        .click(function () {
                            WdatePicker(
                                {
                                    firstDayOfWeek: 1
                                    , minDate: me.set[_cycle].min
                                    , maxDate: me.set[_cycle].max
                                    , el: $('#' + container + ' input[class=hiddenTimeCycleEnd]')[0]
                                    , onpicked: function (dp) { OnpickedCallBack.end(dp, me); }
                                });
                        });
                }
                else {
                    $('#' + me.container + ' div[emt=timeCycleStart]').unbind('click').click(function () {
                        $t.position(me, 'start');
                        $('#' + me.container + ' .base-timeCycle-timechange-start').show();
                    });
                    $('#' + me.container + ' div[emt=timeCycleEnd]').unbind('click').click(function () {
                        $t.position(me, 'end');
                        $('#' + me.container + ' .base-timeCycle-timechange-end').show();
                    });
                    $.documentClick($('#' + me.container + ' div[emt=timeCycleStart]'), $('#' + me.container + ' .base-timeCycle-timechange-start'));
                    $.documentClick($('#' + me.container + ' div[emt=timeCycleEnd]'), $('#' + me.container + ' .base-timeCycle-timechange-end'));
                }
            })();
        });

        if (typeof me.cycle != 'undefined') $('#' + me.container + ' a[cycle=' + me.cycle + ']').click();
        else $('#' + me.container + ' a[class=timecycle]').eq(0).click();
    })();

    
}


    var $t = {
        init: function (temp, start, end) {
            var csy = 0, cey = 0;
            if (temp.cycle == 'week')
            {
                //调整周度
                //var time_ = OnpickedCallBack.timeShow(start, null, temp);
                $t.csy = start.getFullYear();
                $t.cey = end.getFullYear();
            }
            else {
                $t.csy = start.getFullYear();
                $t.cey = end.getFullYear();
            }
            var lastyear = 0, startyear = 0;
            if (start.getFullYear() > 1996) $t.dstart = new Date(1990, 0, 1);
            else $t.dstart = end;
            if (end < new Date()) $t.dend = new Date();
            else $t.dend = end;
            

            if (temp.cycle == 'week') $t.week.init(temp);
            else if (temp.cycle == 'month') $t.month.init(temp);
            else if (temp.cycle == 'season') $t.season.init(temp);
            else if (temp.cycle == 'year') $t.year.init(temp);


            //设置选中
            var _startTime = $('#' + temp.container + ' .hiddenTimeCycleStart').val();
            var _endTime = $('#' + temp.container + ' .hiddenTimeCycleEnd').val();
            if (temp.cycle == 'week') {
                $('#' + temp.container + ' .base-timeCycle-timechange-start .choose_week_right a[start=' + _startTime + ']').addClass('on');
                $('#' + temp.container + ' .base-timeCycle-timechange-end .choose_week_right a[end=' + _endTime + ']').addClass('on');
            }
            else {
                $('#' + temp.container + ' .base-timeCycle-timechange-start a[start=' + _startTime + ']').addClass('on');;
                $('#' + temp.container + ' .base-timeCycle-timechange-end a[end=' + _endTime + ']').addClass('on');;
            }
        },
        position: function (temp, type) {
            //定位
            var containerLeft = $('#' + temp.container).offset().left;
            if (type == 'start') {
                var emtLeft = $('#' + temp.container + ' div[emt=timeCycleStart]').offset().left;
                $('#' + temp.container + ' .base-timeCycle-timechange-start').css('left', emtLeft - containerLeft);
            }
            else {
                emtLeft = $('#' + temp.container + ' div[emt=timeCycleEnd]').offset().left;
                $('#' + temp.container + ' .base-timeCycle-timechange-end').css('left', emtLeft - containerLeft);
            }
        },
        gEvent: function (temp) {
            var startObjs = $('#' + temp.container + ' .base-timeCycle-timechange-start a');

            startObjs.unbind('click').click(function () {
                if (typeof $(this).attr('start') != 'undefined') {
                    startObjs.removeClass('on');
                    this.className = 'on';

                    temp.start = $(this).attr('start');

                    var time = OnpickedCallBack.timeShow(temp.start.toDate(), $('#' + temp.container + ' span[emt=spanTimeCycleStart]'), temp);

                    $('#' + temp.container + ' input[class=hiddenTimeCycleStart]').val(temp.start);


                    temp.startText = time.timeStr;

                    $('#' + temp.container + ' .base-timeCycle-timechange-start').hide();
                    if (typeof temp._startTimeClickCallback == 'function') temp._startTimeClickCallback(temp.start, temp.start)
                }
            });

            var endObjs = $('#' + temp.container + ' .base-timeCycle-timechange-end a');
            endObjs.unbind('click').click(function () {
                if (typeof $(this).attr('end') != 'undefined') {
                    endObjs.removeClass('on');
                    this.className = 'on';

                    temp.end = $(this).attr('end');

                    var time = OnpickedCallBack.timeShow(temp.end.toDate(), $('#' + temp.container + ' span[emt=spanTimeCycleEnd]'), temp);

                    $('#' + temp.container + ' input[class=hiddenTimeCycleEnd]').val(temp.end);

                    temp.endText = time.timeStr;
                    $('#' + temp.container + ' .base-timeCycle-timechange-end').hide();
                    if (typeof temp._endTimeClickCallback == 'function') temp._endTimeClickCallback(temp.end, temp.end)
                }
            });
        },
        week: {
            init: function (temp) {
                var _htmlStr = $t.week._getHtml(temp);
                $('#' + temp.container + ' .base-timeCycle-timechange-start').html(_htmlStr);
                $('#' + temp.container + ' .base-timeCycle-timechange-end').html(_htmlStr);

                //事件
                $t.week._event(temp);

                $('#' + temp.container + ' .base-timeCycle-timechange-start')
                .find('.choose_week_left li[year=' + $t.csy + ']').click();
                $('#' + temp.container + ' .base-timeCycle-timechange-end')
                .find('.choose_week_left li[year=' + $t.cey + ']').click();

            },
            _event: function (temp) {
                var minDate = temp.set[temp.cycle].min.toDate();
                minDate = minDate.setDate(minDate.getDate() - 6)
                var maxDate = temp.set[temp.cycle].max.toDate();
                maxDate = maxDate.setDate(maxDate.getDate() + 6)
                //生成周度数据
                var createWeek = function (y, now, obj) {

                    var begin = new Date(y, 0, 1);
                    var end = new Date(y, 11, 31);

                    var day = begin.getDay();
                    //如果年第一天是周日
                    if (day == 0) begin.setDate(begin.getDate() - 6);
                        //如果年第一天是周二至周六
                    else if (day > 1) begin.setDate(begin.getDate() - (day - 1));

                    //1.2计算截止日期。处理截止日期，设置截止日期为周日。
                    if (end.getFullYear() == now.getFullYear()) {
                        //如果截止日期是本年度
                        end = now;
                    }
                    day = end.getDay();
                    if (day != 0) end.setDate(end.getDate() - day);
                    var index = 0;

                    end = end.setDate(end.getDate() + 6);

                    var tableStr = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_con">';
                    for (var i = begin; i < end; i.setDate(i.getDate() + 7)) {
                        var dend = new Date(i.getFullYear(), i.getMonth(), i.getDate());
                        dend.setDate(dend.getDate() + 6); //计算周日
                        if (dend.getFullYear() <= y) {
                            if (index % 2 == 0) tableStr += '<tr>';
                            index++;
                            var current = new Date(i.getFullYear(), i.getMonth(), i.getDate());
                            //如果是开始日期，则需要取本周的周一
                            var currentdate = current.getFullYear().toString() + '-' + ((current.getMonth() + 1) < 10 ? '0' + (current.getMonth() + 1).toString() : (current.getMonth() + 1).toString()) + '-' + (current.getDate() < 10 ? '0' + current.getDate().toString() : current.getDate().toString());
                            var currentMonday = ((current.getMonth() + 1) < 10 ? '0' + (current.getMonth() + 1).toString() : (current.getMonth() + 1).toString()) + '.' + (current.getDate() < 10 ? '0' + current.getDate().toString() : current.getDate().toString());  //周一(月+日)
                            current.setDate(current.getDate() + 6); //计算周日

                            var sundaydate = current.getFullYear().toString() + '-' + ((current.getMonth() + 1) < 10 ? '0' + (current.getMonth() + 1).toString() : (current.getMonth() + 1).toString()) + '-' + (current.getDate() < 10 ? '0' + current.getDate().toString() : current.getDate().toString());
                            var currentSunday = ((current.getMonth() + 1) < 10 ? '0' + (current.getMonth() + 1).toString() : (current.getMonth() + 1).toString()) + '.' + (current.getDate() < 10 ? '0' + current.getDate().toString() : current.getDate().toString());  //周日(月+日)
                            var currentweek = '第' + (index < 10 ? '0' + index : index).toString() + '周(' + currentMonday + '--' + currentSunday + ')';


                            if (i >= minDate && i <= maxDate)
                                tableStr += '<td><a href="javascript:" start="' + currentdate + '" end="' + sundaydate + '">' + currentweek + '</a></td>';
                            else
                                tableStr += '<td><a style="cursor:text;color:#A3ABBC;text-decoration:none;">' + currentweek + '</a></td>';
                            if (index % 2 == 0) tableStr += '</tr>';
                        }
                    }
                    if (index % 2 != 0) tableStr += '</tr>';
                    tableStr += '</table>';

                    obj.html(tableStr);
                }

                //开始时间
                $('#' + temp.container + ' .base-timeCycle-timechange-start')
                .find('.choose_week_left li').unbind('click')
                .click(function () {
                    var year = $(this).attr('year');
                    if (typeof year != 'undefined') {
                        $(this).parent().children().removeClass('click');
                        this.className = 'click';


                        createWeek(year, $t.dend, $('#' + temp.container + ' .base-timeCycle-timechange-start').find('.choose_week_right'));

                        var rightObjs = $('#' + temp.container + ' .base-timeCycle-timechange-start').find('.choose_week_right a');

                        rightObjs.unbind('click').click(function () {
                            if (typeof $(this).attr('start') != 'undefined') {
                                rightObjs.removeClass('on');
                                this.className = 'on';

                                temp.start = $(this).attr('start');
                                var end = $(this).attr('end');
                                var time = OnpickedCallBack.timeShow(end.toDate(), $('#' + temp.container + ' span[emt=spanTimeCycleStart]'), temp);

                                $('#' + temp.container + ' input[class=hiddenTimeCycleStart]').val(temp.start);

                                temp.startText = time.timeStr;

                                $('#' + temp.container + ' .base-timeCycle-timechange-start').hide();
                                if (typeof temp._startTimeClickCallback == 'function') temp._startTimeClickCallback(temp.start, temp.start)
                            }
                        });
                    }
                });

                //结束时间
                $('#' + temp.container + ' .base-timeCycle-timechange-end')
                .find('.choose_week_left li').unbind('click')
                .click(function () {
                    var year = $(this).attr('year');
                    if (typeof year != 'undefined') {
                    $(this).parent().children().removeClass('click');
                    this.className = 'click';
                    
                    
                        createWeek(year, $t.dend, $('#' + temp.container + ' .base-timeCycle-timechange-end').find('.choose_week_right'));

                        var rightObjs = $('#' + temp.container + ' .base-timeCycle-timechange-end').find('.choose_week_right a');
                        rightObjs.unbind('click').click(function () {

                            if (typeof $(this).attr('end') != 'undefined') {
                                rightObjs.removeClass('on');
                                this.className = 'on';

                                temp.end = $(this).attr('end');
                                var time = OnpickedCallBack.timeShow(temp.end.toDate(), $('#' + temp.container + ' span[emt=spanTimeCycleEnd]'), temp);

                                $('#' + temp.container + ' input[class=hiddenTimeCycleEnd]').val(temp.end);

                                temp.endText = time.timeStr;
                                $('#' + temp.container + ' .base-timeCycle-timechange-end').hide();
                                if (typeof temp._endTimeClickCallback == 'function') temp._endTimeClickCallback(temp.end, temp.end)
                            }
                        })
                    }
                });

                //向上箭头
                $('#' + temp.container + ' div[name="base-typecycle-arrow-up"]').unbind('click')
                .click(function () {
                    //获取ul的top值

                    var ul = $(this).parent().find('.base-typecycle-year-ul');
                    var ultop = ul.offset().top;
                    var ulparentTop = ul.parent().offset().top;
                    //ul的相对parent的top
                    var top = ultop - ulparentTop;
                    var ulparentHeight = ul.parent().height();
                    var ulheight = ul.height();

                    if (top < 0) {
                        if (top + ulparentHeight < 0) _top = top + ulparentHeight;
                        else _top = 0;
                        ul.animate({ "top": _top + 'px' }, 1000);
                    }

                });

                //向下箭头
                $('#' + temp.container + ' div[name="base-typecycle-arrow-down"]').unbind('click')
                .click(function () {
                    //获取ul的top值
                    var ul = $(this).parent().find('.base-typecycle-year-ul');
                    var ultop = ul.offset().top;
                    var ulparentTop = ul.parent().offset().top;
                    //ul的相对parent的top
                    var top = ultop - ulparentTop;
                    var ulparentHeight = ul.parent().height();
                    var ulheight = ul.height();

                    if (top - ulparentHeight > -ulheight) {
                        if (top - ulparentHeight * 2 > -ulheight) _top = top - ulparentHeight;
                        else _top = -(ulheight + top);
                        ul.animate({ "top": _top + 'px' }, 1000);
                    }

                });

            },
            _getHtml: function (temp) {
                var _htmlStr = '<div class="choose_week">'
                    + '<div class="choose_week_left">'
                    + '<div class="arrow1" name="base-typecycle-arrow-up"><a class="arrow_top1" href="javascript:;" ></a></div>'
                    + '<div class="choose_week_leftmain" style="position: relative;">'
                    + '<ul class="base-typecycle-year-ul" style="position: absolute;">'
                    + (function (s, e,t) {
                        var minYear = t.set[t.cycle].min.toDate().getFullYear();
                        var maxYear = t.set[t.cycle].max.toDate().getFullYear();
                        var yearStr = '';
                        for (var i = e; i >= s; i--) {
                            if (i >= minYear && i <= maxYear)
                                yearStr += '<li year="' + i + '" >' + i + '年</li>';
                            else
                                yearStr += '<li style="cursor:text;color:#A3ABBC;" >' + i + '年</li>';
                        }
                        return yearStr;
                    })($t.dstart.getFullYear(), $t.dend.getFullYear(),temp)
                    + '</ul>'
                    + '</div>'
                    + '<div class="arrow1" name="base-typecycle-arrow-down"><a href="javascript:;" class="arrow_top1 arrow_bottom" ></a></div>'
                    + '</div>'
                    + '<div class="choose_week_right">'
                    + '</div>'
                + '</div>';
                return _htmlStr;
            }
        },
        month: {
            init: function (temp) {
                
                var minDate=temp.set[temp.cycle].min.toDate();
                var maxDate=temp.set[temp.cycle].max.toDate();
                var _htmlStr = '<div style="display:;" class="choose_week choose_month">'
                    + '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_con">'
                    + (function (_s, _e) {
                        var _str = '';
                        for (var i = _e.getFullYear() ; i >= _s.getFullYear() ; i--) {
                            _str += '<tr><td width="5%">' + i.toString() + '</td><td width="95%">';
                            for (var j = 1; j <= 12; j++) {
                                if (i == _e.getFullYear() && j > _e.getMonth() + 1) break;

                                var min = i.toString() + '-' + (j < 10 ? '0' + j.toString() : j.toString()) + '-01';
                                var max = i.toString() + '-' + (j < 10 ? '0' + j.toString() : j.toString()) + '-' + OnpickedCallBack.getMonthDays(i, j);
                                if (max.toDate() >= minDate && min.toDate() <= maxDate)
                                    _str += '<a href="javascript:" start="' + (i.toString() + '-' + (j < 10 ? '0' + j.toString() : j.toString()) + '-01') + '" end="' + (i.toString() + '-' + (j < 10 ? '0' + j.toString() : j.toString()) + '-' + OnpickedCallBack.getMonthDays(i, j)) + '">' + j + '月</a>';
                                else
                                    _str += '<a style="cursor:text;color:#A3ABBC;text-decoration:none;">' + j + '月</a>';
                            }
                            _str += '</td></tr>';
                        }
                        return _str;
                    })($t.dstart, $t.dend)
                    + '</table>'
                + '</div>';
                $('#' + temp.container + ' .base-timeCycle-timechange-start').html(_htmlStr);
                $('#' + temp.container + ' .base-timeCycle-timechange-end').html(_htmlStr);

                //event
                $t.gEvent(temp);
            }
        },
        season: {
            init: function (temp) {
                var minDate = temp.set[temp.cycle].min.toDate();
                var maxDate = temp.set[temp.cycle].max.toDate();
                var _htmlStr = '<div style="display:;" class="choose_week choose_season">'
                   + '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_con">'
                   + (function (_s, _e) {
                       var _str = '';
                       for (var i = _e.getFullYear() ; i >= _s.getFullYear() ; i--) {
                           _str += '<tr><td width="5%">' + i.toString() + '</td><td width="95%">';
                           for (var j = new Date(i, 0, 1) ; j <= new Date(i, 11, 31) ; j.setMonth(j.getMonth() + 3)) {
                               if (i == _e.getFullYear() && j.getMonth() > _e.getMonth()) break;
                               var _tt = OnpickedCallBack.getCurrentSeasonStartEnd(j);
                               
                               if (_tt[1] >= minDate && _tt[0] <= maxDate)
                                   _str += '<a href="javascript:" start="' + _tt[0].format('yyyy-MM-dd') + '" end="' + _tt[1].format('yyyy-MM-dd') + '">第' + OnpickedCallBack.getCurrentSeason(j) + '季度</a>';
                               else
                                   _str += '<a style="cursor:text;color:#A3ABBC;text-decoration:none;">第' + OnpickedCallBack.getCurrentSeason(j) + '季度</a>';
                           }
                           _str += '</td></tr>';
                       }
                       return _str;
                   })($t.dstart, $t.dend)
                   + '</table>'
               + '</div>';
                $('#' + temp.container + ' .base-timeCycle-timechange-start').html(_htmlStr);
                $('#' + temp.container + ' .base-timeCycle-timechange-end').html(_htmlStr);

                //event
                $t.gEvent(temp);

            }
        },
        year: {
            init: function (temp) {
                var minDate = temp.set[temp.cycle].min.toDate();
                var maxDate = temp.set[temp.cycle].max.toDate();
                var _htmlStr = '<div style="display:;max-height:250px;width:300px;" class="choose_week choose_year">'
                   + '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table_con">'
                   + (function (_s, _e) {
                       var _str = '';
                       for (var i = _e.getFullYear() ; i >= _s.getFullYear() ; i) {
                           _str += '<tr><td>';
                           for (var j = 1; j <= 4; j++) {
                               var min = i.toString() + '-01-01';
                               var max = i.toString() + '-12-31';
                               if (max.toDate() >= minDate && min.toDate() <= maxDate)
                                   _str += '<a href="javascript:" start="' + i.toString() + '-01-01" end="' + i.toString() + '-12-31">' + i.toString() + '年</a>';
                               else
                                   _str += '<a style="cursor:text;color:#A3ABBC;text-decoration:none;">' + i.toString() + '年</a>';
                               i--;
                           }
                           _str += '</td></tr>';
                       }
                       return _str;
                   })($t.dstart, $t.dend)
                   + '</table>'
               + '</div>';
                $('#' + temp.container + ' .base-timeCycle-timechange-start').html(_htmlStr);
                $('#' + temp.container + ' .base-timeCycle-timechange-end').html(_htmlStr);
                //event
                $t.gEvent(temp);
            }
        }
    }

    
    /** 点击body、其他框 隐藏 */
	$.documentClick = function (to, co, callback) {
		to = typeof to == 'string' ? $('#' + to) : to;
		co = typeof co == 'string' ? $('#' + co) : co;
		$(document).click(function (e) {
			e = window.event || e;
			var srcElement = e.srcElement || e.target;
			if (!whetherChild(srcElement, to) && !whetherChild(srcElement, co)) {
				co.hide();
				to.removeClass('f_select_on');
				if (typeof callback == 'function') callback(to);
			}
		});
	}
    
  //隐藏窗口  clickContainers：为点击DIV的ID对象结合  contentContainers：为当前点击展开内容DIV的ID集合
    function HiddenWindow(clickContainers, contentContainers) {
        this.clickContainers = clickContainers;
        this.contentContainers = contentContainers;
        if (typeof HiddenWindow._initialized == 'undefined') {
            HiddenWindow.prototype.hide = function (obj) {
                var _clickContainers = this.clickContainers;
                var _contentContainers = this.contentContainers;
                for (var i = 0; i < this.clickContainers.length; i++) {
                    if (whetherChild(obj, $('#' + this.clickContainers[i]))) {
                        _clickContainers = _clickContainers.remove({ value: _clickContainers[i] });
                        _contentContainers = _contentContainers.remove({ value: _contentContainers[i] });
                        break;
                    }
                }
                var _t = $.map(_clickContainers, function (j) { return '#' + j }).join(',');
                var _c = $.map(_contentContainers, function (j) { return '#' + j }).join(',');
                $(_t).removeClass('f_select_on');
                $(_c).hide();
            }
            HiddenWindow._initialized = true;
        }
    }
    $.mjHiddenWindow = function (clickContainers, contentContainers) {
        return new HiddenWindow(clickContainers, contentContainers);
    }
    
    //隐藏窗口  clickContainers：为点击DIV的ID对象结合  contentContainers：为当前点击展开内容DIV的ID集合
    function HiddenWindow(clickContainers, contentContainers) {
        this.clickContainers = clickContainers;
        this.contentContainers = contentContainers;
        if (typeof HiddenWindow._initialized == 'undefined') {
            HiddenWindow.prototype.hide = function (obj) {
                var _clickContainers = this.clickContainers;
                var _contentContainers = this.contentContainers;
                for (var i = 0; i < this.clickContainers.length; i++) {
                    if (whetherChild(obj, $('#' + this.clickContainers[i]))) {
                        _clickContainers = _clickContainers.remove({ value: _clickContainers[i] });
                        _contentContainers = _contentContainers.remove({ value: _contentContainers[i] });
                        break;
                    }
                }
                var _t = $.map(_clickContainers, function (j) { return '#' + j }).join(',');
                var _c = $.map(_contentContainers, function (j) { return '#' + j }).join(',');
                $(_t).removeClass('f_select_on');
                $(_c).hide();
            }
            HiddenWindow._initialized = true;
        }
    }
    
    /**  commom js */
    function _string() {
        if (typeof _string._initialized == 'undefined') {
            //替换字符串
            _string.prototype.format = function (s, args) {
                var result = s;
                for (var i = 1; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({)" + (i - 1) + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
                return result;
            };
            _string.prototype.removeHTML = function (str) {
                str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
                return str;
            };
            _string.prototype.subString = function (s, len, suffix) {
                if (s.length > len) s = s.substr(0, len) + (suffix == undefined ? '' : suffix);
                if (s == '') s = '--'; 
                return s;
            };//保留小数，无小数返回当前值
            _string.prototype.toFixed = function (s, len, isSplit) {
                var v = s;
                if (v == null) return '--';
                else if (v.toString() == '' || v.toString() == '-65535.01' || v.toString() == '--') return '--';
                else if (isSplit == false) v = parseFloat(s).toFixed(len)
                else if (s.toString().indexOf('.') > 0) v = parseFloat(s).toFixed(len);
                return v;
            }
            _string.prototype.toMillionFixed = function (s, len, is) {
                var v = s;
                if (v == null || v == '' || v == '-65535.01') return '--';
                if (parseFloat(s) == s) {
                    if (is) return string.toFixed((parseFloat(s) / 10000), len);
                    else return (parseFloat(s) / 10000).toFixed(len);
                }
                return '--';
            },
            _string._initialized = true;
        }
    }
    var string = new _string();
    //调用string.format('实例{0}','要替换的值')

    /*去空格*/
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }

    //2012-01-01 字符串转换日期
    String.prototype.toDate = function () {
        var str = this.split('-');
        if (str.length == 3) {
            var date = new Date();
            date.setUTCFullYear(str[0], str[1] - 1, str[2]);
            date.setUTCHours(0, 0, 0, 0);
            return date;
        }
    }
    //日期格式化
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份   
            "d+": this.getDate(),                    //日   
            "h+": this.getHours(),                   //小时   
            "m+": this.getMinutes(),                 //分   
            "s+": this.getSeconds(),                 //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
   
    //判断元素是否在某个容器之内
    function whetherChild(srcElement, obj)
    {
        if (srcElement == obj[0]) return true;
        else {
            var childs = obj.children();
            for (var i = 0; i < childs.length; i++) {
                if (srcElement == childs[i]) return true;
                else {
                    if (arguments.callee(srcElement, $(childs[i]))) return true;
                }
            }
        }
        return false;
    }
    
