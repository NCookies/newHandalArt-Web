function funLoad() {
  // 창 크기에 맞춰서 사이즈 조정
	var Cheight = $(window).height()-500;
	alert(Cheight);
	$('#calendar').css({'height':Cheight+'px'});
//아래는 실행시 필요
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
  'blur': dismiss,
  'keyup': checkKey
});

$('.dismiss').on('click', dismiss);