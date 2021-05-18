!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.errorRetry=t():(e.xgplayer=e.xgplayer||{},e.xgplayer.PlayerControls=e.xgplayer.PlayerControls||{},e.xgplayer.PlayerControls.errorRetry=t())}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e){e.exports=JSON.parse('{"a":"2.20.7"}')},function(e,t,r){"use strict";r.r(t);var n=r(0);const o={network:{code:1,msg:"视频下载错误",remark:"只要视频下载错误就使用此类型，无论是video本身的超时还是xhr的分段请求超时或者资源不存在"},mse:{code:2,msg:"流追加错误",remark:"追加流的时候如果类型不对、无法被正确解码则会触发此类错误"},parse:{code:3,msg:"解析错误",remark:"mp4、hls、flv我们都是使用js进行格式解析，如果解析失败则会触发此类错误"},format:{code:4,msg:"格式错误",remark:"如果浏览器不支持的格式导致播放错误"},decoder:{code:5,msg:"解码错误",remark:"浏览器解码异常会抛出此类型错误"},runtime:{code:6,msg:"语法错误",remark:"播放器语法错误"},timeout:{code:7,msg:"播放超时",remark:"播放过程中无法正常请求下一个分段导致播放中断"},other:{code:8,msg:"其他错误",remark:"不可知的错误或被忽略的错误类型"}};var i=class{constructor(e,t,r,i,s,a,u,c,d={line:"",handle:"",msg:"",version:""},l,m){let f={};if(arguments.length>1)f.playerVersion=n.a,f.errorType=e,f.domain=document.domain,f.duration=r,f.currentTime=t,f.networkState=i,f.readyState=s,f.currentSrc=u,f.src=a,f.ended=c,f.errd=d,f.ex=(o[e]||{}).msg,f.errorCode=l,f.mediaError=m;else{const e=arguments[0];Object.keys(e).map(t=>{f[t]=e[t]}),f.ex=(e.type&&o[e.type]||{}).msg}return f}};const s={maxCount:3,backupUrl:"",isFetch:!0,fetchTimeout:100};var a={name:"errorretry",method:function(){const e=this;if(!e.config.errorConfig||e.src.indexOf("blob:")>-1)return;const t={},r=e.config.errorConfig;for(const e in s)void 0===r[e]?t[e]=s[e]:t[e]=r[e];function n(){this.currentTime=this.retryData.currentTime,this.play(),this.retryData.retryCode=0,this.retryData.isFetchReturn=!1,this.retryData.currentTime=0}e.retryData={count:0,errfTimer:null,isFetchReturn:!1,currentTime:0};const o=e._onError;e._onError=r=>{const s=this.retryData.count;if(s>t.maxCount)return void(t.isFetch?function(e,t,r){const n=(t,r)=>{e.retryData.isFetchReturn||(e.retryData.isFetchReturn=!0,t(r))};return new Promise((o,i)=>{try{let i=new window.XMLHttpRequest;i.open("get",t),i.onload=function(){n(o,{status:i.status,statusText:i.statusText,xhr:i})},i.onerror=function(){n(o,{status:i.status,statusText:i.statusText||"The network environment is disconnected or the address is invalid",xhr:i})},i.onabort=function(){},e.retryData.errfTimer=window.setTimeout(()=>{let t=e.retryData.errfTimer;window.clearTimeout(t),e.retryData.errfTimer=null,n(o,{status:-1,statusText:"request timeout"})},r),i.send()}catch(t){e.retryData.isFetchReturn=!0,n(o,{status:-2,statusText:"request error"})}})}(this,this.currentSrc,t.fetchTimeout).then(e=>{this.emit("error",new i({type:"network",currentTime:this.currentTime,duration:this.duration||0,networkState:this.networkState,readyState:this.readyState,currentSrc:this.currentSrc,src:this.src,ended:this.ended,httpCode:e.status,httpMsg:e.statusText,errd:{line:101,msg:this.error,handle:"plugin errorRetry"},errorCode:this.video&&this.video.error.code,mediaError:this.video&&this.video.error})),o.call(this,e)}):o.call(this,r));0===s&&(this.retryData.currentTime=this.currentTime,this.once("canplay",n.bind(this)));let a="";a=t.count<2?t.backupUrl?t.backupUrl:e.currentSrc:t.backupUrl&&s>1?t.backupUrl:e.currentSrc,this.retryData.count++,this.src=a}}};t.default={name:"errorRetry",method:function(){a.method.call(this)}}}])}));