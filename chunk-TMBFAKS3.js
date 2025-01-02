import{a as K,b as I,c as A}from"./chunk-KJ7WRGC3.js";import{C as te,c as G,j as q,n as J,o as k,p as z,q as W,r as Z,s as v,t as U,u as Y,v as Q,w as X,y as $,z as ee}from"./chunk-RL6WAANO.js";import{Ab as s,Hb as R,Ia as u,Ib as B,Z as E,ab as f,ba as T,eb as o,fb as n,gb as d,hb as x,ib as C,ob as j}from"./chunk-CWEADYQK.js";import{a as c,e as p}from"./chunk-AP4OEWII.js";var l=class{constructor(r=0,t="Network Error"){this.status=r,this.text=t}};var re=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,r)=>Promise.resolve(localStorage.setItem(e,r)),remove:e=>Promise.resolve(localStorage.removeItem(e))}};var a={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:re()};var S=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{};var oe=(e,r="https://api.emailjs.com")=>{if(!e)return;let t=S(e);a.publicKey=t.publicKey,a.blockHeadless=t.blockHeadless,a.storageProvider=t.storageProvider,a.blockList=t.blockList,a.limitRate=t.limitRate,a.origin=t.origin||r};var L=(m,i,...h)=>p(void 0,[m,i,...h],function*(e,r,t={}){let b=yield fetch(a.origin+e,{method:"POST",headers:t,body:r}),w=yield b.text(),g=new l(b.status,w);if(b.ok)return g;throw g});var P=(e,r,t)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!r||typeof r!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!t||typeof t!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"};var ie=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"};var F=e=>e.webdriver||!e.languages||e.languages.length===0;var M=()=>new l(451,"Unavailable For Headless Browser");var ae=(e,r)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof r!="string")throw"The BlockList watchVariable has to be a string"};var ue=e=>!e.list?.length||!e.watchVariable,fe=(e,r)=>e instanceof FormData?e.get(r):e[r],_=(e,r)=>{if(ue(e))return!1;ae(e.list,e.watchVariable);let t=fe(r,e.watchVariable);return typeof t!="string"?!1:e.list.includes(t)};var N=()=>new l(403,"Forbidden");var ne=(e,r)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(r&&typeof r!="string")throw"The LimitRate ID has to be a non-empty string"};var he=(e,r,t)=>p(void 0,null,function*(){let m=Number((yield t.get(e))||0);return r-Date.now()+m}),H=(e,r,t)=>p(void 0,null,function*(){if(!r.throttle||!t)return!1;ne(r.throttle,r.id);let m=r.id||e;return(yield he(m,r.throttle,t))>0?!0:(yield t.set(m,Date.now().toString()),!1)});var V=()=>new l(429,"Too Many Requests");var se=(e,r,t,m)=>p(void 0,null,function*(){let i=S(m),h=i.publicKey||a.publicKey,b=i.blockHeadless||a.blockHeadless,w=i.storageProvider||a.storageProvider,g=c(c({},a.blockList),i.blockList),D=c(c({},a.limitRate),i.limitRate);return b&&F(navigator)?Promise.reject(M()):(P(h,e,r),ie(t),t&&_(g,t)?Promise.reject(N()):(yield H(location.pathname,D,w))?Promise.reject(V()):L("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:h,service_id:e,template_id:r,template_params:t}),{"Content-type":"application/json"}))});var me=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"};var be=e=>typeof e=="string"?document.querySelector(e):e,le=(e,r,t,m)=>p(void 0,null,function*(){let i=S(m),h=i.publicKey||a.publicKey,b=i.blockHeadless||a.blockHeadless,w=a.storageProvider||i.storageProvider,g=c(c({},a.blockList),i.blockList),D=c(c({},a.limitRate),i.limitRate);if(b&&F(navigator))return Promise.reject(M());let O=be(t);P(h,e,r),me(O);let y=new FormData(O);return _(g,y)?Promise.reject(N()):(yield H(location.pathname,D,w))?Promise.reject(V()):(y.append("lib_version","4.4.1"),y.append("service_id",e),y.append("template_id",r),y.append("user_id",h),L("/api/v1.0/email/send-form",y))});var ce={init:oe,send:se,sendForm:le,EmailJSResponseStatus:l};var pe=(()=>{class e{constructor(){this.dialogRef=E(K)}onClose(){this.dialogRef.close()}static{this.\u0275fac=function(m){return new(m||e)}}static{this.\u0275cmp=T({type:e,selectors:[["contact-form-success-modal"]],hostAttrs:[1,"p-6","lg:p-10","text-center","flex-col","relative"],standalone:!0,features:[R],decls:9,vars:0,consts:[[1,"absolute","top-2","right-2","rounded-full","flex","justify-center","items-center","bg-black/5","hover:bg-black/20","w-6","h-6","transition-all","duration-300",3,"click"],["src","assets/icons/close.svg","alt",""],[1,"mx-auto","mb-6","w-44","h-44"],["src","assets/icons/navigation.svg","alt",""],[1,"text-h3","mb-2"],[1,"text-sm","text-secondary"]],template:function(m,i){m&1&&(o(0,"button",0),j("click",function(){return i.onClose()}),d(1,"img",1),n(),o(2,"div",2),d(3,"img",3),n(),o(4,"div")(5,"h3",4),s(6,"Your request successfully sended"),n(),o(7,"div",5),s(8," Our sales manager answer you about one work day "),n()())}})}}return e})();var ye=e=>({"opacity-50 pointer-events-none":e}),de=function(e){return e.crmSystem="CRM System",e.erpSystem="ERP System",e.marketplace="Marketplace",e.website="Website",e.branding="Branding",e}(de||{}),Kt=(()=>{class e{constructor(){this.projectType=de,this.dialog=E(I),this.formGroup=new Z({name:new v(null,k.required),email:new v(null,[k.required,k.email]),companyName:new v(null,k.required),message:new v,projectType:new v}),this.isLoading=!1}ngOnInit(){}onOpenSuccessModal(){this.dialog.open(pe,{width:"23.5vw"})}onSubmitForm(){X.used(this.formGroup),this.formGroup.valid&&(this.isLoading=!0,ce.send("service_alviem8","template_iol5heh",this.formGroup.value,{publicKey:"2zSZmLZMMsJKZ7Mu0"}).then(()=>{this.isLoading=!1,this.formGroup.reset(null),this.onOpenSuccessModal()},t=>{console.log("FAILED...",t.text)}))}static{this.\u0275fac=function(m){return new(m||e)}}static{this.\u0275cmp=T({type:e,selectors:[["section-contacts"]],standalone:!0,features:[R],decls:54,vars:10,consts:[[1,"py-10","lg:py-20","px-6","lg:px-12","bg-gradient-main","text-white","rounded-3xl","flex","flex-col","lg:flex-row","overflow-hidden"],[1,"lg:w-2/5","mb-6","lg:mb-0"],[1,"text-h2"],[1,"lg:w-2/5","lg:ms-auto",3,"formGroup","ngClass"],[1,"mb-6"],["formControlName","name","autocomplete","password"],["title",""],["formControlName","email","autocomplete","password"],["formControlName","companyName","autocomplete","password"],[1,"mb-4","text-lg"],[1,"flex","space-x-2","overflow-auto","-ms-6","-me-6","pe-6","ps-6","sm:pe-0","sm:ps-0","sm:-ms-0","sm:-me-0","radio-list"],[1,"relative","z-0","min-w-max"],["type","radio","name","projectType","formControlName","projectType","id","crm_system",1,"hidden","peer",3,"value"],["for","crm_system",1,"radio-choice"],["type","radio","name","projectType","formControlName","projectType","id","erp_system",1,"hidden","peer",3,"value"],["for","erp_system",1,"radio-choice"],["type","radio","name","projectType","formControlName","projectType","id","marketplace",1,"hidden","peer",3,"value"],["for","marketplace",1,"radio-choice"],["type","radio","name","projectType","formControlName","projectType","id","website",1,"hidden","peer",3,"value"],["for","website",1,"radio-choice"],["type","radio","name","projectType","formControlName","projectType","id","branding",1,"hidden","peer",3,"value"],["for","branding",1,"radio-choice"],["formControlName","message","autocomplete","password",3,"autosize"],[1,"text-sm","text-white/50"],["routerLink","/privacy-policy",1,"text-white/50","hover:text-white/100","underline"],[1,"btn-white","text-dark",3,"click"]],template:function(m,i){m&1&&(o(0,"section",0)(1,"div",1)(2,"h2",2),s(3," Let's take the next step. Provide us with a brief description of what you are going to build "),n()(),o(4,"div",3)(5,"div",4)(6,"input-text",5),x(7,6),s(8,"Name"),C(),n()(),o(9,"div",4)(10,"input-text",7),x(11,6),s(12,"Email"),C(),n()(),o(13,"div",4)(14,"input-text",8),x(15,6),s(16,"Company Name"),C(),n()(),o(17,"div",4)(18,"div",9),s(19,"Select project type"),n(),o(20,"div",10)(21,"div",11),d(22,"input",12),o(23,"label",13),s(24," CRM System "),n()(),o(25,"div",11),d(26,"input",14),o(27,"label",15),s(28," ERP System "),n()(),o(29,"div",11),d(30,"input",16),o(31,"label",17),s(32," Marketplace "),n()(),o(33,"div",11),d(34,"input",18),o(35,"label",19),s(36," Website "),n()(),o(37,"div",11),d(38,"input",20),o(39,"label",21),s(40," Branding "),n()()()(),o(41,"div",4)(42,"input-textarea",22),x(43,6),s(44,"Description"),C(),n()(),o(45,"div",4)(46,"p",23),s(47," By submitting this form, I consent to Brights collecting and processing my personal details and agree to the "),o(48,"a",24),s(49,"Privacy Policy"),n(),s(50,". "),n()(),o(51,"div")(52,"button",25),j("click",function(){return i.onSubmitForm()}),s(53," Send request "),n()()()()),m&2&&(u(4),f("formGroup",i.formGroup)("ngClass",B(8,ye,i.isLoading)),u(18),f("value",i.projectType.crmSystem),u(4),f("value",i.projectType.erpSystem),u(4),f("value",i.projectType.marketplace),u(4),f("value",i.projectType.website),u(4),f("value",i.projectType.branding),u(4),f("autosize",!0))},dependencies:[te,G,q,J,U,z,W,Y,Q,$,ee,A],styles:["@media screen and (max-width: 600px){[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}}"]})}}return e})();export{Kt as a};