$( function() {
  $( "#datepicker" ).datepicker({
      dateFormat: 'yy-mm-dd', // 데이터는 yyyy-MM-dd로 나옴
      closeText: '닫기',
      prevText: '이전달',
      nextText: '다음달',
      currentText: '오늘',
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      changeMonth: true,
      changeYear: true,
      minDate: -20
  });
});

function funLoad() {
  // 창 크기에 맞춰서 사이즈 조정
  var Cheight = $(window).height()-500;
  alert(Cheight);
  $('.mandal-view-section').css({'height':Cheight+'px'});
  $('.mandal-mandal-section').css({'height':Cheight+'px'});
  //window.onload = funLoad;
  //window.onresize = funLoad;  
}

function activate(e) {
  console.log($(this).index(this));
  var $wrapper = $(e.currentTarget).parent();
  $wrapper
    .addClass('active')
    .siblings().addClass('inactive');
  
$('td').on("click", function(e) {
  e.stopPropagation();
  var currentEle = $(this);
  var value = $(this).text();

  $('.slider-text-inner').css("border", "yellow");

  var dataval = parseInt($(currentEle).attr("data-amount"));
  if(dataval == undefined || dataval == NaN) dataval = 0;

  $(currentEle).html('<input class="td_edit" data-amount="0" type="text" value="' + value + '" />');
  $(".td_edit").focus();

  //$(".slider-text-inner")
  // 달성률 설정
  $(".slider-text-inner").html('<p>목표날짜: <input type="text" id="datepicker"></p>' +
                  '달성률: <button id="decrease" class="btn btn-info">-</button>' +
                  '<div class="progress" data-amount="' + dataval + '">' +
                  '<div class="amount"></div></div>' +
                  '<button id="increase" class="btn btn-danger">+</button>');
    
    if (dataval < 100) {
        $('.progress .amount').css("width", 100 - dataval + "%");
    }
    
    $('#increase').click(function () {
        modifyProgressVal(1);
    });
    $('#decrease').click(function () {
        modifyProgressVal(-1);
    });

    function modifyProgressVal(type) {
        dataval = parseInt($('.progress').attr("data-amount"));
        if (type == 1) dataval = Math.min(100,dataval + 10)
        else if (type == -1) dataval = Math.max(0,dataval - 10);
        $('.progress .amount').css("width", 100 - dataval + "%");
        $('.progress').attr("data-amount", dataval);
        $(currentEle).attr("data-amount", dataval);
    }

    $(".td_edit").keyup(function (event) {
      if (event.keyCode == 13) {
        //공백제거 후 표의 이름을 저장, 퍼센트 저장
        $(currentEle).html($(".td_edit").val()).attr("data-amount",dataval);
        //입력폼 삭제
        $(".slider-text-inner").remove();
      }
    });    
  });
}

function dismiss(e) {
  console.log("dismiss");
  var $wrapper = $(e.currentTarget).closest('li');
  $wrapper
    .removeClass('active')
    .siblings().removeClass('inactive');
  e.stopPropagation();
}

function checkKey(e) {
  var $wrapper = $(e.currentTarget).parent();
  var isActive = $wrapper.hasClass('active');
  if (isActive && e.keyCode === 27) {
    // active and hit enter or escape
    dismiss(e);
  } else if (!isActive && e.keyCode === 13) {
    // not active and hit enter
    activate(e);
  }
}

$(document).click(function(e) { 
  // article 밖을 클릭하면 제거
  if($(e.target).closest("#mandal-tables").attr("id") != "mandal-tables") 
    dismiss(e);
});    

$('article').on({ 
  'click': activate,
  'keyup': checkKey
});

$('.dismiss').on('click', dismiss);