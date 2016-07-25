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

function tdEdit(e) {
  e.stopPropagation();
  var currentEle = $(this);
  $(this).empty();
  var value = $(this).html();
    
  $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
  //$(".thVal").focus();
  $(".thVal").keyup(function (event) {
    if (event.keyCode == 13) {
      $(currentEle).html($(".thVal").val().trim());
    }
  });
}

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
  var $wrapper = $(e.currentTarget).parent();
  $wrapper
    .addClass('active')
    .siblings().addClass('inactive');
}

function dismiss(e) {
  var $wrapper = $(e.currentTarget).closest('li');
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

$('article').on({
  'click': activate,
  'blur': dismiss
});

$('td').on({
  'click': tdEdit,
  'keyup': checkKey
});

$('.dismiss').on('click', dismiss);