//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-collapse");
    }
});