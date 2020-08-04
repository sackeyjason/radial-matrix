parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"spnm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateFps=t,exports.renderFps=l;var e=0;function t(t){if((e+=t)>1e3)return e=0,Math.round(1/(t/1e3))}function l(e,t){e.fillStyle="#333",e.fillRect(0,0,80,32),e.font="14px Arial",e.fillStyle="#CCC",e.fillText("FPS: "+t,10,20)}
},{}],"dLQP":[function(require,module,exports) {
"use strict";function e(e,t){var n=this;this.mode="normal",this.init=function(){e.addEventListener("change",function(){n.mode=e.value,"nuts"===e.value&&t.push("go nuts")}),e.value="normal"}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"efjR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t={37:"left",38:"rotateR",39:"right",40:"down",90:"rotateL",88:"rotateR",32:"hardDrop",13:"enter"},e={init:function(e,r){e.addEventListener("keydown",function(e){var n=t[e.keyCode];n&&r.push(["input",n])}),e.querySelectorAll("button").forEach(function(t){t.addEventListener("touchstart",function(t){r.push(["input",t.target.dataset.input])})})}},r=e;exports.default=r;
},{}],"RNGY":[function(require,module,exports) {
"use strict";function r(r,a){if(!Array.isArray(r))throw new Error("shuffle expect an array as parameter.");a=a||{};var e,t,o=r,n=r.length,f=a.rng||Math.random;for(!0===a.copy&&(o=r.slice());n;)e=Math.floor(f()*n),t=o[n-=1],o[n]=o[e],o[e]=t;return o}r.pick=function(r,a){if(!Array.isArray(r))throw new Error("shuffle.pick() expect an array as parameter.");var e=(a=a||{}).rng||Math.random,t=a.picks||1;if("number"==typeof t&&1!==t){for(var o,n=r.length,f=r.slice(),i=[];t&&n;)o=Math.floor(e()*n),i.push(f[o]),f.splice(o,1),n-=1,t-=1;return i}return r[Math.floor(e()*r.length)]},module.exports=r;
},{}],"QcRT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getWrapX=d,exports.getPieceGridCoords=g,exports.doesCollide=m,exports.spawn=j,exports.getNext=x,exports.removeLines=w,exports.calculatePoints=P,exports.start=S,exports.tryRotate=I,exports.pieces=void 0;var e=r(require("shuffle-array"));function r(e){return e&&e.__esModule?e:{default:e}}function t(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function n(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(Object(n),!0).forEach(function(r){o(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e){return u(e)||c(e)||l(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function u(e){if(Array.isArray(e))return p(e)}function s(e,r){return h(e)||y(e,r)||l(e,r)||f()}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,r){if(e){if("string"==typeof e)return p(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?p(e,r):void 0}}function p(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function y(e,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(u){o=!0,a=u}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return t}}function h(e){if(Array.isArray(e))return e}var v={screenWidth:640,screenHeight:480,gridWidth:32,gridHeight:20,voidRadius:16,crustThickness:16},b=[];function d(e){return function r(t){return t>=e?t%e:t<0?r(e+t):t}}function g(e,r){var t=d(r[0].length),n=[];return e.shape.forEach(function(r,t){r.forEach(function(r,o){r&&n.push([o+e.x,t+e.y])})}),n=n.map(function(r){var n=s(r,2),o=n[0],a=n[1];if(0===e.angle)return[t(o),a];var i=e.x+e.centre[0],c=e.y+e.centre[1],u=o-i,f=a-c;if(1===e.angle){var l=[f,-u];u=l[0],f=l[1]}else if(2===e.angle){var p=[-u,-f];u=p[0],f=p[1]}else if(3===e.angle){var y=[-f,u];u=y[0],f=y[1]}return f+=c,[t(u+=i),f]})}function m(e,r){var t;return g(e,r).forEach(function(e){var n=s(e,2),o=n[0],a=n[1];a>=r.length&&(t=!0),r[a]&&r[a][o]&&(t=!0)}),t}var O={i:{shape:[[1,1,1,1]],centre:[1.5,.5]},t:{shape:[[0,1],[1,1,1]],centre:[1,1]},z:{shape:[[1,1],[0,1,1]],centre:[1,1]},s:{shape:[[0,1,1],[1,1]],centre:[1,1]},o:{shape:[[1,1],[1,1]],centre:[.5,.5]},l:{shape:[[0,0,1],[1,1,1]],centre:[1,1]},j:{shape:[[1,0,0],[1,1,1]],centre:[1,1]}};function j(){var e={x:14,y:0,type:x(),angle:0,falling:0,fallNext:1};return e.shape=O[e.type].shape,e.centre=O[e.type].centre,b.shift(),e}function x(){if(0===b.length){var r=Object.keys(O);(0,e.default)(r),b.push.apply(b,a(r))}return b[0]}function w(e,r){e.reverse().forEach(function(e){r.splice(e,1)});for(var t=0;t<e.length;t++){var n=new Array(32).fill(0);r.unshift(n)}}function P(e,r){return 1===e?100:2===e?300:3===e?500:800}function S(){var e=this;this.score=0,this.addScore=function(r){e.score+=r}}exports.pieces=O;var A={"01":[[0,0],[-2,0],[1,0],[-2,-1],[1,2]],10:[[0,0],[2,0],[-1,0],[2,1],[-1,-2]],12:[[0,0],[-1,0],[2,0],[-1,2],[2,-1]],21:[[0,0],[1,0],[-2,0],[1,-2],[-2,1]],23:[[0,0],[2,0],[-1,0],[2,1],[-1,-2]],32:[[0,0],[-2,0],[1,0],[-2,-1],[1,2]],30:[[0,0],[1,0],[-2,0],[1,-2],[-2,1]],"03":[[0,0],[-1,0],[2,0],[-1,2],[2,-1]]},E={"01":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],10:[[0,0],[1,0],[1,-1],[0,2],[1,2]],12:[[0,0],[1,0],[1,-1],[0,2],[1,2]],21:[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],23:[[0,0],[1,0],[1,1],[0,-2],[1,-2]],32:[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],30:[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"03":[[0,0],[1,0],[1,1],[0,-2],[1,-2]]};function I(e,r){console.log("piece: ",e);var t=d(r[0].length),o=("i"===e.type?A:E)["".concat(e.rotatedFrom).concat(e.angle)];console.log("sequence: ",o);for(var a=0;a<o.length;a++){var i=o[a];console.log("d: ",i);var c=n(n({},e),{},{x:t(e.x-i[0]),y:e.y-i[1]});if(!m(c,r))return c}}
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
"use strict";var e=require("./fps"),t=a(require("./mode_selector")),r=a(require("./input")),n=require("./game"),o=require("./geometry"),i=a(require("hyperscript"));function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){c(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e,t){return v(e)||m(e,t)||s(e,t)||d()}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function m(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}}function v(e){if(Array.isArray(e))return e}var h,p,g=640,b=480,w=32,S=14,O=16,A=16,M=[(g-1)/2,(b-1)/2],x=b/2-(O+A),j=b-1*A,E={x:(g-j)/2,y:A,bottom:b-A,w:(g-j)/2+j},P=[],C={},q=null,I=null,D=!0,R=null,k=(0,n.getWrapX)(w),G=new Array(S).fill(null).map(function(){return new Array(w).fill(0)});function _(){G.forEach(function(e){e.fill(0)})}function T(e,t){return G[t]&&G[t][e]}var F=(0,o.getCircleToGrid)({GRID_WIDTH:w,GRID_HEIGHT:S,VOID_RADIUS:O,ACTIVE_RADIUS:x});function H(e){h.fillStyle="rgba(0, 0, 0, 1)",h.fillRect(0,0,g,b);var t=2,r=0;"colour"===C.mode?(r=Y/w*360,h.fillStyle="hsla(".concat(r,"deg, 100%, 80%, 1.0)")):"nuts"===C.mode?(r=Y/(w/20)*360,h.fillStyle="hsla(".concat(r,"deg, 100%, 80%, 1.0)")):"vcr"===C.mode?(h.fillStyle="rgb(10,250,100)",t=1):h.fillStyle="rgb(200,200,200)";for(var n=M[0],i=M[1],a=E.y;a<E.bottom;a+=2)for(var l=E.x;l<E.w;l+=2){var u=l-n,c=a-i,d=Math.sqrt(Math.pow(u,2)+Math.pow(c,2)),s=(0,o.getAngle)(u,c),y=f(F(s,d),2),m=y[0],v=y[1],p=0;if("fuzzy"===C.mode?p=3*Math.random()-1.5:"nuts"===C.mode&&(p=6*Math.random()-3),z&&(p=Math.random()*z-z/2),e[v]&&e[v][m]){var S=2===e[v][m],O=3===e[v][m];if("colour"===C.mode||"nuts"===C.mode){var A=(r+s/(2*Math.PI)*360)%360;h.fillStyle="hsla(".concat(A,"deg, 100%, 80%, 1.0)")}else if(S)h.fillStyle="rgb(255,100,50)";else if(O){p=3*Math.random()-1.5;var x=(r+s/(2*Math.PI)*360)%360;h.fillStyle="hsla(".concat(x,"deg, 100%, 80%, 1.0)")}else h.fillStyle="rgb(200,200,200)";h.fillRect(l,a,2+p,t+p)}}}function L(){return function(e){ee();var t=e.target.getBoundingClientRect(),r=e.clientX-t.left,n=e.clientY-t.top,i=g/t.width;n*=i;var a=(r*=i)-M[0],l=n-M[1],u=Math.sqrt(Math.pow(a,2)+Math.pow(l,2)),c=(0,o.getAngle)(a,l),d=f(F(c,u),2),s=d[0],y=d[1];G[y]&&(G[y][s]=1)}}function N(){(0,n.getPieceGridCoords)(I,G).forEach(function(e){var t=f(e,2),r=t[0],n=t[1];G[n]&&(G[n][r]=1)}),I=null}function U(){R=new n.start,console.log("round: ",R),_(),D=!1;var e=document.querySelector(".main-menu");e.parentElement.removeChild(e)}var V,z=0,W=.1;function X(e){if("go nuts"===e)z=50;else if("input"===e[0]){if("enter"===e[1]&&D)return void U();if(I&&!D)switch(e[1]){case"left":(0,n.doesCollide)(u(u({},I),{},{x:k(I.x+1)}),G)||(I.x=k(I.x+1));break;case"right":(0,n.doesCollide)(u(u({},I),{},{x:k(I.x-1)}),G)||(I.x=k(I.x-1));break;case"down":(0,n.doesCollide)(u(u({},I),{},{y:I.y+1}),G)?N():I.y+=1;break;case"rotateR":I.rotation=1;break;case"rotateL":I.rotation=-1}}else e[0]}var B,Y=0,$=2/30/32,J=0;function K(t){for(;P.length;){X(P.shift())}if(B=(0,e.updateFps)(t)||B,Y=k(Y+$*t),z=Math.max(0,z-W*t),p=G.map(function(e){return e.slice()}),I){if(I.falling+=t*J,I.falling>I.fallNext){if(I.fallNext++,(0,n.doesCollide)(u(u({},I),{},{y:I.y+1}),G))return void N();I.y+=1}if(I.rotation&&"o"!==I.type){var r=u(u({},I),{},{rotation:0,rotatedFrom:I.angle,angle:{"-1":3,0:0,1:1,2:2,3:3,4:0}[I.angle+I.rotation]}),o=(0,n.tryRotate)(r,G);(I=o||I).rotation=0}(0,n.getPieceGridCoords)(I,G).forEach(function(e){var t=f(e,2),r=t[0],n=t[1];n<0||p[n]&&(p[n][r]=2)})}else if(q)ee()-q.at>=500&&((0,n.removeLines)(q.lines,G),p=G,q=null);else{var i=[];if(p.forEach(function(e,t){void 0===e.find(function(e){return 0===e})&&(i.push(t),G[t].fill(3))}),i.length){q={lines:i,at:ee()};var a=(0,n.calculatePoints)(i.length);R.addScore(a,{level:1,lastPiece:null})}else D||(I=(0,n.spawn)(),(0,n.doesCollide)(I,G)&&(I=null,Q("GAME OVER",{lastScore:R.score})))}}function Q(e,t){D=!0;var r=(0,i.default)("div.main-menu",[(0,i.default)("div",[(0,i.default)("h1","Orbital"),(0,i.default)("h2","Radial Matrix")]),(0,i.default)("nav",(0,i.default)("div","Hit Enter/Tap to start")),t&&(0,i.default)("div.lastScore",t.lastScore)]);document.querySelector("body").appendChild(r)}function Z(){H(p)}function ee(){return window.performance&&window.performance.now?window.performance.now():Date.now()}var te=ee();function re(){var e=ee();void 0===V&&(V=e);K(Math.min(1e3,e-te)),Z(),te=e,window.requestAnimationFrame(re)}function ne(){view.setAttribute("width",g),view.setAttribute("height",b),h=view.getContext("2d"),r.default.init(document,P),view.addEventListener("click",L()),document.addEventListener("click",function(){return P.push(["input","enter"])}),console.log((0,n.getNext)()),Q(),window.requestAnimationFrame(re)}window.requestAnimationFrame(re),ne();
},{"./fps":"spnm","./mode_selector":"dLQP","./input":"efjR","./game":"QcRT","./geometry":"rHDN","hyperscript":"Lm8C"}]},{},["A2T1"], null)
//# sourceMappingURL=app.19cad808.js.map