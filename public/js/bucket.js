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



});

