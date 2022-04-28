"use strict";(self["webpackChunkdelivery_vue"]=self["webpackChunkdelivery_vue"]||[]).push([[9],{8155:function(e,t,r){r.d(t,{Z:function(){return d}});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"error-container"},[r("button",{staticClass:"icon exit exit-modal-add",staticStyle:{padding:"5%"},on:{click:e.closeButton}}),r("h3",[e._v(e._s(e.message))])])},i=[],s={name:"ErrorMessage",props:["message","close"],methods:{hide:function(){let e=document.querySelector(".error-container");window.setTimeout((t=>{e.style.animation="hide .5s"}),3e3),window.setTimeout((t=>{e.style.animation="",this.close()}),3400)},closeButton:function(){let e=document.querySelector(".error-container");e.style.animation="",this.close()}},mounted(){this.hide()}},o=s,n=r(1001),c=(0,n.Z)(o,a,i,!1,null,null,null),d=c.exports},5009:function(e,t,r){r.r(t),r.d(t,{default:function(){return f}});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("header",[r("UserNav",{attrs:{page:"Finalizar pedido",login:"true",clas:"header-navegator"}})],1),r("section",{staticClass:"end-ask-container"},[r("article",{staticClass:"delivery-details"},[r("h3",[e._v("Direccion de entrega")]),r("SearchDirection")],1),r("article",{staticClass:"pay-method"},[r("h3",{staticClass:"mb-3"},[e._v("Método de pago")]),e.isPay?e._e():r("div",{staticClass:"inputs-pay-container"},[r("div",{staticClass:"second-pay-container"},[r("div",[r("input",{attrs:{type:"radio",name:"method-pay",id:"method-cash",checked:""},on:{click:function(t){return e.MPpayShow("hide")}}}),r("label",[e._v("Efectivo")])]),r("div",[r("input",{attrs:{type:"radio",name:"method-pay",id:"method-mp"},on:{click:function(t){return e.MPpayShow("show")}}}),r("label",[e._v("MercadoPago")])])]),r("form",{directives:[{name:"show",rawName:"v-show",value:e.MP,expression:"MP"}],staticClass:"mercadopago-method",attrs:{id:"mp-pay-container",action:"https://us-central1-delivery-6c0fd.cloudfunctions.net/app/checkout",method:"POST"}},[r("div",{staticClass:"img-mp"}),r("input",{attrs:{type:"hidden",name:"totalPrice"},domProps:{value:e.totalPriceProducts+e.priceDelivery}}),r("input",{attrs:{type:"submit",value:"Realizar pago"}})])]),e.isPay?r("div",{staticClass:"inputs-pay-container"},[r("h2",{staticClass:"h2PayAlert"},[e._v("Pagado mediante mercadopago")])]):e._e()]),r("article",{staticClass:"resume-price"},[r("h3",{staticClass:"mb-4"},[e._v("Resumen del pedido")]),r("div",{staticClass:"resume-item"},[r("p",{staticClass:"m-0"},[e._v("Productos")]),r("p",{staticClass:"m-0"},[e._v("$"+e._s(e.totalPriceProducts))])]),r("div",{staticClass:"resume-item"},[r("p",[e._v("Envio")]),r("p",[e._v("$"+e._s(e.priceDelivery))])]),r("div",{staticClass:"resume-item total"},[r("p",[e._v("Total a pagar")]),r("p",[e._v("$ "+e._s(e.totalPriceProducts+e.priceDelivery)+" ")])])]),r("div",{staticClass:"send-delivery"},[r("button",{on:{click:e.sendOrder}},[e._v("Enviar pedido")])])]),e.showError?r("ErrorMessage",{attrs:{message:e.messageError,close:e.quitError}}):e._e()],1)},i=[],s=r(8155),o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"d-flex justify-content-center"},[r("input",{attrs:{type:"text",name:"delivery-direction",id:"origin"}})])}],c={name:"SearchDirection",data(){var e={lat:-34,lng:-64};let t,r,a,i=document.getElementById("origin");const s=document.getElementById("map");return{argencords:e,map:t,marker:r,autocomplete:a,input:i,mapdiv:s}}},d=c,l=r(1001),u=(0,l.Z)(d,o,n,!1,null,null,null),h=u.exports,p=r(1659),m={name:"FinalizarPedido",components:{UserNav:p.Z,SearchDirection:h,ErrorMessage:s.Z},data(){let e=!1,t=[],r="",a="",i=[],s={},o=!1,n="",c=!1;return{MP:e,productsInTheCart:t,priceDelivery:r,totalPriceProducts:a,restaurantsInTheCart:i,user:s,isPay:o,messageError:n,showError:c}},methods:{MPpayShow:function(e){"show"===e?this.MP=!0:"hide"===e&&(this.MP=!1)},verifyProducts:function(){null==JSON.parse(localStorage.getItem("miBarrio"))?localStorage.setItem("miBarrio",JSON.stringify([])):JSON.parse(localStorage.getItem("miBarrio")).forEach((e=>{"-"!=e&&this.productsInTheCart.push(e)}))},sendOrder:function(){var e=document.querySelector("input[name='delivery-direction']"),t=document.querySelector("#method-cash");""===e.value?(this.messageError="Debe indicar direccion de envio para enviar el pedido",this.showError=!0):this.isPay||t.checked?this.restaurantsInTheCart.forEach(((e,t)=>{let r=[],a=`${(new Date).getTime()}-${e}`;this.productsInTheCart.forEach((t=>{t.restaurantName==e&&r.push(t)}));var i="",s=document.querySelector("input[name='delivery-direction']"),o=document.querySelectorAll("input[name='method-pay']");o.forEach((e=>{e.checked&&(i=e.id)}));var n=(new Date).getMonth()+1,c=0,d="";this.isPay?r.forEach((e=>{""===d&&null!=e.restaurantDirection&&void 0!=e.restaurantDirection&&(d=e.restaurantDirection)})):"method-cash"===i&&r.forEach((e=>{c+=e.productPrice*e.productQuantity,""===d&&null!=e.restaurantDirection&&void 0!=e.restaurantDirection&&(d=e.restaurantDirection)}));let l={pedido:r,estado:"Pendiente de aceptacion del restaurante",aceptado:!1,restaurant:e,direction:s.value,method:i,riderName:"No aceptado aún",riderID:"No aceptado aún",riderDbt:c,clientID:this.user.uid,askID:a,monthAsk:n,partnerDir:d};firebase.database().ref(`pedidos/${this.user.uid}/${a}`).set(l),localStorage.setItem("miBarrio",JSON.stringify([])),this.$router.push({name:"home"})})):(this.messageError="Debe realizar el pago mediante MercadoPago",this.showError=!0)},divideOrder:function(){let e=[];this.productsInTheCart.forEach((t=>{e.push(t.restaurantName)})),this.restaurantsInTheCart=[...new Set(e)],this.priceDelivery=110*parseInt(e.length)},totalValueProducts:function(){var e=0;this.productsInTheCart.forEach((t=>{e+=parseInt(t.productPrice)*parseInt(t.productQuantity)})),this.totalPriceProducts=e},userData:function(){firebase.auth().onAuthStateChanged((e=>{e&&(this.user=e,console.log(this.user))})),window.location.href.includes("status=approved")?this.isPay=!0:console.log(window.location.href)},quitError:function(){this.showError=!1}},mounted(){this.verifyProducts(),this.divideOrder(),this.totalValueProducts(),this.userData()}},v=m,y=(0,l.Z)(v,a,i,!1,null,null,null),f=y.exports}}]);
//# sourceMappingURL=9.9b3dbe33.js.map