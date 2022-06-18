var P=Object.defineProperty,b=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var h=(t,e,r)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,c=(t,e)=>{for(var r in e||(e={}))I.call(e,r)&&h(t,r,e[r]);if(d)for(var r of d(e))p.call(e,r)&&h(t,r,e[r]);return t},m=(t,e)=>b(t,w(e));var y=(t,e,r)=>new Promise((n,o)=>{var f=s=>{try{u(r.next(s))}catch(T){o(T)}},a=s=>{try{u(r.throw(s))}catch(T){o(T)}},u=s=>s.done?n(s.value):Promise.resolve(s.value).then(f,a);u((r=r.apply(t,e)).next())});var A=t=>(e,r)=>(e.method==="GET"?t.get(e.url,n=>e(n.query,r)):t[e.method.toLocaleLowerCase()](e.url,n=>e(JSON.parse(n.body),r)),r);function O(t){let e=t.status;return e>=200&&e<=299?t.json():t.json().then(r=>{throw typeof r=="object"?r.message?new Error(r.message):r:new Error(r)})}var l=(t,e,r)=>{let n=c({method:e.method},r);if(e.method==="GET"){let o=new URLSearchParams(t).toString();return fetch(l.baseURL+e.url+"?"+o,n).then(O)}return fetch(l.baseURL+e.url,m(c({},n),{body:JSON.stringify(t)})).then(O)};l.baseURL="";var C=({method:t,requestSchema:e,responseSchema:r,url:n})=>{let o=(f,a,u)=>y(void 0,null,function*(){if(a=a||i.baseFetcher,!a)throw new Error("Not found fetcher: "+o.url);e&&(f=i.baseDtoValidate(e,f));let s=yield a(f,o,u);return r?i.baseDtoValidate(r,s):s});return o.requestSchema=e,o.responseSchema=r,o.url=n,o.method=t,o.TypeOfRequest={},o.TypeOfResponse={},o},R=(t,e,r)=>{if(r=r||i.baseController,!r)throw new Error("Not found controller: "+t.url);return r(t,e)},E=(t,e)=>t.dto(e),i={api:C,use:R,baseDtoValidate:E,baseFetcher:l,baseController:void 0};export{A as createFastifyController,i as dobe,l as fetcher,E as sokeDtoValidate};
