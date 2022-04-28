"use strict";(self["webpackChunkdelivery_vue"]=self["webpackChunkdelivery_vue"]||[]).push([[332],{4304:function(t,s,a){a.d(s,{Z:function(){return c}});var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("article",{staticClass:"disponible-ask-container",on:{click:t.goToAsk}},[a("div",{staticClass:"disponible-ask-header"},[a("h2",[t._v(t._s(t.ask.restaurant))]),a("div",{staticClass:"icon arrowAsk"})]),a("div",{staticClass:"disponible-ask-body mt-3"},[a("div",{staticClass:"directions-ask"},[a("div",[a("h4",[t._v("Retiro")]),a("p",[t._v(t._s(t.ask.partnerDir))])]),a("div",[a("h4",[t._v("Entrega")]),a("p",[t._v(t._s(t.ask.direction))])])])])])},e=[],n={name:"RiderAsk",props:["ask"],methods:{goToAsk:function(){this.$router.push({name:"RiderAskInfo",params:{id:this.ask.askID}})}}},r=n,o=a(1001),l=(0,o.Z)(r,i,e,!1,null,null,null),c=l.exports},6591:function(t,s,a){a.d(s,{Z:function(){return c}});var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("nav",{staticClass:"navbar navbar-light fixed-top"},[a("div",{staticClass:"container-fluid"},[a("h2",{staticClass:"navbar-brand"},[t._v(t._s(t.tittle))]),t._m(0),a("div",{staticClass:"offcanvas offcanvas-end",staticStyle:{visibility:"hidden"},attrs:{tabindex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel","aria-hidden":"true"}},[t._m(1),a("div",{staticClass:"offcanvas-body"},[a("div",{staticClass:"nav-container-partner"},[a("ul",{staticClass:"navbar-nav"},[a("li",{staticClass:"nav-item",on:{click:function(s){return t.goTo("disponibleAsks")}}},[a("div",{staticClass:"icon home"}),a("a",{staticClass:"nav-link",attrs:{"aria-current":"page"}},[t._v("Pedidos disponibles")])]),a("li",{staticClass:"nav-item",on:{click:function(s){return t.goTo("myAsks")}}},[a("div",{staticClass:"icon ask"}),a("a",{staticClass:"nav-link"},[t._v("Mis pedidos")])]),a("li",{staticClass:"nav-item padding-correction",on:{click:function(s){return t.goTo("history")}}},[a("div",{staticClass:"icon history"}),a("a",{staticClass:"nav-link"},[t._v("Historial")])]),a("li",{staticClass:"nav-item padding-correction",on:{click:function(s){return t.goTo("profit")}}},[a("div",{staticClass:"icon money"}),a("a",{staticClass:"nav-link"},[t._v("Ganancias")])])]),a("div",{staticClass:"logOutContainer",attrs:{"data-v-79df3b98":""}},[a("button",{attrs:{"data-v-79df3b98":""},on:{click:t.logOut}},[a("span",{attrs:{"data-v-79df3b98":""}},[t._v("Cerrar Sesión")])])])])])])])])},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar"}},[a("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"offcanvas-header"},[a("h5",{staticClass:"offcanvas-title",attrs:{id:"offcanvasNavbarLabel"}},[t._v("Mi Barrio")]),a("button",{staticClass:"btn-close text-reset",attrs:{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close"}})])}],n={name:"RiderNav",props:["tittle"],methods:{goTo:function(t){"disponibleAsks"===t?this.$router.push({name:"RiderIndex"}):"myAsks"===t?this.$router.push({name:"RiderMyAsks"}):"history"===t?this.$router.push({name:"RiderHistory"}):"profit"===t&&this.$router.push({name:"RiderProfit"})},overflowSolve:function(){var t=document.querySelector("#offcanvasNavbar"),s=document.querySelector("body");"visible"!=t.style.visibility&&(s.style.overflow="auto")},logOut:function(){firebase.auth().signOut().then((()=>{this.$router.push("/RiderLogin")})).catch((t=>{console.log(`Ocurrio un error, el error es ${t}`)}))}},mounted(){this.overflowSolve()}},r=n,o=a(1001),l=(0,o.Z)(r,i,e,!1,null,"398e9d9c",null),c=l.exports},7332:function(t,s,a){a.r(s),a.d(s,{default:function(){return u}});var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("header",[a("RiderNav",{attrs:{tittle:"Historial"}})],1),a("section",{staticClass:"rider-index"},[t._l(t.asks,(function(t,s){return a("RiderAsk",{key:s,attrs:{ask:t}})})),0===t.asks.length?a("div",{staticClass:"div-noResults"},[a("h1",[t._v("Aún no tiene pedidos en historial")])]):t._e()],2)])},e=[],n=a(6591),r=a(4304),o={name:"RiderHistory",components:{RiderNav:n.Z,RiderAsk:r.Z},data(){let t={},s=[];return{user:t,asks:s}},methods:{isLogin:function(){firebase.auth().onAuthStateChanged((t=>{t?firebase.database().ref("USERSriders").on("value",(s=>{var a=s.val(),i=!1;a.forEach((s=>{s.mail.toLowerCase()===t.email&&(this.user=t,i=!0)})),i||this.$router.push("/RiderLogin")})):this.$router.push("/RiderLogin")}))},showAsk:function(){firebase.auth().onAuthStateChanged((t=>{t&&(this.user=t,this.asks.length=0,firebase.database().ref("pedidos").on("value",(s=>{Object.values(s.val()).forEach((s=>{Object.values(s).forEach((s=>{s.riderID===t.uid&&"Entregado"===s.estado&&this.asks.push(s)}))}))})))}))}},mounted(){this.isLogin(),this.showAsk()}},l=o,c=a(1001),d=(0,c.Z)(l,i,e,!1,null,null,null),u=d.exports}}]);
//# sourceMappingURL=332.4851f2d9.js.map