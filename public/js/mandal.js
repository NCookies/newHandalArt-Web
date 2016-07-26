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

function activeEdit(e) {
  e.stopPropagation();
  var currentEle = $(this);
  var value = $(this).text();
  
  $(currentEle).html('<input class="td_edit" type="text" value="' + value + '" />');
  $(".td_edit").focus();
  $(".td_edit").keyup(function (event) {
  if (event.keyCode == 13) //공백 제거
    $(currentEle).html($(".td_edit").val());
  });

  var dataval = parseInt($('.progress').attr("data-amount"));
    if (dataval < 100) {
        $('.progress .amount').css("width", 100 - dataval + "%");
    }

    // 달성률 체크
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
    }
}

function activate(e) {
  var $wrapper = $(e.currentTarget).parent();
  $wrapper
    .addClass('active')
    .siblings().addClass('inactive');
}

function dismiss(e) {
  console.log("dismiss");
  var $wrapper = $(e.currentTarget).closest('li'); 
  console.log(e.currentTarget);
  $wrapper
    .removeClass('active')
    .siblings().removeClass('inactive');
  e.stopPropagation();
}

function checkKey(e) {
  var $wrapper = $(e.currentTarget).parent();
  var isActive = $wrapper.hasClass('active');
  if (isActive && (e.keyCode === 13 || e.keyCode === 27)) {
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
});

$('td').on({
  'click': activeEdit
});

$('.dismiss').on('click', dismiss);