"use strict";(self["webpackChunkdelivery_vue"]=self["webpackChunkdelivery_vue"]||[]).push([[21],{6021:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("header",[a("UserNav",{attrs:{page:"Trabaja con nosotros",login:"true",clas:"header-navegator"}})],1),a("section",{staticClass:"ask-header"},[a("button",{class:[e.classActual],attrs:{id:"inProcess"},on:{click:function(t){return e.changeSection("actual")}}},[a("h3",[e._v("Repartidores")])]),a("button",{class:[e.classOld],attrs:{id:"ended"},on:{click:function(t){return e.changeSection("old")}}},[a("h3",[e._v("Restaurantes")])])]),"ask-checked"===e.classOld?a("form",{staticClass:"login-container",attrs:{if:"form"},on:{submit:e.sendMail}},[a("h1",[e._v("Registro Restaurantes")]),e._m(0),e._m(1),e._m(2),a("input",{staticClass:"login-button mb-4",attrs:{type:"submit",id:"sendRegistrerData"}})]):e._e(),"ask-checked"===e.classActual?a("form",{staticClass:"login-container",attrs:{if:"form"},on:{submit:e.sendMailRider}},[a("h1",[e._v("Registro Repartidores")]),e._m(3),e._m(4),a("input",{staticClass:"login-button mb-4",attrs:{type:"submit",id:"sendRegistrerData"}})]):e._e(),e.showLoading?a("div",{staticClass:"loading-container"},[a("div",{staticClass:"lds-dual-ring"})]):e._e(),a("section",{directives:[{name:"show",rawName:"v-show",value:e.showModal,expression:"showModal"}],staticClass:"thanks-registrer",attrs:{id:"thanks-registrer-container"}},[a("h1",[e._v("¡Muchas gracias!")]),e._m(5)])])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-floating mb-3 mt-3"},[a("input",{staticClass:"form-control",attrs:{name:"email",type:"email",id:"floatingInput",placeholder:"name@example.com",required:"required"}}),a("label",{attrs:{for:"floatingInput"}},[e._v("Correo Electronico")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-floating"},[a("input",{staticClass:"form-control",attrs:{name:"NombreNegocio",type:"text",id:"floatingPassword",placeholder:"Nombre negocio",required:"required"}}),a("label",{attrs:{for:"floatingPassword"}},[e._v("Nombre del negocio")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-floating mt-3"},[a("input",{staticClass:"form-control",attrs:{name:"name",type:"text",id:"floatingName",placeholder:"Inserte su nombre aquí",required:"required"}}),a("label",{attrs:{for:"floatingPassword"}},[e._v("Nombre responsable del negocio")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-floating mb-3 mt-3"},[a("input",{staticClass:"form-control",attrs:{name:"email",type:"email",id:"floatingInput",placeholder:"name@example.com",required:"required"}}),a("label",{attrs:{for:"floatingInput"}},[e._v("Correo Electronico")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-floating mt-3"},[a("input",{staticClass:"form-control",attrs:{name:"name",type:"text",id:"floatingName",placeholder:"Inserte su nombre aquí",required:"required"}}),a("label",{attrs:{for:"floatingPassword"}},[e._v("Nombre del repartidor")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Ha enviado los datos con éxito, en su casilla de mail se le enviará la documentacion para completar el registro."),a("br"),e._v(" En caso de no encontrar el mail verifique en pestaña de spam")])}],i=a(1659),o={name:"RegistroNegocio",components:{UserNav:i.Z},data(){let e="ask-checked",t="",a=!1;return{showModal:!1,classOld:e,classActual:t,showLoading:a}},methods:{sendDataModal:function(){let e=document.querySelector("#thanks-registrer-container");this.showModal=!0,window.setTimeout((t=>{e.style.animation="hide 1s"}),5e3),window.setTimeout((t=>{this.showModal=!1,e.style.animation=""}),5800)},sendMail:function(){const e=this.sendDataModal,t=this.quitLoading;this.showLoading=!0,event.preventDefault();const a="default_service",s="template_x9b4wwu";var n=document.querySelector("input[name='email']"),i=document.querySelector("input[name='name']"),o=document.querySelector("input[name='NombreNegocio']");emailjs.send(a,s,{email:n.value,name:i.value,local:o.value}).then((function(a){n.value="",i.value="",o.value="",t(),e()}),(function(e){t()}))},sendMailRider:function(){const e=this.sendDataModal,t=this.quitLoading;this.showLoading=!0,event.preventDefault();const a="default_service",s="template_u364r07";var n=document.querySelector("input[name='email']"),i=document.querySelector("input[name='name']");emailjs.send(a,s,{email:n.value,name:i.value}).then((function(a){n.value="",i.value="",t(),e()}),(function(e){t()}))},quitLoading:function(){this.showLoading=!1},changeSection:function(e){this.state=e,"old"===e?(this.classOld="ask-checked",this.classActual=""):"actual"===e&&(this.classOld="",this.classActual="ask-checked")}},mounted(){}},r=o,l=a(1001),c=(0,l.Z)(r,s,n,!1,null,null,null),u=c.exports}}]);
//# sourceMappingURL=21.54e020f9.js.map