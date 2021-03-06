(function(t,e){var i=function(){var e=t._data(document,"events");return e&&e.click&&t.grep(e.click,function(t){return"rails"===t.namespace}).length};i()&&t.error("jquery-ujs has already been loaded!");var n;t.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(e){var i=t('meta[name="csrf-token"]').attr("content");i&&e.setRequestHeader("X-CSRF-Token",i)},fire:function(e,i,n){var o=t.Event(i);return e.trigger(o,n),o.result!==!1},confirm:function(t){return confirm(t)},ajax:function(e){return t.ajax(e)},href:function(t){return t.attr("href")},handleRemote:function(i){var o,s,a,r,l,h,c,d;if(n.fire(i,"ajax:before")){if(r=i.data("cross-domain"),l=r===e?null:r,h=i.data("with-credentials")||null,c=i.data("type")||t.ajaxSettings&&t.ajaxSettings.dataType,i.is("form")){o=i.attr("method"),s=i.attr("action"),a=i.serializeArray();var u=i.data("ujs:submit-button");u&&(a.push(u),i.data("ujs:submit-button",null))}else i.is(n.inputChangeSelector)?(o=i.data("method"),s=i.data("url"),a=i.serialize(),i.data("params")&&(a=a+"&"+i.data("params"))):(o=i.data("method"),s=n.href(i),a=i.data("params")||null);d={type:o||"GET",data:a,dataType:c,beforeSend:function(t,o){return o.dataType===e&&t.setRequestHeader("accept","*/*;q=0.5, "+o.accepts.script),n.fire(i,"ajax:beforeSend",[t,o])},success:function(t,e,n){i.trigger("ajax:success",[t,e,n])},complete:function(t,e){i.trigger("ajax:complete",[t,e])},error:function(t,e,n){i.trigger("ajax:error",[t,e,n])},crossDomain:l},h&&(d.xhrFields={withCredentials:h}),s&&(d.url=s);var f=n.ajax(d);return i.trigger("ajax:send",f),f}return!1},handleMethod:function(i){var o=n.href(i),s=i.data("method"),a=i.attr("target"),r=t("meta[name=csrf-token]").attr("content"),l=t("meta[name=csrf-param]").attr("content"),h=t('<form method="post" action="'+o+'"></form>'),c='<input name="_method" value="'+s+'" type="hidden" />';l!==e&&r!==e&&(c+='<input name="'+l+'" value="'+r+'" type="hidden" />'),a&&h.attr("target",a),h.hide().append(c).appendTo("body"),h.submit()},disableFormElements:function(e){e.find(n.disableSelector).each(function(){var e=t(this),i=e.is("button")?"html":"val";e.data("ujs:enable-with",e[i]()),e[i](e.data("disable-with")),e.prop("disabled",!0)})},enableFormElements:function(e){e.find(n.enableSelector).each(function(){var e=t(this),i=e.is("button")?"html":"val";e.data("ujs:enable-with")&&e[i](e.data("ujs:enable-with")),e.prop("disabled",!1)})},allowAction:function(t){var e,i=t.data("confirm"),o=!1;return i?(n.fire(t,"confirm")&&(o=n.confirm(i),e=n.fire(t,"confirm:complete",[o])),o&&e):!0},blankInputs:function(e,i,n){var o,s,a=t(),r=i||"input,textarea",l=e.find(r);return l.each(function(){if(o=t(this),s=o.is("input[type=checkbox],input[type=radio]")?o.is(":checked"):o.val(),!s==!n){if(o.is("input[type=radio]")&&l.filter('input[type=radio]:checked[name="'+o.attr("name")+'"]').length)return!0;a=a.add(o)}}),a.length?a:!1},nonBlankInputs:function(t,e){return n.blankInputs(t,e,!0)},stopEverything:function(e){return t(e.target).trigger("ujs:everythingStopped"),e.stopImmediatePropagation(),!1},callFormSubmitBindings:function(i,n){var o=i.data("events"),s=!0;return o!==e&&o.submit!==e&&t.each(o.submit,function(t,e){return"function"==typeof e.handler?s=e.handler(n):void 0}),s},disableElement:function(t){t.data("ujs:enable-with",t.html()),t.html(t.data("disable-with")),t.bind("click.railsDisable",function(t){return n.stopEverything(t)})},enableElement:function(t){t.data("ujs:enable-with")!==e&&(t.html(t.data("ujs:enable-with")),t.data("ujs:enable-with",!1)),t.unbind("click.railsDisable")}},n.fire(t(document),"rails:attachBindings")&&(t.ajaxPrefilter(function(t,e,i){t.crossDomain||n.CSRFProtection(i)}),t(document).delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(t(this))}),t(document).delegate(n.linkClickSelector,"click.rails",function(i){var o=t(this),s=o.data("method"),a=o.data("params");if(!n.allowAction(o))return n.stopEverything(i);if(o.is(n.linkDisableSelector)&&n.disableElement(o),o.data("remote")!==e){if(!(!i.metaKey&&!i.ctrlKey||s&&"GET"!==s||a))return!0;var r=n.handleRemote(o);return r===!1?n.enableElement(o):r.error(function(){n.enableElement(o)}),!1}return o.data("method")?(n.handleMethod(o),!1):void 0}),t(document).delegate(n.inputChangeSelector,"change.rails",function(e){var i=t(this);return n.allowAction(i)?(n.handleRemote(i),!1):n.stopEverything(e)}),t(document).delegate(n.formSubmitSelector,"submit.rails",function(i){var o=t(this),s=o.data("remote")!==e,a=n.blankInputs(o,n.requiredInputSelector),r=n.nonBlankInputs(o,n.fileInputSelector);if(!n.allowAction(o))return n.stopEverything(i);if(a&&o.attr("novalidate")==e&&n.fire(o,"ajax:aborted:required",[a]))return n.stopEverything(i);if(s){if(r){setTimeout(function(){n.disableFormElements(o)},13);var l=n.fire(o,"ajax:aborted:file",[r]);return l||setTimeout(function(){n.enableFormElements(o)},13),l}return!t.support.submitBubbles&&"1.7">t().jquery&&n.callFormSubmitBindings(o,i)===!1?n.stopEverything(i):(n.handleRemote(o),!1)}setTimeout(function(){n.disableFormElements(o)},13)}),t(document).delegate(n.formInputClickSelector,"click.rails",function(e){var i=t(this);if(!n.allowAction(i))return n.stopEverything(e);var o=i.attr("name"),s=o?{name:o,value:i.val()}:null;i.closest("form").data("ujs:submit-button",s)}),t(document).delegate(n.formSubmitSelector,"ajax:beforeSend.rails",function(e){this==e.target&&n.disableFormElements(t(this))}),t(document).delegate(n.formSubmitSelector,"ajax:complete.rails",function(e){this==e.target&&n.enableFormElements(t(this))}),t(function(){var e=t("meta[name=csrf-token]").attr("content"),i=t("meta[name=csrf-param]").attr("content");t('form input[name="'+i+'"]').val(e)}))})(jQuery),/* ===================================================
 * bootstrap-transition.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";t(function(){t.support.transition=function(){var t=function(){var t,e=document.createElement("bootstrap"),i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(t in i)if(void 0!==e.style[t])return i[t]}();return t&&{end:t}}()})}(window.jQuery),/* ==========================================================
 * bootstrap-affix.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e=function(e,i){this.options=t.extend({},t.fn.affix.defaults,i),this.$window=t(window).on("scroll.affix.data-api",t.proxy(this.checkPosition,this)).on("click.affix.data-api",t.proxy(function(){setTimeout(t.proxy(this.checkPosition,this),1)},this)),this.$element=t(e),this.checkPosition()};e.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e,i=t(document).height(),n=this.$window.scrollTop(),o=this.$element.offset(),s=this.options.offset,a=s.bottom,r=s.top,l="affix affix-top affix-bottom";"object"!=typeof s&&(a=r=s),"function"==typeof r&&(r=s.top()),"function"==typeof a&&(a=s.bottom()),e=null!=this.unpin&&n+this.unpin<=o.top?!1:null!=a&&o.top+this.$element.height()>=i-a?"bottom":null!=r&&r>=n?"top":!1,this.affixed!==e&&(this.affixed=e,this.unpin="bottom"==e?o.top-n:null,this.$element.removeClass(l).addClass("affix"+(e?"-"+e:"")))}};var i=t.fn.affix;t.fn.affix=function(i){return this.each(function(){var n=t(this),o=n.data("affix"),s="object"==typeof i&&i;o||n.data("affix",o=new e(this,s)),"string"==typeof i&&o[i]()})},t.fn.affix.Constructor=e,t.fn.affix.defaults={offset:0},t.fn.affix.noConflict=function(){return t.fn.affix=i,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var e=t(this),i=e.data();i.offset=i.offset||{},i.offsetBottom&&(i.offset.bottom=i.offsetBottom),i.offsetTop&&(i.offset.top=i.offsetTop),e.affix(i)})})}(window.jQuery),/* ==========================================================
 * bootstrap-alert.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e='[data-dismiss="alert"]',i=function(i){t(i).on("click",e,this.close)};i.prototype.close=function(e){function i(){n.trigger("closed").remove()}var n,o=t(this),s=o.attr("data-target");s||(s=o.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,"")),n=t(s),e&&e.preventDefault(),n.length||(n=o.hasClass("alert")?o:o.parent()),n.trigger(e=t.Event("close")),e.isDefaultPrevented()||(n.removeClass("in"),t.support.transition&&n.hasClass("fade")?n.on(t.support.transition.end,i):i())};var n=t.fn.alert;t.fn.alert=function(e){return this.each(function(){var n=t(this),o=n.data("alert");o||n.data("alert",o=new i(this)),"string"==typeof e&&o[e].call(n)})},t.fn.alert.Constructor=i,t.fn.alert.noConflict=function(){return t.fn.alert=n,this},t(document).on("click.alert.data-api",e,i.prototype.close)}(window.jQuery),/* ============================================================
 * bootstrap-button.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.button.defaults,i)};e.prototype.setState=function(t){var e="disabled",i=this.$element,n=i.data(),o=i.is("input")?"val":"html";t+="Text",n.resetText||i.data("resetText",i[o]()),i[o](n[t]||this.options[t]),setTimeout(function(){"loadingText"==t?i.addClass(e).attr(e,e):i.removeClass(e).removeAttr(e)},0)},e.prototype.toggle=function(){var t=this.$element.closest('[data-toggle="buttons-radio"]');t&&t.find(".active").removeClass("active"),this.$element.toggleClass("active")};var i=t.fn.button;t.fn.button=function(i){return this.each(function(){var n=t(this),o=n.data("button"),s="object"==typeof i&&i;o||n.data("button",o=new e(this,s)),"toggle"==i?o.toggle():i&&o.setState(i)})},t.fn.button.defaults={loadingText:"loading..."},t.fn.button.Constructor=e,t.fn.button.noConflict=function(){return t.fn.button=i,this},t(document).on("click.button.data-api","[data-toggle^=button]",function(e){var i=t(e.target);i.hasClass("btn")||(i=i.closest(".btn")),i.button("toggle")})}(window.jQuery),/* ==========================================================
 * bootstrap-carousel.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,"hover"==this.options.pause&&this.$element.on("mouseenter",t.proxy(this.pause,this)).on("mouseleave",t.proxy(this.cycle,this))};e.prototype={cycle:function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(e){var i=this.getActiveIndex(),n=this;if(!(e>this.$items.length-1||0>e))return this.sliding?this.$element.one("slid",function(){n.to(e)}):i==e?this.pause().cycle():this.slide(e>i?"next":"prev",t(this.$items[e]))},pause:function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition.end&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){return this.sliding?void 0:this.slide("next")},prev:function(){return this.sliding?void 0:this.slide("prev")},slide:function(e,i){var n,o=this.$element.find(".item.active"),s=i||o[e](),a=this.interval,r="next"==e?"left":"right",l="next"==e?"first":"last",h=this;if(this.sliding=!0,a&&this.pause(),s=s.length?s:this.$element.find(".item")[l](),n=t.Event("slide",{relatedTarget:s[0],direction:r}),!s.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var e=t(h.$indicators.children()[h.getActiveIndex()]);e&&e.addClass("active")})),t.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(n),n.isDefaultPrevented())return;s.addClass(e),s[0].offsetWidth,o.addClass(r),s.addClass(r),this.$element.one(t.support.transition.end,function(){s.removeClass([e,r].join(" ")).addClass("active"),o.removeClass(["active",r].join(" ")),h.sliding=!1,setTimeout(function(){h.$element.trigger("slid")},0)})}else{if(this.$element.trigger(n),n.isDefaultPrevented())return;o.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return a&&this.cycle(),this}}};var i=t.fn.carousel;t.fn.carousel=function(i){return this.each(function(){var n=t(this),o=n.data("carousel"),s=t.extend({},t.fn.carousel.defaults,"object"==typeof i&&i),a="string"==typeof i?i:s.slide;o||n.data("carousel",o=new e(this,s)),"number"==typeof i?o.to(i):a?o[a]():s.interval&&o.pause().cycle()})},t.fn.carousel.defaults={interval:5e3,pause:"hover"},t.fn.carousel.Constructor=e,t.fn.carousel.noConflict=function(){return t.fn.carousel=i,this},t(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(e){var i,n,o=t(this),s=t(o.attr("data-target")||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),a=t.extend({},s.data(),o.data());s.carousel(a),(n=o.attr("data-slide-to"))&&s.data("carousel").pause().to(n).cycle(),e.preventDefault()})}(window.jQuery),/* =============================================================
 * bootstrap-collapse.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.collapse.defaults,i),this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};e.prototype={constructor:e,dimension:function(){var t=this.$element.hasClass("width");return t?"width":"height"},show:function(){var e,i,n,o;if(!this.transitioning&&!this.$element.hasClass("in")){if(e=this.dimension(),i=t.camelCase(["scroll",e].join("-")),n=this.$parent&&this.$parent.find("> .accordion-group > .in"),n&&n.length){if(o=n.data("collapse"),o&&o.transitioning)return;n.collapse("hide"),o||n.data("collapse",null)}this.$element[e](0),this.transition("addClass",t.Event("show"),"shown"),t.support.transition&&this.$element[e](this.$element[0][i])}},hide:function(){var e;!this.transitioning&&this.$element.hasClass("in")&&(e=this.dimension(),this.reset(this.$element[e]()),this.transition("removeClass",t.Event("hide"),"hidden"),this.$element[e](0))},reset:function(t){var e=this.dimension();return this.$element.removeClass("collapse")[e](t||"auto")[0].offsetWidth,this.$element[null!==t?"addClass":"removeClass"]("collapse"),this},transition:function(e,i,n){var o=this,s=function(){"show"==i.type&&o.reset(),o.transitioning=0,o.$element.trigger(n)};this.$element.trigger(i),i.isDefaultPrevented()||(this.transitioning=1,this.$element[e]("in"),t.support.transition&&this.$element.hasClass("collapse")?this.$element.one(t.support.transition.end,s):s())},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var i=t.fn.collapse;t.fn.collapse=function(i){return this.each(function(){var n=t(this),o=n.data("collapse"),s=t.extend({},t.fn.collapse.defaults,n.data(),"object"==typeof i&&i);o||n.data("collapse",o=new e(this,s)),"string"==typeof i&&o[i]()})},t.fn.collapse.defaults={toggle:!0},t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){return t.fn.collapse=i,this},t(document).on("click.collapse.data-api","[data-toggle=collapse]",function(e){var i,n=t(this),o=n.attr("data-target")||e.preventDefault()||(i=n.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""),s=t(o).data("collapse")?"toggle":n.data();n[t(o).hasClass("in")?"addClass":"removeClass"]("collapsed"),t(o).collapse(s)})}(window.jQuery),/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";function e(){t(n).each(function(){i(t(this)).removeClass("open")})}function i(e){var i,n=e.attr("data-target");return n||(n=e.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),i=n&&t(n),i&&i.length||(i=e.parent()),i}var n="[data-toggle=dropdown]",o=function(e){var i=t(e).on("click.dropdown.data-api",this.toggle);t("html").on("click.dropdown.data-api",function(){i.parent().removeClass("open")})};o.prototype={constructor:o,toggle:function(){var n,o,s=t(this);if(!s.is(".disabled, :disabled"))return n=i(s),o=n.hasClass("open"),e(),o||n.toggleClass("open"),s.focus(),!1},keydown:function(e){var o,s,a,r,l;if(/(38|40|27)/.test(e.keyCode)&&(o=t(this),e.preventDefault(),e.stopPropagation(),!o.is(".disabled, :disabled"))){if(a=i(o),r=a.hasClass("open"),!r||r&&27==e.keyCode)return 27==e.which&&a.find(n).focus(),o.click();s=t("[role=menu] li:not(.divider):visible a",a),s.length&&(l=s.index(s.filter(":focus")),38==e.keyCode&&l>0&&l--,40==e.keyCode&&s.length-1>l&&l++,~l||(l=0),s.eq(l).focus())}}};var s=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var i=t(this),n=i.data("dropdown");n||i.data("dropdown",n=new o(this)),"string"==typeof e&&n[e].call(i)})},t.fn.dropdown.Constructor=o,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=s,this},t(document).on("click.dropdown.data-api",e).on("click.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.dropdown-menu",function(t){t.stopPropagation()}).on("click.dropdown.data-api",n,o.prototype.toggle).on("keydown.dropdown.data-api",n+", [role=menu]",o.prototype.keydown)}(window.jQuery),/* =========================================================
 * bootstrap-modal.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(t){"use strict";var e=function(e,i){this.options=i,this.$element=t(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",t.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};e.prototype={constructor:e,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var e=this,i=t.Event("show");this.$element.trigger(i),this.isShown||i.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.backdrop(function(){var i=t.support.transition&&e.$element.hasClass("fade");e.$element.parent().length||e.$element.appendTo(document.body),e.$element.show(),i&&e.$element[0].offsetWidth,e.$element.addClass("in").attr("aria-hidden",!1),e.enforceFocus(),i?e.$element.one(t.support.transition.end,function(){e.$element.focus().trigger("shown")}):e.$element.focus().trigger("shown")}))},hide:function(e){e&&e.preventDefault(),e=t.Event("hide"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),t(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),t.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())},enforceFocus:function(){var e=this;t(document).on("focusin.modal",function(t){e.$element[0]===t.target||e.$element.has(t.target).length||e.$element.focus()})},escape:function(){var t=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(e){27==e.which&&t.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var e=this,i=setTimeout(function(){e.$element.off(t.support.transition.end),e.hideModal()},500);this.$element.one(t.support.transition.end,function(){clearTimeout(i),e.hideModal()})},hideModal:function(){var t=this;this.$element.hide(),this.backdrop(function(){t.removeBackdrop(),t.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},backdrop:function(e){var i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&i;if(this.$backdrop=t('<div class="modal-backdrop '+i+'" />').appendTo(document.body),this.$backdrop.click("static"==this.options.backdrop?t.proxy(this.$element[0].focus,this.$element[0]):t.proxy(this.hide,this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;n?this.$backdrop.one(t.support.transition.end,e):e()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(t.support.transition.end,e):e()):e&&e()}};var i=t.fn.modal;t.fn.modal=function(i){return this.each(function(){var n=t(this),o=n.data("modal"),s=t.extend({},t.fn.modal.defaults,n.data(),"object"==typeof i&&i);o||n.data("modal",o=new e(this,s)),"string"==typeof i?o[i]():s.show&&o.show()})},t.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},t.fn.modal.Constructor=e,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.modal.data-api",'[data-toggle="modal"]',function(e){var i=t(this),n=i.attr("href"),o=t(i.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),s=o.data("modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},o.data(),i.data());e.preventDefault(),o.modal(s).one("hide",function(){i.focus()})})}(window.jQuery),/* =============================================================
 * bootstrap-scrollspy.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */
