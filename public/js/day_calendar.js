$(document).ready(function() {

    var Gw = 600;
    var Gh = 600;
    var Gr = Gh/2;

    var data = [{"label":"00:00", "value":30},
        {"label":"00:30", "value":30},
        {"label":"01:00", "value":30},
        {"label":"01:30", "value":30},
        {"label":"02:00", "value":30},
        {"label":"02:30", "value":30},
        {"label":"03:00", "value":30},
        {"label":"03:30", "value":30},
        {"label":"04:00", "value":30},
        {"label":"04:30", "value":30},
        {"label":"05:00", "value":30},
        {"label":"05:30", "value":30},
        {"label":"06:00", "value":30},
        {"label":"06:30", "value":30},
        {"label":"07:00", "value":30},
        {"label":"07:30", "value":30},
        {"label":"08:00", "value":30},
        {"label":"08:30", "value":30},
        {"label":"09:00", "value":30},
        {"label":"09:30", "value":30},
        {"label":"10:00", "value":30},
        {"label":"10:30", "value":30},
        {"label":"11:00", "value":30},
        {"label":"11:30", "value":30},
    ];

    var color = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","WhiteSmoke","Yellow","YellowGreen"
    ];

    var vis = d3.select('#graph').append("svg")
        .data([data])
        .attr("width", Gw)
        .attr("height", Gh)
        .append("g")
        .attr("transform", "translate(" + Gr + "," + Gr + ")"); //원의 중심 지정

    var arc = d3.svg.arc().outerRadius(Gr).innerRadius(Gr-100);

    var pie = d3.layout.pie()
        .value(function(d){ return d.value; })
        .sort(null);

    var paths = vis.selectAll(".slice")
        .data(pie).enter()
        .append("g")
        .attr("class", "slice")
        .append("path")
        .each(function(d, i) { //각 파이의 인덱스 지정
            d3.select(this)
                .attr("index", i)
        })
        .on("mousedown", mousedown)
        .on("mouseover", mouseover)
        .on("mouseup", mouseup);

    paths.transition().duration(500)
        .attr("d", arc)
        .each(function(d) { this._current = d; });

    // api.jqueryui.com/draggable/#event-drag
    // containment: ".slice", //limit area
    var dragging;
    //var isfilled = false;
    var sumValue = 0;
    var totalSize;
    var startBig = false;

    var radians = 0.0174532925,
        clockRadius = 200,
        margin = 50,
        Cw = (clockRadius+margin)*2,
        Ch = (clockRadius+margin)*2,
        hourHandLength = clockRadius/2,
        minuteHandLength = clockRadius-50,
        hourLabelRadius = clockRadius - 40,
        hourLabelYOffset = 7;

    var hourScale = d3.scale.linear()
        .range([0,330])
        .domain([0,11]);

    var minuteScale = secondScale = d3.scale.linear()
        .range([0,354])
        .domain([0,59]);

    var handData = [
        {
            type:'hour',
            value:0,
            length:-hourHandLength,
            scale:hourScale
        },
        {
            type:'minute',
            value:0,
            length:-minuteHandLength,
            scale:minuteScale
        }
    ];

    drawClock();
    var sumIndex=" ";
    var startIndex = 0;

    function sumData(data) { // 퍼센트 구할 때 필요
        var arr = 0;
        var str = $.parseJSON(JSON.stringify(data));

        for (var i = 0; i < 24; i++) {
            arr += str[i].value;
        }
        return arr;
    }

    // 클릭할때마다 값이 초기화되서 주의
    function mousedown(d) {
        sumValue = 0;
        startIndex = $(this).attr("index");
        sumValue += d.value;
        d.data.value = 0;
        dragging = true;
    }

    function mouseover(d) {
        if( dragging ) {
            if( d.value == 30 ) {
                sumIndex += ($(this).attr("index")+",");
            }
            if( $(this).attr("index") > startIndex ){
                $('path').filter(function() {
                    return $(this).attr('index') == startIndex;
                }).addClass("smallerFilling"); //mouseup path
                $(this).addClass("smallerFilling"); //red
            }
            else if( $(this).attr("index") < startIndex ){
                $('path').filter(function() {
                    return $(this).attr('index') == startIndex;
                }).addClass("biggerFilling");
                $(this).addClass("biggerFilling"); //blue
            }
            sumValue += d.value;
            d.data.value = 0;
        }
        var percentage = (100 * d.value / sumData(data) ).toPrecision(3);
        var percentageString = percentage + "%";
        if (percentage < 0.1) { percentageString = "< 0.1%"; }
        d3.select("#percentage")
            .text(percentageString+"　　　　"+d.data.label);
        // .text($(this).attr("index")+"　　　　"+d.data.label);

        $("path").css("stroke", "black").attr("opacity", "0.3");
        $("path").filter(".filling").attr("opacity", "1");
    }

    // path 밖에서 mouseup하면 mouseover가 연속됨.
    function mouseup(d) {
        dragging = false;
        d.data.value = sumValue;
        if(sumIndex != " ") {
            $(this).attr("sumIndex", sumIndex);
            sumIndex = " ";
        }
        target = d3.select(this).attr("index"); //추가 된 파이 식별하기 위해 필요
        edit(d); //처음에 일정이름 추가
    }

    $("g").on("mouseout", function() {
        $("path").css("stroke", "white").attr("opacity", "1");
    });

    function change(target) {
        paths.data(pie(data));
        $("path").filter(function() {
            return $(this).attr("index") == target;
        }).css("fill", color[Math.floor(Math.random() * color.length)]);

        paths.transition().duration(750)
            .attrTween("d", arcTween); // redraw the paths
    }

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);

        return function(t) {
            return arc(i(t));
        };
    }

    function edit(d) {
        $("#editModal").modal();
        //remove click event before adding it.
        //cancel했을 때 path생성 안되게
        var targetPath = $('path').filter(function() {
            return $(this).attr('index') == target;
        });

        $("#save").off('click').on('click', function() {
            d.data.label = $('#event_name').val(); // change label
            change(target);  // redraw path
            $('#event_name').val(''); //reset textbox
        });

        //sumIndex의 index를 가진 path.value = 30
        // 드래그 큰 수부터: [1] ~ end+2
        // 드래그 작은 수부터: [1]-1 ~ end+2
        $("#remove").off('click').on('click', function() {
            var sumIndex = $('path').filter(function() {
                return $(this).attr('index') == target;
            }).attr("sumIndex");
            var seperIndex = sumIndex.split(","); //sumIndex 배열로
            var length = seperIndex.length; //path의 갯수
            var str = $.parseJSON(JSON.stringify(data));
            seperIndex.sort(function(left, right) { //오름차순정렬
                return left-right;
            });
            if(targetPath.hasClass("biggerFilling")){
                console.log(seperIndex);
                console.log(length);
                for (var i=seperIndex[1]; i<=seperIndex[length-1]+1; i++) {
                    console.log(i);/*
                     str[i].value = 30;
                     paths.data(pie(str)); // compute the new angles
                     paths.transition().duration(750)
                     .attrTween("d", arcTween); // redraw the paths
                     $('path').filter(function() {
                     return $(this).attr('index') == i;
                     }).attr("sumIndex", "");*/
                }
            }
        });
    }


    function drawClock() { //create all the clock elements
        updateClock();	//draw them in the correct starting position
        var svg = d3.select("#graph").append("svg")
            .attr("width", Cw)
            .attr("height", Ch)
            .attr("x", clockRadius/3.8)
            .attr("y", clockRadius/4)
            .style("opacity", "0.5");

        var face = svg.append('g')
            .attr('id','clock-face')
            .attr('transform','translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

        face.selectAll('.hour-label')
            .data(d3.range(3,13,3))
            .enter()
            .append('text')
            .attr('class', 'hour-label')
            .attr('text-anchor','middle')
            .attr('x',function(d){
                return hourLabelRadius*Math.sin(hourScale(d)*radians);
            })
            .attr('y',function(d){
                return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
            })
            .text(function(d){
                return d;
            });

        var hands = face.append('g').attr('id','clock-hands');

        face.append('g').attr('id','face-overlay')
            .append('circle').attr('class','hands-cover')
            .attr('x',0)
            .attr('y',0)
            .attr('r',clockRadius/60);

        hands.selectAll('line')
            .data(handData)
            .enter()
            .append('line')
            .attr('class', function(d){
                return d.type + '-hand';
            })
            .attr('x1',0)
            .attr('y1',function(d){
                return d.balance ? d.balance : 0;
            })
            .attr('x2',0)
            .attr('y2',function(d){
                return d.length;
            })
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
    }

    function moveHands(){
        d3.select('#clock-hands').selectAll('line')
            .data(handData)
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
    }

    function updateClock(){
        var t = new Date();
        handData[0].value = (t.getHours() % 12) + t.getMinutes()/60 ;
        handData[1].value = t.getMinutes();
    }

    setInterval(function(){
        updateClock();
        moveHands();
    }, 1000);

    d3.select(self.frameElement).style("height", Ch + "px");
});