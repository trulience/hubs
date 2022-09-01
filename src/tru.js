
import {getParameterByName } from "./utils/media-url-utils";

let trl = null;
let trl_connected = false;


function tru_ready() {
    console.log("tru ready");
}
  
function tru_connect() {
    trl_connected = true;
    window.APP.entryManager.scene.emit("load_avatar");
}

function tru_disconnect() {
    trl_connected = false;
}

let authEventsCB = {
    onReady: tru_ready
}

let wsEventsCB = {
}

let mediaEventsCB = {
    onConnected: tru_connect,
    onDisconnected: tru_disconnect
}

let videoElements = {
    remoteVideo: 'wall-avatar',
}

var avatarId = getParameterByName("avatar_id") || '4765584368400223583'; //Default Avatar Id = 10 = ECHO_TEST
var userId = getParameterByName("user_id")  || '777';  //Default Avatar Id = 10 = ECHO_TEST

function pageOnloadHandler() {
    if (!avatarId)
        return;
    trl = Trulience.Builder()
        .setAvatarId(avatarId) // Setting as String as Long values are truncated in JavaScript
        .setUserId(userId)
        .setLanguagePreference('en-US')
        .setUserName('Guest')
        .enableAvatar(true)  // false for chat only, true for chat and video avatar
        .setAuthCallbacks(authEventsCB)
        .setWebSocketCallbacks(wsEventsCB)
        .setMediaCallbacks(mediaEventsCB)
        .setScreenId('voice-textarea-id')
        .setRetry(false)
        .registerVideoElements(videoElements)
        .build();
    trl.authenticate();
};


function startCall() {
    trl.connectGateway();
}

function endCall(reason) {
    trl.disconnectGateway(reason);
}

window.onload = () => pageOnloadHandler(false);

window.onunload = function () {
    trl.disconnectGateway();
}

export function loadTruAvatar() {
    if (trl_connected) {
        window.APP.entryManager.scene.emit("load_avatar");
    }
    else {
        startCall();
    }
}


