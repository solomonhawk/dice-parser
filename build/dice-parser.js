!function(r,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("diceparser",[],t):"object"==typeof exports?exports.diceparser=t():r.diceparser=t()}(this,function(){return function(r){function t(e){if(n[e])return n[e].exports;var o=n[e]={exports:{},id:e,loaded:!1};return r[e].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=r,t.c=n,t.p="",t(0)}([function(r,t,n){r.exports=n(1)},function(r,t){"use strict";function n(r){if(Array.isArray(r)){for(var t=0,n=Array(r.length);t<r.length;t++)n[t]=r[t];return n}return Array.from(r)}function e(r){var t=[],o=!0,u=!1,i=void 0;try{for(var a,f=r[Symbol.iterator]();!(o=(a=f.next()).done);o=!0){var c=a.value;Array.isArray(c)?t.push.apply(t,n(e(c))):t.push(c)}}catch(l){u=!0,i=l}finally{try{!o&&f["return"]&&f["return"]()}finally{if(u)throw i}}return t}function o(r){return"string"==typeof r&&(r=[r]),d(e(r))}function u(r){var t=r.reduce(i,[]);return e(t)}function i(r,t){var n=t.replace(/\s/g,"").split(",");return r.concat(n)}function a(r){return r.map(function(r){return f(r)})}function f(r){var t=r.split("d"),n=s(t,2),e=n[0],o=n[1];return{count:Number(e),range:Number(o)}}function c(r){return r=r.map(p),{rolls:r,total:l(r)}}function l(r){return r.reduce(function(r,t){return r+t.result},0)}function p(r){var t=r.count;for(r.result=0;t--;)r.result+=1+Math.floor(Math.random()*r.range);return r}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function r(r,t){var n=[],e=!0,o=!1,u=void 0;try{for(var i,a=r[Symbol.iterator]();!(e=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(f){o=!0,u=f}finally{try{!e&&a["return"]&&a["return"]()}finally{if(o)throw u}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return r(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.roll=o;var y=function(){for(var r=arguments.length,t=Array(r),n=0;r>n;n++)t[n]=arguments[n];return t.reduceRight(function(r,t){return function(){return r(t.apply(void 0,arguments))}})},d=y(u,a,c)}])});
//# sourceMappingURL=dice-parser.js.map