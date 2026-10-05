/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=globalThis,e$3=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$4("string"==typeof t?t:t+"",void 0,s$3),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$4(o,t,s$3)},S$2=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$4.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$3=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$2,getOwnPropertyDescriptor:h$2,getOwnPropertyNames:r$4,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$2=globalThis,c$2=a$2.trustedTypes,l$2=c$2?c$2.emptyScript:"",p$2=a$2.reactiveElementPolyfillSupport,d$2=(t,s)=>t,u$2={toAttribute(t,s){switch(s){case Boolean:t=t?l$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$2=(t,s)=>!i$3(t,s),b$2={attribute:true,type:String,converter:u$2,reflect:false,useDefault:false,hasChanged:f$2};Symbol.metadata??=Symbol("metadata"),a$2.litPropertyMetadata??=new WeakMap;let y$2 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$2){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$2(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$2(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$2}static _$Ei(){if(this.hasOwnProperty(d$2("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$2("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$2("properties"))){const t=this.properties,s=[...r$4(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$3(s));}else void 0!==s&&i.push(c$3(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$2(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$2).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$2;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$2)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$2.elementStyles=[],y$2.shadowRootOptions={mode:"open"},y$2[d$2("elementProperties")]=new Map,y$2[d$2("finalized")]=new Map,p$2?.({ReactiveElement:y$2}),(a$2.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,i$2=t=>t,s$2=t$3.trustedTypes,e$1=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,h$1="$lit$",o$3=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$3,r$3=`<${n$2}>`,l$1=document,c$1=()=>l$1.createComment(""),a$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$1=Array.isArray,d$1=t=>u$1(t)||"function"==typeof t?.[Symbol.iterator],f$1="[ \t\n\f\r]",v$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f$1}(?:([^\\s"'>=/]+)(${f$1}*=${f$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g$1=/'/g,$=/"/g,y$1=/^(?:script|style|textarea|title)$/i,x$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b$1=x$1(1),E$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),C$1=new WeakMap,P$1=l$1.createTreeWalker(l$1,129);function V(t,i){if(!u$1(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const N$1=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v$1;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v$1?"!--"===u[1]?c=_:void 0!==u[1]?c=m$1:void 0!==u[2]?(y$1.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p$1):void 0!==u[3]&&(c=p$1):c===p$1?">"===u[0]?(c=n??v$1,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p$1:'"'===u[3]?$:g$1):c===$||c===g$1?c=p$1:c===_||c===m$1?c=v$1:(c=p$1,n=void 0);const x=c===p$1&&t[i+1].startsWith("/>")?" ":"";l+=c===v$1?s+r$3:d>=0?(e.push(a),s.slice(0,d)+h$1+s.slice(d)+o$3+x):s+o$3+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};let S$1 = class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N$1(t,i);if(this.el=S.createElement(f,e),P$1.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P$1.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h$1)){const i=v[a++],s=r.getAttribute(t).split(o$3),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$3)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y$1.test(r.tagName)){const t=r.textContent.split(o$3),i=t.length-1;if(i>0){r.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c$1()),P$1.nextNode(),d.push({type:2,index:++l});r.append(t[i],c$1());}}}else if(8===r.nodeType)if(r.data===n$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$3,t+1));)d.push({type:7,index:l}),t+=o$3.length-1;}l++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}};function M$1(t,i,s=t,e){if(i===E$1)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a$1(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M$1(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l$1).importNode(i,true);P$1.currentNode=e;let h=P$1.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k$1(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P$1.nextNode(),o++);}return P$1.currentNode=l$1,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}let k$1 = class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M$1(this,t,i),a$1(t)?t===A$1||null==t||""===t?(this._$AH!==A$1&&this._$AR(),this._$AH=A$1):t!==this._$AH&&t!==E$1&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d$1(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A$1&&a$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(l$1.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S$1.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C$1.get(t.strings);return void 0===i&&C$1.set(t.strings,i=new S$1(t)),i}k(t){u$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c$1()),this.O(c$1()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}};class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A$1;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M$1(this,t,i,0),o=!a$1(t)||t!==this._$AH&&t!==E$1,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M$1(this,e[s+n],i,n),r===E$1&&(r=this._$AH[n]),o||=!a$1(r)||r!==this._$AH[n],r===A$1?t=A$1:t!==A$1&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A$1?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A$1);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M$1(this,t,i,0)??A$1)===E$1)return;const s=this._$AH,e=t===A$1&&s!==A$1||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A$1&&(s===A$1||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M$1(this,t);}}const B=t$3.litHtmlPolyfillSupport;B?.(S$1,k$1),(t$3.litHtmlVersions??=[]).push("3.3.2");const D$1=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k$1(i.insertBefore(c$1(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s$1=globalThis;let i$1 = class i extends y$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D$1(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E$1}};i$1._$litElement$=true,i$1["finalized"]=true,s$1.litElementHydrateSupport?.({LitElement:i$1});const o$2=s$1.litElementPolyfillSupport;o$2?.({LitElement:i$1});(s$1.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$2,reflect:false,hasChanged:f$2},r$2=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$2(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$1(r){return n$1({...r,state:true,attribute:false})}

/* The one close button every pop-up uses: a circled ✕ pinned to the
   top-right corner of the sheet. It sits in a zero-height sticky bar as the
   dialog's first child, so it takes no room in the layout, stays put while
   the dialog scrolls, and lands in exactly the same spot in every dialog.
   Headers leave room for it with padding-right (see .dialog-header). */
const closeIcon = b$1 `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
</svg>`;
function dialogClose(onClose, label) {
    return b$1 `
    <div class="dialog-close-bar">
      <button class="dialog-close" title=${label} aria-label=${label} @click=${onClose}>
        ${closeIcon}
      </button>
    </div>
  `;
}
const sharedStyles = i$4 `
  :host {
    --wc-primary: #722f37;
    --wc-primary-light: #9a4a54;
    --wc-primary-text: #c48b91;
    /* Pop-ups, side panels and fields used to paint --ha-card-background,
       which a frosted/"liquid glass" theme makes nearly transparent — the
       card behind it is blurred by the theme, a pop-up floating over the
       whole page is not, so its text sat on whatever was underneath.
       They now use our own glass surface: translucent enough to look like
       glass, opaque enough to read on any wallpaper, and blurred by us.
       The --wc-glass-* values are set once on the card host (light or dark,
       from the theme's text colour) and inherited by every dialog, so they
       must not be declared here, where each component would reset them. */
    --wc-bg: var(--wc-glass-surface, rgba(250, 248, 247, 0.84));
    --wc-surface: var(--wc-glass-surface, rgba(250, 248, 247, 0.84));
    --wc-field-bg: var(--wc-glass-field, rgba(255, 255, 255, 0.6));
    --wc-text: var(--primary-text-color, #212121);
    --wc-text-secondary: var(--secondary-text-color, #727272);
    --wc-border: var(--wc-glass-line, rgba(0, 0, 0, 0.1));
    --wc-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
    --wc-hover: rgba(128, 128, 128, 0.14);
    --wc-blur: blur(28px) saturate(170%);
    --wc-edge: var(--wc-glass-edge, rgba(255, 255, 255, 0.7));
    --wc-sheen: var(--wc-glass-sheen, inset 0 1px 0 rgba(255, 255, 255, 0.75));
    --wc-primary-grad: linear-gradient(160deg, #9a4450 0%, #722f37 55%, #5a222a 100%);
    font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 0;
    font-size: 1.2em;
    font-weight: 500;
    color: var(--wc-text);
  }

  .card-content {
    padding: 16px;
  }

  .stats-bar {
    display: flex;
    gap: 16px;
    padding: 8px 16px;
    font-size: 0.85em;
    color: var(--wc-text-secondary);
  }

  .stats-bar .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .stats-bar .stat-value {
    font-weight: 600;
    color: var(--wc-text);
  }

  .tab-bar {
    display: flex;
    gap: 4px;
    padding: 8px 16px;
    overflow-x: auto;
    border-bottom: 1px solid var(--wc-border);
  }

  .tab {
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid var(--wc-border);
    background: var(--wc-field-bg);
    box-shadow: var(--wc-sheen);
    color: var(--wc-text-secondary);
    cursor: pointer;
    white-space: nowrap;
    font-size: 0.85em;
    font-weight: 500;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s;
  }

  .tab:hover {
    background: var(--wc-hover);
    color: var(--wc-text);
  }

  .tab:active {
    transform: scale(0.97);
  }

  .tab.active {
    background: var(--wc-primary-grad);
    color: #fff;
    border-color: transparent;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 10px rgba(114, 47, 55, 0.35);
  }

  /* Manage Racks and Settings look like the other tabs; they're only
     pushed to the right end of the bar. Settings sits right after Manage
     Racks with the bar's normal gap — no margin-left: auto of its own, or
     it would claim the remaining space and drift away from it. */
  .manage-racks-btn {
    margin-left: auto;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s, filter 0.2s;
  }

  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .btn:disabled {
    opacity: 0.55;
    cursor: default;
  }

  /* No longer "background: var(--wc-primary)": many buttons override just
     their colour inline (style="background:#e65100"), and that still wins
     over the gradient, as it did over the flat fill. */
  .btn-primary {
    background: var(--wc-primary-grad);
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px rgba(114, 47, 55, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .btn-outline {
    background: var(--wc-field-bg);
    color: var(--wc-text);
    border: 1px solid var(--wc-border);
    box-shadow: var(--wc-sheen);
  }

  .btn-outline:hover:not(:disabled) {
    background: var(--wc-hover);
  }

  .btn-icon {
    background: transparent;
    border: none;
    color: var(--wc-text-secondary);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-icon:hover {
    background: var(--wc-hover);
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 6, 8, 0.38);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    animation: fadeIn 0.2s ease;
  }

  .dialog {
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
    border: 1px solid var(--wc-edge);
    border-radius: 22px;
    box-shadow: var(--wc-sheen), 0 24px 60px rgba(0, 0, 0, 0.3);
    color: var(--wc-text);
    max-width: 500px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
    /* user-select is inherited, so it crosses the Shadow DOM boundary from
       whatever wraps this card (e.g. Home Assistant's dashboard drag-reorder
       chrome) — re-declare it explicitly so dialog text stays selectable
       regardless of what the host page sets. */
    user-select: text;
    -webkit-user-select: text;
    -webkit-touch-callout: default;
  }

  .dialog-close-bar {
    position: sticky;
    top: 0;
    height: 0;
    /* Under the in-dialog confirm overlays (z-index 10), which have their
       own Cancel, so the ✕ can't close the whole dialog out from under one. */
    z-index: 5;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
  }

  .dialog-close,
  .depth-panel-close {
    pointer-events: auto;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--wc-border);
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
    box-shadow: var(--wc-sheen), 0 2px 10px rgba(0, 0, 0, 0.18);
    color: var(--wc-text);
    cursor: pointer;
    line-height: 1;
    transition: background 0.2s, transform 0.15s;
  }

  .dialog-close {
    margin: 12px 12px 0 0;
  }

  .dialog-close:hover,
  .depth-panel-close:hover {
    background: var(--wc-hover);
  }

  .dialog-close:active,
  .depth-panel-close:active {
    transform: scale(0.92);
  }

  .dialog-header {
    padding: 20px 64px 12px 20px;
    font-size: 1.2em;
    font-weight: 500;
    border-bottom: 1px solid var(--wc-border);
  }

  .dialog-body {
    padding: 16px 20px;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    font-size: 0.85em;
    font-weight: 500;
    color: var(--wc-text-secondary);
    margin-bottom: 4px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--wc-border);
    border-radius: 10px;
    font-size: 0.95em;
    background: var(--wc-field-bg);
    color: var(--wc-text);
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--wc-primary-text);
    box-shadow: 0 0 0 3px rgba(154, 74, 84, 0.2);
  }

  /* A <select>'s open list is drawn by the OS from this element's own
     background; a translucent one gives white-on-white options in some
     browsers, so the options get a solid colour of their own. */
  option {
    background: var(--wc-glass-solid, #fff);
    color: var(--wc-text);
  }

  .form-group textarea {
    min-height: 60px;
    resize: vertical;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Phone: full-screen dialogs, compact forms */
  @media (max-width: 599px) {
    /* The sheet stops below the iPhone's Dynamic Island / notch / status
       bar: Home Assistant draws edge to edge (viewport-fit=cover), so a
       sheet allowed the full 100vh slid under it. The overlay keeps that
       strip clear and the sheet fills at most what's left. */
    .dialog {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      border-radius: 20px 20px 0 0;
      border-bottom: none;
      /* One wide child (a long unbroken name, a row of chips) must not make
         the whole sheet scroll sideways; and scrolling the sheet to its end
         must not carry on into the dashboard behind it. */
      overflow-x: hidden;
      overscroll-behavior: contain;
      overflow-wrap: anywhere;
      margin-top: auto;
    }
    .dialog-overlay {
      align-items: flex-end;
      box-sizing: border-box;
      padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
    }
    .dialog-header {
      padding: 16px 64px 10px 16px;
      font-size: 1.1em;
    }
    .dialog-body {
      padding: 12px 16px;
    }
    .dialog-footer {
      padding: 10px 16px 16px;
    }
    .form-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .tab-bar {
      padding: 6px 12px;
      gap: 3px;
    }
    .tab {
      padding: 5px 12px;
      font-size: 0.8em;
    }
    .depth-panel {
      width: 100% !important;
      border-radius: 0 !important;
      /* Full-screen here, so it too must clear the Dynamic Island. */
      padding-top: env(safe-area-inset-top, 0px);
    }
  }

  /* --- Depth Side Panel --- */
  .depth-panel-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 6, 8, 0.3);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    z-index: 99;
    animation: fadeIn 0.2s ease;
  }

  /* While dragging a wine out of the panel, let the backdrop pass drag/drop
     events through to the racks behind it instead of swallowing them. */
  .depth-panel-backdrop.drag-through {
    pointer-events: none;
  }

  .depth-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
    border-left: 1px solid var(--wc-edge);
    color: var(--wc-text);
    z-index: 100;
    box-shadow: -8px 0 40px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .depth-panel.open {
    transform: translateX(0);
  }

  .depth-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 13px top/right puts the ✕ exactly where the dialogs' one sits. */
    padding: 13px 13px 13px 16px;
    border-bottom: 1px solid var(--wc-border, #e0e0e0);
    flex-shrink: 0;
    /* Pinned, like the dialogs' ✕, so the panel's close never scrolls away. */
    position: sticky;
    top: 0;
    z-index: 4;
    background: var(--wc-bg);
    -webkit-backdrop-filter: var(--wc-blur);
    backdrop-filter: var(--wc-blur);
  }

  .depth-panel-title {
    font-weight: 600;
    font-size: 1em;
    color: var(--wc-text, #333);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .depth-panel-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .depth-panel-sort {
    background: none;
    border: 1px solid var(--wc-border, #ddd);
    border-radius: 12px;
    color: var(--wc-text-secondary, #888);
    cursor: pointer;
    font-size: 0.72em;
    padding: 4px 9px;
    white-space: nowrap;
  }

  .depth-panel-sort:hover:not(:disabled) {
    border-color: var(--wc-primary, #722f37);
    color: var(--wc-primary, #722f37);
  }

  .depth-panel-sort:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .depth-panel-confirm {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0 12px 8px;
    padding: 10px 12px;
    border: 1px solid #c98a00;
    border-radius: 8px;
    background: rgba(201, 138, 0, 0.08);
    font-size: 0.76em;
    color: var(--wc-text-secondary, #888);
    line-height: 1.4;
  }

  .depth-panel-confirm strong {
    color: var(--wc-text, #333);
  }

  .depth-panel-confirm-btns {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 2px;
  }

  .depth-panel-confirm-btns button {
    background: none;
    border: 1px solid var(--wc-border, #ddd);
    border-radius: 8px;
    color: var(--wc-text-secondary, #888);
    cursor: pointer;
    font-size: 1em;
    padding: 5px 12px;
  }

  .depth-panel-confirm-btns button.primary {
    background: var(--wc-primary, #722f37);
    border-color: var(--wc-primary, #722f37);
    color: #fff;
    font-weight: 600;
  }

  .depth-panel-rack {
    font-size: 0.78em;
    font-weight: 500;
    color: var(--wc-text-secondary, #888);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .depth-panel-subtitle {
    font-size: 0.8em;
    font-weight: 400;
    color: var(--wc-text-secondary, #888);
  }

  .depth-panel-slots {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .depth-slot {
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, box-shadow 0.15s;
  }

  .depth-slot:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .depth-slot.drag-over {
    box-shadow: 0 0 0 2px rgba(66, 165, 245, 0.8);
    background: rgba(66, 165, 245, 0.15);
  }

  .depth-slot.highlight {
    box-shadow: 0 0 0 2px rgba(196, 139, 145, 0.9);
    animation: highlightPulse 1.2s ease-in-out 3;
  }

  @keyframes highlightPulse {
    0%, 100% { box-shadow: 0 0 0 2px rgba(196, 139, 145, 0.9); }
    50% { box-shadow: 0 0 0 5px rgba(196, 139, 145, 0.4); }
  }

  .depth-slot-delete {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    line-height: 1;
    color: var(--wc-text-secondary, #888);
    background: rgba(0, 0, 0, 0.06);
    z-index: 3;
  }

  .depth-slot-delete:hover {
    background: #c62828;
    color: #fff;
  }

  .depth-panel-add-box {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  .depth-panel-add-box select {
    flex: 1;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--wc-border, #ddd);
    background: var(--wc-field-bg);
    color: var(--wc-text, #333);
    font-size: 0.85em;
  }

  .depth-panel-add-box .depth-panel-grow {
    flex-shrink: 0;
    padding: 8px 14px;
    margin-top: 0;
  }

  .depth-slot-label {
    font-size: 0.7em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--wc-text-secondary, #888);
    padding: 0 4px 4px;
  }

  .depth-slot-wine {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: var(--wc-field-bg);
    border: 1px solid var(--wc-border);
    border-radius: 10px;
  }

  .depth-slot-avatar {
    position: relative;
    flex-shrink: 0;
  }

  .depth-slot-thumb {
    width: 32px;
    height: 44px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .depth-slot-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .depth-slot-disposition {
    position: absolute;
    bottom: -3px;
    right: -4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: 1.5px solid var(--wc-bg, #fff);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    line-height: 1;
  }

  .depth-slot-disposition.drink {
    background: #2e7d32;
  }

  .depth-slot-disposition.hold {
    background: #1565c0;
  }

  .depth-slot-disposition.past {
    background: #c62828;
  }

  /* Dot style: same badge, no letter — see cabinet-grid.ts's .dot-style for
     the rack-drawing equivalent. Past Peak uses red to align with all other
     decline indicators throughout the interface. */
  .depth-slot-disposition.dot-style.past {
    background: #c62828;
  }

  .depth-slot-info {
    flex: 1;
    min-width: 0;
  }

  .depth-slot-name {
    font-weight: 600;
    font-size: 0.88em;
    color: var(--wc-text, #333);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .depth-slot-meta {
    font-size: 0.78em;
    color: var(--wc-text-secondary, #888);
    margin-top: 2px;
  }

  .depth-slot-empty {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 12px;
    border: 2px dashed var(--wc-border, #ddd);
    border-radius: 10px;
    color: var(--wc-text-secondary, #aaa);
    font-size: 0.85em;
  }

  .depth-slot.empty:hover .depth-slot-empty {
    border-color: var(--wc-primary-text);
    color: var(--wc-primary-text);
  }

  .depth-slot-plus {
    font-size: 1.3em;
    font-weight: 300;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--wc-hover);
  }

  .depth-slot.empty:hover .depth-slot-plus {
    background: rgba(196, 139, 145, 0.2);
  }

  .depth-panel-grow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    margin-top: 4px;
    border-radius: 10px;
    border: 1px dashed var(--wc-border, #ddd);
    color: var(--wc-text-secondary, #888);
    cursor: pointer;
    font-size: 0.85em;
    font-weight: 600;
    transition: background 0.15s, color 0.15s;
  }

  .depth-panel-grow:hover {
    border-color: var(--wc-primary-text);
    color: var(--wc-primary-text);
  }
`;
/* Finger-sized controls on touch screens. Each component appends this LAST
   in its static styles so it outranks the component's own compact sizing
   (equal-specificity rules resolve by order). Gated on pointer: coarse rather
   than width: a tablet in landscape is as wide as a laptop but still has no
   mouse, while a narrow desktop window still has one. 44px is Apple's minimum
   tap target, and min-height wins over any fixed height a component sets. */
const touchStyles = i$4 `
  @media (pointer: coarse) {
    button,
    select,
    .tab,
    .btn,
    .file-input-label {
      min-height: 44px;
    }

    /* Icon-only buttons by name, not every button: an explicit min-width on a
       flex item replaces its default min-width: auto, letting labelled
       buttons (the tabs) shrink below their text and overlap. */
    .btn-icon,
    .icon-btn,
    .dialog-close,
    .inv-sort-dir,
    .small-btn,
    .photo-action-btn,
    .bl-remove-btn,
    .depth-panel-close,
    .search-clear,
    .edit-toggle {
      min-width: 44px;
    }

    input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]),
    select,
    textarea {
      min-height: 44px;
      /* Under 16px, Safari zooms the whole page when the field takes focus,
         and doesn't zoom back out — the "page I have to pinch out of".
         !important because a bare "select"/"textarea" here lost to every
         component rule like ".edit-form .form-group select" and to inline
         font-size styles, leaving eight fields at 11–15px. */
      font-size: 16px !important;
    }

    input[type="checkbox"],
    input[type="radio"] {
      width: 22px;
      height: 22px;
    }

    /* Leave room between neighbours so a fat finger doesn't hit two. */
    .tab-bar,
    .dialog-footer {
      gap: 8px;
    }

    .depth-panel-slots {
      gap: 12px;
    }

    .depth-slot-delete {
      width: 32px;
      height: 32px;
      top: 4px;
      right: 4px;
      font-size: 1em;
    }

    .depth-slot-wine,
    .depth-slot-empty,
    .depth-panel-grow {
      min-height: 52px;
      box-sizing: border-box;
    }

    .depth-panel {
      width: 360px;
    }
  }
`;
/* Wine-type filter chips (All / Red / White / Rosé / Sparkling / Dessert /
   Whisky), shared by the card's search bar and the Inventory dialog so both
   rows look the same. Each chip takes its colour from the inline custom
   properties typeChipStyle() (models.ts) sets: tinted at rest, filled with
   its own colour when selected. */
const typeChipStyles = i$4 `
  .type-chip {
    --chip-color: #722f37;
    --chip-tint: rgba(114, 47, 55, 0.12);
    --chip-glow: rgba(114, 47, 55, 0.35);
    --chip-ink: #fff;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid var(--wc-border);
    background: linear-gradient(var(--chip-tint), var(--chip-tint)), var(--wc-field-bg);
    box-shadow: var(--wc-sheen);
    color: var(--wc-text);
    cursor: pointer;
    font-size: 0.78em;
    font-weight: 500;
    white-space: nowrap;
    transition: background 0.2s, box-shadow 0.2s, color 0.2s, transform 0.15s;
  }

  .type-chip:hover {
    background: linear-gradient(var(--chip-tint), var(--chip-tint)),
      linear-gradient(var(--chip-tint), var(--chip-tint)), var(--wc-field-bg);
  }

  .type-chip:active {
    transform: scale(0.96);
  }

  .type-chip.active {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 65%), var(--chip-color);
    color: var(--chip-ink);
    border-color: transparent;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 3px 12px var(--chip-glow);
  }

  .type-chip.all.active {
    background: var(--wc-primary-grad);
  }
`;

var wineType$1 = {
	red: "Red",
	white: "White",
	"rosé": "Rosé",
	sparkling: "Sparkling",
	dessert: "Dessert",
	whisky: "Whisky"
};
var bottleFields$1 = {
	winery: "Winery",
	distillery: "Distillery",
	cask: "Cask",
	grape: "Grape",
	grapeVariety: "Grape Variety"
};
var storageRowType$1 = {
	bulk: "Bulk Bin",
	box: "Wine Box",
	shelf: "Shelf (Front/Back)",
	stepped: "Staggered Shelf"
};
var removalReason$1 = {
	drank: "Drank",
	gifted: "Gifted",
	sold: "Sold",
	broken: "Broken",
	spoiled: "Spoiled",
	other: "Other"
};
var wineLocation$1 = {
	unassigned: "Unassigned",
	storage: "Storage",
	slot: "Slot"
};
var foodCategory$1 = {
	aperitif: "Aperitif & tapas",
	charcuterie: "Charcuterie & cured meats",
	cheese: "Cheese",
	seafood: "Seafood",
	fish: "Fish",
	duck: "Duck & foie gras",
	poultry: "Poultry",
	lamb: "Lamb",
	game: "Game",
	beef: "Beef & red meat",
	pork: "Pork & veal",
	stew: "Stews & dishes in sauce",
	grill: "Grilled & barbecue",
	spicy: "Spicy & world cuisine",
	mediterranean: "Mediterranean cuisine",
	salad: "Salads",
	vegetarian: "Vegetarian dishes",
	dessert: "Desserts",
	other: "Other pairings"
};
var ui$1 = {
	common: {
		cancel: "Cancel",
		empty: "Empty",
		edit: "Edit",
		notRated: "Not rated",
		start: "Start",
		close: "Close",
		any: "Any",
		replace: "replace",
		"new": "new",
		colonSep: ": ",
		clearSearch: "Clear search",
		save: "Save"
	},
	disposition: {
		drink: "Drink",
		drinkNow: "Drink Now",
		hold: "Hold",
		pastPeak: "Past Peak",
		past: "Past"
	},
	arrangement: {
		header: "🧹 Arrangement",
		intro: "Read from where your bottles already are — there are no rules to configure. Tick a move once you have actually made it; nothing is recorded before that.",
		emptyState: "Nothing worth moving. Your cellar agrees with itself.",
		sectionScatteredTitle: "Scattered",
		sectionScatteredBlurb: "Bottles of one wine sitting in several places.",
		sectionOutlierTitle: "Odd ones out",
		sectionOutlierBlurb: "Bins that are almost entirely one kind of wine, with a stray or two.",
		sectionBuriedTitle: "Hard to reach",
		sectionBuriedBlurb: "Bottles due soon, stuck behind ones you meant to keep.",
		bottleFallback: "Bottle",
		recordingBtn: "Recording...",
		movedOneBtn: "I moved it",
		movedAllBtn: "I moved all {n}",
		leaveAsIsBtn: "Leave it as it is",
		notedBtn: "Noted",
		moveFailedFull: "{label} filled up before the move could be recorded.",
		moveRecordError: "Could not record the move: {detail}",
		findings: {
			consolidateFallbackName: "This wine",
			consolidateTitle: "{name} — {n} bottle{plural} across {m} place{placesPlural}",
			consolidateDetailPartial: "{targetLabel} holds {held} of them and has room for {movable} more, not all {strays}. Gathering what fits still cuts the search in half.",
			consolidateDetailFull: "{targetLabel} already holds {held} of them and has room for the other {movable}.",
			outlierTitle: "{label} is {pct}% {type}",
			outlierDetailOne: "One bottle does not belong to that group. Nothing says this bin is only for {type} — but it nearly is.",
			outlierDetailMany: "{n} bottles do not belong to that group. Nothing says this bin is only for {type} — but it nearly is.",
			buriedFallbackName: "A bottle",
			buriedTitleNoYear: "{name} is hard to reach",
			buriedTitleWithYear: "{name} is due by {year} but hard to reach",
			buriedDetailOne: "It sits at slot {slot} of {label}, behind a bottle marked to keep. Swap them by hand next time the door is open.",
			buriedDetailMany: "It sits at slot {slot} of {label}, behind {n} bottles marked to keep. Swap them by hand next time the door is open.",
			wrongLevelDetailOne: "It sits on a lower board of {label} than a bottle marked to keep — the higher board is the easier one to reach. Swap them next time the door is open.",
			wrongLevelDetailMany: "It sits on a lower board of {label} than {n} bottles marked to keep — the higher board is the easier one to reach. Swap them next time the door is open."
		}
	},
	barcode: {
		notSupported: "Barcode scanning is not supported on this browser. Please enter the barcode manually below.",
		enterManually: "Enter the barcode manually below.",
		pointAtBarcode: "Point the camera at the barcode on the bottle"
	},
	card: {
		loading: "Loading wine cellar...",
		noSearchResults: "No wines match your search",
		vivinoBatchScanTitle: "Vivino Batch Scan",
		somePhotosQuestion: "Some wines already have a photo. What should happen to those photos?",
		tryAiNoMatch: "Try AI for wines with no confident Vivino match",
		keepExistingPhotos: "Keep My Existing Photos",
		replaceWithVivinoPhotos: "Replace With Vivino Photos",
		runAiBatchTitle: "Run AI Batch Scan?",
		runAiBatchBody: "This will run a full AI analysis on all {n} wines, one API call per bottle. It may take a while and use significant AI quota.",
		runOnNWines: "Run on {n} Wines",
		aiBatchScanBtn: "🤖 AI Batch Scan",
		aiScanning: "AI Scanning...",
		vivinoBatchScanBtn: "🍇 Vivino Batch Scan",
		vivinoScanning: "Vivino Scanning...",
		vivinoSyncBtn: "🔄 Vivino Sync",
		vivinoSyncing: "Vivino Syncing...",
		inventoryBtn: "📦 Inventory",
		pairingsBtn: "🍽️ Pairings",
		pairingsTitle: "Find a wine to go with what you're eating",
		addWineBtn: "+ Add Wine",
		fullAiAnalysisTitle: "Full AI analysis on all wines (disposition, ratings, price, description)",
		refreshVivinoTitle: "Refresh all wines from Vivino (ratings, price, description)",
		importVivinoTitle: "Import your Vivino cellar and wishlist into Cork Dork (never writes to Vivino)",
		syncVivinoTitle: "Two-way sync: import from Vivino and push your Cork Dork changes back",
		vivinoImporting: "Vivino Importing...",
		vivinoImportBtn: "⬇️ Vivino Import",
		removeThisBottleTitle: "Remove this bottle?",
		removeThisBottleHint: "removed on Vivino, archived to history here",
		removeThisBottleBtn: "Remove this bottle",
		bottlePositionZone: "zone {zone}",
		bottlePositionRowSlot: "row {row}, slot {col}",
		unknownWine: "Unknown wine",
		removalPanelTitle: "🍷 Vivino removed bottles — pick which ones to remove here",
		removalChooseCount: "choose {n}",
		removalHint: "Candidates are ringed in orange below — click the bottle that is actually gone.",
		conflictPanelTitle: "⚠️ Sync conflicts — both sides changed; you decide the truth",
		conflictCounts: "Vivino: {vivino} · here: {here}",
		conflictHint: "Your bottles are ringed below. Correct them if needed (open a bottle to remove it, paste to add), then confirm:",
		conflictConfirmBtn: "Cork Dork is right — set Vivino to {n}",
		conflictSyncing: "Syncing to Vivino...",
		vivinoWineFallback: "Vivino wine {vid}",
		syncCountConfirmTitle: "Sync this count to Vivino?",
		syncCountConfirmBodyOne: "Vivino will be set to {n} bottle — the count in Cork Dork right now. The adjustment shows up in your Vivino cellar history and can be undone there.",
		syncCountConfirmBodyMany: "Vivino will be set to {n} bottles — the count in Cork Dork right now. The adjustment shows up in your Vivino cellar history and can be undone there.",
		syncCountConfirmBtn: "Yes — update Vivino",
		inventoryTitle: "Browse full cellar inventory",
		unplacedTitle: "Bottles in Unassigned, not yet placed on a rack",
		suggestionsTitle: "Suggestions read from where your bottles already are",
		statBottles: "bottles",
		statCapacity: "capacity",
		statAvailable: "available",
		statUnplaced: "unplaced",
		statValue: "value",
		tidyUp: "tidy-up",
		tidyUps: "tidy-ups",
		allSections: "All Sections",
		unassignedTab: "Unassigned ({n})",
		unassignedSectionHeader: "📦 Unassigned ({n})",
		buyListTab: "Buy List ({n})",
		manageRacks: "Manage Racks",
		vivinoAiSettings: "⚙️ Settings",
		buyListEmpty: "Your buy list is empty",
		buyListEmptyHint: "Use 🛒 Buy List in Add Wine, or 🛒 Buy in the list scanner",
		moveToCellar: "Move to cellar",
		addToCellarBtn: "+ Cellar",
		removeFromBuyList: "Remove from buy list",
		unassignedHint: "These wines are not assigned to any rack. Tap a wine to view details, then use Move to place it.",
		cellarEmpty: "Your cellar is empty",
		cellarEmptyHint: "Tap \"Add Wine\" to start building your collection",
		slot: "Slot {n}",
		sortByDate: "↕ Sort by date",
		sorting: "Sorting…",
		renumberTitle: "Renumber the slots to match when bottles were added",
		reorderByDateTitle: "Reorder by date added?",
		reorderByDateBody: "Every bottle in {zone} moves to a slot matching when it was added. Any order you arranged by hand is lost. Slot 1 is the most accessible position.",
		oldestFirst: "Oldest first",
		newestFirst: "Newest first",
		oldestFirstTitle: "Slot 1 holds the bottle that has been in this bin longest — for a bin you fill in a row",
		newestFirstTitle: "Slot 1 holds the bottle you added last — for a bin you stack, where the newest sits on top",
		deleteThisSlot: "Delete this slot",
		addBox: "Add Box",
		addSlot: "Add Slot",
		panelStored: "stored",
		copyBannerText: "Copying \"{name}\" — tap empty cells or bulk/box zones to place copies",
		moveBannerText: "Moving \"{name}\" — tap a cell to place it",
		buyListMoveBannerText: "Placing \"{name}\" — tap a cell in your cellar",
		doneBtn: "Done",
		depthPanelRowCol: "Row {row}, Col {col}",
		depthPanelDeepCount: "{n}/{max} deep",
		rackPanelBottlesCount: "{n}/{max} bottles",
		boxHeader: "Box {n} ({size}-pack)",
		shelfGroupHeader: "Board {n} · {lane}",
		steppedGroupHeader: "Row {n}",
		shelfFront: "Front",
		shelfBack: "Back",
		deepSuffix: "{n} deep",
		emptyCellTitle: "Empty – Row {row}, Col {col}",
		reorderRackTitle: "Tap to view and reorder this rack"
	},
	inventory: {
		reviewBtn: "🔎 Inventory review",
		reviewTitle: "Inventory review",
		reviewIntro: "Re-check every bottle in the cellar. Choose a source:",
		title: "📦 Inventory",
		tabInventory: "Inventory",
		tabHistory: "History",
		loadingHistory: "Loading history...",
		noHistory: "No history yet — bottles you drink or remove show up here",
		winesRemoved: "{n} wines removed",
		restoreBtn: "Restore",
		clearHistoryBtn: "Clear History",
		historyCleared: "History cleared",
		wineRestoredUnassigned: "Wine restored to Unassigned",
		restoreWineFailed: "Failed to restore wine",
		enrichMissingVivino: "missing pairings or description, never checked against Vivino",
		enrichMissingAI: "missing a drink window or verdict, never analyzed by AI",
		enrichRetryVivino: "checked against Vivino, still nothing — Vivino does add bottles over time",
		enrichRetryAI: "analyzed by AI, still without a verdict",
		fillFromVivino: "Fill from Vivino",
		analyzeWithAi: "Analyze with AI",
		retryVivino: "Retry Vivino",
		retryAI: "Retry AI",
		working: "Working…",
		retryVivinoQ: "🍇 Retry Vivino?",
		fillFromVivinoQ: "🍇 Fill from Vivino?",
		retryAiQ: "🤖 Retry AI analysis?",
		analyzeWithAiQ: "🤖 Analyze with AI?",
		enrichConfirmBodyOne: "{count} wine will be looked up. This is a slow, rate-limited network call — expect it to run for a while, and leave the dialog open until it finishes.",
		enrichConfirmBodyMany: "{count} wines will be looked up one at a time. This is a slow, rate-limited network call — expect it to run for a while, and leave the dialog open until it finishes.",
		retryExplain: "These were already checked and came back empty. The check date is updated either way, so you can always see when the last attempt was.",
		newExplain: "Some will come back with nothing new — not every bottle exists in {source}. Those move to the retry line below rather than staying here.",
		vivinoCatalogue: "Vivino's catalogue",
		whatAiInfer: "what the AI can infer",
		vivinoFillsExplain: "Fills food pairings, description, rating and the label photo where Vivino has them. Existing values are kept.",
		aiFillsExplain: "Fills the drinking verdict, drink window and critic scores where the AI can infer them. Existing values are kept.",
		dbSize: "Database {total} · history {history} ({share}%) · {wines} wines, {archived} archived",
		heavyHistoryHint: "Home Assistant rewrites this whole file on every change — clearing old history speeds up every edit.",
		refreshingWines: "Refreshing {n} wines via {source}…",
		refreshFailed: "Refresh failed: {error}",
		enrichUpdated: "{n} updated",
		enrichUnchanged: "{n} had nothing new on {source}",
		enrichErrors: "{n} could not be reached",
		enrichRetryNote: "Their check date is updated — try again later.",
		enrichMoveToRetryNote: "Their check date is updated; they move to the retry line.",
		backupSaved: "Backup saved — {wines} wines, {cabinets} racks, {buyList} buy list",
		backupFailed: "Backup failed: {error}",
		importFailed: "Import failed: {error}",
		noWinesInCsv: "No wines found in CSV file.",
		importUpdated: "Updated {updated} wines{addedPart}.",
		importAddedPart: ", added {n} new",
		importSuccess: "Imported {n} wines successfully!",
		importSkippedNoteOne: "{skipped} row kept its previous spot — the location given was unknown, out of range or already taken.",
		importSkippedNoteMany: "{skipped} rows kept their previous spot — the location given was unknown, out of range or already taken.",
		invalidBackupWines: "Invalid backup file: missing wines array.",
		invalidBackupCabinets: "Invalid backup file: missing cabinets array.",
		invalidJsonFile: "Invalid JSON file: {error}",
		restoreFailed: "Restore failed: {error}",
		restoredCount: "Restored {wines} wines, {cabinets} racks, {buyList} buy list items!",
		savingEllipsis: "Saving…",
		serverBackupFailed: "Server backup failed: {error}",
		savedToServer: "Saved {wines} wines, {cabinets} racks to server",
		savedCheckmark: "✅ Saved!",
		listBackupsFailed: "Failed to list backups: {error}",
		keepEveryBackup: "Keeping every server backup.",
		keepNBackups: "Keeping the {n} most recent server backups.",
		retentionSaveFailed: "Could not save retention: {error}",
		deleteFailed: "Delete failed: {error}",
		deletedFile: "Deleted {filename}",
		restoredFromServer: "Restored {wines} wines, {cabinets} racks from {filename}",
		readyToDrink: "Ready to drink",
		filterDrinkNow: "Drink now",
		filterHold: "Hold",
		filterPastPeak: "Past peak",
		filterNotAnalyzed: "Not analyzed",
		pairsWith: "Pairs with",
		anyFood: "Any food",
		pairingTitle: "What are you eating?",
		pairingIntro: "Pick a dish to see the wines that go with it.",
		pairingEmpty: "No wines have food pairings yet. A Vivino lookup adds them.",
		pairingBanner: "Pairs with {food}",
		pairingChange: "Change",
		missingPairingsHintOne: "{n} wine has no pairing data. Only Vivino supplies pairings — use “Fill from Vivino” below the list.",
		missingPairingsHintMany: "{n} wines have no pairing data. Only Vivino supplies pairings — use “Fill from Vivino” below the list.",
		country: "Country",
		grape: "Grape",
		cabinet: "Cabinet",
		minRating: "Min rating",
		maxPrice: "Max price",
		pricedOnly: "Priced wines only.",
		vintage: "Vintage",
		fromPlaceholder: "From",
		toPlaceholder: "To",
		byYear: "by {year}",
		ofNBottles: "of {n} bottles",
		estValue: "est. value",
		searchPlaceholder: "Search wines...",
		ascending: "Ascending",
		descending: "Descending",
		filtersBtn: "⚙︎ Filters",
		moreFiltersTitle: "More filters",
		sort: {
			name: "Name",
			winery: "Winery",
			vintage: "Vintage",
			type: "Type",
			rating: "Rating",
			myRating: "My Rating",
			price: "Price",
			drinkBy: "Drink By",
			urgency: "Urgency",
			purchaseDate: "Purchase Date",
			dateAdded: "Date Added",
			cabinet: "Cabinet"
		},
		preset: {
			allLabel: "All",
			allHint: "Every wine in the cellar",
			drinkThisYearLabel: "Drink this year",
			drinkThisYearHint: "Drink-by year {year} or earlier, or marked \"Drink now\" with no year. Excludes past peak.",
			pastPeakLabel: "Past peak",
			pastPeakHint: "Marked \"Past peak\" by the AI analysis",
			unratedLabel: "Not rated",
			unratedHint: "You have not given these a personal star rating",
			incompleteLabel: "Missing data",
			incompleteHint: "Missing at least one of: food pairings, description, drink window, label photo",
			recentLabel: "Added recently",
			recentHint: "Added to the cellar in the last 30 days"
		},
		winesShown: "{shown} of {total} wines shown",
		filtersActive: " · {n} filter{plural} active",
		clearAll: "Clear all",
		footerCountAll: "{n} wines",
		footerCountFiltered: "{shown} of {total} wines",
		saveServerBackupTitle: "Save timestamped backup to HA server",
		serverBackupBtn: "Server Backup",
		restoreServerBackupTitle: "Restore from a server backup",
		restoringEllipsis: "Restoring…",
		serverRestoreBtn: "Server Restore",
		downloadBackupTitle: "Download full cellar backup as JSON",
		downloadBtn: "Download",
		restoreFromFileTitle: "Restore cellar from a JSON backup file",
		uploadBtn: "Upload",
		importCsvTitle: "Import wines from a CSV file",
		importingEllipsis: "Importing…",
		importCsvBtn: "Import CSV",
		exportCsvTitle: "Export wines as CSV",
		exportCsvBtn: "Export CSV",
		serverBackupsTitle: "Server Backups",
		keepTheLast: "Keep the last",
		allNeverDelete: "All (never delete)",
		nBackups: "{n} backups",
		noServerBackups: "No server backups found. Use \"Server Backup\" to create one.",
		selectBackupToRestore1: "Select a backup to restore — this will",
		selectBackupToRestore2: "all current data. {n} stored, {size} on disk.",
		unreadableFile: "unreadable file",
		backupMeta: "{wines} wines, {cabinets} racks · {size}",
		deleteThisBackup: "Delete this backup",
		updateExistingQ: "📄 Update existing wines?",
		csvEditedExportNote: "This CSV looks like an edited export — some rows carry the ID of a wine already in your cellar.",
		rowsMatchExisting: "row{plural} match existing wines",
		updateOnlyTouchesNote: "Updating only touches the columns present in the file; blank cells leave the stored value alone.",
		addAllAsNew: "Add all as new",
		updateNWines: "Update {n} wine{plural}",
		restoreBackupQ: "🔄 Restore Backup?",
		restoreWillReplaceNote: "This will replace all your current cellar data with the backup. This action cannot be undone.",
		backupContains: "Backup contains:",
		backupStats: "{wines} wines · {cabinets} racks · {buyList} buy list items",
		winesWord: "wines",
		racksWord: "racks",
		buyListItemsWord: "buy list items",
		createdLabel: "Created: {date}",
		restoreNowBtn: "Restore Now",
		buyAgainOnly: "🛒 Buy again only",
		noBuyAgain: "No wines marked “buy again” yet",
		buyAgainTitle: "Buy again — on your Buy List",
		addNotesBtn: "📝 Add notes",
		editNotesBtn: "📝 Notes",
		myRatingLabel: "My rating",
		drinkNotesPlaceholder: "How was it? What did you pair it with?",
		buyAgainLabel: "Buy again?",
		buyAgainHint: "Adds it to your Buy List",
		historySaved: "Saved",
		historySaveFailed: "Failed to save"
	},
	addWine: {
		title: "Add Wine",
		titleBuyList: "Add to Buy List",
		lookingUpBarcode: "Looking up barcode...",
		cancelScan: "Cancel Scan",
		analyzingLabel: "Analyzing label with AI...",
		frontLabelCaptured: "Front label captured",
		addBackPhotoQuestion: "Add a photo of the back label too? It often has the vintage year (and sometimes a barcode).",
		addBackPhotoBtn: "📷 Add Back Photo",
		skipUseFrontOnly: "Skip, Use Front Only",
		photographBackLabel: "Now photograph the back label",
		scanBarcodeTitle: "Scan Barcode",
		scanBarcodeDesc: "Point camera at wine bottle barcode",
		recognizeLabelTitle: "Recognize Label",
		configureGeminiTitle: "Configure Gemini API key in integration settings",
		takePhotoOfLabel: "Take a photo of the wine label",
		requiresGeminiKey: "Requires Gemini API key in settings",
		scanListTitle: "Scan Wine List",
		scanListDesc: "Photo of a wine list or receipt — ratings and value",
		orEnterManually: "or enter manually",
		barcodePlaceholder: "Enter barcode...",
		lookUpBtn: "Look Up",
		orSearchByName: "or search by name",
		searchNamePlaceholder: "Search wine name...",
		searchBtn: "Search",
		resultsCount: "{n} result{plural} — tap to select",
		unknownName: "Unknown",
		skipManualEntry: "Skip → Manual Entry",
		back: "← Back",
		next: "Next →",
		wineNameLabel: "Wine Name *",
		wineryLabel: "Winery",
		vintageLabel: "Vintage",
		typeLabel: "Type",
		purchasePriceLabel: "Purchase Price",
		currentValueLabel: "Current Value",
		regionLabel: "Region",
		countryLabel: "Country",
		grapeVarietyLabel: "Grape Variety",
		purchaseDateLabel: "Purchase Date",
		drinkByLabel: "Drink By",
		drinkByPlaceholder: "e.g. 2030",
		notesLabel: "Notes",
		myRatingLabel: "My Rating",
		buyListBtnTitle: "Save to buy list instead of cellar",
		buyListBtn: "🛒 Buy List",
		suggestedTitle: "Suggested — where its relatives are",
		fullUsage: "Full · {used}/{capacity}",
		room: "Room",
		oneFree: "1 free",
		nFree: "{n} free",
		noRoomSplit: "No room left there — split the series into",
		orFreeSlotFirst: ", or free a slot first.",
		chooseLocation: "Choose Location",
		selectCabinetHint: "Select a cabinet and position for this bottle",
		slotsCount: "{rows}×{cols} slots",
		bulkBoxZone: "Bulk / Box Zone",
		noneUseGrid: "None — use grid Row/Col",
		boxShort: "Box",
		shelfShort: "Shelf",
		fullTitle: "Full — free a slot or raise its capacity",
		rowLabel: "Row (1-based)",
		columnLabel: "Column (1-based)",
		pickZoneOrRowCol: "Pick a zone, or enter both Row and Column, so the bottle has a findable spot.",
		slotOutside: "That slot is outside {cabinet} ({rows} rows × {cols} columns).",
		rowIsBinOrBox: "That row is a bin or box, not grid slots — pick it from the zone list above.",
		slotFull: "Row {row}, column {col} is full ({used}/{depth} deep).",
		bottlesLabel: "Bottles",
		identicalUnassigned: "Identical bottles, added unassigned.",
		destinationFull: "That destination is full.",
		slotsFreeHere: "{n} slot{plural} free here.",
		consecutiveSlots: "The {n} bottles take consecutive free slots.",
		confirmAndAdd: "Confirm & Add",
		nameLabel: "Name",
		cabinetLabel: "Cabinet",
		positionLabel: "Position",
		notSpecified: "Not specified",
		addNBottles: "Add {n} Bottles",
		noBarcodeMatch: "No match for this barcode.",
		barcodeLookupFailed: "Barcode lookup failed.",
		takePhotoInstead: "{reason} Take a photo of the label instead.",
		enterManually: "{reason} You can enter details manually.",
		noResultsFound: "No results found. You can enter details manually.",
		searchFailed: "Search failed. You can enter details manually.",
		labelRecognitionFailed: "Label recognition failed: {error}",
		unknownError: "Unknown error",
		labelRecognitionError: "Label recognition error: {msg}",
		zoneFull: "{label} is full ({used}/{capacity}). Free a slot, or raise its capacity in Manage Racks.",
		containerFull: "{label} is full. Free a slot, or raise its capacity in Manage Racks.",
		noFreeSlot: "No free slot left at that destination.",
		addToBuyListFailed: "Failed to add to buy list.",
		addWineFailed: "Failed to add wine.",
		thisBox: "This box",
		thisBin: "This bin",
		thisShelf: "This shelf",
		thisStepped: "This staggered zone",
		posRowCol: "Row {row}, Col {col}"
	},
	wineDetail: {
		backLabelSuffix: " (back label)",
		backLabelBadge: "Back label",
		frontLabelTitle: "Front label",
		replacePhotoTitle: "Replace photo",
		replaceBackPhotoTitle: "Replace back label photo",
		deletePhotoTitle: "Delete photo",
		deleteBackPhotoTitle: "Delete back label photo",
		deletePhotoConfirm: "Delete this bottle's photo?",
		deleteBackPhotoConfirm: "Delete this bottle's back label photo?",
		tapToLocate: "Tap to locate",
		ratingsCountSuffix: " ({count} ratings)",
		myRating: "My Rating",
		aiScanBtn: "AI Scan",
		scanLabelBtn: "Label",
		lookupBtn: "Vivino / AI",
		lookupTitle: "Update this bottle's details from Vivino or AI",
		lookupChooserTitle: "Update details",
		lookupChooserIntro: "Choose a source:",
		lookupVivinoDesc: "Ratings, description, grapes and food pairings from Vivino",
		lookupAiDesc: "Full AI analysis: disposition, ratings, price, description",
		scanLabelTitle: "Take a fresh photo of the label to update this bottle's photo and details",
		resetAiContentBtn: "Reset text",
		resetAiContentTitle: "Clear the description and food pairings so the next Vivino/AI lookup regenerates them from scratch (fixes text stuck in the wrong language)",
		resetAiContentConfirm: "Clear this wine's description and food pairings? The next Vivino refresh or AI analysis will regenerate them from scratch.",
		copyBtn: "Copy",
		moveBtn: "Move",
		unassignBtn: "Unassign",
		removeBtn: "Remove",
		nothingFoundChecked: "nothing found · checked {date}",
		recheckedNothingNew: "{date1} · rechecked {date2}, nothing new",
		wineNameLabel: "Wine Name",
		wineryLabel: "Winery",
		vintageLabel: "Vintage",
		typeLabel: "Type",
		purchasePriceLabel: "Purchase Price",
		currentValueLabel: "Current Value",
		regionLabel: "Region",
		countryLabel: "Country",
		grapeVarietyLabel: "Grape Variety",
		alcoholLabel: "Alcohol",
		alcoholPlaceholder: "e.g. 13.5%",
		servingTempLabel: "Serving temp.",
		servingTempPlaceholder: "e.g. 16-18°C",
		servingTempPlaceholderF: "e.g. 61-64°F",
		purchaseDateLabel: "Purchase Date",
		drinkFromLabel: "Drink From",
		drinkFromPlaceholder: "e.g. 2025",
		drinkByLabel: "Drink By",
		drinkByPlaceholder: "e.g. 2030",
		peakWindowLabel: "Peak (Optional)",
		peakWindowPlaceholder: "e.g. 2028-2029 or 2028",
		notesLabel: "Notes",
		saving: "Saving...",
		save: "Save",
		priceLabel: "Price",
		purchasedLabel: "Purchased",
		barcodeLabel: "Barcode",
		grapeLabel: "Grape",
		drinkWindowPrefix: "Drink window: {window}",
		tastingNotesTitle: "Tasting Notes",
		aromaLabel: "Aroma",
		aromaPlaceholder: "Berries, oak, vanilla...",
		tasteLabel: "Taste",
		tastePlaceholder: "Full-bodied, tannic...",
		finishLabel: "Finish",
		finishPlaceholder: "Long, smooth...",
		overallLabel: "Overall",
		overallPlaceholder: "Overall impression...",
		noTastingNotes: "No tasting notes yet. Tap Edit to add your thoughts.",
		removeWineTitle: "Remove Wine",
		removeWineQuestion: "Why are you removing this bottle?",
		vivinoPhotoAvailableTitle: "Vivino Photo Available",
		vivinoPhotoAvailableBody: "Vivino found a different bottle photo. Keep your current photo or use Vivino's?",
		currentPhotoLabel: "Current",
		keepMyPhotoBtn: "Keep My Photo",
		useVivinoPhotoBtn: "Use Vivino's",
		noVivinoMatchTitle: "No Vivino Match",
		noPriceFoundTitle: "No Price Found",
		vivinoNoMatchBody: "Vivino couldn't find a confident match for this wine. Try AI instead?",
		vivinoNoPriceBody: "Vivino has no price for this wine in the selected currency. Estimate it with AI?",
		useAiOnceBtn: "Use AI Once",
		alwaysUseAiBtn: "Always Use AI Automatically",
		couldNotIdentifyLabel: "Could not identify the label. Try a clearer photo.",
		labelScanFailed: "Label scan failed. Please try again.",
		applyNoteConfirm: "Apply this note to your other {count} bottle{plural} of {name} too?",
		drinkNowWithWindow: "Drink now • {window}",
		drinkNowWithPeak: "Drink now • {window} (Peak: {peak})",
		drinkNowPlain: "Drink now",
		holdWithWindow: "Hold • drink {window}",
		holdWithPeak: "Hold • drink {window} (Peak: {peak})",
		holdUntil: "Hold until {date}",
		holdPlain: "Hold",
		pastPeakWithWindow: "Past peak • was {window}",
		pastPeakWithPeak: "Past peak • was {window} (Peak was: {peak})",
		pastPeakPlain: "Past peak",
		chamberingReady: "🌡️ Ready to serve",
		chamberingWarmUp: "🌡️ Take out {duration} before serving",
		chamberingChill: "🧊 Chill ~15–20 min before serving",
		aiLabel: "AI",
		drinkBtn: "Drink",
		drinkTitle: "🍷 Cheers!",
		drinkIntro: "Log how it was — or skip and add notes later from History.",
		drinkNotesPlaceholder: "How was it? What did you pair it with?",
		buyAgainLabel: "Buy again?",
		buyAgainHint: "Adds it to your Buy List",
		drinkConfirmBtn: "Drink it"
	},
	rack: {
		failedToAddRack: "Failed to add rack.",
		failedToUpdateRack: "Failed to update rack.",
		failedToDeleteRack: "Failed to delete rack.",
		failedToReorderRacks: "Failed to reorder racks.",
		gridDimensions: "{rows} × {cols} grid",
		gridDeepSuffix: " × {depth} deep",
		bottlesCountSuffix: " · {n} bottle{plural}",
		shelfCountSuffixOne: " · {n} shelf",
		shelfCountSuffixMany: " · {n} shelves",
		boxCountSuffixOne: " · {n} box",
		boxCountSuffixMany: " · {n} boxes",
		moveUpTitle: "Move up",
		moveDownTitle: "Move down",
		delBtn: "Del",
		addRackBtn: "+ Add Rack",
		rackNameLabel: "Rack Name",
		cabinetSensorsLabel: "Sensors (temperature / humidity)",
		sensorNone: "—",
		gridLayoutTitle: "Grid Layout",
		styleLabel: "Rack style",
		styleGrid: "Classic grid",
		shelfCountLabel: "Shelves",
		shelfFrontLabel: "Front",
		shelfBackLabel: "Back",
		shelfLevelsLabel: "Rows per shelf",
		shelfAlternateHint: "Front/back counts swap on every other row of a shelf (bottom row starts front-heavy).",
		shelfNamePlaceholder: "Shelf {n}",
		bulkCapacityLabel: "Bottles",
		boxCountLabel: "Boxes",
		secondaryStyleLabel: "Secondary storage",
		secondaryNone: "None",
		secondaryHint: "A second storage zone, of a different (or the same) style, stacked above or below the primary one.",
		secondaryPositionLabel: "Secondary zone position",
		secondaryAbove: "Above",
		secondaryBelow: "Below",
		secondaryGridHint: "Uses the same columns and depth as the main grid.",
		steppedCountLabel: "Quinconces",
		steppedFirstRowLabel: "Bottom row bottles",
		steppedRowCountLabel: "Number of rows",
		steppedNamePlaceholder: "Quinconce {n}",
		rowsLabel: "Rows",
		columnsLabel: "Columns",
		depthLabel: "Depth",
		slotsOption: "Slots",
		zoneNamePlaceholder: "Zone name",
		boxSizeOption: "{s}-pk",
		colsCount: "{n} col{plural}",
		warningBeforeOne: "This leaves 1 bottle without a slot. It will be moved to",
		warningBeforeMany: "This leaves {n} bottles without a slot. They will be moved to",
		warningAfterOne: "— nothing is deleted, and you can put it back anywhere.",
		warningAfterMany: "— nothing is deleted, and you can put them back anywhere.",
		unnamedWine: "Unnamed wine",
		andNMore: "…and {n} more",
		deletingBtn: "Deleting...",
		deleteBtn: "Delete",
		deleteConfirmQuestion: "Are you sure you want to delete \"{name}\"?",
		deleteWinesUnassignedOne: "1 wine will be unassigned.",
		deleteWinesUnassignedMany: "{count} wines will be unassigned.",
		dialogTitleManage: "Manage Racks",
		dialogTitleAdd: "Add Rack",
		dialogTitleEdit: "Edit Rack",
		dialogTitleDeleteConfirm: "Delete Rack?"
	},
	vivinoAiSettings: {
		title: "Settings",
		alwaysTryAi: "Always try AI when Vivino finds no match",
		enableWhisky: "Track whisky bottles (offer \"Whisky\" as a type)",
		defaultWineTypeLabel: "Default wine type",
		dispositionDisplayLabel: "Drink Now / Hold / Past Peak display",
		dispositionDisplayLetter: "Badge with letter",
		dispositionDisplayDot: "Colored circle",
		languageLabel: "Vivino/AI language",
		currencyLabel: "Currency",
		infoTitle: "Vivino vs AI — What Each Provides",
		vivinoProvidesTitle: "Vivino provides:",
		vivinoBottlePhoto: "Bottle photo",
		vivinoCommunityRating: "Community rating (★) and number of ratings",
		vivinoMarketPrice: "Market price",
		vivinoFoodPairings: "Food pairings",
		vivinoAlcohol: "Alcohol %",
		vivinoGrapeInfo: "Grape variety, region, country, type (when found)",
		aiProvidesTitle: "AI provides:",
		aiEstimatedPrice: "Estimated price (only fills in when Vivino has none)",
		aiTastingDescription: "Tasting description",
		aiCriticScores: "Critic scores (Wine Spectator, Robert Parker, Jeb Dunnuck, Antonio Galloni)",
		aiDispositionInfo: "{drinkNow} / {hold} / {pastPeak} + {window}",
		drinkingWindow: "drinking window",
		aiGrapeInfo: "Grape variety, region, country, type — only when scanning a label photo, not on a refresh",
		infoNote: "AI never provides a photo, a Vivino community rating, or food pairings — when Vivino can't find a confident match, AI fills in what it can (mainly price, description, and critic scores), not everything Vivino would have.",
		cardBackgroundLabel: "Card background",
		cardBackgroundTheme: "Theme default",
		cardBackgroundUpload: "Upload photo",
		cardBackgroundChange: "Change",
		cardBackgroundRemove: "Remove"
	},
	camera: {
		blockedInsecure: "The live camera needs a secure connection. Home Assistant is being served over http://, and browsers only allow camera access over https:// (or on localhost).",
		notOffered: "This browser does not offer live camera access.",
		accessDenied: "Camera access was denied. Allow it for this site in your browser settings.",
		notFound: "No camera found on this device.",
		busy: "The camera is busy or unavailable — another app may be using it.",
		genericError: "Could not access the camera{detail}.",
		fallbackHint: "The button below opens your device's own camera, which works either way.",
		pointAtLabel: "Point the camera at the wine label",
		takePhotoBtn: "📷 Take a photo",
		uploadGalleryBtn: "📁 Upload from gallery",
		takePhotoTitle: "Take photo"
	},
	wineList: {
		scanTitle: "🍽️ Scan List",
		scannedListTitle: "🍽️ Scanned List",
		alreadyScannedHintOne: "{n} wine already scanned. Take another photo to add more.",
		alreadyScannedHintMany: "{n} wines already scanned. Take another photo to add more.",
		captureSubtitle: "Take a photo of a wine list or receipt to see ratings, scores, and value.",
		backToResults: "Back to Results ({n})",
		analyzingList: "Analyzing list...",
		geminiReading: "Gemini is reading wines and scoring them",
		longListsHint: "Long lists may take up to 3 minutes",
		winesFoundOne: "{n} wine found",
		winesFoundMany: "{n} wines found",
		pricesInCurrency: " • Prices in {currency}",
		getVivinoScoresBtn: "🍇 Get Vivino Scores",
		scanAnotherPageBtn: "📷 Scan Another Page",
		inCellarBadge: "IN CELLAR",
		drinkWindowLabel: "Drink window:",
		byTheGlassLabel: "By the glass:",
		sizeLabel: "Size:",
		vivinoLabel: "Vivino:",
		greatValue: "Great Value",
		fairPrice: "Fair Price",
		typical: "Typical",
		premium: "Premium",
		addBtn: "+ Add",
		buyBtn: "🛒 Buy",
		noWinesFoundImage: "No wines found in the image. Try a clearer photo.",
		extractionFailed: "Extraction failed: {error}"
	}
};
var toast$1 = {
	zoneFull: "\"{zone}\" is full — cannot paste here.",
	zoneFullMove: "\"{zone}\" is full — cannot move here.",
	zoneResizeFailed: "Failed to resize zone",
	slotDeletedUnassigned: "Slot deleted, wine unassigned",
	slotDeleted: "Slot deleted",
	deleteSlotFailed: "Failed to delete slot",
	wineReordered: "Wine reordered",
	reorderFailed: "Failed to reorder wine",
	newestFirstToast: "Newest bottles first",
	oldestFirstToast: "Oldest bottles first",
	sortFailed: "Failed to sort",
	wineUnassigned: "This wine is unassigned",
	inLocation: "In {location}",
	rackResizeFailed: "Failed to resize rack",
	rackTooSmall: "Rack can't get any smaller",
	deleteSlotConfirmNamed: "Delete Slot {n}? \"{name}\" will be moved to Unassigned.",
	deleteSlotConfirm: "Delete Slot {n}?",
	deleteThisSlotConfirmNamed: "Delete this slot? \"{name}\" will be moved to Unassigned.",
	deleteThisSlotConfirm: "Delete this slot?",
	wineMoved: "Moved \"{name}\"",
	moveFailed: "Failed to move wine",
	wineSwapped: "Swapped wines",
	wineMovedShort: "Wine moved",
	moveUndoFailed: "Move failed and could not be undone — check both slots",
	wineCopied: "Copied \"{name}\" — tap empty cells or bulk/box zones to paste",
	winePasted: "Wine pasted! Tap more empty cells or click ✕ to stop.",
	pasteFailed: "Failed to paste wine.",
	aiBatchRunning: "Running full AI analysis on all wines...",
	aiBatchFailedError: "AI Batch failed: {error}",
	aiBatchComplete: "AI Batch complete! {updated}/{total} updated",
	errorsCount: "({n} errors)",
	aiBatchFailed: "AI Batch analysis failed.",
	dismissSuggestionFailed: "Failed to dismiss the suggestion",
	changeLanguageFailed: "Failed to change language",
	changeCurrencyFailed: "Failed to change currency",
	changeAiFallbackFailed: "Failed to change AI fallback setting",
	changeEnableWhiskyFailed: "Failed to change the whisky setting",
	changeDispositionDisplayFailed: "Failed to change the disposition badge setting",
	changeDefaultWineTypeFailed: "Failed to change the default wine type",
	vivinoRefreshing: "Refreshing all wines from Vivino...",
	vivinoBatchFailedError: "Vivino Batch failed: {error}",
	vivinoBatchComplete: "Vivino Batch complete! {updated}/{total} updated",
	vivinoPhotosUpdated: "{n} photos updated",
	vivinoPhotosKept: "{n} kept",
	vivinoAiFallbackUsed: "{n} used AI instead",
	vivinoNoMatch: "{n} no match at all",
	vivinoBatchRefreshFailed: "Vivino Batch refresh failed.",
	vivinoSyncing: "Syncing your Vivino cellar & wishlist...",
	vivinoSyncFailedError: "Vivino sync failed: {error}",
	vivinoSyncCompleteOne: "Vivino sync complete! {n} bottle imported",
	vivinoSyncCompleteMany: "Vivino sync complete! {n} bottles imported",
	vivinoWishlistAdded: "+ {n} to buy list",
	vivinoPushedCount: "({n} pushed to Vivino)",
	vivinoRemovedCountOne: "· {n} bottle removed",
	vivinoRemovedCountMany: "· {n} bottles removed",
	vivinoSyncFailed: "Vivino sync failed.",
	vivinoImporting: "Importing your Vivino cellar & wishlist...",
	vivinoImportFailedError: "Vivino import failed: {error}",
	vivinoImportCompleteOne: "Vivino import complete! {n} bottle imported",
	vivinoImportCompleteMany: "Vivino import complete! {n} bottles imported",
	vivinoImportFailed: "Vivino import failed.",
	vivinoRemovalChoicesOne: "— {n} removal needs your choice",
	vivinoRemovalChoicesMany: "— {n} removals need your choice",
	bottleRemovedMoreToChoose: "Bottle removed — {n} more to choose",
	bottleRemovedAllResolved: "Bottle removed — all Vivino removals resolved",
	removeBottleFailed: "Failed to remove the bottle.",
	vivinoConflictsOne: "— {n} conflict needs your decision",
	vivinoConflictsMany: "— {n} conflicts need your decision",
	vivinoConflictUpdatedOne: "Vivino updated to {n} bottle.",
	vivinoConflictUpdatedMany: "Vivino updated to {n} bottles.",
	vivinoConflictUpdateFailed: "Failed to update Vivino.",
	removedFromBuyList: "Removed from buy list",
	removeFromBuyListFailed: "Failed to remove from buy list",
	tapToPlace: "Tap a cell to place \"{name}\"",
	movedToCellar: "Moved \"{name}\" to cellar",
	moveToCellarFailed: "Failed to move to cellar",
	tapToMove: "Tap a cell to move \"{name}\"",
	wineDrunk: "Cheers! {name} is now in History",
	removeWineFailed: "Failed to remove wine",
	changeCardBackgroundFailed: "Failed to change the card background"
};
var en = {
	wineType: wineType$1,
	bottleFields: bottleFields$1,
	storageRowType: storageRowType$1,
	removalReason: removalReason$1,
	wineLocation: wineLocation$1,
	foodCategory: foodCategory$1,
	ui: ui$1,
	toast: toast$1
};

var wineType = {
	red: "Rouge",
	white: "Blanc",
	"rosé": "Rosé",
	sparkling: "Pétillant",
	dessert: "Sucré",
	whisky: "Whisky"
};
var bottleFields = {
	winery: "Domaine",
	distillery: "Distillerie",
	cask: "Fût",
	grape: "Cépage",
	grapeVariety: "Cépage"
};
var storageRowType = {
	bulk: "Casier en vrac",
	box: "Caisse à vin",
	shelf: "Tête-bêche (avant/arrière)",
	stepped: "Quinconce"
};
var removalReason = {
	drank: "Bue",
	gifted: "Offerte",
	sold: "Vendue",
	broken: "Cassée",
	spoiled: "Défectueuse",
	other: "Autre"
};
var wineLocation = {
	unassigned: "Non assignée",
	storage: "Stockage",
	slot: "Emplacement"
};
var foodCategory = {
	aperitif: "Apéritif & tapas",
	charcuterie: "Charcuterie",
	cheese: "Fromages",
	seafood: "Fruits de mer",
	fish: "Poissons",
	duck: "Canard & foie gras",
	poultry: "Volaille",
	lamb: "Agneau",
	game: "Gibier",
	beef: "Bœuf & viandes rouges",
	pork: "Porc & veau",
	stew: "Plats mijotés & en sauce",
	grill: "Grillades & barbecue",
	spicy: "Cuisine épicée & du monde",
	mediterranean: "Cuisine méditerranéenne",
	salad: "Salades",
	vegetarian: "Plats végétariens",
	dessert: "Desserts",
	other: "Autres accords"
};
var ui = {
	common: {
		cancel: "Annuler",
		empty: "Vide",
		edit: "Modifier",
		notRated: "Non noté",
		start: "Démarrer",
		close: "Fermer",
		any: "Tous",
		replace: "remplacer",
		"new": "nouveau{plural}",
		colonSep: " : ",
		clearSearch: "Effacer la recherche",
		save: "Enregistrer"
	},
	disposition: {
		drink: "Boire",
		drinkNow: "À boire",
		hold: "À garder",
		pastPeak: "Sur le déclin",
		past: "Déclin"
	},
	arrangement: {
		header: "🧹 Rangement",
		intro: "Basé sur l'emplacement actuel de vos bouteilles — il n'y a aucune règle à configurer. Cochez un déplacement une fois que vous l'avez réellement effectué ; rien n'est enregistré avant cela.",
		emptyState: "Rien à déplacer. Votre cave est en accord avec elle-même.",
		sectionScatteredTitle: "Dispersés",
		sectionScatteredBlurb: "Bouteilles d'un même vin réparties à plusieurs endroits.",
		sectionOutlierTitle: "Intrus",
		sectionOutlierBlurb: "Casiers presque entièrement dédiés à un seul type de vin, avec une ou deux exceptions.",
		sectionBuriedTitle: "Difficiles d'accès",
		sectionBuriedBlurb: "Bouteilles à boire bientôt, coincées derrière celles que vous comptiez garder.",
		bottleFallback: "Bouteille",
		recordingBtn: "Enregistrement...",
		movedOneBtn: "Je l'ai déplacée",
		movedAllBtn: "J'ai tout déplacé ({n})",
		leaveAsIsBtn: "Laisser tel quel",
		notedBtn: "Noté",
		moveFailedFull: "{label} s'est rempli avant que le déplacement ait pu être enregistré.",
		moveRecordError: "Impossible d'enregistrer le déplacement : {detail}",
		findings: {
			consolidateFallbackName: "Ce vin",
			consolidateTitle: "{name} — {n} bouteille{plural} dans {m} endroit{placesPlural}",
			consolidateDetailPartial: "{targetLabel} en contient déjà {held} et peut en accueillir {movable} de plus, pas la totalité des {strays}. Regrouper ce qui rentre réduit déjà la recherche de moitié.",
			consolidateDetailFull: "{targetLabel} en contient déjà {held} et a de la place pour les {movable} autres.",
			outlierTitle: "{label} est à {pct} % de type {type}",
			outlierDetailOne: "Une bouteille n'appartient pas à ce groupe. Rien n'indique que ce casier est réservé au type {type} — mais c'est presque le cas.",
			outlierDetailMany: "{n} bouteilles n'appartiennent pas à ce groupe. Rien n'indique que ce casier est réservé au type {type} — mais c'est presque le cas.",
			buriedFallbackName: "Une bouteille",
			buriedTitleNoYear: "{name} est difficile à atteindre",
			buriedTitleWithYear: "{name} est à boire avant {year} mais difficile à atteindre",
			buriedDetailOne: "Elle se trouve à l'emplacement {slot} de {label}, derrière une bouteille à garder. Échangez-les à la main la prochaine fois que la porte est ouverte.",
			buriedDetailMany: "Elle se trouve à l'emplacement {slot} de {label}, derrière {n} bouteilles à garder. Échangez-les à la main la prochaine fois que la porte est ouverte.",
			wrongLevelDetailOne: "Elle est sur une planche plus basse de {label} qu'une bouteille à garder — la planche du haut est plus facile d'accès. Échangez-les la prochaine fois que la porte est ouverte.",
			wrongLevelDetailMany: "Elle est sur une planche plus basse de {label} que {n} bouteilles à garder — la planche du haut est plus facile d'accès. Échangez-les la prochaine fois que la porte est ouverte."
		}
	},
	barcode: {
		notSupported: "La lecture de code-barres n'est pas prise en charge par ce navigateur. Saisissez le code-barres manuellement ci-dessous.",
		enterManually: "Saisissez le code-barres manuellement ci-dessous.",
		pointAtBarcode: "Pointez la caméra vers le code-barres sur la bouteille"
	},
	card: {
		loading: "Chargement de la cave à vin...",
		noSearchResults: "Aucun vin ne correspond à votre recherche",
		vivinoBatchScanTitle: "Analyse Vivino groupée",
		somePhotosQuestion: "Certains vins ont déjà une photo. Que faire de ces photos ?",
		tryAiNoMatch: "Essayer l'IA pour les vins sans correspondance Vivino fiable",
		keepExistingPhotos: "Garder mes photos actuelles",
		replaceWithVivinoPhotos: "Remplacer par les photos Vivino",
		runAiBatchTitle: "Lancer l'analyse IA groupée ?",
		runAiBatchBody: "Cela va lancer une analyse IA complète sur les {n} vins, un appel API par bouteille. Cela peut prendre du temps et consommer un quota IA important.",
		runOnNWines: "Lancer sur {n} vins",
		aiBatchScanBtn: "🤖 Analyse IA groupée",
		aiScanning: "Analyse IA en cours...",
		vivinoBatchScanBtn: "🍇 Analyse Vivino groupée",
		vivinoScanning: "Analyse Vivino en cours...",
		vivinoSyncBtn: "🔄 Synchro Vivino",
		vivinoSyncing: "Synchro Vivino en cours...",
		inventoryBtn: "📦 Inventaire",
		pairingsBtn: "🍽️ Accords",
		pairingsTitle: "Trouver un vin pour accompagner votre plat",
		addWineBtn: "+ Ajouter un vin",
		fullAiAnalysisTitle: "Analyse IA complète sur tous les vins (disposition, notes, prix, description)",
		refreshVivinoTitle: "Rafraîchir tous les vins depuis Vivino (notes, prix, description)",
		importVivinoTitle: "Importer votre cave et la liste des souhaits Vivino dans Cork Dork (n'écrit jamais dans Vivino)",
		syncVivinoTitle: "Synchronisation bidirectionnelle : importe depuis Vivino et renvoie vos changements Cork Dork",
		vivinoImporting: "Import Vivino en cours...",
		vivinoImportBtn: "⬇️ Import Vivino",
		removeThisBottleTitle: "Retirer cette bouteille ?",
		removeThisBottleHint: "retirée sur Vivino, archivée dans l'historique ici",
		removeThisBottleBtn: "Retirer cette bouteille",
		bottlePositionZone: "zone {zone}",
		bottlePositionRowSlot: "rangée {row}, emplacement {col}",
		unknownWine: "Vin inconnu",
		removalPanelTitle: "🍷 Bouteilles retirées sur Vivino — choisissez lesquelles retirer ici",
		removalChooseCount: "choisir {n}",
		removalHint: "Les candidates sont entourées en orange ci-dessous — cliquez sur la bouteille réellement disparue.",
		conflictPanelTitle: "⚠️ Conflits de synchro — les deux côtés ont changé ; à vous de trancher",
		conflictCounts: "Vivino : {vivino} · ici : {here}",
		conflictHint: "Vos bouteilles sont entourées ci-dessous. Corrigez-les si besoin (ouvrir une bouteille pour la retirer, coller pour en ajouter), puis confirmez :",
		conflictConfirmBtn: "Cork Dork a raison — régler Vivino sur {n}",
		conflictSyncing: "Synchronisation vers Vivino...",
		vivinoWineFallback: "Vin Vivino {vid}",
		syncCountConfirmTitle: "Synchroniser ce nombre vers Vivino ?",
		syncCountConfirmBodyOne: "Vivino sera réglé sur {n} bouteille — le nombre actuel dans Cork Dork. L'ajustement apparaît dans l'historique de votre cave Vivino et peut y être annulé.",
		syncCountConfirmBodyMany: "Vivino sera réglé sur {n} bouteilles — le nombre actuel dans Cork Dork. L'ajustement apparaît dans l'historique de votre cave Vivino et peut y être annulé.",
		syncCountConfirmBtn: "Oui — mettre à jour Vivino",
		inventoryTitle: "Parcourir l'inventaire complet de la cave",
		unplacedTitle: "Bouteilles non assignées, pas encore placées",
		suggestionsTitle: "Suggestions basées sur l'emplacement actuel de vos bouteilles",
		statBottles: "bouteilles",
		statCapacity: "capacité",
		statAvailable: "disponible",
		statUnplaced: "non placées",
		statValue: "valeur",
		tidyUp: "à ranger",
		tidyUps: "à ranger",
		allSections: "Toutes les sections",
		unassignedTab: "Non assignés ({n})",
		unassignedSectionHeader: "📦 Non assignés ({n})",
		buyListTab: "Liste d'achat ({n})",
		manageRacks: "Gérer les racks",
		vivinoAiSettings: "⚙️ Paramètres",
		buyListEmpty: "Votre liste d'achat est vide",
		buyListEmptyHint: "Utilisez 🛒 Liste d'achat dans Ajouter un vin, ou 🛒 Acheter dans le scanner de liste",
		moveToCellar: "Déplacer vers la cave",
		addToCellarBtn: "+ Cave",
		removeFromBuyList: "Retirer de la liste d'achat",
		unassignedHint: "Ces vins ne sont assignés à aucun rack. Touchez un vin pour voir ses détails, puis utilisez Déplacer pour le placer.",
		cellarEmpty: "Votre cave est vide",
		cellarEmptyHint: "Touchez « Ajouter un vin » pour commencer votre collection",
		slot: "Emplacement {n}",
		sortByDate: "↕ Trier par date",
		sorting: "Tri en cours…",
		renumberTitle: "Renuméroter les emplacements selon l'ordre d'ajout des bouteilles",
		reorderByDateTitle: "Réorganiser par date d'ajout ?",
		reorderByDateBody: "Chaque bouteille de {zone} est déplacée vers un emplacement correspondant à sa date d'ajout. Tout ordre que vous avez arrangé manuellement est perdu. L'emplacement 1 est la position la plus accessible.",
		oldestFirst: "Plus anciennes d'abord",
		newestFirst: "Plus récentes d'abord",
		oldestFirstTitle: "L'emplacement 1 contient la bouteille présente depuis le plus longtemps dans ce casier — pour un casier que vous remplissez en rangée",
		newestFirstTitle: "L'emplacement 1 contient la dernière bouteille ajoutée — pour un casier que vous empilez, où la plus récente est sur le dessus",
		deleteThisSlot: "Supprimer cet emplacement",
		addBox: "Ajouter une caisse",
		addSlot: "Ajouter un emplacement",
		panelStored: "stockées",
		copyBannerText: "Copie de « {name} » — touchez des cases vides ou des zones casier/caisse pour placer les copies",
		moveBannerText: "Déplacement de « {name} » — touchez une case pour le placer",
		buyListMoveBannerText: "Placement de « {name} » — touchez une case dans votre cave",
		doneBtn: "Terminé",
		depthPanelRowCol: "Ligne {row}, Col {col}",
		depthPanelDeepCount: "{n}/{max} en profondeur",
		rackPanelBottlesCount: "{n}/{max} bouteilles",
		boxHeader: "Caisse {n} ({size} bouteilles)",
		shelfGroupHeader: "Planche {n} · {lane}",
		steppedGroupHeader: "Rangée {n}",
		shelfFront: "Avant",
		shelfBack: "Arrière",
		deepSuffix: "{n} en profondeur",
		emptyCellTitle: "Vide – Ligne {row}, Col {col}",
		reorderRackTitle: "Toucher pour voir et réorganiser ce rack"
	},
	inventory: {
		reviewBtn: "🔎 Revue d'inventaire",
		reviewTitle: "Revue d'inventaire",
		reviewIntro: "Revérifier chaque bouteille de la cave. Choisissez une source :",
		title: "📦 Inventaire",
		tabInventory: "Inventaire",
		tabHistory: "Historique",
		loadingHistory: "Chargement de l'historique...",
		noHistory: "Aucun historique — les bouteilles bues ou retirées apparaissent ici",
		winesRemoved: "{n} vins retirés",
		restoreBtn: "Restaurer",
		clearHistoryBtn: "Effacer l'historique",
		historyCleared: "Historique effacé",
		wineRestoredUnassigned: "Vin restauré vers Non assignés",
		restoreWineFailed: "Échec de la restauration du vin",
		enrichMissingVivino: "sans accords ni description, jamais vérifiés auprès de Vivino",
		enrichMissingAI: "sans fenêtre de dégustation ni verdict, jamais analysés par l'IA",
		enrichRetryVivino: "vérifiés auprès de Vivino, toujours rien — Vivino ajoute des bouteilles au fil du temps",
		enrichRetryAI: "analysés par l'IA, toujours sans verdict",
		fillFromVivino: "Compléter depuis Vivino",
		analyzeWithAi: "Analyser avec l'IA",
		retryVivino: "Réessayer Vivino",
		retryAI: "Réessayer l'IA",
		working: "En cours…",
		retryVivinoQ: "🍇 Réessayer Vivino ?",
		fillFromVivinoQ: "🍇 Compléter depuis Vivino ?",
		retryAiQ: "🤖 Relancer l'analyse IA ?",
		analyzeWithAiQ: "🤖 Analyser avec l'IA ?",
		enrichConfirmBodyOne: "{count} vin sera recherché. Il s'agit d'un appel réseau lent et limité en débit — prévoyez que cela prenne du temps, et laissez la fenêtre ouverte jusqu'à la fin.",
		enrichConfirmBodyMany: "{count} vins seront recherchés un par un. Il s'agit d'un appel réseau lent et limité en débit — prévoyez que cela prenne du temps, et laissez la fenêtre ouverte jusqu'à la fin.",
		retryExplain: "Ces vins ont déjà été vérifiés et n'ont rien donné. La date de vérification est mise à jour dans tous les cas, pour que vous sachiez toujours quand a eu lieu la dernière tentative.",
		newExplain: "Certains ne donneront rien de nouveau — toutes les bouteilles n'existent pas dans {source}. Elles passent alors à la ligne « à réessayer » ci-dessous plutôt que de rester ici.",
		vivinoCatalogue: "le catalogue Vivino",
		whatAiInfer: "ce que l'IA peut déduire",
		vivinoFillsExplain: "Complète les accords mets-vins, la description, la note et la photo d'étiquette lorsque Vivino les a. Les valeurs existantes sont conservées.",
		aiFillsExplain: "Complète le verdict de dégustation, la fenêtre de dégustation et les notes des critiques lorsque l'IA peut les déduire. Les valeurs existantes sont conservées.",
		dbSize: "Base de données {total} · historique {history} ({share} %) · {wines} vins, {archived} archivés",
		heavyHistoryHint: "Home Assistant réécrit tout ce fichier à chaque modification — supprimer l'ancien historique accélère chaque modification.",
		refreshingWines: "Rafraîchissement de {n} vins via {source}…",
		refreshFailed: "Échec du rafraîchissement : {error}",
		enrichUpdated: "{n} mis à jour",
		enrichUnchanged: "{n} n'avaient rien de nouveau sur {source}",
		enrichErrors: "{n} n'ont pas pu être contactés",
		enrichRetryNote: "Leur date de vérification est mise à jour — réessayez plus tard.",
		enrichMoveToRetryNote: "Leur date de vérification est mise à jour ; ils passent à la ligne « à réessayer ».",
		backupSaved: "Sauvegarde enregistrée — {wines} vins, {cabinets} racks, {buyList} liste d'achat",
		backupFailed: "Échec de la sauvegarde : {error}",
		importFailed: "Échec de l'import : {error}",
		noWinesInCsv: "Aucun vin trouvé dans le fichier CSV.",
		importUpdated: "{updated} vins mis à jour{addedPart}.",
		importAddedPart: ", {n} nouveaux ajoutés",
		importSuccess: "{n} vins importés avec succès !",
		importSkippedNoteOne: "{skipped} ligne a gardé son emplacement précédent — l'emplacement indiqué était inconnu, hors limites ou déjà pris.",
		importSkippedNoteMany: "{skipped} lignes ont gardé leur emplacement précédent — l'emplacement indiqué était inconnu, hors limites ou déjà pris.",
		invalidBackupWines: "Fichier de sauvegarde invalide : tableau de vins manquant.",
		invalidBackupCabinets: "Fichier de sauvegarde invalide : tableau de racks manquant.",
		invalidJsonFile: "Fichier JSON invalide : {error}",
		restoreFailed: "Échec de la restauration : {error}",
		restoredCount: "Restauré : {wines} vins, {cabinets} racks, {buyList} éléments de liste d'achat !",
		savingEllipsis: "Enregistrement…",
		serverBackupFailed: "Échec de la sauvegarde serveur : {error}",
		savedToServer: "{wines} vins, {cabinets} racks enregistrés sur le serveur",
		savedCheckmark: "✅ Enregistré !",
		listBackupsFailed: "Échec du chargement des sauvegardes : {error}",
		keepEveryBackup: "Conservation de toutes les sauvegardes serveur.",
		keepNBackups: "Conservation des {n} sauvegardes serveur les plus récentes.",
		retentionSaveFailed: "Impossible d'enregistrer la rétention : {error}",
		deleteFailed: "Échec de la suppression : {error}",
		deletedFile: "{filename} supprimé",
		restoredFromServer: "Restauré : {wines} vins, {cabinets} racks depuis {filename}",
		readyToDrink: "Prêt à boire",
		filterDrinkNow: "À boire",
		filterHold: "À garder",
		filterPastPeak: "Sur le déclin",
		filterNotAnalyzed: "Non analysé",
		pairsWith: "Accords avec",
		anyFood: "Tout accord",
		pairingTitle: "Que mangez-vous ?",
		pairingIntro: "Choisissez un plat pour voir les vins qui l'accompagnent.",
		pairingEmpty: "Aucun vin n'a encore d'accords mets-vins. Une recherche Vivino les ajoute.",
		pairingBanner: "Accords avec {food}",
		pairingChange: "Changer",
		missingPairingsHintOne: "{n} vin n'a pas d'accords. Seul Vivino fournit les accords — utilisez « Compléter depuis Vivino » ci-dessous.",
		missingPairingsHintMany: "{n} vins n'ont pas d'accords. Seul Vivino fournit les accords — utilisez « Compléter depuis Vivino » ci-dessous.",
		country: "Pays",
		grape: "Cépage",
		cabinet: "Rack",
		minRating: "Note min",
		maxPrice: "Prix max",
		pricedOnly: "Vins avec prix uniquement.",
		vintage: "Millésime",
		fromPlaceholder: "De",
		toPlaceholder: "À",
		byYear: "avant {year}",
		ofNBottles: "sur {n} bouteilles",
		estValue: "estimation",
		searchPlaceholder: "Rechercher des vins...",
		ascending: "Croissant",
		descending: "Décroissant",
		filtersBtn: "⚙︎ Filtres",
		moreFiltersTitle: "Plus de filtres",
		sort: {
			name: "Nom",
			winery: "Domaine",
			vintage: "Millésime",
			type: "Type",
			rating: "Note",
			myRating: "Ma note",
			price: "Prix",
			drinkBy: "À boire avant",
			urgency: "Urgence",
			purchaseDate: "Date d'achat",
			dateAdded: "Date d'ajout",
			cabinet: "Rack"
		},
		preset: {
			allLabel: "Tous",
			allHint: "Tous les vins de la cave",
			drinkThisYearLabel: "À boire cette année",
			drinkThisYearHint: "Millésime à boire avant {year} ou plus tôt, ou marqué « À boire » sans année. Exclut les vins sur le déclin.",
			pastPeakLabel: "Sur le déclin",
			pastPeakHint: "Marqué « Sur le déclin » par l'analyse IA",
			unratedLabel: "Non noté",
			unratedHint: "Vous ne leur avez pas donné de note personnelle",
			incompleteLabel: "Données manquantes",
			incompleteHint: "Il manque au moins un élément parmi : accords, description, fenêtre de dégustation, photo d'étiquette",
			recentLabel: "Ajouté récemment",
			recentHint: "Ajouté à la cave dans les 30 derniers jours"
		},
		winesShown: "{shown} vins affichés sur {total}",
		filtersActive: " · {n} filtre{plural} actif{plural}",
		clearAll: "Tout effacer",
		footerCountAll: "{n} vins",
		footerCountFiltered: "{shown} vins sur {total}",
		saveServerBackupTitle: "Enregistrer une sauvegarde datée sur le serveur HA",
		serverBackupBtn: "Sauvegarde serveur",
		restoreServerBackupTitle: "Restaurer depuis une sauvegarde serveur",
		restoringEllipsis: "Restauration…",
		serverRestoreBtn: "Restauration serveur",
		downloadBackupTitle: "Télécharger une sauvegarde complète de la cave en JSON",
		downloadBtn: "Télécharger",
		restoreFromFileTitle: "Restaurer la cave depuis un fichier de sauvegarde JSON",
		uploadBtn: "Importer",
		importCsvTitle: "Importer des vins depuis un fichier CSV",
		importingEllipsis: "Import en cours…",
		importCsvBtn: "Importer CSV",
		exportCsvTitle: "Exporter les vins en CSV",
		exportCsvBtn: "Exporter CSV",
		serverBackupsTitle: "Sauvegardes serveur",
		keepTheLast: "Conserver les",
		allNeverDelete: "Toutes (ne jamais supprimer)",
		nBackups: "{n} sauvegardes",
		noServerBackups: "Aucune sauvegarde serveur trouvée. Utilisez « Sauvegarde serveur » pour en créer une.",
		selectBackupToRestore1: "Sélectionnez une sauvegarde à restaurer — cela va",
		selectBackupToRestore2: "toutes les données actuelles. {n} stockées, {size} sur le disque.",
		unreadableFile: "fichier illisible",
		backupMeta: "{wines} vins, {cabinets} racks · {size}",
		deleteThisBackup: "Supprimer cette sauvegarde",
		updateExistingQ: "📄 Mettre à jour les vins existants ?",
		csvEditedExportNote: "Ce CSV ressemble à un export modifié — certaines lignes portent l'ID d'un vin déjà présent dans votre cave.",
		rowsMatchExisting: "ligne{plural} correspondant à des vins existants",
		updateOnlyTouchesNote: "La mise à jour ne touche que les colonnes présentes dans le fichier ; les cellules vides laissent la valeur existante inchangée.",
		addAllAsNew: "Tout ajouter comme nouveau",
		updateNWines: "Mettre à jour {n} vin{plural}",
		restoreBackupQ: "🔄 Restaurer la sauvegarde ?",
		restoreWillReplaceNote: "Cela va remplacer toutes les données actuelles de votre cave par la sauvegarde. Cette action est irréversible.",
		backupContains: "La sauvegarde contient :",
		backupStats: "{wines} vins · {cabinets} racks · {buyList} éléments de liste d'achat",
		winesWord: "vins",
		racksWord: "racks",
		buyListItemsWord: "éléments de liste d'achat",
		createdLabel: "Créée le : {date}",
		restoreNowBtn: "Restaurer maintenant",
		buyAgainOnly: "🛒 À racheter uniquement",
		noBuyAgain: "Aucun vin marqué « à racheter » pour le moment",
		buyAgainTitle: "À racheter — dans votre liste d'achat",
		addNotesBtn: "📝 Ajouter des notes",
		editNotesBtn: "📝 Notes",
		myRatingLabel: "Ma note",
		drinkNotesPlaceholder: "Comment était-il ? Avec quoi l'avez-vous accompagné ?",
		buyAgainLabel: "À racheter ?",
		buyAgainHint: "L'ajoute à votre liste d'achat",
		historySaved: "Enregistré",
		historySaveFailed: "Échec de l'enregistrement"
	},
	addWine: {
		title: "Ajouter un vin",
		titleBuyList: "Ajouter à la liste d'achat",
		lookingUpBarcode: "Recherche du code-barres...",
		cancelScan: "Annuler le scan",
		analyzingLabel: "Analyse de l'étiquette par l'IA...",
		frontLabelCaptured: "Étiquette avant capturée",
		addBackPhotoQuestion: "Ajouter aussi une photo de l'étiquette arrière ? Elle contient souvent le millésime (et parfois un code-barres).",
		addBackPhotoBtn: "📷 Ajouter la photo arrière",
		skipUseFrontOnly: "Passer, utiliser l'avant seulement",
		photographBackLabel: "Photographiez maintenant l'étiquette arrière",
		scanBarcodeTitle: "Scanner le code-barres",
		scanBarcodeDesc: "Pointez la caméra vers le code-barres de la bouteille",
		recognizeLabelTitle: "Reconnaître l'étiquette",
		configureGeminiTitle: "Configurez la clé API Gemini dans les paramètres de l'intégration",
		takePhotoOfLabel: "Prenez une photo de l'étiquette du vin",
		requiresGeminiKey: "Nécessite une clé API Gemini dans les paramètres",
		scanListTitle: "Scanner une liste",
		scanListDesc: "Photo d'une carte des vins ou d'un reçu — notes et valeur",
		orEnterManually: "ou entrez manuellement",
		barcodePlaceholder: "Entrez le code-barres...",
		lookUpBtn: "Rechercher",
		orSearchByName: "ou recherchez par nom",
		searchNamePlaceholder: "Rechercher un nom de vin...",
		searchBtn: "Rechercher",
		resultsCount: "{n} résultat{plural} — touchez pour sélectionner",
		unknownName: "Inconnu",
		skipManualEntry: "Passer → saisie manuelle",
		back: "← Retour",
		next: "Suivant →",
		wineNameLabel: "Nom du vin *",
		wineryLabel: "Domaine",
		vintageLabel: "Millésime",
		typeLabel: "Type",
		purchasePriceLabel: "Prix d'achat",
		currentValueLabel: "Valeur actuelle",
		regionLabel: "Région",
		countryLabel: "Pays",
		grapeVarietyLabel: "Cépage",
		purchaseDateLabel: "Date d'achat",
		drinkByLabel: "À boire avant",
		drinkByPlaceholder: "ex. 2030",
		notesLabel: "Notes",
		myRatingLabel: "Ma note",
		buyListBtnTitle: "Enregistrer dans la liste d'achat plutôt que dans la cave",
		buyListBtn: "🛒 Liste d'achat",
		suggestedTitle: "Suggéré — là où se trouvent ses semblables",
		fullUsage: "Plein · {used}/{capacity}",
		room: "De la place",
		oneFree: "1 libre",
		nFree: "{n} libres",
		noRoomSplit: "Plus de place là-bas — répartissez la série dans",
		orFreeSlotFirst: ", ou libérez d'abord un emplacement.",
		chooseLocation: "Choisir un emplacement",
		selectCabinetHint: "Choisissez un rack et une position pour cette bouteille",
		slotsCount: "{rows}×{cols} emplacements",
		bulkBoxZone: "Zone casier/caisse",
		noneUseGrid: "Aucune — utiliser ligne/colonne de la grille",
		boxShort: "Caisse",
		shelfShort: "Tête-bêche",
		fullTitle: "Plein — libérez un emplacement ou augmentez sa capacité",
		rowLabel: "Ligne (à partir de 1)",
		columnLabel: "Colonne (à partir de 1)",
		pickZoneOrRowCol: "Choisissez une zone, ou renseignez à la fois la ligne et la colonne, pour que la bouteille ait un emplacement repérable.",
		slotOutside: "Cet emplacement est hors de {cabinet} ({rows} lignes × {cols} colonnes).",
		rowIsBinOrBox: "Cette ligne est un casier ou une caisse, pas des emplacements de grille — choisissez-la dans la liste de zones ci-dessus.",
		slotFull: "Ligne {row}, colonne {col} est pleine ({used}/{depth} de profondeur).",
		bottlesLabel: "Bouteilles",
		identicalUnassigned: "Bouteilles identiques, ajoutées sans assignation.",
		destinationFull: "Cette destination est pleine.",
		slotsFreeHere: "{n} emplacement{plural} libre{plural} ici.",
		consecutiveSlots: "Les {n} bouteilles occupent des emplacements libres consécutifs.",
		confirmAndAdd: "Confirmer et ajouter",
		nameLabel: "Nom",
		cabinetLabel: "Rack",
		positionLabel: "Position",
		notSpecified: "Non spécifié",
		addNBottles: "Ajouter {n} bouteilles",
		noBarcodeMatch: "Aucune correspondance pour ce code-barres.",
		barcodeLookupFailed: "Échec de la recherche du code-barres.",
		takePhotoInstead: "{reason} Prenez plutôt une photo de l'étiquette.",
		enterManually: "{reason} Vous pouvez saisir les détails manuellement.",
		noResultsFound: "Aucun résultat trouvé. Vous pouvez saisir les détails manuellement.",
		searchFailed: "Échec de la recherche. Vous pouvez saisir les détails manuellement.",
		labelRecognitionFailed: "Échec de la reconnaissance de l'étiquette : {error}",
		unknownError: "Erreur inconnue",
		labelRecognitionError: "Erreur de reconnaissance de l'étiquette : {msg}",
		zoneFull: "{label} est pleine ({used}/{capacity}). Libérez un emplacement, ou augmentez sa capacité dans Gérer les racks.",
		containerFull: "{label} est pleine. Libérez un emplacement, ou augmentez sa capacité dans Gérer les racks.",
		noFreeSlot: "Plus d'emplacement libre à cette destination.",
		addToBuyListFailed: "Échec de l'ajout à la liste d'achat.",
		addWineFailed: "Échec de l'ajout du vin.",
		thisBox: "Cette caisse",
		thisBin: "Ce casier",
		thisShelf: "Ce tête-bêche",
		thisStepped: "Ce quinconce",
		posRowCol: "Ligne {row}, Col {col}"
	},
	wineDetail: {
		backLabelSuffix: " (étiquette arrière)",
		backLabelBadge: "Étiquette arrière",
		frontLabelTitle: "Étiquette avant",
		replacePhotoTitle: "Remplacer la photo",
		replaceBackPhotoTitle: "Remplacer la photo de l'étiquette arrière",
		deletePhotoTitle: "Supprimer la photo",
		deleteBackPhotoTitle: "Supprimer la photo de l'étiquette arrière",
		deletePhotoConfirm: "Supprimer la photo de cette bouteille ?",
		deleteBackPhotoConfirm: "Supprimer la photo de l'étiquette arrière de cette bouteille ?",
		tapToLocate: "Toucher pour localiser",
		ratingsCountSuffix: " ({count} avis)",
		myRating: "Ma note",
		aiScanBtn: "Analyse IA",
		scanLabelBtn: "Étiquette",
		lookupBtn: "Vivino / IA",
		lookupTitle: "Mettre à jour les détails de cette bouteille via Vivino ou l'IA",
		lookupChooserTitle: "Mettre à jour les détails",
		lookupChooserIntro: "Choisissez une source :",
		lookupVivinoDesc: "Notes, description, cépages et accords mets-vins depuis Vivino",
		lookupAiDesc: "Analyse IA complète : disposition, notes, prix, description",
		scanLabelTitle: "Prendre une nouvelle photo de l'étiquette pour mettre à jour la photo et les détails de cette bouteille",
		resetAiContentBtn: "Réinitialiser",
		resetAiContentTitle: "Effacer la description et les accords mets-vins pour que la prochaine recherche Vivino/IA les régénère entièrement (corrige un texte resté dans la mauvaise langue)",
		resetAiContentConfirm: "Effacer la description et les accords mets-vins de ce vin ? Le prochain rafraîchissement Vivino ou l'Analyse IA les régénérera entièrement.",
		copyBtn: "Copier",
		moveBtn: "Déplacer",
		unassignBtn: "Désassigner",
		removeBtn: "Retirer",
		nothingFoundChecked: "rien trouvé · vérifié {date}",
		recheckedNothingNew: "{date1} · revérifié {date2}, rien de nouveau",
		wineNameLabel: "Nom du vin",
		wineryLabel: "Domaine",
		vintageLabel: "Millésime",
		typeLabel: "Type",
		purchasePriceLabel: "Prix d'achat",
		currentValueLabel: "Valeur actuelle",
		regionLabel: "Région",
		countryLabel: "Pays",
		grapeVarietyLabel: "Cépage",
		alcoholLabel: "Alcool",
		alcoholPlaceholder: "ex. 13,5 %",
		servingTempLabel: "Température idéale",
		servingTempPlaceholder: "ex. 16-18°C",
		servingTempPlaceholderF: "ex. 61-64°F",
		purchaseDateLabel: "Date d'achat",
		drinkFromLabel: "À boire à partir de",
		drinkFromPlaceholder: "ex. 2025",
		drinkByLabel: "À boire avant",
		drinkByPlaceholder: "ex. 2030",
		peakWindowLabel: "Apogée (Optionnel)",
		peakWindowPlaceholder: "ex. 2028-2029 ou 2028",
		notesLabel: "Notes",
		saving: "Enregistrement...",
		save: "Enregistrer",
		priceLabel: "Prix",
		purchasedLabel: "Acheté le",
		barcodeLabel: "Code-barres",
		grapeLabel: "Cépage",
		drinkWindowPrefix: "Fenêtre de dégustation : {window}",
		tastingNotesTitle: "Notes de dégustation",
		aromaLabel: "Arôme",
		aromaPlaceholder: "Fruits rouges, chêne, vanille...",
		tasteLabel: "Bouche",
		tastePlaceholder: "Corsé, tannique...",
		finishLabel: "Finale",
		finishPlaceholder: "Longue, souple...",
		overallLabel: "Impression générale",
		overallPlaceholder: "Impression générale...",
		noTastingNotes: "Aucune note de dégustation pour le moment. Touchez Modifier pour ajouter vos impressions.",
		removeWineTitle: "Retirer le vin",
		removeWineQuestion: "Pourquoi retirez-vous cette bouteille ?",
		vivinoPhotoAvailableTitle: "Photo Vivino disponible",
		vivinoPhotoAvailableBody: "Vivino a trouvé une photo différente pour cette bouteille. Garder votre photo actuelle ou utiliser celle de Vivino ?",
		currentPhotoLabel: "Actuelle",
		keepMyPhotoBtn: "Garder ma photo",
		useVivinoPhotoBtn: "Utiliser celle de Vivino",
		noVivinoMatchTitle: "Aucune correspondance Vivino",
		noPriceFoundTitle: "Aucun prix trouvé",
		vivinoNoMatchBody: "Vivino n'a pas trouvé de correspondance fiable pour ce vin. Essayer avec l'IA ?",
		vivinoNoPriceBody: "Vivino n'a pas de prix pour ce vin dans la devise sélectionnée. L'estimer avec l'IA ?",
		useAiOnceBtn: "Utiliser l'IA une fois",
		alwaysUseAiBtn: "Toujours utiliser l'IA automatiquement",
		couldNotIdentifyLabel: "Impossible d'identifier l'étiquette. Essayez une photo plus nette.",
		labelScanFailed: "Échec du scan de l'étiquette. Veuillez réessayer.",
		applyNoteConfirm: "Appliquer aussi cette note à vos {count} autre{plural} bouteille{plural} de {name} ?",
		drinkNowWithWindow: "À boire maintenant • {window}",
		drinkNowWithPeak: "À boire maintenant • {window} (Apogée : {peak})",
		drinkNowPlain: "À boire maintenant",
		holdWithWindow: "À garder • à boire {window}",
		holdWithPeak: "À garder • à boire {window} (Apogée : {peak})",
		holdUntil: "À garder jusqu'à {date}",
		holdPlain: "À garder",
		pastPeakWithWindow: "Sur le déclin • était {window}",
		pastPeakWithPeak: "Sur le déclin • était {window} (Apogée : {peak})",
		pastPeakPlain: "Sur le déclin",
		chamberingReady: "🌡️ Prêt à servir",
		chamberingWarmUp: "🌡️ Sortir {duration} avant de servir",
		chamberingChill: "🧊 Rafraîchir ~15–20 min avant de servir",
		aiLabel: "IA",
		drinkBtn: "Boire",
		drinkTitle: "🍷 Santé !",
		drinkIntro: "Notez vos impressions — ou passez et ajoutez-les plus tard depuis l'Historique.",
		drinkNotesPlaceholder: "Comment était-il ? Avec quoi l'avez-vous accompagné ?",
		buyAgainLabel: "À racheter ?",
		buyAgainHint: "L'ajoute à votre liste d'achat",
		drinkConfirmBtn: "Boire"
	},
	rack: {
		failedToAddRack: "Échec de l'ajout du rack.",
		failedToUpdateRack: "Échec de la mise à jour du rack.",
		failedToDeleteRack: "Échec de la suppression du rack.",
		failedToReorderRacks: "Échec de la réorganisation des racks.",
		gridDimensions: "grille {rows} × {cols}",
		gridDeepSuffix: " × {depth} en profondeur",
		bottlesCountSuffix: " · {n} bouteille{plural}",
		shelfCountSuffixOne: " · {n} tête-bêche",
		shelfCountSuffixMany: " · {n} tête-bêche",
		boxCountSuffixOne: " · {n} caisse",
		boxCountSuffixMany: " · {n} caisses",
		moveUpTitle: "Monter",
		moveDownTitle: "Descendre",
		delBtn: "Suppr",
		addRackBtn: "+ Ajouter un rack",
		rackNameLabel: "Nom du rack",
		cabinetSensorsLabel: "Capteurs (température / humidité)",
		sensorNone: "—",
		gridLayoutTitle: "Disposition de la grille",
		styleLabel: "Style du rack",
		styleGrid: "Grille classique",
		shelfCountLabel: "Tête-bêche",
		shelfFrontLabel: "Avant",
		shelfBackLabel: "Arrière",
		shelfLevelsLabel: "Rangées par tête-bêche",
		shelfAlternateHint: "Les quantités avant/arrière s'inversent à chaque rangée d'un tête-bêche (la rangée du bas commence avec le plus grand nombre à l'avant).",
		shelfNamePlaceholder: "Tête-bêche {n}",
		bulkCapacityLabel: "Bouteilles",
		boxCountLabel: "Caisses",
		secondaryStyleLabel: "Rangement secondaire",
		secondaryNone: "Aucun",
		secondaryHint: "Un second rangement, d'un style différent (ou identique), qui vient s'ajouter au-dessus ou en dessous du rangement principal.",
		secondaryPositionLabel: "Position du rangement secondaire",
		secondaryAbove: "Au-dessus",
		secondaryBelow: "En dessous",
		secondaryGridHint: "Utilise les mêmes colonnes et profondeur que la grille principale.",
		steppedCountLabel: "Quinconces",
		steppedFirstRowLabel: "Bouteilles en rangée du bas",
		steppedRowCountLabel: "Nombre de rangées",
		steppedNamePlaceholder: "Quinconce {n}",
		rowsLabel: "Lignes",
		columnsLabel: "Colonnes",
		depthLabel: "Profondeur",
		slotsOption: "Emplacements",
		zoneNamePlaceholder: "Nom de la zone",
		boxSizeOption: "{s} bout.",
		colsCount: "{n} colonne{plural}",
		warningBeforeOne: "Cela laisse 1 bouteille sans emplacement. Elle sera déplacée vers",
		warningBeforeMany: "Cela laisse {n} bouteilles sans emplacement. Elles seront déplacées vers",
		warningAfterOne: "— rien n'est supprimé, vous pourrez la remettre où vous voulez.",
		warningAfterMany: "— rien n'est supprimé, vous pourrez les remettre où vous voulez.",
		unnamedWine: "Vin sans nom",
		andNMore: "…et {n} de plus",
		deletingBtn: "Suppression...",
		deleteBtn: "Supprimer",
		deleteConfirmQuestion: "Voulez-vous vraiment supprimer « {name} » ?",
		deleteWinesUnassignedOne: "1 vin sera désassigné.",
		deleteWinesUnassignedMany: "{count} vins seront désassignés.",
		dialogTitleManage: "Gérer les racks",
		dialogTitleAdd: "Ajouter un rack",
		dialogTitleEdit: "Modifier le rack",
		dialogTitleDeleteConfirm: "Supprimer le rack ?"
	},
	vivinoAiSettings: {
		title: "Paramètres",
		alwaysTryAi: "Toujours essayer l'IA quand Vivino ne trouve pas de correspondance",
		enableWhisky: "Suivre les bouteilles de whisky (proposer \"Whisky\" comme type)",
		defaultWineTypeLabel: "Type de vin par défaut",
		dispositionDisplayLabel: "Affichage à boire/à garder/sur le déclin",
		dispositionDisplayLetter: "Pastille avec lettre",
		dispositionDisplayDot: "Cercle de couleur",
		languageLabel: "Langue Vivino/IA",
		currencyLabel: "Devise",
		infoTitle: "Vivino vs IA — Ce que chacun fournit",
		vivinoProvidesTitle: "Vivino fournit :",
		vivinoBottlePhoto: "Photo de la bouteille",
		vivinoCommunityRating: "Note de la communauté (★) et nombre d'avis",
		vivinoMarketPrice: "Prix du marché",
		vivinoFoodPairings: "Accords mets-vins",
		vivinoAlcohol: "Taux d'alcool",
		vivinoGrapeInfo: "Cépage, région, pays, type (si trouvés)",
		aiProvidesTitle: "L'IA fournit :",
		aiEstimatedPrice: "Prix estimé (uniquement si Vivino n'en a pas)",
		aiTastingDescription: "Description de dégustation",
		aiCriticScores: "Notes des critiques (Wine Spectator, Robert Parker, Jeb Dunnuck, Antonio Galloni)",
		aiDispositionInfo: "{drinkNow} / {hold} / {pastPeak} + {window}",
		drinkingWindow: "fenêtre de dégustation",
		aiGrapeInfo: "Cépage, région, pays, type — uniquement lors du scan d'une photo d'étiquette, pas lors d'une actualisation",
		infoNote: "L'IA ne fournit jamais de photo, de note de la communauté Vivino, ni d'accords mets-vins — quand Vivino ne trouve pas de correspondance fiable, l'IA complète ce qu'elle peut (surtout le prix, la description et les notes des critiques), pas tout ce que Vivino aurait fourni.",
		cardBackgroundLabel: "Arrière-plan de la carte",
		cardBackgroundTheme: "Thème par défaut",
		cardBackgroundUpload: "Importer une photo",
		cardBackgroundChange: "Changer",
		cardBackgroundRemove: "Retirer"
	},
	camera: {
		blockedInsecure: "La caméra en direct nécessite une connexion sécurisée. Home Assistant est servi en http://, et les navigateurs n'autorisent l'accès à la caméra qu'en https:// (ou sur localhost).",
		notOffered: "Ce navigateur ne permet pas l'accès à la caméra en direct.",
		accessDenied: "L'accès à la caméra a été refusé. Autorisez-le pour ce site dans les paramètres de votre navigateur.",
		notFound: "Aucune caméra trouvée sur cet appareil.",
		busy: "La caméra est occupée ou indisponible — une autre application l'utilise peut-être.",
		genericError: "Impossible d'accéder à la caméra{detail}.",
		fallbackHint: "Le bouton ci-dessous ouvre la caméra de votre appareil, qui fonctionne dans tous les cas.",
		pointAtLabel: "Pointez la caméra vers l'étiquette du vin",
		takePhotoBtn: "📷 Prendre une photo",
		uploadGalleryBtn: "📁 Importer depuis la galerie",
		takePhotoTitle: "Prendre une photo"
	},
	wineList: {
		scanTitle: "🍽️ Scanner une liste",
		scannedListTitle: "🍽️ Liste scannée",
		alreadyScannedHintOne: "{n} vin déjà scanné. Prenez une autre photo pour en ajouter d'autres.",
		alreadyScannedHintMany: "{n} vins déjà scannés. Prenez une autre photo pour en ajouter d'autres.",
		captureSubtitle: "Prenez en photo une carte des vins ou un reçu pour voir les notes et la valeur.",
		backToResults: "Retour aux résultats ({n})",
		analyzingList: "Analyse de la liste...",
		geminiReading: "Gemini lit les vins et les note",
		longListsHint: "Les longues listes peuvent prendre jusqu'à 3 minutes",
		winesFoundOne: "{n} vin trouvé",
		winesFoundMany: "{n} vins trouvés",
		pricesInCurrency: " • Prix en {currency}",
		getVivinoScoresBtn: "🍇 Obtenir les notes Vivino",
		scanAnotherPageBtn: "📷 Scanner une autre page",
		inCellarBadge: "EN CAVE",
		drinkWindowLabel: "Fenêtre de dégustation :",
		byTheGlassLabel: "Au verre :",
		sizeLabel: "Taille :",
		vivinoLabel: "Vivino :",
		greatValue: "Bonne affaire",
		fairPrice: "Prix correct",
		typical: "Standard",
		premium: "Premium",
		addBtn: "+ Ajouter",
		buyBtn: "🛒 Acheter",
		noWinesFoundImage: "Aucun vin trouvé dans l'image. Essayez une photo plus nette.",
		extractionFailed: "Échec de l'extraction : {error}"
	}
};
var toast = {
	zoneFull: "« {zone} » est pleine — impossible de coller ici.",
	zoneFullMove: "« {zone} » est pleine — impossible de déplacer ici.",
	zoneResizeFailed: "Échec du redimensionnement de la zone",
	slotDeletedUnassigned: "Emplacement supprimé, vin non assigné",
	slotDeleted: "Emplacement supprimé",
	deleteSlotFailed: "Échec de la suppression de l'emplacement",
	wineReordered: "Vin réorganisé",
	reorderFailed: "Échec de la réorganisation du vin",
	newestFirstToast: "Bouteilles les plus récentes en premier",
	oldestFirstToast: "Bouteilles les plus anciennes en premier",
	sortFailed: "Échec du tri",
	wineUnassigned: "Ce vin n'est pas assigné",
	inLocation: "Dans {location}",
	rackResizeFailed: "Échec du redimensionnement du rack",
	rackTooSmall: "Le rack ne peut pas être plus petit",
	deleteSlotConfirmNamed: "Supprimer l'emplacement {n} ? « {name} » sera déplacé vers Non assignés.",
	deleteSlotConfirm: "Supprimer l'emplacement {n} ?",
	deleteThisSlotConfirmNamed: "Supprimer cet emplacement ? « {name} » sera déplacé vers Non assignés.",
	deleteThisSlotConfirm: "Supprimer cet emplacement ?",
	wineMoved: "« {name} » déplacé",
	moveFailed: "Échec du déplacement du vin",
	wineSwapped: "Vins échangés",
	wineMovedShort: "Vin déplacé",
	moveUndoFailed: "Le déplacement a échoué et n'a pas pu être annulé — vérifiez les deux emplacements",
	wineCopied: "« {name} » copié — touchez des cases vides ou des zones casier/caisse pour coller",
	winePasted: "Vin collé ! Touchez d'autres cases vides ou cliquez sur ✕ pour arrêter.",
	pasteFailed: "Échec du collage du vin.",
	aiBatchRunning: "Analyse IA complète en cours sur tous les vins...",
	aiBatchFailedError: "Échec de l'analyse IA groupée : {error}",
	aiBatchComplete: "Analyse IA par groupée terminée ! {updated}/{total} mis à jour",
	errorsCount: "({n} erreurs)",
	aiBatchFailed: "L'analyse IA groupée a échoué.",
	dismissSuggestionFailed: "Échec du rejet de la suggestion",
	changeLanguageFailed: "Échec du changement de langue",
	changeCurrencyFailed: "Échec du changement de devise",
	changeAiFallbackFailed: "Échec du changement du paramètre de secours IA",
	changeEnableWhiskyFailed: "Échec du changement du paramètre whisky",
	changeDispositionDisplayFailed: "Échec du changement d'affichage de la pastille",
	changeDefaultWineTypeFailed: "Échec du changement du type de vin par défaut",
	vivinoRefreshing: "Rafraîchissement de tous les vins depuis Vivino...",
	vivinoBatchFailedError: "Échec de l'analyse Vivino groupée : {error}",
	vivinoBatchComplete: "Analyse Vivino groupée terminée ! {updated}/{total} mis à jour",
	vivinoPhotosUpdated: "{n} photos mises à jour",
	vivinoPhotosKept: "{n} conservées",
	vivinoAiFallbackUsed: "{n} ont utilisé l'IA à la place",
	vivinoNoMatch: "{n} aucune correspondance",
	vivinoBatchRefreshFailed: "Le rafraîchissement Vivino groupée a échoué.",
	vivinoSyncing: "Synchronisation de votre cave et liste de souhaits Vivino...",
	vivinoSyncFailedError: "Échec de la synchro Vivino : {error}",
	vivinoSyncCompleteOne: "Synchro Vivino terminée ! {n} bouteille importée",
	vivinoSyncCompleteMany: "Synchro Vivino terminée ! {n} bouteilles importées",
	vivinoWishlistAdded: "+ {n} à la liste d'achat",
	vivinoPushedCount: "({n} renvoyée(s) vers Vivino)",
	vivinoRemovedCountOne: "· {n} bouteille retirée",
	vivinoRemovedCountMany: "· {n} bouteilles retirées",
	vivinoSyncFailed: "Échec de la synchro Vivino.",
	vivinoImporting: "Import de votre cave et liste de souhaits Vivino...",
	vivinoImportFailedError: "Échec de l'import Vivino : {error}",
	vivinoImportCompleteOne: "Import Vivino terminé ! {n} bouteille importée",
	vivinoImportCompleteMany: "Import Vivino terminé ! {n} bouteilles importées",
	vivinoImportFailed: "Échec de l'import Vivino.",
	vivinoRemovalChoicesOne: "— {n} suppression nécessite votre choix",
	vivinoRemovalChoicesMany: "— {n} suppressions nécessitent votre choix",
	bottleRemovedMoreToChoose: "Bouteille retirée — {n} de plus à choisir",
	bottleRemovedAllResolved: "Bouteille retirée — toutes les suppressions Vivino sont résolues",
	removeBottleFailed: "Échec du retrait de la bouteille.",
	vivinoConflictsOne: "— {n} conflit nécessite votre décision",
	vivinoConflictsMany: "— {n} conflits nécessitent votre décision",
	vivinoConflictUpdatedOne: "Vivino mis à jour à {n} bouteille.",
	vivinoConflictUpdatedMany: "Vivino mis à jour à {n} bouteilles.",
	vivinoConflictUpdateFailed: "Échec de la mise à jour de Vivino.",
	removedFromBuyList: "Retiré de la liste d'achat",
	removeFromBuyListFailed: "Échec du retrait de la liste d'achat",
	tapToPlace: "Touchez une case pour placer « {name} »",
	movedToCellar: "« {name} » déplacé vers la cave",
	moveToCellarFailed: "Échec du déplacement vers la cave",
	tapToMove: "Touchez une case pour déplacer « {name} »",
	wineDrunk: "Santé ! {name} est maintenant dans l'Historique",
	removeWineFailed: "Échec du retrait du vin",
	changeCardBackgroundFailed: "Échec du changement d'arrière-plan"
};
var fr = {
	wineType: wineType,
	bottleFields: bottleFields,
	storageRowType: storageRowType,
	removalReason: removalReason,
	wineLocation: wineLocation,
	foodCategory: foodCategory,
	ui: ui,
	toast: toast
};

// The frontend's own translation catalog — separate from HA's own
// translations/{en,fr}.json (which only cover the config-flow screens; HA
// validates that file against its own schema, so it can't also carry
// arbitrary card UI strings). New languages are added here as another
// {lang}.json file plus one line in this map.
// Loosely typed on purpose: some groups (e.g. "ui") nest several levels
// deep ("ui.wineDetail.vintage"), others are flat one-level maps used with
// tGroup() — lookup()/tGroup() below navigate them dynamically either way.
const TRANSLATIONS = { en, fr };
// "spoiled" in removalReason groups every wine-side flaw (corked, volatile
// acidity, oxidized, off...) rather than physical bottle damage —
// "Défectueuse" (faulty wine) covers that better in French than a literal
// "Abîmée" (damaged).
// A single string, e.g. t("wineLocation.slot", hass.language). Dot-notation
// key into the catalog. Falls back to the English value for a language HA
// reports that this catalog doesn't have a file for, or for a key that
// exists in English but hasn't been translated into the target language
// yet — a partially-translated catalog should never render "undefined".
//
// `params` fills in {token} placeholders inside the resolved string, e.g.
// t("toast.wine.moved", lang, { name: wine.name }) against a catalog entry
// `"moved": "Moved \"{name}\""`. A placeholder with no matching param is
// left as-is rather than blanked out, so a missed param is visible in
// testing instead of silently disappearing.
function t$1(key, language, params) {
    const lang = (language || "en").split("-")[0];
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const value = lookup(dict, key);
    const resolved = value !== undefined ? value : lookup(TRANSLATIONS.en, key);
    const text = resolved !== undefined ? resolved : key;
    return params ? interpolate(text, params) : text;
}
function interpolate(text, params) {
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}
// A whole translated group at once (e.g. every wine-type label), for
// callers that need a Record to index into — Object.entries(), a lookup by
// a dynamic key, etc. — rather than calling t() one key at a time. Missing
// keys within a partially-translated group fall back individually to
// English rather than the whole group falling back.
function tGroup(group, language) {
    const lang = (language || "en").split("-")[0];
    const enGroup = TRANSLATIONS.en[group] || {};
    if (lang === "en")
        return enGroup;
    const langGroup = TRANSLATIONS[lang]?.[group];
    return langGroup ? { ...enGroup, ...langGroup } : enGroup;
}
function lookup(dict, key) {
    return key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), dict);
}

// Same labels, translated per HA's display language (src/i18n/{en,fr}.json)
// — falls back to the English STORAGE_ROW_TYPE_LABELS above for a language
// with no catalog yet.
function getStorageRowTypeLabels(language) {
    return tGroup("storageRowType", language);
}
const BOX_SIZES = [1, 3, 6, 12, 24];
// A true quinconce alternates: the bottom row holds `firstRow` bottles: the
// row above nests into its gaps and holds one fewer, the row above that
// realigns with the bottom row's own positions and is back to `firstRow`,
// and so on — odd rows (1st, 3rd, 5th...) at `firstRow`, even rows at
// `firstRow - 1`. It does not taper off monotonically.
function getSteppedLevels(firstRow, rows) {
    const first = Math.max(0, firstRow);
    const second = Math.max(0, first - 1);
    const count = Math.max(1, rows);
    return Array.from({ length: count }, (_, i) => (i % 2 === 0 ? first : second));
}
// Flattens a stepped zone's levels into (level, depth-range) groups, mirroring
// getShelfSlotGroups above but with a single lane per level. The backend's
// WineCellarStorage._storage_row_capacity sums the same levels in the same
// order, so the two must stay in step if this ever changes.
function getSteppedSlotGroups(levels) {
    const groups = [];
    let offset = 0;
    for (let level = 0; level < (levels?.length || 0); level++) {
        const size = levels[level];
        if (size > 0)
            groups.push({ level, start: offset, size });
        offset += size;
    }
    return groups;
}
// Flattens a shelf's levels into (level, lane) groups with their depth-index
// range, bottom-to-top, front-then-back within each level. This ordering is
// the single source of truth for how a flat `wine.depth` index maps onto a
// physical (level, lane, position) slot — the backend's
// WineCellarStorage._storage_row_capacity sums the same levels in the same
// order, so the two must stay in step if this ever changes.
function getShelfSlotGroups(levels) {
    const groups = [];
    let offset = 0;
    for (let level = 0; level < (levels?.length || 0); level++) {
        const { front, back } = levels[level];
        if (front > 0)
            groups.push({ level, lane: "front", start: offset, size: front });
        offset += front;
        if (back > 0)
            groups.push({ level, lane: "back", start: offset, size: back });
        offset += back;
    }
    return groups;
}
const REMOVAL_REASONS = [
    { id: "drank", label: "Drank" },
    { id: "gifted", label: "Gifted" },
    { id: "sold", label: "Sold" },
    { id: "broken", label: "Broken" },
    { id: "spoiled", label: "Spoiled" },
    { id: "other", label: "Other" },
];
// Same reasons, translated per HA's display language — `id` (the stored
// value) is never translated, only `label`. Falls back to the English
// label above for any reason not yet translated into the target language.
function getRemovalReasons(language) {
    const labels = tGroup("removalReason", language);
    return REMOVAL_REASONS.map((r) => ({ id: r.id, label: labels[r.id] || r.label }));
}
const WINE_TYPE_COLORS = {
    red: "#722F37",
    white: "#F5E6CA",
    rosé: "#E8A0BF",
    sparkling: "#D4E09B",
    dessert: "#DAA520",
    whisky: "#B5651D",
};
// Text colour that reads on a filled WINE_TYPE_COLORS swatch: white on the
// dark ones, a deep shade of the same hue on the pale ones.
const WINE_TYPE_INK = {
    red: "#fff",
    white: "#4a3a1c",
    rosé: "#5c1f3b",
    sparkling: "#3a4614",
    dessert: "#3d2a00",
    whisky: "#fff",
};
// Inline custom properties for a .type-chip (see typeChipStyles in
// styles.ts). "all" and unknown ids get none and keep the wine-red default.
function typeChipStyle(id) {
    const color = WINE_TYPE_COLORS[id];
    if (!color)
        return "";
    return `--chip-color:${color};--chip-tint:${color}33;--chip-glow:${color}66;--chip-ink:${WINE_TYPE_INK[id]}`;
}
const WINE_TYPE_LABELS = {
    red: "Red",
    white: "White",
    rosé: "Rosé",
    sparkling: "Sparkling",
    dessert: "Dessert",
    whisky: "Whisky",
};
// Same labels, translated per HA's display language (src/i18n/{en,fr}.json)
// — falls back to the English WINE_TYPE_LABELS above for a language with
// no catalog yet, or for any type not yet translated within one that
// exists.
function getWineTypeLabels(language) {
    return tGroup("wineType", language);
}
// Field labels that read wrong for a whisky: the producer is a distillery
// (or independent bottler) and the "grape variety" field holds the cask.
function producerLabel(type, language) {
    const t = tGroup("bottleFields", language);
    return type === "whisky" ? t.distillery : t.winery;
}
function varietyLabel(type, short = false, language) {
    const t = tGroup("bottleFields", language);
    if (type === "whisky")
        return t.cask;
    return short ? t.grape : t.grapeVariety;
}
// The [type, label] pairs to offer in a type dropdown or filter chip list —
// "whisky" only when the cellar has opted in (Vivino/AI Settings), so a
// cellar that doesn't track whisky doesn't see it as an option. An existing
// whisky-typed bottle keeps displaying correctly either way; this only
// gates what's *offered*, not what's stored.
function getSelectableWineTypes(enableWhisky, language) {
    const entries = Object.entries(getWineTypeLabels(language));
    return enableWhisky ? entries : entries.filter(([value]) => value !== "whisky");
}
// Every physical (row, col) grid slot in a cabinet, in display order,
// skipping rows configured as bulk/box storage zones.
function getRackSlots(cabinet) {
    const storageRowSet = new Set((cabinet.storage_rows || []).map((sr) => sr.row));
    const slots = [];
    for (let r = 0; r < cabinet.rows; r++) {
        if (storageRowSet.has(r))
            continue;
        for (let c = 0; c < cabinet.cols; c++)
            slots.push({ row: r, col: c });
    }
    return slots;
}
// A precise, human-readable location for a wine: cabinet name, plus the
// zone name and slot number when it's in a bulk bin or wine box, or the
// rack's linear slot number when it's in a grid cell.
function getWineLocation(wine, cabinets, language) {
    const loc = tGroup("wineLocation", language);
    const cabinet = wine.cabinet_id ? cabinets.find((c) => c.id === wine.cabinet_id) || null : null;
    if (!cabinet)
        return { text: loc.unassigned, cabinet: null, zone: "", storageRow: null };
    if (wine.row !== null && wine.col !== null) {
        const slotIdx = getRackSlots(cabinet).findIndex((s) => s.row === wine.row && s.col === wine.col);
        const slotLabel = slotIdx >= 0 ? `${loc.slot} ${slotIdx + 1}` : `R${wine.row + 1}C${wine.col + 1}`;
        return { text: `${cabinet.name} · ${slotLabel}`, cabinet, zone: "", storageRow: null };
    }
    if (wine.zone && wine.zone !== "bottom") {
        const rowIdx = parseInt(wine.zone.replace("storage-", ""), 10);
        const storageRow = (cabinet.storage_rows || []).find((sr) => sr.row === rowIdx) || null;
        const zoneName = storageRow?.name || loc.storage;
        return { text: `${cabinet.name} · ${zoneName} · ${loc.slot} ${(wine.depth || 0) + 1}`, cabinet, zone: wine.zone, storageRow };
    }
    if (wine.zone === "bottom") {
        return { text: `${cabinet.name} · ${cabinet.bottom_zone_name || loc.storage}`, cabinet, zone: "bottom", storageRow: null };
    }
    return { text: cabinet.name, cabinet, zone: "", storageRow: null };
}

/** Resize a base64 JPEG (no data: prefix) to a thumbnail data URL for storage.
 *  640px/0.78 keeps back-label text (small print, appellation info) legible
 *  while staying well within reason for a JSON-embedded data URI — roughly
 *  10x the pixels of the old 200px/0.6 default, still only tens of KB. */
function resizeImageForStorage(base64, maxDim = 640, quality = 0.78) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let w = img.width, h = img.height;
            if (w > h) {
                h = Math.round(h * maxDim / w);
                w = maxDim;
            }
            else {
                w = Math.round(w * maxDim / h);
                h = maxDim;
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            const dataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve(dataUrl);
        };
        img.onerror = () => resolve("");
        img.src = `data:image/jpeg;base64,${base64}`;
    });
}

// Shared search / filter / sort helpers.
//
// The card and the inventory dialog used to carry two separate, silently
// diverging search implementations (6 fields vs 11). Everything text-search
// related now lives here so a field only ever has to be added once.
// Accent-insensitive lowercase: "Côtes" and "cotes", "Rosé" and "rose" must
// match. Home Assistant users type without accents far more often than with.
//
// "œ"/"æ" are ligature letters, not accented letters — Unicode defines no
// canonical (or even compatibility) decomposition for them into "oe"/"ae",
// so NFD/NFKD leaves them untouched on their own. Without the explicit
// replace below, typing "boeuf" (as most keyboards do, since œ isn't a
// normal key) would never match "bœuf", "sœur", "cœur", "œuf", "nœud"...
// stored with the real ligature.
function normalizeText(value) {
    if (value === null || value === undefined)
        return "";
    return String(value)
        .replace(/œ/g, "oe")
        .replace(/Œ/g, "OE")
        .replace(/æ/g, "ae")
        .replace(/Æ/g, "AE")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}
// Free-text search terms that map onto a disposition code rather than onto
// any stored text.
const DISPOSITION_TERMS = {
    drink: "D",
    "drink now": "D",
    hold: "H",
    past: "P",
    peak: "P",
    "past peak": "P",
    "past-peak": "P",
};
// Rebuilding the haystack for every wine on every keystroke is wasteful once
// a cellar gets large; wine objects are replaced wholesale on each reload, so
// a WeakMap keyed on the object stays correct without any invalidation.
const haystackCache = new WeakMap();
function buildHaystack(wine, extra) {
    const tn = wine.tasting_notes;
    const parts = [
        wine.name,
        wine.winery,
        wine.region,
        wine.country,
        wine.grape_variety,
        wine.type,
        wine.vintage,
        wine.notes,
        wine.description,
        wine.food_pairings,
        wine.alcohol,
        wine.barcode,
        wine.drink_by,
        wine.drink_window,
        wine.purchase_date,
        tn?.aroma,
        tn?.taste,
        tn?.finish,
        tn?.overall,
        extra,
    ];
    return parts.map(normalizeText).filter(Boolean).join("\n");
}
function haystackFor(wine, extra) {
    const cached = haystackCache.get(wine);
    if (cached && cached.extra === extra)
        return cached.text;
    const text = buildHaystack(wine, extra);
    haystackCache.set(wine, { extra, text });
    return text;
}
// The cabinet name is searchable too ("kitchen" finds everything stored
// there), which means it has to be resolved before matching.
function cabinetNameFor(wine, cabinets) {
    if (!wine.cabinet_id)
        return "";
    return cabinets.find((c) => c.id === wine.cabinet_id)?.name || "";
}
// Every whitespace-separated token must match somewhere, so "bordeaux 2015"
// finally works — the old single-blob `includes` could never match a query
// spanning two different fields.
function matchesQuery(wine, query, cabinets = []) {
    const normalized = normalizeText(query).trim();
    if (!normalized)
        return true;
    const fullCode = DISPOSITION_TERMS[normalized];
    if (fullCode && wine.disposition === fullCode)
        return true;
    const haystack = haystackFor(wine, normalizeText(cabinetNameFor(wine, cabinets)));
    const tokens = normalized.split(/\s+/).filter(Boolean);
    return tokens.every((token) => {
        if (haystack.includes(token))
            return true;
        const code = DISPOSITION_TERMS[token];
        return !!code && wine.disposition === code;
    });
}
// ── Drink-by ───────────────────────────────────────────────────────────
// `drink_by` is a free-text year ("2028", "drink by 2030") and `drink_window`
// a range ("2025-2028"); both come from the AI, so parse defensively and fall
// back to the end of the window when no explicit year was stored.
function drinkByYear(wine) {
    const explicit = String(wine.drink_by || "").match(/\d{4}/);
    if (explicit)
        return parseInt(explicit[0], 10);
    const windowYears = String(wine.drink_window || "").match(/\d{4}/g);
    if (windowYears && windowYears.length) {
        return parseInt(windowYears[windowYears.length - 1], 10);
    }
    return null;
}
// Wines with no drink-by data sort to the bottom in *both* directions —
// otherwise an ascending sort buries the urgent bottles under every wine
// that was never analyzed.
function compareNullable(a, b, dir, cmp) {
    if (a === null && b === null)
        return 0;
    if (a === null)
        return 1;
    if (b === null)
        return -1;
    return dir * cmp(a, b);
}
// ── Facets ─────────────────────────────────────────────────────────────
// Comma-separated fields (grape varieties, food pairings) are exploded into
// individual values so the filter menus only ever offer what the cellar
// actually contains.
//
// A plain split(",") breaks on every comma, including ones inside a
// parenthetical aside — "Game (deer, venison)" became the two fragments
// "Game (deer" and "venison)" in the filter menu. Commas inside parentheses
// don't separate values, so depth-tracking skips them.
function splitMulti(value) {
    const source = value || "";
    const parts = [];
    let current = "";
    let depth = 0;
    for (const ch of source) {
        if (ch === "(")
            depth++;
        else if (ch === ")")
            depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
            parts.push(current);
            current = "";
        }
        else {
            current += ch;
        }
    }
    parts.push(current);
    return parts.map((v) => v.trim()).filter(Boolean);
}
function collectFacet(wines, pick) {
    const seen = new Map();
    for (const wine of wines) {
        for (const value of pick(wine)) {
            const key = normalizeText(value);
            if (key && !seen.has(key))
                seen.set(key, value);
        }
    }
    return [...seen.values()].sort((a, b) => a.localeCompare(b));
}

// A bin's real capacity: for a box row the sum of its boxes, for a shelf row
// the sum of every level's front+back lanes, otherwise the row's own capacity.
function zoneCapacity(sr) {
    if (sr.type === "box") {
        return (sr.boxes || []).reduce((sum, b) => sum + b, 0) || sr.capacity || 0;
    }
    if (sr.type === "shelf") {
        return (sr.shelf_levels || []).reduce((sum, lvl) => sum + lvl.front + lvl.back, 0) || sr.capacity || 0;
    }
    if (sr.type === "stepped") {
        return (sr.stepped_levels || []).reduce((sum, n) => sum + n, 0) || sr.capacity || 0;
    }
    return sr.capacity || 0;
}
function storageRowFor(cabinet, zone) {
    if (!cabinet || !zone || zone === "bottom")
        return undefined;
    return (cabinet.storage_rows || []).find((sr) => `storage-${sr.row}` === zone);
}
function containerKey(c) {
    return `${c.cabinetId}|${c.zone}|${c.row ?? ""}|${c.col ?? ""}`;
}
function sameContainer(a, b) {
    return containerKey(a) === containerKey(b);
}
// The container a bottle currently sits in, or null when it is unassigned.
function containerOf(wine) {
    if (!wine.cabinet_id)
        return null;
    if (wine.zone === "bottom") {
        return { cabinetId: wine.cabinet_id, kind: "bottom", zone: "bottom", row: null, col: null };
    }
    if (wine.zone) {
        return { cabinetId: wine.cabinet_id, kind: "zone", zone: wine.zone, row: null, col: null };
    }
    if (wine.row !== null && wine.col !== null) {
        return { cabinetId: wine.cabinet_id, kind: "slot", zone: "", row: wine.row, col: wine.col };
    }
    return null;
}
function winesInContainer(c, wines) {
    return wines.filter((w) => {
        const wc = containerOf(w);
        return wc !== null && sameContainer(wc, c);
    });
}
function containerCapacity(c, cabinet) {
    if (!cabinet)
        return 0;
    if (c.kind === "bottom")
        return 0; // unlimited
    if (c.kind === "zone") {
        const sr = storageRowFor(cabinet, c.zone);
        return sr ? zoneCapacity(sr) : 0;
    }
    return cabinet.depth || 1;
}
function containerUsage(c, cabinet, wines) {
    const capacity = containerCapacity(c, cabinet);
    const occupied = new Set(winesInContainer(c, wines).map((w) => w.depth || 0));
    // First free slot rather than "one past the last": a bottle removed from the
    // middle leaves a gap that should be reused, not skipped over.
    let nextDepth = 0;
    while (occupied.has(nextDepth))
        nextDepth++;
    const unlimited = capacity <= 0;
    return {
        used: occupied.size,
        capacity,
        nextDepth,
        free: unlimited ? Infinity : Math.max(0, capacity - occupied.size),
        full: !unlimited && (occupied.size >= capacity || nextDepth >= capacity),
    };
}
// Human-readable name for the container itself — no slot number, since a
// container holds several bottles.
function containerLabel(c, cabinets, language) {
    const loc = tGroup("wineLocation", language);
    const cabinet = cabinets.find((cab) => cab.id === c.cabinetId);
    if (!cabinet)
        return loc.unassigned;
    if (c.kind === "bottom")
        return `${cabinet.name} · ${cabinet.bottom_zone_name || loc.storage}`;
    if (c.kind === "zone") {
        const sr = storageRowFor(cabinet, c.zone);
        const typeLabels = getStorageRowTypeLabels(language);
        return `${cabinet.name} · ${sr?.name || typeLabels[sr?.type || "bulk"]}`;
    }
    const idx = getRackSlots(cabinet).findIndex((s) => s.row === c.row && s.col === c.col);
    const slot = idx >= 0 ? `${loc.slot} ${idx + 1}` : `R${(c.row ?? 0) + 1}C${(c.col ?? 0) + 1}`;
    return `${cabinet.name} · ${slot}`;
}
// Every container in a cabinet, in the order the grid draws them: bins and
// boxes first, then the bottom zone, then the grid slots in reading order.
function containersOf(cabinet) {
    const out = [];
    for (const sr of cabinet.storage_rows || []) {
        out.push({ cabinetId: cabinet.id, kind: "zone", zone: `storage-${sr.row}`, row: null, col: null });
    }
    if (cabinet.has_bottom_zone) {
        out.push({ cabinetId: cabinet.id, kind: "bottom", zone: "bottom", row: null, col: null });
    }
    for (const s of getRackSlots(cabinet)) {
        out.push({ cabinetId: cabinet.id, kind: "slot", zone: "", row: s.row, col: s.col });
    }
    return out;
}
// The wine-shaped patch that puts a bottle into `c`, at its first free depth.
// Returns null when the container has no room left.
function placementIn(c, cabinet, wines) {
    const usage = containerUsage(c, cabinet, wines);
    if (usage.full)
        return null;
    return {
        cabinet_id: c.cabinetId,
        zone: c.zone,
        row: c.row,
        col: c.col,
        depth: usage.nextDepth,
    };
}
// Where each of `count` identical bottles would land, given a chosen
// destination. Returns fewer entries than asked when the destination runs out
// of room, so the caller can clamp rather than silently dropping bottles.
function planSlots(target, cabinets, wines, count) {
    const cabinet = cabinets.find((c) => c.id === target.cabinet_id);
    const unplaced = { row: null, col: null, zone: "", depth: 0 };
    // No rack chosen: the bottles go in unassigned, where nothing can clash.
    if (!cabinet)
        return Array.from({ length: count }, () => ({ ...unplaced }));
    const out = [];
    const placed = [];
    const known = () => [...wines, ...placed];
    const fill = (c) => {
        while (out.length < count) {
            const usage = containerUsage(c, cabinet, known());
            if (usage.full)
                break;
            out.push({ row: c.row, col: c.col, zone: c.zone, depth: usage.nextDepth });
            // Feed each placement back in so the next bottle sees the slot as taken.
            placed.push({
                cabinet_id: c.cabinetId,
                zone: c.zone,
                row: c.row,
                col: c.col,
                depth: usage.nextDepth,
            });
        }
    };
    if (target.zone) {
        const c = {
            cabinetId: cabinet.id,
            kind: target.zone === "bottom" ? "bottom" : "zone",
            zone: target.zone,
            row: null,
            col: null,
        };
        const sr = storageRowFor(cabinet, target.zone);
        // An unlimited container would never stop filling; cap it at the request.
        if (c.kind === "zone" && !sr)
            return out;
        // A slot-addressable zone (shelf/quinconce) has a fixed physical
        // position per depth — the caller picking a specific empty dot must
        // land there, not wherever "first free in the zone" happens to be
        // (which is what fill() below always does, and is exactly right for a
        // bulk/box pile, where there's no such thing as "the dot you clicked").
        if (sr && (sr.type === "shelf" || sr.type === "stepped") && target.depth != null) {
            const capacity = zoneCapacity(sr);
            const taken = new Set(winesInContainer(c, known()).map((w) => w.depth || 0));
            if (target.depth < capacity && !taken.has(target.depth)) {
                out.push({ row: null, col: null, zone: c.zone, depth: target.depth });
                placed.push({ cabinet_id: c.cabinetId, zone: c.zone, row: null, col: null, depth: target.depth });
            }
        }
        fill(c);
        return out;
    }
    // Grid: fill the chosen slot's depths first, then carry on through the
    // rack's remaining slots in reading order — a six-pack should not stop at
    // the first slot just because it only holds one bottle.
    const slots = getRackSlots(cabinet);
    const startIdx = Math.max(0, slots.findIndex((x) => x.row === target.row && x.col === target.col));
    const ordered = [...slots.slice(startIdx), ...slots.slice(0, startIdx)];
    for (const slot of ordered) {
        fill({ cabinetId: cabinet.id, kind: "slot", zone: "", row: slot.row, col: slot.col });
        if (out.length >= count)
            break;
    }
    return out;
}
// Free space at a chosen destination; Infinity when there is no limit.
function freeAt(target, cabinets, wines) {
    const cabinet = cabinets.find((c) => c.id === target.cabinet_id);
    if (!cabinet)
        return Infinity;
    if (target.zone) {
        const c = {
            cabinetId: cabinet.id,
            kind: target.zone === "bottom" ? "bottom" : "zone",
            zone: target.zone,
            row: null,
            col: null,
        };
        if (c.kind === "zone" && !storageRowFor(cabinet, target.zone))
            return 0;
        return containerUsage(c, cabinet, wines).free;
    }
    // No zone: everything still free across the cabinet's grid slots.
    const total = getRackSlots(cabinet).length * (cabinet.depth || 1);
    const used = wines.filter((w) => w.cabinet_id === cabinet.id && w.row !== null && w.col !== null).length;
    return Math.max(0, total - used);
}

const TIER_ORDER = ["same-wine", "same-winery", "same-family"];
const key = (value) => normalizeText(value).trim();
// Names are free text and a good half of them carry the vintage ("Sassicaia
// 2019") or a bottling note ("Margaux 2018 (Case #2)"). Comparing them raw
// would make "same wine, any vintage" almost never fire, which is the one
// tier the user actually cares about.
function cuveeKey(value) {
    return key(value)
        .replace(/\((?:[^()]*)\)/g, " ")
        .replace(/\b(?:19|20)\d{2}\b/g, " ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}
function tierOf(draft, wine) {
    const dName = cuveeKey(draft.name);
    const dWinery = key(draft.winery);
    const wName = cuveeKey(wine.name);
    const wWinery = key(wine.winery);
    // Same wine, any vintage: the cuvée is what identifies it, not the year.
    // With no winery recorded on either side the name has to carry it alone.
    if (dName && dName === wName && (!dWinery || !wWinery || dWinery === wWinery))
        return "same-wine";
    if (dWinery && dWinery === wWinery)
        return "same-winery";
    const dRegion = key(draft.region);
    if (dRegion && dRegion === key(wine.region) && draft.type && draft.type === wine.type) {
        return "same-family";
    }
    return null;
}
function vintageList(wines) {
    const years = Array.from(new Set(wines.map((w) => w.vintage).filter((v) => typeof v === "number"))).sort((a, b) => a - b);
    return years.join(", ");
}
function reasonFor(tier, draft, matches) {
    const n = matches.length;
    const bottles = n === 1 ? "1 bottle" : `${n} bottles`;
    if (tier === "same-wine") {
        const years = vintageList(matches);
        const sameYear = matches.every((w) => w.vintage === draft.vintage);
        if (sameYear)
            return `${bottles} of this exact wine already here`;
        return years ? `${bottles} of this wine here (${years})` : `${bottles} of this wine already here`;
    }
    if (tier === "same-winery") {
        const winery = matches[0]?.winery || draft.winery || "this winery";
        return `${bottles} from ${winery} here`;
    }
    const first = matches[0];
    const region = first?.region || draft.region || "";
    const type = first ? WINE_TYPE_LABELS[first.type] || "" : "";
    return `${bottles} of ${[region, type].filter(Boolean).join(" ")} here`.replace(/\s+/g, " ");
}
// The best place to send the bottle instead, when the natural destination is
// full: somewhere in the same cabinet with room, preferring a container that
// already holds relatives, then simply the nearest one with space.
function alternativeFor(full, cabinet, wines, matchIds) {
    const all = containersOf(cabinet);
    const fullIdx = all.findIndex((c) => sameContainer(c, full));
    const scored = all
        .map((c, idx) => ({ c, idx, usage: containerUsage(c, cabinet, wines) }))
        .filter((x) => !sameContainer(x.c, full) && !x.usage.full)
        .map((x) => ({
        ...x,
        relatives: wines.filter((w) => {
            const wc = containerOf(w);
            return wc !== null && sameContainer(wc, x.c) && matchIds.has(w.id);
        }).length,
    }));
    if (!scored.length)
        return null;
    scored.sort((a, b) => b.relatives - a.relatives ||
        Math.abs(a.idx - fullIdx) - Math.abs(b.idx - fullIdx) ||
        b.usage.free - a.usage.free);
    const best = scored[0];
    return {
        container: best.c,
        label: containerLabel(best.c, [cabinet]),
        free: best.usage.free,
    };
}
// Ranked destinations for a bottle about to be added. Empty when the cellar
// holds nothing related — better to say nothing than to invent a reason.
function suggestDestinations(draft, wines, cabinets, limit = 3) {
    const byContainer = new Map();
    for (const wine of wines) {
        const container = containerOf(wine);
        if (!container)
            continue;
        // Never point at a bin the rack layout no longer knows about: bottles can
        // outlive a deleted storage row, but sending a new one there would be
        // sending it nowhere.
        const cabinet = cabinets.find((c) => c.id === container.cabinetId);
        if (!cabinet)
            continue;
        if (container.kind === "zone" && !storageRowFor(cabinet, container.zone))
            continue;
        if (container.kind === "bottom" && !cabinet.has_bottom_zone)
            continue;
        const tier = tierOf(draft, wine);
        if (!tier)
            continue;
        const k = `${containerKey(container)}::${tier}`;
        const entry = byContainer.get(k);
        if (entry)
            entry.matches.push(wine);
        else
            byContainer.set(k, { container, tier, matches: [wine] });
    }
    // A container reached through several tiers is only worth listing once, at
    // its most specific tier.
    const bestPerContainer = new Map();
    for (const entry of byContainer.values()) {
        const k = containerKey(entry.container);
        const current = bestPerContainer.get(k);
        if (!current || TIER_ORDER.indexOf(entry.tier) < TIER_ORDER.indexOf(current.tier)) {
            bestPerContainer.set(k, entry);
        }
    }
    const ranked = Array.from(bestPerContainer.values()).sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) || b.matches.length - a.matches.length);
    return ranked.slice(0, limit).map((entry) => {
        const cabinet = cabinets.find((c) => c.id === entry.container.cabinetId);
        const usage = containerUsage(entry.container, cabinet, wines);
        const matchIds = new Set(entry.matches.map((w) => w.id));
        return {
            container: entry.container,
            label: containerLabel(entry.container, cabinets),
            usage,
            tier: entry.tier,
            reason: reasonFor(entry.tier, draft, entry.matches),
            matches: entry.matches,
            alternative: usage.full && cabinet ? alternativeFor(entry.container, cabinet, wines, matchIds) : null,
        };
    });
}

const MIN_GROUP_BOTTLES = 3;
const MIN_CONTAINER_BOTTLES = 4;
const DOMINANCE = 0.75;
const MAX_INTRUDERS = 2;
const groupKey = (w) => `${cuveeKey(w.name)}|${normalizeText(w.winery).trim()}`.replace(/^\||\|$/g, "");
// A bottle whose window is closing: explicitly marked drink/past, or carrying a
// drink-by year that has arrived.
function isDrinkSoon(wine) {
    const code = (wine.disposition || "").toUpperCase();
    if (code === "D" || code === "P")
        return true;
    const year = drinkByYear(wine);
    return year !== null && year <= new Date().getFullYear();
}
function isKeeper(wine) {
    return (wine.disposition || "").toUpperCase() === "H" && !isDrinkSoon(wine);
}
// Containers that actually exist in the current rack layout. Bottles can
// outlive a deleted storage row, but proposing a move into one would be
// proposing a move into nothing.
function liveContainers(cabinets) {
    const out = new Map();
    for (const cabinet of cabinets) {
        for (const container of containersOf(cabinet)) {
            out.set(containerKey(container), { container, cabinet });
        }
    }
    return out;
}
function placedWines(wines, live) {
    return wines
        .map((wine) => ({ wine, container: containerOf(wine) }))
        .filter((x) => x.container !== null && live.has(containerKey(x.container)));
}
function dominantType(bottles) {
    const counts = new Map();
    for (const w of bottles)
        counts.set(w.type, (counts.get(w.type) || 0) + 1);
    let best = null;
    let bestCount = 0;
    for (const [type, count] of counts) {
        if (count > bestCount) {
            best = type;
            bestCount = count;
        }
    }
    if (best === null)
        return null;
    return { type: best, share: bestCount / bottles.length };
}
// Bottles of one wine scattered across several places. The fix is real work,
// so only worth raising for a series big enough to be worth gathering.
function findScatter(placed, live, cabinets, wines, language) {
    const groups = new Map();
    for (const entry of placed) {
        const k = groupKey(entry.wine);
        if (!k)
            continue;
        const list = groups.get(k);
        if (list)
            list.push(entry);
        else
            groups.set(k, [entry]);
    }
    const out = [];
    for (const [key, entries] of groups) {
        if (entries.length < MIN_GROUP_BOTTLES)
            continue;
        const byContainer = new Map();
        for (const e of entries) {
            const ck = containerKey(e.container);
            const list = byContainer.get(ck);
            if (list)
                list.push(e);
            else
                byContainer.set(ck, [e]);
        }
        if (byContainer.size < 2)
            continue;
        // Gather towards wherever most of the series already sits, preferring the
        // one that can actually take the rest.
        const candidates = [...byContainer.entries()]
            .map(([ck, held]) => {
            const entry = live.get(ck);
            const strays = entries.length - held.length;
            const usage = containerUsage(entry.container, entry.cabinet, wines);
            return { ck, held, strays, free: usage.free, container: entry.container };
        })
            .sort((a, b) => (b.free >= b.strays ? 1 : 0) - (a.free >= a.strays ? 1 : 0) || b.held.length - a.held.length || b.free - a.free);
        const target = candidates[0];
        if (!target || target.free < 1)
            continue;
        const strays = entries.filter((e) => containerKey(e.container) !== target.ck);
        const movable = strays.slice(0, Number.isFinite(target.free) ? target.free : strays.length);
        if (!movable.length)
            continue;
        const targetLabel = containerLabel(target.container, cabinets, language);
        const name = entries[0].wine.name || entries[0].wine.winery || t$1("ui.arrangement.findings.consolidateFallbackName", language);
        const partial = movable.length < strays.length;
        out.push({
            id: `consolidate:${key}`,
            kind: "consolidate",
            title: t$1("ui.arrangement.findings.consolidateTitle", language, {
                name,
                n: entries.length,
                plural: entries.length === 1 ? "" : "s",
                m: byContainer.size,
                placesPlural: byContainer.size === 1 ? "" : "s",
            }),
            detail: partial
                ? t$1("ui.arrangement.findings.consolidateDetailPartial", language, {
                    targetLabel,
                    held: target.held.length,
                    movable: movable.length,
                    strays: strays.length,
                })
                : t$1("ui.arrangement.findings.consolidateDetailFull", language, {
                    targetLabel,
                    held: target.held.length,
                    movable: movable.length,
                }),
            wines: entries.map((e) => e.wine),
            moves: movable.map((e) => ({
                wine: e.wine,
                from: e.container,
                to: target.container,
                fromLabel: containerLabel(e.container, cabinets, language),
                toLabel: targetLabel,
            })),
        });
    }
    return out;
}
// A bin that is overwhelmingly one kind of wine, with a couple of bottles that
// are not. The bin's purpose was never declared, but at this concentration it
// plainly has one.
function findOutliers(placed, live, cabinets, wines, language) {
    const byContainer = new Map();
    for (const e of placed) {
        const ck = containerKey(e.container);
        const list = byContainer.get(ck);
        if (list)
            list.push(e.wine);
        else
            byContainer.set(ck, [e.wine]);
    }
    // Where each type feels at home, for suggesting somewhere better.
    const homes = new Map();
    for (const [ck, bottles] of byContainer) {
        const dom = dominantType(bottles);
        if (!dom || dom.share < DOMINANCE)
            continue;
        const entry = live.get(ck);
        const list = homes.get(dom.type) || [];
        list.push({ ...entry, count: bottles.filter((w) => w.type === dom.type).length });
        homes.set(dom.type, list);
    }
    const out = [];
    for (const [ck, bottles] of byContainer) {
        if (bottles.length < MIN_CONTAINER_BOTTLES)
            continue;
        const dom = dominantType(bottles);
        if (!dom || dom.share < DOMINANCE)
            continue;
        const intruders = bottles.filter((w) => w.type !== dom.type);
        if (!intruders.length || intruders.length > MAX_INTRUDERS)
            continue;
        const here = live.get(ck);
        const moves = [];
        for (const wine of intruders) {
            const better = (homes.get(wine.type) || [])
                .filter((h) => containerKey(h.container) !== ck)
                .map((h) => ({ ...h, free: containerUsage(h.container, h.cabinet, wines).free }))
                .filter((h) => h.free > 0)
                .sort((a, b) => b.count - a.count || b.free - a.free)[0];
            if (!better)
                continue;
            moves.push({
                wine,
                from: here.container,
                to: better.container,
                fromLabel: containerLabel(here.container, cabinets, language),
                toLabel: containerLabel(better.container, cabinets, language),
            });
        }
        if (!moves.length)
            continue;
        const label = containerLabel(here.container, cabinets, language);
        const typeName = getWineTypeLabels(language)[dom.type] || dom.type;
        out.push({
            id: `outlier:${ck}:${dom.type}`,
            kind: "outlier",
            title: t$1("ui.arrangement.findings.outlierTitle", language, { label, pct: Math.round(dom.share * 100), type: typeName }),
            detail: t$1(intruders.length === 1 ? "ui.arrangement.findings.outlierDetailOne" : "ui.arrangement.findings.outlierDetailMany", language, { n: intruders.length, type: typeName }),
            wines: intruders,
            moves,
        });
    }
    return out;
}
// Whether a container has physically fixed, individually reachable slots
// (a shelf's boards, or a stepped compressor zone's single-depth rows) —
// used to keep them out of the generic front-to-back "buried" check below,
// since neither has anything a bottle could sit "behind" the way a bulk
// bin's pile does.
function isLeveledZone(container, cabinets) {
    if (container.kind !== "zone")
        return false;
    const cabinet = cabinets.find((c) => c.id === container.cabinetId);
    const type = storageRowFor(cabinet, container.zone)?.type;
    return type === "shelf" || type === "stepped";
}
// A shelf zone stacks several independent boards, each with its own
// front/back lanes; a stepped zone stacks several single-depth rows —
// both share one flat depth range per zone (see getShelfSlotGroups /
// getSteppedSlotGroups). Returns null for anything else.
function levelOf(container, cabinets, depth) {
    if (container.kind !== "zone")
        return null;
    const cabinet = cabinets.find((c) => c.id === container.cabinetId);
    const sr = cabinet ? storageRowFor(cabinet, container.zone) : undefined;
    if (!sr)
        return null;
    if (sr.type === "shelf") {
        const group = getShelfSlotGroups(sr.shelf_levels).find((g) => depth >= g.start && depth < g.start + g.size);
        return group ? group.level : null;
    }
    if (sr.type === "stepped") {
        const group = getSteppedSlotGroups(sr.stepped_levels).find((g) => depth >= g.start && depth < g.start + g.size);
        return group ? group.level : null;
    }
    return null;
}
// A bottle whose drinking window is closing, stuck behind or under bottles
// meant to be kept. No move is proposed: freeing it means two bottles trading
// places, and writing that as one-way moves would misdescribe the rack.
//
// Shelf and stepped zones are excluded here: a shelf board slides out on
// rails (front/back lanes are equally reachable) and a stepped zone is only
// ever one bottle deep — neither has anything a bottle sits "behind". Their
// actual accessibility concern is which stacked level a bottle sits on,
// handled separately by findWrongLevel.
function findBuried(placed, cabinets, language) {
    const byContainer = new Map();
    for (const e of placed) {
        const ck = containerKey(e.container);
        const list = byContainer.get(ck);
        if (list)
            list.push(e);
        else
            byContainer.set(ck, [e]);
    }
    const out = [];
    for (const entries of byContainer.values()) {
        if (entries.length < 2)
            continue;
        if (isLeveledZone(entries[0].container, cabinets))
            continue;
        for (const e of entries) {
            if (!isDrinkSoon(e.wine))
                continue;
            const depth = e.wine.depth || 0;
            const inFront = entries.filter((o) => (o.wine.depth || 0) < depth && isKeeper(o.wine));
            if (!inFront.length)
                continue;
            const label = containerLabel(e.container, cabinets, language);
            const year = drinkByYear(e.wine);
            const name = e.wine.name || t$1("ui.arrangement.findings.buriedFallbackName", language);
            out.push({
                id: `buried:${e.wine.id}`,
                kind: "buried",
                title: year
                    ? t$1("ui.arrangement.findings.buriedTitleWithYear", language, { name, year })
                    : t$1("ui.arrangement.findings.buriedTitleNoYear", language, { name }),
                detail: t$1(inFront.length === 1 ? "ui.arrangement.findings.buriedDetailOne" : "ui.arrangement.findings.buriedDetailMany", language, { slot: depth + 1, label, n: inFront.length }),
                wines: [e.wine, ...inFront.map((o) => o.wine)],
                moves: [],
            });
        }
    }
    return out;
}
// A leveled-zone accessibility concern: when a shelf has 2+ stacked boards,
// or a stepped compressor zone has 2+ stacked rows, the lower ones are more
// work to reach than the higher ones (unlike front vs back on a shelf, which
// the sliding board makes equally reachable — see findBuried above). Flags a
// bottle due soon sitting on a lower level while a bottle marked to keep sits
// on a higher one in the same zone.
function findWrongLevel(placed, cabinets, language) {
    const byContainer = new Map();
    for (const e of placed) {
        const ck = containerKey(e.container);
        const list = byContainer.get(ck);
        if (list)
            list.push(e);
        else
            byContainer.set(ck, [e]);
    }
    const out = [];
    for (const entries of byContainer.values()) {
        const first = entries[0];
        if (!isLeveledZone(first.container, cabinets))
            continue;
        const cabinet = cabinets.find((c) => c.id === first.container.cabinetId);
        const sr = cabinet ? storageRowFor(cabinet, first.container.zone) : undefined;
        const levelCount = sr?.type === "shelf"
            ? (sr.shelf_levels || []).length
            : sr?.type === "stepped"
                ? (sr.stepped_levels || []).length
                : 0;
        if (levelCount < 2)
            continue;
        for (const e of entries) {
            if (!isDrinkSoon(e.wine))
                continue;
            const myLevel = levelOf(e.container, cabinets, e.wine.depth || 0);
            if (myLevel === null)
                continue;
            const aboveKeepers = entries.filter((o) => {
                const oLevel = levelOf(o.container, cabinets, o.wine.depth || 0);
                return oLevel !== null && oLevel > myLevel && isKeeper(o.wine);
            });
            if (!aboveKeepers.length)
                continue;
            const label = containerLabel(e.container, cabinets, language);
            const year = drinkByYear(e.wine);
            const name = e.wine.name || t$1("ui.arrangement.findings.buriedFallbackName", language);
            out.push({
                id: `wrongLevel:${e.wine.id}`,
                kind: "buried",
                title: year
                    ? t$1("ui.arrangement.findings.buriedTitleWithYear", language, { name, year })
                    : t$1("ui.arrangement.findings.buriedTitleNoYear", language, { name }),
                detail: t$1(aboveKeepers.length === 1 ? "ui.arrangement.findings.wrongLevelDetailOne" : "ui.arrangement.findings.wrongLevelDetailMany", language, { label, n: aboveKeepers.length }),
                wines: [e.wine, ...aboveKeepers.map((o) => o.wine)],
                moves: [],
            });
        }
    }
    return out;
}
const KIND_ORDER = ["consolidate", "outlier", "buried"];
// Everything the cellar's own arrangement disagrees about, minus what the user
// has waved off for good.
function analyzeArrangement(wines, cabinets, dismissed = [], language) {
    const live = liveContainers(cabinets);
    const placed = placedWines(wines, live);
    const hidden = new Set(dismissed);
    return [
        ...findScatter(placed, live, cabinets, wines, language),
        ...findOutliers(placed, live, cabinets, wines, language),
        ...findBuried(placed, cabinets, language),
        ...findWrongLevel(placed, cabinets, language),
    ]
        .filter((f) => !hidden.has(f.id))
        .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
}

function getSections(language) {
    return [
        {
            kind: "consolidate",
            title: t$1("ui.arrangement.sectionScatteredTitle", language),
            blurb: t$1("ui.arrangement.sectionScatteredBlurb", language),
        },
        {
            kind: "outlier",
            title: t$1("ui.arrangement.sectionOutlierTitle", language),
            blurb: t$1("ui.arrangement.sectionOutlierBlurb", language),
        },
        {
            kind: "buried",
            title: t$1("ui.arrangement.sectionBuriedTitle", language),
            blurb: t$1("ui.arrangement.sectionBuriedBlurb", language),
        },
    ];
}
// The arrangement report. Deliberately a place you visit rarely — after
// scanning a cellar in, mostly — and leave empty once the moves are done.
//
// Every move is applied only when the user says it happened. The database
// follows the bottles, never the other way around: renumbering a rack the
// moment a suggestion is generated would make every later "where is it"
// a lie.
let ArrangementDialog = class ArrangementDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.open = false;
        this.wines = [];
        this.cabinets = [];
        this.dismissed = [];
        this._busy = "";
        this._error = "";
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    get _findings() {
        return analyzeArrangement(this.wines, this.cabinets, this.dismissed, this.hass?.language);
    }
    // Apply every move in a finding, then tell the card to reload. Moves are
    // sequential on purpose: each one consumes a slot the next one might have
    // been aiming at.
    async _applyMoves(finding) {
        this._busy = finding.id;
        this._error = "";
        try {
            let known = [...this.wines];
            for (const move of finding.moves) {
                const cabinet = this.cabinets.find((c) => c.id === move.to.cabinetId);
                // Re-derive the landing slot per move rather than trusting the depth
                // the analysis saw: earlier moves in this same batch have taken slots
                // since, and the cellar may have changed under us.
                const patch = placementIn(move.to, cabinet, known.filter((w) => w.id !== move.wine.id));
                if (!patch) {
                    this._error = this._t("ui.arrangement.moveFailedFull", { label: move.toLabel });
                    break;
                }
                await this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: move.wine.id,
                    cabinet_id: patch.cabinet_id,
                    row: patch.row ?? undefined,
                    col: patch.col ?? undefined,
                    zone: patch.zone,
                    depth: patch.depth,
                });
                known = known.map((w) => (w.id === move.wine.id ? { ...w, ...patch } : w));
            }
            this.dispatchEvent(new CustomEvent("moves-applied", { bubbles: true, composed: true }));
        }
        catch (err) {
            this._error = this._t("ui.arrangement.moveRecordError", { detail: err?.message || err });
        }
        finally {
            this._busy = "";
        }
    }
    _dismiss(finding) {
        this.dispatchEvent(new CustomEvent("dismiss-finding", {
            detail: { id: finding.id },
            bubbles: true,
            composed: true,
        }));
    }
    _renderMove(move) {
        return b$1 `
      <div class="arr-move">
        <span>${move.wine.name || this._t("ui.arrangement.bottleFallback")}${move.wine.vintage ? ` ${move.wine.vintage}` : ""}</span>
        <span class="arr-move-where">${move.fromLabel}</span>
        <span class="arr-move-arrow">→</span>
        <span class="arr-move-where">${move.toLabel}</span>
      </div>
    `;
    }
    _renderFinding(finding) {
        const busy = this._busy === finding.id;
        return b$1 `
      <div class="arr-finding">
        <div class="arr-title">${finding.title}</div>
        <div class="arr-detail">${finding.detail}</div>
        ${finding.moves.length
            ? b$1 `<div class="arr-moves">${finding.moves.map((m) => this._renderMove(m))}</div>`
            : A$1}
        <div class="arr-actions">
          ${finding.moves.length
            ? b$1 `
                <button class="btn btn-primary" ?disabled=${busy} @click=${() => this._applyMoves(finding)}>
                  ${busy
                ? this._t("ui.arrangement.recordingBtn")
                : finding.moves.length === 1
                    ? this._t("ui.arrangement.movedOneBtn")
                    : this._t("ui.arrangement.movedAllBtn", { n: finding.moves.length })}
                </button>
              `
            : A$1}
          <button class="btn btn-outline" ?disabled=${busy} @click=${() => this._dismiss(finding)}>
            ${finding.moves.length ? this._t("ui.arrangement.leaveAsIsBtn") : this._t("ui.arrangement.notedBtn")}
          </button>
        </div>
      </div>
    `;
    }
    render() {
        if (!this.open)
            return A$1;
        const findings = this._findings;
        return b$1 `
      <div class="dialog-overlay" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>
        <div class="dialog" style="max-width:620px" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(() => this.dispatchEvent(new CustomEvent("close")), this._t("ui.common.close"))}
          <div class="dialog-header">${this._t("ui.arrangement.header")}</div>

          <div class="dialog-body">
            ${findings.length === 0
            ? b$1 `
                  <div class="arr-empty">
                    ${this._t("ui.arrangement.emptyState")}
                  </div>
                `
            : b$1 `
                  <div class="arr-intro">
                    ${this._t("ui.arrangement.intro")}
                  </div>
                  ${getSections(this.hass?.language).map((section) => {
                const inSection = findings.filter((f) => f.kind === section.kind);
                if (!inSection.length)
                    return A$1;
                return b$1 `
                      <div class="arr-section">
                        <div class="arr-section-title">${section.title}</div>
                        <div class="arr-section-blurb">${section.blurb}</div>
                        ${inSection.map((f) => this._renderFinding(f))}
                      </div>
                    `;
            })}
                `}
            ${this._error ? b$1 `<div class="arr-error">${this._error}</div>` : A$1}
          </div>

          <div class="dialog-footer">
            <button class="btn btn-outline" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>
              ${this._t("ui.common.close")}
            </button>
          </div>
        </div>
      </div>
    `;
    }
};
ArrangementDialog.styles = [
    sharedStyles,
    i$4 `
      .arr-intro {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        margin-bottom: 14px;
      }

      .arr-section {
        margin-bottom: 18px;
      }

      .arr-section-title {
        font-weight: 600;
        font-size: 0.9em;
        margin-bottom: 2px;
      }

      .arr-section-blurb {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .arr-finding {
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        padding: 10px 12px;
        margin-bottom: 8px;
      }

      .arr-title {
        font-weight: 600;
        font-size: 0.88em;
      }

      .arr-detail {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-top: 3px;
      }

      .arr-moves {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .arr-move {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78em;
        flex-wrap: wrap;
      }

      .arr-move-where {
        color: var(--wc-text-secondary);
      }

      .arr-move-arrow {
        opacity: 0.6;
      }

      .arr-actions {
        margin-top: 10px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .arr-empty {
        text-align: center;
        padding: 28px 12px;
        color: var(--wc-text-secondary);
        font-size: 0.9em;
      }

      .arr-error {
        color: #c62828;
        font-size: 0.8em;
        margin-top: 8px;
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ type: Boolean })
], ArrangementDialog.prototype, "open", void 0);
__decorate([
    n$1({ attribute: false })
], ArrangementDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], ArrangementDialog.prototype, "wines", void 0);
__decorate([
    n$1({ attribute: false })
], ArrangementDialog.prototype, "cabinets", void 0);
__decorate([
    n$1({ attribute: false })
], ArrangementDialog.prototype, "dismissed", void 0);
__decorate([
    r$1()
], ArrangementDialog.prototype, "_busy", void 0);
__decorate([
    r$1()
], ArrangementDialog.prototype, "_error", void 0);
ArrangementDialog = __decorate([
    t$2("arrangement-dialog")
], ArrangementDialog);

// "Chambering" = bringing a bottle from its storage zone's temperature up to
// its ideal serving temperature. This module turns a zone's live sensor, a
// wine's serving_temp, and the chambering room's sensor into simple, honest
// advice. A "zone" here is a whole rack card (a Cabinet) — sensors are set
// per rack, not per shelf or bin inside it.
function readSensorValue(hass, entityId) {
    if (!entityId || !hass?.states)
        return null;
    const state = hass.states[entityId];
    if (!state || state.state === "unavailable" || state.state === "unknown")
        return null;
    const value = parseFloat(state.state);
    return Number.isFinite(value) ? value : null;
}
// Parses "16-18°C" / "16°C" / "16-18" / "16" — lenient on purpose since this
// is an AI-filled free-text field, not a structured one. Always returns °C:
// a value marked °F (typed by hand in a US home) is converted.
function parseServingTemp(servingTemp) {
    if (!servingTemp)
        return null;
    // No leading sign: serving temperatures are never sub-zero in practice,
    // and allowing one would make parseServingTemp("16-18°C") misread the
    // range's own hyphen as a minus sign on 18 (giving -18, not 18).
    const numbers = (servingTemp.match(/\d+(?:[.,]\d+)?/g) || []).map((n) => parseFloat(n.replace(",", ".")));
    if (numbers.length === 0 || numbers.some((n) => !Number.isFinite(n)))
        return null;
    const toC = /°\s*F|\dF\b/i.test(servingTemp) ? fToC : (n) => n;
    const [a, b] = numbers.length === 1 ? [numbers[0], numbers[0]] : [numbers[0], numbers[1]];
    return { low: toC(Math.min(a, b)), high: toC(Math.max(a, b)) };
}
const cToF = (c) => (c * 9) / 5 + 32;
const fToC = (f) => ((f - 32) * 5) / 9;
// Whether temperatures should be shown in °F: Home Assistant's own unit
// system (Settings > System > General), not anything the card configures.
function usesFahrenheit(hass) {
    return hass?.config?.unit_system?.temperature === "°F";
}
// A serving temperature for display, in the unit Home Assistant uses.
// Stored values are °C (that's what the AI writes); text that doesn't parse
// as a temperature is shown as typed.
function formatServingTemp(servingTemp, hass) {
    const range = parseServingTemp(servingTemp);
    if (!range)
        return servingTemp || "";
    const f = usesFahrenheit(hass);
    const show = (c) => String(Math.round(f ? cToF(c) : c));
    const unit = f ? "°F" : "°C";
    const low = show(range.low);
    const high = show(range.high);
    return low === high ? `${low}${unit}` : `${low}-${high}${unit}`;
}
// A temperature sensor's reading in °C, whatever unit it reports in. A US
// Home Assistant reports °F, while serving temperatures and the warm-up
// math below are in °C.
function readTemperatureC(hass, entityId) {
    const value = readSensorValue(hass, entityId);
    if (value === null)
        return null;
    const unit = hass.states[entityId]?.attributes?.unit_of_measurement;
    return unit === "°F" ? fToC(value) : value;
}
function getChamberingAdvice(wine, cabinet, hass, roomSensorEntityId, timeConstantMinutes, equilibrationHours) {
    const range = parseServingTemp(wine.serving_temp);
    if (!range)
        return null;
    const cellarTemp = readTemperatureC(hass, cabinet?.temp_sensor_entity_id || "");
    if (cellarTemp === null)
        return null;
    if (wine.location_updated_at) {
        const movedAt = new Date(wine.location_updated_at).getTime();
        if (Number.isFinite(movedAt)) {
            const hoursInZone = (Date.now() - movedAt) / 3_600_000;
            if (hoursInZone < equilibrationHours)
                return null;
        }
    }
    if (cellarTemp >= range.low && cellarTemp <= range.high) {
        return { status: "ready" };
    }
    if (cellarTemp > range.high) {
        return { status: "chill" };
    }
    // cellarTemp < range.low: the bottle warms towards the room's temperature.
    // Newton's law of heating: T(t) = room - (room - cellar) * exp(-t / tau),
    // so reaching `target` takes t = tau * ln((room - cellar) / (room - target)).
    // A warmer room therefore means a shorter wait, and the bottle can never
    // pass the room temperature — a target at or above it is unreachable.
    const roomTemp = readTemperatureC(hass, roomSensorEntityId);
    if (roomTemp === null || !(timeConstantMinutes > 0))
        return null;
    // Aim for the middle of the serving range; if the room is too close to (or
    // below) that, settle for the bottom of the range. The margin keeps the
    // logarithm finite when the target is barely under the room temperature.
    const margin = 0.5;
    const targetTemp = [(range.low + range.high) / 2, range.low].find((t) => t <= roomTemp - margin);
    if (targetTemp === undefined)
        return null;
    const minutes = timeConstantMinutes * Math.log((roomTemp - cellarTemp) / (roomTemp - targetTemp));
    return { status: "warm_up", minutes: Math.max(0, Math.round(minutes / 5) * 5) };
}
// "90 minutes" -> "1h30"
function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0)
        return `${m}min`;
    if (m === 0)
        return `${h}h`;
    return `${h}h${String(m).padStart(2, "0")}`;
}

let CabinetGrid = class CabinetGrid extends i$1 {
    constructor() {
        super(...arguments);
        this.wines = [];
        // Set briefly by "locate" so the bottle is marked on the rack drawing too,
        // not just in the side panel's slot list.
        this.highlightWineId = null;
        // Candidates for a pending Vivino removal: every listed bottle gets an
        // orange ring so the user can see which ones may be the removed bottle.
        this.removalHighlightIds = [];
        // Set for as long as a long-press move is pending (Android's stand-in
        // for drag-and-drop) — dims that one bottle so it's clear which one is
        // "picked up" and waiting for a target tap, until the move completes or
        // is cancelled. Deliberately its own reactive class, not the .drag-source
        // that _onDragStart/_onDragEnd toggle: that one only tracks a real HTML5
        // drag gesture, which touch-and-hold can trigger by accident without
        // ever firing a matching dragend (see _onTouchEnd's own cleanup) — tying
        // the "picked up" look to _movingWine's own lifecycle instead means it
        // can't desync from either end of that.
        this.movingWineId = null;
        // "letter" (default): the classic D/H/P badge. "dot": a plain colored
        // circle with no letter (green/blue/purple) — a settings-level choice,
        // not per-bottle.
        this.dispositionDisplay = "letter";
        this._dragOverCell = null;
        // --- Long press (mobile move) ---
        this._longPressTimer = null;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    _getWinesAt(row, col) {
        return this.wines.filter((w) => w.cabinet_id === this.cabinet.id && w.row === row && w.col === col);
    }
    _getStorageRowSet() {
        const rows = this.cabinet.storage_rows;
        return new Set((rows || []).map((sr) => sr.row));
    }
    _getStorageRowConfig(row) {
        const rows = this.cabinet.storage_rows;
        return (rows || []).find((s) => s.row === row);
    }
    _getStorageRowName(row) {
        return this._getStorageRowConfig(row)?.name || this._t("wineLocation.storage");
    }
    _getBottomZoneWines() {
        return this.wines.filter((w) => w.cabinet_id === this.cabinet.id && w.zone === "bottom");
    }
    // The sensor's own unit (°F in a US home), not an assumed °C.
    _tempUnit() {
        const id = this.cabinet.temp_sensor_entity_id || "";
        return this.hass?.states?.[id]?.attributes?.unit_of_measurement || "°C";
    }
    // Live temperature/humidity of the zone, shown in its title banner.
    _renderSensorBadge() {
        const temp = readSensorValue(this.hass, this.cabinet.temp_sensor_entity_id || "");
        const humidity = readSensorValue(this.hass, this.cabinet.humidity_sensor_entity_id || "");
        if (temp === null && humidity === null)
            return A$1;
        return b$1 `
      <span class="zone-sensor-badge">
        ${temp !== null ? b$1 `🌡️ ${temp}${this._tempUnit()}` : A$1}${temp !== null && humidity !== null ? " · " : A$1}${humidity !== null ? b$1 `💧 ${humidity}%` : A$1}
      </span>
    `;
    }
    _getStorageRowWines(row) {
        return this.wines
            .filter((w) => w.cabinet_id === this.cabinet.id && w.zone === `storage-${row}`)
            .sort((a, b) => (a.depth || 0) - (b.depth || 0));
    }
    _onCellClick(row, col, wine, wineCount = 0, cabinetDepth = 1, wines = []) {
        this.dispatchEvent(new CustomEvent("cell-click", {
            detail: {
                cabinet: this.cabinet,
                row,
                col,
                wine,
                wines,
                wineCount,
                cabinetDepth,
            },
            bubbles: true,
            composed: true,
        }));
    }
    _onZoneClick(wine, zone = "bottom", depth) {
        this.dispatchEvent(new CustomEvent("zone-click", {
            detail: {
                cabinet: this.cabinet,
                zone,
                wine,
                // Set only for zones with per-slot addressing (shelf): the exact
                // slot clicked, so the card places/pastes there instead of
                // picking a depth itself.
                depth,
            },
            bubbles: true,
            composed: true,
        }));
    }
    _onZoneContainerClick(zone, storageRow) {
        this.dispatchEvent(new CustomEvent("zone-container-click", {
            detail: {
                cabinet: this.cabinet,
                zone,
                storageRow,
            },
            bubbles: true,
            composed: true,
        }));
    }
    _brightenColor(hex) {
        // Make wine type colors brighter for the ring border
        const brightMap = {
            "#722F37": "#c44d58", // red → brighter red
            "#F5E6CA": "#fff8e8", // white → bright cream
            "#E8A0BF": "#f5c0d8", // rosé → brighter pink
            "#D4E09B": "#e8f0b8", // sparkling → brighter green
            "#DAA520": "#f0c040", // dessert → brighter gold
            "#B5651D": "#d9843a", // whisky → brighter amber
        };
        return brightMap[hex] || hex;
    }
    _isInPeakWindow(wine) {
        if (!wine?.peak_window)
            return false;
        const currentYear = new Date().getFullYear();
        const years = wine.peak_window.split("-").map(y => parseInt(y, 10));
        if (years.length === 1)
            return currentYear === years[0];
        if (years.length === 2)
            return currentYear >= years[0] && currentYear <= years[1];
        return false;
    }
    // Check if wine is in peak window OR after (plateau d'apogée) — keep dark green until decline phase
    _isInOrAfterPeakWindow(wine) {
        if (!wine?.peak_window || !wine?.drink_window)
            return false;
        const currentYear = new Date().getFullYear();
        const peakYears = wine.peak_window.split("-").map(y => parseInt(y, 10));
        const drinkYears = wine.drink_window.split("-").map(y => parseInt(y, 10));
        const peakStart = peakYears[0];
        const drinkEnd = drinkYears.length === 2 ? drinkYears[1] : drinkYears[0];
        return currentYear >= peakStart && currentYear <= drinkEnd;
    }
    // The "Drink"/"Hold"/"Past" pill — only in "letter" mode. In "dot" mode
    // there's no badge at all; _dispositionRingStyle below draws the status
    // as a thicker colored ring around the bottle instead, so the photo
    // stays uncovered.
    _dispositionBadge(dispClass, disp, wine, className = "disposition") {
        if (!dispClass || this.dispositionDisplay === "dot")
            return A$1;
        const peakClass = dispClass === "drink" && this._isInOrAfterPeakWindow(wine) ? "peak" : "";
        // Both are rendered; a container query picks the letter when the bottle
        // is too small for the word (a dense rack in the all-racks view).
        return b$1 `<span class="${className} ${dispClass} ${peakClass}"><span class="disp-word">${this._t(`ui.disposition.${dispClass}`)}</span><span class="disp-letter">${disp}</span></span>`;
    }
    // "dot" mode's ring: a thicker border colored by disposition (green/blue/
    // purple) instead of the classic centered badge — the whole point is to
    // leave the bottle's own photo unobstructed. Every bottle in this mode
    // gets the same border thickness, whether or not it has a disposition
    // set, so bottle size doesn't jump around depending on which bottles
    // happen to have one; with no disposition, the ring just falls back to
    // the existing wine-type color instead of introducing a new color.
    // Returns "" in "letter" mode, leaving the class's own CSS untouched.
    _dispositionRingStyle(dispClass, typeRingColor, wine) {
        if (this.dispositionDisplay !== "dot")
            return "";
        let color = "#4caf50"; // drink default
        if (dispClass === "drink") {
            color = this._isInOrAfterPeakWindow(wine) ? "#1b5e20" : "#4caf50";
        }
        else if (dispClass === "hold") {
            color = "#2196f3";
        }
        else if (dispClass === "past") {
            color = "#c62828";
        }
        else {
            color = typeRingColor;
        }
        return `border: 4px solid ${color};`;
    }
    _onTouchStart(wine) {
        this._longPressTimer = window.setTimeout(() => {
            this._longPressTimer = null;
            this.dispatchEvent(new CustomEvent("wine-longpress", {
                detail: { wine, cabinet: this.cabinet },
                bubbles: true,
                composed: true,
            }));
        }, 500);
    }
    // draggable="true" plus a touch-and-hold can make some Android browsers
    // start a real HTML5 drag on their own from this same touch sequence,
    // even though nothing here calls dragstart deliberately — _onDragStart
    // then adds .drag-source (dimmed + shrunk), but the matching dragend
    // that would remove it is unreliable on touch and often never fires,
    // leaving the bottle stuck looking "picked up" regardless of whether the
    // long-press move that followed was completed or cancelled. Touch ending
    // (released or cancelled by a scroll) is always a safe point to clear it
    // too, on this same element.
    _onTouchEnd(e) {
        if (this._longPressTimer !== null) {
            clearTimeout(this._longPressTimer);
            this._longPressTimer = null;
        }
        e?.currentTarget?.classList.remove("drag-source");
    }
    _onTouchMove(e) {
        if (this._longPressTimer !== null) {
            clearTimeout(this._longPressTimer);
            this._longPressTimer = null;
        }
        e?.currentTarget?.classList.remove("drag-source");
    }
    // --- Drag and drop ---
    _onDragStart(e, wine, row, col, zone) {
        if (!e.dataTransfer)
            return;
        e.dataTransfer.setData("text/plain", JSON.stringify({
            wineId: wine.id,
            cabinetId: this.cabinet.id,
            row: row ?? null,
            col: col ?? null,
            zone: zone || "",
            depth: wine.depth ?? null,
        }));
        e.dataTransfer.effectAllowed = "move";
        e.currentTarget.classList.add("drag-source");
    }
    _onDragEnd(e) {
        e.currentTarget.classList.remove("drag-source");
        this._dragOverCell = null;
    }
    _onDragOver(e, key) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
        this._dragOverCell = key;
    }
    _onDragLeave(_e) {
        this._dragOverCell = null;
    }
    _onDrop(e, targetRow, targetCol, targetZone, targetWine, explicitDepth) {
        e.preventDefault();
        this._dragOverCell = null;
        if (!e.dataTransfer)
            return;
        try {
            const source = JSON.parse(e.dataTransfer.getData("text/plain"));
            // Slot zones (shelf) pass their own exact depth — the drop target
            // IS the slot, so skip the "nearest chip" reorder heuristic used
            // for freeform bulk-zone drops and let the card swap/place exactly
            // there instead of picking a depth itself.
            if (explicitDepth !== undefined) {
                this.dispatchEvent(new CustomEvent("wine-drop", {
                    detail: {
                        wineId: source.wineId,
                        sourceCabinetId: source.cabinetId,
                        sourceRow: source.row,
                        sourceCol: source.col,
                        sourceZone: source.zone,
                        sourceDepth: source.depth ?? null,
                        targetCabinetId: this.cabinet.id,
                        targetRow: null,
                        targetCol: null,
                        targetZone: targetZone || "",
                        targetWineId: targetWine?.id ?? null,
                        targetDepth: explicitDepth,
                        explicitDepth: true,
                    },
                    bubbles: true,
                    composed: true,
                }));
                return;
            }
            // Bulk-zone reordering: figure out which bottle the drop landed
            // nearest to (and which half of it), so dropping anywhere in the zone
            // reorders sensibly instead of only working when the cursor lands
            // exactly on a chip — small chips are hard to hit precisely.
            let effectiveTargetWine = targetWine;
            let insertBefore = true;
            if (effectiveTargetWine) {
                const rect = e.currentTarget.getBoundingClientRect();
                insertBefore = e.clientX < rect.left + rect.width / 2;
            }
            else if (targetZone) {
                const container = e.currentTarget;
                const chips = Array.from(container.querySelectorAll(".zone-bottle"));
                let nearest = null;
                let nearestDist = Infinity;
                for (const chip of chips) {
                    if (chip.dataset.wineId === source.wineId)
                        continue;
                    const rect = chip.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const dist = Math.abs(e.clientX - cx);
                    if (dist < nearestDist) {
                        nearestDist = dist;
                        nearest = chip;
                    }
                }
                if (nearest) {
                    const rect = nearest.getBoundingClientRect();
                    insertBefore = e.clientX < rect.left + rect.width / 2;
                    effectiveTargetWine = this.wines.find((w) => w.id === nearest.dataset.wineId);
                }
            }
            this.dispatchEvent(new CustomEvent("wine-drop", {
                detail: {
                    wineId: source.wineId,
                    sourceCabinetId: source.cabinetId,
                    sourceRow: source.row,
                    sourceCol: source.col,
                    sourceZone: source.zone,
                    targetCabinetId: this.cabinet.id,
                    targetRow: targetRow ?? null,
                    targetCol: targetCol ?? null,
                    targetZone: targetZone || "",
                    // When dropping on/near another bottle within the same bulk
                    // zone, carry its id + which side the drop landed on, so the
                    // card can insert relative to it instead of treating it as a
                    // same-zone no-op.
                    targetWineId: effectiveTargetWine?.id ?? null,
                    targetDepth: effectiveTargetWine ? (effectiveTargetWine.depth ?? 0) : null,
                    insertBefore,
                },
                bubbles: true,
                composed: true,
            }));
        }
        catch { /* ignore bad data */ }
    }
    _renderStorageZone(row) {
        const sr = this._getStorageRowConfig(row);
        // No generic "Storage" filler when unnamed — the icon and count already
        // say what this is; an unnamed zone just shows those two.
        const zoneName = sr?.name || "";
        const zoneType = sr?.type || "bulk";
        const capacity = sr?.capacity || 20;
        const zoneId = `storage-${row}`;
        const wines = this._getStorageRowWines(row);
        const zoneKey = `zone-${zoneId}`;
        const isDragOver = this._dragOverCell === zoneKey;
        if (zoneType === "box") {
            return this._renderBoxZone(zoneId, zoneKey, zoneName, capacity, wines, isDragOver, sr);
        }
        if (zoneType === "shelf") {
            return this._renderShelfZone(zoneId, zoneKey, zoneName, capacity, wines, isDragOver, sr);
        }
        if (zoneType === "stepped") {
            return this._renderSteppedZone(zoneId, zoneKey, zoneName, wines, sr);
        }
        // Default: bulk
        return this._renderBulkZone(zoneId, zoneKey, zoneName, capacity, wines, isDragOver, sr);
    }
    _renderBulkZone(zoneId, zoneKey, name, capacity, wines, isDragOver, sr) {
        return b$1 `
      <div class="bottom-zone ${isDragOver ? "drag-over" : ""}"
        @click=${() => sr ? this._onZoneContainerClick(zoneId, sr) : this._onZoneClick(undefined, zoneId)}
        @dragover=${(e) => this._onDragOver(e, zoneKey)}
        @dragleave=${(e) => this._onDragLeave(e)}
        @drop=${(e) => this._onDrop(e, undefined, undefined, zoneId)}>
        ${name ? b$1 `<div class="bottom-zone-label">${name}</div>` : A$1}
        ${wines.map((wine) => {
            const disp = wine.disposition || "";
            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
            const bottleKey = `${zoneKey}-${wine.id}`;
            const bgColor = WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red;
            return b$1 `
            <div
              class="zone-bottle ${this._dragOverCell === bottleKey ? "drag-over" : ""} ${wine.id === this.highlightWineId ? "locate-highlight" : ""} ${this.removalHighlightIds.includes(wine.id) ? "removal-highlight" : ""} ${wine.id === this.movingWineId ? "move-source" : ""}"
              style="background: ${bgColor};${this._dispositionRingStyle(dispClass, this._brightenColor(bgColor), wine)}"
              data-wine-id="${wine.id}"
              draggable="true"
              @click=${(e) => {
                e.stopPropagation();
                this._onZoneClick(wine, zoneId);
            }}
              @dragstart=${(e) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, zoneId); }}
              @dragend=${(e) => this._onDragEnd(e)}
              @dragover=${(e) => { e.stopPropagation(); this._onDragOver(e, bottleKey); }}
              @dragleave=${(e) => { e.stopPropagation(); this._onDragLeave(e); }}
              @drop=${(e) => { e.stopPropagation(); this._onDrop(e, undefined, undefined, zoneId, wine); }}
              @touchstart=${(e) => { e.stopPropagation(); this._onTouchStart(wine); }}
              @touchend=${(e) => this._onTouchEnd(e)}
              @touchmove=${(e) => this._onTouchMove(e)}
              title="${wine.name} (${wine.vintage || "NV"})"
            >
              ${(wine.vintage || "NV").toString().slice(-2)}
              ${this._dispositionBadge(dispClass, disp, wine)}
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderBoxZone(zoneId, zoneKey, name, capacity, wines, isDragOver, sr) {
        const boxes = sr.boxes || [capacity];
        let offset = 0;
        const boxSegments = boxes.map((boxSize) => {
            const start = offset;
            offset += boxSize;
            const boxWines = wines.filter((w) => {
                const d = w.depth || 0;
                return d >= start && d < start + boxSize;
            });
            return {
                size: boxSize,
                start,
                wineCount: boxWines.length,
                hasHighlight: !!this.highlightWineId && boxWines.some((w) => w.id === this.highlightWineId),
                hasRemoval: this.removalHighlightIds.length > 0 &&
                    boxWines.some((w) => this.removalHighlightIds.includes(w.id)),
            };
        });
        return b$1 `
      <div class="bottom-zone zone-box-row ${isDragOver ? "drag-over" : ""}"
        @click=${() => this._onZoneContainerClick(zoneId, sr)}
        @dragover=${(e) => this._onDragOver(e, zoneKey)}
        @dragleave=${(e) => this._onDragLeave(e)}
        @drop=${(e) => this._onDrop(e, undefined, undefined, zoneId)}>
        ${name ? b$1 `<div class="bottom-zone-label">${name}</div>` : A$1}
        <div class="zone-box-grid">
          ${boxSegments.map((seg) => b$1 `
            <div class="zone-box-item ${seg.wineCount > 0 ? "has-wine" : ""} ${seg.hasHighlight ? "locate-highlight" : ""} ${seg.hasRemoval ? "removal-highlight" : ""}">
              <div class="zone-box-shape">
                <div class="box-lid"></div>
                <div class="box-body"><span class="box-count">${seg.wineCount}/${seg.size}</span></div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
    }
    // Fridge-style shelf: one or more physical boards stacked bottom-to-top,
    // each with its own front and back lane. Every slot has a fixed physical
    // position (unlike a bulk/box pile), so — like a classic grid cell —
    // each dot is its own click/drag/drop target: click an empty one to add
    // there, click an occupied one to open it, drop exactly on the dot you
    // choose. There is no zone side panel for shelves.
    _renderShelfZone(zoneId, zoneKey, name, capacity, wines, isDragOver, sr) {
        const levelsData = sr.shelf_levels || [];
        const groups = getShelfSlotGroups(levelsData);
        const byLevel = new Map();
        for (const g of groups) {
            const entry = byLevel.get(g.level) || {};
            entry[g.lane] = g;
            byLevel.set(g.level, entry);
        }
        // Level 0 is the bottom board (see models.ts) — reverse for display,
        // since flex-direction: column lays out children top-to-bottom.
        const levels = Array.from(byLevel.entries()).sort((a, b) => b[0] - a[0]);
        // One dot size for the whole shelf, sized off whichever level packs the
        // most "weight" into its single interleaved row — front dots count as
        // 1, back dots (rendered at sqrt(0.5) width — half *area*, see
        // BACK_DOT_SCALE below) count as that same fraction, since that's how
        // much horizontal room each actually needs. Using the old two-separate-
        // rows maxCount here (just the bigger of front/back alone) badly
        // undersized this: a row now holds front+back dots combined, not
        // whichever lane was longer, so every dot rendered at roughly double
        // the width it does now, overflowing the frame by that same factor.
        let dominantWeight = 1;
        let dominantItems = 1;
        for (const l of levelsData) {
            const weight = l.front + l.back * Math.SQRT1_2;
            if (weight > dominantWeight) {
                dominantWeight = weight;
                dominantItems = l.front + l.back;
            }
        }
        // Subtracts that level's own gaps, plus a fixed 8px so the row's total
        // width comes out a little under 100% — centered by .zone-shelf-lane's
        // justify-content, that shortfall becomes a ~4px margin on each side
        // instead of the end dots sitting flush against the cabinet's frame.
        const dotBasis = `calc((100% - ${(dominantItems - 1) * 2 + 8}px) / ${dominantWeight})`;
        // EXPERIMENTAL — see conversation 2026-09-14, planned to be rolled back
        // if it doesn't work out. Interleaves the back lane's dots between the
        // front lane's, at half *surface area*, in one row instead of two
        // labeled ones — meant to roughly halve each board's height. Area
        // scales with the square of the linear dimension, so halving the area
        // means scaling width/height by sqrt(0.5), not by 0.5 itself (which
        // would halve the diameter and leave only a quarter of the area).
        // Nothing about shelf_levels/front/back/name config changes, only how
        // this one zone renders.
        const BACK_DOT_SCALE = Math.SQRT1_2;
        const renderDot = (group, indexInGroup, scale) => {
            const depth = group.start + indexInGroup;
            const dotKey = `${zoneKey}-${depth}`;
            const wine = wines.find((w) => (w.depth || 0) === depth);
            const bg = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
            const ring = wine ? this._brightenColor(bg) : "";
            const disp = wine?.disposition || "";
            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
            const basis = scale === 1 ? dotBasis : `calc(${dotBasis} * ${scale})`;
            return b$1 `<span
        class="zone-shelf-dot ${wine ? "filled" : ""} ${this._dragOverCell === dotKey ? "drag-over" : ""} ${wine && wine.id === this.highlightWineId ? "locate-highlight" : ""} ${wine && this.removalHighlightIds.includes(wine.id) ? "removal-highlight" : ""} ${wine && wine.id === this.movingWineId ? "move-source" : ""}"
        style="flex-basis:${basis};max-width:${basis}${wine ? `;background:${bg};--bottle-type-color:${ring};${this._dispositionRingStyle(dispClass, ring, wine)}` : ""}"
        title="${wine ? `${wine.name} (${wine.vintage || "NV"})` : ""}"
        draggable=${wine ? "true" : "false"}
        @click=${(e) => { e.stopPropagation(); this._onZoneClick(wine, zoneId, depth); }}
        @dragstart=${wine ? (e) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, zoneId); } : A$1}
        @dragend=${(e) => this._onDragEnd(e)}
        @dragover=${(e) => { e.stopPropagation(); this._onDragOver(e, dotKey); }}
        @dragleave=${(e) => { e.stopPropagation(); this._onDragLeave(e); }}
        @drop=${(e) => { e.stopPropagation(); this._onDrop(e, undefined, undefined, zoneId, wine, depth); }}
        @touchstart=${wine ? (e) => { e.stopPropagation(); this._onTouchStart(wine); } : A$1}
        @touchend=${(e) => this._onTouchEnd(e)}
        @touchmove=${(e) => this._onTouchMove(e)}
      >${wine?.image_url ? b$1 `<img class="wine-thumb" src="${wine.image_url}" alt="" />` : A$1}${this._dispositionBadge(dispClass, disp, wine)}</span>`;
        };
        // Whichever lane is longer leads the sequence (its dot comes first at
        // each position), with the shorter one nested right after — any surplus
        // of the longer lane tacked on at the end. On a swapped level (back=4,
        // front=3), that means position 1 is a back dot, not front. Scale
        // always follows the lane itself (front=1, back=BACK_DOT_SCALE),
        // regardless of which one leads.
        const renderInterleavedLane = (front, back) => {
            const frontSize = front?.size || 0;
            const backSize = back?.size || 0;
            const frontLeads = frontSize >= backSize;
            const items = [];
            for (let i = 0; i < Math.max(frontSize, backSize); i++) {
                if (frontLeads) {
                    if (i < frontSize)
                        items.push(renderDot(front, i, 1));
                    if (i < backSize)
                        items.push(renderDot(back, i, BACK_DOT_SCALE));
                }
                else {
                    if (i < backSize)
                        items.push(renderDot(back, i, BACK_DOT_SCALE));
                    if (i < frontSize)
                        items.push(renderDot(front, i, 1));
                }
            }
            return b$1 `<div class="zone-shelf-lane">${items}</div>`;
        };
        return b$1 `
      <div class="bottom-zone zone-shelf">
        ${name ? b$1 `<div class="bottom-zone-label">${name}</div>` : A$1}
        <div class="zone-shelf-levels">
          ${levels.map(([, lanes], idx) => b$1 `
            <div class="zone-shelf-level ${idx === levels.length - 1 ? "last" : ""}">
              ${renderInterleavedLane(lanes.front, lanes.back)}
            </div>
          `)}
        </div>
      </div>
    `;
    }
    // Compressor-bump zone: the shallow, single-depth area above a fridge's
    // compressor, where bottles lie one deep and each row above the bottom one
    // nests into the gaps of the row below (see getSteppedLevels in models.ts).
    // Reuses the shelf zone's dot styling — visually it's the same idea, one
    // lane per level instead of two — but each level here is its own
    // individually-addressable row, same as a shelf board, not a front/back
    // pair, so there's no lane split or label.
    _renderSteppedZone(zoneId, zoneKey, name, wines, sr) {
        const levelsData = sr.stepped_levels || [];
        const groups = getSteppedSlotGroups(levelsData);
        const maxCount = Math.max(1, ...levelsData);
        // See the same calc() in _renderShelfZone: accounts for the lane's own
        // gaps, plus a fixed margin so the end dots don't sit flush against the
        // cabinet's frame.
        const dotBasis = `calc((100% - ${(maxCount - 1) * 2 + 8}px) / ${maxCount})`;
        const renderDots = (group) => b$1 `
      <div class="zone-shelf-lane">
        ${Array.from({ length: group.size }, (_, i) => {
            const depth = group.start + i;
            const dotKey = `${zoneKey}-${depth}`;
            const wine = wines.find((w) => (w.depth || 0) === depth);
            const bg = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
            const ring = wine ? this._brightenColor(bg) : "";
            const disp = wine?.disposition || "";
            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
            return b$1 `<span
            class="zone-shelf-dot ${wine ? "filled" : ""} ${this._dragOverCell === dotKey ? "drag-over" : ""} ${wine && wine.id === this.highlightWineId ? "locate-highlight" : ""} ${wine && this.removalHighlightIds.includes(wine.id) ? "removal-highlight" : ""} ${wine && wine.id === this.movingWineId ? "move-source" : ""}"
            style="flex-basis:${dotBasis};max-width:${dotBasis}${wine ? `;background:${bg};--bottle-type-color:${ring};${this._dispositionRingStyle(dispClass, ring, wine)}` : ""}"
            title="${wine ? `${wine.name} (${wine.vintage || "NV"})` : ""}"
            draggable=${wine ? "true" : "false"}
            @click=${(e) => { e.stopPropagation(); this._onZoneClick(wine, zoneId, depth); }}
            @dragstart=${wine ? (e) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, zoneId); } : A$1}
            @dragend=${(e) => this._onDragEnd(e)}
            @dragover=${(e) => { e.stopPropagation(); this._onDragOver(e, dotKey); }}
            @dragleave=${(e) => { e.stopPropagation(); this._onDragLeave(e); }}
            @drop=${(e) => { e.stopPropagation(); this._onDrop(e, undefined, undefined, zoneId, wine, depth); }}
            @touchstart=${wine ? (e) => { e.stopPropagation(); this._onTouchStart(wine); } : A$1}
            @touchend=${(e) => this._onTouchEnd(e)}
            @touchmove=${(e) => this._onTouchMove(e)}
          >${wine?.image_url ? b$1 `<img class="wine-thumb" src="${wine.image_url}" alt="" />` : A$1}${this._dispositionBadge(dispClass, disp, wine)}</span>`;
        })}
      </div>
    `;
        // Level 0 is the bottom row (see models.ts) — reverse for display, since
        // flex-direction: column lays out children top-to-bottom.
        const reversed = [...groups].sort((a, b) => b.level - a.level);
        return b$1 `
      <div class="bottom-zone zone-shelf">
        ${name ? b$1 `<div class="bottom-zone-label">${name}</div>` : A$1}
        <div class="zone-shelf-levels">
          ${reversed.map((group, idx) => b$1 `
            <div class="zone-shelf-level ${idx === reversed.length - 1 ? "last" : ""}">
              ${renderDots(group)}
            </div>
          `)}
        </div>
      </div>
    `;
    }
    _renderGridRow(row, cols) {
        const cabinetDepth = this.cabinet.depth || 1;
        return b$1 `
      <div class="row">
        ${Array.from({ length: cols }, (_, col) => {
            const wines = this._getWinesAt(row, col);
            const wineCount = wines.length;
            const frontWine = wines.length > 0
                ? wines.sort((a, b) => (a.depth || 0) - (b.depth || 0))[0]
                : undefined;
            const bgColor = frontWine
                ? WINE_TYPE_COLORS[frontWine.type] || WINE_TYPE_COLORS.red
                : "transparent";
            const disp = frontWine?.disposition || "";
            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
            const ratingDisplay = frontWine?.rating ? frontWine.rating.toFixed(1) : "";
            const ringColor = frontWine ? this._brightenColor(bgColor) : "";
            const cellKey = `${row}-${col}`;
            const isDragOver = this._dragOverCell === cellKey;
            const isHighlighted = !!this.highlightWineId && wines.some((w) => w.id === this.highlightWineId);
            const isRemovalCandidate = this.removalHighlightIds.length > 0 &&
                wines.some((w) => this.removalHighlightIds.includes(w.id));
            const isMoving = !!this.movingWineId && wines.some((w) => w.id === this.movingWineId);
            return b$1 `
            <div
              class="cell ${frontWine ? "filled" : "empty"} ${isDragOver ? "drag-over" : ""} ${isHighlighted ? "locate-highlight" : ""} ${isRemovalCandidate ? "removal-highlight" : ""} ${isMoving ? "move-source" : ""}"
              style=${frontWine ? `background: ${bgColor}; --bottle-type-color: ${ringColor};${this._dispositionRingStyle(dispClass, ringColor, frontWine)}` : ""}
              draggable=${frontWine ? "true" : "false"}
              @click=${() => this._onCellClick(row, col, frontWine, wineCount, cabinetDepth, wines)}
              @touchstart=${frontWine ? () => this._onTouchStart(frontWine) : A$1}
              @touchend=${frontWine ? (e) => this._onTouchEnd(e) : A$1}
              @touchmove=${frontWine ? (e) => this._onTouchMove(e) : A$1}
              @dragstart=${frontWine ? (e) => this._onDragStart(e, frontWine, row, col) : A$1}
              @dragend=${frontWine ? (e) => this._onDragEnd(e) : A$1}
              @dragover=${(e) => this._onDragOver(e, cellKey)}
              @dragleave=${(e) => this._onDragLeave(e)}
              @drop=${(e) => this._onDrop(e, row, col)}
              title=${frontWine
                ? `${frontWine.name} (${frontWine.vintage || "NV"})${frontWine.rating ? ` ★${frontWine.rating}` : ""}${wineCount > 1 ? ` [${wineCount}/${cabinetDepth} deep]` : ""}`
                : this._t("ui.card.emptyCellTitle", { row: row + 1, col: col + 1 })}
            >
              ${frontWine
                ? b$1 `
                    ${frontWine.image_url ? b$1 `<img class="wine-thumb" src="${frontWine.image_url}" alt="" />` : A$1}
                    <span class="bottle-label">${frontWine.vintage || "NV"}</span>
                    ${this._dispositionBadge(dispClass, disp, frontWine)}
                    ${ratingDisplay ? b$1 `<span class="rating-badge">★${ratingDisplay}</span>` : A$1}
                    ${wineCount > 1 ? b$1 `<span class="depth-badge">${wineCount}</span>` : A$1}
                    ${cabinetDepth >= 2
                    ? b$1 `
                          <span class="depth-dots">
                            ${Array.from({ length: cabinetDepth }, (_, d) => {
                        const wineAtDepth = wines.find((w) => (w.depth || 0) === d);
                        const dotColor = wineAtDepth
                            ? WINE_TYPE_COLORS[wineAtDepth.type] || WINE_TYPE_COLORS.red
                            : "";
                        return b$1 `<span
                                class="depth-dot ${wineAtDepth ? "" : "empty"}"
                                style=${wineAtDepth ? `background: ${dotColor}` : ""}
                              ></span>`;
                    })}
                          </span>
                        `
                    : A$1}
                  `
                : cabinetDepth >= 2 && wineCount === 0
                    ? b$1 `
                      <span class="depth-dots">
                        ${Array.from({ length: cabinetDepth }, () => b$1 `<span class="depth-dot empty"></span>`)}
                      </span>
                    `
                    : A$1}
            </div>
          `;
        })}
      </div>
    `;
    }
    _renderCell(row, col) {
        const cabinetDepth = this.cabinet.depth || 1;
        const wines = this._getWinesAt(row, col);
        const wineCount = wines.length;
        const frontWine = wines.length > 0
            ? wines.sort((a, b) => (a.depth || 0) - (b.depth || 0))[0]
            : undefined;
        const bgColor = frontWine
            ? WINE_TYPE_COLORS[frontWine.type] || WINE_TYPE_COLORS.red
            : "transparent";
        const disp = frontWine?.disposition || "";
        const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
        const ratingDisplay = frontWine?.rating ? frontWine.rating.toFixed(1) : "";
        const ringColor = frontWine ? this._brightenColor(bgColor) : "";
        const cellKey = `${row}-${col}`;
        const isDragOver = this._dragOverCell === cellKey;
        return b$1 `
      <div
        class="cell ${frontWine ? "filled" : "empty"} ${isDragOver ? "drag-over" : ""}"
        style=${frontWine ? `background: ${bgColor}; --bottle-type-color: ${ringColor};${this._dispositionRingStyle(dispClass, ringColor, frontWine)}` : ""}
        draggable=${frontWine ? "true" : "false"}
        @click=${() => this._onCellClick(row, col, frontWine, wineCount, cabinetDepth, wines)}
        @touchstart=${frontWine ? () => this._onTouchStart(frontWine) : A$1}
        @touchend=${frontWine ? (e) => this._onTouchEnd(e) : A$1}
        @touchmove=${frontWine ? (e) => this._onTouchMove(e) : A$1}
        @dragstart=${frontWine ? (e) => this._onDragStart(e, frontWine, row, col) : A$1}
        @dragend=${frontWine ? (e) => this._onDragEnd(e) : A$1}
        @dragover=${(e) => this._onDragOver(e, cellKey)}
        @dragleave=${(e) => this._onDragLeave(e)}
        @drop=${(e) => this._onDrop(e, row, col)}
        title=${frontWine
            ? `${frontWine.name} (${frontWine.vintage || "NV"})${frontWine.rating ? ` ★${frontWine.rating}` : ""}${wineCount > 1 ? ` [${wineCount}/${cabinetDepth} deep]` : ""}`
            : this._t("ui.card.emptyCellTitle", { row: row + 1, col: col + 1 })}
      >
        ${frontWine
            ? b$1 `
              ${frontWine.image_url ? b$1 `<img class="wine-thumb" src="${frontWine.image_url}" alt="" />` : A$1}
              <span class="bottle-label">${frontWine.vintage || "NV"}</span>
              ${this._dispositionBadge(dispClass, disp, frontWine)}
              ${ratingDisplay ? b$1 `<span class="rating-badge">★${ratingDisplay}</span>` : A$1}
              ${wineCount > 1 ? b$1 `<span class="depth-badge">${wineCount}</span>` : A$1}
              ${cabinetDepth >= 2
                ? b$1 `
                    <span class="depth-dots">
                      ${Array.from({ length: cabinetDepth }, (_, d) => {
                    const wineAtDepth = wines.find((w) => (w.depth || 0) === d);
                    const dotColor = wineAtDepth
                        ? WINE_TYPE_COLORS[wineAtDepth.type] || WINE_TYPE_COLORS.red
                        : "";
                    return b$1 `<span
                          class="depth-dot ${wineAtDepth ? "" : "empty"}"
                          style=${wineAtDepth ? `background: ${dotColor}` : ""}
                        ></span>`;
                })}
                    </span>
                  `
                : A$1}
            `
            : cabinetDepth >= 2 && wineCount === 0
                ? b$1 `
                <span class="depth-dots">
                  ${Array.from({ length: cabinetDepth }, () => b$1 `<span class="depth-dot empty"></span>`)}
                </span>
              `
                : A$1}
      </div>
    `;
    }
    _onRackClick() {
        this.dispatchEvent(new CustomEvent("rack-click", {
            detail: { cabinet: this.cabinet },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const { rows, cols } = this.cabinet;
        const storageRows = this._getStorageRowSet();
        const hasGridRows = Array.from({ length: rows }, (_, row) => row).some((row) => !storageRows.has(row));
        // Shelf racks have no row/col slots of their own, but the title should
        // still open the equivalent browsable panel (handled by the card,
        // which tells the two apart from the cabinet's own storage_rows).
        const hasShelfRows = (this.cabinet.storage_rows || []).some((sr) => sr.type === "shelf");
        const titleClickable = hasGridRows || hasShelfRows;
        return b$1 `
      <div class="cabinet">
        <div
          class="cabinet-name ${titleClickable ? "clickable" : ""}"
          @click=${titleClickable ? () => this._onRackClick() : A$1}
          title=${titleClickable ? this._t("ui.card.reorderRackTitle") : ""}
        >${this.cabinet.name}${this._renderSensorBadge()}</div>
        <div class="grid-inner">
          ${Array.from({ length: rows }, (_, row) => storageRows.has(row)
            ? this._renderStorageZone(row)
            : this._renderGridRow(row, cols))}
        </div>
        ${this.cabinet.has_bottom_zone
            ? b$1 `
              <div class="bottom-zone ${this._dragOverCell === "zone-bottom" ? "drag-over" : ""}"
                @click=${() => this._onZoneClick()}
                @dragover=${(e) => this._onDragOver(e, "zone-bottom")}
                @dragleave=${(e) => this._onDragLeave(e)}
                @drop=${(e) => this._onDrop(e, undefined, undefined, "bottom")}>
                <div class="bottom-zone-label">
                  ${this.cabinet.bottom_zone_name}
                </div>
                ${this._getBottomZoneWines().map((wine) => b$1 `
                    <div
                      class="zone-bottle"
                      style="background: ${WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red}"
                      draggable="true"
                      @click=${(e) => {
                e.stopPropagation();
                this._onZoneClick(wine);
            }}
                      @dragstart=${(e) => { e.stopPropagation(); this._onDragStart(e, wine, undefined, undefined, "bottom"); }}
                      @dragend=${(e) => this._onDragEnd(e)}
                      title="${wine.name}"
                    >
                      ${(wine.vintage || "NV").toString().slice(-2)}
                    </div>
                  `)}
              </div>
            `
            : A$1}
      </div>
    `;
    }
};
CabinetGrid.styles = [
    sharedStyles,
    i$4 `
      :host {
        display: block;
      }

      .cabinet {
        background: linear-gradient(135deg, #8b6914 0%, #c4973b 50%, #8b6914 100%);
        border-radius: 12px;
        padding: 8px;
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3),
          0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .cabinet-name {
        text-align: center;
        color: #f5e6ca;
        font-size: 0.8em;
        font-weight: 600;
        padding: 4px 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      .cabinet-name.clickable {
        cursor: pointer;
        border-radius: 6px;
      }

      .cabinet-name.clickable:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .grid-inner {
        background: linear-gradient(180deg, #1a1a3a 0%, #0d0d2b 100%);
        border-radius: 8px;
        padding: 6px;
        position: relative;
        overflow: hidden;
      }

      /* Blue LED glow effect */
      .grid-inner::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          ellipse at center,
          rgba(50, 100, 255, 0.15) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .row {
        display: flex;
        gap: 2px;
        margin-bottom: 2px;
        padding: 0 4px;
        box-sizing: border-box;
        position: relative;
      }

      /* Scalloped shelf appearance */
      .row::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6b5010 0%, #a07828 50%, #6b5010 100%);
        border-radius: 0 0 2px 2px;
      }

      .cell {
        flex: 1;
        aspect-ratio: 1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
        min-width: 0;
        z-index: 1;
        container-type: inline-size;
        box-sizing: border-box;
      }

      .cell.empty {
        background: rgba(255, 255, 255, 0.05);
        /* Same 2px width as .filled below — see the longer note on
           .zone-shelf-dot's empty state for why this has to match. */
        border: 2px dashed rgba(255, 255, 255, 0.15);
      }

      .cell.empty:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .cell.filled {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3),
          0 0 8px rgba(50, 100, 255, 0.15);
        border: 2px solid var(--bottle-type-color, rgba(255, 255, 255, 0.1));
        overflow: hidden;
      }

      .cell .wine-thumb,
      .zone-shelf-dot .wine-thumb {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .cell.filled:hover {
        transform: scale(1.15);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5),
          0 0 16px rgba(50, 100, 255, 0.3);
      }

      .cell .bottle-label {
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 6px;
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 40px;
        display: none;
        pointer-events: none;
      }

      .cell.filled:hover .bottle-label {
        display: block;
      }

      /* "Locate" marker: a pulsing ring drawn outside the element so it
         reads on a filled bottle, an empty slot and a box alike. */
      .locate-highlight {
        position: relative;
        z-index: 3;
        outline: 2px solid rgba(255, 193, 7, 0.9);
        outline-offset: 1px;
        animation: locatePulse 1.2s ease-in-out 3;
        border-radius: inherit;
      }

      @keyframes locatePulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          outline: 2px solid rgba(255, 193, 7, 0.9);
          outline-offset: 1px;
        }
        50% {
          box-shadow: 0 0 10px 4px rgba(255, 193, 7, 0.65);
          outline: 2px solid rgba(255, 193, 7, 1);
          outline-offset: 2px;
        }
      }

      /* Pending-Vivino-removal candidate: a steady orange ring that pulses
         for as long as the choice is active (unlike the 3-cycle locate). */
      .removal-highlight {
        position: relative;
        z-index: 3;
        outline: 2px solid rgba(255, 109, 0, 0.95);
        outline-offset: 1px;
        animation: removalPulse 1.2s ease-in-out infinite;
        border-radius: inherit;
      }

      @keyframes removalPulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(255, 109, 0, 0);
        }
        50% {
          box-shadow: 0 0 10px 4px rgba(255, 109, 0, 0.65);
        }
      }

      .cell .disposition,
      .zone-shelf-dot .disposition {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 65%;
        height: 65%;
        border-radius: 50%;
        font-size: clamp(7px, 30cqi, 14px);
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 2;
        pointer-events: none;
        line-height: 1;
        border: 2px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
      }

      .cell .disposition.drink,
      .zone-bottle .disposition.drink,
      .zone-shelf-dot .disposition.drink {
        background: #2e7d32;
      }

      .cell .disposition.drink.peak,
      .zone-bottle .disposition.drink.peak,
      .zone-shelf-dot .disposition.drink.peak {
        background: #1b5e20;
        font-weight: 600;
      }

      .cell .disposition.hold,
      .zone-bottle .disposition.hold,
      .zone-shelf-dot .disposition.hold {
        background: #1565c0;
      }

      .cell .disposition.past,
      .zone-bottle .disposition.past,
      .zone-shelf-dot .disposition.past {
        background: #c62828;
      }

      .cell .rating-badge {
        position: absolute;
        bottom: -2px;
        right: -2px;
        font-size: 6px;
        font-weight: 700;
        color: #fff;
        background: rgba(0,0,0,0.6);
        border-radius: 4px;
        padding: 1px 3px;
        z-index: 2;
        pointer-events: none;
        line-height: 1;
        display: none;
      }

      .cell.filled:hover .rating-badge {
        display: block;
      }

      .cell .depth-badge {
        position: absolute;
        top: -2px;
        left: -2px;
        font-size: 7px;
        font-weight: 700;
        color: #fff;
        background: rgba(30, 136, 229, 0.85);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      }

      .depth-dots {
        position: absolute;
        /* Clear of the Drink/Hold/Past pill along the bottom edge. */
        bottom: 26%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 3px;
        z-index: 3;
        pointer-events: none;
      }

      .depth-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
      }

      .depth-dot.empty {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .bottom-zone {
        margin-top: 8px;
        background: linear-gradient(135deg, #6b5010 0%, #8b6914 100%);
        border-radius: 6px;
        padding: 8px;
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }

      .bottom-zone-label {
        font-size: 0.65em;
        color: rgba(255, 255, 255, 0.6);
        width: 100%;
        text-align: center;
      }

      .zone-sensor-badge {
        display: block;
        font-size: 0.75em;
        font-weight: 400;
        opacity: 0.85;
      }

      .zone-bottle {
        position: relative;
        width: 28px;
        height: 28px;
        /* Sizes its Drink/Hold/Past pill (cqi) like a rack cell's. */
        container-type: inline-size;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }

      .zone-bottle .disposition {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68%;
        height: 68%;
        border-radius: 50%;
        font-size: 9px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 2;
        pointer-events: none;
        line-height: 1;
        border: 1.5px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }

      /* A short text pill ("Drink"/"Hold"/"Past") along the bottom edge
         instead of a letter covering the middle of the label. Same colors
         as the badge; only the shape and position change. */
      .cell .disposition,
      .zone-bottle .disposition,
      .zone-shelf-dot .disposition {
        top: auto;
        bottom: 4%;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        height: auto;
        max-width: 92%;
        padding: 2px 6px;
        border-radius: 999px;
        border-width: 1px;
        font-size: clamp(7px, 16cqi, 11px);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .disposition .disp-letter {
        display: none;
      }

      /* Too small for a word: back to the round letter badge. */
      @container (max-width: 25px) {
        .disposition .disp-word {
          display: none;
        }
        .disposition .disp-letter {
          display: inline;
        }
        .cell .disposition,
        .zone-bottle .disposition,
        .zone-shelf-dot .disposition {
          bottom: auto;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 68%;
          height: 68%;
          max-width: none;
          padding: 0;
          border-radius: 50%;
          font-size: 9px;
          font-weight: 700;
        }
      }

      .zone-bottle:hover {
        transform: scale(1.1);
      }

      /* Fridge-style shelf: front/back lanes per board. Every dot in the
         shelf shares one size (set inline from the longest lane anywhere
         in it), so a shorter lane is centered with wider gaps instead of
         rendering smaller dots — deliberately not the receding-stagger
         look of a real photographed shelf. Background is dark like the
         classic grid's interior, with each board getting its own
         golden ledge (matching .row::after) instead of the whole zone
         being solid gold. */
      .zone-shelf {
        background: linear-gradient(180deg, #1a1a3a 0%, #0d0d2b 100%);
      }

      .zone-shelf-levels {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        padding: 2px 0;
      }

      .zone-shelf-level {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: relative;
        padding-bottom: 5px;
      }

      /* Board-to-board seam within the SAME étagère: thin, since it's just
         marking where one stacked board ends and the next begins. */
      .zone-shelf-level::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 20%;
        right: 20%;
        height: 1px;
        background: linear-gradient(90deg, #6b5010 0%, #a07828 50%, #6b5010 100%);
        opacity: 0.6;
      }

      /* The bottom-most board of the étagère: this ledge marks the end of
         the whole étagère (before the next one), so it stays full-width
         and full weight instead of the thin board-to-board seam above. */
      .zone-shelf-level.last::after {
        left: 0;
        right: 0;
        height: 3px;
        opacity: 1;
        border-radius: 0 0 2px 2px;
      }

      .zone-shelf-lane {
        display: flex;
        justify-content: center;
        /* Without this, flex's default align-items: stretch forces every
           dot in the row to the tallest one's height regardless of its own
           width — harmless when every dot in a lane is the same size, but
           the interleaved half-size back dots (see _renderShelfZone) got
           stretched into tall ovals instead of staying circular. */
        align-items: center;
        gap: 2px;
        width: 100%;
      }

      .zone-shelf-lane-label {
        font-size: 0.8em;
        font-weight: 600;
        line-height: 1.2;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      }

      /* Same empty/filled treatment as a classic grid cell — a faint,
         dashed outline when empty, a solid ring in the wine's colour
         when filled — rather than the paler, always-visible dot this
         used to be. Hover/drag-over states below deliberately mirror
         .cell's exactly, so a shelf dot enlarges on hover/drag-over the
         same way a grid cell does. */
      .zone-shelf-dot {
        position: relative;
        flex-shrink: 0;
        aspect-ratio: 1;
        min-width: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        /* Same border width as .filled below (2px) — only the dash pattern,
           color and opacity change between empty/filled. A thinner empty
           border would shrink the box itself under content-box sizing, and
           even with box-sizing: border-box (below) a visibly thinner ring
           still reads as a smaller circle next to a bold filled one. */
        border: 2px dashed rgba(255, 255, 255, 0.15);
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        container-type: inline-size;
        z-index: 1;
        transition: all 0.2s;
      }

      .zone-shelf-dot:not(.filled):hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .zone-shelf-dot.filled {
        border: 2px solid var(--bottle-type-color, rgba(255, 255, 255, 0.1));
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3),
          0 0 8px rgba(50, 100, 255, 0.15);
      }

      .zone-shelf-dot.filled:hover {
        transform: scale(1.15);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5),
          0 0 16px rgba(50, 100, 255, 0.3);
      }

      .zone-shelf-dot[draggable="true"] {
        cursor: grab;
      }

      .zone-shelf-dot[draggable="true"]:active {
        cursor: grabbing;
      }

      .zone-shelf-dot.drag-source {
        opacity: 0.35;
        transform: scale(0.9);
      }

      .zone-shelf-dot.drag-over {
        box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.8);
        transform: scale(1.1);
        background: rgba(66, 165, 245, 0.15) !important;
        z-index: 10;
      }

      /* Drag and drop */
      .cell.drag-source {
        opacity: 0.35;
        transform: scale(0.9);
      }

      /* The one bottle picked up by a long-press, waiting for a target tap
         (see movingWineId) — deliberately lighter than .drag-source and no
         scale change, so it doesn't look like it's about to disappear: this
         state can sit there indefinitely until the user taps a target or
         cancels, unlike an actual drag in progress. */
      .cell.move-source,
      .zone-bottle.move-source,
      .zone-shelf-dot.move-source {
        opacity: 0.5;
      }

      .cell.drag-over {
        box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.8);
        transform: scale(1.1);
        background: rgba(66, 165, 245, 0.15) !important;
        z-index: 10;
      }

      .cell[draggable="true"] {
        cursor: grab;
      }

      .cell[draggable="true"]:active {
        cursor: grabbing;
      }

      .zone-bottle.drag-over {
        box-shadow: 0 0 0 2px rgba(66, 165, 245, 0.8);
        transform: scale(1.15);
      }

      .bottom-zone.drag-over {
        box-shadow: inset 0 0 0 2px rgba(66, 165, 245, 0.8);
        background: rgba(66, 165, 245, 0.1);
      }

      .zone-count {
        font-weight: 400;
        opacity: 0.7;
        margin-left: 4px;
      }

      .zone-fill-dots {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
      }

      .zone-fill-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
      }

      .zone-fill-dot.empty {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .zone-box-row {
        cursor: pointer;
        padding: 4px 8px;
        min-height: 0;
        flex-direction: column;
        align-items: center;
      }

      .zone-box-row:hover {
        background: linear-gradient(135deg, #7a5a12 0%, #9a7820 100%);
      }

      .zone-box-grid {
        display: flex;
        gap: 8px;
        align-items: flex-end;
        justify-content: center;
        padding: 2px 0;
        width: 100%;
      }

      .zone-box-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }

      .zone-box-shape {
        width: 56px;
        height: 36px;
        position: relative;
      }

      .zone-box-shape .box-lid {
        position: absolute;
        top: 0;
        left: -2px;
        right: -2px;
        height: 28%;
        background: linear-gradient(180deg, #a08040 0%, #7a6020 100%);
        border-radius: 2px 2px 0 0;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-bottom: none;
      }

      .zone-box-shape .box-body {
        position: absolute;
        top: 28%;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, #8b6914 0%, #6b5010 100%);
        border-radius: 0 0 2px 2px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .zone-box-shape .box-count {
        font-size: 0.7em;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        line-height: 1;
      }

      .zone-box-item.has-wine .box-count {
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      /* Phone: tighter spacing, smaller elements */
      @media (max-width: 599px) {
        .cabinet {
          padding: 6px;
          border-radius: 10px;
        }
        .cabinet-name {
          font-size: 0.75em;
          padding: 3px 0;
        }
        .grid-inner {
          padding: 4px;
        }
        .row {
          gap: 1px;
          margin-bottom: 1px;
        }
        .row::after {
          height: 2px;
        }
        .cell .bottle-label {
          font-size: 5px;
          max-width: 30px;
        }
        .bottom-zone {
          margin-top: 6px;
          padding: 6px;
          gap: 4px;
          min-height: 32px;
        }
        .bottom-zone-label {
          font-size: 0.6em;
        }
        .zone-bottle {
          width: 22px;
          height: 22px;
          font-size: 7px;
        }
      }

      /* Tablet: moderate sizing */
      @media (min-width: 600px) and (max-width: 1023px) {
        .cabinet {
          padding: 6px;
        }
        .grid-inner {
          padding: 5px;
        }
        .row {
          gap: 2px;
          margin-bottom: 1px;
        }
      }

    `,
];
__decorate([
    n$1({ attribute: false })
], CabinetGrid.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], CabinetGrid.prototype, "cabinet", void 0);
__decorate([
    n$1({ attribute: false })
], CabinetGrid.prototype, "wines", void 0);
__decorate([
    n$1({ attribute: false })
], CabinetGrid.prototype, "highlightWineId", void 0);
__decorate([
    n$1({ attribute: false })
], CabinetGrid.prototype, "removalHighlightIds", void 0);
__decorate([
    n$1({ attribute: false })
], CabinetGrid.prototype, "movingWineId", void 0);
__decorate([
    n$1({ type: String })
], CabinetGrid.prototype, "dispositionDisplay", void 0);
__decorate([
    r$1()
], CabinetGrid.prototype, "_dragOverCell", void 0);
CabinetGrid = __decorate([
    t$2("cabinet-grid")
], CabinetGrid);

let StarRating = class StarRating extends i$1 {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.readonly = false;
        this.size = 24;
    }
    _onClick(starIndex, e) {
        if (this.readonly)
            return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const half = x < rect.width / 2;
        const newValue = half ? starIndex + 0.5 : starIndex + 1;
        // Toggle off if clicking same value
        const finalValue = newValue === this.value ? 0 : newValue;
        this.dispatchEvent(new CustomEvent("rating-change", {
            detail: { value: finalValue },
            bubbles: true,
            composed: true,
        }));
    }
    _renderStar(index) {
        const fill = this.value - index;
        const s = this.size;
        let starSvg;
        if (fill >= 1) {
            // Full star
            starSvg = b$1 `
        <svg width=${s} height=${s} viewBox="0 0 24 24">
          <path fill="#f5a623" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
        }
        else if (fill >= 0.5) {
            // Half star
            starSvg = b$1 `
        <svg width=${s} height=${s} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-${index}">
              <stop offset="50%" stop-color="#f5a623"/>
              <stop offset="50%" stop-color="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-${index})" stroke="#f5a623" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
        }
        else {
            // Empty star
            starSvg = b$1 `
        <svg width=${s} height=${s} viewBox="0 0 24 24">
          <path fill="none" stroke="#ccc" stroke-width="1.5" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
        }
        return b$1 `
      <span
        class="star ${this.readonly ? "readonly" : ""}"
        @click=${(e) => this._onClick(index, e)}
      >
        ${starSvg}
      </span>
    `;
    }
    render() {
        return b$1 `
      ${[0, 1, 2, 3, 4].map((i) => this._renderStar(i))}
      ${this.value > 0
            ? b$1 `<span class="rating-text">${this.value.toFixed(1)}</span>`
            : ""}
    `;
    }
};
StarRating.styles = i$4 `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    .star {
      cursor: pointer;
      position: relative;
      user-select: none;
      transition: transform 0.15s;
    }

    .star:hover {
      transform: scale(1.2);
    }

    .star.readonly {
      cursor: default;
    }

    .star.readonly:hover {
      transform: none;
    }

    .star svg {
      display: block;
    }

    /* Touch: tapping the left or right half of a star picks a half or a
       whole point, so each half needs to be finger-sized. _onClick measures
       the padded box, so the halves stay correct. */
    @media (pointer: coarse) {
      .star:not(.readonly) {
        padding: 10px 6px;
      }
      :host {
        gap: 0;
      }
    }

    .rating-text {
      margin-left: 6px;
      font-size: 0.9em;
      font-weight: 600;
      color: var(--wc-text, #212121);
    }
  `;
__decorate([
    n$1({ type: Number })
], StarRating.prototype, "value", void 0);
__decorate([
    n$1({ type: Boolean })
], StarRating.prototype, "readonly", void 0);
__decorate([
    n$1({ type: Number })
], StarRating.prototype, "size", void 0);
StarRating = __decorate([
    t$2("star-rating")
], StarRating);

// Shared camera diagnostics.
//
// Both camera components used to decide what went wrong by substring-matching
// err.message ("NotAllowed", "Permission"). The name is in err.name, and
// Safari's message text ("The request is not allowed by the user agent or the
// platform in the current context.") matches neither, so on iOS every failure
// fell through to a generic "could not access camera" that told the user
// nothing about the actual cause.
// Why the live camera cannot even be attempted, or "" when it can be.
//
// Over plain http:// the page is not a secure context and the browser does not
// expose navigator.mediaDevices at all — calling getUserMedia throws a
// TypeError that reads like a mysterious failure. There is no code-side fix
// for that, so the honest move is to say it up front and point at the device's
// own camera, which needs no secure context.
function cameraBlockedReason(language) {
    if (typeof window !== "undefined" && !window.isSecureContext) {
        return t$1("ui.camera.blockedInsecure", language);
    }
    if (!navigator.mediaDevices?.getUserMedia) {
        return t$1("ui.camera.notOffered", language);
    }
    return "";
}
// A getUserMedia failure, in words that suggest what to do about it.
function describeCameraError(err, language) {
    switch (err?.name) {
        case "NotAllowedError":
        case "SecurityError":
            return t$1("ui.camera.accessDenied", language);
        case "NotFoundError":
        case "OverconstrainedError":
            return t$1("ui.camera.notFound", language);
        case "NotReadableError":
        case "AbortError":
            return t$1("ui.camera.busy", language);
        default:
            return t$1("ui.camera.genericError", language, {
                detail: err?.name ? ` (${err.name})` : "",
            });
    }
}

let LabelCamera = class LabelCamera extends i$1 {
    constructor() {
        super(...arguments);
        this.active = false;
        this._stream = null;
        this._error = "";
        this._captured = false;
        this._capturedImage = "";
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    updated(changedProps) {
        if (changedProps.has("active")) {
            if (this.active && !this._captured) {
                this._startCamera();
            }
            else if (!this.active) {
                this._stopCamera();
                this._captured = false;
                this._capturedImage = "";
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._stopCamera();
    }
    async _startCamera() {
        this._error = "";
        // Ask why before asking for the camera: over http:// there is nothing to
        // ask, and a TypeError from a missing navigator.mediaDevices would read as
        // a generic failure.
        const blocked = cameraBlockedReason(this.hass?.language);
        if (blocked) {
            this._error = blocked;
            return;
        }
        try {
            this._stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                    width: { ideal: 960 },
                    height: { ideal: 1280 },
                    aspectRatio: { ideal: 3 / 4 },
                },
                audio: false,
            });
            await this.updateComplete;
            const video = this.renderRoot.querySelector("video");
            if (video && this._stream) {
                video.srcObject = this._stream;
            }
        }
        catch (err) {
            this._error = describeCameraError(err, this.hass?.language);
        }
    }
    _stopCamera() {
        if (this._stream) {
            this._stream.getTracks().forEach((t) => t.stop());
            this._stream = null;
        }
    }
    async _capture() {
        const video = this.renderRoot.querySelector("video");
        if (!video)
            return;
        const canvas = document.createElement("canvas");
        const maxDim = 1024;
        let w = video.videoWidth;
        let h = video.videoHeight;
        if (w > maxDim || h > maxDim) {
            const scale = maxDim / Math.max(w, h);
            w = Math.round(w * scale);
            h = Math.round(h * scale);
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        const base64 = dataUrl.split(",")[1];
        this._stopCamera();
        this._captured = true;
        this._capturedImage = dataUrl;
        this.dispatchEvent(new CustomEvent("photo-captured", {
            detail: { image: base64 },
            bubbles: true,
            composed: true,
        }));
    }
    _onFileSelected(e) {
        const input = e.target;
        const file = input.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            // Resize if needed
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxDim = 1024;
                let w = img.width;
                let h = img.height;
                if (w > maxDim || h > maxDim) {
                    const scale = maxDim / Math.max(w, h);
                    w = Math.round(w * scale);
                    h = Math.round(h * scale);
                }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
                const resizedBase64 = resizedDataUrl.split(",")[1];
                this._stopCamera();
                this._captured = true;
                this._capturedImage = resizedDataUrl;
                this.dispatchEvent(new CustomEvent("photo-captured", {
                    detail: { image: resizedBase64 },
                    bubbles: true,
                    composed: true,
                }));
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    }
    retake() {
        this._captured = false;
        this._capturedImage = "";
        this._startCamera();
    }
    render() {
        if (!this.active)
            return A$1;
        if (this._captured) {
            return b$1 `
        <img class="captured-preview" src=${this._capturedImage} alt="Captured label" />
      `;
        }
        return b$1 `
      ${this._error
            ? b$1 `
            <div class="error-message">${this._error}</div>
            <div class="hint">
              ${this._t("ui.camera.fallbackHint")}
            </div>
          `
            : b$1 `
            <div class="camera-container">
              <video autoplay playsinline muted></video>
            </div>
            <div class="capture-btn-area">
              <button class="capture-btn" @click=${this._capture} title="${this._t('ui.camera.takePhotoTitle')}"></button>
            </div>
            <div class="hint">${this._t("ui.camera.pointAtLabel")}</div>
          `}

      <div class="fallback-area">
        <label class="file-input-label">
          ${this._error ? this._t("ui.camera.takePhotoBtn") : this._t("ui.camera.uploadGalleryBtn")}
          <input type="file" accept="image/*" capture="environment" @change=${this._onFileSelected} />
        </label>
      </div>
    `;
    }
};
LabelCamera.styles = [
    sharedStyles,
    i$4 `
      :host {
        display: block;
      }

      .camera-container {
        position: relative;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        aspect-ratio: 3 / 4;
        border-radius: 12px;
        overflow: hidden;
        background: #000;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .captured-preview {
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        display: block;
        border-radius: 12px;
        object-fit: contain;
        max-height: 300px;
      }

      .capture-btn-area {
        display: flex;
        justify-content: center;
        padding: 12px 0;
      }

      .capture-btn {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 4px solid var(--wc-primary, #722f37);
        background: transparent;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
      }

      .capture-btn::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border-radius: 50%;
        background: var(--wc-primary, #722f37);
        transition: all 0.15s;
      }

      .capture-btn:hover::after {
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
      }

      .capture-btn:active::after {
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
      }

      .fallback-area {
        text-align: center;
        padding: 8px 0;
      }

      .file-input-label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.85em;
        transition: all 0.2s;
      }

      .file-input-label:hover {
        background: rgba(114, 47, 55, 0.08);
      }

      input[type="file"] {
        display: none;
      }

      .error-message {
        padding: 16px;
        text-align: center;
        color: #ef5350;
        font-size: 0.9em;
      }

      .actions-row {
        display: flex;
        gap: 8px;
        justify-content: center;
        padding: 8px 0;
      }

      .hint {
        text-align: center;
        padding: 4px 0 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ attribute: false })
], LabelCamera.prototype, "hass", void 0);
__decorate([
    n$1({ type: Boolean })
], LabelCamera.prototype, "active", void 0);
__decorate([
    r$1()
], LabelCamera.prototype, "_stream", void 0);
__decorate([
    r$1()
], LabelCamera.prototype, "_error", void 0);
__decorate([
    r$1()
], LabelCamera.prototype, "_captured", void 0);
__decorate([
    r$1()
], LabelCamera.prototype, "_capturedImage", void 0);
LabelCamera = __decorate([
    t$2("label-camera")
], LabelCamera);

let WineDetailDialog = class WineDetailDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.wine = null;
        // Full cellar wine list, used only to find other bottles of this same
        // wine (same name+winery+vintage) so the "propagate this note?" prompt
        // in _saveFields can tell the user how many bottles would be affected.
        this.wines = [];
        this.cabinets = [];
        this.open = false;
        this.mode = "cellar";
        this._editing = false;
        this._editingFields = false;
        this._editData = {};
        // Start year of the drink window, edited separately from drink_by (the
        // end year) and recombined into the stored drink_window "YYYY-YYYY"
        // string on every change — see _updateDrinkWindowPart.
        this._editDrinkFrom = "";
        this._userRating = 0;
        this._tastingNotes = { aroma: "", taste: "", finish: "", overall: "" };
        this._saving = false;
        this._refreshing = false;
        this._analyzing = false;
        this._showLookupChooser = false;
        this._resettingAiContent = false;
        this._scanningLabel = false;
        this._showLabelCamera = false;
        this._showRemoveConfirm = false;
        this._showDrinkDialog = false;
        this._drinkRating = 0;
        this._drinkNotes = "";
        this._drinkBuyAgain = false;
        this._pendingVivinoImage = null;
        this._showPhotoCamera = false;
        this._photoBusy = false;
        this._photoSide = "front";
        this._photoSwipeStartX = null;
        this._aiFallbackReason = null;
        this.hasGemini = false;
        this.aiFallbackAlways = false;
        this.enableWhisky = false;
        this.currency = "USD";
        this.chamberingRoomSensor = "";
        this.chamberingTimeConstantMinutes = 75;
        this.chamberingEquilibrationHours = 24;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    updated(changedProps) {
        if (changedProps.has("wine") && this.wine) {
            this._userRating = this.wine.user_rating ?? 0;
            this._tastingNotes = this.wine.tasting_notes
                ? { ...this.wine.tasting_notes }
                : { aroma: "", taste: "", finish: "", overall: "" };
            this._editing = false;
            this._editingFields = false;
            this._photoSide = "front";
        }
    }
    _close() {
        this.open = false;
        this._editing = false;
        this._editingFields = false;
        this.dispatchEvent(new CustomEvent("close"));
    }
    _startEditingFields() {
        if (!this.wine)
            return;
        this._editData = {
            name: this.wine.name || "",
            winery: this.wine.winery || "",
            vintage: this.wine.vintage,
            type: this.wine.type || "red",
            region: this.wine.region || "",
            country: this.wine.country || "",
            grape_variety: this.wine.grape_variety || "",
            price: this.wine.price,
            retail_price: this.wine.retail_price,
            purchase_date: this.wine.purchase_date || "",
            drink_by: this.wine.drink_by || "",
            drink_window: this.wine.drink_window || "",
            peak_window: this.wine.peak_window || "",
            notes: this.wine.notes || "",
            alcohol: this.wine.alcohol || "",
            // Edited in the unit Home Assistant uses (°F in a US home); see
            // _saveFields for how an untouched value keeps its stored text.
            serving_temp: formatServingTemp(this.wine.serving_temp, this.hass),
        };
        const windowStart = (this.wine.drink_window || "").match(/\b(?:19|20)\d{2}\b/);
        this._editDrinkFrom = windowStart ? windowStart[0] : "";
        this._editingFields = true;
    }
    _cancelEditingFields() {
        this._editingFields = false;
        this._editData = {};
        this._editDrinkFrom = "";
    }
    _updateEditField(field, value) {
        this._editData = { ...this._editData, [field]: value };
    }
    // drink_by is the end year; _editDrinkFrom (a separate, non-persisted
    // field) is the start year. Both recombine into the stored drink_window
    // "YYYY-YYYY" string on every change, so it never drifts out of sync
    // with whichever end the user just edited.
    _updateDrinkWindowPart(part, value) {
        if (part === "from")
            this._editDrinkFrom = value;
        const from = (part === "from" ? value : this._editDrinkFrom).trim();
        const by = (part === "by" ? value : (this._editData.drink_by || "")).trim();
        this._editData = {
            ...this._editData,
            ...(part === "by" ? { drink_by: value } : {}),
            drink_window: from && by ? `${from}-${by}` : (from || by || ""),
        };
    }
    // Applying a result to whatever is on screen now is only correct if it is
    // still the same bottle. A Vivino refresh takes a second or two — long
    // enough to close the dialog and open another wine — and the old result
    // would then overwrite the new bottle wholesale, id included, silently
    // showing the previous wine under the new one's name.
    _applyIfStillShowing(wineId, patch) {
        if (!this.wine || this.wine.id !== wineId)
            return false;
        this.wine = { ...this.wine, ...patch };
        return true;
    }
    async _saveFields() {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        this._saving = true;
        try {
            const updates = { ...this._editData };
            // Convert empty strings to null for numeric fields
            if (updates.vintage === "" || updates.vintage === null)
                updates.vintage = null;
            else
                updates.vintage = parseInt(updates.vintage) || null;
            if (updates.price === "" || updates.price === null)
                updates.price = null;
            else
                updates.price = parseFloat(updates.price) || null;
            if (updates.retail_price === "" || updates.retail_price === null)
                updates.retail_price = null;
            else
                updates.retail_price = parseFloat(updates.retail_price) || null;
            // The field showed the stored °C value converted for display; if it
            // wasn't touched, keep the stored text rather than rewriting it.
            if (updates.serving_temp === formatServingTemp(this.wine.serving_temp, this.hass)) {
                updates.serving_temp = this.wine.serving_temp || "";
            }
            if (this.mode === "buylist") {
                await this.hass.callWS({
                    type: "wine_cellar/update_buy_list_item",
                    item_id: this.wine.id,
                    updates,
                });
                if (!this._applyIfStillShowing(wineId, updates))
                    return;
                this._editingFields = false;
                this._editData = {};
                this.dispatchEvent(new CustomEvent("buy-list-updated", { bubbles: true, composed: true }));
            }
            else {
                // "notes" is personal and per-bottle by default (unlike everything
                // else here, which the backend already copies to every other
                // bottle of this same wine automatically) — ask before spreading
                // it, since a note like "opened for the anniversary" usually
                // shouldn't land on the other 5 bottles.
                let propagateNotes = false;
                if ("notes" in updates && updates.notes !== (this.wine.notes || "")) {
                    const duplicates = this.wines.filter((w) => w.id !== this.wine.id &&
                        w.name === this.wine.name &&
                        w.winery === this.wine.winery &&
                        w.vintage === this.wine.vintage);
                    if (duplicates.length > 0) {
                        propagateNotes = window.confirm(this._t("ui.wineDetail.applyNoteConfirm", { count: duplicates.length, plural: duplicates.length > 1 ? "s" : "", name: this.wine.name }));
                    }
                }
                const result = await this.hass.callWS({
                    type: "wine_cellar/update_wine",
                    wine_id: this.wine.id,
                    updates,
                    propagate_notes: propagateNotes,
                });
                // Use the server's own wine back, not the raw edits: some fields
                // (like `disposition`, recomputed server-side when drink_by/
                // drink_window changes) aren't in `updates` at all, so patching
                // with `updates` alone would leave the badge showing the stale
                // value until the next full reload.
                if (!this._applyIfStillShowing(wineId, result?.wine || updates))
                    return;
                this._editingFields = false;
                this._editData = {};
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            }
        }
        catch (err) {
            console.error("Failed to save wine fields", err);
        }
        this._saving = false;
    }
    _onRemove() {
        if (!this.wine)
            return;
        if (this.mode === "buylist") {
            this.dispatchEvent(new CustomEvent("remove-buy-list-item", {
                detail: { item_id: this.wine.id },
                bubbles: true,
                composed: true,
            }));
            this._close();
        }
        else {
            // Show reason prompt for cellar wines
            this._showRemoveConfirm = true;
        }
    }
    _onDrink() {
        if (!this.wine)
            return;
        this._drinkRating = this.wine.user_rating ?? 0;
        this._drinkNotes = "";
        this._drinkBuyAgain = false;
        this._showDrinkDialog = true;
    }
    _confirmDrink() {
        if (!this.wine)
            return;
        this.dispatchEvent(new CustomEvent("remove-wine", {
            detail: {
                wine_id: this.wine.id,
                reason: "drank",
                name: this.wine.name,
                personal_rating: this._drinkRating || null,
                drink_notes: this._drinkNotes.trim(),
                buy_again: this._drinkBuyAgain,
            },
            bubbles: true,
            composed: true,
        }));
        this._showDrinkDialog = false;
        this._close();
    }
    _confirmRemove(reason) {
        if (!this.wine)
            return;
        this.dispatchEvent(new CustomEvent("remove-wine", {
            detail: { wine_id: this.wine.id, reason },
            bubbles: true,
            composed: true,
        }));
        this._showRemoveConfirm = false;
        this._close();
    }
    _onLocate() {
        if (this.wine) {
            this.dispatchEvent(new CustomEvent("locate-wine", {
                detail: { wine: this.wine },
                bubbles: true,
                composed: true,
            }));
            this._close();
        }
    }
    _onMove() {
        if (this.wine) {
            this.dispatchEvent(new CustomEvent("move-wine", {
                detail: { wine: this.wine },
                bubbles: true,
                composed: true,
            }));
            this._close();
        }
    }
    _onCopy() {
        if (this.wine) {
            this.dispatchEvent(new CustomEvent("copy-wine", {
                detail: { wine: this.wine },
                bubbles: true,
                composed: true,
            }));
            this._close();
        }
    }
    // Send a placed bottle straight back to Unassigned, without going through
    // the "tap a cell to move" flow — for when you just want it out of its
    // slot (e.g. it's actually elsewhere, or you're about to remove the
    // cabinet it's in) rather than relocating it somewhere specific.
    async _moveToUnassigned() {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        try {
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: this.wine.id,
                cabinet_id: "",
            });
            const updates = { cabinet_id: "", row: null, col: null, zone: "", depth: 0 };
            if (!this._applyIfStillShowing(wineId, updates))
                return;
            this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            this._close();
        }
        catch (err) {
            console.error("Failed to move wine to Unassigned", err);
        }
    }
    _isInPeakWindow(wine) {
        if (!wine.peak_window)
            return false;
        const currentYear = new Date().getFullYear();
        const years = wine.peak_window.split("-").map(y => parseInt(y, 10));
        if (years.length === 1)
            return currentYear === years[0];
        if (years.length === 2)
            return currentYear >= years[0] && currentYear <= years[1];
        return false;
    }
    _isInOrAfterPeakWindow(wine) {
        if (!wine.peak_window || !wine.drink_window)
            return false;
        const currentYear = new Date().getFullYear();
        const peakYears = wine.peak_window.split("-").map(y => parseInt(y, 10));
        const drinkYears = wine.drink_window.split("-").map(y => parseInt(y, 10));
        const peakStart = peakYears[0];
        const drinkEnd = drinkYears.length === 2 ? drinkYears[1] : drinkYears[0];
        return currentYear >= peakStart && currentYear <= drinkEnd;
    }
    _renderChamberingBanner(wine) {
        const cabinet = this.cabinets.find((c) => c.id === wine.cabinet_id);
        const advice = getChamberingAdvice(wine, cabinet, this.hass, this.chamberingRoomSensor, this.chamberingTimeConstantMinutes, this.chamberingEquilibrationHours);
        if (!advice)
            return A$1;
        return b$1 `
      <div class="drink-by-banner chambering-${advice.status}">
        ${advice.status === "ready"
            ? this._t("ui.wineDetail.chamberingReady")
            : advice.status === "chill"
                ? this._t("ui.wineDetail.chamberingChill")
                : this._t("ui.wineDetail.chamberingWarmUp", {
                    duration: formatDuration(advice.minutes || 0),
                })}
      </div>
    `;
    }
    _onRatingChange(e) {
        this._userRating = e.detail.value;
    }
    _onTastingChange(field, e) {
        const value = e.target.value;
        this._tastingNotes = { ...this._tastingNotes, [field]: value };
    }
    async _saveRating() {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        this._saving = true;
        try {
            const updates = {
                user_rating: this._userRating || null,
                tasting_notes: this._hasTastingNotes() ? this._tastingNotes : null,
            };
            if (this.mode === "buylist") {
                await this.hass.callWS({
                    type: "wine_cellar/update_buy_list_item",
                    item_id: this.wine.id,
                    updates,
                });
            }
            else {
                await this.hass.callWS({
                    type: "wine_cellar/update_wine",
                    wine_id: this.wine.id,
                    updates,
                });
            }
            if (!this._applyIfStillShowing(wineId, updates))
                return;
            this._editing = false;
            this.dispatchEvent(new CustomEvent(this.mode === "buylist" ? "buy-list-updated" : "wine-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Failed to save rating/notes", err);
        }
        this._saving = false;
    }
    async _refreshFromVivino() {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        this._refreshing = true;
        try {
            const resp = await this.hass.callWS({
                type: "wine_cellar/refresh_wine",
                wine_id: this.wine.id,
            });
            if (resp.no_vivino_match) {
                this._refreshing = false;
                if (!resp.ai_available) {
                    alert(resp.error);
                    return;
                }
                if (this.aiFallbackAlways) {
                    await this._analyzeWithAI();
                }
                else {
                    this._aiFallbackReason = "no_match";
                }
                return;
            }
            if (resp.error) {
                alert(resp.error);
            }
            else if (resp.wine) {
                if (!this._applyIfStillShowing(wineId, resp.wine))
                    return;
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
                if (resp.vivino_image_url) {
                    this._pendingVivinoImage = resp.vivino_image_url;
                }
                if (resp.price_needs_ai) {
                    this._aiFallbackReason = "no_price";
                }
            }
        }
        catch (err) {
            console.error("Vivino refresh failed", err);
        }
        this._refreshing = false;
    }
    // One "Vivino / AI" button: without an AI provider there's nothing to
    // choose, so it goes straight to Vivino; otherwise it opens the same
    // source chooser as the inventory review.
    _onLookup() {
        if (!this.hasGemini) {
            this._refreshFromVivino();
            return;
        }
        this._showLookupChooser = true;
    }
    _pickLookup(kind) {
        this._showLookupChooser = false;
        if (kind === "vivino")
            this._refreshFromVivino();
        else if (kind === "ai")
            this._analyzeWithAI();
        else
            this._resetAiContent();
    }
    async _confirmAiFallback(remember) {
        this._aiFallbackReason = null;
        if (remember) {
            this.dispatchEvent(new CustomEvent("set-ai-fallback-always", {
                detail: { value: true },
                bubbles: true,
                composed: true,
            }));
        }
        await this._analyzeWithAI();
    }
    _dismissAiFallback() {
        this._aiFallbackReason = null;
    }
    async _updatePhoto(image_url, field = "image_url") {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        this._photoBusy = true;
        try {
            const updates = { [field]: image_url };
            if (this.mode === "buylist") {
                await this.hass.callWS({ type: "wine_cellar/update_buy_list_item", item_id: this.wine.id, updates });
            }
            else {
                await this.hass.callWS({ type: "wine_cellar/update_wine", wine_id: this.wine.id, updates });
            }
            if (!this._applyIfStillShowing(wineId, { [field]: image_url }))
                return;
            this.dispatchEvent(new CustomEvent(this.mode === "buylist" ? "buy-list-updated" : "wine-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Failed to update photo", err);
        }
        this._photoBusy = false;
    }
    _onImageSwipeStart(e) {
        this._photoSwipeStartX = e.clientX;
    }
    _onImageSwipeEnd(e) {
        if (this._photoSwipeStartX === null)
            return;
        const dx = e.clientX - this._photoSwipeStartX;
        this._photoSwipeStartX = null;
        const THRESHOLD = 30;
        if (dx <= -THRESHOLD) {
            this._photoSide = "back";
        }
        else if (dx >= THRESHOLD) {
            this._photoSide = "front";
        }
    }
    _applyVivinoPhoto() {
        if (!this._pendingVivinoImage)
            return;
        const image_url = this._pendingVivinoImage;
        this._pendingVivinoImage = null;
        this._updatePhoto(image_url);
    }
    _dismissVivinoPhoto() {
        this._pendingVivinoImage = null;
    }
    _onDeletePhoto() {
        const field = this._photoSide === "back" ? "back_image_url" : "image_url";
        if (!this.wine?.[field])
            return;
        if (!window.confirm(this._photoSide === "back" ? this._t("ui.wineDetail.deleteBackPhotoConfirm") : this._t("ui.wineDetail.deletePhotoConfirm")))
            return;
        this._updatePhoto("", field);
    }
    async _onPhotoReplaced(e) {
        this._showPhotoCamera = false;
        const thumbUrl = await resizeImageForStorage(e.detail.image);
        if (thumbUrl) {
            this._updatePhoto(thumbUrl, this._photoSide === "back" ? "back_image_url" : "image_url");
        }
    }
    async _analyzeWithAI() {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        this._analyzing = true;
        try {
            const resp = await this.hass.callWS({
                type: "wine_cellar/analyze_single_wine",
                wine_id: this.wine.id,
            });
            if (resp.error) {
                alert(resp.error);
            }
            else if (resp.wine) {
                if (!this._applyIfStillShowing(wineId, resp.wine))
                    return;
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            }
        }
        catch (err) {
            console.error("AI analysis failed", err);
        }
        this._analyzing = false;
    }
    // Clears description/food_pairings (and their language tags) so the next
    // Vivino/AI lookup regenerates them from scratch, instead of them being
    // kept forever because the field isn't "empty". An escape hatch for text
    // stuck in the wrong language despite the automatic staleness checks.
    async _resetAiContent() {
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        if (!window.confirm(this._t("ui.wineDetail.resetAiContentConfirm")))
            return;
        this._resettingAiContent = true;
        try {
            const resp = await this.hass.callWS({
                type: "wine_cellar/reset_ai_content",
                wine_id: this.wine.id,
            });
            if (resp.error) {
                alert(resp.error);
            }
            else if (resp.wine) {
                if (!this._applyIfStillShowing(wineId, resp.wine))
                    return;
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            }
        }
        catch (err) {
            console.error("Reset AI content failed", err);
        }
        this._resettingAiContent = false;
    }
    // Re-scan the label with a fresh photo: like _onPhotoReplaced but also
    // extracts name/winery/vintage/etc via Gemini, same as the add-wine flow's
    // label scan (jamespreid, imported for the detail dialog).
    async _onLabelPhotoScanned(e) {
        this._showLabelCamera = false;
        const wineId = this.wine?.id ?? "";
        if (!this.wine || !this.hass)
            return;
        this._scanningLabel = true;
        try {
            const raw = e.detail.image;
            const result = await this.hass.callWS({
                type: "wine_cellar/recognize_label",
                image: raw,
            });
            if (result.error) {
                alert(result.error);
                return;
            }
            const r = result.result;
            if (!r) {
                alert(this._t("ui.wineDetail.couldNotIdentifyLabel"));
                return;
            }
            const thumbUrl = await resizeImageForStorage(raw);
            const updates = {};
            if (thumbUrl)
                updates.image_url = thumbUrl;
            if (r.name)
                updates.name = r.name;
            if (r.winery)
                updates.winery = r.winery;
            if (r.vintage)
                updates.vintage = r.vintage;
            if (r.type)
                updates.type = r.type;
            if (r.region)
                updates.region = r.region;
            if (r.country)
                updates.country = r.country;
            if (r.grape_variety)
                updates.grape_variety = r.grape_variety;
            if (r.description)
                updates.description = r.description;
            if (r.estimated_price)
                updates.retail_price = r.estimated_price;
            await this.hass.callWS({
                type: "wine_cellar/update_wine",
                wine_id: this.wine.id,
                updates,
            });
            if (!this._applyIfStillShowing(wineId, updates))
                return;
            this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Label scan failed", err);
            alert(this._t("ui.wineDetail.labelScanFailed"));
        }
        this._scanningLabel = false;
    }
    _splitPairings(text) {
        const result = [];
        let depth = 0;
        let current = "";
        for (const ch of text) {
            if (ch === "(")
                depth++;
            else if (ch === ")")
                depth--;
            if (ch === "," && depth === 0) {
                if (current.trim())
                    result.push(current.trim());
                current = "";
            }
            else {
                current += ch;
            }
        }
        if (current.trim())
            result.push(current.trim());
        return result;
    }
    // Purchase date is stored as a plain "YYYY-MM-DD" string (from a native
    // date input); displayed in the viewer's own locale order instead of
    // always showing the raw ISO order. The literal "T00:00:00" makes the
    // Date parse as local midnight rather than UTC midnight, so a negative
    // UTC-offset timezone doesn't roll it back a day.
    _formatDate(iso) {
        if (!iso)
            return "";
        const d = new Date(`${iso}T00:00:00`);
        if (isNaN(d.getTime()))
            return iso;
        return d.toLocaleDateString(this.hass?.language, { day: "2-digit", month: "2-digit", year: "numeric" });
    }
    _hasTastingNotes() {
        const n = this._tastingNotes;
        return !!(n.aroma || n.taste || n.finish || n.overall);
    }
    // A check later than the last update means that attempt found nothing —
    // worth showing, so a fruitless retry stays visibly different from never
    // having tried at all.
    _renderSourceDates(updatedAt, checkedAt) {
        if (!updatedAt) {
            return b$1 `${this._t("ui.wineDetail.nothingFoundChecked", { date: this._formatUpdatedAt(checkedAt) })}`;
        }
        if (checkedAt && checkedAt > updatedAt) {
            return b$1 `${this._t("ui.wineDetail.recheckedNothingNew", {
                date1: this._formatUpdatedAt(updatedAt),
                date2: this._formatUpdatedAt(checkedAt),
            })}`;
        }
        return b$1 `${this._formatUpdatedAt(updatedAt)}`;
    }
    _formatUpdatedAt(iso) {
        if (!iso)
            return "";
        const d = new Date(iso);
        if (isNaN(d.getTime()))
            return "";
        return d.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    }
    _renderEditForm() {
        const d = this._editData;
        return b$1 `
      <div class="edit-form">
        <div class="form-group">
          <label>${this._t("ui.wineDetail.wineNameLabel")}</label>
          <input type="text" .value=${d.name}
            @input=${(e) => this._updateEditField("name", e.target.value)} />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${producerLabel(d.type, this.hass?.language)}</label>
            <input type="text" .value=${d.winery}
              @input=${(e) => this._updateEditField("winery", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.vintageLabel")}</label>
            <input type="number" .value=${d.vintage?.toString() || ""}
              @input=${(e) => this._updateEditField("vintage", e.target.value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.typeLabel")}</label>
            <select .value=${d.type}
              @change=${(e) => this._updateEditField("type", e.target.value)}>
              ${getSelectableWineTypes(this.enableWhisky || d.type === "whisky", this.hass?.language).map(([value, label]) => b$1 `<option value=${value} ?selected=${d.type === value}>${label}</option>`)}
            </select>
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.purchasePriceLabel")}</label>
            <input type="number" step="0.01" .value=${d.price?.toString() || ""}
              @input=${(e) => this._updateEditField("price", e.target.value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.currentValueLabel")}</label>
            <input type="number" step="0.01" .value=${d.retail_price?.toString() || ""}
              @input=${(e) => this._updateEditField("retail_price", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.regionLabel")}</label>
            <input type="text" .value=${d.region}
              @input=${(e) => this._updateEditField("region", e.target.value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.countryLabel")}</label>
            <input type="text" .value=${d.country}
              @input=${(e) => this._updateEditField("country", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${varietyLabel(d.type, false, this.hass?.language)}</label>
            <input type="text" .value=${d.grape_variety}
              @input=${(e) => this._updateEditField("grape_variety", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.alcoholLabel")}</label>
            <input type="text" .value=${d.alcohol} placeholder="${this._t('ui.wineDetail.alcoholPlaceholder')}"
              @input=${(e) => this._updateEditField("alcohol", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.servingTempLabel")}</label>
            <input type="text" .value=${d.serving_temp} placeholder="${this._t(usesFahrenheit(this.hass) ? 'ui.wineDetail.servingTempPlaceholderF' : 'ui.wineDetail.servingTempPlaceholder')}"
              @input=${(e) => this._updateEditField("serving_temp", e.target.value)} />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.wineDetail.purchaseDateLabel")}</label>
            <input type="date" .value=${d.purchase_date}
              @input=${(e) => this._updateEditField("purchase_date", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.drinkFromLabel")}</label>
            <input type="text" placeholder="${this._t('ui.wineDetail.drinkFromPlaceholder')}" .value=${this._editDrinkFrom}
              @input=${(e) => this._updateDrinkWindowPart("from", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.drinkByLabel")}</label>
            <input type="text" placeholder="${this._t('ui.wineDetail.drinkByPlaceholder')}" .value=${d.drink_by}
              @input=${(e) => this._updateDrinkWindowPart("by", e.target.value)} />
          </div>
          <div class="form-group">
            <label>${this._t("ui.wineDetail.peakWindowLabel")}</label>
            <input type="text" placeholder="${this._t('ui.wineDetail.peakWindowPlaceholder')}" .value=${d.peak_window || ""}
              @input=${(e) => this._updateEditField("peak_window", e.target.value)} />
          </div>
        </div>

        <div class="form-group">
          <label>${this._t("ui.wineDetail.notesLabel")}</label>
          <textarea .value=${d.notes}
            @input=${(e) => this._updateEditField("notes", e.target.value)}></textarea>
        </div>
      </div>

      <div class="edit-actions">
        <button class="btn btn-outline" @click=${this._cancelEditingFields}>${this._t("ui.common.cancel")}</button>
        <button class="btn btn-primary" ?disabled=${this._saving} @click=${this._saveFields}>
          ${this._saving ? this._t("ui.wineDetail.saving") : this._t("ui.wineDetail.save")}
        </button>
      </div>
    `;
    }
    render() {
        if (!this.open || !this.wine)
            return A$1;
        const wine = this.wine;
        const typeColor = WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red;
        const typeLabel = getWineTypeLabels(this.hass?.language)[wine.type] || wine.type;
        const showingBack = this._photoSide === "back";
        const currentImageUrl = showingBack ? wine.back_image_url : wine.image_url;
        return b$1 `
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="position:relative" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(this._close, this._t('ui.common.close'))}
          <div class="dialog-top-bar"></div>
          <div class="wine-header">
            <div class="wine-image-col">
              <div
                class="wine-image-wrap"
                @pointerdown=${this._onImageSwipeStart}
                @pointerup=${this._onImageSwipeEnd}
              >
                ${currentImageUrl
            ? b$1 `<img class="wine-image" src="${currentImageUrl}" alt="${wine.name}${showingBack ? this._t('ui.wineDetail.backLabelSuffix') : ""}" />`
            : b$1 `
                      <div class="wine-image-placeholder" style="background: ${typeColor}">
                        🍷
                      </div>
                    `}
                ${showingBack ? b$1 `<div class="photo-side-badge">${this._t('ui.wineDetail.backLabelBadge')}</div>` : A$1}
                <div class="photo-dots">
                  <span
                    class="photo-dot ${this._photoSide === "front" ? "active" : ""}"
                    title="${this._t('ui.wineDetail.frontLabelTitle')}"
                    @click=${() => (this._photoSide = "front")}
                  ></span>
                  <span
                    class="photo-dot ${showingBack ? "active" : ""}"
                    title="${this._t('ui.wineDetail.backLabelBadge')}"
                    @click=${() => (this._photoSide = "back")}
                  ></span>
                </div>
                ${this.mode !== "winelist" && this._editingFields
            ? b$1 `
                      <div class="photo-actions">
                        <button
                          class="photo-action-btn"
                          title="${showingBack ? this._t('ui.wineDetail.replaceBackPhotoTitle') : this._t('ui.wineDetail.replacePhotoTitle')}"
                          ?disabled=${this._photoBusy}
                          @click=${() => (this._showPhotoCamera = true)}
                        >📷</button>
                        ${currentImageUrl
                ? b$1 `<button
                              class="photo-action-btn"
                              title="${showingBack ? this._t('ui.wineDetail.deleteBackPhotoTitle') : this._t('ui.wineDetail.deletePhotoTitle')}"
                              ?disabled=${this._photoBusy}
                              @click=${this._onDeletePhoto}
                            >🗑️</button>`
                : A$1}
                      </div>
                    `
            : A$1}
              </div>
              ${this.mode === "cellar"
            ? b$1 `
                    <div class="wine-location" title="${this._t('ui.wineDetail.tapToLocate')}" @click=${this._onLocate}>
                      📍 ${getWineLocation(wine, this.cabinets, this.hass?.language).text}
                    </div>
                  `
            : A$1}
            </div>
            <div class="wine-title">
              <div class="wine-name">${wine.name}</div>
              <div class="wine-winery">${wine.winery}</div>
              <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
                <span class="wine-type-badge" style="background: ${typeColor}">
                  ${typeLabel}
                </span>
                ${wine.disposition
            ? b$1 `<span class="wine-type-badge" style="background: ${wine.disposition === "D" ? "#2e7d32" :
                wine.disposition === "H" ? "#1565c0" :
                    wine.disposition === "P" ? "#c62828" : "#666"}">${wine.disposition === "D" ? this._t("ui.disposition.drinkNow") :
                wine.disposition === "H" ? this._t("ui.disposition.hold") :
                    wine.disposition === "P" ? this._t("ui.disposition.pastPeak") : wine.disposition}</span>`
            : A$1}
              </div>
              ${wine.rating
            ? b$1 `
                    <div class="wine-rating">
                      <span class="rating-star">★</span>
                      ${wine.rating.toFixed(1)}
                      <span style="font-size:0.8em;color:var(--wc-text-secondary)">
                        Vivino${wine.ratings_count ? this._t('ui.wineDetail.ratingsCountSuffix', { count: wine.ratings_count.toLocaleString() }) : ""}
                      </span>
                    </div>
                  `
            : A$1}
              ${this.mode !== "winelist"
            ? b$1 `
                    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;margin-top:4px;font-size:0.9em">
                      <span style="font-size:0.8em;color:var(--wc-text-secondary)">${this._t('ui.wineDetail.myRating')}</span>
                      <star-rating
                        .value=${this._userRating}
                        .readonly=${!this._editing}
                        .size=${20}
                        @rating-change=${this._onRatingChange}
                      ></star-rating>
                      ${!this._editing && this._userRating === 0
                ? b$1 `<span class="no-rating" style="font-size:0.8em">${this._t('ui.common.notRated')}</span>`
                : A$1}
                      <button class="edit-toggle" style="font-size:0.75em;padding:2px 6px" @click=${() => (this._editing = !this._editing)}>
                        ${this._editing ? this._t('ui.common.cancel') : this._t('ui.common.edit')}
                      </button>
                    </div>
                  `
            : A$1}
            </div>
          </div>

          ${!this._editingFields && (this.mode === "cellar" || this.mode === "buylist")
            ? b$1 `
                <div class="actions grouped">
                  <div class="action-cards">
                    <div class="action-card">
                      <button class="btn btn-primary" style="background:#8e24aa"
                        ?disabled=${this._refreshing || this._analyzing} @click=${this._onLookup}
                        title="${this._t('ui.wineDetail.lookupTitle')}">
                        ${this._refreshing || this._analyzing ? "..." : `🔎 ${this._t("ui.wineDetail.lookupBtn")}`}
                      </button>
                      ${this.hasGemini
                ? b$1 `<button class="btn btn-primary" style="background:#2e7d32"
                            ?disabled=${this._scanningLabel} @click=${() => (this._showLabelCamera = true)}
                            title="${this._t('ui.wineDetail.scanLabelTitle')}">
                            ${this._scanningLabel ? "..." : `📷 ${this._t("ui.wineDetail.scanLabelBtn")}`}
                          </button>`
                : A$1}
                      <button class="btn btn-primary" style="background:#455a64"
                        @click=${this._startEditingFields}>✏️ ${this._t("ui.common.edit")}</button>
                    </div>
                    <div class="action-card">
                      ${this.mode === "cellar"
                ? b$1 `
                            <button class="btn btn-primary" style="background:#546e7a" @click=${this._onCopy}>📋 ${this._t("ui.wineDetail.copyBtn")}</button>
                            <button class="btn btn-primary" style="background:#6d4c41" @click=${this._onMove}>↔ ${this._t("ui.wineDetail.moveBtn")}</button>
                            ${wine.cabinet_id
                    ? b$1 `<button class="btn btn-primary" style="background:#ef6c00" @click=${this._moveToUnassigned}>📦 ${this._t("ui.wineDetail.unassignBtn")}</button>`
                    : A$1}
                          `
                : A$1}
                      <button class="btn btn-primary" style="background:#c62828"
                        @click=${this._onRemove}>✕ ${this._t("ui.wineDetail.removeBtn")}</button>
                    </div>
                  </div>
                  ${this.mode === "cellar"
                ? b$1 `<div class="action-card">
                        <button class="btn btn-primary drink-btn" style="background:#722F37"
                          @click=${this._onDrink}>🍷 ${this._t("ui.wineDetail.drinkBtn")}</button>
                      </div>`
                : A$1}
                </div>
                ${wine.vivino_checked_at || wine.ai_checked_at || wine.vivino_updated_at || wine.ai_updated_at
                ? b$1 `
                      <div style="text-align:center;font-size:0.68em;color:var(--wc-text-secondary);margin-top:-6px;padding-bottom:10px">
                        ${wine.vivino_checked_at || wine.vivino_updated_at
                    ? b$1 `${wine.vivino_id
                        ? b$1 `<a
                                  href="https://www.vivino.com/w/${wine.vivino_id}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style="color:inherit;text-decoration:underline"
                                  @click=${(e) => e.stopPropagation()}
                                >Vivino</a>`
                        : b$1 `Vivino`}${this._t("ui.common.colonSep")}${this._renderSourceDates(wine.vivino_updated_at, wine.vivino_checked_at)}`
                    : A$1}
                        ${(wine.vivino_checked_at || wine.vivino_updated_at) &&
                    (wine.ai_checked_at || wine.ai_updated_at)
                    ? " · "
                    : A$1}
                        ${wine.ai_checked_at || wine.ai_updated_at
                    ? b$1 `${this._t("ui.wineDetail.aiLabel")}${this._t("ui.common.colonSep")}${this._renderSourceDates(wine.ai_updated_at, wine.ai_checked_at)}`
                    : A$1}
                      </div>
                    `
                : A$1}
              `
            : A$1}

          ${this._editingFields
            ? this._renderEditForm()
            : b$1 `
                <!-- Drink by banner for disposition wines -->
                ${wine.disposition
                ? b$1 `
                      <div class="drink-by-banner ${wine.disposition === 'D' ? 'drink' : wine.disposition === 'H' ? 'hold' : wine.disposition === 'P' ? 'past' : ''} ${wine.disposition === 'D' && this._isInOrAfterPeakWindow(wine) ? 'peak' : ''}">
                        ${wine.disposition === "D"
                    ? (wine.drink_window
                        ? (wine.peak_window ? this._t("ui.wineDetail.drinkNowWithPeak", { window: wine.drink_window, peak: wine.peak_window }) : this._t("ui.wineDetail.drinkNowWithWindow", { window: wine.drink_window }))
                        : this._t("ui.wineDetail.drinkNowPlain"))
                    : wine.disposition === "H"
                        ? (wine.drink_window
                            ? (wine.peak_window ? this._t("ui.wineDetail.holdWithPeak", { window: wine.drink_window, peak: wine.peak_window }) : this._t("ui.wineDetail.holdWithWindow", { window: wine.drink_window }))
                            : wine.drink_by ? this._t("ui.wineDetail.holdUntil", { date: wine.drink_by }) : this._t("ui.wineDetail.holdPlain"))
                        : (wine.drink_window
                            ? (wine.peak_window ? this._t("ui.wineDetail.pastPeakWithPeak", { window: wine.drink_window, peak: wine.peak_window }) : this._t("ui.wineDetail.pastPeakWithWindow", { window: wine.drink_window }))
                            : this._t("ui.wineDetail.pastPeakPlain"))}
                      </div>
                    `
                : A$1}

                ${this._renderChamberingBanner(wine)}

                <!-- Description -->
                ${wine.description
                ? b$1 `<div class="wine-description">${wine.description}</div>`
                : A$1}

                <!-- Info chips (grape, food, alcohol, serving temp, etc.) -->
                ${wine.food_pairings || wine.alcohol || wine.serving_temp || wine.grape_variety
                ? b$1 `
                      <div class="info-chips">
                        ${wine.grape_variety
                    ? b$1 `<span class="info-chip"><span class="info-chip-icon">🍇</span> ${wine.grape_variety}</span>`
                    : A$1}
                        ${wine.alcohol
                    ? b$1 `<span class="info-chip"><span class="info-chip-icon">%</span> ${wine.alcohol}</span>`
                    : A$1}
                        ${wine.serving_temp
                    ? b$1 `<span class="info-chip"><span class="info-chip-icon">🌡️</span> ${formatServingTemp(wine.serving_temp, this.hass)}</span>`
                    : A$1}
                        ${wine.food_pairings
                    ? this._splitPairings(wine.food_pairings).map((food) => b$1 `<span class="info-chip">${food}</span>`)
                    : A$1}
                      </div>
                    `
                : A$1}

                <!-- AI Ratings -->
                ${wine.ai_ratings && Object.keys(wine.ai_ratings).length > 0
                ? b$1 `
                      <div class="ai-ratings">
                        ${wine.ai_ratings.rating_ws ? b$1 `<span class="ai-rating-chip">${wine.ai_ratings.rating_ws} <span class="source">WS</span></span>` : A$1}
                        ${wine.ai_ratings.rating_rp ? b$1 `<span class="ai-rating-chip">${wine.ai_ratings.rating_rp} <span class="source">RP</span></span>` : A$1}
                        ${wine.ai_ratings.rating_jd ? b$1 `<span class="ai-rating-chip">${wine.ai_ratings.rating_jd} <span class="source">JD</span></span>` : A$1}
                        ${wine.ai_ratings.rating_ag ? b$1 `<span class="ai-rating-chip">${wine.ai_ratings.rating_ag} <span class="source">AG</span></span>` : A$1}
                      </div>
                    `
                : A$1}

                <!-- Drink window (shown when no disposition banner) -->
                ${!(wine.disposition) && wine.drink_window
                ? b$1 `<div class="drink-window">${this._t("ui.wineDetail.drinkWindowPrefix", { window: wine.drink_window })}</div>`
                : A$1}

                <div class="details-grid">
                  ${wine.vintage
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.vintageLabel")}</span><span class="detail-value">${wine.vintage}</span></div>`
                : A$1}
                  ${wine.region
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.regionLabel")}</span><span class="detail-value">${wine.region}</span></div>`
                : A$1}
                  ${wine.country
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.countryLabel")}</span><span class="detail-value">${wine.country}</span></div>`
                : A$1}
                  ${wine.price
                ? b$1 `<div class="detail-item"><span class="detail-label">${this.mode === "winelist" ? this._t("ui.wineDetail.priceLabel") : this._t("ui.wineDetail.purchasePriceLabel")}</span><span class="detail-value">${this.currency} ${wine.price.toFixed(2)}</span></div>`
                : A$1}
                  ${wine.retail_price
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.currentValueLabel")}</span><span class="detail-value">${wine.retail_price_currency || this.currency} ${wine.retail_price.toFixed(2)}</span></div>`
                : A$1}
                  ${wine.purchase_date && this.mode === "cellar"
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.purchasedLabel")}</span><span class="detail-value">${this._formatDate(wine.purchase_date)}</span></div>`
                : A$1}
                  ${wine.drink_by && !wine.disposition
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.drinkByLabel")}</span><span class="detail-value">${wine.drink_by}</span></div>`
                : A$1}
                  ${wine.barcode && this.mode === "cellar"
                ? b$1 `<div class="detail-item"><span class="detail-label">${this._t("ui.wineDetail.barcodeLabel")}</span><span class="detail-value">${wine.barcode}</span></div>`
                : A$1}
                </div>

                ${wine.notes
                ? b$1 `
                      <div class="wine-notes">
                        <div class="detail-label" style="margin-bottom: 4px">${this._t("ui.wineDetail.notesLabel")}</div>
                        <div class="wine-notes-text">${wine.notes}</div>
                      </div>
                    `
                : A$1}

                ${this.mode !== "winelist" ? b$1 `
                <div class="divider"></div>

                <!-- Tasting Notes section -->
                <div class="section">
                  <div class="section-header">
                    <span class="section-title">${this._t("ui.wineDetail.tastingNotesTitle")}</span>
                  </div>
                  ${this._editing
                ? b$1 `
                        <div class="tasting-grid">
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.aromaLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.aroma}
                              placeholder="${this._t('ui.wineDetail.aromaPlaceholder')}"
                              @input=${(e) => this._onTastingChange("aroma", e)}
                            ></textarea>
                          </div>
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.tasteLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.taste}
                              placeholder="${this._t('ui.wineDetail.tastePlaceholder')}"
                              @input=${(e) => this._onTastingChange("taste", e)}
                            ></textarea>
                          </div>
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.finishLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.finish}
                              placeholder="${this._t('ui.wineDetail.finishPlaceholder')}"
                              @input=${(e) => this._onTastingChange("finish", e)}
                            ></textarea>
                          </div>
                          <div class="tasting-field">
                            <label>${this._t("ui.wineDetail.overallLabel")}</label>
                            <textarea
                              .value=${this._tastingNotes.overall}
                              placeholder="${this._t('ui.wineDetail.overallPlaceholder')}"
                              @input=${(e) => this._onTastingChange("overall", e)}
                            ></textarea>
                          </div>
                        </div>
                        <div style="margin-top: 12px; text-align: right">
                          <button
                            class="btn btn-primary"
                            ?disabled=${this._saving}
                            @click=${this._saveRating}
                          >
                            ${this._saving ? this._t("ui.wineDetail.saving") : this._t("ui.wineDetail.save")}
                          </button>
                        </div>
                      `
                : this._hasTastingNotes()
                    ? b$1 `
                          <div class="tasting-grid">
                            ${this._tastingNotes.aroma
                        ? b$1 `<div class="tasting-field"><label>${this._t("ui.wineDetail.aromaLabel")}</label><div class="tasting-value">${this._tastingNotes.aroma}</div></div>`
                        : A$1}
                            ${this._tastingNotes.taste
                        ? b$1 `<div class="tasting-field"><label>${this._t("ui.wineDetail.tasteLabel")}</label><div class="tasting-value">${this._tastingNotes.taste}</div></div>`
                        : A$1}
                            ${this._tastingNotes.finish
                        ? b$1 `<div class="tasting-field"><label>${this._t("ui.wineDetail.finishLabel")}</label><div class="tasting-value">${this._tastingNotes.finish}</div></div>`
                        : A$1}
                            ${this._tastingNotes.overall
                        ? b$1 `<div class="tasting-field full-width"><label>${this._t("ui.wineDetail.overallLabel")}</label><div class="tasting-value">${this._tastingNotes.overall}</div></div>`
                        : A$1}
                          </div>
                        `
                    : b$1 `<div class="no-rating">${this._t("ui.wineDetail.noTastingNotes")}</div>`}
                </div>
                ` : A$1}

              `}
          ${this._showRemoveConfirm ? b$1 `
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:320px;width:90%;text-align:center" @click=${(e) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.removeWineTitle")}</h3>
                <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.removeWineQuestion")}</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
                  ${getRemovalReasons(this.hass?.language).map(r => b$1 `
                    <button
                      style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em;transition:all 0.15s"
                      @click=${() => this._confirmRemove(r.id)}
                    >${r.label}</button>
                  `)}
                </div>
                <button
                  style="margin-top:12px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                  @click=${() => (this._showRemoveConfirm = false)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          ` : A$1}
          ${this._showDrinkDialog ? b$1 `
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:340px;width:90%;text-align:center" @click=${(e) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.drinkTitle")}</h3>
                <p style="margin:0 0 12px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.drinkIntro")}</p>
                <div style="margin-bottom:10px">
                  <star-rating
                    .value=${this._drinkRating}
                    @rating-change=${(e) => (this._drinkRating = e.detail.value)}
                  ></star-rating>
                </div>
                <textarea
                  rows="3"
                  style="width:100%;box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--wc-border);background:var(--wc-field-bg);color:var(--wc-text);font:inherit;font-size:0.85em;resize:vertical"
                  placeholder="${this._t("ui.wineDetail.drinkNotesPlaceholder")}"
                  .value=${this._drinkNotes}
                  @input=${(e) => (this._drinkNotes = e.target.value)}
                ></textarea>
                <label style="display:flex;align-items:center;gap:8px;margin:10px 0 16px;font-size:0.9em;color:var(--wc-text);cursor:pointer;text-align:left">
                  <input type="checkbox" .checked=${this._drinkBuyAgain}
                    @change=${(e) => (this._drinkBuyAgain = e.target.checked)} />
                  <span>🛒 ${this._t("ui.wineDetail.buyAgainLabel")}
                    <small style="display:block;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.buyAgainHint")}</small></span>
                </label>
                <div style="display:flex;gap:8px;justify-content:center">
                  <button class="btn btn-primary" style="background:#722F37" @click=${this._confirmDrink}>🍷 ${this._t("ui.wineDetail.drinkConfirmBtn")}</button>
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                    @click=${() => (this._showDrinkDialog = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : A$1}
          ${this._pendingVivinoImage ? b$1 `
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:320px;width:90%;text-align:center" @click=${(e) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.vivinoPhotoAvailableTitle")}</h3>
                <p style="margin:0 0 12px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.vivinoPhotoAvailableBody")}</p>
                <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">
                  <div style="text-align:center">
                    <img src="${wine.image_url}" style="width:70px;height:100px;object-fit:cover;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2)" />
                    <div style="font-size:0.7em;color:var(--wc-text-secondary);margin-top:4px">${this._t("ui.wineDetail.currentPhotoLabel")}</div>
                  </div>
                  <div style="text-align:center">
                    <img src="${this._pendingVivinoImage}" style="width:70px;height:100px;object-fit:cover;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2)" />
                    <div style="font-size:0.7em;color:var(--wc-text-secondary);margin-top:4px">Vivino</div>
                  </div>
                </div>
                <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
                  <button
                    style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                    @click=${this._dismissVivinoPhoto}
                  >${this._t("ui.wineDetail.keepMyPhotoBtn")}</button>
                  <button class="btn btn-primary" style="background:#8e24aa" @click=${this._applyVivinoPhoto}>${this._t("ui.wineDetail.useVivinoPhotoBtn")}</button>
                </div>
              </div>
            </div>
          ` : A$1}
          ${this._showPhotoCamera ? b$1 `
            <div
              style="position:absolute;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px;padding:16px"
              @click=${() => (this._showPhotoCamera = false)}
            >
              <div style="width:100%" @click=${(e) => e.stopPropagation()}>
                <label-camera .hass=${this.hass} .active=${this._showPhotoCamera} @photo-captured=${this._onPhotoReplaced}></label-camera>
                <div style="text-align:center;margin-top:12px">
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.85em"
                    @click=${() => (this._showPhotoCamera = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : A$1}
          ${this._showLabelCamera ? b$1 `
            <div
              style="position:absolute;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px;padding:16px"
              @click=${() => (this._showLabelCamera = false)}
            >
              <div style="width:100%" @click=${(e) => e.stopPropagation()}>
                <label-camera .hass=${this.hass} .active=${this._showLabelCamera} @photo-captured=${this._onLabelPhotoScanned}></label-camera>
                <div style="text-align:center;margin-top:12px">
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.85em"
                    @click=${() => (this._showLabelCamera = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : A$1}
          ${this._showLookupChooser ? b$1 `
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px"
              @click=${() => (this._showLookupChooser = false)}>
              <div style="background:var(--wc-bg);border-radius:12px;padding:20px;max-width:320px;width:90%" @click=${(e) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.wineDetail.lookupChooserTitle")}</h3>
                <p style="margin:0 0 12px;font-size:0.85em;color:var(--wc-text-secondary)">${this._t("ui.wineDetail.lookupChooserIntro")}</p>
                <div class="lookup-options">
                  <button class="lookup-option" style="background:#8e24aa" @click=${() => this._pickLookup("vivino")}>
                    <span>🍇 Vivino</span>
                    <small>${this._t("ui.wineDetail.lookupVivinoDesc")}</small>
                  </button>
                  <button class="lookup-option" style="background:#1565c0" @click=${() => this._pickLookup("ai")}>
                    <span>🤖 ${this._t("ui.wineDetail.aiScanBtn")}</span>
                    <small>${this._t("ui.wineDetail.lookupAiDesc")}</small>
                  </button>
                  <button class="lookup-option" style="background:#78909c"
                    ?disabled=${this._resettingAiContent} @click=${() => this._pickLookup("reset")}>
                    <span>♻️ ${this._t("ui.wineDetail.resetAiContentBtn")}</span>
                    <small>${this._t("ui.wineDetail.resetAiContentTitle")}</small>
                  </button>
                </div>
                <div style="text-align:center">
                  <button
                    style="padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                    @click=${() => (this._showLookupChooser = false)}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : A$1}
          ${this._aiFallbackReason ? b$1 `
            <div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10;border-radius:16px">
              <div style="background:var(--wc-bg);border-radius:12px;padding:24px;max-width:320px;width:90%;text-align:center" @click=${(e) => e.stopPropagation()}>
                <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._aiFallbackReason === "no_match" ? this._t("ui.wineDetail.noVivinoMatchTitle") : this._t("ui.wineDetail.noPriceFoundTitle")}</h3>
                <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">${this._aiFallbackReason === "no_match"
            ? this._t("ui.wineDetail.vivinoNoMatchBody")
            : this._t("ui.wineDetail.vivinoNoPriceBody")}</p>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <button class="btn btn-primary" style="background:#1565c0" @click=${() => this._confirmAiFallback(false)}>${this._t("ui.wineDetail.useAiOnceBtn")}</button>
                  <button
                    style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                    @click=${() => this._confirmAiFallback(true)}
                  >${this._t("ui.wineDetail.alwaysUseAiBtn")}</button>
                  <button
                    style="margin-top:4px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                    @click=${this._dismissAiFallback}
                  >${this._t("ui.common.cancel")}</button>
                </div>
              </div>
            </div>
          ` : A$1}
        </div>
      </div>
    `;
    }
};
WineDetailDialog.styles = [
    sharedStyles,
    i$4 `
      .dialog-top-bar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        /* Right padding leaves the corner to the shared ✕ (dialogClose),
           which lines up with this bar: 12px down, 36px tall. */
        min-height: 36px;
        padding: 12px 56px 0 12px;
      }

      .wine-header {
        display: flex;
        gap: 16px;
        padding: 4px 20px 20px;
      }

      .wine-image {
        width: 135px;
        height: 195px;
        border-radius: 8px;
        object-fit: cover;
        background: #f0f0f0;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .wine-image-wrap {
        position: relative;
        flex-shrink: 0;
        touch-action: pan-y;
      }

      .photo-dots {
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
      }

      .photo-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(0, 0, 0, 0.25);
        cursor: pointer;
      }

      .photo-dot.active {
        background: #fff;
      }

      .photo-side-badge {
        position: absolute;
        bottom: 6px;
        left: 6px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 0.6em;
        padding: 2px 6px;
        border-radius: 10px;
        pointer-events: none;
      }

      .photo-actions {
        position: absolute;
        bottom: 6px;
        right: 6px;
        display: flex;
        gap: 6px;
      }

      .photo-action-btn {
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        cursor: pointer;
        font-size: 1em;
        line-height: 1;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
        transition: background 0.15s, transform 0.15s;
      }

      .photo-action-btn:hover {
        background: #fff;
        transform: scale(1.06);
      }

      .photo-action-btn:disabled {
        opacity: 0.5;
        cursor: default;
        transform: none;
      }

      .wine-image-placeholder {
        width: 135px;
        height: 195px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        flex-shrink: 0;
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }

      .wine-image-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }

      .wine-location {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        width: 90px;
        font-size: 0.68em;
        line-height: 1.3;
        text-align: center;
        color: var(--wc-text-secondary, #888);
        cursor: pointer;
      }

      .wine-location:hover {
        color: var(--wc-primary-text);
        text-decoration: underline;
      }

      .wine-title {
        flex: 1;
        min-width: 0;
      }

      .wine-name {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--wc-text);
        margin-bottom: 4px;
      }

      .wine-winery {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .wine-type-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 0.75em;
        font-weight: 600;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .wine-rating {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
        font-size: 0.9em;
      }

      .rating-star {
        color: #f5a623;
      }

      .drink-by-banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        font-size: 0.9em;
        font-weight: 500;
      }

      .drink-by-banner.drink {
        background: rgba(46, 125, 50, 0.12);
        color: #2e7d32;
      }

      .drink-by-banner.drink.peak {
        background: rgba(27, 94, 32, 0.2);
        color: #1b5e20;
        font-weight: 600;
      }

      .drink-by-banner.hold {
        background: rgba(21, 101, 192, 0.12);
        color: #1565c0;
      }

      .drink-by-banner.past {
        background: rgba(198, 40, 40, 0.12);
        color: #c62828;
      }

      .drink-by-banner.chambering-ready {
        background: rgba(46, 125, 50, 0.12);
        color: #2e7d32;
      }

      .drink-by-banner.chambering-warm_up {
        background: rgba(230, 81, 0, 0.12);
        color: #e65100;
      }

      .drink-by-banner.chambering-chill {
        background: rgba(2, 119, 189, 0.12);
        color: #0277bd;
      }

      .wine-description {
        padding: 0 20px 12px;
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
        font-style: italic;
      }

      .info-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 20px 12px;
      }

      .info-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.75em;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid var(--wc-border);
        color: var(--wc-text-secondary);
      }

      .info-chip-icon {
        font-size: 1.1em;
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 0 20px 16px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
      }

      .detail-label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .detail-value {
        font-size: 0.95em;
        color: var(--wc-text);
        font-weight: 500;
      }

      .wine-notes {
        padding: 0 20px 16px;
      }

      .wine-notes-text {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        font-style: italic;
        background: rgba(128, 128, 128, 0.08);
        padding: 10px;
        border-radius: 8px;
      }

      /* Rating & Tasting Notes section */
      .section {
        padding: 0 20px 16px;
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .section-title {
        font-size: 0.85em;
        font-weight: 600;
        color: var(--wc-text);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .edit-toggle {
        background: none;
        border: none;
        color: var(--wc-primary-text);
        cursor: pointer;
        font-size: 0.85em;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.2s;
      }

      .edit-toggle:hover {
        background: rgba(109, 76, 65, 0.1);
      }

      .rating-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .rating-label {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        min-width: 70px;
      }

      .no-rating {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        font-style: italic;
      }

      .tasting-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .tasting-field {
        display: flex;
        flex-direction: column;
      }

      .tasting-field.full-width {
        grid-column: 1 / -1;
      }

      .tasting-field label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .tasting-field textarea {
        font-family: inherit;
        font-size: 0.85em;
        padding: 8px;
        border: 1px solid var(--wc-border, #e0e0e0);
        border-radius: 8px;
        resize: vertical;
        min-height: 50px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
      }

      .tasting-field textarea:focus {
        outline: none;
        border-color: var(--wc-primary-text);
      }

      .tasting-value {
        font-size: 0.85em;
        color: var(--wc-text);
        background: rgba(128, 128, 128, 0.08);
        padding: 8px;
        border-radius: 8px;
        min-height: 20px;
      }

      .ai-ratings {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 20px 12px;
      }

      .ai-rating-chip {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.75em;
        background: rgba(245, 166, 35, 0.12);
        border: 1px solid rgba(245, 166, 35, 0.3);
        color: #f5a623;
        font-weight: 600;
      }

      .ai-rating-chip .source {
        font-weight: 400;
        opacity: 0.8;
      }

      .drink-window {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        padding: 0 20px 8px;
      }

      .divider {
        height: 1px;
        background: var(--wc-border, #e0e0e0);
        margin: 0 20px 16px;
      }

      .actions {
        display: flex;
        gap: 6px;
        padding: 0 16px 16px;
        border-bottom: 1px solid var(--wc-border);
        justify-content: center;
        flex-wrap: wrap;
      }

      .actions .btn {
        font-size: 0.8em;
        padding: 6px 10px;
        white-space: nowrap;
      }

      /* Bottle actions: two cards — look-up (Vivino/AI, label photo, edit)
         and manage (copy/move/unassign/remove) — then a big Drink button in
         its own card below them, so the everyday action isn't lost among
         the rest. */
      .actions.grouped {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }

      .action-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .action-card {
        flex: 1 1 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        padding: 8px;
        border: 1px solid var(--wc-border);
        border-radius: 12px;
        background: var(--wc-hover);
      }

      .actions .btn.drink-btn {
        flex: 1;
        justify-content: center;
        font-size: 1.05em;
        font-weight: 600;
        padding: 12px 16px;
        border-radius: 12px;
      }

      .lookup-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }

      .lookup-option {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: none;
        border-radius: 10px;
        padding: 10px 14px;
        color: #fff;
        cursor: pointer;
        text-align: left;
        font-size: 0.9em;
        font-weight: 500;
      }

      .lookup-option small {
        font-size: 0.8em;
        font-weight: 400;
        opacity: 0.85;
      }

      .lookup-option:disabled {
        opacity: 0.6;
        cursor: default;
      }

      /* Edit form styles */
      .edit-form {
        padding: 0 20px 16px;
      }

      .edit-form .form-group {
        margin-bottom: 12px;
      }

      .edit-form .form-group label {
        display: block;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .edit-form .form-group input,
      .edit-form .form-group select,
      .edit-form .form-group textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        font-size: 0.9em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        box-sizing: border-box;
        font-family: inherit;
      }

      .edit-form .form-group textarea {
        min-height: 60px;
        resize: vertical;
      }

      .edit-form .form-group input:focus,
      .edit-form .form-group select:focus,
      .edit-form .form-group textarea:focus {
        outline: none;
        border-color: var(--wc-primary);
      }

      .edit-form .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .edit-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        padding: 12px 20px 20px;
        border-top: 1px solid var(--wc-border);
      }

      @media (max-width: 599px) {
        .tasting-grid {
          grid-template-columns: 1fr;
        }
        .tasting-field.full-width {
          grid-column: 1;
        }
        .edit-form .form-row {
          grid-template-columns: 1fr;
        }
        /* Photo column capped at the photo's own width (a photo that fails
           to load would otherwise widen it to its alt text), and the header
           padding trimmed, so the name/rating column keeps enough room for
           the 5 stars on a 360px phone. */
        .wine-header {
          padding: 4px 16px 16px;
          gap: 12px;
        }
        .wine-image-col {
          max-width: 135px;
        }
      }

      @media (max-width: 400px) {
        .wine-image,
        .wine-image-placeholder {
          width: 100px;
          height: 145px;
        }
        .wine-image-col {
          max-width: 100px;
        }
      }

      /* Touch: the photo dots stay small visually but get a finger-sized
         invisible hit area; the location link gets a full-height row. */
      @media (pointer: coarse) {
        .photo-dots {
          gap: 16px;
        }
        .photo-dot {
          position: relative;
          width: 10px;
          height: 10px;
        }
        .photo-dot::after {
          content: "";
          position: absolute;
          inset: -14px;
        }
        .wine-location {
          min-height: 44px;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ attribute: false })
], WineDetailDialog.prototype, "wine", void 0);
__decorate([
    n$1({ attribute: false })
], WineDetailDialog.prototype, "wines", void 0);
__decorate([
    n$1({ attribute: false })
], WineDetailDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], WineDetailDialog.prototype, "cabinets", void 0);
__decorate([
    n$1({ type: Boolean })
], WineDetailDialog.prototype, "open", void 0);
__decorate([
    n$1({ type: String })
], WineDetailDialog.prototype, "mode", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_editing", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_editingFields", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_editData", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_editDrinkFrom", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_userRating", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_tastingNotes", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_saving", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_refreshing", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_analyzing", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_showLookupChooser", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_resettingAiContent", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_scanningLabel", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_showLabelCamera", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_showRemoveConfirm", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_showDrinkDialog", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_drinkRating", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_drinkNotes", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_drinkBuyAgain", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_pendingVivinoImage", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_showPhotoCamera", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_photoBusy", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_photoSide", void 0);
__decorate([
    r$1()
], WineDetailDialog.prototype, "_aiFallbackReason", void 0);
__decorate([
    n$1({ type: Boolean })
], WineDetailDialog.prototype, "hasGemini", void 0);
__decorate([
    n$1({ type: Boolean })
], WineDetailDialog.prototype, "aiFallbackAlways", void 0);
__decorate([
    n$1({ type: Boolean })
], WineDetailDialog.prototype, "enableWhisky", void 0);
__decorate([
    n$1({ type: String })
], WineDetailDialog.prototype, "currency", void 0);
__decorate([
    n$1({ type: String })
], WineDetailDialog.prototype, "chamberingRoomSensor", void 0);
__decorate([
    n$1({ type: Number })
], WineDetailDialog.prototype, "chamberingTimeConstantMinutes", void 0);
__decorate([
    n$1({ type: Number })
], WineDetailDialog.prototype, "chamberingEquilibrationHours", void 0);
WineDetailDialog = __decorate([
    t$2("wine-detail-dialog")
], WineDetailDialog);

//#region node_modules/.pnpm/zxing-wasm@3.1.3_@types+emscripten@1.41.5/node_modules/zxing-wasm/dist/es/share.js
var e = [
	[
		"All",
		"*",
		"*",
		"     ",
		0,
		"All"
	],
	[
		"AllReadable",
		"*",
		"r",
		"     ",
		0,
		"All Readable"
	],
	[
		"AllCreatable",
		"*",
		"w",
		"     ",
		0,
		"All Creatable"
	],
	[
		"AllLinear",
		"*",
		"l",
		"     ",
		0,
		"All Linear"
	],
	[
		"AllMatrix",
		"*",
		"m",
		"     ",
		0,
		"All Matrix"
	],
	[
		"AllGS1",
		"*",
		"G",
		"     ",
		0,
		"All GS1"
	],
	[
		"AllRetail",
		"*",
		"R",
		"     ",
		0,
		"All Retail"
	],
	[
		"AllIndustrial",
		"*",
		"I",
		"     ",
		0,
		"All Industrial"
	],
	[
		"Codabar",
		"F",
		" ",
		"lrw  ",
		18,
		"Codabar"
	],
	[
		"Code39",
		"A",
		" ",
		"lrw I",
		8,
		"Code 39"
	],
	[
		"Code39Std",
		"A",
		"s",
		"lrw I",
		8,
		"Code 39 Standard"
	],
	[
		"Code39Ext",
		"A",
		"e",
		"lr  I",
		9,
		"Code 39 Extended"
	],
	[
		"Code32",
		"A",
		"2",
		"lr  I",
		129,
		"Code 32"
	],
	[
		"PZN",
		"A",
		"p",
		"lr  I",
		52,
		"Pharmazentralnummer"
	],
	[
		"Code93",
		"G",
		" ",
		"lrw I",
		25,
		"Code 93"
	],
	[
		"Code128",
		"C",
		" ",
		"lrwGI",
		20,
		"Code 128"
	],
	[
		"ITF",
		"I",
		" ",
		"lrw I",
		3,
		"ITF"
	],
	[
		"ITF14",
		"I",
		"4",
		"lr  I",
		89,
		"ITF-14"
	],
	[
		"DataBar",
		"e",
		" ",
		"lr GR",
		29,
		"DataBar"
	],
	[
		"DataBarOmni",
		"e",
		"o",
		"lr GR",
		29,
		"DataBar Omni"
	],
	[
		"DataBarStk",
		"e",
		"s",
		"lr GR",
		79,
		"DataBar Stacked"
	],
	[
		"DataBarStkOmni",
		"e",
		"O",
		"lr GR",
		80,
		"DataBar Stacked Omni"
	],
	[
		"DataBarLtd",
		"e",
		"l",
		"lr GR",
		30,
		"DataBar Limited"
	],
	[
		"DataBarExp",
		"e",
		"e",
		"lr GR",
		31,
		"DataBar Expanded"
	],
	[
		"DataBarExpStk",
		"e",
		"E",
		"lr GR",
		81,
		"DataBar Expanded Stacked"
	],
	[
		"EANUPC",
		"E",
		" ",
		"lr  R",
		15,
		"EAN/UPC"
	],
	[
		"EAN13",
		"E",
		"1",
		"lrw R",
		15,
		"EAN-13"
	],
	[
		"EAN8",
		"E",
		"8",
		"lrw R",
		10,
		"EAN-8"
	],
	[
		"EAN5",
		"E",
		"5",
		"l   R",
		12,
		"EAN-5"
	],
	[
		"EAN2",
		"E",
		"2",
		"l   R",
		11,
		"EAN-2"
	],
	[
		"ISBN",
		"E",
		"i",
		"lr  R",
		69,
		"ISBN"
	],
	[
		"UPCA",
		"E",
		"a",
		"lrw R",
		34,
		"UPC-A"
	],
	[
		"UPCE",
		"E",
		"e",
		"lrw R",
		37,
		"UPC-E"
	],
	[
		"Telepen",
		"B",
		" ",
		"lr  I",
		32,
		"Telepen"
	],
	[
		"TelepenAlpha",
		"B",
		"0",
		"lr  I",
		32,
		"Telepen Alpha"
	],
	[
		"TelepenNumeric",
		"B",
		"1",
		"lr  I",
		87,
		"Telepen Numeric"
	],
	[
		"OtherBarcode",
		"X",
		" ",
		" r   ",
		0,
		"Other barcode"
	],
	[
		"DXFilmEdge",
		"X",
		"x",
		"lr   ",
		147,
		"DX Film Edge"
	],
	[
		"PDF417",
		"L",
		" ",
		"mrw  ",
		55,
		"PDF417"
	],
	[
		"CompactPDF417",
		"L",
		"c",
		"mr   ",
		56,
		"Compact PDF417"
	],
	[
		"MicroPDF417",
		"L",
		"m",
		"mr   ",
		84,
		"MicroPDF417"
	],
	[
		"Aztec",
		"z",
		" ",
		"mr G ",
		92,
		"Aztec"
	],
	[
		"AztecCode",
		"z",
		"c",
		"mrwG ",
		92,
		"Aztec Code"
	],
	[
		"AztecRune",
		"z",
		"r",
		"mr   ",
		128,
		"Aztec Rune"
	],
	[
		"QRCode",
		"Q",
		" ",
		"mrwG ",
		58,
		"QR Code"
	],
	[
		"QRCodeModel1",
		"Q",
		"1",
		"mr   ",
		0,
		"QR Code Model 1"
	],
	[
		"QRCodeModel2",
		"Q",
		"2",
		"mr   ",
		58,
		"QR Code Model 2"
	],
	[
		"MicroQRCode",
		"Q",
		"m",
		"mr   ",
		97,
		"Micro QR Code"
	],
	[
		"RMQRCode",
		"Q",
		"r",
		"mr G ",
		145,
		"rMQR Code"
	],
	[
		"DataMatrix",
		"d",
		" ",
		"mrwG ",
		71,
		"Data Matrix"
	],
	[
		"MaxiCode",
		"U",
		" ",
		"mr   ",
		57,
		"MaxiCode"
	]
], t = {
	DataBarExpanded: "DataBarExp",
	DataBarLimited: "DataBarLtd",
	"Linear-Codes": "AllLinear",
	"Matrix-Codes": "AllMatrix",
	Any: "All",
	rMQRCode: "RMQRCode"
};
e.map((e) => e[5]), e.filter((e) => e[1] === "*").map((e) => e[0]), e.filter((e) => e[1] !== "*").map((e) => e[0]), e.filter((e) => e[2] === " ").map((e) => e[0]), e.filter((e) => e[3][0] === "l").map((e) => e[0]), e.filter((e) => e[3][0] === "m").map((e) => e[0]), e.filter((e) => e[3][1] === "r").map((e) => e[0]), e.filter((e) => e[3][2] === "w" || e[4] !== 0).map((e) => e[0]), e.filter((e) => e[3][3] === "G").map((e) => e[0]), e.filter((e) => e[3][4] === "R").map((e) => e[0]), e.filter((e) => e[3][4] === "I").map((e) => e[0]);
function n(e) {
	var n;
	return (n = t[e]) == null ? e : n;
}
function r(e) {
	return e.map(n).join(",");
}
var i = [
	"LocalAverage",
	"GlobalHistogram",
	"FixedThreshold",
	"BoolCast"
];
function a(e) {
	return i.indexOf(e);
}
var o = /* @__PURE__ */ "Unknown.ASCII.ISO8859_1.ISO8859_2.ISO8859_3.ISO8859_4.ISO8859_5.ISO8859_6.ISO8859_7.ISO8859_8.ISO8859_9.ISO8859_10.ISO8859_11.ISO8859_13.ISO8859_14.ISO8859_15.ISO8859_16.Cp437.Cp1250.Cp1251.Cp1252.Cp1256.Shift_JIS.Big5.GB2312.GB18030.EUC_JP.EUC_KR.UTF16BE.UTF8.UTF16LE.UTF32BE.UTF32LE.BINARY".split(".");
function s(e) {
	return e === "UnicodeBig" ? o.indexOf("UTF16BE") : o.indexOf(e);
}
var c = [
	"Text",
	"Binary",
	"Mixed",
	"GS1",
	"ISO15434",
	"UnknownECI"
];
function l(e) {
	return c[e];
}
var u = [
	"Ignore",
	"Read",
	"Require"
];
function d(e) {
	return u.indexOf(e);
}
var f = [
	"Plain",
	"ECI",
	"HRI",
	"Escaped",
	"Hex",
	"HexECI"
];
function p(e) {
	return f.indexOf(e);
}
var m = {
	formats: [],
	tryHarder: true,
	tryRotate: true,
	tryInvert: true,
	tryDownscale: true,
	tryDenoise: false,
	binarizer: "LocalAverage",
	isPure: false,
	downscaleFactor: 3,
	downscaleThreshold: 500,
	minLineCount: 2,
	maxNumberOfSymbols: 255,
	validateOptionalChecksum: false,
	returnErrors: false,
	eanAddOnSymbol: "Ignore",
	textMode: "HRI",
	characterSet: "Unknown",
	tryCode39ExtendedMode: true
};
function h(e) {
	var t;
	return {
		...e,
		formats: r(e.formats),
		binarizer: a(e.binarizer),
		eanAddOnSymbol: d(e.eanAddOnSymbol),
		textMode: p(e.textMode),
		characterSet: s(e.characterSet),
		tryCode39ExtendedMode: (t = e.tryCode39ExtendedMode) == null || t
	};
}
function g(e) {
	return {
		...e,
		format: e.format,
		symbology: e.symbology,
		contentType: l(e.contentType)
	};
}
var ne = { locateFile: (e, t) => {
	let n = e.match(/_(.+?)\.wasm$/);
	return n ? `https://fastly.jsdelivr.net/npm/zxing-wasm@3.1.3/dist/${n[1]}/${e}` : t + e;
} }, v = /* @__PURE__ */ new WeakMap();
function re(e, t) {
	return Object.is(e, t) || Object.keys(e).length === Object.keys(t).length && Object.keys(e).every((n) => Object.hasOwn(t, n) && e[n] === t[n]);
}
function ie(e, { overrides: t, equalityFn: n = re, fireImmediately: r = false } = {}) {
	var i, a;
	let [o, s] = (i = v.get(e)) == null ? [ne] : i, c = t == null ? o : t, l;
	if (r) {
		if (s && (l = n(o, c))) return s;
		let t = e({ ...c });
		return v.set(e, [c, t]), t;
	}
	((a = l) == null ? n(o, c) : a) || v.set(e, [c]);
}
function y(e) {
	let t = e.byteLength >> 2, n = new Uint8Array(t);
	for (let r = 0; r < t; r++) {
		let t = r << 2;
		n[r] = 306 * e[t] + 601 * e[t + 1] + 117 * e[t + 2] + 512 >> 10;
	}
	return n;
}
async function oe(e, t, n = m) {
	let r = {
		...m,
		...n
	}, i = await ie(e, { fireImmediately: true }), a, o;
	if ("width" in t && "height" in t && "data" in t) {
		let { data: e, width: n, height: s } = t, c = y(e), l = c.byteLength;
		if (o = i._malloc(l), !o) throw Error(`Failed to allocate ${l} bytes in WASM memory`);
		try {
			i.HEAPU8.set(c, o), a = i.readBarcodesFromPixmap(o, n, s, h(r));
		} finally {
			i._free(o);
		}
	} else {
		let e, n;
		if ("buffer" in t) [e, n] = [t.byteLength, t];
		else if ("byteLength" in t) [e, n] = [t.byteLength, new Uint8Array(t)];
		else if ("size" in t) [e, n] = [t.size, new Uint8Array(await t.arrayBuffer())];
		else throw TypeError("Invalid input type");
		if (o = i._malloc(e), !o) throw Error(`Failed to allocate ${e} bytes in WASM memory`);
		try {
			i.HEAPU8.set(n, o), a = i.readBarcodesFromImage(o, e, h(r));
		} finally {
			i._free(o);
		}
	}
	let s = [];
	for (let e = 0; e < a.size(); ++e) s.push(g(a.get(e)));
	return s;
}
(({ ...m })), [...m.formats];
//#endregion
//#region node_modules/.pnpm/zxing-wasm@3.1.3_@types+emscripten@1.41.5/node_modules/zxing-wasm/dist/es/reader/index.js
async function se(e = {}) {
	var t, n, r, i = e, a = !!globalThis.window, o = typeof Bun < "u", s = !!globalThis.WorkerGlobalScope;
	(n = globalThis.process) != null && (n = n.versions) != null && n.node && ((r = globalThis.process) == null || r.type);
	var c = "./this.program", l, u = "";
	function d(e) {
		return i.locateFile ? i.locateFile(e, u) : u + e;
	}
	var f, p;
	if (a || s || o) {
		try {
			u = new URL(".", l).href;
		} catch {}
		s && (p = (e) => {
			var t = new XMLHttpRequest();
			return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
		}), f = async (e) => {
			var t = await fetch(e, { credentials: "same-origin" });
			if (t.ok) return t.arrayBuffer();
			throw Error(t.status + " : " + t.url);
		};
	}
	console.log.bind(console);
	var m = console.error.bind(console), h, g = false, _, ee, te = false;
	function ne() {
		var e = Un.buffer;
		S = new Int8Array(e), b = new Int16Array(e), i.HEAPU8 = T = new Uint8Array(e), C = new Uint16Array(e), x = new Int32Array(e), w = new Uint32Array(e), pe = new Float32Array(e), me = new Float64Array(e);
	}
	function v() {
		if (i.preRun) for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length;) ye(i.preRun.shift());
		he(ve);
	}
	function re() {
		te = true, Nr.za();
	}
	function ie() {
		if (i.postRun) for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length;) _e(i.postRun.shift());
		he(ge);
	}
	function ae(e) {
		var t, n;
		(t = i.onAbort) == null || t.call(i, e), e = "Aborted(" + e + ")", m(e), g = true, e += ". Build with -sASSERTIONS for more info.";
		var r = new WebAssembly.RuntimeError(e);
		throw (n = ee) == null || n(r), r;
	}
	var y;
	function oe() {
		return d("zxing_reader.wasm");
	}
	function se(e) {
		if (e == y && h) return new Uint8Array(h);
		if (p) return p(e);
		throw "both async and sync fetching of the wasm failed";
	}
	async function ce(e) {
		if (!h) try {
			var t = await f(e);
			return new Uint8Array(t);
		} catch {}
		return se(e);
	}
	async function le(e, t) {
		try {
			var n = await ce(e);
			return await WebAssembly.instantiate(n, t);
		} catch (e) {
			m(`failed to asynchronously prepare wasm: ${e}`), ae(e);
		}
	}
	async function ue(e, t, n) {
		if (!e && WebAssembly.instantiateStreaming) try {
			var r = fetch(t, { credentials: "same-origin" });
			return await WebAssembly.instantiateStreaming(r, n);
		} catch (e) {
			m(`wasm streaming compile failed: ${e}`), m("falling back to ArrayBuffer instantiation");
		}
		return le(t, n);
	}
	function de() {
		return { a: Kn };
	}
	async function fe() {
		function e(e, t) {
			return Nr = e.exports, Gn(Nr), ne(), Nr;
		}
		function t(t) {
			return e(t.instance);
		}
		var n = de();
		return i.instantiateWasm ? new Promise((t, r) => {
			i.instantiateWasm(n, (n, r) => {
				t(e(n));
			});
		}) : (y != null || (y = oe()), t(await ue(h, y, n)));
	}
	var b, x, S, pe, me, C, w, T, he = (e) => {
		for (; e.length > 0;) e.shift()(i);
	}, ge = [], _e = (e) => ge.push(e), ve = [], ye = (e) => ve.push(e), E = (e) => Fn(e), D = () => In(), O = [], k = 0, be = (e) => {
		var t = new Se(e);
		return t.get_caught() || (t.set_caught(true), k--), t.set_rethrown(false), O.push(t), Nn(e);
	}, A = 0, xe = () => {
		$(0, 0);
		var e = O.pop();
		Ln(e.excPtr), A = 0;
	};
	class Se {
		constructor(e) {
			this.excPtr = e, this.ptr = e - 24;
		}
		set_type(e) {
			w[this.ptr + 4 >> 2] = e;
		}
		get_type() {
			return w[this.ptr + 4 >> 2];
		}
		set_destructor(e) {
			w[this.ptr + 8 >> 2] = e;
		}
		get_destructor() {
			return w[this.ptr + 8 >> 2];
		}
		set_caught(e) {
			e = +!!e, S[this.ptr + 12] = e;
		}
		get_caught() {
			return S[this.ptr + 12] != 0;
		}
		set_rethrown(e) {
			e = +!!e, S[this.ptr + 13] = e;
		}
		get_rethrown() {
			return S[this.ptr + 13] != 0;
		}
		init(e, t) {
			this.set_adjusted_ptr(0), this.set_type(e), this.set_destructor(t);
		}
		set_adjusted_ptr(e) {
			w[this.ptr + 16 >> 2] = e;
		}
		get_adjusted_ptr() {
			return w[this.ptr + 16 >> 2];
		}
	}
	var j = (e) => Pn(e), M = (e) => {
		var t = A;
		if (!t) return j(0), 0;
		var n = new Se(t);
		n.set_adjusted_ptr(t);
		var r = n.get_type();
		if (!r) return j(0), t;
		for (var i of e) {
			if (i === 0 || i === r) break;
			var a = n.ptr + 16;
			if (zn(i, r, a)) return j(i), t;
		}
		return j(r), t;
	}, Ce = () => M([]), we = (e) => M([e]), Te = (e, t) => M([e, t]), Ee = () => {
		var e = O.pop();
		e || ae("no exception to throw");
		var t = e.excPtr;
		throw e.get_rethrown() || (O.push(e), e.set_rethrown(true), e.set_caught(false), k++), Rn(t), A = t, A;
	}, De = (e, t, n) => {
		throw new Se(e).init(t, n), Rn(e), A = e, k++, A;
	}, Oe = () => k, ke = (e) => {
		throw A || (A = e), A;
	}, Ae = () => ae(""), N = {}, P = (e) => {
		for (; e.length;) {
			var t = e.pop();
			e.pop()(t);
		}
	};
	function F(e) {
		return this.fromWireType(w[e >> 2]);
	}
	var I = {}, L = {}, je = {}, Me = class extends Error {
		constructor(e) {
			super(e), this.name = "InternalError";
		}
	}, R = (e) => {
		throw new Me(e);
	}, z = (e, t, n) => {
		e.forEach((e) => je[e] = t);
		function r(t) {
			var r = n(t);
			r.length !== e.length && R("Mismatched type converter count");
			for (var i = 0; i < e.length; ++i) U(e[i], r[i]);
		}
		var i = Array(t.length), a = [], o = 0;
		{
			let e = t;
			for (let t = 0; t < e.length; ++t) {
				let n = e[t];
				L.hasOwnProperty(n) ? i[t] = L[n] : (a.push(n), I.hasOwnProperty(n) || (I[n] = []), I[n].push(() => {
					i[t] = L[n], ++o, o === a.length && r(i);
				}));
			}
		}
		a.length === 0 && r(i);
	}, Ne = (e) => {
		var t = N[e];
		delete N[e];
		var n = t.rawConstructor, r = t.rawDestructor, i = t.fields, a = i.map((e) => e.getterReturnType).concat(i.map((e) => e.setterArgumentType));
		z([e], a, (e) => {
			var a = {};
			{
				let t = i;
				for (let n = 0; n < t.length; ++n) {
					let r = t[n], o = e[n], s = r.getter, c = r.getterContext, l = e[n + i.length], u = r.setter, d = r.setterContext;
					a[r.fieldName] = {
						read: (e) => o.fromWireType(s(c, e)),
						write: (e, t) => {
							var n = [];
							u(d, e, l.toWireType(n, t)), P(n);
						},
						optional: o.optional
					};
				}
			}
			return [{
				name: t.name,
				fromWireType: (e) => {
					var t = {};
					for (var n in a) t[n] = a[n].read(e);
					return r(e), t;
				},
				toWireType: (e, t) => {
					for (var i in a) if (!(i in t) && !a[i].optional) throw TypeError(`Missing field: "${i}"`);
					var o = n();
					for (i in a) a[i].write(o, t[i]);
					return e !== null && e.push(r, o), o;
				},
				readValueFromPointer: F,
				destructorFunction: r
			}];
		});
	}, Pe = (e, t, n, r, i) => {}, B = (e) => {
		for (var t = "";;) {
			var n = T[e++];
			if (!n) return t;
			t += String.fromCharCode(n);
		}
	}, V = class extends Error {
		constructor(e) {
			super(e), this.name = "BindingError";
		}
	}, H = (e) => {
		throw new V(e);
	};
	function Fe(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		var r = t.name;
		if (e || H(`type "${r}" must have a positive integer typeid pointer`), L.hasOwnProperty(e)) {
			if (n.ignoreDuplicateRegistrations) return;
			H(`Cannot register type '${r}' twice`);
		}
		if (L[e] = t, delete je[e], I.hasOwnProperty(e)) {
			var i = I[e];
			delete I[e], i.forEach((e) => e());
		}
	}
	function U(e, t) {
		return Fe(e, t, arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {});
	}
	var Ie = (e, t, n, r) => {
		t = B(t), U(e, {
			name: t,
			fromWireType: function(e) {
				return !!e;
			},
			toWireType: function(e, t) {
				return t ? n : r;
			},
			readValueFromPointer: function(e) {
				return this.fromWireType(T[e]);
			},
			destructorFunction: null
		});
	}, Le = (e) => ({
		count: e.count,
		deleteScheduled: e.deleteScheduled,
		preservePointerOnDelete: e.preservePointerOnDelete,
		ptr: e.ptr,
		ptrType: e.ptrType,
		smartPtr: e.smartPtr,
		smartPtrType: e.smartPtrType
	}), Re = (e) => {
		function t(e) {
			return e.$$.ptrType.registeredClass.name;
		}
		H(t(e) + " instance already deleted");
	}, ze = false, Be = (e) => {}, Ve = (e) => {
		e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
	}, He = (e) => {
		--e.count.value, e.count.value === 0 && Ve(e);
	}, W = (e) => globalThis.FinalizationRegistry ? (ze = new FinalizationRegistry((e) => {
		He(e.$$);
	}), W = (e) => {
		var t = e.$$;
		if (t.smartPtr) {
			var n = { $$: t };
			ze.register(e, n, e);
		}
		return e;
	}, Be = (e) => ze.unregister(e), W(e)) : (W = (e) => e, e), Ke = () => {
		let e = qe.prototype;
		Object.assign(e, {
			isAliasOf(e) {
				if (!(this instanceof qe) || !(e instanceof qe)) return false;
				var t = this.$$.ptrType.registeredClass, n = this.$$.ptr;
				e.$$ = e.$$;
				for (var r = e.$$.ptrType.registeredClass, i = e.$$.ptr; t.baseClass;) n = t.upcast(n), t = t.baseClass;
				for (; r.baseClass;) i = r.upcast(i), r = r.baseClass;
				return t === r && n === i;
			},
			clone() {
				if (this.$$.ptr || Re(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
				var e = W(Object.create(Object.getPrototypeOf(this), { $$: { value: Le(this.$$) } }));
				return e.$$.count.value += 1, e.$$.deleteScheduled = false, e;
			},
			delete() {
				this.$$.ptr || Re(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && H("Object already scheduled for deletion"), Be(this), He(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
			},
			isDeleted() {
				return !this.$$.ptr;
			},
			deleteLater() {
				return this.$$.ptr || Re(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && H("Object already scheduled for deletion"), this.$$.deleteScheduled = true, this;
			}
		});
		let t = Symbol.dispose;
		t && (e[t] = e.delete);
	};
	function qe() {}
	var Je = (e, t) => Object.defineProperty(t, "name", { value: e }), Ye = {}, Xe = (e, t, n) => {
		if (e[t].overloadTable === void 0) {
			var r = e[t];
			e[t] = function() {
				var r = [...arguments];
				return e[t].overloadTable.hasOwnProperty(r.length) || H(`Function '${n}' called with an invalid number of arguments (${r.length}) - expects one of (${e[t].overloadTable})!`), e[t].overloadTable[r.length].apply(this, r);
			}, e[t].overloadTable = [], e[t].overloadTable[r.argCount] = r;
		}
	}, Ze = (e, t, n) => {
		i.hasOwnProperty(e) ? ((n === void 0 || i[e].overloadTable !== void 0 && i[e].overloadTable[n] !== void 0) && H(`Cannot register public name '${e}' twice`), Xe(i, e, e), i[e].overloadTable.hasOwnProperty(n) && H(`Cannot register multiple overloads of a function with the same number of arguments (${n})!`), i[e].overloadTable[n] = t) : (i[e] = t, i[e].argCount = n);
	}, Qe = 48, $e = 57, et = (e) => {
		e = e.replace(/[^a-zA-Z0-9_]/g, "$");
		var t = e.charCodeAt(0);
		return t >= Qe && t <= $e ? `_${e}` : e;
	};
	function tt(e, t, n, r, i, a, o, s) {
		this.name = e, this.constructor = t, this.instancePrototype = n, this.rawDestructor = r, this.baseClass = i, this.getActualType = a, this.upcast = o, this.downcast = s, this.pureVirtualFunctions = [];
	}
	var nt = (e, t, n) => {
		for (; t !== n;) t.upcast || H(`Expected null or instance of ${n.name}, got an instance of ${t.name}`), e = t.upcast(e), t = t.baseClass;
		return e;
	}, rt = (e) => {
		if (e === null) return "null";
		var t = typeof e;
		return t === "object" || t === "array" || t === "function" ? e.toString() : "" + e;
	};
	function it(e, t) {
		if (t === null) return this.isReference && H(`null is not a valid ${this.name}`), 0;
		t.$$ || H(`Cannot pass "${rt(t)}" as a ${this.name}`), t.$$.ptr || H(`Cannot pass deleted object as a pointer of type ${this.name}`);
		var n = t.$$.ptrType.registeredClass;
		return nt(t.$$.ptr, n, this.registeredClass);
	}
	function at(e, t) {
		var n;
		if (t === null) return this.isReference && H(`null is not a valid ${this.name}`), this.isSmartPointer ? (n = this.rawConstructor(), e !== null && e.push(this.rawDestructor, n), n) : 0;
		(!t || !t.$$) && H(`Cannot pass "${rt(t)}" as a ${this.name}`), t.$$.ptr || H(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && t.$$.ptrType.isConst && H(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
		var r = t.$$.ptrType.registeredClass;
		if (n = nt(t.$$.ptr, r, this.registeredClass), this.isSmartPointer) switch (t.$$.smartPtr === void 0 && H("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
			case 0:
				t.$$.smartPtrType === this ? n = t.$$.smartPtr : H(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
				break;
			case 1:
				n = t.$$.smartPtr;
				break;
			case 2:
				if (t.$$.smartPtrType === this) n = t.$$.smartPtr;
				else {
					var i = t.clone();
					n = this.rawShare(n, Y.toHandle(() => i.delete())), e !== null && e.push(this.rawDestructor, n);
				}
				break;
			default: H("Unsupported sharing policy");
		}
		return n;
	}
	function ot(e, t) {
		if (t === null) return this.isReference && H(`null is not a valid ${this.name}`), 0;
		t.$$ || H(`Cannot pass "${rt(t)}" as a ${this.name}`), t.$$.ptr || H(`Cannot pass deleted object as a pointer of type ${this.name}`), t.$$.ptrType.isConst && H(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);
		var n = t.$$.ptrType.registeredClass;
		return nt(t.$$.ptr, n, this.registeredClass);
	}
	var st = (e, t, n) => {
		if (t === n) return e;
		if (n.baseClass === void 0) return null;
		var r = st(e, t, n.baseClass);
		return r === null ? null : n.downcast(r);
	}, ct = {}, lt = (e, t) => {
		for (t === void 0 && H("ptr should not be undefined"); e.baseClass;) t = e.upcast(t), e = e.baseClass;
		return t;
	}, ut = (e, t) => (t = lt(e, t), ct[t]), dt = (e, t) => ((!t.ptrType || !t.ptr) && R("makeClassHandle requires ptr and ptrType"), !!t.smartPtrType != !!t.smartPtr && R("Both smartPtrType and smartPtr must be specified"), t.count = { value: 1 }, W(Object.create(e, { $$: {
		value: t,
		writable: true
	} })));
	function ft(e) {
		var t = this.getPointee(e);
		if (!t) return this.destructor(e), null;
		var n = ut(this.registeredClass, t);
		if (n !== void 0) {
			if (n.$$.count.value === 0) return n.$$.ptr = t, n.$$.smartPtr = e, n.clone();
			var r = n.clone();
			return this.destructor(e), r;
		}
		function i() {
			return this.isSmartPointer ? dt(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: t,
				smartPtrType: this,
				smartPtr: e
			}) : dt(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr: e
			});
		}
		var a = Ye[this.registeredClass.getActualType(t)];
		if (!a) return i.call(this);
		var o = this.isConst ? a.constPointerType : a.pointerType, s = st(t, this.registeredClass, o.registeredClass);
		return s === null ? i.call(this) : this.isSmartPointer ? dt(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: s,
			smartPtrType: this,
			smartPtr: e
		}) : dt(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: s
		});
	}
	var pt = () => {
		Object.assign(mt.prototype, {
			getPointee(e) {
				return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
			},
			destructor(e) {
				var t;
				(t = this.rawDestructor) == null || t.call(this, e);
			},
			readValueFromPointer: F,
			fromWireType: ft
		});
	};
	function mt(e, t, n, r, i, a, o, s, c, l, u) {
		this.name = e, this.registeredClass = t, this.isReference = n, this.isConst = r, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = o, this.rawGetPointee = s, this.rawConstructor = c, this.rawShare = l, this.rawDestructor = u, !i && t.baseClass === void 0 ? r ? (this.toWireType = it, this.destructorFunction = null) : (this.toWireType = ot, this.destructorFunction = null) : this.toWireType = at;
	}
	var ht = (e, t, n) => {
		i.hasOwnProperty(e) || R("Replacing nonexistent public symbol"), i[e].overloadTable !== void 0 && n !== void 0 ? i[e].overloadTable[n] = t : (i[e] = t, i[e].argCount = n);
	}, G = {}, gt = (e, t, n) => {
		e = e.replace(/p/g, "i");
		var r = G[e];
		return r(t, ...n);
	}, _t = [], K = (e) => {
		var t = _t[e];
		return t || (_t[e] = t = Wn.get(e)), t;
	}, vt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
		if (e.includes("j")) return gt(e, t, n);
		var r = K(t)(...n);
		function i(e) {
			return e;
		}
		return i(r);
	}, yt = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
		return function() {
			return vt(e, t, [...arguments], n);
		};
	}, q = function(e, t) {
		e = B(e);
		function n() {
			return e.includes("j") ? yt(e, t) : K(t);
		}
		var r = n();
		return typeof r != "function" && H(`unknown function pointer with signature ${e}: ${t}`), r;
	};
	class bt extends Error {}
	var xt = (e) => {
		var t = jn(e), n = B(t);
		return Q(t), n;
	}, St = (e, t) => {
		var n = [], r = {};
		function i(e) {
			if (!r[e] && !L[e]) {
				if (je[e]) {
					je[e].forEach(i);
					return;
				}
				n.push(e), r[e] = true;
			}
		}
		throw t.forEach(i), new bt(`${e}: ` + n.map(xt).join([", "]));
	}, Ct = (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
		u = B(u), a = q(i, a), s && (s = q(o, s)), l && (l = q(c, l)), f = q(d, f);
		var p = et(u);
		Ze(p, function() {
			St(`Cannot construct ${u} due to unbound types`, [r]);
		}), z([
			e,
			t,
			n
		], r ? [r] : [], (t) => {
			t = t[0];
			var n, i;
			r ? (n = t.registeredClass, i = n.instancePrototype) : i = qe.prototype;
			var o = Je(u, function() {
				if (Object.getPrototypeOf(this) !== c) throw new V(`Use 'new' to construct ${u}`);
				if (d.constructor_body === void 0) throw new V(`${u} has no accessible constructor`);
				var e = [...arguments], t = d.constructor_body[e.length];
				if (t === void 0) throw new V(`Tried to invoke ctor of ${u} with invalid number of parameters (${e.length}) - expected (${Object.keys(d.constructor_body).toString()}) parameters instead!`);
				return t.apply(this, e);
			}), c = Object.create(i, { constructor: { value: o } });
			o.prototype = c;
			var d = new tt(u, o, c, f, n, a, s, l);
			if (d.baseClass) {
				var m;
				(m = d.baseClass).__derivedClasses != null || (m.__derivedClasses = []), d.baseClass.__derivedClasses.push(d);
			}
			var h = new mt(u, d, true, false, false), g = new mt(u + "*", d, false, false, false), _ = new mt(u + " const*", d, false, true, false);
			return Ye[e] = {
				pointerType: g,
				constPointerType: _
			}, ht(p, o), [
				h,
				g,
				_
			];
		});
	}, wt = (e, t) => {
		for (var n = [], r = 0; r < e; r++) n.push(w[t + r * 4 >> 2]);
		return n;
	};
	function Tt(e) {
		for (var t = 1; t < e.length; ++t) if (e[t] !== null && e[t].destructorFunction === void 0) return true;
		return false;
	}
	function Et(e, t, n, r, i, a) {
		var o = t.length;
		o < 2 && H("argTypes array size mismatch! Must at least get return value and 'this' types!");
		var s = t[1] !== null && n !== null, c = Tt(t), l = !t[0].isVoid, u = o - 2, d = Array(u), f = [], p = [];
		return Je(e, function() {
			p.length = 0;
			var e;
			f.length = s ? 2 : 1, f[0] = i, s && (e = t[1].toWireType(p, this), f[1] = e);
			for (var n = 0; n < u; ++n) d[n] = t[n + 2].toWireType(p, n < 0 || arguments.length <= n ? void 0 : arguments[n]), f.push(d[n]);
			var a = r(...f);
			function o(n) {
				if (c) P(p);
				else for (var r = s ? 1 : 2; r < t.length; r++) {
					var i = r === 1 ? e : d[r - 2];
					t[r].destructorFunction !== null && t[r].destructorFunction(i);
				}
				if (l) return t[0].fromWireType(n);
			}
			return o(a);
		});
	}
	var Dt = (e, t, n, r, i, a) => {
		var o = wt(t, n);
		i = q(r, i), z([], [e], (e) => {
			e = e[0];
			var n = `constructor ${e.name}`;
			if (e.registeredClass.constructor_body === void 0 && (e.registeredClass.constructor_body = []), e.registeredClass.constructor_body[t - 1] !== void 0) throw new V(`Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${e.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
			return e.registeredClass.constructor_body[t - 1] = () => {
				St(`Cannot construct ${e.name} due to unbound types`, o);
			}, z([], o, (r) => (r.splice(1, 0, null), e.registeredClass.constructor_body[t - 1] = Et(n, r, null, i, a), [])), [];
		});
	}, Ot = (e) => {
		e = e.trim();
		let t = e.indexOf("(");
		return t === -1 ? e : e.slice(0, t);
	}, kt = (e, t, n, r, i, a, o, s, c, l) => {
		var u = wt(n, r);
		t = B(t), t = Ot(t), a = q(i, a), z([], [e], (e) => {
			e = e[0];
			var r = `${e.name}.${t}`;
			t.startsWith("@@") && (t = Symbol[t.substring(2)]), s && e.registeredClass.pureVirtualFunctions.push(t);
			function i() {
				St(`Cannot call ${r} due to unbound types`, u);
			}
			var l = e.registeredClass.instancePrototype, d = l[t];
			return d === void 0 || d.overloadTable === void 0 && d.className !== e.name && d.argCount === n - 2 ? (i.argCount = n - 2, i.className = e.name, l[t] = i) : (Xe(l, t, r), l[t].overloadTable[n - 2] = i), z([], u, (i) => {
				var s = Et(r, i, e, a, o);
				return l[t].overloadTable === void 0 ? (s.argCount = n - 2, l[t] = s) : l[t].overloadTable[n - 2] = s, [];
			}), [];
		});
	}, At = [], J = [
		0,
		1,
		,
		1,
		null,
		1,
		true,
		1,
		false,
		1
	], jt = (e) => {
		e > 9 && --J[e + 1] === 0 && (J[e] = void 0, At.push(e));
	}, Y = {
		toValue: (e) => (e || H(`Cannot use deleted val. handle = ${e}`), J[e]),
		toHandle: (e) => {
			switch (e) {
				case void 0: return 2;
				case null: return 4;
				case true: return 6;
				case false: return 8;
				default: {
					let t = At.pop() || J.length;
					return J[t] = e, J[t + 1] = 1, t;
				}
			}
		}
	}, Mt = {
		name: "emscripten::val",
		fromWireType: (e) => {
			var t = Y.toValue(e);
			return jt(e), t;
		},
		toWireType: (e, t) => Y.toHandle(t),
		readValueFromPointer: F,
		destructorFunction: null
	}, Nt = (e) => U(e, Mt), Pt = (e, t) => {
		switch (t) {
			case 4: return function(e) {
				return this.fromWireType(pe[e >> 2]);
			};
			case 8: return function(e) {
				return this.fromWireType(me[e >> 3]);
			};
			default: throw TypeError(`invalid float width (${t}): ${e}`);
		}
	}, Ft = (e, t, n) => {
		t = B(t), U(e, {
			name: t,
			fromWireType: (e) => e,
			toWireType: (e, t) => t,
			readValueFromPointer: Pt(t, n),
			destructorFunction: null
		});
	}, It = (e, t, n, r, i, a, o, s) => {
		var c = wt(t, n);
		e = B(e), e = Ot(e), i = q(r, i), Ze(e, function() {
			St(`Cannot call ${e} due to unbound types`, c);
		}, t - 1), z([], c, (n) => {
			var r = [n[0], null].concat(n.slice(1));
			return ht(e, Et(e, r, null, i, a), t - 1), [];
		});
	}, Lt = (e, t, n) => {
		switch (t) {
			case 1: return n ? (e) => S[e] : (e) => T[e];
			case 2: return n ? (e) => b[e >> 1] : (e) => C[e >> 1];
			case 4: return n ? (e) => x[e >> 2] : (e) => w[e >> 2];
			default: throw TypeError(`invalid integer width (${t}): ${e}`);
		}
	}, Rt = (e, t, n, r, i) => {
		t = B(t);
		let a = r === 0, o = (e) => e;
		if (a) {
			var s = 32 - 8 * n;
			o = (e) => e << s >>> s, i = o(i);
		}
		U(e, {
			name: t,
			fromWireType: o,
			toWireType: (e, t) => t,
			readValueFromPointer: Lt(t, n, r !== 0),
			destructorFunction: null
		});
	}, zt = (e, t, n) => {
		let r = (e, t) => {
			let n = 0;
			return {
				next() {
					if (n >= e) return { done: true };
					let r = n;
					return n++, {
						value: t(r),
						done: false
					};
				},
				[Symbol.iterator]() {
					return this;
				}
			};
		};
		e[Symbol.iterator] || (e[Symbol.iterator] = function() {
			let e = this[t]();
			return r(e, (e) => this[n](e));
		});
	}, Bt = (e, t, n, r) => {
		n = B(n), r = B(r), z([], [e, t], (e) => {
			let t = e[0];
			return zt(t.registeredClass.instancePrototype, n, r), [];
		});
	}, Vt = (e, t, n) => {
		var r = [
			Int8Array,
			Uint8Array,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array
		][t];
		function i(e) {
			var t = w[e >> 2], n = w[e + 4 >> 2];
			return new r(S.buffer, n, t);
		}
		n = B(n), U(e, {
			name: n,
			fromWireType: i,
			readValueFromPointer: i
		}, { ignoreDuplicateRegistrations: true });
	}, Ht = Object.assign({ optional: true }, Mt), Ut = (e, t) => {
		U(e, Ht);
	}, Wt = (e, t, n, r) => {
		if (!(r > 0)) return 0;
		for (var i = n, a = n + r - 1, o = 0; o < e.length; ++o) {
			var s = e.codePointAt(o);
			if (s <= 127) {
				if (n >= a) break;
				t[n++] = s;
			} else if (s <= 2047) {
				if (n + 1 >= a) break;
				t[n++] = 192 | s >> 6, t[n++] = 128 | s & 63;
			} else if (s <= 65535) {
				if (n + 2 >= a) break;
				t[n++] = 224 | s >> 12, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | s & 63;
			} else {
				if (n + 3 >= a) break;
				t[n++] = 240 | s >> 18, t[n++] = 128 | s >> 12 & 63, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | s & 63, o++;
			}
		}
		return t[n] = 0, n - i;
	}, X = (e, t, n) => Wt(e, T, t, n), Gt = (e) => {
		for (var t = 0, n = 0; n < e.length; ++n) {
			var r = e.charCodeAt(n);
			r <= 127 ? t++ : r <= 2047 ? t += 2 : r >= 55296 && r <= 57343 ? (t += 4, ++n) : t += 3;
		}
		return t;
	}, Kt = globalThis.TextDecoder && new TextDecoder(), qt = (e, t, n, r) => {
		var i = t + n;
		if (r) return i;
		for (; e[t] && !(t >= i);) ++t;
		return t;
	}, Jt = function(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 ? arguments[2] : void 0, r = arguments.length > 3 ? arguments[3] : void 0;
		var i = qt(e, t, n, r);
		if (i - t > 16 && e.buffer && Kt) return Kt.decode(e.subarray(t, i));
		for (var a = ""; t < i;) {
			var o = e[t++];
			if (!(o & 128)) {
				a += String.fromCharCode(o);
				continue;
			}
			var s = e[t++] & 63;
			if ((o & 224) == 192) {
				a += String.fromCharCode((o & 31) << 6 | s);
				continue;
			}
			var c = e[t++] & 63;
			if (o = (o & 240) == 224 ? (o & 15) << 12 | s << 6 | c : (o & 7) << 18 | s << 12 | c << 6 | e[t++] & 63, o < 65536) a += String.fromCharCode(o);
			else {
				var l = o - 65536;
				a += String.fromCharCode(55296 | l >> 10, 56320 | l & 1023);
			}
		}
		return a;
	}, Yt = (e, t, n) => e ? Jt(T, e, t, n) : "", Xt = (e, t) => {
		t = B(t);
		U(e, {
			name: t,
			fromWireType(e) {
				var t = w[e >> 2], r = e + 4, i;
				i = Yt(r, t, true);
				return Q(e), i;
			},
			toWireType(e, t) {
				t instanceof ArrayBuffer && (t = new Uint8Array(t));
				var r, i = typeof t == "string";
				i || ArrayBuffer.isView(t) && t.BYTES_PER_ELEMENT == 1 || H("Cannot pass non-string to std::string"), r = i ? Gt(t) : t.length;
				var a = Mn(4 + r + 1), o = a + 4;
				if (w[a >> 2] = r, i) {
					X(t, o, r + 1);
				} else T.set(t, o);
				return e !== null && e.push(Q, a), a;
			},
			readValueFromPointer: F,
			destructorFunction(e) {
				Q(e);
			}
		});
	}, Zt = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, Qt = (e, t, n) => {
		var r = e >> 1, i = qt(C, r, t / 2, n);
		if (i - r > 16 && Zt) return Zt.decode(C.subarray(r, i));
		for (var a = "", o = r; o < i; ++o) {
			var s = C[o];
			a += String.fromCharCode(s);
		}
		return a;
	}, $t = (e, t, n) => {
		if (n != null || (n = 2147483647), n < 2) return 0;
		n -= 2;
		for (var r = t, i = n < e.length * 2 ? n / 2 : e.length, a = 0; a < i; ++a) {
			var o = e.charCodeAt(a);
			b[t >> 1] = o, t += 2;
		}
		return b[t >> 1] = 0, t - r;
	}, en = (e) => e.length * 2, tn = (e, t, n) => {
		for (var r = "", i = e >> 2, a = 0; !(a >= t / 4); a++) {
			var o = w[i + a];
			if (!o && !n) break;
			r += String.fromCodePoint(o);
		}
		return r;
	}, nn = (e, t, n) => {
		if (n != null || (n = 2147483647), n < 4) return 0;
		for (var r = t, i = r + n - 4, a = 0; a < e.length; ++a) {
			var o = e.codePointAt(a);
			if (o > 65535 && a++, x[t >> 2] = o, t += 4, t + 4 > i) break;
		}
		return x[t >> 2] = 0, t - r;
	}, rn = (e) => {
		for (var t = 0, n = 0; n < e.length; ++n) e.codePointAt(n) > 65535 && n++, t += 4;
		return t;
	}, an = (e, t, n) => {
		n = B(n);
		var r, i, a;
		t === 2 ? (r = Qt, i = $t, a = en) : (r = tn, i = nn, a = rn), U(e, {
			name: n,
			fromWireType: (e) => {
				var n = w[e >> 2], i = r(e + 4, n * t, true);
				return Q(e), i;
			},
			toWireType: (e, r) => {
				typeof r != "string" && H(`Cannot pass non-string to C++ string type ${n}`);
				var o = a(r), s = Mn(4 + o + t);
				return w[s >> 2] = o / t, i(r, s + 4, o + t), e !== null && e.push(Q, s), s;
			},
			readValueFromPointer: F,
			destructorFunction(e) {
				Q(e);
			}
		});
	}, on = (e, t, n, r, i, a) => {
		N[e] = {
			name: B(t),
			rawConstructor: q(n, r),
			rawDestructor: q(i, a),
			fields: []
		};
	}, sn = (e, t, n, r, i, a, o, s, c, l) => {
		N[e].fields.push({
			fieldName: B(t),
			getterReturnType: n,
			getter: q(r, i),
			getterContext: a,
			setterArgumentType: o,
			setter: q(s, c),
			setterContext: l
		});
	}, cn = (e, t) => {
		t = B(t), U(e, {
			isVoid: true,
			name: t,
			fromWireType: () => void 0,
			toWireType: (e, t) => void 0
		});
	}, ln = [], un = (e) => {
		var t = ln.length;
		return ln.push(e), t;
	}, dn = (e, t) => {
		var n = L[e];
		return n === void 0 && H(`${t} has unknown type ${xt(e)}`), n;
	}, fn = (e, t) => {
		for (var n = Array(e), r = 0; r < e; ++r) n[r] = dn(w[t + r * 4 >> 2], `parameter ${r}`);
		return n;
	}, pn = (e, t, n) => {
		var r = [], i = e(r, n);
		return r.length && (w[t >> 2] = Y.toHandle(r)), i;
	}, mn = {}, hn = (e) => {
		var t = mn[e];
		return t === void 0 ? B(e) : t;
	}, gn = (e, t, n) => {
		var [r, ...i] = fn(e, t), a = r.toWireType.bind(r), o = i.map((e) => e.readValueFromPointer.bind(e));
		e--;
		var s = Array(e);
		return un(Je(`methodCaller<(${i.map((e) => e.name)}) => ${r.name}>`, (t, r, i, c) => {
			for (var l = 0, u = 0; u < e; ++u) s[u] = o[u](c + l), l += 8;
			var d;
			switch (n) {
				case 0:
					d = Y.toValue(t).apply(null, s);
					break;
				case 2:
					d = Reflect.construct(Y.toValue(t), s);
					break;
				case 3:
					d = s[0];
					break;
				case 1: d = Y.toValue(t)[hn(r)](...s);
			}
			return pn(a, i, d);
		}));
	}, _n = (e) => e ? (e = hn(e), Y.toHandle(globalThis[e])) : Y.toHandle(globalThis), vn = (e) => {
		e > 9 && (J[e + 1] += 1);
	}, yn = (e, t, n, r, i) => ln[e](t, n, r, i), bn = (e) => {
		P(Y.toValue(e)), jt(e);
	}, xn = (e, t, n, r) => {
		var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), o = new Date(i, 6, 1), s = a.getTimezoneOffset(), c = o.getTimezoneOffset(), l = Math.max(s, c);
		w[e >> 2] = l * 60, x[t >> 2] = Number(s != c);
		var u = (e) => {
			var t = e >= 0 ? "-" : "+", n = Math.abs(e);
			return `UTC${t}${String(Math.floor(n / 60)).padStart(2, "0")}${String(n % 60).padStart(2, "0")}`;
		}, d = u(s), f = u(c);
		c < s ? (X(d, n, 17), X(f, r, 17)) : (X(d, r, 17), X(f, n, 17));
	}, Sn = () => 2147483648, Cn = (e, t) => Math.ceil(e / t) * t, wn = (e) => {
		var t = (e - Un.buffer.byteLength + 65535) / 65536 | 0;
		try {
			return Un.grow(t), ne(), 1;
		} catch {}
	}, Tn = (e) => {
		var t = T.length;
		e >>>= 0;
		var n = Sn();
		if (e > n) return false;
		for (var r = 1; r <= 4; r *= 2) {
			var i = t * (1 + .2 / r);
			if (i = Math.min(i, e + 100663296), wn(Math.min(n, Cn(Math.max(e, i), 65536)))) return true;
		}
		return false;
	}, En = {}, Dn = () => c || "./this.program", Z = () => {
		if (!Z.strings) {
			var e, t, n = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: ((e = (t = globalThis.navigator) == null ? void 0 : t.language) == null ? "C" : e).replace("-", "_") + ".UTF-8",
				_: Dn()
			};
			for (var r in En) En[r] === void 0 ? delete n[r] : n[r] = En[r];
			var i = [];
			for (var r in n) i.push(`${r}=${n[r]}`);
			Z.strings = i;
		}
		return Z.strings;
	}, On = (e, t) => {
		var n = 0, r = 0;
		for (var i of Z()) {
			var a = t + n;
			w[e + r >> 2] = a, n += X(i, a, Infinity) + 1, r += 4;
		}
		return 0;
	}, kn = (e, t) => {
		var n = Z();
		w[e >> 2] = n.length;
		var r = 0;
		for (var i of n) r += Gt(i) + 1;
		return w[t >> 2] = r, 0;
	}, An = (e) => e;
	if (Ke(), pt(), i.noExitRuntime && i.noExitRuntime, i.print && i.print, i.printErr && (m = i.printErr), i.wasmBinary && (h = i.wasmBinary), i.arguments && i.arguments, i.thisProgram && (c = i.thisProgram), i.preInit) for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); i.preInit.length > 0;) i.preInit.shift()();
	var jn, Q, Mn, Nn, $, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn;
	function Gn(e) {
		jn = e.Aa, Q = i._free = e.Ba, Mn = i._malloc = e.Da, Nn = e.Ea, $ = e.Fa, Pn = e.Ga, Fn = e.Ha, In = e.Ia, Ln = e.Ja, Rn = e.Ka, zn = e.La, G.viijii = e.Ma, Bn = G.viijjijjjjjj = e.Na, Vn = G.iiijj = e.Oa, Hn = G.jiiii = e.Pa, G.iiiiij = e.Qa, G.iiiiijj = e.Ra, G.iiiiiijj = e.Sa, Un = e.ya, Wn = e.Ca;
	}
	var Kn = {
		q: be,
		x: xe,
		a: Ce,
		i: we,
		m: Te,
		S: Ee,
		p: De,
		fa: Oe,
		d: ke,
		ba: Ae,
		va: Ne,
		aa: Pe,
		pa: Ie,
		ta: Ct,
		sa: Dt,
		H: kt,
		na: Nt,
		X: Ft,
		Y: It,
		A: Rt,
		ra: Bt,
		u: Vt,
		ua: Ut,
		oa: Xt,
		T: an,
		I: on,
		wa: sn,
		qa: cn,
		O: gn,
		xa: jt,
		F: _n,
		U: vn,
		N: yn,
		ia: bn,
		ca: xn,
		ga: Tn,
		da: On,
		ea: kn,
		la: pr,
		M: gr,
		B: Sr,
		P: er,
		V: Tr,
		s: Er,
		b: Yn,
		C: hr,
		ja: br,
		c: Zn,
		Q: xr,
		h: $n,
		j: or,
		r: sr,
		R: mr,
		t: lr,
		G: ur,
		D: dr,
		K: Dr,
		_: Ar,
		Z: jr,
		f: tr,
		l: qn,
		ha: Cr,
		e: Xn,
		W: _r,
		g: Qn,
		L: wr,
		k: Jn,
		ka: vr,
		o: cr,
		y: rr,
		v: fr,
		E: ar,
		w: yr,
		n: nr,
		J: Or,
		ma: ir,
		$: kr,
		z: An
	};
	function qn(e, t) {
		var n = D();
		try {
			K(e)(t);
		} catch (e) {
			if (E(n), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Jn(e, t, n, r, i) {
		var a = D();
		try {
			K(e)(t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Yn(e, t) {
		var n = D();
		try {
			return K(e)(t);
		} catch (e) {
			if (E(n), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Xn(e, t, n) {
		var r = D();
		try {
			K(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Zn(e, t, n) {
		var r = D();
		try {
			return K(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Qn(e, t, n, r) {
		var i = D();
		try {
			K(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function $n(e, t, n, r) {
		var i = D();
		try {
			return K(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function er(e, t, n, r, i, a) {
		var o = D();
		try {
			return K(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function tr(e) {
		var t = D();
		try {
			K(e)();
		} catch (e) {
			if (E(t), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function nr(e, t, n, r, i, a, o, s, c, l, u) {
		var d = D();
		try {
			K(e)(t, n, r, i, a, o, s, c, l, u);
		} catch (e) {
			if (E(d), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function rr(e, t, n, r, i, a, o) {
		var s = D();
		try {
			K(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function ir(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
		var _ = D();
		try {
			K(e)(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g);
		} catch (e) {
			if (E(_), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function ar(e, t, n, r, i, a, o, s, c) {
		var l = D();
		try {
			K(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (E(l), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function or(e, t, n, r, i) {
		var a = D();
		try {
			return K(e)(t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function sr(e, t, n, r, i, a) {
		var o = D();
		try {
			return K(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function cr(e, t, n, r, i, a) {
		var o = D();
		try {
			K(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function lr(e, t, n, r, i, a, o) {
		var s = D();
		try {
			return K(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function ur(e, t, n, r, i, a, o, s) {
		var c = D();
		try {
			return K(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (E(c), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function dr(e, t, n, r, i, a, o, s, c) {
		var l = D();
		try {
			return K(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (E(l), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function fr(e, t, n, r, i, a, o, s) {
		var c = D();
		try {
			K(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (E(c), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function pr(e, t, n) {
		var r = D();
		try {
			return K(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function mr(e, t, n, r, i, a, o) {
		var s = D();
		try {
			return K(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function hr(e, t, n, r) {
		var i = D();
		try {
			return K(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function gr(e, t, n, r) {
		var i = D();
		try {
			return K(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function _r(e, t, n, r, i, a, o, s, c) {
		var l = D();
		try {
			K(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (E(l), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function vr(e, t, n, r, i, a, o, s) {
		var c = D();
		try {
			K(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (E(c), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function yr(e, t, n, r, i, a, o, s, c, l) {
		var u = D();
		try {
			K(e)(t, n, r, i, a, o, s, c, l);
		} catch (e) {
			if (E(u), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function br(e, t, n) {
		var r = D();
		try {
			return K(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function xr(e, t, n, r, i) {
		var a = D();
		try {
			return K(e)(t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Sr(e, t, n, r, i, a) {
		var o = D();
		try {
			return K(e)(t, n, r, i, a);
		} catch (e) {
			if (E(o), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Cr(e, t, n) {
		var r = D();
		try {
			K(e)(t, n);
		} catch (e) {
			if (E(r), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function wr(e, t, n, r, i, a, o) {
		var s = D();
		try {
			K(e)(t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Tr(e, t, n, r) {
		var i = D();
		try {
			return K(e)(t, n, r);
		} catch (e) {
			if (E(i), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Er(e) {
		var t = D();
		try {
			return K(e)();
		} catch (e) {
			if (E(t), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Dr(e, t, n, r, i, a, o, s, c, l, u, d) {
		var f = D();
		try {
			return K(e)(t, n, r, i, a, o, s, c, l, u, d);
		} catch (e) {
			if (E(f), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Or(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		var g = D();
		try {
			K(e)(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
		} catch (e) {
			if (E(g), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function kr(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, ee, te) {
		var ne = D();
		try {
			Bn(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, ee, te);
		} catch (e) {
			if (E(ne), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Ar(e, t, n, r, i, a, o) {
		var s = D();
		try {
			return Vn(e, t, n, r, i, a, o);
		} catch (e) {
			if (E(s), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function jr(e, t, n, r, i) {
		var a = D();
		try {
			return Hn(e, t, n, r, i);
		} catch (e) {
			if (E(a), e !== e + 0) throw e;
			$(1, 0);
		}
	}
	function Mr() {
		v();
		function e() {
			var e, t;
			i.calledRun = true, !g && (re(), (e = _) == null || e(i), (t = i.onRuntimeInitialized) == null || t.call(i), ie());
		}
		i.setStatus ? (i.setStatus("Running..."), setTimeout(() => {
			setTimeout(() => i.setStatus(""), 1), e();
		}, 1)) : e();
	}
	var Nr = await fe();
	return Mr(), t = te ? i : new Promise((e, t) => {
		_ = e, ee = t;
	}), t;
}
function ce(e) {
	return ie(se, e);
}
async function de(e, t) {
	return oe(se, e, t);
}
var b = [
	["aztec", "Aztec"],
	["aztec_code", "AztecCode"],
	["aztec_rune", "AztecRune"],
	["code_128", "Code128"],
	["code_39", "Code39"],
	["code_39_standard", "Code39Std"],
	["code_39_extended", "Code39Ext"],
	["code_32", "Code32"],
	["pzn", "PZN"],
	["code_93", "Code93"],
	["codabar", "Codabar"],
	["databar", "DataBar"],
	["databar_omni", "DataBarOmni"],
	["databar_stacked", "DataBarStk"],
	["databar_stacked_omni", "DataBarStkOmni"],
	["databar_expanded", "DataBarExp"],
	["databar_expanded_stacked", "DataBarExpStk"],
	["databar_limited", "DataBarLtd"],
	["data_matrix", "DataMatrix"],
	["dx_film_edge", "DXFilmEdge"],
	["ean_13", "EAN13"],
	["ean_upc", "EANUPC"],
	["isbn", "ISBN"],
	["ean_8", "EAN8"],
	["itf", "ITF"],
	["itf_14", "ITF14"],
	["maxi_code", "MaxiCode"],
	["micro_qr_code", "MicroQRCode"],
	["pdf417", "PDF417"],
	["compact_pdf417", "CompactPDF417"],
	["micro_pdf417", "MicroPDF417"],
	["qr_code", "QRCode"],
	["qr_code_model_1", "QRCodeModel1"],
	["qr_code_model_2", "QRCodeModel2"],
	["rm_qr_code", "RMQRCode"],
	["upc_a", "UPCA"],
	["upc_e", "UPCE"],
	["telepen", "Telepen"],
	["telepen_alpha", "TelepenAlpha"],
	["telepen_numeric", "TelepenNumeric"],
	["other_barcode", "OtherBarcode"],
	["linear_codes", "AllLinear"],
	["matrix_codes", "AllMatrix"],
	["gs1_codes", "AllGS1"],
	["retail_codes", "AllRetail"],
	["industrial_codes", "AllIndustrial"],
	["any", "All"]
], x = [...b, ["unknown"]].map((e) => e[0]), S = new Map(b);
function pe(e) {
	for (let [t, n] of S) if (e === n) return t;
	return "unknown";
}
function me(e) {
	if (C(e)) return {
		width: e.naturalWidth,
		height: e.naturalHeight
	};
	if (w(e)) return {
		width: e.width.baseVal.value,
		height: e.height.baseVal.value
	};
	if (T(e)) return {
		width: e.videoWidth,
		height: e.videoHeight
	};
	if (ge(e)) return {
		width: e.width,
		height: e.height
	};
	if (ve(e)) return {
		width: e.displayWidth,
		height: e.displayHeight
	};
	if (he(e) || _e(e)) return {
		width: e.width,
		height: e.height
	};
	throw TypeError("The provided value is not of type '(Blob or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or ImageData or OffscreenCanvas or SVGImageElement or VideoFrame)'.");
}
function C(e) {
	try {
		var t;
		return e instanceof (e == null || (t = e.ownerDocument) == null || (t = t.defaultView) == null ? void 0 : t.HTMLImageElement);
	} catch {
		return false;
	}
}
function w(e) {
	try {
		var t;
		return e instanceof (e == null || (t = e.ownerDocument) == null || (t = t.defaultView) == null ? void 0 : t.SVGImageElement);
	} catch {
		return false;
	}
}
function T(e) {
	try {
		var t;
		return e instanceof (e == null || (t = e.ownerDocument) == null || (t = t.defaultView) == null ? void 0 : t.HTMLVideoElement);
	} catch {
		return false;
	}
}
function he(e) {
	try {
		var t;
		return e instanceof (e == null || (t = e.ownerDocument) == null || (t = t.defaultView) == null ? void 0 : t.HTMLCanvasElement);
	} catch {
		return false;
	}
}
function ge(e) {
	try {
		return e instanceof ImageBitmap || Object.prototype.toString.call(e) === "[object ImageBitmap]";
	} catch {
		return false;
	}
}
function _e(e) {
	try {
		return e instanceof OffscreenCanvas || Object.prototype.toString.call(e) === "[object OffscreenCanvas]";
	} catch {
		return false;
	}
}
function ve(e) {
	try {
		return e instanceof VideoFrame || Object.prototype.toString.call(e) === "[object VideoFrame]";
	} catch {
		return false;
	}
}
function ye(e) {
	try {
		return e instanceof Blob || Object.prototype.toString.call(e) === "[object Blob]";
	} catch {
		return false;
	}
}
function E(e) {
	try {
		return e instanceof ImageData || Object.prototype.toString.call(e) === "[object ImageData]";
	} catch {
		return false;
	}
}
function D(e, t) {
	try {
		let n = new OffscreenCanvas(e, t);
		if (n.getContext("2d") instanceof OffscreenCanvasRenderingContext2D) return n;
		throw void 0;
	} catch {
		let n = document.createElement("canvas");
		return n.width = e, n.height = t, n;
	}
}
async function O(e) {
	if (C(e) && !await xe(e)) throw new DOMException("Failed to load or decode HTMLImageElement.", "InvalidStateError");
	if (w(e) && !await Se(e)) throw new DOMException("Failed to load or decode SVGImageElement.", "InvalidStateError");
	if (ve(e) && j(e)) throw new DOMException("VideoFrame is closed.", "InvalidStateError");
	if (T(e) && (e.readyState === 0 || e.readyState === 1)) throw new DOMException("Invalid element or state.", "InvalidStateError");
	if (ge(e) && Ce(e)) throw new DOMException("The image source is detached.", "InvalidStateError");
	let { width: t, height: n } = me(e);
	if (t === 0 || n === 0) return null;
	let r = D(t, n).getContext("2d");
	r.drawImage(e, 0, 0);
	try {
		return r.getImageData(0, 0, t, n);
	} catch {
		throw new DOMException("Source would taint origin.", "SecurityError");
	}
}
async function k(e) {
	let t;
	try {
		t = await createImageBitmap(e);
	} catch {
		try {
			if (globalThis.Image) {
				t = new Image();
				let n = "";
				try {
					n = URL.createObjectURL(e), t.src = n, await t.decode();
				} finally {
					URL.revokeObjectURL(n);
				}
			} else return e;
		} catch {
			throw new DOMException("Failed to load or decode Blob.", "InvalidStateError");
		}
	}
	return await O(t);
}
function be(e) {
	let { width: t, height: n } = e;
	if (t === 0 || n === 0) return null;
	let r = e.getContext("2d");
	try {
		return r.getImageData(0, 0, t, n);
	} catch {
		throw new DOMException("Source would taint origin.", "SecurityError");
	}
}
async function A(e) {
	if (ye(e)) return await k(e);
	if (E(e)) {
		if (M(e)) throw new DOMException("The image data has been detached.", "InvalidStateError");
		return e;
	}
	return he(e) || _e(e) ? be(e) : await O(e);
}
async function xe(e) {
	try {
		return await e.decode(), !0;
	} catch {
		return false;
	}
}
async function Se(e) {
	try {
		var t;
		return await ((t = e.decode) == null ? void 0 : t.call(e)), !0;
	} catch {
		return false;
	}
}
function j(e) {
	return e.format === null;
}
function M(e) {
	return e.data.buffer.byteLength === 0;
}
function Ce(e) {
	return e.width === 0 && e.height === 0;
}
function we(e, t) {
	return Te(e) ? new DOMException(`${t}: ${e.message}`, e.name) : Ee(e) ? new e.constructor(`${t}: ${e.message}`) : /* @__PURE__ */ Error(`${t}: ${e}`);
}
function Te(e) {
	return e instanceof DOMException || Object.prototype.toString.call(e) === "[object DOMException]";
}
function Ee(e) {
	return e instanceof Error || Object.prototype.toString.call(e) === "[object Error]";
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/checkPrivateRedeclaration.js
function De(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/classPrivateFieldInitSpec.js
function Oe(e, t, n) {
	De(e, t), t.set(e, n);
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/assertClassBrand.js
function ke(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/classPrivateFieldSet2.js
function Ae(e, t, n) {
	return e.set(ke(e, t), n), n;
}
//#endregion
//#region \0@oxc-project+runtime@0.144.0/helpers/esm/classPrivateFieldGet2.js
function N(e, t) {
	return e.get(ke(e, t));
}
//#endregion
//#region src/core.ts
var P = /* @__PURE__ */ new WeakMap(), F = class {
	constructor(e = {}) {
		Oe(this, P, void 0);
		try {
			var t;
			let n = e == null || (t = e.formats) == null ? void 0 : t.filter((e) => e !== "unknown");
			if ((n == null ? void 0 : n.length) === 0) throw TypeError("Hint option provided, but is empty.");
			for (let e of n == null ? [] : n) if (!S.has(e)) throw TypeError(`Failed to read the 'formats' property from 'BarcodeDetectorOptions': The provided value '${e}' is not a valid enum value of type BarcodeFormat.`);
			Ae(P, this, n == null ? [] : n), ce({ fireImmediately: !0 }).catch(() => {});
		} catch (e) {
			throw we(e, "Failed to construct 'BarcodeDetector'");
		}
	}
	static async getSupportedFormats() {
		return x.filter((e) => e !== "unknown");
	}
	async detect(e) {
		try {
			let t = await A(e);
			if (t === null) return [];
			let n, r = {
				textMode: "Plain",
				formats: N(P, this).map((e) => S.get(e))
			};
			try {
				n = await de(t, r);
			} catch (e) {
				throw console.error(e), new DOMException("Barcode detection service unavailable.", "NotSupportedError");
			}
			return n.map((e) => {
				let { topLeft: { x: t, y: n }, topRight: { x: r, y: i }, bottomLeft: { x: a, y: o }, bottomRight: { x: s, y: c } } = e.position, l = Math.min(t, r, a, s), u = Math.min(n, i, o, c), d = Math.max(t, r, a, s), f = Math.max(n, i, o, c);
				return {
					boundingBox: new DOMRectReadOnly(l, u, d - l, f - u),
					rawValue: e.text,
					format: pe(e.format),
					cornerPoints: [
						{
							x: t,
							y: n
						},
						{
							x: r,
							y: i
						},
						{
							x: s,
							y: c
						},
						{
							x: a,
							y: o
						}
					]
				};
			});
		} catch (e) {
			throw we(e, "Failed to execute 'detect' on 'BarcodeDetector'");
		}
	}
};

const BARCODE_FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"];
// Served by the integration next to the card bundle (see __init__.py). Not the
// library's default jsDelivr URL, so scanning works without internet access.
const ZXING_WASM_URL = "/wine_cellar/zxing_reader.wasm";
// WebKit has no BarcodeDetector at all — every iOS browser, the HA Companion
// app included, https or not — so fall back to a zxing WASM decoder there.
async function createBarcodeDetector() {
    if ("BarcodeDetector" in window) {
        return new window.BarcodeDetector({ formats: BARCODE_FORMATS });
    }
    // Awaited so a failed WASM download surfaces here, not as every frame's
    // detect() rejecting silently.
    await ce({
        overrides: {
            locateFile: (path, prefix) => path.endsWith(".wasm") ? ZXING_WASM_URL : prefix + path,
        },
        fireImmediately: true,
    });
    return new F({ formats: [...BARCODE_FORMATS] });
}
let BarcodeScanner = class BarcodeScanner extends i$1 {
    constructor() {
        super(...arguments);
        this.active = false;
        this._error = "";
        this._scanning = false;
        this._stream = null;
        this._detector = null;
        this._rafId = 0;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    updated(changedProps) {
        if (changedProps.has("active")) {
            if (this.active) {
                this._startScanning();
            }
            else {
                this._stopScanning();
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._stopScanning();
    }
    async _startScanning() {
        if (this._scanning)
            return;
        this._error = "";
        const blocked = cameraBlockedReason(this.hass?.language);
        if (blocked) {
            this._error = `${blocked} ${this._t("ui.barcode.enterManually")}`;
            this.dispatchEvent(new CustomEvent("scanner-error", {
                detail: { error: this._error },
                bubbles: true,
                composed: true,
            }));
            return;
        }
        try {
            this._detector = await createBarcodeDetector();
        }
        catch (err) {
            console.error("Barcode decoder failed to load", err);
            this._error = this._t("ui.barcode.notSupported");
            this.dispatchEvent(new CustomEvent("scanner-error", {
                detail: { error: this._error },
                bubbles: true,
                composed: true,
            }));
            return;
        }
        // The first WASM load can take a moment; don't open the camera if the
        // scanner was closed meanwhile.
        if (!this.active) {
            this._detector = null;
            return;
        }
        try {
            this._stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false,
            });
            await this.updateComplete;
            const video = this.renderRoot.querySelector("video");
            if (video && this._stream) {
                video.srcObject = this._stream;
                await video.play();
            }
            this._scanning = true;
            this._scanFrame();
        }
        catch (err) {
            this._error = `${describeCameraError(err, this.hass?.language)} ${this._t("ui.barcode.enterManually")}`;
            this.dispatchEvent(new CustomEvent("scanner-error", {
                detail: { error: this._error },
                bubbles: true,
                composed: true,
            }));
        }
    }
    async _scanFrame() {
        if (!this._scanning || !this._detector)
            return;
        const video = this.renderRoot.querySelector("video");
        if (!video || video.readyState < 2) {
            this._rafId = requestAnimationFrame(() => this._scanFrame());
            return;
        }
        try {
            const barcodes = await this._detector.detect(video);
            if (barcodes.length > 0) {
                this._onDetected(barcodes[0].rawValue);
                return;
            }
        }
        catch {
            // Detection error on this frame, continue
        }
        this._rafId = requestAnimationFrame(() => this._scanFrame());
    }
    _stopScanning() {
        this._scanning = false;
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = 0;
        }
        if (this._stream) {
            this._stream.getTracks().forEach((t) => t.stop());
            this._stream = null;
        }
        this._detector = null;
    }
    _onDetected(barcode) {
        this._stopScanning();
        this.dispatchEvent(new CustomEvent("barcode-detected", {
            detail: { barcode },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        if (!this.active)
            return A$1;
        return b$1 `
      ${this._error
            ? b$1 `<div class="error-message">${this._error}</div>`
            : b$1 `
            <div class="scanner-container">
              <video autoplay playsinline muted></video>
              <div class="scan-overlay">
                <div class="scan-corners"></div>
                <div class="scan-line"></div>
              </div>
            </div>
            <div class="hint">${this._t("ui.barcode.pointAtBarcode")}</div>
          `}
    `;
    }
};
BarcodeScanner.styles = [
    sharedStyles,
    i$4 `
      :host {
        display: block;
      }

      .scanner-container {
        position: relative;
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
        background: #000;
        max-height: 300px;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        max-height: 300px;
      }

      .scan-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
      }

      .scan-line {
        position: absolute;
        left: 10%;
        right: 10%;
        height: 2px;
        background: rgba(255, 50, 50, 0.8);
        box-shadow: 0 0 8px rgba(255, 50, 50, 0.5);
        animation: scanMove 2s ease-in-out infinite;
      }

      @keyframes scanMove {
        0%, 100% { top: 20%; }
        50% { top: 80%; }
      }

      .scan-corners {
        position: absolute;
        top: 15%;
        left: 15%;
        right: 15%;
        bottom: 15%;
        border: 2px solid rgba(255, 255, 255, 0.6);
        border-radius: 8px;
      }

      .error-message {
        padding: 16px;
        text-align: center;
        color: #ef5350;
        font-size: 0.9em;
      }

      .hint {
        text-align: center;
        padding: 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .fallback-note {
        text-align: center;
        padding: 12px;
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        font-style: italic;
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ attribute: false })
], BarcodeScanner.prototype, "hass", void 0);
__decorate([
    n$1({ type: Boolean })
], BarcodeScanner.prototype, "active", void 0);
__decorate([
    r$1()
], BarcodeScanner.prototype, "_error", void 0);
__decorate([
    r$1()
], BarcodeScanner.prototype, "_scanning", void 0);
BarcodeScanner = __decorate([
    t$2("barcode-scanner")
], BarcodeScanner);

let AddWineDialog = class AddWineDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.open = false;
        this.cabinets = [];
        this.wines = [];
        this.preselectedCabinet = "";
        this.preselectedRow = null;
        this.preselectedCol = null;
        this.preselectedZone = "";
        this.preselectedDepth = 0;
        this.buyListMode = false;
        this.enableWhisky = false;
        this.defaultWineType = "red";
        this._step = "scan";
        this._scanMode = "idle";
        this._barcode = "";
        this._loading = false;
        this._quantity = 1;
        this._addProgress = 0;
        this._lookupResult = null;
        this._wineData = {};
        this._error = "";
        this._hasGemini = false;
        this._labelLoading = false;
        this._captureStage = "front";
        this._frontImageRaw = "";
        this._showBackPrompt = false;
        this._searchResults = [];
        // Bumped every time the dialog opens. Label recognition waits up to 45
        // seconds on the AI, which is long enough to cancel, close, and start
        // adding a different bottle — and the late reply would then overwrite that
        // bottle's form with the previous one's reading and jump to the details
        // step. Every async handler here checks the session it started in.
        this._session = 0;
    }
    get _steps() {
        return this.buyListMode
            ? ["scan", "details", "confirm"]
            : ["scan", "details", "location", "confirm"];
    }
    updated(changedProps) {
        if (changedProps.has("open")) {
            if (this.open) {
                this._step = "scan";
                this._scanMode = "idle";
                this._barcode = "";
                this._lookupResult = null;
                this._error = "";
                this._loading = false;
                this._quantity = 1;
                this._addProgress = 0;
                this._session++;
                this._labelLoading = false;
                this._searchResults = [];
                this._captureStage = "front";
                this._frontImageRaw = "";
                this._showBackPrompt = false;
                this._wineData = {
                    name: "",
                    winery: "",
                    type: this.defaultWineType,
                    vintage: null,
                    region: "",
                    country: "",
                    grape_variety: "",
                    price: null,
                    retail_price: null,
                    notes: "",
                    user_rating: null,
                    tasting_notes: null,
                    cabinet_id: this.preselectedCabinet || "",
                    row: this.preselectedRow,
                    col: this.preselectedCol,
                    depth: this.preselectedDepth || 0,
                    zone: this.preselectedZone || "",
                };
                this._checkCapabilities();
            }
            else {
                // Ensure cameras stop when dialog closes
                this._scanMode = "idle";
            }
        }
    }
    async _checkCapabilities() {
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/get_capabilities",
            });
            this._hasGemini = result?.has_gemini || false;
        }
        catch {
            this._hasGemini = false;
        }
    }
    _close() {
        this._scanMode = "idle";
        this.open = false;
        this.dispatchEvent(new CustomEvent("close"));
    }
    /** Hand off to the wine-list scanner: the card closes this dialog and opens that one. */
    _openScanList() {
        this._close();
        this.dispatchEvent(new CustomEvent("scan-list"));
    }
    async _lookupBarcode() {
        if (!this._barcode.trim())
            return;
        const session = this._session;
        this._loading = true;
        this._error = "";
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/lookup_barcode",
                barcode: this._barcode.trim(),
            });
            if (session !== this._session)
                return;
            if (result.result) {
                this._lookupResult = result.result;
                this._wineData = {
                    ...this._wineData,
                    barcode: this._barcode.trim(),
                    name: result.result.name || "",
                    winery: result.result.winery || "",
                    type: result.result.type || "red",
                    vintage: result.result.vintage,
                    region: result.result.region || "",
                    country: result.result.country || "",
                    grape_variety: result.result.grape_variety || "",
                    rating: result.result.rating,
                    ratings_count: result.result.ratings_count || null,
                    image_url: result.result.image_url || "",
                    description: result.result.description || "",
                    food_pairings: result.result.food_pairings || "",
                    alcohol: result.result.alcohol || "",
                    serving_temp: result.result.serving_temp || "",
                    vivino_updated_at: result.result.source === "vivino" ? new Date().toISOString() : this._wineData.vivino_updated_at,
                    vivino_checked_at: result.result.source === "vivino" ? new Date().toISOString() : this._wineData.vivino_checked_at,
                };
                this._step = "details";
            }
            else {
                this._wineData = { ...this._wineData, barcode: this._barcode.trim() };
                this._onBarcodeLookupFailed(this._t("ui.addWine.noBarcodeMatch"));
            }
        }
        catch (err) {
            if (session !== this._session)
                return;
            this._wineData = { ...this._wineData, barcode: this._barcode.trim() };
            this._onBarcodeLookupFailed(this._t("ui.addWine.barcodeLookupFailed"));
        }
        this._loading = false;
    }
    _onBarcodeLookupFailed(reason) {
        // Not every bottle has a scannable/known barcode — fall back to AI
        // label recognition automatically instead of dead-ending on "enter
        // details manually" when it's available.
        if (this._hasGemini) {
            this._scanMode = "label";
            this._labelLoading = false;
            this._showBackPrompt = false;
            this._captureStage = "front";
            this._frontImageRaw = "";
            this._error = this._t("ui.addWine.takePhotoInstead", { reason });
        }
        else {
            this._error = this._t("ui.addWine.enterManually", { reason });
        }
    }
    async _searchWine() {
        const session = this._session;
        const input = this.shadowRoot?.querySelector(".search-input");
        if (!input?.value.trim())
            return;
        this._loading = true;
        this._error = "";
        this._searchResults = [];
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/search_wine",
                query: input.value.trim(),
            });
            if (session !== this._session)
                return;
            if (result.results && result.results.length > 0) {
                this._searchResults = result.results;
            }
            else {
                this._error = this._t("ui.addWine.noResultsFound");
            }
        }
        catch {
            this._error = this._t("ui.addWine.searchFailed");
        }
        this._loading = false;
    }
    _selectSearchResult(item) {
        this._lookupResult = item;
        this._wineData = {
            ...this._wineData,
            name: item.name || "",
            winery: item.winery || "",
            type: item.type || "red",
            vintage: item.vintage,
            region: item.region || "",
            country: item.country || "",
            grape_variety: item.grape_variety || "",
            rating: item.rating,
            ratings_count: item.ratings_count || null,
            image_url: item.image_url || "",
            description: item.description || "",
            food_pairings: item.food_pairings || "",
            alcohol: item.alcohol || "",
            serving_temp: item.serving_temp || "",
            vivino_updated_at: new Date().toISOString(),
            vivino_checked_at: new Date().toISOString(),
        };
        this._searchResults = [];
        this._step = "details";
    }
    _onBarcodeDetected(e) {
        this._barcode = e.detail.barcode;
        this._scanMode = "idle";
        this._lookupBarcode();
    }
    _onLabelPhotoCaptured(e) {
        if (this._captureStage === "front") {
            this._frontImageRaw = e.detail.image;
            this._showBackPrompt = true;
        }
        else {
            this._finishLabelScan(e.detail.image);
        }
    }
    async _finishLabelScan(backImageRaw) {
        const session = this._session;
        this._showBackPrompt = false;
        this._labelLoading = true;
        this._error = "";
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/recognize_label",
                image: this._frontImageRaw,
                ...(backImageRaw ? { back_image: backImageRaw } : {}),
            });
            // The slowest wait in the app. If the dialog was reopened meanwhile,
            // this reading belongs to a bottle the user has moved on from.
            if (session !== this._session)
                return;
            if (result.result) {
                // Resize captured photos to thumbnails for storage
                const thumbUrl = await resizeImageForStorage(this._frontImageRaw);
                const backThumbUrl = backImageRaw ? await resizeImageForStorage(backImageRaw) : "";
                const r = result.result;
                this._wineData = {
                    ...this._wineData,
                    name: r.name || "",
                    winery: r.winery || "",
                    type: r.type || "red",
                    vintage: r.vintage,
                    region: r.region || "",
                    country: r.country || "",
                    grape_variety: r.grape_variety || "",
                    disposition: r.disposition || "",
                    drink_by: r.drink_by || "",
                    drink_window: r.drink_window || "",
                    peak_window: r.peak_window || "",
                    description: r.description || "",
                    retail_price: r.estimated_price || null,
                    ai_ratings: r.ai_ratings || null,
                    alcohol: r.alcohol || "",
                    serving_temp: r.serving_temp || "",
                    notes: r.notes || "",
                    barcode: r.barcode || this._wineData.barcode || "",
                    image_url: thumbUrl,
                    back_image_url: backThumbUrl,
                    ai_updated_at: new Date().toISOString(),
                    ai_checked_at: new Date().toISOString(),
                };
                this._scanMode = "idle";
                this._step = "details";
                this._captureStage = "front";
                this._frontImageRaw = "";
            }
            else {
                // Show specific error from backend if available
                const errorDetail = result.error || this._t("ui.addWine.unknownError");
                this._error = this._t("ui.addWine.labelRecognitionFailed", { error: errorDetail });
                console.error("Wine Cellar: label recognition failed:", errorDetail);
            }
        }
        catch (err) {
            if (session !== this._session)
                return;
            const msg = err?.message || String(err);
            console.error("Wine Cellar: label recognition error:", msg);
            this._error = this._t("ui.addWine.labelRecognitionError", { msg });
        }
        this._labelLoading = false;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    _goToStep(step) {
        this._step = step;
    }
    _updateField(field, value) {
        this._wineData = { ...this._wineData, [field]: value };
    }
    _zoneUsage(sr) {
        const cabinet = this.cabinets.find((c) => c.id === this._wineData.cabinet_id);
        const container = {
            cabinetId: this._wineData.cabinet_id || "",
            kind: "zone",
            zone: `storage-${sr.row}`,
            row: null,
            col: null,
        };
        return containerUsage(container, cabinet, this.wines);
    }
    _selectZone(sr) {
        // Adding a bottle used to append past the end of a full bin, silently
        // growing it beyond its configured capacity. Refuse instead, the way
        // drag-and-drop and paste already do.
        const { used, capacity, nextDepth, full } = this._zoneUsage(sr);
        const label = sr.name || (sr.type === "box" ? this._t("ui.addWine.thisBox") : sr.type === "shelf" ? this._t("ui.addWine.thisShelf") : sr.type === "stepped" ? this._t("ui.addWine.thisStepped") : this._t("ui.addWine.thisBin"));
        if (full) {
            this._error = this._t("ui.addWine.zoneFull", { label, used, capacity });
            return;
        }
        this._error = "";
        this._wineData = {
            ...this._wineData,
            zone: `storage-${sr.row}`,
            row: null,
            col: null,
            depth: nextDepth,
        };
    }
    // Send the bottle to a container the suggestion strip proposed, landing on
    // its first free depth.
    _applyContainer(c) {
        const cabinet = this.cabinets.find((cab) => cab.id === c.cabinetId);
        const patch = placementIn(c, cabinet, this.wines);
        if (!patch) {
            this._error = this._t("ui.addWine.containerFull", { label: containerLabel(c, this.cabinets) });
            return;
        }
        this._error = "";
        this._wineData = { ...this._wineData, ...patch };
    }
    _planSlots(count) {
        return planSlots(this._wineData, this.cabinets, this.wines, count);
    }
    // Free space at the chosen destination; null when there is no limit.
    _availableSlots() {
        const free = freeAt(this._wineData, this.cabinets, this.wines);
        return Number.isFinite(free) ? free : null;
    }
    _setQuantity(value) {
        const available = this._availableSlots();
        const max = available === null ? 99 : Math.max(1, Math.min(99, available));
        this._quantity = Math.max(1, Math.min(max, Math.round(value) || 1));
    }
    async _addWine() {
        this._loading = true;
        try {
            if (this.buyListMode) {
                await this.hass.callWS({
                    type: "wine_cellar/add_to_buy_list",
                    wine: this._wineData,
                });
                this.dispatchEvent(new CustomEvent("buy-list-updated", { bubbles: true, composed: true }));
            }
            else {
                const slots = this._planSlots(this._quantity);
                if (!slots.length) {
                    this._error = this._t("ui.addWine.noFreeSlot");
                    this._loading = false;
                    return;
                }
                // Each bottle is added at its own slot, so identical bottles never
                // stack on top of each other.
                const addedIds = [];
                for (let i = 0; i < slots.length; i++) {
                    this._addProgress = i + 1;
                    const result = await this.hass.callWS({
                        type: "wine_cellar/add_wine",
                        wine: { ...this._wineData, ...slots[i] },
                    });
                    if (result?.wine?.id)
                        addedIds.push(result.wine.id);
                }
                // A bin is a pile: what you just put in sits on top, so the new
                // bottles take the first slots and the rest shift down. One call
                // renumbers the bin; listing only the new ids is enough, the backend
                // appends the others in their existing order. Shelf/quinconce zones
                // are the opposite — every slot is a fixed physical position (the
                // depth each bottle was just given via slots[i], picked from the
                // exact dot clicked) — reordering them would scramble every other
                // bottle already sitting in that zone.
                const cabinet = this.cabinets.find((c) => c.id === this._wineData.cabinet_id);
                const destRow = storageRowFor(cabinet, this._wineData.zone || "");
                const isSlotZone = destRow?.type === "shelf" || destRow?.type === "stepped";
                if (this._wineData.zone && addedIds.length && !isSlotZone) {
                    await this.hass.callWS({
                        type: "wine_cellar/reorder_zone",
                        cabinet_id: this._wineData.cabinet_id,
                        zone: this._wineData.zone,
                        wine_ids: addedIds,
                    });
                }
                this.dispatchEvent(new CustomEvent("wine-added", { bubbles: true, composed: true }));
            }
            this._close();
        }
        catch (err) {
            this._error = this.buyListMode ? this._t("ui.addWine.addToBuyListFailed") : this._t("ui.addWine.addWineFailed");
        }
        this._addProgress = 0;
        this._loading = false;
    }
    async _quickAddToBuyList() {
        if (!this._wineData.name)
            return;
        this._loading = true;
        try {
            await this.hass.callWS({
                type: "wine_cellar/add_to_buy_list",
                wine: this._wineData,
            });
            this.dispatchEvent(new CustomEvent("buy-list-updated", { bubbles: true, composed: true }));
            this._close();
        }
        catch (err) {
            this._error = this._t("ui.addWine.addToBuyListFailed");
        }
        this._loading = false;
    }
    _renderStepIndicator() {
        const currentIdx = this._steps.indexOf(this._step);
        return b$1 `
      <div class="step-indicator">
        ${this._steps.map((s, i) => b$1 `
            <div
              class="step-dot ${i === currentIdx ? "active" : ""} ${i < currentIdx ? "done" : ""}"
            ></div>
          `)}
      </div>
    `;
    }
    _renderScanStep() {
        // Barcode camera mode
        if (this._scanMode === "barcode") {
            return b$1 `
        <div class="scan-section">
          <barcode-scanner
            .hass=${this.hass}
            .active=${true}
            @barcode-detected=${this._onBarcodeDetected}
            @scanner-error=${(e) => { this._error = e.detail.error; this._scanMode = "idle"; }}
          ></barcode-scanner>
          ${this._loading
                ? b$1 `<div class="label-loading"><span class="loading-spinner"></span><div style="margin-top: 8px">${this._t("ui.addWine.lookingUpBarcode")}</div></div>`
                : A$1}
          ${this._error ? b$1 `<div class="error-msg">${this._error}</div>` : A$1}
          <div class="camera-actions">
            <button class="btn btn-outline" @click=${() => { this._scanMode = "idle"; this._error = ""; }}>${this._t("ui.addWine.cancelScan")}</button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-outline" @click=${this._close}>${this._t("ui.common.cancel")}</button>
        </div>
      `;
        }
        // Label camera mode
        if (this._scanMode === "label") {
            return b$1 `
        <div class="scan-section">
          ${this._labelLoading
                ? b$1 `
                <div class="label-loading">
                  <span class="loading-spinner"></span>
                  <div style="margin-top: 8px">${this._t("ui.addWine.analyzingLabel")}</div>
                </div>
              `
                : this._showBackPrompt
                    ? b$1 `
                  <div style="text-align:center;padding:24px 12px">
                    <div style="font-size:2em;margin-bottom:8px">✅</div>
                    <div style="margin-bottom:12px;font-weight:500">${this._t("ui.addWine.frontLabelCaptured")}</div>
                    <p style="font-size:0.85em;color:var(--wc-text-secondary);margin-bottom:16px">
                      ${this._t("ui.addWine.addBackPhotoQuestion")}
                    </p>
                    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
                      <button class="btn btn-primary" @click=${() => { this._showBackPrompt = false; this._captureStage = "back"; }}>${this._t("ui.addWine.addBackPhotoBtn")}</button>
                      <button class="btn btn-outline" @click=${() => this._finishLabelScan()}>${this._t("ui.addWine.skipUseFrontOnly")}</button>
                    </div>
                  </div>
                `
                    : b$1 `
                  ${this._captureStage === "back"
                        ? b$1 `<div class="hint" style="text-align:center;margin-bottom:6px">${this._t("ui.addWine.photographBackLabel")}</div>`
                        : A$1}
                  <label-camera
                    .hass=${this.hass}
                    .active=${true}
                    @photo-captured=${this._onLabelPhotoCaptured}
                  ></label-camera>
                `}
          ${this._error ? b$1 `<div class="error-msg">${this._error}</div>` : A$1}
          <div class="camera-actions">
            <button class="btn btn-outline" @click=${() => {
                this._scanMode = "idle";
                this._error = "";
                this._labelLoading = false;
                this._showBackPrompt = false;
                this._captureStage = "front";
                this._frontImageRaw = "";
            }}>${this._t("ui.common.cancel")}</button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-outline" @click=${this._close}>${this._t("ui.common.cancel")}</button>
        </div>
      `;
        }
        // Idle mode - show options
        return b$1 `
      <div class="scan-section">
        <div class="scan-options">
          <button class="scan-option" @click=${() => { this._scanMode = "barcode"; this._error = ""; }}>
            <span class="scan-option-icon">📷</span>
            <div class="scan-option-text">
              <div class="scan-option-title">${this._t("ui.addWine.scanBarcodeTitle")}</div>
              <div class="scan-option-desc">${this._t("ui.addWine.scanBarcodeDesc")}</div>
            </div>
          </button>

          <button
            class="scan-option ${this._hasGemini ? "" : "disabled"}"
            @click=${() => this._hasGemini && (() => { this._scanMode = "label"; this._error = ""; })()}
            title=${this._hasGemini ? "" : this._t("ui.addWine.configureGeminiTitle")}
          >
            <span class="scan-option-icon">🤖</span>
            <div class="scan-option-text">
              <div class="scan-option-title">${this._t("ui.addWine.recognizeLabelTitle")}</div>
              <div class="scan-option-desc">
                ${this._hasGemini
            ? this._t("ui.addWine.takePhotoOfLabel")
            : this._t("ui.addWine.requiresGeminiKey")}
              </div>
            </div>
          </button>

          <button
            class="scan-option ${this._hasGemini ? "" : "disabled"}"
            @click=${() => this._hasGemini && this._openScanList()}
            title=${this._hasGemini ? "" : this._t("ui.addWine.configureGeminiTitle")}
          >
            <span class="scan-option-icon">🍽️</span>
            <div class="scan-option-text">
              <div class="scan-option-title">${this._t("ui.addWine.scanListTitle")}</div>
              <div class="scan-option-desc">
                ${this._hasGemini
            ? this._t("ui.addWine.scanListDesc")
            : this._t("ui.addWine.requiresGeminiKey")}
              </div>
            </div>
          </button>
        </div>

        <div class="or-divider">${this._t("ui.addWine.orEnterManually")}</div>

        <div class="barcode-input-row">
          <input
            type="text"
            placeholder="${this._t('ui.addWine.barcodePlaceholder')}"
            .value=${this._barcode}
            @input=${(e) => (this._barcode = e.target.value)}
            @keypress=${(e) => e.key === "Enter" && this._lookupBarcode()}
          />
          <button class="btn btn-primary" @click=${this._lookupBarcode}>
            ${this._loading
            ? b$1 `<span class="loading-spinner"></span>`
            : this._t("ui.addWine.lookUpBtn")}
          </button>
        </div>

        ${this._lookupResult
            ? b$1 `
              <div class="lookup-result">
                <div class="result-name">${this._lookupResult.name}</div>
                <div class="result-detail">
                  ${this._lookupResult.winery}
                  ${this._lookupResult.vintage
                ? ` · ${this._lookupResult.vintage}`
                : ""}
                </div>
              </div>
            `
            : A$1}

        <div class="or-divider">${this._t("ui.addWine.orSearchByName")}</div>

        <div class="barcode-input-row">
          <input
            class="search-input"
            type="text"
            placeholder="${this._t('ui.addWine.searchNamePlaceholder')}"
            @keypress=${(e) => e.key === "Enter" && this._searchWine()}
          />
          <button class="btn btn-outline" @click=${this._searchWine}>
            ${this._loading
            ? b$1 `<span class="loading-spinner"></span>`
            : this._t("ui.addWine.searchBtn")}
          </button>
        </div>

        ${this._searchResults.length > 0
            ? b$1 `
              <div class="search-results">
                <div class="search-results-label">
                  ${this._t("ui.addWine.resultsCount", { n: this._searchResults.length, plural: this._searchResults.length > 1 ? "s" : "" })}
                </div>
                ${this._searchResults.map((item) => b$1 `
                    <button
                      class="search-result-item"
                      @click=${() => this._selectSearchResult(item)}
                    >
                      ${item.image_url
                ? b$1 `<img class="search-result-thumb" src="${item.image_url}" alt="" />`
                : b$1 `<div class="search-result-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.2em;">🍷</div>`}
                      <div class="search-result-info">
                        <div class="search-result-name">${item.name || this._t("ui.addWine.unknownName")}</div>
                        <div class="search-result-meta">
                          ${item.winery || ""}${item.vintage ? ` · ${item.vintage}` : ""}${item.region ? ` · ${item.region}` : ""}
                        </div>
                      </div>
                      ${item.rating
                ? b$1 `<span class="search-result-rating">★ ${item.rating.toFixed(1)}</span>`
                : A$1}
                    </button>
                  `)}
              </div>
            `
            : A$1}

        ${this._error
            ? b$1 `<div class="error-msg">${this._error}</div>`
            : A$1}
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${this._close}>${this._t("ui.common.cancel")}</button>
        <button
          class="btn btn-outline"
          @click=${() => this._goToStep("details")}
        >
          ${this._t("ui.addWine.skipManualEntry")}
        </button>
      </div>
    `;
    }
    _renderDetailsStep() {
        return b$1 `
      <div class="dialog-body">
        <div class="form-group">
          <label>${this._t("ui.addWine.wineNameLabel")}</label>
          <input
            type="text"
            .value=${this._wineData.name || ""}
            @input=${(e) => this._updateField("name", e.target.value)}
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${producerLabel(this._wineData.type, this.hass?.language)}</label>
            <input
              type="text"
              .value=${this._wineData.winery || ""}
              @input=${(e) => this._updateField("winery", e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>${this._t("ui.addWine.vintageLabel")}</label>
            <input
              type="number"
              .value=${this._wineData.vintage?.toString() || ""}
              @input=${(e) => this._updateField("vintage", parseInt(e.target.value) || null)}
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.addWine.typeLabel")}</label>
            <select
              @change=${(e) => this._updateField("type", e.target.value)}
            >
              ${getSelectableWineTypes(this.enableWhisky, this.hass?.language).map(([value, label]) => b$1 `<option value=${value} ?selected=${(this._wineData.type || "red") === value}>${label}</option>`)}
            </select>
          </div>
          <div class="form-group">
            <label>${this._t("ui.addWine.purchasePriceLabel")}</label>
            <input
              type="number"
              step="0.01"
              .value=${this._wineData.price?.toString() || ""}
              @input=${(e) => this._updateField("price", parseFloat(e.target.value) || null)}
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.addWine.currentValueLabel")}</label>
            <input
              type="number"
              step="0.01"
              .value=${this._wineData.retail_price?.toString() || ""}
              @input=${(e) => this._updateField("retail_price", parseFloat(e.target.value) || null)}
            />
          </div>
          <div class="form-group">
            <label>${this._t("ui.addWine.regionLabel")}</label>
            <input
              type="text"
              .value=${this._wineData.region || ""}
              @input=${(e) => this._updateField("region", e.target.value)}
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.addWine.countryLabel")}</label>
            <input
              type="text"
              .value=${this._wineData.country || ""}
              @input=${(e) => this._updateField("country", e.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label>${varietyLabel(this._wineData.type, false, this.hass?.language)}</label>
          <input
            type="text"
            .value=${this._wineData.grape_variety || ""}
            @input=${(e) => this._updateField("grape_variety", e.target.value)}
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>${this._t("ui.addWine.purchaseDateLabel")}</label>
            <input
              type="date"
              .value=${this._wineData.purchase_date || ""}
              @input=${(e) => this._updateField("purchase_date", e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>${this._t("ui.addWine.drinkByLabel")}</label>
            <input
              type="text"
              placeholder="${this._t('ui.addWine.drinkByPlaceholder')}"
              .value=${this._wineData.drink_by || ""}
              @input=${(e) => this._updateField("drink_by", e.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label>${this._t("ui.addWine.notesLabel")}</label>
          <textarea
            .value=${this._wineData.notes || ""}
            @input=${(e) => this._updateField("notes", e.target.value)}
          ></textarea>
        </div>

        <div class="rating-section">
          <div class="rating-label">${this._t("ui.addWine.myRatingLabel")}</div>
          <star-rating
            .value=${this._wineData.user_rating || 0}
            @rating-change=${(e) => this._updateField("user_rating", e.detail.value || null)}
          ></star-rating>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => this._goToStep("scan")}>
          ${this._t("ui.addWine.back")}
        </button>
        ${!this.buyListMode
            ? b$1 `
              <button
                class="btn btn-primary"
                style="background: #e65100;"
                @click=${this._quickAddToBuyList}
                ?disabled=${!this._wineData.name || this._loading}
                title="${this._t('ui.addWine.buyListBtnTitle')}"
              >
                ${this._loading ? b$1 `<span class="loading-spinner"></span>` : this._t("ui.addWine.buyListBtn")}
              </button>
            `
            : A$1}
        <button
          class="btn btn-primary"
          @click=${() => this._goToStep(this.buyListMode ? "confirm" : "location")}
          ?disabled=${!this._wineData.name}
        >
          ${this._t("ui.addWine.next")}
        </button>
      </div>
    `;
    }
    // Destinations deduced from where this bottle's relatives already sit. The
    // cellar has no declared zone rules, so its own layout is the only signal:
    // every suggestion says which bottles are already there and why they match.
    _renderSuggestions() {
        const suggestions = suggestDestinations(this._wineData, this.wines, this.cabinets, 3);
        if (!suggestions.length)
            return A$1;
        const current = containerOf(this._wineData);
        const spaceText = (s) => {
            if (s.usage.full)
                return this._t("ui.addWine.fullUsage", { used: s.usage.used, capacity: s.usage.capacity });
            if (!Number.isFinite(s.usage.free))
                return this._t("ui.addWine.room");
            return s.usage.free === 1 ? this._t("ui.addWine.oneFree") : this._t("ui.addWine.nFree", { n: s.usage.free });
        };
        return b$1 `
      <div class="suggest-strip">
        <div class="suggest-title">${this._t("ui.addWine.suggestedTitle")}</div>
        ${suggestions.map((s) => {
            const selected = !!current && sameContainer(current, s.container);
            return b$1 `
            <button
              class="suggest-item ${s.usage.full ? "full" : ""} ${selected ? "selected" : ""}"
              ?disabled=${s.usage.full}
              @click=${() => this._applyContainer(s.container)}
            >
              <span class="suggest-where">${s.label}</span>
              <span class="suggest-why">${s.reason}</span>
              <span class="suggest-space ${s.usage.full || s.usage.free <= 1 ? "tight" : ""}">
                ${spaceText(s)}
              </span>
            </button>
            ${s.alternative
                ? b$1 `
                  <div class="suggest-alt">
                    ${this._t("ui.addWine.noRoomSplit")}
                    <button @click=${() => this._applyContainer(s.alternative.container)}>
                      ${s.alternative.label}
                    </button>
                    (${s.alternative.free === 1 ? this._t("ui.addWine.oneFree") : this._t("ui.addWine.nFree", { n: s.alternative.free })})${this._t("ui.addWine.orFreeSlotFirst")}
                  </div>
                `
                : A$1}
          `;
        })}
      </div>
    `;
    }
    _renderLocationStep() {
        const selectedCabinet = this.cabinets.find((c) => c.id === this._wineData.cabinet_id);
        const zones = selectedCabinet?.storage_rows || [];
        const hasZone = !!this._wineData.zone;
        return b$1 `
      <div class="dialog-body">
        <div style="font-weight: 500; margin-bottom: 8px">${this._t("ui.addWine.chooseLocation")}</div>
        <div style="font-size: 0.85em; color: var(--wc-text-secondary); margin-bottom: 12px">
          ${this._t("ui.addWine.selectCabinetHint")}
        </div>

        ${this._renderSuggestions()}

        <div class="location-grid">
          ${this.cabinets.map((cab) => b$1 `
              <div
                class="location-cabinet ${this._wineData.cabinet_id === cab.id ? "selected" : ""}"
                @click=${() => {
            this._wineData = { ...this._wineData, cabinet_id: cab.id, row: null, col: null, zone: "" };
        }}
              >
                <div class="cab-name">${cab.name}</div>
                <div class="cab-info">${this._t("ui.addWine.slotsCount", { rows: cab.rows, cols: cab.cols })}</div>
              </div>
            `)}
        </div>

        ${selectedCabinet && zones.length > 0 ? b$1 `
          <div style="margin-top:12px">
            <label style="display:block;font-size:0.8em;color:var(--wc-text-secondary);margin-bottom:6px">${this._t("ui.addWine.bulkBoxZone")}</label>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              <button
                class="btn ${!hasZone ? "btn-primary" : "btn-outline"}"
                style="font-size:0.8em;padding:6px 10px"
                @click=${() => this._updateField("zone", "")}
              >${this._t("ui.addWine.noneUseGrid")}</button>
              ${zones.map((sr) => {
            const usage = this._zoneUsage(sr);
            const selected = this._wineData.zone === `storage-${sr.row}`;
            return b$1 `
                  <button
                    class="btn ${selected ? "btn-primary" : "btn-outline"}"
                    style="font-size:0.8em;padding:6px 10px${usage.full ? ";opacity:0.5" : ""}"
                    title=${usage.full ? this._t("ui.addWine.fullTitle") : ""}
                    @click=${() => this._selectZone(sr)}
                  >
                    ${sr.name || (sr.type === "box" ? this._t("ui.addWine.boxShort") : sr.type === "shelf" ? this._t("ui.addWine.shelfShort") : sr.type === "stepped" ? this._t("storageRowType.stepped") : this._t("storageRowType.bulk"))}
                    <span style="opacity:0.75">${usage.used}/${usage.capacity}</span>
                  </button>
                `;
        })}
            </div>
          </div>
        ` : A$1}

        ${this._wineData.cabinet_id && !hasZone
            ? b$1 `
              <div class="pos-inputs">
                <div class="form-group">
                  <label>${this._t("ui.addWine.rowLabel")}</label>
                  <input
                    type="number"
                    min="1"
                    .value=${this._wineData.row != null ? (this._wineData.row + 1).toString() : ""}
                    @input=${(e) => this._updateField("row", parseInt(e.target.value) - 1)}
                  />
                </div>
                <div class="form-group">
                  <label>${this._t("ui.addWine.columnLabel")}</label>
                  <input
                    type="number"
                    min="1"
                    .value=${this._wineData.col != null ? (this._wineData.col + 1).toString() : ""}
                    @input=${(e) => this._updateField("col", parseInt(e.target.value) - 1)}
                  />
                </div>
              </div>
            `
            : A$1}
        ${this._error ? b$1 `<div class="error-msg">${this._error}</div>` : A$1}
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => this._goToStep("details")}>
          ${this._t("ui.addWine.back")}
        </button>
        <button class="btn btn-primary" @click=${() => this._onLocationNext()}>
          ${this._t("ui.addWine.next")}
        </button>
      </div>
    `;
    }
    _onLocationNext() {
        const d = this._wineData;
        // A cabinet with no zone and no complete row/col is a wine with no
        // findable position — it silently vanishes (assigned to the cabinet,
        // but rendered nowhere). Catch that here instead of at save time.
        if (d.cabinet_id && !d.zone && (d.row == null || d.col == null || isNaN(d.row) || isNaN(d.col))) {
            this._error = this._t("ui.addWine.pickZoneOrRowCol");
            return;
        }
        const cabinet = this.cabinets.find((c) => c.id === d.cabinet_id);
        if (cabinet && !d.zone && d.row != null && d.col != null) {
            if (d.row < 0 || d.row >= cabinet.rows || d.col < 0 || d.col >= cabinet.cols) {
                this._error = this._t("ui.addWine.slotOutside", { cabinet: cabinet.name, rows: cabinet.rows, cols: cabinet.cols });
                return;
            }
            const isStorageRow = (cabinet.storage_rows || []).some((sr) => sr.row === d.row);
            if (isStorageRow) {
                this._error = this._t("ui.addWine.rowIsBinOrBox");
                return;
            }
            // Stack behind whatever is already in the slot, up to the rack's depth,
            // instead of landing on top of another bottle at depth 0.
            const occupied = new Set(this.wines
                .filter((w) => w.cabinet_id === d.cabinet_id && w.row === d.row && w.col === d.col)
                .map((w) => w.depth || 0));
            const rackDepth = cabinet.depth || 1;
            let depth = 0;
            while (occupied.has(depth))
                depth++;
            if (depth >= rackDepth) {
                this._error = this._t("ui.addWine.slotFull", { row: d.row + 1, col: d.col + 1, used: occupied.size, depth: rackDepth });
                return;
            }
            this._wineData = { ...this._wineData, depth };
        }
        this._error = "";
        this._goToStep("confirm");
    }
    _renderQuantityPicker() {
        const available = this._availableSlots();
        const max = available === null ? 99 : Math.max(1, Math.min(99, available));
        const destination = this._wineData.cabinet_id
            ? this._planSlots(this._quantity)
            : null;
        return b$1 `
      <div class="qty-row">
        <span class="qty-label">${this._t("ui.addWine.bottlesLabel")}</span>
        <div class="qty-stepper">
          <button
            class="qty-btn"
            ?disabled=${this._quantity <= 1}
            @click=${() => this._setQuantity(this._quantity - 1)}
          >−</button>
          <input
            class="qty-input"
            type="number"
            min="1"
            max=${max}
            .value=${String(this._quantity)}
            @change=${(e) => this._setQuantity(Number(e.target.value))}
          />
          <button
            class="qty-btn"
            ?disabled=${this._quantity >= max}
            @click=${() => this._setQuantity(this._quantity + 1)}
          >+</button>
        </div>
      </div>
      <div class="qty-hint">
        ${available === null
            ? this._t("ui.addWine.identicalUnassigned")
            : available === 0
                ? this._t("ui.addWine.destinationFull")
                : b$1 `${this._t("ui.addWine.slotsFreeHere", { n: available, plural: available > 1 ? "s" : "" })}
              ${destination && destination.length > 1
                    ? this._t("ui.addWine.consecutiveSlots", { n: destination.length })
                    : ""}`}
      </div>
    `;
    }
    _renderConfirmStep() {
        const cabinetName = this.cabinets.find((c) => c.id === this._wineData.cabinet_id)?.name ||
            this._t("wineLocation.unassigned");
        const zoneCabinet = this.cabinets.find((c) => c.id === this._wineData.cabinet_id);
        const zoneRow = this._wineData.zone
            ? zoneCabinet?.storage_rows.find((sr) => `storage-${sr.row}` === this._wineData.zone)
            : undefined;
        const posLabel = zoneRow
            ? zoneRow.name || (zoneRow.type === "box" ? this._t("ui.addWine.boxShort") : zoneRow.type === "shelf" ? this._t("ui.addWine.shelfShort") : zoneRow.type === "stepped" ? this._t("storageRowType.stepped") : this._t("storageRowType.bulk"))
            : this._wineData.row != null && this._wineData.col != null
                ? this._t("ui.addWine.posRowCol", { row: (this._wineData.row ?? 0) + 1, col: (this._wineData.col ?? 0) + 1 })
                : this._t("ui.addWine.notSpecified");
        return b$1 `
      <div class="dialog-body">
        <div style="font-weight: 500; margin-bottom: 12px">${this._t("ui.addWine.confirmAndAdd")}</div>

        <div class="confirm-summary">
          <div class="summary-row">
            <span class="summary-label">${this._t("ui.addWine.nameLabel")}</span>
            <span class="summary-value">${this._wineData.name}</span>
          </div>
          ${this._wineData.winery
            ? b$1 `
                <div class="summary-row">
                  <span class="summary-label">${producerLabel(this._wineData.type, this.hass?.language)}</span>
                  <span class="summary-value">${this._wineData.winery}</span>
                </div>
              `
            : A$1}
          ${this._wineData.vintage
            ? b$1 `
                <div class="summary-row">
                  <span class="summary-label">${this._t("ui.addWine.vintageLabel")}</span>
                  <span class="summary-value">${this._wineData.vintage}</span>
                </div>
              `
            : A$1}
          <div class="summary-row">
            <span class="summary-label">${this._t("ui.addWine.typeLabel")}</span>
            <span class="summary-value">
              ${getWineTypeLabels(this.hass?.language)[this._wineData.type || "red"]}
            </span>
          </div>
          ${this.buyListMode
            ? A$1
            : b$1 `
                <div class="summary-row">
                  <span class="summary-label">${this._t("ui.addWine.cabinetLabel")}</span>
                  <span class="summary-value">${cabinetName}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">${this._t("ui.addWine.positionLabel")}</span>
                  <span class="summary-value">${posLabel}</span>
                </div>
              `}
          ${this._wineData.user_rating
            ? b$1 `
                <div class="summary-row">
                  <span class="summary-label">${this._t("ui.addWine.myRatingLabel")}</span>
                  <span class="summary-value">${this._wineData.user_rating}/5</span>
                </div>
              `
            : A$1}
        </div>

        ${this.buyListMode ? A$1 : this._renderQuantityPicker()}

        ${this._error
            ? b$1 `<div class="error-msg">${this._error}</div>`
            : A$1}
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => this._goToStep(this.buyListMode ? "details" : "location")}>
          ${this._t("ui.addWine.back")}
        </button>
        <button class="btn btn-primary" @click=${this._addWine}>
          ${this._loading
            ? b$1 `<span class="loading-spinner"></span>${this._addProgress && this._quantity > 1
                ? b$1 ` ${this._addProgress}/${this._quantity}`
                : A$1}`
            : this.buyListMode
                ? this._t("ui.addWine.titleBuyList")
                : this._quantity > 1
                    ? this._t("ui.addWine.addNBottles", { n: this._quantity })
                    : this._t("ui.addWine.title")}
        </button>
      </div>
    `;
    }
    render() {
        if (!this.open)
            return A$1;
        return b$1 `
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(this._close, this._t('ui.common.close'))}
          <div class="dialog-header">${this.buyListMode ? this._t("ui.addWine.titleBuyList") : this._t("ui.addWine.title")}</div>
          ${this._renderStepIndicator()}
          ${this._step === "scan" ? this._renderScanStep() : A$1}
          ${this._step === "details" ? this._renderDetailsStep() : A$1}
          ${this._step === "location" ? this._renderLocationStep() : A$1}
          ${this._step === "confirm" ? this._renderConfirmStep() : A$1}
        </div>
      </div>
    `;
    }
};
AddWineDialog.styles = [
    sharedStyles,
    i$4 `
      .step-indicator {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 12px 20px;
      }

      .step-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--wc-border);
        transition: all 0.2s;
      }

      .step-dot.active {
        background: var(--wc-primary);
        width: 24px;
        border-radius: 4px;
      }

      .step-dot.done {
        background: var(--wc-primary);
      }

      .scan-section {
        padding: 16px 20px;
      }

      .scan-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 16px;
      }

      .scan-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        background: rgba(255, 255, 255, 0.06);
        color: var(--wc-text);
        text-align: left;
        font-size: 0.95em;
        width: 100%;
      }

      .scan-option:hover {
        border-color: var(--wc-primary);
        background: rgba(255, 255, 255, 0.12);
      }

      .scan-option-icon {
        font-size: 1.5em;
        flex-shrink: 0;
      }

      .scan-option-text {
        flex: 1;
      }

      .scan-option-title {
        font-weight: 600;
        margin-bottom: 2px;
      }

      .scan-option-desc {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .scan-option.disabled {
        opacity: 0.5;
        cursor: default;
      }

      .barcode-input-row {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }

      .barcode-input-row input {
        flex: 1;
        padding: 10px 14px;
        border: 2px solid var(--wc-border);
        border-radius: 10px;
        font-size: 1em;
        text-align: center;
        letter-spacing: 2px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        box-sizing: border-box;
      }

      .barcode-input-row input:focus {
        border-color: var(--wc-primary);
        outline: none;
      }

      .or-divider {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 14px 0;
        color: var(--wc-text-secondary);
        font-size: 0.85em;
      }

      .or-divider::before,
      .or-divider::after {
        content: "";
        flex: 1;
        height: 1px;
        background: var(--wc-border);
      }

      .search-input {
        width: 100%;
        padding: 10px 14px;
        border: 2px solid var(--wc-border);
        border-radius: 10px;
        font-size: 1em;
        box-sizing: border-box;
        background: var(--wc-field-bg);
        color: var(--wc-text);
      }

      .search-input:focus {
        border-color: var(--wc-primary);
        outline: none;
      }

      .lookup-result {
        background: rgba(114, 47, 55, 0.05);
        border: 1px solid rgba(114, 47, 55, 0.2);
        border-radius: 10px;
        padding: 12px;
        margin-top: 12px;
        text-align: left;
      }

      .lookup-result .result-name {
        font-weight: 600;
        font-size: 1em;
      }

      .lookup-result .result-detail {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .location-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }

      .suggest-strip {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 14px;
        padding: 10px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        background: rgba(114, 47, 55, 0.04);
      }

      .suggest-title {
        font-size: 0.75em;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--wc-text-secondary);
      }

      .suggest-item {
        display: flex;
        align-items: baseline;
        gap: 8px;
        width: 100%;
        text-align: left;
        font: inherit;
        color: inherit;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-field-bg);
        padding: 8px 10px;
        cursor: pointer;
        transition: all 0.15s;
      }

      .suggest-item:hover:not(.full) {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.08);
      }

      .suggest-item.selected {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.12);
      }

      .suggest-item.full {
        cursor: default;
        opacity: 0.65;
      }

      .suggest-item.full .suggest-where {
        text-decoration: line-through;
      }

      .suggest-where {
        font-weight: 600;
        font-size: 0.85em;
        white-space: nowrap;
      }

      .suggest-why {
        flex: 1;
        font-size: 0.78em;
        color: var(--wc-text-secondary);
      }

      .suggest-space {
        font-size: 0.75em;
        white-space: nowrap;
        color: var(--wc-text-secondary);
      }

      .suggest-space.tight {
        color: #c62828;
      }

      .suggest-alt {
        margin: -2px 0 2px 10px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .suggest-alt button {
        font: inherit;
        color: var(--wc-primary);
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        text-decoration: underline;
      }

      .location-cabinet {
        border: 2px solid var(--wc-border);
        border-radius: 10px;
        padding: 12px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .location-cabinet:hover {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.05);
      }

      .location-cabinet.selected {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.1);
      }

      .location-cabinet .cab-name {
        font-weight: 600;
        font-size: 0.9em;
      }

      .location-cabinet .cab-info {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        margin-top: 4px;
      }

      .pos-inputs {
        display: flex;
        gap: 12px;
        margin-top: 12px;
      }

      .pos-inputs .form-group {
        flex: 1;
      }

      .error-msg {
        color: #c62828;
        font-size: 0.85em;
        margin-top: 8px;
      }

      .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid var(--wc-border);
        border-top-color: var(--wc-primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .qty-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-top: 14px;
      }

      .qty-label {
        font-size: 0.85em;
        font-weight: 500;
        color: var(--wc-text-secondary);
      }

      .qty-stepper {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .qty-btn {
        width: 32px;
        height: 32px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        font-size: 1.1em;
        line-height: 1;
        cursor: pointer;
      }

      .qty-btn:hover:not(:disabled) {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
      }

      .qty-btn:disabled {
        opacity: 0.4;
        cursor: default;
      }

      .qty-input {
        width: 56px;
        padding: 6px 4px;
        text-align: center;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        font-size: 1em;
        font-weight: 600;
      }

      .qty-hint {
        margin-top: 6px;
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
      }

      .confirm-summary {
        background: rgba(128, 128, 128, 0.08);
        border-radius: 10px;
        padding: 16px;
      }

      .confirm-summary .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        font-size: 0.9em;
      }

      .confirm-summary .summary-label {
        color: var(--wc-text-secondary);
      }

      .confirm-summary .summary-value {
        font-weight: 500;
      }

      .label-loading {
        text-align: center;
        padding: 20px;
      }

      .label-loading .loading-spinner {
        width: 32px;
        height: 32px;
        border-width: 3px;
      }

      .camera-actions {
        display: flex;
        gap: 8px;
        justify-content: center;
        padding: 8px 0;
      }

      .rating-section {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--wc-border);
      }

      .rating-label {
        font-size: 0.85em;
        font-weight: 500;
        color: var(--wc-text-secondary);
        margin-bottom: 6px;
      }

      .search-results {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-height: 280px;
        overflow-y: auto;
      }

      .search-results-label {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        margin-bottom: 2px;
      }

      .search-result-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.15s;
        background: transparent;
        text-align: left;
        color: var(--wc-text);
        width: 100%;
        box-sizing: border-box;
      }

      .search-result-item:hover {
        border-color: var(--wc-primary);
        background: var(--wc-hover);
      }

      .search-result-thumb {
        width: 36px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
        background: rgba(128, 128, 128, 0.1);
      }

      .search-result-info {
        flex: 1;
        min-width: 0;
      }

      .search-result-name {
        font-weight: 600;
        font-size: 0.9em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .search-result-meta {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .search-result-rating {
        font-size: 0.8em;
        font-weight: 600;
        color: #f5a623;
        flex-shrink: 0;
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ type: Boolean })
], AddWineDialog.prototype, "open", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "cabinets", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "wines", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "preselectedCabinet", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "preselectedRow", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "preselectedCol", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "preselectedZone", void 0);
__decorate([
    n$1({ attribute: false })
], AddWineDialog.prototype, "preselectedDepth", void 0);
__decorate([
    n$1({ type: Boolean })
], AddWineDialog.prototype, "buyListMode", void 0);
__decorate([
    n$1({ type: Boolean })
], AddWineDialog.prototype, "enableWhisky", void 0);
__decorate([
    n$1({ type: String })
], AddWineDialog.prototype, "defaultWineType", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_step", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_scanMode", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_barcode", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_loading", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_quantity", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_addProgress", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_lookupResult", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_wineData", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_error", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_hasGemini", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_labelLoading", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_captureStage", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_frontImageRaw", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_showBackPrompt", void 0);
__decorate([
    r$1()
], AddWineDialog.prototype, "_searchResults", void 0);
AddWineDialog = __decorate([
    t$2("add-wine-dialog")
], AddWineDialog);

let WineSearchBar = class WineSearchBar extends i$1 {
    constructor() {
        super(...arguments);
        this.value = "";
        this.filter = "all";
        this.enableWhisky = false;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    _onInput(e) {
        const value = e.target.value;
        this.dispatchEvent(new CustomEvent("search-change", {
            detail: { query: value, filter: this.filter },
            bubbles: true,
            composed: true,
        }));
    }
    // Emptying the field by hand is fiddly on a phone even once it is wide
    // enough to see. One tap, and the caret stays where the user can keep typing.
    _clear() {
        this.dispatchEvent(new CustomEvent("search-change", {
            detail: { query: "", filter: this.filter },
            bubbles: true,
            composed: true,
        }));
        const input = this.shadowRoot?.querySelector("input");
        if (input) {
            input.value = "";
            input.focus();
        }
    }
    _onFilterChange(filter) {
        this.filter = filter;
        const input = this.shadowRoot?.querySelector("input");
        this.dispatchEvent(new CustomEvent("search-change", {
            detail: { query: input?.value || "", filter },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const filters = [
            { id: "all", label: this._t("ui.inventory.preset.allLabel") },
            { id: "red", label: this._t("wineType.red") },
            { id: "white", label: this._t("wineType.white") },
            { id: "rosé", label: this._t("wineType.rosé") },
            { id: "sparkling", label: this._t("wineType.sparkling") },
            { id: "dessert", label: this._t("wineType.dessert") },
            ...(this.enableWhisky ? [{ id: "whisky", label: this._t("wineType.whisky") }] : []),
        ];
        return b$1 `
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="search"
            placeholder="${this._t('ui.inventory.searchPlaceholder')}"
            enterkeyhint="search"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.value}
            @input=${this._onInput}
          />
          ${this.value
            ? b$1 `
                <button class="search-clear" title="${this._t('ui.common.clearSearch')}" aria-label="${this._t('ui.common.clearSearch')}" @click=${this._clear}>
                  ✕
                </button>
              `
            : A$1}
        </div>
        <div class="filter-chips">
          ${filters.map((f) => b$1 `
              <button
                class="type-chip ${f.id === "all" ? "all" : ""} ${this.filter === f.id ? "active" : ""}"
                style=${typeChipStyle(f.id)}
                @click=${() => this._onFilterChange(f.id)}
              >
                ${f.label}
              </button>
            `)}
        </div>
      </div>
    `;
    }
};
WineSearchBar.styles = [
    sharedStyles,
    typeChipStyles,
    i$4 `
      :host {
        display: block;
      }

      /* The chips and the field used to share one non-wrapping row. Six chips
         that refuse to break left the input 46px wide on a phone, of which two
         were usable for text. The field keeps a floor and the chips drop to
         their own line rather than crushing it. */
      .search-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 16px 8px;
        align-items: center;
      }

      .search-input-wrapper {
        flex: 1 1 220px;
        min-width: 0;
        position: relative;
      }

      .search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--wc-text-secondary);
        font-size: 0.9em;
        pointer-events: none;
      }

      input {
        width: 100%;
        padding: 8px 38px 8px 32px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        font-size: 0.9em;
        background: var(--wc-field-bg);
        box-shadow: var(--wc-sheen);
        color: var(--wc-text);
        box-sizing: border-box;
        transition: border-color 0.2s, box-shadow 0.2s;
      }

      input:focus {
        border-color: var(--wc-primary-text);
        box-shadow: 0 0 0 3px rgba(154, 74, 84, 0.2);
        outline: none;
      }

      /* Safari zooms the whole page when a focused field computes under 16px,
         which is the other half of "the search box is unusable on my phone".
         Touch pointers only, so the desktop field keeps its size. */
      @media (pointer: coarse) {
        input {
          font-size: 16px;
        }
      }

      /* One clear button, ours: WebKit's own only appears on some platforms
         and would sit on top of this one where it does. */
      input::-webkit-search-cancel-button,
      input::-webkit-search-decoration {
        -webkit-appearance: none;
        appearance: none;
      }

      /* 30px rather than the icon's visual size: this is a thumb target on the
         device where the field was unusable in the first place. */
      .search-clear {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 50%;
        background: transparent;
        color: var(--wc-text-secondary);
        font-size: 0.8em;
        line-height: 1;
        cursor: pointer;
        padding: 0;
      }

      .search-clear:hover {
        background: rgba(114, 47, 55, 0.12);
        color: var(--wc-text);
      }

      .filter-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      /* Touch: room for the 44px clear button inside the field. */
      @media (pointer: coarse) {
        input {
          padding-right: 52px;
        }
        .search-clear {
          right: 0;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ attribute: false })
], WineSearchBar.prototype, "hass", void 0);
__decorate([
    n$1({ type: String })
], WineSearchBar.prototype, "value", void 0);
__decorate([
    n$1({ type: String })
], WineSearchBar.prototype, "filter", void 0);
__decorate([
    n$1({ type: Boolean })
], WineSearchBar.prototype, "enableWhisky", void 0);
WineSearchBar = __decorate([
    t$2("wine-search-bar")
], WineSearchBar);

var RackSettingsDialog_1;
let RackSettingsDialog = RackSettingsDialog_1 = class RackSettingsDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.open = false;
        this.cabinets = [];
        this.wines = [];
        this._mode = "list";
        this._editCabinet = {};
        // Primary and secondary each keep their own working list of storage rows
        // — so e.g. two bulk bins, one above and one below, can be configured
        // independently without one overwriting the other. A style's rows persist
        // here even while a different style is active for that slot, purely so
        // flipping back and forth while exploring doesn't lose work; only the
        // active style's rows for each slot are ever rendered or saved (see
        // _finalStorageRows).
        this._primaryStorageRows = [];
        this._secondaryStorageRows = [];
        // The rack's main style, chosen right under the name. Inferred from the
        // data when editing (see _startEdit); an explicit choice when adding.
        this._primaryStyle = "grid";
        // An optional second zone stacked above or below the primary one —
        // "none" means no secondary zone is attached.
        this._secondaryStyle = "none";
        this._secondaryPosition = "below";
        // Row count for a "grid" secondary specifically — a secondary grid block
        // has no StorageRow entry of its own (plain grid rows are never stored),
        // so unlike the other styles its row count needs its own field. It shares
        // the cabinet's own cols/depth (see _finalCols/_finalDepth) since a rack
        // never has more than one grid-shaped section.
        this._secondaryGridRows = 1;
        this._deleteCabinet = null;
        this._loading = false;
        this._error = "";
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    updated(changedProps) {
        if (changedProps.has("open") && this.open) {
            this._mode = "list";
            this._error = "";
        }
    }
    _close() {
        this._mode = "list";
        this._error = "";
        this.dispatchEvent(new CustomEvent("close"));
    }
    _notifyUpdate() {
        this.dispatchEvent(new CustomEvent("racks-updated", { bubbles: true, composed: true }));
    }
    _winesInCabinet(cabinetId) {
        return this.wines.filter((w) => w.cabinet_id === cabinetId).length;
    }
    // --- Per-slot row access ---
    // Each slot (primary/secondary) keeps its own list of rows; a style only
    // ever has rows of its own type in a slot's list (see the setters below),
    // so filtering by type is enough to find "the" row for styles that use
    // just one (bulk/box/stepped) or several (shelf).
    _rowsFor(slot) {
        return slot === "primary" ? this._primaryStorageRows : this._secondaryStorageRows;
    }
    _setRowsFor(slot, rows) {
        if (slot === "primary")
            this._primaryStorageRows = rows;
        else
            this._secondaryStorageRows = rows;
    }
    // --- Sensor pickers (temp/humidity) ---
    // Plain <select> rather than HA's own <ha-entity-picker>: that element's
    // API has shifted across HA versions, and it doesn't exist at all in this
    // project's standalone Lovelace-less preview page — a native <select>
    // works identically everywhere and needs nothing beyond hass.states.
    _sensorEntityIds(deviceClass) {
        const states = this.hass?.states || {};
        return Object.keys(states)
            .filter((id) => id.startsWith("sensor.") && states[id]?.attributes?.device_class === deviceClass)
            .sort((a, b) => (states[a].attributes.friendly_name || a).localeCompare(states[b].attributes.friendly_name || b));
    }
    _renderSensorPickers(tempValue, humidityValue, onTemp, onHumidity) {
        const states = this.hass?.states || {};
        const friendlyName = (id) => states[id]?.attributes?.friendly_name || id;
        const tempIds = this._sensorEntityIds("temperature");
        const humidityIds = this._sensorEntityIds("humidity");
        return b$1 `
      <div class="sensor-picker-row">
        <div class="sensor-picker-wrap">
          <span>🌡️</span>
          <select
            class="sensor-select"
            @change=${(e) => onTemp(e.target.value)}
          >
            <option value="" ?selected=${!tempValue}>${this._t("ui.rack.sensorNone")}</option>
            ${tempIds.map((id) => b$1 `<option value=${id} ?selected=${tempValue === id}>${friendlyName(id)}</option>`)}
          </select>
        </div>
        <div class="sensor-picker-wrap">
          <span>💧</span>
          <select
            class="sensor-select"
            @change=${(e) => onHumidity(e.target.value)}
          >
            <option value="" ?selected=${!humidityValue}>${this._t("ui.rack.sensorNone")}</option>
            ${humidityIds.map((id) => b$1 `<option value=${id} ?selected=${humidityValue === id}>${friendlyName(id)}</option>`)}
          </select>
        </div>
      </div>
    `;
    }
    _styleFor(slot) {
        return slot === "primary" ? this._primaryStyle : this._secondaryStyle;
    }
    _shelfRows(slot) {
        return this._rowsFor(slot).filter((sr) => sr.type === "shelf");
    }
    _bulkRow(slot) {
        return this._rowsFor(slot).find((sr) => sr.type === "bulk");
    }
    _boxRow(slot) {
        return this._rowsFor(slot).find((sr) => sr.type === "box");
    }
    _steppedRows(slot) {
        return this._rowsFor(slot).filter((sr) => sr.type === "stepped");
    }
    // How many rows a slot's active style actually uses.
    _slotRowCount(slot) {
        const style = this._styleFor(slot);
        if (style === "none")
            return 0;
        if (style === "grid")
            return slot === "primary" ? (this._editCabinet.rows || 1) : this._secondaryGridRows;
        if (style === "shelf")
            return Math.max(1, this._shelfRows(slot).length);
        if (style === "stepped")
            return Math.max(1, this._steppedRows(slot).length);
        return 1; // bulk, box
    }
    // A slot's own rows, renumbered to a contiguous range starting at
    // `offset` — the physical row a bottle sits behind never survives a rack
    // being reshaped anyway (see _displacedWines), so the exact index only
    // needs to be internally consistent at save time.
    _slotFinalRows(slot, offset) {
        const style = this._styleFor(slot);
        if (style === "none" || style === "grid")
            return [];
        if (style === "shelf") {
            return this._shelfRows(slot).map((sr, i) => ({ ...sr, row: offset + i }));
        }
        if (style === "stepped") {
            return this._steppedRows(slot).map((sr, i) => ({ ...sr, row: offset + i }));
        }
        const row = style === "bulk" ? this._bulkRow(slot) : this._boxRow(slot);
        return row ? [{ ...row, row: offset }] : [];
    }
    // What actually gets saved, freshly computed from the active styles —
    // never a stale mix of whatever _primaryStorageRows/_secondaryStorageRows
    // happen to be holding from earlier style exploration. The secondary
    // zone, when present, sits either before the primary's own rows (row 0
    // upward, "above") or after them ("below") — see _secondaryPosition.
    _finalStorageRows() {
        const hasSecondary = this._secondaryStyle !== "none";
        if (hasSecondary && this._secondaryPosition === "above") {
            const secondaryRows = this._slotFinalRows("secondary", 0);
            const primaryRows = this._slotFinalRows("primary", this._slotRowCount("secondary"));
            return [...secondaryRows, ...primaryRows];
        }
        const primaryRows = this._slotFinalRows("primary", 0);
        const secondaryRows = hasSecondary ? this._slotFinalRows("secondary", this._slotRowCount("primary")) : [];
        return [...primaryRows, ...secondaryRows];
    }
    _finalRows() {
        return this._slotRowCount("primary") + this._slotRowCount("secondary");
    }
    _finalCols() {
        return this._primaryStyle === "grid" || this._secondaryStyle === "grid" ? this._editCabinet.cols || 8 : 1;
    }
    _finalDepth() {
        return this._primaryStyle === "grid" || this._secondaryStyle === "grid" ? this._editCabinet.depth || 1 : 1;
    }
    static _capacityOf(sr) {
        if (sr.type === "box")
            return (sr.boxes || []).reduce((sum, b) => sum + b, 0);
        if (sr.type === "shelf") {
            return (sr.shelf_levels || []).reduce((sum, lvl) => sum + lvl.front + lvl.back, 0);
        }
        if (sr.type === "stepped") {
            return (sr.stepped_levels || []).reduce((sum, n) => sum + n, 0);
        }
        return sr.capacity || 0;
    }
    // Every bottle the pending edit would leave without a slot that exists.
    //
    // The warning and the save both read this, so what the user is promised
    // and what actually happens cannot drift apart. It used to consider only
    // rows and columns, which meant three ways of losing a bottle's position
    // went unwarned and unhandled: making a rack shallower, shrinking a bin
    // past its contents, and deleting a bin outright. None of them ever
    // deleted a bottle — they left it pointing at a slot the rack no longer
    // had, counted in the total and drawn nowhere.
    _displacedWines() {
        const cabinetId = this._editCabinet.id;
        if (!cabinetId)
            return [];
        const newRows = this._finalRows();
        const newCols = this._finalCols();
        const newDepth = this._finalDepth();
        const rows = this._finalStorageRows();
        return this.wines.filter((w) => {
            if (w.cabinet_id !== cabinetId)
                return false;
            if (w.zone) {
                const sr = rows.find((s) => `storage-${s.row}` === w.zone);
                if (!sr)
                    return true;
                return (w.depth || 0) >= RackSettingsDialog_1._capacityOf(sr);
            }
            if (w.row == null || w.col == null)
                return false;
            if (w.row >= newRows || w.col >= newCols)
                return true;
            if ((w.depth || 0) >= newDepth)
                return true;
            return rows.some((sr) => sr.row === w.row);
        });
    }
    _startAdd() {
        this._mode = "add";
        this._error = "";
        this._editCabinet = {
            name: "",
            rows: 1,
            cols: 8,
            depth: 1,
            has_bottom_zone: false,
            bottom_zone_name: "",
        };
        this._primaryStorageRows = [];
        this._secondaryStorageRows = [];
        this._primaryStyle = "grid";
        this._secondaryStyle = "none";
        this._secondaryPosition = "below";
        this._secondaryGridRows = 1;
    }
    // Re-derives (primary style, secondary style + position) from a saved
    // cabinet's row layout. Plain grid rows have no storage_rows entry of
    // their own, so they show up here as a gap between (or around) the typed
    // rows; grouping the whole row range into contiguous same-type runs
    // (treating each gap as its own "grid" run) recovers at most two runs for
    // anything this dialog itself could have saved. Older cabinets that
    // predate the secondary-zone feature are always a single run and fall
    // straight into the "no secondary" branch below, same as before.
    _startEdit(cabinet) {
        this._mode = "edit";
        this._error = "";
        this._editCabinet = { ...cabinet };
        const totalRows = cabinet.rows || 0;
        const storageRows = (cabinet.storage_rows || [])
            .map((sr) => {
            if (sr.type === "box" && !sr.boxes)
                return { ...sr, boxes: [sr.capacity || 12] };
            if (sr.type === "shelf" && !sr.shelf_levels)
                return { ...sr, shelf_levels: [{ front: sr.capacity || 4, back: 0 }] };
            if (sr.type === "stepped" && !sr.stepped_levels)
                return { ...sr, stepped_levels: getSteppedLevels(sr.capacity || 5, 3) };
            return { ...sr };
        })
            .sort((a, b) => a.row - b.row);
        const byRow = new Map(storageRows.map((sr) => [sr.row, sr]));
        const clusters = [];
        let cursor = 0;
        while (cursor < totalRows) {
            const start = cursor;
            const sr = byRow.get(cursor);
            if (!sr) {
                while (cursor < totalRows && !byRow.has(cursor))
                    cursor++;
                clusters.push({ style: "grid", rows: [], start, size: cursor - start });
            }
            else {
                const type = sr.type;
                const rows = [];
                while (cursor < totalRows && byRow.get(cursor)?.type === type) {
                    rows.push(byRow.get(cursor));
                    cursor++;
                }
                clusters.push({ style: type, rows, start, size: cursor - start });
            }
        }
        const applySlot = (slot, cluster) => {
            if (!cluster) {
                if (slot === "primary") {
                    this._primaryStyle = "grid";
                    this._primaryStorageRows = [];
                }
                else {
                    this._secondaryStyle = "none";
                    this._secondaryStorageRows = [];
                }
                return;
            }
            const rows = cluster.rows.map((sr, i) => ({ ...sr, row: i }));
            if (slot === "primary") {
                this._primaryStyle = cluster.style;
                this._primaryStorageRows = rows;
            }
            else {
                this._secondaryStyle = cluster.style;
                this._secondaryStorageRows = rows;
                this._secondaryGridRows = cluster.style === "grid" ? Math.max(1, cluster.size) : 1;
            }
        };
        if (clusters.length <= 1) {
            applySlot("primary", clusters[0]);
            applySlot("secondary", undefined);
            this._secondaryPosition = "below";
        }
        else if (clusters.length === 2) {
            // Clusters are built by scanning rows from 0 upward, so `first` is
            // always the physically higher one. The bigger cluster (by row count)
            // reads as "primary"; on a tie, the one on top does — purely a
            // labeling choice for this dialog, since the rack itself renders and
            // behaves identically either way.
            const [first, second] = clusters;
            const primaryIsFirst = first.size >= second.size;
            applySlot("primary", primaryIsFirst ? first : second);
            applySlot("secondary", primaryIsFirst ? second : first);
            this._secondaryPosition = primaryIsFirst ? "below" : "above";
        }
        else {
            // 3+ runs: an arrangement this dialog can't represent as primary plus
            // one secondary (e.g. an older, more intricate mixed rack). Fall back
            // to showing it as a classic grid rather than guessing; nothing is
            // deleted — its storage rows are only dropped if the user actually
            // saves from this fallback.
            this._primaryStyle = "grid";
            this._primaryStorageRows = [];
            this._secondaryStyle = "none";
            this._secondaryStorageRows = [];
            this._secondaryPosition = "below";
        }
    }
    static _buildAlternatingLevels(front, back, count) {
        const f = Math.max(0, front);
        const b = Math.max(0, back);
        return Array.from({ length: Math.max(1, count) }, (_, i) => i % 2 === 0 ? { front: f, back: b } : { front: b, back: f });
    }
    // Front/back are shared by every shelf within one slot; how many rows
    // each shelf has is that shelf's own choice (a fridge shelf can be one
    // board or two stacked ones) — read the shared pair from the first
    // shelf, since _applySharedFrontBack keeps it in lockstep across all of
    // them.
    _sharedShelfFrontBack(slot) {
        const lvl0 = this._shelfRows(slot)[0]?.shelf_levels?.[0];
        return { front: lvl0?.front ?? 4, back: lvl0?.back ?? 0 };
    }
    // Re-derives every shelf's levels in this slot from a new shared
    // front/back, keeping each shelf's own level count exactly as it was.
    _applySharedFrontBack(slot, front, back) {
        const f = Math.max(0, front);
        const b = Math.max(0, back);
        this._setRowsFor(slot, this._rowsFor(slot).map((sr) => {
            if (sr.type !== "shelf")
                return sr;
            const levels = RackSettingsDialog_1._buildAlternatingLevels(f, b, sr.shelf_levels?.length || 1);
            const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
            return { ...sr, shelf_levels: levels, capacity };
        }));
    }
    _setSharedFront(slot, value) {
        this._applySharedFrontBack(slot, value, this._sharedShelfFrontBack(slot).back);
    }
    _setSharedBack(slot, value) {
        this._applySharedFrontBack(slot, this._sharedShelfFrontBack(slot).front, value);
    }
    // Changes just this one shelf's row count, using the shared front/back.
    _setShelfLevelCountAt(slot, index, count) {
        count = Math.max(1, Math.min(6, count));
        const { front, back } = this._sharedShelfFrontBack(slot);
        const rows = this._shelfRows(slot);
        if (!rows[index])
            return;
        const levels = RackSettingsDialog_1._buildAlternatingLevels(front, back, count);
        const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
        rows[index] = { ...rows[index], shelf_levels: levels, capacity };
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "shelf"), ...rows]);
    }
    // Rebuilds the shelf list to the requested count, applying the shared
    // front/back to any new ones (starting at 1 row each — a second row is
    // an explicit per-shelf choice, not assumed) and keeping existing
    // shelves' own name and row count (by position) rather than resetting
    // them.
    _setShelfCount(slot, count) {
        count = Math.max(1, Math.min(20, count));
        const { front, back } = this._sharedShelfFrontBack(slot);
        const existing = this._shelfRows(slot);
        const rows = Array.from({ length: count }, (_, i) => {
            const prior = existing[i];
            const levels = RackSettingsDialog_1._buildAlternatingLevels(front, back, prior?.shelf_levels?.length || 1);
            const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
            return { row: i, name: prior?.name || "", type: "shelf", capacity, shelf_levels: levels };
        });
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "shelf"), ...rows]);
    }
    _updateShelfName(slot, index, name) {
        const rows = this._shelfRows(slot).map((sr, i) => (i === index ? { ...sr, name } : sr));
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "shelf"), ...rows]);
    }
    _setBulkCapacity(slot, capacity) {
        capacity = Math.max(1, Math.min(500, capacity));
        const row = { row: 0, name: this._bulkRow(slot)?.name || "", type: "bulk", capacity };
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "bulk"), row]);
    }
    _updateBoxCount(slot, count) {
        const existing = this._boxRow(slot);
        const boxes = [...(existing?.boxes || [12])];
        while (boxes.length < count)
            boxes.push(12);
        while (boxes.length > count)
            boxes.pop();
        const capacity = boxes.reduce((sum, s) => sum + s, 0);
        const row = { row: 0, name: existing?.name || "", type: "box", capacity, boxes };
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "box"), row]);
    }
    _updateBoxSize(slot, boxIndex, size) {
        const existing = this._boxRow(slot);
        const boxes = [...(existing?.boxes || [12])];
        boxes[boxIndex] = size;
        const capacity = boxes.reduce((sum, s) => sum + s, 0);
        const row = { row: 0, name: existing?.name || "", type: "box", capacity, boxes };
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "box"), row]);
    }
    // Quinconce, like a shelf, can be several independent units stacked in
    // one rack — each its own physical zone with its own row count, but all
    // sharing one bottom-row bottle count (a property of the rack's fixed
    // width, not of any one unit). The per-level breakdown is always derived
    // via getSteppedLevels rather than edited directly.
    _sharedSteppedFirstRow(slot) {
        return this._steppedRows(slot)[0]?.stepped_levels?.[0] ?? 5;
    }
    // Re-derives every quinconce unit's levels in this slot from a new shared
    // first-row count, keeping each unit's own row count exactly as it was.
    _applySharedSteppedFirstRow(slot, firstRow) {
        const first = Math.max(1, Math.min(30, firstRow));
        this._setRowsFor(slot, this._rowsFor(slot).map((sr) => {
            if (sr.type !== "stepped")
                return sr;
            const levels = getSteppedLevels(first, sr.stepped_levels?.length || 1);
            const capacity = levels.reduce((sum, n) => sum + n, 0);
            return { ...sr, stepped_levels: levels, capacity };
        }));
    }
    // Changes just this one quinconce unit's row count, using the shared
    // first-row count.
    _setSteppedRowCountAt(slot, index, rowCount) {
        rowCount = Math.max(1, Math.min(10, rowCount));
        const firstRow = this._sharedSteppedFirstRow(slot);
        const rows = this._steppedRows(slot);
        if (!rows[index])
            return;
        const levels = getSteppedLevels(firstRow, rowCount);
        const capacity = levels.reduce((sum, n) => sum + n, 0);
        rows[index] = { ...rows[index], stepped_levels: levels, capacity };
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "stepped"), ...rows]);
    }
    // Rebuilds the quinconce list to the requested count, applying the shared
    // first-row count to any new ones (starting at 3 rows each) and keeping
    // existing units' own name and row count (by position) rather than
    // resetting them.
    _setSteppedCount(slot, count) {
        count = Math.max(1, Math.min(20, count));
        const firstRow = this._sharedSteppedFirstRow(slot);
        const existing = this._steppedRows(slot);
        const rows = Array.from({ length: count }, (_, i) => {
            const prior = existing[i];
            const levels = getSteppedLevels(firstRow, prior?.stepped_levels?.length || 3);
            const capacity = levels.reduce((sum, n) => sum + n, 0);
            return { row: i, name: prior?.name || "", type: "stepped", capacity, stepped_levels: levels };
        });
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "stepped"), ...rows]);
    }
    _updateSteppedName(slot, index, name) {
        const rows = this._steppedRows(slot).map((sr, i) => (i === index ? { ...sr, name } : sr));
        this._setRowsFor(slot, [...this._rowsFor(slot).filter((sr) => sr.type !== "stepped"), ...rows]);
    }
    // Switching a slot's style lazily creates that style's default config the
    // first time it's chosen; any other style's config already built this
    // session for that slot is left alone (see _rowsFor) so flipping back
    // doesn't lose it.
    _lazyInitSlot(slot, style) {
        if (style === "shelf" && this._shelfRows(slot).length === 0) {
            this._setShelfCount(slot, 1);
        }
        else if (style === "bulk" && !this._bulkRow(slot)) {
            this._setBulkCapacity(slot, 20);
        }
        else if (style === "box" && !this._boxRow(slot)) {
            this._updateBoxCount(slot, 1);
        }
        else if (style === "stepped" && this._steppedRows(slot).length === 0) {
            this._setSteppedCount(slot, 1);
        }
    }
    _setPrimaryStyle(style) {
        this._primaryStyle = style;
        this._lazyInitSlot("primary", style);
    }
    _setSecondaryStyle(style) {
        this._secondaryStyle = style;
        if (style !== "none")
            this._lazyInitSlot("secondary", style);
    }
    _setSecondaryPosition(position) {
        this._secondaryPosition = position;
    }
    _setSecondaryGridRows(value) {
        this._secondaryGridRows = Math.max(1, Math.min(10, value));
    }
    _startDelete(cabinet) {
        this._mode = "delete-confirm";
        this._error = "";
        this._deleteCabinet = cabinet;
    }
    // The primary grid's own row count — a secondary zone (grid or otherwise)
    // has its own row count tracked separately (see _secondaryGridRows /
    // _slotRowCount) and is never affected by these.
    _addRow() {
        const current = this._editCabinet.rows || 1;
        if (current >= 20)
            return;
        this._editCabinet = { ...this._editCabinet, rows: current + 1 };
    }
    _removeRow() {
        const current = this._editCabinet.rows || 1;
        if (current <= 1)
            return;
        this._editCabinet = { ...this._editCabinet, rows: current - 1 };
    }
    _addCol() {
        const current = this._editCabinet.cols || 1;
        if (current >= 20)
            return;
        this._editCabinet = { ...this._editCabinet, cols: current + 1 };
    }
    _removeCol() {
        const current = this._editCabinet.cols || 1;
        if (current <= 1)
            return;
        this._editCabinet = { ...this._editCabinet, cols: current - 1 };
    }
    _addDepth() {
        const current = this._editCabinet.depth || 1;
        if (current >= 6)
            return;
        this._editCabinet = { ...this._editCabinet, depth: current + 1 };
    }
    _removeDepth() {
        const current = this._editCabinet.depth || 1;
        if (current <= 1)
            return;
        this._editCabinet = { ...this._editCabinet, depth: current - 1 };
    }
    async _saveAdd() {
        this._loading = true;
        this._error = "";
        try {
            await this.hass.callWS({
                type: "wine_cellar/add_cabinet",
                cabinet: {
                    name: this._editCabinet.name || "New Rack",
                    rows: this._finalRows(),
                    cols: this._finalCols(),
                    depth: this._finalDepth(),
                    has_bottom_zone: false,
                    bottom_zone_name: "",
                    storage_rows: this._finalStorageRows(),
                    order: this.cabinets.length,
                    orientation: "vertical",
                    temp_sensor_entity_id: this._editCabinet.temp_sensor_entity_id || "",
                    humidity_sensor_entity_id: this._editCabinet.humidity_sensor_entity_id || "",
                },
            });
            this._notifyUpdate();
            this._mode = "list";
        }
        catch {
            this._error = this._t("ui.rack.failedToAddRack");
        }
        this._loading = false;
    }
    async _saveEdit() {
        this._loading = true;
        this._error = "";
        try {
            const cabinetId = this._editCabinet.id;
            // Worked out before the rack changes shape: afterwards the old slot
            // is unrecoverable, and this is the same list the warning showed.
            const displaced = this._displacedWines();
            await this.hass.callWS({
                type: "wine_cellar/update_cabinet",
                cabinet_id: cabinetId,
                updates: {
                    name: this._editCabinet.name,
                    rows: this._finalRows(),
                    cols: this._finalCols(),
                    depth: this._finalDepth(),
                    has_bottom_zone: false,
                    bottom_zone_name: "",
                    storage_rows: this._finalStorageRows(),
                    orientation: "vertical",
                    temp_sensor_entity_id: this._editCabinet.temp_sensor_entity_id || "",
                    humidity_sensor_entity_id: this._editCabinet.humidity_sensor_entity_id || "",
                },
            });
            for (const wine of displaced) {
                await this.hass.callWS({
                    type: "wine_cellar/update_wine",
                    wine_id: wine.id,
                    updates: { cabinet_id: "", row: null, col: null, zone: "", depth: 0 },
                });
            }
            this._notifyUpdate();
            this._mode = "list";
        }
        catch {
            this._error = this._t("ui.rack.failedToUpdateRack");
        }
        this._loading = false;
    }
    async _confirmDelete() {
        if (!this._deleteCabinet)
            return;
        this._loading = true;
        this._error = "";
        try {
            await this.hass.callWS({
                type: "wine_cellar/remove_cabinet",
                cabinet_id: this._deleteCabinet.id,
            });
            this._notifyUpdate();
            this._mode = "list";
            this._deleteCabinet = null;
        }
        catch {
            this._error = this._t("ui.rack.failedToDeleteRack");
        }
        this._loading = false;
    }
    async _moveUp(cabinet) {
        const sorted = [...this.cabinets].sort((a, b) => a.order - b.order);
        const idx = sorted.findIndex((c) => c.id === cabinet.id);
        if (idx <= 0)
            return;
        const prev = sorted[idx - 1];
        try {
            await Promise.all([
                this.hass.callWS({
                    type: "wine_cellar/update_cabinet",
                    cabinet_id: cabinet.id,
                    updates: { order: prev.order },
                }),
                this.hass.callWS({
                    type: "wine_cellar/update_cabinet",
                    cabinet_id: prev.id,
                    updates: { order: cabinet.order },
                }),
            ]);
            this._notifyUpdate();
        }
        catch {
            this._error = this._t("ui.rack.failedToReorderRacks");
        }
    }
    async _moveDown(cabinet) {
        const sorted = [...this.cabinets].sort((a, b) => a.order - b.order);
        const idx = sorted.findIndex((c) => c.id === cabinet.id);
        if (idx < 0 || idx >= sorted.length - 1)
            return;
        const next = sorted[idx + 1];
        try {
            await Promise.all([
                this.hass.callWS({
                    type: "wine_cellar/update_cabinet",
                    cabinet_id: cabinet.id,
                    updates: { order: next.order },
                }),
                this.hass.callWS({
                    type: "wine_cellar/update_cabinet",
                    cabinet_id: next.id,
                    updates: { order: cabinet.order },
                }),
            ]);
            this._notifyUpdate();
        }
        catch {
            this._error = this._t("ui.rack.failedToReorderRacks");
        }
    }
    _renderList() {
        const sorted = [...this.cabinets].sort((a, b) => a.order - b.order);
        return b$1 `
      <div class="dialog-body">
        <div class="rack-list">
          ${sorted.map((cab, idx) => {
            const storageRows = cab.storage_rows || [];
            const hasGridRows = (cab.rows || 0) > storageRows.length;
            const typeCounts = new Map();
            for (const sr of storageRows)
                typeCounts.set(sr.type, (typeCounts.get(sr.type) || 0) + 1);
            return b$1 `
                <div class="rack-item">
                  <div class="rack-info">
                    <div class="rack-name">${cab.name}</div>
                    <div class="rack-meta">
                      ${hasGridRows ? b$1 `${this._t("ui.rack.gridDimensions", { rows: cab.rows, cols: cab.cols })}${(cab.depth || 1) > 1 ? this._t("ui.rack.gridDeepSuffix", { depth: cab.depth }) : ""}` : A$1}
                      ${this._t("ui.rack.bottlesCountSuffix", { n: this._winesInCabinet(cab.id), plural: this._winesInCabinet(cab.id) === 1 ? "" : "s" })}
                      ${[...typeCounts.entries()].map(([type, count]) => type === "shelf"
                ? this._t(count === 1 ? "ui.rack.shelfCountSuffixOne" : "ui.rack.shelfCountSuffixMany", { n: count })
                : type === "box"
                    ? this._t(count === 1 ? "ui.rack.boxCountSuffixOne" : "ui.rack.boxCountSuffixMany", { n: count })
                    : "")}
                    </div>
                  </div>
                  <div class="rack-actions">
                    <button
                      class="small-btn"
                      @click=${() => this._moveUp(cab)}
                      ?disabled=${idx === 0}
                      title="${this._t('ui.rack.moveUpTitle')}"
                    >↑</button>
                    <button
                      class="small-btn"
                      @click=${() => this._moveDown(cab)}
                      ?disabled=${idx === sorted.length - 1}
                      title="${this._t('ui.rack.moveDownTitle')}"
                    >↓</button>
                    <button
                      class="small-btn"
                      @click=${() => this._startEdit(cab)}
                    >${this._t("ui.common.edit")}</button>
                    <button
                      class="small-btn danger"
                      @click=${() => this._startDelete(cab)}
                    >${this._t("ui.rack.delBtn")}</button>
                  </div>
                </div>
              `;
        })}

          <button class="add-rack-btn" @click=${this._startAdd}>
            ${this._t("ui.rack.addRackBtn")}
          </button>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${this._close}>${this._t("ui.common.close")}</button>
      </div>
    `;
    }
    _renderSlotForm(slot) {
        const style = this._styleFor(slot);
        const numCols = this._editCabinet.cols || 8;
        const numDepth = this._editCabinet.depth || 1;
        if (style === "grid") {
            if (slot === "secondary") {
                // A secondary grid block has no row count of its own control on the
                // cabinet — cols/depth are shared with the cabinet's one grid
                // section (see _finalCols/_finalDepth), so just its row count.
                return b$1 `
          <div class="stepper-row">
            <div class="stepper-wrap">
              <div class="stepper-label">${this._t("ui.rack.rowsLabel")}</div>
              <div class="stepper">
                <button class="stepper-btn" @click=${() => this._setSecondaryGridRows(this._secondaryGridRows - 1)} ?disabled=${this._secondaryGridRows <= 1}>−</button>
                <span class="stepper-value">${this._secondaryGridRows}</span>
                <button class="stepper-btn" @click=${() => this._setSecondaryGridRows(this._secondaryGridRows + 1)} ?disabled=${this._secondaryGridRows >= 10}>+</button>
              </div>
            </div>
          </div>
          <p style="font-size:0.75em;color:var(--wc-text-secondary);margin:0">${this._t("ui.rack.secondaryGridHint")}</p>
        `;
            }
            const numRows = this._editCabinet.rows || 1;
            return b$1 `
        <div class="grid-editor-title">${this._t("ui.rack.gridLayoutTitle")}</div>
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.rowsLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${this._removeRow} ?disabled=${numRows <= 1}>−</button>
              <span class="stepper-value">${numRows}</span>
              <button class="stepper-btn" @click=${this._addRow} ?disabled=${numRows >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.columnsLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${this._removeCol} ?disabled=${numCols <= 1}>−</button>
              <span class="stepper-value">${numCols}</span>
              <button class="stepper-btn" @click=${this._addCol} ?disabled=${numCols >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.depthLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${this._removeDepth} ?disabled=${numDepth <= 1}>−</button>
              <span class="stepper-value">${numDepth}</span>
              <button class="stepper-btn" @click=${this._addDepth} ?disabled=${numDepth >= 6}>+</button>
            </div>
          </div>
        </div>

        <!-- Visual grid preview -->
        <div class="grid-preview">
          ${Array.from({ length: numRows }, (_, row) => b$1 `
            <div class="grid-preview-row">
              <span class="grid-preview-label">R${row + 1}</span>
              ${Array.from({ length: Math.min(numCols, 15) }, () => b$1 `<div class="grid-preview-cell"></div>`)}
              ${numCols > 15
                ? b$1 `<span style="font-size:0.65em;color:var(--wc-text-secondary)">+${numCols - 15}</span>`
                : A$1}
            </div>
          `)}
        </div>
      `;
        }
        if (style === "shelf") {
            const shared = this._sharedShelfFrontBack(slot);
            const shelves = this._shelfRows(slot);
            return b$1 `
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.shelfCountLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setShelfCount(slot, shelves.length - 1)} ?disabled=${shelves.length <= 1}>−</button>
              <span class="stepper-value">${shelves.length}</span>
              <button class="stepper-btn" @click=${() => this._setShelfCount(slot, shelves.length + 1)} ?disabled=${shelves.length >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.shelfFrontLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setSharedFront(slot, shared.front - 1)} ?disabled=${shared.front <= 0}>−</button>
              <span class="stepper-value">${shared.front}</span>
              <button class="stepper-btn" @click=${() => this._setSharedFront(slot, shared.front + 1)} ?disabled=${shared.front >= 30}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.shelfBackLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setSharedBack(slot, shared.back - 1)} ?disabled=${shared.back <= 0}>−</button>
              <span class="stepper-value">${shared.back}</span>
              <button class="stepper-btn" @click=${() => this._setSharedBack(slot, shared.back + 1)} ?disabled=${shared.back >= 30}>+</button>
            </div>
          </div>
        </div>
        <p style="font-size:0.75em;color:var(--wc-text-secondary);margin:0 0 8px">${this._t("ui.rack.shelfAlternateHint")}</p>

        <!-- Name + row count per shelf — front/back are shared above,
             but how many boards each shelf has is its own choice. -->
        <div class="row-list">
          ${shelves.map((sr, i) => {
                const levelCount = sr.shelf_levels?.length || 1;
                return b$1 `
              <div class="row-entry storage">
                <span class="row-num">${i + 1}</span>
                <input
                  type="text"
                  class="row-name-input"
                  style="flex:1"
                  .value=${sr.name || ""}
                  @input=${(e) => this._updateShelfName(slot, i, e.target.value)}
                  placeholder="${this._t('ui.rack.shelfNamePlaceholder', { n: i + 1 })}"
                />
                <span class="row-type-info" style="flex:0;font-size:0.7em">${this._t('ui.rack.shelfLevelsLabel')}</span>
                <div class="row-cap-stepper">
                  <button class="stepper-btn-sm" @click=${() => this._setShelfLevelCountAt(slot, i, levelCount - 1)} ?disabled=${levelCount <= 1}>−</button>
                  <span class="stepper-val-sm">${levelCount}</span>
                  <button class="stepper-btn-sm" @click=${() => this._setShelfLevelCountAt(slot, i, levelCount + 1)} ?disabled=${levelCount >= 6}>+</button>
                </div>
                <span class="row-type-info" style="flex:0">= ${sr.capacity}</span>
              </div>
            `;
            })}
        </div>
      `;
        }
        if (style === "bulk") {
            const capacity = this._bulkRow(slot)?.capacity || 20;
            return b$1 `
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.bulkCapacityLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setBulkCapacity(slot, capacity - 1)} ?disabled=${capacity <= 1}>−</button>
              <span class="stepper-value">${capacity}</span>
              <button class="stepper-btn" @click=${() => this._setBulkCapacity(slot, capacity + 1)} ?disabled=${capacity >= 500}>+</button>
            </div>
          </div>
        </div>
      `;
        }
        if (style === "stepped") {
            const shared = this._sharedSteppedFirstRow(slot);
            const steppedUnits = this._steppedRows(slot);
            return b$1 `
        <div class="stepper-row">
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.steppedCountLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._setSteppedCount(slot, steppedUnits.length - 1)} ?disabled=${steppedUnits.length <= 1}>−</button>
              <span class="stepper-value">${steppedUnits.length}</span>
              <button class="stepper-btn" @click=${() => this._setSteppedCount(slot, steppedUnits.length + 1)} ?disabled=${steppedUnits.length >= 20}>+</button>
            </div>
          </div>
          <div class="stepper-wrap">
            <div class="stepper-label">${this._t("ui.rack.steppedFirstRowLabel")}</div>
            <div class="stepper">
              <button class="stepper-btn" @click=${() => this._applySharedSteppedFirstRow(slot, shared - 1)} ?disabled=${shared <= 1}>−</button>
              <span class="stepper-value">${shared}</span>
              <button class="stepper-btn" @click=${() => this._applySharedSteppedFirstRow(slot, shared + 1)} ?disabled=${shared >= 30}>+</button>
            </div>
          </div>
        </div>

        <!-- Name + row count per quinconce unit — the bottom-row count is
             shared above, but how many rows each one stacks is its own
             choice. -->
        <div class="row-list">
          ${steppedUnits.map((sr, i) => {
                const rowCount = sr.stepped_levels?.length || 1;
                return b$1 `
              <div class="row-entry storage">
                <span class="row-num">${i + 1}</span>
                <input
                  type="text"
                  class="row-name-input"
                  style="flex:1"
                  .value=${sr.name || ""}
                  @input=${(e) => this._updateSteppedName(slot, i, e.target.value)}
                  placeholder="${this._t('ui.rack.steppedNamePlaceholder', { n: i + 1 })}"
                />
                <span class="row-type-info" style="flex:0;font-size:0.7em">${this._t('ui.rack.steppedRowCountLabel')}</span>
                <div class="row-cap-stepper">
                  <button class="stepper-btn-sm" @click=${() => this._setSteppedRowCountAt(slot, i, rowCount - 1)} ?disabled=${rowCount <= 1}>−</button>
                  <span class="stepper-val-sm">${rowCount}</span>
                  <button class="stepper-btn-sm" @click=${() => this._setSteppedRowCountAt(slot, i, rowCount + 1)} ?disabled=${rowCount >= 10}>+</button>
                </div>
                <span class="row-type-info" style="flex:0">= ${sr.capacity}</span>
              </div>
            `;
            })}
        </div>
      `;
        }
        // "box"
        const boxRow = this._boxRow(slot);
        const boxes = boxRow?.boxes || [12];
        return b$1 `
      <div class="stepper-row">
        <div class="stepper-wrap">
          <div class="stepper-label">${this._t("ui.rack.boxCountLabel")}</div>
          <div class="stepper">
            <button class="stepper-btn" @click=${() => this._updateBoxCount(slot, boxes.length - 1)} ?disabled=${boxes.length <= 1}>−</button>
            <span class="stepper-value">${boxes.length}</span>
            <button class="stepper-btn" @click=${() => this._updateBoxCount(slot, boxes.length + 1)} ?disabled=${boxes.length >= 10}>+</button>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px">
        ${boxes.map((boxSize, bi) => b$1 `
          <select
            class="row-cap-select"
            @change=${(e) => this._updateBoxSize(slot, bi, parseInt(e.target.value, 10))}
          >
            ${BOX_SIZES.map((s) => b$1 `<option value=${s} ?selected=${boxSize === s}>${this._t('ui.rack.boxSizeOption', { s })}</option>`)}
          </select>
        `)}
        <span style="font-size:0.7em;color:var(--wc-text-secondary);">= ${boxRow?.capacity || 12}</span>
      </div>
    `;
    }
    _renderForm() {
        const isEdit = this._mode === "edit";
        // Which bottles this edit would displace, whichever way it shrinks.
        const displaced = isEdit ? this._displacedWines() : [];
        const typeLabels = getStorageRowTypeLabels(this.hass?.language);
        const styles = ["grid", "stepped", "shelf", "bulk", "box"];
        const styleLabel = (s) => (s === "grid" ? this._t("ui.rack.styleGrid") : typeLabels[s]);
        return b$1 `
      <div class="dialog-body">
        <div class="form-group">
          <label>${this._t("ui.rack.rackNameLabel")}</label>
          <input
            type="text"
            .value=${this._editCabinet.name || ""}
            @input=${(e) => (this._editCabinet = {
            ...this._editCabinet,
            name: e.target.value,
        })}
          />
        </div>

        <!-- Whole-cabinet sensors: used as-is by a plain grid rack, and as
             the fallback for any zone below that doesn't set its own. -->
        <div class="form-group">
          <label>${this._t("ui.rack.cabinetSensorsLabel")}</label>
          ${this._renderSensorPickers(this._editCabinet.temp_sensor_entity_id || "", this._editCabinet.humidity_sensor_entity_id || "", (value) => (this._editCabinet = { ...this._editCabinet, temp_sensor_entity_id: value }), (value) => (this._editCabinet = { ...this._editCabinet, humidity_sensor_entity_id: value }))}
        </div>

        <!-- Primary style: exactly one of these five, chosen once -->
        <div class="form-group">
          <label>${this._t("ui.rack.styleLabel")}</label>
          <div class="style-toggle">
            ${styles.map((s) => b$1 `
              <button
                class="style-toggle-btn ${this._primaryStyle === s ? "active" : ""}"
                @click=${() => this._setPrimaryStyle(s)}
              >${styleLabel(s)}</button>
            `)}
          </div>
        </div>

        <div class="grid-editor">${this._renderSlotForm("primary")}</div>

        <!-- Secondary zone: optional, stacked above or below the primary
             style chosen above. -->
        <div class="form-group">
          <label>${this._t("ui.rack.secondaryStyleLabel")}</label>
          <div class="style-toggle">
            <button
              class="style-toggle-btn ${this._secondaryStyle === "none" ? "active" : ""}"
              @click=${() => this._setSecondaryStyle("none")}
            >${this._t("ui.rack.secondaryNone")}</button>
            ${styles.map((s) => b$1 `
              <button
                class="style-toggle-btn ${this._secondaryStyle === s ? "active" : ""}"
                @click=${() => this._setSecondaryStyle(s)}
              >${styleLabel(s)}</button>
            `)}
          </div>
          <p style="font-size:0.75em;color:var(--wc-text-secondary);margin:4px 0 0">${this._t("ui.rack.secondaryHint")}</p>
        </div>

        ${this._secondaryStyle !== "none"
            ? b$1 `
              <div class="form-group">
                <label>${this._t("ui.rack.secondaryPositionLabel")}</label>
                <div class="style-toggle">
                  <button
                    class="style-toggle-btn ${this._secondaryPosition === "above" ? "active" : ""}"
                    @click=${() => this._setSecondaryPosition("above")}
                  >${this._t("ui.rack.secondaryAbove")}</button>
                  <button
                    class="style-toggle-btn ${this._secondaryPosition === "below" ? "active" : ""}"
                    @click=${() => this._setSecondaryPosition("below")}
                  >${this._t("ui.rack.secondaryBelow")}</button>
                </div>
              </div>
              <div class="grid-editor">${this._renderSlotForm("secondary")}</div>
            `
            : A$1}

        ${displaced.length > 0
            ? b$1 `
              <div class="warning-msg">
                ${displaced.length > 1
                ? this._t("ui.rack.warningBeforeMany", { n: displaced.length })
                : this._t("ui.rack.warningBeforeOne")}
                <strong>${this._t("wineLocation.unassigned")}</strong>
                ${displaced.length > 1
                ? this._t("ui.rack.warningAfterMany")
                : this._t("ui.rack.warningAfterOne")}
                <div class="warning-list">
                  ${displaced.slice(0, 6).map((w) => b$1 `<div>${w.name || this._t("ui.rack.unnamedWine")}</div>`)}
                  ${displaced.length > 6
                ? b$1 `<div>${this._t("ui.rack.andNMore", { n: displaced.length - 6 })}</div>`
                : A$1}
                </div>
              </div>
            `
            : A$1}

        ${this._error
            ? b$1 `<div class="error-msg" style="color:#ef5350;margin-top:8px">${this._error}</div>`
            : A$1}
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => (this._mode = "list")}>
          ${this._t("ui.common.cancel")}
        </button>
        <button
          class="btn btn-primary"
          @click=${isEdit ? this._saveEdit : this._saveAdd}
          ?disabled=${this._loading}
        >
          ${this._loading ? this._t("ui.wineDetail.saving") : this._t("ui.wineDetail.save")}
        </button>
      </div>
    `;
    }
    _renderDeleteConfirm() {
        if (!this._deleteCabinet)
            return A$1;
        const count = this._winesInCabinet(this._deleteCabinet.id);
        return b$1 `
      <div class="dialog-body">
        <div class="delete-info">
          ${this._t("ui.rack.deleteConfirmQuestion", { name: this._deleteCabinet.name })}
          ${count > 0
            ? b$1 `<br /><span class="delete-count"
                >${count > 1 ? this._t("ui.rack.deleteWinesUnassignedMany", { count }) : this._t("ui.rack.deleteWinesUnassignedOne")}</span
              >`
            : A$1}
        </div>
        ${this._error
            ? b$1 `<div style="color:#ef5350;font-size:0.85em">${this._error}</div>`
            : A$1}
      </div>
      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${() => (this._mode = "list")}>
          ${this._t("ui.common.cancel")}
        </button>
        <button
          class="btn btn-primary"
          style="background:#c62828"
          @click=${this._confirmDelete}
          ?disabled=${this._loading}
        >
          ${this._loading ? this._t("ui.rack.deletingBtn") : this._t("ui.rack.deleteBtn")}
        </button>
      </div>
    `;
    }
    render() {
        if (!this.open)
            return A$1;
        const titles = {
            list: this._t("ui.rack.dialogTitleManage"),
            add: this._t("ui.rack.dialogTitleAdd"),
            edit: this._t("ui.rack.dialogTitleEdit"),
            "delete-confirm": this._t("ui.rack.dialogTitleDeleteConfirm"),
        };
        return b$1 `
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(this._close, this._t('ui.common.close'))}
          <div class="dialog-header">${titles[this._mode]}</div>
          ${this._mode === "list" ? this._renderList() : A$1}
          ${this._mode === "add" || this._mode === "edit"
            ? this._renderForm()
            : A$1}
          ${this._mode === "delete-confirm"
            ? this._renderDeleteConfirm()
            : A$1}
        </div>
      </div>
    `;
    }
};
RackSettingsDialog.styles = [
    sharedStyles,
    i$4 `
      .rack-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .rack-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        transition: background 0.2s;
      }

      .rack-item:hover {
        background: var(--wc-hover);
      }

      .rack-info {
        flex: 1;
        min-width: 0;
      }

      .rack-name {
        font-weight: 600;
        font-size: 0.95em;
      }

      .rack-meta {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .rack-actions {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-shrink: 0;
      }

      .small-btn {
        background: transparent;
        border: 1px solid var(--wc-border);
        border-radius: 6px;
        cursor: pointer;
        padding: 4px 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        transition: all 0.2s;
      }

      .small-btn:hover {
        background: var(--wc-hover);
      }

      .small-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .small-btn.danger {
        color: #c62828;
        border-color: rgba(198, 40, 40, 0.3);
      }

      .small-btn.danger:hover {
        background: rgba(198, 40, 40, 0.08);
      }

      .warning-msg {
        background: rgba(255, 152, 0, 0.1);
        border: 1px solid rgba(255, 152, 0, 0.3);
        border-radius: 8px;
        padding: 10px;
        font-size: 0.85em;
        color: #e65100;
        margin-top: 12px;
      }

      .warning-list {
        margin-top: 6px;
        padding-left: 10px;
        font-size: 0.95em;
        opacity: 0.85;
      }

      .delete-info {
        font-size: 0.95em;
        margin: 12px 0;
        line-height: 1.5;
      }

      .delete-count {
        color: #c62828;
        font-weight: 600;
      }

      .style-toggle {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .style-toggle-btn {
        flex: 1 1 45%;
        padding: 8px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.85em;
        transition: all 0.15s;
      }

      .style-toggle-btn.active {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.08);
        font-weight: 600;
      }

      .add-rack-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px;
        border: 2px dashed var(--wc-border);
        border-radius: 10px;
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.2s;
        width: 100%;
      }

      .add-rack-btn:hover {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.05);
      }

      /* Grid editor */
      .grid-editor {
        margin-top: 12px;
      }

      .grid-editor-title {
        font-size: 0.85em;
        font-weight: 600;
        color: var(--wc-text);
        margin-bottom: 12px;
      }

      /* Stepper controls for cols/depth */
      .stepper-row {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
      }

      .stepper {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        overflow: hidden;
      }

      .stepper-label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .stepper-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .stepper-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.1em;
        font-weight: 600;
        color: var(--wc-text-secondary);
        transition: all 0.15s;
        flex-shrink: 0;
      }

      .stepper-btn:hover:not(:disabled) {
        background: rgba(114, 47, 55, 0.1);
        color: var(--wc-primary);
      }

      .stepper-btn:disabled {
        opacity: 0.25;
        cursor: default;
      }

      .stepper-value {
        flex: 1;
        text-align: center;
        font-size: 0.9em;
        font-weight: 600;
        color: var(--wc-text);
        padding: 6px 0;
        min-width: 40px;
      }

      /* Visual grid preview */
      .grid-preview {
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 8px;
        overflow-x: auto;
      }

      .grid-preview-row {
        display: flex;
        gap: 3px;
        margin-bottom: 3px;
        align-items: center;
      }

      .grid-preview-row:last-child {
        margin-bottom: 0;
      }

      .grid-preview-label {
        width: 28px;
        font-size: 0.65em;
        font-weight: 600;
        color: var(--wc-text-secondary);
        text-align: center;
        flex-shrink: 0;
      }

      .grid-preview-cell {
        width: 20px;
        height: 16px;
        border-radius: 3px;
        background: rgba(114, 47, 55, 0.15);
        border: 1px solid rgba(114, 47, 55, 0.25);
        flex-shrink: 0;
      }

      .grid-preview-row.storage .grid-preview-cell {
        background: rgba(139, 105, 20, 0.15);
        border-color: rgba(139, 105, 20, 0.3);
      }

      .grid-preview-storage-label {
        font-size: 0.6em;
        color: #8b6914;
        font-weight: 600;
        white-space: nowrap;
        padding-left: 4px;
      }

      .grid-preview-row.storage .grid-preview-cell {
        width: unset;
        flex: 1;
        max-width: none;
      }

      /* Row list */
      .row-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        padding: 6px;
      }

      .row-entry {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 6px;
        border-radius: 6px;
        font-size: 0.8em;
        transition: background 0.15s;
      }

      .row-entry:hover {
        background: var(--wc-hover);
      }

      .row-entry.storage {
        background: rgba(139, 105, 20, 0.1);
        border: 1px solid rgba(139, 105, 20, 0.3);
      }

      .row-entry .row-num {
        width: 28px;
        font-weight: 600;
        color: var(--wc-text-secondary);
        font-size: 0.85em;
      }

      .row-type-select {
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        cursor: pointer;
      }

      .row-name-input {
        width: 80px;
        padding: 2px 6px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        flex-shrink: 1;
        min-width: 60px;
      }

      .row-cap-select {
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        cursor: pointer;
      }

      .sensor-picker-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin: 4px 0 8px;
      }

      .sensor-picker-wrap {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .sensor-select {
        max-width: 220px;
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.85em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        cursor: pointer;
      }

      .row-shelf-input {
        width: 32px;
        padding: 2px 4px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.8em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        text-align: center;
      }

      .row-cap-stepper {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .stepper-btn-sm {
        width: 20px;
        height: 20px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        cursor: pointer;
        font-size: 0.8em;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .stepper-btn-sm:hover {
        background: var(--wc-hover);
      }

      .stepper-val-sm {
        font-size: 0.8em;
        font-weight: 600;
        min-width: 22px;
        text-align: center;
      }

      .row-type-info {
        flex: 1;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .row-entry input[type="text"] {
        width: 100px;
        padding: 2px 6px;
        border: 1px solid var(--wc-border);
        border-radius: 4px;
        font-size: 0.85em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
      }

      .row-controls {
        display: flex;
        gap: 6px;
        margin-top: 6px;
      }

      .row-ctrl-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 6px 0;
        border: 1px dashed var(--wc-border);
        border-radius: 6px;
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.8em;
        transition: all 0.15s;
      }

      .row-ctrl-btn:hover:not(:disabled) {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.05);
      }

      .row-ctrl-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .row-ctrl-btn.danger:hover:not(:disabled) {
        border-color: #c62828;
        color: #c62828;
        background: rgba(198, 40, 40, 0.05);
      }

      /* Rows / Columns / Depth side by side need ~360px at full size; on a
         small phone they ran past the sheet's edge. Slimmer buttons and a
         narrower value cell keep all three on one line. */
      @media (max-width: 400px) {
        .stepper-row {
          gap: 8px;
        }
        .stepper-wrap {
          min-width: 0;
        }
        .stepper-btn {
          width: 30px;
        }
        .stepper-value {
          min-width: 26px;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ type: Boolean })
], RackSettingsDialog.prototype, "open", void 0);
__decorate([
    n$1({ attribute: false })
], RackSettingsDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], RackSettingsDialog.prototype, "cabinets", void 0);
__decorate([
    n$1({ attribute: false })
], RackSettingsDialog.prototype, "wines", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_mode", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_editCabinet", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_primaryStorageRows", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_secondaryStorageRows", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_primaryStyle", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_secondaryStyle", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_secondaryPosition", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_secondaryGridRows", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_deleteCabinet", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_loading", void 0);
__decorate([
    r$1()
], RackSettingsDialog.prototype, "_error", void 0);
RackSettingsDialog = RackSettingsDialog_1 = __decorate([
    t$2("rack-settings-dialog")
], RackSettingsDialog);

let WineListDialog = class WineListDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.open = false;
        this.cellarWines = [];
        this._phase = "capture";
        this._wines = [];
        this._restaurantName = null;
        this._currency = "USD";
        this._error = "";
        this._enriching = false;
        // _aiEnriching removed — AI analysis now included in extraction call
        this._expandedIndex = null;
        this._addedIndices = new Set();
        this._cancelEnrichment = false;
        this._buyListIndices = new Set();
        this._detailWine = null;
        this._showDetail = false;
        this.hasGemini = false;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    updated(changedProps) {
        if (changedProps.has("open") && this.open) {
            // Reset when opening
            this._phase = "capture";
            this._wines = [];
            this._restaurantName = null;
            this._currency = "USD";
            this._error = "";
            this._enriching = false;
            this._expandedIndex = null;
            this._addedIndices = new Set();
            this._buyListIndices = new Set();
            this._cancelEnrichment = false;
        }
    }
    _close() {
        this._cancelEnrichment = true;
        this.open = false;
        this.dispatchEvent(new CustomEvent("close"));
    }
    async _onPhotoCaptured(e) {
        this._phase = "extracting";
        this._error = "";
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/extract_wine_list",
                image: e.detail.image,
            });
            if (result.error) {
                this._error = result.error;
                this._phase = "capture";
                return;
            }
            const data = result;
            if (!data || !Array.isArray(data.wines)) {
                this._error = this._t("ui.wineList.noWinesFoundImage");
                this._phase = "capture";
                return;
            }
            const baseIndex = this._wines.length;
            const newWines = data.wines.map((w, i) => ({
                ...w,
                index: baseIndex + i,
                vivino_rating: null,
                vivino_ratings_count: null,
                vivino_price: null,
                vivino_image_url: "",
                ai_ratings: w.ai_ratings || null,
                ai_description: w.description || "",
                ai_disposition: w.disposition || "",
                ai_drink_window: w.drink_window || "",
                ai_estimated_price: w.estimated_retail_price || null,
                vivino_status: "pending",
                ai_status: (w.ai_ratings || w.disposition || w.description) ? "done" : "skipped",
            }));
            this._wines = [...this._wines, ...newWines];
            this._restaurantName = data.restaurant_name || this._restaurantName;
            this._currency = data.currency || "USD";
            this._phase = "results";
        }
        catch (err) {
            this._error = this._t("ui.wineList.extractionFailed", { error: err?.message || err });
            this._phase = "capture";
        }
    }
    async _startVivinoEnrichment() {
        this._enriching = true;
        this._cancelEnrichment = false;
        for (const wine of this._wines) {
            if (this._cancelEnrichment)
                break;
            if (wine.vivino_status !== "pending")
                continue;
            wine.vivino_status = "loading";
            this._wines = [...this._wines];
            try {
                const resp = await this.hass.callWS({
                    type: "wine_cellar/enrich_wine_vivino",
                    wine: {
                        name: wine.name,
                        winery: wine.winery,
                        vintage: wine.vintage,
                        type: wine.type,
                    },
                });
                if (resp.result) {
                    wine.vivino_rating = resp.result.rating;
                    wine.vivino_ratings_count = resp.result.ratings_count;
                    wine.vivino_price = resp.result.price || null;
                    wine.vivino_image_url = resp.result.image_url || "";
                }
                wine.vivino_status = "done";
            }
            catch {
                wine.vivino_status = "error";
            }
            this._wines = [...this._wines];
            // Rate limit
            await new Promise((r) => setTimeout(r, 1000));
        }
        this._enriching = false;
    }
    // AI enrichment is now included in the Gemini extraction call
    // (disposition, ratings, description, drink_window are returned per wine)
    // The _startAIEnrichment method is no longer needed.
    async _addToCellar(wine) {
        try {
            await this.hass.callWS({
                type: "wine_cellar/add_wine",
                wine: {
                    name: wine.name,
                    winery: wine.winery,
                    vintage: wine.vintage,
                    type: wine.type,
                    region: wine.region,
                    country: wine.country,
                    grape_variety: wine.grape_variety,
                    rating: wine.vivino_rating,
                    ratings_count: wine.vivino_ratings_count,
                    image_url: wine.vivino_image_url,
                    price: wine.list_price,
                    retail_price: wine.vivino_price || wine.ai_estimated_price,
                    description: wine.ai_description,
                    ai_ratings: wine.ai_ratings,
                    disposition: wine.ai_disposition,
                    drink_window: wine.ai_drink_window,
                },
            });
            this._addedIndices = new Set([...this._addedIndices, wine.index]);
            this.dispatchEvent(new CustomEvent("wine-added", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Failed to add wine from list", err);
        }
    }
    async _addToBuyList(wine) {
        try {
            await this.hass.callWS({
                type: "wine_cellar/add_to_buy_list",
                wine: {
                    name: wine.name,
                    winery: wine.winery,
                    vintage: wine.vintage,
                    type: wine.type,
                    region: wine.region,
                    country: wine.country,
                    grape_variety: wine.grape_variety,
                    rating: wine.vivino_rating,
                    ratings_count: wine.vivino_ratings_count,
                    image_url: wine.vivino_image_url,
                    price: wine.list_price,
                    retail_price: wine.vivino_price || wine.ai_estimated_price,
                    description: wine.ai_description,
                    ai_ratings: wine.ai_ratings,
                    disposition: wine.ai_disposition,
                    drink_window: wine.ai_drink_window,
                },
            });
            this._buyListIndices = new Set([...this._buyListIndices, wine.index]);
            this.dispatchEvent(new CustomEvent("buy-list-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Failed to add wine to buy list", err);
        }
    }
    _scanAnotherPage() {
        this._phase = "capture";
        this._error = "";
    }
    _formatPrice(amount, currency = "USD") {
        if (amount === null || amount === undefined)
            return "---";
        const symbols = {
            USD: "$", EUR: "\u20AC", GBP: "\u00A3", JPY: "\u00A5",
            CHF: "CHF ", AUD: "A$", CAD: "C$",
        };
        const sym = symbols[currency] || `${currency} `;
        return `${sym}${amount.toFixed(0)}`;
    }
    _calcMarkup(listPrice, marketPrice) {
        if (!listPrice || !marketPrice || marketPrice <= 0)
            return null;
        const pct = ((listPrice - marketPrice) / marketPrice) * 100;
        const text = `${pct >= 0 ? "+" : ""}${Math.round(pct)}%`;
        const ratio = listPrice / marketPrice;
        const color = ratio <= 1.5 ? "#2e7d32" : ratio <= 2.5 ? "#f57f17" : "#c62828";
        return { text, color };
    }
    _getValueBadge(wine) {
        const listPrice = wine.list_price;
        const marketPrice = wine.vivino_price || wine.ai_estimated_price;
        if (!listPrice || !marketPrice)
            return null;
        const ratio = listPrice / marketPrice;
        if (ratio <= 1.5)
            return { label: this._t("ui.wineList.greatValue"), color: "#2e7d32" };
        if (ratio <= 2.0)
            return { label: this._t("ui.wineList.fairPrice"), color: "#558b2f" };
        if (ratio <= 3.0)
            return { label: this._t("ui.wineList.typical"), color: "#f57f17" };
        return { label: this._t("ui.wineList.premium"), color: "#c62828" };
    }
    _showWineDetail(wine) {
        // Convert WineListItem to Wine-like object for the detail dialog
        this._detailWine = {
            id: `winelist-${wine.index}`,
            barcode: "",
            name: wine.name,
            winery: wine.winery,
            region: wine.region,
            country: wine.country,
            vintage: wine.vintage || 0,
            type: wine.type || "red",
            grape_variety: wine.grape_variety,
            rating: wine.vivino_rating || 0,
            ratings_count: wine.vivino_ratings_count || 0,
            image_url: wine.vivino_image_url || "",
            price: wine.list_price || 0,
            retail_price: wine.vivino_price || wine.ai_estimated_price || 0,
            purchase_date: "",
            drink_by: "",
            drink_window: wine.ai_drink_window || "",
            notes: "",
            description: wine.ai_description || "",
            food_pairings: "",
            alcohol: "",
            cabinet_id: "",
            row: null,
            col: null,
            depth: 0,
            zone: "",
            disposition: wine.ai_disposition || "",
            ai_ratings: wine.ai_ratings,
            added_at: "",
        };
        this._showDetail = true;
    }
    _findCellarMatch(wine) {
        if (!this.cellarWines?.length)
            return null;
        const wName = (wine.name || "").toLowerCase().trim();
        const wWinery = (wine.winery || "").toLowerCase().trim();
        const wVintage = wine.vintage;
        return this.cellarWines.find((c) => {
            const cName = (c.name || "").toLowerCase().trim();
            const cWinery = (c.winery || "").toLowerCase().trim();
            // Match by name + winery (both must partially match)
            const nameMatch = cName.includes(wName) || wName.includes(cName);
            const wineryMatch = !wWinery || !cWinery || cWinery.includes(wWinery) || wWinery.includes(cWinery);
            const vintageMatch = !wVintage || !c.vintage || wVintage === c.vintage;
            return nameMatch && wineryMatch && vintageMatch;
        }) || null;
    }
    _renderWineItem(wine) {
        const typeColor = WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red;
        const expanded = this._expandedIndex === wine.index;
        const added = this._addedIndices.has(wine.index);
        const marketPrice = wine.vivino_price || wine.ai_estimated_price;
        const markup = this._calcMarkup(wine.list_price, marketPrice);
        const valueBadge = this._getValueBadge(wine);
        const cellarMatch = this._findCellarMatch(wine);
        return b$1 `
      <div
        class="wine-list-item ${expanded ? "expanded" : ""}"
        @click=${() => this._showWineDetail(wine)}
      >
        <div class="wl-type-dot" style="background: ${typeColor}"></div>
        ${wine.vivino_image_url
            ? b$1 `<img class="wl-thumb" src="${wine.vivino_image_url}" alt="" />`
            : A$1}
        <div class="wl-info">
          <div class="wl-name">
            ${wine.winery ? `${wine.winery} ` : ""}${wine.name}
            ${cellarMatch ? b$1 `<span class="wl-cellar-badge">${this._t("ui.wineList.inCellarBadge")}</span>` : A$1}
          </div>
          <div class="wl-meta">
            ${wine.vintage || "NV"} ${wine.region ? `\u2022 ${wine.region}` : ""}
            ${wine.grape_variety ? `\u2022 ${wine.grape_variety}` : ""}
          </div>

          <!-- Prices + Scores combined row -->
          <div class="wl-price-row">
            ${wine.list_price !== null
            ? b$1 `<span class="wl-list-price">${this._formatPrice(wine.list_price, this._currency)}</span>`
            : A$1}
            ${marketPrice
            ? b$1 `<span class="wl-market-price">${this._formatPrice(marketPrice, "USD")}</span>`
            : A$1}
            ${markup
            ? b$1 `<span class="wl-markup-badge" style="background:${markup.color}">${markup.text}</span>`
            : A$1}
            ${valueBadge
            ? b$1 `<span class="wl-value-badge" style="background:${valueBadge.color}">${valueBadge.label}</span>`
            : A$1}
            ${wine.vivino_status === "loading"
            ? b$1 `<span class="wl-loading-dot"></span>`
            : wine.vivino_rating
                ? b$1 `<span class="wl-vivino-rating">\u2605 ${wine.vivino_rating.toFixed(1)}</span>`
                : A$1}
            ${wine.ai_status === "loading"
            ? b$1 `<span class="wl-loading-dot"></span>`
            : A$1}
            ${cellarMatch?.user_rating
            ? b$1 `<span class="wl-user-score">\uD83C\uDF77 ${cellarMatch.user_rating}/100</span>`
            : A$1}
            ${wine.ai_ratings?.rating_ws ? b$1 `<span class="wl-ai-chip">WS ${wine.ai_ratings.rating_ws}</span>` : A$1}
            ${wine.ai_ratings?.rating_rp ? b$1 `<span class="wl-ai-chip">RP ${wine.ai_ratings.rating_rp}</span>` : A$1}
            ${wine.ai_ratings?.rating_jd ? b$1 `<span class="wl-ai-chip">JD ${wine.ai_ratings.rating_jd}</span>` : A$1}
            ${wine.ai_ratings?.rating_ag ? b$1 `<span class="wl-ai-chip">AG ${wine.ai_ratings.rating_ag}</span>` : A$1}
          </div>

          <!-- Expanded details -->
          ${expanded
            ? b$1 `
                <div class="wl-expanded-detail">
                  ${wine.ai_description
                ? b$1 `<div class="wl-detail-row" style="font-style:italic">${wine.ai_description}</div>`
                : A$1}
                  ${wine.ai_drink_window
                ? b$1 `<div class="wl-detail-row"><span class="wl-detail-label">${this._t("ui.wineList.drinkWindowLabel")}</span>${wine.ai_drink_window}</div>`
                : A$1}
                  ${wine.glass_price
                ? b$1 `<div class="wl-detail-row"><span class="wl-detail-label">${this._t("ui.wineList.byTheGlassLabel")}</span>${this._formatPrice(wine.glass_price, this._currency)}</div>`
                : A$1}
                  ${wine.bottle_size && wine.bottle_size !== "750ml"
                ? b$1 `<div class="wl-detail-row"><span class="wl-detail-label">${this._t("ui.wineList.sizeLabel")}</span>${wine.bottle_size}</div>`
                : A$1}
                  ${wine.vivino_rating
                ? b$1 `<div class="wl-detail-row"><span class="wl-detail-label">${this._t("ui.wineList.vivinoLabel")}</span>${wine.vivino_rating.toFixed(1)}${wine.vivino_ratings_count ? this._t("ui.wineDetail.ratingsCountSuffix", { count: wine.vivino_ratings_count.toLocaleString() }) : ""}</div>`
                : A$1}
                </div>
              `
            : A$1}
        </div>

        <div class="wl-actions" @click=${(e) => e.stopPropagation()}>
          <button
            class="wl-add-btn ${added ? "added" : ""}"
            ?disabled=${added}
            @click=${() => !added && this._addToCellar(wine)}
          >
            ${added ? "\u2713" : this._t("ui.wineList.addBtn")}
          </button>
          <button
            class="wl-buy-btn ${this._buyListIndices.has(wine.index) ? "added" : ""}"
            ?disabled=${this._buyListIndices.has(wine.index)}
            @click=${() => !this._buyListIndices.has(wine.index) && this._addToBuyList(wine)}
          >
            ${this._buyListIndices.has(wine.index) ? "\u2713" : this._t("ui.wineList.buyBtn")}
          </button>
        </div>
      </div>
    `;
    }
    render() {
        if (!this.open)
            return A$1;
        const vivinoDone = this._wines.filter((w) => w.vivino_status === "done" || w.vivino_status === "error").length;
        const total = this._wines.length;
        return b$1 `
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="max-width:600px" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(this._close, this._t('ui.common.close'))}
          <div class="header">
            <span class="header-title">
              ${this._phase === "capture"
            ? this._t("ui.wineList.scanTitle")
            : this._restaurantName
                ? `\uD83C\uDF7D\uFE0F ${this._restaurantName}`
                : this._t("ui.wineList.scannedListTitle")}
            </span>
          </div>

          ${this._phase === "capture"
            ? b$1 `
                ${this._error
                ? b$1 `<div class="error-msg">${this._error}</div>`
                : A$1}
                ${this._wines.length > 0
                ? b$1 `<div class="header-subtitle">${this._wines.length > 1
                    ? this._t("ui.wineList.alreadyScannedHintMany", { n: this._wines.length })
                    : this._t("ui.wineList.alreadyScannedHintOne", { n: this._wines.length })}</div>`
                : b$1 `<div class="header-subtitle">${this._t("ui.wineList.captureSubtitle")}</div>`}
                <div style="padding: 0 16px 16px">
                  <label-camera .hass=${this.hass} .active=${this._phase === "capture"} @photo-captured=${this._onPhotoCaptured}></label-camera>
                </div>
                ${this._wines.length > 0
                ? b$1 `
                      <div class="footer-actions">
                        <button class="btn btn-primary" @click=${() => (this._phase = "results")}>
                          ${this._t("ui.wineList.backToResults", { n: this._wines.length })}
                        </button>
                      </div>
                    `
                : A$1}
              `
            : A$1}

          ${this._phase === "extracting"
            ? b$1 `
                <div class="extracting">
                  <div class="spinner"></div>
                  <div>${this._t("ui.wineList.analyzingList")}</div>
                  <div style="font-size:0.85em">${this._t("ui.wineList.geminiReading")}</div>
                  <div style="font-size:0.78em; color: var(--secondary-text-color); margin-top: 8px;">${this._t("ui.wineList.longListsHint")}</div>
                </div>
              `
            : A$1}

          ${this._phase === "results"
            ? b$1 `
                <div class="header-subtitle">
                  ${total === 1
                ? this._t("ui.wineList.winesFoundOne", { n: total })
                : this._t("ui.wineList.winesFoundMany", { n: total })}
                  ${this._currency !== "USD" ? this._t("ui.wineList.pricesInCurrency", { currency: this._currency }) : ""}
                </div>

                <!-- Vivino enrichment progress -->
                ${this._enriching
                ? b$1 `
                      <div class="enrichment-bar">
                        <span>\uD83C\uDF47 Vivino ${vivinoDone}/${total}</span>
                        <div class="progress-track">
                          <div
                            class="progress-fill vivino"
                            style="width: ${total ? (vivinoDone / total) * 100 : 0}%"
                          ></div>
                        </div>
                      </div>
                    `
                : A$1}

                <div class="wine-list-results">
                  ${this._wines.map((w) => this._renderWineItem(w))}
                </div>

                <div class="footer-actions">
                  ${!this._enriching && this._wines.some((w) => w.vivino_status === "pending")
                ? b$1 `
                        <button
                          class="btn btn-primary"
                          style="background:#8e24aa"
                          @click=${this._startVivinoEnrichment}
                        >
                          ${this._t("ui.wineList.getVivinoScoresBtn")}
                        </button>
                      `
                : A$1}
                  <button
                    class="btn btn-primary"
                    style="background:#00695c"
                    @click=${this._scanAnotherPage}
                  >
                    ${this._t("ui.wineList.scanAnotherPageBtn")}
                  </button>
                </div>
              `
            : A$1}
        </div>
      </div>

      <!-- Wine detail dialog for wine list items -->
      <wine-detail-dialog
        .wine=${this._detailWine}
        .hass=${this.hass}
        .open=${this._showDetail}
        .hasGemini=${this.hasGemini}
        .mode=${"winelist"}
        @close=${() => (this._showDetail = false)}
      ></wine-detail-dialog>
    `;
    }
};
WineListDialog.styles = [
    sharedStyles,
    i$4 `
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 36px;
        padding: 12px 60px 8px 20px;
      }

      .header-title {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--wc-text);
      }

      .header-subtitle {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        padding: 0 20px 12px;
      }



      .extracting {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 40px 20px;
        color: var(--wc-text-secondary);
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--wc-border);
        border-top: 3px solid var(--wc-primary, #6d4c41);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .error-msg {
        padding: 12px 20px;
        color: #c62828;
        font-size: 0.85em;
        background: rgba(198, 40, 40, 0.08);
        border-radius: 8px;
        margin: 0 20px 12px;
      }

      .enrichment-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .progress-track {
        flex: 1;
        height: 4px;
        background: var(--wc-border);
        border-radius: 2px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s;
      }

      .progress-fill.vivino { background: #8e24aa; }
      .progress-fill.ai { background: #1565c0; }

      .wine-list-results {
        max-height: 55vh;
        overflow-y: auto;
        padding: 0 16px 16px;
      }

      .wine-list-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 5px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        margin-bottom: 3px;
        transition: background 0.2s;
        cursor: pointer;
      }

      .wine-list-item:hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .wine-list-item.expanded {
        background: rgba(255, 255, 255, 0.06);
      }

      .wl-type-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 5px;
      }

      .wl-thumb {
        width: 22px;
        height: 32px;
        border-radius: 3px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .wl-info {
        flex: 1;
        min-width: 0;
      }

      .wl-name {
        font-weight: 600;
        font-size: 0.82em;
        color: var(--wc-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .wl-cellar-badge {
        font-size: 0.65em;
        font-weight: 700;
        padding: 1px 4px;
        border-radius: 4px;
        background: rgba(46, 125, 50, 0.2);
        border: 1px solid rgba(46, 125, 50, 0.4);
        color: #4caf50;
        margin-left: 4px;
        vertical-align: middle;
      }

      .wl-meta {
        font-size: 0.72em;
        color: var(--wc-text-secondary);
        margin-top: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .wl-vivino-rating {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: 0.78em;
        font-weight: 600;
        color: #f5a623;
      }

      .wl-user-score {
        font-size: 0.78em;
        font-weight: 600;
        color: #4caf50;
      }

      .wl-price-row {
        display: flex;
        gap: 4px;
        align-items: center;
        margin-top: 1px;
        font-size: 0.78em;
        flex-wrap: wrap;
      }

      .wl-list-price {
        font-weight: 600;
        color: var(--wc-text);
      }

      .wl-market-price {
        color: var(--wc-text-secondary);
        text-decoration: line-through;
      }

      .wl-markup-badge {
        font-size: 0.68em;
        font-weight: 600;
        padding: 1px 5px;
        border-radius: 6px;
        color: #fff;
      }

      .wl-value-badge {
        font-size: 0.66em;
        font-weight: 500;
        padding: 1px 5px;
        border-radius: 6px;
        color: #fff;
      }

      .wl-ai-chip {
        font-size: 0.65em;
        padding: 1px 4px;
        border-radius: 8px;
        background: rgba(245, 166, 35, 0.12);
        border: 1px solid rgba(245, 166, 35, 0.3);
        color: #f5a623;
        font-weight: 600;
      }

      .wl-expanded-detail {
        margin-top: 4px;
        padding-top: 4px;
        border-top: 1px solid var(--wc-border);
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        line-height: 1.3;
      }

      .wl-detail-row {
        margin-bottom: 2px;
      }

      .wl-detail-label {
        font-weight: 600;
        color: var(--wc-text);
        margin-right: 4px;
      }

      .wl-loading-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border: 2px solid var(--wc-border);
        border-top: 2px solid var(--wc-primary, #6d4c41);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      .wl-actions {
        flex-shrink: 0;
      }

      .wl-add-btn {
        background: #2e7d32;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 0.7em;
        padding: 3px 6px;
        cursor: pointer;
        white-space: nowrap;
      }

      .wl-add-btn:hover { background: #1b5e20; }

      .wl-add-btn.added {
        background: #546e7a;
        cursor: default;
      }

      .wl-buy-btn {
        background: #e65100;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 0.7em;
        padding: 3px 6px;
        cursor: pointer;
        white-space: nowrap;
        margin-top: 2px;
      }

      .wl-buy-btn:hover { background: #bf360c; }

      .wl-buy-btn.added {
        background: #546e7a;
        cursor: default;
      }

      .footer-actions {
        display: flex;
        gap: 8px;
        padding: 12px 16px 16px;
        border-top: 1px solid var(--wc-border);
        justify-content: center;
        flex-wrap: wrap;
      }

      .footer-actions .btn {
        font-size: 0.8em;
        padding: 6px 12px;
      }

      @media (max-width: 599px) {
        .wine-list-results {
          max-height: 65vh;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ type: Boolean })
], WineListDialog.prototype, "open", void 0);
__decorate([
    n$1({ attribute: false })
], WineListDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], WineListDialog.prototype, "cellarWines", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_phase", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_wines", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_restaurantName", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_currency", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_error", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_enriching", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_expandedIndex", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_addedIndices", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_cancelEnrichment", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_buyListIndices", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_detailWine", void 0);
__decorate([
    r$1()
], WineListDialog.prototype, "_showDetail", void 0);
__decorate([
    n$1({ type: Boolean })
], WineListDialog.prototype, "hasGemini", void 0);
WineListDialog = __decorate([
    t$2("wine-list-dialog")
], WineListDialog);

const OTHER_FOOD_CATEGORY = "other";
const FOOD_CATEGORIES = [
    {
        id: "aperitif",
        keywords: ["aperitif", "tapas", "gougere", "amuse-bouche", "amuse bouche", "appetizer", "snack", "finger food"],
    },
    {
        id: "charcuterie",
        keywords: ["charcuterie", "rillette", "saucisson", "jambon", "pate", "terrine", "salami", "chorizo", "cured meat", "ham", "prosciutto"],
    },
    {
        id: "cheese",
        keywords: ["fromage", "roquefort", "comte", "chevre", "brie", "camembert", "munster", "reblochon", "morbier", "parmesan", "cheese"],
    },
    {
        id: "seafood",
        keywords: ["fruits de mer", "huitre", "crevette", "homard", "crustace", "coquille", "moule", "langouste", "crabe", "sushi", "sashimi", "shellfish", "seafood", "oyster", "shrimp", "prawn", "lobster", "crab", "mussel", "scallop"],
    },
    {
        id: "fish",
        keywords: ["poisson", "saumon", "cabillaud", "sole", "brochet", "truite", "papillote", "thon", "dorade", "morue", "bar", "fish", "salmon", "tuna", "cod", "trout", "halibut"],
    },
    {
        id: "duck",
        keywords: ["canard", "magret", "foie gras", "duck"],
    },
    {
        id: "poultry",
        keywords: ["volaille", "poulet", "poularde", "dinde", "pintade", "chapon", "poultry", "chicken", "turkey"],
    },
    {
        id: "lamb",
        keywords: ["agneau", "gigot", "lamb"],
    },
    {
        id: "game",
        keywords: ["gibier", "cerf", "chevreuil", "sanglier", "biche", "faisan", "perdrix", "lievre", "game", "venison", "deer", "boar", "pheasant", "rabbit"],
    },
    {
        id: "beef",
        keywords: ["boeuf", "entrecote", "steak", "tournedos", "viande rouge", "viandes rouges", "cote de boeuf", "beef", "red meat"],
    },
    {
        id: "pork",
        keywords: ["porc", "veau", "pork", "veal"],
    },
    {
        id: "stew",
        keywords: ["daube", "bourguignon", "carbonnade", "civet", "cassoulet", "mijote", "en sauce", "ragout", "pot-au-feu", "blanquette", "estouffade", "stew", "braise"],
    },
    {
        id: "grill",
        keywords: ["grillade", "grille", "barbecue", "brochette", "grilled", "bbq"],
    },
    {
        id: "spicy",
        keywords: ["curry", "epice", "asiatique", "wok", "tex-mex", "mexicain", "indien", "thai", "szechuan", "spicy", "asian", "mexican", "indian"],
    },
    {
        id: "mediterranean",
        keywords: ["~mediterran", "~provenc", "ratatouille", "tajine", "pasta", "pizza"],
    },
    {
        id: "salad",
        keywords: ["salade", "salad"],
    },
    {
        id: "vegetarian",
        keywords: ["risotto", "legume", "~vegetarien", "asperge", "champignon", "quiche", "~vegetarian", "vegetable", "vegan", "mushroom", "asparagus"],
    },
    {
        id: "dessert",
        keywords: ["dessert", "chocolat", "tarte", "patisserie", "gateau", "glace", "sorbet", "fruit", "chocolate", "cake", "pastry", "fruity"],
    },
];
// Every id categorizeFoodPairing() can return, so a saved filter value
// from an older build (which stored the French label itself) can be
// recognised as stale and reset.
const FOOD_CATEGORY_IDS = [...FOOD_CATEGORIES.map((c) => c.id), OTHER_FOOD_CATEGORY];
// Two matching modes per keyword:
// - default: word-boundary match allowing an optional French "e"/"s"/"es"
//   suffix (singular/plural + masc/fem agreement) without an open wildcard,
//   so short stems don't swallow unrelated words ("bar" must not match
//   "barbecue", "chevre" must not match "chevreuil", "brochet" must not
//   match "brochette").
// - "~"-prefixed: open wildcard suffix, reserved for longer stems with
//   irregular agreement (méditerranéen/-enne/-ens/-ennes) that are long
//   enough to carry no collision risk.
// - multi-word phrases (contain a space or hyphen): plain substring match,
//   already specific enough on their own.
function matchesKeyword(haystack, keyword) {
    if (keyword.includes(" ") || keyword.includes("-")) {
        return haystack.includes(keyword);
    }
    if (keyword.startsWith("~")) {
        return new RegExp(`\\b${keyword.slice(1)}\\w*\\b`).test(haystack);
    }
    return new RegExp(`\\b${keyword}(?:e?s?)\\b`).test(haystack);
}
// Maps one split pairing ("daube de bœuf", "Beef") to its generic category
// id ("stew", "beef"). Falls back to a shared "other"
// bucket when nothing matches, rather than showing the raw specific text —
// keeping the filter list short is the whole point of this function.
function categorizeFoodPairing(pairing) {
    const haystack = normalizeText(pairing);
    if (!haystack)
        return OTHER_FOOD_CATEGORY;
    for (const category of FOOD_CATEGORIES) {
        if (category.keywords.some((kw) => matchesKeyword(haystack, kw))) {
            return category.id;
        }
    }
    return OTHER_FOOD_CATEGORY;
}

// One icon per food category, for the Pairings chooser.
const FOOD_ICONS = {
    aperitif: "🫒",
    charcuterie: "🥓",
    cheese: "🧀",
    seafood: "🦪",
    fish: "🐟",
    duck: "🦆",
    poultry: "🍗",
    lamb: "🐑",
    game: "🦌",
    beef: "🥩",
    pork: "🐖",
    stew: "🍲",
    grill: "🔥",
    spicy: "🌶️",
    mediterranean: "🍅",
    salad: "🥗",
    vegetarian: "🥦",
    dessert: "🍰",
    other: "🍽️",
};
// Persisted so the inventory reopens the way it was left; the search query is
// deliberately excluded — a stale query silently hiding the cellar is far more
// confusing than a stale sort order.
const PREFS_KEY = "wine_cellar_inventory_prefs_v1";
const DEFAULT_FILTERS = {
    typeFilter: "all",
    dispositionFilter: "all",
    countryFilter: "all",
    grapeFilter: "all",
    foodFilter: "all",
    cabinetFilter: "all",
    minRating: 0,
    maxPrice: null,
    vintageMin: null,
    vintageMax: null,
    preset: "all",
};
let InventoryDialog = class InventoryDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.open = false;
        this.wines = [];
        this.cabinets = [];
        this.hasGemini = false;
        this.enableWhisky = false;
        this.currency = "USD";
        // Batch AI / Vivino scans run in the card (they outlive this dialog); these
        // only mirror their progress so the review button can show it.
        this.analyzing = false;
        this.batchVivino = false;
        // Opened from the card's "Pairings" button: start on the food chooser,
        // then show the inventory filtered to what goes with the pick.
        this.pairingMode = false;
        this._showPairingPicker = false;
        this._searchQuery = "";
        this._typeFilter = DEFAULT_FILTERS.typeFilter;
        this._dispositionFilter = DEFAULT_FILTERS.dispositionFilter;
        this._countryFilter = DEFAULT_FILTERS.countryFilter;
        this._grapeFilter = DEFAULT_FILTERS.grapeFilter;
        this._foodFilter = DEFAULT_FILTERS.foodFilter;
        this._cabinetFilter = DEFAULT_FILTERS.cabinetFilter;
        this._minRating = DEFAULT_FILTERS.minRating;
        this._maxPrice = DEFAULT_FILTERS.maxPrice;
        this._vintageMin = DEFAULT_FILTERS.vintageMin;
        this._vintageMax = DEFAULT_FILTERS.vintageMax;
        this._preset = DEFAULT_FILTERS.preset;
        this._showFilters = false;
        this._sortField = "name";
        this._sortDir = "asc";
        this._detailWine = null;
        this._showDetail = false;
        this._backingUp = false;
        this._importing = false;
        this._restoring = false;
        this._confirmRestore = false;
        this._restoreData = null;
        this._confirmImport = false;
        this._pendingImport = null;
        this._importMatches = 0;
        this._statusMsg = "";
        this._serverBackingUp = false;
        this._serverBackupLabel = "";
        this._showServerRestore = false;
        this._serverBackups = [];
        this._serverRestoring = false;
        this._backupKeep = 10;
        this._backupKeepChoices = [0, 5, 10, 20, 50];
        this._storageInfo = null;
        this._enriching = "";
        this._confirmEnrich = "";
        this._confirmEnrichRetry = false;
        this._showReview = false;
        this._viewMode = "inventory";
        this._historyItems = [];
        this._historyLoading = false;
        this._buyAgainOnly = false;
        this._editingHistoryId = "";
        this._editRating = 0;
        this._editNotes = "";
        this._editBuyAgain = false;
        this._historySaving = false;
    }
    // HA websocket errors can arrive as a plain string, an Error, or a
    // {code, message} object depending on where they're thrown from — a bare
    // `err.message || err` shows "[object Object]" for the last shape instead
    // of anything useful. This tries the common shapes in order before
    // falling back to a JSON dump.
    _formatError(err) {
        if (typeof err === "string")
            return err;
        if (err?.message && err?.code)
            return `${err.message} (${err.code})`;
        if (err?.message)
            return err.message;
        if (err?.error && typeof err.error === "string")
            return err.error;
        if (err?.body && typeof err.body === "string")
            return err.body;
        try {
            return JSON.stringify(err);
        }
        catch {
            return String(err);
        }
    }
    _logStatus(context, err) {
        const message = this._formatError(err);
        console.error(`Cork Dork: ${context}`, err);
        return message;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    updated(changedProps) {
        if (changedProps.has("open") && this.open) {
            // Only the search query is transient. Sort order and filters are
            // restored from localStorage on connect and must survive a reopen —
            // resetting them here would silently undo the saved preferences.
            this._searchQuery = "";
            this._showDetail = false;
            this._detailWine = null;
            this._statusMsg = "";
            this._confirmRestore = false;
            this._confirmEnrich = "";
            this._confirmEnrichRetry = false;
            this._confirmImport = false;
            this._pendingImport = null;
            this._showServerRestore = false;
            this._restoreData = null;
            this._viewMode = "inventory";
            this._historyItems = [];
            this._buyAgainOnly = false;
            this._editingHistoryId = "";
            this._showPairingPicker = this.pairingMode;
        }
        // A Pairings visit is a one-off lookup: leaving it (✕, backdrop, or
        // jumping to a bottle) must not leave its food filter saved for the
        // next plain Inventory open.
        if (changedProps.has("open") && !this.open && this.pairingMode) {
            this._clearFilters();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close"));
    }
    // ── Preferences (sort + filters survive a reopen) ─────────────
    connectedCallback() {
        super.connectedCallback();
        this._loadPrefs();
    }
    _loadPrefs() {
        try {
            const raw = localStorage.getItem(PREFS_KEY);
            if (!raw)
                return;
            const p = JSON.parse(raw);
            if (p.sortField)
                this._sortField = p.sortField;
            if (p.sortDir)
                this._sortDir = p.sortDir;
            if (p.typeFilter)
                this._typeFilter = p.typeFilter;
            if (p.dispositionFilter)
                this._dispositionFilter = p.dispositionFilter;
            if (p.countryFilter)
                this._countryFilter = p.countryFilter;
            if (p.grapeFilter)
                this._grapeFilter = p.grapeFilter;
            // Older builds saved the French category label itself; only a known
            // category id is a valid filter now.
            if (p.foodFilter && (p.foodFilter === "all" || FOOD_CATEGORY_IDS.includes(p.foodFilter))) {
                this._foodFilter = p.foodFilter;
            }
            if (p.cabinetFilter)
                this._cabinetFilter = p.cabinetFilter;
            if (typeof p.minRating === "number")
                this._minRating = p.minRating;
            if (p.maxPrice !== undefined)
                this._maxPrice = p.maxPrice;
            if (p.vintageMin !== undefined)
                this._vintageMin = p.vintageMin;
            if (p.vintageMax !== undefined)
                this._vintageMax = p.vintageMax;
            if (p.preset)
                this._preset = p.preset;
        }
        catch {
            // A corrupt or unavailable localStorage must never keep the dialog
            // from opening — fall back to defaults silently.
        }
    }
    _savePrefs() {
        try {
            localStorage.setItem(PREFS_KEY, JSON.stringify({
                sortField: this._sortField,
                sortDir: this._sortDir,
                typeFilter: this._typeFilter,
                dispositionFilter: this._dispositionFilter,
                countryFilter: this._countryFilter,
                grapeFilter: this._grapeFilter,
                foodFilter: this._foodFilter,
                cabinetFilter: this._cabinetFilter,
                minRating: this._minRating,
                maxPrice: this._maxPrice,
                vintageMin: this._vintageMin,
                vintageMax: this._vintageMax,
                preset: this._preset,
            }));
        }
        catch {
            // Private browsing / full quota — not worth surfacing.
        }
    }
    _clearFilters() {
        this._typeFilter = DEFAULT_FILTERS.typeFilter;
        this._dispositionFilter = DEFAULT_FILTERS.dispositionFilter;
        this._countryFilter = DEFAULT_FILTERS.countryFilter;
        this._grapeFilter = DEFAULT_FILTERS.grapeFilter;
        this._foodFilter = DEFAULT_FILTERS.foodFilter;
        this._cabinetFilter = DEFAULT_FILTERS.cabinetFilter;
        this._minRating = DEFAULT_FILTERS.minRating;
        this._maxPrice = DEFAULT_FILTERS.maxPrice;
        this._vintageMin = DEFAULT_FILTERS.vintageMin;
        this._vintageMax = DEFAULT_FILTERS.vintageMax;
        this._preset = DEFAULT_FILTERS.preset;
        this._searchQuery = "";
        this._savePrefs();
    }
    // Everything that is currently narrowing the list, so a persisted filter
    // can never silently hide half the cellar.
    _activeFilterCount() {
        let n = 0;
        if (this._typeFilter !== "all")
            n++;
        if (this._dispositionFilter !== "all")
            n++;
        if (this._countryFilter !== "all")
            n++;
        if (this._grapeFilter !== "all")
            n++;
        if (this._foodFilter !== "all")
            n++;
        if (this._cabinetFilter !== "all")
            n++;
        if (this._minRating > 0)
            n++;
        if (this._maxPrice !== null)
            n++;
        if (this._vintageMin !== null)
            n++;
        if (this._vintageMax !== null)
            n++;
        if (this._preset !== "all")
            n++;
        return n;
    }
    // ── Facets ────────────────────────────────────────────────────
    _countryOptions() {
        return collectFacet(this.wines, (w) => (w.country ? [w.country] : []));
    }
    _grapeOptions() {
        return collectFacet(this.wines, (w) => splitMulti(w.grape_variety));
    }
    // The AI's food pairings are free text ("daube de bœuf", "bœuf
    // bourguignon", "carbonnade flamande"…), which left unfiltered would
    // balloon this dropdown into dozens of near-synonyms. Each split pairing
    // is mapped to a generic category (see foodCategories.ts) so the filter
    // stays short — the wine detail view still shows the original AI text.
    // Options are category ids, sorted by their translated label.
    _foodOptions() {
        return collectFacet(this.wines, (w) => splitMulti(w.food_pairings).map(categorizeFoodPairing)).sort((a, b) => this._foodLabel(a).localeCompare(this._foodLabel(b)));
    }
    _foodLabel(id) {
        return this._t(`foodCategory.${id}`);
    }
    // Picking a food clears every other filter first: a leftover saved type
    // or rating filter would otherwise hide wines that pair, with nothing on
    // screen saying why.
    _pickPairing(id) {
        this._clearFilters();
        this._foodFilter = id;
        this._savePrefs();
        this._showPairingPicker = false;
    }
    _renderPairingPicker() {
        if (!this._showPairingPicker)
            return A$1;
        const counts = new Map();
        for (const w of this.wines) {
            for (const id of new Set(splitMulti(w.food_pairings).map(categorizeFoodPairing))) {
                counts.set(id, (counts.get(id) ?? 0) + 1);
            }
        }
        const options = this._foodOptions();
        const missing = this._winesWithoutPairings();
        return b$1 `
      <div class="inv-confirm-overlay" @click=${() => (this._showPairingPicker = false)}>
        <div class="inv-confirm-box inv-pairing-box" @click=${(e) => e.stopPropagation()}>
          <h3>${this._t("ui.inventory.pairingTitle")}</h3>
          <p>${options.length ? this._t("ui.inventory.pairingIntro") : this._t("ui.inventory.pairingEmpty")}</p>
          <div class="inv-pairing-grid">
            ${options.map((id) => b$1 `
                <button class="inv-pairing-option" @click=${() => this._pickPairing(id)}>
                  <span class="inv-pairing-icon">${FOOD_ICONS[id] ?? "🍽️"}</span>
                  <span class="inv-pairing-label">${this._foodLabel(id)}</span>
                  <small>${counts.get(id) ?? 0}</small>
                </button>
              `)}
          </div>
          ${missing
            ? b$1 `<small class="inv-pairing-missing">${missing > 1
                ? this._t("ui.inventory.missingPairingsHintMany", { n: missing })
                : this._t("ui.inventory.missingPairingsHintOne", { n: missing })}</small>`
            : A$1}
          <div class="inv-confirm-btns">
            <button class="inv-confirm-cancel" @click=${() => (this._showPairingPicker = false)}>
              ${this._t("ui.common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
    }
    _winesWithoutPairings() {
        return this.wines.filter((w) => !splitMulti(w.food_pairings).length).length;
    }
    // ── Enrichment ────────────────────────────────────────────────
    // Vivino is the *only* source of food pairings; it also supplies the
    // description. Rating and photo are deliberately not part of the test —
    // Vivino has no match for plenty of bottles, and a wine that will never
    // gain a photo must not sit in this list forever nagging the user.
    _missingVivinoData(w) {
        return !w.food_pairings || !w.description;
    }
    // The AI supplies the drinking verdict and window; it never returns food
    // pairings. Critic scores are excluded for the same reason as the photo
    // above — the AI legitimately has none for many wines.
    _missingAIData(w) {
        return !w.disposition || !w.drink_window;
    }
    // Never consulted: the source has genuinely not been asked yet.
    _winesNeedingVivino() {
        return this.wines.filter((w) => !w.vivino_checked_at && this._missingVivinoData(w));
    }
    _winesNeedingAI() {
        return this.wines.filter((w) => !w.ai_checked_at && this._missingAIData(w));
    }
    // Asked, and the source had nothing. Kept apart from the counts above so a
    // retry is a deliberate act rather than an endless nag: Vivino does add
    // bottles to its catalogue over time, so retrying later is worth offering,
    // just not automatically.
    _winesVivinoNotFound() {
        return this.wines.filter((w) => !!w.vivino_checked_at && this._missingVivinoData(w));
    }
    _winesAINotFound() {
        return this.wines.filter((w) => !!w.ai_checked_at && this._missingAIData(w));
    }
    async _runEnrich(source, retry = false) {
        const wines = retry
            ? source === "vivino"
                ? this._winesVivinoNotFound()
                : this._winesAINotFound()
            : source === "vivino"
                ? this._winesNeedingVivino()
                : this._winesNeedingAI();
        this._confirmEnrich = "";
        this._confirmEnrichRetry = false;
        if (!wines.length)
            return;
        const sourceLabel = source === "vivino" ? "Vivino" : this._t("ui.inventory.whatAiInfer");
        this._enriching = source;
        this._statusMsg = this._t("ui.inventory.refreshingWines", { n: wines.length, source: sourceLabel });
        try {
            const result = await this.hass.callWS({
                type: source === "vivino" ? "wine_cellar/batch_refresh_vivino" : "wine_cellar/batch_analyze_wines",
                wine_ids: wines.map((w) => w.id),
            });
            if (result?.error) {
                this._statusMsg = this._t("ui.inventory.refreshFailed", { error: result.error });
            }
            else {
                const updated = result?.updated ?? 0;
                const unchanged = result?.unchanged ?? 0;
                const errors = result?.errors ?? 0;
                const source = sourceLabel;
                const parts = [this._t("ui.inventory.enrichUpdated", { n: updated })];
                if (unchanged)
                    parts.push(this._t("ui.inventory.enrichUnchanged", { n: unchanged, source }));
                if (errors)
                    parts.push(this._t("ui.inventory.enrichErrors", { n: errors }));
                this._statusMsg =
                    `${parts.join(", ")}.` +
                        (unchanged
                            ? retry
                                ? " " + this._t("ui.inventory.enrichRetryNote")
                                : " " + this._t("ui.inventory.enrichMoveToRetryNote")
                            : "");
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            }
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.refreshFailed", { error: this._logStatus("enrich refresh failed", err) });
        }
        this._enriching = "";
    }
    // ── Filtering & sorting ───────────────────────────────────────
    _matchesPreset(wine, currentYear, recentCutoff) {
        switch (this._preset) {
            case "drink_this_year": {
                if (wine.disposition === "P")
                    return false;
                const year = drinkByYear(wine);
                return year !== null ? year <= currentYear : wine.disposition === "D";
            }
            case "past_peak":
                return wine.disposition === "P";
            case "unrated":
                return !wine.user_rating;
            case "incomplete":
                return (!wine.food_pairings || !wine.description || !wine.drink_window || !wine.image_url);
            case "recent":
                return !!wine.added_at && wine.added_at >= recentCutoff;
            default:
                return true;
        }
    }
    _getFilteredAndSortedWines() {
        let wines = [...this.wines];
        if (this._typeFilter !== "all") {
            wines = wines.filter((w) => w.type === this._typeFilter);
        }
        if (this._dispositionFilter !== "all") {
            const want = this._dispositionFilter;
            wines = wines.filter((w) => want === "none" ? !w.disposition : w.disposition === want);
        }
        if (this._countryFilter !== "all") {
            const want = normalizeText(this._countryFilter);
            wines = wines.filter((w) => normalizeText(w.country) === want);
        }
        if (this._grapeFilter !== "all") {
            const want = normalizeText(this._grapeFilter);
            wines = wines.filter((w) => normalizeText(w.grape_variety).includes(want));
        }
        if (this._foodFilter !== "all") {
            wines = wines.filter((w) => splitMulti(w.food_pairings).some((p) => categorizeFoodPairing(p) === this._foodFilter));
        }
        if (this._cabinetFilter !== "all") {
            const known = new Set(this.cabinets.map((c) => c.id));
            wines = wines.filter((w) => this._cabinetFilter === "unassigned"
                ? !w.cabinet_id || !known.has(w.cabinet_id)
                : w.cabinet_id === this._cabinetFilter);
        }
        if (this._minRating > 0) {
            wines = wines.filter((w) => (w.rating || 0) >= this._minRating);
        }
        // "Under X" can only be answered for wines that actually carry a price —
        // an unpriced bottle is unknown, not cheap.
        if (this._maxPrice !== null) {
            const max = this._maxPrice;
            wines = wines.filter((w) => {
                const price = w.retail_price || w.price;
                return !!price && price <= max;
            });
        }
        if (this._vintageMin !== null) {
            const min = this._vintageMin;
            wines = wines.filter((w) => w.vintage !== null && w.vintage >= min);
        }
        if (this._vintageMax !== null) {
            const max = this._vintageMax;
            wines = wines.filter((w) => w.vintage !== null && w.vintage <= max);
        }
        if (this._preset !== "all") {
            const currentYear = new Date().getFullYear();
            const cutoff = new Date(Date.now() - 30 * 86400000).toISOString();
            wines = wines.filter((w) => this._matchesPreset(w, currentYear, cutoff));
        }
        if (this._searchQuery) {
            wines = wines.filter((w) => matchesQuery(w, this._searchQuery, this.cabinets));
        }
        const dir = this._sortDir === "asc" ? 1 : -1;
        wines.sort((a, b) => {
            switch (this._sortField) {
                case "name":
                    return dir * a.name.localeCompare(b.name);
                case "winery":
                    return dir * (a.winery || "").localeCompare(b.winery || "");
                case "vintage":
                    return dir * ((a.vintage || 0) - (b.vintage || 0));
                case "type":
                    return dir * (a.type || "").localeCompare(b.type || "");
                case "rating":
                    return dir * ((a.rating || 0) - (b.rating || 0));
                case "user_rating":
                    return dir * ((a.user_rating || 0) - (b.user_rating || 0));
                case "price":
                    return dir * ((a.retail_price || a.price || 0) - (b.retail_price || b.price || 0));
                case "drink_by":
                    return compareNullable(drinkByYear(a), drinkByYear(b), dir, (x, y) => x - y);
                case "urgency": {
                    // Past peak first, then drink-now, then hold, then unanalyzed —
                    // within a bucket, the soonest drink-by year leads.
                    const rank = (w) => w.disposition === "P" ? 0 : w.disposition === "D" ? 1 : w.disposition === "H" ? 2 : 3;
                    const byRank = rank(a) - rank(b);
                    if (byRank !== 0)
                        return dir * byRank;
                    return compareNullable(drinkByYear(a), drinkByYear(b), dir, (x, y) => x - y);
                }
                case "purchase_date":
                    return compareNullable(a.purchase_date || null, b.purchase_date || null, dir, (x, y) => x.localeCompare(y));
                case "added_at":
                    return dir * (a.added_at || "").localeCompare(b.added_at || "");
                case "cabinet": {
                    const cabA = this.cabinets.find((c) => c.id === a.cabinet_id)?.name || "";
                    const cabB = this.cabinets.find((c) => c.id === b.cabinet_id)?.name || "";
                    return dir * cabA.localeCompare(cabB);
                }
                default:
                    return 0;
            }
        });
        return wines;
    }
    _computeStats(wines) {
        const count = wines.length;
        let totalValue = 0;
        const byType = {};
        for (const w of wines) {
            if (w.retail_price)
                totalValue += w.retail_price;
            else if (w.price)
                totalValue += w.price;
            const t = w.type || "unknown";
            byType[t] = (byType[t] || 0) + 1;
        }
        return { count, totalValue, byType };
    }
    // ── History ──────────────────────────────────────────────────
    async _switchToHistory() {
        this._viewMode = "history";
        this._historyLoading = true;
        this._loadStorageInfo();
        try {
            const result = await this.hass.callWS({ type: "wine_cellar/get_wine_history" });
            this._historyItems = (result?.history || []).sort((a, b) => (b.removed_at || "").localeCompare(a.removed_at || ""));
        }
        catch (err) {
            console.error("Failed to load wine history", err);
            this._historyItems = [];
        }
        this._historyLoading = false;
    }
    async _clearHistory() {
        try {
            await this.hass.callWS({ type: "wine_cellar/clear_wine_history" });
            this._historyItems = [];
            this._loadStorageInfo();
            this._statusMsg = this._t("ui.inventory.historyCleared");
        }
        catch (err) {
            console.error("Failed to clear history", err);
        }
    }
    async _restoreFromHistory(historyId) {
        try {
            await this.hass.callWS({ type: "wine_cellar/restore_wine", history_id: historyId });
            this._historyItems = this._historyItems.filter((i) => i.id !== historyId);
            this._statusMsg = this._t("ui.inventory.wineRestoredUnassigned");
            this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Failed to restore wine from history", err);
            this._statusMsg = this._t("ui.inventory.restoreWineFailed");
        }
    }
    _startEditHistory(item) {
        if (this._editingHistoryId === item.id) {
            this._editingHistoryId = "";
            return;
        }
        this._editingHistoryId = item.id;
        this._editRating = item.personal_rating ?? 0;
        this._editNotes = item.drink_notes || "";
        this._editBuyAgain = !!item.buy_again;
    }
    async _saveHistoryEntry(historyId) {
        this._historySaving = true;
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/update_history_entry",
                history_id: historyId,
                personal_rating: this._editRating || null,
                drink_notes: this._editNotes.trim(),
                buy_again: this._editBuyAgain,
            });
            this._historyItems = this._historyItems.map((i) => (i.id === historyId ? result.entry : i));
            this._editingHistoryId = "";
            this._statusMsg = this._t("ui.inventory.historySaved");
            // Buy again changes the Buy List the card shows.
            this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            console.error("Failed to save history entry", err);
            this._statusMsg = this._t("ui.inventory.historySaveFailed");
        }
        this._historySaving = false;
    }
    _renderHistoryEditor(item) {
        return b$1 `
      <div class="inv-history-editor">
        <div style="display:flex;align-items:center;gap:8px;font-size:0.85em;color:var(--wc-text-secondary)">
          ${this._t("ui.inventory.myRatingLabel")}
          <star-rating
            .value=${this._editRating}
            .size=${22}
            @rating-change=${(e) => (this._editRating = e.detail.value)}
          ></star-rating>
        </div>
        <textarea
          rows="3"
          placeholder="${this._t("ui.inventory.drinkNotesPlaceholder")}"
          .value=${this._editNotes}
          @input=${(e) => (this._editNotes = e.target.value)}
        ></textarea>
        <label>
          <input type="checkbox" .checked=${this._editBuyAgain}
            @change=${(e) => (this._editBuyAgain = e.target.checked)} />
          <span>🛒 ${this._t("ui.inventory.buyAgainLabel")}
            <small style="color:var(--wc-text-secondary)"> — ${this._t("ui.inventory.buyAgainHint")}</small></span>
        </label>
        <div class="inv-editor-btns">
          <button class="inv-btn" @click=${() => (this._editingHistoryId = "")}>${this._t("ui.common.cancel")}</button>
          <button class="inv-btn active" ?disabled=${this._historySaving}
            @click=${() => this._saveHistoryEntry(item.id)}>${this._t("ui.common.save")}</button>
        </div>
      </div>
    `;
    }
    _formatReason(reason) {
        const labels = getRemovalReasons(this.hass?.language);
        return labels.find((r) => r.id === reason)?.label || reason;
    }
    _formatDate(iso) {
        if (!iso)
            return "";
        try {
            return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        }
        catch {
            return iso;
        }
    }
    _renderHistory() {
        if (this._historyLoading) {
            return b$1 `<div class="inv-empty">${this._t("ui.inventory.loadingHistory")}</div>`;
        }
        if (this._historyItems.length === 0) {
            return b$1 `
        ${this._renderStorageInfo()}
        <div class="inv-empty">${this._t("ui.inventory.noHistory")}</div>
        <div class="inv-footer">
          <span class="inv-count">${this._t("ui.inventory.winesRemoved", { n: 0 })}</span>
        </div>
      `;
        }
        const buyAgainCount = this._historyItems.filter((i) => i.buy_again).length;
        const items = this._buyAgainOnly ? this._historyItems.filter((i) => i.buy_again) : this._historyItems;
        return b$1 `
      ${this._renderStorageInfo()}
      <div class="inv-history-filter">
        <button class="inv-btn ${this._buyAgainOnly ? "active" : ""}"
          @click=${() => (this._buyAgainOnly = !this._buyAgainOnly)}
        >${this._t("ui.inventory.buyAgainOnly")} (${buyAgainCount})</button>
      </div>
      <div class="inv-list">
        ${items.length === 0
            ? b$1 `<div class="inv-empty">${this._t("ui.inventory.noBuyAgain")}</div>`
            : A$1}
        ${items.map(item => b$1 `
          <div class="inv-history-item">
            ${item.image_url
            ? b$1 `<img class="inv-thumb" src="${item.image_url}" alt="" loading="lazy" />`
            : b$1 `<div class="inv-dot" style="background:${WINE_TYPE_COLORS[item.type] || "#999"}"></div>`}
            <div class="inv-info">
              <div class="inv-name">
                ${item.buy_again
            ? b$1 `<span class="inv-buy-again" title="${this._t("ui.inventory.buyAgainTitle")}">🛒</span>`
            : A$1}${item.name}
              </div>
              <div class="inv-meta">
                ${item.winery}${item.vintage ? ` · ${item.vintage}` : ""}
                · <span class="inv-reason-badge">${this._formatReason(item.reason)}</span>
              </div>
              ${item.personal_rating
            ? b$1 `<star-rating .value=${item.personal_rating} .size=${14} readonly></star-rating>`
            : A$1}
              ${item.drink_notes ? b$1 `<div class="inv-drink-notes">${item.drink_notes}</div>` : A$1}
            </div>
            <div class="inv-right">
              ${item.price ? b$1 `<div class="inv-price">${this.currency} ${item.price.toFixed(0)}</div>` : A$1}
              <div class="inv-location">${this._formatDate(item.removed_at)}</div>
              <div style="display:flex;flex-direction:column;gap:4px;margin-top:4px;align-items:flex-end">
                <button class="inv-btn" @click=${() => this._startEditHistory(item)}>
                  ${item.drink_notes || item.personal_rating
            ? this._t("ui.inventory.editNotesBtn")
            : this._t("ui.inventory.addNotesBtn")}
                </button>
                <button class="inv-btn" @click=${() => this._restoreFromHistory(item.id)}>${this._t("ui.inventory.restoreBtn")}</button>
              </div>
            </div>
            ${this._editingHistoryId === item.id ? this._renderHistoryEditor(item) : A$1}
          </div>
        `)}
      </div>
      <div class="inv-footer">
        <span class="inv-count">${this._t("ui.inventory.winesRemoved", { n: this._historyItems.length })}</span>
        ${this._statusMsg
            ? b$1 `<div class="inv-status">${this._statusMsg}</div>`
            : A$1}
        <div class="inv-footer-btns">
          <button class="inv-btn" @click=${this._clearHistory}>${this._t("ui.inventory.clearHistoryBtn")}</button>
        </div>
      </div>
    `;
    }
    // Sits under the list: how many bottles are still missing data, and the two
    // actions that can fill it. Each source is labelled with what it actually
    // supplies, so nobody runs AI hoping for food pairings.
    _renderEnrichRow(source, wines, retry, text, label) {
        if (!wines.length)
            return A$1;
        if (source === "ai" && !this.hasGemini)
            return A$1;
        const busy = !!this._enriching;
        return b$1 `
      <div class="inv-enrich-row ${retry ? "retry" : ""}">
        <span class="inv-enrich-text">${text}</span>
        <button
          class="inv-btn"
          ?disabled=${busy}
          @click=${() => {
            this._confirmEnrich = source;
            this._confirmEnrichRetry = retry;
        }}
        >
          ${this._enriching === source ? this._t("ui.inventory.working") : `${label} (${wines.length})`}
        </button>
      </div>
    `;
    }
    _renderEnrichBar() {
        const needVivino = this._winesNeedingVivino();
        const needAI = this._winesNeedingAI();
        const missVivino = this._winesVivinoNotFound();
        const missAI = this._winesAINotFound();
        if (!needVivino.length && !needAI.length && !missVivino.length && !missAI.length) {
            return A$1;
        }
        return b$1 `
      <div class="inv-enrich">
        ${this._renderEnrichRow("vivino", needVivino, false, b$1 `<strong>${needVivino.length}</strong> ${this._t("ui.inventory.enrichMissingVivino")}`, this._t("ui.inventory.fillFromVivino"))}
        ${this._renderEnrichRow("ai", needAI, false, b$1 `<strong>${needAI.length}</strong> ${this._t("ui.inventory.enrichMissingAI")}`, this._t("ui.inventory.analyzeWithAi"))}
        ${this._renderEnrichRow("vivino", missVivino, true, b$1 `<strong>${missVivino.length}</strong> ${this._t("ui.inventory.enrichRetryVivino")}`, this._t("ui.inventory.retryVivino"))}
        ${this._renderEnrichRow("ai", missAI, true, b$1 `<strong>${missAI.length}</strong> ${this._t("ui.inventory.enrichRetryAI")}`, this._t("ui.inventory.retryAI"))}
      </div>
    `;
    }
    _startReview(kind) {
        this._showReview = false;
        this.dispatchEvent(new CustomEvent(kind === "ai" ? "batch-ai-scan" : "batch-vivino-scan"));
    }
    _renderReviewChooser() {
        if (!this._showReview)
            return A$1;
        return b$1 `
      <div class="inv-confirm-overlay" @click=${() => (this._showReview = false)}>
        <div class="inv-confirm-box" @click=${(e) => e.stopPropagation()}>
          <h3>${this._t("ui.inventory.reviewTitle")}</h3>
          <p>${this._t("ui.inventory.reviewIntro")}</p>
          <div class="inv-review-options">
            ${this.hasGemini ? b$1 `
              <button class="inv-review-option" style="background:#1565c0" @click=${() => this._startReview("ai")}>
                <span>${this._t("ui.card.aiBatchScanBtn")}</span>
                <small>${this._t("ui.card.fullAiAnalysisTitle")}</small>
              </button>
            ` : A$1}
            <button class="inv-review-option" style="background:#8e24aa" @click=${() => this._startReview("vivino")}>
              <span>${this._t("ui.card.vivinoBatchScanBtn")}</span>
              <small>${this._t("ui.card.refreshVivinoTitle")}</small>
            </button>
          </div>
          <div class="inv-confirm-btns">
            <button class="inv-confirm-cancel" @click=${() => (this._showReview = false)}>
              ${this._t("ui.common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
    }
    _renderEnrichConfirm() {
        if (!this._confirmEnrich)
            return A$1;
        const source = this._confirmEnrich;
        const retry = this._confirmEnrichRetry;
        const count = retry
            ? source === "vivino"
                ? this._winesVivinoNotFound().length
                : this._winesAINotFound().length
            : source === "vivino"
                ? this._winesNeedingVivino().length
                : this._winesNeedingAI().length;
        return b$1 `
      <div class="inv-confirm-overlay" @click=${() => (this._confirmEnrich = "")}>
        <div class="inv-confirm-box" @click=${(e) => e.stopPropagation()}>
          <h3>
            ${source === "vivino"
            ? retry
                ? this._t("ui.inventory.retryVivinoQ")
                : this._t("ui.inventory.fillFromVivinoQ")
            : retry
                ? this._t("ui.inventory.retryAiQ")
                : this._t("ui.inventory.analyzeWithAiQ")}
          </h3>
          <p>
            ${count > 1
            ? this._t("ui.inventory.enrichConfirmBodyMany", { count })
            : this._t("ui.inventory.enrichConfirmBodyOne", { count })}
          </p>
          <div class="inv-confirm-stats">
            ${retry
            ? this._t("ui.inventory.retryExplain")
            : this._t("ui.inventory.newExplain", { source: source === "vivino" ? this._t("ui.inventory.vivinoCatalogue") : this._t("ui.inventory.whatAiInfer") })}
          </div>
          <div class="inv-confirm-stats">
            ${source === "vivino"
            ? this._t("ui.inventory.vivinoFillsExplain")
            : this._t("ui.inventory.aiFillsExplain")}
          </div>
          <div class="inv-confirm-btns">
            <button class="inv-confirm-cancel" @click=${() => (this._confirmEnrich = "")}>
              ${this._t("ui.common.cancel")}
            </button>
            <button class="inv-confirm-go" @click=${() => this._runEnrich(source, retry)}>
              ${this._t("ui.common.start")}
            </button>
          </div>
        </div>
      </div>
    `;
    }
    _renderStorageInfo() {
        const info = this._storageInfo;
        if (!info)
            return A$1;
        const share = info.total_bytes
            ? Math.round((info.history_bytes / info.total_bytes) * 100)
            : 0;
        const heavy = info.history_bytes > 512 * 1024;
        return b$1 `
      <div class="inv-storage-info ${heavy ? "heavy" : ""}">
        ${this._t("ui.inventory.dbSize", { total: this._formatBytes(info.total_bytes), history: this._formatBytes(info.history_bytes), share, wines: info.wines_count, archived: info.history_count })}
        ${heavy
            ? b$1 `<br /><small>${this._t("ui.inventory.heavyHistoryHint")}</small>`
            : A$1}
      </div>
    `;
    }
    // ── Export CSV ─────────────────────────────────────────────────
    _exportCSV() {
        const wines = this._getFilteredAndSortedWines();
        const headers = [
            "ID",
            "Name", "Winery", "Vintage", "Type", "Region", "Country",
            "Grape Variety", "Rating", "Ratings Count", "Purchase Price",
            "Retail Price", "Purchase Date", "Drink By", "Drink Window",
            "Disposition", "Notes", "Description", "Food Pairings",
            "Alcohol", "Cabinet", "Row", "Col", "Zone", "Depth",
            "User Rating", "Added At",
        ];
        const escapeCSV = (val) => {
            if (val === null || val === undefined)
                return "";
            const str = String(val);
            if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };
        const rows = wines.map((w) => [
            w.id,
            w.name, w.winery, w.vintage, w.type, w.region, w.country,
            w.grape_variety, w.rating, w.ratings_count, w.price,
            w.retail_price, w.purchase_date, w.drink_by, w.drink_window,
            w.disposition, w.notes, w.description, w.food_pairings,
            w.alcohol,
            this.cabinets.find((c) => c.id === w.cabinet_id)?.name || "",
            w.row !== null ? w.row + 1 : "",
            w.col !== null ? w.col + 1 : "",
            w.zone, w.depth, w.user_rating, w.added_at,
        ]
            .map(escapeCSV)
            .join(","));
        // Excel only recognizes a CSV as UTF-8 when it starts with a BOM;
        // without it every accented wine name comes back mangled.
        const csv = "\ufeff" + [headers.join(","), ...rows].join("\n");
        this._downloadFile(csv, `wine-cellar-inventory-${new Date().toISOString().slice(0, 10)}.csv`, "text/csv;charset=utf-8;");
    }
    // ── Backup JSON ───────────────────────────────────────────────
    async _backupJSON() {
        this._backingUp = true;
        this._statusMsg = "";
        try {
            const result = await this.hass.callWS({ type: "wine_cellar/get_backup" });
            const json = JSON.stringify(result, null, 2);
            this._downloadFile(json, `wine-cellar-backup-${new Date().toISOString().slice(0, 10)}.json`, "application/json");
            this._statusMsg = this._t("ui.inventory.backupSaved", { wines: result.wines?.length || 0, cabinets: result.cabinets?.length || 0, buyList: result.buy_list?.length || 0 });
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.backupFailed", { error: this._logStatus("local backup save failed", err) });
        }
        this._backingUp = false;
    }
    // ── Import CSV ────────────────────────────────────────────────
    _triggerImportCSV() {
        const input = this.shadowRoot?.querySelector("#inv-csv-input");
        if (input) {
            input.value = "";
            input.click();
        }
    }
    async _handleImportCSV(e) {
        const file = e.target.files?.[0];
        if (!file)
            return;
        this._statusMsg = "";
        let wines;
        try {
            wines = this._parseCSV(await file.text());
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.importFailed", { error: this._logStatus("CSV parse failed", err) });
            return;
        }
        if (wines.length === 0) {
            this._statusMsg = this._t("ui.inventory.noWinesInCsv");
            return;
        }
        // A CSV exported from here carries each bottle's ID. When those IDs match
        // wines already in the cellar the user almost certainly edited an export
        // (bulk price or drinking-window changes) and wants those bottles
        // updated, not duplicated — so ask instead of silently doubling the cellar.
        const knownIds = new Set(this.wines.map((w) => w.id));
        this._importMatches = wines.filter((w) => w.id && knownIds.has(w.id)).length;
        if (this._importMatches > 0) {
            this._pendingImport = wines;
            this._confirmImport = true;
            return;
        }
        await this._runImport(wines, "add");
    }
    async _runImport(wines, mode) {
        this._confirmImport = false;
        this._pendingImport = null;
        this._importing = true;
        this._statusMsg = "";
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/import_wines",
                wines,
                mode,
            });
            const added = result.imported || 0;
            const updated = result.updated || 0;
            const skipped = result.location_skipped || 0;
            const base = updated
                ? this._t("ui.inventory.importUpdated", { updated, addedPart: added ? this._t("ui.inventory.importAddedPart", { n: added }) : "" })
                : this._t("ui.inventory.importSuccess", { n: added });
            this._statusMsg = skipped
                ? `${base} ${skipped > 1
                    ? this._t("ui.inventory.importSkippedNoteMany", { skipped })
                    : this._t("ui.inventory.importSkippedNoteOne", { skipped })}`
                : base;
            this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.importFailed", { error: this._logStatus("wine import failed", err) });
        }
        this._importing = false;
    }
    _parseCSV(text) {
        const rows = this._parseCSVRows(text.replace(/^\ufeff/, ""));
        if (rows.length < 2)
            return [];
        // Parse header row
        const headers = rows[0].map((h) => h.trim().toLowerCase());
        // Map CSV headers to wine fields
        const fieldMap = {
            name: "name",
            winery: "winery",
            vintage: "vintage",
            type: "type",
            region: "region",
            country: "country",
            "grape variety": "grape_variety",
            grape_variety: "grape_variety",
            rating: "rating",
            "ratings count": "ratings_count",
            ratings_count: "ratings_count",
            "purchase price": "price",
            price: "price",
            "retail price": "retail_price",
            retail_price: "retail_price",
            "purchase date": "purchase_date",
            purchase_date: "purchase_date",
            "drink by": "drink_by",
            drink_by: "drink_by",
            "drink window": "drink_window",
            drink_window: "drink_window",
            disposition: "disposition",
            notes: "notes",
            description: "description",
            "food pairings": "food_pairings",
            food_pairings: "food_pairings",
            alcohol: "alcohol",
            zone: "zone",
            "user rating": "user_rating",
            user_rating: "user_rating",
            barcode: "barcode",
            id: "id",
            depth: "depth",
            cabinet: "cabinet",
            row: "row",
            col: "col",
            "added at": "added_at",
            added_at: "added_at",
        };
        const numericFields = new Set([
            "vintage", "rating", "ratings_count", "price",
            "retail_price", "user_rating", "depth", "row", "col",
        ]);
        const wines = [];
        for (let i = 1; i < rows.length; i++) {
            const values = rows[i];
            if (values.length === 0)
                continue;
            const wine = {};
            for (let j = 0; j < headers.length && j < values.length; j++) {
                const field = fieldMap[headers[j]];
                if (!field)
                    continue;
                let val = values[j].trim();
                if (!val)
                    continue;
                if (numericFields.has(field)) {
                    const num = parseFloat(val);
                    if (!isNaN(num))
                        val = num;
                    else
                        continue;
                }
                wine[field] = val;
            }
            // Validate wine type
            if (wine.type) {
                const validTypes = Object.keys(WINE_TYPE_LABELS);
                const lt = wine.type.toLowerCase();
                if (validTypes.includes(lt)) {
                    wine.type = lt;
                }
                else {
                    wine.type = "red";
                }
            }
            if (wine.name) {
                wines.push(wine);
            }
        }
        return wines;
    }
    // Quote-aware: a comma or newline inside a quoted field (as produced by
    // escapeCSV for multi-line Notes/Description) does not end the field/row.
    _parseCSVRows(text) {
        const rows = [];
        let row = [];
        let field = "";
        let inQuotes = false;
        const endField = () => {
            row.push(field);
            field = "";
        };
        const endRow = () => {
            endField();
            if (row.some((v) => v.trim() !== ""))
                rows.push(row);
            row = [];
        };
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (inQuotes) {
                if (ch === '"') {
                    if (text[i + 1] === '"') {
                        field += '"';
                        i++;
                    }
                    else {
                        inQuotes = false;
                    }
                }
                else {
                    field += ch;
                }
            }
            else if (ch === '"') {
                inQuotes = true;
            }
            else if (ch === ",") {
                endField();
            }
            else if (ch === "\r") ;
            else if (ch === "\n") {
                endRow();
            }
            else {
                field += ch;
            }
        }
        if (field !== "" || row.length > 0)
            endRow();
        return rows;
    }
    // ── Restore JSON ──────────────────────────────────────────────
    _triggerRestore() {
        const input = this.shadowRoot?.querySelector("#inv-json-input");
        if (input) {
            input.value = "";
            input.click();
        }
    }
    async _handleRestoreFile(e) {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            if (!data.wines || !Array.isArray(data.wines)) {
                this._statusMsg = this._t("ui.inventory.invalidBackupWines");
                return;
            }
            if (!data.cabinets || !Array.isArray(data.cabinets)) {
                this._statusMsg = this._t("ui.inventory.invalidBackupCabinets");
                return;
            }
            this._restoreData = data;
            this._confirmRestore = true;
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.invalidJsonFile", { error: this._logStatus("invalid restore JSON", err) });
        }
    }
    async _executeRestore() {
        if (!this._restoreData)
            return;
        this._confirmRestore = false;
        this._restoring = true;
        this._statusMsg = "";
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/restore_backup",
                backup: this._restoreData,
            });
            if (result.error) {
                this._statusMsg = this._t("ui.inventory.restoreFailed", { error: result.error });
            }
            else {
                this._statusMsg = this._t("ui.inventory.restoredCount", { wines: result.wines, cabinets: result.cabinets, buyList: result.buy_list });
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            }
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.restoreFailed", { error: this._logStatus("local restore failed", err) });
        }
        this._restoring = false;
        this._restoreData = null;
    }
    // ── Cloud Sync (Google Drive / file system) ──────────────────
    async _serverBackupSave() {
        this._serverBackingUp = true;
        this._serverBackupLabel = this._t("ui.inventory.savingEllipsis");
        this._statusMsg = "";
        try {
            const result = await this.hass.callWS({ type: "wine_cellar/server_backup_save" });
            if (result && result.error) {
                this._statusMsg = this._t("ui.inventory.serverBackupFailed", { error: result.error });
                this._serverBackupLabel = "";
            }
            else {
                this._statusMsg = this._t("ui.inventory.savedToServer", { wines: result?.wines ?? "?", cabinets: result?.cabinets ?? "?" });
                this._serverBackupLabel = this._t("ui.inventory.savedCheckmark");
                setTimeout(() => { this._serverBackupLabel = ""; }, 4000);
            }
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.serverBackupFailed", { error: this._logStatus("server backup save failed", err) });
            this._serverBackupLabel = "";
        }
        this._serverBackingUp = false;
    }
    async _serverBackupShowRestore() {
        this._showServerRestore = true;
        this._statusMsg = "";
        try {
            const result = await this.hass.callWS({ type: "wine_cellar/server_backup_list" });
            this._serverBackups = result?.backups || [];
            if (typeof result?.keep === "number")
                this._backupKeep = result.keep;
            if (Array.isArray(result?.keep_choices))
                this._backupKeepChoices = result.keep_choices;
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.listBackupsFailed", { error: this._logStatus("server backup list failed", err) });
            this._serverBackups = [];
        }
    }
    _formatBytes(bytes) {
        if (!bytes)
            return "0 KB";
        if (bytes < 1024)
            return `${bytes} B`;
        if (bytes < 1024 * 1024)
            return `${Math.round(bytes / 1024)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    async _setBackupKeep(keep) {
        this._backupKeep = keep;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { server_backup_keep: keep },
            });
            this._statusMsg =
                keep === 0
                    ? this._t("ui.inventory.keepEveryBackup")
                    : this._t("ui.inventory.keepNBackups", { n: keep });
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.retentionSaveFailed", { error: this._logStatus("backup retention save failed", err) });
        }
    }
    async _serverBackupDelete(filename) {
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/server_backup_delete",
                filename,
            });
            if (result?.error) {
                this._statusMsg = this._t("ui.inventory.deleteFailed", { error: result.error });
                return;
            }
            this._serverBackups = this._serverBackups.filter((b) => b.filename !== filename);
            this._statusMsg = this._t("ui.inventory.deletedFile", { filename });
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.deleteFailed", { error: this._logStatus("server backup delete failed", err) });
        }
    }
    async _loadStorageInfo() {
        try {
            this._storageInfo = await this.hass.callWS({ type: "wine_cellar/get_storage_info" });
        }
        catch {
            this._storageInfo = null;
        }
    }
    async _serverBackupRestore(filename) {
        this._showServerRestore = false;
        this._serverRestoring = true;
        this._statusMsg = "";
        try {
            const result = await this.hass.callWS({ type: "wine_cellar/server_backup_restore", filename });
            if (result.error) {
                this._statusMsg = this._t("ui.inventory.restoreFailed", { error: result.error });
            }
            else {
                this._statusMsg = this._t("ui.inventory.restoredFromServer", { wines: result.wines, cabinets: result.cabinets, filename });
                this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
            }
        }
        catch (err) {
            this._statusMsg = this._t("ui.inventory.restoreFailed", { error: this._logStatus("server backup restore failed", err) });
        }
        this._serverRestoring = false;
    }
    // ── Helpers ───────────────────────────────────────────────────
    _downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    _showWineDetail(wine) {
        this._detailWine = wine;
        this._showDetail = true;
    }
    // Parses a number input back to `null` when emptied, so clearing a bound
    // actually removes the filter instead of turning it into 0.
    _numberOrNull(e) {
        const raw = e.target.value.trim();
        if (!raw)
            return null;
        const parsed = Number(raw);
        return Number.isFinite(parsed) ? parsed : null;
    }
    _renderFilterPanel(missingPairings) {
        const foodOptions = this._foodOptions();
        const countryOptions = this._countryOptions();
        const grapeOptions = this._grapeOptions();
        return b$1 `
      <div class="inv-filter-panel">
        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.readyToDrink")}</span>
          <select
            @change=${(e) => {
            this._dispositionFilter = e.target.value;
            this._savePrefs();
        }}
          >
            <option value="all" ?selected=${this._dispositionFilter === "all"}>${this._t("ui.common.any")}</option>
            <option value="D" ?selected=${this._dispositionFilter === "D"}>${this._t("ui.inventory.filterDrinkNow")}</option>
            <option value="H" ?selected=${this._dispositionFilter === "H"}>${this._t("ui.inventory.filterHold")}</option>
            <option value="P" ?selected=${this._dispositionFilter === "P"}>${this._t("ui.inventory.filterPastPeak")}</option>
            <option value="none" ?selected=${this._dispositionFilter === "none"}>
              ${this._t("ui.inventory.filterNotAnalyzed")}
            </option>
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.pairsWith")}</span>
          <select
            @change=${(e) => {
            this._foodFilter = e.target.value;
            this._savePrefs();
        }}
          >
            <option value="all" ?selected=${this._foodFilter === "all"}>${this._t("ui.inventory.anyFood")}</option>
            ${foodOptions.map((f) => b$1 `<option value=${f} ?selected=${this._foodFilter === f}>${this._foodLabel(f)}</option>`)}
          </select>
          ${missingPairings
            ? b$1 `<small class="inv-filter-hint"
                >${missingPairings > 1 ? this._t("ui.inventory.missingPairingsHintMany", { n: missingPairings }) : this._t("ui.inventory.missingPairingsHintOne", { n: missingPairings })}</small
              >`
            : A$1}
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.country")}</span>
          <select
            @change=${(e) => {
            this._countryFilter = e.target.value;
            this._savePrefs();
        }}
          >
            <option value="all" ?selected=${this._countryFilter === "all"}>${this._t("ui.common.any")}</option>
            ${countryOptions.map((c) => b$1 `<option value=${c} ?selected=${this._countryFilter === c}>${c}</option>`)}
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.grape")}</span>
          <select
            @change=${(e) => {
            this._grapeFilter = e.target.value;
            this._savePrefs();
        }}
          >
            <option value="all" ?selected=${this._grapeFilter === "all"}>${this._t("ui.common.any")}</option>
            ${grapeOptions.map((g) => b$1 `<option value=${g} ?selected=${this._grapeFilter === g}>${g}</option>`)}
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.cabinet")}</span>
          <select
            @change=${(e) => {
            this._cabinetFilter = e.target.value;
            this._savePrefs();
        }}
          >
            <option value="all" ?selected=${this._cabinetFilter === "all"}>${this._t("ui.common.any")}</option>
            ${this.cabinets.map((c) => b$1 `<option value=${c.id} ?selected=${this._cabinetFilter === c.id}>
                  ${c.name}
                </option>`)}
            <option value="unassigned" ?selected=${this._cabinetFilter === "unassigned"}>
              ${this._t("wineLocation.unassigned")}
            </option>
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.minRating")}</span>
          <select
            @change=${(e) => {
            this._minRating = Number(e.target.value);
            this._savePrefs();
        }}
          >
            ${[0, 3, 3.5, 4, 4.5].map((r) => b$1 `<option value=${r} ?selected=${this._minRating === r}>
                  ${r === 0 ? this._t("ui.common.any") : `★ ${r}+`}
                </option>`)}
          </select>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.maxPrice")}</span>
          <input
            type="number"
            min="0"
            placeholder="${this._t("ui.common.any")}"
            .value=${this._maxPrice === null ? "" : String(this._maxPrice)}
            @change=${(e) => {
            this._maxPrice = this._numberOrNull(e);
            this._savePrefs();
        }}
          />
          <small class="inv-filter-hint">${this._t("ui.inventory.pricedOnly")}</small>
        </label>

        <label class="inv-filter-field">
          <span>${this._t("ui.inventory.vintage")}</span>
          <div class="inv-filter-range">
            <input
              type="number"
              placeholder="${this._t("ui.inventory.fromPlaceholder")}"
              .value=${this._vintageMin === null ? "" : String(this._vintageMin)}
              @change=${(e) => {
            this._vintageMin = this._numberOrNull(e);
            this._savePrefs();
        }}
            />
            <input
              type="number"
              placeholder="${this._t("ui.inventory.toPlaceholder")}"
              .value=${this._vintageMax === null ? "" : String(this._vintageMax)}
              @change=${(e) => {
            this._vintageMax = this._numberOrNull(e);
            this._savePrefs();
        }}
            />
          </div>
        </label>
      </div>
    `;
    }
    _renderWineItem(wine) {
        const typeColor = WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red;
        const location = getWineLocation(wine, this.cabinets, this.hass?.language).text;
        // Sorting by drink-by is useless if the value stays invisible.
        const drinkBy = drinkByYear(wine);
        const displayPrice = wine.retail_price || wine.price;
        // A retail_price keeps the currency it was actually captured in — show
        // that instead of the globally selected one, or a stale price ends up
        // mislabeled as if it were in the new currency.
        const displayCurrency = wine.retail_price ? (wine.retail_price_currency || this.currency) : this.currency;
        return b$1 `
      <div class="inv-item" @click=${() => this._showWineDetail(wine)}>
        ${wine.image_url
            ? b$1 `<img class="inv-thumb" src="${wine.image_url}" alt="" loading="lazy" />`
            : b$1 `<div class="inv-dot" style="background: ${typeColor}"></div>`}
        <div class="inv-info">
          <div class="inv-name">${wine.name}</div>
          <div class="inv-meta">
            ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}${wine.rating
            ? ` · ★${wine.rating.toFixed(1)}`
            : ""}${wine.disposition
            ? b$1 ` ·
                  <span
                    style="color: ${wine.disposition === "D"
                ? "#2e7d32"
                : wine.disposition === "H"
                    ? "#1565c0"
                    : wine.disposition === "P"
                        ? "#c62828"
                        : "inherit"}"
                    >${wine.disposition === "D"
                ? this._t("ui.disposition.drink")
                : wine.disposition === "H"
                    ? this._t("ui.disposition.hold")
                    : wine.disposition === "P"
                        ? this._t("ui.disposition.pastPeak")
                        : ""}</span
                  >`
            : A$1}${drinkBy
            ? b$1 ` · <span class="inv-drink-by">${this._t("ui.inventory.byYear", { year: drinkBy })}</span>`
            : A$1}
          </div>
        </div>
        <div class="inv-right">
          ${displayPrice ? b$1 `<div class="inv-price">${displayCurrency} ${displayPrice.toFixed(0)}</div>` : A$1}
          <div class="inv-location">${location}</div>
        </div>
      </div>
    `;
    }
    render() {
        if (!this.open)
            return A$1;
        const filteredWines = this._getFilteredAndSortedWines();
        const activeFilters = this._activeFilterCount();
        const narrowed = activeFilters > 0 || !!this._searchQuery;
        // With a filter on, cellar-wide totals are the wrong answer: the point of
        // narrowing is to know what the *selection* holds and what it is worth.
        const allStats = this._computeStats(narrowed ? filteredWines : this.wines);
        const missingPairings = this._winesWithoutPairings();
        const sortOptions = [
            { value: "name", label: this._t("ui.inventory.sort.name") },
            { value: "winery", label: this._t("ui.inventory.sort.winery") },
            { value: "vintage", label: this._t("ui.inventory.sort.vintage") },
            { value: "type", label: this._t("ui.inventory.sort.type") },
            { value: "rating", label: this._t("ui.inventory.sort.rating") },
            { value: "user_rating", label: this._t("ui.inventory.sort.myRating") },
            { value: "price", label: this._t("ui.inventory.sort.price") },
            { value: "drink_by", label: this._t("ui.inventory.sort.drinkBy") },
            { value: "urgency", label: this._t("ui.inventory.sort.urgency") },
            { value: "purchase_date", label: this._t("ui.inventory.sort.purchaseDate") },
            { value: "added_at", label: this._t("ui.inventory.sort.dateAdded") },
            { value: "cabinet", label: this._t("ui.inventory.sort.cabinet") },
        ];
        const presets = [
            { id: "all", label: this._t("ui.inventory.preset.allLabel"), hint: this._t("ui.inventory.preset.allHint") },
            {
                id: "drink_this_year",
                label: this._t("ui.inventory.preset.drinkThisYearLabel"),
                hint: this._t("ui.inventory.preset.drinkThisYearHint", { year: new Date().getFullYear() }),
            },
            { id: "past_peak", label: this._t("ui.inventory.preset.pastPeakLabel"), hint: this._t("ui.inventory.preset.pastPeakHint") },
            { id: "unrated", label: this._t("ui.inventory.preset.unratedLabel"), hint: this._t("ui.inventory.preset.unratedHint") },
            {
                id: "incomplete",
                label: this._t("ui.inventory.preset.incompleteLabel"),
                hint: this._t("ui.inventory.preset.incompleteHint"),
            },
            { id: "recent", label: this._t("ui.inventory.preset.recentLabel"), hint: this._t("ui.inventory.preset.recentHint") },
        ];
        const filters = [
            { id: "all", label: this._t("ui.inventory.preset.allLabel") },
            { id: "red", label: this._t("wineType.red") },
            { id: "white", label: this._t("wineType.white") },
            { id: "rosé", label: this._t("wineType.rosé") },
            { id: "sparkling", label: this._t("wineType.sparkling") },
            { id: "dessert", label: this._t("wineType.dessert") },
            ...(this.enableWhisky ? [{ id: "whisky", label: this._t("wineType.whisky") }] : []),
        ];
        const busy = this._importing || this._restoring || this._backingUp || this._serverBackingUp || this._serverRestoring;
        return b$1 `
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="max-width:800px;position:relative" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(this._close, this._t('ui.common.close'))}
          <!-- Header -->
          <div class="inv-header">
            <span class="inv-header-title">${this._t("ui.inventory.title")}</span>
            <div class="inv-header-actions">
              <button
                class="inv-review-btn"
                @click=${() => (this._showReview = true)}
                ?disabled=${this.analyzing || this.batchVivino}
              >
                ${this.analyzing
            ? this._t("ui.card.aiScanning")
            : this.batchVivino
                ? this._t("ui.card.vivinoScanning")
                : this._t("ui.inventory.reviewBtn")}
              </button>
            </div>
          </div>

          <!-- Inventory / History Toggle -->
          <div class="inv-toggle">
            <button
              class="${this._viewMode === "inventory" ? "active" : ""}"
              @click=${() => { this._viewMode = "inventory"; }}
            >${this._t("ui.inventory.tabInventory")}</button>
            <button
              class="${this._viewMode === "history" ? "active" : ""}"
              @click=${() => this._switchToHistory()}
            >${this._t("ui.inventory.tabHistory")}</button>
          </div>

          ${this._viewMode === "history" ? this._renderHistory() : b$1 `
          <!-- Summary Stats -->
          <div class="inv-stats">
            <div class="stat">
              <span class="stat-value">${allStats.count}</span>
              ${narrowed ? this._t("ui.inventory.ofNBottles", { n: this.wines.length }) : this._t("ui.card.statBottles")}
            </div>
            ${allStats.totalValue
            ? b$1 `
                  <div class="stat">
                    <span class="stat-value"
                      >${this.currency} ${allStats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span
                    >
                    ${this._t("ui.inventory.estValue")}
                  </div>
                `
            : A$1}
            ${Object.entries(allStats.byType).map(([type, count]) => b$1 `
                <div class="stat">
                  <span
                    class="inv-type-dot-sm"
                    style="background:${WINE_TYPE_COLORS[type] || "#999"}"
                  ></span>
                  <span class="stat-value">${count}</span>
                  ${getWineTypeLabels(this.hass?.language)[type] || type}
                </div>
              `)}
          </div>

          <!-- Search + Sort -->
          <div class="inv-controls">
            <div class="inv-search-wrapper">
              <span class="inv-search-icon">🔍</span>
              <input
                type="text"
                placeholder="${this._t('ui.inventory.searchPlaceholder')}"
                .value=${this._searchQuery}
                @input=${(e) => {
            this._searchQuery = e.target.value;
        }}
              />
            </div>
            <div class="inv-sort">
              <select
                @change=${(e) => {
            this._sortField = e.target.value;
            this._savePrefs();
        }}
              >
                ${sortOptions.map((o) => b$1 `<option value=${o.value} ?selected=${this._sortField === o.value}>
                      ${o.label}
                    </option>`)}
              </select>
              <button
                class="inv-sort-dir"
                @click=${() => {
            this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
            this._savePrefs();
        }}
                title="${this._sortDir === "asc" ? this._t('ui.inventory.ascending') : this._t('ui.inventory.descending')}"
              >
                ${this._sortDir === "asc" ? "↑" : "↓"}
              </button>
              <button
                class="inv-filter-toggle ${activeFilters ? "active" : ""}"
                @click=${() => {
            this._showFilters = !this._showFilters;
        }}
                title="${this._t('ui.inventory.moreFiltersTitle')}"
              >
                ${this._t('ui.inventory.filtersBtn')}${activeFilters
            ? b$1 `<span class="inv-filter-badge">${activeFilters}</span>`
            : A$1}
              </button>
            </div>
          </div>

          <!-- Quick views -->
          <div class="inv-chips">
            ${presets.map((p) => b$1 `
                <button
                  class="inv-chip preset ${this._preset === p.id ? "active" : ""}"
                  title=${p.hint}
                  @click=${() => {
            this._preset = p.id;
            this._savePrefs();
        }}
                >
                  ${p.label}
                </button>
              `)}
          </div>

          <!-- Type Filter Chips -->
          <div class="inv-chips">
            ${filters.map((f) => b$1 `
                <button
                  class="type-chip ${f.id === "all" ? "all" : ""} ${this._typeFilter === f.id ? "active" : ""}"
                  style=${typeChipStyle(f.id)}
                  @click=${() => {
            this._typeFilter = f.id;
            this._savePrefs();
        }}
                >
                  ${f.label}
                </button>
              `)}
          </div>

          ${this._showFilters ? this._renderFilterPanel(missingPairings) : A$1}

          ${this.pairingMode && this._foodFilter !== "all"
            ? b$1 `
                <div class="inv-pairing-banner">
                  <span>${FOOD_ICONS[this._foodFilter] ?? "🍽️"} ${this._t("ui.inventory.pairingBanner", { food: this._foodLabel(this._foodFilter) })}</span>
                  <button class="inv-clear-filters" @click=${() => (this._showPairingPicker = true)}>
                    ${this._t("ui.inventory.pairingChange")}
                  </button>
                </div>
              `
            : A$1}

          ${narrowed
            ? b$1 `
                <div class="inv-active-filters">
                  <span
                    >${this._t("ui.inventory.winesShown", { shown: filteredWines.length, total: this.wines.length })}${activeFilters
                ? this._t("ui.inventory.filtersActive", { n: activeFilters, plural: activeFilters > 1 ? "s" : "" })
                : ""}</span
                  >
                  <button class="inv-clear-filters" @click=${this._clearFilters}>
                    ${this._t("ui.inventory.clearAll")}
                  </button>
                </div>
              `
            : A$1}

          ${this._renderEnrichBar()}

          <!-- Wine List -->
          <div class="inv-list">
            ${filteredWines.length === 0
            ? b$1 `<div class="inv-empty">${this._t("ui.card.noSearchResults")}</div>`
            : filteredWines.map((w) => this._renderWineItem(w))}
          </div>

          <!-- Footer -->
          <div class="inv-footer">
            <span class="inv-count">
              ${filteredWines.length === this.wines.length
            ? this._t("ui.inventory.footerCountAll", { n: filteredWines.length })
            : this._t("ui.inventory.footerCountFiltered", { shown: filteredWines.length, total: this.wines.length })}
            </span>
            ${this._statusMsg
            ? b$1 `<div class="inv-status">${this._statusMsg}</div>`
            : A$1}
            <div class="inv-footer-btns">
              <button
                class="inv-btn"
                @click=${this._serverBackupSave}
                ?disabled=${busy}
                title="${this._t('ui.inventory.saveServerBackupTitle')}"
              >
                ${this._serverBackupLabel || this._t("ui.inventory.serverBackupBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._serverBackupShowRestore}
                ?disabled=${busy}
                title="${this._t('ui.inventory.restoreServerBackupTitle')}"
              >
                ${this._serverRestoring ? this._t("ui.inventory.restoringEllipsis") : this._t("ui.inventory.serverRestoreBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._backupJSON}
                ?disabled=${busy}
                title="${this._t('ui.inventory.downloadBackupTitle')}"
              >
                ${this._backingUp ? this._t("ui.inventory.savingEllipsis") : this._t("ui.inventory.downloadBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._triggerRestore}
                ?disabled=${busy}
                title="${this._t('ui.inventory.restoreFromFileTitle')}"
              >
                ${this._restoring ? this._t("ui.inventory.restoringEllipsis") : this._t("ui.inventory.uploadBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._triggerImportCSV}
                ?disabled=${busy}
                title="${this._t('ui.inventory.importCsvTitle')}"
              >
                ${this._importing ? this._t("ui.inventory.importingEllipsis") : this._t("ui.inventory.importCsvBtn")}
              </button>
              <button
                class="inv-btn"
                @click=${this._exportCSV}
                ?disabled=${busy}
                title="${this._t('ui.inventory.exportCsvTitle')}"
              >
                ${this._t("ui.inventory.exportCsvBtn")}
              </button>
            </div>
          </div>

          `}

          <!-- Hidden file inputs -->
          <input
            type="file"
            id="inv-csv-input"
            accept=".csv"
            style="display:none"
            @change=${this._handleImportCSV}
          />
          <input
            type="file"
            id="inv-json-input"
            accept=".json"
            style="display:none"
            @change=${this._handleRestoreFile}
          />

          <!-- Server Restore Picker Overlay -->
          ${this._showServerRestore
            ? b$1 `
                <div class="inv-confirm-overlay" @click=${() => (this._showServerRestore = false)}>
                  <div class="inv-confirm-box" style="max-width:420px" @click=${(e) => e.stopPropagation()}>
                    <h3>${this._t("ui.inventory.serverBackupsTitle")}</h3>
                    <label class="inv-keep-row">
                      <span>${this._t("ui.inventory.keepTheLast")}</span>
                      <select
                        @change=${(e) => this._setBackupKeep(Number(e.target.value))}
                      >
                        ${this._backupKeepChoices.map((n) => b$1 `<option value=${n} ?selected=${this._backupKeep === n}>
                            ${n === 0 ? this._t("ui.inventory.allNeverDelete") : this._t("ui.inventory.nBackups", { n })}
                          </option>`)}
                      </select>
                    </label>
                    ${this._serverBackups.length === 0
                ? b$1 `<p>${this._t("ui.inventory.noServerBackups")}</p>`
                : b$1 `
                        <p>
                          ${this._t("ui.inventory.selectBackupToRestore1")} <strong>${this._t("ui.common.replace")}</strong>
                          ${this._t("ui.inventory.selectBackupToRestore2", { n: this._serverBackups.length, size: this._formatBytes(this._serverBackups.reduce((t, b) => t + (b.size || 0), 0)) })}
                        </p>
                        <div class="inv-backup-list">
                          ${this._serverBackups.map((b) => b$1 `
                              <div class="inv-backup-row">
                                <button
                                  class="inv-btn inv-backup-pick"
                                  @click=${() => this._serverBackupRestore(b.filename)}
                                >
                                  <div>${b.timestamp ? new Date(b.timestamp).toLocaleString() : b.filename}</div>
                                  <div class="inv-backup-meta">
                                    ${b.error
                    ? this._t("ui.inventory.unreadableFile")
                    : this._t("ui.inventory.backupMeta", { wines: b.wines, cabinets: b.cabinets, size: this._formatBytes(b.size || 0) })}
                                  </div>
                                </button>
                                <button
                                  class="inv-backup-del"
                                  title="${this._t('ui.inventory.deleteThisBackup')}"
                                  @click=${() => this._serverBackupDelete(b.filename)}
                                >
                                  🗑
                                </button>
                              </div>
                            `)}
                        </div>
                      `}
                    <div class="inv-confirm-btns">
                      <button class="inv-confirm-cancel" @click=${() => (this._showServerRestore = false)}>
                        ${this._t("ui.common.close")}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : A$1}

          ${this._renderEnrichConfirm()}
          ${this._renderReviewChooser()}
          ${this._renderPairingPicker()}

          <!-- CSV Import Mode Overlay -->
          ${this._confirmImport && this._pendingImport
            ? b$1 `
                <div class="inv-confirm-overlay" @click=${() => (this._confirmImport = false)}>
                  <div class="inv-confirm-box" @click=${(e) => e.stopPropagation()}>
                    <h3>${this._t("ui.inventory.updateExistingQ")}</h3>
                    <p>
                      ${this._t("ui.inventory.csvEditedExportNote")}
                    </p>
                    <div class="inv-confirm-stats">
                      <strong>${this._importMatches}</strong> ${this._t("ui.inventory.rowsMatchExisting", { plural: this._importMatches > 1 ? "s" : "" })} ·
                      <strong>${this._pendingImport.length - this._importMatches}</strong> ${this._t("ui.common.new", { plural: this._pendingImport.length - this._importMatches > 1 ? "x" : "" })}
                      <br />
                      <small>
                        ${this._t("ui.inventory.updateOnlyTouchesNote")}
                      </small>
                    </div>
                    <div class="inv-confirm-btns">
                      <button
                        class="inv-confirm-cancel"
                        @click=${() => this._runImport(this._pendingImport, "add")}
                      >
                        ${this._t("ui.inventory.addAllAsNew")}
                      </button>
                      <button
                        class="inv-confirm-go"
                        @click=${() => this._runImport(this._pendingImport, "update")}
                      >
                        ${this._t("ui.inventory.updateNWines", { n: this._importMatches, plural: this._importMatches > 1 ? "s" : "" })}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : A$1}

          <!-- Restore Confirmation Overlay -->
          ${this._confirmRestore && this._restoreData
            ? b$1 `
                <div class="inv-confirm-overlay" @click=${() => (this._confirmRestore = false)}>
                  <div class="inv-confirm-box" @click=${(e) => e.stopPropagation()}>
                    <h3>${this._t("ui.inventory.restoreBackupQ")}</h3>
                    <p>
                      ${this._t("ui.inventory.restoreWillReplaceNote")}
                    </p>
                    <div class="inv-confirm-stats">
                      ${this._t("ui.inventory.backupContains")}<br />
                      <strong>${this._restoreData.wines?.length || 0}</strong> ${this._t("ui.inventory.winesWord")} ·
                      <strong>${this._restoreData.cabinets?.length || 0}</strong> ${this._t("ui.inventory.racksWord")} ·
                      <strong>${this._restoreData.buy_list?.length || 0}</strong> ${this._t("ui.inventory.buyListItemsWord")}
                      ${this._restoreData.timestamp
                ? b$1 `<br /><small>${this._t("ui.inventory.createdLabel", { date: new Date(this._restoreData.timestamp).toLocaleString() })}</small>`
                : A$1}
                    </div>
                    <div class="inv-confirm-btns">
                      <button class="inv-confirm-cancel" @click=${() => (this._confirmRestore = false)}>
                        ${this._t("ui.common.cancel")}
                      </button>
                      <button class="inv-confirm-go" @click=${this._executeRestore}>
                        ${this._t("ui.inventory.restoreNowBtn")}
                      </button>
                    </div>
                  </div>
                </div>
              `
            : A$1}
        </div>
      </div>

      <!-- Sub-dialog: Wine Detail -->
      <wine-detail-dialog
        .wine=${this._detailWine}
        .hass=${this.hass}
        .cabinets=${this.cabinets}
        .open=${this._showDetail}
        .hasGemini=${this.hasGemini}
        .mode=${"cellar"}
        @close=${() => (this._showDetail = false)}
        @wine-updated=${() => {
            this.dispatchEvent(new CustomEvent("wine-updated", { bubbles: true, composed: true }));
        }}
        @locate-wine=${(e) => {
            this._showDetail = false;
            this.dispatchEvent(new CustomEvent("locate-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
        @copy-wine=${(e) => {
            this._showDetail = false;
            this.dispatchEvent(new CustomEvent("copy-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
        @move-wine=${(e) => {
            this._showDetail = false;
            this.dispatchEvent(new CustomEvent("move-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
        @remove-wine=${(e) => {
            this._showDetail = false;
            this.dispatchEvent(new CustomEvent("remove-wine", { detail: e.detail, bubbles: true, composed: true }));
        }}
      ></wine-detail-dialog>
    `;
    }
};
InventoryDialog.styles = [
    sharedStyles,
    typeChipStyles,
    i$4 `
      .inv-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 36px;
        padding: 12px 60px 8px 20px;
      }

      .inv-header-title {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--wc-text);
      }



      .inv-header-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .inv-review-btn {
        background: #37474f;
        color: #fff;
        border: none;
        border-radius: 16px;
        padding: 5px 12px;
        font-size: 0.8em;
        cursor: pointer;
      }

      .inv-review-btn:disabled {
        opacity: 0.6;
        cursor: default;
      }

      .inv-review-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }

      .inv-review-option {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: none;
        border-radius: 10px;
        padding: 10px 14px;
        color: #fff;
        cursor: pointer;
        text-align: left;
        font-size: 0.9em;
        font-weight: 500;
      }

      .inv-pairing-box {
        max-width: 520px;
        max-height: 85%;
        overflow-y: auto;
      }

      .inv-pairing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
        margin-bottom: 12px;
      }

      .inv-pairing-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 10px 6px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        background: var(--wc-hover);
        color: var(--wc-text);
        cursor: pointer;
        font-size: 0.8em;
      }

      .inv-pairing-option:hover {
        border-color: var(--wc-accent, #722f37);
      }

      .inv-pairing-icon {
        font-size: 1.8em;
        line-height: 1.2;
      }

      .inv-pairing-label {
        font-weight: 500;
        text-align: center;
      }

      .inv-pairing-option small {
        color: var(--wc-text-secondary);
      }

      .inv-pairing-missing {
        display: block;
        margin-bottom: 12px;
        color: var(--wc-text-secondary);
      }

      .inv-pairing-banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin: 0 16px 8px;
        padding: 8px 12px;
        border-radius: 10px;
        background: var(--wc-hover);
        font-size: 0.9em;
        font-weight: 500;
        color: var(--wc-text);
      }

      .inv-review-option small {
        font-size: 0.8em;
        font-weight: 400;
        opacity: 0.85;
      }

      .inv-stats {
        display: flex;
        gap: 16px;
        padding: 4px 20px 10px;
        flex-wrap: wrap;
        font-size: 0.82em;
        color: var(--wc-text-secondary);
      }

      .inv-stats .stat {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .inv-stats .stat-value {
        font-weight: 600;
        color: var(--wc-text);
      }

      .inv-type-dot-sm {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 2px;
      }

      .inv-controls {
        display: flex;
        gap: 8px;
        padding: 0 16px 8px;
        align-items: center;
        flex-wrap: wrap;
      }

      .inv-search-wrapper {
        flex: 1;
        min-width: 140px;
        position: relative;
      }

      .inv-search-wrapper input {
        width: 100%;
        padding: 8px 12px 8px 30px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        font-size: 0.88em;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        box-sizing: border-box;
      }

      .inv-search-wrapper input:focus {
        outline: none;
        border-color: var(--wc-primary);
      }

      .inv-search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.85em;
        pointer-events: none;
      }

      /* Sort, direction and Filters stay on the right, also when the row
         wraps under the search box. */
      .inv-sort {
        display: flex;
        gap: 4px;
        align-items: center;
        margin-left: auto;
      }

      /* One height for the whole sort row. The select drops its native
         appearance because Safari otherwise ignores height on it. */
      .inv-sort select,
      .inv-sort-dir,
      .inv-filter-toggle {
        box-sizing: border-box;
        height: 32px;
      }

      .inv-sort select {
        -webkit-appearance: none;
        appearance: none;
        padding: 0 26px 0 12px;
        border: 1px solid var(--wc-border);
        border-radius: 14px;
        background: var(--wc-field-bg)
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
          no-repeat right 10px center;
        color: var(--wc-text);
        font-size: 0.8em;
        cursor: pointer;
      }

      .inv-sort-dir {
        background: none;
        border: 1px solid var(--wc-border);
        border-radius: 14px;
        padding: 0 9px;
        cursor: pointer;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        line-height: 1;
      }

      .inv-sort-dir:hover {
        background: var(--wc-hover);
      }

      .inv-filter-toggle {
        background: none;
        border: 1px solid var(--wc-border);
        border-radius: 14px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        line-height: 1;
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
      }

      .inv-filter-toggle:hover {
        background: var(--wc-hover);
      }

      .inv-filter-toggle.active {
        border-color: var(--wc-primary);
        color: var(--wc-primary);
      }

      .inv-filter-badge {
        background: var(--wc-primary);
        color: #fff;
        border-radius: 9px;
        padding: 1px 6px;
        font-size: 0.85em;
        font-weight: 600;
      }

      .inv-filter-panel {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px 12px;
        padding: 12px 16px;
        margin: 0 16px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        background: var(--wc-field-bg);
      }

      .inv-filter-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .inv-filter-field select,
      .inv-filter-field input {
        padding: 6px 8px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        font-size: 1.05em;
        width: 100%;
        box-sizing: border-box;
      }

      .inv-filter-field select:focus,
      .inv-filter-field input:focus {
        outline: none;
        border-color: var(--wc-primary);
      }

      .inv-filter-range {
        display: flex;
        gap: 6px;
      }

      .inv-filter-hint {
        font-size: 0.9em;
        opacity: 0.75;
        line-height: 1.3;
      }

      .inv-active-filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin: 0 16px 10px;
        padding: 6px 10px;
        border-radius: 8px;
        background: rgba(114, 47, 55, 0.08);
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .inv-clear-filters {
        background: none;
        border: none;
        color: var(--wc-primary);
        cursor: pointer;
        font-size: 1em;
        font-weight: 600;
        padding: 2px 4px;
        white-space: nowrap;
      }

      .inv-clear-filters:hover {
        text-decoration: underline;
      }

      .inv-drink-by {
        opacity: 0.8;
      }

      .inv-enrich {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 0 16px 10px;
        padding: 8px 10px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        font-size: 0.75em;
        color: var(--wc-text-secondary);
      }

      .inv-enrich-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
      }

      .inv-enrich-row.retry {
        opacity: 0.75;
        border-top: 1px solid var(--wc-border);
        padding-top: 6px;
      }

      .inv-enrich-text {
        line-height: 1.4;
      }

      .inv-enrich-text strong {
        color: var(--wc-text);
      }

      .inv-enrich-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .inv-storage-info {
        margin: 0 16px 8px;
        padding: 6px 10px;
        border-radius: 8px;
        background: var(--wc-field-bg);
        border: 1px solid var(--wc-border);
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
      }

      .inv-storage-info.heavy {
        border-color: #c98a00;
      }

      .inv-keep-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .inv-keep-row select {
        padding: 5px 8px;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        background: var(--wc-field-bg);
        color: var(--wc-text);
        font-size: 1em;
        cursor: pointer;
      }

      .inv-backup-list {
        max-height: 250px;
        overflow-y: auto;
        margin: 8px 0;
      }

      .inv-backup-row {
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
      }

      .inv-backup-pick {
        flex: 1;
        text-align: left;
        font-size: 0.82em;
        padding: 8px 12px;
      }

      .inv-backup-meta {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
      }

      .inv-backup-del {
        background: none;
        border: 1px solid var(--wc-border);
        border-radius: 8px;
        color: var(--wc-text-secondary);
        cursor: pointer;
        padding: 0 10px;
        font-size: 0.9em;
      }

      .inv-backup-del:hover {
        border-color: #c62828;
        color: #c62828;
      }

      .inv-chips {
        display: flex;
        justify-content: flex-end;
        gap: 6px;
        padding: 0 16px 10px;
        flex-wrap: wrap;
      }

      .inv-chip.preset.active {
        background: var(--wc-text-secondary);
        border-color: var(--wc-text-secondary);
      }

      .inv-chip {
        padding: 4px 10px;
        border-radius: 14px;
        border: 1px solid var(--wc-border);
        background: var(--wc-field-bg);
        box-shadow: var(--wc-sheen);
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.75em;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .inv-chip:hover {
        background: var(--wc-hover);
        color: var(--wc-text);
      }

      .inv-chip.active {
        background: var(--wc-primary-grad);
        color: #fff;
        border-color: transparent;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 10px rgba(114, 47, 55, 0.3);
      }

      .inv-list {
        max-height: 55vh;
        overflow-y: auto;
        padding: 0 16px 8px;
      }

      .inv-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--wc-border);
        cursor: pointer;
        transition: background 0.15s;
      }

      .inv-item:hover {
        background: var(--wc-hover);
      }

      .inv-item:last-child {
        border-bottom: none;
      }

      .inv-thumb {
        width: 48px;
        height: 66px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .inv-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .inv-info {
        flex: 1;
        min-width: 0;
      }

      .inv-name {
        font-weight: 600;
        font-size: 0.88em;
        color: var(--wc-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .inv-meta {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-top: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .inv-right {
        text-align: right;
        flex-shrink: 0;
        min-width: 60px;
      }

      .inv-price {
        font-weight: 600;
        font-size: 0.85em;
        color: var(--wc-text);
      }

      .inv-location {
        font-size: 0.72em;
        color: var(--wc-text-secondary);
      }

      .inv-empty {
        text-align: center;
        padding: 40px 20px;
        color: var(--wc-text-secondary);
        font-size: 0.9em;
      }

      .inv-footer {
        display: flex;
        gap: 8px;
        padding: 10px 16px 16px;
        border-top: 1px solid var(--wc-border);
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .inv-count {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .inv-footer-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .inv-btn {
        font-size: 0.76em;
        padding: 5px 12px;
        border-radius: 16px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s;
      }

      .inv-btn:hover {
        background: var(--wc-hover);
        border-color: var(--wc-text-secondary);
      }

      .inv-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .inv-status {
        width: 100%;
        text-align: center;
        font-size: 0.78em;
        padding: 4px 0 0;
        color: #2e7d32;
        font-weight: 500;
      }

      /* Restore confirm overlay */
      .inv-confirm-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: 16px;
      }

      .inv-confirm-box {
        background: var(--wc-bg);
        border-radius: 12px;
        padding: 24px;
        max-width: 380px;
        width: 90%;
        text-align: center;
      }

      .inv-confirm-box h3 {
        margin: 0 0 8px;
        font-size: 1em;
        color: var(--wc-text);
      }

      .inv-confirm-box p {
        margin: 0 0 16px;
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        line-height: 1.4;
      }

      .inv-confirm-stats {
        font-size: 0.82em;
        color: var(--wc-text);
        margin: 0 0 16px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
      }

      .inv-confirm-btns {
        display: flex;
        gap: 8px;
        justify-content: center;
      }

      .inv-confirm-btns button {
        padding: 8px 20px;
        border-radius: 20px;
        border: none;
        font-size: 0.85em;
        cursor: pointer;
        font-weight: 500;
      }

      .inv-confirm-cancel {
        background: var(--wc-hover);
        color: var(--wc-text);
      }

      .inv-confirm-go {
        background: #e65100;
        color: #fff;
      }

      .inv-toggle {
        display: flex;
        margin: 0 16px 8px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        overflow: hidden;
      }

      .inv-toggle button {
        flex: 1;
        padding: 6px 0;
        border: none;
        background: transparent;
        color: var(--wc-text-secondary);
        font-size: 0.82em;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .inv-toggle button.active {
        background: var(--wc-primary);
        color: #fff;
      }

      .inv-history-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--wc-border);
      }

      .inv-history-item:last-child {
        border-bottom: none;
      }

      .inv-history-item {
        flex-wrap: wrap;
      }

      .inv-buy-again {
        margin-right: 4px;
        cursor: help;
      }

      .inv-drink-notes {
        font-size: 0.78em;
        font-style: italic;
        color: var(--wc-text-secondary);
        margin-top: 3px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: pre-line;
      }

      .inv-history-editor {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 0 2px;
      }

      .inv-history-editor textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text);
        font: inherit;
        font-size: 0.85em;
        resize: vertical;
      }

      .inv-history-editor label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85em;
        color: var(--wc-text);
        cursor: pointer;
      }

      .inv-history-editor .inv-editor-btns {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      .inv-history-filter {
        display: flex;
        justify-content: flex-end;
        padding: 8px 12px 0;
      }

      .inv-btn.active {
        background: var(--wc-primary);
        border-color: var(--wc-primary);
        color: #fff;
      }

      .inv-reason-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 0.72em;
        font-weight: 500;
        background: rgba(114, 47, 55, 0.12);
        color: var(--wc-primary);
      }

      @media (max-width: 599px) {
        .inv-controls {
          flex-direction: column;
          gap: 6px;
        }
        .inv-search-wrapper {
          width: 100%;
        }
        .inv-sort {
          align-self: flex-end;
        }
        .inv-stats {
          gap: 8px;
          font-size: 0.78em;
          padding: 4px 16px 8px;
        }
        .inv-list {
          max-height: 60vh;
        }
        .inv-footer {
          justify-content: center;
        }
        .inv-footer-btns {
          justify-content: center;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ type: Boolean })
], InventoryDialog.prototype, "open", void 0);
__decorate([
    n$1({ attribute: false })
], InventoryDialog.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], InventoryDialog.prototype, "wines", void 0);
__decorate([
    n$1({ attribute: false })
], InventoryDialog.prototype, "cabinets", void 0);
__decorate([
    n$1({ type: Boolean })
], InventoryDialog.prototype, "hasGemini", void 0);
__decorate([
    n$1({ type: Boolean })
], InventoryDialog.prototype, "enableWhisky", void 0);
__decorate([
    n$1({ type: String })
], InventoryDialog.prototype, "currency", void 0);
__decorate([
    n$1({ type: Boolean })
], InventoryDialog.prototype, "analyzing", void 0);
__decorate([
    n$1({ type: Boolean })
], InventoryDialog.prototype, "batchVivino", void 0);
__decorate([
    n$1({ type: Boolean })
], InventoryDialog.prototype, "pairingMode", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_showPairingPicker", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_searchQuery", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_typeFilter", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_dispositionFilter", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_countryFilter", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_grapeFilter", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_foodFilter", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_cabinetFilter", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_minRating", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_maxPrice", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_vintageMin", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_vintageMax", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_preset", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_showFilters", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_sortField", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_sortDir", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_detailWine", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_showDetail", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_backingUp", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_importing", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_restoring", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_confirmRestore", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_restoreData", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_confirmImport", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_pendingImport", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_importMatches", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_statusMsg", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_serverBackingUp", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_serverBackupLabel", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_showServerRestore", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_serverBackups", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_serverRestoring", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_backupKeep", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_backupKeepChoices", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_storageInfo", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_enriching", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_confirmEnrich", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_confirmEnrichRetry", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_showReview", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_viewMode", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_historyItems", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_historyLoading", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_buyAgainOnly", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_editingHistoryId", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_editRating", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_editNotes", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_editBuyAgain", void 0);
__decorate([
    r$1()
], InventoryDialog.prototype, "_historySaving", void 0);
InventoryDialog = __decorate([
    t$2("inventory-dialog")
], InventoryDialog);

let VivinoAiSettingsDialog = class VivinoAiSettingsDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.open = false;
        this.aiFallbackAlways = false;
        this.enableWhisky = false;
        this.defaultWineType = "red";
        this.dispositionDisplay = "letter";
        this.metadataLanguage = "en";
        this.supportedLanguages = ["en", "fr", "de"];
        this.metadataCurrency = "USD";
        this.supportedCurrencies = ["USD", "EUR", "GBP", "CHF"];
        this.cardBackground = null;
    }
    // Shorthand for t(key, this.hass?.language, params) — see wine-cellar-card.ts.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    _close() {
        this.dispatchEvent(new CustomEvent("close"));
    }
    _setFallback(value) {
        this.dispatchEvent(new CustomEvent("set-ai-fallback-always", { detail: { value } }));
    }
    _setEnableWhisky(value) {
        this.dispatchEvent(new CustomEvent("set-enable-whisky", { detail: { value } }));
    }
    _setDefaultWineType(value) {
        this.dispatchEvent(new CustomEvent("set-default-wine-type", { detail: { value } }));
    }
    _setDispositionDisplay(value) {
        this.dispatchEvent(new CustomEvent("set-disposition-display", { detail: { value } }));
    }
    _setLanguage(lang) {
        this.dispatchEvent(new CustomEvent("set-metadata-language", { detail: { value: lang } }));
    }
    // Hands the picked file over as a data URL; the card resizes and uploads it.
    _onBackgroundPicked(e) {
        const input = e.target;
        const file = input.files?.[0];
        input.value = "";
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            this.dispatchEvent(new CustomEvent("set-card-background", { detail: { value: reader.result } }));
        };
        reader.readAsDataURL(file);
    }
    _setCurrency(currency) {
        this.dispatchEvent(new CustomEvent("set-metadata-currency", { detail: { value: currency } }));
    }
    render() {
        if (!this.open)
            return A$1;
        return b$1 `
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" style="max-width:420px" @click=${(e) => e.stopPropagation()}>
          ${dialogClose(this._close, this._t('ui.common.close'))}
          <div class="dialog-header" style="border-bottom:none;padding-bottom:4px">${this._t("ui.vivinoAiSettings.title")}</div>
          <div style="padding:0 24px 20px">

          <div class="settings-row">
            <label class="fallback-label">
              <input
                type="checkbox"
                .checked=${this.enableWhisky}
                @change=${(e) => this._setEnableWhisky(e.target.checked)}
              />
              ${this._t("ui.vivinoAiSettings.enableWhisky")}
            </label>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.defaultWineTypeLabel")}</span>
            <select
              class="settings-select"
              .value=${this.defaultWineType}
              @change=${(e) => this._setDefaultWineType(e.target.value)}
            >
              ${getSelectableWineTypes(this.enableWhisky, this.hass?.language).map(([value, label]) => b$1 `
                <option value=${value} ?selected=${value === this.defaultWineType}>${label}</option>
              `)}
            </select>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.dispositionDisplayLabel")}</span>
            <div class="pill-group">
              <button
                class="pill ${this.dispositionDisplay === "letter" ? "active" : ""}"
                @click=${() => this._setDispositionDisplay("letter")}
              >${this._t("ui.vivinoAiSettings.dispositionDisplayLetter")}</button>
              <button
                class="pill ${this.dispositionDisplay === "dot" ? "active" : ""}"
                @click=${() => this._setDispositionDisplay("dot")}
              >${this._t("ui.vivinoAiSettings.dispositionDisplayDot")}</button>
            </div>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.cardBackgroundLabel")}</span>
            <div class="pill-group" style="align-items:center">
              ${this.cardBackground
            ? b$1 `<span class="bg-thumb" style="background-image:url('${this.cardBackground}')"></span>`
            : b$1 `<span style="color:var(--wc-text-secondary);font-size:0.9em">${this._t("ui.vivinoAiSettings.cardBackgroundTheme")}</span>`}
              <label class="pill" style="display:inline-flex;align-items:center">
                ${this.cardBackground ? this._t("ui.vivinoAiSettings.cardBackgroundChange") : this._t("ui.vivinoAiSettings.cardBackgroundUpload")}
                <input type="file" accept="image/*" hidden @change=${this._onBackgroundPicked} />
              </label>
              ${this.cardBackground
            ? b$1 `<button class="pill" @click=${() => this.dispatchEvent(new CustomEvent("set-card-background", { detail: { value: null } }))}>
                    ${this._t("ui.vivinoAiSettings.cardBackgroundRemove")}
                  </button>`
            : A$1}
            </div>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.currencyLabel")}</span>
            <div class="pill-group">
              ${this.supportedCurrencies.map((cur) => b$1 `
                <button
                  class="pill ${this.metadataCurrency === cur ? "active" : ""}"
                  @click=${() => this._setCurrency(cur)}
                >${cur}</button>
              `)}
            </div>
          </div>

          <div class="settings-row">
            <span class="settings-label">${this._t("ui.vivinoAiSettings.languageLabel")}</span>
            <div class="pill-group">
              ${this.supportedLanguages.map((lang) => b$1 `
                <button
                  class="pill ${this.metadataLanguage === lang ? "active" : ""}"
                  @click=${() => this._setLanguage(lang)}
                >${lang.toUpperCase()}</button>
              `)}
            </div>
          </div>

          <div class="settings-row">
            <label class="fallback-label">
              <input
                type="checkbox"
                .checked=${this.aiFallbackAlways}
                @change=${(e) => this._setFallback(e.target.checked)}
              />
              ${this._t("ui.vivinoAiSettings.alwaysTryAi")}
            </label>
          </div>

          <div class="info-section">
            <h3 class="info-title">🍇🤖 ${this._t("ui.vivinoAiSettings.infoTitle")}</h3>

            <div class="info-block">
              <div class="info-block-title">🍇 ${this._t("ui.vivinoAiSettings.vivinoProvidesTitle")}</div>
              <ul>
                <li>${this._t("ui.vivinoAiSettings.vivinoBottlePhoto")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoCommunityRating")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoMarketPrice")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoFoodPairings")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoAlcohol")}</li>
                <li>${this._t("ui.vivinoAiSettings.vivinoGrapeInfo")}</li>
              </ul>
            </div>

            <div class="info-block">
              <div class="info-block-title">🤖 ${this._t("ui.vivinoAiSettings.aiProvidesTitle")}</div>
              <ul>
                <li>${this._t("ui.vivinoAiSettings.aiEstimatedPrice")}</li>
                <li>${this._t("ui.vivinoAiSettings.aiTastingDescription")}</li>
                <li>${this._t("ui.vivinoAiSettings.aiCriticScores")}</li>
                <li>${this._t("ui.vivinoAiSettings.aiDispositionInfo", {
            drinkNow: this._t("ui.disposition.drinkNow"),
            hold: this._t("ui.disposition.hold"),
            pastPeak: this._t("ui.disposition.pastPeak"),
            window: this._t("ui.vivinoAiSettings.drinkingWindow"),
        })}</li>
                <li>${this._t("ui.vivinoAiSettings.aiGrapeInfo")}</li>
              </ul>
            </div>

            <p class="info-note">
              ${this._t("ui.vivinoAiSettings.infoNote")}
            </p>
          </div>
          </div>
        </div>
      </div>
    `;
    }
};
VivinoAiSettingsDialog.styles = [
    sharedStyles,
    i$4 `
      .settings-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--wc-border);
        font-size: 0.85em;
      }

      .settings-row:last-of-type {
        border-bottom: none;
      }

      .settings-label {
        color: var(--wc-text);
      }

      .pill-group {
        display: flex;
        gap: 4px;
      }

      .pill {
        padding: 3px 10px;
        border-radius: 12px;
        border: 1px solid var(--wc-border);
        cursor: pointer;
        background: transparent;
        color: var(--wc-text-secondary);
        font-size: 0.9em;
      }

      /* Same selected look as the tabs and type chips. */
      .pill.active {
        background: var(--wc-primary-grad);
        color: #fff;
        border-color: transparent;
      }

      .bg-thumb {
        width: 44px;
        height: 30px;
        border-radius: 6px;
        border: 1px solid var(--wc-border);
        background: var(--wc-field-bg) center / cover no-repeat;
        flex-shrink: 0;
      }

      .settings-select {
        padding: 3px 8px;
        border-radius: 8px;
        border: 1px solid var(--wc-border);
        background: var(--wc-field-bg);
        color: var(--wc-text);
        font-size: 0.9em;
      }

      .fallback-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: var(--wc-text);
      }

      .info-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--wc-border);
      }

      .info-title {
        margin: 0 0 12px;
        font-size: 0.95em;
        color: var(--wc-text);
      }

      .info-block {
        margin-bottom: 16px;
      }

      .info-block-title {
        font-weight: 600;
        font-size: 0.85em;
        color: var(--wc-text);
        margin-bottom: 6px;
      }

      .info-block ul {
        margin: 0;
        padding-left: 20px;
        font-size: 0.8em;
        color: var(--wc-text-secondary);
        line-height: 1.7;
      }

      .info-note {
        margin: 0;
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        font-style: italic;
      }

      @media (pointer: coarse) {
        .fallback-label {
          min-height: 44px;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ attribute: false })
], VivinoAiSettingsDialog.prototype, "hass", void 0);
__decorate([
    n$1({ type: Boolean })
], VivinoAiSettingsDialog.prototype, "open", void 0);
__decorate([
    n$1({ type: Boolean })
], VivinoAiSettingsDialog.prototype, "aiFallbackAlways", void 0);
__decorate([
    n$1({ type: Boolean })
], VivinoAiSettingsDialog.prototype, "enableWhisky", void 0);
__decorate([
    n$1({ type: String })
], VivinoAiSettingsDialog.prototype, "defaultWineType", void 0);
__decorate([
    n$1({ type: String })
], VivinoAiSettingsDialog.prototype, "dispositionDisplay", void 0);
__decorate([
    n$1({ type: String })
], VivinoAiSettingsDialog.prototype, "metadataLanguage", void 0);
__decorate([
    n$1({ attribute: false })
], VivinoAiSettingsDialog.prototype, "supportedLanguages", void 0);
__decorate([
    n$1({ type: String })
], VivinoAiSettingsDialog.prototype, "metadataCurrency", void 0);
__decorate([
    n$1({ attribute: false })
], VivinoAiSettingsDialog.prototype, "supportedCurrencies", void 0);
__decorate([
    n$1({ type: String })
], VivinoAiSettingsDialog.prototype, "cardBackground", void 0);
VivinoAiSettingsDialog = __decorate([
    t$2("vivino-ai-settings-dialog")
], VivinoAiSettingsDialog);

// How long an incoming change waits before the card re-fetches, and the floor
// on how often it may do so at all.
const REFRESH_DEBOUNCE_MS = 400;
const REFRESH_MIN_INTERVAL_MS = 3000;
let WineCellarCard = class WineCellarCard extends i$1 {
    constructor() {
        super(...arguments);
        // HA's frontend can reject an in-flight unsubscribe with this specific
        // error when the websocket connection already dropped underneath it
        // (page navigation, HA restart, tab backgrounded) — harmless, the
        // subscription is gone either way, but left unhandled it surfaces as a
        // console error on every reload. Scoped to this one error shape so any
        // other unhandled rejection still surfaces normally.
        this._onUnhandledRejection = (event) => {
            const reason = event.reason;
            if (reason?.code === "not_found" && reason?.message === "Subscription not found.") {
                event.preventDefault();
                console.debug("Cork Dork: suppressed stale websocket subscription cleanup error");
            }
        };
        this._wines = [];
        this._cabinets = [];
        this._stats = null;
        this._activeTab = "all";
        this._searchQuery = "";
        this._searchFilter = "all";
        this._selectedWine = null;
        this._showDetail = false;
        this._detailMode = "cellar";
        this._showAddDialog = false;
        this._addPreselect = { cabinet: "", row: null, col: null, zone: "", depth: 0 };
        this._loading = true;
        this._showRackSettings = false;
        this._copiedWine = null;
        this._movingWine = null;
        this._analyzing = false;
        this._batchVivino = false;
        this._showBatchVivinoConfirm = false;
        this._showBatchAiConfirm = false;
        this._batchAiFallback = false;
        this._vivinoSyncing = false;
        this._toast = "";
        this._hasGemini = false;
        this._hasVivinoAccount = false;
        this._vivinoMode = "import";
        // Vivino-side removals awaiting the user's bottle choice (vivino_id -> entry)
        this._pendingRemovals = {};
        this._removalFocusVid = null;
        this._removalConfirmWine = null;
        // Sync conflicts (both sides changed a wine differently) awaiting manual
        // resolution: the user reviews Cork Dork's bottles and declares them truth.
        this._vivinoConflicts = [];
        this._conflictFocusVid = null;
        this._conflictConfirmVid = null;
        // vivino_id currently being pushed to Vivino (the write plus its
        // verification can take several seconds)
        this._conflictResolving = null;
        this._metadataLanguage = "en";
        this._supportedLanguages = ["en", "fr", "de"];
        this._metadataCurrency = "USD";
        this._supportedCurrencies = ["USD", "EUR", "GBP", "CHF"];
        this._aiFallbackAlways = false;
        this._enableWhisky = false;
        this._defaultWineType = "red";
        this._dispositionDisplay = "letter";
        this._cardBackground = null;
        this._chamberingRoomSensor = "";
        this._chamberingTimeConstantMinutes = 75;
        this._chamberingEquilibrationHours = 24;
        this._showVivinoAiSettings = false;
        this._showWineList = false;
        this._showInventory = false;
        this._inventoryPairing = false;
        this._findingsCache = null;
        this._unsubscribe = null;
        this._subscribing = false;
        this._connectionGeneration = 0;
        this._refreshTimer = 0;
        this._lastRefresh = 0;
        this._toastTimer = 0;
        this._showArrangement = false;
        this._dismissedArrangements = [];
        this._buyList = [];
        this._addToBuyListMode = false;
        this._movingBuyListItem = null;
        // Depth side panel
        this._depthPanelOpen = false;
        this._depthPanelCabinet = null;
        this._depthPanelRow = null;
        this._depthPanelCol = null;
        this._depthPanelWines = [];
        this._depthPanelMaxDepth = 1;
        // Zone side panel (boxes, bulk bins)
        this._zonePanelOpen = false;
        this._zonePanelCabinet = null;
        this._zonePanelZone = "";
        this._zonePanelType = "bulk";
        this._zonePanelCapacity = 20;
        this._zonePanelName = "";
        this._zonePanelWines = [];
        this._zonePanelStorageRow = null;
        this._zonePanelDragWineId = null;
        this._zonePanelDragOverKey = null;
        this._zonePanelNewBoxSize = 6;
        // Rack panel (grid-slot cabinets: list + reorder)
        this._rackPanelOpen = false;
        this._rackPanelCabinet = null;
        this._rackPanelWines = [];
        this._rackPanelDragWineId = null;
        this._rackPanelDragOverKey = null;
        // Shelf panel (shelf-style cabinets: every board/lane across every shelf
        // in the rack, list + reorder — the shelf equivalent of the rack panel
        // above, since a shelf cabinet has no row/col slots of its own).
        this._shelfPanelOpen = false;
        this._shelfPanelCabinet = null;
        this._shelfPanelWines = [];
        this._shelfPanelDragWineId = null;
        this._shelfPanelDragOverKey = null;
        // Briefly highlights a wine's slot after "locate" is used from the detail dialog.
        this._highlightWineId = null;
        this._confirmZoneSort = false;
        this._zoneSorting = false;
        // The glass surfaces (see --wc-glass-* in styles) need to know whether the
        // theme is light or dark. The theme's own text colour is the honest answer:
        // hass.themes.darkMode is false for a dark-only custom theme, and a light
        // pane under light text is exactly the unreadable pop-up this replaces.
        // Rechecked only when the theme object changes, not on every state update.
        this._themesSeen = {};
    }
    setConfig(config) {
        this._config = config;
    }
    static getConfigElement() {
        return document.createElement("wine-cellar-card-editor");
    }
    static getStubConfig() {
        return { type: "custom:wine-cellar-card" };
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("unhandledrejection", this._onUnhandledRejection);
        this._loadData();
        this._subscribeToUpdates();
    }
    updated(changed) {
        super.updated?.(changed);
        if (changed.has("hass") && this.hass?.themes !== this._themesSeen) {
            this._themesSeen = this.hass?.themes;
            requestAnimationFrame(() => this._syncGlassMode());
        }
    }
    _syncGlassMode() {
        let dark = !!this.hass?.themes?.darkMode;
        const text = getComputedStyle(this).getPropertyValue("--primary-text-color").trim();
        const ctx = text ? document.createElement("canvas").getContext("2d") : null;
        if (ctx) {
            ctx.fillStyle = "#010203";
            ctx.fillStyle = text;
            const m = String(ctx.fillStyle).match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
            if (m && ctx.fillStyle !== "#010203") {
                const [r, g, b] = m.slice(1).map((h) => parseInt(h, 16));
                dark = 0.299 * r + 0.587 * g + 0.114 * b > 140;
            }
        }
        this.toggleAttribute("glass-dark", dark);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("unhandledrejection", this._onUnhandledRejection);
        // Invalidates any subscription still being set up.
        this._connectionGeneration++;
        this._unsubscribe?.();
        this._unsubscribe = null;
        if (this._refreshTimer) {
            clearTimeout(this._refreshTimer);
            this._refreshTimer = 0;
        }
        if (this._toastTimer) {
            clearTimeout(this._toastTimer);
            this._toastTimer = 0;
        }
    }
    // The backend announces every change it makes on the event bus, and nobody
    // was listening. Work it does on its own — the Vivino lookup fired after a
    // wine is added, most visibly — landed in storage and stayed invisible
    // until the user happened to do something that reloaded the card. That is
    // why an added bottle could look like Vivino had never been consulted.
    async _subscribeToUpdates() {
        if (!this.hass?.connection || this._unsubscribe || this._subscribing) {
            if (!this.hass)
                setTimeout(() => this._subscribeToUpdates(), 500);
            return;
        }
        this._subscribing = true;
        const generation = this._connectionGeneration;
        try {
            const unsubscribe = await this.hass.connection.subscribeEvents(() => this._scheduleRefresh(), "wine_cellar_updated");
            // Home Assistant detaches and reattaches a dashboard view when the user
            // switches tabs, which can happen while this is still in flight. Storing
            // the handle now would leave a subscription nothing can ever cancel,
            // reloading a card that is no longer on screen — once per tab switch.
            //
            // Keyed on a counter the detach bumps rather than on isConnected, so it
            // holds however the element was taken down.
            if (generation !== this._connectionGeneration) {
                unsubscribe();
                return;
            }
            this._unsubscribe = unsubscribe;
        }
        catch (err) {
            // Without this the card still works, it just will not notice background
            // work. Not worth an error the user has to dismiss.
            console.warn("Wine Cellar: could not subscribe to updates", err);
        }
        finally {
            this._subscribing = false;
        }
    }
    // Batch operations fire one event per bottle, and they pace themselves with
    // a sleep of half a second to a second between wines. A plain debounce is
    // the wrong shape for that: the gaps are longer than any sensible debounce,
    // so every event would still get its own full reload. What is needed is a
    // floor on how often the cellar is re-fetched.
    //
    // An already-pending refresh absorbs anything that arrives before it fires,
    // so a tight burst still costs one reload. An isolated change still shows up
    // within REFRESH_DEBOUNCE_MS.
    _scheduleRefresh() {
        if (this._refreshTimer)
            return;
        const since = Date.now() - this._lastRefresh;
        const wait = Math.max(REFRESH_DEBOUNCE_MS, REFRESH_MIN_INTERVAL_MS - since);
        this._refreshTimer = window.setTimeout(() => {
            this._refreshTimer = 0;
            this._loadData();
        }, wait);
    }
    async _loadData() {
        if (!this.hass) {
            // Retry after hass is set
            setTimeout(() => this._loadData(), 500);
            return;
        }
        // Counts against the refresh floor: the card's own actions already reload,
        // and the event they cause must not reload a second time straight after.
        this._lastRefresh = Date.now();
        const isInitialLoad = this._wines.length === 0 && this._cabinets.length === 0;
        if (isInitialLoad)
            this._loading = true;
        try {
            const [winesResult, cabinetsResult, statsResult, capResult, buyListResult, pendingRemovalsResult] = await Promise.all([
                this.hass.callWS({ type: "wine_cellar/get_wines" }),
                this.hass.callWS({ type: "wine_cellar/get_cabinets" }),
                this.hass.callWS({ type: "wine_cellar/get_stats" }),
                this.hass.callWS({ type: "wine_cellar/get_capabilities" }).catch(() => ({ has_gemini: false })),
                this.hass.callWS({ type: "wine_cellar/get_buy_list" }).catch(() => ({ buy_list: [] })),
                this.hass.callWS({ type: "wine_cellar/get_pending_removals" }).catch(() => ({ pending_removals: {} })),
            ]);
            this._wines = winesResult.wines || [];
            this._cabinets = (cabinetsResult.cabinets || []).sort((a, b) => a.order - b.order);
            this._stats = statsResult;
            this._hasGemini = capResult?.has_gemini || false;
            this._hasVivinoAccount = capResult?.has_vivino_account || false;
            this._vivinoMode = capResult?.vivino_mode || "import";
            this._metadataLanguage = capResult?.metadata_language || "en";
            this._supportedLanguages = capResult?.supported_languages || ["en", "fr", "de"];
            this._metadataCurrency = capResult?.metadata_currency || "USD";
            this._supportedCurrencies = capResult?.supported_currencies || ["USD", "EUR", "GBP", "CHF"];
            this._aiFallbackAlways = capResult?.ai_fallback_always || false;
            this._enableWhisky = capResult?.enable_whisky || false;
            this._defaultWineType = capResult?.default_wine_type || "red";
            this._dispositionDisplay = capResult?.disposition_display || "letter";
            this._cardBackground = capResult?.card_background || null;
            this._chamberingRoomSensor = capResult?.chambering_room_sensor || "";
            this._chamberingTimeConstantMinutes = capResult?.chambering_time_constant_minutes ?? 75;
            this._chamberingEquilibrationHours = capResult?.chambering_equilibration_hours ?? 24;
            this._dismissedArrangements = capResult?.dismissed_arrangements || [];
            this._buyList = buyListResult?.buy_list || [];
            this._pendingRemovals = pendingRemovalsResult?.pending_removals || {};
            if (this._removalFocusVid && !this._pendingRemovals[this._removalFocusVid]) {
                this._removalFocusVid = null;
            }
            this._vivinoConflicts = pendingRemovalsResult?.conflicts || [];
            if (this._conflictFocusVid &&
                !this._vivinoConflicts.some((c) => String(c.vintage_id) === this._conflictFocusVid)) {
                this._conflictFocusVid = null;
            }
            // Refresh selected wine if detail dialog is open
            if (this._selectedWine) {
                const updated = this._wines.find((w) => w.id === this._selectedWine.id);
                if (updated)
                    this._selectedWine = updated;
            }
            // Refresh depth panel if open
            this._refreshDepthPanel();
            // Refresh zone panel if open
            this._refreshZonePanel();
            // Refresh rack panel if open
            this._refreshRackPanel();
            // Refresh shelf panel if open
            this._refreshShelfPanel();
        }
        catch (err) {
            console.error("Cork Dork: Failed to load data", err);
        }
        this._loading = false;
    }
    _getFilteredWines() {
        let wines = [...this._wines];
        // Filter by active tab (cabinet)
        if (this._activeTab !== "all") {
            wines = wines.filter((w) => w.cabinet_id === this._activeTab);
        }
        // Filter by wine type
        if (this._searchFilter !== "all") {
            wines = wines.filter((w) => w.type === this._searchFilter);
        }
        // Filter by search query — same matcher as the inventory dialog, so a
        // query never gives different results depending on which screen it was
        // typed into.
        if (this._searchQuery) {
            wines = wines.filter((w) => matchesQuery(w, this._searchQuery, this._cabinets));
        }
        return wines;
    }
    // Shorthand for t(key, this.hass?.language, params) — every call site in
    // this file needs the current display language, so this saves repeating
    // `this.hass?.language` at every t() call.
    _t(key, params) {
        return t$1(key, this.hass?.language, params);
    }
    // The disposition badge for the card's own side panels (rack/shelf/zone
    // panels) — same letter-vs-dot choice as cabinet-grid.ts's own helper,
    // reading the same _dispositionDisplay state so both stay in sync.
    _dispositionBadge(dispClass, disp) {
        if (!dispClass)
            return A$1;
        const isDot = this._dispositionDisplay === "dot";
        return b$1 `<span class="depth-slot-disposition ${dispClass}${isDot ? " dot-style" : ""}">${isDot ? "" : disp}</span>`;
    }
    _showToast(message) {
        this._toast = message;
        // Each toast gets its own full 2.5s: the previous timer would otherwise
        // still be running and cut the new message short.
        if (this._toastTimer)
            clearTimeout(this._toastTimer);
        this._toastTimer = window.setTimeout(() => {
            this._toastTimer = 0;
            this._toast = "";
        }, 2500);
    }
    // --- Copy/Paste wine ---
    _onCellClick(e) {
        const { wine, wines = [], cabinet, row, col, wineCount = 0, cabinetDepth = 1 } = e.detail;
        const hasRoom = wineCount < cabinetDepth;
        const nextDepth = wineCount;
        // Picking the bottle for a pending Vivino removal takes precedence
        if (this._removalFocusVid && wine && this._removalHighlightIds.includes(wine.id)) {
            this._removalConfirmWine = wine;
            return;
        }
        // If we have a copied wine and cell has room, paste it
        if (this._copiedWine && hasRoom) {
            this._pasteWine(cabinet.id, row, col, nextDepth);
            return;
        }
        // If we're moving a wine and cell has room, place it here
        if (this._movingWine && hasRoom) {
            this._executeMoveWine(cabinet.id, row, col, "", nextDepth);
            return;
        }
        // If we're placing a buy list item and cell has room, move it to cellar
        if (this._movingBuyListItem && hasRoom) {
            this._executeMoveTocellar(cabinet.id, row, col, "", nextDepth);
            return;
        }
        // For deep cabinets (depth >= 2), open side panel instead of detail
        if (cabinetDepth >= 2) {
            this._openDepthPanel(cabinet, row, col, wines, cabinetDepth);
            return;
        }
        // Long-pressed a bottle (picked up via _movingWine) and tapped a
        // different, occupied cell: swap instead of opening its detail.
        if (this._movingWine && wine && wine.id !== this._movingWine.id) {
            this._executeSwapWine({ cabinetId: cabinet.id, row, col, depth: 0 }, wine);
            return;
        }
        if (wine) {
            this._selectedWine = wine;
            this._detailMode = "cellar";
            this._showDetail = true;
        }
        else {
            this._addPreselect = { cabinet: cabinet.id, row, col, zone: "", depth: 0 };
            this._showAddDialog = true;
        }
    }
    // --- Depth side panel ---
    _openDepthPanel(cabinet, row, col, wines, maxDepth) {
        this._depthPanelCabinet = cabinet;
        this._depthPanelRow = row;
        this._depthPanelCol = col;
        this._depthPanelWines = [...wines].sort((a, b) => (a.depth || 0) - (b.depth || 0));
        this._depthPanelMaxDepth = maxDepth;
        this._depthPanelOpen = true;
    }
    _closeDepthPanel() {
        this._depthPanelOpen = false;
    }
    _refreshDepthPanel() {
        if (!this._depthPanelOpen || !this._depthPanelCabinet || this._depthPanelRow === null || this._depthPanelCol === null)
            return;
        const wines = this._wines.filter((w) => w.cabinet_id === this._depthPanelCabinet.id && w.row === this._depthPanelRow && w.col === this._depthPanelCol);
        this._depthPanelWines = [...wines].sort((a, b) => (a.depth || 0) - (b.depth || 0));
    }
    _onDepthSlotClick(depthIndex, wine) {
        if (wine) {
            this._selectedWine = wine;
            this._detailMode = "cellar";
            this._showDetail = true;
        }
        else {
            this._addPreselect = {
                cabinet: this._depthPanelCabinet.id,
                row: this._depthPanelRow,
                col: this._depthPanelCol,
                zone: "",
                depth: depthIndex,
            };
            this._showAddDialog = true;
        }
    }
    _getDepthLabel(index) {
        const labels = ["Front", "2nd", "3rd", "4th", "5th", "6th"];
        return labels[index] || `${index + 1}th`;
    }
    _onZoneClick(e) {
        const { wine, cabinet, zone, depth } = e.detail;
        // Slot zones (shelf) send the exact depth clicked — that slot is
        // authoritative, so skip the "first free"/on-top-of-pile placement
        // used for bulk/box and land exactly there instead.
        const hasExactDepth = depth !== undefined;
        // Picking the bottle for a pending Vivino removal takes precedence
        if (this._removalFocusVid && wine && this._removalHighlightIds.includes(wine.id)) {
            this._removalConfirmWine = wine;
            return;
        }
        // If we have a copied wine and clicked empty zone space, paste it here
        if (this._copiedWine && !wine) {
            const nextDepth = hasExactDepth
                ? depth
                : this._wines.filter((w) => w.cabinet_id === cabinet.id && w.zone === (zone || "bottom")).length;
            this._pasteWine(cabinet.id, null, null, nextDepth, zone || "bottom", hasExactDepth);
            return;
        }
        // If we're moving a wine, place it in this zone
        if (this._movingWine && !wine) {
            this._executeMoveWine(cabinet.id, null, null, zone || "bottom", hasExactDepth ? depth : 0, hasExactDepth);
            return;
        }
        // If we're placing a buy list item, move it to cellar
        if (this._movingBuyListItem && !wine) {
            this._executeMoveTocellar(cabinet.id, null, null, zone || "bottom", hasExactDepth ? depth : 0, hasExactDepth);
            return;
        }
        // Long-pressed a bottle and tapped a different, occupied slot in a
        // slot-addressable zone (shelf/quinconce — hasExactDepth): swap instead
        // of opening its detail. Bulk/box zone chips carry no depth, so this
        // never fires for those — "occupied" there doesn't mean a fixed slot.
        if (this._movingWine && wine && hasExactDepth && wine.id !== this._movingWine.id) {
            this._executeSwapWine({ cabinetId: cabinet.id, zone: zone || "bottom", depth }, wine);
            return;
        }
        if (wine) {
            this._selectedWine = wine;
            this._detailMode = "cellar";
            this._showDetail = true;
        }
        else {
            this._addPreselect = { cabinet: cabinet.id, row: null, col: null, zone: zone || "bottom", depth: hasExactDepth ? depth : 0 };
            this._showAddDialog = true;
        }
    }
    // The slot a new bottle takes in a bin: the first free one, so a gap left
    // by a removed bottle is reused rather than skipped. Every path into a bin
    // — add dialog, click-to-place, drag-and-drop — must agree, or two bottles
    // end up sharing a depth and the order becomes undefined.
    _firstFreeDepth(cabinetId, zone, excludeWineId) {
        const occupied = new Set(this._wines
            .filter((w) => w.cabinet_id === cabinetId && w.zone === zone && w.id !== excludeWineId)
            .map((w) => w.depth || 0));
        let depth = 0;
        while (occupied.has(depth))
            depth++;
        return depth;
    }
    // Renumber a bin's slots in a single backend call. Looping a move per
    // bottle rewrote the whole store each time, which made shifting a full bin
    // far too slow to do on every add.
    async _reorderZone(cabinetId, zone, wineIds) {
        await this.hass.callWS({
            type: "wine_cellar/reorder_zone",
            cabinet_id: cabinetId,
            zone,
            wine_ids: wineIds,
        });
    }
    // A bottle put into a bin lands on top of the pile, so slot 1 holds the one
    // added last — slot 1 being the most accessible position, the same
    // convention as depth 0 on a grid cell. Only the new bottles are listed:
    // the backend appends every other bottle in the bin in its current order,
    // which keeps this correct even when the card's copy of the cellar is a
    // moment out of date.
    async _placeOnTopOfBin(cabinetId, zone, newWineIds) {
        if (!zone || !newWineIds.length)
            return;
        await this._reorderZone(cabinetId, zone, newWineIds);
    }
    // --- Zone side panel (boxes, bulk bins) ---
    _onZoneContainerClick(e) {
        const { cabinet, zone, storageRow } = e.detail;
        const occupantCount = this._wines.filter((w) => w.cabinet_id === cabinet.id && w.zone === zone).length;
        const nextDepth = this._firstFreeDepth(cabinet.id, zone);
        const capacity = storageRow.capacity || 20;
        const hasRoom = occupantCount < capacity && nextDepth < capacity;
        // If we have a copied wine, paste it in this zone instead of opening panel
        if (this._copiedWine) {
            if (!hasRoom) {
                this._showToast(this._t("toast.zoneFull", { zone: storageRow.name || "Zone" }));
                return;
            }
            this._pasteWine(cabinet.id, null, null, nextDepth, zone);
            return;
        }
        // If moving wine, drop it in this zone instead of opening panel
        if (this._movingWine) {
            if (!hasRoom) {
                this._showToast(this._t("toast.zoneFullMove", { zone: storageRow.name || "Zone" }));
                return;
            }
            this._executeMoveWine(cabinet.id, null, null, zone);
            return;
        }
        if (this._movingBuyListItem) {
            if (!hasRoom) {
                this._showToast(this._t("toast.zoneFullMove", { zone: storageRow.name || "Zone" }));
                return;
            }
            this._executeMoveTocellar(cabinet.id, null, null, zone);
            return;
        }
        this._openZonePanel(cabinet, zone, storageRow);
    }
    _openZonePanel(cabinet, zone, storageRow) {
        this._zonePanelCabinet = cabinet;
        this._zonePanelZone = zone;
        this._zonePanelType = storageRow.type || "bulk";
        this._zonePanelCapacity = storageRow.capacity || 20;
        this._zonePanelName = storageRow.name || "Storage";
        this._zonePanelStorageRow = storageRow;
        this._zonePanelWines = this._wines
            .filter((w) => w.cabinet_id === cabinet.id && w.zone === zone)
            .sort((a, b) => (a.depth || 0) - (b.depth || 0));
        this._zonePanelOpen = true;
    }
    _closeZonePanel() {
        this._zonePanelOpen = false;
    }
    _refreshZonePanel() {
        if (!this._zonePanelOpen || !this._zonePanelCabinet)
            return;
        // Re-derive from the freshly loaded cabinet so capacity/box changes show up.
        const freshCabinet = this._cabinets.find((c) => c.id === this._zonePanelCabinet.id);
        if (freshCabinet) {
            this._zonePanelCabinet = freshCabinet;
            const rowIdx = parseInt(this._zonePanelZone.replace("storage-", ""), 10);
            const sr = (freshCabinet.storage_rows || []).find((s) => s.row === rowIdx);
            if (sr) {
                this._zonePanelType = sr.type || "bulk";
                this._zonePanelCapacity = sr.capacity || 20;
                this._zonePanelName = sr.name || "Storage";
                this._zonePanelStorageRow = sr;
            }
        }
        this._zonePanelWines = this._wines
            .filter((w) => w.cabinet_id === this._zonePanelCabinet.id && w.zone === this._zonePanelZone)
            .sort((a, b) => (a.depth || 0) - (b.depth || 0));
    }
    // Grow a bulk/box zone's capacity by editing its StorageRow entry.
    async _updateStorageRow(updates) {
        if (!this._zonePanelCabinet || !this._zonePanelStorageRow)
            return;
        const newStorageRows = (this._zonePanelCabinet.storage_rows || []).map((sr) => sr.row === this._zonePanelStorageRow.row ? { ...sr, ...updates } : sr);
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_cabinet",
                cabinet_id: this._zonePanelCabinet.id,
                updates: { storage_rows: newStorageRows },
            });
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to resize zone:", err);
            this._showToast(this._t("toast.zoneResizeFailed"));
        }
    }
    _addBulkSlot() {
        if (!this._zonePanelStorageRow)
            return;
        this._updateStorageRow({ capacity: (this._zonePanelStorageRow.capacity || 0) + 1 });
    }
    _addBoxSlot() {
        if (!this._zonePanelStorageRow)
            return;
        // Append a whole new box of the chosen preset size, so box sizes always
        // stay one of BOX_SIZES (1/3/6/12/24) — the Manage Racks dialog's size
        // dropdown can only display values from that list.
        const boxes = [...(this._zonePanelStorageRow.boxes || [this._zonePanelStorageRow.capacity || 0]), this._zonePanelNewBoxSize];
        this._updateStorageRow({ boxes, capacity: boxes.reduce((sum, b) => sum + b, 0) });
    }
    // Delete a single bulk/box slot: unassign its wine (if any) rather than
    // deleting it, shift every later slot down to close the gap, and shrink
    // the zone's capacity (or the specific box, for box mode) by one.
    async _deleteZoneSlot(slotIndex) {
        if (!this._zonePanelCabinet || !this._zonePanelStorageRow)
            return;
        const wineAtSlot = this._zonePanelWines[slotIndex];
        const warning = wineAtSlot
            ? this._t("toast.deleteSlotConfirmNamed", { n: slotIndex + 1, name: wineAtSlot.name })
            : this._t("toast.deleteSlotConfirm", { n: slotIndex + 1 });
        if (!window.confirm(warning))
            return;
        try {
            if (wineAtSlot) {
                await this.hass.callWS({
                    type: "wine_cellar/update_wine",
                    wine_id: wineAtSlot.id,
                    updates: { cabinet_id: "", row: null, col: null, zone: "", depth: 0 },
                });
            }
            // Closing the gap is one renumbering of the zone, not one round trip per
            // bottle behind the deleted slot — emptying slot 1 of a full 20-bottle
            // bin used to mean nineteen calls, each with its own disk write.
            const remaining = this._zonePanelWines
                .filter((_, i) => i !== slotIndex)
                .map((w) => w.id);
            if (remaining.length) {
                await this.hass.callWS({
                    type: "wine_cellar/reorder_zone",
                    cabinet_id: this._zonePanelCabinet.id,
                    zone: this._zonePanelZone,
                    wine_ids: remaining,
                });
            }
            if (this._zonePanelType === "box") {
                const boxes = [...(this._zonePanelStorageRow.boxes || [this._zonePanelStorageRow.capacity || 0])];
                let offset = 0;
                for (let i = 0; i < boxes.length; i++) {
                    if (slotIndex < offset + boxes[i]) {
                        boxes[i] -= 1;
                        if (boxes[i] <= 0)
                            boxes.splice(i, 1);
                        break;
                    }
                    offset += boxes[i];
                }
                await this._updateStorageRow({ boxes, capacity: boxes.reduce((sum, b) => sum + b, 0) });
            }
            else if (this._zonePanelType === "shelf") {
                const group = getShelfSlotGroups(this._zonePanelStorageRow.shelf_levels)
                    .find((g) => slotIndex >= g.start && slotIndex < g.start + g.size);
                if (group) {
                    const levels = (this._zonePanelStorageRow.shelf_levels || []).map((lvl, i) => i === group.level ? { ...lvl, [group.lane]: Math.max(0, lvl[group.lane] - 1) } : lvl);
                    const capacity = levels.reduce((sum, l) => sum + l.front + l.back, 0);
                    await this._updateStorageRow({ shelf_levels: levels, capacity });
                }
            }
            else {
                await this._updateStorageRow({ capacity: Math.max(0, (this._zonePanelStorageRow.capacity || 1) - 1) });
            }
            this._showToast(wineAtSlot ? this._t("toast.slotDeletedUnassigned") : this._t("toast.slotDeleted"));
        }
        catch (err) {
            console.error("Failed to delete slot:", err);
            this._showToast(this._t("toast.deleteSlotFailed"));
        }
    }
    _onZonePanelSlotClick(slotIndex, wine) {
        if (wine) {
            this._selectedWine = wine;
            this._detailMode = "cellar";
            this._showDetail = true;
            return;
        }
        if (this._copiedWine) {
            this._pasteWine(this._zonePanelCabinet.id, null, null, slotIndex, this._zonePanelZone);
            return;
        }
        if (this._movingWine) {
            this._executeMoveWine(this._zonePanelCabinet.id, null, null, this._zonePanelZone, slotIndex);
            return;
        }
        this._addPreselect = {
            cabinet: this._zonePanelCabinet.id,
            row: null,
            col: null,
            zone: this._zonePanelZone,
            depth: slotIndex,
        };
        this._showAddDialog = true;
    }
    // --- Zone side panel: drag-to-reorder ---
    _onZonePanelDragStart(e, wine) {
        this._zonePanelDragWineId = wine.id;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            // Same payload shape cabinet-grid's _onDrop expects, so dragging out
            // of the panel onto any rack/zone in the main grid works too.
            e.dataTransfer.setData("text/plain", JSON.stringify({
                wineId: wine.id,
                cabinetId: wine.cabinet_id,
                row: wine.row ?? null,
                col: wine.col ?? null,
                zone: wine.zone || "",
            }));
        }
    }
    _onZonePanelDragEnd() {
        this._zonePanelDragWineId = null;
        this._zonePanelDragOverKey = null;
    }
    _onZonePanelDragOver(e, key) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
        this._zonePanelDragOverKey = key;
    }
    // Bulk mode: reflow to sequential depths matching the new visual order.
    async _onZonePanelBulkReorder(e, targetIndex) {
        e.preventDefault();
        this._zonePanelDragOverKey = null;
        const draggedId = this._zonePanelDragWineId;
        this._zonePanelDragWineId = null;
        if (!draggedId || !this._zonePanelCabinet)
            return;
        const wines = [...this._zonePanelWines];
        const fromIndex = wines.findIndex((w) => w.id === draggedId);
        if (fromIndex === -1 || fromIndex === targetIndex)
            return;
        const [moved] = wines.splice(fromIndex, 1);
        wines.splice(targetIndex, 0, moved);
        try {
            await this._reorderZone(this._zonePanelCabinet.id, this._zonePanelZone, wines.map((w) => w.id));
            this._showToast(this._t("toast.wineReordered"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to reorder wine:", err);
            this._showToast(this._t("toast.reorderFailed"));
        }
    }
    // Box mode: move/swap into a specific slot depth.
    async _onZonePanelBoxReorder(e, targetDepth, targetWine) {
        e.preventDefault();
        this._zonePanelDragOverKey = null;
        const draggedId = this._zonePanelDragWineId;
        this._zonePanelDragWineId = null;
        if (!draggedId || !this._zonePanelCabinet || draggedId === targetWine?.id)
            return;
        const draggedWine = this._zonePanelWines.find((w) => w.id === draggedId);
        if (!draggedWine)
            return;
        try {
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: draggedWine.id,
                cabinet_id: this._zonePanelCabinet.id,
                zone: this._zonePanelZone,
                depth: targetDepth,
            });
            if (targetWine) {
                await this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: this._zonePanelCabinet.id,
                    zone: this._zonePanelZone,
                    depth: draggedWine.depth || 0,
                });
            }
            this._showToast(this._t("toast.wineReordered"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to reorder wine:", err);
            this._showToast(this._t("toast.reorderFailed"));
        }
    }
    // Renumber the bin's slots to match when bottles were added.
    //
    // Direction matters physically. Slot 1 is the most accessible position —
    // the same convention as depth 0 being the front bottle of a grid cell —
    // so "newest first" matches dropping each new bottle on top of the pile,
    // and "oldest first" matches lining bottles up in a row from one end.
    // Only the user knows which of the two their bin really is.
    //
    // `added_at` is the only entry timestamp stored; bottles without one keep
    // their relative position at the end in *both* directions rather than
    // sorting to the front, which is what an empty string would otherwise do.
    async _sortZoneByDateAdded(direction) {
        this._confirmZoneSort = false;
        if (!this._zonePanelCabinet)
            return;
        const ordered = [...this._zonePanelWines].sort((a, b) => {
            const aDate = a.added_at || "";
            const bDate = b.added_at || "";
            if (!aDate && !bDate)
                return (a.depth || 0) - (b.depth || 0);
            if (!aDate)
                return 1;
            if (!bDate)
                return -1;
            return direction === "newest" ? bDate.localeCompare(aDate) : aDate.localeCompare(bDate);
        });
        this._zoneSorting = true;
        try {
            await this._reorderZone(this._zonePanelCabinet.id, this._zonePanelZone, ordered.map((w) => w.id));
            this._showToast(direction === "newest" ? this._t("toast.newestFirstToast") : this._t("toast.oldestFirstToast"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to sort zone:", err);
            this._showToast(this._t("toast.sortFailed"));
        }
        this._zoneSorting = false;
    }
    _getZoneSlotLabel(_type, index) {
        return this._t("ui.card.slot", { n: index + 1 });
    }
    // Opens the right side panel for a wine's location and highlights its slot,
    // both in the panel and on the rack drawing.
    _locateWine(wine) {
        const loc = getWineLocation(wine, this._cabinets, this.hass?.language);
        if (!loc.cabinet) {
            this._showToast(this._t("toast.wineUnassigned"));
            return;
        }
        // An active search replaces the rack drawing with a flat result list, so
        // locating while searching would point at a rack that isn't on screen.
        // Locating means "show me where it is" — clear the search and open the
        // bottle's own rack.
        this._searchQuery = "";
        this._searchFilter = "all";
        this._activeTab = loc.cabinet.id;
        // Mark the bottle on the rack drawing regardless of whether a side panel
        // opens — for a plain bottom-zone bottle the drawing is the only place it
        // can be pointed at.
        this._highlightWineId = wine.id;
        if (wine.row !== null && wine.col !== null) {
            this._openRackPanel(loc.cabinet);
        }
        else if (loc.storageRow?.type === "shelf") {
            this._openShelfPanel(loc.cabinet);
        }
        else if (loc.zone && loc.zone !== "bottom" && loc.storageRow) {
            this._openZonePanel(loc.cabinet, loc.zone, loc.storageRow);
        }
        else {
            this._showToast(this._t("toast.inLocation", { location: loc.text }));
        }
        this.updateComplete.then(async () => {
            // The panel slot and the rack cell live in different scroll containers,
            // so both can be brought into view without fighting each other.
            this.shadowRoot?.getElementById("highlight-slot")?.scrollIntoView({ behavior: "smooth", block: "center" });
            // Each cabinet-grid runs its own update cycle, so the marked cell does
            // not exist yet when this element's update resolves — wait for the
            // children before looking for it.
            const grids = [...(this.shadowRoot?.querySelectorAll("cabinet-grid") || [])];
            await Promise.all(grids.map((g) => g.updateComplete));
            for (const grid of grids) {
                const marked = grid.shadowRoot?.querySelector(".locate-highlight");
                if (marked) {
                    // Instant, not smooth: a smooth scroll is silently dropped in some
                    // environments (reduced-motion, embedded webviews), and landing on
                    // the bottle matters more than the animation.
                    marked.scrollIntoView({ block: "center" });
                    break;
                }
            }
        });
        setTimeout(() => {
            if (this._highlightWineId === wine.id)
                this._highlightWineId = null;
        }, 4000);
    }
    // --- Rack panel (grid-slot cabinets: list + reorder) ---
    _onRackClick(e) {
        const cabinet = e.detail.cabinet;
        // A "shelf" style cabinet is entirely shelves, no grid rows — so this
        // alone decides which panel applies. (A grid cabinet may still have a
        // non-shelf storage row of its own, e.g. an appended compressor-bump
        // zone — its bottles aren't in either panel, but are always reachable
        // directly on the rack drawing itself.)
        const hasShelfRows = (cabinet.storage_rows || []).some((sr) => sr.type === "shelf");
        if (hasShelfRows) {
            this._openShelfPanel(cabinet);
        }
        else {
            this._openRackPanel(cabinet);
        }
    }
    _openRackPanel(cabinet) {
        this._rackPanelCabinet = cabinet;
        this._rackPanelWines = this._wines.filter((w) => w.cabinet_id === cabinet.id && w.row !== null && w.col !== null);
        this._rackPanelOpen = true;
    }
    _closeRackPanel() {
        this._rackPanelOpen = false;
    }
    _refreshRackPanel() {
        if (!this._rackPanelOpen || !this._rackPanelCabinet)
            return;
        const fresh = this._cabinets.find((c) => c.id === this._rackPanelCabinet.id);
        if (fresh)
            this._rackPanelCabinet = fresh;
        this._rackPanelWines = this._wines.filter((w) => w.cabinet_id === this._rackPanelCabinet.id && w.row !== null && w.col !== null);
    }
    // --- Shelf panel (shelf-style cabinets: every board/lane, list + reorder) ---
    // The shelf equivalent of the rack panel above: a shelf cabinet can have
    // several named shelves (each its own storage_rows entry with its own
    // zone id), so this aggregates all of them into one browsable list
    // instead of the grid's single row/col addressing.
    _openShelfPanel(cabinet) {
        this._shelfPanelCabinet = cabinet;
        this._shelfPanelWines = this._wines.filter((w) => w.cabinet_id === cabinet.id && (w.zone || "").startsWith("storage-"));
        this._shelfPanelOpen = true;
    }
    _closeShelfPanel() {
        this._shelfPanelOpen = false;
    }
    _refreshShelfPanel() {
        if (!this._shelfPanelOpen || !this._shelfPanelCabinet)
            return;
        const fresh = this._cabinets.find((c) => c.id === this._shelfPanelCabinet.id);
        if (fresh)
            this._shelfPanelCabinet = fresh;
        this._shelfPanelWines = this._wines.filter((w) => w.cabinet_id === this._shelfPanelCabinet.id && (w.zone || "").startsWith("storage-"));
    }
    _getShelfPanelRows() {
        return (this._shelfPanelCabinet?.storage_rows || []).filter((sr) => sr.type === "shelf");
    }
    _onShelfPanelSlotClick(zone, depth, wine) {
        if (!this._shelfPanelCabinet)
            return;
        if (wine) {
            this._selectedWine = wine;
            this._detailMode = "cellar";
            this._showDetail = true;
            return;
        }
        if (this._copiedWine) {
            this._pasteWine(this._shelfPanelCabinet.id, null, null, depth, zone, true);
            return;
        }
        if (this._movingWine) {
            this._executeMoveWine(this._shelfPanelCabinet.id, null, null, zone, depth, true);
            return;
        }
        this._addPreselect = { cabinet: this._shelfPanelCabinet.id, row: null, col: null, zone, depth };
        this._showAddDialog = true;
    }
    _onShelfPanelDragStart(e, wine) {
        this._shelfPanelDragWineId = wine.id;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", JSON.stringify({
                wineId: wine.id,
                cabinetId: wine.cabinet_id,
                row: wine.row ?? null,
                col: wine.col ?? null,
                zone: wine.zone || "",
                depth: wine.depth ?? null,
            }));
        }
    }
    _onShelfPanelDragEnd() {
        this._shelfPanelDragWineId = null;
        this._shelfPanelDragOverKey = null;
    }
    _onShelfPanelDragOver(e, key) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
        this._shelfPanelDragOverKey = key;
    }
    // Exact-slot swap/place — every shelf slot has a fixed physical position,
    // so (unlike bulk) this never falls back to "first free"/on-top-of-pile.
    async _onShelfPanelDrop(e, targetZone, targetDepth, targetWine) {
        e.preventDefault();
        this._shelfPanelDragOverKey = null;
        const draggedId = this._shelfPanelDragWineId;
        this._shelfPanelDragWineId = null;
        if (!draggedId || !this._shelfPanelCabinet || draggedId === targetWine?.id)
            return;
        const draggedWine = this._wines.find((w) => w.id === draggedId);
        if (!draggedWine)
            return;
        if (draggedWine.zone === targetZone && (draggedWine.depth ?? null) === targetDepth)
            return;
        try {
            if (targetWine) {
                await this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: this._shelfPanelCabinet.id,
                    zone: draggedWine.zone || "",
                    depth: draggedWine.depth || 0,
                });
            }
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: draggedWine.id,
                cabinet_id: this._shelfPanelCabinet.id,
                zone: targetZone,
                depth: targetDepth,
            });
            this._showToast(this._t("toast.wineReordered"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to reorder wine:", err);
            this._showToast(this._t("toast.reorderFailed"));
        }
    }
    // Every physical (row, col) slot in the rack, skipping bulk/box storage rows.
    _getRackSlots() {
        return this._rackPanelCabinet ? getRackSlots(this._rackPanelCabinet) : [];
    }
    // Adds exactly one new slot. A rack is a strict rows×cols rectangle, so
    // growing either axis by 1 adds that many slots (all of the other axis).
    // Grow whichever axis is smaller to add as few slots as possible — for the
    // common single-row rack (rows=1) this always adds exactly 1 slot.
    _addRackSlot() {
        if (!this._rackPanelCabinet)
            return;
        const { rows, cols } = this._rackPanelCabinet;
        if (rows <= cols) {
            this._resizeRack({ cols: cols + 1 });
        }
        else {
            this._resizeRack({ rows: rows + 1 });
        }
    }
    async _resizeRack(updates) {
        if (!this._rackPanelCabinet)
            return;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_cabinet",
                cabinet_id: this._rackPanelCabinet.id,
                updates,
            });
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to resize rack:", err);
            this._showToast(this._t("toast.rackResizeFailed"));
        }
    }
    // A rack is a strict rows×cols rectangle, so only the trailing slot can be
    // removed without leaving a hole the grid can't represent.
    _isLastRackSlot(row, col) {
        const slots = this._getRackSlots();
        if (slots.length === 0)
            return false;
        const last = slots[slots.length - 1];
        return last.row === row && last.col === col;
    }
    async _deleteRackSlot(row, col) {
        if (!this._rackPanelCabinet)
            return;
        const { rows, cols } = this._rackPanelCabinet;
        if (rows <= 1 && cols <= 1) {
            this._showToast(this._t("toast.rackTooSmall"));
            return;
        }
        const wine = this._rackPanelWines.find((w) => w.row === row && w.col === col);
        const warning = wine
            ? this._t("toast.deleteThisSlotConfirmNamed", { name: wine.name })
            : this._t("toast.deleteThisSlotConfirm");
        if (!window.confirm(warning))
            return;
        try {
            if (wine) {
                await this.hass.callWS({
                    type: "wine_cellar/update_wine",
                    wine_id: wine.id,
                    updates: { cabinet_id: "", row: null, col: null, zone: "", depth: 0 },
                });
            }
            if (cols >= rows && cols > 1) {
                await this._resizeRack({ cols: cols - 1 });
            }
            else {
                await this._resizeRack({ rows: rows - 1 });
            }
            this._showToast(wine ? this._t("toast.slotDeletedUnassigned") : this._t("toast.slotDeleted"));
        }
        catch (err) {
            console.error("Failed to delete slot:", err);
            this._showToast(this._t("toast.deleteSlotFailed"));
        }
    }
    _onRackPanelSlotClick(row, col, wine) {
        const cabinet = this._rackPanelCabinet;
        if (!cabinet)
            return;
        const cabinetDepth = cabinet.depth || 1;
        if (cabinetDepth >= 2) {
            // Multi-depth cells are handled by the existing depth panel.
            const wines = this._rackPanelWines.filter((w) => w.row === row && w.col === col);
            this._closeRackPanel();
            this._openDepthPanel(cabinet, row, col, wines, cabinetDepth);
            return;
        }
        if (wine) {
            this._selectedWine = wine;
            this._detailMode = "cellar";
            this._showDetail = true;
            return;
        }
        if (this._copiedWine) {
            this._pasteWine(cabinet.id, row, col, 0);
            return;
        }
        if (this._movingWine) {
            this._executeMoveWine(cabinet.id, row, col, "", 0);
            return;
        }
        if (this._movingBuyListItem) {
            this._executeMoveTocellar(cabinet.id, row, col, "", 0);
            return;
        }
        this._addPreselect = { cabinet: cabinet.id, row, col, zone: "", depth: 0 };
        this._showAddDialog = true;
    }
    _onRackPanelDragStart(e, wine) {
        this._rackPanelDragWineId = wine.id;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", JSON.stringify({
                wineId: wine.id,
                cabinetId: wine.cabinet_id,
                row: wine.row ?? null,
                col: wine.col ?? null,
                zone: wine.zone || "",
            }));
        }
    }
    _onRackPanelDragEnd() {
        this._rackPanelDragWineId = null;
        this._rackPanelDragOverKey = null;
    }
    _onRackPanelDragOver(e, key) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
        this._rackPanelDragOverKey = key;
    }
    // Swap/move the dragged wine into the target (row, col) slot.
    async _onRackPanelReorder(e, targetRow, targetCol, targetWine) {
        e.preventDefault();
        this._rackPanelDragOverKey = null;
        const draggedId = this._rackPanelDragWineId;
        this._rackPanelDragWineId = null;
        if (!draggedId || !this._rackPanelCabinet || draggedId === targetWine?.id)
            return;
        const draggedWine = this._rackPanelWines.find((w) => w.id === draggedId);
        if (!draggedWine || (draggedWine.row === targetRow && draggedWine.col === targetCol))
            return;
        try {
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: draggedWine.id,
                cabinet_id: this._rackPanelCabinet.id,
                row: targetRow,
                col: targetCol,
                zone: "",
            });
            if (targetWine) {
                await this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: this._rackPanelCabinet.id,
                    row: draggedWine.row,
                    col: draggedWine.col,
                    zone: "",
                });
            }
            this._showToast(this._t("toast.wineReordered"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to reorder wine:", err);
            this._showToast(this._t("toast.reorderFailed"));
        }
    }
    async _executeMoveWine(cabinetId, row, col, zone, depth = 0, exactPosition = false) {
        if (!this._movingWine)
            return;
        try {
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: this._movingWine.id,
                cabinet_id: cabinetId,
                zone,
                depth,
                // Bulk/zone moves have no X/Y; the backend schema rejects row/col
                // sent as null, so only include them when they're actually set.
                ...(row !== null ? { row } : {}),
                ...(col !== null ? { col } : {}),
            });
            // A slot zone (shelf) was given its exact depth above — reordering
            // to the top of the pile would scramble every other bottle's fixed
            // position there, so only bulk/box zones get that treatment.
            if (zone && !exactPosition)
                await this._placeOnTopOfBin(cabinetId, zone, [this._movingWine.id]);
            this._showToast(this._t("toast.wineMoved", { name: this._movingWine.name }));
            this._movingWine = null;
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to move wine:", err);
            this._showToast(this._t("toast.moveFailed"));
        }
    }
    async _onWineDrop(e) {
        const d = e.detail;
        // Slot zone (shelf): the target IS the exact slot the drop landed on,
        // not a "reorder near this bottle" or "first free depth" placement —
        // swap if occupied, place directly if empty. Handled separately so it
        // never falls into the bulk-zone reorder heuristic below (which would
        // otherwise trigger for any same-zone shelf-to-shelf drag).
        if (d.explicitDepth) {
            await this._onExactSlotDrop(d);
            return;
        }
        // Reordering within the same bulk zone: dropped on/near another bottle
        // there, so insert before/after it (whichever side the drop landed on)
        // and reflow the whole zone to sequential depths — a straight two-item
        // depth swap couldn't move a bottle to the front/back of a longer bin.
        if (d.targetWineId &&
            d.targetWineId !== d.wineId &&
            d.sourceCabinetId === d.targetCabinetId &&
            d.sourceZone &&
            d.sourceZone === d.targetZone) {
            try {
                const zoneWines = this._wines
                    .filter((w) => w.cabinet_id === d.targetCabinetId && w.zone === d.targetZone)
                    .sort((a, b) => (a.depth || 0) - (b.depth || 0));
                const fromIdx = zoneWines.findIndex((w) => w.id === d.wineId);
                if (fromIdx === -1)
                    return;
                const [moved] = zoneWines.splice(fromIdx, 1);
                const toIdx = zoneWines.findIndex((w) => w.id === d.targetWineId);
                if (toIdx === -1)
                    return;
                zoneWines.splice(d.insertBefore ? toIdx : toIdx + 1, 0, moved);
                // One renumbering rather than a move per bottle: dragging within a
                // full twenty-bottle bin used to fire up to twenty calls, each with
                // its own disk write on the other side.
                await this.hass.callWS({
                    type: "wine_cellar/reorder_zone",
                    cabinet_id: d.targetCabinetId,
                    zone: d.targetZone,
                    wine_ids: zoneWines.map((w) => w.id),
                });
                this._showToast(this._t("toast.wineReordered"));
                await this._loadData();
            }
            catch (err) {
                console.error("Failed to reorder wine:", err);
                this._showToast(this._t("toast.reorderFailed"));
            }
            return;
        }
        // Don't drop on same position. Only meaningful for grid slots — bulk/box
        // zones have no row/col (always null), so this would always match and
        // silently block reordering within the same zone.
        if (!d.targetZone && d.sourceCabinetId === d.targetCabinetId && d.sourceRow === d.targetRow && d.sourceCol === d.targetCol && d.sourceZone === d.targetZone)
            return;
        // Set once the first half of a swap has happened, so a failure in the
        // second half can be undone.
        let swappedBack = null;
        try {
            // Check if target cell has a wine (swap)
            let targetWine;
            if (d.targetRow !== null && d.targetCol !== null && !d.targetZone) {
                targetWine = this._wines.find((w) => w.cabinet_id === d.targetCabinetId && w.row === d.targetRow && w.col === d.targetCol);
            }
            if (targetWine) {
                // Swap: move target wine to source position first
                await this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: d.sourceCabinetId,
                    zone: d.sourceZone || "",
                    // Slot targets carry real X/Y coordinates; Bulk/zone targets have
                    // none, and the backend schema rejects row/col sent as null, so
                    // only include them when they're actually set.
                    ...(d.sourceRow !== null && d.sourceRow !== undefined ? { row: d.sourceRow } : {}),
                    ...(d.sourceCol !== null && d.sourceCol !== undefined ? { col: d.sourceCol } : {}),
                });
                // Half of a swap is not a state the rack can be in: the target bottle
                // is now sitting where the dragged one still is. If the second half
                // fails, put it back before reporting the failure.
                swappedBack = () => this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: d.targetCabinetId,
                    zone: d.targetZone || "",
                    ...(d.targetRow !== null && d.targetRow !== undefined ? { row: d.targetRow } : {}),
                    ...(d.targetCol !== null && d.targetCol !== undefined ? { col: d.targetCol } : {}),
                });
            }
            // Dropped into a bulk/box zone's general area (not swapped onto a
            // specific bottle above): land past the last occupied depth instead
            // of defaulting to 0, which would collide with whatever wine is
            // already at depth 0 and — since depth-sorting is stable — look like
            // the drop silently did nothing.
            let targetDepth;
            if (d.targetZone) {
                const occupants = this._wines.filter((w) => w.cabinet_id === d.targetCabinetId && w.zone === d.targetZone && w.id !== d.wineId);
                const targetCabinet = this._cabinets.find((c) => c.id === d.targetCabinetId);
                const rowIdx = parseInt(d.targetZone.replace("storage-", ""), 10);
                const storageRow = targetCabinet?.storage_rows?.find((s) => s.row === rowIdx);
                const capacity = storageRow?.capacity || 20;
                targetDepth = this._firstFreeDepth(d.targetCabinetId, d.targetZone, d.wineId);
                if (storageRow && (occupants.length >= capacity || targetDepth >= capacity)) {
                    this._showToast(this._t("toast.zoneFullMove", { zone: storageRow.name || "Zone" }));
                    return;
                }
            }
            // Move dragged wine to target
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: d.wineId,
                cabinet_id: d.targetCabinetId,
                zone: d.targetZone || "",
                ...(d.targetRow !== null && d.targetRow !== undefined ? { row: d.targetRow } : {}),
                ...(d.targetCol !== null && d.targetCol !== undefined ? { col: d.targetCol } : {}),
                ...(targetDepth !== undefined ? { depth: targetDepth } : {}),
            });
            // Dropped into a bin's open area rather than onto a specific bottle:
            // that is putting it on the pile, so it lands on top. A drop *onto* a
            // bottle is a deliberate position and is left exactly where it fell.
            if (d.targetZone && !targetWine) {
                await this._placeOnTopOfBin(d.targetCabinetId, d.targetZone, [d.wineId]);
            }
            // Same container (rack/bin/box) = reordering; a different one = an
            // actual move between containers.
            const sameContainer = d.sourceCabinetId === d.targetCabinetId;
            this._showToast(sameContainer ? this._t("toast.wineReordered") : targetWine ? this._t("toast.wineSwapped") : this._t("toast.wineMovedShort"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to move wine:", err);
            if (swappedBack) {
                try {
                    await swappedBack();
                }
                catch (undoErr) {
                    console.error("Failed to undo half-completed swap:", undoErr);
                    this._showToast(this._t("toast.moveUndoFailed"));
                    await this._loadData();
                    return;
                }
            }
            this._showToast(this._t("toast.moveFailed"));
            await this._loadData();
        }
    }
    // Drop onto an exact slot (currently only shelf zones): swap with
    // whatever's already there, or place directly if the slot is empty.
    // No "first free depth"/on-top-of-pile logic — the dropped-on slot is
    // exactly where the bottle goes.
    async _onExactSlotDrop(d) {
        if (d.sourceCabinetId === d.targetCabinetId &&
            d.sourceZone === d.targetZone &&
            d.sourceRow === d.targetRow &&
            d.sourceCol === d.targetCol &&
            (d.sourceDepth ?? null) === d.targetDepth) {
            return;
        }
        let swappedBack = null;
        try {
            const targetWine = d.targetWineId ? this._wines.find((w) => w.id === d.targetWineId) : undefined;
            if (targetWine) {
                // Swap: move the occupant to the dragged bottle's old slot first.
                await this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: d.sourceCabinetId,
                    zone: d.sourceZone || "",
                    ...(d.sourceRow !== null && d.sourceRow !== undefined ? { row: d.sourceRow } : {}),
                    ...(d.sourceCol !== null && d.sourceCol !== undefined ? { col: d.sourceCol } : {}),
                    ...(d.sourceDepth !== null && d.sourceDepth !== undefined ? { depth: d.sourceDepth } : {}),
                });
                // Half of a swap is not a state the rack can be in: the target bottle
                // is now sitting where the dragged one still is. If the second half
                // fails, put it back before reporting the failure.
                swappedBack = () => this.hass.callWS({
                    type: "wine_cellar/move_wine",
                    wine_id: targetWine.id,
                    cabinet_id: d.targetCabinetId,
                    zone: d.targetZone || "",
                    depth: d.targetDepth,
                });
            }
            await this.hass.callWS({
                type: "wine_cellar/move_wine",
                wine_id: d.wineId,
                cabinet_id: d.targetCabinetId,
                zone: d.targetZone || "",
                depth: d.targetDepth,
            });
            const sameContainer = d.sourceCabinetId === d.targetCabinetId;
            this._showToast(sameContainer ? this._t("toast.wineReordered") : targetWine ? this._t("toast.wineSwapped") : this._t("toast.wineMovedShort"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to move wine:", err);
            if (swappedBack) {
                try {
                    await swappedBack();
                }
                catch (undoErr) {
                    console.error("Failed to undo half-completed swap:", undoErr);
                    this._showToast(this._t("toast.moveUndoFailed"));
                    await this._loadData();
                    return;
                }
            }
            this._showToast(this._t("toast.moveFailed"));
            await this._loadData();
        }
    }
    // Tap-to-move equivalent of dragging onto an occupied slot (see
    // _onExactSlotDrop for the drag-and-drop version) — Android has no real
    // drag-and-drop, so long-press-then-tap is its stand-in, and tapping an
    // occupied target should swap just as dropping onto one does instead of
    // falling through to "open its detail". Used by both the classic grid
    // (row/col) and slot-addressable zones (shelf/quinconce, zone+depth);
    // bulk/box zones have no fixed per-slot occupancy for this to mean the
    // same thing, so callers only reach here when there's an actual slot.
    async _executeSwapWine(target, targetWine) {
        const movingWine = this._movingWine;
        if (!movingWine || movingWine.id === targetWine.id)
            return;
        const targetPayload = { cabinet_id: target.cabinetId, zone: target.zone || "" };
        if (target.row != null)
            targetPayload.row = target.row;
        if (target.col != null)
            targetPayload.col = target.col;
        if (target.depth != null)
            targetPayload.depth = target.depth;
        const originPayload = { cabinet_id: movingWine.cabinet_id, zone: movingWine.zone || "" };
        if (movingWine.row !== null)
            originPayload.row = movingWine.row;
        if (movingWine.col !== null)
            originPayload.col = movingWine.col;
        if (movingWine.zone || movingWine.row !== null)
            originPayload.depth = movingWine.depth ?? 0;
        let swappedBack = null;
        try {
            await this.hass.callWS({ type: "wine_cellar/move_wine", wine_id: targetWine.id, ...originPayload });
            // Half of a swap is not a state the rack can be in: the target bottle
            // is now sitting where the moving one still is. If the second half
            // fails, put it back before reporting the failure.
            swappedBack = () => this.hass.callWS({ type: "wine_cellar/move_wine", wine_id: targetWine.id, ...targetPayload });
            await this.hass.callWS({ type: "wine_cellar/move_wine", wine_id: movingWine.id, ...targetPayload });
            this._showToast(this._t("toast.wineSwapped"));
            this._movingWine = null;
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to swap wine:", err);
            if (swappedBack) {
                try {
                    await swappedBack();
                }
                catch (undoErr) {
                    console.error("Failed to undo half-completed swap:", undoErr);
                    this._showToast(this._t("toast.moveUndoFailed"));
                    await this._loadData();
                    return;
                }
            }
            this._showToast(this._t("toast.moveFailed"));
            await this._loadData();
        }
    }
    _copyWine(wine) {
        this._copiedWine = wine;
        this._showToast(this._t("toast.wineCopied", { name: wine.name }));
        this._showDetail = false;
        // Close any open side panel and show every rack, so the whole cellar is reachable to paste into.
        this._zonePanelOpen = false;
        this._rackPanelOpen = false;
        this._shelfPanelOpen = false;
        this._depthPanelOpen = false;
        this._activeTab = "all";
    }
    async _pasteWine(cabinetId, row, col, depth = 0, zone = "", exactPosition = false) {
        if (!this._copiedWine)
            return;
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/add_wine",
                wine: {
                    barcode: this._copiedWine.barcode,
                    name: this._copiedWine.name,
                    winery: this._copiedWine.winery,
                    region: this._copiedWine.region,
                    country: this._copiedWine.country,
                    vintage: this._copiedWine.vintage,
                    type: this._copiedWine.type,
                    grape_variety: this._copiedWine.grape_variety,
                    rating: this._copiedWine.rating,
                    image_url: this._copiedWine.image_url,
                    back_image_url: this._copiedWine.back_image_url,
                    price: this._copiedWine.price,
                    retail_price: this._copiedWine.retail_price,
                    retail_price_currency: this._copiedWine.retail_price_currency,
                    purchase_date: this._copiedWine.purchase_date,
                    drink_by: this._copiedWine.drink_by,
                    notes: this._copiedWine.notes,
                    description: this._copiedWine.description,
                    food_pairings: this._copiedWine.food_pairings,
                    alcohol: this._copiedWine.alcohol,
                    ratings_count: this._copiedWine.ratings_count,
                    cabinet_id: cabinetId,
                    row,
                    col,
                    depth,
                    zone,
                    user_rating: this._copiedWine.user_rating,
                    tasting_notes: this._copiedWine.tasting_notes,
                    disposition: this._copiedWine.disposition,
                    drink_window: this._copiedWine.drink_window,
                    ai_ratings: this._copiedWine.ai_ratings,
                    vivino_updated_at: this._copiedWine.vivino_updated_at,
                    vivino_checked_at: this._copiedWine.vivino_checked_at,
                    ai_updated_at: this._copiedWine.ai_updated_at,
                    ai_checked_at: this._copiedWine.ai_checked_at,
                    vivino_id: this._copiedWine.vivino_id,
                    // Keep the source: a copy of a Vivino-synced bottle must stay part
                    // of the reconciliation (count pushes, removal candidates), or it
                    // becomes an invisible manual bottle with a vivino_id.
                    source: this._copiedWine.source,
                },
            });
            const pasted = result?.wine?.id;
            // A slot zone (shelf) was given its exact depth above — reordering
            // to the top of the pile would scramble every other bottle's fixed
            // position there, so only bulk/box zones get that treatment.
            if (zone && pasted && !exactPosition)
                await this._placeOnTopOfBin(cabinetId, zone, [pasted]);
            this._showToast(this._t("toast.winePasted"));
            await this._loadData();
        }
        catch {
            this._showToast(this._t("toast.pasteFailed"));
        }
    }
    // --- Batch AI Analysis ---
    _batchAnalyzeWines() {
        if (this._wines.length > 5) {
            this._showBatchAiConfirm = true;
            return;
        }
        this._runBatchAnalyzeWines();
    }
    async _runBatchAnalyzeWines() {
        this._showBatchAiConfirm = false;
        this._analyzing = true;
        this._showToast(this._t("toast.aiBatchRunning"));
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/batch_analyze_wines",
            });
            if (result.error) {
                this._showToast(this._t("toast.aiBatchFailedError", { error: result.error }));
            }
            else {
                const parts = [this._t("toast.aiBatchComplete", { updated: result.updated, total: result.total })];
                if (result.errors > 0)
                    parts.push(this._t("toast.errorsCount", { n: result.errors }));
                this._showToast(parts.join(" "));
                await this._loadData();
            }
        }
        catch (err) {
            this._showToast(this._t("toast.aiBatchFailed"));
        }
        this._analyzing = false;
    }
    // --- Arrangement ---
    // Recomputed on render rather than cached: it reads the same wines and
    // cabinets the card already holds, and a stale count would point at moves
    // that have since been made.
    get _arrangementFindings() {
        // Read from render(), so it ran on every keystroke in the search box even
        // though typing cannot change how the cellar is arranged. Cached against
        // the three things it actually depends on — all replaced wholesale rather
        // than mutated, so identity is a sound key.
        if (this._findingsCache &&
            this._findingsCache.wines === this._wines &&
            this._findingsCache.cabinets === this._cabinets &&
            this._findingsCache.dismissed === this._dismissedArrangements) {
            return this._findingsCache.findings;
        }
        const findings = analyzeArrangement(this._wines, this._cabinets, this._dismissedArrangements, this.hass?.language);
        this._findingsCache = {
            wines: this._wines,
            cabinets: this._cabinets,
            dismissed: this._dismissedArrangements,
            findings,
        };
        return findings;
    }
    // "Leave it as it is" has to stick, or the count becomes a badge people
    // learn to ignore. Applied locally first so the finding disappears at once.
    async _dismissArrangement(id) {
        if (this._dismissedArrangements.includes(id))
            return;
        const previous = this._dismissedArrangements;
        const next = [...previous, id];
        this._dismissedArrangements = next;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { dismissed_arrangements: next },
            });
        }
        catch (err) {
            this._dismissedArrangements = previous;
            this._showToast(this._t("toast.dismissSuggestionFailed"));
        }
    }
    // --- Metadata language (Vivino/AI) ---
    async _setMetadataLanguage(lang) {
        if (lang === this._metadataLanguage)
            return;
        const previous = this._metadataLanguage;
        this._metadataLanguage = lang;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { metadata_language: lang },
            });
        }
        catch (err) {
            this._metadataLanguage = previous;
            this._showToast(this._t("toast.changeLanguageFailed"));
        }
    }
    async _setMetadataCurrency(currency) {
        if (currency === this._metadataCurrency)
            return;
        const previous = this._metadataCurrency;
        this._metadataCurrency = currency;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { metadata_currency: currency },
            });
        }
        catch (err) {
            this._metadataCurrency = previous;
            this._showToast(this._t("toast.changeCurrencyFailed"));
        }
    }
    async _setAiFallbackAlways(value) {
        if (value === this._aiFallbackAlways)
            return;
        const previous = this._aiFallbackAlways;
        this._aiFallbackAlways = value;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { ai_fallback_always: value },
            });
        }
        catch (err) {
            this._aiFallbackAlways = previous;
            this._showToast(this._t("toast.changeAiFallbackFailed"));
        }
    }
    async _setEnableWhisky(value) {
        if (value === this._enableWhisky)
            return;
        const previous = this._enableWhisky;
        this._enableWhisky = value;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { enable_whisky: value },
            });
        }
        catch (err) {
            this._enableWhisky = previous;
            this._showToast(this._t("toast.changeEnableWhiskyFailed"));
        }
    }
    async _setDefaultWineType(value) {
        if (value === this._defaultWineType)
            return;
        const previous = this._defaultWineType;
        this._defaultWineType = value;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { default_wine_type: value },
            });
        }
        catch (err) {
            this._defaultWineType = previous;
            this._showToast(this._t("toast.changeDefaultWineTypeFailed"));
        }
    }
    async _setDispositionDisplay(value) {
        if (value === this._dispositionDisplay)
            return;
        const previous = this._dispositionDisplay;
        this._dispositionDisplay = value;
        try {
            await this.hass.callWS({
                type: "wine_cellar/update_settings",
                updates: { disposition_display: value },
            });
        }
        catch (err) {
            this._dispositionDisplay = previous;
            this._showToast(this._t("toast.changeDispositionDisplayFailed"));
        }
    }
    // Uploads value (a data URL straight from the file picker) or clears the
    // background when value is null. Shrunk first: a phone photo is several MB
    // and a card background never needs more than a screen's worth of pixels.
    async _setCardBackground(value) {
        try {
            let image = null;
            if (value) {
                image = await resizeImageForStorage(value.split(",", 2)[1] || "", 1920, 0.82);
                if (!image)
                    throw new Error("unreadable image");
            }
            const result = await this.hass.callWS({
                type: "wine_cellar/set_card_background",
                ...(image ? { image } : {}),
            });
            this._cardBackground = result?.card_background || null;
        }
        catch (err) {
            this._showToast(this._t("toast.changeCardBackgroundFailed"));
        }
    }
    // --- Batch Vivino Refresh ---
    _batchRefreshVivino() {
        this._batchAiFallback = this._aiFallbackAlways;
        this._showBatchVivinoConfirm = true;
    }
    async _runBatchVivino(photoMode) {
        this._showBatchVivinoConfirm = false;
        this._batchVivino = true;
        this._showToast(this._t("toast.vivinoRefreshing"));
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/batch_refresh_vivino",
                photo_mode: photoMode,
                ai_fallback: this._batchAiFallback ? "use" : "skip",
            });
            if (result.error) {
                this._showToast(this._t("toast.vivinoBatchFailedError", { error: result.error }));
            }
            else {
                const parts = [this._t("toast.vivinoBatchComplete", { updated: result.updated, total: result.total })];
                if (result.photos_updated)
                    parts.push(this._t("toast.vivinoPhotosUpdated", { n: result.photos_updated }));
                if (result.photos_kept)
                    parts.push(this._t("toast.vivinoPhotosKept", { n: result.photos_kept }));
                if (result.ai_fallback_used)
                    parts.push(this._t("toast.vivinoAiFallbackUsed", { n: result.ai_fallback_used }));
                const unresolvedMismatch = (result.mismatched || 0) - (result.ai_fallback_used || 0);
                if (unresolvedMismatch > 0)
                    parts.push(this._t("toast.vivinoNoMatch", { n: unresolvedMismatch }));
                if (result.errors > 0)
                    parts.push(this._t("toast.errorsCount", { n: result.errors }));
                this._showToast(parts.join(", "));
                await this._loadData();
            }
        }
        catch (err) {
            this._showToast(this._t("toast.vivinoBatchRefreshFailed"));
        }
        this._batchVivino = false;
    }
    // --- Vivino Account Sync ---
    get _vivinoSyncMode() {
        return this._vivinoMode === "sync";
    }
    // --- Pending Vivino removals: the user picks the actual bottle ---
    _removalCandidates(vid) {
        return this._wines.filter((w) => String(w.vivino_id || "") === vid &&
            String(w.source || "").startsWith("vivino"));
    }
    get _removalHighlightIds() {
        const vid = this._removalFocusVid || this._conflictFocusVid;
        return vid ? this._removalCandidates(vid).map((w) => w.id) : [];
    }
    _conflictLabel(vid) {
        const w = this._removalCandidates(vid)[0];
        if (!w)
            return this._t("ui.card.vivinoWineFallback", { vid });
        return `${w.winery ? `${w.winery} — ` : ""}${w.name}${w.vintage ? ` (${w.vintage})` : ""}`;
    }
    async _confirmConflictResolution() {
        const vid = this._conflictConfirmVid;
        if (!vid || this._conflictResolving)
            return;
        this._conflictConfirmVid = null;
        this._conflictResolving = vid;
        const target = this._removalCandidates(vid).length;
        try {
            const res = await this.hass.callWS({
                type: "wine_cellar/resolve_vivino_conflict",
                vivino_id: vid,
            });
            if (res.error) {
                this._showToast(res.error);
                return;
            }
            this._vivinoConflicts = res.conflicts || [];
            this._conflictFocusVid = null;
            this._showToast(target === 1
                ? this._t("toast.vivinoConflictUpdatedOne", { n: target })
                : this._t("toast.vivinoConflictUpdatedMany", { n: target }));
            await this._loadData();
        }
        catch {
            this._showToast(this._t("toast.vivinoConflictUpdateFailed"));
        }
        finally {
            this._conflictResolving = null;
        }
    }
    _bottlePosition(wine) {
        if (!wine.cabinet_id)
            return this._t("wineLocation.unassigned");
        const cab = this._cabinets.find((c) => c.id === wine.cabinet_id);
        const parts = [cab?.name || this._t("ui.inventory.cabinet")];
        if (wine.zone)
            parts.push(this._t("ui.card.bottlePositionZone", { zone: wine.zone }));
        else if (wine.row != null && wine.col != null) {
            parts.push(this._t("ui.card.bottlePositionRowSlot", { row: Number(wine.row) + 1, col: Number(wine.col) + 1 }));
        }
        return parts.join(", ");
    }
    async _confirmRemovalChoice() {
        const wine = this._removalConfirmWine;
        if (!wine)
            return;
        this._removalConfirmWine = null;
        try {
            const res = await this.hass.callWS({
                type: "wine_cellar/resolve_vivino_removal",
                wine_id: wine.id,
            });
            if (res.error) {
                this._showToast(res.error);
                return;
            }
            this._pendingRemovals = res.pending_removals || {};
            if (this._removalFocusVid && !this._pendingRemovals[this._removalFocusVid]) {
                this._removalFocusVid = null;
            }
            const left = Object.values(this._pendingRemovals).reduce((a, e) => a + (e.count || 0), 0);
            this._showToast(left > 0
                ? this._t("toast.bottleRemovedMoreToChoose", { n: left })
                : this._t("toast.bottleRemovedAllResolved"));
            await this._loadData();
        }
        catch {
            this._showToast(this._t("toast.removeBottleFailed"));
        }
    }
    async _syncVivino() {
        this._vivinoSyncing = true;
        this._showToast(this._vivinoSyncMode ? this._t("toast.vivinoSyncing") : this._t("toast.vivinoImporting"));
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/sync_vivino",
            });
            if (result.error) {
                this._showToast(this._vivinoSyncMode
                    ? this._t("toast.vivinoSyncFailedError", { error: result.error })
                    : this._t("toast.vivinoImportFailedError", { error: result.error }));
            }
            else {
                const bottles = (result.cellar_imported || 0) + (result.my_wines_imported || 0);
                const parts = [
                    this._vivinoSyncMode
                        ? (bottles === 1
                            ? this._t("toast.vivinoSyncCompleteOne", { n: bottles })
                            : this._t("toast.vivinoSyncCompleteMany", { n: bottles }))
                        : (bottles === 1
                            ? this._t("toast.vivinoImportCompleteOne", { n: bottles })
                            : this._t("toast.vivinoImportCompleteMany", { n: bottles })),
                ];
                if (result.cellar_removed > 0) {
                    parts.push(result.cellar_removed === 1
                        ? this._t("toast.vivinoRemovedCountOne", { n: result.cellar_removed })
                        : this._t("toast.vivinoRemovedCountMany", { n: result.cellar_removed }));
                }
                if (result.wishlist_imported > 0)
                    parts.push(this._t("toast.vivinoWishlistAdded", { n: result.wishlist_imported }));
                if (result.cellar_pushed > 0)
                    parts.push(this._t("toast.vivinoPushedCount", { n: result.cellar_pushed }));
                if (result.cellar_removal_choices > 0) {
                    parts.push(result.cellar_removal_choices === 1
                        ? this._t("toast.vivinoRemovalChoicesOne", { n: result.cellar_removal_choices })
                        : this._t("toast.vivinoRemovalChoicesMany", { n: result.cellar_removal_choices }));
                }
                if (result.cellar_conflicts > 0) {
                    parts.push(result.cellar_conflicts === 1
                        ? this._t("toast.vivinoConflictsOne", { n: result.cellar_conflicts })
                        : this._t("toast.vivinoConflictsMany", { n: result.cellar_conflicts }));
                }
                if (result.errors?.length)
                    parts.push(this._t("toast.errorsCount", { n: result.errors.length }));
                this._showToast(parts.join(" "));
                await this._loadData();
            }
        }
        catch (err) {
            this._showToast(this._vivinoSyncMode ? this._t("toast.vivinoSyncFailed") : this._t("toast.vivinoImportFailed"));
        }
        this._vivinoSyncing = false;
    }
    // --- Buy List ---
    _showBuyListDetail(item) {
        this._selectedWine = item;
        this._detailMode = "buylist";
        this._showDetail = true;
    }
    async _removeBuyListItem(itemId) {
        try {
            await this.hass.callWS({
                type: "wine_cellar/remove_from_buy_list",
                item_id: itemId,
            });
            this._showToast(this._t("toast.removedFromBuyList"));
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to remove from buy list", err);
            this._showToast(this._t("toast.removeFromBuyListFailed"));
        }
    }
    _startMoveBuyListItem(item) {
        this._movingBuyListItem = item;
        this._activeTab = "all";
        this._showToast(this._t("toast.tapToPlace", { name: item.name }));
    }
    async _executeMoveTocellar(cabinetId, row, col, zone, depth = 0, exactPosition = false) {
        if (!this._movingBuyListItem)
            return;
        try {
            const result = await this.hass.callWS({
                type: "wine_cellar/move_to_cellar",
                item_id: this._movingBuyListItem.id,
                cabinet_id: cabinetId,
                row,
                col,
                zone,
                depth,
            });
            const moved = result?.wine?.id;
            // A slot zone (shelf) was given its exact depth above — reordering
            // to the top of the pile would scramble every other bottle's fixed
            // position there, so only bulk/box zones get that treatment.
            if (zone && moved && !exactPosition)
                await this._placeOnTopOfBin(cabinetId, zone, [moved]);
            this._showToast(this._t("toast.movedToCellar", { name: this._movingBuyListItem.name }));
            this._movingBuyListItem = null;
            await this._loadData();
        }
        catch (err) {
            console.error("Failed to move to cellar:", err);
            this._showToast(this._t("toast.moveToCellarFailed"));
        }
    }
    async _onRemoveWine(e) {
        try {
            const { wine_id, reason, name, personal_rating, drink_notes, buy_again } = e.detail;
            const msg = { type: "wine_cellar/remove_wine", wine_id, reason: reason || "other" };
            // Only the Drink button sends a tasting log.
            if (buy_again !== undefined)
                Object.assign(msg, { personal_rating, drink_notes, buy_again });
            await this.hass.callWS(msg);
            await this._loadData();
            if (reason === "drank" && name)
                this._showToast(this._t("toast.wineDrunk", { name }));
        }
        catch (err) {
            console.error("Failed to remove wine", err);
            this._showToast(this._t("toast.removeWineFailed"));
        }
    }
    async _onWineAdded() {
        await this._loadData();
    }
    _onSearch(e) {
        this._searchQuery = e.detail.query;
        this._searchFilter = e.detail.filter;
    }
    _getCabinetWines(cabinetId) {
        return this._wines.filter((w) => w.cabinet_id === cabinetId);
    }
    _getUnassignedWines() {
        const cabinetIds = new Set(this._cabinets.map((c) => c.id));
        return this._wines.filter((w) => !w.cabinet_id || !cabinetIds.has(w.cabinet_id));
    }
    render() {
        if (this._loading) {
            return b$1 `
        <ha-card>
          <div class="loading">${this._t("ui.card.loading")}</div>
        </ha-card>
      `;
        }
        const title = this._config?.title || "Cork Dork";
        const filteredWines = this._getFilteredWines();
        const isSearching = !!(this._searchQuery || this._searchFilter !== "all");
        const unassignedWines = this._getUnassignedWines();
        const showGrid = !isSearching && this._activeTab !== "buy-list" && this._activeTab !== "unassigned" && (this._activeTab === "all" || this._cabinets.some((c) => c.id === this._activeTab));
        const showBuyList = this._activeTab === "buy-list" && !isSearching;
        const showUnassigned = this._activeTab === "unassigned" && !isSearching;
        return b$1 `
      <ha-card>
        <div
          class="card-bg ${this._cardBackground ? "custom" : ""}"
          style=${this._cardBackground ? `--wc-card-bg-image:url("${this._cardBackground}")` : ""}
        ></div>
        <div class="header-row">
          <div class="title">
            <span class="title-icon">🍷</span>
            <div class="title-text">
              <div>${title}</div>
            </div>
          </div>
          <div class="header-actions">
            ${this._hasVivinoAccount ? b$1 `
              <button
                class="btn btn-primary"
                style="font-size: 0.8em; padding: 5px 10px; background: #b71c1c;"
                @click=${this._syncVivino}
                title="${this._vivinoSyncMode ? this._t("ui.card.syncVivinoTitle") : this._t("ui.card.importVivinoTitle")}"
                ?disabled=${this._vivinoSyncing || this._batchVivino || this._analyzing}
              >
                ${this._vivinoSyncing
            ? (this._vivinoSyncMode ? this._t("ui.card.vivinoSyncing") : this._t("ui.card.vivinoImporting"))
            : (this._vivinoSyncMode ? this._t("ui.card.vivinoSyncBtn") : this._t("ui.card.vivinoImportBtn"))}
              </button>
            ` : A$1}
            <button
              class="btn btn-primary"
              style="font-size: 0.8em; padding: 5px 10px; background: #5e3557;"
              @click=${() => {
            this._inventoryPairing = false;
            this._showInventory = true;
        }}
              title="${this._t("ui.card.inventoryTitle")}"
            >
              ${this._t("ui.card.inventoryBtn")}
            </button>
            <button
              class="btn btn-primary"
              style="font-size: 0.8em; padding: 5px 10px; background: #5d4037;"
              @click=${() => {
            this._inventoryPairing = true;
            this._showInventory = true;
        }}
              title="${this._t("ui.card.pairingsTitle")}"
            >
              ${this._t("ui.card.pairingsBtn")}
            </button>
            <button
              class="btn btn-primary"
              @click=${() => {
            this._addPreselect = { cabinet: "", row: null, col: null, zone: "", depth: 0 };
            this._showAddDialog = true;
        }}
              style="display: inline-flex; align-items: center; gap: 4px;"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" fill-rule="evenodd" aria-hidden="true">
                <path d="M10 2h4v1h-.5v4.2c0 .9.5 1.7 1.2 2.2A4.5 4.5 0 0 1 16.5 13v8a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-8a4.5 4.5 0 0 1 1.8-3.6c.7-.5 1.2-1.3 1.2-2.2V3H10V2zm-1 12v4h6v-4H9z" />
              </svg>
              ${this._t("ui.card.addWineBtn")}
            </button>
          </div>
        </div>

        <!-- Copy mode banner -->
        ${this._copiedWine
            ? b$1 `
              <div class="copy-banner">
                <span>📋 ${this._t("ui.card.copyBannerText", { name: this._copiedWine.name })}</span>
                <button @click=${() => (this._copiedWine = null)}>✕ ${this._t("ui.card.doneBtn")}</button>
              </div>
            `
            : A$1}

        <!-- Move mode banner -->
        ${this._movingWine
            ? b$1 `
              <div class="copy-banner">
                <span>📦 ${this._t("ui.card.moveBannerText", { name: this._movingWine.name })}</span>
                <button @click=${() => (this._movingWine = null)}>✕ ${this._t("ui.common.cancel")}</button>
              </div>
            `
            : A$1}

        <!-- Buy list move mode banner -->
        ${this._movingBuyListItem
            ? b$1 `
              <div class="buy-list-banner">
                <span>🛒 ${this._t("ui.card.buyListMoveBannerText", { name: this._movingBuyListItem.name })}</span>
                <button @click=${() => (this._movingBuyListItem = null)}>✕ ${this._t("ui.common.cancel")}</button>
              </div>
            `
            : A$1}

        <!-- Stats bar -->
        ${this._stats
            ? b$1 `
              <div class="stats-bar">
                <div class="stat">
                  <span class="stat-value">${this._stats.total_bottles}</span>
                  ${this._t("ui.card.statBottles")}
                </div>
                <div class="stat">
                  <span class="stat-value">${this._stats.total_capacity}</span>
                  ${this._t("ui.card.statCapacity")}
                </div>
                <div class="stat">
                  <span class="stat-value">${this._stats.available_slots}</span>
                  ${this._t("ui.card.statAvailable")}
                </div>
                ${this._stats.unplaced_bottles > 0
                ? b$1 `
                      <div class="stat" title="${this._t("ui.card.unplacedTitle")}">
                        <span class="stat-value" style="color:#e65100">${this._stats.unplaced_bottles}</span>
                        ${this._t("ui.card.statUnplaced")}
                      </div>
                    `
                : A$1}
                ${this._arrangementFindings.length
                ? b$1 `
                      <div
                        class="stat stat-action"
                        title="${this._t("ui.card.suggestionsTitle")}"
                        @click=${() => (this._showArrangement = true)}
                      >
                        <span class="stat-value">🧹 ${this._arrangementFindings.length}</span>
                        ${this._arrangementFindings.length === 1 ? this._t("ui.card.tidyUp") : this._t("ui.card.tidyUps")}
                      </div>
                    `
                : A$1}
                ${this._stats.total_value
                ? b$1 `
                      <div class="stat">
                        <span class="stat-value">${this._metadataCurrency} ${this._stats.total_value.toLocaleString()}</span>
                        ${this._t("ui.card.statValue")}
                        ${this._stats.total_cost
                    ? b$1 `<span style="font-size:0.75em;color:${this._stats.total_value - this._stats.total_cost >= 0 ? '#2e7d32' : '#c62828'}">${this._stats.total_value - this._stats.total_cost >= 0 ? '+' : ''}${this._metadataCurrency} ${(this._stats.total_value - this._stats.total_cost).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>`
                    : A$1}
                      </div>
                    `
                : A$1}
              </div>
            `
            : A$1}

        <!-- Tab bar -->
        <div class="tab-bar">
          <button
            class="tab ${this._activeTab === "all" ? "active" : ""}"
            @click=${() => (this._activeTab = "all")}
          >
            ${this._t("ui.card.allSections")}
          </button>
          ${this._cabinets.map((cab) => b$1 `
              <button
                class="tab ${this._activeTab === cab.id ? "active" : ""}"
                @click=${() => (this._activeTab = cab.id)}
              >
                ${cab.name}
                (${this._getCabinetWines(cab.id).length})
              </button>
            `)}
          ${unassignedWines.length > 0
            ? b$1 `
                <button
                  class="tab ${this._activeTab === "unassigned" ? "active" : ""}"
                  @click=${() => (this._activeTab = "unassigned")}
                  style="${this._activeTab !== "unassigned" ? "border-color: #e65100; color: #e65100;" : ""}"
                >
                  ${this._t("ui.card.unassignedTab", { n: unassignedWines.length })}
                </button>
              `
            : A$1}
          <button
            class="tab ${this._activeTab === "buy-list" ? "active" : ""}"
            @click=${() => (this._activeTab = "buy-list")}
            style="${this._activeTab === "buy-list" ? "border-color: #e65100; color: #e65100;" : ""}"
          >
            ${this._t("ui.card.buyListTab", { n: this._buyList.length })}
          </button>
          <button
            class="tab manage-racks-btn"
            @click=${() => (this._showRackSettings = true)}
          >
            ${this._t("ui.card.manageRacks")}
          </button>
          <button
            class="tab settings-tab-btn"
            @click=${() => (this._showVivinoAiSettings = true)}
          >
            ${this._t("ui.card.vivinoAiSettings")}
          </button>
        </div>

        <!-- Search bar -->
        <wine-search-bar
          .hass=${this.hass}
          .value=${this._searchQuery}
          .filter=${this._searchFilter}
          .enableWhisky=${this._enableWhisky}
          @search-change=${this._onSearch}
        ></wine-search-bar>

        <!-- Cabinet grids -->
        ${Object.keys(this._pendingRemovals).length > 0 || this._vivinoConflicts.length > 0 ? b$1 `
          <div class="removal-panel">
            ${Object.keys(this._pendingRemovals).length > 0 ? b$1 `
              <div class="removal-panel-title">${this._t("ui.card.removalPanelTitle")}</div>
              ${Object.entries(this._pendingRemovals).map(([vid, entry]) => b$1 `
                <div
                  class="removal-entry ${this._removalFocusVid === vid ? "active" : ""}"
                  @click=${() => {
            this._removalFocusVid = this._removalFocusVid === vid ? null : vid;
            if (this._removalFocusVid)
                this._conflictFocusVid = null;
        }}
                >
                  <span>${entry.winery ? `${entry.winery} — ` : ""}${entry.name || this._t("ui.card.unknownWine")}${entry.vintage ? ` (${entry.vintage})` : ""}</span>
                  <span class="removal-count">${this._t("ui.card.removalChooseCount", { n: entry.count })}</span>
                </div>
              `)}
              ${this._removalFocusVid ? b$1 `
                <div class="removal-hint">${this._t("ui.card.removalHint")}</div>
              ` : A$1}
            ` : A$1}
            ${this._vivinoConflicts.length > 0 ? b$1 `
              <div class="removal-panel-title conflict-title">${this._t("ui.card.conflictPanelTitle")}</div>
              ${this._vivinoConflicts.map((c) => {
            const vid = String(c.vintage_id);
            const cdNow = this._removalCandidates(vid).length;
            const active = this._conflictFocusVid === vid;
            return b$1 `
                  <div
                    class="removal-entry conflict ${active ? "active" : ""}"
                    @click=${() => {
                this._conflictFocusVid = active ? null : vid;
                if (this._conflictFocusVid)
                    this._removalFocusVid = null;
            }}
                  >
                    <span>${this._conflictLabel(vid)}</span>
                    <span class="removal-count">${this._t("ui.card.conflictCounts", { vivino: c.vivino, here: cdNow })}</span>
                  </div>
                  ${active ? b$1 `
                    <div class="removal-hint">${this._t("ui.card.conflictHint")}</div>
                    <button
                      class="btn btn-primary conflict-confirm"
                      ?disabled=${this._conflictResolving !== null}
                      @click=${(e) => {
                e.stopPropagation();
                this._conflictConfirmVid = vid;
            }}
                    >${this._conflictResolving === vid
                ? this._t("ui.card.conflictSyncing")
                : this._t("ui.card.conflictConfirmBtn", { n: cdNow })}</button>
                  ` : A$1}
                `;
        })}
            ` : A$1}
          </div>
        ` : A$1}
        ${showGrid
            ? b$1 `
              <div class="cabinets-row">
                ${this._activeTab === "all"
                ? this._cabinets.map((cab) => b$1 `
                        <cabinet-grid
                          .hass=${this.hass}
                          .cabinet=${cab}
                          .wines=${this._getCabinetWines(cab.id)}
                          .highlightWineId=${this._highlightWineId}
                          .removalHighlightIds=${this._removalHighlightIds}
                          .movingWineId=${this._movingWine?.id || null}
                          .dispositionDisplay=${this._dispositionDisplay}
                          @cell-click=${this._onCellClick}
                          @zone-click=${this._onZoneClick}
                          @zone-container-click=${this._onZoneContainerClick}
                          @rack-click=${this._onRackClick}
                          @wine-drop=${this._onWineDrop}
                          @wine-longpress=${(e) => {
                    this._movingWine = e.detail.wine;
                    this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
                }}
                        ></cabinet-grid>
                      `)
                : this._cabinets
                    .filter((c) => c.id === this._activeTab)
                    .map((cab) => b$1 `
                          <cabinet-grid
                            .hass=${this.hass}
                            .cabinet=${cab}
                            .wines=${this._getCabinetWines(cab.id)}
                            .highlightWineId=${this._highlightWineId}
                            .removalHighlightIds=${this._removalHighlightIds}
                            .movingWineId=${this._movingWine?.id || null}
                            .dispositionDisplay=${this._dispositionDisplay}
                            @cell-click=${this._onCellClick}
                            @zone-click=${this._onZoneClick}
                            @zone-container-click=${this._onZoneContainerClick}
                            @rack-click=${this._onRackClick}
                            @wine-drop=${this._onWineDrop}
                            @wine-longpress=${(e) => {
                    this._activeTab = "all";
                    this._movingWine = e.detail.wine;
                    this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
                }}
                          ></cabinet-grid>
                        `)}
              </div>
              ${this._activeTab === "all" && unassignedWines.length > 0
                ? b$1 `
                    <div style="padding: 8px 16px 2px">
                      <div style="font-size: 0.9em; font-weight: 600; color: var(--wc-text-secondary); margin-bottom: 4px">
                        ${this._t("ui.card.unassignedSectionHeader", { n: unassignedWines.length })}
                      </div>
                    </div>
                    <div class="wine-list" style="border-top: 1px solid var(--wc-border)">
                      ${unassignedWines.map((wine) => {
                    const typeColor = WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red;
                    return b$1 `
                            <div
                              class="wine-list-item"
                              @click=${() => {
                        this._selectedWine = wine;
                        this._detailMode = "cellar";
                        this._showDetail = true;
                    }}
                            >
                              ${wine.image_url
                        ? b$1 `<img class="wine-list-thumb" src="${wine.image_url}" alt="" />`
                        : b$1 `<div class="wine-list-dot" style="background: ${typeColor}"></div>`}
                              <div class="wine-list-info">
                                <div class="wine-list-name">${wine.name}</div>
                                <div class="wine-list-meta">
                                  ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}
                                  ${wine.rating ? ` · ★${wine.rating}` : ""}
                                </div>
                              </div>
                              <div class="wine-list-location" style="color:#e65100">${this._t("wineLocation.unassigned")}</div>
                            </div>
                          `;
                })}
                    </div>
                  `
                : A$1}
            `
            : A$1}

        <!-- Buy List view -->
        ${showBuyList
            ? b$1 `
              <div class="buy-list-view">
                ${this._buyList.length === 0
                ? b$1 `
                      <div class="empty-state">
                        <div class="empty-state-icon">🛒</div>
                        <div style="font-weight: 500; margin-bottom: 4px">
                          ${this._t("ui.card.buyListEmpty")}
                        </div>
                        <div style="font-size: 0.9em">
                          ${this._t("ui.card.buyListEmptyHint")}
                        </div>
                      </div>
                    `
                : this._buyList.map((item) => {
                    const typeColor = WINE_TYPE_COLORS[item.type] || WINE_TYPE_COLORS.red;
                    return b$1 `
                        <div class="buy-list-card" @click=${() => this._showBuyListDetail(item)} style="cursor:pointer">
                          ${item.image_url
                        ? b$1 `<img class="wine-list-thumb" src="${item.image_url}" alt="" />`
                        : b$1 `<div class="wine-list-dot" style="background: ${typeColor}"></div>`}
                          <div class="bl-info">
                            <div class="bl-name">${item.name}</div>
                            <div class="bl-meta">
                              ${item.winery}${item.vintage ? ` · ${item.vintage}` : ""}
                              ${item.rating ? ` · ★${item.rating.toFixed(1)}` : ""}
                              ${item.retail_price ? ` · ${this._metadataCurrency} ${item.retail_price}` : ""}
                            </div>
                          </div>
                          <div class="bl-actions">
                            <button
                              class="bl-cellar-btn"
                              @click=${(e) => { e.stopPropagation(); this._startMoveBuyListItem(item); }}
                              title="${this._t("ui.card.moveToCellar")}"
                            >
                              ${this._t("ui.card.addToCellarBtn")}
                            </button>
                            <button
                              class="bl-remove-btn"
                              @click=${(e) => { e.stopPropagation(); this._removeBuyListItem(item.id); }}
                              title="${this._t("ui.card.removeFromBuyList")}"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      `;
                })}
              </div>
            `
            : A$1}

        <!-- Unassigned wines view -->
        ${showUnassigned
            ? b$1 `
              <div class="wine-list">
                <div style="padding: 12px 16px 4px; font-size: 0.85em; color: var(--wc-text-secondary)">
                  ${this._t("ui.card.unassignedHint")}
                </div>
                ${unassignedWines.map((wine) => {
                const typeColor = WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red;
                return b$1 `
                      <div
                        class="wine-list-item"
                        @click=${() => {
                    if (this._movingBuyListItem)
                        return;
                    this._selectedWine = wine;
                    this._detailMode = "cellar";
                    this._showDetail = true;
                }}
                      >
                        ${wine.image_url
                    ? b$1 `<img class="wine-list-thumb" src="${wine.image_url}" alt="" />`
                    : b$1 `<div class="wine-list-dot" style="background: ${typeColor}"></div>`}
                        <div class="wine-list-info">
                          <div class="wine-list-name">${wine.name}</div>
                          <div class="wine-list-meta">
                            ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}
                            ${wine.rating ? ` · ★${wine.rating}` : ""}
                            ${wine.disposition
                    ? b$1 ` · <span style="color: ${wine.disposition === "D" ? "#2e7d32" :
                        wine.disposition === "H" ? "#1565c0" :
                            wine.disposition === "P" ? "#c62828" : "inherit"}">${wine.disposition === "D" ? this._t("ui.disposition.drink") :
                        wine.disposition === "H" ? this._t("ui.disposition.hold") :
                            wine.disposition === "P" ? this._t("ui.disposition.pastPeak") : ""}</span>`
                    : A$1}
                          </div>
                        </div>
                        <div class="wine-list-location">${this._t("wineLocation.unassigned")}</div>
                      </div>
                    `;
            })}
              </div>
            `
            : A$1}

        <!-- Filtered wine list (shown when searching or filtering) -->
        ${isSearching
            ? b$1 `
              <div class="wine-list">
                ${filteredWines.length === 0
                ? b$1 `
                      <div class="empty-state">
                        <div>${this._t("ui.card.noSearchResults")}</div>
                      </div>
                    `
                : filteredWines.map((wine) => {
                    const cabinetName = this._cabinets.find((c) => c.id === wine.cabinet_id)
                        ?.name || "Unassigned";
                    return b$1 `
                        <div
                          class="wine-list-item"
                          @click=${() => {
                        this._selectedWine = wine;
                        this._detailMode = "cellar";
                        this._showDetail = true;
                    }}
                        >
                          ${wine.image_url
                        ? b$1 `<img class="wine-list-thumb" src="${wine.image_url}" alt="" />`
                        : b$1 `<div
                                class="wine-list-dot"
                                style="background: ${WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red}"
                              ></div>`}
                          <div class="wine-list-info">
                            <div class="wine-list-name">${wine.name}</div>
                            <div class="wine-list-meta">
                              ${wine.winery}${wine.vintage ? ` · ${wine.vintage}` : ""}
                              ${wine.rating ? ` · ★${wine.rating}` : ""}
                              ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                              ${wine.disposition
                        ? b$1 ` · <span style="color: ${wine.disposition === "D" ? "#2e7d32" :
                            wine.disposition === "H" ? "#1565c0" :
                                wine.disposition === "P" ? "#c62828" : "inherit"}">${wine.disposition === "D" ? this._t("ui.disposition.drink") :
                            wine.disposition === "H" ? this._t("ui.disposition.hold") :
                                wine.disposition === "P" ? this._t("ui.disposition.pastPeak") : ""}</span>`
                        : A$1}
                            </div>
                          </div>
                          <div class="wine-list-location">${cabinetName}</div>
                        </div>
                      `;
                })}
              </div>
            `
            : A$1}

        <!-- Empty state -->
        ${this._wines.length === 0
            ? b$1 `
              <div class="empty-state">
                <div class="empty-state-icon">🍾</div>
                <div style="font-weight: 500; margin-bottom: 4px">
                  ${this._t("ui.card.cellarEmpty")}
                </div>
                <div style="font-size: 0.9em">
                  ${this._t("ui.card.cellarEmptyHint")}
                </div>
              </div>
            `
            : A$1}

      </ha-card>

      <!-- Everything below floats over the page, so it lives outside
           the ha-card: a glass theme gives the card a backdrop-filter, which
           turns it into the containing block for position: fixed children —
           with its overflow: hidden, pop-ups were trapped and clipped inside
           the card instead of covering the screen. -->
        <!-- Batch Vivino Photo Mode Confirm -->
        ${this._removalConfirmWine ? b$1 `
          <div class="dialog-overlay" @click=${() => (this._removalConfirmWine = null)}>
            <div class="dialog" style="max-width:340px;padding:24px;text-align:center" @click=${(e) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.removeThisBottleTitle")}</h3>
              <p style="margin:0 0 4px;font-size:0.9em;color:var(--wc-text)">
                ${this._removalConfirmWine.winery ? `${this._removalConfirmWine.winery} — ` : ""}${this._removalConfirmWine.name}${this._removalConfirmWine.vintage ? ` (${this._removalConfirmWine.vintage})` : ""}
              </p>
              <p style="margin:0 0 16px;font-size:0.8em;color:var(--wc-text-secondary)">
                ${this._bottlePosition(this._removalConfirmWine)} · ${this._t("ui.card.removeThisBottleHint")}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#e65100" @click=${this._confirmRemovalChoice}>
                  ${this._t("ui.card.removeThisBottleBtn")}
                </button>
                <button
                  style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                  @click=${() => (this._removalConfirmWine = null)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : A$1}
        ${this._conflictConfirmVid ? b$1 `
          <div class="dialog-overlay" @click=${() => (this._conflictConfirmVid = null)}>
            <div class="dialog" style="max-width:360px;padding:24px;text-align:center" @click=${(e) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.syncCountConfirmTitle")}</h3>
              <p style="margin:0 0 4px;font-size:0.9em;color:var(--wc-text)">
                ${this._conflictLabel(this._conflictConfirmVid)}
              </p>
              <p style="margin:0 0 16px;font-size:0.8em;color:var(--wc-text-secondary)">
                ${this._removalCandidates(this._conflictConfirmVid).length === 1
            ? this._t("ui.card.syncCountConfirmBodyOne", { n: this._removalCandidates(this._conflictConfirmVid).length })
            : this._t("ui.card.syncCountConfirmBodyMany", { n: this._removalCandidates(this._conflictConfirmVid).length })}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#e65100" @click=${this._confirmConflictResolution}>
                  ${this._t("ui.card.syncCountConfirmBtn")}
                </button>
                <button
                  style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                  @click=${() => (this._conflictConfirmVid = null)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : A$1}

        <!-- Wine Detail Dialog -->
        <wine-detail-dialog
          .wine=${this._selectedWine}
          .wines=${this._wines}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .open=${this._showDetail}
          .hasGemini=${this._hasGemini}
          .aiFallbackAlways=${this._aiFallbackAlways}
          .enableWhisky=${this._enableWhisky}
          .currency=${this._metadataCurrency}
          .mode=${this._detailMode}
          .chamberingRoomSensor=${this._chamberingRoomSensor}
          .chamberingTimeConstantMinutes=${this._chamberingTimeConstantMinutes}
          .chamberingEquilibrationHours=${this._chamberingEquilibrationHours}
          @close=${() => (this._showDetail = false)}
          @remove-wine=${this._onRemoveWine}
          @remove-buy-list-item=${(e) => {
            this._removeBuyListItem(e.detail.item_id);
        }}
          @wine-updated=${() => this._loadData()}
          @buy-list-updated=${() => this._loadData()}
          @copy-wine=${(e) => this._copyWine(e.detail.wine)}
          @locate-wine=${(e) => this._locateWine(e.detail.wine)}
          @set-ai-fallback-always=${(e) => this._setAiFallbackAlways(e.detail.value)}
          @move-wine=${(e) => {
            this._showDetail = false;
            // Close any open side panel and show every rack, so any rack/zone in the cellar is reachable as a target.
            this._zonePanelOpen = false;
            this._rackPanelOpen = false;
            this._shelfPanelOpen = false;
            this._depthPanelOpen = false;
            this._activeTab = "all";
            this._movingWine = e.detail.wine;
            this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
        }}
        ></wine-detail-dialog>

        <!-- Add Wine Dialog -->
        <add-wine-dialog
          .open=${this._showAddDialog}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .wines=${this._wines}
          .preselectedCabinet=${this._addPreselect.cabinet}
          .preselectedRow=${this._addPreselect.row}
          .preselectedCol=${this._addPreselect.col}
          .preselectedZone=${this._addPreselect.zone}
          .preselectedDepth=${this._addPreselect.depth || 0}
          .buyListMode=${this._addToBuyListMode}
          .enableWhisky=${this._enableWhisky}
          .defaultWineType=${this._defaultWineType}
          @close=${() => { this._showAddDialog = false; this._addToBuyListMode = false; }}
          @scan-list=${() => (this._showWineList = true)}
          @wine-added=${this._onWineAdded}
          @buy-list-updated=${() => this._loadData()}
        ></add-wine-dialog>

        <!-- Wine List Scanner Dialog -->
        <wine-list-dialog
          .open=${this._showWineList}
          .hass=${this.hass}
          .hasGemini=${this._hasGemini}
          .cellarWines=${this._wines}
          @close=${() => (this._showWineList = false)}
          @wine-added=${this._onWineAdded}
          @buy-list-updated=${() => this._loadData()}
        ></wine-list-dialog>

        <!-- Arrangement report -->
        <arrangement-dialog
          .open=${this._showArrangement}
          .hass=${this.hass}
          .wines=${this._wines}
          .cabinets=${this._cabinets}
          .dismissed=${this._dismissedArrangements}
          @close=${() => (this._showArrangement = false)}
          @moves-applied=${() => this._loadData()}
          @dismiss-finding=${(e) => this._dismissArrangement(e.detail.id)}
        ></arrangement-dialog>

        <!-- Inventory Dialog -->
        <inventory-dialog
          .open=${this._showInventory}
          .hass=${this.hass}
          .wines=${this._wines}
          .cabinets=${this._cabinets}
          .hasGemini=${this._hasGemini}
          .enableWhisky=${this._enableWhisky}
          .currency=${this._metadataCurrency}
          .analyzing=${this._analyzing}
          .batchVivino=${this._batchVivino}
          .pairingMode=${this._inventoryPairing}
          @close=${() => (this._showInventory = false)}
          @wine-updated=${() => this._loadData()}
          @locate-wine=${(e) => {
            this._showInventory = false;
            this._locateWine(e.detail.wine);
        }}
          @copy-wine=${(e) => {
            this._showInventory = false;
            this._copyWine(e.detail.wine);
        }}
          @move-wine=${(e) => {
            this._showInventory = false;
            this._zonePanelOpen = false;
            this._rackPanelOpen = false;
            this._shelfPanelOpen = false;
            this._depthPanelOpen = false;
            this._activeTab = "all";
            this._movingWine = e.detail.wine;
            this._showToast(this._t("toast.tapToMove", { name: e.detail.wine.name }));
        }}
          @remove-wine=${this._onRemoveWine}
          @batch-ai-scan=${this._batchAnalyzeWines}
          @batch-vivino-scan=${this._batchRefreshVivino}
        ></inventory-dialog>

        <!-- Batch scan confirms: after the inventory dialog, which launches them, so they stack above it -->
        ${this._showBatchVivinoConfirm ? b$1 `
          <div class="dialog-overlay" @click=${() => (this._showBatchVivinoConfirm = false)}>
            <div class="dialog" style="max-width:340px;padding:24px;text-align:center" @click=${(e) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.vivinoBatchScanTitle")}</h3>
              <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">
                ${this._t("ui.card.somePhotosQuestion")}
              </p>
              ${this._hasGemini ? b$1 `
                <label style="display:flex;align-items:center;gap:6px;justify-content:center;font-size:0.8em;color:var(--wc-text-secondary);margin-bottom:16px;cursor:pointer">
                  <input
                    type="checkbox"
                    .checked=${this._batchAiFallback}
                    @change=${(e) => (this._batchAiFallback = e.target.checked)}
                  />
                  ${this._t("ui.card.tryAiNoMatch")}
                </label>
              ` : A$1}
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#8e24aa" @click=${() => this._runBatchVivino("keep")}>
                  ${this._t("ui.card.keepExistingPhotos")}
                </button>
                <button
                  style="padding:8px 16px;border-radius:20px;border:1px solid var(--wc-border);background:transparent;color:var(--wc-text);cursor:pointer;font-size:0.85em"
                  @click=${() => this._runBatchVivino("replace")}
                >${this._t("ui.card.replaceWithVivinoPhotos")}</button>
                <button
                  style="margin-top:4px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                  @click=${() => (this._showBatchVivinoConfirm = false)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : A$1}

        <!-- Batch AI Analysis Confirm -->
        ${this._showBatchAiConfirm ? b$1 `
          <div class="dialog-overlay" @click=${() => (this._showBatchAiConfirm = false)}>
            <div class="dialog" style="max-width:340px;padding:24px;text-align:center" @click=${(e) => e.stopPropagation()}>
              <h3 style="margin:0 0 4px;font-size:1em;color:var(--wc-text)">${this._t("ui.card.runAiBatchTitle")}</h3>
              <p style="margin:0 0 16px;font-size:0.85em;color:var(--wc-text-secondary)">
                ${this._t("ui.card.runAiBatchBody", { n: this._wines.length })}
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-primary" style="background:#1565c0" @click=${this._runBatchAnalyzeWines}>
                  ${this._t("ui.card.runOnNWines", { n: this._wines.length })}
                </button>
                <button
                  style="margin-top:4px;padding:6px 16px;border-radius:16px;border:none;background:var(--wc-hover);color:var(--wc-text-secondary);cursor:pointer;font-size:0.8em"
                  @click=${() => (this._showBatchAiConfirm = false)}
                >${this._t("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        ` : A$1}

        <!-- Rack Settings Dialog -->
        <rack-settings-dialog
          .open=${this._showRackSettings}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .wines=${this._wines}
          @close=${() => (this._showRackSettings = false)}
          @racks-updated=${() => this._loadData()}
        ></rack-settings-dialog>

        <vivino-ai-settings-dialog
          .open=${this._showVivinoAiSettings}
          .hass=${this.hass}
          .aiFallbackAlways=${this._aiFallbackAlways}
          .enableWhisky=${this._enableWhisky}
          .defaultWineType=${this._defaultWineType}
          .dispositionDisplay=${this._dispositionDisplay}
          .metadataLanguage=${this._metadataLanguage}
          .supportedLanguages=${this._supportedLanguages}
          .metadataCurrency=${this._metadataCurrency}
          .supportedCurrencies=${this._supportedCurrencies}
          .cardBackground=${this._cardBackground}
          @close=${() => (this._showVivinoAiSettings = false)}
          @set-card-background=${(e) => this._setCardBackground(e.detail.value)}
          @set-ai-fallback-always=${(e) => this._setAiFallbackAlways(e.detail.value)}
          @set-enable-whisky=${(e) => this._setEnableWhisky(e.detail.value)}
          @set-default-wine-type=${(e) => this._setDefaultWineType(e.detail.value)}
          @set-disposition-display=${(e) => this._setDispositionDisplay(e.detail.value)}
          @set-metadata-language=${(e) => this._setMetadataLanguage(e.detail.value)}
          @set-metadata-currency=${(e) => this._setMetadataCurrency(e.detail.value)}
        ></vivino-ai-settings-dialog>

        <!-- Depth Side Panel -->
        ${this._depthPanelOpen
            ? b$1 `
              <div class="depth-panel-backdrop" @click=${this._closeDepthPanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._t("ui.card.depthPanelRowCol", { row: (this._depthPanelRow ?? 0) + 1, col: (this._depthPanelCol ?? 0) + 1 })}
                    <span class="depth-panel-subtitle">
                      ${this._t("ui.card.depthPanelDeepCount", { n: this._depthPanelWines.length, max: this._depthPanelMaxDepth })}
                    </span>
                  </span>
                  <button class="depth-panel-close" title="${this._t("ui.common.close")}" aria-label="${this._t("ui.common.close")}" @click=${this._closeDepthPanel}>${closeIcon}</button>
                </div>
                <div class="depth-panel-slots">
                  ${Array.from({ length: this._depthPanelMaxDepth }, (_, i) => {
                const wine = this._depthPanelWines.find((w) => (w.depth || 0) === i);
                const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                const disp = wine?.disposition || "";
                const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                return b$1 `
                      <div
                        class="depth-slot ${wine ? "filled" : "empty"}"
                        @click=${() => this._onDepthSlotClick(i, wine)}
                      >
                        <div class="depth-slot-label">${this._getDepthLabel(i)}</div>
                        ${wine
                    ? b$1 `
                              <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                <div class="depth-slot-avatar">
                                  ${wine.image_url
                        ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                        : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                  ${this._dispositionBadge(dispClass, disp)}
                                </div>
                                <div class="depth-slot-info">
                                  <div class="depth-slot-name">${wine.name}</div>
                                  <div class="depth-slot-meta">
                                    ${wine.vintage || "NV"}
                                    ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                    ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                                  </div>
                                </div>
                              </div>
                            `
                    : b$1 `
                              <div class="depth-slot-empty">
                                <span class="depth-slot-plus">+</span>
                                <span>${this._t("ui.common.empty")}</span>
                              </div>
                            `}
                      </div>
                    `;
            })}
                </div>
              </div>
            `
            : A$1}

        <!-- Zone Side Panel (Boxes, Bulk Bins) -->
        ${this._zonePanelOpen
            ? b$1 `
              <div class="depth-panel-backdrop ${this._zonePanelDragWineId ? "drag-through" : ""}" @click=${this._closeZonePanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._zonePanelCabinet
                ? b$1 `<span class="depth-panel-rack">${this._zonePanelCabinet.name}</span>`
                : A$1}
                    ${this._zonePanelName}
                    <span class="depth-panel-subtitle">
                      ${this._zonePanelWines.length}/${this._zonePanelCapacity}
                      ${this._zonePanelType === "box" || this._zonePanelType === "shelf" ? this._t("ui.card.statBottles") : this._t("ui.card.panelStored")}
                    </span>
                  </span>
                  <span class="depth-panel-actions">
                    ${this._zonePanelWines.length > 1
                ? b$1 `<button
                          class="depth-panel-sort"
                          ?disabled=${this._zoneSorting}
                          title="${this._t("ui.card.renumberTitle")}"
                          @click=${() => (this._confirmZoneSort = true)}
                        >
                          ${this._zoneSorting ? "Sorting…" : "↕ Sort by date"}
                        </button>`
                : A$1}
                    <button class="depth-panel-close" title="${this._t("ui.common.close")}" aria-label="${this._t("ui.common.close")}" @click=${this._closeZonePanel}>${closeIcon}</button>
                  </span>
                </div>
                ${this._confirmZoneSort
                ? b$1 `
                      <div class="depth-panel-confirm">
                        <strong>${this._t("ui.card.reorderByDateTitle")}</strong>
                        <span>
                          ${this._t("ui.card.reorderByDateBody", { zone: this._zonePanelName })}
                        </span>
                        <span class="depth-panel-confirm-btns">
                          <button @click=${() => (this._confirmZoneSort = false)}>${this._t("ui.common.cancel")}</button>
                          <button
                            title="${this._t("ui.card.oldestFirstTitle")}"
                            @click=${() => this._sortZoneByDateAdded("oldest")}
                          >
                            ${this._t("ui.card.oldestFirst")}
                          </button>
                          <button
                            class="primary"
                            title="${this._t("ui.card.newestFirstTitle")}"
                            @click=${() => this._sortZoneByDateAdded("newest")}
                          >
                            ${this._t("ui.card.newestFirst")}
                          </button>
                        </span>
                      </div>
                    `
                : A$1}
                <div class="depth-panel-slots">
                  ${this._zonePanelType === "bulk"
                ? b$1 `
                        <!-- Bulk mode: numbered slots, harmonized with Box mode -->
                        ${Array.from({ length: this._zonePanelCapacity }, (_, slotIdx) => {
                    const wine = this._zonePanelWines[slotIdx];
                    const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                    const disp = wine?.disposition || "";
                    const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                    const dragKey = `bulk-${slotIdx}`;
                    const highlighted = wine?.id === this._highlightWineId;
                    return b$1 `
                            <div
                              id=${highlighted ? "highlight-slot" : A$1}
                              class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                              draggable=${wine ? "true" : "false"}
                              @click=${() => this._onZonePanelSlotClick(slotIdx, wine)}
                              @dragstart=${wine ? (e) => this._onZonePanelDragStart(e, wine) : A$1}
                              @dragend=${wine ? () => this._onZonePanelDragEnd() : A$1}
                              @dragover=${(e) => this._onZonePanelDragOver(e, dragKey)}
                              @dragleave=${() => (this._zonePanelDragOverKey = null)}
                              @drop=${(e) => this._onZonePanelBulkReorder(e, slotIdx)}
                            >
                              <span
                                class="depth-slot-delete"
                                title="${this._t("ui.card.deleteThisSlot")}"
                                @click=${(e) => { e.stopPropagation(); this._deleteZoneSlot(slotIdx); }}
                              >✕</span>
                              <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotIdx + 1 })}</div>
                              ${wine
                        ? b$1 `
                                    <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                      <div class="depth-slot-avatar">
                                        ${wine.image_url
                            ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                            : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                        ${this._dispositionBadge(dispClass, disp)}
                                      </div>
                                      <div class="depth-slot-info">
                                        <div class="depth-slot-name">${wine.name}</div>
                                        <div class="depth-slot-meta">
                                          ${wine.vintage || "NV"}
                                          ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                          ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                                        </div>
                                      </div>
                                    </div>
                                  `
                        : b$1 `
                                    <div class="depth-slot-empty">
                                      <span class="depth-slot-plus">+</span>
                                      <span>${this._t("ui.common.empty")}</span>
                                    </div>
                                  `}
                            </div>
                          `;
                })}
                        <div class="depth-panel-grow" @click=${this._addBulkSlot}>
                          <span class="depth-slot-plus">+</span> ${this._t("ui.card.addSlot")}
                        </div>
                      `
                : this._zonePanelType === "shelf"
                    ? b$1 `
                        <!-- Shelf mode: slots grouped by (level, lane) — front/back per board -->
                        ${getShelfSlotGroups(this._zonePanelStorageRow?.shelf_levels).map((group) => b$1 `
                          <div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${(group.level > 0 || group.lane === "back") ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                            ${this._t("ui.card.shelfGroupHeader", {
                        n: group.level + 1,
                        lane: group.lane === "front" ? this._t("ui.card.shelfFront") : this._t("ui.card.shelfBack"),
                    })}
                          </div>
                          ${Array.from({ length: group.size }, (_, slotInGroup) => {
                        const depthIdx = group.start + slotInGroup;
                        const wine = this._zonePanelWines.find((w) => (w.depth || 0) === depthIdx);
                        const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                        const disp = wine?.disposition || "";
                        const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                        const dragKey = `shelf-${depthIdx}`;
                        const highlighted = wine?.id === this._highlightWineId;
                        return b$1 `
                              <div
                                id=${highlighted ? "highlight-slot" : A$1}
                                class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                                draggable=${wine ? "true" : "false"}
                                @click=${() => this._onZonePanelSlotClick(depthIdx, wine)}
                                @dragstart=${wine ? (e) => this._onZonePanelDragStart(e, wine) : A$1}
                                @dragend=${wine ? () => this._onZonePanelDragEnd() : A$1}
                                @dragover=${(e) => this._onZonePanelDragOver(e, dragKey)}
                                @dragleave=${() => (this._zonePanelDragOverKey = null)}
                                @drop=${(e) => this._onZonePanelBoxReorder(e, depthIdx, wine)}
                              >
                                <span
                                  class="depth-slot-delete"
                                  title="${this._t("ui.card.deleteThisSlot")}"
                                  @click=${(e) => { e.stopPropagation(); this._deleteZoneSlot(depthIdx); }}
                                >✕</span>
                                <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInGroup + 1 })}</div>
                                ${wine
                            ? b$1 `
                                      <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                        <div class="depth-slot-avatar">
                                          ${wine.image_url
                                ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                          ${this._dispositionBadge(dispClass, disp)}
                                        </div>
                                        <div class="depth-slot-info">
                                          <div class="depth-slot-name">${wine.name}</div>
                                          <div class="depth-slot-meta">
                                            ${wine.vintage || "NV"}
                                            ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                            ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                                          </div>
                                        </div>
                                      </div>
                                    `
                            : b$1 `
                                      <div class="depth-slot-empty">
                                        <span class="depth-slot-plus">+</span>
                                        <span>${this._t("ui.common.empty")}</span>
                                      </div>
                                    `}
                              </div>
                            `;
                    })}
                        `)}
                      `
                    : this._zonePanelType === "stepped"
                        ? b$1 `
                        <!-- Compressor-shelf mode: slots grouped by row, bottom to top -->
                        ${getSteppedSlotGroups(this._zonePanelStorageRow?.stepped_levels).map((group) => b$1 `
                          <div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${group.level > 0 ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                            ${this._t("ui.card.steppedGroupHeader", { n: group.level + 1 })}
                          </div>
                          ${Array.from({ length: group.size }, (_, slotInGroup) => {
                            const depthIdx = group.start + slotInGroup;
                            const wine = this._zonePanelWines.find((w) => (w.depth || 0) === depthIdx);
                            const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                            const disp = wine?.disposition || "";
                            const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                            const dragKey = `stepped-${depthIdx}`;
                            const highlighted = wine?.id === this._highlightWineId;
                            return b$1 `
                              <div
                                id=${highlighted ? "highlight-slot" : A$1}
                                class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                                draggable=${wine ? "true" : "false"}
                                @click=${() => this._onZonePanelSlotClick(depthIdx, wine)}
                                @dragstart=${wine ? (e) => this._onZonePanelDragStart(e, wine) : A$1}
                                @dragend=${wine ? () => this._onZonePanelDragEnd() : A$1}
                                @dragover=${(e) => this._onZonePanelDragOver(e, dragKey)}
                                @dragleave=${() => (this._zonePanelDragOverKey = null)}
                                @drop=${(e) => this._onZonePanelBoxReorder(e, depthIdx, wine)}
                              >
                                <span
                                  class="depth-slot-delete"
                                  title="${this._t("ui.card.deleteThisSlot")}"
                                  @click=${(e) => { e.stopPropagation(); this._deleteZoneSlot(depthIdx); }}
                                >✕</span>
                                <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInGroup + 1 })}</div>
                                ${wine
                                ? b$1 `
                                      <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                        <div class="depth-slot-avatar">
                                          ${wine.image_url
                                    ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                    : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                          ${this._dispositionBadge(dispClass, disp)}
                                        </div>
                                        <div class="depth-slot-info">
                                          <div class="depth-slot-name">${wine.name}</div>
                                          <div class="depth-slot-meta">
                                            ${wine.vintage || "NV"}
                                            ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                            ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                                          </div>
                                        </div>
                                      </div>
                                    `
                                : b$1 `
                                      <div class="depth-slot-empty">
                                        <span class="depth-slot-plus">+</span>
                                        <span>${this._t("ui.common.empty")}</span>
                                      </div>
                                    `}
                              </div>
                            `;
                        })}
                        `)}
                      `
                        : b$1 `
                        <!-- Box mode: slots grouped by box -->
                        ${(() => {
                            const boxes = this._zonePanelStorageRow?.boxes || [this._zonePanelCapacity];
                            let offset = 0;
                            return boxes.map((boxSize, bi) => {
                                const start = offset;
                                offset += boxSize;
                                return b$1 `
                              ${boxes.length > 1
                                    ? b$1 `<div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${bi > 0 ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                                    ${this._t("ui.card.boxHeader", { n: bi + 1, size: boxSize })}
                                  </div>`
                                    : A$1}
                              ${Array.from({ length: boxSize }, (_, slotInBox) => {
                                    const depthIdx = start + slotInBox;
                                    const wine = this._zonePanelWines.find((w) => (w.depth || 0) === depthIdx);
                                    const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                                    const disp = wine?.disposition || "";
                                    const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                                    const dragKey = `box-${depthIdx}`;
                                    const highlighted = wine?.id === this._highlightWineId;
                                    return b$1 `
                                  <div
                                    id=${highlighted ? "highlight-slot" : A$1}
                                    class="depth-slot ${wine ? "filled" : "empty"} ${this._zonePanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                                    draggable=${wine ? "true" : "false"}
                                    @click=${() => this._onZonePanelSlotClick(depthIdx, wine)}
                                    @dragstart=${wine ? (e) => this._onZonePanelDragStart(e, wine) : A$1}
                                    @dragend=${wine ? () => this._onZonePanelDragEnd() : A$1}
                                    @dragover=${(e) => this._onZonePanelDragOver(e, dragKey)}
                                    @dragleave=${() => (this._zonePanelDragOverKey = null)}
                                    @drop=${(e) => this._onZonePanelBoxReorder(e, depthIdx, wine)}
                                  >
                                    <span
                                      class="depth-slot-delete"
                                      title="${this._t("ui.card.deleteThisSlot")}"
                                      @click=${(e) => { e.stopPropagation(); this._deleteZoneSlot(depthIdx); }}
                                    >✕</span>
                                    <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInBox + 1 })}</div>
                                    ${wine
                                        ? b$1 `
                                          <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                            <div class="depth-slot-avatar">
                                              ${wine.image_url
                                            ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                                            : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                              ${this._dispositionBadge(dispClass, disp)}
                                            </div>
                                            <div class="depth-slot-info">
                                              <div class="depth-slot-name">${wine.name}</div>
                                              <div class="depth-slot-meta">
                                                ${wine.vintage || "NV"}
                                                ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                                ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                                              </div>
                                            </div>
                                          </div>
                                        `
                                        : b$1 `
                                          <div class="depth-slot-empty">
                                            <span class="depth-slot-plus">+</span>
                                            <span>${this._t("ui.common.empty")}</span>
                                          </div>
                                        `}
                                  </div>
                                `;
                                })}
                            `;
                            });
                        })()}
                        <div class="depth-panel-add-box">
                          <select
                            .value=${String(this._zonePanelNewBoxSize)}
                            @change=${(e) => (this._zonePanelNewBoxSize = parseInt(e.target.value, 10))}
                          >
                            ${BOX_SIZES.map((s) => b$1 `<option value=${s} ?selected=${s === this._zonePanelNewBoxSize}>${s}-pk</option>`)}
                          </select>
                          <div class="depth-panel-grow" @click=${this._addBoxSlot}>
                            <span class="depth-slot-plus">+</span> ${this._t("ui.card.addBox")}
                          </div>
                        </div>
                      `}
                </div>
              </div>
            `
            : A$1}

        <!-- Rack Panel (grid-slot cabinets: list + reorder), harmonized with Bulk/Box -->
        ${this._rackPanelOpen
            ? b$1 `
              <div class="depth-panel-backdrop ${this._rackPanelDragWineId ? "drag-through" : ""}" @click=${this._closeRackPanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._rackPanelCabinet?.name}
                    <span class="depth-panel-subtitle">
                      ${this._t("ui.card.rackPanelBottlesCount", { n: this._rackPanelWines.length, max: this._getRackSlots().length })}
                    </span>
                  </span>
                  <button class="depth-panel-close" title="${this._t("ui.common.close")}" aria-label="${this._t("ui.common.close")}" @click=${this._closeRackPanel}>${closeIcon}</button>
                </div>
                <div class="depth-panel-slots">
                  ${this._getRackSlots().map(({ row, col }, slotIdx) => {
                const wines = this._rackPanelWines.filter((w) => w.row === row && w.col === col);
                const wine = wines.length > 0 ? wines.sort((a, b) => (a.depth || 0) - (b.depth || 0))[0] : undefined;
                const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                const disp = wine?.disposition || "";
                const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                const dragKey = `rack-${row}-${col}`;
                const highlighted = wines.some((w) => w.id === this._highlightWineId);
                return b$1 `
                      <div
                        id=${highlighted ? "highlight-slot" : A$1}
                        class="depth-slot ${wine ? "filled" : "empty"} ${this._rackPanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                        draggable=${wine ? "true" : "false"}
                        @click=${() => this._onRackPanelSlotClick(row, col, wine)}
                        @dragstart=${wine ? (e) => this._onRackPanelDragStart(e, wine) : A$1}
                        @dragend=${wine ? () => this._onRackPanelDragEnd() : A$1}
                        @dragover=${(e) => this._onRackPanelDragOver(e, dragKey)}
                        @dragleave=${() => (this._rackPanelDragOverKey = null)}
                        @drop=${(e) => this._onRackPanelReorder(e, row, col, wine)}
                      >
                        ${this._isLastRackSlot(row, col)
                    ? b$1 `
                              <span
                                class="depth-slot-delete"
                                title="${this._t("ui.card.deleteThisSlot")}"
                                @click=${(e) => { e.stopPropagation(); this._deleteRackSlot(row, col); }}
                              >✕</span>
                            `
                    : A$1}
                        <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotIdx + 1 })}</div>
                        ${wine
                    ? b$1 `
                              <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                <div class="depth-slot-avatar">
                                  ${wine.image_url
                        ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                        : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                  ${this._dispositionBadge(dispClass, disp)}
                                </div>
                                <div class="depth-slot-info">
                                  <div class="depth-slot-name">${wine.name}</div>
                                  <div class="depth-slot-meta">
                                    ${wine.vintage || "NV"}
                                    ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                    ${wines.length > 1 ? b$1 ` · ${this._t("ui.card.deepSuffix", { n: wines.length })}` : A$1}
                                  </div>
                                </div>
                              </div>
                            `
                    : b$1 `
                              <div class="depth-slot-empty">
                                <span class="depth-slot-plus">+</span>
                                <span>${this._t("ui.common.empty")}</span>
                              </div>
                            `}
                      </div>
                    `;
            })}
                  <div class="depth-panel-grow" @click=${this._addRackSlot}>
                    <span class="depth-slot-plus">+</span> ${this._t("ui.card.addSlot")}
                  </div>
                </div>
              </div>
            `
            : A$1}

        <!-- Shelf Panel (shelf-style cabinets: every board/lane, list + reorder) -->
        ${this._shelfPanelOpen
            ? b$1 `
              <div class="depth-panel-backdrop ${this._shelfPanelDragWineId ? "drag-through" : ""}" @click=${this._closeShelfPanel}></div>
              <div class="depth-panel open">
                <div class="depth-panel-header">
                  <span class="depth-panel-title">
                    ${this._shelfPanelCabinet?.name}
                    <span class="depth-panel-subtitle">
                      ${this._t("ui.card.rackPanelBottlesCount", {
                n: this._shelfPanelWines.length,
                max: this._getShelfPanelRows().reduce((sum, sr) => sum + (sr.capacity || 0), 0),
            })}
                    </span>
                  </span>
                  <button class="depth-panel-close" title="${this._t("ui.common.close")}" aria-label="${this._t("ui.common.close")}" @click=${this._closeShelfPanel}>${closeIcon}</button>
                </div>
                <div class="depth-panel-slots">
                  ${this._getShelfPanelRows().map((sr) => {
                const zone = `storage-${sr.row}`;
                const groups = getShelfSlotGroups(sr.shelf_levels);
                return b$1 `
                      ${this._getShelfPanelRows().length > 1
                    ? b$1 `<div style="font-size:0.8em;font-weight:700;color:var(--wc-text-secondary);padding:8px 0 2px;">
                            ${sr.name || this._t("wineLocation.storage")}
                          </div>`
                    : A$1}
                      ${groups.map((group) => b$1 `
                        <div style="font-size:0.75em;font-weight:600;color:var(--wc-text-secondary);padding:8px 0 2px;${(group.level > 0 || group.lane === "back") ? "border-top:1px solid var(--wc-border);margin-top:4px;" : ""}">
                          ${this._t("ui.card.shelfGroupHeader", {
                    n: group.level + 1,
                    lane: group.lane === "front" ? this._t("ui.card.shelfFront") : this._t("ui.card.shelfBack"),
                })}
                        </div>
                        ${Array.from({ length: group.size }, (_, slotInGroup) => {
                    const depthIdx = group.start + slotInGroup;
                    const wine = this._shelfPanelWines.find((w) => w.zone === zone && (w.depth || 0) === depthIdx);
                    const typeColor = wine ? WINE_TYPE_COLORS[wine.type] || WINE_TYPE_COLORS.red : "";
                    const disp = wine?.disposition || "";
                    const dispClass = disp === "D" ? "drink" : disp === "H" ? "hold" : disp === "P" ? "past" : "";
                    const dragKey = `${zone}-${depthIdx}`;
                    const highlighted = wine?.id === this._highlightWineId;
                    return b$1 `
                            <div
                              id=${highlighted ? "highlight-slot" : A$1}
                              class="depth-slot ${wine ? "filled" : "empty"} ${this._shelfPanelDragOverKey === dragKey ? "drag-over" : ""} ${highlighted ? "highlight" : ""}"
                              draggable=${wine ? "true" : "false"}
                              @click=${() => this._onShelfPanelSlotClick(zone, depthIdx, wine)}
                              @dragstart=${wine ? (e) => this._onShelfPanelDragStart(e, wine) : A$1}
                              @dragend=${wine ? () => this._onShelfPanelDragEnd() : A$1}
                              @dragover=${(e) => this._onShelfPanelDragOver(e, dragKey)}
                              @dragleave=${() => (this._shelfPanelDragOverKey = null)}
                              @drop=${(e) => this._onShelfPanelDrop(e, zone, depthIdx, wine)}
                            >
                              <div class="depth-slot-label">${this._t("ui.card.slot", { n: slotInGroup + 1 })}</div>
                              ${wine
                        ? b$1 `
                                    <div class="depth-slot-wine" style="border-left: 4px solid ${typeColor}">
                                      <div class="depth-slot-avatar">
                                        ${wine.image_url
                            ? b$1 `<img class="depth-slot-thumb" src="${wine.image_url}" alt="" />`
                            : b$1 `<div class="depth-slot-dot" style="background: ${typeColor}"></div>`}
                                        ${this._dispositionBadge(dispClass, disp)}
                                      </div>
                                      <div class="depth-slot-info">
                                        <div class="depth-slot-name">${wine.name}</div>
                                        <div class="depth-slot-meta">
                                          ${wine.vintage || "NV"}
                                          ${wine.rating ? b$1 ` · ★${wine.rating}` : A$1}
                                          ${wine.price ? b$1 ` · ${this._metadataCurrency} ${wine.price}` : A$1}
                                        </div>
                                      </div>
                                    </div>
                                  `
                        : b$1 `
                                    <div class="depth-slot-empty">
                                      <span class="depth-slot-plus">+</span>
                                      <span>${this._t("ui.common.empty")}</span>
                                    </div>
                                  `}
                            </div>
                          `;
                })}
                      `)}
                    `;
            })}
                </div>
              </div>
            `
            : A$1}

        <!-- Toast -->
        ${this._toast ? b$1 `<div class="toast">${this._toast}</div>` : A$1}
    `;
    }
    getCardSize() {
        return 6;
    }
};
WineCellarCard.styles = [
    sharedStyles,
    i$4 `
      /* Glass palette, declared here only (not in sharedStyles) so every
         dialog inherits it from the card instead of resetting it.
         glass-dark is set by _syncGlassMode() from the theme's text colour. */
      :host {
        display: block;
        --wc-glass-scrim: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
        --wc-glass-surface: rgba(250, 248, 247, 0.84);
        --wc-glass-solid: #faf8f7;
        --wc-glass-field: rgba(255, 255, 255, 0.6);
        --wc-glass-line: rgba(0, 0, 0, 0.1);
        --wc-glass-edge: rgba(255, 255, 255, 0.7);
        --wc-glass-sheen: inset 0 1px 0 rgba(255, 255, 255, 0.75);
      }

      :host([glass-dark]) {
        --wc-glass-scrim: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
        --wc-glass-surface: rgba(32, 28, 32, 0.82);
        --wc-glass-solid: #201c20;
        --wc-glass-field: rgba(0, 0, 0, 0.28);
        --wc-glass-line: rgba(255, 255, 255, 0.12);
        --wc-glass-edge: rgba(255, 255, 255, 0.14);
        --wc-glass-sheen: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      /* clip, not hidden: hidden would make the card a scroll container and
         pin .card-bg's sticky positioning to the card instead of the page. */
      ha-card {
        overflow: clip;
        isolation: isolate;
      }

      /* The card paints its own background, one screen tall, sticking to
         the viewport while the card scrolls past. A glass theme otherwise
         shows the dashboard wallpaper through a transparent card, and how
         that wallpaper lands depends on how tall the card is — so All
         Sections (tall) and a single rack (short) looked different.
         Default: the theme's own wallpaper, blurred like the theme's frosted
         cards; with no wallpaper this is empty and nothing changes. A
         background uploaded in Settings replaces it (.custom). */
      .card-bg {
        position: sticky;
        top: 0;
        height: 100vh;
        margin-bottom: -100vh;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
        border-radius: inherit;
      }

      .card-bg::before {
        content: "";
        position: absolute;
        inset: -24px;
        background: var(--lovelace-background, var(--background-image, none));
        background-size: cover;
        background-position: center;
        /* The theme's "fixed" would size the picture to the viewport on some
           browsers and to the whole page on others (iOS ignores fixed). */
        background-attachment: scroll;
        filter: blur(8px) saturate(1.25);
      }

      .card-bg.custom::before {
        inset: 0;
        background: var(--wc-glass-scrim), var(--wc-card-bg-image) center / cover no-repeat;
        filter: none;
      }

      /* Pending Vivino removals: pick-a-bottle panel */
      .removal-panel {
        border: 1px solid #ff6d00;
        background: rgba(255, 109, 0, 0.08);
        border-radius: 8px;
        padding: 10px 12px;
        margin: 8px 16px;
      }

      .removal-panel-title {
        font-weight: 600;
        font-size: 0.85em;
        margin-bottom: 6px;
        color: var(--wc-text);
      }

      .removal-entry {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85em;
        color: var(--wc-text);
      }

      .removal-entry:hover {
        background: rgba(255, 109, 0, 0.15);
      }

      .removal-entry.active {
        background: rgba(255, 109, 0, 0.25);
        box-shadow: inset 0 0 0 1px #ff6d00;
      }

      .removal-count {
        color: #ff6d00;
        font-weight: 600;
        white-space: nowrap;
      }

      .removal-hint {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        margin-top: 6px;
      }

      .conflict-title {
        margin-top: 8px;
        color: #d32f2f;
      }

      .removal-entry.conflict.active {
        background: rgba(211, 47, 47, 0.15);
        box-shadow: inset 0 0 0 1px #d32f2f;
      }

      .conflict-confirm {
        background: #e65100;
        font-size: 0.8em;
        padding: 6px 12px;
        margin: 4px 0 6px;
      }

      .conflict-confirm:disabled {
        opacity: 0.6;
        cursor: wait;
      }

      .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 8px;
      }

      .title {
        font-size: 1.3em;
        font-weight: 600;
        color: var(--wc-text);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .title-icon {
        font-size: 1.2em;
      }

      .title-text {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .header-actions {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .cabinets-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        padding: 12px 16px 16px;
      }

      .wine-list {
        padding: 0 16px 16px;
      }

      .wine-list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .wine-list-item:hover {
        background: var(--wc-hover);
      }

      .wine-list-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .wine-list-thumb {
        width: 36px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .wine-list-info {
        flex: 1;
        min-width: 0;
      }

      .wine-list-name {
        font-weight: 500;
        font-size: 0.95em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .wine-list-meta {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .wine-list-location {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-align: right;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--wc-text-secondary);
      }

      .empty-state-icon {
        font-size: 3em;
        margin-bottom: 8px;
      }

      .loading {
        text-align: center;
        padding: 40px;
        color: var(--wc-text-secondary);
      }

      .copy-banner {
        background: rgba(46, 125, 50, 0.1);
        border: 1px solid rgba(46, 125, 50, 0.3);
        color: #2e7d32;
        font-size: 0.85em;
        padding: 6px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .copy-banner button {
        background: transparent;
        border: 1px solid rgba(46, 125, 50, 0.4);
        color: #2e7d32;
        border-radius: 6px;
        padding: 2px 10px;
        cursor: pointer;
        font-size: 0.9em;
      }

      .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(30, 26, 30, 0.82);
        -webkit-backdrop-filter: var(--wc-blur);
        backdrop-filter: var(--wc-blur);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        color: #fff;
        padding: 10px 20px;
        border-radius: 999px;
        font-size: 0.9em;
        z-index: 1000;
        animation: fadeIn 0.2s;
        pointer-events: none;
      }

      .buy-list-view {
        padding: 0 16px 16px;
      }

      .buy-list-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid var(--wc-border);
        border-radius: 10px;
        margin-bottom: 8px;
        transition: background 0.2s;
      }

      .buy-list-card:hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .bl-info {
        flex: 1;
        min-width: 0;
      }

      .bl-name {
        font-weight: 600;
        font-size: 0.9em;
        color: var(--wc-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .bl-meta {
        font-size: 0.78em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .bl-actions {
        display: flex;
        gap: 6px;
        flex-shrink: 0;
      }

      .bl-cellar-btn {
        background: #2e7d32;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 0.75em;
        padding: 4px 8px;
        cursor: pointer;
        white-space: nowrap;
      }

      .bl-cellar-btn:hover { background: #1b5e20; }

      .bl-remove-btn {
        background: #c62828;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 0.75em;
        padding: 4px 8px;
        cursor: pointer;
        white-space: nowrap;
      }

      .bl-remove-btn:hover { background: #b71c1c; }

      .buy-list-banner {
        background: rgba(230, 81, 0, 0.1);
        border: 1px solid rgba(230, 81, 0, 0.3);
        color: #e65100;
        font-size: 0.85em;
        padding: 6px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .buy-list-banner button {
        background: transparent;
        border: 1px solid rgba(230, 81, 0, 0.4);
        color: #e65100;
        border-radius: 6px;
        padding: 2px 10px;
        cursor: pointer;
        font-size: 0.9em;
      }

      /* The arrangement count is the only stat you can act on, and it is only
         there at all when the cellar has something to say. */
      .stat-action {
        cursor: pointer;
        border-radius: 6px;
        padding: 2px 8px;
        margin: -2px 0;
        border: 1px solid var(--wc-border);
        transition: all 0.15s;
      }

      .stat-action:hover {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.08);
      }

      /* Phone: stack cabinets vertically */
      @media (max-width: 599px) {
        .header-row {
          padding: 12px 12px 6px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .title {
          font-size: 1.1em;
        }
        /* The header buttons get their own row under the title, sharing it
           equally, instead of wrapping into a stack beside it. The
           !important beats the buttons' inline padding/font-size. */
        .header-actions {
          flex: 1 1 100%;
          flex-wrap: nowrap;
        }
        .header-actions .btn {
          flex: 1 1 0;
          min-width: 0;
          padding: 6px 4px !important;
          font-size: 0.8em !important;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stats-bar {
          flex-wrap: wrap;
          gap: 8px;
          padding: 6px 12px;
          font-size: 0.8em;
        }
        .cabinets-row {
          grid-template-columns: 1fr;
          gap: 10px;
          padding: 8px 12px 12px;
        }
        .wine-list-item {
          padding: 8px;
          gap: 8px;
        }
        .btn-primary {
          padding: 6px 12px;
          font-size: 0.85em;
        }
      }

      /* Tablet: 2 cabinets side by side */
      @media (min-width: 600px) and (max-width: 1023px) {
        .cabinets-row {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
      }

      /* Desktop: all cabinets side by side */
      @media (min-width: 1024px) {
        .cabinets-row {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
      }

      /* Touch: finger-sized header and list controls. Rack sizing is left
         to the width queries above — forcing wider cabinets here made every
         bottle far too large on a tablet. */
      @media (pointer: coarse) {
        .stat-action {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 12px;
          margin: 0;
        }
        .stats-bar {
          align-items: center;
        }
        .header-actions {
          gap: 8px;
        }
        .wine-list-item,
        .removal-entry {
          min-height: 52px;
        }
      }
    `,
    touchStyles,
];
__decorate([
    n$1({ attribute: false })
], WineCellarCard.prototype, "hass", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_config", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_wines", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_cabinets", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_stats", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_activeTab", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_searchQuery", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_searchFilter", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_selectedWine", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showDetail", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_detailMode", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showAddDialog", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_addPreselect", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_loading", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showRackSettings", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_copiedWine", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_movingWine", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_analyzing", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_batchVivino", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showBatchVivinoConfirm", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showBatchAiConfirm", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_batchAiFallback", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_vivinoSyncing", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_toast", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_hasGemini", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_hasVivinoAccount", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_vivinoMode", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_pendingRemovals", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_removalFocusVid", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_removalConfirmWine", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_vivinoConflicts", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_conflictFocusVid", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_conflictConfirmVid", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_conflictResolving", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_metadataLanguage", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_supportedLanguages", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_metadataCurrency", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_supportedCurrencies", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_aiFallbackAlways", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_enableWhisky", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_defaultWineType", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_dispositionDisplay", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_cardBackground", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_chamberingRoomSensor", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_chamberingTimeConstantMinutes", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_chamberingEquilibrationHours", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showVivinoAiSettings", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showWineList", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showInventory", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_inventoryPairing", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_showArrangement", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_dismissedArrangements", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_buyList", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_addToBuyListMode", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_movingBuyListItem", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_depthPanelOpen", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_depthPanelCabinet", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_depthPanelRow", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_depthPanelCol", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_depthPanelWines", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_depthPanelMaxDepth", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelOpen", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelCabinet", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelZone", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelType", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelCapacity", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelName", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelWines", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelStorageRow", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelDragWineId", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelDragOverKey", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zonePanelNewBoxSize", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_rackPanelOpen", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_rackPanelCabinet", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_rackPanelWines", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_rackPanelDragWineId", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_rackPanelDragOverKey", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_shelfPanelOpen", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_shelfPanelCabinet", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_shelfPanelWines", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_shelfPanelDragWineId", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_shelfPanelDragOverKey", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_highlightWineId", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_confirmZoneSort", void 0);
__decorate([
    r$1()
], WineCellarCard.prototype, "_zoneSorting", void 0);
WineCellarCard = __decorate([
    t$2("wine-cellar-card")
], WineCellarCard);
// Register the card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
    type: "wine-cellar-card",
    name: "Cork Dork",
    description: "Track your wine collection with visual cabinet layout",
    preview: true,
});

export { WineCellarCard };
//# sourceMappingURL=wine-cellar-card.js.map
