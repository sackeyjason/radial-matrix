parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"spnm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateFps=t,exports.renderFps=l;var e=0;function t(t){if((e+=t)>1e3)return e=0,Math.round(1/(t/1e3))}function l(e,t){e.fillStyle="#333",e.fillRect(0,0,80,32),e.font="14px Arial",e.fillStyle="#CCC",e.fillText("FPS: "+t,10,20)}
},{}],"dLQP":[function(require,module,exports) {
"use strict";function e(e,t){var n=this;this.mode="normal",this.init=function(){e.addEventListener("change",function(){n.mode=e.value,"nuts"===e.value&&t.push("go nuts")}),e.value="normal"}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"efjR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={37:"left",38:"rotateR",39:"right",40:"down",90:"rotateL",88:"rotateR",32:"hardDrop",13:"enter"},e={init:function(e,r){e.addEventListener("keydown",function(e){var n=t[e.keyCode];n&&r.push(["input",n])}),e.querySelectorAll("button").forEach(function(t){t.addEventListener("touchstart",function(t){r.push(["input",t.target.dataset.input])})})}},r=e;exports.default=r;
},{}],"RNGY":[function(require,module,exports) {
"use strict";function r(r,a){if(!Array.isArray(r))throw new Error("shuffle expect an array as parameter.");a=a||{};var e,t,o=r,n=r.length,f=a.rng||Math.random;for(!0===a.copy&&(o=r.slice());n;)e=Math.floor(f()*n),t=o[n-=1],o[n]=o[e],o[e]=t;return o}r.pick=function(r,a){if(!Array.isArray(r))throw new Error("shuffle.pick() expect an array as parameter.");var e=(a=a||{}).rng||Math.random,t=a.picks||1;if("number"==typeof t&&1!==t){for(var o,n=r.length,f=r.slice(),i=[];t&&n;)o=Math.floor(e()*n),i.push(f[o]),f.splice(o,1),n-=1,t-=1;return i}return r[Math.floor(e()*r.length)]},module.exports=r;
},{}],"QcRT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getWrapX=y,exports.getPieceGridCoords=d,exports.doesCollide=v,exports.spawn=b,exports.getNext=m,exports.removeLines=x,exports.pieces=void 0;var e=r(require("shuffle-array"));function r(e){return e&&e.__esModule?e:{default:e}}function t(e){return a(e)||o(e)||c(e)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function a(e){if(Array.isArray(e))return s(e)}function i(e,r){return l(e)||f(e,r)||c(e,r)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,r){if(e){if("string"==typeof e)return s(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?s(e,r):void 0}}function s(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function f(e,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return t}}function l(e){if(Array.isArray(e))return e}var p={screenWidth:640,screenHeight:480,gridWidth:32,gridHeight:20,voidRadius:16,crustThickness:16},h=[];function y(e){return function r(t){return t>=e?t%e:t<0?r(e+t):t}}function d(e,r){var t=y(r[0].length),n=[];return e.shape.forEach(function(r,t){r.forEach(function(r,o){r&&n.push([o+e.x,t+e.y])})}),n=n.map(function(r){var n=i(r,2),o=n[0],a=n[1];if(0===e.angle)return[t(o),a];var u=e.x+e.centre[0],c=e.y+e.centre[1],s=o-u,f=a-c;if(1===e.angle){var l=[f,-s];s=l[0],f=l[1]}else if(2===e.angle){var p=[-s,-f];s=p[0],f=p[1]}else if(3===e.angle){var h=[-f,s];s=h[0],f=h[1]}return f+=c,[t(s+=u),f]})}function v(e,r){var t;return d(e,r).forEach(function(e){var n=i(e,2),o=n[0],a=n[1];a>=r.length&&(t=!0),r[a]&&r[a][o]&&(t=!0)}),t}var g={i:{shape:[[1,1,1,1]],centre:[1.5,.5]},t:{shape:[[0,1],[1,1,1]],centre:[1,1]},z:{shape:[[1,1],[0,1,1]],centre:[1,1]},s:{shape:[[0,1,1],[1,1]],centre:[1,1]},o:{shape:[[1,1],[1,1]],centre:[.5,.5]},l:{shape:[[0,0,1],[1,1,1]],centre:[1,1]},j:{shape:[[1,0,0],[1,1,1]],centre:[1,1]}};function b(){var e={x:14,y:0,type:m(),angle:0};return e.shape=g[e.type].shape,e.centre=g[e.type].centre,h.shift(),e}function m(){if(0===h.length){var r=Object.keys(g);(0,e.default)(r),h.push.apply(h,t(r))}return h[0]}function x(e,r){e.reverse().forEach(function(e){r.splice(e,1)});for(var t=0;t<e.length;t++){var n=new Array(32).fill(0);r.unshift(n)}}exports.pieces=g;
},{"shuffle-array":"RNGY"}],"rHDN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getAngle=e,exports.getCircleToGrid=void 0;var t=function(t){var r=t.GRID_WIDTH,e=t.GRID_HEIGHT,o=t.VOID_RADIUS,a=t.ACTIVE_RADIUS;return function(t,n){return[Math.floor(t/(2*Math.PI)*r),Math.floor((n-o)/a*e)]}};exports.getCircleToGrid=t;var r=Math.PI/2;function e(t,e){var o=Math.atan(e/t)+r;return t<0&&(o+=Math.PI),o}
},{}],"ZrUx":[function(require,module,exports) {
module.exports=function(e){var t=String.prototype.split,n=/()??/.exec("")[1]===e;return function(l,r,i){if("[object RegExp]"!==Object.prototype.toString.call(r))return t.call(l,r,i);var o,p,s,c,g=[],u=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),x=0;r=new RegExp(r.source,u+"g");for(l+="",n||(o=new RegExp("^"+r.source+"$(?!\\s)",u)),i=i===e?-1>>>0:i>>>0;(p=r.exec(l))&&!((s=p.index+p[0].length)>x&&(g.push(l.slice(x,p.index)),!n&&p.length>1&&p[0].replace(o,function(){for(var t=1;t<arguments.length-2;t++)arguments[t]===e&&(p[t]=e)}),p.length>1&&p.index<l.length&&Array.prototype.push.apply(g,p.slice(1)),c=p[0].length,x=s,g.length>=i));)r.lastIndex===p.index&&r.lastIndex++;return x===l.length?!c&&r.test("")||g.push(""):g.push(l.slice(x)),g.length>i?g.slice(0,i):g}}();
},{}],"rcym":[function(require,module,exports) {
var r=[].indexOf;module.exports=function(e,n){if(r)return e.indexOf(n);for(var f=0;f<e.length;++f)if(e[f]===n)return f;return-1};
},{}],"Cm2G":[function(require,module,exports) {
var n=require("indexof");function t(t){var u=t.classList;if(u)return u;var i={add:o,remove:a,contains:c,toggle:function(n){return c(n)?(a(n),!1):(o(n),!0)},toString:function(){return t.className},length:0,item:function(n){return l()[n]||null}};return i;function o(t){var r=l();n(r,t)>-1||(r.push(t),f(r))}function a(t){var r=l(),e=n(r,t);-1!==e&&(r.splice(e,1),f(r))}function c(t){return n(l(),t)>-1}function l(){return r(t.className.split(" "),e)}function f(n){var r=n.length;t.className=n.join(" "),i.length=r;for(var e=0;e<n.length;e++)i[e]=n[e];delete n[r]}}function r(n,t){for(var r=[],e=0;e<n.length;e++)t(n[e])&&r.push(n[e]);return r}function e(n){return!!n}module.exports=t;
},{"indexof":"rcym"}],"f88W":[function(require,module,exports) {

},{}],"Lm8C":[function(require,module,exports) {
var e=require("browser-split"),t=require("class-list"),n="undefined"==typeof window?require("html-element"):window,r=n.document,i=n.Text;function o(){var n=[];function o(){var o=[].slice.call(arguments),s=null;function u(o){var c,p;if(null==o);else if("string"==typeof o)s?s.appendChild(c=r.createTextNode(o)):(p=e(o,/([\.#]?[^\s#.]+)/),/^\.|#/.test(p[1])&&(s=r.createElement("div")),l(p,function(e){var n=e.substring(1,e.length);e&&(s?"."===e[0]?t(s).add(n):"#"===e[0]&&s.setAttribute("id",n):s=r.createElement(e))}));else if("number"==typeof o||"boolean"==typeof o||o instanceof Date||o instanceof RegExp)s.appendChild(c=r.createTextNode(o.toString()));else if(a(o))l(o,u);else if(f(o))s.appendChild(c=o);else if(o instanceof i)s.appendChild(c=o);else if("object"==typeof o)for(var d in o)if("function"==typeof o[d])/^on\w+/.test(d)?function(e,t){s.addEventListener?(s.addEventListener(e.substring(2),t[e],!1),n.push(function(){s.removeEventListener(e.substring(2),t[e],!1)})):(s.attachEvent(e,t[e]),n.push(function(){s.detachEvent(e,t[e])}))}(d,o):(s[d]=o[d](),n.push(o[d](function(e){s[d]=e})));else if("style"===d)if("string"==typeof o[d])s.style.cssText=o[d];else for(var h in o[d])!function(e,t){if("function"==typeof t)s.style.setProperty(e,t()),n.push(t(function(t){s.style.setProperty(e,t)}));else var r=o[d][e].match(/(.*)\W+!important\W*$/);r?s.style.setProperty(e,r[1],"important"):s.style.setProperty(e,o[d][e])}(h,o[d][h]);else if("attrs"===d)for(var y in o[d])s.setAttribute(y,o[d][y]);else"data-"===d.substr(0,5)?s.setAttribute(d,o[d]):s[d]=o[d];else if("function"==typeof o){y=o();s.appendChild(c=f(y)?y:r.createTextNode(y)),n.push(o(function(e){f(e)&&c.parentElement?(c.parentElement.replaceChild(e,c),c=e):c.textContent=e}))}return c}for(;o.length;)u(o.shift());return s}return o.cleanup=function(){for(var e=0;e<n.length;e++)n[e]();n.length=0},o}var s=module.exports=o();function f(e){return e&&e.nodeName&&e.nodeType}function l(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n++)t(e[n],n)}function a(e){return"[object Array]"==Object.prototype.toString.call(e)}s.context=o;
},{"browser-split":"ZrUx","class-list":"Cm2G","html-element":"f88W"}],"A2T1":[function(require,module,exports) {
"use strict";var e=require("./fps"),t=a(require("./mode_selector")),r=a(require("./input")),n=require("./game"),o=require("./geometry"),i=a(require("hyperscript"));function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){c(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e,t){return y(e)||p(e,t)||s(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}}function y(e){if(Array.isArray(e))return e}var h,v,g=640,b=480,w=32,O=14,S=16,A=16,M=[(g-1)/2,(b-1)/2],j=b/2-(S+A),x=b-1*A,q={x:(g-x)/2,y:A,bottom:b-A,w:(g-x)/2+x},C=[],E={},I=null,P=null,D=!0,R=(0,n.getWrapX)(w),k=new Array(O).fill(null).map(function(){return new Array(w).fill(0)});function _(){k.forEach(function(e){e.fill(0)})}function G(e,t){return k[t]&&k[t][e]}var T=(0,o.getCircleToGrid)({GRID_WIDTH:w,GRID_HEIGHT:O,VOID_RADIUS:S,ACTIVE_RADIUS:j});function F(e){h.fillStyle="rgba(0, 0, 0, 1)",h.fillRect(0,0,g,b);var t=2,r=0;"colour"===E.mode?(r=B/w*360,h.fillStyle="hsla(".concat(r,"deg, 100%, 80%, 1.0)")):"nuts"===E.mode?(r=B/(w/20)*360,h.fillStyle="hsla(".concat(r,"deg, 100%, 80%, 1.0)")):"vcr"===E.mode?(h.fillStyle="rgb(10,250,100)",t=1):h.fillStyle="rgb(200,200,200)";for(var n=M[0],i=M[1],a=q.y;a<q.bottom;a+=2)for(var l=q.x;l<q.w;l+=2){var u=l-n,c=a-i,d=Math.sqrt(Math.pow(u,2)+Math.pow(c,2)),s=(0,o.getAngle)(u,c),m=f(T(s,d),2),p=m[0],y=m[1],v=0;if("fuzzy"===E.mode?v=3*Math.random()-1.5:"nuts"===E.mode&&(v=6*Math.random()-3),z&&(v=Math.random()*z-z/2),e[y]&&e[y][p]){var O=2===e[y][p],S=3===e[y][p];if("colour"===E.mode||"nuts"===E.mode){var A=(r+s/(2*Math.PI)*360)%360;h.fillStyle="hsla(".concat(A,"deg, 100%, 80%, 1.0)")}else if(O)h.fillStyle="rgb(255,100,50)";else if(S){v=3*Math.random()-1.5;var j=(r+s/(2*Math.PI)*360)%360;h.fillStyle="hsla(".concat(j,"deg, 100%, 80%, 1.0)")}else h.fillStyle="rgb(200,200,200)";h.fillRect(l,a,2+v,t+v)}}}function H(){return function(e){K();var t=e.target.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top,i=g/t.width;n*=i;var a=(r*=i)-M[0],l=n-M[1],u=Math.sqrt(Math.pow(a,2)+Math.pow(l,2)),c=(0,o.getAngle)(a,l),d=f(T(c,u),2),s=d[0],m=d[1];k[m]&&(k[m][s]=1)}}function L(){(0,n.getPieceGridCoords)(P,k).forEach(function(e){var t=f(e,2),r=t[0],n=t[1];k[n]&&(k[n][r]=1)}),P=null}var U,z=0,V=.1;function W(e){if("go nuts"===e)z=50;else if("input"===e[0]){if("enter"===e[1]&&D){_(),D=!1;var t=document.querySelector(".main-menu");return void t.parentElement.removeChild(t)}if(P&&!D)switch(e[1]){case"left":(0,n.doesCollide)(u(u({},P),{},{x:R(P.x+1)}),k)||(P.x=R(P.x+1));break;case"right":(0,n.doesCollide)(u(u({},P),{},{x:R(P.x-1)}),k)||(P.x=R(P.x-1));break;case"down":(0,n.doesCollide)(u(u({},P),{},{y:P.y+1}),k)?L():P.y+=1;break;case"rotateR":P.angle=(P.angle+1)%4;break;case"rotateL":P.angle=P.angle-1,P.angle<0&&(P.angle=3)}}else e[0]}var X,B=0,N=2/30/32;function Y(t){for(;C.length;){W(C.shift())}if(X=(0,e.updateFps)(t)||X,B=R(B+N*t),z=Math.max(0,z-V*t),v=k.map(function(e){return e.slice()}),P)(0,n.getPieceGridCoords)(P,k).forEach(function(e){var t=f(e,2),r=t[0],n=t[1];n<0||v[n]&&(v[n][r]=2)});else if(I)K()-I.at>=500&&((0,n.removeLines)(I.lines,k),v=k,I=null);else{var r=[];v.forEach(function(e,t){void 0===e.find(function(e){return 0===e})&&(r.push(t),k[t].fill(3))}),r.length?I={lines:r,at:K()}:D||(P=(0,n.spawn)(),(0,n.doesCollide)(P,k)&&(P=null,$()))}}function $(){D=!0;var e=(0,i.default)("div.main-menu",[(0,i.default)("div",[(0,i.default)("h1","Orbital"),(0,i.default)("h2","Radial Matrix")]),(0,i.default)("nav",(0,i.default)("div","Hit Enter/Tap to start"))]);document.querySelector("body").appendChild(e)}function J(){F(v)}function K(){return window.performance&&window.performance.now?window.performance.now():Date.now()}var Q=K();function Z(){var e=K();void 0===U&&(U=e);Y(Math.min(1e3,e-Q)),J(),Q=e,window.requestAnimationFrame(Z)}function ee(){view.setAttribute("width",g),view.setAttribute("height",b),h=view.getContext("2d"),r.default.init(document,C),view.addEventListener("click",H()),document.addEventListener("click",function(){return C.push(["input","enter"])}),P=(0,n.spawn)(),console.log((0,n.getNext)()),$(),window.requestAnimationFrame(Z)}window.requestAnimationFrame(Z),ee();
},{"./fps":"spnm","./mode_selector":"dLQP","./input":"efjR","./game":"QcRT","./geometry":"rHDN","hyperscript":"Lm8C"}]},{},["A2T1"], null)
//# sourceMappingURL=app.adc9daa0.js.map