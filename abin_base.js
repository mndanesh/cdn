
var mainClone, mode = "production",
    config = {
        production: {
            baseURL: "https://abin.ir/api/web",
            newBaseURL: "https://newapi.abin.ir/api",
            basketURL: "/basket/",
            oldBaseURL: "https://abin.ir",
            search: {
                minChars: 2,
                action: "/product",
                method: "GET"
            },
            suggestion: {
                minChars: 1,
                action: "/product/LiveSearchResult",
                method: "GET"
            }
        },
        development: {
            baseURL: "https://abin.ir/api/web",
            oldBaseURL: "https://abin.ir",
            search: {
                minChars: 2,
                action: "/product",
                method: "GET"
            },
            suggestion: {
                minChars: 1,
                action: "/product/LiveSearchResult",
                method: "GET"
            }
        }
    };

function fetchProducts(e, t, i) {
    var n = new XMLHttpRequest;
    n.addEventListener("load", function(e) {
        var i = JSON.parse(event.target.responseText);
        t && t(n, i)
    }), n.addEventListener("error", function(e) {
        t(n, response)
    }), n.open(config[mode].search.method, config[mode].newBaseURL + config[mode].search.action + "?" + e), i && (i.hidden = !1), n.send()
}
window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
    var t, i = (this.document || this.ownerDocument).querySelectorAll(e),
        n = this;
    do
        for (t = i.length; 0 <= --t && i.item(t) !== n;); while (t < 0 && (n = n.parentElement));
    return n
}), Number.prototype.pad = function(e) {
    return ("0" + this).slice(-2)
}, String.prototype.truncate = String.prototype.truncate || function(e, t) {
    if (this.length <= e) return this;
    let i = this.substr(0, e - 1);
    return (t ? i.substr(0, i.lastIndexOf(" ")) : i) + "&hellip;"
};
var timers = [];

function startTimers(e) {
    var t = e.querySelector(".countdown");
    timers.push(new easytimer.Timer), e = t.innerHTML.split(":"), timers[timers.length - 1].start({
        countdown: !0,
        startValues: {
            seconds: 3600 * parseInt(e[0]) + 60 * parseInt(e[1]) + parseInt(e[2])
        }
    }), timers[timers.length - 1].el = t, timers[timers.length - 1].addEventListener("secondsUpdated", function(e) {
        (e = e.detail.timer).el.innerHTML = '<span class="px-1">' + e.getTimeValues().hours.pad() + '</span>:<span class="px-1">' + e.getTimeValues().minutes.pad() + '</span>:<span class="px-1">' + e.getTimeValues().seconds.pad() + "</span>"
    })
}

function fillGridProducts(e, t, i, n, r, s) {
    if (n) {
        i.innerHTML = "", r && (r.hidden = !0);
        var o = mainClone.querySelector(".error").cloneNode(!0);
        return i.appendChild(o), !1
    }
    r && (r.hidden = !0), i.innerHTML = "";
    var a = e.Count;
    if (n = parseInt(t.elements.page.value), t = parseInt(t.elements.page_size.value), s && s.scrollIntoView && s.scrollIntoView(), 0 < a && e.Products.length)
        for (var l in e.Products) {
            var c = e.Products[l],
                d = mainClone.querySelector("article.product-item").cloneNode(!0);
            d.setAttribute("itemtype", d.getAttribute("data-itemtype")), d.setAttribute("itemscope", ""), d.removeAttribute("data-itemtype"), d.removeAttribute("data-itemscope");
            var u = d.querySelectorAll("[data-itemtype]");
            for (l = 0; l < u.length; l++) {
                var h = u[l].getAttribute("data-itemtype");
                u[l].removeAttribute("data-itemtype"), u[l].setAttribute("itemtype", h)
            }
            var p = d.querySelectorAll("[data-itemscope]");
            for (l = 0; l < p.length; l++) p[l].removeAttribute("data-itemscope"), p[l].setAttribute("itemscope", "");
            var f = d.querySelector(".price:not(.discount-price)"),
                m = d.querySelector(".discount"),
                g = d.querySelector(".discount-price-wrapper");
            c.CallForPrice ? (d.classList.add("unavailable"), d.classList.add("call-for-price"), f.hidden = !0) : c.InStock <= 0 ? (d.classList.add("unavailable"), f.hidden = !0) : (0 < c.DiscountPrice ? (f.querySelector("span:first-child").innerHTML = new Intl.NumberFormat("fa-FA").format(c.DiscountPrice), g.querySelector("span:first-child").innerHTML = c.PriceDisplayText, g.hidden = m.parentNode.hidden = !1) : (f.querySelector("span:first-child").innerHTML = c.PriceDisplayText, g.querySelector("span:first-child").innerHTML = c.PriceDisplayText), c.DiscountPrice && c.Price != c.DiscountPrice ? (m.innerHTML = Math.floor((c.Price - c.DiscountPrice) / c.Price * 100) + "٪", g.querySelector('[itemprop="priceValidUntil"]').content = c.DiscountExpireTimeG) : (m.classList.add("invisible"), g.hidden = !0)), c.IsSuggested && 0 < c.InStock && (d.classList.add("special"), g = Math.floor((y = Math.ceil((v = Math.abs(new Date(c.SuggestionExpireTimeG) - new Date)) / 1e3)) / 60 / 60), v = Math.floor((y - 60 * g * 60) / 60), y = Math.floor(y - 60 * g * 60 - 60 * v), d.querySelector(".countdown").innerHTML = g + ":" + v + ":" + y, startTimers(d)), d.querySelector('[itemprop="brand"] [itemprop="name"]').content = c.BrandName, d.querySelector('[itemprop="sku"]').content = c.Id;
            var v = d.querySelector('a[itemprop="url"]');
            v.href = c.Url;
            var y = v.querySelector('img[itemprop="image"]');
            y.src = c.ThumbImage, v.querySelector(".title").innerHTML = y.alt = y.title = v.title = c.Name, (y = v.querySelector("img.brand")).src = c.BrandImageUrl, y.title = y.alt = c.BrandName, y = v.querySelector(".rating"), 0 < c.Rate ? (y.querySelector("[data-star]").setAttribute("data-star", c.Rate), y.querySelector('[itemprop="ratingValue"]').innerHTML = c.Rate, y.querySelector('[itemprop="reviewCount"]').content = c.ReviewCount) : (window.outerWidth < 991 && (y.hidden = !0), y.innerHTML = "", y.removeAttribute("itemtype"), y.removeAttribute("itemprop"), y.removeAttribute("itemscope")), v.querySelector('[itemprop="description"]').content = c.DescriptionText, i.appendChild(d)
        } else i.innerHTML = "", r && (r.hidden = !0), o = mainClone.querySelector(".not-found").cloneNode(!0), i.appendChild(o);
    pagination(paging, a, n, t);
    var b = document.querySelectorAll(".product-count .count");
    for (l = 0; l < b.length; l++) b[l].innerHTML = a
}
window.addEventListener("load", function() {
    mainClone = document.querySelector("#main-clone");
    var e, t, i, n, r, s, o, a = document.querySelector("#main-header");

    function l() {
        d(), s.classList.add("show")
    }

    function c() {
        r.innerHTML = ""
    }

    function d() {
        searchLoading.hidden = !0, searchError.hidden = !0, searchNotFound.hidden = !0, s.classList.remove("show"), r.parentNode.classList.add("show")
    }

    function u() {
        searchLoading.hidden = !0, searchError.hidden = !0, setTimeout(function() {
            searchNotFound.hidden = !1, r.parentNode.classList.remove("show"), console.log("b10")
        }, 100)
    }

    function h() {
        var e = i.value;
        t.elements.type.value, c(), e.length >= config[mode].suggestion.minChars ? (searchLoading.hidden = !1, o && o.abort(), e = config[mode].oldBaseURL + config[mode].suggestion.action + "?keyword=" + e, (o = new XMLHttpRequest).open("GET", e, !0), o.onload = function() {
            if (200 <= this.status && this.status < 400) {
                if (this.response) {
                    var e = JSON.parse(this.response);
                    if (e && e.length) {
                        for (var t = 0; t < e.length; t++) {
                            var i = n.querySelector(".suggestion").cloneNode(!0),
                                s = e[t].word,
                                o = e[t].sub;
                            if (i.querySelector(".word").innerHTML = s, i.querySelector(".word").href = e[t].url || "/", o) {
                                var a = n.querySelector(".sub-suggestion").cloneNode(!0),
                                    l = o.header;
                                if (a.querySelector("header").innerHTML = l, o.products)
                                    for (var c = o.products, h = 0; h < c.length; h++) {
                                        var p = n.querySelector(".product").cloneNode(!0);
                                        p.querySelector(".label").innerHTML = c[h].title, p.querySelector(".cat").innerHTML = s, p.querySelector("a").title = c[h].title, p.querySelector("a").href = c[h].url || "/", a.querySelector("ul").appendChild(p)
                                    }
                                i.appendChild(a)
                            }
                            r.appendChild(i)
                        }
                        d()
                    } else u()
                }
            } else searchLoading.hidden = !0, searchError.hidden = !0, searchNotFound.hidden = !1
        }, o.onerror = o.ontimeout = function() {
            searchLoading.hidden = !0, searchError.hidden = !1, searchNotFound.hidden = !0
        }, o.send()) : (c(), l())
    }

    function p() {
        document.documentElement.scrollTop >= e.clientHeight + 50 ? e.classList.add("min") : e.classList.remove("min")
    }
    a && (t = (e = a.querySelector("#search-bar")).querySelector("#search-form"), i = e.querySelector("#search-field"), n = a.querySelector("#suggestion-clone"), r = a.querySelector("#autocomplete-suggestions > ul"), (s = a.querySelector("#recent-search")).querySelector("#recent-search .items"), $(document).mouseup(function(e) {
        var t = $("#autocomplete-suggestions");
        t.is(e.target) || 0 !== t.has(e.target).length || u()
    }), i.addEventListener("blur", function(e) {}), i.addEventListener("keyup", function(e) {
        var t = event.keyCode;
        40 == t ? (0 == $(".suggestion[active]").length ? $(".suggestion:first()").attr("active", "1").css("background", "#f7f7f7") : ($(".suggestion[active]").next().attr("active", "1").css("background", "#f7f7f7"), $(".suggestion[active]").prev().removeAttr("active", "1").css("background", "")), i.value = $(".suggestion[active]")[0].innerText.replace("نمایش همه نتایج مربوط به", "")) : 38 == t ? (0 == $(".suggestion[active]").length || ($(".suggestion[active]").prev().attr("active", "1").css("background", "#f7f7f7"), $(".suggestion[active]").next().removeAttr("active", "1").css("background", "")), i.value = $(".suggestion[active]")[0].innerText.replace("نمایش همه نتایج مربوط به", "")) : h()
    }), i.addEventListener("click", function(e) {
        setTimeout(h, 100)
    }), i.addEventListener("focus", function(e) {
        l(), h()
    }));
    var f = document.querySelector("#type-wrapper .dropdown");
    if (f)
        for (var m = document.querySelector("#type-input"), g = f.querySelectorAll("#type-wrapper .dropdown-item"), v = 0; v < g.length; v++) g[v].addEventListener("click", function(e) {
            e.preventDefault(), f.querySelector(".active").classList.remove("active"), this.classList.add("active");
            var t = this.dataset.value;
            e = this.innerHTML, m.value = t, f.querySelector(".dropdown-toggle").innerHTML = e
        });
    var y = document.querySelectorAll(".product-slider:not(.individual):not(.lazy)");
    for (v = 0; v < y.length; v++) generateProductSlider(y[v]);
    var b = document.querySelector("#show-less");
    if (b && (document.querySelector("#show-more").addEventListener("click", function(e) {
            e.preventDefault(), this.parentNode.querySelector(".paragraph-more").classList.add("show"), b.hidden = !1
        }), b.addEventListener("click", function(e) {
            e.preventDefault(), this.parentNode.querySelector(".paragraph-more").classList.remove("show"), b.hidden = !0
        })), 991 < window.outerWidth && f && (window.addEventListener("scroll", p), p()), window.outerWidth < 991) {
        var w = document.querySelector("#sidebar-category");
        if (w) {
            var _ = document.querySelector("#main-nav > ul.menu");
            if (_) {
                w.appendChild(_.cloneNode(!0));
                var E = _.querySelectorAll(".row");
                for (v in E) E.hasOwnProperty(v) && E[v].parentNode.removeChild(E[v])
            }
        }
        var T = document.querySelectorAll("#sidebar-category ul.menu  > li > a");
        for (v = 0; v < T.length; v++) T[v].removeAttribute("data-sidebar");
        (_ = document.querySelector("#sidebar-basket")) && _.appendChild(document.querySelector("#basket"));
        var x = document.querySelectorAll("#mobile-sidebar ul.menu li > a:not(:last-child)");
        for (v = 0; v < x.length; v++) x[v].addEventListener("click", function(e) {
            e.preventDefault(), this.parentNode.classList.toggle("active")
        });
        var S = document.querySelector("#mobile-menu"),
            C = document.querySelector("#mobile-sidebar"),
            L = document.querySelectorAll("a[data-sidebar]"),
            k = document.querySelector("#main-nav");

        function D() {
            var e = S.querySelector(".menu-item.active");
            e && (e = e || k.querySelector(".active")) && e.classList.remove("active")
        }
        for (v = 0; v < L.length; v++) L[v].addEventListener("click", function(e) {
            e.preventDefault(), D(), this.classList.add("active");
            var t = this.dataset.sidebar;
            if (t && ((e = document.querySelector(".sidebar.show")) && (e.classList.remove("show"), console.log("b4")), document.querySelector("#" + t).classList.add("show"), !this.dataset.privateSidebar)) {
                C.classList.add("show"), console.log("b3");
                for (var i = C.querySelectorAll(".header .title > span[data-title]"), n = 0; n < i.length; n++) i[n].hidden = !0;
                C.querySelector('.header .title > span[data-title="' + t + '"]').hidden = !1
            }
        });
        C && (C.querySelector("#return-sidebar").addEventListener("click", function(e) {
            e.preventDefault(), C.classList.remove("show"), console.log("b1"), D()
        }), C.querySelector(".search").addEventListener("click", function(e) {
            e.preventDefault(), C.classList.remove("show"), console.log("b"), i.focus()
        }));
        var A = document.querySelectorAll(".mobile-sidebar");
        if (A)
            for (v = 0; v < A.length; v++) A[v].querySelector(".close-sidebar").addEventListener("click", function(e) {
                e.preventDefault(), console.log("b2"), this.closest(".mobile-sidebar").classList.remove("show")
            });
        i && (i.addEventListener("focus", function() {
            a.classList.add("focus-in")
        }), i.addEventListener("focusout", function() {
            setTimeout(function() {
                a.classList.remove("focus-in")
            }, 100)
        }))
    }
    $('[data-toggle="tooltip"]').tooltip();
    var I = document.querySelectorAll(".starrr");
    for (v = 0; v < I.length; v++) $(I[v]).starrr({
        rating: parseInt(I[v].dataset.star),
        readOnly: !0
    });
    var P = new IntersectionObserver(e => {
            e.forEach(e => {
                if (e.isIntersecting) {
                    var t = e.target;
                    if (!t.classList.contains("lazy")) return !1;
                    var i = new XMLHttpRequest,
                        n = t.querySelector(".swiper-wrapper");
                    e = {
                        $format: "json",
                        page_size: "12",
                        page: 0,
                        instock: !0,
                        random: !1,
                        force_price: !1,
                        topsale: !1
                    }, t.dataset.carouselpackageid && (e.carousel_packageid = t.dataset.carouselpackageid), t.dataset.random && (e.random = t.dataset.random), t.dataset.priceForce && (e.force_price = t.dataset.priceForce), t.dataset.topsale && (e.topsale = t.dataset.topsale), t.dataset.categoryId && (e.category_id = t.dataset.categoryId), t.dataset.sortBy && (e.sortBy = t.dataset.sortBy), t.dataset.orderBy && (e.orderBy = t.dataset.orderBy), e = objectAsQueryString(e), i.addEventListener("load", function(e) {
                        var i = JSON.parse(event.target.responseText);
                        for (a in t.classList.remove("lazy"), n.innerHTML = "", i.Products) {
                            var r = i.Products[a],
                                s = mainClone.querySelector(".product-item.swiper-slide").cloneNode(!0);
                            s.setAttribute("itemtype", s.getAttribute("data-itemtype")), s.setAttribute("itemscope", ""), s.removeAttribute("data-itemtype"), s.removeAttribute("data-itemscope");
                            for (var o = s.querySelectorAll("[data-itemtype]"), a = 0; a < o.length; a++) {
                                var l = o[a].getAttribute("data-itemtype");
                                o[a].removeAttribute("data-itemtype"), o[a].setAttribute("itemtype", l)
                            }
                            var c = s.querySelectorAll("[data-itemscope]");
                            for (a = 0; a < c.length; a++) c[a].removeAttribute("itemscope"), c[a].setAttribute("itemscope", "");
                            s.querySelector('[itemprop="brand"] [itemprop="name"]').content = r.BrandName, s.querySelector('[itemprop="sku"]').content = r.Id;
                            var d = s.querySelector('a[itemprop="url"]');
                            d.href = r.Url;
                            var u = s.querySelector('img[itemprop="image"]');
                            u.src = r.ThumbImage, d.querySelector(".title").innerHTML = u.alt = u.title = d.title = r.Name;
                            var h = s.querySelector("img.brand");
                            h.src = r.BrandImageUrl, h.title = h.alt = r.BrandName, u = d.querySelector(".rating"), 0 < r.Rate ? (u.querySelector("[data-star]").setAttribute("data-star", r.Rate), u.querySelector('[itemprop="ratingValue"]').innerHTML = r.Rate, u.querySelector('[itemprop="reviewCount"]').content = r.ReviewCount) : (u.innerHTML = "", u.removeAttribute("itemtype"), u.removeAttribute("itemprop"), u.removeAttribute("itemscope")), s.querySelector('[itemprop="description"]').content = r.DescriptionText, h = s.querySelector(".price"), d = s.querySelector(".discount"), u = s.querySelector(".discount-price-wrapper"), r.CallForPrice ? (s.classList.add("unavailable"), s.classList.add("call-for-price"), d.hidden = h.parentNode.hidden = !0) : r.InStock <= 0 ? (s.classList.add("unavailable"), d.hidden = h.parentNode.hidden = !0) : (0 < r.DiscountPrice ? h.querySelector("span:first-child").innerHTML = new Intl.NumberFormat("fa-FA").format(r.DiscountPrice) : h.querySelector("span:first-child").innerHTML = r.PriceDisplayText, u.querySelector("span:first-child").innerHTML = r.PriceDisplayText, r.DiscountPrice && r.Price != r.DiscountPrice ? (d.innerHTML = Math.floor((r.Price - r.DiscountPrice) / r.Price * 100) + "%", u.querySelector("span:first-child").innerHTML = new Intl.NumberFormat("fa-FA").format(r.Price), u.querySelector('[itemprop="priceValidUntil"]').content = r.DiscountExpireTimeG) : (d.classList.add("invisible"), u.hidden = !0)), n.appendChild(s)
                        }
                        generateProductSlider(n.closest(".product-slider"))
                    }), i.onerror = function() {
                        var e = mainClone.querySelector(".error").cloneNode(!0);
                        n.innerHTML = "", n.appendChild(e)
                    }, i.open("GET", config[mode].newBaseURL + "/product" + ("development" == mode ? ".json" : "") + "?" + e), i.send()
                }
            })
        }),
        N = document.querySelectorAll("div.product-slider.lazy");
    for (v = 0; v < N.length; v++) P.observe(N[v]);
    var O = document.querySelector("#toast-wrapper");
    $(".toast").toast({
        delay: 5e3
    }).on("show.bs.toast", function() {
        O.style.display = "block"
    }).on("hidden.bs.toast", function() {
        O.style.display = "none"
    });
    var M = document.querySelectorAll(".btn-add-basket");
    for (v = 0; v < M.length; v++) M[v].addEventListener("click", function(e) {
        e.preventDefault(), addBasket(this)
    });
    var H = new IntersectionObserver((e, t) => {
        e.forEach(e => {
            e.isIntersecting && ((e = e.target).src = e.dataset.src)
        })
    });
    if (window.setTimeout(function() {
            for (var e = document.querySelectorAll("img.lazy"), t = 0; t < e.length; t++) e[t].classList.contains("load-after-window") ? (e[t].removeAttribute("loading"), e[t].src = e[t].dataset.src) : H.observe(e[t])
        }, 100), _ = document.querySelector("#article-nav")) {
        var q = _.querySelector(".list-items .more");
        q && q.addEventListener("click", function(e) {
            e.preventDefault(), q.classList.add("clicked")
        });
        var z = _.querySelectorAll("a.list-item");
        for (v = 0; v < z.length; v++) z[v].addEventListener("click", function(e) {
            e.preventDefault(), (e = document.querySelector(this.getAttribute("href"))) && e.scrollIntoView()
        })
    }
});
var commentsEl, commentsWrapper = document.querySelector("#comments");

function likeDislike(e) {
    e.preventDefault();
    var t = e.target.closest("a"),
        i = t.classList.contains("like") ? "like" : "dislike";
    (e = t.closest(".comment").querySelector("like" == i ? ".dislike" : ".like")).classList.contains("selected") && (e.classList.remove("selected"), (s = e.closest("div").querySelector(".value")).innerHTML = parseInt(s.innerHTML) - 1);
    var n = t.closest("div").querySelector(".value"),
        r = t.classList.contains("selected") ? -1 : 1;
    n.innerHTML = parseInt(n.innerHTML) + r, t.classList.toggle("selected");
    var s = new XMLHttpRequest;

    function o() {
        $("#comment-toast-error").toast("show"), n.innerHTML = parseInt(n.innerHTML) - r, t.classList.toggle("selected")
    }
    s.addEventListener("load", function(e) {
        200 <= this.status && this.status < 400 ? ($("#comment-toast").toast("show"), JSON.parse(this.response)) : o()
    }), s.addEventListener("error", function(e) {
        o()
    }), s.open("POST", config[mode].baseURL + "/productcommentvote/" + (1 == r ? "" : "Remove") + ("like" == i ? "VoteUp" : "VoteDown") + "Comment?id=" + t.closest(".row.comment").dataset.commentId), s.send()
}

function fillComments(e) {
    for (var t = mainClone.querySelector(".row.comment"), i = 0; i < e.length; i++) {
        var n = e[i],
            r = t.cloneNode(!0);
        r.dataset.commentId = n.Id;
        var s = r.querySelector(".img img");
        if (s.alt = s.title = n.SenderName, s.src = n.SenderProfileImage, r.querySelector(".sender-name").innerHTML = n.SenderName, (p = r.querySelector("time")).setAttribute("time", n.Date), p.innerHTML = n.Date.substring(0, 10), s = n.Date.substring(11, n.Date.length).split(" "), r.querySelector(".time").innerHTML = s[0] + " " + ("PM" == s[1] ? "ب.ظ" : "ق.ظ"), n.IsBuyer && r.querySelector(".buyed") ? r.querySelector(".buyed").hidden = !1 : r.querySelector(".guest").hidden = !0, n.IsBuyer ? r.querySelector(".price .val").innerHTML = new Intl.NumberFormat("fa-FA").format(n.BuyPrice) : r.querySelector(".price").hidden = !0, n.GoodPoints && n.GoodPoints.length) {
            var o = r.querySelector(".advantages");
            o.hidden = !1;
            for (var a = 0; a < n.GoodPoints.length; a++)(c = document.createElement("li")).innerHTML = n.GoodPoints[a].PointText, o.querySelector("ul").appendChild(c)
        }
        if (n.BadPoints && n.BadPoints.length) {
            var l = r.querySelector(".disadvantages");
            l.hidden = !1;
            for (var c, d = 0; d < n.BadPoints.length; d++)(c = document.createElement("li")).innerHTML = n.BadPoints[d].PointText, l.querySelector("ul").appendChild(c)
        }
        if (n.Replies && n.Replies.length) {
            var u = r.querySelector(".replies");
            u.hidden = !1;
            for (var h = 0; h < n.Replies.length; h++) {
                var p, f = n.Replies[h],
                    m = r.querySelector(".comment-reply").cloneNode(!0);
                m.hidden = !1, m.querySelector(".sender-name").innerHTML = f.SenderName, (p = m.querySelector("time")).setAttribute("time", f.Date), p.innerHTML = f.Date.substring(0, 10), m.querySelector(".body").innerHTML = f.Body, u.appendChild(m)
            }
        }
        r.querySelector(".subject > .title").innerHTML = n.Subject, (s = r.querySelector(".rating")).querySelector(".starrr").setAttribute("data-star", n.TotalRate), s.querySelector(".text-hide").innerHTML = n.TotalRate, r.querySelector(".body").innerHTML = n.CommentBody, r.querySelector(".reply").addEventListener("click", function(e) {
            e.preventDefault(), formComment.elements.parentId.value = n.Id, $(commentModal).modal("show")
        }), (s = r.querySelector(".like-wrapper")).querySelector(".like-rate .value").innerHTML = n.RateUp, s.querySelector(".dislike-rate .value").innerHTML = n.RateDown, n.TurnVoteUpOn && s.querySelector(".like").classList.add("selected"), s.querySelector(".like").addEventListener("click", function(e) {
            likeDislike(e)
        }), s.querySelector(".dislike").addEventListener("click", function(e) {
            likeDislike(e)
        }), n.TurnVoteDownOn && s.querySelector(".dislike").classList.add("selected"), commentsEl.appendChild(r)
    }
}

function buildPageItem(e, t, i) {
    var n = document.createElement("li");
    return n.classList.add("page-item"), "active" == t && n.classList.add("active"), (t = document.createElement("a")).classList.add("page-link"), t.href = "#", t.addEventListener("click", function(t) {
        t.preventDefault(), (t = i.closest("form")).elements.page.value = e, t.dispatchEvent(new Event("submit"))
    }), n.appendChild(t), n
}

function pagination(e, t, i, n) {
    if (e) {
        e.innerHTML = "";
        var r = Math.ceil(t / (n = n || 12)),
            s = (i < Math.ceil(2.5) ? Math.ceil(2.5) : i < r ? i : r - Math.floor(2.5)) - Math.ceil(2.5);
        if (0 === r) return !1;
        n = document.createElement("nav");
        var o, a, l = document.createElement("ul");
        l.classList.add("pagination"), n.appendChild(l), 0 < i && ((a = buildPageItem(0, "", e)).querySelector("a").innerHTML = "\xab", (o = buildPageItem(i - 1, "", e)).querySelector("a").innerHTML = "<", l.appendChild(a), l.appendChild(o));
        for (var c = s; c < (5 + s <= r ? 5 + s : r); c++) {
            var d = buildPageItem(c, i == c ? "active" : "", e);
            d.querySelector("a").innerHTML = (c + 1).toString(), l.appendChild(d)
        }
        i < r - 1 && ((a = buildPageItem(i + 1, "", e)).querySelector("a").innerHTML = ">", (o = buildPageItem(r - 1, "", e)).querySelector("a").innerHTML = "\xbb", l.appendChild(a), l.appendChild(o)), e.appendChild(n)
    }
}

function getQueryStringAsObject() {
    function e(e) {
        return decodeURIComponent(e).replace(/\+/g, " ")
    }
    for (var t, i, n, r, s, o = {}, a = window.location.search.substring(1), l = /([^&;=]+)=?([^&;]*)/g, c = function(e) {
            return "object" != typeof e && (t = e, e = {
                length: 0
            }, t && Array.prototype.push.call(e, t)), e
        }; i = l.exec(a);) r = i[1].indexOf("["), s = e(i[2]), r < 0 ? o[n = e(i[1])] ? (o[n] = c(o[n]), Array.prototype.push.call(o[n], s)) : o[n] = s : (n = e(i[1].slice(0, r)), r = e(i[1].slice(r + 1, i[1].indexOf("]", r))), o[n] = c(o[n]), r ? o[n][r] = s : Array.prototype.push.call(o[n], s));
    return o
}

function objectAsQueryString(e) {
    var t, i = [];
    for (t in e) e.hasOwnProperty(t) && i.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
    return i.join("&")
}
commentsWrapper && (commentsEl = commentsWrapper.querySelector(".comments"));
var basket = document.querySelector("#basket");

function generateProductSlider(e) {
    new Swiper(e.querySelector(".swiper-container"), {
        slidesPerView: e.dataset.defaultCount || "auto",
        spaceBetween: e.dataset.spaceBetween ? parseInt(e.dataset.spaceBetween) : 15,
        loop: !0,
        navigation: {
            nextEl: e.querySelector(".swiper-button-next"),
            prevEl: e.querySelector(".swiper-button-prev")
        },
        breakpoints: {
            767: {
                slidesPerView: e.dataset.smCount || 2
            }
        }
    })
}

function getAddBasketButtonText(e) {
    return (e.querySelector(".title") ? e.querySelector(".title") : e).innerHTML
}

function setAddBasketButtonText(e, t) {
    e.querySelector(".title") ? e.querySelector(".title").innerHTML = t : e.innerHTML = t
}

function addBasket(e) {
    var t, i, n, r = getAddBasketButtonText(e),
        s = $(e).closest("form"),
        o = $(e).closest(".product-item")[0],
        a = e.dataset.productId ? parseInt(e.dataset.productId) : o.dataset.productId ? parseInt(o.dataset.productId) : 0;
    0 < a ? (t = s && s.length ? s[0].elements.qty.value : 1, i = basket.querySelector('.dropdown-menu > .dropdown-item[data-product-id="' + a + '"]'), n = parseInt(o.querySelector('[itemprop="price"]').getAttribute("content")), (s = new XMLHttpRequest).open("POST", config[mode].baseURL + "/product/AddBasketItem?id=" + a + (1 < t ? "&qty=" + t : ""), !0), s.onload = function() {
        var t, s, l, c;
        setAddBasketButtonText(e, r), 200 <= this.status && this.status < 400 && (t = JSON.parse(this.response), $("#basket-toast").toast("show"), l = basket.querySelector(".badge"), s = t.CartItemCount, l.innerHTML = s, l.setAttribute("data-count", s), i ? (s = parseInt(i.querySelector(".count").innerHTML) + 1, i.querySelector(".count").innerHTML = s, n *= s, i.querySelector(".price > span:first-child").innerHTML = n, i.querySelector(".price > span:first-child").innerHTML = new Intl.NumberFormat("fa-FA").format(n)) : (l = o.querySelector("img").alt, s = o.querySelector("img").src, (c = basket.querySelector(".clone").cloneNode(!0)).hidden = !1, c.classList.remove("clone"), c.setAttribute("data-product-id", a), c.href = t.ProductUrl, c.querySelector(".title").innerHTML = l, c.querySelector("img").src = s, c.querySelector("img").title = l, c.querySelector("img").alt = l, c.querySelector(".price > span:first-child").dataset.price = n, c.querySelector(".price > span:first-child").innerHTML = new Intl.NumberFormat("fa-FA").format(n), (s = basket.querySelector(".dropdown-menu > .dropdown-item:first-child")) ? ((l = document.createElement("div")).classList.add("dropdown-divider"), basket.querySelector(".dropdown-menu").insertBefore(l, s), basket.querySelector(".dropdown-menu").insertBefore(c, l)) : basket.querySelector(".dropdown-menu").appendChild(c)), basket.querySelector(".notify").hidden = !1, (c = basket.querySelector(".dropdown-item.empty")) && (c.hidden = !0))
    }, s.onerror = s.ontimeout = function() {
        setAddBasketButtonText(e, r), e.disabled = !1
    }, setAddBasketButtonText(e, r + "..."), e.disabled = !0, s.send()) : console.warn("productId for this product is undefined")
}

function generateProductActions(e) {
    for (var t = e.querySelectorAll(".actions .action-row a"), i = 0; i < t.length; i++) t[i].addEventListener("click", function(e) {
        e.preventDefault();
        var t = (r = this.querySelector("i")).classList.contains(this.dataset.micronInitIcon) || void 0 === this.dataset.micronSecond ? this.dataset.micronInit : this.dataset.micronSecond;
        switch (micron.getEle(r).interaction(t).duration(".45").timing("ease-out"), r.classList.toggle(this.dataset.micronInitIcon), r.classList.toggle(this.dataset.micronSecondIcon), setTimeout(function() {
                r.classList.remove("mjs-" + t), r.classList.remove("mjs-ease-out")
            }, 500), this.dataset.productId && parseInt(this.dataset.productId), this.dataset.action) {
            case "basket":
                micron.getEle(basket.querySelector("i")).interaction(t).duration(".45").timing("ease-out"), addBasket(this);
                break;
            case "share":
                var i = document.querySelector("#share-modal");
                $(i).modal("show");
                break;
            case "compare":
                var n = $(this).attr("href");
                location.href = n;
                break;
            case "favorite":
                n = parseInt((i = favorite.querySelector(".badge")).innerHTML) + 1, i.innerHTML = n, i.setAttribute("data-count", n);
                var r = favorite.querySelector("i");
                micron.getEle(r).interaction(t).duration(".45").timing("ease-out"), setTimeout(function() {
                    r.classList.remove("mjs-" + t)
                }, 500)
        }
    })
}

