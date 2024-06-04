var FaCommon = {
    windowMode: "big",
    init: function () {
        this.handleBookmarks();
        this.positionElements()
    },
    handleBookmarks: function () {
        var a = $("#fa_bookmark_text");
        a.attr("title", a.html())
    },
    positionElements: function () {
        this.centerPage();
        if ($("#registration-form .bgc_signup_form_newsletterPartner").length > 0) {
            var a = $("#eventplace").find("div").addClass("longTerms")
        }
        this.positionStory();
        FaCommon.positioned = true
    },
    centerPage: function () {
        var b = $(document).width();
        var a = $(window).width();
        $(window).scrollLeft(b / 2 - a / 2)
    },
    positionStory: function () {
        var a = $("#farmerama-home-story .content"),
            c = 0 < a.length,
            e, b, d;
        if (c) {
            e = a.offset();
            b = e.top;
            d = e.left;
            $("#story").css("top", b + "px");
            $("#story").css("left", d + "px")
        }
    },
};