"use strict";(self["webpackChunkdelivery_vue"]=self["webpackChunkdelivery_vue"]||[]).push([[803],{4304:function(t,a,s){s.d(a,{Z:function(){return l}});var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("article",{staticClass:"disponible-ask-container",on:{click:t.goToAsk}},[s("div",{staticClass:"disponible-ask-header"},[s("h2",[t._v(t._s(t.ask.restaurant))]),s("div",{staticClass:"icon arrowAsk"})]),s("div",{staticClass:"disponible-ask-body mt-3"},[s("div",{staticClass:"directions-ask"},[s("div",[s("h4",[t._v("Retiro")]),s("p",[t._v(t._s(t.ask.partnerDir))])]),s("div",[s("h4",[t._v("Entrega")]),s("p",[t._v(t._s(t.ask.direction))])])])])])},n=[],e={name:"RiderAsk",props:["ask"],methods:{goToAsk:function(){this.$router.push({name:"RiderAskInfo",params:{id:this.ask.askID}})}}},r=e,o=s(1001),c=(0,o.Z)(r,i,n,!1,null,null,null),l=c.exports},6591:function(t,a,s){s.d(a,{Z:function(){return l}});var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"navbar navbar-light fixed-top"},[s("div",{staticClass:"container-fluid"},[s("h2",{staticClass:"navbar-brand"},[t._v(t._s(t.tittle))]),t._m(0),s("div",{staticClass:"offcanvas offcanvas-end",staticStyle:{visibility:"hidden"},attrs:{tabindex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel","aria-hidden":"true"}},[t._m(1),s("div",{staticClass:"offcanvas-body"},[s("div",{staticClass:"nav-container-partner"},[s("ul",{staticClass:"navbar-nav"},[s("li",{staticClass:"nav-item",on:{click:function(a){return t.goTo("disponibleAsks")}}},[s("div",{staticClass:"icon home"}),s("a",{staticClass:"nav-link",attrs:{"aria-current":"page"}},[t._v("Pedidos disponibles")])]),s("li",{staticClass:"nav-item",on:{click:function(a){return t.goTo("myAsks")}}},[s("div",{staticClass:"icon ask"}),s("a",{staticClass:"nav-link"},[t._v("Mis pedidos")])]),s("li",{staticClass:"nav-item padding-correction",on:{click:function(a){return t.goTo("history")}}},[s("div",{staticClass:"icon history"}),s("a",{staticClass:"nav-link"},[t._v("Historial")])]),s("li",{staticClass:"nav-item padding-correction",on:{click:function(a){return t.goTo("profit")}}},[s("div",{staticClass:"icon money"}),s("a",{staticClass:"nav-link"},[t._v("Ganancias")])])]),s("div",{staticClass:"logOutContainer",attrs:{"data-v-79df3b98":""}},[s("button",{attrs:{"data-v-79df3b98":""},on:{click:t.logOut}},[s("span",{attrs:{"data-v-79df3b98":""}},[t._v("Cerrar Sesión")])])])])])])])])},n=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar"}},[s("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"offcanvas-header"},[s("h5",{staticClass:"offcanvas-title",attrs:{id:"offcanvasNavbarLabel"}},[t._v("Mi Barrio")]),s("button",{staticClass:"btn-close text-reset",attrs:{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close"}})])}],e={name:"RiderNav",props:["tittle"],methods:{goTo:function(t){"disponibleAsks"===t?this.$router.push({name:"RiderIndex"}):"myAsks"===t?this.$router.push({name:"RiderMyAsks"}):"history"===t?this.$router.push({name:"RiderHistory"}):"profit"===t&&this.$router.push({name:"RiderProfit"})},overflowSolve:function(){var t=document.querySelector("#offcanvasNavbar"),a=document.querySelector("body");"visible"!=t.style.visibility&&(a.style.overflow="auto")},logOut:function(){var t=this;firebase.auth().signOut().then((function(){t.$router.push("/RiderLogin")})).catch((function(t){console.log("Ocurrio un error, el error es ".concat(t))}))}},mounted:function(){this.overflowSolve()}},r=e,o=s(1001),c=(0,o.Z)(r,i,n,!1,null,"398e9d9c",null),l=c.exports},2803:function(t,a,s){s.r(a),s.d(a,{default:function(){return d}});var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("header",[s("RiderNav",{attrs:{tittle:"Mis pedidos"}})],1),s("section",{staticClass:"rider-index"},[t._l(t.asks,(function(t,a){return s("RiderAsk",{key:a,attrs:{ask:t}})})),0===t.asks.length?s("div",{staticClass:"div-noResults"},[s("h1",[t._v("No tiene ningun pedido en curso")])]):t._e()],2)])},n=[],e=(s(1539),s(4747),s(2479),s(6591)),r=s(4304),o={name:"RiderMyAsks",components:{RiderNav:e.Z,RiderAsk:r.Z},data:function(){var t={},a=[];return{users:t,asks:a}},methods:{isLogin:function(){var t=this;firebase.auth().onAuthStateChanged((function(a){a?firebase.database().ref("USERSriders").on("value",(function(s){var i=s.val(),n=!1;i.forEach((function(s){s.mail.toLowerCase()===a.email&&(t.user=a,n=!0)})),n||t.$router.push("/RiderLogin")})):t.$router.push("/RiderLogin")}))},showAsk:function(){var t=this;firebase.auth().onAuthStateChanged((function(a){a&&(t.user=a,t.asks.length=0,firebase.database().ref("pedidos").on("value",(function(s){Object.values(s.val()).forEach((function(s){Object.values(s).forEach((function(s){s.riderID===a.uid&&"Entregado"!=s.estado&&t.asks.push(s)}))}))})))}))}},mounted:function(){this.isLogin(),this.showAsk()}},c=o,l=s(1001),u=(0,l.Z)(c,i,n,!1,null,null,null),d=u.exports}}]);
//# sourceMappingURL=803-legacy.92042b28.js.map