function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}
(this, function() {
    "use strict";

    function e(e) {
        return e && "[object Function]" === ({}).toString.call(e)
    }

    function t(e, t) {
        return 1 !== e.nodeType ? [] : (e = e.ownerDocument.defaultView.getComputedStyle(e, null), t ? e[t] : e)
    }

    function i(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body
        }
        var r = (o = t(e)).overflow,
            s = o.overflowX,
            o = o.overflowY;
        return /(auto|scroll|overlay)/.test(r + o + s) ? e : n(i(e))
    }

    function r(e) {
        return 11 === e ? j : 10 !== e && j || W
    }

    function s(e) {
        if (!e) return document.documentElement;
        for (var i = r(10) ? document.body : null, n = e.offsetParent || null; n === i && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var o = n && n.nodeName;
        return o && "BODY" !== o && "HTML" !== o ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === t(n, "position") ? s(n) : n : (e ? e.ownerDocument : document).documentElement
    }

    function o(e) {
        return null === e.parentNode ? e : o(e.parentNode)
    }

    function a(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var i, n = (i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) ? e : t,
            r = i ? t : e;
        return (i = document.createRange()).setStart(n, 0), i.setEnd(r, 0), e !== (i = i.commonAncestorContainer) && t !== i || n.contains(r) ? "BODY" === (r = (n = i).nodeName) || "HTML" !== r && s(n.firstElementChild) !== n ? s(i) : i : (i = o(e)).host ? a(i.host, t) : a(e, o(t).host)
    }

    function l(e, t) {
        var i = "top" === (1 < arguments.length && void 0 !== t ? t : "top") ? "scrollTop" : "scrollLeft";
        return "BODY" !== (t = e.nodeName) && "HTML" !== t ? e[i] : (t = e.ownerDocument.documentElement, (e.ownerDocument.scrollingElement || t)[i])
    }

    function c(e, t) {
        var i = "x" === t ? "Left" : "Top";
        return t = "Left" == i ? "Right" : "Bottom", parseFloat(e["border" + i + "Width"], 10) + parseFloat(e["border" + t + "Width"], 10)
    }

    function d(e, t, i, n) {
        return O(t["offset" + e], t["scroll" + e], i["client" + e], i["offset" + e], i["scroll" + e], r(10) ? parseInt(i["offset" + e]) + parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
    }

    function u(e) {
        var t = e.body,
            i = e.documentElement;
        return {
            height: d("Height", t, i, e = r(10) && getComputedStyle(i)),
            width: d("Width", t, i, e)
        }
    }

    function h(e) {
        return U({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function p(e) {
        var i, n, s = {};
        try {
            r(10) ? (s = e.getBoundingClientRect(), i = l(e, "top"), n = l(e, "left"), s.top += i, s.left += n, s.bottom += i, s.right += n) : s = e.getBoundingClientRect()
        } catch (o) {}
        var a = {
                left: s.left,
                top: s.top,
                width: s.right - s.left,
                height: s.bottom - s.top
            },
            d = (f = "HTML" === e.nodeName ? u(e.ownerDocument) : {}).width || e.clientWidth || a.right - a.left,
            p = f.height || e.clientHeight || a.bottom - a.top,
            f = e.offsetWidth - d;
        return d = e.offsetHeight - p, (f || d) && (f -= c(p = t(e), "x"), d -= c(p, "y"), a.width -= f, a.height -= d), h(a)
    }

    function f(e, i, s) {
        var o = 2 < arguments.length && void 0 !== s && s,
            a = r(10),
            c = "HTML" === i.nodeName,
            d = p(e),
            u = p(i),
            f = n(e),
            m = t(i);
        return s = parseFloat(m.borderTopWidth, 10), e = parseFloat(m.borderLeftWidth, 10), o && c && (u.top = O(u.top, 0), u.left = O(u.left, 0)), (d = h({
            top: d.top - u.top - s,
            left: d.left - u.left - e,
            width: d.width,
            height: d.height
        })).marginTop = 0, d.marginLeft = 0, !a && c && (c = parseFloat(m.marginTop, 10), m = parseFloat(m.marginLeft, 10), d.top -= s - c, d.bottom -= s - c, d.left -= e - m, d.right -= e - m, d.marginTop = c, d.marginLeft = m), (a && !o ? i.contains(f) : i === f && "BODY" !== f.nodeName) && (d = function(e, t, i) {
            var n = 2 < arguments.length && void 0 !== i && i;
            return i = l(t, "top"), t = l(t, "left"), n = n ? -1 : 1, e.top += i * n, e.bottom += i * n, e.left += t * n, e.right += t * n, e
        }(d, i)), d
    }

    function m(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var i = e.parentElement; i && "none" === t(i, "transform");) i = i.parentElement;
        return i || document.documentElement
    }

    function g(e, r, s, o, c) {
        var d, p = 4 < arguments.length && void 0 !== c && c,
            g = {
                top: 0,
                left: 0
            };
        c = p ? m(e) : a(e, r), "viewport" === o ? g = function(e, t) {
            var i = 1 < arguments.length && void 0 !== t && t,
                n = f(e, s = e.ownerDocument.documentElement),
                r = O(s.clientWidth, window.innerWidth || 0),
                s = (t = O(s.clientHeight, window.innerHeight || 0), e = i ? 0 : l(s), i ? 0 : l(s, "left"));
            return h({
                top: e - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: r,
                height: t
            })
        }(c, p) : ("scrollParent" === o ? "BODY" === (d = n(i(r))).nodeName && (d = e.ownerDocument.documentElement) : d = "window" === o ? e.ownerDocument.documentElement : o, v = f(d, c, p), "HTML" !== d.nodeName || function e(n) {
            var r = n.nodeName;
            return "BODY" !== r && "HTML" !== r && ("fixed" === t(n, "position") || !!(n = i(n)) && e(n))
        }(c) ? g = v : (e = (c = u(e.ownerDocument)).height, c = c.width, g.top += v.top - v.marginTop, g.bottom = e + v.top, g.left += v.left - v.marginLeft, g.right = c + v.left));
        var v = "number" == typeof(s = s || 0);
        return g.left += v ? s : s.left || 0, g.top += v ? s : s.top || 0, g.right -= v ? s : s.right || 0, g.bottom -= v ? s : s.bottom || 0, g
    }

    function v(e, t, i, n, r, s) {
        if (s = 5 < arguments.length && void 0 !== s ? s : 0, -1 === e.indexOf("auto")) return e;
        var o = {
            top: {
                width: (r = g(i, n, s, r)).width,
                height: t.top - r.top
            },
            right: {
                width: r.right - t.right,
                height: r.height
            },
            bottom: {
                width: r.width,
                height: r.bottom - t.bottom
            },
            left: {
                width: t.left - r.left,
                height: r.height
            }
        };
        return (t = (0 < (r = (t = Object.keys(o).map(function(e) {
            return U({
                key: e
            }, o[e], {
                area: (e = o[e]).width * e.height
            })
        }).sort(function(e, t) {
            return t.area - e.area
        })).filter(function(e) {
            var t = e.width;
            return e = e.height, t >= i.clientWidth && e >= i.clientHeight
        })).length ? r : t)[0].key) + ((e = e.split("-")[1]) ? "-" + e : "")
    }

    function y(e, t, i, n) {
        return f(i, (n = 3 < arguments.length && void 0 !== n ? n : null) ? m(t) : a(t, i), n)
    }

    function b(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            i = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0);
        return t = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0), {
            width: e.offsetWidth + t,
            height: e.offsetHeight + i
        }
    }

    function w(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function _(e, t, i) {
        i = i.split("-")[0];
        var n = b(e),
            r = {
                width: n.width,
                height: n.height
            },
            s = (a = -1 !== ["right", "left"].indexOf(i)) ? "top" : "left",
            o = a ? "left" : "top",
            a = (e = a ? "height" : "width", a ? "width" : "height");
        return r[s] = t[s] + t[e] / 2 - n[e] / 2, r[o] = i === o ? t[o] - n[a] : t[w(o)], r
    }

    function E(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function T(t, i, n) {
        return (void 0 === n ? t : t.slice(0, function(e, t, i) {
            if (Array.prototype.findIndex) return e.findIndex(function(e) {
                return e[t] === i
            });
            var n = E(e, function(e) {
                return e[t] === i
            });
            return e.indexOf(n)
        }(t, "name", n))).forEach(function(t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && e(n) && (i.offsets.popper = h(i.offsets.popper), i.offsets.reference = h(i.offsets.reference), i = n(i, t))
        }), i
    }

    function x(e, t) {
        return e.some(function(e) {
            var i = e.name;
            return e.enabled && i === t
        })
    }

    function S(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], i = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var r = (r = t[n]) ? "" + r + i : e;
            if (void 0 !== document.body.style[r]) return r
        }
        return null
    }

    function C(e) {
        return (e = e.ownerDocument) ? e.defaultView : window
    }

    function L(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function k(e, t) {
        Object.keys(t).forEach(function(i) {
            var n = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && L(t[i]) && (n = "px"), e.style[i] = t[i] + n
        })
    }

    function D(e, t, i) {
        var n = E(e, function(e) {
                return e.name === t
            }),
            r = !!n && e.some(function(e) {
                return e.name === i && e.enabled && e.order < n.order
            });
        return r || (e = "`" + t + "`", console.warn("`" + i + "` modifier is required by " + e + " modifier in order to work, be sure to include it before " + e + "!")), r
    }

    function A(e, t) {
        return t = 1 < arguments.length && void 0 !== t && t, e = Y.indexOf(e), e = Y.slice(e + 1).concat(Y.slice(0, e)), t ? e.reverse() : e
    }
    for (var I = Math.min, P = Math.floor, N = Math.round, O = Math.max, M = "undefined" != typeof window && "undefined" != typeof document, H = ["Edge", "Trident", "Firefox"], q = 0, z = 0; z < H.length; z += 1)
        if (M && 0 <= navigator.userAgent.indexOf(H[z])) {
            q = 1;
            break
        }
    function R(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }
    var B = M && window.Promise ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, q))
            }
        },
        j = M && !(!window.MSInputMethodContext || !document.documentMode),
        W = M && /MSIE 10/.test(navigator.userAgent),
        F = function(e, t) {
            if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
        },
        V = function(e, t, i) {
            return t && Q(e.prototype, t), i && Q(e, i), e
        },
        U = Object.assign || function(e) {
            for (var t, i = 1; i < arguments.length; i++)
                for (var n in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        },
        G = M && /Firefox/i.test(navigator.userAgent),
        X = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Y = X.slice(3);

    function K(t, i) {
        var n = this,
            r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        F(this, K), this.scheduleUpdate = function() {
            return requestAnimationFrame(n.update)
        }, this.update = B(this.update.bind(this)), this.options = U({}, K.Defaults, r), this.state = {
            isDestroyed: !1,
            isCreated: !1,
            scrollParents: []
        }, this.reference = t && t.jquery ? t[0] : t, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(U({}, K.Defaults.modifiers, r.modifiers)).forEach(function(e) {
            n.options.modifiers[e] = U({}, K.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
            return U({
                name: e
            }, n.options.modifiers[e])
        }).sort(function(e, t) {
            return e.order - t.order
        }), this.modifiers.forEach(function(t) {
            t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
        }), this.update(), (i = this.options.eventsEnabled) && this.enableEventListeners(), this.state.eventsEnabled = i
    }

    function Q(e, t) {
        for (var i, n = 0; n < t.length; n++)(i = t[n]).enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
    }
    return (V = (V(K, [{
        key: "update",
        value: function() {
            return (function() {
                var e;
                this.state.isDestroyed || ((e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                }).offsets.reference = y(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = _(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = T(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e)))
            }).call(this)
        }
    }, {
        key: "destroy",
        value: function() {
            return (function() {
                return this.state.isDestroyed = !0, x(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[S("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
            }).call(this)
        }
    }, {
        key: "enableEventListeners",
        value: function() {
            return (function() {
                var e, t, i;
                this.state.eventsEnabled || (this.state = (e = this.reference, this.options, t = this.state, i = this.scheduleUpdate, t.updateBound = i, C(e).addEventListener("resize", t.updateBound, {
                    passive: !0
                }), function e(t, i, r, s) {
                    var o = "BODY" === t.nodeName;
                    (t = o ? t.ownerDocument.defaultView : t).addEventListener(i, r, {
                        passive: !0
                    }), o || e(n(t.parentNode), i, r, s), s.push(t)
                }(e = n(e), "scroll", t.updateBound, t.scrollParents), t.scrollElement = e, t.eventsEnabled = !0, t))
            }).call(this)
        }
    }, {
        key: "disableEventListeners",
        value: function() {
            return (function() {
                var e, t;
                this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, C(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
                    e.removeEventListener("scroll", t.updateBound)
                }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
            }).call(this)
        }
    }]), K)).Utils = ("undefined" == typeof window ? global : window).PopperUtils, V.placements = X, V.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t, i, n = e.placement,
                        r = n.split("-")[0],
                        s = n.split("-")[1];
                    return s && (t = (i = e.offsets).reference, n = i.popper, r = (i = -1 !== ["bottom", "top"].indexOf(r)) ? "width" : "height", r = {
                        start: R({}, i = i ? "left" : "top", t[i]),
                        end: R({}, i, t[i] + t[r] - n[r])
                    }, e.offsets.popper = U({}, n, r[s])), e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(e, t) {
                    var i, n, r, s, o, a, l, c = t.offset,
                        d = e.placement,
                        u = (t = (u = e.offsets).popper, u.reference);
                    return d = d.split("-")[0], u = L(+c) ? [+c, 0] : (i = c, n = t, r = u, o = [0, 0], a = -1 !== ["right", "left"].indexOf(s = d), l[s = (l = i.split(/(\+|\-)/).map(function(e) {
                        return e.trim()
                    })).indexOf(E(l, function(e) {
                        return -1 !== e.search(/,|\s/)
                    }))] && -1 === l[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."), i = /\s*,\s*|\s+/, (-1 === s ? [l] : [l.slice(0, s).concat([l[s].split(i)[0]]), [l[s].split(i)[1]].concat(l.slice(s + 1))]).map(function(e, t) {
                        var i = (1 === t ? !a : a) ? "height" : "width",
                            s = !1;
                        return e.reduce(function(e, t) {
                            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
                        }, []).map(function(e) {
                            var t, s, o, a, l, c;
                            return t = e, s = i, o = n, a = r, l = +(c = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/))[1], c = c[2], l ? 0 !== c.indexOf("%") ? "vh" !== c && "vw" !== c ? l : ("vh" === c ? O(document.documentElement.clientHeight, window.innerHeight || 0) : O(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * l : h("%p" === c ? o : a)[s] / 100 * l : t
                        })
                    }).forEach(function(e, t) {
                        e.forEach(function(i, n) {
                            L(i) && (o[t] += i * ("-" === e[n - 1] ? -1 : 1))
                        })
                    }), o), "left" === d ? (t.top += u[0], t.left -= u[1]) : "right" === d ? (t.top += u[0], t.left += u[1]) : "top" === d ? (t.left += u[0], t.top -= u[1]) : "bottom" === d && (t.left += u[0], t.top += u[1]), e.popper = t, e
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var i = t.boundariesElement || s(e.instance.popper);
                    e.instance.reference === i && (i = s(i));
                    var n = S("transform"),
                        r = e.instance.popper.style,
                        o = r.top,
                        a = r.left,
                        l = r[n];
                    r.top = "", r.left = "", r[n] = "";
                    var c = g(e.instance.popper, e.instance.reference, t.padding, i, e.positionFixed);
                    r.top = o, r.left = a, r[n] = l, t.boundaries = c, l = t.priority;
                    var d = e.offsets.popper,
                        u = {
                            primary: function(e) {
                                var i = d[e];
                                return d[e] < c[e] && !t.escapeWithReference && (i = O(d[e], c[e])), R({}, e, i)
                            },
                            secondary: function(e) {
                                var i = "right" === e ? "left" : "top",
                                    n = d[i];
                                return d[e] > c[e] && !t.escapeWithReference && (n = I(d[i], c[e] - ("right" === e ? d.width : d.height))), R({}, i, n)
                            }
                        };
                    return l.forEach(function(e) {
                        d = U({}, d, u[-1 === ["left", "top"].indexOf(e) ? "secondary" : "primary"](e))
                    }), e.offsets.popper = d, e
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = (s = e.offsets).popper,
                        i = s.reference,
                        n = e.placement.split("-")[0],
                        r = P,
                        s = (o = -1 !== ["top", "bottom"].indexOf(n)) ? "right" : "bottom",
                        o = (n = o ? "left" : "top", o ? "width" : "height");
                    return t[s] < r(i[n]) && (e.offsets.popper[n] = r(i[n]) - t[o]), t[n] > r(i[s]) && (e.offsets.popper[n] = r(i[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, i) {
                    if (!D(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var n = i.element;
                    if ("string" == typeof n) {
                        if (!(n = e.instance.popper.querySelector(n))) return e
                    } else if (!e.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var r = e.placement.split("-")[0],
                        s = (u = e.offsets).popper,
                        o = u.reference,
                        a = -1 !== ["left", "right"].indexOf(r),
                        l = a ? "height" : "width",
                        c = a ? "Top" : "Left",
                        d = c.toLowerCase(),
                        u = (i = a ? "left" : "top", a ? "bottom" : "right");
                    return r = b(n)[l], o[u] - r < s[d] && (e.offsets.popper[d] -= s[d] - (o[u] - r)), o[d] + r > s[u] && (e.offsets.popper[d] += o[d] + r - s[u]), e.offsets.popper = h(e.offsets.popper), a = o[d] + o[l] / 2 - r / 2, u = t(e.instance.popper), o = parseFloat(u["margin" + c], 10), c = parseFloat(u["border" + c + "Width"], 10), c = a - e.offsets.popper[d] - o - c, c = O(I(s[l] - r, c), 0), e.arrowElement = n, e.offsets.arrow = (R(n = {}, d, N(c)), R(n, i, ""), n), e
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (x(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement) return e;
                    var i = g(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split("-")[0],
                        r = w(n),
                        s = e.placement.split("-")[1] || "",
                        o = [];
                    switch (t.behavior) {
                        case "flip":
                            o = [n, r];
                            break;
                        case "clockwise":
                            o = A(n);
                            break;
                        case "counterclockwise":
                            o = A(n, !0);
                            break;
                        default:
                            o = t.behavior
                    }
                    return o.forEach(function(a, l) {
                        if (n !== a || o.length === l + 1) return e;
                        r = w(n = e.placement.split("-")[0]);
                        var c = e.offsets.popper,
                            d = e.offsets.reference,
                            u = P,
                            h = "left" === n && u(c.right) > u(d.left) || "right" === n && u(c.left) < u(d.right) || "top" === n && u(c.bottom) > u(d.top) || "bottom" === n && u(c.top) < u(d.bottom),
                            p = u(c.left) < u(i.left),
                            f = u(c.right) > u(i.right),
                            m = u(c.top) < u(i.top);
                        a = u(c.bottom) > u(i.bottom), d = "left" === n && p || "right" === n && f || "top" === n && m || "bottom" === n && a, c = -1 !== ["top", "bottom"].indexOf(n), u = !!t.flipVariations && (c && "start" === s && p || c && "end" === s && f || !c && "start" === s && m || !c && "end" === s && a), m = !!t.flipVariationsByContent && (c && "start" === s && f || c && "end" === s && p || !c && "start" === s && a || !c && "end" === s && m), m = u || m, (h || d || m) && (e.flipped = !0, (h || d) && (n = o[l + 1]), m && (s = "end" === (m = s) ? "start" : "start" === m ? "end" : m), e.placement = n + (s ? "-" + s : ""), e.offsets.popper = U({}, e.offsets.popper, _(e.instance.popper, e.offsets.reference, e.placement)), e = T(e.instance.modifiers, e, "flip"))
                    }), e
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport",
                flipVariations: !1,
                flipVariationsByContent: !1
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        i = t.split("-")[0],
                        n = (o = e.offsets).popper,
                        r = o.reference,
                        s = -1 !== ["left", "right"].indexOf(i),
                        o = -1 === ["top", "left"].indexOf(i);
                    return n[s ? "left" : "top"] = r[i] - (o ? n[s ? "width" : "height"] : 0), e.placement = w(t), e.offsets.popper = h(n), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!D(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference,
                        i = E(e.instance.modifiers, function(e) {
                            return "preventOverflow" === e.name
                        }).boundaries;
                    if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var i = t.x,
                        n = t.y,
                        r = e.offsets.popper,
                        o = E(e.instance.modifiers, function(e) {
                            return "applyStyle" === e.name
                        }).gpuAcceleration;
                    void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var a, l, c, d = void 0 === o ? t.gpuAcceleration : o,
                        u = s(e.instance.popper),
                        h = p(u),
                        f = {
                            position: r.position
                        },
                        m = (t = (a = e, l = window.devicePixelRatio < 2 || !G, g = (c = a.offsets).popper, m = c.reference, t = function(e) {
                            return e
                        }, r = (o = N)(m.width), c = o(g.width), m = -1 !== ["left", "right"].indexOf(a.placement), a = -1 !== a.placement.indexOf("-"), m = l ? m || a || r % 2 == c % 2 ? o : P : t, t = l ? o : t, {
                            left: m(1 == r % 2 && 1 == c % 2 && !a && l ? g.left - 1 : g.left),
                            top: t(g.top),
                            bottom: t(g.bottom),
                            right: m(g.right)
                        }), "bottom" === i ? "top" : "bottom"),
                        g = "right" === n ? "left" : "right";
                    return i = S("transform"), n = "bottom" == m ? "HTML" === u.nodeName ? -u.clientHeight + t.bottom : -h.height + t.bottom : t.top, t = "right" == g ? "HTML" === u.nodeName ? -u.clientWidth + t.right : -h.width + t.right : t.left, d && i ? (f[i] = "translate3d(" + t + "px, " + n + "px, 0)", f[m] = 0, f[g] = 0, f.willChange = "transform") : (d = "bottom" == m ? -1 : 1, i = "right" == g ? -1 : 1, f[m] = n * d, f[g] = t * i, f.willChange = m + ", " + g), g = {
                        "x-placement": e.placement
                    }, e.attributes = U({}, g, e.attributes), e.styles = U({}, f, e.styles), e.arrowStyles = U({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    var t, i;
                    return k(e.instance.popper, e.styles), t = e.instance.popper, Object.keys(i = e.attributes).forEach(function(e) {
                        !1 === i[e] ? t.removeAttribute(e) : t.setAttribute(e, i[e])
                    }), e.arrowElement && Object.keys(e.arrowStyles).length && k(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, i, n, r) {
                    return r = y(r, t, e, i.positionFixed), e = v(i.placement, r, t, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding), t.setAttribute("x-placement", e), k(t, {
                        position: i.positionFixed ? "fixed" : "absolute"
                    }), i
                },
                gpuAcceleration: void 0
            }
        }
    }, V
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "popper.js"], t) : t((e = e || self).bootstrap = {}, e.Popper)
}(this, function(e, t) {
    "use strict";

    function i(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function n(e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e
    }

    function r(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {},
                n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(e) {
                return Object.getOwnPropertyDescriptor(i, e).enumerable
            }))), n.forEach(function(t) {
                var n, r;
                n = e, t = i[r = t], r in n ? Object.defineProperty(n, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[r] = t
            })
        }
        return e
    }
    t = t && t.hasOwnProperty("default") ? t.default : t;
    var s, o, a, l, c = (s = {}, o = 1, {
            set: function(e, t, i) {
                void 0 === e.key && (e.key = {
                    key: t,
                    id: o
                }, o++), s[e.key.id] = i
            },
            get: function(e, t) {
                return e && void 0 !== e.key && (e = e.key).key === t ? s[e.id] : null
            },
            delete: function(e, t) {
                var i;
                void 0 === e.key || (i = e.key).key === t && (delete s[i.id], delete e.key)
            }
        }),
        d = function(e, t, i) {
            c.set(e, t, i)
        },
        u = function(e, t) {
            return c.get(e, t)
        },
        h = function(e, t) {
            c.delete(e, t)
        },
        p = {
            TRANSITION_END: "transitionend",
            getUID: function(e) {
                for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
                return e
            },
            getSelectorFromElement: function(e) {
                var t, i = e.getAttribute("data-target");
                i && "#" !== i || (i = (t = e.getAttribute("href")) && "#" !== t ? t.trim() : "");
                try {
                    return document.querySelector(i) ? i : null
                } catch (n) {
                    return null
                }
            },
            getTransitionDurationFromElement: function(e) {
                if (!e) return 0;
                var t = window.getComputedStyle(e).transitionDuration,
                    i = window.getComputedStyle(e).transitionDelay,
                    n = parseFloat(t);
                return e = parseFloat(i), n || e ? (t = t.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(i))) : 0
            },
            reflow: function(e) {
                return e.offsetHeight
            },
            triggerTransitionEnd: function(e) {
                e.dispatchEvent(new Event(p.TRANSITION_END))
            },
            isElement: function(e) {
                return (e[0] || e).nodeType
            },
            emulateTransitionEnd: function(e, t) {
                var i = !1;
                t += 5, e.addEventListener(p.TRANSITION_END, function t() {
                    i = !0, e.removeEventListener(p.TRANSITION_END, t)
                }), setTimeout(function() {
                    i || p.triggerTransitionEnd(e)
                }, t)
            },
            typeCheckConfig: function(e, t, i) {
                for (var n in i)
                    if (Object.prototype.hasOwnProperty.call(i, n)) {
                        var r = i[n],
                            s = (s = t[n]) && p.isElement(s) ? "element" : ({}).toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
                        if (!RegExp(r).test(s)) throw Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + r + '".')
                    }
            },
            makeArray: function(e) {
                return e ? [].slice.call(e) : []
            },
            isVisible: function(e) {
                return !!e && null !== e.style && null !== e.parentNode && void 0 !== e.parentNode.style && "none" !== e.style.display && "none" !== e.parentNode.style.display && "hidden" !== e.style.visibility
            },
            findShadowRoot: function(e) {
                return document.documentElement.attachShadow ? "function" != typeof e.getRootNode ? e instanceof ShadowRoot ? e : e.parentNode ? p.findShadowRoot(e.parentNode) : null : (e = e.getRootNode()) instanceof ShadowRoot ? e : null : null
            },
            noop: function() {
                return function() {}
            },
            get jQuery() {
                return window.jQuery
            }
        },
        f = (F = new CustomEvent("Bootstrap", {
            cancelable: !0
        }), (j = document.createElement("div")).addEventListener("Bootstrap", function() {
            return null
        }), F.preventDefault(), j.dispatchEvent(F), U = F.defaultPrevented, a = Element.prototype.querySelectorAll, j = Element.prototype.querySelector, l = /:scope\b/, function() {
            var e = document.createElement("div");
            try {
                e.querySelectorAll(":scope *")
            } catch (t) {
                return
            }
            return 1
        }() || (a = function(e) {
            if (!l.test(e)) return this.querySelectorAll(e);
            var t = Boolean(this.id);
            t || (this.id = p.getUID("scope"));
            var i = null;
            try {
                e = e.replace(l, "#" + this.id), i = this.querySelectorAll(e)
            } finally {
                t || this.removeAttribute("id")
            }
            return i
        }, j = function(e) {
            return l.test(e) ? void 0 !== (e = a.call(this, e))[0] ? e[0] : null : this.querySelector(e)
        }), {
            defaultPreventedPreservedOnDispatch: U,
            find: a,
            findOne: j
        }),
        m = /[^.]*(?=\..*)\.|.*/,
        g = /\..*/,
        v = /^key/,
        y = /::\d+$/,
        b = {},
        w = 1,
        _ = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        E = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

    function T(e, t) {
        return t && t + "::" + w++ || e.uidEvent || w++
    }

    function x(e) {
        var t = T(e);
        return e.uidEvent = t, b[t] = b[t] || {}
    }

    function S(e, t) {
        null === e.which && v.test(e.type) && (e.which = null !== e.charCode ? e.charCode : e.keyCode), e.delegateTarget = t
    }

    function C(e, t, i) {
        void 0 === i && (i = null);
        for (var n = Object.keys(e), r = 0; r < n.length; r++) {
            var s = n[r],
                o = e[s];
            if (o.originalHandler === t && o.delegationSelector === i) return e[s]
        }
        return null
    }

    function L(e, t, i) {
        var n = "string" == typeof t,
            r = n ? i : t;
        return (t = _[i = e.replace(g, "")]) && (i = t), -1 < E.indexOf(i) || (i = e), [n, r, i]
    }

    function k(e, t, i, n, r) {
        var s, o, a, l, c, d, u, h, p, f;
        "string" == typeof t && e && (i || (i = n, n = null), s = (l = L(t, i, n))[0], o = l[1], a = l[2], (c = C(l = (c = x(e))[a] || (c[a] = {}), o, s ? i : null)) ? c.oneOff = c.oneOff && r : (t = T(o, t.replace(m, "")), (n = s ? (h = e, p = i, f = n, function e(t) {
            for (var i = h.querySelectorAll(p), n = t.target; n && n !== this; n = n.parentNode)
                for (var r = i.length; r--;)
                    if (i[r] === n) return S(t, n), e.oneOff && A.off(h, t.type, f), f.apply(n, [t]);
            return null
        }) : (d = e, u = i, function e(t) {
            return S(t, d), e.oneOff && A.off(d, t.type, u), u.apply(d, [t])
        })).delegationSelector = s ? i : null, n.originalHandler = o, n.oneOff = r, l[n.uidEvent = t] = n, e.addEventListener(a, n, s)))
    }

    function D(e, t, i, n, r) {
        null !== (n = C(t[i], n, r)) && (e.removeEventListener(i, n, Boolean(r)), delete t[i][n.uidEvent])
    }
    var A = {
            on: function(e, t, i, n) {
                k(e, t, i, n, !1)
            },
            one: function(e, t, i, n) {
                k(e, t, i, n, !0)
            },
            off: function(e, t, i, n) {
                var r, s, o, a, l, c;
                "string" == typeof t && e && (r = (l = L(t, i, n))[0], n = l[1], o = (s = l[2]) !== t, a = x(e), l = "." === t.charAt(0), void 0 === n ? (l && Object.keys(a).forEach(function(i) {
                    var n, r, s, o, l;
                    n = e, r = a, s = i, o = t.substr(1), Object.keys(l = r[s] || {}).forEach(function(e) {
                        -1 < e.indexOf(o) && D(n, r, s, (e = l[e]).originalHandler, e.delegationSelector)
                    })
                }), Object.keys(c = a[s] || {}).forEach(function(i) {
                    var n = i.replace(y, "");
                    (!o || -1 < t.indexOf(n)) && D(e, a, s, (i = c[i]).originalHandler, i.delegationSelector)
                })) : a && a[s] && D(e, a, s, n, r ? i : null))
            },
            trigger: function(e, t, i) {
                if ("string" != typeof t || !e) return null;
                var n, r = t.replace(g, ""),
                    s = -1 < E.indexOf(r),
                    o = p.jQuery,
                    a = !0,
                    l = !0,
                    c = !1,
                    d = null;
                return t !== r && void 0 !== o && (n = o.Event(t, i), o(e).trigger(n), a = !n.isPropagationStopped(), l = !n.isImmediatePropagationStopped(), c = n.isDefaultPrevented()), s ? (d = document.createEvent("HTMLEvents")).initEvent(r, a, !0) : d = new CustomEvent(t, {
                    bubbles: a,
                    cancelable: !0
                }), void 0 !== i && Object.keys(i).forEach(function(e) {
                    Object.defineProperty(d, e, {
                        get: function() {
                            return i[e]
                        }
                    })
                }), c && (d.preventDefault(), f.defaultPreventedPreservedOnDispatch || Object.defineProperty(d, "defaultPrevented", {
                    get: function() {
                        return !0
                    }
                })), l && e.dispatchEvent(d), d.defaultPrevented && void 0 !== n && n.preventDefault(), d
            }
        },
        I = f.find,
        P = f.findOne,
        N = {
            matches: function(e, t) {
                return e.matches(t)
            },
            find: function(e, t) {
                return void 0 === t && (t = document.documentElement), "string" != typeof e ? null : I.call(t, e)
            },
            findOne: function(e, t) {
                return void 0 === t && (t = document.documentElement), "string" != typeof e ? null : P.call(t, e)
            },
            children: function(e, t) {
                var i = this;
                return "string" != typeof t ? null : p.makeArray(e.children).filter(function(e) {
                    return i.matches(e, t)
                })
            },
            parents: function(e, t) {
                if ("string" != typeof t) return null;
                for (var i = [], n = e.parentNode; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType;) this.matches(n, t) && i.push(n), n = n.parentNode;
                return i
            },
            closest: function(e, t) {
                return "string" != typeof t ? null : e.closest(t)
            },
            prev: function(e, t) {
                if ("string" != typeof t) return null;
                for (var i = [], n = e.previousSibling; n && n.nodeType === Node.ELEMENT_NODE && 3 !== n.nodeType;) this.matches(n, t) && i.push(n), n = n.previousSibling;
                return i
            }
        },
        O = "bs.alert",
        M = {
            CLOSE: "close" + (F = "." + O),
            CLOSED: "closed" + F,
            CLICK_DATA_API: "click" + F + ".data-api"
        },
        H = ((U = q.prototype).close = function(e) {
            var t = this._element;
            e && (t = this._getRootElement(e)), null === (e = this._triggerCloseEvent(t)) || e.defaultPrevented || this._removeElement(t)
        }, U.dispose = function() {
            h(this._element, O), this._element = null
        }, U._getRootElement = function(e) {
            var t = p.getSelectorFromElement(e),
                i = !1;
            return t && (i = N.findOne(t)), i || N.closest(e, ".alert")
        }, U._triggerCloseEvent = function(e) {
            return A.trigger(e, M.CLOSE)
        }, U._removeElement = function(e) {
            var t, i = this;
            e.classList.remove("show"), e.classList.contains("fade") ? (t = p.getTransitionDurationFromElement(e), A.one(e, p.TRANSITION_END, function(t) {
                return i._destroyElement(e, t)
            }), p.emulateTransitionEnd(e, t)) : this._destroyElement(e)
        }, U._destroyElement = function(e) {
            e.parentNode && e.parentNode.removeChild(e), A.trigger(e, M.CLOSED)
        }, q._jQueryInterface = function(e) {
            return this.each(function() {
                var t = (t = u(this, O)) || new q(this);
                "close" === e && t[e](this)
            })
        }, q._handleDismiss = function(e) {
            return function(t) {
                t && t.preventDefault(), e.close(this)
            }
        }, q._getInstance = function(e) {
            return u(e, O)
        }, n(q, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }]), q);

    function q(e) {
        this._element = e, this._element && d(e, O, this)
    }
    A.on(document, M.CLICK_DATA_API, '[data-dismiss="alert"]', H._handleDismiss(new H));
    var z, R = p.jQuery;
    void 0 !== R && (z = R.fn.alert, R.fn.alert = H._jQueryInterface, R.fn.alert.Constructor = H, R.fn.alert.noConflict = function() {
        return R.fn.alert = z, H._jQueryInterface
    });
    var B = "bs.button",
        j = "." + B,
        W = "active",
        F = '[data-toggle^="button"]',
        V = ".btn",
        U = {
            CLICK_DATA_API: "click" + j + ".data-api",
            FOCUS_DATA_API: "focus" + j + ".data-api",
            BLUR_DATA_API: "blur" + j + ".data-api"
        },
        G = ((j = X.prototype).toggle = function() {
            var e = !0,
                t = !0,
                i = N.closest(this._element, '[data-toggle="buttons"]');
            if (i) {
                var n, r = N.findOne('input:not([type="hidden"])', this._element);
                if (r) {
                    if ("radio" === r.type && (r.checked && this._element.classList.contains(W) ? e = !1 : (n = N.findOne(".active", i)) && n.classList.remove(W)), e) {
                        if (r.hasAttribute("disabled") || i.hasAttribute("disabled") || r.classList.contains("disabled") || i.classList.contains("disabled")) return;
                        r.checked = !this._element.classList.contains(W), A.trigger(r, "change")
                    }
                    r.focus(), t = !1
                }
            }
            t && this._element.setAttribute("aria-pressed", !this._element.classList.contains(W)), e && this._element.classList.toggle(W)
        }, j.dispose = function() {
            h(this._element, B), this._element = null
        }, X._jQueryInterface = function(e) {
            return this.each(function() {
                var t = (t = u(this, B)) || new X(this);
                "toggle" === e && t[e]()
            })
        }, X._getInstance = function(e) {
            return u(e, B)
        }, n(X, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }]), X);

    function X(e) {
        this._element = e, d(e, B, this)
    }
    A.on(document, U.CLICK_DATA_API, F, function(e) {
        e.preventDefault();
        var t = e.target;
        t.classList.contains("btn") || (t = N.closest(t, V)), (e = u(t, B)) || (e = new G(t), d(t, B, e)), e.toggle()
    }), A.on(document, U.FOCUS_DATA_API, F, function(e) {
        N.closest(e.target, V).classList.add("focus")
    }), A.on(document, U.BLUR_DATA_API, F, function(e) {
        N.closest(e.target, V).classList.remove("focus")
    });
    var Y, K = p.jQuery;
    void 0 !== K && (Y = K.fn.button, K.fn.button = G._jQueryInterface, K.fn.button.Constructor = G, K.fn.button.noConflict = function() {
        return K.fn.button = Y, G._jQueryInterface
    });
    var Q = /[A-Z]/g;

    function Z(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === Number(e).toString() ? Number(e) : "" === e ? null : e)
    }

    function J(e) {
        return e.replace(Q, function(e) {
            return e.toLowerCase()
        })
    }
    var ee = {
            setDataAttribute: function(e, t, i) {
                e.setAttribute("data-" + J(t), i)
            },
            removeDataAttribute: function(e, t) {
                e.removeAttribute("data-" + J(t))
            },
            getDataAttributes: function(e) {
                if (!e) return {};
                var t = r({}, e.dataset);
                return Object.keys(t).forEach(function(e) {
                    t[e] = Z(t[e])
                }), t
            },
            getDataAttribute: function(e, t) {
                return Z(e.getAttribute("data-" + J(t)))
            },
            offset: function(e) {
                return {
                    top: (e = e.getBoundingClientRect()).top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft
                }
            },
            position: function(e) {
                return {
                    top: e.offsetTop,
                    left: e.offsetLeft
                }
            },
            toggleClass: function(e, t) {
                e && (e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t))
            }
        },
        et = "carousel",
        ei = "bs.carousel",
        en = "." + ei,
        er = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        es = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        eo = "next",
        ea = "prev",
        el = {
            SLIDE: "slide" + en,
            SLID: "slid" + en,
            KEYDOWN: "keydown" + en,
            MOUSEENTER: "mouseenter" + en,
            MOUSELEAVE: "mouseleave" + en,
            TOUCHSTART: "touchstart" + en,
            TOUCHMOVE: "touchmove" + en,
            TOUCHEND: "touchend" + en,
            POINTERDOWN: "pointerdown" + en,
            POINTERUP: "pointerup" + en,
            DRAG_START: "dragstart" + en,
            LOAD_DATA_API: "load" + en + ".data-api",
            CLICK_DATA_API: "click" + en + ".data-api"
        },
        ec = "active",
        ed = ".active.carousel-item",
        eu = ".carousel-indicators",
        eh = (U = "[data-slide], [data-slide-to]", {
            TOUCH: "touch",
            PEN: "pen"
        }),
        ep = ((F = ef.prototype).next = function() {
            this._isSliding || this._slide(eo)
        }, F.nextWhenVisible = function() {
            !document.hidden && p.isVisible(this._element) && this.next()
        }, F.prev = function() {
            this._isSliding || this._slide(ea)
        }, F.pause = function(e) {
            e || (this._isPaused = !0), N.findOne(".carousel-item-next, .carousel-item-prev", this._element) && (p.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }, F.cycle = function(e) {
            e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }, F.to = function(e) {
            var t = this;
            this._activeElement = N.findOne(ed, this._element);
            var i = this._getItemIndex(this._activeElement);
            if (!(e > this._items.length - 1 || e < 0)) {
                if (this._isSliding) A.one(this._element, el.SLID, function() {
                    return t.to(e)
                });
                else {
                    if (i === e) return this.pause(), void this.cycle();
                    i = i < e ? eo : ea, this._slide(i, this._items[e])
                }
            }
        }, F.dispose = function() {
            A.off(this._element, en), h(this._element, ei), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
        }, F._getConfig = function(e) {
            return e = r({}, er, e), p.typeCheckConfig(et, e, es), e
        }, F._handleSwipe = function() {
            var e = Math.abs(this.touchDeltaX);
            e <= 40 || (0 < (e /= this.touchDeltaX) && this.prev(), e < 0 && this.next())
        }, F._addEventListeners = function() {
            var e = this;
            this._config.keyboard && A.on(this._element, el.KEYDOWN, function(t) {
                return e._keydown(t)
            }), "hover" === this._config.pause && (A.on(this._element, el.MOUSEENTER, function(t) {
                return e.pause(t)
            }), A.on(this._element, el.MOUSELEAVE, function(t) {
                return e.cycle(t)
            })), this._config.touch && this._addTouchEventListeners()
        }, F._addTouchEventListeners = function() {
            var e, t, i = this;
            this._touchSupported && (e = function(e) {
                i._pointerEvent && eh[e.pointerType.toUpperCase()] ? i.touchStartX = e.clientX : i._pointerEvent || (i.touchStartX = e.touches[0].clientX)
            }, t = function(e) {
                i._pointerEvent && eh[e.pointerType.toUpperCase()] && (i.touchDeltaX = e.clientX - i.touchStartX), i._handleSwipe(), "hover" === i._config.pause && (i.pause(), i.touchTimeout && clearTimeout(i.touchTimeout), i.touchTimeout = setTimeout(function(e) {
                    return i.cycle(e)
                }, 500 + i._config.interval))
            }, p.makeArray(N.find(".carousel-item img", this._element)).forEach(function(e) {
                A.on(e, el.DRAG_START, function(e) {
                    return e.preventDefault()
                })
            }), this._pointerEvent ? (A.on(this._element, el.POINTERDOWN, e), A.on(this._element, el.POINTERUP, t), this._element.classList.add("pointer-event")) : (A.on(this._element, el.TOUCHSTART, e), A.on(this._element, el.TOUCHMOVE, function(e) {
                e.touches && 1 < e.touches.length ? i.touchDeltaX = 0 : i.touchDeltaX = e.touches[0].clientX - i.touchStartX
            }), A.on(this._element, el.TOUCHEND, t)))
        }, F._keydown = function(e) {
            if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                case 37:
                    e.preventDefault(), this.prev();
                    break;
                case 39:
                    e.preventDefault(), this.next()
            }
        }, F._getItemIndex = function(e) {
            return this._items = e && e.parentNode ? p.makeArray(N.find(".carousel-item", e.parentNode)) : [], this._items.indexOf(e)
        }, F._getItemByDirection = function(e, t) {
            var i = e === eo,
                n = e === ea,
                r = this._getItemIndex(t),
                s = this._items.length - 1;
            return (n && 0 === r || i && r === s) && !this._config.wrap ? t : -1 == (e = (r + (e === ea ? -1 : 1)) % this._items.length) ? this._items[this._items.length - 1] : this._items[e]
        }, F._triggerSlideEvent = function(e, t) {
            var i = this._getItemIndex(e),
                n = this._getItemIndex(N.findOne(ed, this._element));
            return A.trigger(this._element, el.SLIDE, {
                relatedTarget: e,
                direction: t,
                from: n,
                to: i
            })
        }, F._setActiveIndicatorElement = function(e) {
            if (this._indicatorsElement) {
                for (var t = N.find(".active", this._indicatorsElement), i = 0; i < t.length; i++) t[i].classList.remove(ec);
                (e = this._indicatorsElement.children[this._getItemIndex(e)]) && e.classList.add(ec)
            }
        }, F._slide = function(e, t) {
            var i, n, r = this,
                s = N.findOne(ed, this._element),
                o = this._getItemIndex(s),
                a = t || s && this._getItemByDirection(e, s),
                l = this._getItemIndex(a),
                c = (t = Boolean(this._interval), e === eo ? (i = "carousel-item-left", n = "carousel-item-next", "left") : (i = "carousel-item-right", n = "carousel-item-prev", "right"));
            a && a.classList.contains(ec) ? this._isSliding = !1 : !this._triggerSlideEvent(a, c).defaultPrevented && s && a && (this._isSliding = !0, t && this.pause(), this._setActiveIndicatorElement(a), this._element.classList.contains("slide") ? (a.classList.add(n), p.reflow(a), s.classList.add(i), a.classList.add(i), (e = parseInt(a.getAttribute("data-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval, e = p.getTransitionDurationFromElement(s), A.one(s, p.TRANSITION_END, function() {
                a.classList.remove(i), a.classList.remove(n), a.classList.add(ec), s.classList.remove(ec), s.classList.remove(n), s.classList.remove(i), r._isSliding = !1, setTimeout(function() {
                    A.trigger(r._element, el.SLID, {
                        relatedTarget: a,
                        direction: c,
                        from: o,
                        to: l
                    })
                }, 0)
            }), p.emulateTransitionEnd(s, e)) : (s.classList.remove(ec), a.classList.add(ec), this._isSliding = !1, A.trigger(this._element, el.SLID, {
                relatedTarget: a,
                direction: c,
                from: o,
                to: l
            })), t && this.cycle())
        }, ef._carouselInterface = function(e, t) {
            var i = u(e, ei),
                n = r({}, er, ee.getDataAttributes(e));
            "object" == typeof t && (n = r({}, n, t));
            var s = "string" == typeof t ? t : n.slide;
            if (i = i || new ef(e, n), "number" == typeof t) i.to(t);
            else if ("string" == typeof s) {
                if (void 0 === i[s]) throw Error('No method named "' + s + '"');
                i[s]()
            } else n.interval && n.ride && (i.pause(), i.cycle())
        }, ef._jQueryInterface = function(e) {
            return this.each(function() {
                ef._carouselInterface(this, e)
            })
        }, ef._dataApiClickHandler = function(e) {
            var t, i, n = p.getSelectorFromElement(this);
            !n || (t = N.findOne(n)) && t.classList.contains("carousel") && (i = r({}, ee.getDataAttributes(t), ee.getDataAttributes(this)), (n = this.getAttribute("data-slide-to")) && (i.interval = !1), ef._carouselInterface(t, i), n && u(t, ei).to(n), e.preventDefault())
        }, ef._getInstance = function(e) {
            return u(e, ei)
        }, n(ef, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function() {
                return er
            }
        }]), ef);

    function ef(e, t) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = N.findOne(eu, this._element), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners(), d(e, ei, this)
    }
    A.on(document, el.CLICK_DATA_API, U, ep._dataApiClickHandler), A.on(window, el.LOAD_DATA_API, function() {
        for (var e = p.makeArray(N.find('[data-ride="carousel"]')), t = 0, i = e.length; t < i; t++) ep._carouselInterface(e[t], u(e[t], ei))
    });
    var em, eg = p.jQuery;
    void 0 !== eg && (em = eg.fn[et], eg.fn[et] = ep._jQueryInterface, eg.fn[et].Constructor = ep, eg.fn[et].noConflict = function() {
        return eg.fn[et] = em, ep._jQueryInterface
    });
    var ev = "collapse",
        e$ = "bs.collapse",
        ey = {
            toggle: !0,
            parent: ""
        },
        eb = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        ew = {
            SHOW: "show" + (F = "." + e$),
            SHOWN: "shown" + F,
            HIDE: "hide" + F,
            HIDDEN: "hidden" + F,
            CLICK_DATA_API: "click" + F + ".data-api"
        },
        e_ = "show",
        eE = "collapse",
        eT = "collapsing",
        ex = "collapsed",
        eS = '[data-toggle="collapse"]',
        eC = ((U = e8.prototype).toggle = function() {
            this._element.classList.contains(e_) ? this.hide() : this.show()
        }, U.show = function() {
            var e, t = this;
            if (!this._isTransitioning && !this._element.classList.contains(e_)) {
                this._parent && 0 === (n = p.makeArray(N.find(".show, .collapsing", this._parent)).filter(function(e) {
                    return "string" == typeof t._config.parent ? e.getAttribute("data-parent") === t._config.parent : e.classList.contains(eE)
                })).length && (n = null);
                var i, n, r = N.findOne(this._selector);
                if (n) {
                    var s = n.filter(function(e) {
                        return r !== e
                    });
                    if ((e = s[0] ? u(s[0], e$) : null) && e._isTransitioning) return
                }
                A.trigger(this._element, ew.SHOW).defaultPrevented || (n && n.forEach(function(t) {
                    r !== t && e8._collapseInterface(t, "hide"), e || d(t, e$, null)
                }), i = this._getDimension(), this._element.classList.remove(eE), this._element.classList.add(eT), this._element.style[i] = 0, this._triggerArray.length && this._triggerArray.forEach(function(e) {
                    e.classList.remove(ex), e.setAttribute("aria-expanded", !0)
                }), this.setTransitioning(!0), s = "scroll" + (i[0].toUpperCase() + i.slice(1)), n = p.getTransitionDurationFromElement(this._element), A.one(this._element, p.TRANSITION_END, function() {
                    t._element.classList.remove(eT), t._element.classList.add(eE), t._element.classList.add(e_), t._element.style[i] = "", t.setTransitioning(!1), A.trigger(t._element, ew.SHOWN)
                }), p.emulateTransitionEnd(this._element, n), this._element.style[i] = this._element[s] + "px")
            }
        }, U.hide = function() {
            var e = this;
            if (!this._isTransitioning && this._element.classList.contains(e_) && !A.trigger(this._element, ew.HIDE).defaultPrevented) {
                var t = this._getDimension();
                this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", p.reflow(this._element), this._element.classList.add(eT), this._element.classList.remove(eE), this._element.classList.remove(e_);
                var i = this._triggerArray.length;
                if (0 < i)
                    for (var n = 0; n < i; n++) {
                        var r = this._triggerArray[n],
                            s = p.getSelectorFromElement(r);
                        null !== s && (N.findOne(s).classList.contains(e_) || (r.classList.add(ex), r.setAttribute("aria-expanded", !1)))
                    }
                this.setTransitioning(!0), this._element.style[t] = "", t = p.getTransitionDurationFromElement(this._element), A.one(this._element, p.TRANSITION_END, function() {
                    e.setTransitioning(!1), e._element.classList.remove(eT), e._element.classList.add(eE), A.trigger(e._element, ew.HIDDEN)
                }), p.emulateTransitionEnd(this._element, t)
            }
        }, U.setTransitioning = function(e) {
            this._isTransitioning = e
        }, U.dispose = function() {
            h(this._element, e$), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
        }, U._getConfig = function(e) {
            return (e = r({}, ey, e)).toggle = Boolean(e.toggle), p.typeCheckConfig(ev, e, eb), e
        }, U._getDimension = function() {
            return this._element.classList.contains("width") ? "width" : "height"
        }, U._getParent = function() {
            var e, t = this;
            p.isElement(this._config.parent) ? (e = this._config.parent, void 0 === this._config.parent.jquery && void 0 === this._config.parent[0] || (e = this._config.parent[0])) : e = N.findOne(this._config.parent);
            var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
            return p.makeArray(N.find(i, e)).forEach(function(e) {
                t._addAriaAndCollapsedClass(e8._getTargetFromElement(e), [e])
            }), e
        }, U._addAriaAndCollapsedClass = function(e, t) {
            var i;
            e && (i = e.classList.contains(e_), t.length && t.forEach(function(e) {
                i ? e.classList.remove(ex) : e.classList.add(ex), e.setAttribute("aria-expanded", i)
            }))
        }, e8._getTargetFromElement = function(e) {
            return (e = p.getSelectorFromElement(e)) ? N.findOne(e) : null
        }, e8._collapseInterface = function(e, t) {
            var i = u(e, e$),
                n = r({}, ey, ee.getDataAttributes(e), "object" == typeof t && t ? t : {});
            if (!i && n.toggle && /show|hide/.test(t) && (n.toggle = !1), i = i || new e8(e, n), "string" == typeof t) {
                if (void 0 === i[t]) throw Error('No method named "' + t + '"');
                i[t]()
            }
        }, e8._jQueryInterface = function(e) {
            return this.each(function() {
                e8._collapseInterface(this, e)
            })
        }, e8._getInstance = function(e) {
            return u(e, e$)
        }, n(e8, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function() {
                return ey
            }
        }]), e8);

    function e8(e, t) {
        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = p.makeArray(N.find('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
        for (var i = p.makeArray(N.find(eS)), n = 0, r = i.length; n < r; n++) {
            var s = i[n],
                o = p.getSelectorFromElement(s),
                a = p.makeArray(N.find(o)).filter(function(t) {
                    return t === e
                });
            null !== o && a.length && (this._selector = o, this._triggerArray.push(s))
        }
        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), d(e, e$, this)
    }
    A.on(document, ew.CLICK_DATA_API, eS, function(e) {
        "A" === e.target.tagName && e.preventDefault();
        var t = ee.getDataAttributes(this);
        e = p.getSelectorFromElement(this), p.makeArray(N.find(e)).forEach(function(e) {
            var i = (i = u(e, e$)) ? (null === i._parent && "string" == typeof t.parent && (i._config.parent = t.parent, i._parent = i._getParent()), "toggle") : t;
            eC._collapseInterface(e, i)
        })
    });
    var eL, ek = p.jQuery;
    void 0 !== ek && (eL = ek.fn[ev], ek.fn[ev] = eC._jQueryInterface, ek.fn[ev].Constructor = eC, ek.fn[ev].noConflict = function() {
        return ek.fn[ev] = eL, eC._jQueryInterface
    });
    var eD = "dropdown",
        eA = "bs.dropdown",
        eI = "." + eA,
        eP = RegExp("38|40|27"),
        eN = {
            HIDE: "hide" + eI,
            HIDDEN: "hidden" + eI,
            SHOW: "show" + eI,
            SHOWN: "shown" + eI,
            CLICK: "click" + eI,
            CLICK_DATA_API: "click" + eI + ".data-api",
            KEYDOWN_DATA_API: "keydown" + eI + ".data-api",
            KEYUP_DATA_API: "keyup" + eI + ".data-api"
        },
        eO = "disabled",
        eM = "show",
        eH = "dropdown-menu-right",
        eq = '[data-toggle="dropdown"]',
        ez = ".dropdown-menu",
        e9 = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        eR = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        eB = ((F = ej.prototype).toggle = function() {
            if (!this._element.disabled && !this._element.classList.contains(eO)) {
                var e = ej._getParentFromElement(this._element),
                    i = this._menu.classList.contains(eM);
                if (ej._clearMenus(), !i) {
                    var n = {
                        relatedTarget: this._element
                    };
                    if (!A.trigger(e, eN.SHOW, n).defaultPrevented) {
                        if (!this._inNavbar) {
                            if (void 0 === t) throw TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
                            i = this._element, "parent" === this._config.reference ? i = e : p.isElement(this._config.reference) && (i = this._config.reference, void 0 !== this._config.reference.jquery && (i = this._config.reference[0])), "scrollParent" !== this._config.boundary && e.classList.add("position-static"), this._popper = new t(i, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && !p.makeArray(N.closest(e, ".navbar-nav")).length && p.makeArray(document.body.children).forEach(function(e) {
                            return A.on(e, "mouseover", null, p.noop())
                        }), this._element.focus(), this._element.setAttribute("aria-expanded", !0), ee.toggleClass(this._menu, eM), ee.toggleClass(e, eM), A.trigger(e, eN.SHOWN, n)
                    }
                }
            }
        }, F.show = function() {
            var e, t;
            this._element.disabled || this._element.classList.contains(eO) || this._menu.classList.contains(eM) || (e = ej._getParentFromElement(this._element), t = {
                relatedTarget: this._element
            }, A.trigger(e, eN.SHOW, t).defaultPrevented || (ee.toggleClass(this._menu, eM), ee.toggleClass(e, eM), A.trigger(e, eN.SHOWN, t)))
        }, F.hide = function() {
            var e, t;
            this._element.disabled || this._element.classList.contains(eO) || !this._menu.classList.contains(eM) || (e = ej._getParentFromElement(this._element), t = {
                relatedTarget: this._element
            }, A.trigger(e, eN.HIDE, t).defaultPrevented || (ee.toggleClass(this._menu, eM), ee.toggleClass(e, eM), A.trigger(e, eN.HIDDEN, t)))
        }, F.dispose = function() {
            h(this._element, eA), A.off(this._element, eI), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
        }, F.update = function() {
            this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
        }, F._addEventListeners = function() {
            var e = this;
            A.on(this._element, eN.CLICK, function(t) {
                t.preventDefault(), t.stopPropagation(), e.toggle()
            })
        }, F._getConfig = function(e) {
            return e = r({}, this.constructor.Default, ee.getDataAttributes(this._element), e), p.typeCheckConfig(eD, e, this.constructor.DefaultType), e
        }, F._getMenuElement = function() {
            var e;
            return this._menu || (e = ej._getParentFromElement(this._element)) && (this._menu = N.findOne(ez, e)), this._menu
        }, F._getPlacement = function() {
            var e = this._element.parentNode,
                t = "bottom-start";
            return e.classList.contains("dropup") ? (t = "top-start", this._menu.classList.contains(eH) && (t = "top-end")) : e.classList.contains("dropright") ? t = "right-start" : e.classList.contains("dropleft") ? t = "left-start" : this._menu.classList.contains(eH) && (t = "bottom-end"), t
        }, F._detectNavbar = function() {
            return Boolean(N.closest(this._element, ".navbar"))
        }, F._getOffset = function() {
            var e = this,
                t = {};
            return "function" == typeof this._config.offset ? t.fn = function(t) {
                return t.offsets = r({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
            } : t.offset = this._config.offset, t
        }, F._getPopperConfig = function() {
            var e = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        enabled: this._config.flip
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary
                    }
                }
            };
            return "static" === this._config.display && (e.modifiers.applyStyle = {
                enabled: !1
            }), e
        }, ej._dropdownInterface = function(e, t) {
            var i = (i = u(e, eA)) || new ej(e, "object" == typeof t ? t : null);
            if ("string" == typeof t) {
                if (void 0 === i[t]) throw Error('No method named "' + t + '"');
                i[t]()
            }
        }, ej._jQueryInterface = function(e) {
            return this.each(function() {
                ej._dropdownInterface(this, e)
            })
        }, ej._clearMenus = function(e) {
            if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                for (var t = p.makeArray(N.find(eq)), i = 0, n = t.length; i < n; i++) {
                    var r = ej._getParentFromElement(t[i]),
                        s = u(t[i], eA),
                        o = {
                            relatedTarget: t[i]
                        };
                    e && "click" === e.type && (o.clickEvent = e), s && (s = s._menu, r.classList.contains(eM) && (e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && r.contains(e.target) || A.trigger(r, eN.HIDE, o).defaultPrevented || ("ontouchstart" in document.documentElement && p.makeArray(document.body.children).forEach(function(e) {
                        return A.off(e, "mouseover", null, p.noop())
                    }), t[i].setAttribute("aria-expanded", "false"), s.classList.remove(eM), r.classList.remove(eM), A.trigger(r, eN.HIDDEN, o))))
                }
        }, ej._getParentFromElement = function(e) {
            var t, i = p.getSelectorFromElement(e);
            return i && (t = N.findOne(i)), t || e.parentNode
        }, ej._dataApiKeydownHandler = function(e) {
            if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || N.closest(e.target, ez))) : eP.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !this.classList.contains(eO))) {
                var t = ej._getParentFromElement(this),
                    i = t.classList.contains(eM);
                if (!i || i && (27 === e.which || 32 === e.which)) return 27 === e.which && A.trigger(N.findOne(eq, t), "focus"), void ej._clearMenus();
                (i = p.makeArray(N.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", t))).length && (t = i.indexOf(e.target), 38 === e.which && 0 < t && t--, 40 === e.which && t < i.length - 1 && t++, t < 0 && (t = 0), i[t].focus())
            }
        }, ej._getInstance = function(e) {
            return u(e, eA)
        }, n(ej, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function() {
                return e9
            }
        }, {
            key: "DefaultType",
            get: function() {
                return eR
            }
        }]), ej);

    function ej(e, t) {
        this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), d(e, eA, this)
    }
    A.on(document, eN.KEYDOWN_DATA_API, eq, eB._dataApiKeydownHandler), A.on(document, eN.KEYDOWN_DATA_API, ez, eB._dataApiKeydownHandler), A.on(document, eN.CLICK_DATA_API, eB._clearMenus), A.on(document, eN.KEYUP_DATA_API, eB._clearMenus), A.on(document, eN.CLICK_DATA_API, eq, function(e) {
        e.preventDefault(), e.stopPropagation(), eB._dropdownInterface(this, "toggle")
    }), A.on(document, eN.CLICK_DATA_API, ".dropdown form", function(e) {
        return e.stopPropagation()
    });
    var e0, eW = p.jQuery;
    void 0 !== eW && (e0 = eW.fn[eD], eW.fn[eD] = eB._jQueryInterface, eW.fn[eD].Constructor = eB, eW.fn[eD].noConflict = function() {
        return eW.fn[eD] = e0, eB._jQueryInterface
    });
    var eF = "bs.modal",
        e1 = "." + eF,
        eV = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        eU = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        eG = {
            HIDE: "hide" + e1,
            HIDDEN: "hidden" + e1,
            SHOW: "show" + e1,
            SHOWN: "shown" + e1,
            FOCUSIN: "focusin" + e1,
            RESIZE: "resize" + e1,
            CLICK_DISMISS: "click.dismiss" + e1,
            KEYDOWN_DISMISS: "keydown.dismiss" + e1,
            MOUSEUP_DISMISS: "mouseup.dismiss" + e1,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + e1,
            CLICK_DATA_API: "click" + e1 + ".data-api"
        },
        eX = "modal-open",
        eY = "fade",
        e2 = "show",
        e4 = ".modal-dialog",
        e3 = (U = '[data-toggle="modal"]', ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"),
        eK = ".sticky-top",
        e5 = ((F = eQ.prototype).toggle = function(e) {
            return this._isShown ? this.hide() : this.show(e)
        }, F.show = function(e) {
            var t, i = this;
            this._isShown || this._isTransitioning || (this._element.classList.contains(eY) && (this._isTransitioning = !0), t = A.trigger(this._element, eG.SHOW, {
                relatedTarget: e
            }), this._isShown || t.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), A.on(this._element, eG.CLICK_DISMISS, '[data-dismiss="modal"]', function(e) {
                return i.hide(e)
            }), A.on(this._dialog, eG.MOUSEDOWN_DISMISS, function() {
                A.one(i._element, eG.MOUSEUP_DISMISS, function(e) {
                    e.target === i._element && (i._ignoreBackdropClick = !0)
                })
            }), this._showBackdrop(function() {
                return i._showElement(e)
            })))
        }, F.hide = function(e) {
            var t = this;
            e && e.preventDefault(), this._isShown && !this._isTransitioning && (e = A.trigger(this._element, eG.HIDE), this._isShown && !e.defaultPrevented && (this._isShown = !1, (e = this._element.classList.contains(eY)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), A.off(document, eG.FOCUSIN), this._element.classList.remove(e2), A.off(this._element, eG.CLICK_DISMISS), A.off(this._dialog, eG.MOUSEDOWN_DISMISS), e ? (e = p.getTransitionDurationFromElement(this._element), A.one(this._element, p.TRANSITION_END, function(e) {
                return t._hideModal(e)
            }), p.emulateTransitionEnd(this._element, e)) : this._hideModal()))
        }, F.dispose = function() {
            [window, this._element, this._dialog].forEach(function(e) {
                return A.off(e, e1)
            }), A.off(document, eG.FOCUSIN), h(this._element, eF), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
        }, F.handleUpdate = function() {
            this._adjustDialog()
        }, F._getConfig = function(e) {
            return e = r({}, eV, e), p.typeCheckConfig("modal", e, eU), e
        }, F._showElement = function(e) {
            var t = this,
                i = this._element.classList.contains(eY);

            function n() {
                t._config.focus && t._element.focus(), t._isTransitioning = !1, A.trigger(t._element, eG.SHOWN, {
                    relatedTarget: e
                })
            }
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._dialog.classList.contains("modal-dialog-scrollable") ? N.findOne(".modal-body", this._dialog).scrollTop = 0 : this._element.scrollTop = 0, i && p.reflow(this._element), this._element.classList.add(e2), this._config.focus && this._enforceFocus(), i ? (i = p.getTransitionDurationFromElement(this._dialog), A.one(this._dialog, p.TRANSITION_END, n), p.emulateTransitionEnd(this._dialog, i)) : n()
        }, F._enforceFocus = function() {
            var e = this;
            A.off(document, eG.FOCUSIN), A.on(document, eG.FOCUSIN, function(t) {
                document === t.target || e._element === t.target || e._element.contains(t.target) || e._element.focus()
            })
        }, F._setEscapeEvent = function() {
            var e = this;
            this._isShown && this._config.keyboard ? A.on(this._element, eG.KEYDOWN_DISMISS, function(t) {
                27 === t.which && (t.preventDefault(), e.hide())
            }) : this._isShown || A.off(this._element, eG.KEYDOWN_DISMISS)
        }, F._setResizeEvent = function() {
            var e = this;
            this._isShown ? A.on(window, eG.RESIZE, function(t) {
                return e.handleUpdate(t)
            }) : A.off(window, eG.RESIZE)
        }, F._hideModal = function() {
            var e = this;
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                document.body.classList.remove(eX), e._resetAdjustments(), e._resetScrollbar(), A.trigger(e._element, eG.HIDDEN)
            })
        }, F._removeBackdrop = function() {
            this._backdrop && (this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null)
        }, F._showBackdrop = function(e) {
            var t, i = this,
                n = this._element.classList.contains(eY) ? eY : "";
            this._isShown && this._config.backdrop ? (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), document.body.appendChild(this._backdrop), A.on(this._element, eG.CLICK_DISMISS, function(e) {
                i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
            }), n && p.reflow(this._backdrop), this._backdrop.classList.add(e2), e && (n ? (t = p.getTransitionDurationFromElement(this._backdrop), A.one(this._backdrop, p.TRANSITION_END, e), p.emulateTransitionEnd(this._backdrop, t)) : e())) : !this._isShown && this._backdrop ? (this._backdrop.classList.remove(e2), n = function() {
                i._removeBackdrop(), e && e()
            }, this._element.classList.contains(eY) ? (t = p.getTransitionDurationFromElement(this._backdrop), A.one(this._backdrop, p.TRANSITION_END, n), p.emulateTransitionEnd(this._backdrop, t)) : n()) : e && e()
        }, F._adjustDialog = function() {
            var e = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
        }, F._resetAdjustments = function() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }, F._checkScrollbar = function() {
            var e = document.body.getBoundingClientRect();
            this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
        }, F._setScrollbar = function() {
            var e, t, i = this;
            this._isBodyOverflowing && (p.makeArray(N.find(e3)).forEach(function(e) {
                var t = e.style.paddingRight,
                    n = window.getComputedStyle(e)["padding-right"];
                ee.setDataAttribute(e, "padding-right", t), e.style.paddingRight = parseFloat(n) + i._scrollbarWidth + "px"
            }), p.makeArray(N.find(eK)).forEach(function(e) {
                var t = e.style.marginRight,
                    n = window.getComputedStyle(e)["margin-right"];
                ee.setDataAttribute(e, "margin-right", t), e.style.marginRight = parseFloat(n) - i._scrollbarWidth + "px"
            }), e = document.body.style.paddingRight, t = window.getComputedStyle(document.body)["padding-right"], ee.setDataAttribute(document.body, "padding-right", e), document.body.style.paddingRight = parseFloat(t) + this._scrollbarWidth + "px"), document.body.classList.add(eX)
        }, F._resetScrollbar = function() {
            p.makeArray(N.find(e3)).forEach(function(e) {
                var t = ee.getDataAttribute(e, "padding-right");
                void 0 !== t && (ee.removeDataAttribute(e, "padding-right"), e.style.paddingRight = t)
            }), p.makeArray(N.find("" + eK)).forEach(function(e) {
                var t = ee.getDataAttribute(e, "margin-right");
                void 0 !== t && (ee.removeDataAttribute(e, "margin-right"), e.style.marginRight = t)
            });
            var e = ee.getDataAttribute(document.body, "padding-right");
            void 0 !== e ? (ee.removeDataAttribute(document.body, "padding-right"), document.body.style.paddingRight = e) : document.body.style.paddingRight = ""
        }, F._getScrollbarWidth = function() {
            var e = document.createElement("div");
            e.className = "modal-scrollbar-measure", document.body.appendChild(e);
            var t = e.getBoundingClientRect().width - e.clientWidth;
            return document.body.removeChild(e), t
        }, eQ._jQueryInterface = function(e, t) {
            return this.each(function() {
                var i = u(this, eF),
                    n = r({}, eV, ee.getDataAttributes(this), "object" == typeof e && e ? e : {});
                if (i = i || new eQ(this, n), "string" == typeof e) {
                    if (void 0 === i[e]) throw TypeError('No method named "' + e + '"');
                    i[e](t)
                } else n.show && i.show(t)
            })
        }, eQ._getInstance = function(e) {
            return u(e, eF)
        }, n(eQ, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function() {
                return eV
            }
        }]), eQ);

    function eQ(e, t) {
        this._config = this._getConfig(t), this._element = e, this._dialog = N.findOne(e4, e), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0, d(e, eF, this)
    }
    A.on(document, eG.CLICK_DATA_API, U, function(e) {
        var t, i = this,
            n = p.getSelectorFromElement(this);
        n && (t = N.findOne(n)), n = u(t, eF) ? "toggle" : r({}, ee.getDataAttributes(t), ee.getDataAttributes(this)), "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault(), A.one(t, eG.SHOW, function(e) {
            e.defaultPrevented || A.one(t, eG.HIDDEN, function() {
                p.isVisible(i) && i.focus()
            })
        }), (u(t, eF) || new e5(t, n)).show(this)
    });
    var e7, e6 = p.jQuery;
    void 0 !== e6 && (e7 = e6.fn.modal, e6.fn.modal = e5._jQueryInterface, e6.fn.modal.Constructor = e5, e6.fn.modal.noConflict = function() {
        return e6.fn.modal = e7, e5._jQueryInterface
    });
    var eZ = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        eJ = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        te = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

    function tt(e, t, i) {
        if (0 === e.length) return e;
        if (i && "function" == typeof i) return i(e);
        e = (new window.DOMParser).parseFromString(e, "text/html");
        for (var n = Object.keys(t), r = p.makeArray(e.body.querySelectorAll("*")), s = 0, o = r.length; s < o; s++) ! function(e) {
            var i = r[e],
                s = i.nodeName.toLowerCase();
            if (-1 === n.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i);
            e = p.makeArray(i.attributes);
            var o = [].concat(t["*"] || [], t[s] || []);
            e.forEach(function(e) {
                ! function(e, t) {
                    var i = e.nodeName.toLowerCase();
                    if (-1 !== t.indexOf(i)) return -1 === eZ.indexOf(i) || Boolean(e.nodeValue.match(eJ) || e.nodeValue.match(te));
                    for (var n = t.filter(function(e) {
                            return e instanceof RegExp
                        }), r = 0, s = n.length; r < s; r++)
                        if (i.match(n[r])) return 1
                }(e, o) && i.removeAttribute(e.nodeName)
            })
        }(s);
        return e.body.innerHTML
    }
    var ti, tn = "tooltip",
        tr = RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        ts = ["sanitize", "whiteList", "sanitizeFn"],
        to = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        },
        ta = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        tl = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            }
        },
        tc = "show",
        td = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        },
        tu = "fade",
        th = "show",
        tp = "hover",
        tf = "focus",
        tm = ((U = tv.prototype).enable = function() {
            this._isEnabled = !0
        }, U.disable = function() {
            this._isEnabled = !1
        }, U.toggleEnabled = function() {
            this._isEnabled = !this._isEnabled
        }, U.toggle = function(e) {
            var t, i;
            this._isEnabled && (e ? (t = this.constructor.DATA_KEY, (i = u(e.delegateTarget, t)) || (i = new this.constructor(e.delegateTarget, this._getDelegateConfig()), d(e.delegateTarget, t, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)) : this.getTipElement().classList.contains(th) ? this._leave(null, this) : this._enter(null, this))
        }, U.dispose = function() {
            clearTimeout(this._timeout), h(this.element, this.constructor.DATA_KEY), A.off(this.element, this.constructor.EVENT_KEY), A.off(N.closest(this.element, ".modal"), "hide.bs.modal"), this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
        }, U.show = function() {
            var e, i, n, r = this;
            if ("none" === this.element.style.display) throw Error("Please use show on visible elements");
            this.isWithContent() && this._isEnabled && (i = A.trigger(this.element, this.constructor.Event.SHOW), e = (null !== (n = p.findShadowRoot(this.element)) ? n : this.element.ownerDocument.documentElement).contains(this.element), !i.defaultPrevented && e && (n = this.getTipElement(), i = p.getUID(this.constructor.NAME), n.setAttribute("id", i), this.element.setAttribute("aria-describedby", i), this.setContent(), this.config.animation && n.classList.add(tu), e = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement, i = this._getAttachment(e), this.addAttachmentClass(i), e = this._getContainer(), d(n, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || e.appendChild(n), A.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new t(this.element, n, {
                placement: i,
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        behavior: this.config.fallbackPlacement
                    },
                    arrow: {
                        element: ".tooltip-arrow"
                    },
                    preventOverflow: {
                        boundariesElement: this.config.boundary
                    }
                },
                onCreate: function(e) {
                    e.originalPlacement !== e.placement && r._handlePopperPlacementChange(e)
                },
                onUpdate: function(e) {
                    return r._handlePopperPlacementChange(e)
                }
            }), n.classList.add(th), "ontouchstart" in document.documentElement && p.makeArray(document.body.children).forEach(function(e) {
                A.on(e, "mouseover", p.noop())
            }), i = function() {
                r.config.animation && r._fixTransition();
                var e = r._hoverState;
                r._hoverState = null, A.trigger(r.element, r.constructor.Event.SHOWN), "out" === e && r._leave(null, r)
            }, this.tip.classList.contains(tu) ? (n = p.getTransitionDurationFromElement(this.tip), A.one(this.tip, p.TRANSITION_END, i), p.emulateTransitionEnd(this.tip, n)) : i()))
        }, U.hide = function(e) {
            function t() {
                n._hoverState !== tc && r.parentNode && r.parentNode.removeChild(r), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), A.trigger(n.element, n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
            }
            var i, n = this,
                r = this.getTipElement();
            A.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented || (r.classList.remove(th), "ontouchstart" in document.documentElement && p.makeArray(document.body.children).forEach(function(e) {
                return A.off(e, "mouseover", p.noop)
            }), this._activeTrigger.click = !1, this._activeTrigger[tf] = !1, this._activeTrigger[tp] = !1, this.tip.classList.contains(tu) ? (i = p.getTransitionDurationFromElement(r), A.one(r, p.TRANSITION_END, t), p.emulateTransitionEnd(r, i)) : t(), this._hoverState = "")
        }, U.update = function() {
            null !== this._popper && this._popper.scheduleUpdate()
        }, U.isWithContent = function() {
            return Boolean(this.getTitle())
        }, U.addAttachmentClass = function(e) {
            this.getTipElement().classList.add("bs-tooltip-" + e)
        }, U.getTipElement = function() {
            if (this.tip) return this.tip;
            var e = document.createElement("div");
            return e.innerHTML = this.config.template, this.tip = e.children[0], this.tip
        }, U.setContent = function() {
            var e = this.getTipElement();
            this.setElementContent(N.findOne(".tooltip-inner", e), this.getTitle()), e.classList.remove(tu), e.classList.remove(th)
        }, U.setElementContent = function(e, t) {
            if (null !== e) return "object" == typeof t && (t.nodeType || t.jquery) ? (t.jquery && (t = t[0]), void(this.config.html ? t.parentNode !== e && (e.innerHTML = "", e.appendChild(t)) : e.innerText = t.textContent)) : void(this.config.html ? (this.config.sanitize && (t = tt(t, this.config.whiteList, this.config.sanitizeFn)), e.innerHTML = t) : e.innerText = t)
        }, U.getTitle = function() {
            return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
        }, U._getOffset = function() {
            var e = this,
                t = {};
            return "function" == typeof this.config.offset ? t.fn = function(t) {
                return t.offsets = r({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
            } : t.offset = this.config.offset, t
        }, U._getContainer = function() {
            return !1 === this.config.container ? document.body : p.isElement(this.config.container) ? this.config.container : N.findOne(this.config.container)
        }, U._getAttachment = function(e) {
            return ta[e.toUpperCase()]
        }, U._setListeners = function() {
            var e = this;
            this.config.trigger.split(" ").forEach(function(t) {
                var i;
                "click" === t ? A.on(e.element, e.constructor.Event.CLICK, e.config.selector, function(t) {
                    return e.toggle(t)
                }) : "manual" !== t && (i = t === tp ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN, t = t === tp ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT, A.on(e.element, i, e.config.selector, function(t) {
                    return e._enter(t)
                }), A.on(e.element, t, e.config.selector, function(t) {
                    return e._leave(t)
                }))
            }), A.on(N.closest(this.element, ".modal"), "hide.bs.modal", function() {
                e.element && e.hide()
            }), this.config.selector ? this.config = r({}, this.config, {
                trigger: "manual",
                selector: ""
            }) : this._fixTitle()
        }, U._fixTitle = function() {
            var e = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" != e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
        }, U._enter = function(e, t) {
            var i = this.constructor.DATA_KEY;
            (t = t || u(e.delegateTarget, i)) || (t = new this.constructor(e.delegateTarget, this._getDelegateConfig()), d(e.delegateTarget, i, t)), e && (t._activeTrigger["focusin" === e.type ? tf : tp] = !0), t.getTipElement().classList.contains(th) || t._hoverState === tc ? t._hoverState = tc : (clearTimeout(t._timeout), t._hoverState = tc, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
                t._hoverState === tc && t.show()
            }, t.config.delay.show) : t.show())
        }, U._leave = function(e, t) {
            var i = this.constructor.DATA_KEY;
            (t = t || u(e.delegateTarget, i)) || (t = new this.constructor(e.delegateTarget, this._getDelegateConfig()), d(e.delegateTarget, i, t)), e && (t._activeTrigger["focusout" === e.type ? tf : tp] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
                "out" === t._hoverState && t.hide()
            }, t.config.delay.hide) : t.hide())
        }, U._isWithActiveTrigger = function() {
            for (var e in this._activeTrigger)
                if (this._activeTrigger[e]) return !0;
            return !1
        }, U._getConfig = function(e) {
            var t = ee.getDataAttributes(this.element);
            return Object.keys(t).forEach(function(e) {
                -1 !== ts.indexOf(e) && delete t[e]
            }), e && "object" == typeof e.container && e.container.jquery && (e.container = e.container[0]), "number" == typeof(e = r({}, this.constructor.Default, t, "object" == typeof e && e ? e : {})).delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), p.typeCheckConfig(tn, e, this.constructor.DefaultType), e.sanitize && (e.template = tt(e.template, e.whiteList, e.sanitizeFn)), e
        }, U._getDelegateConfig = function() {
            var e = {};
            if (this.config)
                for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
            return e
        }, U._cleanTipClass = function() {
            var e = this.getTipElement(),
                t = e.getAttribute("class").match(tr);
            null !== t && t.length && t.map(function(e) {
                return e.trim()
            }).forEach(function(t) {
                return e.classList.remove(t)
            })
        }, U._handlePopperPlacementChange = function(e) {
            var t = e.instance;
            this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
        }, U._fixTransition = function() {
            var e = this.getTipElement(),
                t = this.config.animation;
            null === e.getAttribute("x-placement") && (e.classList.remove(tu), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
        }, tv._jQueryInterface = function(e) {
            return this.each(function() {
                var t = u(this, "bs.tooltip");
                if ((t || !/dispose|hide/.test(e)) && (t = t || new tv(this, "object" == typeof e && e), "string" == typeof e)) {
                    if (void 0 === t[e]) throw TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, tv._getInstance = function(e) {
            return u(e, "bs.tooltip")
        }, n(tv, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function() {
                return tl
            }
        }, {
            key: "NAME",
            get: function() {
                return tn
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return "bs.tooltip"
            }
        }, {
            key: "Event",
            get: function() {
                return td
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return ".bs.tooltip"
            }
        }, {
            key: "DefaultType",
            get: function() {
                return to
            }
        }]), tv),
        tg = p.jQuery;

    function tv(e, i) {
        if (void 0 === t) throw TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(i), this.tip = null, this._setListeners(), d(e, this.constructor.DATA_KEY, this)
    }
    void 0 !== tg && (ti = tg.fn.tooltip, tg.fn.tooltip = tm._jQueryInterface, tg.fn.tooltip.Constructor = tm, tg.fn.tooltip.noConflict = function() {
        return tg.fn.tooltip = ti, tm._jQueryInterface
    });
    var t$, ty = RegExp("(^|\\s)bs-popover\\S+", "g"),
        tb = r({}, tm.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        tw = r({}, tm.DefaultType, {
            content: "(string|element|function)"
        }),
        t_ = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        },
        tE = function(e) {
            function t() {
                return e.apply(this, arguments) || this
            }
            r = e, (i = t).prototype = Object.create(r.prototype), (i.prototype.constructor = i).__proto__ = r;
            var i, r = t.prototype;
            return r.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function(e) {
                this.getTipElement().classList.add("bs-popover-" + e)
            }, r.setContent = function() {
                var e = this.getTipElement();
                this.setElementContent(N.findOne(".popover-header", e), this.getTitle());
                var t = this._getContent();
                "function" == typeof t && (t = t.call(this.element)), this.setElementContent(N.findOne(".popover-body", e), t), e.classList.remove("fade"), e.classList.remove("show")
            }, r._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function() {
                var e = this.getTipElement(),
                    t = e.getAttribute("class").match(ty);
                null !== t && 0 < t.length && t.map(function(e) {
                    return e.trim()
                }).forEach(function(t) {
                    return e.classList.remove(t)
                })
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var i = u(this, "bs.popover");
                    if ((i || !/dispose|hide/.test(e)) && (i || (i = new t(this, "object" == typeof e ? e : null), d(this, "bs.popover", i)), "string" == typeof e)) {
                        if (void 0 === i[e]) throw TypeError('No method named "' + e + '"');
                        i[e]()
                    }
                })
            }, t._getInstance = function(e) {
                return u(e, "bs.popover")
            }, n(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.3.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return tb
                }
            }, {
                key: "NAME",
                get: function() {
                    return "popover"
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return "bs.popover"
                }
            }, {
                key: "Event",
                get: function() {
                    return t_
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return tw
                }
            }]), t
        }(tm),
        tT = p.jQuery;
    void 0 !== tT && (t$ = tT.fn.popover, tT.fn.popover = tE._jQueryInterface, tT.fn.popover.Constructor = tE, tT.fn.popover.noConflict = function() {
        return tT.fn.popover = t$, tE._jQueryInterface
    });
    var tx = "scrollspy",
        tS = "bs.scrollspy",
        tC = "." + tS,
        t8 = {
            offset: 10,
            method: "auto",
            target: ""
        },
        tL = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        tk = {
            ACTIVATE: "activate" + tC,
            SCROLL: "scroll" + tC,
            LOAD_DATA_API: "load" + tC + ".data-api"
        },
        tD = "active",
        tA = ".nav-link",
        tI = ".list-group-item",
        tP = "position",
        tN = ((U = tO.prototype).refresh = function() {
            var e = this,
                t = this._scrollElement === this._scrollElement.window ? "offset" : tP,
                i = "auto" === this._config.method ? t : this._config.method,
                n = i === tP ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), p.makeArray(N.find(this._selector)).map(function(e) {
                var t, r = p.getSelectorFromElement(e);
                return r && (t = N.findOne(r)), t && ((e = t.getBoundingClientRect()).width || e.height) ? [ee[i](t).top + n, r] : null
            }).filter(function(e) {
                return e
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).forEach(function(t) {
                e._offsets.push(t[0]), e._targets.push(t[1])
            })
        }, U.dispose = function() {
            h(this._element, tS), A.off(this._scrollElement, tC), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
        }, U._getConfig = function(e) {
            var t;
            return "string" != typeof(e = r({}, t8, "object" == typeof e && e ? e : {})).target && ((t = e.target.id) || (t = p.getUID(tx), e.target.id = t), e.target = "#" + t), p.typeCheckConfig(tx, e, tL), e
        }, U._getScrollTop = function() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }, U._getScrollHeight = function() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }, U._getOffsetHeight = function() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }, U._process = function() {
            var e = this._getScrollTop() + this._config.offset,
                t = this._getScrollHeight(),
                i = this._config.offset + t - this._getOffsetHeight();
            if (this._scrollHeight !== t && this.refresh(), i <= e) i = this._targets[this._targets.length - 1], this._activeTarget !== i && this._activate(i);
            else {
                if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                for (var n = this._offsets.length; n--;) this._activeTarget !== this._targets[n] && e >= this._offsets[n] && (void 0 === this._offsets[n + 1] || e < this._offsets[n + 1]) && this._activate(this._targets[n])
            }
        }, U._activate = function(e) {
            this._activeTarget = e, this._clear();
            var t = this._selector.split(",").map(function(t) {
                return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
            });
            (t = N.findOne(t.join(","))).classList.contains("dropdown-item") ? (N.findOne(".dropdown-toggle", N.closest(t, ".dropdown")).classList.add(tD), t.classList.add(tD)) : (t.classList.add(tD), N.parents(t, ".nav, .list-group").forEach(function(e) {
                N.prev(e, tA + ", " + tI).forEach(function(e) {
                    return e.classList.add(tD)
                }), N.prev(e, ".nav-item").forEach(function(e) {
                    N.children(e, tA).forEach(function(e) {
                        return e.classList.add(tD)
                    })
                })
            })), A.trigger(this._scrollElement, tk.ACTIVATE, {
                relatedTarget: e
            })
        }, U._clear = function() {
            p.makeArray(N.find(this._selector)).filter(function(e) {
                return e.classList.contains(tD)
            }).forEach(function(e) {
                return e.classList.remove(tD)
            })
        }, tO._jQueryInterface = function(e) {
            return this.each(function() {
                var t = (t = u(this, tS)) || new tO(this, "object" == typeof e && e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, tO._getInstance = function(e) {
            return u(e, tS)
        }, n(tO, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "Default",
            get: function() {
                return t8
            }
        }]), tO);

    function tO(e, t) {
        var i = this;
        this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + tA + "," + this._config.target + " " + tI + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, A.on(this._scrollElement, tk.SCROLL, function(e) {
            return i._process(e)
        }), this.refresh(), this._process(), d(e, tS, this)
    }
    A.on(window, tk.LOAD_DATA_API, function() {
        p.makeArray(N.find('[data-spy="scroll"]')).forEach(function(e) {
            return new tN(e, ee.getDataAttributes(e))
        })
    });
    var tM, tH = p.jQuery;
    void 0 !== tH && (tM = tH.fn[tx], tH.fn[tx] = tN._jQueryInterface, tH.fn[tx].Constructor = tN, tH.fn[tx].noConflict = function() {
        return tH.fn[tx] = tM, tN._jQueryInterface
    });
    var tq = "bs.tab",
        tz = {
            HIDE: "hide" + (U = "." + tq),
            HIDDEN: "hidden" + U,
            SHOW: "show" + U,
            SHOWN: "shown" + U,
            CLICK_DATA_API: "click" + U + ".data-api"
        },
        t9 = "active",
        tR = ".active",
        tB = ":scope > li > .active",
        tj = ((U = t0.prototype).show = function() {
            var e, t, i, n, r, s = this;
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(t9) || this._element.classList.contains("disabled") || (r = N.closest(this._element, ".nav, .list-group"), t = p.getSelectorFromElement(this._element), r && (n = "UL" === r.nodeName || "OL" === r.nodeName ? tB : tR, i = (i = p.makeArray(N.find(n, r)))[i.length - 1]), n = null, i && (n = A.trigger(i, tz.HIDE, {
                relatedTarget: this._element
            })), A.trigger(this._element, tz.SHOW, {
                relatedTarget: i
            }).defaultPrevented || null !== n && n.defaultPrevented || (t && (e = N.findOne(t)), this._activate(this._element, r), r = function() {
                A.trigger(i, tz.HIDDEN, {
                    relatedTarget: s._element
                }), A.trigger(s._element, tz.SHOWN, {
                    relatedTarget: i
                })
            }, e ? this._activate(e, e.parentNode, r) : r()))
        }, U.dispose = function() {
            h(this._element, tq), this._element = null
        }, U._activate = function(e, t, i) {
            var n = this,
                r = (t && ("UL" === t.nodeName || "OL" === t.nodeName) ? N.find(tB, t) : N.children(t, tR))[0],
                s = i && r && r.classList.contains("fade");
            t = function() {
                return n._transitionComplete(e, r, i)
            }, r && s ? (s = p.getTransitionDurationFromElement(r), r.classList.remove("show"), A.one(r, p.TRANSITION_END, t), p.emulateTransitionEnd(r, s)) : t()
        }, U._transitionComplete = function(e, t, i) {
            var n;
            t && (t.classList.remove(t9), (n = N.findOne(":scope > .dropdown-menu .active", t.parentNode)) && n.classList.remove(t9), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)), e.classList.add(t9), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), p.reflow(e), e.classList.contains("fade") && e.classList.add("show"), e.parentNode && e.parentNode.classList.contains("dropdown-menu") && (N.closest(e, ".dropdown") && p.makeArray(N.find(".dropdown-toggle")).forEach(function(e) {
                return e.classList.add(t9)
            }), e.setAttribute("aria-expanded", !0)), i && i()
        }, t0._jQueryInterface = function(e) {
            return this.each(function() {
                var t = u(this, tq) || new t0(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, t0._getInstance = function(e) {
            return u(e, tq)
        }, n(t0, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }]), t0);

    function t0(e) {
        this._element = e, d(this._element, tq, this)
    }
    A.on(document, tz.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(e) {
        e.preventDefault(), (u(this, tq) || new tj(this)).show()
    });
    var tW, tF = p.jQuery;
    void 0 !== tF && (tW = tF.fn.tab, tF.fn.tab = tj._jQueryInterface, tF.fn.tab.Constructor = tj, tF.fn.tab.noConflict = function() {
        return tF.fn.tab = tW, tj._jQueryInterface
    });
    var t1, tV = "bs.toast",
        tU = {
            CLICK_DISMISS: "click.dismiss" + (U = "." + tV),
            HIDE: "hide" + U,
            HIDDEN: "hidden" + U,
            SHOW: "show" + U,
            SHOWN: "shown" + U
        },
        tG = "show",
        tX = "showing",
        tY = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        t2 = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        t4 = ((U = tK.prototype).show = function() {
            var e, t = this;

            function i() {
                t._element.classList.remove(tX), t._element.classList.add(tG), A.trigger(t._element, tU.SHOWN), t._config.autohide && t.hide()
            }
            A.trigger(this._element, tU.SHOW), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), this._element.classList.add(tX), this._config.animation ? (e = p.getTransitionDurationFromElement(this._element), A.one(this._element, p.TRANSITION_END, i), p.emulateTransitionEnd(this._element, e)) : i()
        }, U.hide = function(e) {
            var t = this;
            this._element.classList.contains(tG) && (A.trigger(this._element, tU.HIDE), e ? this._close() : this._timeout = setTimeout(function() {
                t._close()
            }, this._config.delay))
        }, U.dispose = function() {
            clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(tG) && this._element.classList.remove(tG), A.off(this._element, tU.CLICK_DISMISS), h(this._element, tV), this._element = null, this._config = null
        }, U._getConfig = function(e) {
            return e = r({}, t2, ee.getDataAttributes(this._element), "object" == typeof e && e ? e : {}), p.typeCheckConfig("toast", e, this.constructor.DefaultType), e
        }, U._setListeners = function() {
            var e = this;
            A.on(this._element, tU.CLICK_DISMISS, '[data-dismiss="toast"]', function() {
                return e.hide(!0)
            })
        }, U._close = function() {
            function e() {
                i._element.classList.add("hide"), A.trigger(i._element, tU.HIDDEN)
            }
            var t, i = this;
            this._element.classList.remove(tG), this._config.animation ? (t = p.getTransitionDurationFromElement(this._element), A.one(this._element, p.TRANSITION_END, e), p.emulateTransitionEnd(this._element, t)) : e()
        }, tK._jQueryInterface = function(e) {
            return this.each(function() {
                var t = (t = u(this, tV)) || new tK(this, "object" == typeof e && e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw TypeError('No method named "' + e + '"');
                    t[e](this)
                }
            })
        }, tK._getInstance = function(e) {
            return u(e, tV)
        }, n(tK, null, [{
            key: "VERSION",
            get: function() {
                return "4.3.1"
            }
        }, {
            key: "DefaultType",
            get: function() {
                return tY
            }
        }, {
            key: "Default",
            get: function() {
                return t2
            }
        }]), tK),
        t3 = p.jQuery;

    function tK(e, t) {
        this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners(), d(e, tV, this)
    }
    void 0 !== t3 && (t1 = t3.fn.toast, t3.fn.toast = t4._jQueryInterface, t3.fn.toast.Constructor = t4, t3.fn.toast.noConflict = function() {
        return t3.fn.toast = t1, t4._jQueryInterface
    }), e.Util = p, e.Alert = H, e.Button = G, e.Carousel = ep, e.Collapse = eC, e.Dropdown = eB, e.Modal = e5, e.Popover = tE, e.ScrollSpy = tN, e.Tab = tj, e.Toast = t4, e.Tooltip = tm, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function() {
    "use strict";
    var e = "undefined" == typeof document ? {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {
                blur: function() {},
                nodeName: ""
            },
            querySelector: function() {
                return null
            },
            querySelectorAll: function() {
                return []
            },
            getElementById: function() {
                return null
            },
            createEvent: function() {
                return {
                    initEvent: function() {}
                }
            },
            createElement: function() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function() {},
                    getElementsByTagName: function() {
                        return []
                    }
                }
            },
            location: {
                hash: ""
            }
        } : document,
        t = "undefined" == typeof window ? {
            document: e,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function() {
                return this
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
                return {
                    getPropertyValue: function() {
                        return ""
                    }
                }
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
        } : window,
        i = function(e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return this.length = e.length, this
        };

    function n(n, r) {
        var s = [],
            o = 0;
        if (n && !r && n instanceof i) return n;
        if (n) {
            if ("string" == typeof n) {
                var a, l, c = n.trim();
                if (0 <= c.indexOf("<") && 0 <= c.indexOf(">")) {
                    var d = "div";
                    for (0 === c.indexOf("<li") && (d = "ul"), 0 === c.indexOf("<tr") && (d = "tbody"), 0 !== c.indexOf("<td") && 0 !== c.indexOf("<th") || (d = "tr"), 0 === c.indexOf("<tbody") && (d = "table"), 0 === c.indexOf("<option") && (d = "select"), (l = e.createElement(d)).innerHTML = c, o = 0; o < l.childNodes.length; o += 1) s.push(l.childNodes[o])
                } else
                    for (a = r || "#" !== n[0] || n.match(/[ .<>:~]/) ? (r || e).querySelectorAll(n.trim()) : [e.getElementById(n.trim().split("#")[1])], o = 0; o < a.length; o += 1) a[o] && s.push(a[o])
            } else if (n.nodeType || n === t || n === e) s.push(n);
            else if (0 < n.length && n[0].nodeType)
                for (o = 0; o < n.length; o += 1) s.push(n[o])
        }
        return new i(s)
    }

    function r(e) {
        for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    n.fn = i.prototype, n.Class = i, n.Dom7 = i;
    var s = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var n = 0; n < this.length; n += 1)
                if (2 === i.length) this[n].setAttribute(e, t);
                else
                    for (var r in e) this[n][r] = e[r], this[n].setAttribute(r, e[r]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var n = 0; n < this.length; n += 1)(i = this[n]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i = e[0],
                r = e[1],
                s = e[2],
                o = e[3];

            function a(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (0 > i.indexOf(e) && i.unshift(e), n(t).is(r)) s.apply(t, i);
                    else
                        for (var o = n(t).parents(), a = 0; a < o.length; a += 1) n(o[a]).is(r) && s.apply(o[a], i)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                0 > t.indexOf(e) && t.unshift(e), s.apply(this, t)
            }
            "function" == typeof e[1] && (i = e[0], s = e[1], o = e[2], r = void 0), o = o || !1;
            for (var c, d = i.split(" "), u = 0; u < this.length; u += 1) {
                var h = this[u];
                if (r)
                    for (c = 0; c < d.length; c += 1) {
                        var p = d[c];
                        h.dom7LiveListeners || (h.dom7LiveListeners = {}), h.dom7LiveListeners[p] || (h.dom7LiveListeners[p] = []), h.dom7LiveListeners[p].push({
                            listener: s,
                            proxyListener: a
                        }), h.addEventListener(p, a, o)
                    } else
                        for (c = 0; c < d.length; c += 1) {
                            var f = d[c];
                            h.dom7Listeners || (h.dom7Listeners = {}), h.dom7Listeners[f] || (h.dom7Listeners[f] = []), h.dom7Listeners[f].push({
                                listener: s,
                                proxyListener: l
                            }), h.addEventListener(f, l, o)
                        }
            }
            return this
        },
        off: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i = e[0],
                n = e[1],
                r = e[2],
                s = e[3];
            "function" == typeof e[1] && (i = e[0], r = e[1], s = e[2], n = void 0), s = s || !1;
            for (var o = i.split(" "), a = 0; a < o.length; a += 1)
                for (var l = o[a], c = 0; c < this.length; c += 1) {
                    var d = this[c],
                        u = void 0;
                    if (!n && d.dom7Listeners ? u = d.dom7Listeners[l] : n && d.dom7LiveListeners && (u = d.dom7LiveListeners[l]), u && u.length)
                        for (var h = u.length - 1; 0 <= h; --h) {
                            var p = u[h];
                            (r && p.listener === r || r && p.listener && p.listener.dom7proxy && p.listener.dom7proxy === r || !r) && (d.removeEventListener(l, p.proxyListener, s), u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var i = [], n = arguments.length; n--;) i[n] = arguments[n];
            for (var r = i[0].split(" "), s = i[1], o = 0; o < r.length; o += 1)
                for (var a = r[o], l = 0; l < this.length; l += 1) {
                    var c = this[l],
                        d = void 0;
                    try {
                        d = new t.CustomEvent(a, {
                            detail: s,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (u) {
                        (d = e.createEvent("Event")).initEvent(a, !0, !0), d.detail = s
                    }
                    c.dom7EventData = i.filter(function(e, t) {
                        return 0 < t
                    }), c.dispatchEvent(d), c.dom7EventData = [], delete c.dom7EventData
                }
            return this
        },
        transitionEnd: function(e) {
            var t, i = ["webkitTransitionEnd", "transitionend"],
                n = this;

            function r(s) {
                if (s.target === this)
                    for (e.call(this, s), t = 0; t < i.length; t += 1) n.off(i[t], r)
            }
            if (e)
                for (t = 0; t < i.length; t += 1) n.on(i[t], r);
            return this
        },
        outerWidth: function(e) {
            return 0 < this.length ? e ? (e = this.styles(), this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))) : this[0].offsetWidth : null
        },
        outerHeight: function(e) {
            return 0 < this.length ? e ? (e = this.styles(), this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))) : this[0].offsetHeight : null
        },
        offset: function() {
            if (0 < this.length) {
                var i = (o = this[0]).getBoundingClientRect(),
                    n = e.body,
                    r = o.clientTop || n.clientTop || 0,
                    s = o.clientLeft || n.clientLeft || 0,
                    o = (n = o === t ? t.scrollY : o.scrollTop, o === t ? t.scrollX : o.scrollLeft);
                return {
                    top: i.top + n - r,
                    left: i.left + o - s
                }
            }
            return null
        },
        css: function(e, i) {
            var n;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (n = 0; n < this.length; n += 1)
                        for (var r in e) this[n].style[r] = e[r];
                    return this
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 !== arguments.length || "string" != typeof e) return this;
            for (n = 0; n < this.length; n += 1) this[n].style[e] = i;
            return this
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length && !1 !== e.call(this[t], t, this[t]); t += 1);
            return this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(r) {
            var s, o, a = this[0];
            if (!a || void 0 === r) return !1;
            if ("string" == typeof r) {
                if (a.matches) return a.matches(r);
                if (a.webkitMatchesSelector) return a.webkitMatchesSelector(r);
                if (a.msMatchesSelector) return a.msMatchesSelector(r);
                for (s = n(r), o = 0; o < s.length; o += 1)
                    if (s[o] === a) return !0;
                return !1
            }
            if (r === e) return a === e;
            if (r === t) return a === t;
            if (r.nodeType || r instanceof i) {
                for (s = r.nodeType ? [r] : r, o = 0; o < s.length; o += 1)
                    if (s[o] === a) return !0
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t = this.length;
            return new i(t - 1 < e ? [] : e < 0 ? (t += e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var t, n = [], r = arguments.length; r--;) n[r] = arguments[r];
            for (var s = 0; s < n.length; s += 1) {
                t = n[s];
                for (var o = 0; o < this.length; o += 1)
                    if ("string" == typeof t) {
                        var a = e.createElement("div");
                        for (a.innerHTML = t; a.firstChild;) this[o].appendChild(a.firstChild)
                    } else if (t instanceof i)
                    for (var l = 0; l < t.length; l += 1) this[o].appendChild(t[l]);
                else this[o].appendChild(t)
            }
            return this
        },
        prepend: function(t) {
            for (var n, r = 0; r < this.length; r += 1)
                if ("string" == typeof t) {
                    var s = e.createElement("div");
                    for (s.innerHTML = t, n = s.childNodes.length - 1; 0 <= n; --n) this[r].insertBefore(s.childNodes[n], this[r].childNodes[0])
                } else if (t instanceof i)
                for (n = 0; n < t.length; n += 1) this[r].insertBefore(t[n], this[r].childNodes[0]);
            else this[r].insertBefore(t, this[r].childNodes[0]);
            return this
        },
        next: function(e) {
            return new i(0 < this.length ? e ? this[0].nextElementSibling && n(this[0].nextElementSibling).is(e) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
        },
        nextAll: function(e) {
            var t = [],
                r = this[0];
            if (!r) return new i([]);
            for (; r.nextElementSibling;) {
                var s = r.nextElementSibling;
                e && !n(s).is(e) || t.push(s), r = s
            }
            return new i(t)
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return new i(e ? t.previousElementSibling && n(t.previousElementSibling).is(e) ? [t.previousElementSibling] : [] : t.previousElementSibling ? [t.previousElementSibling] : [])
            }
            return new i([])
        },
        prevAll: function(e) {
            var t = [],
                r = this[0];
            if (!r) return new i([]);
            for (; r.previousElementSibling;) {
                var s = r.previousElementSibling;
                e && !n(s).is(e) || t.push(s), r = s
            }
            return new i(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) null === this[i].parentNode || e && !n(this[i].parentNode).is(e) || t.push(this[i].parentNode);
            return n(r(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].parentNode; s;) e && !n(s).is(e) || t.push(s), s = s.parentNode;
            return n(r(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], n = 0; n < this.length; n += 1)
                for (var r = this[n].querySelectorAll(e), s = 0; s < r.length; s += 1) t.push(r[s]);
            return new i(t)
        },
        children: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                for (var o = this[s].childNodes, a = 0; a < o.length; a += 1) e ? 1 === o[a].nodeType && n(o[a]).is(e) && t.push(o[a]) : 1 === o[a].nodeType && t.push(o[a]);
            return new i(r(t))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            for (e = 0; e < t.length; e += 1)
                for (var r = n(t[e]), s = 0; s < r.length; s += 1) this[this.length] = r[s], this.length += 1;
            return this
        },
        styles: function() {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(s).forEach(function(e) {
        n.fn[e] = s[e]
    });
    var o, a = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach(function(e) {
                    try {
                        t[e] = null
                    } catch (i) {}
                    try {
                        delete t[e]
                    } catch (n) {}
                })
            },
            nextTick: function(e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function() {
                return Date.now()
            },
            getTranslate: function(e, i) {
                var n, r, s;
                return void 0 === i && (i = "x"), e = t.getComputedStyle(e, null), t.WebKitCSSMatrix ? (6 < (r = e.transform || e.webkitTransform).split(",").length && (r = r.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), s = new t.WebKitCSSMatrix("none" === r ? "" : r)) : n = (s = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (r = t.WebKitCSSMatrix ? s.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])), "y" === i && (r = t.WebKitCSSMatrix ? s.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])), r || 0
            },
            parseUrlQuery: function(e) {
                var i, n, r, s, o = {};
                if ("string" == typeof(e = e || t.location.href) && e.length)
                    for (s = (n = (e = -1 < e.indexOf("?") ? e.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                            return "" !== e
                        })).length, i = 0; i < s; i += 1) o[decodeURIComponent((r = n[i].replace(/#\S+/g, "").split("="))[0])] = void 0 === r[1] ? void 0 : decodeURIComponent(r[1]) || "";
                return o
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
                    var r = e[n];
                    if (null != r)
                        for (var s = Object.keys(Object(r)), o = 0, l = s.length; o < l; o += 1) {
                            var c = s[o],
                                d = Object.getOwnPropertyDescriptor(r, c);
                            void 0 !== d && d.enumerable && (a.isObject(i[c]) && a.isObject(r[c]) ? a.extend(i[c], r[c]) : !a.isObject(i[c]) && a.isObject(r[c]) ? (i[c] = {}, a.extend(i[c], r[c])) : i[c] = r[c])
                        }
                }
                return i
            }
        },
        l = (o = e.createElement("div"), {
            touch: t.Modernizr && !0 === t.Modernizr.touch || !!(0 < t.navigator.maxTouchPoints || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
            pointerEvents: !!(t.navigator.pointerEnabled || t.PointerEvent || "maxTouchPoints" in t.navigator && 0 < t.navigator.maxTouchPoints),
            prefixedPointerEvents: !!t.navigator.msPointerEnabled,
            transition: "transition" in (p = o.style) || "webkitTransition" in p || "MozTransition" in p,
            transforms3d: t.Modernizr && !0 === t.Modernizr.csstransforms3d || "webkitPerspective" in (L = o.style) || "MozPerspective" in L || "OPerspective" in L || "MsPerspective" in L || "perspective" in L,
            flexbox: function() {
                for (var e = o.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1)
                    if (t[i] in e) return !0;
                return !1
            }(),
            observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
            passiveListener: function() {
                var e = !1;
                try {
                    var i = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    t.addEventListener("testPassiveListener", null, i)
                } catch (n) {}
                return e
            }(),
            gestures: "ongesturestart" in t
        }),
        c = {
            isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g),
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari: 0 <= (f = t.navigator.userAgent.toLowerCase()).indexOf("safari") && 0 > f.indexOf("chrome") && 0 > f.indexOf("android"),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        },
        d = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
                t.on(e, t.params.on[e])
            })
        },
        u = {
            components: {
                configurable: !0
            }
        };
    d.prototype.on = function(e, t, i) {
        var n = this;
        if ("function" != typeof t) return n;
        var r = i ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][r](t)
        }), n
    }, d.prototype.once = function(e, t, i) {
        var n = this;
        return "function" != typeof t ? n : (r.f7proxy = t, n.on(e, r, i));

        function r() {
            for (var i = [], s = arguments.length; s--;) i[s] = arguments[s];
            t.apply(n, i), n.off(e, r), r.f7proxy && delete r.f7proxy
        }
    }, d.prototype.off = function(e, t) {
        var i = this;
        return i.eventsListeners && e.split(" ").forEach(function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach(function(n, r) {
                (n === t || n.f7proxy && n.f7proxy === t) && i.eventsListeners[e].splice(r, 1)
            })
        }), i
    }, d.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, n, r, s = this;
        return s.eventsListeners && (r = "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], n = e.slice(1, e.length), s) : (i = e[0].events, n = e[0].data, e[0].context || s), (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            var t;
            s.eventsListeners && s.eventsListeners[e] && (t = [], s.eventsListeners[e].forEach(function(e) {
                t.push(e)
            }), t.forEach(function(e) {
                e.apply(r, n)
            }))
        })), s
    }, d.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            (i = t.modules[i]).params && a.extend(e, i.params)
        })
    }, d.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var n = t.modules[i];
            i = e[i] || {}, n.instance && Object.keys(n.instance).forEach(function(e) {
                var i = n.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }), n.on && t.on && Object.keys(n.on).forEach(function(e) {
                t.on(e, n.on[e])
            }), n.create && n.create.bind(t)(i)
        })
    }, u.components.set = function(e) {
        this.use && this.use(e)
    }, d.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; 0 < i--;) t[i] = arguments[i + 1];
        var n = this;
        n.prototype.modules || (n.prototype.modules = {});
        var r = e.name || Object.keys(n.prototype.modules).length + "_" + a.now();
        return (n.prototype.modules[r] = e).proto && Object.keys(e.proto).forEach(function(t) {
            n.prototype[t] = e.proto[t]
        }), e.static && Object.keys(e.static).forEach(function(t) {
            n[t] = e.static[t]
        }), e.install && e.install.apply(n, t), n
    }, d.use = function(e) {
        for (var t = [], i = arguments.length - 1; 0 < i--;) t[i] = arguments[i + 1];
        var n = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return n.installModule(e)
        }), n) : n.installModule.apply(n, [e].concat(t))
    }, Object.defineProperties(d, u);
    var h, p, f, m = {
            updateSize: function() {
                var e = this.$el,
                    t = void 0 !== this.params.width ? this.params.width : e[0].clientWidth,
                    i = void 0 !== this.params.height ? this.params.height : e[0].clientHeight;
                0 === t && this.isHorizontal() || 0 === i && this.isVertical() || (t = t - parseInt(e.css("padding-left"), 10) - parseInt(e.css("padding-right"), 10), i = i - parseInt(e.css("padding-top"), 10) - parseInt(e.css("padding-bottom"), 10), a.extend(this, {
                    width: t,
                    height: i,
                    size: this.isHorizontal() ? t : i
                }))
            },
            updateSlides: function() {
                var e = this,
                    i = e.params,
                    n = e.$wrapperEl,
                    r = e.size,
                    s = e.rtlTranslate,
                    o = e.wrongRTL,
                    c = ((b = e.virtual && i.virtual.enabled) ? e.virtual : e).slides.length,
                    d = n.children("." + e.params.slideClass),
                    u = (b ? e.virtual.slides : d).length,
                    h = [],
                    p = [],
                    f = [],
                    m = i.slidesOffsetBefore;
                "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                var g = i.slidesOffsetAfter;
                "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                var v, y = e.snapGrid.length,
                    b = e.snapGrid.length,
                    w = i.spaceBetween,
                    _ = -m,
                    E = 0,
                    T = 0;
                if (void 0 !== r) {
                    "string" == typeof w && 0 <= w.indexOf("%") && (w = parseFloat(w.replace("%", "")) / 100 * r), e.virtualSize = -w, s ? d.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : d.css({
                        marginRight: "",
                        marginBottom: ""
                    }), 1 < i.slidesPerColumn && (v = Math.floor(u / i.slidesPerColumn) === u / e.params.slidesPerColumn ? u : Math.ceil(u / i.slidesPerColumn) * i.slidesPerColumn, "auto" !== i.slidesPerView && "row" === i.slidesPerColumnFill && (v = Math.max(v, i.slidesPerView * i.slidesPerColumn)));
                    for (var x, S, C, L = i.slidesPerColumn, k = v / L, D = Math.floor(u / i.slidesPerColumn), A = 0; A < u; A += 1) {
                        O = 0;
                        var I, P, N, O, M, H, q, z, R, B, j = d.eq(A);
                        1 < i.slidesPerColumn && (N = P = I = void 0, "column" === i.slidesPerColumnFill ? (N = A - (P = Math.floor(A / L)) * L, (D < P || P === D && N === L - 1) && L <= (N += 1) && (N = 0, P += 1), I = P + N * v / L, j.css({
                            "-webkit-box-ordinal-group": I,
                            "-moz-box-ordinal-group": I,
                            "-ms-flex-order": I,
                            "-webkit-order": I,
                            order: I
                        })) : P = A - (N = Math.floor(A / k)) * k, j.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== N && i.spaceBetween && i.spaceBetween + "px").attr("data-swiper-column", P).attr("data-swiper-row", N)), "none" !== j.css("display") && ("auto" === i.slidesPerView ? (B = t.getComputedStyle(j[0], null), I = j[0].style.transform, P = j[0].style.webkitTransform, I && (j[0].style.transform = "none"), P && (j[0].style.webkitTransform = "none"), O = i.roundLengths ? e.isHorizontal() ? j.outerWidth(!0) : j.outerHeight(!0) : e.isHorizontal() ? (M = parseFloat(B.getPropertyValue("width")), H = parseFloat(B.getPropertyValue("padding-left")), q = parseFloat(B.getPropertyValue("padding-right")), z = parseFloat(B.getPropertyValue("margin-left")), R = parseFloat(B.getPropertyValue("margin-right")), (N = B.getPropertyValue("box-sizing")) && "border-box" === N ? M + z + R : M + H + q + z + R) : (M = parseFloat(B.getPropertyValue("height")), H = parseFloat(B.getPropertyValue("padding-top")), q = parseFloat(B.getPropertyValue("padding-bottom")), z = parseFloat(B.getPropertyValue("margin-top")), R = parseFloat(B.getPropertyValue("margin-bottom")), (B = B.getPropertyValue("box-sizing")) && "border-box" === B ? M + z + R : M + H + q + z + R), I && (j[0].style.transform = I), P && (j[0].style.webkitTransform = P), i.roundLengths && (O = Math.floor(O))) : (O = (r - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (O = Math.floor(O)), d[A] && (e.isHorizontal() ? d[A].style.width = O + "px" : d[A].style.height = O + "px")), d[A] && (d[A].swiperSlideSize = O), f.push(O), i.centeredSlides ? (_ = _ + O / 2 + E / 2 + w, 0 === E && 0 !== A && (_ = _ - r / 2 - w), 0 === A && (_ = _ - r / 2 - w), .001 > Math.abs(_) && (_ = 0), i.roundLengths && (_ = Math.floor(_)), T % i.slidesPerGroup == 0 && h.push(_), p.push(_)) : (i.roundLengths && (_ = Math.floor(_)), T % i.slidesPerGroup == 0 && h.push(_), p.push(_), _ = _ + O + w), e.virtualSize += O + w, E = O, T += 1)
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, r) + g, s && o && ("slide" === i.effect || "coverflow" === i.effect) && n.css({
                            width: e.virtualSize + i.spaceBetween + "px"
                        }), l.flexbox && !i.setWrapperSize || (e.isHorizontal() ? n.css({
                            width: e.virtualSize + i.spaceBetween + "px"
                        }) : n.css({
                            height: e.virtualSize + i.spaceBetween + "px"
                        })), 1 < i.slidesPerColumn && (e.virtualSize = (O + i.spaceBetween) * v, e.virtualSize = Math.ceil(e.virtualSize / i.slidesPerColumn) - i.spaceBetween, e.isHorizontal() ? n.css({
                            width: e.virtualSize + i.spaceBetween + "px"
                        }) : n.css({
                            height: e.virtualSize + i.spaceBetween + "px"
                        }), i.centeredSlides)) {
                        x = [];
                        for (var W = 0; W < h.length; W += 1) {
                            var F = h[W];
                            i.roundLengths && (F = Math.floor(F)), h[W] < e.virtualSize + h[0] && x.push(F)
                        }
                        h = x
                    }
                    if (!i.centeredSlides) {
                        x = [];
                        for (var V = 0; V < h.length; V += 1) {
                            var U = h[V];
                            i.roundLengths && (U = Math.floor(U)), h[V] <= e.virtualSize - r && x.push(U)
                        }
                        h = x, 1 < Math.floor(e.virtualSize - r) - Math.floor(h[h.length - 1]) && h.push(e.virtualSize - r)
                    }
                    0 === h.length && (h = [0]), 0 !== i.spaceBetween && (e.isHorizontal() ? s ? d.css({
                        marginLeft: w + "px"
                    }) : d.css({
                        marginRight: w + "px"
                    }) : d.css({
                        marginBottom: w + "px"
                    })), i.centerInsufficientSlides && (S = 0, f.forEach(function(e) {
                        S += e + (i.spaceBetween || 0)
                    }), (S -= i.spaceBetween) < r && (C = (r - S) / 2, h.forEach(function(e, t) {
                        h[t] = e - C
                    }), p.forEach(function(e, t) {
                        p[t] = e + C
                    }))), a.extend(e, {
                        slides: d,
                        snapGrid: h,
                        slidesGrid: p,
                        slidesSizesGrid: f
                    }), u !== c && e.emit("slidesLengthChange"), h.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), p.length !== b && e.emit("slidesGridLengthChange"), (i.watchSlidesProgress || i.watchSlidesVisibility) && e.updateSlidesOffset()
                }
            },
            updateAutoHeight: function(e) {
                var t, i, n = [],
                    r = 0;
                if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && 1 < this.params.slidesPerView)
                    for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                        var s = this.activeIndex + t;
                        if (s > this.slides.length) break;
                        n.push(this.slides.eq(s)[0])
                    } else n.push(this.slides.eq(this.activeIndex)[0]);
                for (t = 0; t < n.length; t += 1) void 0 !== n[t] && (r = r < (i = n[t].offsetHeight) ? i : r);
                r && this.$wrapperEl.css("height", r + "px")
            },
            updateSlidesOffset: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                var t = this,
                    i = t.params,
                    r = t.slides,
                    s = t.rtlTranslate;
                if (0 !== r.length) {
                    void 0 === r[0].swiperSlideOffset && t.updateSlidesOffset();
                    var o = s ? e : -e;
                    r.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (var a = 0; a < r.length; a += 1) {
                        var l, c, d = r[a],
                            u = (o + (i.centeredSlides ? t.minTranslate() : 0) - d.swiperSlideOffset) / (d.swiperSlideSize + i.spaceBetween);
                        i.watchSlidesVisibility && (c = (l = -(o - d.swiperSlideOffset)) + t.slidesSizesGrid[a], (0 <= l && l < t.size || 0 < c && c <= t.size || l <= 0 && c >= t.size) && (t.visibleSlides.push(d), t.visibleSlidesIndexes.push(a), r.eq(a).addClass(i.slideVisibleClass))), d.progress = s ? -u : u
                    }
                    t.visibleSlides = n(t.visibleSlides)
                }
            },
            updateProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                var t = this.params,
                    i = this.maxTranslate() - this.minTranslate(),
                    n = this.progress,
                    r = this.isBeginning,
                    s = r,
                    o = this.isEnd,
                    l = 0 == i ? r = (n = 0, !0) : (r = (n = (e - this.minTranslate()) / i) <= 0, 1 <= n);
                a.extend(this, {
                    progress: n,
                    isBeginning: r,
                    isEnd: l
                }), (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e), r && !s && this.emit("reachBeginning toEdge"), l && !o && this.emit("reachEnd toEdge"), (s && !r || o && !l) && this.emit("fromEdge"), this.emit("progress", n)
            },
            updateSlidesClasses: function() {
                var e = this.slides,
                    t = this.params,
                    i = this.$wrapperEl,
                    n = this.activeIndex,
                    r = this.realIndex,
                    s = this.virtual && t.virtual.enabled;
                e.removeClass(t.slideActiveClass + " " + t.slideNextClass + " " + t.slidePrevClass + " " + t.slideDuplicateActiveClass + " " + t.slideDuplicateNextClass + " " + t.slideDuplicatePrevClass), (n = s ? this.$wrapperEl.find("." + t.slideClass + '[data-swiper-slide-index="' + n + '"]') : e.eq(n)).addClass(t.slideActiveClass), t.loop && (n.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]') : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]')).addClass(t.slideDuplicateActiveClass), r = n.nextAll("." + t.slideClass).eq(0).addClass(t.slideNextClass), t.loop && 0 === r.length && (r = e.eq(0)).addClass(t.slideNextClass), n = n.prevAll("." + t.slideClass).eq(0).addClass(t.slidePrevClass), t.loop && 0 === n.length && (n = e.eq(-1)).addClass(t.slidePrevClass), t.loop && ((r.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]') : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]')).addClass(t.slideDuplicateNextClass), (n.hasClass(t.slideDuplicateClass) ? i.children("." + t.slideClass + ":not(." + t.slideDuplicateClass + ')[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]') : i.children("." + t.slideClass + "." + t.slideDuplicateClass + '[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]')).addClass(t.slideDuplicatePrevClass))
            },
            updateActiveIndex: function(e) {
                var t = this,
                    i = t.rtlTranslate ? t.translate : -t.translate,
                    n = t.slidesGrid,
                    r = t.snapGrid,
                    s = t.params,
                    o = t.activeIndex,
                    l = t.realIndex,
                    c = t.snapIndex,
                    d = e;
                if (void 0 === d) {
                    for (var u = 0; u < n.length; u += 1) void 0 !== n[u + 1] ? i >= n[u] && i < n[u + 1] - (n[u + 1] - n[u]) / 2 ? d = u : i >= n[u] && i < n[u + 1] && (d = u + 1) : i >= n[u] && (d = u);
                    s.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                }(s = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(d / s.slidesPerGroup)) >= r.length && (s = r.length - 1), d !== o ? (r = parseInt(t.slides.eq(d).attr("data-swiper-slide-index") || d, 10), a.extend(t, {
                    snapIndex: s,
                    realIndex: r,
                    previousIndex: o,
                    activeIndex: d
                }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), l !== r && t.emit("realIndexChange"), t.emit("slideChange")) : s !== c && (t.snapIndex = s, t.emit("snapIndexChange"))
            },
            updateClickedSlide: function(e) {
                var t = this,
                    i = t.params,
                    r = n(e.target).closest("." + i.slideClass)[0],
                    s = !1;
                if (r)
                    for (var o = 0; o < t.slides.length; o += 1) t.slides[o] === r && (s = !0);
                if (!r || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                t.clickedSlide = r, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(n(r).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n(r).index(), i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
            }
        },
        g = {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                var t = this.params,
                    i = this.rtlTranslate,
                    n = this.translate,
                    r = this.$wrapperEl;
                return t.virtualTranslate ? i ? -n : n : (e = a.getTranslate(r[0], e), i && (e = -e), e || 0)
            },
            setTranslate: function(e, t) {
                var i = this,
                    n = i.rtlTranslate,
                    r = i.params,
                    s = i.$wrapperEl,
                    o = i.progress,
                    a = 0,
                    c = 0;
                i.isHorizontal() ? a = n ? -e : e : c = e, r.roundLengths && (a = Math.floor(a), c = Math.floor(c)), r.virtualTranslate || (l.transforms3d ? s.transform("translate3d(" + a + "px, " + c + "px, 0px)") : s.transform("translate(" + a + "px, " + c + "px)")), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? a : c, (0 == (c = i.maxTranslate() - i.minTranslate()) ? 0 : (e - i.minTranslate()) / c) !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            }
        },
        v = {
            slideTo: function(e, t, i, n) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                var r = this,
                    s = e;
                s < 0 && (s = 0);
                var o = r.params,
                    a = r.snapGrid,
                    c = r.slidesGrid,
                    d = r.previousIndex,
                    u = r.activeIndex,
                    h = r.rtlTranslate;
                if (r.animating && o.preventInteractionOnTransition) return !1;
                (e = Math.floor(s / o.slidesPerGroup)) >= a.length && (e = a.length - 1), (u || o.initialSlide || 0) === (d || 0) && i && r.emit("beforeSlideChangeStart");
                var p, f = -a[e];
                if (r.updateProgress(f), o.normalizeSlideIndex)
                    for (var m = 0; m < c.length; m += 1) - Math.floor(100 * f) >= Math.floor(100 * c[m]) && (s = m);
                return !(r.initialized && s !== u && (!r.allowSlideNext && f < r.translate && f < r.minTranslate() || !r.allowSlidePrev && f > r.translate && f > r.maxTranslate() && (u || 0) !== s)) && (p = u < s ? "next" : s < u ? "prev" : "reset", h && -f === r.translate || !h && f === r.translate ? (r.updateActiveIndex(s), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(f), "reset" != p && (r.transitionStart(i, p), r.transitionEnd(i, p)), !1) : (0 !== t && l.transition ? (r.setTransition(t), r.setTranslate(f), r.updateActiveIndex(s), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, n), r.transitionStart(i, p), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                    r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, p))
                }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))) : (r.setTransition(0), r.setTranslate(f), r.updateActiveIndex(s), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, n), r.transitionStart(i, p), r.transitionEnd(i, p)), !0))
            },
            slideToLoop: function(e, t, i, n) {
                return void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), this.params.loop && (e += this.loopedSlides), this.slideTo(e, t, i, n)
            },
            slideNext: function(e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                var n = this.params,
                    r = this.animating;
                return n.loop ? !r && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + n.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + n.slidesPerGroup, e, t, i)
            },
            slidePrev: function(e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                var n, r = this,
                    s = r.params,
                    o = r.animating,
                    a = r.snapGrid,
                    l = r.slidesGrid,
                    c = r.rtlTranslate;
                if (s.loop) {
                    if (o) return !1;
                    r.loopFix(), r._clientLeft = r.$wrapperEl[0].clientLeft
                }

                function d(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                return o = d(c ? r.translate : -r.translate), c = a.map(d), void 0 !== (o = (l.map(d), a[c.indexOf(o)], a[c.indexOf(o) - 1])) && (n = l.indexOf(o)) < 0 && (n = r.activeIndex - 1), r.slideTo(n, e, t, i)
            },
            slideReset: function(e, t, i) {
                return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
            },
            slideToClosest: function(e, t, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                var n, r, s = this.activeIndex,
                    o = Math.floor(s / this.params.slidesPerGroup);
                return o < this.snapGrid.length - 1 && (n = this.rtlTranslate ? this.translate : -this.translate, r = this.snapGrid[o], (this.snapGrid[o + 1] - r) / 2 < n - r && (s = this.params.slidesPerGroup)), this.slideTo(s, e, t, i)
            },
            slideToClickedSlide: function() {
                var e, t = this,
                    i = t.params,
                    r = t.$wrapperEl,
                    s = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                    o = t.clickedIndex;
                i.loop ? t.animating || (e = parseInt(n(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? o < t.loopedSlides - s / 2 || o > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), o = r.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), a.nextTick(function() {
                    t.slideTo(o)
                })) : t.slideTo(o) : o > t.slides.length - s ? (t.loopFix(), o = r.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), a.nextTick(function() {
                    t.slideTo(o)
                })) : t.slideTo(o)) : t.slideTo(o)
            }
        },
        y = {
            loopCreate: function() {
                var t = this,
                    i = t.params,
                    r = t.$wrapperEl;
                r.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
                var s = r.children("." + i.slideClass);
                if (i.loopFillGroupWithBlank) {
                    var o = i.slidesPerGroup - s.length % i.slidesPerGroup;
                    if (o !== i.slidesPerGroup) {
                        for (var a = 0; a < o; a += 1) {
                            var l = n(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                            r.append(l)
                        }
                        s = r.children("." + i.slideClass)
                    }
                }
                "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = s.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > s.length && (t.loopedSlides = s.length);
                var c = [],
                    d = [];
                s.each(function(e, i) {
                    var r = n(i);
                    e < t.loopedSlides && d.push(i), e < s.length && e >= s.length - t.loopedSlides && c.push(i), r.attr("data-swiper-slide-index", e)
                });
                for (var u = 0; u < d.length; u += 1) r.append(n(d[u].cloneNode(!0)).addClass(i.slideDuplicateClass));
                for (var h = c.length - 1; 0 <= h; --h) r.prepend(n(c[h].cloneNode(!0)).addClass(i.slideDuplicateClass))
            },
            loopFix: function() {
                var e, t = this,
                    i = t.params,
                    n = t.activeIndex,
                    r = t.slides,
                    s = t.loopedSlides,
                    o = t.allowSlidePrev,
                    a = t.allowSlideNext,
                    l = t.snapGrid,
                    c = t.rtlTranslate;
                t.allowSlidePrev = !0, t.allowSlideNext = !0, l = -l[n] - t.getTranslate(), n < s ? (e = r.length - 3 * s + n, e += s, t.slideTo(e, 0, !1, !0) && 0 != l && t.setTranslate((c ? -t.translate : t.translate) - l)) : ("auto" === i.slidesPerView && 2 * s <= n || n >= r.length - s) && (e = -r.length + n + s, e += s, t.slideTo(e, 0, !1, !0) && 0 != l && t.setTranslate((c ? -t.translate : t.translate) - l)), t.allowSlidePrev = o, t.allowSlideNext = a
            },
            loopDestroy: function() {
                var e = this.$wrapperEl,
                    t = this.params,
                    i = this.slides;
                e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
            }
        },
        b = {
            setGrabCursor: function(e) {
                var t;
                l.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || ((t = this.el).style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab")
            },
            unsetGrabCursor: function() {
                l.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
            }
        },
        w = {
            appendSlide: function(e) {
                var t = this.$wrapperEl,
                    i = this.params;
                if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var n = 0; n < e.length; n += 1) e[n] && t.append(e[n]);
                else t.append(e);
                i.loop && this.loopCreate(), i.observer && l.observer || this.update()
            },
            prependSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    n = this.activeIndex;
                t.loop && this.loopDestroy();
                var r = n + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var s = 0; s < e.length; s += 1) e[s] && i.prepend(e[s]);
                    r = n + e.length
                } else i.prepend(e);
                t.loop && this.loopCreate(), t.observer && l.observer || this.update(), this.slideTo(r, 0, !1)
            },
            addSlide: function(e, t) {
                var i = this,
                    n = i.$wrapperEl,
                    r = i.params,
                    s = i.activeIndex;
                r.loop && (s -= i.loopedSlides, i.loopDestroy(), i.slides = n.children("." + r.slideClass));
                var o = i.slides.length;
                if (e <= 0) i.prependSlide(t);
                else if (o <= e) i.appendSlide(t);
                else {
                    for (var a = e < s ? s + 1 : s, c = [], d = o - 1; e <= d; --d) {
                        var u = i.slides.eq(d);
                        u.remove(), c.unshift(u)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var h = 0; h < t.length; h += 1) t[h] && n.append(t[h]);
                        a = e < s ? s + t.length : s
                    } else n.append(t);
                    for (var p = 0; p < c.length; p += 1) n.append(c[p]);
                    r.loop && i.loopCreate(), r.observer && l.observer || i.update(), r.loop ? i.slideTo(a + i.loopedSlides, 0, !1) : i.slideTo(a, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this,
                    i = t.params,
                    n = t.$wrapperEl,
                    r = t.activeIndex;
                i.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = n.children("." + i.slideClass));
                var s, o = r;
                if ("object" == typeof e && "length" in e) {
                    for (var a = 0; a < e.length; a += 1) s = e[a], t.slides[s] && t.slides.eq(s).remove(), s < o && --o;
                    o = Math.max(o, 0)
                } else s = e, t.slides[s] && t.slides.eq(s).remove(), s < o && --o, o = Math.max(o, 0);
                i.loop && t.loopCreate(), i.observer && l.observer || t.update(), i.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        _ = (k = t.navigator.userAgent, D = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: t.cordova || t.phonegap,
            phonegap: t.cordova || t.phonegap
        }, h = k.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), p = k.match(/(Android);?[\s\/]+([\d.]+)?/), L = k.match(/(iPad).*OS\s([\d_]+)/), f = k.match(/(iPod)(.*OS\s([\d_]+))?/), u = !L && k.match(/(iPhone\sOS|iOS)\s([\d_]+)/), h && (D.os = "windows", D.osVersion = h[2], D.windows = !0), p && !h && (D.os = "android", D.osVersion = p[2], D.android = !0, D.androidChrome = 0 <= k.toLowerCase().indexOf("chrome")), (L || u || f) && (D.os = "ios", D.ios = !0), u && !f && (D.osVersion = u[2].replace(/_/g, "."), D.iphone = !0), L && (D.osVersion = L[2].replace(/_/g, "."), D.ipad = !0), f && (D.osVersion = f[3] ? f[3].replace(/_/g, ".") : null, D.iphone = !0), D.ios && D.osVersion && 0 <= k.indexOf("Version/") && "10" === D.osVersion.split(".")[0] && (D.osVersion = k.toLowerCase().split("version/")[1].split(" ")[0]), D.desktop = !(D.os || D.android || D.webView), D.webView = (u || L || f) && k.match(/.*AppleWebKit(?!.*Safari)/i), D.os && "ios" === D.os && (L = D.osVersion.split("."), k = e.querySelector('meta[name="viewport"]'), D.minimalUi = !D.webView && (f || u) && (7 == +L[0] ? 1 <= +L[1] : 7 < +L[0]) && k && 0 <= k.getAttribute("content").indexOf("minimal-ui")), D.pixelRatio = t.devicePixelRatio || 1, D);

    function E() {
        var e, t, i, n = this,
            r = n.params,
            s = n.el;
        s && 0 === s.offsetWidth || (r.breakpoints && n.setBreakpoint(), e = n.allowSlideNext, t = n.allowSlidePrev, i = n.snapGrid, n.allowSlideNext = !0, n.allowSlidePrev = !0, n.updateSize(), n.updateSlides(), r.freeMode ? (s = Math.min(Math.max(n.translate, n.maxTranslate()), n.minTranslate()), n.setTranslate(s), n.updateActiveIndex(), n.updateSlidesClasses(), r.autoHeight && n.updateAutoHeight()) : (n.updateSlidesClasses(), ("auto" === r.slidesPerView || 1 < r.slidesPerView) && n.isEnd && !n.params.centeredSlides ? n.slideTo(n.slides.length - 1, 0, !1, !0) : n.slideTo(n.activeIndex, 0, !1, !0)), n.allowSlidePrev = t, n.allowSlideNext = e, n.params.watchOverflow && i !== n.snapGrid && n.checkOverflow())
    }
    var T = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsInverse: !1,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        },
        x = {
            update: m,
            translate: g,
            transition: {
                setTransition: function(e, t) {
                    this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this.activeIndex,
                        n = this.params,
                        r = this.previousIndex;
                    n.autoHeight && this.updateAutoHeight(), t = t || (r < i ? "next" : i < r ? "prev" : "reset"), this.emit("transitionStart"), e && i !== r && ("reset" !== t ? (this.emit("slideChangeTransitionStart"), "next" === t ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")) : this.emit("slideResetTransitionStart"))
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this.activeIndex,
                        n = this.previousIndex;
                    this.animating = !1, this.setTransition(0), t = t || (n < i ? "next" : i < n ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== n && ("reset" !== t ? (this.emit("slideChangeTransitionEnd"), "next" === t ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")) : this.emit("slideResetTransitionEnd"))
                }
            },
            slide: v,
            loop: y,
            grabCursor: b,
            manipulation: w,
            events: {
                attachEvents: function() {
                    var i = this,
                        r = i.params,
                        s = i.touchEvents,
                        o = i.el,
                        c = i.wrapperEl;
                    i.onTouchStart = (function(i) {
                        var r, s, o, l, c = this,
                            d = c.touchEventsData,
                            u = c.params,
                            h = c.touches;
                        c.animating && u.preventInteractionOnTransition || ((r = i).originalEvent && (r = r.originalEvent), d.isTouchEvent = "touchstart" === r.type, !d.isTouchEvent && "which" in r && 3 === r.which || !d.isTouchEvent && "button" in r && 0 < r.button || d.isTouched && d.isMoved || (u.noSwiping && n(r.target).closest(u.noSwipingSelector || "." + u.noSwipingClass)[0] ? c.allowClick = !0 : u.swipeHandler && !n(r).closest(u.swipeHandler)[0] || (h.currentX = ("touchstart" === r.type ? r.targetTouches[0] : r).pageX, h.currentY = ("touchstart" === r.type ? r.targetTouches[0] : r).pageY, s = h.currentX, l = h.currentY, o = u.edgeSwipeDetection || u.iOSEdgeSwipeDetection, i = u.edgeSwipeThreshold || u.iOSEdgeSwipeThreshold, o && (s <= i || s >= t.screen.width - i) || (a.extend(d, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }), h.startX = s, h.startY = l, d.touchStartTime = a.now(), c.allowClick = !0, c.updateSize(), c.swipeDirection = void 0, 0 < u.threshold && (d.allowThresholdMove = !1), "touchstart" !== r.type && (l = !0, n(r.target).is(d.formElements) && (l = !1), e.activeElement && n(e.activeElement).is(d.formElements) && e.activeElement !== r.target && e.activeElement.blur(), l = l && c.allowTouchMove && u.touchStartPreventDefault, (u.touchStartForcePreventDefault || l) && r.preventDefault()), c.emit("touchStart", r)))))
                    }).bind(i), i.onTouchMove = (function(t) {
                        var i = this,
                            r = i.touchEventsData,
                            s = i.params,
                            o = i.touches,
                            l = i.rtlTranslate,
                            c = t;
                        if (c.originalEvent && (c = c.originalEvent), r.isTouched) {
                            if (!r.isTouchEvent || "mousemove" !== c.type) {
                                var d = ("touchmove" === c.type ? c.targetTouches[0] : c).pageX,
                                    u = ("touchmove" === c.type ? c.targetTouches[0] : c).pageY;
                                if (c.preventedByNestedSwiper) return o.startX = d, void(o.startY = u);
                                if (!i.allowTouchMove) return i.allowClick = !1, void(r.isTouched && (a.extend(o, {
                                    startX: d,
                                    startY: u,
                                    currentX: d,
                                    currentY: u
                                }), r.touchStartTime = a.now()));
                                if (r.isTouchEvent && s.touchReleaseOnEdges && !s.loop) {
                                    if (i.isVertical()) {
                                        if (u < o.startY && i.translate <= i.maxTranslate() || u > o.startY && i.translate >= i.minTranslate()) return r.isTouched = !1, void(r.isMoved = !1)
                                    } else if (d < o.startX && i.translate <= i.maxTranslate() || d > o.startX && i.translate >= i.minTranslate()) return
                                }
                                if (r.isTouchEvent && e.activeElement && c.target === e.activeElement && n(c.target).is(r.formElements)) return r.isMoved = !0, void(i.allowClick = !1);
                                if (r.allowTouchCallbacks && i.emit("touchMove", c), !(c.targetTouches && 1 < c.targetTouches.length || (o.currentX = d, o.currentY = u, t = o.currentX - o.startX, d = o.currentY - o.startY, i.params.threshold && Math.sqrt(Math.pow(t, 2) + Math.pow(d, 2)) < i.params.threshold))) {
                                    if (void 0 === r.isScrolling && (i.isHorizontal() && o.currentY === o.startY || i.isVertical() && o.currentX === o.startX ? r.isScrolling = !1 : 25 <= t * t + d * d && (u = 180 * Math.atan2(Math.abs(d), Math.abs(t)) / Math.PI, r.isScrolling = i.isHorizontal() ? u > s.touchAngle : 90 - u > s.touchAngle)), r.isScrolling && i.emit("touchMoveOpposite", c), void 0 === r.startMoving && (o.currentX === o.startX && o.currentY === o.startY || (r.startMoving = !0)), r.isScrolling) r.isTouched = !1;
                                    else if (r.startMoving) {
                                        if (i.allowClick = !1, c.preventDefault(), s.touchMoveStopPropagation && !s.nested && c.stopPropagation(), r.isMoved || (s.loop && i.loopFix(), r.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), r.allowMomentumBounce = !1, s.grabCursor && (!0 === i.allowSlideNext || !0 === i.allowSlidePrev) && i.setGrabCursor(!0), i.emit("sliderFirstMove", c)), i.emit("sliderMove", c), r.isMoved = !0, t = i.isHorizontal() ? t : d, o.diff = t, t *= s.touchRatio, l && (t = -t), i.swipeDirection = 0 < t ? "prev" : "next", r.currentTranslate = t + r.startTranslate, d = !0, l = s.resistanceRatio, s.touchReleaseOnEdges && (l = 0), 0 < t && r.currentTranslate > i.minTranslate() ? (d = !1, s.resistance && (r.currentTranslate = i.minTranslate() - 1 + Math.pow(-i.minTranslate() + r.startTranslate + t, l))) : t < 0 && r.currentTranslate < i.maxTranslate() && (d = !1, s.resistance && (r.currentTranslate = i.maxTranslate() + 1 - Math.pow(i.maxTranslate() - r.startTranslate - t, l))), d && (c.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !i.allowSlidePrev && "prev" === i.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), 0 < s.threshold) {
                                            if (!(Math.abs(t) > s.threshold || r.allowThresholdMove)) return void(r.currentTranslate = r.startTranslate);
                                            if (!r.allowThresholdMove) return r.allowThresholdMove = !0, o.startX = o.currentX, o.startY = o.currentY, r.currentTranslate = r.startTranslate, void(o.diff = i.isHorizontal() ? o.currentX - o.startX : o.currentY - o.startY)
                                        }
                                        s.followFinger && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (i.updateActiveIndex(), i.updateSlidesClasses()), s.freeMode && (0 === r.velocities.length && r.velocities.push({
                                            position: o[i.isHorizontal() ? "startX" : "startY"],
                                            time: r.touchStartTime
                                        }), r.velocities.push({
                                            position: o[i.isHorizontal() ? "currentX" : "currentY"],
                                            time: a.now()
                                        })), i.updateProgress(r.currentTranslate), i.setTranslate(r.currentTranslate))
                                    }
                                }
                            }
                        } else r.startMoving && r.isScrolling && i.emit("touchMoveOpposite", c)
                    }).bind(i), i.onTouchEnd = (function(e) {
                        var t = this,
                            i = t.touchEventsData,
                            n = t.params,
                            r = t.touches,
                            s = t.rtlTranslate,
                            o = t.$wrapperEl,
                            l = t.slidesGrid,
                            c = t.snapGrid,
                            d = e;
                        if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && n.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                        n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var u, h = a.now();
                        if (e = h - i.touchStartTime, t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), e < 300 && 300 < h - i.lastClickTime && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = a.nextTick(function() {
                                t && !t.destroyed && t.emit("click", d)
                            }, 300)), e < 300 && h - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", d))), i.lastClickTime = a.now(), a.nextTick(function() {
                                t.destroyed || (t.allowClick = !0)
                            }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === r.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
                        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, u = n.followFinger ? s ? t.translate : -t.translate : -i.currentTranslate, n.freeMode) {
                            if (u < -t.minTranslate()) t.slideTo(t.activeIndex);
                            else if (u > -t.maxTranslate()) t.slides.length < c.length ? t.slideTo(c.length - 1) : t.slideTo(t.slides.length - 1);
                            else {
                                if (n.freeModeMomentum) {
                                    1 < i.velocities.length ? (y = i.velocities.pop(), f = i.velocities.pop(), p = y.position - f.position, f = y.time - f.time, t.velocity = p / f, t.velocity /= 2, Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), (150 < f || 300 < a.now() - y.time) && (t.velocity = 0)) : t.velocity = 0, t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                                    var p = 1e3 * n.freeModeMomentumRatio,
                                        f = t.velocity * p,
                                        m = t.translate + f;
                                    s && (m = -m);
                                    var g, v, y = !1;
                                    if (f = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio, m < t.maxTranslate()) n.freeModeMomentumBounce ? (m + t.maxTranslate() < -f && (m = t.maxTranslate() - f), g = t.maxTranslate(), y = !0, i.allowMomentumBounce = !0) : m = t.maxTranslate(), n.loop && n.centeredSlides && (v = !0);
                                    else if (m > t.minTranslate()) n.freeModeMomentumBounce ? (m - t.minTranslate() > f && (m = t.minTranslate() + f), g = t.minTranslate(), y = !0, i.allowMomentumBounce = !0) : m = t.minTranslate(), n.loop && n.centeredSlides && (v = !0);
                                    else if (n.freeModeSticky) {
                                        for (var b, w = 0; w < c.length; w += 1)
                                            if (c[w] > -m) {
                                                b = w;
                                                break
                                            } m = -(Math.abs(c[b] - m) < Math.abs(c[b - 1] - m) || "next" === t.swipeDirection ? c[b] : c[b - 1])
                                    }
                                    if (v && t.once("transitionEnd", function() {
                                            t.loopFix()
                                        }), 0 !== t.velocity) p = s ? Math.abs((-m - t.translate) / t.velocity) : Math.abs((m - t.translate) / t.velocity);
                                    else if (n.freeModeSticky) return void t.slideToClosest();
                                    n.freeModeMomentumBounce && y ? (t.updateProgress(g), t.setTransition(p), t.setTranslate(m), t.transitionStart(!0, t.swipeDirection), t.animating = !0, o.transitionEnd(function() {
                                        t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), t.setTranslate(g), o.transitionEnd(function() {
                                            t && !t.destroyed && t.transitionEnd()
                                        }))
                                    })) : t.velocity ? (t.updateProgress(m), t.setTransition(p), t.setTranslate(m), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, o.transitionEnd(function() {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))) : t.updateProgress(m), t.updateActiveIndex(), t.updateSlidesClasses()
                                } else if (n.freeModeSticky) return void t.slideToClosest();
                                (!n.freeModeMomentum || e >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                            }
                        } else {
                            for (var _ = 0, E = t.slidesSizesGrid[0], T = 0; T < l.length; T += n.slidesPerGroup) void 0 !== l[T + n.slidesPerGroup] ? u >= l[T] && u < l[T + n.slidesPerGroup] && (E = l[(_ = T) + n.slidesPerGroup] - l[T]) : u >= l[T] && (_ = T, E = l[l.length - 1] - l[l.length - 2]);
                            p = (u - l[_]) / E, e > n.longSwipesMs ? n.longSwipes ? ("next" === t.swipeDirection && (p >= n.longSwipesRatio ? t.slideTo(_ + n.slidesPerGroup) : t.slideTo(_)), "prev" === t.swipeDirection && (p > 1 - n.longSwipesRatio ? t.slideTo(_ + n.slidesPerGroup) : t.slideTo(_))) : t.slideTo(t.activeIndex) : n.shortSwipes ? ("next" === t.swipeDirection && t.slideTo(_ + n.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(_)) : t.slideTo(t.activeIndex)
                        }
                    }).bind(i), i.onClick = (function(e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }).bind(i);
                    var d = "container" === r.touchEventsTarget ? o : c;
                    o = !!r.nested, !l.touch && (l.pointerEvents || l.prefixedPointerEvents) ? (d.addEventListener(s.start, i.onTouchStart, !1), e.addEventListener(s.move, i.onTouchMove, o), e.addEventListener(s.end, i.onTouchEnd, !1)) : (l.touch && (c = !("touchstart" !== s.start || !l.passiveListener || !r.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, d.addEventListener(s.start, i.onTouchStart, c), d.addEventListener(s.move, i.onTouchMove, l.passiveListener ? {
                        passive: !1,
                        capture: o
                    } : o), d.addEventListener(s.end, i.onTouchEnd, c)), (r.simulateTouch && !_.ios && !_.android || r.simulateTouch && !l.touch && _.ios) && (d.addEventListener("mousedown", i.onTouchStart, !1), e.addEventListener("mousemove", i.onTouchMove, o), e.addEventListener("mouseup", i.onTouchEnd, !1))), (r.preventClicks || r.preventClicksPropagation) && d.addEventListener("click", i.onClick, !0), i.on(_.ios || _.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", E, !0)
                },
                detachEvents: function() {
                    var t = this.params,
                        i = this.touchEvents,
                        n = this.el,
                        r = this.wrapperEl,
                        s = "container" === t.touchEventsTarget ? n : r;
                    n = !!t.nested, !l.touch && (l.pointerEvents || l.prefixedPointerEvents) ? (s.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, n), e.removeEventListener(i.end, this.onTouchEnd, !1)) : (l.touch && (r = !("onTouchStart" !== i.start || !l.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, s.removeEventListener(i.start, this.onTouchStart, r), s.removeEventListener(i.move, this.onTouchMove, n), s.removeEventListener(i.end, this.onTouchEnd, r)), (t.simulateTouch && !_.ios && !_.android || t.simulateTouch && !l.touch && _.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, n), e.removeEventListener("mouseup", this.onTouchEnd, !1))), (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), this.off(_.ios || _.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", E)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e = this,
                        t = e.activeIndex,
                        i = e.initialized,
                        n = e.loopedSlides;
                    void 0 === n && (n = 0);
                    var r, s, o, l = e.params,
                        c = l.breakpoints;
                    !c || c && 0 === Object.keys(c).length || (r = e.getBreakpoint(c)) && e.currentBreakpoint !== r && ((s = r in c ? c[r] : void 0) && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function(e) {
                        var t = s[e];
                        void 0 !== t && (s[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                    }), c = (o = s || e.originalParams).direction && o.direction !== l.direction, l = l.loop && (o.slidesPerView !== l.slidesPerView || c), c && i && e.changeDirection(), a.extend(e.params, o), a.extend(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), e.currentBreakpoint = r, l && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - n + e.loopedSlides, 0, !1)), e.emit("breakpoint", o))
                },
                getBreakpoint: function(e) {
                    if (e) {
                        var i = !1,
                            n = [];
                        Object.keys(e).forEach(function(e) {
                            n.push(e)
                        }), n.sort(function(e, t) {
                            return parseInt(e, 10) - parseInt(t, 10)
                        });
                        for (var r = 0; r < n.length; r += 1) {
                            var s = n[r];
                            this.params.breakpointsInverse ? s <= t.innerWidth && (i = s) : s >= t.innerWidth && !i && (i = s)
                        }
                        return i || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var e = this.classNames,
                        t = this.params,
                        i = this.rtl,
                        n = this.$el,
                        r = [];
                    r.push("initialized"), r.push(t.direction), t.freeMode && r.push("free-mode"), l.flexbox || r.push("no-flexbox"), t.autoHeight && r.push("autoheight"), i && r.push("rtl"), 1 < t.slidesPerColumn && r.push("multirow"), _.android && r.push("android"), _.ios && r.push("ios"), (c.isIE || c.isEdge) && (l.pointerEvents || l.prefixedPointerEvents) && r.push("wp8-" + t.direction), r.forEach(function(i) {
                        e.push(t.containerModifierClass + i)
                    }), n.addClass(e.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, i, n, r, s, o) {
                    function a() {
                        o && o()
                    }
                    e.complete && s || !i ? a() : ((s = new t.Image).onload = a, s.onerror = a, r && (s.sizes = r), n && (s.srcset = n), i && (s.src = i))
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var n = e.imagesToLoad[i];
                        e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        S = {},
        C = function(e) {
            function t() {
                for (var i, r, s = [], o = arguments.length; o--;) s[o] = arguments[o];
                r = (r = 1 === s.length && s[0].constructor && s[0].constructor === Object ? s[0] : (i = s[0], s[1])) || {}, r = a.extend({}, r), i && !r.el && (r.el = i), e.call(this, r), Object.keys(x).forEach(function(e) {
                    Object.keys(x[e]).forEach(function(i) {
                        t.prototype[i] || (t.prototype[i] = x[e][i])
                    })
                });
                var c = this;
                void 0 === c.modules && (c.modules = {}), Object.keys(c.modules).forEach(function(e) {
                    var t = c.modules[e];
                    t.params && (e = Object.keys(t.params)[0], "object" == typeof(t = t.params[e]) && null !== t && e in r && "enabled" in t && (!0 === r[e] && (r[e] = {
                        enabled: !0
                    }), "object" != typeof r[e] || "enabled" in r[e] || (r[e].enabled = !0), r[e] || (r[e] = {
                        enabled: !1
                    })))
                });
                var d = a.extend({}, T);
                c.useModulesParams(d), c.params = a.extend({}, d, S, r), c.originalParams = a.extend({}, c.params), c.passedParams = a.extend({}, r);
                var u = (c.$ = n)(c.params.el);
                if (i = u[0]) {
                    if (1 < u.length) {
                        var h = [];
                        return u.each(function(e, i) {
                            i = a.extend({}, r, {
                                el: i
                            }), h.push(new t(i))
                        }), h
                    }
                    return i.swiper = c, u.data("swiper", c), d = u.children("." + c.params.wrapperClass), a.extend(c, {
                        $el: u,
                        el: i,
                        $wrapperEl: d,
                        wrapperEl: d[0],
                        classNames: [],
                        slides: n(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === c.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === c.params.direction
                        },
                        rtl: "rtl" === i.dir.toLowerCase() || "rtl" === u.css("direction"),
                        rtlTranslate: "horizontal" === c.params.direction && ("rtl" === i.dir.toLowerCase() || "rtl" === u.css("direction")),
                        wrongRTL: "-webkit-box" === d.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: c.params.allowSlideNext,
                        allowSlidePrev: c.params.allowSlidePrev,
                        touchEvents: (u = ["touchstart", "touchmove", "touchend"], d = ["mousedown", "mousemove", "mouseup"], l.pointerEvents ? d = ["pointerdown", "pointermove", "pointerup"] : l.prefixedPointerEvents && (d = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), c.touchEventsTouch = {
                            start: u[0],
                            move: u[1],
                            end: u[2]
                        }, c.touchEventsDesktop = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, l.touch || !c.params.simulateTouch ? c.touchEventsTouch : c.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: a.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: c.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), c.useModules(), c.params.init && c.init(), c
                }
            }
            e && (t.__proto__ = e);
            var i = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.slidesPerViewDynamic = function() {
                var e = this.params,
                    t = this.slides,
                    i = this.slidesGrid,
                    n = this.size,
                    r = this.activeIndex,
                    s = 1;
                if (e.centeredSlides) {
                    for (var o, a = t[r].swiperSlideSize, l = r + 1; l < t.length; l += 1) t[l] && !o && (s += 1, n < (a += t[l].swiperSlideSize) && (o = !0));
                    for (var c = r - 1; 0 <= c; --c) t[c] && !o && (s += 1, n < (a += t[c].swiperSlideSize) && (o = !0))
                } else
                    for (var d = r + 1; d < t.length; d += 1) i[d] - i[r] < n && (s += 1);
                return s
            }, t.prototype.update = function() {
                var e, t, i = this;

                function n() {
                    var e = i.rtlTranslate ? -1 * i.translate : i.translate;
                    e = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate()), i.setTranslate(e), i.updateActiveIndex(), i.updateSlidesClasses()
                }
                i && !i.destroyed && (e = i.snapGrid, (t = i.params).breakpoints && i.setBreakpoint(), i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.params.freeMode ? (n(), i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || n(), t.watchOverflow && e !== i.snapGrid && i.checkOverflow(), i.emit("update"))
            }, t.prototype.changeDirection = function(e, t) {
                void 0 === t && (t = !0);
                var i = this,
                    n = i.params.direction;
                return (e = e || ("horizontal" === n ? "vertical" : "horizontal")) === n || "horizontal" !== e && "vertical" !== e || ("vertical" === n && (i.$el.removeClass(i.params.containerModifierClass + "vertical wp8-vertical").addClass("" + i.params.containerModifierClass + e), (c.isIE || c.isEdge) && (l.pointerEvents || l.prefixedPointerEvents) && i.$el.addClass(i.params.containerModifierClass + "wp8-" + e)), "horizontal" === n && (i.$el.removeClass(i.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + i.params.containerModifierClass + e), (c.isIE || c.isEdge) && (l.pointerEvents || l.prefixedPointerEvents) && i.$el.addClass(i.params.containerModifierClass + "wp8-" + e)), i.params.direction = e, i.slides.each(function(t, i) {
                    "vertical" === e ? i.style.width = "" : i.style.height = ""
                }), i.emit("changeDirection"), t && i.update()), i
            }, t.prototype.init = function() {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, t.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this,
                    n = i.params,
                    r = i.$el,
                    s = i.$wrapperEl,
                    o = i.slides;
                return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), r.removeAttr("style"), s.removeAttr("style"), o && o.length && o.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function(e) {
                    i.off(e)
                }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), a.deleteProps(i)), i.destroyed = !0), null
            }, t.extendDefaults = function(e) {
                a.extend(S, e)
            }, i.extendedDefaults.get = function() {
                return S
            }, i.defaults.get = function() {
                return T
            }, i.Class.get = function() {
                return e
            }, i.$.get = function() {
                return n
            }, Object.defineProperties(t, i), t
        }(d),
        L = {
            name: "device",
            proto: {
                device: _
            },
            static: {
                device: _
            }
        },
        k = {
            name: "support",
            proto: {
                support: l
            },
            static: {
                support: l
            }
        },
        D = {
            name: "browser",
            proto: {
                browser: c
            },
            static: {
                browser: c
            }
        },
        A = (m = {
            name: "resize",
            create: function() {
                var e = this;
                a.extend(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function() {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function() {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }, {
            func: t.MutationObserver || t.WebkitMutationObserver,
            attach: function(e, i) {
                void 0 === i && (i = {});
                var n = this,
                    r = new A.func(function(e) {
                        var i;
                        1 !== e.length ? (i = function() {
                            n.emit("observerUpdate", e[0])
                        }, t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)) : n.emit("observerUpdate", e[0])
                    });
                r.observe(e, {
                    attributes: void 0 === i.attributes || i.attributes,
                    childList: void 0 === i.childList || i.childList,
                    characterData: void 0 === i.characterData || i.characterData
                }), n.observer.observers.push(r)
            },
            init: function() {
                if (l.observer && this.params.observer) {
                    if (this.params.observeParents)
                        for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], {
                        childList: this.params.observeSlideChildren
                    }), this.observer.attach(this.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach(function(e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        }),
        I = (g = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function() {
                a.extend(this, {
                    observer: {
                        init: A.init.bind(this),
                        attach: A.attach.bind(this),
                        destroy: A.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function() {
                    this.observer.init()
                },
                destroy: function() {
                    this.observer.destroy()
                }
            }
        }, {
            update: function(e) {
                var t = this,
                    i = (p = t.params).slidesPerView,
                    n = p.slidesPerGroup,
                    r = p.centeredSlides,
                    s = (f = t.params.virtual).addSlidesBefore,
                    o = f.addSlidesAfter,
                    l = (m = t.virtual).from,
                    c = m.to,
                    d = m.slides,
                    u = m.slidesGrid,
                    h = m.renderSlide,
                    p = m.offset;
                t.updateActiveIndex();
                var f = t.activeIndex || 0,
                    m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
                    g = (o = r ? (y = Math.floor(i / 2) + n + s, Math.floor(i / 2) + n + o) : (y = i + (n - 1) + s, n + o), Math.max((f || 0) - o, 0)),
                    v = Math.min((f || 0) + y, d.length - 1),
                    y = (t.slidesGrid[g] || 0) - (t.slidesGrid[0] || 0);

                function b() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (a.extend(t.virtual, {
                        from: g,
                        to: v,
                        offset: y,
                        slidesGrid: t.slidesGrid
                    }), l === g && c === v && !e) return t.slidesGrid !== u && y !== p && t.slides.css(m, y + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: y,
                    from: g,
                    to: v,
                    slides: function() {
                        for (var e = [], t = g; t <= v; t += 1) e.push(d[t]);
                        return e
                    }()
                }), void b();
                var w = [],
                    _ = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var E = l; E <= c; E += 1)(E < g || v < E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + E + '"]').remove();
                for (var T = 0; T < d.length; T += 1) g <= T && T <= v && (void 0 === c || e ? _.push(T) : (c < T && _.push(T), T < l && w.push(T)));
                _.forEach(function(e) {
                    t.$wrapperEl.append(h(d[e], e))
                }), w.sort(function(e, t) {
                    return t - e
                }).forEach(function(e) {
                    t.$wrapperEl.prepend(h(d[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(m, y + "px"), b()
            },
            renderSlide: function(e, t) {
                var i = this.params.virtual;
                return i.cache && this.virtual.cache[t] ? this.virtual.cache[t] : ((e = i.renderSlide ? n(i.renderSlide.call(this, e, t)) : n('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>")).attr("data-swiper-slide-index") || e.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = e), e)
            },
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t, i, n = this.activeIndex,
                    r = n + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var o = 0; o < e.length; o += 1) e[o] && this.virtual.slides.unshift(e[o]);
                    r = n + e.length, s = e.length
                } else this.virtual.slides.unshift(e);
                this.params.virtual.cache && (t = this.virtual.cache, i = {}, Object.keys(t).forEach(function(e) {
                    i[parseInt(e, 10) + s] = t[e]
                }), this.virtual.cache = i), this.virtual.update(!0), this.slideTo(r, 0)
            },
            removeSlide: function(e) {
                if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; 0 <= i; --i) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && --t, t = Math.max(t, 0);
                    else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && --t, t = Math.max(t, 0);
                    this.virtual.update(!0), this.slideTo(t, 0)
                }
            },
            removeAllSlides: function() {
                this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
            }
        }),
        P = (v = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function() {
                a.extend(this, {
                    virtual: {
                        update: I.update.bind(this),
                        appendSlide: I.appendSlide.bind(this),
                        prependSlide: I.prependSlide.bind(this),
                        removeSlide: I.removeSlide.bind(this),
                        removeAllSlides: I.removeAllSlides.bind(this),
                        renderSlide: I.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e;
                    this.params.virtual.enabled && (this.classNames.push(this.params.containerModifierClass + "virtual"), e = {
                        watchSlidesProgress: !0
                    }, a.extend(this.params, e), a.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update())
                },
                setTranslate: function() {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }, {
            handle: function(i) {
                var n = this.rtlTranslate,
                    r = i;
                r.originalEvent && (r = r.originalEvent);
                var s = r.keyCode || r.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === s || this.isVertical() && 40 === s) || !this.allowSlidePrev && (this.isHorizontal() && 37 === s || this.isVertical() && 38 === s)) return !1;
                if (!(r.shiftKey || r.altKey || r.ctrlKey || r.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var o = !1;
                        if (0 < this.$el.parents("." + this.params.slideClass).length && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var a = t.innerWidth,
                            l = t.innerHeight;
                        i = this.$el.offset(), n && (i.left -= this.$el[0].scrollLeft);
                        for (var c = [
                                [i.left, i.top],
                                [i.left + this.width, i.top],
                                [i.left, i.top + this.height],
                                [i.left + this.width, i.top + this.height]
                            ], d = 0; d < c.length; d += 1) {
                            var u = c[d];
                            0 <= u[0] && u[0] <= a && 0 <= u[1] && u[1] <= l && (o = !0)
                        }
                        if (!o) return
                    }
                    this.isHorizontal() ? (37 !== s && 39 !== s || (r.preventDefault ? r.preventDefault() : r.returnValue = !1), (39 === s && !n || 37 === s && n) && this.slideNext(), (37 === s && !n || 39 === s && n) && this.slidePrev()) : (38 !== s && 40 !== s || (r.preventDefault ? r.preventDefault() : r.returnValue = !1), 40 === s && this.slideNext(), 38 === s && this.slidePrev()), this.emit("keyPress", s)
                }
            },
            enable: function() {
                this.keyboard.enabled || (n(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                this.keyboard.enabled && (n(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        }),
        N = (y = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function() {
                a.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: P.enable.bind(this),
                        disable: P.disable.bind(this),
                        handle: P.handle.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function() {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        }, {
            lastScrollTime: a.now(),
            event: -1 < t.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : ((w = (b = "onwheel") in e) || ((d = e.createElement("div")).setAttribute(b, "return;"), w = "function" == typeof d[b]), !w && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (w = e.implementation.hasFeature("Events.wheel", "3.0")), w ? "wheel" : "mousewheel"),
            normalize: function(e) {
                var t = 0,
                    i = 0,
                    n = 0,
                    r = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, r = 10 * i, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || r) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, r *= 40) : (n *= 800, r *= 800)), n && !t && (t = n < 1 ? -1 : 1), r && !i && (i = r < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: n,
                    pixelY: r
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var i = e,
                    n = this,
                    r = n.params.mousewheel;
                if (!n.mouseEntered && !r.releaseOnEdges) return !0;
                i.originalEvent && (i = i.originalEvent);
                var s = 0,
                    o = n.rtlTranslate ? -1 : 1,
                    l = N.normalize(i);
                if (r.forceToAxis) {
                    if (n.isHorizontal()) {
                        if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
                        s = l.pixelX * o
                    } else {
                        if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
                        s = l.pixelY
                    }
                } else s = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
                if (0 === s) return !0;
                if (r.invert && (s = -s), n.params.freeMode) {
                    if (n.params.loop && n.loopFix(), e = n.getTranslate() + s * r.sensitivity, o = n.isBeginning, l = n.isEnd, e >= n.minTranslate() && (e = n.minTranslate()), e <= n.maxTranslate() && (e = n.maxTranslate()), n.setTransition(0), n.setTranslate(e), n.updateProgress(), n.updateActiveIndex(), n.updateSlidesClasses(), (!o && n.isBeginning || !l && n.isEnd) && n.updateSlidesClasses(), n.params.freeModeSticky && (clearTimeout(n.mousewheel.timeout), n.mousewheel.timeout = a.nextTick(function() {
                            n.slideToClosest()
                        }, 300)), n.emit("scroll", i), n.params.autoplay && n.params.autoplayDisableOnInteraction && n.autoplay.stop(), e === n.minTranslate() || e === n.maxTranslate()) return !0
                } else {
                    if (60 < a.now() - n.mousewheel.lastScrollTime) {
                        if (s < 0) {
                            if (n.isEnd && !n.params.loop || n.animating) {
                                if (r.releaseOnEdges) return !0
                            } else n.slideNext(), n.emit("scroll", i)
                        } else if (n.isBeginning && !n.params.loop || n.animating) {
                            if (r.releaseOnEdges) return !0
                        } else n.slidePrev(), n.emit("scroll", i)
                    }
                    n.mousewheel.lastScrollTime = (new t.Date).getTime()
                }
                return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
            },
            enable: function() {
                if (!N.event || this.mousewheel.enabled) return !1;
                var e = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (e = n(this.params.mousewheel.eventsTarged)), e.on("mouseenter", this.mousewheel.handleMouseEnter), e.on("mouseleave", this.mousewheel.handleMouseLeave), e.on(N.event, this.mousewheel.handle), this.mousewheel.enabled = !0
            },
            disable: function() {
                if (!N.event || !this.mousewheel.enabled) return !1;
                var e = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (e = n(this.params.mousewheel.eventsTarged)), e.off(N.event, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
            }
        }),
        O = {
            update: function() {
                var e, t, i = this.params.navigation;
                this.params.loop || (e = (t = this.navigation).$nextEl, (t = t.$prevEl) && 0 < t.length && (this.isBeginning ? t.addClass(i.disabledClass) : t.removeClass(i.disabledClass), t[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](i.lockClass)), e && 0 < e.length && (this.isEnd ? e.addClass(i.disabledClass) : e.removeClass(i.disabledClass), e[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](i.lockClass)))
            },
            onPrevClick: function(e) {
                e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            },
            onNextClick: function(e) {
                e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            },
            init: function() {
                var e, t, i = this.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = n(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = n(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", this.navigation.onNextClick), t && 0 < t.length && t.on("click", this.navigation.onPrevClick), a.extend(this.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = (t = this.navigation).$nextEl,
                    t = t.$prevEl;
                e && e.length && (e.off("click", this.navigation.onNextClick), e.removeClass(this.params.navigation.disabledClass)), t && t.length && (t.off("click", this.navigation.onPrevClick), t.removeClass(this.params.navigation.disabledClass))
            }
        },
        M = {
            update: function() {
                var e = this,
                    t = e.rtl,
                    i = e.params.pagination;
                if (i.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var r, s = (e.virtual && e.params.virtual.enabled ? e.virtual : e).slides.length,
                        o = e.pagination.$el,
                        a = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > s - 1 - 2 * e.loopedSlides && (r -= s - 2 * e.loopedSlides), a - 1 < r && (r -= a), r < 0 && "bullets" !== e.params.paginationType && (r = a + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === i.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var l, c, d, u, h, p = e.pagination.bullets;
                        if (i.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), o.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (i.dynamicMainBullets + 4) + "px"), 1 < i.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = i.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), d = ((c = (l = r - e.pagination.dynamicBulletIndex) + (Math.min(p.length, i.dynamicMainBullets) - 1)) + l) / 2), p.removeClass(i.bulletActiveClass + " " + i.bulletActiveClass + "-next " + i.bulletActiveClass + "-next-next " + i.bulletActiveClass + "-prev " + i.bulletActiveClass + "-prev-prev " + i.bulletActiveClass + "-main"), 1 < o.length) p.each(function(e, t) {
                            var s = n(t);
                            (t = s.index()) === r && s.addClass(i.bulletActiveClass), i.dynamicBullets && (l <= t && t <= c && s.addClass(i.bulletActiveClass + "-main"), t === l && s.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), t === c && s.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next"))
                        });
                        else if (p.eq(r).addClass(i.bulletActiveClass), i.dynamicBullets) {
                            for (var f = p.eq(l), m = (s = p.eq(c), l); m <= c; m += 1) p.eq(m).addClass(i.bulletActiveClass + "-main");
                            f.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), s.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next")
                        }
                        i.dynamicBullets && (h = Math.min(p.length, i.dynamicMainBullets + 4), u = (e.pagination.bulletSize * h - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize, h = t ? "right" : "left", p.css(e.isHorizontal() ? h : "top", u + "px"))
                    }
                    "fraction" === i.type && (o.find("." + i.currentClass).text(i.formatFractionCurrent(r + 1)), o.find("." + i.totalClass).text(i.formatFractionTotal(a))), "progressbar" === i.type && (d = i.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical", t = (r + 1) / a, u = h = 1, "horizontal" == d ? h = t : u = t, o.find("." + i.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + h + ") scaleY(" + u + ")").transition(e.params.speed)), "custom" === i.type && i.renderCustom ? (o.html(i.renderCustom(e, r + 1, a)), e.emit("paginationRender", e, o[0])) : e.emit("paginationUpdate", e, o[0]), o[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](i.lockClass)
                }
            },
            render: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i = (e.virtual && e.params.virtual.enabled ? e.virtual : e).slides.length,
                        n = e.pagination.$el,
                        r = "";
                    if ("bullets" === t.type) {
                        for (var s = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, o = 0; o < s; o += 1) t.renderBullet ? r += t.renderBullet.call(e, o, t.bulletClass) : r += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        n.html(r), e.pagination.bullets = n.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', n.html(r)), "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', n.html(r)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function() {
                var e, t = this,
                    i = t.params.pagination;
                i.el && 0 !== (e = n(i.el)).length && (t.params.uniqueNavElements && "string" == typeof i.el && 1 < e.length && 1 === t.$el.find(i.el).length && (e = t.$el.find(i.el)), "bullets" === i.type && i.clickable && e.addClass(i.clickableClass), e.addClass(i.modifierClass + i.type), "bullets" === i.type && i.dynamicBullets && (e.addClass("" + i.modifierClass + i.type + "-dynamic"), t.pagination.dynamicBulletIndex = 0, i.dynamicMainBullets < 1 && (i.dynamicMainBullets = 1)), "progressbar" === i.type && i.progressbarOpposite && e.addClass(i.progressbarOppositeClass), i.clickable && e.on("click", "." + i.bulletClass, function(e) {
                    e.preventDefault(), e = n(this).index() * t.params.slidesPerGroup, t.params.loop && (e += t.loopedSlides), t.slideTo(e)
                }), a.extend(t.pagination, {
                    $el: e,
                    el: e[0]
                }))
            },
            destroy: function() {
                var e, t = this.params.pagination;
                t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length && ((e = this.pagination.$el).removeClass(t.hiddenClass), e.removeClass(t.modifierClass + t.type), this.pagination.bullets && this.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && e.off("click", "." + t.bulletClass))
            }
        },
        H = {
            setTranslate: function() {
                var e, t, i, n, r, s, o, a;
                this.params.scrollbar.el && this.scrollbar.el && (o = this.scrollbar, e = this.rtlTranslate, a = this.progress, t = o.dragSize, i = o.trackSize, n = o.$dragEl, r = o.$el, s = this.params.scrollbar, a = (i - (o = t)) * a, e ? 0 < (a = -a) ? (o = t - a, a = 0) : i < -a + t && (o = i + a) : a < 0 ? (o = t + a, a = 0) : i < a + t && (o = i - a), this.isHorizontal() ? (l.transforms3d ? n.transform("translate3d(" + a + "px, 0, 0)") : n.transform("translateX(" + a + "px)"), n[0].style.width = o + "px") : (l.transforms3d ? n.transform("translate3d(0px, " + a + "px, 0)") : n.transform("translateY(" + a + "px)"), n[0].style.height = o + "px"), s.hide && (clearTimeout(this.scrollbar.timeout), r[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function() {
                    r[0].style.opacity = 0, r.transition(400)
                }, 1e3)))
            },
            setTransition: function(e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                var e, t, i, n, r, s, o;
                this.params.scrollbar.el && this.scrollbar.el && (t = (e = this.scrollbar).$dragEl, i = e.$el, t[0].style.width = "", t[0].style.height = "", n = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, s = (r = this.size / this.virtualSize) * (n / this.size), o = "auto" === this.params.scrollbar.dragSize ? n * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = o + "px" : t[0].style.height = o + "px", i[0].style.display = 1 <= r ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), a.extend(e, {
                    trackSize: n,
                    divider: r,
                    moveDivider: s,
                    dragSize: o
                }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass))
            },
            setDragPosition: function(e) {
                var t = this.scrollbar,
                    i = this.rtlTranslate,
                    n = t.$el,
                    r = t.dragSize;
                t = t.trackSize, r = Math.max(Math.min(r = ((this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - n.offset()[this.isHorizontal() ? "left" : "top"] - r / 2) / (t - r), 1), 0), i && (r = 1 - r), r = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * r, this.updateProgress(r), this.setTranslate(r), this.updateActiveIndex(), this.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    n = this.$wrapperEl,
                    r = i.$el,
                    s = i.$dragEl;
                this.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), n.transition(100), s.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), r.transition(0), t.hide && r.css("opacity", 1), this.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    n = t.$el,
                    r = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), n.transition(0), r.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar.$el;
                this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = a.nextTick(function() {
                    i.css("opacity", 0), i.transition(400)
                }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
            },
            enableDraggable: function() {
                var t, i, n, r, s;
                this.params.scrollbar.el && (r = this.scrollbar, t = this.touchEventsTouch, i = this.touchEventsDesktop, s = this.params, n = r.$el[0], r = !(!l.passiveListener || !s.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }, s = !(!l.passiveListener || !s.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, l.touch ? (n.addEventListener(t.start, this.scrollbar.onDragStart, r), n.addEventListener(t.move, this.scrollbar.onDragMove, r), n.addEventListener(t.end, this.scrollbar.onDragEnd, s)) : (n.addEventListener(i.start, this.scrollbar.onDragStart, r), e.addEventListener(i.move, this.scrollbar.onDragMove, r), e.addEventListener(i.end, this.scrollbar.onDragEnd, s)))
            },
            disableDraggable: function() {
                var t, i, n, r, s;
                this.params.scrollbar.el && (r = this.scrollbar, t = this.touchEventsTouch, i = this.touchEventsDesktop, s = this.params, n = r.$el[0], r = !(!l.passiveListener || !s.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }, s = !(!l.passiveListener || !s.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, l.touch ? (n.removeEventListener(t.start, this.scrollbar.onDragStart, r), n.removeEventListener(t.move, this.scrollbar.onDragMove, r), n.removeEventListener(t.end, this.scrollbar.onDragEnd, s)) : (n.removeEventListener(i.start, this.scrollbar.onDragStart, r), e.removeEventListener(i.move, this.scrollbar.onDragMove, r), e.removeEventListener(i.end, this.scrollbar.onDragEnd, s)))
            },
            init: function() {
                var e, t, i, r;
                this.params.scrollbar.el && (e = this.scrollbar, r = this.$el, i = n((t = this.params.scrollbar).el), this.params.uniqueNavElements && "string" == typeof t.el && 1 < i.length && 1 === r.find(t.el).length && (i = r.find(t.el)), 0 === (r = i.find("." + this.params.scrollbar.dragClass)).length && (r = n('<div class="' + this.params.scrollbar.dragClass + '"></div>'), i.append(r)), a.extend(e, {
                    $el: i,
                    el: i[0],
                    $dragEl: r,
                    dragEl: r[0]
                }), t.draggable && e.enableDraggable())
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        },
        q = {
            setTransform: function(e, t) {
                var i = this.rtl,
                    r = n(e),
                    s = i ? -1 : 1,
                    o = r.attr("data-swiper-parallax") || "0",
                    a = r.attr("data-swiper-parallax-x"),
                    l = r.attr("data-swiper-parallax-y");
                e = r.attr("data-swiper-parallax-scale"), i = r.attr("data-swiper-parallax-opacity"), a || l ? (a = a || "0", l = l || "0") : this.isHorizontal() ? (a = o, l = "0") : (l = o, a = "0"), a = 0 <= a.indexOf("%") ? parseInt(a, 10) * t * s + "%" : a * t * s + "px", l = 0 <= l.indexOf("%") ? parseInt(l, 10) * t + "%" : l * t + "px", null != i && (i -= (i - 1) * (1 - Math.abs(t)), r[0].style.opacity = i), null == e ? r.transform("translate3d(" + a + ", " + l + ", 0px)") : (t = e - (e - 1) * (1 - Math.abs(t)), r.transform("translate3d(" + a + ", " + l + ", 0px) scale(" + t + ")"))
            },
            setTranslate: function() {
                var e = this,
                    t = e.$el,
                    i = e.slides,
                    r = e.progress,
                    s = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(t, i) {
                    e.parallax.setTransform(i, r)
                }), i.each(function(t, i) {
                    var o = i.progress;
                    1 < e.params.slidesPerGroup && "auto" !== e.params.slidesPerView && (o += Math.ceil(t / 2) - r * (s.length - 1)), o = Math.min(Math.max(o, -1), 1), n(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(t, i) {
                        e.parallax.setTransform(i, o)
                    })
                })
            },
            setTransition: function(e) {
                void 0 === e && (e = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(t, i) {
                    var r = n(i);
                    i = parseInt(r.attr("data-swiper-parallax-duration"), 10) || e, 0 === e && (i = 0), r.transition(i)
                })
            }
        },
        z = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY;
                return Math.sqrt(Math.pow(e.targetTouches[1].pageX - t, 2) + Math.pow((e = e.targetTouches[1].pageY) - i, 2))
            },
            onGestureStart: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    r = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !l.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, r.scaleStart = z.getDistanceBetweenTouches(e)
                }
                r.$slideEl && r.$slideEl.length || (r.$slideEl = n(e.target).closest(".swiper-slide"), 0 === r.$slideEl.length && (r.$slideEl = this.slides.eq(this.activeIndex)), r.$imageEl = r.$slideEl.find("img, svg, canvas"), r.$imageWrapEl = r.$imageEl.parent("." + t.containerClass), r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== r.$imageWrapEl.length) ? (r.$imageEl.transition(0), this.zoom.isScaling = !0) : r.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    n = i.gesture;
                if (!l.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, n.scaleMove = z.getDistanceBetweenTouches(e)
                }
                n.$imageEl && 0 !== n.$imageEl.length && (i.scale = l.gestures ? e.scale * i.currentScale : n.scaleMove / n.scaleStart * i.currentScale, i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
            },
            onGestureEnd: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    n = i.gesture;
                if (!l.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved || "touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !_.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
                }
                n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), n.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (n.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = (i = this.zoom).gesture,
                    i = i.image;
                t.$imageEl && 0 !== t.$imageEl.length && (i.isTouched || (_.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = ("touchstart" === e.type ? e.targetTouches[0] : e).pageX, i.touchesStart.y = ("touchstart" === e.type ? e.targetTouches[0] : e).pageY))
            },
            onTouchMove: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    n = t.image,
                    r = t.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, n.isTouched && i.$slideEl)) {
                    n.isMoved || (n.width = i.$imageEl[0].offsetWidth, n.height = i.$imageEl[0].offsetHeight, n.startX = a.getTranslate(i.$imageWrapEl[0], "x") || 0, n.startY = a.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (n.startX = -n.startX, n.startY = -n.startY));
                    var s = n.width * t.scale,
                        o = n.height * t.scale;
                    if (!(s < i.slideWidth && o < i.slideHeight)) {
                        if (n.minX = Math.min(i.slideWidth / 2 - s / 2, 0), n.maxX = -n.minX, n.minY = Math.min(i.slideHeight / 2 - o / 2, 0), n.maxY = -n.minY, n.touchesCurrent.x = ("touchmove" === e.type ? e.targetTouches[0] : e).pageX, n.touchesCurrent.y = ("touchmove" === e.type ? e.targetTouches[0] : e).pageY, !n.isMoved && !t.isScaling && (this.isHorizontal() && (Math.floor(n.minX) === Math.floor(n.startX) && n.touchesCurrent.x < n.touchesStart.x || Math.floor(n.maxX) === Math.floor(n.startX) && n.touchesCurrent.x > n.touchesStart.x) || !this.isHorizontal() && (Math.floor(n.minY) === Math.floor(n.startY) && n.touchesCurrent.y < n.touchesStart.y || Math.floor(n.maxY) === Math.floor(n.startY) && n.touchesCurrent.y > n.touchesStart.y))) return void(n.isTouched = !1);
                        e.preventDefault(), e.stopPropagation(), n.isMoved = !0, n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX, n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY, n.currentX < n.minX && (n.currentX = n.minX + 1 - Math.pow(n.minX - n.currentX + 1, .8)), n.currentX > n.maxX && (n.currentX = n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, .8)), n.currentY < n.minY && (n.currentY = n.minY + 1 - Math.pow(n.minY - n.currentY + 1, .8)), n.currentY > n.maxY && (n.currentY = n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = n.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = n.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (n.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (n.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, 2 > Math.abs(n.touchesCurrent.x - r.prevPositionX) && (r.x = 0), 2 > Math.abs(n.touchesCurrent.y - r.prevPositionY) && (r.y = 0), r.prevPositionX = n.touchesCurrent.x, r.prevPositionY = n.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + n.currentX + "px, " + n.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    n = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var r = 300,
                        s = 300,
                        o = n.x * r,
                        a = i.currentX + o;
                    o = n.y * s, o = i.currentY + o, 0 !== n.x && (r = Math.abs((a - i.currentX) / n.x)), 0 !== n.y && (s = Math.abs((o - i.currentY) / n.y)), s = Math.max(r, s), i.currentX = a, i.currentY = o, o = i.width * e.scale, e = i.height * e.scale, i.minX = Math.min(t.slideWidth / 2 - o / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - e / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(s).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, i, r, s = this.zoom,
                    o = this.params.zoom,
                    a = s.gesture,
                    l = s.image;
                a.$slideEl || (a.$slideEl = this.clickedSlide ? n(this.clickedSlide) : this.slides.eq(this.activeIndex), a.$imageEl = a.$slideEl.find("img, svg, canvas"), a.$imageWrapEl = a.$imageEl.parent("." + o.containerClass)), a.$imageEl && 0 !== a.$imageEl.length && (a.$slideEl.addClass("" + o.zoomedSlideClass), l = void 0 === l.touchesStart.x && e ? (r = ("touchend" === e.type ? e.changedTouches[0] : e).pageX, ("touchend" === e.type ? e.changedTouches[0] : e).pageY) : (r = l.touchesStart.x, l.touchesStart.y), s.scale = a.$imageWrapEl.attr("data-swiper-zoom") || o.maxRatio, s.currentScale = a.$imageWrapEl.attr("data-swiper-zoom") || o.maxRatio, e ? (o = a.$slideEl[0].offsetWidth, e = a.$slideEl[0].offsetHeight, t = a.$slideEl.offset().left + o / 2 - r, i = a.$slideEl.offset().top + e / 2 - l, r = a.$imageEl[0].offsetWidth, l = a.$imageEl[0].offsetHeight, r *= s.scale, l *= s.scale, r = -(o = Math.min(o / 2 - r / 2, 0)), l = -(e = Math.min(e / 2 - l / 2, 0)), (t *= s.scale) < o && (t = o), r < t && (t = r), (i *= s.scale) < e && (i = e), l < i && (i = l)) : i = t = 0, a.$imageWrapEl.transition(300).transform("translate3d(" + t + "px, " + i + "px,0)"), a.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"))
            },
            out: function() {
                var e = this.zoom,
                    t = this.params.zoom,
                    i = e.gesture;
                i.$slideEl || (i.$slideEl = this.clickedSlide ? n(this.clickedSlide) : this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function() {
                var e, t = this.zoom;
                t.enabled || (t.enabled = !0, e = !("touchstart" !== this.touchEvents.start || !l.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, l.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, e), this.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, e), this.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, e)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", t.onGestureStart, e), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", t.onGestureChange, e), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", t.onGestureEnd, e)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, t.onTouchMove))
            },
            disable: function() {
                var e, t = this,
                    i = t.zoom;
                i.enabled && (t.zoom.enabled = !1, e = !("touchstart" !== t.touchEvents.start || !l.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, l.gestures ? (t.$wrapperEl.off("gesturestart", ".swiper-slide", i.onGestureStart, e), t.$wrapperEl.off("gesturechange", ".swiper-slide", i.onGestureChange, e), t.$wrapperEl.off("gestureend", ".swiper-slide", i.onGestureEnd, e)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.off(t.touchEvents.start, ".swiper-slide", i.onGestureStart, e), t.$wrapperEl.off(t.touchEvents.move, ".swiper-slide", i.onGestureChange, e), t.$wrapperEl.off(t.touchEvents.end, ".swiper-slide", i.onGestureEnd, e)), t.$wrapperEl.off(t.touchEvents.move, "." + t.params.zoom.containerClass, i.onTouchMove))
            }
        },
        R = {
            loadInSlide: function(e, t) {
                void 0 === t && (t = !0);
                var i, r = this,
                    s = r.params.lazy;
                void 0 !== e && 0 !== r.slides.length && (e = (i = r.virtual && r.params.virtual.enabled ? r.$wrapperEl.children("." + r.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : r.slides.eq(e)).find("." + s.elementClass + ":not(." + s.loadedClass + "):not(." + s.loadingClass + ")"), !i.hasClass(s.elementClass) || i.hasClass(s.loadedClass) || i.hasClass(s.loadingClass) || (e = e.add(i[0])), 0 !== e.length && e.each(function(e, o) {
                    var a = n(o);
                    a.addClass(s.loadingClass);
                    var l = a.attr("data-background"),
                        c = a.attr("data-src"),
                        d = a.attr("data-srcset"),
                        u = a.attr("data-sizes");
                    r.loadImage(a[0], c || l, d, u, !1, function() {
                        var e, n;
                        null == r || !r || r && !r.params || r.destroyed || (l ? (a.css("background-image", 'url("' + l + '")'), a.removeAttr("data-background")) : (d && (a.attr("srcset", d), a.removeAttr("data-srcset")), u && (a.attr("sizes", u), a.removeAttr("data-sizes")), c && (a.attr("src", c), a.removeAttr("data-src"))), a.addClass(s.loadedClass).removeClass(s.loadingClass), i.find("." + s.preloaderClass).remove(), r.params.loop && t && (n = i.attr("data-swiper-slide-index"), i.hasClass(r.params.slideDuplicateClass) ? (e = r.$wrapperEl.children('[data-swiper-slide-index="' + n + '"]:not(.' + r.params.slideDuplicateClass + ")"), r.lazy.loadInSlide(e.index(), !1)) : (n = r.$wrapperEl.children("." + r.params.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]'), r.lazy.loadInSlide(n.index(), !1))), r.emit("lazyImageReady", i[0], a[0]))
                    }), r.emit("lazyImageLoad", i[0], a[0])
                }))
            },
            load: function() {
                var e = this,
                    t = e.$wrapperEl,
                    i = e.params,
                    r = e.slides,
                    s = e.activeIndex,
                    o = e.virtual && i.virtual.enabled,
                    a = i.lazy,
                    l = i.slidesPerView;

                function c(e) {
                    if (o) {
                        if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return 1
                    } else if (r[e]) return 1
                }

                function d(e) {
                    return o ? n(e).attr("data-swiper-slide-index") : n(e).index()
                }
                if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function(t, i) {
                    i = o ? n(i).attr("data-swiper-slide-index") : n(i).index(), e.lazy.loadInSlide(i)
                });
                else if (1 < l)
                    for (var u = s; u < s + l; u += 1) c(u) && e.lazy.loadInSlide(u);
                else e.lazy.loadInSlide(s);
                if (a.loadPrevNext) {
                    if (1 < l || a.loadPrevNextAmount && 1 < a.loadPrevNextAmount) {
                        for (var h = a.loadPrevNextAmount, p = Math.min(s + (a = l) + Math.max(h, a), r.length), f = (h = Math.max(s - Math.max(a, h), 0), s + l); f < p; f += 1) c(f) && e.lazy.loadInSlide(f);
                        for (var m = h; m < s; m += 1) c(m) && e.lazy.loadInSlide(m)
                    } else 0 < (h = t.children("." + i.slideNextClass)).length && e.lazy.loadInSlide(d(h)), 0 < (h = t.children("." + i.slidePrevClass)).length && e.lazy.loadInSlide(d(h))
                }
            }
        },
        B = {
            LinearSpline: function(e, t) {
                var i, n, r, s, o;
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (s = (o = function(e, t) {
                        for (n = -1, i = e.length; 1 < i - n;) e[r = i + n >> 1] <= t ? n = r : i = r;
                        return i
                    }(this.x, e)) - 1, (e - this.x[s]) * (this.y[o] - this.y[s]) / (this.x[o] - this.x[s]) + this.y[s]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                this.controller.spline || (this.controller.spline = this.params.loop ? new B.LinearSpline(this.slidesGrid, e.slidesGrid) : new B.LinearSpline(this.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var i, n, r = this,
                    s = r.controller.control;

                function o(e) {
                    var t = r.rtlTranslate ? -r.translate : r.translate;
                    "slide" === r.params.controller.by && (r.controller.getInterpolateFunction(e), n = -r.controller.spline.interpolate(-t)), n && "container" !== r.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (r.maxTranslate() - r.minTranslate()), n = (t - r.minTranslate()) * i + e.minTranslate()), r.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, r), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(s))
                    for (var a = 0; a < s.length; a += 1) s[a] !== t && s[a] instanceof C && o(s[a]);
                else s instanceof C && t !== s && o(s)
            },
            setTransition: function(e, t) {
                var i, n = this,
                    r = n.controller.control;

                function s(t) {
                    t.setTransition(e, n), 0 !== e && (t.transitionStart(), t.params.autoHeight && a.nextTick(function() {
                        t.updateAutoHeight()
                    }), t.$wrapperEl.transitionEnd(function() {
                        r && (t.params.loop && "slide" === n.params.controller.by && t.loopFix(), t.transitionEnd())
                    }))
                }
                if (Array.isArray(r))
                    for (i = 0; i < r.length; i += 1) r[i] !== t && r[i] instanceof C && s(r[i]);
                else r instanceof C && t !== r && s(r)
            }
        },
        j = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this.params.a11y;
                13 === e.keyCode && (e = n(e.target), this.navigation && this.navigation.$nextEl && e.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && e.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && e.is("." + this.params.pagination.bulletClass) && e[0].click())
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                var e, t;
                this.params.loop || (e = (t = this.navigation).$nextEl, (t = t.$prevEl) && 0 < t.length && (this.isBeginning ? this.a11y.disableEl(t) : this.a11y.enableEl(t)), e && 0 < e.length && (this.isEnd ? this.a11y.disableEl(e) : this.a11y.enableEl(e)))
            },
            updatePagination: function() {
                var e = this,
                    t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function(i, r) {
                    r = n(r), e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
                })
            },
            init: function() {
                this.$el.append(this.a11y.liveRegion);
                var e, t, i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t;
                this.a11y.liveRegion && 0 < this.a11y.liveRegion.length && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            }
        },
        W = {
            init: function() {
                if (this.params.history) {
                    if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void(this.params.hashNavigation.enabled = !0);
                    var e = this.history;
                    e.initialized = !0, e.paths = W.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
                }
            },
            destroy: function() {
                this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                this.history.paths = W.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function() {
                var e = t.location.pathname.slice(1).split("/").filter(function(e) {
                        return "" !== e
                    }),
                    i = e.length;
                return {
                    key: e[i - 2],
                    value: e[i - 1]
                }
            },
            setHistory: function(e, i) {
                this.history.initialized && this.params.history.enabled && (i = this.slides.eq(i), i = W.slugify(i.attr("data-history")), t.location.pathname.includes(e) || (i = e + "/" + i), (e = t.history.state) && e.value === i || (this.params.history.replaceState ? t.history.replaceState({
                    value: i
                }, null, i) : t.history.pushState({
                    value: i
                }, null, i)))
            },
            slugify: function(e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, i) {
                if (t)
                    for (var n = 0, r = this.slides.length; n < r; n += 1) {
                        var s = this.slides.eq(n);
                        W.slugify(s.attr("data-history")) !== t || s.hasClass(this.params.slideDuplicateClass) || (s = s.index(), this.slideTo(s, e, i))
                    } else this.slideTo(0, e, i)
            }
        },
        F = {
            onHashCange: function() {
                var t = e.location.hash.replace("#", "");
                t === this.slides.eq(this.activeIndex).attr("data-hash") || void 0 !== (t = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index()) && this.slideTo(t)
            },
            setHash: function() {
                var i;
                this.hashNavigation.initialized && this.params.hashNavigation.enabled && (this.params.hashNavigation.replaceState && t.history && t.history.replaceState ? t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash")) : (i = (i = this.slides.eq(this.activeIndex)).attr("data-hash") || i.attr("data-history"), e.location.hash = i || ""))
            },
            init: function() {
                var i = this;
                if (!(!i.params.hashNavigation.enabled || i.params.history && i.params.history.enabled)) {
                    i.hashNavigation.initialized = !0;
                    var r = e.location.hash.replace("#", "");
                    if (r)
                        for (var s = 0, o = i.slides.length; s < o; s += 1) {
                            var a = i.slides.eq(s);
                            (a.attr("data-hash") || a.attr("data-history")) !== r || a.hasClass(i.params.slideDuplicateClass) || (a = a.index(), i.slideTo(a, 0, i.params.runCallbacksOnInit, !0))
                        }
                    i.params.hashNavigation.watchState && n(t).on("hashchange", i.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                this.params.hashNavigation.watchState && n(t).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        V = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = a.nextTick(function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                }, i)
            },
            start: function() {
                return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)
            },
            stop: function() {
                return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)
            },
            pause: function(e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            }
        },
        U = {
            setTranslate: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                    var i = this.slides.eq(t),
                        n = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (n -= this.translate);
                    var r = 0;
                    this.isHorizontal() || (r = n, n = 0);
                    var s = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: s
                    }).transform("translate3d(" + n + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var t, i = this,
                    n = i.slides,
                    r = i.$wrapperEl;
                n.transition(e), i.params.virtualTranslate && 0 !== e && (t = !1, n.transitionEnd(function() {
                    if (!t && i && !i.destroyed) {
                        t = !0, i.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], n = 0; n < e.length; n += 1) r.trigger(e[n])
                    }
                }))
            }
        },
        G = {
            setTranslate: function() {
                var e, t = this.$el,
                    i = this.$wrapperEl,
                    r = this.slides,
                    s = this.width,
                    o = this.height,
                    a = this.rtlTranslate,
                    l = this.size,
                    d = this.params.cubeEffect,
                    u = this.isHorizontal(),
                    h = this.virtual && this.params.virtual.enabled,
                    p = 0;
                d.shadow && (u ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: s + "px"
                })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), t.append(e)));
                for (var f = 0; f < r.length; f += 1) {
                    var m = r.eq(f),
                        g = f;
                    h && (g = parseInt(m.attr("data-swiper-slide-index"), 10));
                    var v = 90 * g,
                        y = Math.floor(v / 360);
                    a && (y = Math.floor(-(v = -v) / 360));
                    var b = Math.max(Math.min(m[0].progress, 1), -1),
                        w = 0,
                        _ = 0,
                        E = 0;
                    g % 4 == 0 ? (w = -(4 * y) * l, E = 0) : (g - 1) % 4 == 0 ? (w = 0, E = -(4 * y) * l) : (g - 2) % 4 == 0 ? (w = l + 4 * y * l, E = l) : (g - 3) % 4 == 0 && (w = -l, E = 3 * l + 4 * l * y), a && (w = -w), u || (_ = w, w = 0), E = "rotateX(" + (u ? 0 : -v) + "deg) rotateY(" + (u ? v : 0) + "deg) translate3d(" + w + "px, " + _ + "px, " + E + "px)", b <= 1 && -1 < b && (p = a ? -(90 * g) - 90 * b : 90 * g + 90 * b), m.transform(E), d.slideShadows && (g = u ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"), E = u ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom"), 0 === g.length && (g = n('<div class="swiper-slide-shadow-' + (u ? "left" : "top") + '"></div>'), m.append(g)), 0 === E.length && (E = n('<div class="swiper-slide-shadow-' + (u ? "right" : "bottom") + '"></div>'), m.append(E)), g.length && (g[0].style.opacity = Math.max(-b, 0)), E.length && (E[0].style.opacity = Math.max(b, 0)))
                }
                i.css({
                    "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                    "transform-origin": "50% 50% -" + l / 2 + "px"
                }), d.shadow && (u ? e.transform("translate3d(0px, " + (s / 2 + d.shadowOffset) + "px, " + -s / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")") : (t = 1.5 - (Math.sin(2 * (T = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90)) * Math.PI / 360) / 2 + Math.cos(2 * T * Math.PI / 360) / 2), s = d.shadowScale, T = d.shadowScale / t, t = d.shadowOffset, e.transform("scale3d(" + s + ", 1, " + T + ") translate3d(0px, " + (o / 2 + t) + "px, " + -o / 2 / T + "px) rotateX(-90deg)")));
                var T = c.isSafari || c.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + T + "px) rotateX(" + (this.isHorizontal() ? 0 : p) + "deg) rotateY(" + (this.isHorizontal() ? -p : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        X = {
            setTranslate: function() {
                for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                    var r = e.eq(i),
                        s = r[0].progress;
                    this.params.flipEffect.limitRotation && (s = Math.max(Math.min(r[0].progress, 1), -1));
                    var o, a, l = -180 * s,
                        c = 0,
                        d = -r[0].swiperSlideOffset,
                        u = 0;
                    this.isHorizontal() ? t && (l = -l) : (u = d, c = -l, l = d = 0), r[0].style.zIndex = -Math.abs(Math.round(s)) + e.length, this.params.flipEffect.slideShadows && (o = this.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"), a = this.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom"), 0 === o.length && (o = n('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), r.append(o)), 0 === a.length && (a = n('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(a)), o.length && (o[0].style.opacity = Math.max(-s, 0)), a.length && (a[0].style.opacity = Math.max(s, 0))), r.transform("translate3d(" + d + "px, " + u + "px, 0px) rotateX(" + c + "deg) rotateY(" + l + "deg)")
                }
            },
            setTransition: function(e) {
                var t, i = this,
                    n = i.slides,
                    r = i.activeIndex,
                    s = i.$wrapperEl;
                n.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), i.params.virtualTranslate && 0 !== e && (t = !1, n.eq(r).transitionEnd(function() {
                    if (!t && i && !i.destroyed) {
                        t = !0, i.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], n = 0; n < e.length; n += 1) s.trigger(e[n])
                    }
                }))
            }
        },
        Y = {
            setTranslate: function() {
                for (var e = this.width, t = this.height, i = this.slides, r = this.$wrapperEl, s = this.slidesSizesGrid, o = this.params.coverflowEffect, a = this.isHorizontal(), c = this.translate, d = a ? e / 2 - c : t / 2 - c, u = a ? o.rotate : -o.rotate, h = o.depth, p = 0, f = i.length; p < f; p += 1) {
                    var m = i.eq(p),
                        g = s[p],
                        v = (d - m[0].swiperSlideOffset - g / 2) / g * o.modifier,
                        y = a ? u * v : 0,
                        b = a ? 0 : u * v,
                        w = -h * Math.abs(v),
                        _ = a ? 0 : o.stretch * v;
                    .001 > Math.abs(g = a ? o.stretch * v : 0) && (g = 0), .001 > Math.abs(_) && (_ = 0), .001 > Math.abs(w) && (w = 0), .001 > Math.abs(y) && (y = 0), .001 > Math.abs(b) && (b = 0), b = "translate3d(" + g + "px," + _ + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + y + "deg)", m.transform(b), m[0].style.zIndex = 1 - Math.abs(Math.round(v)), o.slideShadows && (y = a ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"), b = a ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom"), 0 === y.length && (y = n('<div class="swiper-slide-shadow-' + (a ? "left" : "top") + '"></div>'), m.append(y)), 0 === b.length && (b = n('<div class="swiper-slide-shadow-' + (a ? "right" : "bottom") + '"></div>'), m.append(b)), y.length && (y[0].style.opacity = 0 < v ? v : 0), b.length && (b[0].style.opacity = 0 < -v ? -v : 0))
                }(l.pointerEvents || l.prefixedPointerEvents) && (r[0].style.perspectiveOrigin = d + "px 50%")
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        K = {
            init: function() {
                var e = this,
                    t = e.params.thumbs,
                    i = e.constructor;
                t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, a.extend(e.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), a.extend(e.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : a.isObject(t.swiper) && (e.thumbs.swiper = new i(a.extend({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
            },
            onThumbClick: function() {
                var e, t, i, r = this,
                    s = r.thumbs.swiper;
                s && (t = s.clickedIndex, (e = s.clickedSlide) && n(e).hasClass(r.params.thumbs.slideThumbActiveClass) || null == t || (i = s.params.loop ? parseInt(n(s.clickedSlide).attr("data-swiper-slide-index"), 10) : t, r.params.loop && (e = r.activeIndex, r.slides.eq(e).hasClass(r.params.slideDuplicateClass) && (r.loopFix(), r._clientLeft = r.$wrapperEl[0].clientLeft, e = r.activeIndex), s = r.slides.eq(e).prevAll('[data-swiper-slide-index="' + i + '"]').eq(0).index(), t = r.slides.eq(e).nextAll('[data-swiper-slide-index="' + i + '"]').eq(0).index(), i = void 0 === s || void 0 !== t && t - e < e - s ? t : s), r.slideTo(i)))
            },
            update: function(e) {
                var t = this.thumbs.swiper;
                if (t) {
                    var i, n, r, s = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                    this.realIndex !== t.realIndex && (i = t.activeIndex, r = t.params.loop ? (t.slides.eq(i).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, i = t.activeIndex), r = t.slides.eq(i).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(), n = t.slides.eq(i).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(), void 0 === r ? n : void 0 === n ? r : n - i == i - r ? i : n - i < i - r ? n : r) : this.realIndex, 0 > t.visibleSlidesIndexes.indexOf(r) && (t.params.centeredSlides ? r = i < r ? r - Math.floor(s / 2) + 1 : r + Math.floor(s / 2) - 1 : i < r && (r = r - s + 1), t.slideTo(r, e ? 0 : void 0)));
                    var o = 1,
                        a = this.params.thumbs.slideThumbActiveClass;
                    if (1 < this.params.slidesPerView && !this.params.centeredSlides && (o = this.params.slidesPerView), t.slides.removeClass(a), t.params.loop)
                        for (var l = 0; l < o; l += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + l) + '"]').addClass(a);
                    else
                        for (var c = 0; c < o; c += 1) t.slides.eq(this.realIndex + c).addClass(a)
                }
            }
        };
    return y = [L, k, D, m, g, v, y, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            a.extend(this, {
                mousewheel: {
                    enabled: !1,
                    enable: N.enable.bind(this),
                    disable: N.disable.bind(this),
                    handle: N.handle.bind(this),
                    handleMouseEnter: N.handleMouseEnter.bind(this),
                    handleMouseLeave: N.handleMouseLeave.bind(this),
                    lastScrollTime: a.now()
                }
            })
        },
        on: {
            init: function() {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy: function() {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            a.extend(this, {
                navigation: {
                    init: O.init.bind(this),
                    update: O.update.bind(this),
                    destroy: O.destroy.bind(this),
                    onNextClick: O.onNextClick.bind(this),
                    onPrevClick: O.onPrevClick.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.navigation.init(), this.navigation.update()
            },
            toEdge: function() {
                this.navigation.update()
            },
            fromEdge: function() {
                this.navigation.update()
            },
            destroy: function() {
                this.navigation.destroy()
            },
            click: function(e) {
                var t, i = (r = this.navigation).$nextEl,
                    r = r.$prevEl;
                !this.params.navigation.hideOnClick || n(e.target).is(r) || n(e.target).is(i) || (i ? t = i.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), i && i.toggleClass(this.params.navigation.hiddenClass), r && r.toggleClass(this.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            a.extend(this, {
                pagination: {
                    init: M.init.bind(this),
                    render: M.render.bind(this),
                    update: M.update.bind(this),
                    destroy: M.destroy.bind(this),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function() {
                this.pagination.init(), this.pagination.render(), this.pagination.update()
            },
            activeIndexChange: function() {
                (this.params.loop || void 0 === this.snapIndex) && this.pagination.update()
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update()
            },
            slidesLengthChange: function() {
                this.params.loop && (this.pagination.render(), this.pagination.update())
            },
            snapGridLengthChange: function() {
                this.params.loop || (this.pagination.render(), this.pagination.update())
            },
            destroy: function() {
                this.pagination.destroy()
            },
            click: function(e) {
                this.params.pagination.el && this.params.pagination.hideOnClick && 0 < this.pagination.$el.length && !n(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            a.extend(this, {
                scrollbar: {
                    init: H.init.bind(this),
                    destroy: H.destroy.bind(this),
                    updateSize: H.updateSize.bind(this),
                    setTranslate: H.setTranslate.bind(this),
                    setTransition: H.setTransition.bind(this),
                    enableDraggable: H.enableDraggable.bind(this),
                    disableDraggable: H.disableDraggable.bind(this),
                    setDragPosition: H.setDragPosition.bind(this),
                    onDragStart: H.onDragStart.bind(this),
                    onDragMove: H.onDragMove.bind(this),
                    onDragEnd: H.onDragEnd.bind(this),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function() {
                this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
            },
            update: function() {
                this.scrollbar.updateSize()
            },
            resize: function() {
                this.scrollbar.updateSize()
            },
            observerUpdate: function() {
                this.scrollbar.updateSize()
            },
            setTranslate: function() {
                this.scrollbar.setTranslate()
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e)
            },
            destroy: function() {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            a.extend(this, {
                parallax: {
                    setTransform: q.setTransform.bind(this),
                    setTranslate: q.setTranslate.bind(this),
                    setTransition: q.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            },
            init: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTranslate: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTransition: function(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var e = this,
                t = {
                    enabled: !1,
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    }
                };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(i) {
                t[i] = z[i].bind(e)
            }), a.extend(e, {
                zoom: t
            });
            var i = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: function() {
                    return i
                },
                set: function(t) {
                    var n, r;
                    i !== t && (n = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0, r = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0, e.emit("zoomChange", t, n, r)), i = t
                }
            })
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable()
            },
            destroy: function() {
                this.zoom.disable()
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap: function(e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            },
            transitionEnd: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            a.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: R.load.bind(this),
                    loadInSlide: R.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            },
            init: function() {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            },
            scroll: function() {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            transitionStart: function() {
                this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
            },
            transitionEnd: function() {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            a.extend(this, {
                controller: {
                    control: this.params.controller.control,
                    getInterpolateFunction: B.getInterpolateFunction.bind(this),
                    setTranslate: B.setTranslate.bind(this),
                    setTransition: B.setTransition.bind(this)
                }
            })
        },
        on: {
            update: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            },
            resize: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            },
            observerUpdate: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var e = this;
            a.extend(e, {
                a11y: {
                    liveRegion: n('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }), Object.keys(j).forEach(function(t) {
                e.a11y[t] = j[t].bind(e)
            })
        },
        on: {
            init: function() {
                this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            a.extend(this, {
                history: {
                    init: W.init.bind(this),
                    setHistory: W.setHistory.bind(this),
                    setHistoryPopState: W.setHistoryPopState.bind(this),
                    scrollToSlide: W.scrollToSlide.bind(this),
                    destroy: W.destroy.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init()
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy()
            },
            transitionEnd: function() {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            a.extend(this, {
                hashNavigation: {
                    initialized: !1,
                    init: F.init.bind(this),
                    destroy: F.destroy.bind(this),
                    setHash: F.setHash.bind(this),
                    onHashCange: F.onHashCange.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            var e = this;
            a.extend(e, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: V.run.bind(e),
                    start: V.start.bind(e),
                    stop: V.stop.bind(e),
                    pause: V.pause.bind(e),
                    onTransitionEnd: function(t) {
                        e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && this.autoplay.start()
            },
            beforeTransitionStart: function(e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            },
            sliderFirstMove: function() {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            a.extend(this, {
                fadeEffect: {
                    setTranslate: U.setTranslate.bind(this),
                    setTransition: U.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e;
                "fade" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "fade"), e = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    spaceBetween: 0,
                    virtualTranslate: !0
                }, a.extend(this.params, e), a.extend(this.originalParams, e))
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            a.extend(this, {
                cubeEffect: {
                    setTranslate: G.setTranslate.bind(this),
                    setTransition: G.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e;
                "cube" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d"), e = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    resistanceRatio: 0,
                    spaceBetween: 0,
                    centeredSlides: !1,
                    virtualTranslate: !0
                }, a.extend(this.params, e), a.extend(this.originalParams, e))
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            a.extend(this, {
                flipEffect: {
                    setTranslate: X.setTranslate.bind(this),
                    setTransition: X.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e;
                "flip" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d"), e = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    spaceBetween: 0,
                    virtualTranslate: !0
                }, a.extend(this.params, e), a.extend(this.originalParams, e))
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            a.extend(this, {
                coverflowEffect: {
                    setTranslate: Y.setTranslate.bind(this),
                    setTransition: Y.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            a.extend(this, {
                thumbs: {
                    swiper: null,
                    init: K.init.bind(this),
                    update: K.update.bind(this),
                    onThumbClick: K.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
            },
            slideChange: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            update: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            resize: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            observerUpdate: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            setTransition: function(e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            },
            beforeDestroy: function() {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }], void 0 === C.use && (C.use = C.Class.use, C.installModule = C.Class.installModule), C.use(y), C
});
var slice = [].slice;
! function(e) {
    var t;

    function i(t, i) {
        var n, r, s;
        this.options = e.extend({}, this.defaults, i), this.$el = t, this.createStars(), this.syncRating(), this.options.readOnly || (this.$el.on("mouseover.starrr", "span", (n = this, function(e) {
            return n.syncRating(n.getStars().index(e.currentTarget) + 1)
        })), this.$el.on("mouseout.starrr", (s = this, function() {
            return s.syncRating()
        })), this.$el.on("click.starrr", "span", (r = this, function(e) {
            return e.preventDefault(), r.setRating(r.getStars().index(e.currentTarget) + 1)
        })), this.$el.on("starrr:change", this.options.change))
    }
    window.Starrr = (i.prototype.defaults = {
        rating: void 0,
        max: 5,
        readOnly: !1,
        emptyClass: "icon-Empty-Star",
        fullClass: "icon-Full-Star",
        change: function(e, t) {}
    }, i.prototype.getStars = function() {
        return this.$el.find("span")
    }, i.prototype.createStars = function() {
        for (var e = [], t = 1, i = this.options.max; 1 <= i ? t <= i : i <= t; 1 <= i ? t++ : t--) e.push(this.$el.append("<span href='#' />"));
        return e
    }, i.prototype.setRating = function(e) {
        return this.options.rating === e && (e = void 0), this.options.rating = e, this.syncRating(), this.$el.trigger("starrr:change", e)
    }, i.prototype.getRating = function() {
        return this.options.rating
    }, i.prototype.syncRating = function(e) {
        var t, i, n, r, s;
        for (e = e || this.options.rating, t = this.getStars(), s = [], i = n = 1, r = this.options.max; 1 <= r ? n <= r : r <= n; i = 1 <= r ? ++n : --n) s.push(t.eq(i - 1).removeClass(i <= e ? this.options.emptyClass : this.options.fullClass).addClass(i <= e ? this.options.fullClass : this.options.emptyClass));
        return s
    }, t = i), e.fn.extend({
        starrr: function() {
            var i = arguments[0],
                n = 2 <= arguments.length ? slice.call(arguments, 1) : [];
            return this.each(function() {
                var r;
                if ((r = e(this).data("starrr")) || e(this).data("starrr", r = new t(e(this), i)), "string" == typeof i) return r[i].apply(r, n)
            })
        }
    })
}(window.jQuery),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).easytimer = {})
}(this, function(e) {
    "use strict";

    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function i() {
        this.secondTenths = 0, this.seconds = 0, this.minutes = 0, this.hours = 0, this.days = 0, this.toString = function() {
            for (var e = (e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["hours", "minutes", "seconds"]) || ["hours", "minutes", "seconds"], t = (t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ":") || ":", i = (i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 2) || 2, n = [], r = 0; r < e.length; r += 1) void 0 !== this[e[r]] && ("secondTenths" === e[r] ? n.push(this[e[r]]) : n.push(function(e, t, i) {
                var n, r = "";
                if ((e = "number" == typeof e ? String(e) : e).length > t) return e;
                for (n = 0; n < t; n += 1) r += String("0");
                return (r + e).slice(-r.length)
            }(this[e[r]], i)));
            return n.join(t)
        }
    }
    var n = "undefined" != typeof window ? window.CustomEvent : void 0;
    "undefined" != typeof window && "function" != typeof n && ((n = function(e, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
    }).prototype = window.Event.prototype, window.CustomEvent = n);
    var r = "secondTenths",
        s = "seconds",
        o = "minutes",
        a = "hours",
        l = "days",
        c = [r, s, o, a, l],
        d = {
            secondTenths: 100,
            seconds: 1e3,
            minutes: 6e4,
            hours: 36e5,
            days: 864e5
        },
        u = {
            secondTenths: 10,
            seconds: 60,
            minutes: 60,
            hours: 24
        },
        h = "undefined" != typeof module && module.exports && "function" == typeof require ? require("events") : void 0;

    function p() {
        return "undefined" != typeof document
    }

    function f(e, t) {
        return (e % t + t) % t
    }

    function m() {
        var e, n, m, g, v, y, b, w, _, E, T = new i,
            x = new i,
            S = p() ? document.createElement("span") : h ? new h.EventEmitter : void 0,
            C = !1,
            L = !1,
            k = {},
            D = {
                detail: {
                    timer: this
                }
            };

        function A(e, t) {
            var i, n = x[t];
            return e = B(e, d[i = t]), x[i] = e, T[i] = i === l ? e : 0 <= e ? f(e, u[i]) : u[i] - f(e, u[i]), x[t] !== n
        }

        function I() {
            P(),
                function() {
                    for (var e in T) T.hasOwnProperty(e) && "number" == typeof T[e] && (T[e] = 0);
                    for (var t in x) x.hasOwnProperty(t) && "number" == typeof x[t] && (x[t] = 0)
                }()
        }

        function P() {
            clearInterval(e), e = void 0, L = C = !1
        }

        function N(i) {
            var r;
            L ? (_ = O(), y = j(v.target)) : (n = function(e) {
                var t;
                if (t = e = "string" == typeof e ? e : s, 0 <= c.indexOf(t)) return e;
                throw Error("Error in precision parameter: ".concat(e, " is not a valid value"))
            }((r = (r = i) || {}).precision), g = "function" == typeof r.callback ? r.callback : function() {}, m = 1 == (w = !0 === r.countdown) ? -1 : 1, "object" === t(r.startValues) ? (b = R(i = r.startValues), T.secondTenths = b[0], T.seconds = b[1], T.minutes = b[2], T.hours = b[3], T.days = b[4], x = W(b, x)) : b = null, _ = O(), H(), y = "object" === t(r.target) ? j(r.target) : w ? (r.target = {
                seconds: 0
            }, j(r.target)) : null, k = {
                precision: n,
                callback: g,
                countdown: "object" === t(r) && !0 === r.countdown,
                target: y,
                startValues: b
            }, v = r), r = d[n], z(q(Date.now())) || (e = setInterval(M, r), L = (C = !0, !1))
        }

        function O() {
            return q(Date.now()) - x.secondTenths * d[r] * m
        }

        function M() {
            var e, t = q(Date.now());
            (e = H())[r] && G("secondTenthsUpdated", D), e[s] && G("secondsUpdated", D), e[o] && G("minutesUpdated", D), e[a] && G("hoursUpdated", D), e.days && G("daysUpdated", D), g(D.detail.timer), z(t) && (F(), G("targetAchieved", D))
        }

        function H(e) {
            var t = 0 < arguments.length && void 0 !== e ? e : q(Date.now());
            return e = 0 < m ? t - _ : _ - t, (t = {})[r] = A(e, r), t[s] = A(e, s), t[o] = A(e, o), t[a] = A(e, a), t.days = A(e, l), t
        }

        function q(e) {
            return Math.floor(e / d[n]) * d[n]
        }

        function z(e) {
            return y instanceof Array && E <= e
        }

        function R(e) {
            var i, n, r, s, o;
            if ("object" === t(e)) {
                if (e instanceof Array) {
                    if (5 !== e.length) throw Error("Array size not valid");
                    o = e
                } else {
                    for (var a in e)
                        if (0 > c.indexOf(a)) throw Error("Error in startValues or target parameter: ".concat(a, " is not a valid input value"));
                    o = [e.secondTenths || 0, e.seconds || 0, e.minutes || 0, e.hours || 0, e.days || 0]
                }
            }
            return i = o[0], n = o[1] + B(i, 10), r = o[2] + B(n, 60), s = o[3] + B(r, 60), e = o[4] + B(s, 24), o[0] = i % 10, o[1] = n % 60, o[2] = r % 60, o[3] = s % 24, o[4] = e, o
        }

        function B(e, t) {
            return (t = e / t) < 0 ? Math.ceil(t) : Math.floor(t)
        }

        function j(e) {
            if (e) return E = _ + (e = W(y = R(e))).secondTenths * d[r] * m, y
        }

        function W(e, t) {
            return (t = t || {}).days = e[4], t.hours = 24 * t.days + e[3], t.minutes = 60 * t.hours + e[2], t.seconds = 60 * t.minutes + e[1], t.secondTenths = 10 * t.seconds + e[[0]], t
        }

        function F() {
            I(), G("stopped", D)
        }

        function V(e, t) {
            p() ? S.addEventListener(e, t) : h && S.on(e, t)
        }

        function U(e, t) {
            p() ? S.removeEventListener(e, t) : h && S.removeListener(e, t)
        }

        function G(e, t) {
            p() ? S.dispatchEvent(new CustomEvent(e, t)) : h && S.emit(e, t)
        }
        void 0 !== this && (this.start = function() {
            C || (N(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}), G("started", D))
        }, this.pause = function() {
            P(), L = !0, G("paused", D)
        }, this.stop = F, this.reset = function() {
            I(), N(v), G("reset", D)
        }, this.isRunning = function() {
            return C
        }, this.isPaused = function() {
            return L
        }, this.getTimeValues = function() {
            return T
        }, this.getTotalTimeValues = function() {
            return x
        }, this.getConfig = function() {
            return k
        }, this.addEventListener = V, this.on = V, this.removeEventListener = U, this.off = U)
    }
    e.Timer = m, e.default = m, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
var watchEvents = function() {
    window.addEventListener("click", function(e) {
        var t, i = e.target,
            n = i.dataset.micron,
            r = i.dataset.micronDuration,
            s = i.dataset.micronTiming,
            o = i.dataset.micronBind;
        if (e = i.dataset.micronId, void 0 === n) return !1;
        if ("true" === o) {
            if (void 0 === e) return console.log("%c Micron Error : add data-micron-id to bind an interaction", "color:red"), !1;
            if (null == (t = document.getElementById(e))) return console.log("%c Micron Error : None of the DOM element reference to the declared ID", "color:red"), !1;
            var a = t;
            t.parentNode.replaceChild(a, t), a.classList.add("mjs-" + n)
        } else a = t = i, t.parentNode.replaceChild(a, t), a.classList.add("mjs-" + n);
        void 0 !== r ? isNaN(r) ? (console.log("%c Micron Error : data-micron-duration can only be number or decimal", "color:red"), console.log("%c Micron Fallback : data-micron-duration set to default", "color:orange"), a.style.animationDuration = ".45s") : a.style.animationDuration = r + "s" : a.style.animationDuration = ".45s", void 0 !== s ? "linear" === s || "ease-in" === s || "ease-out" === s || "ease-in-out" === s ? a.classList.add("mjs-" + s) : (console.log("%c Micron Error : data-micron-timing currently supports linear, ease-in, ease-out and ease-in-out only", "color:red"), console.log("%c Micron Fallback : data-micron-timing set to default", "color:orange"), a.classList.add("mjs-ease-in-out")) : a.classList.add("mjs-ease-in-out")
    })
};
"loading" != document.readyState ? watchEvents() : document.addEventListener("DOMContentLoaded", function() {
    watchEvents()
});
var Micron = function() {
        var e, t;
        return {
            getEle: function(i) {
                return null != (e = "string" == typeof i ? document.querySelector(i) : i) && null != e ? (t = e).parentNode.replaceChild(t, e) : console.log("%c Micron Error : None of the DOM element reference to the argument which is passed to getEle() method", "color:red"), this
            },
            interaction: function(e) {
                return null == t ? this : null == e || null == e || -1 != e.indexOf(" ") ? (console.log("%c Micron Error : either you are missing an argument or trying to pass an argument with spaces to interaction() method", "color:red"), this) : (e = "mjs-" + e, t.classList.add(e), this)
            },
            duration: function(e) {
                return null != t && null != t && (0 == isNaN(e) ? t.style.animationDuration = e + "s" : console.log("%c Micron Error : you can only pass number or decimal as arguments to duration() method", "color:red")), this
            },
            timing: function(e) {
                return null == t || null == t ? this : "linear" != e && "ease-in" != e && "ease-out" != e && "ease-in-out" != e ? (console.log("%c Micron Error : you can only pass linear, ease-in, ease-out and ease-in-out as arguments to timing() method", "color:red"), this) : (e = "mjs-" + e, t.classList.add(e), this)
            }
        }
    },
    micron = Micron();
"object" == typeof module && module.exports && (module.exports = micron),
    function() {
        "use strict";
        var e, t;

        function i(e) {
            this.time = e.time, this.target = e.target, this.rootBounds = e.rootBounds, this.boundingClientRect = e.boundingClientRect, this.intersectionRect = e.intersectionRect || {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }, this.isIntersecting = !!e.intersectionRect, e = (t = this.boundingClientRect).width * t.height;
            var t = (t = this.intersectionRect).width * t.height;
            this.intersectionRatio = e ? Number((t / e).toFixed(4)) : this.isIntersecting ? 1 : 0
        }

        function n(e, t) {
            var i, n, r;
            if (t = t || {}, "function" != typeof e) throw Error("callback must be a function");
            if (t.root && 1 != t.root.nodeType) throw Error("root must be an Element");
            this._checkForIntersections = (i = this._checkForIntersections.bind(this), n = this.THROTTLE_TIMEOUT, r = null, function() {
                r = r || setTimeout(function() {
                    i(), r = null
                }, n)
            }), this._callback = e, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(t.rootMargin), this.thresholds = this._initThresholds(t.threshold), this.root = t.root || null, this.rootMargin = this._rootMarginValues.map(function(e) {
                return e.value + e.unit
            }).join(" ")
        }

        function r(e, t, i, n) {
            "function" == typeof e.addEventListener ? e.addEventListener(t, i, n || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, i)
        }

        function s(e, t, i, n) {
            "function" == typeof e.removeEventListener ? e.removeEventListener(t, i, n || !1) : "function" == typeof e.detatchEvent && e.detatchEvent("on" + t, i)
        }

        function o(e) {
            var t;
            try {
                t = e.getBoundingClientRect()
            } catch (i) {}
            return t ? (t.width && t.height || (t = {
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
                width: t.right - t.left,
                height: t.bottom - t.top
            }), t) : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }
        }

        function a(e, t) {
            for (var i = t; i;) {
                if (i == e) return !0;
                i = l(i)
            }
            return !1
        }

        function l(e) {
            return (e = e.parentNode) && 11 == e.nodeType && e.host ? e.host : e && e.assignedSlot ? e.assignedSlot.parentNode : e
        }
        "object" == typeof window && ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype ? "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
            get: function() {
                return 0 < this.intersectionRatio
            }
        }) : (e = window.document, t = [], n.prototype.THROTTLE_TIMEOUT = 100, n.prototype.POLL_INTERVAL = null, n.prototype.USE_MUTATION_OBSERVER = !0, n.prototype.observe = function(e) {
            if (!this._observationTargets.some(function(t) {
                    return t.element == e
                })) {
                if (!e || 1 != e.nodeType) throw Error("target must be an Element");
                this._registerInstance(), this._observationTargets.push({
                    element: e,
                    entry: null
                }), this._monitorIntersections(), this._checkForIntersections()
            }
        }, n.prototype.unobserve = function(e) {
            this._observationTargets = this._observationTargets.filter(function(t) {
                return t.element != e
            }), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance())
        }, n.prototype.disconnect = function() {
            this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance()
        }, n.prototype.takeRecords = function() {
            var e = this._queuedEntries.slice();
            return this._queuedEntries = [], e
        }, n.prototype._initThresholds = function(e) {
            return Array.isArray(e = e || [0]) || (e = [e]), e.sort().filter(function(e, t, i) {
                if ("number" != typeof e || isNaN(e) || e < 0 || 1 < e) throw Error("threshold must be a number between 0 and 1 inclusively");
                return e !== i[t - 1]
            })
        }, n.prototype._parseRootMargin = function(e) {
            return (e = (e || "0px").split(/\s+/).map(function(e) {
                if (!(e = /^(-?\d*\.?\d+)(px|%)$/.exec(e))) throw Error("rootMargin must be specified in pixels or percent");
                return {
                    value: parseFloat(e[1]),
                    unit: e[2]
                }
            }))[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e
        }, n.prototype._monitorIntersections = function() {
            this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (r(window, "resize", this._checkForIntersections, !0), r(e, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in window && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(e, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0
            }))))
        }, n.prototype._unmonitorIntersections = function() {
            this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, s(window, "resize", this._checkForIntersections, !0), s(e, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
        }, n.prototype._checkForIntersections = function() {
            var e = this._rootIsInDom(),
                t = e ? this._getRootRect() : {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                };
            this._observationTargets.forEach(function(n) {
                var r = n.element,
                    s = o(r),
                    a = this._rootContainsTarget(r),
                    l = n.entry,
                    c = e && a && this._computeTargetAndRootIntersection(r, t);
                c = n.entry = new i({
                    time: window.performance && performance.now && performance.now(),
                    target: r,
                    boundingClientRect: s,
                    rootBounds: t,
                    intersectionRect: c
                }), l ? e && a ? this._hasCrossedThreshold(l, c) && this._queuedEntries.push(c) : l && l.isIntersecting && this._queuedEntries.push(c) : this._queuedEntries.push(c)
            }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
        }, n.prototype._computeTargetAndRootIntersection = function(t, i) {
            if ("none" != window.getComputedStyle(t).display) {
                for (var n, r, s, a, c, d, u = o(t), h = l(t), p = !1; !p;) {
                    var f = null,
                        m = 1 == h.nodeType ? window.getComputedStyle(h) : {};
                    if ("none" == m.display) return;
                    if (h == this.root || h == e ? (p = !0, f = i) : h != e.body && h != e.documentElement && "visible" != m.overflow && (f = o(h)), f && (n = f, r = u, f = void 0, s = Math.max(n.top, r.top), a = Math.min(n.bottom, r.bottom), c = Math.max(n.left, r.left), f = a - s, !(u = 0 <= (m = (d = Math.min(n.right, r.right)) - c) && 0 <= f && {
                            top: s,
                            bottom: a,
                            left: c,
                            right: d,
                            width: m,
                            height: f
                        }))) break;
                    h = l(h)
                }
                return u
            }
        }, n.prototype._getRootRect = function() {
            var t, i;
            return i = this.root ? o(this.root) : (t = e.documentElement, i = e.body, {
                top: 0,
                left: 0,
                right: t.clientWidth || i.clientWidth,
                width: t.clientWidth || i.clientWidth,
                bottom: t.clientHeight || i.clientHeight,
                height: t.clientHeight || i.clientHeight
            }), this._expandRectByRootMargin(i)
        }, n.prototype._expandRectByRootMargin = function(e) {
            var t = this._rootMarginValues.map(function(t, i) {
                return "px" == t.unit ? t.value : t.value * (i % 2 ? e.width : e.height) / 100
            });
            return (t = {
                top: e.top - t[0],
                right: e.right + t[1],
                bottom: e.bottom + t[2],
                left: e.left - t[3]
            }).width = t.right - t.left, t.height = t.bottom - t.top, t
        }, n.prototype._hasCrossedThreshold = function(e, t) {
            var i = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
                n = t.isIntersecting ? t.intersectionRatio || 0 : -1;
            if (i !== n)
                for (var r = 0; r < this.thresholds.length; r++) {
                    var s = this.thresholds[r];
                    if (s == i || s == n || s < i != s < n) return !0
                }
        }, n.prototype._rootIsInDom = function() {
            return !this.root || a(e, this.root)
        }, n.prototype._rootContainsTarget = function(t) {
            return a(this.root || e, t)
        }, n.prototype._registerInstance = function() {
            0 > t.indexOf(this) && t.push(this)
        }, n.prototype._unregisterInstance = function() {
            var e = t.indexOf(this); - 1 != e && t.splice(e, 1)
        }, window.IntersectionObserver = n, window.IntersectionObserverEntry = i))
    }();
$("html, body").on("touchstart touchmove", function(e) {
    "show" == $("#autocomplete-suggestions").attr("class") ? ($("body").css("height", "100%"), $("body").css("margin", "0"), $("body").css("overflow", "hidden"), $("html").css("margin", "0"), $("html").css("height", "100%"), $("html").css("overflow", "hidden")) : ($("body").removeAttr("style"), $("html").removeAttr("style"))
}), $(document).on("click", "#send-it", function() {
    if ("" != document.getElementById("chat-input").value) {
        var e = $("#get-number").text(),
            t = document.getElementById("chat-input").value,
            i = "https://web.whatsapp.com/send";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) var i = "whatsapp://send";
        var n = i + "?phone=+98 912 068 9914" + e + "&text=" + t;
        window.open(n, "_blank")
    }
}), $(document).on("click", ".informasi", function() {
    document.getElementById("get-number").innerHTML = $(this).children(".my-number").text(), $(".start-chat,.get-new").addClass("show").removeClass("hide"), $(".home-chat,.head-home").addClass("hide").removeClass("show"), document.getElementById("get-nama").innerHTML = $(this).children(".info-chat").children(".chat-nama").text(), document.getElementById("get-label").innerHTML = $(this).children(".info-chat").children(".chat-label").text()
}), $(document).on("click", ".close-chat", function() {
    $("#whatsapp-chat").addClass("hide").removeClass("show")
}), $(document).on("click", ".blantershow-chat", function() {
    $("#whatsapp-chat").addClass("show").removeClass("hide")
});