!function(e) {
    var t = {};
    function n(o) {
        if (t[o])
            return t[o].exports;
        var a = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(a.exports, a, a.exports, n),
        a.l = !0,
        a.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (n.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var a in e)
                n.d(o, a, function(t) {
                    return e[t]
                }
                .bind(null, a));
        return o
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 1)
}([function(e, t, n) {
    e.exports = function() {
        "use strict";
        function e(t) {
            return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(t)
        }
        function t(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1,
                o.configurable = !0,
                "value"in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o)
            }
        }
        function o(e, t, o) {
            return t && n(e.prototype, t),
            o && n(e, o),
            e
        }
        function a() {
            return (a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n)
                        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && r(e, t)
        }
        function i(e) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function r(e, t) {
            return (r = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        function l() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }
        function c(e, t, n) {
            return (c = l() ? Reflect.construct : function(e, t, n) {
                var o = [null];
                o.push.apply(o, t);
                var a = new (Function.bind.apply(e, o));
                return n && r(a, n.prototype),
                a
            }
            ).apply(null, arguments)
        }
        function u(e, t) {
            return !t || "object" != typeof t && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function d(e, t, n) {
            return (d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var o = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = i(e)); )
                        ;
                    return e
                }(e, t);
                if (o) {
                    var a = Object.getOwnPropertyDescriptor(o, t);
                    return a.get ? a.get.call(n) : a.value
                }
            }
            )(e, t, n || e)
        }
        var p = function(e) {
            return Array.prototype.slice.call(e)
        }
          , f = function(e) {
            console.warn("".concat("SweetAlert2:", " ").concat(e))
        }
          , m = function(e) {
            console.error("".concat("SweetAlert2:", " ").concat(e))
        }
          , g = []
          , h = function(e) {
            -1 === g.indexOf(e) && (g.push(e),
            f(e))
        }
          , w = function(e) {
            return "function" == typeof e ? e() : e
        }
          , b = function(e) {
            return e && Promise.resolve(e) === e
        }
          , y = Object.freeze({
            cancel: "cancel",
            backdrop: "overlay",
            close: "close",
            esc: "esc",
            timer: "timer"
        })
          , v = function(e) {
            var t = {};
            for (var n in e)
                t[e[n]] = "swal2-" + e[n];
            return t
        }
          , k = v(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "toast-column", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "icon-text", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validation-message", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl"])
          , S = v(["success", "warning", "info", "question", "error"])
          , T = {
            previousBodyPadding: null
        }
          , C = function(e, t) {
            return e.classList.contains(t)
        }
          , _ = function(e) {
            if (e.focus(),
            "file" !== e.type) {
                var t = e.value;
                e.value = "",
                e.value = t
            }
        }
          , I = function(e, t, n) {
            e && t && ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
            t.forEach((function(t) {
                e.forEach ? e.forEach((function(e) {
                    n ? e.classList.add(t) : e.classList.remove(t)
                }
                )) : n ? e.classList.add(t) : e.classList.remove(t)
            }
            )))
        }
          , A = function(e, t) {
            I(e, t, !0)
        }
          , E = function(e, t) {
            I(e, t, !1)
        }
          , P = function(e, t) {
            for (var n = 0; n < e.childNodes.length; n++)
                if (C(e.childNodes[n], t))
                    return e.childNodes[n]
        }
          , O = function(e) {
            e.style.opacity = "",
            e.style.display = e.id === k.content ? "block" : "flex"
        }
          , x = function(e) {
            e.style.opacity = "",
            e.style.display = "none"
        }
          , R = function(e) {
            return e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }
          , M = function() {
            return document.body.querySelector("." + k.container)
        }
          , N = function(e) {
            var t = M();
            return t ? t.querySelector("." + e) : null
        }
          , L = function() {
            return N(k.popup)
        }
          , V = function() {
            var e = L();
            return p(e.querySelectorAll("." + k.icon))
        }
          , B = function() {
            return N(k.title)
        }
          , j = function() {
            return N(k.content)
        }
          , D = function() {
            return N(k.image)
        }
          , W = function() {
            return N(k.progresssteps)
        }
          , U = function() {
            return N(k["validation-message"])
        }
          , G = function() {
            return N(k.confirm)
        }
          , F = function() {
            return N(k.cancel)
        }
          , z = function() {
            return N(k.actions)
        }
          , H = function() {
            return N(k.footer)
        }
          , q = function() {
            return N(k.close)
        }
          , Z = function() {
            var e = p(L().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((function(e, t) {
                return (e = parseInt(e.getAttribute("tabindex"))) > (t = parseInt(t.getAttribute("tabindex"))) ? 1 : e < t ? -1 : 0
            }
            ))
              , t = p(L().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter((function(e) {
                return "-1" !== e.getAttribute("tabindex")
            }
            ));
            return function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    -1 === t.indexOf(e[n]) && t.push(e[n]);
                return t
            }(e.concat(t)).filter((function(e) {
                return R(e)
            }
            ))
        }
          , Y = function() {
            return !K() && !document.body.classList.contains(k["no-backdrop"])
        }
          , K = function() {
            return document.body.classList.contains(k["toast-shown"])
        }
          , X = function() {
            return "undefined" == typeof window || "undefined" == typeof document
        }
          , J = '\n <div aria-labelledby="'.concat(k.title, '" aria-describedby="').concat(k.content, '" class="').concat(k.popup, '" tabindex="-1">\n   <div class="').concat(k.header, '">\n     <ul class="').concat(k.progresssteps, '"></ul>\n     <div class="').concat(k.icon, " ").concat(S.error, '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(k.icon, " ").concat(S.question, '">\n       <span class="').concat(k["icon-text"], '">?</span>\n      </div>\n     <div class="').concat(k.icon, " ").concat(S.warning, '">\n       <span class="').concat(k["icon-text"], '">!</span>\n      </div>\n     <div class="').concat(k.icon, " ").concat(S.info, '">\n       <span class="').concat(k["icon-text"], '">i</span>\n      </div>\n     <div class="').concat(k.icon, " ").concat(S.success, '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="').concat(k.image, '" />\n     <h2 class="').concat(k.title, '" id="').concat(k.title, '"></h2>\n     <button type="button" class="').concat(k.close, '">Ã—</button>\n   </div>\n   <div class="').concat(k.content, '">\n     <div id="').concat(k.content, '"></div>\n     <input class="').concat(k.input, '" />\n     <input type="file" class="').concat(k.file, '" />\n     <div class="').concat(k.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(k.select, '"></select>\n     <div class="').concat(k.radio, '"></div>\n     <label for="').concat(k.checkbox, '" class="').concat(k.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(k.label, '"></span>\n     </label>\n     <textarea class="').concat(k.textarea, '"></textarea>\n     <div class="').concat(k["validation-message"], '" id="').concat(k["validation-message"], '"></div>\n   </div>\n   <div class="').concat(k.actions, '">\n     <button type="button" class="').concat(k.confirm, '">OK</button>\n     <button type="button" class="').concat(k.cancel, '">Cancel</button>\n   </div>\n   <div class="').concat(k.footer, '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "")
          , $ = function(e) {
            var t = M();
            if (t && (t.parentNode.removeChild(t),
            E([document.documentElement, document.body], [k["no-backdrop"], k["toast-shown"], k["has-column"]])),
            !X()) {
                var n = document.createElement("div");
                n.className = k.container,
                n.innerHTML = J;
                var o = "string" == typeof e.target ? document.querySelector(e.target) : e.target;
                o.appendChild(n);
                var a, s = L(), i = j(), r = P(i, k.input), l = P(i, k.file), c = i.querySelector(".".concat(k.range, " input")), u = i.querySelector(".".concat(k.range, " output")), d = P(i, k.select), p = i.querySelector(".".concat(k.checkbox, " input")), f = P(i, k.textarea);
                s.setAttribute("role", e.toast ? "alert" : "dialog"),
                s.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
                e.toast || s.setAttribute("aria-modal", "true"),
                "rtl" === window.getComputedStyle(o).direction && A(M(), k.rtl);
                var g = function(e) {
                    Le.isVisible() && a !== e.target.value && Le.resetValidationMessage(),
                    a = e.target.value
                };
                return r.oninput = g,
                l.onchange = g,
                d.onchange = g,
                p.onchange = g,
                f.oninput = g,
                c.oninput = function(e) {
                    g(e),
                    u.value = c.value
                }
                ,
                c.onchange = function(e) {
                    g(e),
                    c.nextSibling.value = c.value
                }
                ,
                s
            }
            m("SweetAlert2 requires document to initialize")
        }
          , Q = function(t, n) {
            if (!t)
                return x(n);
            if (t instanceof HTMLElement)
                n.appendChild(t);
            else if ("object" === e(t))
                if (n.innerHTML = "",
                0 in t)
                    for (var o = 0; o in t; o++)
                        n.appendChild(t[o].cloneNode(!0));
                else
                    n.appendChild(t.cloneNode(!0));
            else
                t && (n.innerHTML = t);
            O(n)
        }
          , ee = function() {
            if (X())
                return !1;
            var e = document.createElement("div")
              , t = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd oanimationend",
                animation: "animationend"
            };
            for (var n in t)
                if (t.hasOwnProperty(n) && void 0 !== e.style[n])
                    return t[n];
            return !1
        }()
          , te = function(e) {
            var t = W()
              , n = parseInt(null === e.currentProgressStep ? Le.getQueueStep() : e.currentProgressStep, 10);
            e.progressSteps && e.progressSteps.length ? (O(t),
            t.innerHTML = "",
            n >= e.progressSteps.length && f("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),
            e.progressSteps.forEach((function(o, a) {
                var s = document.createElement("li");
                if (A(s, k.progresscircle),
                s.innerHTML = o,
                a === n && A(s, k.activeprogressstep),
                t.appendChild(s),
                a !== e.progressSteps.length - 1) {
                    var i = document.createElement("li");
                    A(i, k.progressline),
                    e.progressStepsDistance && (i.style.width = e.progressStepsDistance),
                    t.appendChild(i)
                }
            }
            ))) : x(t)
        }
          , ne = function() {
            null === T.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (T.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),
            document.body.style.paddingRight = T.previousBodyPadding + function() {
                if ("ontouchstart"in window || navigator.msMaxTouchPoints)
                    return 0;
                var e = document.createElement("div");
                e.style.width = "50px",
                e.style.height = "50px",
                e.style.overflow = "scroll",
                document.body.appendChild(e);
                var t = e.offsetWidth - e.clientWidth;
                return document.body.removeChild(e),
                t
            }() + "px")
        }
          , oe = function() {
            return !!window.MSInputMethodContext && !!document.documentMode
        }
          , ae = function() {
            var e = M()
              , t = L();
            e.style.removeProperty("align-items"),
            t.offsetTop < 0 && (e.style.alignItems = "flex-start")
        }
          , se = {}
          , ie = function(e, t) {
            var n = M()
              , o = L();
            if (o) {
                null !== e && "function" == typeof e && e(o),
                E(o, k.show),
                A(o, k.hide);
                var a = function() {
                    K() ? re(t) : (new Promise((function(e) {
                        var t = window.scrollX
                          , n = window.scrollY;
                        se.restoreFocusTimeout = setTimeout((function() {
                            se.previousActiveElement && se.previousActiveElement.focus ? (se.previousActiveElement.focus(),
                            se.previousActiveElement = null) : document.body && document.body.focus(),
                            e()
                        }
                        ), 100),
                        void 0 !== t && void 0 !== n && window.scrollTo(t, n)
                    }
                    )).then((function() {
                        return re(t)
                    }
                    )),
                    se.keydownTarget.removeEventListener("keydown", se.keydownHandler, {
                        capture: se.keydownListenerCapture
                    }),
                    se.keydownHandlerAdded = !1),
                    n.parentNode && n.parentNode.removeChild(n),
                    E([document.documentElement, document.body], [k.shown, k["height-auto"], k["no-backdrop"], k["toast-shown"], k["toast-column"]]),
                    Y() && (null !== T.previousBodyPadding && (document.body.style.paddingRight = T.previousBodyPadding,
                    T.previousBodyPadding = null),
                    function() {
                        if (C(document.body, k.iosfix)) {
                            var e = parseInt(document.body.style.top, 10);
                            E(document.body, k.iosfix),
                            document.body.style.top = "",
                            document.body.scrollTop = -1 * e
                        }
                    }(),
                    "undefined" != typeof window && oe() && window.removeEventListener("resize", ae),
                    p(document.body.children).forEach((function(e) {
                        e.hasAttribute("data-previous-aria-hidden") ? (e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden")),
                        e.removeAttribute("data-previous-aria-hidden")) : e.removeAttribute("aria-hidden")
                    }
                    )))
                };
                ee && !C(o, k.noanimation) ? o.addEventListener(ee, (function e() {
                    o.removeEventListener(ee, e),
                    C(o, k.hide) && a()
                }
                )) : a()
            }
        }
          , re = function(e) {
            null !== e && "function" == typeof e && setTimeout((function() {
                e()
            }
            ))
        };
        function le(e) {
            var t = function e() {
                for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                    n[o] = arguments[o];
                if (!(this instanceof e))
                    return c(e, n);
                Object.getPrototypeOf(e).apply(this, n)
            };
            return t.prototype = a(Object.create(e.prototype), {
                constructor: t
            }),
            "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e,
            t
        }
        var ce = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            type: null,
            toast: !1,
            customClass: "",
            customContainerClass: "",
            target: "body",
            backdrop: !0,
            animation: !0,
            heightAuto: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            allowEnterKey: !0,
            stopKeydownPropagation: !0,
            keydownListenerCapture: !1,
            showConfirmButton: !0,
            showCancelButton: !1,
            preConfirm: null,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: null,
            confirmButtonClass: null,
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: null,
            cancelButtonClass: null,
            buttonsStyling: !0,
            reverseButtons: !1,
            focusConfirm: !0,
            focusCancel: !1,
            showCloseButton: !1,
            closeButtonAriaLabel: "Close this dialog",
            showLoaderOnConfirm: !1,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: "",
            imageClass: null,
            timer: null,
            width: null,
            padding: null,
            background: null,
            input: null,
            inputPlaceholder: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputClass: null,
            inputAttributes: {},
            inputValidator: null,
            validationMessage: null,
            grow: !1,
            position: "center",
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: null,
            onBeforeOpen: null,
            onAfterClose: null,
            onOpen: null,
            onClose: null,
            useRejections: !1,
            expectRejections: !1
        }
          , ue = ["useRejections", "expectRejections", "extraParams"]
          , de = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"]
          , pe = function(e) {
            return ce.hasOwnProperty(e) || "extraParams" === e
        }
          , fe = function(e) {
            return -1 !== ue.indexOf(e)
        }
          , me = function(e) {
            for (var t in e)
                pe(t) || f('Unknown parameter "'.concat(t, '"')),
                e.toast && -1 !== de.indexOf(t) && f('The parameter "'.concat(t, '" is incompatible with toasts')),
                fe(t) && h('The parameter "'.concat(t, '" is deprecated and will be removed in the next major release.'))
        }
          , ge = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.'
          , he = {}
          , we = []
          , be = function() {
            var e = L();
            e || Le(""),
            e = L();
            var t = z()
              , n = G()
              , o = F();
            O(t),
            O(n),
            A([e, t], k.loading),
            n.disabled = !0,
            o.disabled = !0,
            e.setAttribute("data-loading", !0),
            e.setAttribute("aria-busy", !0),
            e.focus()
        }
          , ye = Object.freeze({
            isValidParameter: pe,
            isDeprecatedParameter: fe,
            argsToParams: function(t) {
                var n = {};
                switch (e(t[0])) {
                case "object":
                    a(n, t[0]);
                    break;
                default:
                    ["title", "html", "type"].forEach((function(o, a) {
                        switch (e(t[a])) {
                        case "string":
                            n[o] = t[a];
                            break;
                        case "undefined":
                            break;
                        default:
                            m("Unexpected type of ".concat(o, '! Expected "string", got ').concat(e(t[a])))
                        }
                    }
                    ))
                }
                return n
            },
            adaptInputValidator: function(e) {
                return function(t, n) {
                    return e.call(this, t, n).then((function() {}
                    ), (function(e) {
                        return e
                    }
                    ))
                }
            },
            close: ie,
            closePopup: ie,
            closeModal: ie,
            closeToast: ie,
            isVisible: function() {
                return !!L()
            },
            clickConfirm: function() {
                return G().click()
            },
            clickCancel: function() {
                return F().click()
            },
            getContainer: M,
            getPopup: L,
            getTitle: B,
            getContent: j,
            getImage: D,
            getIcons: V,
            getCloseButton: q,
            getButtonsWrapper: function() {
                return h("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"),
                N(k.actions)
            },
            getActions: z,
            getConfirmButton: G,
            getCancelButton: F,
            getFooter: H,
            getFocusableElements: Z,
            getValidationMessage: U,
            isLoading: function() {
                return L().hasAttribute("data-loading")
            },
            fire: function() {
                for (var e = this, t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                    n[o] = arguments[o];
                return c(e, n)
            },
            mixin: function(e) {
                return le(function(n) {
                    function r() {
                        return t(this, r),
                        u(this, i(r).apply(this, arguments))
                    }
                    return s(r, n),
                    o(r, [{
                        key: "_main",
                        value: function(t) {
                            return d(i(r.prototype), "_main", this).call(this, a({}, e, t))
                        }
                    }]),
                    r
                }(this))
            },
            queue: function(e) {
                var t = this;
                we = e;
                var n = function() {
                    we = [],
                    document.body.removeAttribute("data-swal2-queue-step")
                }
                  , o = [];
                return new Promise((function(e) {
                    !function a(s, i) {
                        s < we.length ? (document.body.setAttribute("data-swal2-queue-step", s),
                        t(we[s]).then((function(t) {
                            void 0 !== t.value ? (o.push(t.value),
                            a(s + 1, i)) : (n(),
                            e({
                                dismiss: t.dismiss
                            }))
                        }
                        ))) : (n(),
                        e({
                            value: o
                        }))
                    }(0)
                }
                ))
            },
            getQueueStep: function() {
                return document.body.getAttribute("data-swal2-queue-step")
            },
            insertQueueStep: function(e, t) {
                return t && t < we.length ? we.splice(t, 0, e) : we.push(e)
            },
            deleteQueueStep: function(e) {
                void 0 !== we[e] && we.splice(e, 1)
            },
            showLoading: be,
            enableLoading: be,
            getTimerLeft: function() {
                return se.timeout && se.timeout.getTimerLeft()
            },
            stopTimer: function() {
                return se.timeout && se.timeout.stop()
            },
            resumeTimer: function() {
                return se.timeout && se.timeout.start()
            },
            toggleTimer: function() {
                var e = se.timeout;
                return e && (e.running ? e.stop() : e.start())
            },
            increaseTimer: function(e) {
                return se.timeout && se.timeout.increase(e)
            },
            isTimerRunning: function() {
                return se.timeout && se.timeout.isRunning()
            }
        })
          , ve = "function" == typeof Symbol ? Symbol : function() {
            var e = 0;
            function t(t) {
                return "__" + t + "_" + Math.floor(1e9 * Math.random()) + "_" + ++e + "__"
            }
            return t.iterator = t("Symbol.iterator"),
            t
        }()
          , ke = "function" == typeof WeakMap ? WeakMap : function(e, t, n) {
            function o() {
                t(this, e, {
                    value: ve("WeakMap")
                })
            }
            return o.prototype = {
                delete: function(t) {
                    delete t[this[e]]
                },
                get: function(t) {
                    return t[this[e]]
                },
                has: function(t) {
                    return n.call(t, this[e])
                },
                set: function(n, o) {
                    t(n, this[e], {
                        configurable: !0,
                        value: o
                    })
                }
            },
            o
        }(ve("WeakMap"), Object.defineProperty, {}.hasOwnProperty)
          , Se = {
            promise: new ke,
            innerParams: new ke,
            domCache: new ke
        };
        function Te() {
            var e = Se.innerParams.get(this)
              , t = Se.domCache.get(this);
            e.showConfirmButton || (x(t.confirmButton),
            e.showCancelButton || x(t.actions)),
            E([t.popup, t.actions], k.loading),
            t.popup.removeAttribute("aria-busy"),
            t.popup.removeAttribute("data-loading"),
            t.confirmButton.disabled = !1,
            t.cancelButton.disabled = !1
        }
        function Ce(e) {
            var t = Se.domCache.get(this);
            t.validationMessage.innerHTML = e;
            var n = window.getComputedStyle(t.popup);
            t.validationMessage.style.marginLeft = "-".concat(n.getPropertyValue("padding-left")),
            t.validationMessage.style.marginRight = "-".concat(n.getPropertyValue("padding-right")),
            O(t.validationMessage);
            var o = this.getInput();
            o && (o.setAttribute("aria-invalid", !0),
            o.setAttribute("aria-describedBy", k["validation-message"]),
            _(o),
            A(o, k.inputerror))
        }
        function _e() {
            var e = Se.domCache.get(this);
            e.validationMessage && x(e.validationMessage);
            var t = this.getInput();
            t && (t.removeAttribute("aria-invalid"),
            t.removeAttribute("aria-describedBy"),
            E(t, k.inputerror))
        }
        var Ie = function e(n, o) {
            t(this, e);
            var a, s, i = o;
            this.running = !1,
            this.start = function() {
                return this.running || (this.running = !0,
                s = new Date,
                a = setTimeout(n, i)),
                i
            }
            ,
            this.stop = function() {
                return this.running && (this.running = !1,
                clearTimeout(a),
                i -= new Date - s),
                i
            }
            ,
            this.increase = function(e) {
                var t = this.running;
                return t && this.stop(),
                i += e,
                t && this.start(),
                i
            }
            ,
            this.getTimerLeft = function() {
                return this.running && (this.stop(),
                this.start()),
                i
            }
            ,
            this.isRunning = function() {
                return this.running
            }
            ,
            this.start()
        }
          , Ae = {
            email: function(e, t) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid email address")
            },
            url: function(e, t) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid URL")
            }
        };
        function Ee(t) {
            var n;
            t.inputValidator || Object.keys(Ae).forEach((function(e) {
                t.input === e && (t.inputValidator = t.expectRejections ? Ae[e] : Le.adaptInputValidator(Ae[e]))
            }
            )),
            t.validationMessage && ("object" !== e(t.extraParams) && (t.extraParams = {}),
            t.extraParams.validationMessage = t.validationMessage),
            (!t.target || "string" == typeof t.target && !document.querySelector(t.target) || "string" != typeof t.target && !t.target.appendChild) && (f('Target parameter is not valid, defaulting to "body"'),
            t.target = "body"),
            "function" == typeof t.animation && (t.animation = t.animation.call());
            var o = L()
              , a = "string" == typeof t.target ? document.querySelector(t.target) : t.target;
            n = o && a && o.parentNode !== a.parentNode ? $(t) : o || $(t),
            t.width && (n.style.width = "number" == typeof t.width ? t.width + "px" : t.width),
            t.padding && (n.style.padding = "number" == typeof t.padding ? t.padding + "px" : t.padding),
            t.background && (n.style.background = t.background);
            for (var s = window.getComputedStyle(n).getPropertyValue("background-color"), i = n.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), r = 0; r < i.length; r++)
                i[r].style.backgroundColor = s;
            var l = M()
              , c = q()
              , u = H();
            if (function(e) {
                var t = B();
                e.titleText ? t.innerText = e.titleText : e.title && ("string" == typeof e.title && (e.title = e.title.split("\n").join("<br />")),
                Q(e.title, t))
            }(t),
            function(e) {
                var t = j().querySelector("#" + k.content);
                e.html ? Q(e.html, t) : e.text ? (t.textContent = e.text,
                O(t)) : x(t)
            }(t),
            "string" == typeof t.backdrop ? M().style.background = t.backdrop : t.backdrop || A([document.documentElement, document.body], k["no-backdrop"]),
            !t.backdrop && t.allowOutsideClick && f('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),
            t.position in k ? A(l, k[t.position]) : (f('The "position" parameter is not valid, defaulting to "center"'),
            A(l, k.center)),
            t.grow && "string" == typeof t.grow) {
                var d = "grow-" + t.grow;
                d in k && A(l, k[d])
            }
            t.showCloseButton ? (c.setAttribute("aria-label", t.closeButtonAriaLabel),
            O(c)) : x(c),
            n.className = k.popup,
            t.toast ? (A([document.documentElement, document.body], k["toast-shown"]),
            A(n, k.toast)) : A(n, k.modal),
            t.customClass && A(n, t.customClass),
            t.customContainerClass && A(l, t.customContainerClass),
            te(t),
            function(e) {
                for (var t = V(), n = 0; n < t.length; n++)
                    x(t[n]);
                if (e.type)
                    if (-1 !== Object.keys(S).indexOf(e.type)) {
                        var o = Le.getPopup().querySelector(".".concat(k.icon, ".").concat(S[e.type]));
                        O(o),
                        e.animation && A(o, "swal2-animate-".concat(e.type, "-icon"))
                    } else
                        m('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.type, '"'))
            }(t),
            function(e) {
                var t = D();
                e.imageUrl ? (t.setAttribute("src", e.imageUrl),
                t.setAttribute("alt", e.imageAlt),
                O(t),
                e.imageWidth ? t.setAttribute("width", e.imageWidth) : t.removeAttribute("width"),
                e.imageHeight ? t.setAttribute("height", e.imageHeight) : t.removeAttribute("height"),
                t.className = k.image,
                e.imageClass && A(t, e.imageClass)) : x(t)
            }(t),
            function(e) {
                var t = z()
                  , n = G()
                  , o = F();
                if (e.showConfirmButton || e.showCancelButton ? O(t) : x(t),
                e.showCancelButton ? o.style.display = "inline-block" : x(o),
                e.showConfirmButton ? n.style.removeProperty("display") : x(n),
                n.innerHTML = e.confirmButtonText,
                o.innerHTML = e.cancelButtonText,
                n.setAttribute("aria-label", e.confirmButtonAriaLabel),
                o.setAttribute("aria-label", e.cancelButtonAriaLabel),
                n.className = k.confirm,
                A(n, e.confirmButtonClass),
                o.className = k.cancel,
                A(o, e.cancelButtonClass),
                e.buttonsStyling) {
                    A([n, o], k.styled),
                    e.confirmButtonColor && (n.style.backgroundColor = e.confirmButtonColor),
                    e.cancelButtonColor && (o.style.backgroundColor = e.cancelButtonColor);
                    var a = window.getComputedStyle(n).getPropertyValue("background-color");
                    n.style.borderLeftColor = a,
                    n.style.borderRightColor = a
                } else
                    E([n, o], k.styled),
                    n.style.backgroundColor = n.style.borderLeftColor = n.style.borderRightColor = "",
                    o.style.backgroundColor = o.style.borderLeftColor = o.style.borderRightColor = ""
            }(t),
            Q(t.footer, u),
            !0 === t.animation ? E(n, k.noanimation) : A(n, k.noanimation),
            t.showLoaderOnConfirm && !t.preConfirm && f("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
        }
        var Pe, Oe = function(e) {
            var t = M()
              , n = L();
            null !== e.onBeforeOpen && "function" == typeof e.onBeforeOpen && e.onBeforeOpen(n),
            e.animation ? (A(n, k.show),
            A(t, k.fade),
            E(n, k.hide)) : E(n, k.fade),
            O(n),
            t.style.overflowY = "hidden",
            ee && !C(n, k.noanimation) ? n.addEventListener(ee, (function e() {
                n.removeEventListener(ee, e),
                t.style.overflowY = "auto"
            }
            )) : t.style.overflowY = "auto",
            A([document.documentElement, document.body, t], k.shown),
            e.heightAuto && e.backdrop && !e.toast && A([document.documentElement, document.body], k["height-auto"]),
            Y() && (ne(),
            function() {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !C(document.body, k.iosfix)) {
                    var e = document.body.scrollTop;
                    document.body.style.top = -1 * e + "px",
                    A(document.body, k.iosfix)
                }
            }(),
            "undefined" != typeof window && oe() && (ae(),
            window.addEventListener("resize", ae)),
            p(document.body.children).forEach((function(e) {
                e === M() || function(e, t) {
                    if ("function" == typeof e.contains)
                        return e.contains(t)
                }(e, M()) || (e.hasAttribute("aria-hidden") && e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden")),
                e.setAttribute("aria-hidden", "true"))
            }
            )),
            setTimeout((function() {
                t.scrollTop = 0
            }
            ))),
            K() || se.previousActiveElement || (se.previousActiveElement = document.activeElement),
            null !== e.onOpen && "function" == typeof e.onOpen && setTimeout((function() {
                e.onOpen(n)
            }
            ))
        }, xe = Object.freeze({
            hideLoading: Te,
            disableLoading: Te,
            getInput: function(e) {
                var t = Se.innerParams.get(this)
                  , n = Se.domCache.get(this);
                if (!(e = e || t.input))
                    return null;
                switch (e) {
                case "select":
                case "textarea":
                case "file":
                    return P(n.content, k[e]);
                case "checkbox":
                    return n.popup.querySelector(".".concat(k.checkbox, " input"));
                case "radio":
                    return n.popup.querySelector(".".concat(k.radio, " input:checked")) || n.popup.querySelector(".".concat(k.radio, " input:first-child"));
                case "range":
                    return n.popup.querySelector(".".concat(k.range, " input"));
                default:
                    return P(n.content, k.input)
                }
            },
            enableButtons: function() {
                var e = Se.domCache.get(this);
                e.confirmButton.disabled = !1,
                e.cancelButton.disabled = !1
            },
            disableButtons: function() {
                var e = Se.domCache.get(this);
                e.confirmButton.disabled = !0,
                e.cancelButton.disabled = !0
            },
            enableConfirmButton: function() {
                Se.domCache.get(this).confirmButton.disabled = !1
            },
            disableConfirmButton: function() {
                Se.domCache.get(this).confirmButton.disabled = !0
            },
            enableInput: function() {
                var e = this.getInput();
                if (!e)
                    return !1;
                if ("radio" === e.type)
                    for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++)
                        t[n].disabled = !1;
                else
                    e.disabled = !1
            },
            disableInput: function() {
                var e = this.getInput();
                if (!e)
                    return !1;
                if (e && "radio" === e.type)
                    for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++)
                        t[n].disabled = !0;
                else
                    e.disabled = !0
            },
            showValidationMessage: Ce,
            resetValidationMessage: _e,
            resetValidationError: function() {
                h("Swal.resetValidationError() is deprecated and will be removed in the next major release, use Swal.resetValidationMessage() instead"),
                _e.bind(this)()
            },
            showValidationError: function(e) {
                h("Swal.showValidationError() is deprecated and will be removed in the next major release, use Swal.showValidationMessage() instead"),
                Ce.bind(this)(e)
            },
            getProgressSteps: function() {
                return Se.innerParams.get(this).progressSteps
            },
            setProgressSteps: function(e) {
                var t = a({}, Se.innerParams.get(this), {
                    progressSteps: e
                });
                Se.innerParams.set(this, t),
                te(t)
            },
            showProgressSteps: function() {
                var e = Se.domCache.get(this);
                O(e.progressSteps)
            },
            hideProgressSteps: function() {
                var e = Se.domCache.get(this);
                x(e.progressSteps)
            },
            _main: function(t) {
                var n = this;
                me(t);
                var o = a({}, ce, t);
                Ee(o),
                Object.freeze(o),
                Se.innerParams.set(this, o),
                se.timeout && (se.timeout.stop(),
                delete se.timeout),
                clearTimeout(se.restoreFocusTimeout);
                var s = {
                    popup: L(),
                    container: M(),
                    content: j(),
                    actions: z(),
                    confirmButton: G(),
                    cancelButton: F(),
                    closeButton: q(),
                    validationMessage: U(),
                    progressSteps: W()
                };
                Se.domCache.set(this, s);
                var i = this.constructor;
                return new Promise((function(t, a) {
                    var r = function(e) {
                        i.closePopup(o.onClose, o.onAfterClose),
                        o.useRejections ? t(e) : t({
                            value: e
                        })
                    }
                      , l = function(e) {
                        i.closePopup(o.onClose, o.onAfterClose),
                        o.useRejections ? a(e) : t({
                            dismiss: e
                        })
                    }
                      , c = function(e) {
                        i.closePopup(o.onClose, o.onAfterClose),
                        a(e)
                    };
                    o.timer && (se.timeout = new Ie((function() {
                        l("timer"),
                        delete se.timeout
                    }
                    ),o.timer)),
                    o.input && setTimeout((function() {
                        var e = n.getInput();
                        e && _(e)
                    }
                    ), 0);
                    for (var u = function(e) {
                        if (o.showLoaderOnConfirm && i.showLoading(),
                        o.preConfirm) {
                            n.resetValidationMessage();
                            var t = Promise.resolve().then((function() {
                                return o.preConfirm(e, o.extraParams)
                            }
                            ));
                            o.expectRejections ? t.then((function(t) {
                                return r(t || e)
                            }
                            ), (function(e) {
                                n.hideLoading(),
                                e && n.showValidationMessage(e)
                            }
                            )) : t.then((function(t) {
                                R(s.validationMessage) || !1 === t ? n.hideLoading() : r(t || e)
                            }
                            ), (function(e) {
                                return c(e)
                            }
                            ))
                        } else
                            r(e)
                    }, d = function(e) {
                        var t = e.target
                          , a = s.confirmButton
                          , r = s.cancelButton
                          , d = a && (a === t || a.contains(t))
                          , p = r && (r === t || r.contains(t));
                        switch (e.type) {
                        case "click":
                            if (d && i.isVisible())
                                if (n.disableButtons(),
                                o.input) {
                                    var f = function() {
                                        var e = n.getInput();
                                        if (!e)
                                            return null;
                                        switch (o.input) {
                                        case "checkbox":
                                            return e.checked ? 1 : 0;
                                        case "radio":
                                            return e.checked ? e.value : null;
                                        case "file":
                                            return e.files.length ? e.files[0] : null;
                                        default:
                                            return o.inputAutoTrim ? e.value.trim() : e.value
                                        }
                                    }();
                                    if (o.inputValidator) {
                                        n.disableInput();
                                        var m = Promise.resolve().then((function() {
                                            return o.inputValidator(f, o.extraParams)
                                        }
                                        ));
                                        o.expectRejections ? m.then((function() {
                                            n.enableButtons(),
                                            n.enableInput(),
                                            u(f)
                                        }
                                        ), (function(e) {
                                            n.enableButtons(),
                                            n.enableInput(),
                                            e && n.showValidationMessage(e)
                                        }
                                        )) : m.then((function(e) {
                                            n.enableButtons(),
                                            n.enableInput(),
                                            e ? n.showValidationMessage(e) : u(f)
                                        }
                                        ), (function(e) {
                                            return c(e)
                                        }
                                        ))
                                    } else
                                        n.getInput().checkValidity() ? u(f) : (n.enableButtons(),
                                        n.showValidationMessage(o.validationMessage))
                                } else
                                    u(!0);
                            else
                                p && i.isVisible() && (n.disableButtons(),
                                l(i.DismissReason.cancel))
                        }
                    }, p = s.popup.querySelectorAll("button"), g = 0; g < p.length; g++)
                        p[g].onclick = d,
                        p[g].onmouseover = d,
                        p[g].onmouseout = d,
                        p[g].onmousedown = d;
                    if (s.closeButton.onclick = function() {
                        l(i.DismissReason.close)
                    }
                    ,
                    o.toast)
                        s.popup.onclick = function() {
                            o.showConfirmButton || o.showCancelButton || o.showCloseButton || o.input || l(i.DismissReason.close)
                        }
                        ;
                    else {
                        var h = !1;
                        s.popup.onmousedown = function() {
                            s.container.onmouseup = function(e) {
                                s.container.onmouseup = void 0,
                                e.target === s.container && (h = !0)
                            }
                        }
                        ,
                        s.container.onmousedown = function() {
                            s.popup.onmouseup = function(e) {
                                s.popup.onmouseup = void 0,
                                (e.target === s.popup || s.popup.contains(e.target)) && (h = !0)
                            }
                        }
                        ,
                        s.container.onclick = function(e) {
                            h ? h = !1 : e.target === s.container && w(o.allowOutsideClick) && l(i.DismissReason.backdrop)
                        }
                    }
                    o.reverseButtons ? s.confirmButton.parentNode.insertBefore(s.cancelButton, s.confirmButton) : s.confirmButton.parentNode.insertBefore(s.confirmButton, s.cancelButton);
                    var y = function(e, t) {
                        for (var n = Z(o.focusCancel), a = 0; a < n.length; a++)
                            return (e += t) === n.length ? e = 0 : -1 === e && (e = n.length - 1),
                            n[e].focus();
                        s.popup.focus()
                    };
                    se.keydownHandlerAdded && (se.keydownTarget.removeEventListener("keydown", se.keydownHandler, {
                        capture: se.keydownListenerCapture
                    }),
                    se.keydownHandlerAdded = !1),
                    o.toast || (se.keydownHandler = function(e) {
                        return function(e, t) {
                            if (t.stopKeydownPropagation && e.stopPropagation(),
                            "Enter" !== e.key || e.isComposing)
                                if ("Tab" === e.key) {
                                    for (var o = e.target, a = Z(t.focusCancel), r = -1, c = 0; c < a.length; c++)
                                        if (o === a[c]) {
                                            r = c;
                                            break
                                        }
                                    e.shiftKey ? y(r, -1) : y(r, 1),
                                    e.stopPropagation(),
                                    e.preventDefault()
                                } else
                                    -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(e.key) ? document.activeElement === s.confirmButton && R(s.cancelButton) ? s.cancelButton.focus() : document.activeElement === s.cancelButton && R(s.confirmButton) && s.confirmButton.focus() : "Escape" !== e.key && "Esc" !== e.key || !0 !== w(t.allowEscapeKey) || (e.preventDefault(),
                                    l(i.DismissReason.esc));
                            else if (e.target && n.getInput() && e.target.outerHTML === n.getInput().outerHTML) {
                                if (-1 !== ["textarea", "file"].indexOf(t.input))
                                    return;
                                i.clickConfirm(),
                                e.preventDefault()
                            }
                        }(e, o)
                    }
                    ,
                    se.keydownTarget = o.keydownListenerCapture ? window : s.popup,
                    se.keydownListenerCapture = o.keydownListenerCapture,
                    se.keydownTarget.addEventListener("keydown", se.keydownHandler, {
                        capture: se.keydownListenerCapture
                    }),
                    se.keydownHandlerAdded = !0),
                    n.enableButtons(),
                    n.hideLoading(),
                    n.resetValidationMessage(),
                    o.toast && (o.input || o.footer || o.showCloseButton) ? A(document.body, k["toast-column"]) : E(document.body, k["toast-column"]);
                    for (var v, S, T = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], C = function(e) {
                        e.placeholder && !o.inputPlaceholder || (e.placeholder = o.inputPlaceholder)
                    }, I = 0; I < T.length; I++) {
                        var M = k[T[I]]
                          , N = P(s.content, M);
                        if (v = n.getInput(T[I])) {
                            for (var L in v.attributes)
                                if (v.attributes.hasOwnProperty(L)) {
                                    var V = v.attributes[L].name;
                                    "type" !== V && "value" !== V && v.removeAttribute(V)
                                }
                            for (var B in o.inputAttributes)
                                "range" === T[I] && "placeholder" === B || v.setAttribute(B, o.inputAttributes[B])
                        }
                        N.className = M,
                        o.inputClass && A(N, o.inputClass),
                        x(N)
                    }
                    switch (o.input) {
                    case "text":
                    case "email":
                    case "password":
                    case "number":
                    case "tel":
                    case "url":
                        v = P(s.content, k.input),
                        "string" == typeof o.inputValue || "number" == typeof o.inputValue ? v.value = o.inputValue : b(o.inputValue) || f('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(e(o.inputValue), '"')),
                        C(v),
                        v.type = o.input,
                        O(v);
                        break;
                    case "file":
                        C(v = P(s.content, k.file)),
                        v.type = o.input,
                        O(v);
                        break;
                    case "range":
                        var j = P(s.content, k.range)
                          , D = j.querySelector("input")
                          , W = j.querySelector("output");
                        D.value = o.inputValue,
                        D.type = o.input,
                        W.value = o.inputValue,
                        O(j);
                        break;
                    case "select":
                        var U = P(s.content, k.select);
                        if (U.innerHTML = "",
                        o.inputPlaceholder) {
                            var G = document.createElement("option");
                            G.innerHTML = o.inputPlaceholder,
                            G.value = "",
                            G.disabled = !0,
                            G.selected = !0,
                            U.appendChild(G)
                        }
                        S = function(e) {
                            e.forEach((function(e) {
                                var t = e[0]
                                  , n = e[1]
                                  , a = document.createElement("option");
                                a.value = t,
                                a.innerHTML = n,
                                o.inputValue.toString() === t.toString() && (a.selected = !0),
                                U.appendChild(a)
                            }
                            )),
                            O(U),
                            U.focus()
                        }
                        ;
                        break;
                    case "radio":
                        var F = P(s.content, k.radio);
                        F.innerHTML = "",
                        S = function(e) {
                            e.forEach((function(e) {
                                var t = e[0]
                                  , n = e[1]
                                  , a = document.createElement("input")
                                  , s = document.createElement("label");
                                a.type = "radio",
                                a.name = k.radio,
                                a.value = t,
                                o.inputValue.toString() === t.toString() && (a.checked = !0);
                                var i = document.createElement("span");
                                i.innerHTML = n,
                                i.className = k.label,
                                s.appendChild(a),
                                s.appendChild(i),
                                F.appendChild(s)
                            }
                            )),
                            O(F);
                            var t = F.querySelectorAll("input");
                            t.length && t[0].focus()
                        }
                        ;
                        break;
                    case "checkbox":
                        var z = P(s.content, k.checkbox)
                          , H = n.getInput("checkbox");
                        H.type = "checkbox",
                        H.value = 1,
                        H.id = k.checkbox,
                        H.checked = Boolean(o.inputValue),
                        z.querySelector("span").innerHTML = o.inputPlaceholder,
                        O(z);
                        break;
                    case "textarea":
                        var q = P(s.content, k.textarea);
                        q.value = o.inputValue,
                        C(q),
                        O(q);
                        break;
                    case null:
                        break;
                    default:
                        m('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(o.input, '"'))
                    }
                    if ("select" === o.input || "radio" === o.input) {
                        var Y = function(e) {
                            return S(function(e) {
                                var t = [];
                                return "undefined" != typeof Map && e instanceof Map ? e.forEach((function(e, n) {
                                    t.push([n, e])
                                }
                                )) : Object.keys(e).forEach((function(n) {
                                    t.push([n, e[n]])
                                }
                                )),
                                t
                            }(e))
                        };
                        b(o.inputOptions) ? (i.showLoading(),
                        o.inputOptions.then((function(e) {
                            n.hideLoading(),
                            Y(e)
                        }
                        ))) : "object" === e(o.inputOptions) ? Y(o.inputOptions) : m("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(e(o.inputOptions)))
                    } else
                        -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(o.input) && b(o.inputValue) && (i.showLoading(),
                        x(v),
                        o.inputValue.then((function(e) {
                            v.value = "number" === o.input ? parseFloat(e) || 0 : e + "",
                            O(v),
                            v.focus(),
                            n.hideLoading()
                        }
                        )).catch((function(e) {
                            m("Error in inputValue promise: " + e),
                            v.value = "",
                            O(v),
                            v.focus(),
                            n.hideLoading()
                        }
                        )));
                    Oe(o),
                    o.toast || (w(o.allowEnterKey) ? o.focusCancel && R(s.cancelButton) ? s.cancelButton.focus() : o.focusConfirm && R(s.confirmButton) ? s.confirmButton.focus() : y(-1, 1) : document.activeElement && "function" == typeof document.activeElement.blur && document.activeElement.blur()),
                    s.container.scrollTop = 0
                }
                ))
            }
        });
        function Re() {
            if ("undefined" != typeof window) {
                "undefined" == typeof Promise && m("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"),
                Pe = this;
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                    t[n] = arguments[n];
                var o = Object.freeze(this.constructor.argsToParams(t));
                Object.defineProperties(this, {
                    params: {
                        value: o,
                        writable: !1,
                        enumerable: !0
                    }
                });
                var a = this._main(this.params);
                Se.promise.set(this, a)
            }
        }
        Re.prototype.then = function(e, t) {
            return Se.promise.get(this).then(e, t)
        }
        ,
        Re.prototype.catch = function(e) {
            return Se.promise.get(this).catch(e)
        }
        ,
        Re.prototype.finally = function(e) {
            return Se.promise.get(this).finally(e)
        }
        ,
        a(Re.prototype, xe),
        a(Re, ye),
        Object.keys(xe).forEach((function(e) {
            Re[e] = function() {
                var t;
                if (Pe)
                    return (t = Pe)[e].apply(t, arguments)
            }
        }
        )),
        Re.DismissReason = y,
        Re.noop = function() {}
        ;
        var Me, Ne, Le = le((Ne = function(n) {
            function r() {
                return t(this, r),
                u(this, i(r).apply(this, arguments))
            }
            return s(r, n),
            o(r, [{
                key: "_main",
                value: function(e) {
                    return d(i(r.prototype), "_main", this).call(this, a({}, he, e))
                }
            }], [{
                key: "setDefaults",
                value: function(t) {
                    if (h(ge),
                    !t || "object" !== e(t))
                        throw new TypeError("SweetAlert2: The argument for setDefaults() is required and has to be a object");
                    me(t),
                    Object.keys(t).forEach((function(e) {
                        Me.isValidParameter(e) && (he[e] = t[e])
                    }
                    ))
                }
            }, {
                key: "resetDefaults",
                value: function() {
                    h(ge),
                    he = {}
                }
            }]),
            r
        }(Me = Re),
        "undefined" != typeof window && "object" === e(window._swalDefaults) && Ne.setDefaults(window._swalDefaults),
        Ne));
        return Le.default = Le,
        Le
    }(),
    "undefined" != typeof window && window.Sweetalert2 && (window.Sweetalert2.version = "7.33.1",
    window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2),
    "undefined" != typeof document && function(e, t) {
        var n = e.createElement("style");
        if (e.getElementsByTagName("head")[0].appendChild(n),
        n.styleSheet)
            n.styleSheet.disabled || (n.styleSheet.cssText = t);
        else
            try {
                n.innerHTML = t
            } catch (e) {
                n.innerText = t
            }
    }(document, "@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;box-shadow:0 0 .625em #d9d9d9;overflow-y:hidden}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon-text{font-size:2em;font-weight:700;line-height:1em}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:10px;background-color:transparent;z-index:1060;overflow-x:hidden;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem;box-sizing:border-box}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{flex-wrap:wrap;align-items:center;justify-content:center;margin:1.25em auto 0;z-index:1}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{width:2.5em;height:2.5em;margin:.46875em;padding:0;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;box-sizing:border-box;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{display:inline-block;width:15px;height:15px;margin-left:5px;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff;content:'';-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal}.swal2-popup .swal2-styled{margin:.3125em;padding:.625em 2em;font-weight:500;box-shadow:none}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer;overflow:hidden}.swal2-popup .swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;z-index:1;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;font-size:1.125em;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);box-sizing:border-box}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file::-webkit-input-placeholder,.swal2-popup .swal2-input::-webkit-input-placeholder,.swal2-popup .swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::-ms-input-placeholder,.swal2-popup .swal2-input::-ms-input-placeholder,.swal2-popup .swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;margin:1em auto;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:0 .75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;background:#f0f0f0;color:#666;font-size:1em;font-weight:300;overflow:hidden}.swal2-popup .swal2-validation-message::before{display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center;content:'!';zoom:normal}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;zoom:normal}.swal2-icon-text{font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;top:-.25em;left:-.25em;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%;z-index:2;box-sizing:content-box}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);z-index:1}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;height:.3125em;border-radius:.125em;background-color:#a5dc86;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progresssteps{align-items:center;margin:0 0 1.25em;padding:0;font-weight:600}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center;z-index:20}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle{background:#add8e6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{width:2.5em;height:.4em;margin:0 -1px;background:#3085d6;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:initial!important}}")
}
, function(e, t, n) {
    "use strict";
    function o(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }
            ))),
            n.push.apply(n, o)
        }
        return n
    }
    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    n.r(t);
    var s = {
        AUTH_URL: "https://trulience.com/auth",
        EVICT_URL: "https://trulience.com/evict",
        WEBSOCKET_URL: "wss://trulience.com/socket"
    };
    console.log("envConfig => ", s);
    var i = function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? o(Object(n), !0).forEach((function(t) {
                a(e, t, n[t])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }
            ))
        }
        return e
    }({
        DEFAULT_SPOKEN_LANG: "en-US",
        DEFAULT_VIEWED_LANG: "aa",
        TRULIENCE_COOKIE_NAME: "trulience.ai.sessionId",
        APP_KEY: "000200d200730075007500640071009200e2000200b500a1001100b50043004200320095000500c500e5009600d2003200c500e5007400850012004200f600050085000400b400d200420003001400a1001100a50092001300b300f100b400b500e500c20053001300f100b000200080001700c60007002000b00020",
        AWS_POLLY: {
            amazonAPIKey: "us-east-1:212a7e49-c52e-451d-8905-9749fda21b0a",
            awsRegion: "us-east-1",
            awsApiVersion: "2016-06-10",
            awsVoiceId: "Amy",
            awsSampleRate: "22050",
            speechMarkTypes: ["word", "viseme"],
            isSSML: !1
        },
        eventTypes: {
            WebSocket: "WS",
            SpeechRecognition: "SR"
        },
        WebSocketEvents: {
            onOpen: "onOpen",
            onMessage: "onMessage",
            onError: "onError",
            onClose: "onClose"
        },
        SpeechRecognitionEvents: {
            onStart: "onStart",
            onInterimTranscript: "onInterimTranscript",
            onFinalTranscript: "onFinalTranscript",
            onError: "onError",
            onEnd: "onEnd"
        }
    }, s)
      , r = {
        Auth: 0,
        Connect: 1,
        UserPreferences: 2,
        ChatText: 3,
        GoogleSpeechLimitReached: 4,
        WebSocketLimitReached: 5,
        SocketPingPong: 6,
        Close: 7,
        WarningMessage: 8,
        AssignMediaEndPoints: 9,
        UploadClientLogs: 10,
        AdminSocket: 11,
        AdminSocketAction: 12,
        EchoTest: 13,
        VPS_NOT_AVAILABLE: 14,
        VPS_ASSIGNED: 15,
        ReleaseMediaEndPoints: 16,
        EvictDevice: 17,
        UpdateAvatarState: 18,
        MediaConnected: 19,
        UserTyping: 20,
        ChatHistory: 21,
        AgoraPayload: 22,
        ImageDetails: 23
    }
      , l = "Android"
      , c = "iOS"
      , u = "WindowsPhone"
      , d = "WebBrowser";
    function p(e, t) {
        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
            if (Array.isArray(e) || (n = function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return f(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return f(e, t)
            }(e)) || t && e && "number" == typeof e.length) {
                n && (e = n);
                var o = 0
                  , a = function() {};
                return {
                    s: a,
                    n: function() {
                        return o >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[o++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: a
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var s, i = !0, r = !1;
        return {
            s: function() {
                n = n.call(e)
            },
            n: function() {
                var e = n.next();
                return i = e.done,
                e
            },
            e: function(e) {
                r = !0,
                s = e
            },
            f: function() {
                try {
                    i || null == n.return || n.return()
                } finally {
                    if (r)
                        throw s
                }
            }
        }
    }
    function f(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++)
            o[n] = e[n];
        return o
    }
    function m(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var g = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "generateUniqueId",
            value: function() {
                return "_" + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9)
            }
        }, {
            key: "get",
            value: function(e) {
                if (e = new RegExp("[?&]" + encodeURIComponent(e) + "=([^&]*)").exec(location.search))
                    return decodeURIComponent(e[1])
            }
        }, {
            key: "overrideFromUrlParams",
            value: function(t, n, o) {
                var a = null;
                try {
                    a = e.get(t)
                } catch (e) {
                    console.log(e)
                }
                if (null !== a && "undefined" !== a && void 0 !== a && "null" !== a && "" !== a && a.trim().length > 0)
                    if (a = a.trim(),
                    "INT" === n)
                        o[t] = parseInt(a);
                    else if ("BOOL" === n) {
                        var s = "true" === a;
                        o[t] = s
                    } else
                        o[t] = a
            }
        }, {
            key: "storeCookie",
            value: function(e, t) {
                var n = e.avatarId;
                if (!e.userId) {
                    var o = {}
                      , a = localStorage.getItem(i.TRULIENCE_COOKIE_NAME);
                    a ? (o = JSON.parse(a))[n] = t : o[n] = t,
                    localStorage.setItem(i.TRULIENCE_COOKIE_NAME, JSON.stringify(o))
                }
            }
        }, {
            key: "readCookie",
            value: function(e) {
                var t = localStorage.getItem(i.TRULIENCE_COOKIE_NAME);
                if (t)
                    try {
                        return JSON.parse(t)[e]
                    } catch (e) {
                        console.log(e),
                        localStorage.removeItem(i.TRULIENCE_COOKIE_NAME)
                    }
                return null
            }
        }, {
            key: "readCookieValue",
            value: function(e) {
                var t = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)");
                return console.log("readCookieValue:   name = " + e + ",   value = " + t),
                t ? t.pop() : null
            }
        }, {
            key: "isNotNull",
            value: function(e) {
                return null !== e && "null" !== e && "undefined" !== e && void 0 !== e && "" !== e && e.trim().length > 0
            }
        }, {
            key: "isNull",
            value: function(e) {
                return null === e || "null" === e || "undefined" === e || void 0 === e || "" === e || 0 === e.trim().length
            }
        }, {
            key: "detectDeviceOS",
            value: function() {
                return navigator.userAgent.match(/Android/i) ? l : navigator.userAgent.match(/iPhone|iPad|iPod/i) ? c : navigator.userAgent.match(/Windows Phone/i) ? u : d
            }
        }, {
            key: "splitTokens",
            value: function(t, n) {
                if (!n)
                    return [];
                var o, a = [], s = p(t.split(/(<.*?>)/g));
                try {
                    for (s.s(); !(o = s.n()).done; ) {
                        var i = o.value;
                        i.startsWith("<") ? a.push(e.buildTRLObject(i)) : a.push(e.buildTEXTObject(i))
                    }
                } catch (e) {
                    s.e(e)
                } finally {
                    s.f()
                }
                return a
            }
        }, {
            key: "buildTRLObject",
            value: function(e) {
                var t = {};
                try {
                    for (var n = (new DOMParser).parseFromString(e, "text/xml").getElementsByTagName("*"), o = 0; o < n.length; o++) {
                        t = {
                            type: "XML",
                            content: e,
                            name: n[o].nodeName,
                            value: n[o].firstChild ? n[o].firstChild.nodeValue : "",
                            attributes: {}
                        };
                        var a, s = p(n[o].attributes);
                        try {
                            for (s.s(); !(a = s.n()).done; ) {
                                var i = a.value;
                                t.attributes[i.name] = i.value
                            }
                        } catch (e) {
                            s.e(e)
                        } finally {
                            s.f()
                        }
                    }
                } catch (e) {
                    console.log(e)
                }
                return t
            }
        }, {
            key: "buildTEXTObject",
            value: function(e) {
                return {
                    type: "TEXT",
                    content: e
                }
            }
        }],
        (n = null) && m(t.prototype, n),
        o && m(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function h(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t && (o = o.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }
            ))),
            n.push.apply(n, o)
        }
        return n
    }
    function w(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? h(Object(n), !0).forEach((function(t) {
                b(e, t, n[t])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : h(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }
            ))
        }
        return e
    }
    function b(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    function y(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var v = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this._sessionId = null,
            this._retryCount = 0,
            this._retryTask = null
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "getInstance",
            value: function() {
                return e._INSTANCE || (e._INSTANCE = new e),
                e._INSTANCE
            }
        }],
        (n = [{
            key: "sessionId",
            get: function() {
                return this._sessionId
            },
            set: function(e) {
                this._sessionId = e
            }
        }, {
            key: "getSessionId",
            value: function() {
                return this._sessionId
            }
        }, {
            key: "retryCount",
            get: function() {
                return this._retryCount
            },
            set: function(e) {
                this._retryCount = e
            }
        }, {
            key: "retryTask",
            get: function() {
                return this._retryTask
            },
            set: function(e) {
                this._retryTask = e
            }
        }, {
            key: "login",
            value: function(t, n) {
                var o = this;
                console.log("LOGIN:  authReq =", w(w({}, t), {}, {
                    appKey: ""
                })),
                console.log("LOGIN:  AUTH_URL =" + i.AUTH_URL),
                fetch(i.AUTH_URL, {
                    method: "POST",
                    body: JSON.stringify(t),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                }).then((function(e) {
                    return e.json()
                }
                )).then((function(e) {
                    console.log("Auth Response :: ", e),
                    o._retryTask && (clearInterval(o._retryTask),
                    o._retryTask = null,
                    o._retryCount = 0);
                    var a = e.status;
                    "OK" === a ? (console.log("Authentication successful...sessionId = " + e.sessionId),
                    o._sessionId = e.sessionId,
                    g.storeCookie(t, o._sessionId),
                    $.getInstance().userName = e.userName,
                    $.getInstance().agentName = e.agentName,
                    $.getInstance().setUserId(e.userId),
                    n(o._sessionId)) : "PASSED" === a ? ($.getInstance().setOauth(e.oauth),
                    $.getInstance().callBackToClient("Auth", "onReady", e)) : (e.oauth && g.storeCookie(t, e.sessionId),
                    $.getInstance().callBackToClient("Auth", "onFail", e))
                }
                )).catch((function(a) {
                    console.log("Network Error while login => "),
                    console.log(a),
                    console.log("readyState = ".concat(a.readyState)),
                    console.log("status = ".concat(a.status)),
                    console.log("statusText = ".concat(a.statusText)),
                    4 === a.readyState || XMLHttpRequest.readyState,
                    o._retryTask = setTimeout((function() {
                        var o = e.getInstance().retryCount;
                        console.log("".concat(this._retryCount, " = ").concat(o)),
                        e.getInstance().retryCount = o + 1,
                        console.log("Retry Login..._retryCount = ".concat(e.getInstance().retryCount)),
                        e.getInstance().login(t, n)
                    }
                    ), 5e3)
                }
                ))
            }
        }]) && y(t.prototype, n),
        o && y(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    v._INSTANCE = null;
    var k = v;
    function S(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var T = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this._credentials = null
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "newInstance",
            value: function() {
                return e._INSTANCE = new e,
                e._INSTANCE
            }
        }, {
            key: "getInstance",
            value: function() {
                return e._INSTANCE
            }
        }],
        (n = [{
            key: "buildCredentials",
            value: function(e, t, n, o, a, s, l, c) {
                return this._credentials = {},
                this.credentials.avatarId = e,
                t && (this.credentials.userId = t),
                this.credentials.userName = n || "Guest",
                this.credentials.messageType = r.Auth,
                this.credentials.appKey = i.APP_KEY,
                this.credentials.sessionId = g.readCookie(e),
                this.credentials.deviceOS = g.detectDeviceOS(),
                this.credentials.nlpRedirect = window.location.href,
                this.credentials.timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone,
                o && (this.credentials.vps = o),
                this.credentials.assignVPS = a,
                s && (this.credentials.accessToken = s),
                this.credentials.isOperator = l,
                this.credentials.mode = c,
                this
            }
        }, {
            key: "credentials",
            get: function() {
                return this._credentials
            }
        }]) && S(t.prototype, n),
        o && S(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    T._INSTANCE = null;
    var C = T;
    function _(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var I = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this._indexPointer = 0,
            this._screenId = null
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "getInstance",
            value: function() {
                return e._INSTANCE ? e._INSTANCE : e._INSTANCE = new e
            }
        }],
        (n = [{
            key: "setScreenId",
            value: function(e) {
                this._screenId = e || "results"
            }
        }, {
            key: "incrementIndexPointer",
            value: function() {
                this._indexPointer += 1
            }
        }, {
            key: "indexPointer",
            get: function() {
                return this._indexPointer
            }
        }, {
            key: "writeMsgToScreen",
            value: function(e, t, n, o, a) {
                var s = "";
                s = "agent" === n ? Trulience.getInstance().agentName : Trulience.getInstance().userName;
                var i = document.getElementById(this._screenId);
                if (i && e) {
                    var r = null
                      , l = n + "_p_msg_" + this.indexPointer;
                    document.getElementById(l) ? ((r = document.getElementById(l)).style.wordWrap = "break-word",
                    r.style.color = t,
                    r.style.lineHeight = "normal",
                    "agent" === n ? r.innerHTML += "<BR/> ".concat(e) : r.innerHTML = a ? e : "<strong>@".concat(s, ":</strong> ").concat(e)) : ((r = document.createElement("p")).id = l,
                    r.style.wordWrap = "break-word",
                    r.style.color = t,
                    r.style.lineHeight = "normal",
                    r.innerHTML = a ? e : "<strong>@".concat(s, ":</strong> ").concat(e),
                    i.appendChild(r)),
                    i.scrollTop = i.scrollHeight,
                    o && this.incrementIndexPointer()
                }
            }
        }, {
            key: "scrollToTop",
            value: function() {
                var e = document.getElementById(this._screenId);
                e && (e.scrollTop = e.scrollHeight)
            }
        }, {
            key: "scrollToBottom",
            value: function() {
                var e = document.getElementById(this._screenId);
                e && (e.scrollTop = 0)
            }
        }, {
            key: "writeToScreen",
            value: function(e) {
                var t = document.getElementById(this._screenId);
                if (t) {
                    var n = document.createElement("p");
                    n.style.wordWrap = "break-word",
                    n.innerHTML = e,
                    t.appendChild(n)
                }
            }
        }, {
            key: "writeImageToScreen",
            value: function(e) {
                var t = document.getElementById(this._screenId);
                if (t) {
                    var n = document.createElement("img");
                    n.style.width = "100%",
                    n.style.height = "75%",
                    n.src = e,
                    t.appendChild(n),
                    t.scrollTop = t.scrollHeight
                }
            }
        }]) && _(t.prototype, n),
        o && _(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    I._INSTANCE = null;
    var A = I
      , E = {
        DISCONNECTED: 0,
        CONNECTING: 1,
        CONNECTED: 2,
        TERMINATED: 3
    }
      , P = {
        WAITING: 4,
        BUSY: 5,
        ASSIGNED: 6,
        CONNECTING: 7,
        CONNECTED: 8,
        DISCONNECTED: 9
    }
      , O = {
        HANGED_UP: 0,
        DISCONNECTED: 1,
        FAILED: 2,
        UNAUTHORISED: 3
    };
    function x(e, t) {
        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
            if (Array.isArray(e) || (n = function(e, t) {
                if (!e)
                    return;
                if ("string" == typeof e)
                    return R(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                "Object" === n && e.constructor && (n = e.constructor.name);
                if ("Map" === n || "Set" === n)
                    return Array.from(e);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                    return R(e, t)
            }(e)) || t && e && "number" == typeof e.length) {
                n && (e = n);
                var o = 0
                  , a = function() {};
                return {
                    s: a,
                    n: function() {
                        return o >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[o++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: a
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var s, i = !0, r = !1;
        return {
            s: function() {
                n = n.call(e)
            },
            n: function() {
                var e = n.next();
                return i = e.done,
                e
            },
            e: function(e) {
                r = !0,
                s = e
            },
            f: function() {
                try {
                    i || null == n.return || n.return()
                } finally {
                    if (r)
                        throw s
                }
            }
        }
    }
    function R(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++)
            o[n] = e[n];
        return o
    }
    function M(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var N = function() {
        function e(t, n) {
            var o, a, s, l = this;
            if (function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            s = function() {
                var e = {
                    messageType: r.SocketPingPong,
                    sessionId: l._sessionId,
                    message: "PING"
                };
                l._websocket && l._websocket.readyState === l._websocket.OPEN && l._websocket.send(JSON.stringify(e))
            }
            ,
            (a = "pingServer")in (o = this) ? Object.defineProperty(o, a, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : o[a] = s,
            !t)
                throw "Invalid SessionId";
            this._sessionId = t,
            this._langPref = n || i.DEFAULT_SPOKEN_LANG,
            this._websocket = null,
            this._pingTimerId = null,
            e._INSTANCE = this
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "getInstance",
            value: function() {
                return e._INSTANCE
            }
        }, {
            key: "build",
            value: function(t, n) {
                return n ? new e(t,n) : new e(t)
            }
        }],
        (n = [{
            key: "isWebSocketSupportedInBrowser",
            value: function() {
                return "WebSocket"in window
            }
        }, {
            key: "connect",
            value: function() {
                var e = this;
                if (!1 !== this.isWebSocketSupportedInBrowser()) {
                    var t = {
                        messageType: r.Connect,
                        sessionId: this._sessionId
                    }
                      , n = i.WEBSOCKET_URL + "?jsonRequest=" + encodeURI(JSON.stringify(t));
                    this._websocket = new WebSocket(n),
                    this._websocket.onopen = function(t) {
                        return e.onOpen(t)
                    }
                    ,
                    this._websocket.onmessage = function(t) {
                        return e.onMessage(t)
                    }
                    ,
                    this._websocket.onerror = function(t) {
                        return e.onError(t)
                    }
                    ,
                    this._websocket.onclose = function(t) {
                        return e.onClose(t)
                    }
                } else
                    console.log("Sorry! Your web browser does not support WebSocket")
            }
        }, {
            key: "onOpen",
            value: function() {
                console.log("You have have successfully connected to the server"),
                this.sendLanguagePreferences(),
                this._pingTimerId = setInterval(this.pingServer, 15e3)
            }
        }, {
            key: "onMessage",
            value: function(t) {
                console.log("Message Received: " + t.data);
                var n = JSON.parse(t.data)
                  , o = n.messageType;
                if ($.getInstance().isTerminated() && o !== r.ReleaseMediaEndPoints)
                    console.log("STATE = TERMINATED STATE => user ended call...");
                else {
                    if (o === r.Connect && (console.log("WebSocket Connected Successfully!!"),
                    $.getInstance().setTGStatus($.TGStatus.CONNECTED),
                    $.getInstance().hasAgoraPayload() ? (console.log("Agora Payload case => calling - assignMediaEndPoints()"),
                    e.getInstance().assignMediaEndPoints()) : $.getInstance().connectMedia(),
                    $.getInstance().callBackToClient("WebSocket", "onOpen", n)),
                    o === r.ChatText) {
                        try {
                            n.messageArray[0].messageTokens = g.splitTokens(n.messageArray[0].message, n.messageArray[0].is_ssml)
                        } catch (e) {
                            console.log(e),
                            n.messageArray[0].messageTokens = []
                        }
                        $.getInstance().callBackToClient("WebSocket", "onMessage", n)
                    }
                    if (o !== r.GoogleSpeechLimitReached && o !== r.WebSocketLimitReached && o !== r.WarningMessage || $.getInstance().callBackToClient("WebSocket", "onWarn", n.message),
                    o === r.AssignMediaEndPoints && (console.log("Event: 9 - AssignMediaEndPoints => webRTCServer = " + n.webRTCServer + ", vpsStatus = " + n.vpsStatus),
                    "ASSIGNED" === n.vpsStatus ? ($.getInstance().setVPSStatus(P.ASSIGNED),
                    $.getInstance().setVPSAddress(n.vpsAddress),
                    $.getInstance().setVPSPort(n.vpsPort),
                    $.getInstance().callBackToClient("Media", "onConnecting", n),
                    $.getInstance().hasAgoraPayload() ? this.sendAgoraPayloadToTG() : $.getInstance().dialRTC(n.webRTCServer)) : "WAITING" === n.vpsStatus ? ($.getInstance().setVPSStatus(P.WAITING),
                    $.getInstance().callBackToClient("Media", "onWaiting", n)) : "BUSY" === n.vpsStatus && ($.getInstance().setVPSStatus(P.BUSY),
                    $.getInstance().callBackToClient("Media", "onBusy", n))),
                    o === r.UpdateAvatarState && $.getInstance().callBackToClient("Media", "avatarStatus", n),
                    o === r.ImageDetails && $.getInstance().callBackToClient("WebSocket", "onMessage", n),
                    o === r.ReleaseMediaEndPoints && (console.info("Websocket disconnect - ReleaseMediaEndPoints"),
                    $.getInstance().disconnectMedia(),
                    e.getInstance().disconnect(),
                    $.getInstance().setVPSStatus(P.DISCONNECTED),
                    $.getInstance().callBackToClient("Media", "onDisconnect", n)),
                    o === r.VPS_NOT_AVAILABLE && $.getInstance().callBackToClient("WebSocket", "onError", n),
                    o === r.VPS_ASSIGNED && $.getInstance().callBackToClient("WebSocket", "onMessage", n),
                    o === r.ChatHistory) {
                        if (n.cachedChat && n.cachedChat.length > 0) {
                            var a, s = x(n.cachedChat);
                            try {
                                for (s.s(); !(a = s.n()).done; ) {
                                    var i = a.value;
                                    try {
                                        i.messageArray[0].messageTokens = g.splitTokens(i.messageArray[0].message, i.messageArray[0].is_ssml)
                                    } catch (e) {
                                        console.log(e),
                                        i.messageArray[0].messageTokens = []
                                    }
                                }
                            } catch (e) {
                                s.e(e)
                            } finally {
                                s.f()
                            }
                        }
                        $.getInstance().callBackToClient("WebSocket", "onMessage", n)
                    }
                }
            }
        }, {
            key: "onError",
            value: function(e) {
                console.error("WebSocket Error"),
                A.getInstance().writeToScreen('<span style="color: red;">ERROR:</span> ' + e.data),
                clearInterval(this._pingTimerId),
                $.getInstance().callBackToClient("WebSocket", "onError", {})
            }
        }, {
            key: "onClose",
            value: function() {
                console.info("In WebSocketAgent.onClose"),
                A.getInstance().writeToScreen('<span style="color: red;">WebSocket Connection Closed</span> '),
                clearInterval(this._pingTimerId);
                var e = {
                    reason: 1,
                    messageType: 7,
                    message: "WebSocket Connection Closed",
                    vpsStatus: "DISCONNECTED",
                    failReason: 0,
                    sessionId: $.getInstance().getSessionId(),
                    resultType: 1,
                    status: status
                };
                $.getInstance().setTGStatus($.TGStatus.DISCONNECTED),
                $.getInstance().setVPSStatus($.VPSStatus.DISCONNECTED),
                $.getInstance().isOauth() && $.getInstance().setUserId(null),
                console.info("WebSocketAgent.onClose - Will now disconnectMedia"),
                $.getInstance().disconnectMedia(),
                $.getInstance().callBackToClient("WebSocket", "onClose", e)
            }
        }, {
            key: "isWebSocketOpen",
            value: function() {
                return null !== this._websocket && this._websocket.readyState === this._websocket.OPEN
            }
        }, {
            key: "disconnect",
            value: function() {
                console.log("In WebSocketManager disconnect"),
                clearInterval(this._pingTimerId),
                null !== this._websocket && (this._websocket.onopen = null,
                this._websocket.onmessage = null,
                this._websocket.onerror = null,
                this._websocket.onclose = null),
                null !== this._websocket && this._websocket.readyState === this._websocket.OPEN && (console.log("...attempting to close WebSocket"),
                this._websocket.close(),
                this._websocket = null,
                console.log("WebSocket Closed!!"),
                $.getInstance().setTGStatus($.TGStatus.DISCONNECTED),
                $.getInstance().isOauth() && $.getInstance().setUserId(null),
                $.getInstance().callBackToClient("WebSocket", "onClose", {}))
            }
        }, {
            key: "sendLanguagePreferences",
            value: function() {
                console.log("sendLanguagePreferences...sessionId = " + this._sessionId + ",  langPref = " + this._langPref);
                var e = {
                    messageType: r.UserPreferences,
                    sessionId: this._sessionId,
                    spokenLanguage: this._langPref,
                    viewedLanguage: i.DEFAULT_VIEWED_LANG
                };
                this._websocket.send(JSON.stringify(e))
            }
        }, {
            key: "assignMediaEndPoints",
            value: function() {
                $.getInstance().setVPSStatus(P.CONNECTING),
                console.log("assignMediaEndPoints...sessionId = " + this._sessionId);
                var e = {
                    messageType: r.AssignMediaEndPoints,
                    sessionId: this._sessionId
                };
                this._websocket.send(JSON.stringify(e))
            }
        }, {
            key: "sendMediaConnectedToTG",
            value: function() {
                var e = {
                    messageType: r.MediaConnected,
                    sessionId: this._sessionId
                };
                console.log("sendMediaConnectedToTG --- jReq = ", e),
                this._websocket.send(JSON.stringify(e))
            }
        }, {
            key: "releaseMediaEndPoints",
            value: function(e) {
                console.log("releaseMediaEndPoints...sessionId = " + this._sessionId + ", reason = " + e),
                null == e && (e = O.DISCONNECTED);
                var t = {
                    messageType: r.ReleaseMediaEndPoints,
                    sessionId: this._sessionId,
                    reason: e
                };
                this._websocket && this._websocket.readyState === this._websocket.OPEN ? this._websocket.send(JSON.stringify(t)) : console.log("WebSocket Already Closed!")
            }
        }, {
            key: "sendAgoraPayloadToTG",
            value: function() {
                var e = {
                    messageType: r.AgoraPayload,
                    sessionId: this._sessionId,
                    payload: $.getInstance().getAgoraPayload()
                };
                console.log("sendAgoraPayloadToTG --- jReq = ", e),
                this._websocket.send(JSON.stringify(e))
            }
        }, {
            key: "sendMessageToTrulienceGateway",
            value: function(e) {
                var t = {
                    messageType: r.ChatText,
                    sessionId: this._sessionId,
                    messageArray: [{
                        message: e
                    }]
                };
                if (this._websocket.readyState === this._websocket.OPEN)
                    this._websocket.send(JSON.stringify(t));
                else {
                    var n = "@<b>ERROR</b>: Connection Lost with Server, Please refresh browser. This may be caused due to you have reached your daily usage limit";
                    A.getInstance().writeToScreen("<span style='color: red;'>" + n + "</span>");
                    var o = {
                        sessionId: this._sessionId,
                        status: "FAIL",
                        errorCode: -1003,
                        message: n,
                        errorMessage: n
                    };
                    $.getInstance().callBackToClient("WebSocket", "onError", o)
                }
            }
        }, {
            key: "sendResetMsg",
            value: function() {
                var e = {
                    messageType: r.ChatText,
                    userName: "ChromeGuest",
                    sessionId: this._sessionId,
                    message: ":reset"
                };
                console.log("sendResetMsg JSON = " + JSON.stringify(e)),
                this._websocket.readyState === this._websocket.OPEN ? this._websocket.send(JSON.stringify(e)) : A.getInstance().writeToScreen("<span style='color: red;'>@<b>ERROR</b>: Connection Lost with Server, Please refresh browser. This may be caused due to you have reached your daily usage limit</span>")
            }
        }, {
            key: "uploadClientLogsToTG",
            value: function(e) {
                var t = {
                    messageType: r.UploadClientLogs,
                    sessionId: this._sessionId,
                    message: e
                };
                this._websocket && this._websocket.readyState === this._websocket.OPEN && this._websocket.send(JSON.stringify(t))
            }
        }, {
            key: "sendUserTypingSignal",
            value: function(e) {
                var t = {
                    messageType: r.UserTyping,
                    sessionId: this._sessionId,
                    userTyping: !!e
                };
                this._websocket.send(JSON.stringify(t))
            }
        }]) && M(t.prototype, n),
        o && M(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    N._INSTANCE = null;
    var L = N;
    function V(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var B = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, n, o;
        return t = e,
        (n = [{
            key: "ScreenAngledSmallRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenAngledSmallRight' />")
            }
        }, {
            key: "ScreenAngledMediumRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenAngledMediumRight' />")
            }
        }, {
            key: "ScreenFlatLargeCenterAvatarFull",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatLargeAvatarDefaultCenter' />")
            }
        }, {
            key: "ScreenFlatSmallRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatSmallRight' />")
            }
        }, {
            key: "ScreenFlatMediumRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatMediumRight' />")
            }
        }, {
            key: "ScreenFlatLargeRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatLargeAvatarSmallRight' />")
            }
        }, {
            key: "ScreenAngledSmallLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenAngledSmallLeft' />")
            }
        }, {
            key: "ScreenAngledMediumLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenAngledMediumLeft' />")
            }
        }, {
            key: "ScreenFlatLargeCenterAvatarShrunk",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatLargeAvatarZoomOutCenter' />")
            }
        }, {
            key: "ScreenFlatSmallLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatSmallLeft' />")
            }
        }, {
            key: "ScreenFlatMediumLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatMediumLeft' />")
            }
        }, {
            key: "ScreenFlatLargeLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatLargeAvatarSmallLeft' />")
            }
        }, {
            key: "ScreenFlatLargeCenterAvatarZoom2",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatLargeAvatarZoomInCenter' />")
            }
        }, {
            key: "ScreenFlatLargeCenterAvatarZoom",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='ScreenFlatLargeAvatarMaxZoomInOffCenterLeft' />")
            }
        }, {
            key: "Holo",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='Holo' />")
            }
        }, {
            key: "FaceView",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<trl-content position='DefaultCenter' />")
            }
        }, {
            key: "LoadURL",
            value: function(e) {
                Trulience.getInstance().sendMessageToVPS("<trl-content screen='" + e + "' />")
            }
        }, {
            key: "OnCamLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<camMove direction='left' rotateSpeed='0.5' zoomSpeed='3.0' zoomDistance='100.0f' animate='true'></camMove>")
            }
        }, {
            key: "OnCamRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<camMove direction='right' rotateSpeed='0.5' zoomSpeed='3.0' zoomDistance='100.0f' animate='true'></camMove>")
            }
        }, {
            key: "OnCamZoomIn",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<camMove direction='forward' rotateSpeed='0.5' zoomSpeed='3.0' zoomDistance='150.0f' animate='true'></camMove>")
            }
        }, {
            key: "OnCamZoomOut",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<camMove direction='backward' rotateSpeed='0.5' zoomSpeed='3.0' zoomDistance='150.0f' animate='true'></camMove>")
            }
        }, {
            key: "OnAvatarLeft",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<avatarMove direction='left' steps='2'></avatarMove>")
            }
        }, {
            key: "OnAvatarRight",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<avatarMove direction='right' steps='2'></avatarMove>")
            }
        }, {
            key: "OnAvatarForward",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<avatarMove direction='forward' steps='2'></avatarMove>")
            }
        }, {
            key: "OnAvatarBackward",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<avatarMove direction='backward' steps='2'></avatarMove>")
            }
        }, {
            key: "moveAvatarToCenter",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<moveAvatarToCenter></moveAvatarToCenter>")
            }
        }, {
            key: "faceCam",
            value: function() {
                Trulience.getInstance().sendMessageToVPS("<faceCam></faceCam>")
            }
        }]) && V(t.prototype, n),
        o && V(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function j(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var D = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.webRTCServer = null,
            this.dest = "",
            this.rvstream = null,
            this.remoteVideo = null,
            this.preview = null,
            this.calling = !1,
            this.mic = !1,
            this.cam = !1,
            this.mediaConnected = !1,
            this.timeoutRunning = !1,
            this.iceTimeout = 3e3,
            this.peerConnection = null,
            this.httpRequest = null,
            this.localStream = null,
            this.audioContext = null,
            this.constraints = {
                voiceActivityDetection: !1,
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !0
            }
        }
        var t, n, o;
        return t = e,
        (n = [{
            key: "initDest",
            value: function() {
                if (Trulience.getInstance().getDestinationAddress())
                    return console.log("initDest => Desitination Address is already passed to SDK = " + Trulience.getInstance().getDestinationAddress()),
                    void (this.dest = Trulience.getInstance().getDestinationAddress());
                var e = Trulience.getInstance().getVPSAddress()
                  , t = Trulience.getInstance().getVPSPort()
                  , n = 7373
                  , o = 7374;
                t && (o = (n = parseInt(t)) + 1),
                Trulience.getInstance().getSTTAddress() && (e = Trulience.getInstance().getSTTAddress());
                var a = Trulience.getInstance().getSessionId()
                  , s = Trulience.getInstance().getUserId();
                console.log("initDest => vps = " + e + ", sessionId = " + a + ", userId = " + s + ", audioPort = " + n + ", videoPort = " + o),
                this.dest = e ? "sock:audio-ip=".concat(e, ",audio-port=").concat(n, ",audio-codec=Opus-48,video-ip=").concat(e, ",video-port=").concat(o, ",video-codec=H.264-1,session-id=").concat(a, ",user-id=").concat(s) : "sock: audio-ip=127.0.0.1,audio-port=7373,audio-codec=Opus-48,video-ip=127.0.0.1,video-port=7374,video-codec=H.264-1,session-id=".concat(a, ",user-id=").concat(s),
                console.log("initDest => this.dest = " + this.dest),
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)
            }
        }, {
            key: "start",
            value: function() {
                var e = this;
                this.initDest();
                var t = !1;
                if (Trulience.getInstance().getForceVideo() && (t = !0),
                Trulience.getInstance().getDisableVideo() && (t = !1),
                this.iceTimeout = t ? 5e3 : 3e3,
                console.info("WebRTC start. " + t),
                Trulience.getInstance().isLocalMediaDisabled())
                    return console.log("SKIPPING CALL TO getUserMedia as disableLocalMedia = true"),
                    void this.onGotMedia(null);
                Trulience.getInstance().getForceVideo() ? (console.log("forceVideo =  true"),
                navigator.mediaDevices.getUserMedia({
                    audio: !0,
                    video: {
                        width: 1280,
                        height: 720
                    }
                }).then(this.onGotMedia.bind(this)).catch((function(t) {
                    e.onGotMedia(null)
                }
                ))) : (console.log("forceVideo =  false"),
                navigator.mediaDevices.getUserMedia({
                    audio: !0,
                    video: t
                }).then(this.onGotMedia.bind(this)).catch((function(t) {
                    e.onGotMedia(null)
                }
                )))
            }
        }, {
            key: "onGotMedia",
            value: function(e) {
                console.info("WebRTC onGotMedia.", e),
                this.terminateIfCallEnded(e) || (this.preview && e && (this.preview.srcObject = e),
                this.localStream = e,
                this.call(),
                this.updateMicStatus())
            }
        }, {
            key: "toggleMic",
            value: function() {
                this.mic ? this.micOff() : this.micOn()
            }
        }, {
            key: "toggleCam",
            value: function() {
                this.cam ? this.camOff() : this.camOn()
            }
        }, {
            key: "updateMicStatus",
            value: function() {
                console.info("WebRTC updateMicStatus 2");
                var e = !1;
                if (this.localStream) {
                    var t = this.localStream.getAudioTracks();
                    t[0] && (e = t[0].enabled)
                }
                this.mic = e;
                var n = {
                    micStatus: this.mic
                };
                Trulience.getInstance().callBackToClient("Media", "micStatus", n)
            }
        }, {
            key: "micOff",
            value: function() {
                if (console.info("WebRTC micOff"),
                this.localStream) {
                    var e = this.localStream.getAudioTracks();
                    e[0] && (e[0].enabled = !1),
                    this.updateMicStatus()
                }
            }
        }, {
            key: "micOn",
            value: function() {
                if (console.info("WebRTC micOn"),
                this.localStream) {
                    var e = this.localStream.getAudioTracks();
                    e[0] && (e[0].enabled = !0),
                    this.updateMicStatus()
                }
            }
        }, {
            key: "camOff",
            value: function() {
                if (console.info("WebRTC camOff"),
                this.localStream) {
                    var e = this.localStream.getVideoTracks();
                    e[0] && (e[0].enabled = !1),
                    this.updateCamStatus()
                }
            }
        }, {
            key: "camOn",
            value: function() {
                if (console.info("WebRTC camOn"),
                this.localStream) {
                    var e = this.localStream.getVideoTracks();
                    e[0] && (e[0].enabled = !0),
                    this.updateCamStatus()
                }
            }
        }, {
            key: "updateCamStatus",
            value: function() {
                console.info("WebRTC updateCamStatus");
                var e = !1;
                if (this.localStream) {
                    var t = this.localStream.getVideoTracks();
                    t[0] && (e = t[0].enabled)
                }
                this.cam = e;
                var n = {
                    cam_status: this.cam
                };
                Trulience.getInstance().callBackToClient("Media", "camStatus", n)
            }
        }, {
            key: "call",
            value: function() {
                var e = this;
                console.info("WebRTC call"),
                this.calling = !0,
                this.timeoutRunning = !1,
                this.peerConnection = new RTCPeerConnection({
                    bundlePolicy: "max-bundle",
                    iceServers: [{
                        urls: ["stun:eu-turn4.xirsys.com"]
                    }, {
                        username: "17BT8AZvZxdSBFARL8ccV7cJWM7PllP7jSci28fhIaILUnWjSO-LMzLda1tHWZkhAAAAAF6D2qNiZW53ZWVrZXM3Mw==",
                        credential: "685ddd3c-73ac-11ea-b446-d68f74b5db2a",
                        urls: ["turn:eu-turn4.xirsys.com:80?transport=udp", "turn:eu-turn4.xirsys.com:3478?transport=udp", "turn:eu-turn4.xirsys.com:80?transport=tcp", "turn:eu-turn4.xirsys.com:3478?transport=tcp", "turns:eu-turn4.xirsys.com:443?transport=tcp", "turns:eu-turn4.xirsys.com:5349?transport=tcp"]
                    }]
                }),
                this.peerConnection.onicecandidate = this.onIceCandidate.bind(this),
                this.peerConnection.oniceconnectionstatechange = this.onIceConnectionStateChanged.bind(this),
                this.peerConnection.onicegatheringstatechange = this.onIceGatheringStateChange.bind(this),
                this.peerConnection.ontrack = this.onRemoteTrackAdded.bind(this),
                this.localStream ? (this.localStream.getTracks().forEach((function(t) {
                    return e.peerConnection.addTrack(t, e.localStream)
                }
                )),
                console.debug("WebRTC BW creating offer:", JSON.stringify(this.constraints))) : console.debug("WebRTC BW creating offer:", JSON.stringify(this.constraints)),
                this.peerConnection.createOffer(this.constraints).then(this.onCreateOfferSuccess.bind(this)).catch((function(t) {
                    e.doGatewayDisconnect(),
                    console.error("WebRTC failed to create offer:", t.toString())
                }
                ))
            }
        }, {
            key: "stop",
            value: function() {
                console.info("In RTC.js stop method. Below is the stack trace for current call."),
                console.trace(),
                this.peerConnection && (this.peerConnection.close(),
                console.info("WebRTC stopped."),
                this.peerConnection = null,
                this.mediaConnected = !1),
                this.localStream && (console.info("local stop."),
                this.localStream.getTracks().forEach((function(e) {
                    return e.stop()
                }
                )),
                console.info("local stopped."),
                this.localStream = null),
                this.updateMicStatus(),
                Trulience.getInstance().callBackToClient("Media", "onDisconnected", {})
            }
        }, {
            key: "onIceConnectionStateChanged",
            value: function(e) {
                if (this.peerConnection && this.peerConnection.iceConnectionState && (console.info("WebRTC ICE connection state: " + this.peerConnection.iceConnectionState),
                "completed" === this.peerConnection.iceConnectionState || "connected" === this.peerConnection.iceConnectionState)) {
                    this.mediaConnected = !0,
                    Trulience.getInstance().callBackToClient("Media", "onConnected", e);
                    var t = this;
                    navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0 && navigator.userAgent.indexOf("Firefox") < 0 && setTimeout((function() {
                        console.info("iOS reattachTrlVid "),
                        t.reattachTrlVid()
                    }
                    ), 1e3),
                    this.remoteVideo.play()
                }
            }
        }, {
            key: "onIceGatheringStateChange",
            value: function() {
                this.peerConnection && this.peerConnection.iceGatheringState && console.info("WebRTC ICE gathering state: " + this.peerConnection.iceGatheringState)
            }
        }, {
            key: "onCreateOfferSuccess",
            value: function(e) {
                console.log("Local Offer sdp" + e.sdp),
                this.peerConnection.setLocalDescription(e).then((function() {
                    console.log("WebRTC setLocalDescription success")
                }
                )).catch((function(e) {
                    console.error("local SDP unacceptable:", e.toString())
                }
                ))
            }
        }, {
            key: "onIceCandidate",
            value: function(e) {
                if (console.debug("BW onIceCandidate ".concat(e)),
                e.candidate) {
                    if (!this.timeoutRunning) {
                        this.timeoutRunning = !0;
                        var t = this;
                        setTimeout((function() {
                            console.debug("dialVSP from timeout " + t.iceTimeout),
                            t.dialVSP()
                        }
                        ), t.iceTimeout)
                    }
                    console.debug("WebRTC onIceCandidate: " + JSON.stringify(e.candidate))
                } else
                    console.debug("dialVSP from onIceCandidate null"),
                    this.dialVSP()
            }
        }, {
            key: "dialVSP",
            value: function() {
                if (this.calling) {
                    this.calling = !1,
                    this.webRTCServer || (this.webRTCServer = "vps-ln-01.trulience.com");
                    var e = "https://" + this.webRTCServer + "/sdp?destination=" + this.dest;
                    this.httpRequest = new XMLHttpRequest,
                    this.httpRequest.open("POST", e),
                    this.httpRequest.setRequestHeader("Content-Type", "application/sdp"),
                    this.httpRequest.onreadystatechange = this.VSPResponse.bind(this),
                    this.peerConnection && this.peerConnection.localDescription ? (this.httpRequest.send(this.peerConnection.localDescription.sdp),
                    console.log("Sending offer sdp" + this.peerConnection.localDescription.sdp)) : (console.info("Peer Connection already Closed!"),
                    this.doGatewayDisconnect())
                }
            }
        }, {
            key: "VSPResponse",
            value: function() {
                var e = this;
                if (this.httpRequest.readyState === this.httpRequest.DONE) {
                    if (200 !== this.httpRequest.status)
                        return console.warn("WebRTC answer failed: status = ".concat(this.httpRequest.status)),
                        void this.doGatewayDisconnect();
                    var t = this.httpRequest.responseText.replace("42001f", "42e01f");
                    (t = (t = Trulience.getInstance().getForceVideo() ? t.replace("AS:16800", "AS:900") : t.replace("AS:16800", "AS:200")).replace("maxaveragebitrate=510000", "maxaveragebitrate=48000")).indexOf("goog-remb") < 0 && (t = t.replace("a=rtcp-fb:* ccm fir", "a=rtcp-fb:* ccm fir\na=rtcp-fb:* goog-remb")),
                    console.info("WebRTC answer SDP received:" + t.length + "bytes"),
                    console.debug("WebRTC answer SDP:\n" + t),
                    this.peerConnection.setRemoteDescription({
                        type: "answer",
                        sdp: t
                    }).then((function() {
                        console.log("WebRTC answer SDP accepted, media starting")
                    }
                    )).catch((function(t) {
                        console.error("Offer SDP unacceptable:", t.toString()),
                        e.doGatewayDisconnect()
                    }
                    ))
                }
            }
        }, {
            key: "attachAudioTrack",
            value: function(e) {
                var t = this.audioContext.createMediaStreamSource(new MediaStream([e]))
                  , n = this.audioContext.createGain();
                console.log("ADDING GAIN"),
                n.gain.value = 30,
                t.connect(n),
                n.connect(this.audioContext.destination)
            }
        }, {
            key: "onRemoteTrackAdded",
            value: function(e) {
                if (console.log("onRemoteTrackAdded"),
                void 0 !== e.streams && 0 !== e.streams.length) {
                    var t = e.streams[0];
                    this.rvstream = t;
                    var n = window.navigator.userAgent;
                    n.match(/iPad/i) || n.match(/iPhone/i) ? (console.log("navigator.userAgent", navigator.userAgent, navigator.userAgent.indexOf("iPhone OS 15"), e.track.kind),
                    (navigator.userAgent.indexOf("iPhone OS 15_0") > -1 || navigator.userAgent.indexOf("iPhone OS 15_1") > -1 || navigator.userAgent.indexOf("iPhone OS 15_2") > -1 || navigator.userAgent.indexOf("iPhone OS 15_3") > -1) && "audio" === e.track.kind && this.attachAudioTrack(e.track),
                    "video" === e.track.kind && (console.log("BW SET that.remoteVideo.srcObject"),
                    window.remoteVideo = this.remoteVideo,
                    window.rvstresm = this.rvstream,
                    this.remoteVideo.srcObject = this.rvstream)) : "video" === e.track.kind && (this.remoteVideo.srcObject = this.rvstream),
                    console.info("WebRTC onRemoteTrackAdded attached ".concat(t.id, " to ").concat(this.remoteVideo.id, " streams") + e.streams.length)
                } else
                    console.warn("WebRTC onRemoteTrackAdded: no streams")
            }
        }, {
            key: "reattachTrlVid",
            value: function() {
                this.remoteVideo.srcObject = null,
                this.remoteVideo.srcObject = this.rvstream,
                this.remoteVideo.play()
            }
        }, {
            key: "dettachTrlVid",
            value: function() {
                this.remoteVideo.srcObject = null
            }
        }, {
            key: "attachTrlVid",
            value: function() {
                this.remoteVideo.srcObject = this.rvstream,
                console.info(" attachTrlVid ")
            }
        }, {
            key: "attachTrlVid2",
            value: function() {
                this.remoteVideo.srcObject = this.localStream,
                console.info(" attachTrlVid ")
            }
        }, {
            key: "attachTrlVid3",
            value: function() {
                this.remoteVideo.srcObject = this.localStream[0],
                console.info(" attachTrlVid ")
            }
        }, {
            key: "terminateIfCallEnded",
            value: function(e) {
                return console.info("In RTC.js terminateIfCallEnded"),
                !Trulience.getInstance().isDirectRTCCall() && !Trulience.getInstance().isConnected() && (console.info("FOUND STATE->TERMINATED...STOPPING RTC CALL..."),
                null == e || e.getTracks().forEach((function(e) {
                    return e.stop()
                }
                )),
                this.stop(),
                !0)
            }
        }, {
            key: "doGatewayDisconnect",
            value: function() {
                Trulience.getInstance().disconnectGateway(2)
            }
        }]) && j(t.prototype, n),
        o && j(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function W(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var U = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this._rootElement = null,
            this._avatarId = null,
            this._userId = null,
            this._forceVideo = null,
            this._disableVideo = null,
            this._userName = null,
            this._langPref = null,
            this._trlCallback = null,
            this._authCallbacks = null,
            this._wsCallbacks = null,
            this._srCallbacks = null,
            this._mediaCallbacks = null,
            this._vps = null,
            this._screenId = null,
            this._retry = !1,
            this._avatarEnabled = !0,
            this._videoElements = null,
            this._webRTCServerFromURLParams = null,
            this._destinationAddress = null,
            this._accessToken = null,
            this._isOperator = !1,
            this._isLocalMediaDisabled = !1,
            this._agoraPayload = null
        }
        var t, n, o;
        return t = e,
        (n = [{
            key: "assignVPS",
            value: function(e) {
                return this._vps = e,
                this
            }
        }, {
            key: "forceVideo",
            value: function(e) {
                return this._forceVideo = e,
                this
            }
        }, {
            key: "disableVideo",
            value: function(e) {
                return this._disableVideo = e,
                this
            }
        }, {
            key: "setRootElement",
            value: function(e) {
                return this._rootElement = e,
                this
            }
        }, {
            key: "setAvatarId",
            value: function(e) {
                return this._avatarId = e,
                this
            }
        }, {
            key: "setUserId",
            value: function(e) {
                return this._userId = e,
                this
            }
        }, {
            key: "setUserName",
            value: function(e) {
                return this._userName = e,
                this
            }
        }, {
            key: "setLanguagePreference",
            value: function(e) {
                return this._langPref = e,
                this
            }
        }, {
            key: "setAuthCallbacks",
            value: function(e) {
                return this._authCallbacks = e,
                this
            }
        }, {
            key: "setWebSocketCallbacks",
            value: function(e) {
                return this._wsCallbacks = e,
                this
            }
        }, {
            key: "setMediaCallbacks",
            value: function(e) {
                return this._mediaCallbacks = e,
                this
            }
        }, {
            key: "setSpeechRecognitionCallbacks",
            value: function(e) {
                return this._srCallbacks = e,
                this
            }
        }, {
            key: "setScreenId",
            value: function(e) {
                return this._screenId = e,
                this
            }
        }, {
            key: "setRetry",
            value: function(e) {
                return this._retry = e,
                this
            }
        }, {
            key: "enableAvatar",
            value: function(e) {
                return this._avatarEnabled = e,
                this
            }
        }, {
            key: "registerVideoElements",
            value: function(e) {
                return this._videoElements = e,
                this
            }
        }, {
            key: "setWebRTCServer",
            value: function(e) {
                return this._webRTCServerFromURLParams = e,
                this
            }
        }, {
            key: "setDestinationAddress",
            value: function(e) {
                return this._destinationAddress = e,
                this
            }
        }, {
            key: "setAccessToken",
            value: function(e) {
                return this._accessToken = e,
                this
            }
        }, {
            key: "setIsOperator",
            value: function(e) {
                return this._isOperator = e,
                this
            }
        }, {
            key: "setIsLocalMediaDisabled",
            value: function(e) {
                return this._isLocalMediaDisabled = e,
                this
            }
        }, {
            key: "setAgoraPayload",
            value: function(e) {
                return this._agoraPayload = e,
                this
            }
        }, {
            key: "build",
            value: function() {
                return new Trulience(this)
            }
        }]) && W(t.prototype, n),
        o && W(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    function G(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    var F = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)
      , z = function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this._recognition = new webkitSpeechRecognition,
            this._lastStartedAt = 0,
            this._autoRestart = !0,
            this._startSRTimer = 0,
            this._userStoppedRecognition = !1,
            this._notifiedUserSpeaking = !1,
            this._isAudioPlaying = !1,
            F || this.setupSpeechRecognition()
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "getInstance",
            value: function() {
                return e._INSTANCE || (e._INSTANCE = new e),
                e._INSTANCE
            }
        }],
        (n = [{
            key: "isAlreadyInProgress",
            value: function() {
                return this._recognition._recognizing
            }
        }, {
            key: "setupSpeechRecognition",
            value: function() {
                this._recognition.continuous = !0,
                this._recognition.interimResults = !0;
                var e = new webkitSpeechGrammarList;
                this._recognition.grammars = e,
                this._recognition.onstart = function() {
                    $.getInstance().callBackToClient("SpeechRecognition", "onStart", "Speech Recognition Started!")
                }
                ,
                this._recognition.onerror = function(e) {
                    "no-speech" === e.error && (console.log("Recognition Error => No Speech"),
                    this._userStoppedRecognition || (this._autoRestart = !0)),
                    "audio-capture" === e.error && (console.log("Recognition Error => No Microphone"),
                    this._autoRestart = !1),
                    "not-allowed" === e.error && (console.log("Recognition Error => Not allowed"),
                    this._autoRestart = !1),
                    "network" === e.error && (console.log("Recognition Error => Network not connected"),
                    this._autoRestart = !1),
                    $.getInstance().callBackToClient("SpeechRecognition", "onError", e.error)
                }
                ,
                this._recognition.onend = function() {
                    $.getInstance().callBackToClient("SpeechRecognition", "onEnd", "Speech recognition Ended!")
                }
                ,
                this._recognition.onresult = function(e) {
                    var t = ""
                      , n = "";
                    if (void 0 === e.results)
                        return this._recognition.onend = null,
                        this._recognition.stop(),
                        void console.log("Web Speech API is not supported by this browser.");
                    for (var o = e.resultIndex; o < e.results.length; ++o) {
                        var a = e.results[o][0].transcript;
                        e.results[o].isFinal ? (n += a + "\n",
                        stop(!1),
                        $.getInstance().callBackToClient("SpeechRecognition", "onFinalTranscript", n)) : (t += a,
                        confidence = e.results[o][0].confidence,
                        $.getInstance().callBackToClient("SpeechRecognition", "onInterimTranscript", t))
                    }
                    n = ""
                }
            }
        }, {
            key: "startSpeechRecognitionIfPossible",
            value: function() {
                var e = this;
                if (console.log("In startSpeechRecognitionIfPossible with autoRestart = " + this._autoRestart),
                this._autoRestart) {
                    var t = (new Date).getTime() - this._lastStartedAt;
                    t < 1e3 ? this._startSRTimer = setTimeout((function() {
                        e.start()
                    }
                    ), 1e3 - t) : this.start()
                } else
                    this._startSRTimer && (clearTimeout(this._startSRTimer),
                    this._startSRTimer = 0)
            }
        }, {
            key: "start",
            value: function() {
                if (this._recognition._recognizing)
                    console.log("Recognition already in progress. So ignore call to start() of Speech Recognition");
                else if (this._isAudioPlaying)
                    console.log("Audio is currently being played. So ignore call to start() Speech Recognition");
                else {
                    this._recognition.lang = "en-US",
                    this._lastStartedAt = (new Date).getTime(),
                    this._autoRestart = !0,
                    this._userStoppedRecognition = !1;
                    try {
                        this._recognition.start()
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }, {
            key: "stop",
            value: function(e) {
                this._userStoppedRecognition = !0,
                this._autoRestart = e,
                this._recognition.stop()
            }
        }]) && G(t.prototype, n),
        o && G(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }();
    z._INSTANCE = null;
    var H = z
      , q = n(0)
      , Z = n.n(q)
      , Y = 0
      , K = 1;
    function X(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    window.Trulience = function() {
        function e(t) {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this._rootElement = t._rootElement,
            this._avatarId = t._avatarId,
            this._agentName = null,
            this._rtc = null,
            this._sttAddress = null,
            this._userId = t._userId,
            this._forceVideo = t._forceVideo,
            this._disableVideo = t._disableVideo,
            this._oauth = !1,
            this._userName = t._userName,
            this._langPref = t._langPref,
            this._vps = t._vps,
            this._accessToken = t._accessToken,
            this._vpsAddress = null,
            this._vpsPort = null,
            this._ssmlutils = new B,
            this._authCallbacks = t._authCallbacks,
            this._wsCallbacks = t._wsCallbacks,
            this._srCallbacks = t._srCallbacks,
            this._mediaCallbacks = t._mediaCallbacks,
            this._webRTCServerFromURLParams = t._webRTCServerFromURLParams,
            this._destinationAddress = t._destinationAddress,
            A.getInstance().setScreenId(t._screenId),
            e._INSTANCE = this,
            this._retry = t._retry,
            this._tgStatus = E.DISCONNECTED,
            this._vpsStatus = P.DISCONNECTED,
            this._avatarEnabled = t._avatarEnabled,
            this._videoElements = t._videoElements,
            this._isOperator = t._isOperator,
            this._isLocalMediaDisabled = t._isLocalMediaDisabled,
            this._directRTCCall = !1,
            this._agoraPayload = t._agoraPayload
        }
        var t, n, o;
        return t = e,
        o = [{
            key: "Builder",
            value: function() {
                return new U
            }
        }, {
            key: "getInstance",
            value: function() {
                return e._INSTANCE
            }
        }, {
            key: "trlDialog",
            value: function(e, t, n) {
                var o;
                Z()({
                    title: t,
                    html: n + " <br/><br/> Time Left: <strong></strong> seconds",
                    timer: e,
                    onOpen: function() {
                        Z.a.showLoading(),
                        o = setInterval((function() {
                            Z.a.getContent().querySelector("strong").textContent = Z.a.getTimerLeft() / 1e3
                        }
                        ), 100)
                    },
                    onClose: function() {
                        clearInterval(o)
                    }
                }).then((function(e) {
                    e.dismiss === Z.a.DismissReason.timer && console.log("trlDialog closed by Timer")
                }
                ))
            }
        }],
        (n = [{
            key: "getForceVideo",
            value: function() {
                return this._forceVideo
            }
        }, {
            key: "getDisableVideo",
            value: function() {
                return this._disableVideo
            }
        }, {
            key: "agentName",
            get: function() {
                return this._agentName
            },
            set: function(e) {
                this._agentName = e
            }
        }, {
            key: "userName",
            get: function() {
                return this._userName
            },
            set: function(e) {
                this._userName = e
            }
        }, {
            key: "getTGStatus",
            value: function() {
                return this._tgStatus
            }
        }, {
            key: "setTGStatus",
            value: function(e) {
                this._tgStatus = e
            }
        }, {
            key: "getSessionId",
            value: function() {
                return k.getInstance() ? k.getInstance().sessionId : null
            }
        }, {
            key: "getUserId",
            value: function() {
                return this._userId
            }
        }, {
            key: "setUserId",
            value: function(e) {
                this._userId = e
            }
        }, {
            key: "isOauth",
            value: function() {
                return this._oauth
            }
        }, {
            key: "setOauth",
            value: function(e) {
                this._oauth = e
            }
        }, {
            key: "getVPSStatus",
            value: function() {
                return this._vpsStatus
            }
        }, {
            key: "setVPSStatus",
            value: function(e) {
                this._vpsStatus = e
            }
        }, {
            key: "getSTTAddress",
            value: function() {
                return this._sttAddress
            }
        }, {
            key: "setSTTAddress",
            value: function(e) {
                this._sttAddress = e
            }
        }, {
            key: "getVPSAddress",
            value: function() {
                return this._vpsAddress
            }
        }, {
            key: "getVPSPort",
            value: function() {
                return this._vpsPort
            }
        }, {
            key: "getVideoElements",
            value: function() {
                return this._videoElements
            }
        }, {
            key: "setVPSAddress",
            value: function(e) {
                this._vpsAddress = e
            }
        }, {
            key: "setVPSPort",
            value: function(e) {
                this._vpsPort = e
            }
        }, {
            key: "getAccessToken",
            value: function() {
                return this._accessToken
            }
        }, {
            key: "authenticate",
            value: function() {
                this.auth(Y)
            }
        }, {
            key: "connectGateway",
            value: function() {
                this.setTGStatus(e.TGStatus.CONNECTING),
                setTimeout((function() {
                    e.getInstance().auth(K)
                }
                ), 0)
            }
        }, {
            key: "isConnected",
            value: function() {
                return this._tgStatus === e.TGStatus.CONNECTED
            }
        }, {
            key: "isConnecting",
            value: function() {
                return this._tgStatus === e.TGStatus.CONNECTING
            }
        }, {
            key: "isTerminated",
            value: function() {
                return this._tgStatus === e.TGStatus.TERMINATED
            }
        }, {
            key: "isDisconnected",
            value: function() {
                return this._tgStatus === e.TGStatus.DISCONNECTED
            }
        }, {
            key: "isOperator",
            value: function() {
                return this._isOperator
            }
        }, {
            key: "isLocalMediaDisabled",
            value: function() {
                return this._isLocalMediaDisabled
            }
        }, {
            key: "isDirectRTCCall",
            value: function() {
                return this._directRTCCall
            }
        }, {
            key: "getDestinationAddress",
            value: function() {
                return this._destinationAddress
            }
        }, {
            key: "getWebRTCServer",
            value: function() {
                return this._webRTCServerFromURLParams
            }
        }, {
            key: "getAgoraPayload",
            value: function() {
                return this._agoraPayload
            }
        }, {
            key: "hasAgoraPayload",
            value: function() {
                return !!this._agoraPayload
            }
        }, {
            key: "isMediaConnected",
            value: function() {
                return this._rtc && this._rtc.mediaConnected
            }
        }, {
            key: "connectMedia",
            value: function(e, t) {
                !1 !== this._avatarEnabled ? (!e && this._videoElements && this._videoElements.previewVideo && (e = document.getElementById(this._videoElements.previewVideo)),
                !t && this._videoElements && (t = document.getElementById(this._videoElements.remoteVideo)),
                this._rtc ? console.log("connectMedia => _rtc not null, so return") : (console.log("connectMedia => Instantiate RTC()"),
                this._rtc = new D,
                this._rtc.preview = e,
                this._rtc.remoteVideo = t,
                console.log("connectMedia => calling - assignMediaEndPoints()"),
                L.getInstance().assignMediaEndPoints())) : console.log("Avatar Not Enabled! Continue with Chat Only...")
            }
        }, {
            key: "connectRTCDirectly",
            value: function(e, t) {
                this._directRTCCall = !0,
                !e && this._videoElements && this._videoElements.previewVideo && (e = document.getElementById(this._videoElements.previewVideo)),
                !t && this._videoElements && (t = document.getElementById(this._videoElements.remoteVideo)),
                this._rtc ? console.log("connectRTCDirectly => _rtc not null, so return") : (console.log("connectRTCDirectly => Instantiate RTC()"),
                this._rtc = new D,
                this._rtc.preview = e,
                this._rtc.remoteVideo = t,
                console.log("connectRTCDirectly => calling - dialRTC() where webRTC Server = " + this._webRTCServerFromURLParams),
                this.dialRTC(this._webRTCServerFromURLParams))
            }
        }, {
            key: "dialRTC",
            value: function(e) {
                console.log("dialRTC => calling - webRTCServer = " + e),
                this._rtc.webRTCServer = e,
                this._webRTCServerFromURLParams && (console.log("Overriding webRTC server address from URL Params...this._webRTCServerFromURLParams = " + this._webRTCServerFromURLParams),
                this._rtc.webRTCServer = this._webRTCServerFromURLParams),
                this._rtc.start()
            }
        }, {
            key: "disconnectGateway",
            value: function(t) {
                var n;
                console.info("disconnectGateway ----\x3e reason = " + t),
                this.setTGStatus(e.TGStatus.TERMINATED),
                this.disconnectMedia(),
                null === (n = L.getInstance()) || void 0 === n || n.releaseMediaEndPoints(t),
                (e.getInstance().isConnected() || e.getInstance().isTerminated()) && setTimeout((function() {
                    var t;
                    (e.getInstance().isConnected() || e.getInstance().isTerminated()) && (console.info("Trulience.disconnectGateway - will now disconnect weboscket"),
                    null === (t = L.getInstance()) || void 0 === t || t.disconnect())
                }
                ), 600)
            }
        }, {
            key: "disconnectMedia",
            value: function() {
                console.info("In Trulience.disconnectMedia"),
                this._rtc && (this._rtc.stop(),
                this._rtc = null)
            }
        }, {
            key: "auth",
            value: function(e) {
                console.log("AUTH - this._retry = " + this._retry + ", mode = " + e);
                var t = {};
                this._retry ? (t = C.getInstance(),
                console.log("AUTH - authReq = " + t)) : t = C.newInstance().buildCredentials(this._avatarId, this._userId, this._userName, this._vps, this._avatarEnabled, this._accessToken, this._isOperator, e),
                k.getInstance().login(t.credentials, this.wsHandshake.bind(this))
            }
        }, {
            key: "wsHandshake",
            value: function(e) {
                console.log("wsHandshake() => sessionId = " + e),
                L.build(e, this._langPref).connect()
            }
        }, {
            key: "sendMessageToUE",
            value: function(e) {
                L.getInstance() && L.getInstance().sendMessageToTrulienceGateway(e)
            }
        }, {
            key: "sendMessageToVPS",
            value: function(e) {
                L.getInstance() && L.getInstance().sendMessageToTrulienceGateway(e)
            }
        }, {
            key: "sendMessageOverWebSocket",
            value: function(e) {
                L.getInstance() && L.getInstance().sendMessageToTrulienceGateway(e)
            }
        }, {
            key: "uploadClientLogsToTG",
            value: function(e) {
                L.getInstance() && L.getInstance().uploadClientLogsToTG(e)
            }
        }, {
            key: "sendUserTyping",
            value: function(e) {
                L.getInstance() && this.isConnected() && L.getInstance().sendUserTypingSignal(e)
            }
        }, {
            key: "wsCallbacks",
            get: function() {
                return this._wsCallbacks
            }
        }, {
            key: "srCallbacks",
            get: function() {
                return this._srCallbacks
            }
        }, {
            key: "mediaCallbacks",
            get: function() {
                return this._mediaCallbacks
            }
        }, {
            key: "callBackToClient",
            value: function(e, t, n) {
                if (console.log("callBackToClient - eventType = " + e + ", event = " + t),
                "Auth" === e && this._authCallbacks)
                    ("onReady" === t && this._authCallbacks[t] || "onFail" === t && this._authCallbacks[t]) && this._authCallbacks[t](n);
                else if ("WebSocket" === e && this._wsCallbacks)
                    ("onOpen" === t && this._wsCallbacks[t] || "onConnectFail" === t && this._wsCallbacks[t] || "onMessage" === t && this._wsCallbacks[t] || "onWarn" === t && this._wsCallbacks[t] || "onError" === t && this._wsCallbacks[t] || "onClose" === t && this._wsCallbacks[t]) && this._wsCallbacks[t](n);
                else if ("SpeechRecognition" === e && this._srCallbacks)
                    ("onStart" === t && this._srCallbacks[t] || "onEnd" === t && this._srCallbacks[t] || "onError" === t && this._srCallbacks[t] || "onFinalTranscript" === t && this._srCallbacks[t] || "onInterimTranscript" === t && this._srCallbacks[t]) && this._srCallbacks[t](n);
                else if ("Media" === e && this._mediaCallbacks) {
                    var o;
                    "onConnected" === t && this._mediaCallbacks[t] ? (null === (o = L.getInstance()) || void 0 === o || o.sendMediaConnectedToTG(),
                    this._mediaCallbacks[t](n)) : ("onConnecting" === t && this._mediaCallbacks[t] || "onWaiting" === t && this._mediaCallbacks[t] || "onBusy" === t && this._mediaCallbacks[t] || "micStatus" === t && this._mediaCallbacks[t] || "camStatus" === t && this._mediaCallbacks[t] || "onDisconnect" === t && this._mediaCallbacks[t] || "onDisconnected" === t && this._mediaCallbacks[t] || "avatarStatus" === t && this._mediaCallbacks[t]) && this._mediaCallbacks[t](n)
                }
            }
        }, {
            key: "screenManager",
            value: function() {
                return A.getInstance()
            }
        }, {
            key: "rtc",
            value: function() {
                return this._rtc
            }
        }, {
            key: "getMicStatus",
            value: function() {
                return !!this._rtc && this._rtc.mic
            }
        }, {
            key: "SSMLUtils",
            value: function() {
                return this._ssmlutils
            }
        }, {
            key: "speechRecognition",
            value: function() {
                return H.getInstance()
            }
        }, {
            key: "render",
            value: function() {
                var e = this;
                this._rootElement && (this._rootElement.innerHTML = '\n        <div id="main">\n          <h1 style="line-height:40px;">\n            Sally VPS AGENT\n          </h1>\n\n          <div id="info">\n            <p id="info_start">Forward Message to VPS via Trulience Gateway. Type text below and press Enter.</p>\n          </div>\n\n          <div id="results">\n            <div id="ajax_spinner_id" class="spinner">\n              <img src="./images/ajax-loader.gif"/>\n              Connecting Trulience Gateway\n            </div>\n          </div>\n\n          <div id="userInput">\n            <textarea id="chatAreaId" rows="4" cols="130" class="chatArea" placeholder="Send Message To VPS via Trulience Gateway [Press Enter to Submit]"></textarea>\n          </div>\n        </div>\n      ',
                document.getElementById("chatAreaId").addEventListener("keypress", (function() {
                    if (13 === window.event.keyCode) {
                        var t = document.getElementById("chatAreaId")
                          , n = t.value.trim();
                        e.screenManager().writeMsgToScreen(n, "Guest", "black", "user"),
                        e.sendMessageToVPS(n),
                        t.value = "",
                        t.focus(),
                        t.select()
                    }
                }
                )))
            }
        }]) && X(t.prototype, n),
        o && X(t, o),
        Object.defineProperty(t, "prototype", {
            writable: !1
        }),
        e
    }(),
    Trulience._INSTANCE = null,
    Trulience.TGStatus = E,
    Trulience.VPSStatus = P,
    Trulience.MessageType = r,
    Trulience.CallEndReason = O,
    Trulience.AvatarStatus = {
        IDLE: 0,
        TALKING: 1,
        LISTENING: 2
    };
    var J, $ = Trulience;
    console.log("process.env.PUBLIC_URL => " + Object({
        TARGET_ENV: "production"
    }).PUBLIC_URL),
    console.log("process.env.NODE_ENV => production"),
    console.log("process.env.TARGET_ENV => production");
    var Q = document.getElementById("rootElement");
    if (Q) {
        J = null;
        var ee = {
            onOpen: function(e) {
                console.log("CB----------------------f1"),
                console.log(e),
                document.getElementById("ajax_spinner_id").style.display = "none"
            },
            onMessage: function(e) {
                if (console.log("CB----------------------f2"),
                console.log(e),
                15 === e.messageType)
                    console.log("VPS Assigned Event Received");
                else {
                    var t = e.messageArray[0].message;
                    console.log("CB----------------------f2 message = ".concat(t)),
                    J && J.screenManager().writeMsgToScreen(t, "#FF1493", "agent", !0, !1)
                }
            }
        };
        (J = $.Builder().setAvatarId("10").setUserId(1234567890).setLanguagePreference("en-US").setUserName("sdk-test-user").setRootElement(Q).setWebSocketCallbacks(ee).enableAvatar(!0).build()).render(),
        J.connectGateway()
    }
}
]);


