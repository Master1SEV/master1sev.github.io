(function(a) {
    skel.breakpoints({
        wide: "(min-width: 961px) and (max-width: 1880px)",
        normal: "(min-width: 961px) and (max-width: 1620px)",
        narrow: "(min-width: 961px) and (max-width: 1320px)",
        narrower: "(max-width: 960px)",
        mobile: "(max-width: 736px)"
    });
    a(function() {
        var e = a(window),
            b = a("body");
        b.addClass("is-loading");
        e.on("load", function() {
            b.removeClass("is-loading")
        });
        9 > skel.vars.IEVersion && a(":last-child").addClass("last-child");
        a("form").placeholder();
        skel.on("+mobile -mobile", function() {
            a.prioritize(".important\\28 mobile\\29",
                skel.breakpoint("mobile").active)
        });
        a(".scrolly").scrolly();
        var d = a("#nav a");
        d.scrolly().on("click", function(b) {
            var c = a(this);
            "#" == c.attr("href")[0] && (b.preventDefault(), d.removeClass("active").addClass("scrollzer-locked"), c.addClass("active"))
        });
        var c = [];
        d.each(function() {
            var b = a(this).attr("href");
            "#" == b[0] && c.push(b.substring(1))
        });
        a.scrollzer(c, {
            pad: 200,
            lastHack: !0
        });
        a('<div id="headerToggle"><a href="#header" class="toggle"></a></div>').appendTo(b);
        a("#header").panel({
            delay: 500,
            hideOnClick: !0,
            hideOnSwipe: !0,
            resetScroll: !0,
            resetForms: !0,
            side: "left",
            target: b,
            visibleClass: "header-visible"
        });
        "wp" == skel.vars.os && 10 > skel.vars.osVersion && a("#headerToggle, #header, #main").css("transition", "none")
    })
})(jQuery);