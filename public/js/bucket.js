$(document).ready(function() {
	  $.endlessPaginate({
        paginateOnScroll: true
    });

    function renumberGoals() {

    }

    $(document).on("click", ".action-delete", function(event){
        event.preventDefault(); // cancel the default action
        var $button = $(this);

        var ok = true;
        if ( $button.data('ask') == 'yes' ) {
            if ( !confirm('Do you really want to delete this goal?') ) {
                ok = false;
            }
        }
        if (!ok) return false;

        var post_url = $button.attr("href");

        $button.addClass("disabled waiting");
        $button.parent("li").addClass("disabled");
        $button.html('<i class="icon-spinner icon-spin"></i>Remove');

        $.ajax({
            type: "POST",
            url: post_url,
            data: {
                'csrfmiddlewaretoken': 'aquR4gLVnlxdvbf1rqOPlQZI60yHgBgb'
            },
            success: function(data){
                $button.removeClass('waiting');

                $.when($button.closest("li").fadeOut()).done(function() {
                    var i = 1;
                    $('.item-idx').each(function() {
                        if ($(this).is(":visible")) {
                            var idx = $(this).html(i);
                            i++;
                        }
                    });
                });

            }
        });
        return false;
    });

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

// })
    // $('#add').on('click', function() {          // 목표 추가
    //     var newGoal = $("#list-view-todo>li:last").add();
    //     newGoal.insertAfter($("#list-view-todo>li:last"));

    //     return false;
    // });

    $('#add').on('click', function() {
        var new_goal = $('#addGoal').val();
        $('#list-view-todo').append("<li class = 'item-obj'><div class = 'item-tags-hidden'></div><div class = 'photo'><img = 'image' src='img.gif' alt='서밋' title = '서밋' /><div class = 'clear'></div></div><div class = 'item-info'><div class = 'item-title'><h3><a class = 'item'><span class = 'item-idx></span></a></h3></div></div><div class = 'action-buttons'><button class = 'btn' id = 'edit-goal'><i class = 'icon-edit'></i></button><button class = 'btn'><i class = 'icon-ok'></i></div><button class = 'btn'><i class = 'icon-trash'></i></div></div>" + new_goal + "</li>");

        return false;
    });



    $('#edit-goal').on('click', function() {         // 수정버튼 클릭시 editModal 띄움
        $("#editModal").modal();
    });

    // $('#itemModal').on('click', function() {
    //     $("#finishModal").modal();
    // });




    // $('#add').on('click', function() {           // 내용띄우는 건데 안되는거 보니 망한듯ㅋㅋㅋㅋㅋ
    
    // if ($("#addGoal").val() == ""){
    //         alert("내용을 입력해주세요.");
    //     } 
    //     else {
    //         var goal = $("#addGoal").val();
    //             /*************ul 내부에 li가 하나도 존재하지 않을경우********/
    //             if($("li").length-4 == 0) {
    //                 $("#list-view-todo").html("<li>"
    //                     + "<div class=\"content\">"
    //                     + "<div class = \"photo\">"
    //                     + "<div class = \"clear\">"
    //                     + "</div>"
    //                     + "</div>"
    //                     + "<div class = \"item-info\">"
    //                     + "<div class = \"item-title\">"
    //                     + "<h3>"
    //                     + "<a class = \"item\">"
    //                     + "<span class = \"item-idx\" id=\"addGoal\">"+goal+"</span>"
    //                     + "</a>"
    //                     + "</h3>"
    //                     + "</div>"
    //                     + "</div>"
    //                     + "<div class = \"action-buttons\" tabindex = \"1000\">"
    //                     + "<button id = \"edit-goal\" data-backdrop = \"true\" data-toggle = \"modal\" data-remote = \"/5806935/edit/\" title = \"Edit\" type=\"button\" name=\"edit\" class=\"btn\"><i class = \"icon-edit\"></i>수정</button>"
    //                     + "<button id = \"complete\" data-backdrop = \"true\" data-toggle = \"modal\" \" type=\"button\" name=\"complete\" class=\"btn\"><i class = \"icon-ok\"></i>목표 완료확인</button>"
    //                     + "</div>"
    //                     + "<button data-ask = \"yes\" type= \"button\" title = \"Remove\" name=\"delete\" class = \"btn\"><i class = \"icon-trash\"></i></button>"
    //                     + "<div class = \"clear\">"
    //                     + "</div>"
    //                     + "</div>"
    //                     + "</li>");
    //                 $("#addModal").modal("hide");
    //             }
    //               /*************End ul 내부에 li가 하나도 존재하지 않을경우********/
    //               /*************Modal에서 값을 받아 List 생성**************/
    //             else {
    //                 $("#list-view-todo").children().last().after("<li>"
    //                     + "<div class=\"content\">"
    //                     + "<div class = \"photo\">"
    //                     + "<div class = \"clear\">"
    //                     + "</div>"
    //                     + "</div>"
    //                     + "<div class = \"item-info\">"
    //                     + "<div class = \"item-title\">"
    //                     + "<h3>"
    //                     + "<a class = \"item\">"
    //                     + "<span class = \"item-idx\" id=\"addGoal\">"+goal+"</span>"
    //                     + "</a>"
    //                     + "</h3>"
    //                     + "</div>"
    //                     + "</div>"
    //                     + "<div class = \"action-buttons\" tabindex = \"1000\">"
    //                     + "<button id = \"edit-goal\" data-backdrop = \"true\" data-toggle = \"modal\" title = \"Edit\" type=\"button\" name=\"edit\" class=\"btn\"><i class = \"icon-edit\"></i>수정</button>"
    //                     + "<button id = \"complete\" data-backdrop = \"true\" data-toggle = \"modal\" \" type=\"button\" name=\"complete\" class=\"btn\"><i class = \"icon-ok\"></i>목표 완료확인</button>"
    //                     + "</div>"
    //                     + "<button data-ask = \"yes\" type= \"button\" title = \"Remove\" name=\"delete\" class = \"btn\"><i class = \"icon-trash\"></i></button>"
    //                     + "<div class = \"clear\">"
    //                     + "</div>"
    //                     + "</div>"
    //                     + "</li>");
    //                 $("#addModal").modal("hide");
    //             }
                
    //     } 

    // });
});