"use strict";(self["webpackChunkdelivery_vue"]=self["webpackChunkdelivery_vue"]||[]).push([[539],{3539:function(t,s,e){e.r(s),e.d(s,{default:function(){return f}});var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("header",[e("UserNav",{attrs:{page:"Mis pedidos",login:"true",clas:"header-navegator"}})],1),e("section",{staticClass:"ask-container"},[e("article",{staticClass:"ask-header"},[e("button",{class:[t.classActual],attrs:{id:"inProcess"},on:{click:function(s){return t.changeSection("actual")}}},[e("h3",[t._v("En proceso")])]),e("button",{class:[t.classOld],attrs:{id:"ended"},on:{click:function(s){return t.changeSection("old")}}},[e("h3",[t._v("Finalizados")])])]),"old"===t.state?e("article",{staticClass:"ask-body-previous",attrs:{id:"ask-body-previous"}},[t._l(t.oldAsks,(function(t,s){return e("PedidoMaquet",{attrs:{product:t,state:"old"}})})),0===t.oldAsks.length?e("div",{staticClass:"div-noResults"},[e("h1",[t._v("Aún no tiene ningun pedido finalizado")])]):t._e()],2):t._e(),"actual"===t.state?e("article",{staticClass:"ask-body-previous",attrs:{id:"ask-body-previous"}},[t._l(t.newAsks,(function(t,s){return e("PedidoMaquet",{attrs:{product:t,state:"actual"}})})),0===t.newAsks.length?e("div",{staticClass:"div-noResults"},[e("h1",[t._v("No tiene pedidos en proceso")])]):t._e()],2):t._e()]),e("Cart")],1)},o=[],i=e(1659),r=function(){var t=this,s=t.$createElement,e=t._self._c||s;return"old"===t.state?e("div",{staticClass:"product-container product-ask"},[t._l(t.nameProducts,(function(s,a){return e("p",{key:a,staticClass:"p-product p-product-ask"},[t._v(" -"+t._s(s))])})),e("div",[e("h6",{staticClass:"price-item"},[t._v("$"+t._s(t.product.riderDbt+110))]),e("div",{staticClass:"moreLess-products-container ask-div"},[e("button",{staticClass:"more button-ask ",on:{click:function(s){return t.goToResto()}}},[e("span",[t._v("Volverlo a pedir")])])])])],2):"actual"===t.state?e("div",{staticClass:"product-container product-ask"},[t._l(t.product.pedido,(function(s,a){return e("p",{staticClass:"p-product p-product-ask"},[t._v(" -"+t._s(s.productName))])})),e("div",{staticClass:"align-items-center"},[e("h6",{staticClass:"price-item m-0"},[t._v("$"+t._s(t.product.riderDbt+110))]),e("div",{staticClass:"moreLess-products-container ask-div-actual"},[e("button",{staticClass:"more button-ask "},[e("span",[t._v(t._s(t.product.estado))])])])])],2):t._e()},c=[],n={name:"PedidoMaquet",props:["product","state"],data(){let t="",s=[];return{price:t,nameProducts:s}},methods:{setPrice:function(){this.price=0,this.product.pedido.forEach((t=>{this.price+=t.productPrice,this.nameProducts.push(t.productName)}))},goToResto:function(){var t=this.product.askID.split("-")[1];this.$router.push(`/restaurant/${t}`)}},mounted(){this.setPrice()}},d=n,l=e(1001),u=(0,l.Z)(d,r,c,!1,null,"63534a25",null),p=u.exports,h=e(985),v={name:"USERpedidos",data(){let t=[],s=[],e="old",a="El repartidor esta esperando en el local",o="ask-checked",i="",r={};return{newAsks:t,oldAsks:s,state:e,productState:a,classOld:o,classActual:i,user:r}},components:{UserNav:i.Z,PedidoMaquet:p,Cart:h.Z},methods:{changeSection:function(t){this.state=t,"old"===t?(this.classOld="ask-checked",this.classActual=""):"actual"===t&&(this.classOld="",this.classActual="ask-checked")},asksOrder:function(){firebase.auth().onAuthStateChanged((t=>{t&&(this.user=t,console.log(this.user.uid),firebase.database().ref(`pedidos/${t.uid}`).on("value",(t=>{if(null!=t.val()&&void 0!=t.val()){var s=Object.values(t.val());this.oldAsks.length=0,this.newAsks.length=0,s.forEach((t=>{"Entregado"!=t.estado?this.newAsks.push(t):this.oldAsks.push(t)}))}}))),console.log(this.newAsks),console.log(this.oldAsks)}))}},mounted(){this.asksOrder()}},k=v,_=(0,l.Z)(k,a,o,!1,null,null,null),f=_.exports}}]);
//# sourceMappingURL=539.5ed9fed4.js.map