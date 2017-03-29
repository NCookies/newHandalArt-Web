$(document).ready(function(eventData)
{
	/*
		date store today date.
		d store today date.
		m store current month.
		y store current year.
	*/
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	
	/*
		Initialize fullCalendar and store into variable.
		Why in variable?
		Because doing so we can use it inside other function.
		In order to modify its option later.
	*/
	
	var calendar = $('#calendar').fullCalendar(
	{
		height: 680,
		lang: 'ko',
		/*
			header option will define our calendar header.
			left define what will be at left position in calendar
			center define what will be at center position in calendar
			right define what will be at right position in calendar
		*/
		header:
		{
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		titleFormat: {
			month: "YYYY년 MMMM",
			// week: "YYYY년 MMM D[YYYY]{'일 ~'[ MMM] D일}",
			// week: "[YYYY]년 MMM D일 - { [YYYY]년 MMM D일}",
			// week: "YYYY년 MMM D일 - YYYY년 MMM D일",		// 몰라 안해
			week: "YYYY년 MMM D일",		// 한글화 되기는 함
			day: "YYYY년 MMMM D일 dddd"
		},
		// columnformat: {
		// 	month: 'ddd',
		// 	week: 'M/D ddd',
		// 	day: 'dddd'
		// },
		allDayDefault: true,
		weekends: true,
		timeFormat: "hh:mm",
		// allDayText: '종일', 
		aixsFormat: 'hh:mm',

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
		// events: eventData,

		/*
			defaultView option used to define which view to show by default,
			for example we have used agendaWeek.
		*/
		defaultView: 'month',
		/*
			selectable:true will enable user to select datetime slot
			selectHelper will add helpers for selectable.
		*/
		selectable: true,
		selectHelper: true,
		/*
			when user select timeslot this option code will execute.
			It has three arguments. Start,end and allDay.
			Start means starting time of event.
			End means ending time of event.
			allDay means if events is for entire day or not.
		*/
		select: function(start, end, allDay)		// dayClick 함수는 클릭이벤트만 있는 반면, select 함수는 드래그이벤트도 있음
		{
			//var dragging;
			$('#addModal').modal
			({
  					title: event.title,
   					content: event.content
			});

			$("#add").off('click').one("click", function() 
			{
				var title = $('#addTitle').val();
				/*if (title)		// 이벤트 추가 다른방법 (원래예제)
				{
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
					);
					// ajax call to store event in DB
				}
				calendar.fullCalendar('unselect');
				});*/
				//var newEvent = null;
				//dragging = true;

				var newEvent = {
	   		        title: title,
	   	    	    start: start,
		   	        end: end,
		   	        allDay: allDay		// 시간인식
	    	    };

	    	    console.log(newEvent.start._d);

				$('#calendar').fullCalendar('renderEvent', newEvent, 'stick');
				$('#addModal').modal('hide');
				// title = $('#title').val('');		// 앞에 썼던 title 내용 초기화, 나중에 썼던 title 내용이 맨 처음 클릭했던 날에만 들어감, 다른 날에는 빈칸으로 들어감
			});

			title = $('#addTitle').val('');		// 앞에 썼던 title 내용 초기화, 나중에 썼던 title 내용이 지금까지 클릭했던 모든 날에 들어감
		

		// enter쳐도 일정 추가가능
			$("#addModal")
	            .off("keydown")
	            .on("keydown", function(evt) {
	                enterKey(evt, "#add");
            });
		},

		eventClick: function(event, calEvent, jsEvent, view, element) 
		{
			//var title = $('#title').val();
  			$('#editModal').modal
  			({
    				title: event.title,
   					content: event.content
   			});

  			$("#edit").off('click').on("click", function() 
  			{
  				var title = $('#editTitle').val();
  				event.title = title;
   				//event.title = event.changetitle;
				$('#calendar').fullCalendar('updateEvent', event);

				console.log(event);
				console.log('[start] : ' + event.start._d);

				$('#editModal').modal('hide');
   			});

   			$("#remove").off('click').one("click", function()
  			{
  				var title = event._id;
    			$('#calendar').fullCalendar('removeEvents', title);
 				//$('#calendar').fullCalendar('addEventSource', newEvent);		// 사용할 경우 function()에 (newEvent)를 해주어야함
				$('#editModal').modal('hide');
				console.log(event._id);
 			});

 			title = $('#editTitle').val(event.title);			// title란에 기존에 입력했던 event의 이름이 나옴

 			/*$("#detail").off('click').on("click", function(){
 				$('detailModal').modal;
 				({
 					title: event.title,
 					content: event.content
 				});

 				$("#editDetail").off('click').on("click", function()
 				{
 					// 수행해야 할 내용

 					$('#detailModal').modal('hide');
 				});

 				$('#editModal').modal('hide');
 			});*/
 			
 			// enter쳐도 일정 수정가능
 			$("#editModal")
                .off("keydown")
                .on("keydown", function(evt) {
                    enterKey(evt, "#edit");
            });

 			// 자세히 버튼을 누름
 			$("#detail").on("click", function(){
 				$('#editModal')
 				.modal('hide')
 				.on('hidden.bs.modal', function(){
 					$("#detailModal").modal('show');		// detailModal 열기
 					$("#editDetail").off('click').one("click", function(){		// 저장 버튼을 누름
 						var title = $('#detailTitle').val();			// 일정 이름
 	
 						event.title = title;

						$('#calendar').fullCalendar('updateEvent', event);
						$('#detailModal').modal('hide');		// 저장 버튼을 누르면 modal이 사라짐
					});
 					$(this).off('hidden.bs.modal');		// detailModal 닫기 (modal을 열고 끈 뒤 다음번에 editModal을 열고 껐을 때 자동으로 detail modal이 뜨는 것을 방지)
 				});
 			});
 			title = $('#detailTitle').val(event.title);			// title란에 기존에 입력했던 event의 이름이 나옴

			// enter쳐도 일정 수정가능
 			$("#detailModal")
                .off("keydown")
                .on("keydown", function(evt) {
                    enterKey(evt, "#editDetail");
                });
        },
		
		/*
			editable: true allow user to edit events.
		*/
		editable: true,		// 드래그로 일정 위치 및 크기 수정
		eventLimit: true,

		/*
			events is the main option for calendar.
			for demo we have added predefined events in json object.
		*/
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Go to Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				// url: 'http://google.com/'
			}
		]
 	});
    function enterKey(evt, buttonId) {
        var keyCode = evt.keyCode || evt.which;
        if(evt.keyCode == 13)
            $(buttonId)
            .trigger("click");
    }

	$(".fc-button-agendaDay").on('click', function() {
		alert("Dd");
		var eventsArray = JSON.stringify((calendar.fullCalendar('clientEvents').map(function(e) {
			return {
				start: e.start,
				end: e.end,
				title: e.title
			};
		})));

		$.ajax({
			url: '/calendar/day',
			type: 'POST',
			data: { events: eventsArray },
			success: function(data) {
				if (data.success) {
					console.log('데이터 전송 성공!!');
				} else {
					console.log('오류 발생!!');
				}
			},
			error: function() {
				console.log('오류 발생2!!');
			}
		});
		

		//var renderedData = new EJS({url:'/calendar/day'}).render({data: eventsArray});
		$(".fc-view-agendaDay").load("/calendar/day");
		//$(".fc-view-agendaDay").load("/calendar/day")
	});	
});