!function(t){"use strict";function e(e,i){var n,o=t.proxy(this.process,this),s=t(e).is("body")?t(window):t(e);this.options=t.extend({},t.fn.scrollspy.defaults,i),this.$scrollElement=s.on("scroll.scroll-spy.data-api",o),this.selector=(this.options.target||(n=t(e).attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=t("body"),this.refresh(),this.process()}e.prototype={constructor:e,refresh:function(){var e,i=this;this.offsets=t([]),this.targets=t([]),e=this.$body.find(this.selector).map(function(){var e=t(this),n=e.data("target")||e.attr("href"),o=/^#\w/.test(n)&&t(n);return o&&o.length&&[[o.position().top+(!t.isWindow(i.$scrollElement.get(0))&&i.$scrollElement.scrollTop()),n]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})},process:function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=i-this.$scrollElement.height(),o=this.offsets,s=this.targets,a=this.activeTarget;if(e>=n)return a!=(t=s.last()[0])&&this.activate(t);for(t=o.length;t--;)a!=s[t]&&e>=o[t]&&(!o[t+1]||o[t+1]>=e)&&this.activate(s[t])},activate:function(e){var i,n;this.activeTarget=e,t(this.selector).parent(".active").removeClass("active"),n=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',i=t(n).parent("li").addClass("active"),i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate")}};var i=t.fn.scrollspy;t.fn.scrollspy=function(i){return this.each(function(){var n=t(this),o=n.data("scrollspy"),s="object"==typeof i&&i;o||n.data("scrollspy",o=new e(this,s)),"string"==typeof i&&o[i]()})},t.fn.scrollspy.Constructor=e,t.fn.scrollspy.defaults={offset:10},t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);e.scrollspy(e.data())})})}(window.jQuery),/* ========================================================
 * bootstrap-tab.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
!function(t){"use strict";var e=function(e){this.element=t(e)};e.prototype={constructor:e,show:function(){var e,i,n,o=this.element,s=o.closest("ul:not(.dropdown-menu)"),a=o.attr("data-target");a||(a=o.attr("href"),a=a&&a.replace(/.*(?=#[^\s]*$)/,"")),o.parent("li").hasClass("active")||(e=s.find(".active:last a")[0],n=t.Event("show",{relatedTarget:e}),o.trigger(n),n.isDefaultPrevented()||(i=t(a),this.activate(o.parent("li"),s),this.activate(i,i.parent(),function(){o.trigger({type:"shown",relatedTarget:e})})))},activate:function(e,i,n){function o(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),n&&n()}var s=i.find("> .active"),a=n&&t.support.transition&&s.hasClass("fade");a?s.one(t.support.transition.end,o):o(),s.removeClass("in")}};var i=t.fn.tab;t.fn.tab=function(i){return this.each(function(){var n=t(this),o=n.data("tab");o||n.data("tab",o=new e(this)),"string"==typeof i&&o[i]()})},t.fn.tab.Constructor=e,t.fn.tab.noConflict=function(){return t.fn.tab=i,this},t(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault(),t(this).tab("show")})}(window.jQuery),/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e=function(t,e){this.init("tooltip",t,e)};e.prototype={constructor:e,init:function(e,i,n){var o,s,a,r,l;for(this.type=e,this.$element=t(i),this.options=this.getOptions(n),this.enabled=!0,a=this.options.trigger.split(" "),l=a.length;l--;)r=a[l],"click"==r?this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this)):"manual"!=r&&(o="hover"==r?"mouseenter":"focus",s="hover"==r?"mouseleave":"blur",this.$element.on(o+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,t.proxy(this.leave,this)));this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(e){return e=t.extend({},t.fn[this.type].defaults,this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},enter:function(e){var i,n=t.fn[this.type].defaults,o={};return this._options&&t.each(this._options,function(t,e){n[t]!=e&&(o[t]=e)},this),i=t(e.currentTarget)[this.type](o).data(this.type),i.options.delay&&i.options.delay.show?(clearTimeout(this.timeout),i.hoverState="in",this.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show),void 0):i.show()},leave:function(e){var i=t(e.currentTarget)[this.type](this._options).data(this.type);return this.timeout&&clearTimeout(this.timeout),i.options.delay&&i.options.delay.hide?(i.hoverState="out",this.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide),void 0):i.hide()},show:function(){var e,i,n,o,s,a,r=t.Event("show");if(this.hasContent()&&this.enabled){if(this.$element.trigger(r),r.isDefaultPrevented())return;switch(e=this.tip(),this.setContent(),this.options.animation&&e.addClass("fade"),s="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,e.detach().css({top:0,left:0,display:"block"}),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element),i=this.getPosition(),n=e[0].offsetWidth,o=e[0].offsetHeight,s){case"bottom":a={top:i.top+i.height,left:i.left+i.width/2-n/2};break;case"top":a={top:i.top-o,left:i.left+i.width/2-n/2};break;case"left":a={top:i.top+i.height/2-o/2,left:i.left-n};break;case"right":a={top:i.top+i.height/2-o/2,left:i.left+i.width}}this.applyPlacement(a,s),this.$element.trigger("shown")}},applyPlacement:function(t,e){var i,n,o,s,a=this.tip(),r=a[0].offsetWidth,l=a[0].offsetHeight;a.offset(t).addClass(e).addClass("in"),i=a[0].offsetWidth,n=a[0].offsetHeight,"top"==e&&n!=l&&(t.top=t.top+l-n,s=!0),"bottom"==e||"top"==e?(o=0,0>t.left&&(o=-2*t.left,t.left=0,a.offset(t),i=a[0].offsetWidth,n=a[0].offsetHeight),this.replaceArrow(o-r+i,i,"left")):this.replaceArrow(n-l,n,"top"),s&&a.offset(t)},replaceArrow:function(t,e,i){this.arrow().css(i,t?50*(1-t/e)+"%":"")},setContent:function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},hide:function(){function e(){var e=setTimeout(function(){i.off(t.support.transition.end).detach()},500);i.one(t.support.transition.end,function(){clearTimeout(e),i.detach()})}var i=this.tip(),n=t.Event("hide");return this.$element.trigger(n),n.isDefaultPrevented()?void 0:(i.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?e():i.detach(),this.$element.trigger("hidden"),this)},fixTitle:function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var e=this.$element[0];return t.extend({},"function"==typeof e.getBoundingClientRect?e.getBoundingClientRect():{width:e.offsetWidth,height:e.offsetHeight},this.$element.offset())},getTitle:function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},tip:function(){return this.$tip=this.$tip||t(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(e){var i=e?t(e.currentTarget)[this.type](this._options).data(this.type):this;i.tip().hasClass("in")?i.hide():i.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var i=t.fn.tooltip;t.fn.tooltip=function(i){return this.each(function(){var n=t(this),o=n.data("tooltip"),s="object"==typeof i&&i;o||n.data("tooltip",o=new e(this,s)),"string"==typeof i&&o[i]()})},t.fn.tooltip.Constructor=e,t.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},t.fn.tooltip.noConflict=function(){return t.fn.tooltip=i,this}}(window.jQuery),/* ===========================================================
 * bootstrap-popover.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
!function(t){"use strict";var e=function(t,e){this.init("popover",t,e)};e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype,{constructor:e,setContent:function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content")[this.options.html?"html":"text"](i),t.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var t,e=this.$element,i=this.options;return t=("function"==typeof i.content?i.content.call(e[0]):i.content)||e.attr("data-content")},tip:function(){return this.$tip||(this.$tip=t(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var i=t.fn.popover;t.fn.popover=function(i){return this.each(function(){var n=t(this),o=n.data("popover"),s="object"==typeof i&&i;o||n.data("popover",o=new e(this,s)),"string"==typeof i&&o[i]()})},t.fn.popover.Constructor=e,t.fn.popover.defaults=t.extend({},t.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),t.fn.popover.noConflict=function(){return t.fn.popover=i,this}}(window.jQuery),/* =============================================================
 * bootstrap-typeahead.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function(t){"use strict";var e=function(e,i){this.$element=t(e),this.options=t.extend({},t.fn.typeahead.defaults,i),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=t(this.options.menu),this.shown=!1,this.listen()};e.prototype={constructor:e,select:function(){var t=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(t)).change(),this.hide()},updater:function(t){return t},show:function(){var e=t.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:e.top+e.height,left:e.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(){var e;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(e=t.isFunction(this.source)?this.source(this.query,t.proxy(this.process,this)):this.source,e?this.process(e):this)},process:function(e){var i=this;return e=t.grep(e,function(t){return i.matcher(t)}),e=this.sorter(e),e.length?this.render(e.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(t){return~t.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(t){for(var e,i=[],n=[],o=[];e=t.shift();)e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?n.push(e):o.push(e):i.push(e);return i.concat(n,o)},highlighter:function(t){var e=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return t.replace(new RegExp("("+e+")","ig"),function(t,e){return"<strong>"+e+"</strong>"})},render:function(e){var i=this;return e=t(e).map(function(e,n){return e=t(i.options.item).attr("data-value",n),e.find("a").html(i.highlighter(n)),e[0]}),e.first().addClass("active"),this.$menu.html(e),this},next:function(){var e=this.$menu.find(".active").removeClass("active"),i=e.next();i.length||(i=t(this.$menu.find("li")[0])),i.addClass("active")},prev:function(){var t=this.$menu.find(".active").removeClass("active"),e=t.prev();e.length||(e=this.$menu.find("li").last()),e.addClass("active")},listen:function(){this.$element.on("focus",t.proxy(this.focus,this)).on("blur",t.proxy(this.blur,this)).on("keypress",t.proxy(this.keypress,this)).on("keyup",t.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",t.proxy(this.keydown,this)),this.$menu.on("click",t.proxy(this.click,this)).on("mouseenter","li",t.proxy(this.mouseenter,this)).on("mouseleave","li",t.proxy(this.mouseleave,this))},eventSupported:function(t){var e=t in this.$element;return e||(this.$element.setAttribute(t,"return;"),e="function"==typeof this.$element[t]),e},move:function(t){if(this.shown){switch(t.keyCode){case 9:case 13:case 27:t.preventDefault();break;case 38:t.preventDefault(),this.prev();break;case 40:t.preventDefault(),this.next()}t.stopPropagation()}},keydown:function(e){this.suppressKeyPressRepeat=~t.inArray(e.keyCode,[40,38,9,13,27]),this.move(e)},keypress:function(t){this.suppressKeyPressRepeat||this.move(t)},keyup:function(t){switch(t.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}t.stopPropagation(),t.preventDefault()},focus:function(){this.focused=!0},blur:function(){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(t){t.stopPropagation(),t.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(e){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),t(e.currentTarget).addClass("active")},mouseleave:function(){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var i=t.fn.typeahead;t.fn.typeahead=function(i){return this.each(function(){var n=t(this),o=n.data("typeahead"),s="object"==typeof i&&i;o||n.data("typeahead",o=new e(this,s)),"string"==typeof i&&o[i]()})},t.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},t.fn.typeahead.Constructor=e,t.fn.typeahead.noConflict=function(){return t.fn.typeahead=i,this},t(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(){var e=t(this);e.data("typeahead")||e.typeahead(e.data())})}(window.jQuery);