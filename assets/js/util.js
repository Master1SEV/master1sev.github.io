(function(e) {
    e.fn.navList = function() {
        $a = e(this).find("a");
        b = [];
        $a.each(function() {
            var f = e(this),
                d = Math.max(0, f.parents("li").length - 1),
                a = f.attr("href"),
                c = f.attr("target");
            b.push('<a class="link depth-' + d + '"' + ("undefined" !== typeof c && "" != c ? ' target="' + c + '"' : "") + ("undefined" !== typeof a && "" != a ? ' href="' + a + '"' : "") + '><span class="indent-' + d + '"></span>' + f.text() + "</a>")
        });
        return b.join("")
    };
    e.fn.panel = function(f) {
        if (0 == this.length) return a;
        if (1 < this.length) {
            for (var d = 0; d < this.length; d++) e(this[d]).panel(f);
            return a
        }
        var a = e(this),
            d = e("body"),
            c = e(window),
            h = a.attr("id"),
            g;
        g = e.extend({
            delay: 0,
            hideOnClick: !1,
            hideOnEscape: !1,
            hideOnSwipe: !1,
            resetScroll: !1,
            resetForms: !1,
            side: null,
            target: a,
            visibleClass: "visible"
        }, f);
        "jQuery" != typeof g.target && (g.target = e(g.target));
        a._hide = function(c) {
            g.target.hasClass(g.visibleClass) && (c && (c.preventDefault(), c.stopPropagation()), g.target.removeClass(g.visibleClass), window.setTimeout(function() {
                    g.resetScroll && a.scrollTop(0);
                    g.resetForms && a.find("form").each(function() {
                        this.reset()
                    })
                },
                g.delay))
        };
        a.css("-ms-overflow-style", "-ms-autohiding-scrollbar").css("-webkit-overflow-scrolling", "touch");
        g.hideOnClick && (a.find("a").css("-webkit-tap-highlight-color", "rgba(0,0,0,0)"), a.on("click", "a", function(c) {
            var d = e(this),
                f = d.attr("href"),
                l = d.attr("target");
            f && "#" != f && "" != f && f != "#" + h && (c.preventDefault(), c.stopPropagation(), a._hide(), window.setTimeout(function() {
                "_blank" == l ? window.open(f) : window.location.href = f
            }, g.delay + 10))
        }));
        a.on("touchstart", function(c) {
            a.touchPosX = c.originalEvent.touches[0].pageX;
            a.touchPosY = c.originalEvent.touches[0].pageY
        });
        a.on("touchmove", function(c) {
            if (null !== a.touchPosX && null !== a.touchPosY) {
                var e = a.touchPosX - c.originalEvent.touches[0].pageX,
                    d = a.touchPosY - c.originalEvent.touches[0].pageY,
                    f = a.outerHeight(),
                    h = a.get(0).scrollHeight - a.scrollTop();
                if (g.hideOnSwipe) {
                    var k = !1;
                    switch (g.side) {
                        case "left":
                            k = 20 > d && -20 < d && 50 < e;
                            break;
                        case "right":
                            k = 20 > d && -20 < d && -50 > e;
                            break;
                        case "top":
                            k = 20 > e && -20 < e && 50 < d;
                            break;
                        case "bottom":
                            k = 20 > e && -20 < e && -50 > d
                    }
                    if (k) return a.touchPosX = null, a.touchPosY =
                        null, a._hide(), !1
                }
                if (0 > a.scrollTop() && 0 > d || h > f - 2 && h < f + 2 && 0 < d) c.preventDefault(), c.stopPropagation()
            }
        });
        a.on("click touchend touchstart touchmove", function(a) {
            a.stopPropagation()
        });
        a.on("click", 'a[href="#' + h + '"]', function(a) {
            a.preventDefault();
            a.stopPropagation();
            g.target.removeClass(g.visibleClass)
        });
        d.on("click touchend", function(c) {
            a._hide(c)
        });
        d.on("click", 'a[href="#' + h + '"]', function(a) {
            a.preventDefault();
            a.stopPropagation();
            g.target.toggleClass(g.visibleClass)
        });
        if (g.hideOnEscape) c.on("keydown",
            function(c) {
                27 == c.keyCode && a._hide(c)
            });
        return a
    };
    e.fn.placeholder = function() {
        if ("undefined" != typeof document.createElement("input").placeholder) return e(this);
        if (0 == this.length) return d;
        if (1 < this.length) {
            for (var f = 0; f < this.length; f++) e(this[f]).placeholder();
            return d
        }
        var d = e(this);
        d.find("input[type=text],textarea").each(function() {
            var a = e(this);
            "" != a.val() && a.val() != a.attr("placeholder") || a.addClass("polyfill-placeholder").val(a.attr("placeholder"))
        }).on("blur", function() {
            var a = e(this);
            a.attr("name").match(/-polyfill-field$/) ||
                "" == a.val() && a.addClass("polyfill-placeholder").val(a.attr("placeholder"))
        }).on("focus", function() {
            var a = e(this);
            a.attr("name").match(/-polyfill-field$/) || a.val() == a.attr("placeholder") && a.removeClass("polyfill-placeholder").val("")
        });
        d.find("input[type=password]").each(function() {
            var a = e(this),
                c = e(e("<div>").append(a.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, "type=text"));
            "" != a.attr("id") && c.attr("id", a.attr("id") + "-polyfill-field");
            "" != a.attr("name") &&
                c.attr("name", a.attr("name") + "-polyfill-field");
            c.addClass("polyfill-placeholder").val(c.attr("placeholder")).insertAfter(a);
            "" == a.val() ? a.hide() : c.hide();
            a.on("blur", function(c) {
                c.preventDefault();
                c = a.parent().find("input[name=" + a.attr("name") + "-polyfill-field]");
                "" == a.val() && (a.hide(), c.show())
            });
            c.on("focus", function(a) {
                a.preventDefault();
                a = c.parent().find("input[name=" + c.attr("name").replace("-polyfill-field", "") + "]");
                c.hide();
                a.show().focus()
            }).on("keypress", function(a) {
                a.preventDefault();
                c.val("")
            })
        });
        d.on("submit", function() {
            d.find("input[type=text],input[type=password],textarea").each(function(a) {
                a = e(this);
                a.attr("name").match(/-polyfill-field$/) && a.attr("name", "");
                a.val() == a.attr("placeholder") && (a.removeClass("polyfill-placeholder"), a.val(""))
            })
        }).on("reset", function(a) {
            a.preventDefault();
            d.find("select").val(e("option:first").val());
            d.find("input,textarea").each(function() {
                var a = e(this),
                    d;
                a.removeClass("polyfill-placeholder");
                switch (this.type) {
                    case "submit":
                    case "reset":
                        break;
                    case "password":
                        a.val(a.attr("defaultValue"));
                        d = a.parent().find("input[name=" + a.attr("name") + "-polyfill-field]");
                        "" == a.val() ? (a.hide(), d.show()) : (a.show(), d.hide());
                        break;
                    case "checkbox":
                    case "radio":
                        a.attr("checked", a.attr("defaultValue"));
                        break;
                    case "text":
                    case "textarea":
                        a.val(a.attr("defaultValue"));
                        "" == a.val() && (a.addClass("polyfill-placeholder"), a.val(a.attr("placeholder")));
                        break;
                    default:
                        a.val(a.attr("defaultValue"))
                }
            })
        });
        return d
    };
    e.prioritize = function(f, d) {
        "jQuery" != typeof f && (f = e(f));
        f.each(function() {
            var a = e(this),
                c, f = a.parent();
            0 !=
                f.length && (a.data("__prioritize") ? d || (c = a.data("__prioritize"), a.insertAfter(c), a.removeData("__prioritize")) : d && (c = a.prev(), 0 != c.length && (a.prependTo(f), a.data("__prioritize", c))))
        })
    }
})(jQuery);