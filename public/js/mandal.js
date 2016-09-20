$( function() {
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전',
		nextText: '다음',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

  $('.xeditable_text').on('shown', function() {
	  alert("hell");
  });

/*  $(".mandal-mandal-detail-edit").click(function(e){
    e.stopPropagation();
  });*/
  $(".xeditable_text").on("shown", function() {
	  alert("hello");
  })
});  

var needColorPicker = true;

var colorPicker = (function(){
	
	var config = {
		baseColors: [
			[46, 204, 113],
			[52, 152, 219],
			[155, 89, 182],
			[52, 73, 94],
			[241, 196, 15],
			[230, 126, 34],
			[231, 76, 60]
		],
		lightModifier: 20,
		darkModifier: 0,
		transitionDuration: 200,
		transitionDelay: 25,
		variationTotal: 10
	};
	
	var state = {
		activeColor: [0, 0, 0]
	};
	
	function init(){
		createColorPicker(function(){
			appendBaseColors();
		});
		
		addEventListeners();
		
		setFirstColorActive(function(){
			setFirstModifiedColorActive();
		});
	}
	
	function setActiveBaseColor(el){
		$('.color.active').removeClass('active');
		el.addClass('active');
	}
	
	function setActiveColor(el){
		$('.color-var.active').removeClass('active');
		el.addClass('active');
		state.activeColor = el.data('color').split(',');
	}
	
	function addEventListeners(){
		$('body').on('click', '.color', function(){
			var color = $(this).data('color').split(',');
			setActiveBaseColor($(this));
			
			hideVariations(function(){
				createVariations(color, function(){
					setDelays(function(){
						showVariations();
					});
				});
			});
		});
		
		$('body').on('click', '.color-var', function(){
			setActiveColor($(this));
			setBackgroundColor();
		});
	}
	
	function setFirstColorActive(callback){
		$('.color').eq(1).trigger('click');
		callback();
	}
	
	function setFirstModifiedColorActive(){
		setTimeout(function(){
			$('.color-var').eq(7).trigger('click');
		}, 500);
	}
	
	function createColorPicker(callback){
		$('.color-picker').append('<div class="base-colors"></div>');

		// xeditable이 작동하면 생기고 포커스가 없어지면 같이 없어짐.
		$(".xeditable_text").on("show", function() {
			alert(this);
		});

		$('.mandal-mandal-detail-edit').append('<p>목표날짜: <input type="text" id="datepicker"></p>');
		$('.mandal-mandal-detail-edit').append('<div class="varied-colors"></div>');
		$('.mandal-mandal-detail-edit').append('<div class="active-color"></div>');
		$('.mandal-mandal-detail-edit').append('<div class="color-history"></div>');

		callback();
	}
	
	function appendBaseColors(){
		for(i = 0; i < config.baseColors.length; i++){
			$('.base-colors').append('<div class="color" data-color="' + config.baseColors[i].join() + '" style="background-color: rgb(' + config.baseColors[i].join() + ');"></div>');
		}
	};
	
	function setBackgroundColor(){
		$('td').css({
			'background-color': 'rgb(' + state.activeColor + ')'
		});
	}
	
	function createVariations(color, callback){
		$('.varied-colors').html('');
		
		for(var i = 0; i < config.variationTotal; i++){
			var newColor = [];
			
			for (var x = 0; x < color.length; x++){
				var modifiedColor = (Number(color[x]) + 100) - (config.lightModifier * i);
				
				if(modifiedColor <= 0){
					modifiedColor = 0;
				} else if (modifiedColor >= 255){
					modifiedColor = 255;
				}
				
				newColor.push(modifiedColor);
			}
			
			$('.varied-colors').append('<div data-color="' + newColor + '" class="color-var" style="background-color: rgb(' + newColor + ');"></div>');
		}
		
		callback();
	}
	
	function setDelays(callback){
		$('.color-var').each(function(x){
			$(this).css({
				'transition': 'transform ' + (config.transitionDuration / 1000) + 's ' + ((config.transitionDelay / 1000) * x) + 's'
			});
		});
		
		callback();
	}
	
	function showVariations(){
		setTimeout(function(){
			$('.color-var').addClass('visible');
		},(config.transitionDelay * config.variationTotal));
	}
	
	function hideVariations(callback){
		$('.color-var').removeClass('visible').removeClass('active');
		
		setTimeout(function(){
			callback();
		},(config.transitionDelay * config.variationTotal));
	}
	
	return{
		init: init
	};
	
}());

var app = angular.module("app", ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';		
  colorPicker.init();	
});

app.controller('Ctrl', function($scope, $filter) {
  $scope.user = {
    title: '',
    desc: ''
  };

  $scope.contents = [{  
    mandal_col1: 'oen',
    mandal_col2: 'two',
    mandal_col3: 'three',
    mandal_col4: 'four',
    mandal_col5: 'five',
    mandal_col6: 'six',
    mandal_col7: 'seven',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: '1234',
    mandal_col4: '45',
    mandal_col5: '4',
    mandal_col6: '4',
    mandal_col7: '4',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: 'oen',
    mandal_col2: 'two',
    mandal_col3: 'three',
    mandal_col4: 'four',
    mandal_col5: 'five',
    mandal_col6: 'six',
    mandal_col7: 'seven',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: 'oen',
    mandal_col2: 'two',
    mandal_col3: 'three',
    mandal_col4: 'test',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: 'oen',
    mandal_col2: 'two',
    mandal_col3: 'three',
    mandal_col4: 'four',
    mandal_col5: 'colum5'
  }, {  
    mandal_col5: 'five',
    mandal_col6: 'six',
    mandal_col7: 'seven',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: 'oen',
    mandal_col2: 'two',
    mandal_col3: 'fgdg',
    mandal_col4: 'fdg',
    mandal_col5: 'cc',
    mandal_col6: 'ww',
    mandal_col7: 'seven',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: 'fggf',
    mandal_col2: 'two',
    mandal_col3: 'three',
    mandal_col4: 'fgg',
    mandal_col5: 'five',
    mandal_col6: 'adf',
    mandal_col7: 'xg',
    mandal_col8: 8,
    mandal_col9: 9
  }, {  
    mandal_col1: 'oen',
    mandal_col3: 'three',
    mandal_col4: 'four',
    mandal_col5: 'five',
    mandal_col6: 'six',
    mandal_col8: 8,
    mandal_col9: 'sdfs'
  }];

	$scope.contents[1].mandal_col2 = $scope.contents[4].mandal_col5;
});	