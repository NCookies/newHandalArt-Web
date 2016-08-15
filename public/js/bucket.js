$(document).ready(function() {
	  $.endlessPaginate({
        paginateOnScroll: true
    });

    function renumberGoals() {

    }

    // $(document).on("click", ".action-delete", function(event){      // 삭제버튼 클릭시
    //     event.preventDefault(); // cancel the default action
    //     var $button = $(this);

    //     var ok = true;
    //     if ( $button.data('ask') == 'yes' ) {
    //         if ( !confirm('Do you really want to delete this goal?') ) {
    //             ok = false;
    //         }
    //     }
    //     if (!ok) return false;

    //     var post_url = $button.attr("href");

    //     $button.addClass("disabled waiting");
    //     $button.parent("li").addClass("disabled");
    //     $button.html('<i class="icon-spinner icon-spin"></i>Remove');

    //     $.ajax({
    //         type: "POST",
    //         url: post_url,
    //         data: {
    //             'csrfmiddlewaretoken': 'aquR4gLVnlxdvbf1rqOPlQZI60yHgBgb'
    //         },
    //         success: function(data){
    //             $button.removeClass('waiting');

    //             $.when($button.closest("li").fadeOut()).done(function() {
    //                 var i = 1;
    //                 $('.item-idx').each(function() {
    //                     if ($(this).is(":visible")) {
    //                         var idx = $(this).html(i);
    //                         i++;
    //                     }
    //                 });
    //             });

    //         }
    //     });
    //     return false;
    // });

    $(".category-filter select").change(function() {
        var ct = $(this).val();
        $("#category_value").html(ct);
        var ul = '#list-view-todo';
        var querystringKey = 'page_i';
        if ( $(this).hasClass('category-completed') ) {
            ul = '#list-view-done';
            querystringKey = 'page_c';
        }
    });



    $('#add-goal').on('click', function() {     // 추가버튼 클릭시 addModal 띄움
        $("#addModal").modal();
    });

    $('#add').on('click', function() {          // 목표를 입력하지 않았을 경우
        if($('#addGoal').val() == ""){
            alert("목표를 입력해주세요");
        }
    });

// $(selector).on('click', function(){

// });



    // $('#edit-goal').on('click', function() {         // 수정버튼 클릭시 editModal 띄움
    //     $("#editModal").modal();
    // });


    $('#add').on('click', function() {
        // var newGoal = $("#addGoal").val();      // 목표이름
        goal = $("#addGoal").val();
        
        var newGoal = {
            goal: goal
        };

        // $("#edit-goal").unbind("click");

        var $li = $('<li class = "item-obj">' 
            + '<div class = "item-tags-hidden" style="display:none;"></div>'
            + '<div class = "photo">'
            + '<img src="/static/images/item_no_photo.png" alt="A - Bucket List Ideas">'
            + '<div class = "clear"></div>'
            + '</div>'
            + '<div class = "item-info">'
            + '<div class = "item-title>'
            + '<h3>'
            + '<a class="item" href="/idea/ywEp/goalname/">'
            + '<span class="item-idx">1. '+ goal +' </span>'
            + '</a></h3>'
            + '</div></div>'
            + '<div class="action-buttons" tabindex="1000">'
            + '<button id = "edit-goal" data-backdrop="true" data-toggle="modal" data-remote="/5806935/edit/" class="bucketgreen btn small action-edit" title="Edit" name = "edit">'
            + '<i class="icon-edit"></i>수정</button>'
            + '<button type="submit" class="btn bucketblue action-mark-completed" data-ask="yes" value="Save" title="Mark item complete" name = "complete">'
            + '<i class="icon-ok"></i>목표 완료확인</button></div>'
            + '<button id = "delete-goal" class="btn bucketred small action-delete" title="Remove" name = "delete">'
            + '<i class="icon-trash"></i></button>'
            + '<div class="clear">'
            + '</div></div></li>');

        $(".content ul").prepend($li);          // 목표는 맨 위에 생성
        // return false;

        $('#addGoal').val('');
    });

    $(".content ul").on('click', '#edit-goal', function() {     // 수정버튼 클릭시 editModal 띄움
        $("#editModal").modal();
    });

    $("#edit").off('click').on('click', function(event) {       // editModal에서 수정버튼 클릭시
        var goal = $('#editGoal').val();
        event.goal = goal;



        $('#editModal').modal('hide');

    });

    

// <input type="submit" value="Save" class="btn bucketblue action-mark-completed">

});