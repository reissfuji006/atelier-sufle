var Wl=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Am=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Ql={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,y=(s&3)<<4|c>>4,b=(c&15)<<2|d>>6,R=d&63;l||(R=64,a||(b=64)),r.push(t[p],t[y],t[b],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Wl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Am(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let y=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||y==null)throw new Co;let b=s<<2|c>>4;if(r.push(b),d!==64){let R=c<<4&240|d>>2;if(r.push(R),y!==64){let k=d<<6&192|y;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Co=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Rm=function(n){let e=Wl(n);return Ql.encodeByteArray(e,!0)},lr=function(n){return Rm(n).replace(/\./g,"")},Do=function(n){try{return Ql.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Sm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Pm=()=>Sm().__FIREBASE_DEFAULTS__,Cm=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},km=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Do(n[1]);return e&&JSON.parse(e)},_i=()=>{try{return Pm()||Cm()||km()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},No=n=>{var e,t;return(t=(e=_i())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},yi=n=>{let e=No(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Oo=()=>{var n;return(n=_i())===null||n===void 0?void 0:n.config},xo=n=>{var e;return(e=_i())===null||e===void 0?void 0:e[`_${n}`]};var gi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function vi(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[lr(JSON.stringify(t)),lr(JSON.stringify(a)),""].join(".")}function he(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Jl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(he())}function Dm(){var n;let e=(n=_i())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Yl(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Xl(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Zl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function eh(){let n=he();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function th(){return!Dm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Vo(){try{return typeof indexedDB=="object"}catch{return!1}}function nh(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Nm="FirebaseError",Re=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Nm,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rt.prototype.create)}},rt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Om(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Re(i,c,r)}};function Om(n,e){return n.replace(xm,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var xm=/\{\$([^}]+)}/g;function rh(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(Hl(s)&&Hl(a)){if(!Vt(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Hl(n){return n!==null&&typeof n=="object"}function ln(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function hn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function dn(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function ih(n,e){let t=new ko(n,e);return t.subscribe.bind(t)}var ko=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Vm(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Po),i.error===void 0&&(i.error=Po),i.complete===void 0&&(i.complete=Po);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Vm(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Po(){}var Ww=4*60*60*1e3;function Z(n){return n&&n._delegate?n._delegate:n}var Se=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Lt="[DEFAULT]";var Lo=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new gi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Mm(e))try{this.getOrInitializeService({instanceIdentifier:Lt})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Lt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Lt){return this.instances.has(e)}getOptions(e=Lt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Lt){return this.component?this.component.multipleInstances?e:Lt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Lm(n){return n===Lt?void 0:n}function Mm(n){return n.instantiationMode==="EAGER"}var Ii=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Lo(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Fm=[],G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));var Um={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},Bm=G.INFO,qm={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},jm=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=qm[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},vt=class{constructor(e){this.name=e,this._logLevel=Bm,this._logHandler=jm,this._userLogHandler=null,Fm.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Um[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}};var zm=(n,e)=>e.some(t=>n instanceof t),sh,oh;function Gm(){return sh||(sh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $m(){return oh||(oh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var ah=new WeakMap,Fo=new WeakMap,ch=new WeakMap,Mo=new WeakMap,Bo=new WeakMap;function Km(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(ze(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&ah.set(t,n)}).catch(()=>{}),Bo.set(e,n),e}function Hm(n){if(Fo.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});Fo.set(n,e)}var Uo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Fo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ch.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ze(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function uh(n){Uo=n(Uo)}function Wm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(wi(this),e,...t);return ch.set(r,e.sort?e.sort():[e]),ze(r)}:$m().includes(n)?function(...e){return n.apply(wi(this),e),ze(ah.get(this))}:function(...e){return ze(n.apply(wi(this),e))}}function Qm(n){return typeof n=="function"?Wm(n):(n instanceof IDBTransaction&&Hm(n),zm(n,Gm())?new Proxy(n,Uo):n)}function ze(n){if(n instanceof IDBRequest)return Km(n);if(Mo.has(n))return Mo.get(n);let e=Qm(n);return e!==n&&(Mo.set(n,e),Bo.set(e,n)),e}var wi=n=>Bo.get(n);function hh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=ze(a);return r&&a.addEventListener("upgradeneeded",l=>{r(ze(a.result),l.oldVersion,l.newVersion,ze(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}var Jm=["get","getKey","getAll","getAllKeys","count"],Ym=["put","add","delete","clear"],qo=new Map;function lh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(qo.get(e))return qo.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Ym.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Jm.includes(t)))return;let s=async function(a,...c){let l=this.transaction(a,i?"readwrite":"readonly"),d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return qo.set(e,s),s}uh(n=>({...n,get:(e,t,r)=>lh(e,t)||n.get(e,t,r),has:(e,t)=>!!lh(e,t)||n.has(e,t)}));var zo=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Xm(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Xm(n){let e=n.getComponent();return e?.type==="VERSION"}var Go="@firebase/app",dh="0.10.17";var it=new vt("@firebase/app"),Zm="@firebase/app-compat",eg="@firebase/analytics-compat",tg="@firebase/analytics",ng="@firebase/app-check-compat",rg="@firebase/app-check",ig="@firebase/auth",sg="@firebase/auth-compat",og="@firebase/database",ag="@firebase/data-connect",cg="@firebase/database-compat",ug="@firebase/functions",lg="@firebase/functions-compat",hg="@firebase/installations",dg="@firebase/installations-compat",fg="@firebase/messaging",pg="@firebase/messaging-compat",mg="@firebase/performance",gg="@firebase/performance-compat",_g="@firebase/remote-config",yg="@firebase/remote-config-compat",vg="@firebase/storage",Ig="@firebase/storage-compat",wg="@firebase/firestore",Eg="@firebase/vertexai",Tg="@firebase/firestore-compat",bg="firebase",Ag="11.1.0";var $o="[DEFAULT]",Rg={[Go]:"fire-core",[Zm]:"fire-core-compat",[tg]:"fire-analytics",[eg]:"fire-analytics-compat",[rg]:"fire-app-check",[ng]:"fire-app-check-compat",[ig]:"fire-auth",[sg]:"fire-auth-compat",[og]:"fire-rtdb",[ag]:"fire-data-connect",[cg]:"fire-rtdb-compat",[ug]:"fire-fn",[lg]:"fire-fn-compat",[hg]:"fire-iid",[dg]:"fire-iid-compat",[fg]:"fire-fcm",[pg]:"fire-fcm-compat",[mg]:"fire-perf",[gg]:"fire-perf-compat",[_g]:"fire-rc",[yg]:"fire-rc-compat",[vg]:"fire-gcs",[Ig]:"fire-gcs-compat",[wg]:"fire-fst",[Tg]:"fire-fst-compat",[Eg]:"fire-vertex","fire-js":"fire-js",[bg]:"fire-js-all"};var Ei=new Map,Sg=new Map,Ko=new Map;function fh(n,e){try{n.container.addComponent(e)}catch(t){it.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ge(n){let e=n.name;if(Ko.has(e))return it.debug(`There were multiple attempts to register component ${e}.`),!1;Ko.set(e,n);for(let t of Ei.values())fh(t,n);for(let t of Sg.values())fh(t,n);return!0}function Mt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ne(n){return n.settings!==void 0}var Pg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},It=new rt("app","Firebase",Pg);var Ho=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Se("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw It.create("app-deleted",{appName:this._name})}};var $e=Ag;function _h(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:$o,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw It.create("bad-app-name",{appName:String(i)});if(t||(t=Oo()),!t)throw It.create("no-options");let s=Ei.get(i);if(s){if(Vt(t,s.options)&&Vt(r,s.config))return s;throw It.create("duplicate-app",{appName:i})}let a=new Ii(i);for(let l of Ko.values())a.addComponent(l);let c=new Ho(t,r,a);return Ei.set(i,c),c}function fn(n=$o){let e=Ei.get(n);if(!e&&n===$o&&Oo())return _h();if(!e)throw It.create("no-app",{appName:n});return e}function Pe(n,e,t){var r;let i=(r=Rg[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),it.warn(c.join(" "));return}Ge(new Se(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var Cg="firebase-heartbeat-database",kg=1,hr="firebase-heartbeat-store",jo=null;function yh(){return jo||(jo=hh(Cg,kg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(hr)}catch(t){console.warn(t)}}}}).catch(n=>{throw It.create("idb-open",{originalErrorMessage:n.message})})),jo}async function Dg(n){try{let t=(await yh()).transaction(hr),r=await t.objectStore(hr).get(vh(n));return await t.done,r}catch(e){if(e instanceof Re)it.warn(e.message);else{let t=It.create("idb-get",{originalErrorMessage:e?.message});it.warn(t.message)}}}async function ph(n,e){try{let r=(await yh()).transaction(hr,"readwrite");await r.objectStore(hr).put(e,vh(n)),await r.done}catch(t){if(t instanceof Re)it.warn(t.message);else{let r=It.create("idb-set",{originalErrorMessage:t?.message});it.warn(r.message)}}}function vh(n){return`${n.name}!${n.options.appId}`}var Ng=1024,Og=30*24*60*60*1e3,Wo=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Qo(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=mh();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{let c=new Date(a.date).valueOf();return Date.now()-c<=Og}),this._storage.overwrite(this._heartbeatsCache))}catch(r){it.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=mh(),{heartbeatsToSend:r,unsentEntries:i}=xg(this._heartbeatsCache.heartbeats),s=lr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return it.warn(t),""}}};function mh(){return new Date().toISOString().substring(0,10)}function xg(n,e=Ng){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),gh(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),gh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Qo=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Vo()?nh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Dg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return ph(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return ph(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function gh(n){return lr(JSON.stringify({version:2,heartbeats:n})).length}function Vg(n){Ge(new Se("platform-logger",e=>new zo(e),"PRIVATE")),Ge(new Se("heartbeat",e=>new Wo(e),"PRIVATE")),Pe(Go,dh,n),Pe(Go,dh,"esm2017"),Pe("fire-js","")}Vg("");var Lg="firebase",Mg="11.1.0";Pe(Lg,Mg,"app");function Ti(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Fh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Uh=Fh,Bh=new rt("auth","Firebase",Fh());var ki=new vt("@firebase/auth");function Fg(n,...e){ki.logLevel<=G.WARN&&ki.warn(`Auth (${$e}): ${n}`,...e)}function Ai(n,...e){ki.logLevel<=G.ERROR&&ki.error(`Auth (${$e}): ${n}`,...e)}function Oe(n,...e){throw _a(n,...e)}function Le(n,...e){return _a(n,...e)}function ga(n,e,t){let r=Object.assign(Object.assign({},Uh()),{[e]:t});return new rt("auth","Firebase",r).create(e,{appName:n.name})}function ot(n){return ga(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ug(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Oe(n,"argument-error"),ga(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function _a(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Bh.create(n,...e)}function V(n,e,...t){if(!n)throw _a(e,...t)}function Ke(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Ai(e),new Error(e)}function at(n,e){n||Ke(e)}function Zo(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Bg(){return Ih()==="http:"||Ih()==="https:"}function Ih(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function qg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Bg()||Xl()||"connection"in navigator)?navigator.onLine:!0}function jg(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Ut=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,at(t>e,"Short delay should be less than long delay!"),this.isMobile=Jl()||Zl()}get(){return qg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function ya(n,e){at(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Di=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var zg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Gg=new Ut(3e4,6e4);function ae(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function de(n,e,t,r,i={}){return qh(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=ln(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);let d=Object.assign({method:e,headers:l},s);return Yl()||(d.referrerPolicy="no-referrer"),Di.fetch()(jh(n,n.config.apiHost,t,c),d)})}async function qh(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},zg),e);try{let i=new ea(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw fr(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw fr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw fr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw fr(n,"user-disabled",a);let p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw ga(n,p,d);Oe(n,p)}}catch(i){if(i instanceof Re)throw i;Oe(n,"network-request-failed",{message:String(i)})}}async function Et(n,e,t,r,i={}){let s=await de(n,e,t,r,i);return"mfaPendingCredential"in s&&Oe(n,"multi-factor-auth-required",{_serverResponse:s}),s}function jh(n,e,t,r){let i=`${e}${t}?${r}`;return n.config.emulator?ya(n.config,i):`${n.config.apiScheme}://${i}`}function $g(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var ea=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Le(this.auth,"network-request-failed")),Gg.get())})}};function fr(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Le(n,e,r);return i.customData._tokenResponse=t,i}function wh(n){return n!==void 0&&n.enterprise!==void 0}var Ni=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return $g(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function zh(n,e){return de(n,"GET","/v2/recaptchaConfig",ae(n,e))}async function Kg(n,e){return de(n,"POST","/v1/accounts:delete",e)}async function Gh(n,e){return de(n,"POST","/v1/accounts:lookup",e)}function pr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function $h(n,e=!1){let t=Z(n),r=await t.getIdToken(e),i=va(r);V(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:pr(Jo(i.auth_time)),issuedAtTime:pr(Jo(i.iat)),expirationTime:pr(Jo(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Jo(n){return Number(n)*1e3}function va(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ai("JWT malformed, contained fewer than 3 sections"),null;try{let i=Do(t);return i?JSON.parse(i):(Ai("Failed to decode base64 JWT payload"),null)}catch(i){return Ai("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Eh(n){let e=va(n);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function mn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Re&&Hg(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Hg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var ta=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var _r=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=pr(this.lastLoginAt),this.creationTime=pr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Oi(n){var e;let t=n.auth,r=await n.getIdToken(),i=await mn(n,Gh(t,{idToken:r}));V(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Hh(s.providerUserInfo):[],c=Wg(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!c?.length,p=l?d:!1,y={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new _r(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function Kh(n){let e=Z(n);await Oi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Wg(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Hh(n){return n.map(e=>{var{providerId:t}=e,r=Ti(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Qg(n,e){let t=await qh(n,{},async()=>{let r=ln({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=jh(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Di.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Jg(n,e){return de(n,"POST","/v2/accounts:revokeToken",ae(n,e))}var mr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Eh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){V(e.length!==0,"internal-error");let t=Eh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(V(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Qg(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(V(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(V(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(V(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Ke("not implemented")}};function wt(n,e){V(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var gn=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Ti(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ta(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new _r(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await mn(this,this.stsTokenManager.getToken(this.auth,e));return V(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return $h(this,e)}reload(){return Kh(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Oi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ne(this.auth.app))return Promise.reject(ot(this.auth));let e=await this.getIdToken();return await mn(this,Kg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,d,p;let y=(r=t.displayName)!==null&&r!==void 0?r:void 0,b=(i=t.email)!==null&&i!==void 0?i:void 0,R=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,x=(c=t.tenantId)!==null&&c!==void 0?c:void 0,C=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,j=(d=t.createdAt)!==null&&d!==void 0?d:void 0,B=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:F,emailVerified:z,isAnonymous:oe,providerData:W,stsTokenManager:I}=t;V(F&&I,e,"internal-error");let m=mr.fromJSON(this.name,I);V(typeof F=="string",e,"internal-error"),wt(y,e.name),wt(b,e.name),V(typeof z=="boolean",e,"internal-error"),V(typeof oe=="boolean",e,"internal-error"),wt(R,e.name),wt(k,e.name),wt(x,e.name),wt(C,e.name),wt(j,e.name),wt(B,e.name);let _=new n({uid:F,auth:e,email:b,emailVerified:z,displayName:y,isAnonymous:oe,photoURL:k,phoneNumber:R,tenantId:x,stsTokenManager:m,createdAt:j,lastLoginAt:B});return W&&Array.isArray(W)&&(_.providerData=W.map(v=>Object.assign({},v))),C&&(_._redirectEventId=C),_}static async _fromIdTokenResponse(e,t,r=!1){let i=new mr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Oi(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];V(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Hh(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new mr;c.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new _r(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,d),l}};var Th=new Map;function st(n){at(n instanceof Function,"Expected a class definition");let e=Th.get(n);return e?(at(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Th.set(n,e),e)}var xi=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};xi.type="NONE";var na=xi;function Ri(n,e,t){return`firebase:${n}:${e}:${t}`}var Vi=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Ri(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ri("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?gn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(st(na),e,r);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),s=i[0]||st(na),a=Ri(r,e.config.apiKey,e.name),c=null;for(let d of t)try{let p=await d._get(a);if(p){let y=gn._fromJSON(e,p);d!==s&&(c=y),s=d;break}}catch{}let l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new n(s,e,r))}};function bh(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Wh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zh(e))return"Blackberry";if(ed(e))return"Webos";if(Qh(e))return"Safari";if((e.includes("chrome/")||Jh(e))&&!e.includes("edge/"))return"Chrome";if(Xh(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Wh(n=he()){return/firefox\//i.test(n)}function Qh(n=he()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jh(n=he()){return/crios\//i.test(n)}function Yh(n=he()){return/iemobile/i.test(n)}function Xh(n=he()){return/android/i.test(n)}function Zh(n=he()){return/blackberry/i.test(n)}function ed(n=he()){return/webos/i.test(n)}function Ia(n=he()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Yg(n=he()){var e;return Ia(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Xg(){return eh()&&document.documentMode===10}function td(n=he()){return Ia(n)||Xh(n)||ed(n)||Zh(n)||/windows phone/i.test(n)||Yh(n)}function nd(n,e=[]){let t;switch(n){case"Browser":t=bh(he());break;case"Worker":t=`${bh(he())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${$e}/${r}`}var ra=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function Zg(n,e={}){return de(n,"GET","/v2/passwordPolicy",ae(n,e))}var e_=6,ia=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:e_,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var sa=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Li(this),this.idTokenSubscription=new Li(this),this.beforeStateQueue=new ra(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Bh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=st(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Vi.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Gh(this,{idToken:e}),r=await gn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ne(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&l?.user&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Oi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=jg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ne(this.app))return Promise.reject(ot(this));let t=e?Z(e):null;return t&&V(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ne(this.app)?Promise.reject(ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ne(this.app)?Promise.reject(ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(st(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Zg(this),t=new ia(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new rt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Jg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&st(e)||this._popupRedirectResolver;V(t,this,"argument-error"),this.redirectPersistenceManager=await Vi.create(this,[st(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(V(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Fg(`Error while retrieving App Check token: ${t.error}`),t?.token}};function Me(n){return Z(n)}var Li=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=ih(t=>this.observer=t)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var es={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function t_(n){es=n}function rd(n){return es.loadJS(n)}function n_(){return es.recaptchaEnterpriseScript}function r_(){return es.gapiScript}function id(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var oa=class{constructor(){this.enterprise=new aa}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},aa=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var i_="recaptcha-enterprise",gr="NO_RECAPTCHA",Mi=class{constructor(e){this.type=i_,this.auth=Me(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{zh(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let d=new Ni(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){let l=window.grecaptcha;wh(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(gr)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new oa().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&wh(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=n_();l.length!==0&&(l+=c),rd(l).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}};async function dr(n,e,t,r=!1,i=!1){let s=new Mi(n),a;if(i)a=gr;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}let c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){let l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){let l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ft(n,e,t,r,i){var s,a;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let c=await dr(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let l=await dr(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("PHONE_PROVIDER")){let c=await dr(n,e,t);return r(n,c).catch(async l=>{var d;if(((d=n._getRecaptchaConfig())===null||d===void 0?void 0:d.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let p=await dr(n,e,t,!1,!0);return r(n,p)}return Promise.reject(l)})}else{let c=await dr(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(i+" provider is not supported.")}async function s_(n){let e=Me(n),t=await zh(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Ni(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Mi(e).verify()}function sd(n,e){let t=Mt(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(Vt(s,e??{}))return i;Oe(i,"already-initialized")}return t.initialize({options:e})}function o_(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(st);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function wa(n,e,t){let r=Me(n);V(r._canInitEmulator,r,"emulator-config-failed"),V(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=od(e),{host:a,port:c}=a_(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${s}//${a}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||c_()}function od(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function a_(n){let e=od(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Ah(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:Ah(a)}}}function Ah(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function c_(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Bt=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ke("not implemented")}_getIdTokenResponse(e){return Ke("not implemented")}_linkToIdToken(e,t){return Ke("not implemented")}_getReauthenticationResolver(e){return Ke("not implemented")}};async function u_(n,e){return de(n,"POST","/v1/accounts:signUp",e)}async function l_(n,e){return Et(n,"POST","/v1/accounts:signInWithPassword",ae(n,e))}async function ad(n,e){return de(n,"POST","/v1/accounts:sendOobCode",ae(n,e))}async function h_(n,e){return ad(n,e)}async function d_(n,e){return ad(n,e)}async function f_(n,e){return Et(n,"POST","/v1/accounts:signInWithEmailLink",ae(n,e))}async function p_(n,e){return Et(n,"POST","/v1/accounts:signInWithEmailLink",ae(n,e))}var yr=class n extends Bt{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ft(e,t,"signInWithPassword",l_,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return f_(e,{email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ft(e,r,"signUpPassword",u_,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return p_(e,{idToken:t,email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function pn(n,e){return Et(n,"POST","/v1/accounts:signInWithIdp",ae(n,e))}var m_="http://localhost",qt=class n extends Bt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Oe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Ti(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return pn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,pn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,pn(e,t)}buildRequest(){let e={requestUri:m_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ln(t)}return e}};async function Rh(n,e){return de(n,"POST","/v1/accounts:sendVerificationCode",ae(n,e))}async function g_(n,e){return Et(n,"POST","/v1/accounts:signInWithPhoneNumber",ae(n,e))}async function __(n,e){let t=await Et(n,"POST","/v1/accounts:signInWithPhoneNumber",ae(n,e));if(t.temporaryProof)throw fr(n,"account-exists-with-different-credential",t);return t}var y_={USER_NOT_FOUND:"user-not-found"};async function v_(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Et(n,"POST","/v1/accounts:signInWithPhoneNumber",ae(n,t),y_)}var vr=class n extends Bt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return g_(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return __(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return v_(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function I_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function w_(n){let e=hn(dn(n)).link,t=e?hn(dn(e)).deep_link_id:null,r=hn(dn(n)).deep_link_id;return(r?hn(dn(r)).link:null)||r||t||e||n}var Fi=class n{constructor(e){var t,r,i,s,a,c;let l=hn(dn(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,y=I_((i=l.mode)!==null&&i!==void 0?i:null);V(d&&p&&y,"argument-error"),this.apiKey=d,this.operation=y,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=w_(e);try{return new n(t)}catch{return null}}};var jt=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return yr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Fi.parseLink(t);return V(r,"argument-error"),yr._fromEmailAndCode(e,r.code,r.tenantId)}};jt.PROVIDER_ID="password";jt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";jt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Ir=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var zt=class extends Ir{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var wr=class n extends zt{constructor(){super("facebook.com")}static credential(e){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};wr.FACEBOOK_SIGN_IN_METHOD="facebook.com";wr.PROVIDER_ID="facebook.com";var _n=class n extends zt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};_n.GOOGLE_SIGN_IN_METHOD="google.com";_n.PROVIDER_ID="google.com";var Er=class n extends zt{constructor(){super("github.com")}static credential(e){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Er.GITHUB_SIGN_IN_METHOD="github.com";Er.PROVIDER_ID="github.com";var Tr=class n extends zt{constructor(){super("twitter.com")}static credential(e,t){return qt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Tr.TWITTER_SIGN_IN_METHOD="twitter.com";Tr.PROVIDER_ID="twitter.com";async function E_(n,e){return Et(n,"POST","/v1/accounts:signUp",ae(n,e))}var yn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await gn._fromIdTokenResponse(e,r,i),a=Sh(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Sh(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Sh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var ca=class n extends Re{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function cd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ca._fromErrorAndOperation(n,s,e,r):s})}async function T_(n,e,t=!1){let r=await mn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return yn._forOperation(n,"link",r)}async function b_(n,e,t=!1){let{auth:r}=n;if(Ne(r.app))return Promise.reject(ot(r));let i="reauthenticate";try{let s=await mn(n,cd(r,i,e,n),t);V(s.idToken,r,"internal-error");let a=va(s.idToken);V(a,r,"internal-error");let{sub:c}=a;return V(n.uid===c,r,"user-mismatch"),yn._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Oe(r,"user-mismatch"),s}}async function ud(n,e,t=!1){if(Ne(n.app))return Promise.reject(ot(n));let r="signIn",i=await cd(n,r,e),s=await yn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function ld(n,e){return ud(Me(n),e)}function hd(n,e,t){var r;V(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),V(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(V(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(V(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function dd(n){let e=Me(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function fd(n,e,t){let r=Me(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&hd(r,i,t),await Ft(r,i,"getOobCode",d_,"EMAIL_PASSWORD_PROVIDER")}async function pd(n,e,t){if(Ne(n.app))return Promise.reject(ot(n));let r=Me(n),a=await Ft(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",E_,"EMAIL_PASSWORD_PROVIDER").catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&dd(n),l}),c=await yn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function md(n,e,t){return Ne(n.app)?Promise.reject(ot(n)):ld(Z(n),jt.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&dd(n),r})}async function gd(n,e){let t=Z(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&hd(t.auth,i,e);let{email:s}=await h_(t.auth,i);s!==n.email&&await n.reload()}async function A_(n,e){return de(n,"POST","/v1/accounts:update",e)}async function _d(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;let r=Z(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await mn(r,A_(r.auth,s));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;let c=r.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function yd(n,e,t,r){return Z(n).onIdTokenChanged(e,t,r)}function vd(n,e,t){return Z(n).beforeAuthStateChanged(e,t)}function Id(n,e,t,r){return Z(n).onAuthStateChanged(e,t,r)}function wd(n){return Z(n).signOut()}function Ph(n,e){return de(n,"POST","/v2/accounts/mfaEnrollment:start",ae(n,e))}function R_(n,e){return de(n,"POST","/v2/accounts/mfaEnrollment:finalize",ae(n,e))}function S_(n,e){return de(n,"POST","/v2/accounts/mfaEnrollment:start",ae(n,e))}function P_(n,e){return de(n,"POST","/v2/accounts/mfaEnrollment:finalize",ae(n,e))}var Ui="__sak";var Bi=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ui,"1"),this.storage.removeItem(Ui),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var C_=1e3,k_=10,qi=class extends Bi{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=td(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Xg()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,k_):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},C_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};qi.type="LOCAL";var Ed=qi;var ji=class extends Bi{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};ji.type="SESSION";var Ea=ji;function D_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var zi=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async d=>d(t.origin,s)),l=await D_(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};zi.receivers=[];function Ta(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var ua=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{let d=Ta("",20);i.port1.start();let p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){let b=y;if(b.data.eventId===d)switch(b.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(b.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function He(){return window}function N_(n){He().location.href=n}function Td(){return typeof He().WorkerGlobalScope<"u"&&typeof He().importScripts=="function"}async function O_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function x_(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function V_(){return Td()?self:null}var bd="firebaseLocalStorageDb",L_=1,Gi="firebaseLocalStorage",Ad="fbase_key",Gt=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function ts(n,e){return n.transaction([Gi],e?"readwrite":"readonly").objectStore(Gi)}function M_(){let n=indexedDB.deleteDatabase(bd);return new Gt(n).toPromise()}function la(){let n=indexedDB.open(bd,L_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Gi,{keyPath:Ad})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Gi)?e(r):(r.close(),await M_(),e(await la()))})})}async function Ch(n,e,t){let r=ts(n,!0).put({[Ad]:e,value:t});return new Gt(r).toPromise()}async function F_(n,e){let t=ts(n,!1).get(e),r=await new Gt(t).toPromise();return r===void 0?null:r.value}function kh(n,e){let t=ts(n,!0).delete(e);return new Gt(t).toPromise()}var U_=800,B_=3,$i=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await la(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>B_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Td()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zi._getInstance(V_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await O_(),!this.activeServiceWorker)return;this.sender=new ua(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||x_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await la();return await Ch(e,Ui,"1"),await kh(e,Ui),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ch(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>F_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>kh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=ts(i,!1).getAll();return new Gt(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),U_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};$i.type="LOCAL";var Rd=$i;function Dh(n,e){return de(n,"POST","/v2/accounts/mfaSignIn:start",ae(n,e))}function q_(n,e){return de(n,"POST","/v2/accounts/mfaSignIn:finalize",ae(n,e))}function j_(n,e){return de(n,"POST","/v2/accounts/mfaSignIn:finalize",ae(n,e))}var EE=id("rcb"),TE=new Ut(3e4,6e4);var Si="recaptcha";async function z_(n,e,t){var r;if(!n._getRecaptchaConfig())try{await s_(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){V(s.type==="enroll",n,"internal-error");let a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Ft(n,a,"mfaSmsEnrollment",async(p,y)=>{if(y.phoneEnrollmentInfo.captchaResponse===gr){V(t?.type===Si,p,"argument-error");let b=await Yo(p,y,t);return Ph(p,b)}return Ph(p,y)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{V(s.type==="signin",n,"internal-error");let a=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;V(a,n,"missing-multi-factor-info");let c={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Ft(n,c,"mfaSmsSignIn",async(y,b)=>{if(b.phoneSignInInfo.captchaResponse===gr){V(t?.type===Si,y,"argument-error");let R=await Yo(y,b,t);return Dh(y,R)}return Dh(y,b)},"PHONE_PROVIDER").catch(y=>Promise.reject(y))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Ft(n,s,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===gr){V(t?.type===Si,d,"argument-error");let y=await Yo(d,p,t);return Rh(d,y)}return Rh(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t?._reset()}}async function Yo(n,e,t){V(t.type===Si,n,"argument-error");let r=await t.verify();V(typeof r=="string",n,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,l=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:c,recaptchaVersion:l}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var br=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Me(e)}verifyPhoneNumber(e,t){return z_(this.auth,e,Z(t))}static credential(e,t){return vr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?vr._fromTokenResponse(t,r):null}};br.PROVIDER_ID="phone";br.PHONE_SIGN_IN_METHOD="phone";function Sd(n,e){return e?st(e):(V(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Ar=class extends Bt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return pn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return pn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return pn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function G_(n){return ud(n.auth,new Ar(n),n.bypassAuthState)}function $_(n){let{auth:e,user:t}=n;return V(t,e,"internal-error"),b_(t,new Ar(n),n.bypassAuthState)}async function K_(n){let{auth:e,user:t}=n;return V(t,e,"internal-error"),T_(t,new Ar(n),n.bypassAuthState)}var Ki=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return G_;case"linkViaPopup":case"linkViaRedirect":return K_;case"reauthViaPopup":case"reauthViaRedirect":return $_;default:Oe(this.auth,"internal-error")}}resolve(e){at(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){at(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var H_=new Ut(2e3,1e4);async function Pd(n,e,t){if(Ne(n.app))return Promise.reject(Le(n,"operation-not-supported-in-this-environment"));let r=Me(n);Ug(n,e,Ir);let i=Sd(r,t);return new Hi(r,"signInViaPopup",e,i).executeNotNull()}var Hi=class n extends Ki{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){at(this.filter.length===1,"Popup operations only handle one event");let e=Ta();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Le(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Le(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Le(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,H_.get())};e()}};Hi.currentPopupAction=null;var W_="pendingRedirect",Pi=new Map,ha=class extends Ki{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Pi.get(this.auth._key());if(!e){try{let r=await Q_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Pi.set(this.auth._key(),e)}return this.bypassAuthState||Pi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Q_(n,e){let t=X_(e),r=Y_(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function J_(n,e){Pi.set(n._key(),e)}function Y_(n){return st(n._redirectPersistence)}function X_(n){return Ri(W_,n.config.apiKey,n.name)}async function Z_(n,e,t=!1){if(Ne(n.app))return Promise.reject(ot(n));let r=Me(n),i=Sd(r,e),a=await new ha(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var ey=10*60*1e3,da=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ty(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Cd(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Le(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ey&&this.cachedEventUids.clear(),this.cachedEventUids.has(Nh(e))}saveEventToCache(e){this.cachedEventUids.add(Nh(e)),this.lastProcessedEventTime=Date.now()}};function Nh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Cd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function ty(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Cd(n);default:return!1}}async function ny(n,e={}){return de(n,"GET","/v1/projects",e)}var ry=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,iy=/^https?/;async function sy(n){if(n.config.emulator)return;let{authorizedDomains:e}=await ny(n);for(let t of e)try{if(oy(t))return}catch{}Oe(n,"unauthorized-domain")}function oy(n){let e=Zo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!iy.test(t))return!1;if(ry.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var ay=new Ut(3e4,6e4);function Oh(){let n=He().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function cy(n){return new Promise((e,t)=>{var r,i,s;function a(){Oh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Oh(),t(Le(n,"network-request-failed"))},timeout:ay.get()})}if(!((i=(r=He().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=He().gapi)===null||s===void 0)&&s.load)a();else{let c=id("iframefcb");return He()[c]=()=>{gapi.load?a():t(Le(n,"network-request-failed"))},rd(`${r_()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Ci=null,e})}var Ci=null;function uy(n){return Ci=Ci||cy(n),Ci}var ly=new Ut(5e3,15e3),hy="__/auth/iframe",dy="emulator/auth/iframe",fy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},py=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function my(n){let e=n.config;V(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?ya(e,dy):`https://${n.config.authDomain}/${hy}`,r={apiKey:e.apiKey,appName:n.name,v:$e},i=py.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ln(r).slice(1)}`}async function gy(n){let e=await uy(n),t=He().gapi;return V(t,n,"internal-error"),e.open({where:document.body,url:my(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:fy,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=Le(n,"network-request-failed"),c=He().setTimeout(()=>{s(a)},ly.get());function l(){He().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}var _y={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},yy=500,vy=600,Iy="_blank",wy="http://localhost",Wi=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Ey(n,e,t,r=yy,i=vy){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",l=Object.assign(Object.assign({},_y),{width:r.toString(),height:i.toString(),top:s,left:a}),d=he().toLowerCase();t&&(c=Jh(d)?Iy:t),Wh(d)&&(e=e||wy,l.scrollbars="yes");let p=Object.entries(l).reduce((b,[R,k])=>`${b}${R}=${k},`,"");if(Yg(d)&&c!=="_self")return Ty(e||"",c),new Wi(null);let y=window.open(e||"",c,p);V(y,n,"popup-blocked");try{y.focus()}catch{}return new Wi(y)}function Ty(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var by="__/auth/handler",Ay="emulator/auth/handler",Ry=encodeURIComponent("fac");async function xh(n,e,t,r,i,s){V(n.config.authDomain,n,"auth-domain-config-required"),V(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:$e,eventId:i};if(e instanceof Ir){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",rh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,y]of Object.entries(s||{}))a[p]=y}if(e instanceof zt){let p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let p of Object.keys(c))c[p]===void 0&&delete c[p];let l=await n._getAppCheckToken(),d=l?`#${Ry}=${encodeURIComponent(l)}`:"";return`${Sy(n)}?${ln(c).slice(1)}${d}`}function Sy({config:n}){return n.emulator?ya(n,Ay):`https://${n.authDomain}/${by}`}var Xo="webStorageSupport",fa=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ea,this._completeRedirectFn=Z_,this._overrideRedirectResult=J_}async _openPopup(e,t,r,i){var s;at((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await xh(e,t,r,Zo(),i);return Ey(e,a,Ta())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await xh(e,t,r,Zo(),i);return N_(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(at(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await gy(e),r=new da(e);return t.register("authEvent",i=>(V(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Xo,{type:Xo},i=>{var s;let a=(s=i?.[0])===null||s===void 0?void 0:s[Xo];a!==void 0&&t(!!a),Oe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=sy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return td()||Qh()||Ia()}},kd=fa,Qi=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ke("unexpected MultiFactorSessionType")}}},pa=class n extends Qi{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return R_(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return q_(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Ji=class{constructor(){}static assertion(e){return pa._fromCredential(e)}};Ji.FACTOR_ID="phone";var Yi=class{static assertionForEnrollment(e,t){return Xi._fromSecret(e,t)}static assertionForSignIn(e,t){return Xi._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;V(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await S_(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Zi._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};Yi.FACTOR_ID="totp";var Xi=class n extends Qi{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return V(typeof this.secret<"u",e,"argument-error"),P_(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){V(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return j_(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Zi=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(bi(e)||bi(t))&&(i=!0),i&&(bi(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),bi(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function bi(n){return typeof n>"u"||n?.length===0}var Vh="@firebase/auth",Lh="1.8.1";var ma=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Py(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Cy(n){Ge(new Se("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;V(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nd(n)},d=new sa(r,i,s,l);return o_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ge(new Se("auth-internal",e=>{let t=Me(e.getProvider("auth").getImmediate());return(r=>new ma(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Pe(Vh,Lh,Py(n)),Pe(Vh,Lh,"esm2017")}var ky=5*60,Dy=xo("authIdTokenMaxAge")||ky,Mh=null,Ny=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Dy)return;let i=t?.token;Mh!==i&&(Mh=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Dd(n=fn()){let e=Mt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=sd(n,{popupRedirectResolver:kd,persistence:[Rd,Ed,Ea]}),r=xo("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=Ny(s.toString());vd(t,a,()=>a(t.currentUser)),yd(t,c=>a(c))}}let i=No("auth");return i&&wa(t,`http://${i}`),t}function Oy(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}t_({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Le("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Oy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Cy("Browser");var Nd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Od={};var Tt,ba;(function(){var n;function e(I,m){function _(){}_.prototype=m.prototype,I.D=m.prototype,I.prototype=new _,I.prototype.constructor=I,I.C=function(v,w,T){for(var g=Array(arguments.length-2),et=2;et<arguments.length;et++)g[et-2]=arguments[et];return m.prototype[w].apply(v,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,m,_){_||(_=0);var v=Array(16);if(typeof m=="string")for(var w=0;16>w;++w)v[w]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(w=0;16>w;++w)v[w]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=I.g[0],_=I.g[1],w=I.g[2];var T=I.g[3],g=m+(T^_&(w^T))+v[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=T+(w^m&(_^w))+v[1]+3905402710&4294967295,T=m+(g<<12&4294967295|g>>>20),g=w+(_^T&(m^_))+v[2]+606105819&4294967295,w=T+(g<<17&4294967295|g>>>15),g=_+(m^w&(T^m))+v[3]+3250441966&4294967295,_=w+(g<<22&4294967295|g>>>10),g=m+(T^_&(w^T))+v[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=T+(w^m&(_^w))+v[5]+1200080426&4294967295,T=m+(g<<12&4294967295|g>>>20),g=w+(_^T&(m^_))+v[6]+2821735955&4294967295,w=T+(g<<17&4294967295|g>>>15),g=_+(m^w&(T^m))+v[7]+4249261313&4294967295,_=w+(g<<22&4294967295|g>>>10),g=m+(T^_&(w^T))+v[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=T+(w^m&(_^w))+v[9]+2336552879&4294967295,T=m+(g<<12&4294967295|g>>>20),g=w+(_^T&(m^_))+v[10]+4294925233&4294967295,w=T+(g<<17&4294967295|g>>>15),g=_+(m^w&(T^m))+v[11]+2304563134&4294967295,_=w+(g<<22&4294967295|g>>>10),g=m+(T^_&(w^T))+v[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=T+(w^m&(_^w))+v[13]+4254626195&4294967295,T=m+(g<<12&4294967295|g>>>20),g=w+(_^T&(m^_))+v[14]+2792965006&4294967295,w=T+(g<<17&4294967295|g>>>15),g=_+(m^w&(T^m))+v[15]+1236535329&4294967295,_=w+(g<<22&4294967295|g>>>10),g=m+(w^T&(_^w))+v[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^w&(m^_))+v[6]+3225465664&4294967295,T=m+(g<<9&4294967295|g>>>23),g=w+(m^_&(T^m))+v[11]+643717713&4294967295,w=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(w^T))+v[0]+3921069994&4294967295,_=w+(g<<20&4294967295|g>>>12),g=m+(w^T&(_^w))+v[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^w&(m^_))+v[10]+38016083&4294967295,T=m+(g<<9&4294967295|g>>>23),g=w+(m^_&(T^m))+v[15]+3634488961&4294967295,w=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(w^T))+v[4]+3889429448&4294967295,_=w+(g<<20&4294967295|g>>>12),g=m+(w^T&(_^w))+v[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^w&(m^_))+v[14]+3275163606&4294967295,T=m+(g<<9&4294967295|g>>>23),g=w+(m^_&(T^m))+v[3]+4107603335&4294967295,w=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(w^T))+v[8]+1163531501&4294967295,_=w+(g<<20&4294967295|g>>>12),g=m+(w^T&(_^w))+v[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^w&(m^_))+v[2]+4243563512&4294967295,T=m+(g<<9&4294967295|g>>>23),g=w+(m^_&(T^m))+v[7]+1735328473&4294967295,w=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(w^T))+v[12]+2368359562&4294967295,_=w+(g<<20&4294967295|g>>>12),g=m+(_^w^T)+v[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^w)+v[8]+2272392833&4294967295,T=m+(g<<11&4294967295|g>>>21),g=w+(T^m^_)+v[11]+1839030562&4294967295,w=T+(g<<16&4294967295|g>>>16),g=_+(w^T^m)+v[14]+4259657740&4294967295,_=w+(g<<23&4294967295|g>>>9),g=m+(_^w^T)+v[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^w)+v[4]+1272893353&4294967295,T=m+(g<<11&4294967295|g>>>21),g=w+(T^m^_)+v[7]+4139469664&4294967295,w=T+(g<<16&4294967295|g>>>16),g=_+(w^T^m)+v[10]+3200236656&4294967295,_=w+(g<<23&4294967295|g>>>9),g=m+(_^w^T)+v[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^w)+v[0]+3936430074&4294967295,T=m+(g<<11&4294967295|g>>>21),g=w+(T^m^_)+v[3]+3572445317&4294967295,w=T+(g<<16&4294967295|g>>>16),g=_+(w^T^m)+v[6]+76029189&4294967295,_=w+(g<<23&4294967295|g>>>9),g=m+(_^w^T)+v[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^w)+v[12]+3873151461&4294967295,T=m+(g<<11&4294967295|g>>>21),g=w+(T^m^_)+v[15]+530742520&4294967295,w=T+(g<<16&4294967295|g>>>16),g=_+(w^T^m)+v[2]+3299628645&4294967295,_=w+(g<<23&4294967295|g>>>9),g=m+(w^(_|~T))+v[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~w))+v[7]+1126891415&4294967295,T=m+(g<<10&4294967295|g>>>22),g=w+(m^(T|~_))+v[14]+2878612391&4294967295,w=T+(g<<15&4294967295|g>>>17),g=_+(T^(w|~m))+v[5]+4237533241&4294967295,_=w+(g<<21&4294967295|g>>>11),g=m+(w^(_|~T))+v[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~w))+v[3]+2399980690&4294967295,T=m+(g<<10&4294967295|g>>>22),g=w+(m^(T|~_))+v[10]+4293915773&4294967295,w=T+(g<<15&4294967295|g>>>17),g=_+(T^(w|~m))+v[1]+2240044497&4294967295,_=w+(g<<21&4294967295|g>>>11),g=m+(w^(_|~T))+v[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~w))+v[15]+4264355552&4294967295,T=m+(g<<10&4294967295|g>>>22),g=w+(m^(T|~_))+v[6]+2734768916&4294967295,w=T+(g<<15&4294967295|g>>>17),g=_+(T^(w|~m))+v[13]+1309151649&4294967295,_=w+(g<<21&4294967295|g>>>11),g=m+(w^(_|~T))+v[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~w))+v[11]+3174756917&4294967295,T=m+(g<<10&4294967295|g>>>22),g=w+(m^(T|~_))+v[2]+718787259&4294967295,w=T+(g<<15&4294967295|g>>>17),g=_+(T^(w|~m))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(w+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+T&4294967295}r.prototype.u=function(I,m){m===void 0&&(m=I.length);for(var _=m-this.blockSize,v=this.B,w=this.h,T=0;T<m;){if(w==0)for(;T<=_;)i(this,I,T),T+=this.blockSize;if(typeof I=="string"){for(;T<m;)if(v[w++]=I.charCodeAt(T++),w==this.blockSize){i(this,v),w=0;break}}else for(;T<m;)if(v[w++]=I[T++],w==this.blockSize){i(this,v),w=0;break}}this.h=w,this.o+=m},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;var _=8*this.o;for(m=I.length-8;m<I.length;++m)I[m]=_&255,_/=256;for(this.u(I),I=Array(16),m=_=0;4>m;++m)for(var v=0;32>v;v+=8)I[_++]=this.g[m]>>>v&255;return I};function s(I,m){var _=c;return Object.prototype.hasOwnProperty.call(_,I)?_[I]:_[I]=m(I)}function a(I,m){this.h=m;for(var _=[],v=!0,w=I.length-1;0<=w;w--){var T=I[w]|0;v&&T==m||(_[w]=T,v=!1)}this.g=_}var c={};function l(I){return-128<=I&&128>I?s(I,function(m){return new a([m|0],0>m?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return y;if(0>I)return C(d(-I));for(var m=[],_=1,v=0;I>=_;v++)m[v]=I/_|0,_*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return C(p(I.substring(1),m));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),v=y,w=0;w<I.length;w+=8){var T=Math.min(8,I.length-w),g=parseInt(I.substring(w,w+T),m);8>T?(T=d(Math.pow(m,T)),v=v.j(T).add(d(g))):(v=v.j(_),v=v.add(d(g)))}return v}var y=l(0),b=l(1),R=l(16777216);n=a.prototype,n.m=function(){if(x(this))return-C(this).m();for(var I=0,m=1,_=0;_<this.g.length;_++){var v=this.i(_);I+=(0<=v?v:4294967296+v)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(k(this))return"0";if(x(this))return"-"+C(this).toString(I);for(var m=d(Math.pow(I,6)),_=this,v="";;){var w=z(_,m).g;_=j(_,w.j(m));var T=((0<_.g.length?_.g[0]:_.h)>>>0).toString(I);if(_=w,k(_))return T+v;for(;6>T.length;)T="0"+T;v=T+v}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function k(I){if(I.h!=0)return!1;for(var m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function x(I){return I.h==-1}n.l=function(I){return I=j(this,I),x(I)?-1:k(I)?0:1};function C(I){for(var m=I.g.length,_=[],v=0;v<m;v++)_[v]=~I.g[v];return new a(_,~I.h).add(b)}n.abs=function(){return x(this)?C(this):this},n.add=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],v=0,w=0;w<=m;w++){var T=v+(this.i(w)&65535)+(I.i(w)&65535),g=(T>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);v=g>>>16,T&=65535,g&=65535,_[w]=g<<16|T}return new a(_,_[_.length-1]&-2147483648?-1:0)};function j(I,m){return I.add(C(m))}n.j=function(I){if(k(this)||k(I))return y;if(x(this))return x(I)?C(this).j(C(I)):C(C(this).j(I));if(x(I))return C(this.j(C(I)));if(0>this.l(R)&&0>I.l(R))return d(this.m()*I.m());for(var m=this.g.length+I.g.length,_=[],v=0;v<2*m;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var w=0;w<I.g.length;w++){var T=this.i(v)>>>16,g=this.i(v)&65535,et=I.i(w)>>>16,$n=I.i(w)&65535;_[2*v+2*w]+=g*$n,B(_,2*v+2*w),_[2*v+2*w+1]+=T*$n,B(_,2*v+2*w+1),_[2*v+2*w+1]+=g*et,B(_,2*v+2*w+1),_[2*v+2*w+2]+=T*et,B(_,2*v+2*w+2)}for(v=0;v<m;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=m;v<2*m;v++)_[v]=0;return new a(_,0)};function B(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function F(I,m){this.g=I,this.h=m}function z(I,m){if(k(m))throw Error("division by zero");if(k(I))return new F(y,y);if(x(I))return m=z(C(I),m),new F(C(m.g),C(m.h));if(x(m))return m=z(I,C(m)),new F(C(m.g),m.h);if(30<I.g.length){if(x(I)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var _=b,v=m;0>=v.l(I);)_=oe(_),v=oe(v);var w=W(_,1),T=W(v,1);for(v=W(v,2),_=W(_,2);!k(v);){var g=T.add(v);0>=g.l(I)&&(w=w.add(_),T=g),v=W(v,1),_=W(_,1)}return m=j(I,w.j(m)),new F(w,m)}for(w=y;0<=I.l(m);){for(_=Math.max(1,Math.floor(I.m()/m.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),T=d(_),g=T.j(m);x(g)||0<g.l(I);)_-=v,T=d(_),g=T.j(m);k(T)&&(T=b),w=w.add(T),I=j(I,g)}return new F(w,I)}n.A=function(I){return z(this,I).h},n.and=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)&I.i(v);return new a(_,this.h&I.h)},n.or=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)|I.i(v);return new a(_,this.h|I.h)},n.xor=function(I){for(var m=Math.max(this.g.length,I.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)^I.i(v);return new a(_,this.h^I.h)};function oe(I){for(var m=I.g.length+1,_=[],v=0;v<m;v++)_[v]=I.i(v)<<1|I.i(v-1)>>>31;return new a(_,I.h)}function W(I,m){var _=m>>5;m%=32;for(var v=I.g.length-_,w=[],T=0;T<v;T++)w[T]=0<m?I.i(T+_)>>>m|I.i(T+_+1)<<32-m:I.i(T+_);return new a(w,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,ba=Od.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Tt=Od.Integer=a}).apply(typeof Nd<"u"?Nd:typeof self<"u"?self:typeof window<"u"?window:{});var ns=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ct={};var Aa,xy,vn,Ra,Rr,rs,Sa,Pa,Ca;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ns=="object"&&ns];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var E=o[f];if(!(E in h))break e;h=h[E]}o=o[o.length-1],f=h[o],u=u(f),u!=f&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var h=0,f=!1,E={next:function(){if(!f&&h<o.length){var A=h++;return{value:u(A,o[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return E[Symbol.iterator]=function(){return E},E}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,h){return h})}});var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function p(o,u,h){return o.call.apply(o.bind,arguments)}function y(o,u,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var E=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(E,f),o.apply(u,E)}}return function(){return o.apply(u,arguments)}}function b(o,u,h){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,b.apply(null,arguments)}function R(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function k(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,E,A){for(var D=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)D[Y-2]=arguments[Y];return u.prototype[E].apply(f,D)}}function x(o){let u=o.length;if(0<u){let h=Array(u);for(let f=0;f<u;f++)h[f]=o[f];return h}return[]}function C(o,u){for(let h=1;h<arguments.length;h++){let f=arguments[h];if(l(f)){let E=o.length||0,A=f.length||0;o.length=E+A;for(let D=0;D<A;D++)o[E+D]=f[D]}else o.push(f)}}class j{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function B(o){return/^[\s\xa0]*$/.test(o)}function F(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var oe=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function W(o,u,h){for(let f in o)u.call(h,o[f],f,o)}function I(o,u){for(let h in o)u.call(void 0,o[h],h,o)}function m(o){let u={};for(let h in o)u[h]=o[h];return u}let _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let h,f;for(let E=1;E<arguments.length;E++){f=arguments[E];for(h in f)o[h]=f[h];for(let A=0;A<_.length;A++)h=_[A],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function w(o){var u=1;o=o.split(":");let h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function T(o){c.setTimeout(()=>{throw o},0)}function g(){var o=no;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class et{constructor(){this.h=this.g=null}add(u,h){let f=$n.get();f.set(u,h),this.h?this.h.next=f:this.g=f,this.h=f}}var $n=new j(()=>new $p,o=>o.reset());class $p{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Kn,Hn=!1,no=new et,Ku=()=>{let o=c.Promise.resolve(void 0);Kn=()=>{o.then(Kp)}};var Kp=()=>{for(var o;o=g();){try{o.h.call(o.g)}catch(h){T(h)}var u=$n;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}Hn=!1};function mt(){this.s=this.s,this.C=this.C}mt.prototype.s=!1,mt.prototype.ma=function(){this.s||(this.s=!0,this.N())},mt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ye(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ye.prototype.h=function(){this.defaultPrevented=!0};var Hp=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return o}();function Wn(o,u){if(ye.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(oe){e:{try{z(u.nodeName);var E=!0;break e}catch{}E=!1}E||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Wp[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Wn.aa.h.call(this)}}k(Wn,ye);var Wp={2:"touch",3:"pen",4:"mouse"};Wn.prototype.h=function(){Wn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Qn="closure_listenable_"+(1e6*Math.random()|0),Qp=0;function Jp(o,u,h,f,E){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!f,this.ha=E,this.key=++Qp,this.da=this.fa=!1}function Zr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ei(o){this.src=o,this.g={},this.h=0}ei.prototype.add=function(o,u,h,f,E){var A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);var D=io(o,u,f,E);return-1<D?(u=o[D],h||(u.fa=!1)):(u=new Jp(u,this.src,A,!!f,E),u.fa=h,o.push(u)),u};function ro(o,u){var h=u.type;if(h in o.g){var f=o.g[h],E=Array.prototype.indexOf.call(f,u,void 0),A;(A=0<=E)&&Array.prototype.splice.call(f,E,1),A&&(Zr(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function io(o,u,h,f){for(var E=0;E<o.length;++E){var A=o[E];if(!A.da&&A.listener==u&&A.capture==!!h&&A.ha==f)return E}return-1}var so="closure_lm_"+(1e6*Math.random()|0),oo={};function Hu(o,u,h,f,E){if(f&&f.once)return Qu(o,u,h,f,E);if(Array.isArray(u)){for(var A=0;A<u.length;A++)Hu(o,u[A],h,f,E);return null}return h=lo(h),o&&o[Qn]?o.K(u,h,d(f)?!!f.capture:!!f,E):Wu(o,u,h,!1,f,E)}function Wu(o,u,h,f,E,A){if(!u)throw Error("Invalid event type");var D=d(E)?!!E.capture:!!E,Y=co(o);if(Y||(o[so]=Y=new ei(o)),h=Y.add(u,h,f,D,A),h.proxy)return h;if(f=Yp(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)Hp||(E=D),E===void 0&&(E=!1),o.addEventListener(u.toString(),f,E);else if(o.attachEvent)o.attachEvent(Yu(u.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Yp(){function o(h){return u.call(o.src,o.listener,h)}let u=Xp;return o}function Qu(o,u,h,f,E){if(Array.isArray(u)){for(var A=0;A<u.length;A++)Qu(o,u[A],h,f,E);return null}return h=lo(h),o&&o[Qn]?o.L(u,h,d(f)?!!f.capture:!!f,E):Wu(o,u,h,!0,f,E)}function Ju(o,u,h,f,E){if(Array.isArray(u))for(var A=0;A<u.length;A++)Ju(o,u[A],h,f,E);else f=d(f)?!!f.capture:!!f,h=lo(h),o&&o[Qn]?(o=o.i,u=String(u).toString(),u in o.g&&(A=o.g[u],h=io(A,h,f,E),-1<h&&(Zr(A[h]),Array.prototype.splice.call(A,h,1),A.length==0&&(delete o.g[u],o.h--)))):o&&(o=co(o))&&(u=o.g[u.toString()],o=-1,u&&(o=io(u,h,f,E)),(h=-1<o?u[o]:null)&&ao(h))}function ao(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Qn])ro(u.i,o);else{var h=o.type,f=o.proxy;u.removeEventListener?u.removeEventListener(h,f,o.capture):u.detachEvent?u.detachEvent(Yu(h),f):u.addListener&&u.removeListener&&u.removeListener(f),(h=co(u))?(ro(h,o),h.h==0&&(h.src=null,u[so]=null)):Zr(o)}}}function Yu(o){return o in oo?oo[o]:oo[o]="on"+o}function Xp(o,u){if(o.da)o=!0;else{u=new Wn(u,this);var h=o.listener,f=o.ha||o.src;o.fa&&ao(o),o=h.call(f,u)}return o}function co(o){return o=o[so],o instanceof ei?o:null}var uo="__closure_events_fn_"+(1e9*Math.random()>>>0);function lo(o){return typeof o=="function"?o:(o[uo]||(o[uo]=function(u){return o.handleEvent(u)}),o[uo])}function ve(){mt.call(this),this.i=new ei(this),this.M=this,this.F=null}k(ve,mt),ve.prototype[Qn]=!0,ve.prototype.removeEventListener=function(o,u,h,f){Ju(this,o,u,h,f)};function be(o,u){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=u.type||u,typeof u=="string")u=new ye(u,o);else if(u instanceof ye)u.target=u.target||o;else{var E=u;u=new ye(f,o),v(u,E)}if(E=!0,h)for(var A=h.length-1;0<=A;A--){var D=u.g=h[A];E=ti(D,f,!0,u)&&E}if(D=u.g=o,E=ti(D,f,!0,u)&&E,E=ti(D,f,!1,u)&&E,h)for(A=0;A<h.length;A++)D=u.g=h[A],E=ti(D,f,!1,u)&&E}ve.prototype.N=function(){if(ve.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],f=0;f<h.length;f++)Zr(h[f]);delete o.g[u],o.h--}}this.F=null},ve.prototype.K=function(o,u,h,f){return this.i.add(String(o),u,!1,h,f)},ve.prototype.L=function(o,u,h,f){return this.i.add(String(o),u,!0,h,f)};function ti(o,u,h,f){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var E=!0,A=0;A<u.length;++A){var D=u[A];if(D&&!D.da&&D.capture==h){var Y=D.listener,me=D.ha||D.src;D.fa&&ro(o.i,D),E=Y.call(me,f)!==!1&&E}}return E&&!f.defaultPrevented}function Xu(o,u,h){if(typeof o=="function")h&&(o=b(o,h));else if(o&&typeof o.handleEvent=="function")o=b(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Zu(o){o.g=Xu(()=>{o.g=null,o.i&&(o.i=!1,Zu(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class Zp extends mt{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Zu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Jn(o){mt.call(this),this.h=o,this.g={}}k(Jn,mt);var el=[];function tl(o){W(o.g,function(u,h){this.g.hasOwnProperty(h)&&ao(u)},o),o.g={}}Jn.prototype.N=function(){Jn.aa.N.call(this),tl(this)},Jn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ho=c.JSON.stringify,em=c.JSON.parse,tm=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function fo(){}fo.prototype.h=null;function nl(o){return o.h||(o.h=o.i())}function rl(){}var Yn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function po(){ye.call(this,"d")}k(po,ye);function mo(){ye.call(this,"c")}k(mo,ye);var Dt={},il=null;function ni(){return il=il||new ve}Dt.La="serverreachability";function sl(o){ye.call(this,Dt.La,o)}k(sl,ye);function Xn(o){let u=ni();be(u,new sl(u))}Dt.STAT_EVENT="statevent";function ol(o,u){ye.call(this,Dt.STAT_EVENT,o),this.stat=u}k(ol,ye);function Ae(o){let u=ni();be(u,new ol(u,o))}Dt.Ma="timingevent";function al(o,u){ye.call(this,Dt.Ma,o),this.size=u}k(al,ye);function Zn(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function er(){this.g=!0}er.prototype.xa=function(){this.g=!1};function nm(o,u,h,f,E,A){o.info(function(){if(o.g)if(A)for(var D="",Y=A.split("&"),me=0;me<Y.length;me++){var Q=Y[me].split("=");if(1<Q.length){var Ie=Q[0];Q=Q[1];var we=Ie.split("_");D=2<=we.length&&we[1]=="type"?D+(Ie+"="+Q+"&"):D+(Ie+"=redacted&")}}else D=null;else D=A;return"XMLHTTP REQ ("+f+") [attempt "+E+"]: "+u+`
`+h+`
`+D})}function rm(o,u,h,f,E,A,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+E+"]: "+u+`
`+h+`
`+A+" "+D})}function on(o,u,h,f){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+sm(o,h)+(f?" "+f:"")})}function im(o,u){o.info(function(){return"TIMEOUT: "+u})}er.prototype.info=function(){};function sm(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var E=f[1];if(Array.isArray(E)&&!(1>E.length)){var A=E[0];if(A!="noop"&&A!="stop"&&A!="close")for(var D=1;D<E.length;D++)E[D]=""}}}}return ho(h)}catch{return u}}var ri={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},cl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},go;function ii(){}k(ii,fo),ii.prototype.g=function(){return new XMLHttpRequest},ii.prototype.i=function(){return{}},go=new ii;function gt(o,u,h,f){this.j=o,this.i=u,this.l=h,this.R=f||1,this.U=new Jn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ul}function ul(){this.i=null,this.g="",this.h=!1}var ll={},_o={};function yo(o,u,h){o.L=1,o.v=ci(tt(u)),o.m=h,o.P=!0,hl(o,null)}function hl(o,u){o.F=Date.now(),si(o),o.A=tt(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),Al(h.i,"t",f),o.C=0,h=o.j.J,o.h=new ul,o.g=zl(o.j,h?u:null,!o.m),0<o.O&&(o.M=new Zp(b(o.Y,o,o.g),o.O)),u=o.U,h=o.g,f=o.ca;var E="readystatechange";Array.isArray(E)||(E&&(el[0]=E.toString()),E=el);for(var A=0;A<E.length;A++){var D=Hu(h,E[A],f||u.handleEvent,!1,u.h||u);if(!D)break;u.g[D.key]=D}u=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Xn(),nm(o.i,o.u,o.A,o.l,o.R,o.m)}gt.prototype.ca=function(o){o=o.target;let u=this.M;u&&nt(o)==3?u.j():this.Y(o)},gt.prototype.Y=function(o){try{if(o==this.g)e:{let we=nt(this.g);var u=this.g.Ba();let un=this.g.Z();if(!(3>we)&&(we!=3||this.g&&(this.h.h||this.g.oa()||Nl(this.g)))){this.J||we!=4||u==7||(u==8||0>=un?Xn(3):Xn(2)),vo(this);var h=this.g.Z();this.X=h;t:if(dl(this)){var f=Nl(this.g);o="";var E=f.length,A=nt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Nt(this),tr(this);var D="";break t}this.h.i=new c.TextDecoder}for(u=0;u<E;u++)this.h.h=!0,o+=this.h.i.decode(f[u],{stream:!(A&&u==E-1)});f.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,rm(this.i,this.u,this.A,this.l,this.R,we,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Y,me=this.g;if((Y=me.g?me.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(Y)){var Q=Y;break t}}Q=null}if(h=Q)on(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Io(this,h);else{this.o=!1,this.s=3,Ae(12),Nt(this),tr(this);break e}}if(this.P){h=!0;let Ve;for(;!this.J&&this.C<D.length;)if(Ve=om(this,D),Ve==_o){we==4&&(this.s=4,Ae(14),h=!1),on(this.i,this.l,null,"[Incomplete Response]");break}else if(Ve==ll){this.s=4,Ae(15),on(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else on(this.i,this.l,Ve,null),Io(this,Ve);if(dl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),we!=4||D.length!=0||this.h.h||(this.s=1,Ae(16),h=!1),this.o=this.o&&h,!h)on(this.i,this.l,D,"[Invalid Chunked Response]"),Nt(this),tr(this);else if(0<D.length&&!this.W){this.W=!0;var Ie=this.j;Ie.g==this&&Ie.ba&&!Ie.M&&(Ie.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Ro(Ie),Ie.M=!0,Ae(11))}}else on(this.i,this.l,D,null),Io(this,D);we==4&&Nt(this),this.o&&!this.J&&(we==4?Ul(this.j,this):(this.o=!1,si(this)))}else Tm(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,Ae(12)):(this.s=0,Ae(13)),Nt(this),tr(this)}}}catch{}finally{}};function dl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function om(o,u){var h=o.C,f=u.indexOf(`
`,h);return f==-1?_o:(h=Number(u.substring(h,f)),isNaN(h)?ll:(f+=1,f+h>u.length?_o:(u=u.slice(f,f+h),o.C=f+h,u)))}gt.prototype.cancel=function(){this.J=!0,Nt(this)};function si(o){o.S=Date.now()+o.I,fl(o,o.I)}function fl(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Zn(b(o.ba,o),u)}function vo(o){o.B&&(c.clearTimeout(o.B),o.B=null)}gt.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(im(this.i,this.A),this.L!=2&&(Xn(),Ae(17)),Nt(this),this.s=2,tr(this)):fl(this,this.S-o)};function tr(o){o.j.G==0||o.J||Ul(o.j,o)}function Nt(o){vo(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,tl(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Io(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||wo(h.h,o))){if(!o.K&&wo(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var E=f;if(E[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)fi(h),hi(h);else break e;Ao(h),Ae(18)}}else h.za=E[1],0<h.za-h.T&&37500>E[2]&&h.F&&h.v==0&&!h.C&&(h.C=Zn(b(h.Za,h),6e3));if(1>=gl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else xt(h,11)}else if((o.K||h.g==o)&&fi(h),!B(u))for(E=h.Da.g.parse(u),u=0;u<E.length;u++){let Q=E[u];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];let Ie=Q[3];Ie!=null&&(h.la=Ie,h.j.info("VER="+h.la));let we=Q[4];we!=null&&(h.Aa=we,h.j.info("SVER="+h.Aa));let un=Q[5];un!=null&&typeof un=="number"&&0<un&&(f=1.5*un,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;let Ve=o.g;if(Ve){let mi=Ve.g?Ve.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(mi){var A=f.h;A.g||mi.indexOf("spdy")==-1&&mi.indexOf("quic")==-1&&mi.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Eo(A,A.h),A.h=null))}if(f.D){let So=Ve.g?Ve.g.getResponseHeader("X-HTTP-Session-Id"):null;So&&(f.ya=So,X(f.I,f.D,So))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=o;if(f.qa=jl(f,f.J?f.ia:null,f.W),D.K){_l(f.h,D);var Y=D,me=f.L;me&&(Y.I=me),Y.B&&(vo(Y),si(Y)),f.g=D}else Ml(f);0<h.i.length&&di(h)}else Q[0]!="stop"&&Q[0]!="close"||xt(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?xt(h,7):bo(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}Xn(4)}catch{}}var am=class{constructor(o,u){this.g=o,this.map=u}};function pl(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ml(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function gl(o){return o.h?1:o.g?o.g.size:0}function wo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Eo(o,u){o.g?o.g.add(u):o.h=u}function _l(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}pl.prototype.cancel=function(){if(this.i=yl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function yl(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let h of o.g.values())u=u.concat(h.D);return u}return x(o.i)}function cm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],h=o.length,f=0;f<h;f++)u.push(o[f]);return u}u=[],h=0;for(f in o)u[h++]=o[f];return u}function um(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(let f in o)u[h++]=f;return u}}}function vl(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=um(o),f=cm(o),E=f.length,A=0;A<E;A++)u.call(void 0,f[A],h&&h[A],o)}var Il=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function lm(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),E=null;if(0<=f){var A=o[h].substring(0,f);E=o[h].substring(f+1)}else A=o[h];u(A,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function Ot(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Ot){this.h=o.h,oi(this,o.j),this.o=o.o,this.g=o.g,ai(this,o.s),this.l=o.l;var u=o.i,h=new ir;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),wl(this,h),this.m=o.m}else o&&(u=String(o).match(Il))?(this.h=!1,oi(this,u[1]||"",!0),this.o=nr(u[2]||""),this.g=nr(u[3]||"",!0),ai(this,u[4]),this.l=nr(u[5]||"",!0),wl(this,u[6]||"",!0),this.m=nr(u[7]||"")):(this.h=!1,this.i=new ir(null,this.h))}Ot.prototype.toString=function(){var o=[],u=this.j;u&&o.push(rr(u,El,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(rr(u,El,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(rr(h,h.charAt(0)=="/"?fm:dm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",rr(h,mm)),o.join("")};function tt(o){return new Ot(o)}function oi(o,u,h){o.j=h?nr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function ai(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function wl(o,u,h){u instanceof ir?(o.i=u,gm(o.i,o.h)):(h||(u=rr(u,pm)),o.i=new ir(u,o.h))}function X(o,u,h){o.i.set(u,h)}function ci(o){return X(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function nr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function rr(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,hm),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function hm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var El=/[#\/\?@]/g,dm=/[#\?:]/g,fm=/[#\?]/g,pm=/[#\?@]/g,mm=/#/g;function ir(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function _t(o){o.g||(o.g=new Map,o.h=0,o.i&&lm(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=ir.prototype,n.add=function(o,u){_t(this),this.i=null,o=an(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Tl(o,u){_t(o),u=an(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function bl(o,u){return _t(o),u=an(o,u),o.g.has(u)}n.forEach=function(o,u){_t(this),this.g.forEach(function(h,f){h.forEach(function(E){o.call(u,E,f,this)},this)},this)},n.na=function(){_t(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let f=0;f<u.length;f++){let E=o[f];for(let A=0;A<E.length;A++)h.push(u[f])}return h},n.V=function(o){_t(this);let u=[];if(typeof o=="string")bl(this,o)&&(u=u.concat(this.g.get(an(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},n.set=function(o,u){return _t(this),this.i=null,o=an(this,o),bl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Al(o,u,h){Tl(o,u),0<h.length&&(o.i=null,o.g.set(an(o,u),x(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var f=u[h];let A=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var E=A;D[f]!==""&&(E+="="+encodeURIComponent(String(D[f]))),o.push(E)}}return this.i=o.join("&")};function an(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function gm(o,u){u&&!o.j&&(_t(o),o.i=null,o.g.forEach(function(h,f){var E=f.toLowerCase();f!=E&&(Tl(this,f),Al(this,E,h))},o)),o.j=u}function _m(o,u){let h=new er;if(c.Image){let f=new Image;f.onload=R(yt,h,"TestLoadImage: loaded",!0,u,f),f.onerror=R(yt,h,"TestLoadImage: error",!1,u,f),f.onabort=R(yt,h,"TestLoadImage: abort",!1,u,f),f.ontimeout=R(yt,h,"TestLoadImage: timeout",!1,u,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else u(!1)}function ym(o,u){let h=new er,f=new AbortController,E=setTimeout(()=>{f.abort(),yt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:f.signal}).then(A=>{clearTimeout(E),A.ok?yt(h,"TestPingServer: ok",!0,u):yt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(E),yt(h,"TestPingServer: error",!1,u)})}function yt(o,u,h,f,E){try{E&&(E.onload=null,E.onerror=null,E.onabort=null,E.ontimeout=null),f(h)}catch{}}function vm(){this.g=new tm}function Im(o,u,h){let f=h||"";try{vl(o,function(E,A){let D=E;d(E)&&(D=ho(E)),u.push(f+A+"="+encodeURIComponent(D))})}catch(E){throw u.push(f+"type="+encodeURIComponent("_badmap")),E}}function sr(o){this.l=o.Ub||null,this.j=o.eb||!1}k(sr,fo),sr.prototype.g=function(){return new ui(this.l,this.j)},sr.prototype.i=function(o){return function(){return o}}({});function ui(o,u){ve.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(ui,ve),n=ui.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,ar(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,or(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ar(this)),this.g&&(this.readyState=3,ar(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Rl(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Rl(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?or(this):ar(this),this.readyState==3&&Rl(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,or(this))},n.Qa=function(o){this.g&&(this.response=o,or(this))},n.ga=function(){this.g&&or(this)};function or(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ar(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function ar(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ui.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Sl(o){let u="";return W(o,function(h,f){u+=f,u+=":",u+=h,u+=`\r
`}),u}function To(o,u,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Sl(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):X(o,u,h))}function ne(o){ve.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(ne,ve);var wm=/^https?$/i,Em=["POST","PUT"];n=ne.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():go.g(),this.v=this.o?nl(this.o):nl(go),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(A){Pl(this,A);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var E in f)h.set(E,f[E]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(let A of f.keys())h.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),E=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Em,u,void 0))||f||E||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[A,D]of h)this.g.setRequestHeader(A,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Dl(this),this.u=!0,this.g.send(o),this.u=!1}catch(A){Pl(this,A)}};function Pl(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Cl(o),li(o)}function Cl(o){o.A||(o.A=!0,be(o,"complete"),be(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,be(this,"complete"),be(this,"abort"),li(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),li(this,!0)),ne.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?kl(this):this.bb())},n.bb=function(){kl(this)};function kl(o){if(o.h&&typeof a<"u"&&(!o.v[1]||nt(o)!=4||o.Z()!=2)){if(o.u&&nt(o)==4)Xu(o.Ea,0,o);else if(be(o,"readystatechange"),nt(o)==4){o.h=!1;try{let D=o.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var f;if(f=D===0){var E=String(o.D).match(Il)[1]||null;!E&&c.self&&c.self.location&&(E=c.self.location.protocol.slice(0,-1)),f=!wm.test(E?E.toLowerCase():"")}h=f}if(h)be(o,"complete"),be(o,"success");else{o.m=6;try{var A=2<nt(o)?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.Z()+"]",Cl(o)}}finally{li(o)}}}}function li(o,u){if(o.g){Dl(o);let h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||be(o,"ready");try{h.onreadystatechange=f}catch{}}}function Dl(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function nt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<nt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),em(u)}};function Nl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Tm(o){let u={};o=(o.g&&2<=nt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(B(o[f]))continue;var h=w(o[f]);let E=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let A=u[E]||[];u[E]=A,A.push(h)}I(u,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function cr(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function Ol(o){this.Aa=0,this.i=[],this.j=new er,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=cr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=cr("baseRetryDelayMs",5e3,o),this.cb=cr("retryDelaySeedMs",1e4,o),this.Wa=cr("forwardChannelMaxRetries",2,o),this.wa=cr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new pl(o&&o.concurrentRequestLimit),this.Da=new vm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ol.prototype,n.la=8,n.G=1,n.connect=function(o,u,h,f){Ae(0),this.W=o,this.H=u||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=jl(this,null,this.W),di(this)};function bo(o){if(xl(o),o.G==3){var u=o.U++,h=tt(o.I);if(X(h,"SID",o.K),X(h,"RID",u),X(h,"TYPE","terminate"),ur(o,h),u=new gt(o,o.j,u),u.L=2,u.v=ci(tt(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=zl(u.j,null),u.g.ea(u.v)),u.F=Date.now(),si(u)}ql(o)}function hi(o){o.g&&(Ro(o),o.g.cancel(),o.g=null)}function xl(o){hi(o),o.u&&(c.clearTimeout(o.u),o.u=null),fi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function di(o){if(!ml(o.h)&&!o.s){o.s=!0;var u=o.Ga;Kn||Ku(),Hn||(Kn(),Hn=!0),no.add(u,o),o.B=0}}function bm(o,u){return gl(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Zn(b(o.Ga,o,u),Bl(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let E=new gt(this,this.j,o),A=this.o;if(this.S&&(A?(A=m(A),v(A,this.S)):A=this.S),this.m!==null||this.O||(E.H=A,A=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=Ll(this,E,u),h=tt(this.I),X(h,"RID",o),X(h,"CVER",22),this.D&&X(h,"X-HTTP-Session-Id",this.D),ur(this,h),A&&(this.O?u="headers="+encodeURIComponent(String(Sl(A)))+"&"+u:this.m&&To(h,this.m,A)),Eo(this.h,E),this.Ua&&X(h,"TYPE","init"),this.P?(X(h,"$req",u),X(h,"SID","null"),E.T=!0,yo(E,h,null)):yo(E,h,u),this.G=2}}else this.G==3&&(o?Vl(this,o):this.i.length==0||ml(this.h)||Vl(this))};function Vl(o,u){var h;u?h=u.l:h=o.U++;let f=tt(o.I);X(f,"SID",o.K),X(f,"RID",h),X(f,"AID",o.T),ur(o,f),o.m&&o.o&&To(f,o.m,o.o),h=new gt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ll(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Eo(o.h,h),yo(h,f,u)}function ur(o,u){o.H&&W(o.H,function(h,f){X(u,f,h)}),o.l&&vl({},function(h,f){X(u,f,h)})}function Ll(o,u,h){h=Math.min(o.i.length,h);var f=o.l?b(o.l.Na,o.l,o):null;e:{var E=o.i;let A=-1;for(;;){let D=["count="+h];A==-1?0<h?(A=E[0].g,D.push("ofs="+A)):A=0:D.push("ofs="+A);let Y=!0;for(let me=0;me<h;me++){let Q=E[me].g,Ie=E[me].map;if(Q-=A,0>Q)A=Math.max(0,E[me].g-100),Y=!1;else try{Im(Ie,D,"req"+Q+"_")}catch{f&&f(Ie)}}if(Y){f=D.join("&");break e}}}return o=o.i.splice(0,h),u.D=o,f}function Ml(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Kn||Ku(),Hn||(Kn(),Hn=!0),no.add(u,o),o.v=0}}function Ao(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Zn(b(o.Fa,o),Bl(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Fl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Zn(b(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ae(10),hi(this),Fl(this))};function Ro(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Fl(o){o.g=new gt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=tt(o.qa);X(u,"RID","rpc"),X(u,"SID",o.K),X(u,"AID",o.T),X(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&X(u,"TO",o.ja),X(u,"TYPE","xmlhttp"),ur(o,u),o.m&&o.o&&To(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=ci(tt(u)),h.m=null,h.P=!0,hl(h,o)}n.Za=function(){this.C!=null&&(this.C=null,hi(this),Ao(this),Ae(19))};function fi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Ul(o,u){var h=null;if(o.g==u){fi(o),Ro(o),o.g=null;var f=2}else if(wo(o.h,u))h=u.D,_l(o.h,u),f=1;else return;if(o.G!=0){if(u.o)if(f==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var E=o.B;f=ni(),be(f,new al(f,h)),di(o)}else Ml(o);else if(E=u.s,E==3||E==0&&0<u.X||!(f==1&&bm(o,u)||f==2&&Ao(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),E){case 1:xt(o,5);break;case 4:xt(o,10);break;case 3:xt(o,6);break;default:xt(o,2)}}}function Bl(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function xt(o,u){if(o.j.info("Error code "+u),u==2){var h=b(o.fb,o),f=o.Xa;let E=!f;f=new Ot(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||oi(f,"https"),ci(f),E?_m(f.toString(),h):ym(f.toString(),h)}else Ae(2);o.G=0,o.l&&o.l.sa(u),ql(o),xl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ae(2)):(this.j.info("Failed to ping google.com"),Ae(1))};function ql(o){if(o.G=0,o.ka=[],o.l){let u=yl(o.h);(u.length!=0||o.i.length!=0)&&(C(o.ka,u),C(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function jl(o,u,h){var f=h instanceof Ot?tt(h):new Ot(h);if(f.g!="")u&&(f.g=u+"."+f.g),ai(f,f.s);else{var E=c.location;f=E.protocol,u=u?u+"."+E.hostname:E.hostname,E=+E.port;var A=new Ot(null);f&&oi(A,f),u&&(A.g=u),E&&ai(A,E),h&&(A.l=h),f=A}return h=o.D,u=o.ya,h&&u&&X(f,h,u),X(f,"VER",o.la),ur(o,f),f}function zl(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new ne(new sr({eb:h})):new ne(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Gl(){}n=Gl.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function pi(){}pi.prototype.g=function(o,u){return new ke(o,u)};function ke(o,u){ve.call(this),this.g=new Ol(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!B(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!B(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new cn(this)}k(ke,ve),ke.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ke.prototype.close=function(){bo(this.g)},ke.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=ho(o),o=h);u.i.push(new am(u.Ya++,o)),u.G==3&&di(u)},ke.prototype.N=function(){this.g.l=null,delete this.j,bo(this.g),delete this.g,ke.aa.N.call(this)};function $l(o){po.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(let h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k($l,po);function Kl(){mo.call(this),this.status=1}k(Kl,mo);function cn(o){this.g=o}k(cn,Gl),cn.prototype.ua=function(){be(this.g,"a")},cn.prototype.ta=function(o){be(this.g,new $l(o))},cn.prototype.sa=function(o){be(this.g,new Kl)},cn.prototype.ra=function(){be(this.g,"b")},pi.prototype.createWebChannel=pi.prototype.g,ke.prototype.send=ke.prototype.o,ke.prototype.open=ke.prototype.m,ke.prototype.close=ke.prototype.close,Ca=ct.createWebChannelTransport=function(){return new pi},Pa=ct.getStatEventTarget=function(){return ni()},Sa=ct.Event=Dt,rs=ct.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ri.NO_ERROR=0,ri.TIMEOUT=8,ri.HTTP_ERROR=6,Rr=ct.ErrorCode=ri,cl.COMPLETE="complete",Ra=ct.EventType=cl,rl.EventType=Yn,Yn.OPEN="a",Yn.CLOSE="b",Yn.ERROR="c",Yn.MESSAGE="d",ve.prototype.listen=ve.prototype.K,vn=ct.WebChannel=rl,xy=ct.FetchXmlHttpFactory=sr,ne.prototype.listenOnce=ne.prototype.L,ne.prototype.getLastError=ne.prototype.Ka,ne.prototype.getLastErrorCode=ne.prototype.Ba,ne.prototype.getStatus=ne.prototype.Z,ne.prototype.getResponseJson=ne.prototype.Oa,ne.prototype.getResponseText=ne.prototype.oa,ne.prototype.send=ne.prototype.ea,ne.prototype.setWithCredentials=ne.prototype.Ha,Aa=ct.XhrIo=ne}).apply(typeof ns<"u"?ns:typeof self<"u"?self:typeof window<"u"?window:{});var xd="@firebase/firestore";var fe=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};fe.UNAUTHENTICATED=new fe(null),fe.GOOGLE_CREDENTIALS=new fe("google-credentials-uid"),fe.FIRST_PARTY=new fe("first-party-uid"),fe.MOCK_USER=new fe("mock-user");var Un="11.0.2";var Wt=new vt("@firebase/firestore");function In(){return Wt.logLevel}function O(n,...e){if(Wt.logLevel<=G.DEBUG){let t=e.map(_u);Wt.debug(`Firestore (${Un}): ${n}`,...t)}}function ut(n,...e){if(Wt.logLevel<=G.ERROR){let t=e.map(_u);Wt.error(`Firestore (${Un}): ${n}`,...t)}}function Sn(n,...e){if(Wt.logLevel<=G.WARN){let t=e.map(_u);Wt.warn(`Firestore (${Un}): ${n}`,...t)}}function _u(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function M(n="Unexpected state"){let e=`FIRESTORE (${Un}) INTERNAL ASSERTION FAILED: `+n;throw ut(e),new Error(e)}function J(n,e){n||M()}function U(n,e){return n}var S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},N=class extends Re{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Ue=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var ls=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},xa=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(fe.UNAUTHENTICATED))}shutdown(){}},Va=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},La=class{constructor(e){this.t=e,this.currentUser=fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){J(this.o===void 0);let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new Ue;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ue,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?c(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ue)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string"),new ls(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string"),new fe(e)}},Ma=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=fe.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}},Fa=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Ma(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(fe.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Ua=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Ba=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){J(this.o===void 0);let r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.R;return this.R=s.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(J(typeof t.token=="string"),this.R=t.token,new Ua(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function Vy(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var hs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let i=Vy(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}};function K(n,e){return n<e?-1:n>e?1:0}function Pn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var ge=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var q=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new ge(0,0))}static max(){return new n(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ds=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&M(),r===void 0?r=e.length-t:r>e.length-t&&M(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},te=class n extends ds{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new N(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},Ly=/^[_a-zA-Z][_a-zA-Z0-9]*$/,De=class n extends ds{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Ly.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new N(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new N(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new N(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var L=class n{constructor(e){this.path=e}static fromPath(e){return new n(te.fromString(e))}static fromName(e){return new n(te.fromString(e).popFirst(5))}static empty(){return new n(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new te(e.slice()))}};var qa=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};qa.UNKNOWN_ID=-1;function My(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=q.fromTimestamp(r===1e9?new ge(t+1,0):new ge(t,r));return new Qt(i,L.empty(),e)}function Fy(n){return new Qt(n.readTime,n.key,-1)}var Qt=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(q.min(),L.empty(),-1)}static max(){return new n(q.max(),L.empty(),-1)}};function Uy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}var By="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",ja=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Bn(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==By)throw n;O("LocalStore","Unexpectedly lost primary lease")}var P=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let l=0;l<s;l++){let d=l;t(e[d]).next(p=>{a[d]=p,++c,c===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function qy(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function qn(n){return n.name==="IndexedDbTransactionError"}var Cn=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Cn.oe=-1;function Gs(n){return n==null}function Nr(n){return n===0&&1/n==-1/0}function jy(n){return typeof n=="number"&&Number.isInteger(n)&&!Nr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function zy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Vd(e)),e=Gy(n.get(t),e);return Vd(e)}function Gy(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Vd(n){return n+""}var $y=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],FT=[...$y,"documentOverlays"],Ky=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Hy=Ky,Wy=[...Hy,"indexConfiguration","indexState","indexEntries"];var UT=[...Wy,"globals"];function Ld(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function nn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function gf(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var re=class n{constructor(e,t){this.comparator=e,this.root=t||Qe.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new bn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new bn(this.root,e,this.comparator,!1)}getReverseIterator(){return new bn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new bn(this.root,e,this.comparator,!0)}},bn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Qe=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();let e=this.left.check();if(e!==this.right.check())throw M();return e+(this.isRed()?0:1)}};Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var pe=class n{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new fs(this.data.getIterator())}getIteratorFrom(e){return new fs(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},fs=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var We=class n{constructor(e){this.fields=e,e.sort(De.comparator)}static empty(){return new n([])}unionWith(e){let t=new pe(De.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Pn(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var ps=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Te=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new ps("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Te.EMPTY_BYTE_STRING=new Te("");var Qy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lt(n){if(J(!!n),typeof n=="string"){let e=0,t=Qy.exec(n);if(J(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ee(n.seconds),nanos:ee(n.nanos)}}function ee(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ht(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}function yu(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function $s(n){let e=n.mapValue.fields.__previous_value__;return yu(e)?$s(e):e}function Or(n){let e=lt(n.mapValue.fields.__local_write_time__.timestampValue);return new ge(e.seconds,e.nanos)}var za=class{constructor(e,t,r,i,s,a,c,l,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d}},ms=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var is={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Rt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?yu(n)?4:yf(n)?9007199254740991:_f(n)?10:11:M()}function Xe(n,e){if(n===e)return!0;let t=Rt(n);if(t!==Rt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Or(n).isEqual(Or(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=lt(i.timestampValue),c=lt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return ht(i.bytesValue).isEqual(ht(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ee(i.geoPointValue.latitude)===ee(s.geoPointValue.latitude)&&ee(i.geoPointValue.longitude)===ee(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ee(i.integerValue)===ee(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=ee(i.doubleValue),c=ee(s.doubleValue);return a===c?Nr(a)===Nr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Pn(n.arrayValue.values||[],e.arrayValue.values||[],Xe);case 10:case 11:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Ld(a)!==Ld(c))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!Xe(a[l],c[l])))return!1;return!0}(n,e);default:return M()}}function xr(n,e){return(n.values||[]).find(t=>Xe(t,e))!==void 0}function kn(n,e){if(n===e)return 0;let t=Rt(n),r=Rt(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=ee(s.integerValue||s.doubleValue),l=ee(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Md(n.timestampValue,e.timestampValue);case 4:return Md(Or(n),Or(e));case 5:return K(n.stringValue,e.stringValue);case 6:return function(s,a){let c=ht(s),l=ht(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){let p=K(c[d],l[d]);if(p!==0)return p}return K(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=K(ee(s.latitude),ee(a.latitude));return c!==0?c:K(ee(s.longitude),ee(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Fd(n.arrayValue,e.arrayValue);case 10:return function(s,a){var c,l,d,p;let y=s.fields||{},b=a.fields||{},R=(c=y.value)===null||c===void 0?void 0:c.arrayValue,k=(l=b.value)===null||l===void 0?void 0:l.arrayValue,x=K(((d=R?.values)===null||d===void 0?void 0:d.length)||0,((p=k?.values)===null||p===void 0?void 0:p.length)||0);return x!==0?x:Fd(R,k)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===is.mapValue&&a===is.mapValue)return 0;if(s===is.mapValue)return 1;if(a===is.mapValue)return-1;let c=s.fields||{},l=Object.keys(c),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let y=0;y<l.length&&y<p.length;++y){let b=K(l[y],p[y]);if(b!==0)return b;let R=kn(c[l[y]],d[p[y]]);if(R!==0)return R}return K(l.length,p.length)}(n.mapValue,e.mapValue);default:throw M()}}function Md(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);let t=lt(n),r=lt(e),i=K(t.seconds,r.seconds);return i!==0?i:K(t.nanos,r.nanos)}function Fd(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=kn(t[i],r[i]);if(s)return s}return K(t.length,r.length)}function Dn(n){return Ga(n)}function Ga(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=lt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return ht(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Ga(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${Ga(t.fields[a])}`;return i+"}"}(n.mapValue):M()}function as(n){switch(Rt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=$s(n);return e?16+as(e):16;case 5:return 2*n.stringValue.length;case 6:return ht(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+as(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return nn(r.fields,(s,a)=>{i+=s.length+as(a)}),i}(n.mapValue);default:throw M()}}function Ud(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function $a(n){return!!n&&"integerValue"in n}function vu(n){return!!n&&"arrayValue"in n}function Bd(n){return!!n&&"nullValue"in n}function qd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function cs(n){return!!n&&"mapValue"in n}function _f(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Pr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return nn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Pr(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Pr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function yf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Fe=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!cs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Pr(t)}setAll(e){let t=De.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Pr(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());cs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Xe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];cs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){nn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Pr(this.value))}};function vf(n){let e=[];return nn(n.fields,(t,r)=>{let i=new De([t]);if(cs(r)){let s=vf(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new We(e)}var Be=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,q.min(),q.min(),q.min(),Fe.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,q.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,q.min(),q.min(),Fe.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,q.min(),q.min(),Fe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Fe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Fe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Nn=class{constructor(e,t){this.position=e,this.inclusive=t}};function jd(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=kn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function zd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Xe(n.position[t],e.position[t]))return!1;return!0}var Jt=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Jy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var gs=class{},le=class n extends gs{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ha(e,t,r):t==="array-contains"?new Ja(e,r):t==="in"?new Ya(e,r):t==="not-in"?new Xa(e,r):t==="array-contains-any"?new Za(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Wa(e,r):new Qa(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(kn(t,this.value)):t!==null&&Rt(this.value)===Rt(t)&&this.matchesComparison(kn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},qe=class n extends gs{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return If(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function If(n){return n.op==="and"}function wf(n){return Yy(n)&&If(n)}function Yy(n){for(let e of n.filters)if(e instanceof qe)return!1;return!0}function Ka(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+Dn(n.value);if(wf(n))return n.filters.map(e=>Ka(e)).join(",");{let e=n.filters.map(t=>Ka(t)).join(",");return`${n.op}(${e})`}}function Ef(n,e){return n instanceof le?function(r,i){return i instanceof le&&r.op===i.op&&r.field.isEqual(i.field)&&Xe(r.value,i.value)}(n,e):n instanceof qe?function(r,i){return i instanceof qe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Ef(a,i.filters[c]),!0):!1}(n,e):void M()}function Tf(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${Dn(t.value)}`}(n):n instanceof qe?function(t){return t.op.toString()+" {"+t.getFilters().map(Tf).join(" ,")+"}"}(n):"Filter"}var Ha=class extends le{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){let t=L.comparator(e.key,this.key);return this.matchesComparison(t)}},Wa=class extends le{constructor(e,t){super(e,"in",t),this.keys=bf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Qa=class extends le{constructor(e,t){super(e,"not-in",t),this.keys=bf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function bf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}var Ja=class extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return vu(t)&&xr(t.arrayValue,this.value)}},Ya=class extends le{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&xr(this.value.arrayValue,t)}},Xa=class extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(xr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!xr(this.value.arrayValue,t)}},Za=class extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!vu(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>xr(this.value.arrayValue,r))}};var ec=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}};function Gd(n,e=null,t=[],r=[],i=null,s=null,a=null){return new ec(n,e,t,r,i,s,a)}function Iu(n){let e=U(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ka(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Gs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Dn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Dn(r)).join(",")),e.ue=t}return e.ue}function wu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Jy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ef(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!zd(n.startAt,e.startAt)&&zd(n.endAt,e.endAt)}function tc(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var St=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function Xy(n,e,t,r,i,s,a,c){return new St(n,e,t,r,i,s,a,c)}function Eu(n){return new St(n)}function $d(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Af(n){return n.collectionGroup!==null}function Cr(n){let e=U(n);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new pe(De.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Jt(s,r))}),t.has(De.keyField().canonicalString())||e.ce.push(new Jt(De.keyField(),r))}return e.ce}function Je(n){let e=U(n);return e.le||(e.le=Zy(e,Cr(n))),e.le}function Zy(n,e){if(n.limitType==="F")return Gd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new Jt(i.field,s)});let t=n.endAt?new Nn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Nn(n.startAt.position,n.startAt.inclusive):null;return Gd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function nc(n,e){let t=n.filters.concat([e]);return new St(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function _s(n,e,t){return new St(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ks(n,e){return wu(Je(n),Je(e))&&n.limitType===e.limitType}function Rf(n){return`${Iu(Je(n))}|lt:${n.limitType}`}function wn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Tf(i)).join(", ")}]`),Gs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Dn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Dn(i)).join(",")),`Target(${r})`}(Je(n))}; limitType=${n.limitType})`}function Hs(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):L.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of Cr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){let d=jd(a,c,l);return a.inclusive?d<=0:d<0}(r.startAt,Cr(r),i)||r.endAt&&!function(a,c,l){let d=jd(a,c,l);return a.inclusive?d>=0:d>0}(r.endAt,Cr(r),i))}(n,e)}function ev(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Sf(n){return(e,t)=>{let r=!1;for(let i of Cr(n)){let s=tv(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function tv(n,e,t){let r=n.field.isKeyField()?L.comparator(e.key,t.key):function(s,a,c){let l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?kn(l,d):M()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M()}}var dt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){nn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return gf(this.inner)}size(){return this.innerSize}};var nv=new re(L.comparator);function ft(){return nv}var Pf=new re(L.comparator);function Sr(...n){let e=Pf;for(let t of n)e=e.insert(t.key,t);return e}function Cf(n){let e=Pf;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function $t(){return kr()}function kf(){return kr()}function kr(){return new dt(n=>n.toString(),(n,e)=>n.isEqual(e))}var rv=new re(L.comparator),iv=new pe(L.comparator);function $(...n){let e=iv;for(let t of n)e=e.add(t);return e}var sv=new pe(K);function ov(){return sv}function Tu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Nr(e)?"-0":e}}function Df(n){return{integerValue:""+n}}function av(n,e){return jy(e)?Df(e):Tu(n,e)}var On=class{constructor(){this._=void 0}};function cv(n,e,t){return n instanceof Yt?function(i,s){let a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&yu(s)&&(s=$s(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}}(t,e):n instanceof Xt?Of(n,e):n instanceof Zt?xf(n,e):function(i,s){let a=Nf(i,s),c=Kd(a)+Kd(i.Pe);return $a(a)&&$a(i.Pe)?Df(c):Tu(i.serializer,c)}(n,e)}function uv(n,e,t){return n instanceof Xt?Of(n,e):n instanceof Zt?xf(n,e):t}function Nf(n,e){return n instanceof xn?function(r){return $a(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var Yt=class extends On{},Xt=class extends On{constructor(e){super(),this.elements=e}};function Of(n,e){let t=Vf(e);for(let r of n.elements)t.some(i=>Xe(i,r))||t.push(r);return{arrayValue:{values:t}}}var Zt=class extends On{constructor(e){super(),this.elements=e}};function xf(n,e){let t=Vf(e);for(let r of n.elements)t=t.filter(i=>!Xe(i,r));return{arrayValue:{values:t}}}var xn=class extends On{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function Kd(n){return ee(n.integerValue||n.doubleValue)}function Vf(n){return vu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var rc=class{constructor(e,t){this.field=e,this.transform=t}};function lv(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Xt&&i instanceof Xt||r instanceof Zt&&i instanceof Zt?Pn(r.elements,i.elements,Xe):r instanceof xn&&i instanceof xn?Xe(r.Pe,i.Pe):r instanceof Yt&&i instanceof Yt}(n.transform,e.transform)}var ic=class{constructor(e,t){this.version=e,this.transformResults=t}},bt=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function us(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Vn=class{};function Lf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ys(n.key,bt.none()):new en(n.key,n.data,bt.none());{let t=n.data,r=Fe.empty(),i=new pe(De.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new pt(n.key,r,new We(i.toArray()),bt.none())}}function hv(n,e,t){n instanceof en?function(i,s,a){let c=i.value.clone(),l=Wd(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof pt?function(i,s,a){if(!us(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=Wd(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(Mf(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Dr(n,e,t,r){return n instanceof en?function(s,a,c,l){if(!us(s.precondition,a))return c;let d=s.value.clone(),p=Qd(s.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof pt?function(s,a,c,l){if(!us(s.precondition,a))return c;let d=Qd(s.fieldTransforms,l,a),p=a.data;return p.setAll(Mf(s)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(s,a,c){return us(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function dv(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Nf(r.transform,i||null);s!=null&&(t===null&&(t=Fe.empty()),t.set(r.field,s))}return t||null}function Hd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Pn(r,i,(s,a)=>lv(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var en=class extends Vn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},pt=class extends Vn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function Mf(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Wd(n,e,t){let r=new Map;J(n.length===t.length);for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,uv(a,c,t[i]))}return r}function Qd(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,cv(s,a,e))}return r}var ys=class extends Vn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},sc=class extends Vn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var oc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&hv(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Dr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Dr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=kf();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let l=Lf(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&Pn(this.mutations,e.mutations,(t,r)=>Hd(t,r))&&Pn(this.baseMutations,e.baseMutations,(t,r)=>Hd(t,r))}},ac=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){J(e.mutations.length===r.length);let i=function(){return rv}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var cc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var uc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var ce,H;function fv(n){switch(n){default:return M();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function Ff(n){if(n===void 0)return ut("GRPC error has no .code"),S.UNKNOWN;switch(n){case ce.OK:return S.OK;case ce.CANCELLED:return S.CANCELLED;case ce.UNKNOWN:return S.UNKNOWN;case ce.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case ce.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case ce.INTERNAL:return S.INTERNAL;case ce.UNAVAILABLE:return S.UNAVAILABLE;case ce.UNAUTHENTICATED:return S.UNAUTHENTICATED;case ce.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case ce.NOT_FOUND:return S.NOT_FOUND;case ce.ALREADY_EXISTS:return S.ALREADY_EXISTS;case ce.PERMISSION_DENIED:return S.PERMISSION_DENIED;case ce.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case ce.ABORTED:return S.ABORTED;case ce.OUT_OF_RANGE:return S.OUT_OF_RANGE;case ce.UNIMPLEMENTED:return S.UNIMPLEMENTED;case ce.DATA_LOSS:return S.DATA_LOSS;default:return M()}}(H=ce||(ce={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";var Jd=null;function pv(){return new TextEncoder}var mv=new Tt([4294967295,4294967295],0);function Yd(n){let e=pv().encode(n),t=new ba;return t.update(e),new Uint8Array(t.digest())}function Xd(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Tt([t,r],0),new Tt([i,s],0)]}var lc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Kt(`Invalid padding: ${t}`);if(r<0)throw new Kt(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Kt(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Kt(`Invalid padding when bitmap length is 0: ${t}`);this.Te=8*e.length-t,this.Ie=Tt.fromNumber(this.Te)}Ee(e,t,r){let i=e.add(t.multiply(Tt.fromNumber(r)));return i.compare(mv)===1&&(i=new Tt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Ie).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Te===0)return!1;let t=Yd(e),[r,i]=Xd(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);if(!this.de(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Te===0)return;let t=Yd(e),[r,i]=Xd(t);for(let s=0;s<this.hashCount;s++){let a=this.Ee(r,i,s);this.Ae(a)}}Ae(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},Kt=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var vs=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,Vr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(q.min(),i,new re(K),ft(),$())}},Vr=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,$(),$(),$())}};var An=class{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}},Is=class{constructor(e,t){this.targetId=e,this.me=t}},ws=class{constructor(e,t,r=Te.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Es=class{constructor(){this.fe=0,this.ge=Zd(),this.pe=Te.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=$(),t=$(),r=$();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:M()}}),new Vr(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=Zd()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,J(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},hc=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=ft(),this.qe=ss(),this.Qe=ss(),this.Ke=new re(K)}$e(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.Ue(t,e.Ve):this.We(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.We(t,e.key,e.Ve)}Ge(e){this.forEachTarget(e,t=>{let r=this.ze(t);switch(e.state){case 0:this.je(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.je(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.je(t)&&(this.He(t),r.De(e.resumeToken));break;default:M()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.je(i)&&t(i)})}Je(e){let t=e.targetId,r=e.me.count,i=this.Ye(t);if(i){let s=i.target;if(tc(s))if(r===0){let a=new L(s.path);this.We(t,a,Be.newNoDocument(a,q.min()))}else J(r===1);else{let a=this.Ze(t);if(a!==r){let c=this.Xe(e),l=c?this.et(c,e,a):1;if(l!==0){this.He(t);let d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}Jd?.tt(function(p,y,b,R,k){var x,C,j,B,F,z;let oe={localCacheCount:p,existenceFilterCount:y.count,databaseId:b.database,projectId:b.projectId},W=y.unchangedNames;return W&&(oe.bloomFilter={applied:k===0,hashCount:(x=W?.hashCount)!==null&&x!==void 0?x:0,bitmapLength:(B=(j=(C=W?.bits)===null||C===void 0?void 0:C.bitmap)===null||j===void 0?void 0:j.length)!==null&&B!==void 0?B:0,padding:(z=(F=W?.bits)===null||F===void 0?void 0:F.padding)!==null&&z!==void 0?z:0,mightContain:I=>{var m;return(m=R?.mightContain(I))!==null&&m!==void 0&&m}}),oe}(a,e.me,this.Le.nt(),c,l))}}}}Xe(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=ht(r).toUint8Array()}catch(l){if(l instanceof ps)return Sn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new lc(a,i,s)}catch(l){return Sn(l instanceof Kt?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Te===0?null:c}et(e,t,r){return t.me.count===r-this.rt(e,t.targetId)?0:2}rt(e,t){let r=this.Le.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.Le.nt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.We(t,s,null),i++)}),i}it(e){let t=new Map;this.Be.forEach((s,a)=>{let c=this.Ye(a);if(c){if(s.current&&tc(c.target)){let l=new L(c.target.path);this.st(l).has(a)||this.ot(a,l)||this.We(a,l,Be.newNoDocument(l,e))}s.be&&(t.set(a,s.ve()),s.Ce())}});let r=$();this.Qe.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{let d=this.Ye(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ke.forEach((s,a)=>a.setReadTime(e));let i=new vs(e,t,this.Ke,this.ke,r);return this.ke=ft(),this.qe=ss(),this.Qe=ss(),this.Ke=new re(K),i}Ue(e,t){if(!this.je(e))return;let r=this.ot(e,t.key)?2:0;this.ze(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e)),this.Qe=this.Qe.insert(t.key,this._t(t.key).add(e))}We(e,t,r){if(!this.je(e))return;let i=this.ze(e);this.ot(e,t)?i.Fe(t,1):i.Me(t),this.Qe=this.Qe.insert(t,this._t(t).delete(e)),this.Qe=this.Qe.insert(t,this._t(t).add(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ze(e){let t=this.ze(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.ze(e).xe()}ze(e){let t=this.Be.get(e);return t||(t=new Es,this.Be.set(e,t)),t}_t(e){let t=this.Qe.get(e);return t||(t=new pe(K),this.Qe=this.Qe.insert(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new pe(K),this.qe=this.qe.insert(e,t)),t}je(e){let t=this.Ye(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}Ye(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ut(e)}He(e){this.Be.set(e,new Es),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.We(e,t,null)})}ot(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function ss(){return new re(L.comparator)}function Zd(){return new re(L.comparator)}var gv={asc:"ASCENDING",desc:"DESCENDING"},_v={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},yv={and:"AND",or:"OR"},dc=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function fc(n,e){return n.useProto3Json||Gs(e)?e:{value:e}}function Ts(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Uf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function vv(n,e){return Ts(n,e.toTimestamp())}function Ye(n){return J(!!n),q.fromTimestamp(function(t){let r=lt(t);return new ge(r.seconds,r.nanos)}(n))}function bu(n,e){return pc(n,e).canonicalString()}function pc(n,e){let t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Bf(n){let e=te.fromString(n);return J($f(e)),e}function mc(n,e){return bu(n.databaseId,e.path)}function ka(n,e){let t=Bf(e);if(t.get(1)!==n.databaseId.projectId)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(jf(t))}function qf(n,e){return bu(n.databaseId,e)}function Iv(n){let e=Bf(n);return e.length===4?te.emptyPath():jf(e)}function gc(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function jf(n){return J(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function ef(n,e,t){return{name:mc(n,e),fields:t.value.mapValue.fields}}function wv(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(J(p===void 0||typeof p=="string"),Te.fromBase64String(p||"")):(J(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Te.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){let p=d.code===void 0?S.UNKNOWN:Ff(d.code);return new N(p,d.message||"")}(a);t=new ws(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=ka(n,r.document.name),s=Ye(r.document.updateTime),a=r.document.createTime?Ye(r.document.createTime):q.min(),c=new Fe({mapValue:{fields:r.document.fields}}),l=Be.newFoundDocument(i,s,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new An(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=ka(n,r.document),s=r.readTime?Ye(r.readTime):q.min(),a=Be.newNoDocument(i,s),c=r.removedTargetIds||[];t=new An([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=ka(n,r.document),s=r.removedTargetIds||[];t=new An([],s,i,null)}else{if(!("filter"in e))return M();{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new uc(i,s),c=r.targetId;t=new Is(c,a)}}return t}function Ev(n,e){let t;if(e instanceof en)t={update:ef(n,e.key,e.value)};else if(e instanceof ys)t={delete:mc(n,e.key)};else if(e instanceof pt)t={update:ef(n,e.key,e.data),updateMask:Dv(e.fieldMask)};else{if(!(e instanceof sc))return M();t={verify:mc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof Yt)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Xt)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Zt)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof xn)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw M()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:vv(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M()}(n,e.precondition)),t}function Tv(n,e){return n&&n.length>0?(J(e!==void 0),n.map(t=>function(i,s){let a=i.updateTime?Ye(i.updateTime):Ye(s);return a.isEqual(q.min())&&(a=Ye(s)),new ic(a,i.transformResults||[])}(t,e))):[]}function bv(n,e){return{documents:[qf(n,e.path)]}}function Av(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=qf(n,i);let s=function(d){if(d.length!==0)return Gf(qe.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(d){if(d.length!==0)return d.map(p=>function(b){return{field:En(b.field),direction:Pv(b.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=fc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ct:t,parent:i}}function Rv(n){let e=Iv(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){J(r===1);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(y){let b=zf(y);return b instanceof qe&&wf(b)?b.getFilters():[b]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(b=>function(k){return new Jt(Tn(k.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(b))}(t.orderBy));let c=null;t.limit&&(c=function(y){let b;return b=typeof y=="object"?y.value:y,Gs(b)?null:b}(t.limit));let l=null;t.startAt&&(l=function(y){let b=!!y.before,R=y.values||[];return new Nn(R,b)}(t.startAt));let d=null;return t.endAt&&(d=function(y){let b=!y.before,R=y.values||[];return new Nn(R,b)}(t.endAt)),Xy(e,i,a,s,c,"F",l,d)}function Sv(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function zf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Tn(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Tn(t.unaryFilter.field);return le.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Tn(t.unaryFilter.field);return le.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Tn(t.unaryFilter.field);return le.create(a,"!=",{nullValue:"NULL_VALUE"});default:return M()}}(n):n.fieldFilter!==void 0?function(t){return le.create(Tn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return qe.create(t.compositeFilter.filters.map(r=>zf(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M()}}(t.compositeFilter.op))}(n):M()}function Pv(n){return gv[n]}function Cv(n){return _v[n]}function kv(n){return yv[n]}function En(n){return{fieldPath:n.canonicalString()}}function Tn(n){return De.fromServerFormat(n.fieldPath)}function Gf(n){return n instanceof le?function(t){if(t.op==="=="){if(qd(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NAN"}};if(Bd(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(qd(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NOT_NAN"}};if(Bd(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:En(t.field),op:Cv(t.op),value:t.value}}}(n):n instanceof qe?function(t){let r=t.getFilters().map(i=>Gf(i));return r.length===1?r[0]:{compositeFilter:{op:kv(t.op),filters:r}}}(n):M()}function Dv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function $f(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var Lr=class n{constructor(e,t,r,i,s=q.min(),a=q.min(),c=Te.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var _c=class{constructor(e){this.ht=e}};function Nv(n){let e=Rv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?_s(e,e.limit,"L"):e}var bs=class{constructor(){}Et(e,t){this.dt(e,t),t.At()}dt(e,t){if("nullValue"in e)this.Rt(t,5);else if("booleanValue"in e)this.Rt(t,10),t.Vt(e.booleanValue?1:0);else if("integerValue"in e)this.Rt(t,15),t.Vt(ee(e.integerValue));else if("doubleValue"in e){let r=ee(e.doubleValue);isNaN(r)?this.Rt(t,13):(this.Rt(t,15),Nr(r)?t.Vt(0):t.Vt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Rt(t,20),typeof r=="string"&&(r=lt(r)),t.ft(`${r.seconds||""}`),t.Vt(r.nanos||0)}else if("stringValue"in e)this.gt(e.stringValue,t),this.yt(t);else if("bytesValue"in e)this.Rt(t,30),t.wt(ht(e.bytesValue)),this.yt(t);else if("referenceValue"in e)this.St(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Rt(t,45),t.Vt(r.latitude||0),t.Vt(r.longitude||0)}else"mapValue"in e?yf(e)?this.Rt(t,Number.MAX_SAFE_INTEGER):_f(e)?this.bt(e.mapValue,t):(this.Dt(e.mapValue,t),this.yt(t)):"arrayValue"in e?(this.vt(e.arrayValue,t),this.yt(t)):M()}gt(e,t){this.Rt(t,25),this.Ct(e,t)}Ct(e,t){t.ft(e)}Dt(e,t){let r=e.fields||{};this.Rt(t,55);for(let i of Object.keys(r))this.gt(i,t),this.dt(r[i],t)}bt(e,t){var r,i;let s=e.fields||{};this.Rt(t,53);let a="value",c=((i=(r=s[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Rt(t,15),t.Vt(ee(c)),this.gt(a,t),this.dt(s[a],t)}vt(e,t){let r=e.values||[];this.Rt(t,50);for(let i of r)this.dt(i,t)}St(e,t){this.Rt(t,37),L.fromName(e).path.forEach(r=>{this.Rt(t,60),this.Ct(r,t)})}Rt(e,t){e.Vt(t)}yt(e){e.Vt(2)}};bs.Ft=new bs;var yc=class{constructor(){this.ln=new vc}addToCollectionParentIndex(e,t){return this.ln.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.ln.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Qt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Qt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}},vc=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new pe(te.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new pe(te.comparator)).toArray()}};var qT=new Uint8Array(0);var tf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},xe=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};xe.DEFAULT_COLLECTION_PERCENTILE=10,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xe.DEFAULT=new xe(41943040,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xe.DISABLED=new xe(-1,0,0);var Mr=class n{constructor(e){this.kn=e}next(){return this.kn+=2,this.kn}static qn(){return new n(0)}static Qn(){return new n(-1)}};function nf([n,e],[t,r]){let i=K(n,t);return i===0?K(e,r):i}var Ic=class{constructor(e){this.Gn=e,this.buffer=new pe(nf),this.zn=0}jn(){return++this.zn}Hn(e){let t=[e,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();nf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},wc=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(e){O("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qn(t)?O("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Bn(t)}await this.Yn(3e5)})}},Ec=class{constructor(e,t){this.Zn=e,this.params=t}calculateTargetCount(e,t){return this.Zn.Xn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Cn.oe);let r=new Ic(t);return this.Zn.forEachTarget(e,i=>r.Hn(i.sequenceNumber)).next(()=>this.Zn.er(e,i=>r.Hn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Zn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Zn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(tf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),tf):this.tr(e,t))}getCacheSize(e){return this.Zn.getCacheSize(e)}tr(e,t){let r,i,s,a,c,l,d,p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(y=>(y>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),i=this.params.maximumSequenceNumbersToCollect):i=y,a=Date.now(),this.nthSequenceNumber(e,i))).next(y=>(r=y,c=Date.now(),this.removeTargets(e,r,t))).next(y=>(s=y,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(y=>(d=Date.now(),In()<=G.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${y} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:y})))}};function Ov(n,e){return new Ec(n,e)}var Tc=class{constructor(){this.changes=new dt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var bc=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Ac=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Dr(r.mutation,i,We.empty(),ge.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,$()).next(()=>r))}getLocalViewOfDocuments(e,t,r=$()){let i=$t();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Sr();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=$t();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,$()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=ft(),a=kr(),c=function(){return kr()}();return t.forEach((l,d)=>{let p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof pt)?s=s.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Dr(p.mutation,d,p.mutation.getFieldMask(),ge.now())):a.set(d.key,We.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var y;return c.set(d,new bc(p,(y=a.get(d))!==null&&y!==void 0?y:null))}),c))}recalculateAndSaveOverlays(e,t){let r=kr(),i=new re((a,c)=>a-c),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(l=>{let d=t.get(l);if(d===null)return;let p=r.get(l)||We.empty();p=c.applyToLocalView(d,p),r.set(l,p);let y=(i.get(c.batchId)||$()).add(l);i=i.insert(c.batchId,y)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let l=c.getNext(),d=l.key,p=l.value,y=kf();p.forEach(b=>{if(!s.has(b)){let R=Lf(t.get(b),r.get(b));R!==null&&y.set(b,R),s=s.add(b)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Af(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):P.resolve($t()),c=-1,l=s;return a.next(d=>P.forEach(d,(p,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),s.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(b=>{l=l.insert(p,b)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,$())).next(p=>({batchId:c,changes:Cf(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let i=Sr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=Sr();return this.indexManager.getCollectionParents(e,s).next(c=>P.forEach(c,l=>{let d=function(y,b){return new St(b,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((y,b)=>{a=a.insert(y,b)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{let p=d.getKey();a.get(p)===null&&(a=a.insert(p,Be.newInvalidDocument(p)))});let c=Sr();return a.forEach((l,d)=>{let p=s.get(l);p!==void 0&&Dr(p.mutation,d,We.empty(),ge.now()),Hs(t,d)&&(c=c.insert(l,d))}),c})}};var Rc=class{constructor(e){this.serializer=e,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(e,t){return P.resolve(this.Tr.get(t))}saveBundleMetadata(e,t){return this.Tr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ye(i.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Ir.get(t))}saveNamedQuery(e,t){return this.Ir.set(t.name,function(i){return{name:i.name,query:Nv(i.bundledQuery),readTime:Ye(i.readTime)}}(t)),P.resolve()}};var Sc=class{constructor(){this.overlays=new re(L.comparator),this.Er=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){let r=$t();return P.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.Tt(e,t,s)}),P.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.Er.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Er.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){let i=$t(),s=t.length+1,a=new L(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return P.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new re((d,p)=>d-p),a=this.overlays.getIterator();for(;a.hasNext();){let d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=$t(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}let c=$t(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return P.resolve(c)}Tt(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.Er.get(i.largestBatchId).delete(r.key);this.Er.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new cc(t,r));let s=this.Er.get(t);s===void 0&&(s=$(),this.Er.set(t,s)),this.Er.set(t,s.add(r.key))}};var Pc=class{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}};var Fr=class{constructor(){this.dr=new pe(ue.Ar),this.Rr=new pe(ue.Vr)}isEmpty(){return this.dr.isEmpty()}addReference(e,t){let r=new ue(e,t);this.dr=this.dr.add(r),this.Rr=this.Rr.add(r)}mr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.gr(new ue(e,t))}pr(e,t){e.forEach(r=>this.removeReference(r,t))}yr(e){let t=new L(new te([])),r=new ue(t,e),i=new ue(t,e+1),s=[];return this.Rr.forEachInRange([r,i],a=>{this.gr(a),s.push(a.key)}),s}wr(){this.dr.forEach(e=>this.gr(e))}gr(e){this.dr=this.dr.delete(e),this.Rr=this.Rr.delete(e)}Sr(e){let t=new L(new te([])),r=new ue(t,e),i=new ue(t,e+1),s=$();return this.Rr.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new ue(e,0),r=this.dr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},ue=class{constructor(e,t){this.key=e,this.br=t}static Ar(e,t){return L.comparator(e.key,t.key)||K(e.br,t.br)}static Vr(e,t){return K(e.br,t.br)||L.comparator(e.key,t.key)}};var Cc=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Dr=1,this.vr=new pe(ue.Ar)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new oc(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.vr=this.vr.add(new ue(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Cr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Fr(r),s=i<0?0:i;return P.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new ue(t,0),i=new ue(t,Number.POSITIVE_INFINITY),s=[];return this.vr.forEachInRange([r,i],a=>{let c=this.Cr(a.br);s.push(c)}),P.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new pe(K);return t.forEach(i=>{let s=new ue(i,0),a=new ue(i,Number.POSITIVE_INFINITY);this.vr.forEachInRange([s,a],c=>{r=r.add(c.br)})}),P.resolve(this.Mr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;L.isDocumentKey(s)||(s=s.child(""));let a=new ue(new L(s),0),c=new pe(K);return this.vr.forEachWhile(l=>{let d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.br)),!0)},a),P.resolve(this.Mr(c))}Mr(e){let t=[];return e.forEach(r=>{let i=this.Cr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){J(this.Or(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.vr;return P.forEach(t.mutations,i=>{let s=new ue(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.vr=r})}Ln(e){}containsKey(e,t){let r=new ue(t,0),i=this.vr.firstAfterOrEqual(r);return P.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Or(e,t){return this.Fr(e)}Fr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Cr(e){let t=this.Fr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var kc=class{constructor(e){this.Nr=e,this.docs=function(){return new re(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.Nr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Be.newInvalidDocument(t))}getEntries(e,t){let r=ft();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Be.newInvalidDocument(i))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=ft(),a=t.path,c=new L(a.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Uy(Fy(p),r)<=0||(i.has(p.key)||Hs(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return P.resolve(s)}getAllFromCollectionGroup(e,t,r,i){M()}Lr(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Dc(this)}getSize(e){return P.resolve(this.size)}},Dc=class extends Tc{constructor(e){super(),this.hr=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.hr.addEntry(e,i)):this.hr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.hr.getEntry(e,t)}getAllFromCache(e,t){return this.hr.getEntries(e,t)}};var Nc=class{constructor(e){this.persistence=e,this.Br=new dt(t=>Iu(t),wu),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.kr=0,this.qr=new Fr,this.targetCount=0,this.Qr=Mr.qn()}forEachTarget(e,t){return this.Br.forEach((r,i)=>t(i)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.kr)}allocateTargetId(e){return this.highestTargetId=this.Qr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.kr&&(this.kr=t),P.resolve()}Un(e){this.Br.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Qr=new Mr(t),this.highestTargetId=t),e.sequenceNumber>this.kr&&(this.kr=e.sequenceNumber)}addTargetData(e,t){return this.Un(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Un(t),P.resolve()}removeTargetData(e,t){return this.Br.delete(t.target),this.qr.yr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.Br.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Br.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),P.waitFor(s).next(()=>i)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){let r=this.Br.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.qr.mr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.qr.pr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),P.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.qr.yr(t),P.resolve()}getMatchingKeysForTargetId(e,t){let r=this.qr.Sr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.qr.containsKey(t))}};var As=class{constructor(e,t){this.Kr={},this.overlays={},this.$r=new Cn(0),this.Ur=!1,this.Ur=!0,this.Wr=new Pc,this.referenceDelegate=e(this),this.Gr=new Nc(this),this.indexManager=new yc,this.remoteDocumentCache=function(i){return new kc(i)}(r=>this.referenceDelegate.zr(r)),this.serializer=new _c(t),this.jr=new Rc(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Sc,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Kr[e.toKey()];return r||(r=new Cc(t,this.referenceDelegate),this.Kr[e.toKey()]=r),r}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);let i=new Oc(this.$r.next());return this.referenceDelegate.Hr(),r(i).next(s=>this.referenceDelegate.Jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Yr(e,t){return P.or(Object.values(this.Kr).map(r=>()=>r.containsKey(e,t)))}},Oc=class extends ja{constructor(e){super(),this.currentSequenceNumber=e}},xc=class n{constructor(e){this.persistence=e,this.Zr=new Fr,this.Xr=null}static ei(e){return new n(e)}get ti(){if(this.Xr)return this.Xr;throw M()}addReference(e,t,r){return this.Zr.addReference(r,t),this.ti.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Zr.removeReference(r,t),this.ti.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.ti.add(t.toString()),P.resolve()}removeTarget(e,t){this.Zr.yr(t.targetId).forEach(i=>this.ti.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.ti.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Hr(){this.Xr=new Set}Jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.ti,r=>{let i=L.fromPath(r);return this.ni(e,i).next(s=>{s||t.removeEntry(i,q.min())})}).next(()=>(this.Xr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ni(e,t).next(r=>{r?this.ti.delete(t.toString()):this.ti.add(t.toString())})}zr(e){return 0}ni(e,t){return P.or([()=>P.resolve(this.Zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Yr(e,t)])}},Rs=class n{constructor(e,t){this.persistence=e,this.ri=new dt(r=>zy(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Ov(this,t)}static ei(e,t){return new n(e,t)}Hr(){}Jr(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Xn(e){let t=this.nr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}nr(e){let t=0;return this.er(e,r=>{t++}).next(()=>t)}er(e,t){return P.forEach(this.ri,(r,i)=>this.ir(e,r,i).next(s=>s?P.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Lr(e,a=>this.ir(e,a,t).next(c=>{c||(r++,s.removeEntry(a,q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.ri.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ri.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.ri.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.ri.set(t,e.currentSequenceNumber),P.resolve()}zr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=as(e.data.value)),t}ir(e,t,r){return P.or([()=>this.persistence.Yr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.ri.get(t);return P.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Vc=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Wi=r,this.Gi=i}static zi(e,t){let r=$(),i=$();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var Lc=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Mc=class{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return th()?8:qy(he())>0?6:4}()}initialize(e,t){this.Zi=e,this.indexManager=t,this.ji=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.Xi(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.es(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new Lc;return this.ts(e,t,a).next(c=>{if(s.result=c,this.Hi)return this.ns(e,t,a,c.size)})}).next(()=>s.result)}ns(e,t,r,i){return r.documentReadCount<this.Ji?(In()<=G.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",wn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),P.resolve()):(In()<=G.DEBUG&&O("QueryEngine","Query:",wn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Yi*i?(In()<=G.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",wn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Je(t))):P.resolve())}Xi(e,t){if($d(t))return P.resolve(null);let r=Je(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=_s(t,null,"F"),r=Je(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=$(...s);return this.Zi.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{let d=this.rs(t,c);return this.ss(t,d,a,l.readTime)?this.Xi(e,_s(t,null,"F")):this.os(e,d,t,l)}))})))}es(e,t,r,i){return $d(t)||i.isEqual(q.min())?P.resolve(null):this.Zi.getDocuments(e,r).next(s=>{let a=this.rs(t,s);return this.ss(t,a,r,i)?P.resolve(null):(In()<=G.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),wn(t)),this.os(e,a,t,My(i,-1)).next(c=>c))})}rs(e,t){let r=new pe(Sf(e));return t.forEach((i,s)=>{Hs(e,s)&&(r=r.add(s))}),r}ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ts(e,t,r){return In()<=G.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",wn(t)),this.Zi.getDocumentsMatchingQuery(e,t,Qt.min(),r)}os(e,t,r,i){return this.Zi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var Fc=class{constructor(e,t,r,i){this.persistence=e,this._s=t,this.serializer=i,this.us=new re(K),this.cs=new dt(s=>Iu(s),wu),this.ls=new Map,this.hs=e.getRemoteDocumentCache(),this.Gr=e.getTargetCache(),this.jr=e.getBundleCache(),this.Ps(r)}Ps(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ac(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.us))}};function xv(n,e,t,r){return new Fc(n,e,t,r)}async function Kf(n,e){let t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ps(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],l=$();for(let d of i){a.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}for(let d of s){c.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Ts:d,removedBatchIds:a,addedBatchIds:c}))})})}function Vv(n,e){let t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.hs.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){let y=d.batch,b=y.keys(),R=P.resolve();return b.forEach(k=>{R=R.next(()=>p.getEntry(l,k)).next(x=>{let C=d.docVersions.get(k);J(C!==null),x.version.compareTo(C)<0&&(y.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),p.addEntry(x)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(l,y))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=$();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Hf(n){let e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Gr.getLastRemoteSnapshotVersion(t))}function Lv(n,e){let t=U(n),r=e.snapshotVersion,i=t.us;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.hs.newChangeBuffer({trackRemovals:!0});i=t.us;let c=[];e.targetChanges.forEach((p,y)=>{let b=i.get(y);if(!b)return;c.push(t.Gr.removeMatchingKeys(s,p.removedDocuments,y).next(()=>t.Gr.addMatchingKeys(s,p.addedDocuments,y)));let R=b.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(y)!==null?R=R.withResumeToken(Te.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):p.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(p.resumeToken,r)),i=i.insert(y,R),function(x,C,j){return x.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(b,R,p)&&c.push(t.Gr.updateTargetData(s,R))});let l=ft(),d=$();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(Mv(s,a,e.documentUpdates).next(p=>{l=p.Is,d=p.Es})),!r.isEqual(q.min())){let p=t.Gr.getLastRemoteSnapshotVersion(s).next(y=>t.Gr.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return P.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.us=i,s))}function Mv(n,e,t){let r=$(),i=$();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=ft();return t.forEach((c,l)=>{let d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(q.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):O("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{Is:a,Es:i}})}function Fv(n,e){let t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Uv(n,e){let t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Gr.getTargetData(r,e).next(s=>s?(i=s,P.resolve(i)):t.Gr.allocateTargetId(r).next(a=>(i=new Lr(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Gr.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.us.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.us=t.us.insert(r.targetId,r),t.cs.set(e,r.targetId)),r})}async function Uc(n,e,t){let r=U(n),i=r.us.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!qn(a))throw a;O("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.us=r.us.remove(e),r.cs.delete(i.target)}function rf(n,e,t){let r=U(n),i=q.min(),s=$();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){let y=U(l),b=y.cs.get(p);return b!==void 0?P.resolve(y.us.get(b)):y.Gr.getTargetData(d,p)}(r,a,Je(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Gr.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r._s.getDocumentsMatchingQuery(a,e,t?i:q.min(),t?s:$())).next(c=>(Bv(r,ev(e),c),{documents:c,ds:s})))}function Bv(n,e,t){let r=n.ls.get(e)||q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.ls.set(e,r)}var Ss=class{constructor(){this.activeTargetIds=ov()}ps(e){this.activeTargetIds=this.activeTargetIds.add(e)}ys(e){this.activeTargetIds=this.activeTargetIds.delete(e)}gs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Bc=class{constructor(){this._o=new Ss,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this._o.ps(e),this.ao[e]||"not-current"}updateQueryState(e,t,r){this.ao[e]=t}removeLocalQueryTarget(e){this._o.ys(e)}isLocalQueryTarget(e){return this._o.activeTargetIds.has(e)}clearQueryState(e){delete this.ao[e]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(e){return this._o.activeTargetIds.has(e)}start(){return this._o=new Ss,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var qc=class{uo(e){}shutdown(){}};var Ps=class{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(e){this.To.push(e)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.To)e(0)}Po(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.To)e(1)}static p(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var os=null;function Da(){return os===null?os=function(){return 268435456+Math.round(2147483648*Math.random())}():os++,"0x"+os.toString(16)}var qv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var jc=class{constructor(e){this.Eo=e.Eo,this.Ao=e.Ao}Ro(e){this.Vo=e}mo(e){this.fo=e}po(e){this.yo=e}onMessage(e){this.wo=e}close(){this.Ao()}send(e){this.Eo(e)}So(){this.Vo()}bo(){this.fo()}Do(e){this.yo(e)}vo(e){this.wo(e)}};var Ee="WebChannelConnection",zc=class extends class{get Co(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Fo=r+"://"+t.host,this.Mo=`projects/${i}/databases/${s}`,this.xo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Oo(t,r,i,s,a){let c=Da(),l=this.No(t,r.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${c}:`,l,i);let d={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Lo(d,s,a),this.Bo(t,l,d,i).then(p=>(O("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw Sn("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",l,"request:",i),p})}ko(t,r,i,s,a,c){return this.Oo(t,r,i,s,a)}Lo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Un}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,a)=>t[a]=s),i&&i.headers.forEach((s,a)=>t[a]=s)}No(t,r){let i=qv[t];return`${this.Fo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Bo(e,t,r,i){let s=Da();return new Promise((a,c)=>{let l=new Aa;l.setWithCredentials(!0),l.listenOnce(Ra.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Rr.NO_ERROR:let p=l.getResponseJson();O(Ee,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),a(p);break;case Rr.TIMEOUT:O(Ee,`RPC '${e}' ${s} timed out`),c(new N(S.DEADLINE_EXCEEDED,"Request time out"));break;case Rr.HTTP_ERROR:let y=l.getStatus();if(O(Ee,`RPC '${e}' ${s} failed with status:`,y,"response text:",l.getResponseText()),y>0){let b=l.getResponseJson();Array.isArray(b)&&(b=b[0]);let R=b?.error;if(R&&R.status&&R.message){let k=function(C){let j=C.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(j)>=0?j:S.UNKNOWN}(R.status);c(new N(k,R.message))}else c(new N(S.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new N(S.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{O(Ee,`RPC '${e}' ${s} completed.`)}});let d=JSON.stringify(i);O(Ee,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",d,r,15)})}qo(e,t,r){let i=Da(),s=[this.Fo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ca(),c=Pa(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Lo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let p=s.join("");O(Ee,`Creating RPC '${e}' stream ${i}: ${p}`,l);let y=a.createWebChannel(p,l),b=!1,R=!1,k=new jc({Eo:C=>{R?O(Ee,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(b||(O(Ee,`Opening RPC '${e}' stream ${i} transport.`),y.open(),b=!0),O(Ee,`RPC '${e}' stream ${i} sending:`,C),y.send(C))},Ao:()=>y.close()}),x=(C,j,B)=>{C.listen(j,F=>{try{B(F)}catch(z){setTimeout(()=>{throw z},0)}})};return x(y,vn.EventType.OPEN,()=>{R||(O(Ee,`RPC '${e}' stream ${i} transport opened.`),k.So())}),x(y,vn.EventType.CLOSE,()=>{R||(R=!0,O(Ee,`RPC '${e}' stream ${i} transport closed`),k.Do())}),x(y,vn.EventType.ERROR,C=>{R||(R=!0,Sn(Ee,`RPC '${e}' stream ${i} transport errored:`,C),k.Do(new N(S.UNAVAILABLE,"The operation could not be completed")))}),x(y,vn.EventType.MESSAGE,C=>{var j;if(!R){let B=C.data[0];J(!!B);let F=B,z=F?.error||((j=F[0])===null||j===void 0?void 0:j.error);if(z){O(Ee,`RPC '${e}' stream ${i} received error:`,z);let oe=z.status,W=function(_){let v=ce[_];if(v!==void 0)return Ff(v)}(oe),I=z.message;W===void 0&&(W=S.INTERNAL,I="Unknown error status: "+oe+" with message "+z.message),R=!0,k.Do(new N(W,I)),y.close()}else O(Ee,`RPC '${e}' stream ${i} received:`,B),k.vo(B)}}),x(c,Sa.STAT_EVENT,C=>{C.stat===rs.PROXY?O(Ee,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===rs.NOPROXY&&O(Ee,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.bo()},0),k}};function Na(){return typeof document<"u"?document:null}function Ws(n){return new dc(n,!0)}var Cs=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.li=e,this.timerId=t,this.Qo=r,this.Ko=i,this.$o=s,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(e){this.cancel();let t=Math.floor(this.Uo+this.Ho()),r=Math.max(0,Date.now()-this.Go),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Uo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,i,()=>(this.Go=Date.now(),e())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}};var ks=class{constructor(e,t,r,i,s,a,c,l){this.li=e,this.Yo=r,this.Zo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new Cs(e,t)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(e){this.l_(),this.stream.send(e)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(e,t){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,e!==4?this.r_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(ut(t.toString()),ut("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.po(t)}P_(){}auth(){this.state=1;let e=this.T_(this.Xo),t=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Xo===t&&this.I_(r,i)},r=>{e(()=>{let i=new N(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.E_(i)})})}I_(e,t){let r=this.T_(this.Xo);this.stream=this.d_(e,t),this.stream.Ro(()=>{r(()=>this.listener.Ro())}),this.stream.mo(()=>{r(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(i=>{r(()=>this.E_(i))}),this.stream.onMessage(i=>{r(()=>++this.n_==1?this.A_(i):this.onNext(i))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}E_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}T_(e){return t=>{this.li.enqueueAndForget(()=>this.Xo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Gc=class extends ks{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}d_(e,t){return this.connection.qo("Listen",e,t)}A_(e){return this.onNext(e)}onNext(e){this.r_.reset();let t=wv(this.serializer,e),r=function(s){if(!("targetChange"in s))return q.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?q.min():a.readTime?Ye(a.readTime):q.min()}(e);return this.listener.R_(t,r)}V_(e){let t={};t.database=gc(this.serializer),t.addTarget=function(s,a){let c,l=a.target;if(c=tc(l)?{documents:bv(s,l)}:{query:Av(s,l).ct},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Uf(s,a.resumeToken);let d=fc(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(q.min())>0){c.readTime=Ts(s,a.snapshotVersion.toTimestamp());let d=fc(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);let r=Sv(this.serializer,e);r&&(t.labels=r),this.c_(t)}m_(e){let t={};t.database=gc(this.serializer),t.removeTarget=e,this.c_(t)}},$c=class extends ks{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}d_(e,t){return this.connection.qo("Write",e,t)}A_(e){return J(!!e.streamToken),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0),this.listener.p_()}onNext(e){J(!!e.streamToken),this.lastStreamToken=e.streamToken,this.r_.reset();let t=Tv(e.writeResults,e.commitTime),r=Ye(e.commitTime);return this.listener.y_(r,t)}w_(){let e={};e.database=gc(this.serializer),this.c_(e)}g_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Ev(this.serializer,r))};this.c_(t)}};var Kc=class extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.S_=!1}b_(){if(this.S_)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(e,t,r,i){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Oo(e,pc(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new N(S.UNKNOWN,s.toString())})}ko(e,t,r,i,s){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.ko(e,pc(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(S.UNKNOWN,a.toString())})}terminate(){this.S_=!0,this.connection.terminate()}},Hc=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(e){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.M_("Offline")))}set(e){this.N_(),this.D_=0,e==="Online"&&(this.C_=!1),this.M_(e)}M_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}x_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.C_?(ut(t),this.C_=!1):O("OnlineStateTracker",t)}N_(){this.v_!==null&&(this.v_.cancel(),this.v_=null)}};var Wc=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.L_=[],this.B_=new Map,this.k_=new Set,this.q_=[],this.Q_=s,this.Q_.uo(a=>{r.enqueueAndForget(async()=>{rn(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await async function(l){let d=U(l);d.k_.add(4),await Hr(d),d.K_.set("Unknown"),d.k_.delete(4),await Qs(d)}(this))})}),this.K_=new Hc(r,i)}};async function Qs(n){if(rn(n))for(let e of n.q_)await e(!0)}async function Hr(n){for(let e of n.q_)await e(!1)}function Wf(n,e){let t=U(n);t.B_.has(e.targetId)||(t.B_.set(e.targetId,e),Pu(t)?Su(t):jn(t).s_()&&Ru(t,e))}function Au(n,e){let t=U(n),r=jn(t);t.B_.delete(e),r.s_()&&Qf(t,e),t.B_.size===0&&(r.s_()?r.a_():rn(t)&&t.K_.set("Unknown"))}function Ru(n,e){if(n.U_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}jn(n).V_(e)}function Qf(n,e){n.U_.xe(e),jn(n).m_(e)}function Su(n){n.U_=new hc({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ut:e=>n.B_.get(e)||null,nt:()=>n.datastore.serializer.databaseId}),jn(n).start(),n.K_.F_()}function Pu(n){return rn(n)&&!jn(n).i_()&&n.B_.size>0}function rn(n){return U(n).k_.size===0}function Jf(n){n.U_=void 0}async function jv(n){n.K_.set("Online")}async function zv(n){n.B_.forEach((e,t)=>{Ru(n,e)})}async function Gv(n,e){Jf(n),Pu(n)?(n.K_.O_(e),Su(n)):n.K_.set("Unknown")}async function $v(n,e,t){if(n.K_.set("Online"),e instanceof ws&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.B_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.B_.delete(c),i.U_.removeTarget(c))}(n,e)}catch(r){O("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ds(n,r)}else if(e instanceof An?n.U_.$e(e):e instanceof Is?n.U_.Je(e):n.U_.Ge(e),!t.isEqual(q.min()))try{let r=await Hf(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.U_.it(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let p=s.B_.get(d);p&&s.B_.set(d,p.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{let p=s.B_.get(l);if(!p)return;s.B_.set(l,p.withResumeToken(Te.EMPTY_BYTE_STRING,p.snapshotVersion)),Qf(s,l);let y=new Lr(p.target,l,d,p.sequenceNumber);Ru(s,y)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){O("RemoteStore","Failed to raise snapshot:",r),await Ds(n,r)}}async function Ds(n,e,t){if(!qn(e))throw e;n.k_.add(1),await Hr(n),n.K_.set("Offline"),t||(t=()=>Hf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),n.k_.delete(1),await Qs(n)})}function Yf(n,e){return e().catch(t=>Ds(n,t,e))}async function Js(n){let e=U(n),t=Pt(e),r=e.L_.length>0?e.L_[e.L_.length-1].batchId:-1;for(;Kv(e);)try{let i=await Fv(e.localStore,r);if(i===null){e.L_.length===0&&t.a_();break}r=i.batchId,Hv(e,i)}catch(i){await Ds(e,i)}Xf(e)&&Zf(e)}function Kv(n){return rn(n)&&n.L_.length<10}function Hv(n,e){n.L_.push(e);let t=Pt(n);t.s_()&&t.f_&&t.g_(e.mutations)}function Xf(n){return rn(n)&&!Pt(n).i_()&&n.L_.length>0}function Zf(n){Pt(n).start()}async function Wv(n){Pt(n).w_()}async function Qv(n){let e=Pt(n);for(let t of n.L_)e.g_(t.mutations)}async function Jv(n,e,t){let r=n.L_.shift(),i=ac.from(r,e,t);await Yf(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Js(n)}async function Yv(n,e){e&&Pt(n).f_&&await async function(r,i){if(function(a){return fv(a)&&a!==S.ABORTED}(i.code)){let s=r.L_.shift();Pt(r).__(),await Yf(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Js(r)}}(n,e),Xf(n)&&Zf(n)}async function sf(n,e){let t=U(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");let r=rn(t);t.k_.add(3),await Hr(t),r&&t.K_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.k_.delete(3),await Qs(t)}async function Xv(n,e){let t=U(n);e?(t.k_.delete(2),await Qs(t)):e||(t.k_.add(2),await Hr(t),t.K_.set("Unknown"))}function jn(n){return n.W_||(n.W_=function(t,r,i){let s=U(t);return s.b_(),new Gc(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Ro:jv.bind(null,n),mo:zv.bind(null,n),po:Gv.bind(null,n),R_:$v.bind(null,n)}),n.q_.push(async e=>{e?(n.W_.__(),Pu(n)?Su(n):n.K_.set("Unknown")):(await n.W_.stop(),Jf(n))})),n.W_}function Pt(n){return n.G_||(n.G_=function(t,r,i){let s=U(t);return s.b_(),new $c(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Ro:()=>Promise.resolve(),mo:Wv.bind(null,n),po:Yv.bind(null,n),p_:Qv.bind(null,n),y_:Jv.bind(null,n)}),n.q_.push(async e=>{e?(n.G_.__(),await Js(n)):(await n.G_.stop(),n.L_.length>0&&(O("RemoteStore",`Stopping write stream with ${n.L_.length} pending writes`),n.L_=[]))})),n.G_}var Qc=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Ue,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Cu(n,e){if(ut("AsyncQueue",`${e}: ${n}`),qn(n))return new N(S.UNAVAILABLE,`${e}: ${n}`);throw n}var Ns=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=Sr(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Os=class{constructor(){this.z_=new re(L.comparator)}track(e){let t=e.doc.key,r=this.z_.get(t);r?e.type!==0&&r.type===3?this.z_=this.z_.insert(t,e):e.type===3&&r.type!==1?this.z_=this.z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.z_=this.z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.z_=this.z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.z_=this.z_.remove(t):e.type===1&&r.type===2?this.z_=this.z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.z_=this.z_.insert(t,{type:2,doc:e.doc}):M():this.z_=this.z_.insert(t,e)}j_(){let e=[];return this.z_.inorderTraversal((t,r)=>{e.push(r)}),e}},Ln=class n{constructor(e,t,r,i,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,Ns.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ks(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Jc=class{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(e=>e.Z_())}},Yc=class{constructor(){this.queries=of(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(t,r){let i=U(t),s=i.queries;i.queries=of(),s.forEach((a,c)=>{for(let l of c.J_)l.onError(r)})})(this,new N(S.ABORTED,"Firestore shutting down"))}};function of(){return new dt(n=>Rf(n),Ks)}async function ep(n,e){let t=U(n),r=3,i=e.query,s=t.queries.get(i);s?!s.Y_()&&e.Z_()&&(r=2):(s=new Jc,r=e.Z_()?0:1);try{switch(r){case 0:s.H_=await t.onListen(i,!0);break;case 1:s.H_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=Cu(a,`Initialization of query '${wn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.J_.push(e),e.ea(t.onlineState),s.H_&&e.ta(s.H_)&&ku(t)}async function tp(n,e){let t=U(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.J_.indexOf(e);a>=0&&(s.J_.splice(a,1),s.J_.length===0?i=e.Z_()?0:1:!s.Y_()&&e.Z_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Zv(n,e){let t=U(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.J_)c.ta(i)&&(r=!0);a.H_=i}}r&&ku(t)}function eI(n,e,t){let r=U(n),i=r.queries.get(e);if(i)for(let s of i.J_)s.onError(t);r.queries.delete(e)}function ku(n){n.X_.forEach(e=>{e.next()})}var Xc,af;(af=Xc||(Xc={})).na="default",af.Cache="cache";var xs=class{constructor(e,t,r){this.query=e,this.ra=t,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=r||{}}ta(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Ln(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ia?this.oa(e)&&(this.ra.next(e),t=!0):this._a(e,this.onlineState)&&(this.aa(e),t=!0),this.sa=e,t}onError(e){this.ra.error(e)}ea(e){this.onlineState=e;let t=!1;return this.sa&&!this.ia&&this._a(this.sa,e)&&(this.aa(this.sa),t=!0),t}_a(e,t){if(!e.fromCache||!this.Z_())return!0;let r=t!=="Offline";return(!this.options.ua||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}oa(e){if(e.docChanges.length>0)return!0;let t=this.sa&&this.sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}aa(e){e=Ln.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ia=!0,this.ra.next(e)}Z_(){return this.options.source!==Xc.Cache}};var Vs=class{constructor(e){this.key=e}},Ls=class{constructor(e){this.key=e}},Zc=class{constructor(e,t){this.query=e,this.da=t,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=$(),this.mutatedKeys=$(),this.Va=Sf(e),this.ma=new Ns(this.Va)}get fa(){return this.da}ga(e,t){let r=t?t.pa:new Os,i=t?t.ma:this.ma,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,y)=>{let b=i.get(p),R=Hs(this.query,y)?y:null,k=!!b&&this.mutatedKeys.has(b.key),x=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),C=!1;b&&R?b.data.isEqual(R.data)?k!==x&&(r.track({type:3,doc:R}),C=!0):this.ya(b,R)||(r.track({type:2,doc:R}),C=!0,(l&&this.Va(R,l)>0||d&&this.Va(R,d)<0)&&(c=!0)):!b&&R?(r.track({type:0,doc:R}),C=!0):b&&!R&&(r.track({type:1,doc:b}),C=!0,(l||d)&&(c=!0)),C&&(R?(a=a.add(R),s=x?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{ma:a,pa:r,ss:c,mutatedKeys:s}}ya(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.ma;this.ma=e.ma,this.mutatedKeys=e.mutatedKeys;let a=e.pa.j_();a.sort((p,y)=>function(R,k){let x=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M()}};return x(R)-x(k)}(p.type,y.type)||this.Va(p.doc,y.doc)),this.wa(r),i=i!=null&&i;let c=t&&!i?this.Sa():[],l=this.Ra.size===0&&this.current&&!i?1:0,d=l!==this.Aa;return this.Aa=l,a.length!==0||d?{snapshot:new Ln(this.query,e.ma,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),ba:c}:{ba:c}}ea(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new Os,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(e){return!this.da.has(e)&&!!this.ma.has(e)&&!this.ma.get(e).hasLocalMutations}wa(e){e&&(e.addedDocuments.forEach(t=>this.da=this.da.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.da=this.da.delete(t)),this.current=e.current)}Sa(){if(!this.current)return[];let e=this.Ra;this.Ra=$(),this.ma.forEach(r=>{this.Da(r.key)&&(this.Ra=this.Ra.add(r.key))});let t=[];return e.forEach(r=>{this.Ra.has(r)||t.push(new Ls(r))}),this.Ra.forEach(r=>{e.has(r)||t.push(new Vs(r))}),t}va(e){this.da=e.ds,this.Ra=$();let t=this.ga(e.documents);return this.applyChanges(t,!0)}Ca(){return Ln.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}},eu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},tu=class{constructor(e){this.key=e,this.Fa=!1}},nu=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Ma={},this.xa=new dt(c=>Rf(c),Ks),this.Oa=new Map,this.Na=new Set,this.La=new re(L.comparator),this.Ba=new Map,this.ka=new Fr,this.qa={},this.Qa=new Map,this.Ka=Mr.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}};async function tI(n,e,t=!0){let r=ap(n),i,s=r.xa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Ca()):i=await np(r,e,t,!0),i}async function nI(n,e){let t=ap(n);await np(t,e,!0,!1)}async function np(n,e,t,r){let i=await Uv(n.localStore,Je(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t),c;return r&&(c=await rI(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Wf(n.remoteStore,i),c}async function rI(n,e,t,r,i){n.Ua=(y,b,R)=>async function(x,C,j,B){let F=C.view.ga(j);F.ss&&(F=await rf(x.localStore,C.query,!1).then(({documents:I})=>C.view.ga(I,F)));let z=B&&B.targetChanges.get(C.targetId),oe=B&&B.targetMismatches.get(C.targetId)!=null,W=C.view.applyChanges(F,x.isPrimaryClient,z,oe);return uf(x,C.targetId,W.ba),W.snapshot}(n,y,b,R);let s=await rf(n.localStore,e,!0),a=new Zc(e,s.ds),c=a.ga(s.documents),l=Vr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,l);uf(n,t,d.ba);let p=new eu(e,t,a);return n.xa.set(e,p),n.Oa.has(t)?n.Oa.get(t).push(e):n.Oa.set(t,[e]),d.snapshot}async function iI(n,e,t){let r=U(n),i=r.xa.get(e),s=r.Oa.get(i.targetId);if(s.length>1)return r.Oa.set(i.targetId,s.filter(a=>!Ks(a,e))),void r.xa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Uc(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Au(r.remoteStore,i.targetId),ru(r,i.targetId)}).catch(Bn)):(ru(r,i.targetId),await Uc(r.localStore,i.targetId,!0))}async function sI(n,e){let t=U(n),r=t.xa.get(e),i=t.Oa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Au(t.remoteStore,r.targetId))}async function oI(n,e,t){let r=fI(n);try{let i=await function(a,c){let l=U(a),d=ge.now(),p=c.reduce((R,k)=>R.add(k.key),$()),y,b;return l.persistence.runTransaction("Locally write mutations","readwrite",R=>{let k=ft(),x=$();return l.hs.getEntries(R,p).next(C=>{k=C,k.forEach((j,B)=>{B.isValidDocument()||(x=x.add(j))})}).next(()=>l.localDocuments.getOverlayedDocuments(R,k)).next(C=>{y=C;let j=[];for(let B of c){let F=dv(B,y.get(B.key).overlayedDocument);F!=null&&j.push(new pt(B.key,F,vf(F.value.mapValue),bt.exists(!0)))}return l.mutationQueue.addMutationBatch(R,d,j,c)}).next(C=>{b=C;let j=C.applyToLocalDocumentSet(y,x);return l.documentOverlayCache.saveOverlays(R,C.batchId,j)})}).then(()=>({batchId:b.batchId,changes:Cf(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let d=a.qa[a.currentUser.toKey()];d||(d=new re(K)),d=d.insert(c,l),a.qa[a.currentUser.toKey()]=d}(r,i.batchId,t),await Wr(r,i.changes),await Js(r.remoteStore)}catch(i){let s=Cu(i,"Failed to persist write");t.reject(s)}}async function rp(n,e){let t=U(n);try{let r=await Lv(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Ba.get(s);a&&(J(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.Fa=!0:i.modifiedDocuments.size>0?J(a.Fa):i.removedDocuments.size>0&&(J(a.Fa),a.Fa=!1))}),await Wr(t,r,e)}catch(r){await Bn(r)}}function cf(n,e,t){let r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.xa.forEach((s,a)=>{let c=a.view.ea(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let l=U(a);l.onlineState=c;let d=!1;l.queries.forEach((p,y)=>{for(let b of y.J_)b.ea(c)&&(d=!0)}),d&&ku(l)}(r.eventManager,e),i.length&&r.Ma.R_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function aI(n,e,t){let r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Ba.get(e),s=i&&i.key;if(s){let a=new re(L.comparator);a=a.insert(s,Be.newNoDocument(s,q.min()));let c=$().add(s),l=new vs(q.min(),new Map,new re(K),a,c);await rp(r,l),r.La=r.La.remove(s),r.Ba.delete(e),Du(r)}else await Uc(r.localStore,e,!1).then(()=>ru(r,e,t)).catch(Bn)}async function cI(n,e){let t=U(n),r=e.batch.batchId;try{let i=await Vv(t.localStore,e);sp(t,r,null),ip(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Wr(t,i)}catch(i){await Bn(i)}}async function uI(n,e,t){let r=U(n);try{let i=await function(a,c){let l=U(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(y=>(J(y!==null),p=y.keys(),l.mutationQueue.removeMutationBatch(d,y))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);sp(r,e,t),ip(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Wr(r,i)}catch(i){await Bn(i)}}function ip(n,e){(n.Qa.get(e)||[]).forEach(t=>{t.resolve()}),n.Qa.delete(e)}function sp(n,e,t){let r=U(n),i=r.qa[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.qa[r.currentUser.toKey()]=i}}function ru(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Oa.get(e))n.xa.delete(r),t&&n.Ma.Wa(r,t);n.Oa.delete(e),n.isPrimaryClient&&n.ka.yr(e).forEach(r=>{n.ka.containsKey(r)||op(n,r)})}function op(n,e){n.Na.delete(e.path.canonicalString());let t=n.La.get(e);t!==null&&(Au(n.remoteStore,t),n.La=n.La.remove(e),n.Ba.delete(t),Du(n))}function uf(n,e,t){for(let r of t)r instanceof Vs?(n.ka.addReference(r.key,e),lI(n,r)):r instanceof Ls?(O("SyncEngine","Document no longer in limbo: "+r.key),n.ka.removeReference(r.key,e),n.ka.containsKey(r.key)||op(n,r.key)):M()}function lI(n,e){let t=e.key,r=t.path.canonicalString();n.La.get(t)||n.Na.has(r)||(O("SyncEngine","New document in limbo: "+t),n.Na.add(r),Du(n))}function Du(n){for(;n.Na.size>0&&n.La.size<n.maxConcurrentLimboResolutions;){let e=n.Na.values().next().value;n.Na.delete(e);let t=new L(te.fromString(e)),r=n.Ka.next();n.Ba.set(r,new tu(t)),n.La=n.La.insert(t,r),Wf(n.remoteStore,new Lr(Je(Eu(t.path)),r,"TargetPurposeLimboResolution",Cn.oe))}}async function Wr(n,e,t){let r=U(n),i=[],s=[],a=[];r.xa.isEmpty()||(r.xa.forEach((c,l)=>{a.push(r.Ua(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){let y=d?!d.fromCache:(p=t?.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,y?"current":"not-current")}if(d){i.push(d);let y=Vc.zi(l.targetId,d);s.push(y)}}))}),await Promise.all(a),r.Ma.R_(i),await async function(l,d){let p=U(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>P.forEach(d,b=>P.forEach(b.Wi,R=>p.persistence.referenceDelegate.addReference(y,b.targetId,R)).next(()=>P.forEach(b.Gi,R=>p.persistence.referenceDelegate.removeReference(y,b.targetId,R)))))}catch(y){if(!qn(y))throw y;O("LocalStore","Failed to update sequence numbers: "+y)}for(let y of d){let b=y.targetId;if(!y.fromCache){let R=p.us.get(b),k=R.snapshotVersion,x=R.withLastLimboFreeSnapshotVersion(k);p.us=p.us.insert(b,x)}}}(r.localStore,s))}async function hI(n,e){let t=U(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());let r=await Kf(t.localStore,e);t.currentUser=e,function(s,a){s.Qa.forEach(c=>{c.forEach(l=>{l.reject(new N(S.CANCELLED,a))})}),s.Qa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Wr(t,r.Ts)}}function dI(n,e){let t=U(n),r=t.Ba.get(e);if(r&&r.Fa)return $().add(r.key);{let i=$(),s=t.Oa.get(e);if(!s)return i;for(let a of s){let c=t.xa.get(a);i=i.unionWith(c.view.fa)}return i}}function ap(n){let e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=rp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=dI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=aI.bind(null,e),e.Ma.R_=Zv.bind(null,e.eventManager),e.Ma.Wa=eI.bind(null,e.eventManager),e}function fI(n){let e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=uI.bind(null,e),e}var Mn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ws(e.databaseInfo.databaseId),this.sharedClientState=this.za(e),this.persistence=this.ja(e),await this.persistence.start(),this.localStore=this.Ha(e),this.gcScheduler=this.Ja(e,this.localStore),this.indexBackfillerScheduler=this.Ya(e,this.localStore)}Ja(e,t){return null}Ya(e,t){return null}Ha(e){return xv(this.persistence,new Mc,e.initialUser,this.serializer)}ja(e){return new As(xc.ei,this.serializer)}za(e){return new Bc}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Mn.provider={build:()=>new Mn};var iu=class extends Mn{constructor(e){super(),this.cacheSizeBytes=e}Ja(e,t){J(this.persistence.referenceDelegate instanceof Rs);let r=this.persistence.referenceDelegate.garbageCollector;return new wc(r,e.asyncQueue,t)}ja(e){let t=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new As(r=>Rs.ei(r,t),this.serializer)}};var Ur=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=hI.bind(null,this.syncEngine),await Xv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Yc}()}createDatastore(e){let t=Ws(e.databaseInfo.databaseId),r=function(s){return new zc(s)}(e.databaseInfo);return function(s,a,c,l){return new Kc(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new Wc(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>cf(this.syncEngine,t,0),function(){return Ps.p()?new Ps:new qc}())}createSyncEngine(e,t){return function(i,s,a,c,l,d,p){let y=new nu(i,s,a,c,l,d);return p&&(y.$a=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=U(i);O("RemoteStore","RemoteStore shutting down."),s.k_.add(5),await Hr(s),s.Q_.shutdown(),s.K_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};Ur.provider={build:()=>new Ur};var Ms=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Xa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Xa(this.observer.error,e):ut("Uncaught Error in snapshot listener:",e.toString()))}eu(){this.muted=!0}Xa(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var su=class{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=fe.UNAUTHENTICATED,this.clientId=hs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{O("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ue;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Cu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Oa(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Kf(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function lf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await pI(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>sf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>sf(e.remoteStore,i)),n._onlineComponents=e}async function pI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await Oa(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Sn("Error using user provided cache. Falling back to memory cache: "+t),await Oa(n,new Mn)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await Oa(n,new iu(void 0));return n._offlineComponents}async function cp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await lf(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await lf(n,new Ur))),n._onlineComponents}function mI(n){return cp(n).then(e=>e.syncEngine)}async function up(n){let e=await cp(n),t=e.eventManager;return t.onListen=tI.bind(null,e.syncEngine),t.onUnlisten=iI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=nI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=sI.bind(null,e.syncEngine),t}function gI(n,e,t={}){let r=new Ue;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){let p=new Ms({next:b=>{p.eu(),a.enqueueAndForget(()=>tp(s,y));let R=b.docs.has(c);!R&&b.fromCache?d.reject(new N(S.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&b.fromCache&&l&&l.source==="server"?d.reject(new N(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(b)},error:b=>d.reject(b)}),y=new xs(Eu(c.path),p,{includeMetadataChanges:!0,ua:!0});return ep(s,y)}(await up(n),n.asyncQueue,e,t,r)),r.promise}function _I(n,e,t={}){let r=new Ue;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){let p=new Ms({next:b=>{p.eu(),a.enqueueAndForget(()=>tp(s,y)),b.fromCache&&l.source==="server"?d.reject(new N(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(b)},error:b=>d.reject(b)}),y=new xs(c,p,{includeMetadataChanges:!0,ua:!0});return ep(s,y)}(await up(n),n.asyncQueue,e,t,r)),r.promise}function lp(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var hf=new Map;function hp(n,e,t){if(!t)throw new N(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function yI(n,e,t,r){if(e===!0&&r===!0)throw new N(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function df(n){if(!L.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ff(n){if(L.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ys(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":M()}function Ct(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Ys(n);throw new N(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function vI(n,e){if(e<=0)throw new N(S.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}var Fs=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new N(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}yI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=lp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Fn=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Fs({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Fs(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new xa;switch(r.type){case"firstParty":return new Fa(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=hf.get(t);r&&(O("ComponentProvider","Removing Datastore"),hf.delete(t),r.terminate())}(this),Promise.resolve()}};function dp(n,e,t,r={}){var i;let s=(n=Ct(n,Fn))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&Sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=fe.MOCK_USER;else{c=vi(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new N(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new fe(d)}n._authCredentials=new Va(new ls(c,l))}}var kt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Ce=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new At(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}},At=class n extends kt{constructor(e,t,r){super(e,t,Eu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Ce(this.firestore,null,new L(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function II(n,e,...t){if(n=Z(n),hp("collection","path",e),n instanceof Fn){let r=te.fromString(e,...t);return ff(r),new At(n,null,r)}{if(!(n instanceof Ce||n instanceof At))throw new N(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(te.fromString(e,...t));return ff(r),new At(n.firestore,null,r)}}function fp(n,e,...t){if(n=Z(n),arguments.length===1&&(e=hs.newId()),hp("doc","path",e),n instanceof Fn){let r=te.fromString(e,...t);return df(r),new Ce(n,null,new L(r))}{if(!(n instanceof Ce||n instanceof At))throw new N(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(te.fromString(e,...t));return df(r),new Ce(n.firestore,n instanceof At?n.converter:null,new L(r))}}var Us=class{constructor(e=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new Cs(this,"async_queue_retry"),this.fu=()=>{let r=Na();r&&O("AsyncQueue","Visibility state changed to "+r.visibilityState),this.r_.Jo()},this.gu=e;let t=Na();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.pu(),this.yu(e)}enterRestrictedMode(e){if(!this.Eu){this.Eu=!0,this.Vu=e||!1;let t=Na();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.fu)}}enqueue(e){if(this.pu(),this.Eu)return new Promise(()=>{});let t=new Ue;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Iu.push(e),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(e){if(!qn(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(e){let t=this.gu.then(()=>(this.Ru=!0,e().catch(r=>{this.Au=r,this.Ru=!1;let i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw ut("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.Ru=!1,r))));return this.gu=t,t}enqueueAfterDelay(e,t,r){this.pu(),this.mu.indexOf(e)>-1&&(t=0);let i=Qc.createAndSchedule(this,e,t,r,s=>this.Su(s));return this.du.push(i),i}pu(){this.Au&&M()}verifyOperationInProgress(){}async bu(){let e;do e=this.gu,await e;while(e!==this.gu)}Du(e){for(let t of this.du)if(t.timerId===e)return!0;return!1}vu(e){return this.bu().then(()=>{this.du.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.du)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.bu()})}Cu(e){this.mu.push(e)}Su(e){let t=this.du.indexOf(e);this.du.splice(t,1)}};var tn=class extends Fn{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Us,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Us(e),this._firestoreClient=void 0,await e}}};function wI(n,e){let t=typeof n=="object"?n:fn(),r=typeof n=="string"?n:e||"(default)",i=Mt(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=yi("firestore");s&&dp(i,...s)}return i}function Nu(n){if(n._terminated)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||EI(n),n._firestoreClient}function EI(n){var e,t,r;let i=n._freezeSettings(),s=function(c,l,d,p){return new za(c,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,lp(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new su(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){let l=c?._online.build();return{_offline:c?._offline.build(l),_online:l}}(n._componentsProvider))}var Br=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Te.fromBase64String(e))}catch(t){throw new N(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var qr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new De(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var jr=class{constructor(e){this._methodName=e}};var zr=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}};var Gr=class{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}};var TI=/^__.*__$/,ou=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new pt(e,this.data,this.fieldMask,t,this.fieldTransforms):new en(e,this.data,t,this.fieldTransforms)}};function pp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}var au=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Fu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.xu({path:r,Nu:!1});return i.Lu(e),i}Bu(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.xu({path:r,Nu:!1});return i.Fu(),i}ku(e){return this.xu({path:void 0,Nu:!0})}qu(e){return Bs(e,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Fu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Lu(this.path.get(e))}Lu(e){if(e.length===0)throw this.qu("Document fields must not be empty");if(pp(this.Mu)&&TI.test(e))throw this.qu('Document fields cannot begin and end with "__"')}},cu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ws(e)}$u(e,t,r,i=!1){return new au({Mu:e,methodName:t,Ku:r,path:De.emptyPath(),Nu:!1,Qu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Ou(n){let e=n._freezeSettings(),t=Ws(n._databaseId);return new cu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function mp(n,e,t,r,i,s={}){let a=n.$u(s.merge||s.mergeFields?2:0,e,t,i);yp("Data must be an object, but it was:",a,r);let c=gp(r,a),l,d;if(s.merge)l=new We(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){let p=[];for(let y of s.mergeFields){let b=AI(e,y,t);if(!a.contains(b))throw new N(S.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);SI(p,b)||p.push(b)}l=new We(p),d=a.fieldTransforms.filter(y=>l.covers(y.field))}else l=null,d=a.fieldTransforms;return new ou(new Fe(c),l,d)}var uu=class n extends jr{_toFieldTransform(e){return new rc(e.path,new Yt)}isEqual(e){return e instanceof n}};function bI(n,e,t,r=!1){return xu(t,n.$u(r?4:3,e))}function xu(n,e){if(_p(n=Z(n)))return yp("Unsupported field value:",e,n),gp(n,e);if(n instanceof jr)return function(r,i){if(!pp(i.Mu))throw i.qu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.qu(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Nu&&e.Mu!==4)throw e.qu("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let l=xu(c,i.ku(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=Z(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return av(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=ge.fromDate(r);return{timestampValue:Ts(i.serializer,s)}}if(r instanceof ge){let s=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ts(i.serializer,s)}}if(r instanceof zr)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Br)return{bytesValue:Uf(i.serializer,r._byteString)};if(r instanceof Ce){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.qu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:bu(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Gr)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(l=>{if(typeof l!="number")throw c.qu("VectorValues must only contain numeric values.");return Tu(c.serializer,l)})}}}}}}(r,i);throw i.qu(`Unsupported field value: ${Ys(r)}`)}(n,e)}function gp(n,e){let t={};return gf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):nn(n,(r,i)=>{let s=xu(i,e.Ou(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function _p(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof zr||n instanceof Br||n instanceof Ce||n instanceof jr||n instanceof Gr)}function yp(n,e,t){if(!_p(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let r=Ys(t);throw r==="an object"?e.qu(n+" a custom object"):e.qu(n+" "+r)}}function AI(n,e,t){if((e=Z(e))instanceof qr)return e._internalPath;if(typeof e=="string")return vp(n,e);throw Bs("Field path arguments must be of type string or ",n,!1,void 0,t)}var RI=new RegExp("[~\\*/\\[\\]]");function vp(n,e,t){if(e.search(RI)>=0)throw Bs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new qr(...e.split("."))._internalPath}catch{throw Bs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Bs(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new N(S.INVALID_ARGUMENT,c+n+l)}function SI(n,e){return n.some(t=>t.isEqual(e))}var qs=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new lu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Vu("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},lu=class extends qs{data(){return super.data()}};function Vu(n,e){return typeof e=="string"?vp(n,e):e instanceof qr?e._internalPath:e._delegate._internalPath}function PI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var $r=class{},Kr=class extends $r{};function CI(n,e,...t){let r=[];e instanceof $r&&r.push(e),r=r.concat(t),function(s){let a=s.filter(l=>l instanceof du).length,c=s.filter(l=>l instanceof hu).length;if(a>1||a>0&&c>0)throw new N(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var hu=class n extends Kr{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return Ip(e._query,t),new kt(e.firestore,e.converter,nc(e._query,t))}_parse(e){let t=Ou(e.firestore);return function(s,a,c,l,d,p,y){let b;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new N(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){mf(y,p);let R=[];for(let k of y)R.push(pf(l,s,k));b={arrayValue:{values:R}}}else b=pf(l,s,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||mf(y,p),b=bI(c,a,y,p==="in"||p==="not-in");return le.create(d,p,b)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};var du=class n extends $r{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:qe.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i,c=s.getFlattenedFilters();for(let l of c)Ip(a,l),a=nc(a,l)}(e._query,t),new kt(e.firestore,e.converter,nc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var fu=class n extends Kr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,a){if(i.startAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Jt(s,a)}(e._query,this._field,this._direction);return new kt(e.firestore,e.converter,function(i,s){let a=i.explicitOrderBy.concat([s]);return new St(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function kI(n,e="asc"){let t=e,r=Vu("orderBy",n);return fu._create(r,t)}var pu=class n extends Kr{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new kt(e.firestore,e.converter,_s(e._query,this._limit,this._limitType))}};function DI(n){return vI("limit",n),pu._create("limit",n,"F")}function pf(n,e,t){if(typeof(t=Z(t))=="string"){if(t==="")throw new N(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Af(e)&&t.indexOf("/")!==-1)throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(te.fromString(t));if(!L.isDocumentKey(r))throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ud(n,new L(r))}if(t instanceof Ce)return Ud(n,t._key);throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ys(t)}.`)}function mf(n,e){if(!Array.isArray(n)||n.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ip(n,e){let t=function(i,s){for(let a of i)for(let c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var mu=class{convertValue(e,t="none"){switch(Rt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ee(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ht(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return nn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;let s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ee(a.doubleValue));return new Gr(s)}convertGeoPoint(e){return new zr(ee(e.latitude),ee(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=$s(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Or(e));default:return null}}convertTimestamp(e){let t=lt(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=te.fromString(e);J($f(r));let i=new ms(r.get(1),r.get(3)),s=new L(r.popFirst(5));return i.isEqual(t)||ut(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function wp(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Ht=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},js=class extends qs{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Rn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Vu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}},Rn=class extends js{data(e={}){return super.data(e)}},gu=class{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ht(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Rn(this._firestore,this._userDataWriter,r.key,r,new Ht(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let l=new Rn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ht(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let l=new Rn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ht(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:NI(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function NI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M()}}function OI(n){n=Ct(n,Ce);let e=Ct(n.firestore,tn);return gI(Nu(e),n._key).then(t=>MI(e,n,t))}var zs=class extends mu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Br(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ce(this.firestore,null,t)}};function xI(n){n=Ct(n,kt);let e=Ct(n.firestore,tn),t=Nu(e),r=new zs(e);return PI(n._query),_I(t,n._query).then(i=>new gu(e,r,n,i))}function VI(n,e,t){n=Ct(n,Ce);let r=Ct(n.firestore,tn),i=wp(n.converter,e,t);return Ep(r,[mp(Ou(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,bt.none())])}function LI(n,e){let t=Ct(n.firestore,tn),r=fp(n),i=wp(n.converter,e);return Ep(t,[mp(Ou(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,bt.exists(!1))]).then(()=>r)}function Ep(n,e){return function(r,i){let s=new Ue;return r.asyncQueue.enqueueAndForget(async()=>oI(await mI(r),i,s)),s.promise}(Nu(n),e)}function MI(n,e,t){let r=t.docs.get(e._key),i=new zs(n);return new js(n,i,e._key,r,new Ht(t.hasPendingWrites,t.fromCache),e.converter)}function FI(){return new uu("serverTimestamp")}(function(e,t=!0){(function(i){Un=i})($e),Ge(new Se("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new tn(new La(r.getProvider("auth-internal")),new Ba(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ms(d.options.projectId,p)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Pe(xd,"4.7.5",e),Pe(xd,"4.7.5","esm2017")})();var Cp="firebasestorage.googleapis.com",kp="storageBucket",UI=2*60*1e3,BI=10*60*1e3;var ie=class n extends Re{constructor(e,t,r=0){super(Lu(e),`Firebase Storage: ${t} (${Lu(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,n.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Lu(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}},se;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(se||(se={}));function Lu(n){return"storage/"+n}function ju(){let n="An unknown error occurred, please check the error payload for server response.";return new ie(se.UNKNOWN,n)}function qI(n){return new ie(se.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function jI(n){return new ie(se.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function zI(){let n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ie(se.UNAUTHENTICATED,n)}function GI(){return new ie(se.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function $I(n){return new ie(se.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function KI(){return new ie(se.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function HI(){return new ie(se.CANCELED,"User canceled the upload/download.")}function WI(n){return new ie(se.INVALID_URL,"Invalid URL '"+n+"'.")}function QI(n){return new ie(se.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function JI(){return new ie(se.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+kp+"' property when initializing the app?")}function YI(){return new ie(se.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function XI(){return new ie(se.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ZI(n){return new ie(se.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Mu(n){return new ie(se.INVALID_ARGUMENT,n)}function Dp(){return new ie(se.APP_DELETED,"The Firebase app was deleted.")}function ew(n){return new ie(se.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Jr(n,e){return new ie(se.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Qr(n){throw new ie(se.INTERNAL_ERROR,"Internal error: "+n)}var je=class n{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=n.makeFromUrl(e,t)}catch{return new n(e,"")}if(r.path==="")return r;throw QI(e)}static makeFromUrl(e,t){let r=null,i="([A-Za-z0-9.\\-_]+)";function s(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}let a="(/(.*))?$",c=new RegExp("^gs://"+i+a,"i"),l={bucket:1,path:3};function d(z){z.path_=decodeURIComponent(z.path)}let p="v[A-Za-z0-9_]+",y=t.replace(/[.]/g,"\\."),b="(/([^?#]*).*)?$",R=new RegExp(`^https?://${y}/${p}/b/${i}/o${b}`,"i"),k={bucket:1,path:3},x=t===Cp?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",j=new RegExp(`^https?://${x}/${i}/${C}`,"i"),F=[{regex:c,indices:l,postModify:s},{regex:R,indices:k,postModify:d},{regex:j,indices:{bucket:1,path:2},postModify:d}];for(let z=0;z<F.length;z++){let oe=F[z],W=oe.regex.exec(e);if(W){let I=W[oe.indices.bucket],m=W[oe.indices.path];m||(m=""),r=new n(I,m),oe.postModify(r);break}}if(r==null)throw WI(e);return r}},Fu=class{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}};function tw(n,e,t){let r=1,i=null,s=null,a=!1,c=0;function l(){return c===2}let d=!1;function p(...C){d||(d=!0,e.apply(null,C))}function y(C){i=setTimeout(()=>{i=null,n(R,l())},C)}function b(){s&&clearTimeout(s)}function R(C,...j){if(d){b();return}if(C){b(),p.call(null,C,...j);return}if(l()||a){b(),p.call(null,C,...j);return}r<64&&(r*=2);let F;c===1?(c=2,F=0):F=(r+Math.random())*1e3,y(F)}let k=!1;function x(C){k||(k=!0,b(),!d&&(i!==null?(C||(c=2),clearTimeout(i),y(0)):C||(c=1)))}return y(0),s=setTimeout(()=>{a=!0,x(!0)},t),x}function nw(n){n(!1)}function rw(n){return n!==void 0}function iw(n){return typeof n=="object"&&!Array.isArray(n)}function zu(n){return typeof n=="string"||n instanceof String}function Tp(n){return Gu()&&n instanceof Blob}function Gu(){return typeof Blob<"u"}function bp(n,e,t,r){if(r<e)throw Mu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Mu(`Invalid value for '${n}'. Expected ${t} or less.`)}function $u(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Np(n){let e=encodeURIComponent,t="?";for(let r in n)if(n.hasOwnProperty(r)){let i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var sn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(sn||(sn={}));function sw(n,e){let t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}var Uu=class{constructor(e,t,r,i,s,a,c,l,d,p,y,b=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=l,this.timeout_=d,this.progressCallback_=p,this.connectionFactory_=y,this.retry=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,k)=>{this.resolve_=R,this.reject_=k,this.start_()})}start_(){let e=(r,i)=>{if(i){r(!1,new zn(!1,null,!0));return}let s=this.connectionFactory_();this.pendingConnection_=s;let a=c=>{let l=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,d)};this.progressCallback_!==null&&s.addUploadProgressListener(a),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(a),this.pendingConnection_=null;let c=s.getErrorCode()===sn.NO_ERROR,l=s.getStatus();if(!c||sw(l,this.additionalRetryCodes_)&&this.retry){let p=s.getErrorCode()===sn.ABORT;r(!1,new zn(!1,null,p));return}let d=this.successCodes_.indexOf(l)!==-1;r(!0,new zn(d,s))})},t=(r,i)=>{let s=this.resolve_,a=this.reject_,c=i.connection;if(i.wasSuccessCode)try{let l=this.callback_(c,c.getResponse());rw(l)?s(l):s()}catch(l){a(l)}else if(c!==null){let l=ju();l.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,l)):a(l)}else if(i.canceled){let l=this.appDelete_?Dp():HI();a(l)}else{let l=KI();a(l)}};this.canceled_?t(!1,new zn(!1,null,!0)):this.backoffId_=tw(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&nw(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}},zn=class{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}};function ow(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function aw(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function cw(n,e){e&&(n["X-Firebase-GMPID"]=e)}function uw(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function lw(n,e,t,r,i,s,a=!0){let c=Np(n.urlParams),l=n.url+c,d=Object.assign({},n.headers);return cw(d,e),ow(d,t),aw(d,s),uw(d,r),new Uu(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,a)}function hw(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function dw(...n){let e=hw();if(e!==void 0){let t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Gu())return new Blob(n);throw new ie(se.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function fw(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}function pw(n){if(typeof atob>"u")throw ZI("base-64");return atob(n)}var Ze={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Yr=class{constructor(e,t){this.data=e,this.contentType=t||null}};function mw(n,e){switch(n){case Ze.RAW:return new Yr(Op(e));case Ze.BASE64:case Ze.BASE64URL:return new Yr(xp(n,e));case Ze.DATA_URL:return new Yr(_w(e),yw(e))}throw ju()}function Op(n){let e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{let s=r,a=n.charCodeAt(++t);r=65536|(s&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function gw(n){let e;try{e=decodeURIComponent(n)}catch{throw Jr(Ze.DATA_URL,"Malformed data URL.")}return Op(e)}function xp(n,e){switch(n){case Ze.BASE64:{let i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Jr(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Ze.BASE64URL:{let i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Jr(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=pw(e)}catch(i){throw i.message.includes("polyfill")?i:Jr(n,"Invalid character found")}let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}var Zs=class{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(t===null)throw Jr(Ze.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let r=t[1]||null;r!=null&&(this.base64=vw(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}};function _w(n){let e=new Zs(n);return e.base64?xp(Ze.BASE64,e.rest):gw(e.rest)}function yw(n){return new Zs(n).contentType}function vw(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}var eo=class n{constructor(e,t){let r=0,i="";Tp(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Tp(this.data_)){let r=this.data_,i=fw(r,e,t);return i===null?null:new n(i)}else{let r=new Uint8Array(this.data_.buffer,e,t-e);return new n(r,!0)}}static getBlob(...e){if(Gu()){let t=e.map(r=>r instanceof n?r.data_:r);return new n(dw.apply(null,t))}else{let t=e.map(a=>zu(a)?mw(Ze.RAW,a).data:a.data_),r=0;t.forEach(a=>{r+=a.byteLength});let i=new Uint8Array(r),s=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)i[s++]=a[c]}),new n(i,!0)}}uploadData(){return this.data_}};function Vp(n){let e;try{e=JSON.parse(n)}catch{return null}return iw(e)?e:null}function Iw(n){if(n.length===0)return null;let e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function ww(n,e){let t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Lp(n){let e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}function Ew(n,e){return e}var _e=class{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||Ew}},Xs=null;function Tw(n){return!zu(n)||n.length<2?n:Lp(n)}function Mp(){if(Xs)return Xs;let n=[];n.push(new _e("bucket")),n.push(new _e("generation")),n.push(new _e("metageneration")),n.push(new _e("name","fullPath",!0));function e(s,a){return Tw(a)}let t=new _e("name");t.xform=e,n.push(t);function r(s,a){return a!==void 0?Number(a):a}let i=new _e("size");return i.xform=r,n.push(i),n.push(new _e("timeCreated")),n.push(new _e("updated")),n.push(new _e("md5Hash",null,!0)),n.push(new _e("cacheControl",null,!0)),n.push(new _e("contentDisposition",null,!0)),n.push(new _e("contentEncoding",null,!0)),n.push(new _e("contentLanguage",null,!0)),n.push(new _e("contentType",null,!0)),n.push(new _e("metadata","customMetadata",!0)),Xs=n,Xs}function bw(n,e){function t(){let r=n.bucket,i=n.fullPath,s=new je(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function Aw(n,e,t){let r={};r.type="file";let i=t.length;for(let s=0;s<i;s++){let a=t[s];r[a.local]=a.xform(r,e[a.server])}return bw(r,n),r}function Fp(n,e,t){let r=Vp(e);return r===null?null:Aw(n,r,t)}function Rw(n,e,t,r){let i=Vp(e);if(i===null||!zu(i.downloadTokens))return null;let s=i.downloadTokens;if(s.length===0)return null;let a=encodeURIComponent;return s.split(",").map(d=>{let p=n.bucket,y=n.fullPath,b="/b/"+a(p)+"/o/"+a(y),R=$u(b,t,r),k=Np({alt:"media",token:d});return R+k})[0]}function Sw(n,e){let t={},r=e.length;for(let i=0;i<r;i++){let s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}var to=class{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}};function Up(n){if(!n)throw ju()}function Pw(n,e){function t(r,i){let s=Fp(n,i,e);return Up(s!==null),s}return t}function Cw(n,e){function t(r,i){let s=Fp(n,i,e);return Up(s!==null),Rw(s,i,n.host,n._protocol)}return t}function Bp(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=GI():i=zI():t.getStatus()===402?i=jI(n.bucket):t.getStatus()===403?i=$I(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function kw(n){let e=Bp(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=qI(n.path)),s.serverResponse=i.serverResponse,s}return t}function Dw(n,e,t){let r=e.fullServerUrl(),i=$u(r,n.host,n._protocol),s="GET",a=n.maxOperationRetryTime,c=new to(i,s,Cw(n,t),a);return c.errorHandler=kw(e),c}function Nw(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Ow(n,e,t){let r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Nw(null,e)),r}function xw(n,e,t,r,i){let s=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let F="";for(let z=0;z<2;z++)F=F+Math.random().toString().slice(2);return F}let l=c();a["Content-Type"]="multipart/related; boundary="+l;let d=Ow(e,r,i),p=Sw(d,t),y="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+l+`\r
Content-Type: `+d.contentType+`\r
\r
`,b=`\r
--`+l+"--",R=eo.getBlob(y,r,b);if(R===null)throw YI();let k={name:d.fullPath},x=$u(s,n.host,n._protocol),C="POST",j=n.maxUploadRetryTime,B=new to(x,C,Pw(n,t),j);return B.urlParams=k,B.headers=a,B.body=R.uploadData(),B.errorHandler=Bp(e),B}var JT=256*1024;var Ap=null,Bu=class{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=sn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=sn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=sn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw Qr("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(let s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Qr("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Qr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Qr("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Qr("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}},qu=class extends Bu{initXhr(){this.xhr_.responseType="text"}};function qp(){return Ap?Ap():new qu}var Gn=class n{constructor(e,t){this._service=e,t instanceof je?this._location=t:this._location=je.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new n(e,t)}get root(){let e=new je(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Lp(this._location.path)}get storage(){return this._service}get parent(){let e=Iw(this._location.path);if(e===null)return null;let t=new je(this._location.bucket,e);return new n(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw ew(e)}};function Vw(n,e,t){n._throwIfRoot("uploadBytes");let r=xw(n.storage,n._location,Mp(),new eo(e,!0),t);return n.storage.makeRequestWithTokens(r,qp).then(i=>({metadata:i,ref:n}))}function Lw(n){n._throwIfRoot("getDownloadURL");let e=Dw(n.storage,n._location,Mp());return n.storage.makeRequestWithTokens(e,qp).then(t=>{if(t===null)throw XI();return t})}function Mw(n,e){let t=ww(n._location.path,e),r=new je(n._location.bucket,t);return new Gn(n.storage,r)}function Fw(n){return/^[A-Za-z]+:\/\//.test(n)}function Uw(n,e){return new Gn(n,e)}function jp(n,e){if(n instanceof Xr){let t=n;if(t._bucket==null)throw JI();let r=new Gn(t,t._bucket);return e!=null?jp(r,e):r}else return e!==void 0?Mw(n,e):n}function Bw(n,e){if(e&&Fw(e)){if(n instanceof Xr)return Uw(n,e);throw Mu("To use ref(service, url), the first argument must be a Storage instance.")}else return jp(n,e)}function Rp(n,e){let t=e?.[kp];return t==null?null:je.makeFromBucketSpec(t,n)}function qw(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";let{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:vi(i,n.app.options.projectId))}var Xr=class{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=Cp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=UI,this._maxUploadRetryTime=BI,this._requests=new Set,i!=null?this._bucket=je.makeFromBucketSpec(i,this._host):this._bucket=Rp(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=je.makeFromBucketSpec(this._url,e):this._bucket=Rp(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){bp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){bp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Gn(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new Fu(Dp());{let a=lw(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){let[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}},Sp="@firebase/storage",Pp="0.13.4";var zp="storage";function jw(n,e,t){return n=Z(n),Vw(n,e,t)}function zw(n){return n=Z(n),Lw(n)}function Gw(n,e){return n=Z(n),Bw(n,e)}function $w(n=fn(),e){n=Z(n);let r=Mt(n,zp).getImmediate({identifier:e}),i=yi("storage");return i&&Gp(r,...i),r}function Gp(n,e,t,r={}){qw(n,e,t,r)}function Kw(n,{instanceIdentifier:e}){let t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Xr(t,r,i,e,$e)}function Hw(){Ge(new Se(zp,Kw,"PUBLIC").setMultipleInstances(!0)),Pe(Sp,Pp,""),Pe(Sp,Pp,"esm2017")}Hw();export{_n as GoogleAuthProvider,LI as addDoc,II as collection,wa as connectAuthEmulator,dp as connectFirestoreEmulator,Gp as connectStorageEmulator,pd as createUserWithEmailAndPassword,fp as doc,Dd as getAuth,OI as getDoc,xI as getDocs,zw as getDownloadURL,wI as getFirestore,$w as getStorage,_h as initializeApp,DI as limit,Id as onAuthStateChanged,kI as orderBy,CI as query,Gw as ref,gd as sendEmailVerification,fd as sendPasswordResetEmail,FI as serverTimestamp,VI as setDoc,md as signInWithEmailAndPassword,Pd as signInWithPopup,wd as signOut,_d as updateProfile,jw as uploadBytes};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-2cab5241.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
