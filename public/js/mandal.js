function activate(e) {
  var $wrapper = $(e.currentTarget).parent();
  $wrapper
    .addClass('active')
    .siblings().addClass('inactive');
  
  $('td').on('click', function() {
    // tab is move

    // enter is complete edit

    // can edit
    console.log("ckouc");

    // send database
  });
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
