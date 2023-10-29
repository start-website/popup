$( document ).ready(function() {
    for (var index = 0; index < $('[data-click-show]').length; index++) {
        var elem = $('[data-click-show]')[index];

        $(elem).on( "click", function() {
            var selector_elem_to_show = $(this).attr('data-click-show')
            $(selector_elem_to_show).addClass('show')
        });
    }
    
    for (var index = 0; index < $('[data-click-close]').length; index++) {
        var elem = $('[data-click-close]')[index];

        $(elem).on( "click", function() {
            var selector_elem_to_show  = $(this).attr('data-click-close')
            $(selector_elem_to_show).removeClass('show')
        });
    }

    $('.button-banner-example-1').click(function() {
        $('html, body').animate({
            scrollTop: $(".banner-example-1").offset().top
        }, 100);
    })

    $('.button-banner-example-2').click(function() {
        $('html, body').animate({
            scrollTop: $(".banner-example-2").offset().top
        }, 100);
    })
});