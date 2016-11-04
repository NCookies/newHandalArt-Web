(function ($) {
    $.fn.flash_message = function (options) {
        options = $.extend({
            text: 'Done',
            time: 1000,
            how: 'before',
            class_name: ''
        }, options);
        return $(this).each(function () {
            if ($(this).parent().find('.flash_message').get(0)) return;
            var message = $('<span />', {
                'class': 'flash_message ' + options.class_name,
                text: options.text
            }).hide().fadeIn('fast');
            $(this)[options.how](message);
            message.delay(options.time).fadeOut('normal', function () {
                $(this).remove();
            });
        });
    };
    var eventsArray;
    var insertOrUpdateCalendar = function (events) {
        console.log(JSON.stringify(events));
        $.ajax({
            url: '/calendar',
            type: 'POST',
            data: {
                events: JSON.stringify(events)
            },
            complete: function (response, textStatus) {
                console.log("complete");
            },
            success: function (data) {
                if (data.success) {
                    console.log('데이터 전송 성공!!');
                } else {
                    console.log('오류 발생!!');
                }
            },
            error: function () {
                console.log('오류 발생2!!');
            },
        });
    }
    $(document).ready(function () {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var calendar = $('#calendar').fullCalendar({
            lang: 'ko',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
            },
            titleFormat: {
                month: "yyyy년 MMMM",
                week: "[yyyy] MMM d일 - { [yyyy] MMM d일}",
                day: "yyyy년 MMM d일 dddd"
            },
            allDayDefault: true, // false일 때 하루종일 수행하는 일정을 추가했을 경우 주에서 all-day에 표시되지 않고 시간대를 처음부터 끝까지 차지함
            weekends: true, // false일 때 주말 안나옴
            monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
            dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
            buttonText: {
                today: "오늘",
                month: "월별",
                week: "주별",
                day: "일별"
            },
            defaultView: 'month',
            selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) // dayClick 함수는 클릭이벤트만 있는 반면, select 함수는 드래그이벤트도 있음
            {
                $('#addModal').modal({
                    title: event.title,
                    content: event.content
                });
                $("#addModal").off("keydown").on("keydown", function (evt) {
                    enterKey(evt, "#add");
                });
                $("#add").off('click').one("click", function () {
                    var title = $('#addTitle').val();
                    if (title == "") {
                        $('#status-area').flash_message({
                            text: '일정 이름을 입력해주세요!!',
                            how: 'append'
                        });
                        return false;
                    }
                    var newEvent = {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay,
                        _id: Math.floor(Math.random() * 100000) + 1
                    };
                    var eArray = [{
                        id: newEvent._id,
                        start: newEvent.start,
                        end: newEvent.end,
                        title: newEvent.title,
                        allday: newEvent.allDay
                    }]
                    $('#calendar').fullCalendar('renderEvent', newEvent, 'stick');
                    insertOrUpdateCalendar(eArray); // DB 저장
                    $('#addModal').modal('hide');
                });
                title = $('#addTitle').val(''); // 앞에 썼던 title 내용 초기화, 나중에 썼던 title 내용이 지금까지 클릭했던 모든 날에 들어감
            },
            eventClick: function (event, calEvent, jsEvent, view, element) {
                $('#editModal').modal({
                    title: event.title,
                    content: event.content
                });
                $("#editModal").off("keydown").on("keydown", function (evt) {
                    enterKey(evt, "#edit");
                });
                $("#edit").off('click').on("click", function () {
                    var title = $('#editTitle').val();
                    event.title = title;
                    var eArray = [{
                        id: event._id,
                        start: event.start,
                        end: event.end,
                        title: event.title,
                        allday: event.allDay
                    }]
                    $('#calendar').fullCalendar('updateEvent', event);
                    insertOrUpdateCalendar(event);
                    $('#editModal').modal('hide');
                });
                $("#remove").off('click').one("click", function () {
                    var calendarId = event._id;
                    $('#calendar').fullCalendar('removeEvents', calendarId);
                    $('#editModal').modal('hide');
                    $.ajax({
                        url: '/calendar/remove',
                        type: 'POST',
                        data: {
                            events: JSON.stringify(calendarId)
                        },
                        complete: function (response, textStatus) {
                            console.log("complete");
                        },
                        success: function (data) {
                            if (data.success) {
                                console.log('데이터 전송 성공!!');
                            } else {
                                console.log('오류 발생!!');
                            }
                        },
                        error: function () {
                            console.log('오류 발생2!!');
                        },
                    });
                });
                title = $('#editTitle').val(event.title); // title란에 기존에 입력했던 event의 이름이 나옴
            },
            editable: true, // 드래그로 일정 위치 및 크기 수정
            eventLimit: true
        });
        function enterKey(evt, buttonId) {
            var keyCode = evt.keyCode || evt.which;
            if (evt.keyCode == 13) $(buttonId).trigger("click");
        }
        $(".fc-button-agendaWeek").on("click", function () {
            // when you click week, remove d3 and radio buttons
            $(".fc-view-agendaDay").remove();
            $("#sequence").remove();
        });
        $(".fc-button-month").on("click", function () {
            // when you click month, remove d3 and radio buttons
            $(".fc-view-agendaDay").remove();
            $("#sequence").remove();
        });
        $(".fc-button-agendaDay").on("click", function () {
            // day_calendar HTML
            $(".agendaDay").remove(); // remove fullcalendar's week table
            $('#fc-content').append("<div id='sequence'></div>"); // radio buttons space
            $('#fc-content').append("<div class ='fc-view-agendaDay'>" +
                "<svg id ='graph' xmls='http://www.w3.org/2000/svg'>" +
                "<foreignobject id=" + "'percentage' x='250' y='250'>" +
                "</foreignobject></svg></div>");
            // AM,PM radio buttons 
            // NEED: when you click radio, reset d3.                      
            $("#sequence").append("<label for='radio-am' class='radio-inline' id='all'>" +
                "<input type='radio' value='1' name='quality' id='radio-am'> <span> 오전 </span>" +
                "</label> <label for='radio-pm' class='radio-inline' id='all'>" +
                "<input type='radio' value='2' name='quality' id='radio-pm' checked='true'> <span> 오후 </span>" +
                "</label>");
            /* Basic Setting
            -----------------------------------------------------------*/
            // set graph size
            var Gw = 600;
            var Gh = 600;
            var Gr = Gh / 2;
            // set graph data
            // It use drawing paths and showing time.
            var data = [
                { "label": "12:00", "value": 30 },
                { "label": "12:30", "value": 30 },
                { "label": "13:00", "value": 30 },
                { "label": "13:30", "value": 30 },
                { "label": "14:00", "value": 30 },
                { "label": "14:30", "value": 30 },
                { "label": "15:00", "value": 30 },
                { "label": "15:30", "value": 30 },
                { "label": "16:00", "value": 30 },
                { "label": "16:30", "value": 30 },
                { "label": "17:00", "value": 30 },
                { "label": "17:30", "value": 30 },
                { "label": "18:00", "value": 30 },
                { "label": "18:30", "value": 30 },
                { "label": "19:00", "value": 30 },
                { "label": "19:30", "value": 30 },
                { "label": "20:00", "value": 30 },
                { "label": "20:30", "value": 30 },
                { "label": "21:00", "value": 30 },
                { "label": "21:30", "value": 30 },
                { "label": "22:00", "value": 30 },
                { "label": "22:30", "value": 30 },
                { "label": "23:00", "value": 30 },
                { "label": "23:30", "value": 30 },
            ];
            // It can make using data easily.
            var data = $.parseJSON(JSON.stringify(data));
            // random colors
            var color = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "WhiteSmoke", "Yellow", "YellowGreen"];

            // set the center of a circle
            var vis = d3.select('#graph').append("svg")
                .data([data]).attr("width", Gw).attr("height", Gh)
                .append("g").attr("transform", "translate(" + Gr + "," + Gr + ")");
            var arc = d3.svg.arc().outerRadius(Gr).innerRadius(Gr - 130);
            var pie = d3.layout.pie().value(function (d) { return d.value; }).sort(null);
            var paths = vis.selectAll(".slice").data(pie).enter()
                .append("g").attr("class", "slice")
                .append("path").each(function (d, i) {
                    // set index for each pie
                    d3.select(this).attr("index", i)
                }).on("mousedown", mousedown)
                .on("mouseover", mouseover)
                .on("mouseup", mouseup);
            paths.transition().duration(500).attr("d", arc).each(function (d) { this._current = d; });
            var sumIndex = ""; // path's index in mouseover
            var startIndex = 0; // set start index
            var time; // set time for path
            var target; // when make a path, using start path's index
            var dragging; // decide dragging
            var sumValue = 0; // drawing path's size
            var totalSize; // It needs cacluate percent.
            var infoJsonArray = new Array(); // using for Json
            var radians = 0.0174532925,
                clockRadius = 190,
                margin = 50,
                Cw = (clockRadius + margin) * 2,
                Ch = (clockRadius + margin) * 2,
                hourHandLength = clockRadius / 2,
                minuteHandLength = clockRadius - 50,
                hourLabelRadius = clockRadius - 40
            hourLabelYOffset = 7;

            /* Drawing a center clock
            -----------------------------------------------------------*/
            var hourScale = d3.scale.linear().range([0, 330]).domain([0, 11]);
            var minuteScale = secondScale = d3.scale.linear().range([0, 354]).domain([0, 59]);
            var handData = [
                {
                    type: 'hour',
                    value: 0,
                    length: -hourHandLength,
                    scale: hourScale
                },
                {
                    type: 'minute',
                    value: 0,
                    length: -minuteHandLength,
                    scale: minuteScale
                }];
            var t = new Date();
            handData[0].value = (t.getHours() % 12) + t.getMinutes() / 60;
            handData[1].value = t.getMinutes();
            var svg = d3.select("#graph").append("svg").attr("width", Cw + 30)
                .attr("height", Ch + 30).attr("x", 60).attr("y", 60)
                .style("fill", "white").style("opacity", "0.8");
            var face = svg.append('g').attr('id', 'clock-face')
                .attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');
            face.selectAll('.hour-label').data(d3.range(3, 13, 3)).enter()
                .append('text').attr('class', 'hour-label').attr('text-anchor', 'middle')
                .attr('x', function (d) {
                    return hourLabelRadius * Math.sin(hourScale(d) * radians);
                }).attr('y', function (d) {
                    return -hourLabelRadius * Math.cos(hourScale(d) * radians) + hourLabelYOffset;
                }).text(function (d) {
                    return d;
                });
            var hands = face.append('g').attr('id', 'clock-hands').style("fill", "white");
            face.append('g').attr('id', 'face-overlay').append('circle')
                .attr('class', 'hands-cover').attr('x', 0).attr('y', 0).attr('r', clockRadius / 60);
            hands.selectAll('line').data(handData).enter().append('line')
                .attr('class', function (d) {
                    return d.type + '-hand';
                }).attr('x1', 0).attr('y1', function (d) {
                    return d.balance ? d.balance : 0;
                }).attr('x2', 0).attr('y2', function (d) {
                    return d.length;
                }).attr('transform', function (d) {
                    return 'rotate(' + d.scale(d.value) + ')';
                });
            setInterval(function () {
                // updateClock
                var t = new Date();
                handData[0].value = (t.getHours() % 12) + t.getMinutes() / 60;
                handData[1].value = t.getMinutes();
                //moveHands
                d3.select('#clock-hands').selectAll('line').data(handData).transition().attr('transform', function (d) {
                    return 'rotate(' + d.scale(d.value) + ')';
                });
            }, 1000);
            d3.select(self.frameElement).style("height", Ch + "px");
            /* Drawing paths using data
            -----------------------------------------------------------*/
            // repeat when click header-left 
            $("#right_buttons").off("click").on("click", function () {
                connect();
            });
            connect();
            function connect() {
                // NEED: when move a date, reset graph. using below code
                // NEED: different time-zone and real time.
                // for (var i = seperIndex[1]; i < lastnum + 2; i++) calcPath(i);
                eventsArray = JSON.stringify((calendar.fullCalendar('clientEvents').map(function (e) {
                    return {
                        id: e._id,
                        start: e.start,
                        end: e.end,
                        title: e.title,
                        allday: e.allDay
                    };
                })));
                eventsArray = JSON.parse(eventsArray); // transform array
                // repeat when click prev or next or today button
                var date = $('#date').text().match(/\d+/g); // parsing display date
                for (var i = 1; i <= 2; i++) { // make one more zero
                    if (date[i].length == '1') date[i] = '0' + date[i];
                }
                date = date.join('-');
                for (var i = 0; i < eventsArray.length; i++) {
                    var setD = moment.tz(eventsArray[i].start, "Asia/Seoul").format();
                    var endD = moment.tz(eventsArray[i].end, "Asia/Seoul").format();
                    setD = setD.split('T');
                    endD = endD.split('T'); // fullCalendar date
                    if (setD[0] == date) { // same start date
                        if (endD[0] == date) { // same end date
                            var endT = endD[1].split(':');
                            var setT = setD[1].split(':'); // save time in array
                            if (endT[1] < 30) // less than 30, it'll be 00
                                endT[4] = '00';
                            else endT[4] = '30';
                            if (setT[1] < 30) setT[4] = '00';
                            else setT[4] = '30';
                            // calculate between NsetT from NendT
                            var NendT = endT[0] + ":" + endT[4];
                            var NsetT = setT[0] + ":" + setT[4];
                            var Calc = new Array();
                            Calc[0] = Number(endT[0]) - Number(setT[0]); // hour
                            Calc[1] = Number(endT[4]) - Number(setT[4]); // min
                            var count = Calc[0] * 2;
                            if (Calc[1] == 30) count += 1;
                            count = Number(count);
                            // add 30
                            // mousedown, mouserover, mouseup function
                            for (var j = 0; j < 24; j++) { // j=startTime
                                if (NsetT == data[j].label) { // same start time
                                    for (var k = j - 1; k < 24; k++) { // k=endTime
                                        if (NendT == data[k].label) { // same end time
                                            for (var q = j + 1; q <= k; q++) {
                                                sumIndex += q + ",";
                                                data[q].value = 0;
                                            }
                                            target = $('path').filter(function () {
                                                return $(this).attr('index') == j;
                                            }).addClass("biggerFilling").attr("sumIndex", sumIndex) // set Attribute sumindex in start path
                                                .attr("usingText", "true").attr("index"); // decide make method, target = start index
                                            data[j].value = count * 30; // mouseover values 
                                            data[j].label = eventsArray[i].title;
                                            change(target); // redraw pathes
                                            sumIndex = ""; // reset
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /* mouse functinon
            -----------------------------------------------------------*/
            function sumData(data) {
                // calcuate all data values, using percent
                var arr = 0;
                for (var i = 0; i < 24; i++) {
                    arr += data[i].value;
                }
                return arr;
            }
            function mousedown(d) {
                dragging = true;
                sumValue = 0;
                startIndex = $(this).attr("index");
                sumValue += d.value;
                d.data.value = 0;
                time = d.data.label;
            }
            function mouseover(d) {
                /* 
                    change EDIT mode
                        $("#clock-face").on("mouseenter", function() {
                            d3.select("#percentage")
                            .text("EDIT")
                            .on("dblclick", dblclick);
                        });
                */
                if (dragging) {
                    if (d.value == 30) {
                        sumIndex += ($(this).attr("index") + ",");
                    }
                    /// check asending or desending
                    if ($(this).attr("index") > startIndex) {
                        $('path').filter(function () {
                            return $(this).attr('index') == startIndex;
                        }).addClass("smallerFilling");
                        $(this).addClass("smallerFilling");
                    }
                    else if ($(this).attr("index") < startIndex) {
                        $('path').filter(function () {
                            return $(this).attr('index') == startIndex;
                        }).addClass("biggerFilling");
                        $(this).addClass("biggerFilling");
                    }
                    sumValue += d.value;
                    d.data.value = 0;
                    // mouse control
                    // $("#graph").on("mouseover", mouseup($(this)));
                    // $("#clock-face").on("mouseover", mouseup($(this)));
                }
                var percentage = (100 * d.value / sumData(data)).toPrecision(3);
                var percentageString = percentage + "%";
                if (percentage < 0.1) {
                    percentageString = "< 0.1%";
                }
                d3.select("#percentage").text(d.data.label);
                $("path").css("stroke", "black").attr("opacity", "1");
                $("path").filter(function () {
                    return $(this).attr("class") == "biggerFilling" || $(this).attr("class") == "smallerFilling";
                }).attr("opacity", "1");
            }
            $("g").on("mouseout", function () {
                $("path").css("stroke", "rgba(0,0,0,0)").css("fill", "rgba(0,0,0,0);");
                $("path").filter(function () {
                    return $(this).attr("class") == "biggerFilling" || $(this).attr("class") == "smallerFilling";
                }).attr("opacity", "1");
            });
            function mouseup(d) {
                dragging = false;
                d.data.value = sumValue;
                if ($(this).attr("usingText") != 'true') {
                    // no make direct, so first time mouseup
                    if (sumIndex != " ") {
                        $(this).attr("sumIndex", sumIndex);
                        sumIndex = " ";
                    }
                }
                // classification asending or desending
                // save index in last path
                if ($(this).attr("startIndex") == undefined) {
                    $(this).attr("startindex", startIndex);
                }
                target = $(this).attr("index");
                var strDate = $('#date').text().match(/\d+/g);
                var classN = $(this).attr("class");
                var fromTime, endTime;
                if (classN == "biggerFilling") { // biggerFilling -> d.data.label = starttime
                    fromTime = d.data.label;
                    endTime = time;
                } else {
                    fromTime = time;
                    endTime = d.data.label;
                }
                if (fromTime.length == 1) fromeTime = "0" + fromTime;
                if (endTime.length == 1) endTime = "0" + endTime;
                for (var i = 1; i <= 2; i++) { // plus "0"
                    if (strDate[i].length == '1') strDate[i] = "0" + strDate[i];
                }
                if (classN == "biggerFilling") {
                    $("path").filter(function () {
                        return $(this).attr("index") == target;
                    }).attr("fromdate", strDate[0] + "-" + strDate[1] + "-" + strDate[2] + "T" + fromTime + ":00.000Z").attr("todate", strDate[0] + "-" + strDate[1] + "-" + strDate[2] + "T" + endTime + ":00.000Z");
                } else {
                    $("path").filter(function () {
                        return $(this).attr("index") == target;
                    }).attr("fromdate", strDate[0] + "-" + strDate[1] + "-" + strDate[2] + "T" + fromTime + ":00.000Z").attr("todate", strDate[0] + "-" + strDate[1] + "-" + strDate[2] + "T" + endTime + ":00.000Z");
                }
                editModal(d); // add event first
            }
            /* redraw path
            -----------------------------------------------------------*/
            function change(target) {
                paths.data(pie(data));
                $("path").filter(function () {
                    return $(this).attr("index") == target;
                }).css("fill", color[Math.floor(Math.random() * color.length)]); // change color mouseup path
                paths.transition().duration(750).attrTween("d", arcTween); // redraw path
            }
            // save path in _cuttrent
            // update _current to interpolate
            function arcTween(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) {
                    return arc(i(t));
                };
            }
            /* modal functinon
            -----------------------------------------------------------*/
            function editModal(d) {
                $("#editModal_day").modal();
                // NEED: click cancel -> not make path
                var targetPath = $('path').filter(function () {
                    return $(this).attr('index') == target;
                });
                var front = targetPath.attr("startIndex");
                var back = targetPath.attr("index");
                if (front > back) {
                    // when bigger dragging, asending path index
                    var temp;
                    temp = front;
                    front = back;
                    back = temp;
                }
                var start_ = calcTime(front);
                var end_ = calcTime(back);
                var idadd = "";
                $("#editModal_day").off("keydown").on("keydown", function (evt) {
                    enterKey(evt, "#edit_day")
                });
                $("#edit_day").off('click').on('click', function () {
                    d.data.label = $('#editTitle_day').val(); // change label  
                    change(target); // redraw path
                    $('#editTitle_day').val(''); // reset textbox
                    // Json add
                    var fromDate = targetPath.attr("fromdate");
                    var toDate = targetPath.attr("todate");
                    if (targetPath.attr("add") == "true") {
                        // 만들어진 일정이 있어서 수정으로 
                        // start, end 똑같은 path 찾아서 title 수정
                        // 중복일정 시 수정 필요 x : 똑같은 시간으로 만들지 않을 것이기 때문
                        for (var i = 0; i < infoJsonArray.length; i++) {
                            if (idadd = infoJsonArray[i].id) {
                                console.log("in");
                                infoJsonArray[i].title = d.data.label;
                            }
                        }
                        return;
                    }
                    for (var i = 0; i < 3; i++) idadd += targetPath.attr("index");
                    idadd += (Math.floor(Math.random() * 1000000) + 1).toString();
                    var newEvent = {
                        id: idadd,
                        title: d.data.label,
                        start: fromDate,
                        end: toDate,
                        allDay: false
                    };
                    targetPath.attr("id", idadd);
                    infoJsonArray.push(newEvent); // 배열에 object 넣기  
                    targetPath.attr("add", "true");
                    console.log('day calendar : ' + JSON.stringify(infoJsonArray));
                    $.ajax({
                        url: '/calendar/day',
                        type: 'POST',
                        data: {
                            events: JSON.stringify(infoJsonArray)
                        },
                        dataType: "json",
                        complete: function (response, textStatus) {
                            console.log("complete");
                        },
                        success: function (data) {
                            if (data.success) {
                                console.log('데이터 전송 성공!!');
                            } else {
                                console.log('오류 발생!!');
                            }
                        },
                        error: function () {
                            console.log('오류 발생2!!');
                        },
                    });
                });
                // sumIndex의 index를 가진 path.value = 30
                $("#remove_day").off('click').on('click', function hey() {
                    if (targetPath.attr("sumIndex") == undefined) { // select one path
                        var time = calcTime(target);
                        d.data.label = time;
                        targetPath.removeClass();
                        targetPath.attr("class", "");
                        return;
                    }
                    var sumIndex = $('path').filter(function () {
                        return $(this).attr('index') == target;
                    }).attr("sumIndex");
                    console.log(sumIndex);
                    var seperIndex = sumIndex.split(",");
                    var length = seperIndex.length;
                    seperIndex.sort(function (left, right) { // asending sort
                        return left - right;
                    });
                    var lastnum = parseInt(seperIndex[length - 1]);
                    if (targetPath.hasClass("smallerFilling"))
                        for (var i = seperIndex[1] - 1; i <= lastnum; i++) calcPath(i);
                    else if (targetPath.hasClass("biggerFilling")) {
                        if (targetPath.attr("usingText") == "true")
                            for (var i = seperIndex[1] - 1; i < lastnum; i++) calcPath(i);
                        else
                            for (var i = seperIndex[1]; i < lastnum + 2; i++) calcPath(i);
                    }
                    // Json Remove
                    // send removing path id
                    $.ajax({
                        url: '/calendar/remove',
                        type: 'POST',
                        data: {
                            events: JSON.stringify(idadd)
                        },
                        dataType: "json",
                        complete: function (response, textStatus) {
                            console.log("complete");
                        },
                        success: function (data) {
                            if (data.success) {
                                console.log('데이터 전송 성공!!');
                            } else {
                                console.log('오류 발생!!');
                            }
                        },
                        error: function () {
                            console.log('오류 발생2!!');
                        },
                    });
                });
            }

            function calcTime(i) {
                var time = 0;
                if (i % 2 == 0)
                    time = i / 2 + ":00";
                else time = Math.floor(i / 2) + ":30";
                return time;
            }
            function calcPath(i) {
                // calcuate size and redraw path
                if (i % 2 == 0)
                    data[i].label = i / 2 + ":00";
                else
                    data[i].label = Math.floor(i / 2) + ":30";
                data[i].value = 30;
                paths.data(pie(data));
                paths.transition().duration(750).attrTween("d", arcTween);
                $('path').filter(function () {
                    return $(this).attr('index') == i;
                }).removeAttr('style').attr("class", "").attr("sumIndex", " ");
            }
        });
    });
})(jQuery);