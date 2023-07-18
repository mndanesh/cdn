! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function i(e) {
        return null != e && e === e.window
    }
    var n = [],
        r = e.document,
        s = Object.getPrototypeOf,
        o = n.slice,
        a = n.concat,
        l = n.push,
        c = n.indexOf,
        d = {},
        u = d.toString,
        h = d.hasOwnProperty,
        p = h.toString,
        f = p.call(Object),
        m = {},
        g = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        v = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function y(e, t, i) {
        var n, s, o = (i = i || r).createElement("script");
        if (o.text = e, t)
            for (n in v)(s = t[n] || t.getAttribute && t.getAttribute(n)) && o.setAttribute(n, s);
        i.head.appendChild(o).parentNode.removeChild(o)
    }

    function b(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[u.call(e)] || "object" : typeof e
    }
    var w = "3.4.1",
        _ = function(e, t) {
            return new _.fn.init(e, t)
        },
        E = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function T(e) {
        var t = !!e && "length" in e && e.length,
            n = b(e);
        return !g(e) && !i(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    _.fn = _.prototype = {
        jquery: w,
        constructor: _,
        length: 0,
        toArray: function() {
            return o.call(this)
        },
        get: function(e) {
            return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            return (e = _.merge(this.constructor(), e)).prevObject = this, e
        },
        each: function(e) {
            return _.each(this, e)
        },
        map: function(e) {
            return this.pushStack(_.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(o.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length;
            return e = +e + (e < 0 ? t : 0), this.pushStack(0 <= e && e < t ? [this[e]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: l,
        sort: n.sort,
        splice: n.splice
    }, _.extend = _.fn.extend = function() {
        var e, t, i, n, r, s = arguments[0] || {},
            o = 1,
            a = arguments.length,
            l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[o] || {}, o++), "object" == typeof s || g(s) || (s = {}), o === a && (s = this, o--); o < a; o++)
            if (null != (e = arguments[o]))
                for (t in e) i = e[t], "__proto__" !== t && s !== i && (l && i && (_.isPlainObject(i) || (n = Array.isArray(i))) ? (r = s[t], r = n && !Array.isArray(r) ? [] : n || _.isPlainObject(r) ? r : {}, n = !1, s[t] = _.extend(l, r, i)) : void 0 !== i && (s[t] = i));
        return s
    }, _.extend({
        expando: "jQuery" + (w + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            return !(!e || "[object Object]" !== u.call(e) || (e = s(e)) && ("function" != typeof(e = h.call(e, "constructor") && e.constructor) || p.call(e) !== f))
        },
        isEmptyObject: function(e) {
            for (var t in e) return !1;
            return !0
        },
        globalEval: function(e, t) {
            y(e, {
                nonce: t && t.nonce
            })
        },
        each: function(e, t) {
            var i, n = 0;
            if (T(e))
                for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
            else
                for (n in e)
                    if (!1 === t.call(e[n], n, e[n])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(E, "")
        },
        makeArray: function(e, t) {
            return t = t || [], null != e && (T(Object(e)) ? _.merge(t, "string" == typeof e ? [e] : e) : l.call(t, e)), t
        },
        inArray: function(e, t, i) {
            return null == t ? -1 : c.call(t, e, i)
        },
        merge: function(e, t) {
            for (var i = +t.length, n = 0, r = e.length; n < i; n++) e[r++] = t[n];
            return e.length = r, e
        },
        grep: function(e, t, i) {
            for (var n = [], r = 0, s = e.length, o = !i; r < s; r++) !t(e[r], r) != o && n.push(e[r]);
            return n
        },
        map: function(e, t, i) {
            var n, r, s = 0,
                o = [];
            if (T(e))
                for (n = e.length; s < n; s++) null != (r = t(e[s], s, i)) && o.push(r);
            else
                for (s in e) null != (r = t(e[s], s, i)) && o.push(r);
            return a.apply([], o)
        },
        guid: 1,
        support: m
    }), "function" == typeof Symbol && (_.fn[Symbol.iterator] = n[Symbol.iterator]), _.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        d["[object " + t + "]"] = t.toLowerCase()
    });
    var x = function(e) {
        function t(e, t, i) {
            var n = "0x" + t - 65536;
            return n != n || i ? t : n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        }

        function i() {
            f()
        }
        var n, r, s, o, a, l, c, d, u, h, p, f, m, g, v, y, b, w, _, E = "sizzle" + +new Date,
            T = e.document,
            x = 0,
            S = 0,
            C = ed(),
            L = ed(),
            k = ed(),
            D = ed(),
            A = function(e, t) {
                return e === t && (p = !0), 0
            },
            I = {}.hasOwnProperty,
            P = [],
            N = P.pop,
            O = P.push,
            M = P.push,
            H = P.slice,
            q = function(e, t) {
                for (var i = 0, n = e.length; i < n; i++)
                    if (e[i] === t) return i;
                return -1
            },
            z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            R = "[\\x20\\t\\r\\n\\f]",
            B = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            j = "\\[" + R + "*(" + B + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + R + "*\\]",
            W = ":(" + B + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + j + ")*)|.*)\\)|)",
            F = RegExp(R + "+", "g"),
            V = RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
            U = RegExp("^" + R + "*," + R + "*"),
            G = RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
            X = RegExp(R + "|>"),
            Y = RegExp(W),
            K = RegExp("^" + B + "$"),
            Q = {
                ID: RegExp("^#(" + B + ")"),
                CLASS: RegExp("^\\.(" + B + ")"),
                TAG: RegExp("^(" + B + "|[*])"),
                ATTR: RegExp("^" + j),
                PSEUDO: RegExp("^" + W),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                bool: RegExp("^(?:" + z + ")$", "i"),
                needsContext: RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
            },
            Z = /HTML$/i,
            J = /^(?:input|select|textarea|button)$/i,
            ee = /^h\d$/i,
            et = /^[^{]+\{\s*\[native \w/,
            ei = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            en = /[+~]/,
            er = RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
            es = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            eo = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ea = eb(function(e) {
                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            M.apply(P = H.call(T.childNodes), T.childNodes), P[T.childNodes.length].nodeType
        } catch (el) {
            M = {
                apply: P.length ? function(e, t) {
                    O.apply(e, H.call(t))
                } : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++];);
                    e.length = i - 1
                }
            }
        }

        function ec(e, t, i, n) {
            var s, o, a, c, u, h, p, g = t && t.ownerDocument,
                b = t ? t.nodeType : 9;
            if (i = i || [], "string" != typeof e || !e || 1 !== b && 9 !== b && 11 !== b) return i;
            if (!n && ((t ? t.ownerDocument || t : T) !== m && f(t), t = t || m, v)) {
                if (11 !== b && (u = ei.exec(e))) {
                    if (s = u[1]) {
                        if (9 === b) {
                            if (!(a = t.getElementById(s))) return i;
                            if (a.id === s) return i.push(a), i
                        } else if (g && (a = g.getElementById(s)) && _(t, a) && a.id === s) return i.push(a), i
                    } else {
                        if (u[2]) return M.apply(i, t.getElementsByTagName(e)), i;
                        if ((s = u[3]) && r.getElementsByClassName && t.getElementsByClassName) return M.apply(i, t.getElementsByClassName(s)), i
                    }
                }
                if (r.qsa && !D[e + " "] && (!y || !y.test(e)) && (1 !== b || "object" !== t.nodeName.toLowerCase())) {
                    if (p = e, g = t, 1 === b && X.test(e)) {
                        for ((c = t.getAttribute("id")) ? c = c.replace(es, eo) : t.setAttribute("id", c = E), o = (h = l(e)).length; o--;) h[o] = "#" + c + " " + ey(h[o]);
                        p = h.join(","), g = en.test(e) && ev(t.parentNode) || t
                    }
                    try {
                        return M.apply(i, g.querySelectorAll(p)), i
                    } catch (w) {
                        D(e, !0)
                    } finally {
                        c === E && t.removeAttribute("id")
                    }
                }
            }
            return d(e.replace(V, "$1"), t, i, n)
        }

        function ed() {
            var e = [];
            return function t(i, n) {
                return e.push(i + " ") > s.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
        }

        function eu(e) {
            return e[E] = !0, e
        }

        function eh(e) {
            var t = m.createElement("fieldset");
            try {
                return !!e(t)
            } catch (i) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ep(e, t) {
            for (var i = e.split("|"), n = i.length; n--;) s.attrHandle[i[n]] = t
        }

        function ef(e, t) {
            var i = t && e,
                n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (n) return n;
            if (i) {
                for (; i = i.nextSibling;)
                    if (i === t) return -1
            }
            return e ? 1 : -1
        }

        function em(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || !e !== t.isDisabled && ea(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function eg(e) {
            return eu(function(t) {
                return t = +t, eu(function(i, n) {
                    for (var r, s = e([], i.length, t), o = s.length; o--;) i[r = s[o]] && (i[r] = !(n[r] = i[r]))
                })
            })
        }

        function ev(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (n in r = ec.support = {}, a = ec.isXML = function(e) {
                var t = e.namespaceURI;
                return e = (e.ownerDocument || e).documentElement, !Z.test(t || e && e.nodeName || "HTML")
            }, f = ec.setDocument = function(e) {
                var n;
                return (e = e ? e.ownerDocument || e : T) !== m && 9 === e.nodeType && e.documentElement && (g = (m = e).documentElement, v = !a(m), T !== m && (n = m.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", i, !1) : n.attachEvent && n.attachEvent("onunload", i)), r.attributes = eh(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), r.getElementsByTagName = eh(function(e) {
                    return e.appendChild(m.createComment("")), !e.getElementsByTagName("*").length
                }), r.getElementsByClassName = et.test(m.getElementsByClassName), r.getById = eh(function(e) {
                    return g.appendChild(e).id = E, !m.getElementsByName || !m.getElementsByName(E).length
                }), r.getById ? (s.filter.ID = function(e) {
                    var i = e.replace(er, t);
                    return function(e) {
                        return e.getAttribute("id") === i
                    }
                }, s.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && v) return (e = t.getElementById(e)) ? [e] : []
                }) : (s.filter.ID = function(e) {
                    var i = e.replace(er, t);
                    return function(e) {
                        return (e = void 0 !== e.getAttributeNode && e.getAttributeNode("id")) && e.value === i
                    }
                }, s.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && v) {
                        var i, n, r, s = t.getElementById(e);
                        if (s) {
                            if ((i = s.getAttributeNode("id")) && i.value === e) return [s];
                            for (r = t.getElementsByName(e), n = 0; s = r[n++];)
                                if ((i = s.getAttributeNode("id")) && i.value === e) return [s]
                        }
                        return []
                    }
                }), s.find.TAG = r.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : r.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var i, n = [],
                        r = 0,
                        s = t.getElementsByTagName(e);
                    if ("*" !== e) return s;
                    for (; i = s[r++];) 1 === i.nodeType && n.push(i);
                    return n
                }, s.find.CLASS = r.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && v) return t.getElementsByClassName(e)
                }, b = [], y = [], (r.qsa = et.test(m.querySelectorAll)) && (eh(function(e) {
                    g.appendChild(e).innerHTML = "<a id='" + E + "'></a><select id='" + E + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + R + "*(?:value|" + z + ")"), e.querySelectorAll("[id~=" + E + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + E + "+*").length || y.push(".#.+[+~]")
                }), eh(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = m.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + R + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), g.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:")
                })), (r.matchesSelector = et.test(w = g.matches || g.webkitMatchesSelector || g.mozMatchesSelector || g.oMatchesSelector || g.msMatchesSelector)) && eh(function(e) {
                    r.disconnectedMatch = w.call(e, "*"), w.call(e, "[s!='']:x"), b.push("!=", W)
                }), y = y.length && RegExp(y.join("|")), b = b.length && RegExp(b.join("|")), _ = (n = et.test(g.compareDocumentPosition)) || et.test(g.contains) ? function(e, t) {
                    var i = 9 === e.nodeType ? e.documentElement : e;
                    return e === (t = t && t.parentNode) || !(!t || 1 !== t.nodeType || !(i.contains ? i.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
                } : function(e, t) {
                    if (t) {
                        for (; t = t.parentNode;)
                            if (t === e) return !0
                    }
                    return !1
                }, A = n ? function(e, t) {
                    if (e === t) return p = !0, 0;
                    var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === m || e.ownerDocument === T && _(T, e) ? -1 : t === m || t.ownerDocument === T && _(T, t) ? 1 : h ? q(h, e) - q(h, t) : 0 : 4 & i ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return p = !0, 0;
                    var i, n = 0,
                        r = e.parentNode,
                        s = t.parentNode,
                        o = [e],
                        a = [t];
                    if (!r || !s) return e === m ? -1 : t === m ? 1 : r ? -1 : s ? 1 : h ? q(h, e) - q(h, t) : 0;
                    if (r === s) return ef(e, t);
                    for (i = e; i = i.parentNode;) o.unshift(i);
                    for (i = t; i = i.parentNode;) a.unshift(i);
                    for (; o[n] === a[n];) n++;
                    return n ? ef(o[n], a[n]) : o[n] === T ? -1 : a[n] === T ? 1 : 0
                }), m
            }, ec.matches = function(e, t) {
                return ec(e, null, null, t)
            }, ec.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== m && f(e), r.matchesSelector && v && !D[t + " "] && (!b || !b.test(t)) && (!y || !y.test(t))) try {
                    var i = w.call(e, t);
                    if (i || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (n) {
                    D(t, !0)
                }
                return 0 < ec(t, m, null, [e]).length
            }, ec.contains = function(e, t) {
                return (e.ownerDocument || e) !== m && f(e), _(e, t)
            }, ec.attr = function(e, t) {
                var i;
                return (e.ownerDocument || e) !== m && f(e), void 0 !== (i = (i = s.attrHandle[t.toLowerCase()]) && I.call(s.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0) ? i : r.attributes || !v ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, ec.escape = function(e) {
                return (e + "").replace(es, eo)
            }, ec.error = function(e) {
                throw Error("Syntax error, unrecognized expression: " + e)
            }, ec.uniqueSort = function(e) {
                var t, i = [],
                    n = 0,
                    s = 0;
                if (p = !r.detectDuplicates, h = !r.sortStable && e.slice(0), e.sort(A), p) {
                    for (; t = e[s++];) t === e[s] && (n = i.push(s));
                    for (; n--;) e.splice(i[n], 1)
                }
                return h = null, e
            }, o = ec.getText = function(e) {
                var t, i = "",
                    n = 0,
                    r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) i += o(e)
                    } else if (3 === r || 4 === r) return e.nodeValue
                } else
                    for (; t = e[n++];) i += o(t);
                return i
            }, (s = ec.selectors = {
                cacheLength: 50,
                createPseudo: eu,
                match: Q,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(er, t), e[3] = (e[3] || e[4] || e[5] || "").replace(er, t), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ec.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ec.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, i = !e[6] && e[2];
                        return Q.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && Y.test(i) && (t = l(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var i = e.replace(er, t).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === i
                        }
                    },
                    CLASS: function(e) {
                        var t = C[e + " "];
                        return t || (t = RegExp("(^|" + R + ")" + e + "(" + R + "|$)"), C(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        }))
                    },
                    ATTR: function(e, t, i) {
                        return function(n) {
                            return null == (n = ec.attr(n, e)) ? "!=" === t : !t || (n += "", "=" === t ? n === i : "!=" === t ? n !== i : "^=" === t ? i && 0 === n.indexOf(i) : "*=" === t ? i && -1 < n.indexOf(i) : "$=" === t ? i && n.slice(-i.length) === i : "~=" === t ? -1 < (" " + n.replace(F, " ") + " ").indexOf(i) : "|=" === t && (n === i || n.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(e, t, i, n, r) {
                        var s = "nth" !== e.slice(0, 3),
                            o = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === n && 0 === r ? function(e) {
                            return !!e.parentNode
                        } : function(t, i, l) {
                            var c, d, u, h, p, f, m = s != o ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = a && t.nodeName.toLowerCase(),
                                y = !l && !a,
                                b = !1;
                            if (g) {
                                if (s) {
                                    for (; m;) {
                                        for (h = t; h = h[m];)
                                            if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                        f = m = "only" === e && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [o ? g.firstChild : g.lastChild], o && y) {
                                    for (b = (p = (c = (d = (u = (h = g)[E] || (h[E] = {}))[h.uniqueID] || (u[h.uniqueID] = {}))[e] || [])[0] === x && c[1]) && c[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (b = p = 0) || f.pop();)
                                        if (1 === h.nodeType && ++b && h === t) {
                                            d[e] = [x, p, b];
                                            break
                                        }
                                } else if (y && (b = p = (c = (d = (u = (h = t)[E] || (h[E] = {}))[h.uniqueID] || (u[h.uniqueID] = {}))[e] || [])[0] === x && c[1]), !1 === b)
                                    for (;
                                        (h = ++p && h && h[m] || (b = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && ((d = (u = h[E] || (h[E] = {}))[h.uniqueID] || (u[h.uniqueID] = {}))[e] = [x, b]), h !== t)););
                                return (b -= r) === n || b % n == 0 && 0 <= b / n
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var i, n = s.pseudos[e] || s.setFilters[e.toLowerCase()] || ec.error("unsupported pseudo: " + e);
                        return n[E] ? n(t) : 1 < n.length ? (i = [e, e, "", t], s.setFilters.hasOwnProperty(e.toLowerCase()) ? eu(function(e, i) {
                            for (var r, s = n(e, t), o = s.length; o--;) e[r = q(e, s[o])] = !(i[r] = s[o])
                        }) : function(e) {
                            return n(e, 0, i)
                        }) : n
                    }
                },
                pseudos: {
                    not: eu(function(e) {
                        var t = [],
                            i = [],
                            n = c(e.replace(V, "$1"));
                        return n[E] ? eu(function(e, t, i, r) {
                            for (var s, o = n(e, null, r, []), a = e.length; a--;)(s = o[a]) && (e[a] = !(t[a] = s))
                        }) : function(e, r, s) {
                            return t[0] = e, n(t, null, s, i), t[0] = null, !i.pop()
                        }
                    }),
                    has: eu(function(e) {
                        return function(t) {
                            return 0 < ec(e, t).length
                        }
                    }),
                    contains: eu(function(e) {
                        return e = e.replace(er, t),
                            function(t) {
                                return -1 < (t.textContent || o(t)).indexOf(e)
                            }
                    }),
                    lang: eu(function(e) {
                        return K.test(e || "") || ec.error("unsupported lang: " + e), e = e.replace(er, t).toLowerCase(),
                            function(t) {
                                var i;
                                do
                                    if (i = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var i = e.location && e.location.hash;
                        return i && i.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === g
                    },
                    focus: function(e) {
                        return e === m.activeElement && (!m.hasFocus || m.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: em(!1),
                    disabled: em(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !s.pseudos.empty(e)
                    },
                    header: function(e) {
                        return ee.test(e.nodeName)
                    },
                    input: function(e) {
                        return J.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: eg(function() {
                        return [0]
                    }),
                    last: eg(function(e, t) {
                        return [t - 1]
                    }),
                    eq: eg(function(e, t, i) {
                        return [i < 0 ? i + t : i]
                    }),
                    even: eg(function(e, t) {
                        for (var i = 0; i < t; i += 2) e.push(i);
                        return e
                    }),
                    odd: eg(function(e, t) {
                        for (var i = 1; i < t; i += 2) e.push(i);
                        return e
                    }),
                    lt: eg(function(e, t, i) {
                        for (var n = i < 0 ? i + t : t < i ? t : i; 0 <= --n;) e.push(n);
                        return e
                    }),
                    gt: eg(function(e, t, i) {
                        for (var n = i < 0 ? i + t : i; ++n < t;) e.push(n);
                        return e
                    })
                }
            }).pseudos.nth = s.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) s.pseudos[n] = function(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }(n);
        for (n in {
                submit: !0,
                reset: !0
            }) s.pseudos[n] = function(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === e
            }
        }(n);

        function e$() {}

        function ey(e) {
            for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
            return n
        }

        function eb(e, t, i) {
            var n = t.dir,
                r = t.next,
                s = r || n,
                o = i && "parentNode" === s,
                a = S++;
            return t.first ? function(t, i, r) {
                for (; t = t[n];)
                    if (1 === t.nodeType || o) return e(t, i, r);
                return !1
            } : function(t, i, l) {
                var c, d, u = [x, a];
                if (l) {
                    for (; t = t[n];)
                        if ((1 === t.nodeType || o) && e(t, i, l)) return !0
                } else
                    for (; t = t[n];)
                        if (1 === t.nodeType || o) {
                            if (c = (d = t[E] || (t[E] = {}))[t.uniqueID] || (d[t.uniqueID] = {}), r && r === t.nodeName.toLowerCase()) t = t[n] || t;
                            else {
                                if ((d = c[s]) && d[0] === x && d[1] === a) return u[2] = d[2];
                                if ((c[s] = u)[2] = e(t, i, l)) return !0
                            }
                        } return !1
            }
        }

        function ew(e) {
            return 1 < e.length ? function(t, i, n) {
                for (var r = e.length; r--;)
                    if (!e[r](t, i, n)) return !1;
                return !0
            } : e[0]
        }

        function e_(e, t, i, n, r) {
            for (var s, o = [], a = 0, l = e.length, c = null != t; a < l; a++)(s = e[a]) && (i && !i(s, n, r) || (o.push(s), c && t.push(a)));
            return o
        }

        function eE(e) {
            for (var t, i, n, r = e.length, o = s.relative[e[0].type], a = o || s.relative[" "], l = o ? 1 : 0, c = eb(function(e) {
                    return e === t
                }, a, !0), d = eb(function(e) {
                    return -1 < q(t, e)
                }, a, !0), h = [function(e, i, n) {
                    return n = !o && (n || i !== u) || ((t = i).nodeType ? c : d)(e, i, n), t = null, n
                }]; l < r; l++)
                if (i = s.relative[e[l].type]) h = [eb(ew(h), i)];
                else {
                    if ((i = s.filter[e[l].type].apply(null, e[l].matches))[E]) {
                        for (n = ++l; n < r && !s.relative[e[n].type]; n++);
                        return function e(t, i, n, r, s, o) {
                            return r && !r[E] && (r = e(r)), s && !s[E] && (s = e(s, o)), eu(function(e, o, a, l) {
                                var c, d, u, h = [],
                                    p = [],
                                    f = o.length,
                                    m = e || function(e, t, i) {
                                        for (var n = 0, r = t.length; n < r; n++) ec(e, t[n], i);
                                        return i
                                    }(i || "*", a.nodeType ? [a] : a, []),
                                    g = t && (e || !i) ? e_(m, h, t, a, l) : m,
                                    v = n ? s || (e ? t : f || r) ? [] : o : g;
                                if (n && n(g, v, a, l), r)
                                    for (c = e_(v, p), r(c, [], a, l), d = c.length; d--;)(u = c[d]) && (v[p[d]] = !(g[p[d]] = u));
                                if (e) {
                                    if (s || t) {
                                        if (s) {
                                            for (c = [], d = v.length; d--;)(u = v[d]) && c.push(g[d] = u);
                                            s(null, v = [], c, l)
                                        }
                                        for (d = v.length; d--;)(u = v[d]) && -1 < (c = s ? q(e, u) : h[d]) && (e[c] = !(o[c] = u))
                                    }
                                } else v = e_(v === o ? v.splice(f, v.length) : v), s ? s(null, o, v, l) : M.apply(o, v)
                            })
                        }(1 < l && ew(h), 1 < l && ey(e.slice(0, l - 1).concat({
                            value: " " === e[l - 2].type ? "*" : ""
                        })).replace(V, "$1"), i, l < n && eE(e.slice(l, n)), n < r && eE(e = e.slice(n)), n < r && ey(e))
                    }
                    h.push(i)
                } return ew(h)
        }
        return e$.prototype = s.filters = s.pseudos, s.setFilters = new e$, l = ec.tokenize = function(e, t) {
            var i, n, r, o, a, l, c, d = L[e + " "];
            if (d) return t ? 0 : d.slice(0);
            for (a = e, l = [], c = s.preFilter; a;) {
                for (o in (!i || (n = U.exec(a))) && (n && (a = a.slice(n[0].length) || a), l.push(r = [])), i = !1, (n = G.exec(a)) && (i = n.shift(), r.push({
                        value: i,
                        type: n[0].replace(V, " ")
                    }), a = a.slice(i.length)), s.filter)(n = Q[o].exec(a)) && (!c[o] || (n = c[o](n))) && (i = n.shift(), r.push({
                    value: i,
                    type: o,
                    matches: n
                }), a = a.slice(i.length));
                if (!i) break
            }
            return t ? a.length : a ? ec.error(e) : L(e, l).slice(0)
        }, c = ec.compile = function(e, t) {
            var i, n, r, o, a, c, d = [],
                h = [],
                p = k[e + " "];
            if (!p) {
                for (i = (t = t || l(e)).length; i--;)((p = eE(t[i]))[E] ? d : h).push(p);
                (p = k(e, (n = h, o = 0 < (r = d).length, a = 0 < n.length, c = function(e, t, i, l, c) {
                    var d, h, p, g = 0,
                        y = "0",
                        b = e && [],
                        w = [],
                        _ = u,
                        E = e || a && s.find.TAG("*", c),
                        T = x += null == _ ? 1 : Math.random() || .1,
                        S = E.length;
                    for (c && (u = t === m || t || c); y !== S && null != (d = E[y]); y++) {
                        if (a && d) {
                            for (h = 0, t || d.ownerDocument === m || (f(d), i = !v); p = n[h++];)
                                if (p(d, t || m, i)) {
                                    l.push(d);
                                    break
                                } c && (x = T)
                        }
                        o && ((d = !p && d) && g--, e && b.push(d))
                    }
                    if (g += y, o && y !== g) {
                        for (h = 0; p = r[h++];) p(b, w, t, i);
                        if (e) {
                            if (0 < g)
                                for (; y--;) b[y] || w[y] || (w[y] = N.call(l));
                            w = e_(w)
                        }
                        M.apply(l, w), c && !e && 0 < w.length && 1 < g + r.length && ec.uniqueSort(l)
                    }
                    return c && (x = T, u = _), b
                }, o ? eu(c) : c))).selector = e
            }
            return p
        }, d = ec.select = function(e, i, n, r) {
            var o, a, d, u, h, p = "function" == typeof e && e,
                f = !r && l(e = p.selector || e);
            if (n = n || [], 1 === f.length) {
                if (2 < (a = f[0] = f[0].slice(0)).length && "ID" === (d = a[0]).type && 9 === i.nodeType && v && s.relative[a[1].type]) {
                    if (!(i = (s.find.ID(d.matches[0].replace(er, t), i) || [])[0])) return n;
                    p && (i = i.parentNode), e = e.slice(a.shift().value.length)
                }
                for (o = Q.needsContext.test(e) ? 0 : a.length; o-- && (d = a[o], !s.relative[u = d.type]);)
                    if ((h = s.find[u]) && (r = h(d.matches[0].replace(er, t), en.test(a[0].type) && ev(i.parentNode) || i))) {
                        if (a.splice(o, 1), !(e = r.length && ey(a))) return M.apply(n, r), n;
                        break
                    }
            }
            return (p || c(e, f))(r, i, !v, n, !i || en.test(e) && ev(i.parentNode) || i), n
        }, r.sortStable = E.split("").sort(A).join("") === E, r.detectDuplicates = !!p, f(), r.sortDetached = eh(function(e) {
            return 1 & e.compareDocumentPosition(m.createElement("fieldset"))
        }), eh(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || ep("type|href|height|width", function(e, t, i) {
            if (!i) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), r.attributes && eh(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || ep("value", function(e, t, i) {
            if (!i && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), eh(function(e) {
            return null == e.getAttribute("disabled")
        }) || ep(z, function(e, t, i) {
            if (!i) return !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
        }), ec
    }(e);

    function S(e, t, i) {
        for (var n = [], r = void 0 !== i;
            (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (r && _(e).is(i)) break;
                n.push(e)
            } return n
    }

    function C(e, t) {
        for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
        return i
    }
    _.find = x, _.expr = x.selectors, _.expr[":"] = _.expr.pseudos, _.uniqueSort = _.unique = x.uniqueSort, _.text = x.getText, _.isXMLDoc = x.isXML, _.contains = x.contains, _.escapeSelector = x.escape;
    var L = _.expr.match.needsContext;

    function k(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function A(e, t, i) {
        return g(t) ? _.grep(e, function(e, n) {
            return !!t.call(e, n, e) !== i
        }) : t.nodeType ? _.grep(e, function(e) {
            return e === t !== i
        }) : "string" != typeof t ? _.grep(e, function(e) {
            return -1 < c.call(t, e) !== i
        }) : _.filter(t, e, i)
    }
    _.filter = function(e, t, i) {
        var n = t[0];
        return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? _.find.matchesSelector(n, e) ? [n] : [] : _.find.matches(e, _.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, _.fn.extend({
        find: function(e) {
            var t, i, n = this.length,
                r = this;
            if ("string" != typeof e) return this.pushStack(_(e).filter(function() {
                for (t = 0; t < n; t++)
                    if (_.contains(r[t], this)) return !0
            }));
            for (i = this.pushStack([]), t = 0; t < n; t++) _.find(e, r[t], i);
            return 1 < n ? _.uniqueSort(i) : i
        },
        filter: function(e) {
            return this.pushStack(A(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(A(this, e || [], !0))
        },
        is: function(e) {
            return !!A(this, "string" == typeof e && L.test(e) ? _(e) : e || [], !1).length
        }
    });
    var I, P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (_.fn.init = function(e, t, i) {
        if (!e) return this;
        if (i = i || I, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== i.ready ? i.ready(e) : e(_) : _.makeArray(e, this);
        if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : P.exec(e)) || !n[1] && t) return (!t || t.jquery ? t || i : this.constructor(t)).find(e);
        if (n[1]) {
            if (t = t instanceof _ ? t[0] : t, _.merge(this, _.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), D.test(n[1]) && _.isPlainObject(t))
                for (var n in t) g(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
            return this
        }
        return (e = r.getElementById(n[2])) && (this[0] = e, this.length = 1), this
    }).prototype = _.fn, I = _(r);
    var N = /^(?:parents|prev(?:Until|All))/,
        O = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function M(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }
    _.fn.extend({
        has: function(e) {
            var t = _(e, this),
                i = t.length;
            return this.filter(function() {
                for (var e = 0; e < i; e++)
                    if (_.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var i, n = 0,
                r = this.length,
                s = [],
                o = "string" != typeof e && _(e);
            if (!L.test(e)) {
                for (; n < r; n++)
                    for (i = this[n]; i && i !== t; i = i.parentNode)
                        if (i.nodeType < 11 && (o ? -1 < o.index(i) : 1 === i.nodeType && _.find.matchesSelector(i, e))) {
                            s.push(i);
                            break
                        }
            }
            return this.pushStack(1 < s.length ? _.uniqueSort(s) : s)
        },
        index: function(e) {
            return e ? "string" == typeof e ? c.call(_(e), this[0]) : c.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(_.uniqueSort(_.merge(this.get(), _(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), _.each({
        parent: function(e) {
            return (e = e.parentNode) && 11 !== e.nodeType ? e : null
        },
        parents: function(e) {
            return S(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return S(e, "parentNode", i)
        },
        next: function(e) {
            return M(e, "nextSibling")
        },
        prev: function(e) {
            return M(e, "previousSibling")
        },
        nextAll: function(e) {
            return S(e, "nextSibling")
        },
        prevAll: function(e) {
            return S(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return S(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return S(e, "previousSibling", i)
        },
        siblings: function(e) {
            return C((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return C(e.firstChild)
        },
        contents: function(e) {
            return void 0 !== e.contentDocument ? e.contentDocument : (k(e, "template") && (e = e.content || e), _.merge([], e.childNodes))
        }
    }, function(e, t) {
        _.fn[e] = function(i, n) {
            var r = _.map(this, t, i);
            return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (r = _.filter(n, r)), 1 < this.length && (O[e] || _.uniqueSort(r), N.test(e) && r.reverse()), this.pushStack(r)
        }
    });
    var H = /[^\x20\t\r\n\f]+/g;

    function q(e) {
        return e
    }

    function z(e) {
        throw e
    }

    function R(e, t, i, n) {
        var r;
        try {
            e && g(r = e.promise) ? r.call(e).done(t).fail(i) : e && g(r = e.then) ? r.call(e, t, i) : t.apply(void 0, [e].slice(n))
        } catch (s) {
            i.apply(void 0, [s])
        }
    }
    _.Callbacks = function(e) {
        function t() {
            for (o = o || e.once, s = n = !0; l.length; c = -1)
                for (r = l.shift(); ++c < a.length;) !1 === a[c].apply(r[0], r[1]) && e.stopOnFalse && (c = a.length, r = !1);
            e.memory || (r = !1), n = !1, o && (a = r ? [] : "")
        }
        e = "string" == typeof e ? (i = {}, _.each(e.match(H) || [], function(e, t) {
            i[t] = !0
        }), i) : _.extend({}, e);
        var i, n, r, s, o, a = [],
            l = [],
            c = -1,
            d = {
                add: function() {
                    return a && (r && !n && (c = a.length - 1, l.push(r)), function t(i) {
                        _.each(i, function(i, n) {
                            g(n) ? e.unique && d.has(n) || a.push(n) : n && n.length && "string" !== b(n) && t(n)
                        })
                    }(arguments), r && !n && t()), this
                },
                remove: function() {
                    return _.each(arguments, function(e, t) {
                        for (var i; - 1 < (i = _.inArray(t, a, i));) a.splice(i, 1), i <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < _.inArray(e, a) : 0 < a.length
                },
                empty: function() {
                    return a = a && [], this
                },
                disable: function() {
                    return o = l = [], a = r = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return o = l = [], r || n || (a = r = ""), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(e, i) {
                    return o || (i = [e, (i = i || []).slice ? i.slice() : i], l.push(i), n || t()), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!s
                }
            };
        return d
    }, _.extend({
        Deferred: function(t) {
            var i = [
                    ["notify", "progress", _.Callbacks("memory"), _.Callbacks("memory"), 2],
                    ["resolve", "done", _.Callbacks("once memory"), _.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", _.Callbacks("once memory"), _.Callbacks("once memory"), 1, "rejected"]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return r.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return _.Deferred(function(t) {
                            _.each(i, function(i, n) {
                                var r = g(e[n[4]]) && e[n[4]];
                                s[n[1]](function() {
                                    var e = r && r.apply(this, arguments);
                                    e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[n[0] + "With"](this, r ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, n, r) {
                        var s = 0;

                        function o(t, i, n, r) {
                            return function() {
                                function a() {
                                    var e, a;
                                    if (!(t < s)) {
                                        if ((e = n.apply(l, c)) === i.promise()) throw TypeError("Thenable self-resolution");
                                        g(a = e && ("object" == typeof e || "function" == typeof e) && e.then) ? r ? a.call(e, o(s, i, q, r), o(s, i, z, r)) : (s++, a.call(e, o(s, i, q, r), o(s, i, z, r), o(s, i, q, i.notifyWith))) : (n !== q && (l = void 0, c = [e]), (r || i.resolveWith)(l, c))
                                    }
                                }
                                var l = this,
                                    c = arguments,
                                    d = r ? a : function() {
                                        try {
                                            a()
                                        } catch (e) {
                                            _.Deferred.exceptionHook && _.Deferred.exceptionHook(e, d.stackTrace), s <= t + 1 && (n !== z && (l = void 0, c = [e]), i.rejectWith(l, c))
                                        }
                                    };
                                t ? d() : (_.Deferred.getStackHook && (d.stackTrace = _.Deferred.getStackHook()), e.setTimeout(d))
                            }
                        }
                        return _.Deferred(function(e) {
                            i[0][3].add(o(0, e, g(r) ? r : q, e.notifyWith)), i[1][3].add(o(0, e, g(t) ? t : q)), i[2][3].add(o(0, e, g(n) ? n : z))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? _.extend(e, r) : r
                    }
                },
                s = {};
            return _.each(i, function(e, t) {
                var o = t[2],
                    a = t[5];
                r[t[1]] = o.add, a && o.add(function() {
                    n = a
                }, i[3 - e][2].disable, i[3 - e][3].disable, i[0][2].lock, i[0][3].lock), o.add(t[3].fire), s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                }, s[t[0] + "With"] = o.fireWith
            }), r.promise(s), t && t.call(s, s), s
        },
        when: function(e) {
            function t(e) {
                return function(t) {
                    r[e] = this, s[e] = 1 < arguments.length ? o.call(arguments) : t, --i || a.resolveWith(r, s)
                }
            }
            var i = arguments.length,
                n = i,
                r = Array(n),
                s = o.call(arguments),
                a = _.Deferred();
            if (i <= 1 && (R(e, a.done(t(n)).resolve, a.reject, !i), "pending" === a.state() || g(s[n] && s[n].then))) return a.then();
            for (; n--;) R(s[n], t(n), a.reject);
            return a.promise()
        }
    });
    var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    _.Deferred.exceptionHook = function(t, i) {
        e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
    }, _.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var j = _.Deferred();

    function W() {
        r.removeEventListener("DOMContentLoaded", W), e.removeEventListener("load", W), _.ready()
    }
    _.fn.ready = function(e) {
        return j.then(e).catch(function(e) {
            _.readyException(e)
        }), this
    }, _.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --_.readyWait : _.isReady) || (_.isReady = !0) !== e && 0 < --_.readyWait || j.resolveWith(r, [_])
        }
    }), _.ready.then = j.then, "complete" !== r.readyState && ("loading" === r.readyState || r.documentElement.doScroll) ? (r.addEventListener("DOMContentLoaded", W), e.addEventListener("load", W)) : e.setTimeout(_.ready);
    var F = function(e, t, i, n, r, s, o) {
            var a = 0,
                l = e.length,
                c = null == i;
            if ("object" === b(i))
                for (a in r = !0, i) F(e, t, a, i[a], !0, s, o);
            else if (void 0 !== n && (r = !0, g(n) || (o = !0), c && (t = o ? (t.call(e, n), null) : (c = t, function(e, t, i) {
                    return c.call(_(e), i)
                })), t))
                for (; a < l; a++) t(e[a], i, o ? n : n.call(e[a], a, t(e[a], i)));
            return r ? e : c ? t.call(e) : l ? t(e[0], i) : s
        },
        V = /^-ms-/,
        U = /-([a-z])/g;

    function G(e, t) {
        return t.toUpperCase()
    }

    function X(e) {
        return e.replace(V, "ms-").replace(U, G)
    }

    function Y(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }

    function K() {
        this.expando = _.expando + K.uid++
    }
    K.uid = 1, K.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, i) {
            var n, r = this.cache(e);
            if ("string" == typeof t) r[X(t)] = i;
            else
                for (n in t) r[X(n)] = t[n];
            return r
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
        },
        access: function(e, t, i) {
            return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t)
        },
        remove: function(e, t) {
            var i, n = e[this.expando];
            if (void 0 !== n) {
                if (void 0 !== t)
                    for (i = (t = Array.isArray(t) ? t.map(X) : ((t = X(t)) in n) ? [t] : t.match(H) || []).length; i--;) delete n[t[i]];
                (void 0 === t || _.isEmptyObject(n)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            return void 0 !== (e = e[this.expando]) && !_.isEmptyObject(e)
        }
    };
    var Q = new K,
        Z = new K,
        J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ee = /[A-Z]/g;

    function et(e, t, i) {
        var n, r;
        if (void 0 === i && 1 === e.nodeType) {
            if (n = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof(i = e.getAttribute(n))) {
                try {
                    i = "true" === (r = i) || "false" !== r && ("null" === r ? null : r === +r + "" ? +r : J.test(r) ? JSON.parse(r) : r)
                } catch (s) {}
                Z.set(e, t, i)
            } else i = void 0
        }
        return i
    }
    _.extend({
        hasData: function(e) {
            return Z.hasData(e) || Q.hasData(e)
        },
        data: function(e, t, i) {
            return Z.access(e, t, i)
        },
        removeData: function(e, t) {
            Z.remove(e, t)
        },
        _data: function(e, t, i) {
            return Q.access(e, t, i)
        },
        _removeData: function(e, t) {
            Q.remove(e, t)
        }
    }), _.fn.extend({
        data: function(e, t) {
            var i, n, r, s = this[0],
                o = s && s.attributes;
            if (void 0 !== e) return "object" == typeof e ? this.each(function() {
                Z.set(this, e)
            }) : F(this, function(t) {
                var i;
                return s && void 0 === t ? void 0 !== (i = Z.get(s, e)) || void 0 !== (i = et(s, e)) ? i : void 0 : void this.each(function() {
                    Z.set(this, e, t)
                })
            }, null, t, 1 < arguments.length, null, !0);
            if (this.length && (r = Z.get(s), 1 === s.nodeType && !Q.get(s, "hasDataAttrs"))) {
                for (i = o.length; i--;) o[i] && 0 === (n = o[i].name).indexOf("data-") && et(s, n = X(n.slice(5)), r[n]);
                Q.set(s, "hasDataAttrs", !0)
            }
            return r
        },
        removeData: function(e) {
            return this.each(function() {
                Z.remove(this, e)
            })
        }
    }), _.extend({
        queue: function(e, t, i) {
            var n;
            if (e) return t = (t || "fx") + "queue", n = Q.get(e, t), i && (!n || Array.isArray(i) ? n = Q.access(e, t, _.makeArray(i)) : n.push(i)), n || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = _.queue(e, t),
                n = i.length,
                r = i.shift(),
                s = _._queueHooks(e, t);
            "inprogress" === r && (r = i.shift(), n--), r && ("fx" === t && i.unshift("inprogress"), delete s.stop, r.call(e, function() {
                _.dequeue(e, t)
            }, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return Q.get(e, i) || Q.access(e, i, {
                empty: _.Callbacks("once memory").add(function() {
                    Q.remove(e, [t + "queue", i])
                })
            })
        }
    }), _.fn.extend({
        queue: function(e, t) {
            var i = 2;
            return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? _.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var i = _.queue(this, e, t);
                _._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && _.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                _.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            function i() {
                --r || s.resolveWith(o, [o])
            }
            var n, r = 1,
                s = _.Deferred(),
                o = this,
                a = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = Q.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(i));
            return i(), s.promise(t)
        }
    });
    var ei = RegExp("^(?:([+-])=|)(" + (w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source) + ")([a-z%]*)$", "i"),
        en = ["Top", "Right", "Bottom", "Left"],
        er = r.documentElement,
        es = function(e) {
            return _.contains(e.ownerDocument, e)
        },
        eo = {
            composed: !0
        };

    function ea(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && es(e) && "none" === _.css(e, "display")
    }

    function el(e, t, i, n) {
        var r, s = {};
        for (r in t) s[r] = e.style[r], e.style[r] = t[r];
        for (r in n = i.apply(e, n || []), t) e.style[r] = s[r];
        return n
    }

    function ec(e, t, i, n) {
        var r, s, o = 20,
            a = n ? function() {
                return n.cur()
            } : function() {
                return _.css(e, t, "")
            },
            l = a(),
            c = i && i[3] || (_.cssNumber[t] ? "" : "px"),
            d = e.nodeType && (_.cssNumber[t] || "px" !== c && +l) && ei.exec(_.css(e, t));
        if (d && d[3] !== c) {
            for (l /= 2, c = c || d[3], d = +l || 1; o--;) _.style(e, t, d + c), (1 - s) * (1 - (s = a() / l || .5)) <= 0 && (o = 0), d /= s;
            d *= 2, _.style(e, t, d + c), i = i || []
        }
        return i && (d = +d || +l || 0, r = i[1] ? d + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = d, n.end = r)), r
    }
    er.getRootNode && (es = function(e) {
        return _.contains(e.ownerDocument, e) || e.getRootNode(eo) === e.ownerDocument
    });
    var ed = {};

    function eu(e, t) {
        for (var i, n, r, s, o, a, l = [], c = 0, d = e.length; c < d; c++)(n = e[c]).style && (i = n.style.display, t ? ("none" === i && (l[c] = Q.get(n, "display") || null, l[c] || (n.style.display = "")), "" === n.style.display && ea(n) && (l[c] = (a = s = r = void 0, s = n.ownerDocument, (a = ed[o = n.nodeName]) || (r = s.body.appendChild(s.createElement(o)), a = _.css(r, "display"), r.parentNode.removeChild(r), "none" === a && (a = "block"), ed[o] = a)))) : "none" !== i && (l[c] = "none", Q.set(n, "display", i)));
        for (c = 0; c < d; c++) null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    _.fn.extend({
        show: function() {
            return eu(this, !0)
        },
        hide: function() {
            return eu(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ea(this) ? _(this).show() : _(this).hide()
            })
        }
    });
    var eh = /^(?:checkbox|radio)$/i,
        ep = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        ef = /^$|^module$|\/(?:java|ecma)script/i,
        em = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };

    function eg(e, t) {
        var i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && k(e, t) ? _.merge([e], i) : i
    }

    function ev(e, t) {
        for (var i = 0, n = e.length; i < n; i++) Q.set(e[i], "globalEval", !t || Q.get(t[i], "globalEval"))
    }
    em.optgroup = em.option, em.tbody = em.tfoot = em.colgroup = em.caption = em.thead, em.th = em.td;
    var e$ = /<|&#?\w+;/;

    function ey(e, t, i, n, r) {
        for (var s, o, a, l, c, d = t.createDocumentFragment(), u = [], h = 0, p = e.length; h < p; h++)
            if ((s = e[h]) || 0 === s) {
                if ("object" === b(s)) _.merge(u, s.nodeType ? [s] : s);
                else if (e$.test(s)) {
                    for (o = o || d.appendChild(t.createElement("div")), a = em[a = (ep.exec(s) || ["", ""])[1].toLowerCase()] || em._default, o.innerHTML = a[1] + _.htmlPrefilter(s) + a[2], c = a[0]; c--;) o = o.lastChild;
                    _.merge(u, o.childNodes), (o = d.firstChild).textContent = ""
                } else u.push(t.createTextNode(s))
            } for (d.textContent = "", h = 0; s = u[h++];)
            if (n && -1 < _.inArray(s, n)) r && r.push(s);
            else if (l = es(s), o = eg(d.appendChild(s), "script"), l && ev(o), i)
            for (c = 0; s = o[c++];) ef.test(s.type || "") && i.push(s);
        return d
    }
    n = r.createDocumentFragment().appendChild(r.createElement("div")), (x = r.createElement("input")).setAttribute("type", "radio"), x.setAttribute("checked", "checked"), x.setAttribute("name", "t"), n.appendChild(x), m.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, n.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue;
    var eb = /^key/,
        ew = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        e_ = /^([^.]*)(?:\.(.+)|)/;

    function eE() {
        return !0
    }

    function eT() {
        return !1
    }

    function ex(e, t) {
        return e === function() {
            try {
                return r.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }

    function eS(e, t, i, n, r, s) {
        var o, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof i && (n = n || i, i = void 0), t) eS(e, a, i, n, t[a], s);
            return e
        }
        if (null == n && null == r ? (r = i, n = i = void 0) : null == r && ("string" == typeof i ? (r = n, n = void 0) : (r = n, n = i, i = void 0)), !1 === r) r = eT;
        else if (!r) return e;
        return 1 === s && (o = r, (r = function(e) {
            return _().off(e), o.apply(this, arguments)
        }).guid = o.guid || (o.guid = _.guid++)), e.each(function() {
            _.event.add(this, t, r, n, i)
        })
    }

    function eC(e, t, i) {
        i ? (Q.set(e, t, !1), _.event.add(e, t, {
            namespace: !1,
            handler: function(e) {
                var n, r, s = Q.get(this, t);
                if (1 & e.isTrigger && this[t]) {
                    if (s.length)(_.event.special[t] || {}).delegateType && e.stopPropagation();
                    else if (s = o.call(arguments), Q.set(this, t, s), n = i(this, t), this[t](), s !== (r = Q.get(this, t)) || n ? Q.set(this, t, !1) : r = {}, s !== r) return e.stopImmediatePropagation(), e.preventDefault(), r.value
                } else s.length && (Q.set(this, t, {
                    value: _.event.trigger(_.extend(s[0], _.Event.prototype), s.slice(1), this)
                }), e.stopImmediatePropagation())
            }
        })) : void 0 === Q.get(e, t) && _.event.add(e, t, eE)
    }
    _.event = {
        global: {},
        add: function(e, t, i, n, r) {
            var s, o, a, l, c, d, u, h, p, f = Q.get(e);
            if (f)
                for (i.handler && (i = (s = i).handler, r = s.selector), r && _.find.matchesSelector(er, r), i.guid || (i.guid = _.guid++), (a = f.events) || (a = f.events = {}), (o = f.handle) || (o = f.handle = function(t) {
                        return void 0 !== _ && _.event.triggered !== t.type ? _.event.dispatch.apply(e, arguments) : void 0
                    }), l = (t = (t || "").match(H) || [""]).length; l--;) u = p = (c = e_.exec(t[l]) || [])[1], h = (c[2] || "").split(".").sort(), u && (d = _.event.special[u] || {}, u = (r ? d.delegateType : d.bindType) || u, d = _.event.special[u] || {}, c = _.extend({
                    type: u,
                    origType: p,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: r,
                    needsContext: r && _.expr.match.needsContext.test(r),
                    namespace: h.join(".")
                }, s), (p = a[u]) || ((p = a[u] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, n, h, o) || e.addEventListener && e.addEventListener(u, o)), d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = i.guid)), r ? p.splice(p.delegateCount++, 0, c) : p.push(c), _.event.global[u] = !0)
        },
        remove: function(e, t, i, n, r) {
            var s, o, a, l, c, d, u, h, p, f, m, g = Q.hasData(e) && Q.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(H) || [""]).length; c--;)
                    if (p = m = (a = e_.exec(t[c]) || [])[1], f = (a[2] || "").split(".").sort(), p) {
                        for (u = _.event.special[p] || {}, h = l[p = (n ? u.delegateType : u.bindType) || p] || [], a = a[2] && RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length; s--;) d = h[s], !r && m !== d.origType || i && i.guid !== d.guid || a && !a.test(d.namespace) || n && n !== d.selector && ("**" !== n || !d.selector) || (h.splice(s, 1), d.selector && h.delegateCount--, u.remove && u.remove.call(e, d));
                        o && !h.length && (u.teardown && !1 !== u.teardown.call(e, f, g.handle) || _.removeEvent(e, p, g.handle), delete l[p])
                    } else
                        for (p in l) _.event.remove(e, p + t[c], i, n, !0);
                _.isEmptyObject(l) && Q.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, i, n, r, s, o = _.event.fix(e),
                a = Array(arguments.length),
                l = (Q.get(this, "events") || {})[o.type] || [];
            for (e = _.event.special[o.type] || {}, a[0] = o, t = 1; t < arguments.length; t++) a[t] = arguments[t];
            if (o.delegateTarget = this, !e.preDispatch || !1 !== e.preDispatch.call(this, o)) {
                for (s = _.event.handlers.call(this, o, l), t = 0;
                    (n = s[t++]) && !o.isPropagationStopped();)
                    for (o.currentTarget = n.elem, i = 0;
                        (r = n.handlers[i++]) && !o.isImmediatePropagationStopped();) o.rnamespace && !1 !== r.namespace && !o.rnamespace.test(r.namespace) || (o.handleObj = r, o.data = r.data, void 0 !== (r = ((_.event.special[r.origType] || {}).handle || r.handler).apply(n.elem, a)) && !1 === (o.result = r) && (o.preventDefault(), o.stopPropagation()));
                return e.postDispatch && e.postDispatch.call(this, o), o.result
            }
        },
        handlers: function(e, t) {
            var i, n, r, s, o, a = [],
                l = t.delegateCount,
                c = e.target;
            if (l && c.nodeType && !("click" === e.type && 1 <= e.button)) {
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (s = [], o = {}, i = 0; i < l; i++) void 0 === o[r = (n = t[i]).selector + " "] && (o[r] = n.needsContext ? -1 < _(r, this).index(c) : _.find(r, this, null, [c]).length), o[r] && s.push(n);
                        s.length && a.push({
                            elem: c,
                            handlers: s
                        })
                    }
            }
            return c = this, l < t.length && a.push({
                elem: c,
                handlers: t.slice(l)
            }), a
        },
        addProp: function(e, t) {
            Object.defineProperty(_.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: g(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[_.expando] ? e : new _.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    return e = this || e, eh.test(e.type) && e.click && k(e, "input") && eC(e, "click", eE), !1
                },
                trigger: function(e) {
                    return e = this || e, eh.test(e.type) && e.click && k(e, "input") && eC(e, "click"), !0
                },
                _default: function(e) {
                    return e = e.target, eh.test(e.type) && e.click && k(e, "input") && Q.get(e, "click") || k(e, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, _.removeEvent = function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i)
    }, _.Event = function(e, t) {
        if (!(this instanceof _.Event)) return new _.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? eE : eT, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && _.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[_.expando] = !0
    }, _.Event.prototype = {
        constructor: _.Event,
        isDefaultPrevented: eT,
        isPropagationStopped: eT,
        isImmediatePropagationStopped: eT,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = eE, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = eE, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = eE, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, _.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && eb.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ew.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, _.event.addProp), _.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        _.event.special[e] = {
            setup: function() {
                return eC(this, e, ex), !1
            },
            trigger: function() {
                return eC(this, e), !0
            },
            delegateType: t
        }
    }), _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        _.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var i, n = e.relatedTarget,
                    r = e.handleObj;
                return n && (n === this || _.contains(this, n)) || (e.type = r.origType, i = r.handler.apply(this, arguments), e.type = t), i
            }
        }
    }), _.fn.extend({
        on: function(e, t, i, n) {
            return eS(this, e, t, i, n)
        },
        one: function(e, t, i, n) {
            return eS(this, e, t, i, n, 1)
        },
        off: function(e, t, i) {
            var n, r;
            if (e && e.preventDefault && e.handleObj) return n = e.handleObj, _(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = eT), this.each(function() {
                _.event.remove(this, e, i, t)
            });
            for (r in e) this.off(r, t, e[r]);
            return this
        }
    });
    var e8 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        eL = /<script|<style|<link/i,
        ek = /checked\s*(?:[^=]|=\s*.checked.)/i,
        eD = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function eA(e, t) {
        return k(e, "table") && k(11 !== t.nodeType ? t : t.firstChild, "tr") && _(e).children("tbody")[0] || e
    }

    function eI(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function eP(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function eN(e, t) {
        var i, n, r, s, o, a;
        if (1 === t.nodeType) {
            if (Q.hasData(e) && (s = Q.access(e), o = Q.set(t, s), a = s.events))
                for (r in delete o.handle, o.events = {}, a)
                    for (i = 0, n = a[r].length; i < n; i++) _.event.add(t, r, a[r][i]);
            Z.hasData(e) && (e = Z.access(e), e = _.extend({}, e), Z.set(t, e))
        }
    }

    function eO(e, t, i, n) {
        t = a.apply([], t);
        var r, s, o, l, c, d, u = 0,
            h = e.length,
            p = h - 1,
            f = t[0],
            v = g(f);
        if (v || 1 < h && "string" == typeof f && !m.checkClone && ek.test(f)) return e.each(function(r) {
            var s = e.eq(r);
            v && (t[0] = f.call(this, r, s.html())), eO(s, t, i, n)
        });
        if (h && (s = (r = ey(t, e[0].ownerDocument, !1, e, n)).firstChild, 1 === r.childNodes.length && (r = s), s || n)) {
            for (l = (o = _.map(eg(r, "script"), eI)).length; u < h; u++) c = r, u !== p && (c = _.clone(c, !0, !0), l && _.merge(o, eg(c, "script"))), i.call(e[u], c, u);
            if (l)
                for (d = o[o.length - 1].ownerDocument, _.map(o, eP), u = 0; u < l; u++) c = o[u], ef.test(c.type || "") && !Q.access(c, "globalEval") && _.contains(d, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? _._evalUrl && !c.noModule && _._evalUrl(c.src, {
                    nonce: c.nonce || c.getAttribute("nonce")
                }) : y(c.textContent.replace(eD, ""), c, d))
        }
        return e
    }

    function eM(e, t, i) {
        for (var n, r = t ? _.filter(t, e) : e, s = 0; null != (n = r[s]); s++) i || 1 !== n.nodeType || _.cleanData(eg(n)), n.parentNode && (i && es(n) && ev(eg(n, "script")), n.parentNode.removeChild(n));
        return e
    }
    _.extend({
        htmlPrefilter: function(e) {
            return e.replace(e8, "<$1></$2>")
        },
        clone: function(e, t, i) {
            var n, r, s, o, a, l, c, d = e.cloneNode(!0),
                u = es(e);
            if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || _.isXMLDoc(e)))
                for (o = eg(d), n = 0, r = (s = eg(e)).length; n < r; n++) a = s[n], "input" === (c = (l = o[n]).nodeName.toLowerCase()) && eh.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (t) {
                if (i)
                    for (s = s || eg(e), o = o || eg(d), n = 0, r = s.length; n < r; n++) eN(s[n], o[n]);
                else eN(e, d)
            }
            return 0 < (o = eg(d, "script")).length && ev(o, !u && eg(e, "script")), d
        },
        cleanData: function(e) {
            for (var t, i, n, r = _.event.special, s = 0; void 0 !== (i = e[s]); s++)
                if (Y(i)) {
                    if (t = i[Q.expando]) {
                        if (t.events)
                            for (n in t.events) r[n] ? _.event.remove(i, n) : _.removeEvent(i, n, t.handle);
                        i[Q.expando] = void 0
                    }
                    i[Z.expando] && (i[Z.expando] = void 0)
                }
        }
    }), _.fn.extend({
        detach: function(e) {
            return eM(this, e, !0)
        },
        remove: function(e) {
            return eM(this, e)
        },
        text: function(e) {
            return F(this, function(e) {
                return void 0 === e ? _.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return eO(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || eA(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return eO(this, arguments, function(e) {
                var t;
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = eA(this, e)).insertBefore(e, t.firstChild)
            })
        },
        before: function() {
            return eO(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return eO(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (_.cleanData(eg(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return _.clone(this, e, t)
            })
        },
        html: function(e) {
            return F(this, function(e) {
                var t = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !eL.test(e) && !em[(ep.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = _.htmlPrefilter(e);
                    try {
                        for (; i < n; i++) 1 === (t = this[i] || {}).nodeType && (_.cleanData(eg(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (r) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return eO(this, arguments, function(t) {
                var i = this.parentNode;
                0 > _.inArray(this, e) && (_.cleanData(eg(this)), i && i.replaceChild(t, this))
            }, e)
        }
    }), _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        _.fn[e] = function(e) {
            for (var i, n = [], r = _(e), s = r.length - 1, o = 0; o <= s; o++) i = o === s ? this : this.clone(!0), _(r[o])[t](i), l.apply(n, i.get());
            return this.pushStack(n)
        }
    });
    var eH, eq, ez, e9, eR, eB, ej, e0 = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"),
        eW = function(t) {
            var i = t.ownerDocument.defaultView;
            return i && i.opener || (i = e), i.getComputedStyle(t)
        },
        eF = RegExp(en.join("|"), "i");

    function e1(e, t, i) {
        var n, r, s = e.style;
        return (i = i || eW(e)) && ("" !== (r = i.getPropertyValue(t) || i[t]) || es(e) || (r = _.style(e, t)), !m.pixelBoxStyles() && e0.test(r) && eF.test(t) && (n = s.width, e = s.minWidth, t = s.maxWidth, s.minWidth = s.maxWidth = s.width = r, r = i.width, s.width = n, s.minWidth = e, s.maxWidth = t)), void 0 !== r ? r + "" : r
    }

    function eV(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }

    function eU() {
        var t;
        ej && (eB.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", ej.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", er.appendChild(eB).appendChild(ej), eH = "1%" !== (t = e.getComputedStyle(ej)).top, eR = 12 === eG(t.marginLeft), ej.style.right = "60%", e9 = 36 === eG(t.right), eq = 36 === eG(t.width), ej.style.position = "absolute", ez = 12 === eG(ej.offsetWidth / 3), er.removeChild(eB), ej = null)
    }

    function eG(e) {
        return Math.round(parseFloat(e))
    }
    eB = r.createElement("div"), (ej = r.createElement("div")).style && (ej.style.backgroundClip = "content-box", ej.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === ej.style.backgroundClip, _.extend(m, {
        boxSizingReliable: function() {
            return eU(), eq
        },
        pixelBoxStyles: function() {
            return eU(), e9
        },
        pixelPosition: function() {
            return eU(), eH
        },
        reliableMarginLeft: function() {
            return eU(), eR
        },
        scrollboxSize: function() {
            return eU(), ez
        }
    }));
    var eX = ["Webkit", "Moz", "ms"],
        eY = r.createElement("div").style,
        e2 = {};

    function e4(e) {
        return _.cssProps[e] || e2[e] || (e in eY ? e : e2[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), i = eX.length; i--;)
                if ((e = eX[i] + t) in eY) return e
        }(e) || e)
    }
    var e3 = /^(none|table(?!-c[ea]).+)/,
        eK = /^--/,
        e5 = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        eQ = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function e7(e, t, i) {
        var n = ei.exec(t);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
    }

    function e6(e, t, i, n, r, s) {
        var o = "width" === t ? 1 : 0,
            a = 0,
            l = 0;
        if (i === (n ? "border" : "content")) return 0;
        for (; o < 4; o += 2) "margin" === i && (l += _.css(e, i + en[o], !0, r)), n ? ("content" === i && (l -= _.css(e, "padding" + en[o], !0, r)), "margin" !== i && (l -= _.css(e, "border" + en[o] + "Width", !0, r))) : (l += _.css(e, "padding" + en[o], !0, r), "padding" !== i ? l += _.css(e, "border" + en[o] + "Width", !0, r) : a += _.css(e, "border" + en[o] + "Width", !0, r));
        return !n && 0 <= s && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - s - l - a - .5)) || 0), l
    }

    function eZ(e, t, i) {
        var n = eW(e),
            r = (!m.boxSizingReliable() || i) && "border-box" === _.css(e, "boxSizing", !1, n),
            s = r,
            o = e1(e, t, n),
            a = "offset" + t[0].toUpperCase() + t.slice(1);
        if (e0.test(o)) {
            if (!i) return o;
            o = "auto"
        }
        return (!m.boxSizingReliable() && r || "auto" === o || !parseFloat(o) && "inline" === _.css(e, "display", !1, n)) && e.getClientRects().length && (r = "border-box" === _.css(e, "boxSizing", !1, n), (s = a in e) && (o = e[a])), (o = parseFloat(o) || 0) + e6(e, t, i || (r ? "border" : "content"), s, n, o) + "px"
    }

    function eJ(e, t, i, n, r) {
        return new eJ.prototype.init(e, t, i, n, r)
    }
    _.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) return "" === (e = e1(e, "opacity")) ? "1" : e
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, i, n) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, s, o, a = X(t),
                    l = eK.test(t),
                    c = e.style;
                if (l || (t = e4(a)), o = _.cssHooks[t] || _.cssHooks[a], void 0 === i) return o && "get" in o && void 0 !== (r = o.get(e, !1, n)) ? r : c[t];
                "string" == (s = typeof i) && (r = ei.exec(i)) && r[1] && (i = ec(e, t, r), s = "number"), null != i && i == i && ("number" !== s || l || (i += r && r[3] || (_.cssNumber[a] ? "" : "px")), m.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"), o && "set" in o && void 0 === (i = o.set(e, i, n)) || (l ? c.setProperty(t, i) : c[t] = i))
            }
        },
        css: function(e, t, i, n) {
            var r, s = X(t);
            return eK.test(t) || (t = e4(s)), (s = _.cssHooks[t] || _.cssHooks[s]) && "get" in s && (r = s.get(e, !0, i)), void 0 === r && (r = e1(e, t, n)), "normal" === r && t in eQ && (r = eQ[t]), "" === i || i ? (t = parseFloat(r), !0 === i || isFinite(t) ? t || 0 : r) : r
        }
    }), _.each(["height", "width"], function(e, t) {
        _.cssHooks[t] = {
            get: function(e, i, n) {
                if (i) return !e3.test(_.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? eZ(e, t, n) : el(e, e5, function() {
                    return eZ(e, t, n)
                })
            },
            set: function(e, i, n) {
                var r, s = eW(e),
                    o = !m.scrollboxSize() && "absolute" === s.position,
                    a = (o || n) && "border-box" === _.css(e, "boxSizing", !1, s);
                return n = n ? e6(e, t, n, a, s) : 0, a && o && (n -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(s[t]) - e6(e, t, "border", !1, s) - .5)), n && (r = ei.exec(i)) && "px" !== (r[3] || "px") && (e.style[t] = i, i = _.css(e, t)), e7(0, i, n)
            }
        }
    }), _.cssHooks.marginLeft = eV(m.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(e1(e, "marginLeft")) || e.getBoundingClientRect().left - el(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), _.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        _.cssHooks[e + t] = {
            expand: function(i) {
                for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) r[e + en[n] + t] = s[n] || s[n - 2] || s[0];
                return r
            }
        }, "margin" !== e && (_.cssHooks[e + t].set = e7)
    }), _.fn.extend({
        css: function(e, t) {
            return F(this, function(e, t, i) {
                var n, r, s = {},
                    o = 0;
                if (Array.isArray(t)) {
                    for (n = eW(e), r = t.length; o < r; o++) s[t[o]] = _.css(e, t[o], !1, n);
                    return s
                }
                return void 0 !== i ? _.style(e, t, i) : _.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), ((_.Tween = eJ).prototype = {
        constructor: eJ,
        init: function(e, t, i, n, r, s) {
            this.elem = e, this.prop = i, this.easing = r || _.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (_.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = eJ.propHooks[this.prop];
            return (e && e.get ? e : eJ.propHooks._default).get(this)
        },
        run: function(e) {
            var t, i = eJ.propHooks[this.prop];
            return this.options.duration ? this.pos = t = _.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (i && i.set ? i : eJ.propHooks._default).set(this), this
        }
    }).init.prototype = eJ.prototype, (eJ.propHooks = {
        _default: {
            get: function(e) {
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = _.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(e) {
                _.fx.step[e.prop] ? _.fx.step[e.prop](e) : 1 === e.elem.nodeType && (_.cssHooks[e.prop] || null != e.elem.style[e4(e.prop)]) ? _.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }).scrollTop = eJ.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, _.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, _.fx = eJ.prototype.init, _.fx.step = {};
    var te, tt, ti = /^(?:toggle|show|hide)$/,
        tn = /queueHooks$/;

    function tr() {
        return e.setTimeout(function() {
            te = void 0
        }), te = Date.now()
    }

    function ts(e, t) {
        var i, n = 0,
            r = {
                height: e
            };
        for (t = t ? 1 : 0; n < 4; n += 2 - t) r["margin" + (i = en[n])] = r["padding" + i] = e;
        return t && (r.opacity = r.width = e), r
    }

    function to(e, t, i) {
        for (var n, r = (ta.tweeners[t] || []).concat(ta.tweeners["*"]), s = 0, o = r.length; s < o; s++)
            if (n = r[s].call(i, t, e)) return n
    }

    function ta(e, t, i) {
        var n, r, s = 0,
            o = ta.prefilters.length,
            a = _.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var t = te || tr(), i = 1 - ((t = Math.max(0, c.startTime + c.duration - t)) / c.duration || 0), n = 0, s = c.tweens.length; n < s; n++) c.tweens[n].run(i);
                return a.notifyWith(e, [c, i, t]), i < 1 && s ? t : (s || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
            },
            c = a.promise({
                elem: e,
                props: _.extend({}, t),
                opts: _.extend(!0, {
                    specialEasing: {},
                    easing: _.easing._default
                }, i),
                originalProperties: t,
                originalOptions: i,
                startTime: te || tr(),
                duration: i.duration,
                tweens: [],
                createTween: function(t, i) {
                    return t = _.Tween(e, c.opts, t, i, c.opts.specialEasing[t] || c.opts.easing), c.tweens.push(t), t
                },
                stop: function(t) {
                    var i = 0,
                        n = t ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; i < n; i++) c.tweens[i].run(1);
                    return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                }
            }),
            d = c.props;
        for (function(e, t) {
                var i, n, r, s, o;
                for (i in e)
                    if (r = t[n = X(i)], Array.isArray(s = e[i]) && (r = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), (o = _.cssHooks[n]) && ("expand" in o))
                        for (i in s = o.expand(s), delete e[n], s)(i in e) || (e[i] = s[i], t[i] = r);
                    else t[n] = r
            }(d, c.opts.specialEasing); s < o; s++)
            if (n = ta.prefilters[s].call(c, e, d, c.opts)) return g(n.stop) && (_._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)), n;
        return _.map(d, to, c), g(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), _.fx.timer(_.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c
    }
    _.Animation = _.extend(ta, {
        tweeners: {
            "*": [function(e, t) {
                var i = this.createTween(e, t);
                return ec(i.elem, e, ei.exec(t), i), i
            }]
        },
        tweener: function(e, t) {
            for (var i, n = 0, r = (e = g(e) ? (t = e, ["*"]) : e.match(H)).length; n < r; n++) i = e[n], ta.tweeners[i] = ta.tweeners[i] || [], ta.tweeners[i].unshift(t)
        },
        prefilters: [function(e, t, i) {
            var n, r, s, o, a, l, c, d = "width" in t || "height" in t,
                u = this,
                h = {},
                p = e.style,
                f = e.nodeType && ea(e),
                m = Q.get(e, "fxshow");
            for (n in i.queue || (null == (o = _._queueHooks(e, "fx")).unqueued && (o.unqueued = 0, a = o.empty.fire, o.empty.fire = function() {
                    o.unqueued || a()
                }), o.unqueued++, u.always(function() {
                    u.always(function() {
                        o.unqueued--, _.queue(e, "fx").length || o.empty.fire()
                    })
                })), t)
                if (r = t[n], ti.test(r)) {
                    if (delete t[n], s = s || "toggle" === r, r === (f ? "hide" : "show")) {
                        if ("show" !== r || !m || void 0 === m[n]) continue;
                        f = !0
                    }
                    h[n] = m && m[n] || _.style(e, n)
                } if ((l = !_.isEmptyObject(t)) || !_.isEmptyObject(h))
                for (n in d && 1 === e.nodeType && (i.overflow = [p.overflow, p.overflowX, p.overflowY], null == (c = m && m.display) && (c = Q.get(e, "display")), "none" === (d = _.css(e, "display")) && (c ? d = c : (eu([e], !0), c = e.style.display || c, d = _.css(e, "display"), eu([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === _.css(e, "float") && (l || (u.done(function() {
                        p.display = c
                    }), null == c && (c = "none" === (d = p.display) ? "" : d)), p.display = "inline-block")), i.overflow && (p.overflow = "hidden", u.always(function() {
                        p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
                    })), l = !1, h) l || (m ? "hidden" in m && (f = m.hidden) : m = Q.access(e, "fxshow", {
                    display: c
                }), s && (m.hidden = !f), f && eu([e], !0), u.done(function() {
                    for (n in f || eu([e]), Q.remove(e, "fxshow"), h) _.style(e, n, h[n])
                })), l = to(f ? m[n] : 0, n, u), n in m || (m[n] = l.start, f && (l.end = l.start, l.start = 0))
        }],
        prefilter: function(e, t) {
            t ? ta.prefilters.unshift(e) : ta.prefilters.push(e)
        }
    }), _.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? _.extend({}, e) : {
            complete: i || !i && t || g(e) && e,
            duration: e,
            easing: i && t || t && !g(t) && t
        };
        return _.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in _.fx.speeds ? n.duration = _.fx.speeds[n.duration] : n.duration = _.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            g(n.old) && n.old.call(this), n.queue && _.dequeue(this, n.queue)
        }, n
    }, _.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(ea).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function(e, t, i, n) {
            var r = _.isEmptyObject(e),
                s = _.speed(t, i, n);
            return (n = function() {
                var t = ta(this, _.extend({}, e), s);
                (r || Q.get(this, "finish")) && t.stop(!0)
            }).finish = n, r || !1 === s.queue ? this.each(n) : this.queue(s.queue, n)
        },
        stop: function(e, t, i) {
            function n(e) {
                var t = e.stop;
                delete e.stop, t(i)
            }
            return "string" != typeof e && (i = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    r = null != e && e + "queueHooks",
                    s = _.timers,
                    o = Q.get(this);
                if (r) o[r] && o[r].stop && n(o[r]);
                else
                    for (r in o) o[r] && o[r].stop && tn.test(r) && n(o[r]);
                for (r = s.length; r--;) s[r].elem !== this || null != e && s[r].queue !== e || (s[r].anim.stop(i), t = !1, s.splice(r, 1));
                !t && i || _.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"), this.each(function() {
                var t, i = Q.get(this),
                    n = i[e + "queue"],
                    r = i[e + "queueHooks"],
                    s = _.timers,
                    o = n ? n.length : 0;
                for (i.finish = !0, _.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                for (t = 0; t < o; t++) n[t] && n[t].finish && n[t].finish.call(this);
                delete i.finish
            })
        }
    }), _.each(["toggle", "show", "hide"], function(e, t) {
        var i = _.fn[t];
        _.fn[t] = function(e, n, r) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(ts(t, !0), e, n, r)
        }
    }), _.each({
        slideDown: ts("show"),
        slideUp: ts("hide"),
        slideToggle: ts("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        _.fn[e] = function(e, i, n) {
            return this.animate(t, e, i, n)
        }
    }), _.timers = [], _.fx.tick = function() {
        var e, t = 0,
            i = _.timers;
        for (te = Date.now(); t < i.length; t++)(e = i[t])() || i[t] !== e || i.splice(t--, 1);
        i.length || _.fx.stop(), te = void 0
    }, _.fx.timer = function(e) {
        _.timers.push(e), _.fx.start()
    }, _.fx.interval = 13, _.fx.start = function() {
        tt || (tt = !0, function t() {
            tt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(t) : e.setTimeout(t, _.fx.interval), _.fx.tick())
        }())
    }, _.fx.stop = function() {
        tt = null
    }, _.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, _.fn.delay = function(t, i) {
        return t = _.fx && _.fx.speeds[t] || t, i = i || "fx", this.queue(i, function(i, n) {
            var r = e.setTimeout(i, t);
            n.stop = function() {
                e.clearTimeout(r)
            }
        })
    }, n = r.createElement("input"), w = r.createElement("select").appendChild(r.createElement("option")), n.type = "checkbox", m.checkOn = "" !== n.value, m.optSelected = w.selected, (n = r.createElement("input")).value = "t", n.type = "radio", m.radioValue = "t" === n.value;
    var tl, tc = _.expr.attrHandle;
    _.fn.extend({
        attr: function(e, t) {
            return F(this, _.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                _.removeAttr(this, e)
            })
        }
    }), _.extend({
        attr: function(e, t, i) {
            var n, r, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return void 0 === e.getAttribute ? _.prop(e, t, i) : (1 === s && _.isXMLDoc(e) || (r = _.attrHooks[t.toLowerCase()] || (_.expr.match.bool.test(t) ? tl : void 0)), void 0 !== i ? null === i ? void _.removeAttr(e, t) : r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : r && "get" in r && null !== (n = r.get(e, t)) || null != (n = _.find.attr(e, t)) ? n : void 0)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!m.radioValue && "radio" === t && k(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var i, n = 0,
                r = t && t.match(H);
            if (r && 1 === e.nodeType)
                for (; i = r[n++];) e.removeAttribute(i)
        }
    }), tl = {
        set: function(e, t, i) {
            return !1 === t ? _.removeAttr(e, i) : e.setAttribute(i, i), i
        }
    }, _.each(_.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var i = tc[t] || _.find.attr;
        tc[t] = function(e, t, n) {
            var r, s, o = t.toLowerCase();
            return n || (s = tc[o], tc[o] = r, r = null != i(e, t, n) ? o : null, tc[o] = s), r
        }
    });
    var td = /^(?:input|select|textarea|button)$/i,
        tu = /^(?:a|area)$/i;

    function th(e) {
        return (e.match(H) || []).join(" ")
    }

    function tp(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function tf(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(H) || []
    }
    _.fn.extend({
        prop: function(e, t) {
            return F(this, _.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[_.propFix[e] || e]
            })
        }
    }), _.extend({
        prop: function(e, t, i) {
            var n, r, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return 1 === s && _.isXMLDoc(e) || (t = _.propFix[t] || t, r = _.propHooks[t]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : e[t] = i : r && "get" in r && null !== (n = r.get(e, t)) ? n : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = _.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : td.test(e.nodeName) || tu.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), m.optSelected || (_.propHooks.selected = {
        get: function(e) {
            return (e = e.parentNode) && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(e) {
            (e = e.parentNode) && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        _.propFix[this.toLowerCase()] = this
    }), _.fn.extend({
        addClass: function(e) {
            var t, i, n, r, s, o, a = 0;
            if (g(e)) return this.each(function(t) {
                _(this).addClass(e.call(this, t, tp(this)))
            });
            if ((t = tf(e)).length) {
                for (; i = this[a++];)
                    if (o = tp(i), n = 1 === i.nodeType && " " + th(o) + " ") {
                        for (s = 0; r = t[s++];) 0 > n.indexOf(" " + r + " ") && (n += r + " ");
                        o !== (o = th(n)) && i.setAttribute("class", o)
                    }
            }
            return this
        },
        removeClass: function(e) {
            var t, i, n, r, s, o, a = 0;
            if (g(e)) return this.each(function(t) {
                _(this).removeClass(e.call(this, t, tp(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((t = tf(e)).length) {
                for (; i = this[a++];)
                    if (o = tp(i), n = 1 === i.nodeType && " " + th(o) + " ") {
                        for (s = 0; r = t[s++];)
                            for (; - 1 < n.indexOf(" " + r + " ");) n = n.replace(" " + r + " ", " ");
                        o !== (o = th(n)) && i.setAttribute("class", o)
                    }
            }
            return this
        },
        toggleClass: function(e, t) {
            var i = typeof e,
                n = "string" == i || Array.isArray(e);
            return "boolean" == typeof t && n ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function(i) {
                _(this).toggleClass(e.call(this, i, tp(this), t), t)
            }) : this.each(function() {
                var t, r, s, o;
                if (n)
                    for (r = 0, s = _(this), o = tf(e); t = o[r++];) s.hasClass(t) ? s.removeClass(t) : s.addClass(t);
                else void 0 !== e && "boolean" != i || ((t = tp(this)) && Q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", !t && !1 !== e && Q.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            for (var t, i = 0, n = " " + e + " "; t = this[i++];)
                if (1 === t.nodeType && -1 < (" " + th(tp(t)) + " ").indexOf(n)) return !0;
            return !1
        }
    });
    var tm = /\r/g;

    function tg(e) {
        e.stopPropagation()
    }
    _.fn.extend({
        val: function(e) {
            var t, i, n, r = this[0];
            return arguments.length ? (n = g(e), this.each(function(i) {
                1 === this.nodeType && (null == (i = n ? e.call(this, i, _(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = _.map(i, function(e) {
                    return null == e ? "" : e + ""
                })), (t = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : r ? (t = _.valHooks[r.type] || _.valHooks[r.nodeName.toLowerCase()]) && "get" in t && void 0 !== (i = t.get(r, "value")) ? i : "string" == typeof(i = r.value) ? i.replace(tm, "") : null == i ? "" : i : void 0
        }
    }), _.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = _.find.attr(e, "value");
                    return null != t ? t : th(_.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, i = e.options, n = e.selectedIndex, r = "select-one" === e.type, s = r ? null : [], o = r ? n + 1 : i.length, a = n < 0 ? o : r ? n : 0; a < o; a++)
                        if (((t = i[a]).selected || a === n) && !t.disabled && (!t.parentNode.disabled || !k(t.parentNode, "optgroup"))) {
                            if (t = _(t).val(), r) return t;
                            s.push(t)
                        } return s
                },
                set: function(e, t) {
                    for (var i, n, r = e.options, s = _.makeArray(t), o = r.length; o--;)((n = r[o]).selected = -1 < _.inArray(_.valHooks.option.get(n), s)) && (i = !0);
                    return i || (e.selectedIndex = -1), s
                }
            }
        }
    }), _.each(["radio", "checkbox"], function() {
        _.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < _.inArray(_(e).val(), t)
            }
        }, m.checkOn || (_.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), m.focusin = "onfocusin" in e;
    var tv = /^(?:focusinfocus|focusoutblur)$/;
    _.extend(_.event, {
        trigger: function(t, n, s, o) {
            var a, l, c, d, u, p, f, m = [s || r],
                v = h.call(t, "type") ? t.type : t,
                y = h.call(t, "namespace") ? t.namespace.split(".") : [],
                b = f = l = s = s || r;
            if (3 !== s.nodeType && 8 !== s.nodeType && !tv.test(v + _.event.triggered) && (-1 < v.indexOf(".") && (v = (y = v.split(".")).shift(), y.sort()), d = 0 > v.indexOf(":") && "on" + v, (t = t[_.expando] ? t : new _.Event(v, "object" == typeof t && t)).isTrigger = o ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = s), n = null == n ? [t] : _.makeArray(n, [t]), p = _.event.special[v] || {}, o || !p.trigger || !1 !== p.trigger.apply(s, n))) {
                if (!o && !p.noBubble && !i(s)) {
                    for (c = p.delegateType || v, tv.test(c + v) || (b = b.parentNode); b; b = b.parentNode) m.push(b), l = b;
                    l === (s.ownerDocument || r) && m.push(l.defaultView || l.parentWindow || e)
                }
                for (a = 0;
                    (b = m[a++]) && !t.isPropagationStopped();) f = b, t.type = 1 < a ? c : p.bindType || v, (u = (Q.get(b, "events") || {})[t.type] && Q.get(b, "handle")) && u.apply(b, n), (u = d && b[d]) && u.apply && Y(b) && (t.result = u.apply(b, n), !1 === t.result && t.preventDefault());
                return t.type = v, o || t.isDefaultPrevented() || p._default && !1 !== p._default.apply(m.pop(), n) || !Y(s) || d && g(s[v]) && !i(s) && ((l = s[d]) && (s[d] = null), _.event.triggered = v, t.isPropagationStopped() && f.addEventListener(v, tg), s[v](), t.isPropagationStopped() && f.removeEventListener(v, tg), _.event.triggered = void 0, l && (s[d] = l)), t.result
            }
        },
        simulate: function(e, t, i) {
            e = _.extend(new _.Event, i, {
                type: e,
                isSimulated: !0
            }), _.event.trigger(e, null, t)
        }
    }), _.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                _.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var i = this[0];
            if (i) return _.event.trigger(e, t, i, !0)
        }
    }), m.focusin || _.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        function i(e) {
            _.event.simulate(t, e.target, _.event.fix(e))
        }
        _.event.special[t] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    r = Q.access(n, t);
                r || n.addEventListener(e, i, !0), Q.access(n, t, (r || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    r = Q.access(n, t) - 1;
                r ? Q.access(n, t, r) : (n.removeEventListener(e, i, !0), Q.remove(n, t))
            }
        }
    });
    var t$ = e.location,
        ty = Date.now(),
        tb = /\?/;
    _.parseXML = function(t) {
        var i;
        if (!t || "string" != typeof t) return null;
        try {
            i = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (n) {
            i = void 0
        }
        return i && !i.getElementsByTagName("parsererror").length || _.error("Invalid XML: " + t), i
    };
    var tw = /\[\]$/,
        t_ = /\r?\n/g,
        tE = /^(?:submit|button|image|reset|file)$/i,
        tT = /^(?:input|select|textarea|keygen)/i;
    _.param = function(e, t) {
        function i(e, t) {
            t = g(t) ? t() : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == t ? "" : t)
        }
        var n, r = [];
        if (null == e) return "";
        if (Array.isArray(e) || e.jquery && !_.isPlainObject(e)) _.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) ! function e(t, i, n, r) {
                if (Array.isArray(i)) _.each(i, function(i, s) {
                    n || tw.test(t) ? r(t, s) : e(t + "[" + ("object" == typeof s && null != s ? i : "") + "]", s, n, r)
                });
                else if (n || "object" !== b(i)) r(t, i);
                else
                    for (var s in i) e(t + "[" + s + "]", i[s], n, r)
            }(n, e[n], t, i);
        return r.join("&")
    }, _.fn.extend({
        serialize: function() {
            return _.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = _.prop(this, "elements");
                return e ? _.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !_(this).is(":disabled") && tT.test(this.nodeName) && !tE.test(e) && (this.checked || !eh.test(e))
            }).map(function(e, t) {
                var i = _(this).val();
                return null == i ? null : Array.isArray(i) ? _.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(t_, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(t_, "\r\n")
                }
            }).get()
        }
    });
    var tx = /%20/g,
        tS = /#.*$/,
        tC = /([?&])_=[^&]*/,
        t8 = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        tL = /^(?:GET|HEAD)$/,
        tk = /^\/\//,
        tD = {},
        tA = {},
        tI = "*/".concat("*"),
        tP = r.createElement("a");

    function tN(e) {
        return function(t, i) {
            "string" != typeof t && (i = t, t = "*");
            var n, r = 0,
                s = t.toLowerCase().match(H) || [];
            if (g(i))
                for (; n = s[r++];) "+" === n[0] ? (e[n = n.slice(1) || "*"] = e[n] || []).unshift(i) : (e[n] = e[n] || []).push(i)
        }
    }

    function tO(e, t, i, n) {
        var r = {},
            s = e === tA;

        function o(a) {
            var l;
            return r[a] = !0, _.each(e[a] || [], function(e, a) {
                return "string" != typeof(a = a(t, i, n)) || s || r[a] ? s ? !(l = a) : void 0 : (t.dataTypes.unshift(a), o(a), !1)
            }), l
        }
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }

    function tM(e, t) {
        var i, n, r = _.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((r[i] ? e : n = n || {})[i] = t[i]);
        return n && _.extend(!0, e, n), e
    }
    tP.href = t$.href, _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: t$.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(t$.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": tI,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? tM(tM(e, _.ajaxSettings), t) : tM(_.ajaxSettings, e)
        },
        ajaxPrefilter: tN(tD),
        ajaxTransport: tN(tA),
        ajax: function(t, i) {
            "object" == typeof t && (i = t, t = void 0), i = i || {};
            var n, s, o, a, l, c, d, u, h, p, f = _.ajaxSetup({}, i),
                m = f.context || f,
                g = f.context && (m.nodeType || m.jquery) ? _(m) : _.event,
                v = _.Deferred(),
                y = _.Callbacks("once memory"),
                b = f.statusCode || {},
                w = {},
                E = {},
                T = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (d) {
                            if (!a)
                                for (a = {}; t = t8.exec(o);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                            t = a[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return d ? o : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == d && (w[e = E[e.toLowerCase()] = E[e.toLowerCase()] || e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == d && (f.mimeType = e), this
                    },
                    statusCode: function(e) {
                        if (e) {
                            if (d) x.always(e[x.status]);
                            else
                                for (var t in e) b[t] = [b[t], e[t]]
                        }
                        return this
                    },
                    abort: function(e) {
                        return e = e || T, n && n.abort(e), L(0, e), this
                    }
                };
            if (v.promise(x), f.url = ((t || f.url || t$.href) + "").replace(tk, t$.protocol + "//"), f.type = i.method || i.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(H) || [""], null == f.crossDomain) {
                c = r.createElement("a");
                try {
                    c.href = f.url, c.href = c.href, f.crossDomain = tP.protocol + "//" + tP.host != c.protocol + "//" + c.host
                } catch (S) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = _.param(f.data, f.traditional)), tO(tD, f, i, x), d) return x;
            for (h in (u = _.event && f.global) && 0 == _.active++ && _.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !tL.test(f.type), s = f.url.replace(tS, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(tx, "+")) : (p = f.url.slice(s.length), f.data && (f.processData || "string" == typeof f.data) && (s += (tb.test(s) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (s = s.replace(tC, "$1"), p = (tb.test(s) ? "&" : "?") + "_=" + ty++ + p), f.url = s + p), f.ifModified && (_.lastModified[s] && x.setRequestHeader("If-Modified-Since", _.lastModified[s]), _.etag[s] && x.setRequestHeader("If-None-Match", _.etag[s])), (f.data && f.hasContent && !1 !== f.contentType || i.contentType) && x.setRequestHeader("Content-Type", f.contentType), x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + tI + "; q=0.01" : "") : f.accepts["*"]), f.headers) x.setRequestHeader(h, f.headers[h]);
            if (f.beforeSend && (!1 === f.beforeSend.call(m, x, f) || d)) return x.abort();
            if (T = "abort", y.add(f.complete), x.done(f.success), x.fail(f.error), n = tO(tA, f, i, x)) {
                if (x.readyState = 1, u && g.trigger("ajaxSend", [x, f]), d) return x;
                f.async && 0 < f.timeout && (l = e.setTimeout(function() {
                    x.abort("timeout")
                }, f.timeout));
                try {
                    d = !1, n.send(w, L)
                } catch (C) {
                    if (d) throw C;
                    L(-1, C)
                }
            } else L(-1, "No Transport");

            function L(t, i, r, a) {
                var c, h, p, w = i;
                d || (d = !0, l && e.clearTimeout(l), n = void 0, o = a || "", x.readyState = 0 < t ? 4 : 0, a = 200 <= t && t < 300 || 304 === t, r && (p = function(e, t, i) {
                    for (var n, r, s, o, a = e.contents, l = e.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (n) {
                        for (r in a)
                            if (a[r] && a[r].test(n)) {
                                l.unshift(r);
                                break
                            }
                    }
                    if (l[0] in i) s = l[0];
                    else {
                        for (r in i) {
                            if (!l[0] || e.converters[r + " " + l[0]]) {
                                s = r;
                                break
                            }
                            o = o || r
                        }
                        s = s || o
                    }
                    if (s) return s !== l[0] && l.unshift(s), i[s]
                }(f, x, r)), p = function(e, t, i, n) {
                    var r, s, o, a, l, c = {},
                        d = e.dataTypes.slice();
                    if (d[1])
                        for (o in e.converters) c[o.toLowerCase()] = e.converters[o];
                    for (s = d.shift(); s;)
                        if (e.responseFields[s] && (i[e.responseFields[s]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = d.shift()) {
                            if ("*" === s) s = l;
                            else if ("*" !== l && l !== s) {
                                if (!(o = c[l + " " + s] || c["* " + s])) {
                                    for (r in c)
                                        if ((a = r.split(" "))[1] === s && (o = c[l + " " + a[0]] || c["* " + a[0]])) {
                                            !0 === o ? o = c[r] : !0 !== c[r] && (s = a[0], d.unshift(a[1]));
                                            break
                                        }
                                }
                                if (!0 !== o) {
                                    if (o && e.throws) t = o(t);
                                    else try {
                                        t = o(t)
                                    } catch (u) {
                                        return {
                                            state: "parsererror",
                                            error: o ? u : "No conversion from " + l + " to " + s
                                        }
                                    }
                                }
                            }
                        } return {
                        state: "success",
                        data: t
                    }
                }(f, p, x, a), a ? (f.ifModified && ((r = x.getResponseHeader("Last-Modified")) && (_.lastModified[s] = r), (r = x.getResponseHeader("etag")) && (_.etag[s] = r)), 204 === t || "HEAD" === f.type ? w = "nocontent" : 304 === t ? w = "notmodified" : (w = p.state, c = p.data, a = !(h = p.error))) : (h = w, !t && w || (w = "error", t < 0 && (t = 0))), x.status = t, x.statusText = (i || w) + "", a ? v.resolveWith(m, [c, w, x]) : v.rejectWith(m, [x, w, h]), x.statusCode(b), b = void 0, u && g.trigger(a ? "ajaxSuccess" : "ajaxError", [x, f, a ? c : h]), y.fireWith(m, [x, w]), u && (g.trigger("ajaxComplete", [x, f]), --_.active || _.event.trigger("ajaxStop")))
            }
            return x
        },
        getJSON: function(e, t, i) {
            return _.get(e, t, i, "json")
        },
        getScript: function(e, t) {
            return _.get(e, void 0, t, "script")
        }
    }), _.each(["get", "post"], function(e, t) {
        _[t] = function(e, i, n, r) {
            return g(i) && (r = r || n, n = i, i = void 0), _.ajax(_.extend({
                url: e,
                type: t,
                dataType: r,
                data: i,
                success: n
            }, _.isPlainObject(e) && e))
        }
    }), _._evalUrl = function(e, t) {
        return _.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                _.globalEval(e, t)
            }
        })
    }, _.fn.extend({
        wrapAll: function(e) {
            return this[0] && (g(e) && (e = e.call(this[0])), e = _(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return g(e) ? this.each(function(t) {
                _(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = _(this),
                    i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = g(e);
            return this.each(function(i) {
                _(this).wrapAll(t ? e.call(this, i) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                _(this).replaceWith(this.childNodes)
            }), this
        }
    }), _.expr.pseudos.hidden = function(e) {
        return !_.expr.pseudos.visible(e)
    }, _.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, _.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var tH = {
            0: 200,
            1223: 204
        },
        tq = _.ajaxSettings.xhr();
    m.cors = !!tq && "withCredentials" in tq, m.ajax = tq = !!tq, _.ajaxTransport(function(t) {
        var i, n;
        if (m.cors || tq && !t.crossDomain) return {
            send: function(r, s) {
                var o, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (o in t.xhrFields) a[o] = t.xhrFields[o];
                for (o in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r) a.setRequestHeader(o, r[o]);
                i = function(e) {
                    return function() {
                        i && (i = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(tH[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                            binary: a.response
                        } : {
                            text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                }, a.onload = i(), n = a.onerror = a.ontimeout = i("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                    4 === a.readyState && e.setTimeout(function() {
                        i && n()
                    })
                }, i = i("abort");
                try {
                    a.send(t.hasContent && t.data || null)
                } catch (l) {
                    if (i) throw l
                }
            },
            abort: function() {
                i && i()
            }
        }
    }), _.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), _.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return _.globalEval(e), e
            }
        }
    }), _.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), _.ajaxTransport("script", function(e) {
        var t, i;
        if (e.crossDomain || e.scriptAttrs) return {
            send: function(n, s) {
                t = _("<script>").attr(e.scriptAttrs || {}).prop({
                    charset: e.scriptCharset,
                    src: e.url
                }).on("load error", i = function(e) {
                    t.remove(), i = null, e && s("error" === e.type ? 404 : 200, e.type)
                }), r.head.appendChild(t[0])
            },
            abort: function() {
                i && i()
            }
        }
    });
    var tz = [],
        t9 = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = tz.pop() || _.expando + "_" + ty++;
            return this[e] = !0, e
        }
    }), _.ajaxPrefilter("json jsonp", function(t, i, n) {
        var r, s, o, a = !1 !== t.jsonp && (t9.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && t9.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0]) return r = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(t9, "$1" + r) : !1 !== t.jsonp && (t.url += (tb.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
            return o || _.error(r + " was not called"), o[0]
        }, t.dataTypes[0] = "json", s = e[r], e[r] = function() {
            o = arguments
        }, n.always(function() {
            void 0 === s ? _(e).removeProp(r) : e[r] = s, t[r] && (t.jsonpCallback = i.jsonpCallback, tz.push(r)), o && g(s) && s(o[0]), o = s = void 0
        }), "script"
    }), m.createHTMLDocument = ((n = r.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === n.childNodes.length), _.parseHTML = function(e, t, i) {
        var n;
        return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (m.createHTMLDocument ? ((n = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(n)) : t = r), n = !i && [], (i = D.exec(e)) ? [t.createElement(i[1])] : (i = ey([e], t, n), n && n.length && _(n).remove(), _.merge([], i.childNodes)))
    }, _.fn.load = function(e, t, i) {
        var n, r, s, o = this,
            a = e.indexOf(" ");
        return -1 < a && (n = th(e.slice(a)), e = e.slice(0, a)), g(t) ? (i = t, t = void 0) : t && "object" == typeof t && (r = "POST"), 0 < o.length && _.ajax({
            url: e,
            type: r || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            s = arguments, o.html(n ? _("<div>").append(_.parseHTML(e)).find(n) : e)
        }).always(i && function(e, t) {
            o.each(function() {
                i.apply(this, s || [e.responseText, t, e])
            })
        }), this
    }, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        _.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), _.expr.pseudos.animated = function(e) {
        return _.grep(_.timers, function(t) {
            return e === t.elem
        }).length
    }, _.offset = {
        setOffset: function(e, t, i) {
            var n, r, s, o, a = _.css(e, "position"),
                l = _(e),
                c = {};
            "static" === a && (e.style.position = "relative"), s = l.offset(), n = _.css(e, "top"), o = _.css(e, "left"), o = ("absolute" === a || "fixed" === a) && -1 < (n + o).indexOf("auto") ? (r = (a = l.position()).top, a.left) : (r = parseFloat(n) || 0, parseFloat(o) || 0), g(t) && (t = t.call(e, i, _.extend({}, s))), null != t.top && (c.top = t.top - s.top + r), null != t.left && (c.left = t.left - s.left + o), "using" in t ? t.using.call(e, c) : l.css(c)
        }
    }, _.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                _.offset.setOffset(this, e, t)
            });
            var t, i = this[0];
            return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), i = i.ownerDocument.defaultView, {
                top: t.top + i.pageYOffset,
                left: t.left + i.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, i, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === _.css(n, "position")) t = n.getBoundingClientRect();
                else {
                    for (t = this.offset(), i = n.ownerDocument, e = n.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === _.css(e, "position");) e = e.parentNode;
                    e && e !== n && 1 === e.nodeType && ((r = _(e).offset()).top += _.css(e, "borderTopWidth", !0), r.left += _.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - r.top - _.css(n, "marginTop", !0),
                    left: t.left - r.left - _.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === _.css(e, "position");) e = e.offsetParent;
                return e || er
            })
        }
    }), _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        _.fn[e] = function(r) {
            return F(this, function(e, r, s) {
                var o;
                return i(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === s ? o ? o[t] : e[r] : void(o ? o.scrollTo(n ? o.pageXOffset : s, n ? s : o.pageYOffset) : e[r] = s)
            }, e, r, arguments.length)
        }
    }), _.each(["top", "left"], function(e, t) {
        _.cssHooks[t] = eV(m.pixelPosition, function(e, i) {
            if (i) return i = e1(e, t), e0.test(i) ? _(e).position()[t] + "px" : i
        })
    }), _.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        _.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            _.fn[r] = function(s, o) {
                var a = arguments.length && (n || "boolean" != typeof s),
                    l = n || (!0 === s || !0 === o ? "margin" : "border");
                return F(this, function(t, n, s) {
                    var o;
                    return i(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === s ? _.css(t, n, l) : _.style(t, n, s, l)
                }, t, a ? s : void 0, a)
            }
        })
    }), _.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        _.fn[t] = function(e, i) {
            return 0 < arguments.length ? this.on(t, null, e, i) : this.trigger(t)
        }
    }), _.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), _.fn.extend({
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        }
    }), _.proxy = function(e, t) {
        var i, n;
        if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return i = o.call(arguments, 2), (n = function() {
            return e.apply(t || this, i.concat(o.call(arguments)))
        }).guid = e.guid = e.guid || _.guid++, n
    }, _.holdReady = function(e) {
        e ? _.readyWait++ : _.ready(!0)
    }, _.isArray = Array.isArray, _.parseJSON = JSON.parse, _.nodeName = k, _.isFunction = g, _.isWindow = i, _.camelCase = X, _.type = b, _.now = Date.now, _.isNumeric = function(e) {
        var t = _.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return _
    });
    var tR = e.jQuery,
        tB = e.$;
    return _.noConflict = function(t) {
        return e.$ === _ && (e.$ = tB), t && e.jQuery === _ && (e.jQuery = tR), _
    }, t || (e.jQuery = e.$ = _), _
})