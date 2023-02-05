"use strict";var e=require("postcss-value-parser");function hasFallback(e){const s=e.parent;if(!s)return!1;const t=e.prop.toLowerCase(),r=s.index(e);for(let e=0;e<r;e++){const r=s.nodes[e];if("decl"===r.type&&r.prop.toLowerCase()===t)return!0}return!1}const creator=s=>{const t=Object.assign({preserve:!1},s);return{postcssPlugin:"postcss-color-hex-alpha",Declaration(s){if(!/#([0-9A-Fa-f]{4}(?:[0-9A-Fa-f]{4})?)\b/.test(s.value))return;if(hasFallback(s))return;const{value:r}=s,a=e(r);a.walk((e=>{if("function"===e.type&&"url"===e.value)return!1;isAlphaHex(e)&&hexa2rgba(e)}));const n=a.toString();n!==r&&(s.cloneBefore({value:n}),t.preserve||s.remove())}}};function isAlphaHex(e){return"word"===e.type&&/^#([0-9A-Fa-f]{4}(?:[0-9A-Fa-f]{4})?)$/.test(e.value)}creator.postcss=!0;const s=1e5,hexa2rgba=e=>{const t=e.value,r=`0x${5===t.length?t.slice(1).replace(/[0-9A-Fa-f]/g,"$&$&"):t.slice(1)}`,[a,n,o,l]=[parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16),parseInt(r.slice(6,8),16),Math.round(parseInt(r.slice(8,10),16)/255*s)/s];e.value=`rgba(${a},${n},${o},${l})`};module.exports=creator;
