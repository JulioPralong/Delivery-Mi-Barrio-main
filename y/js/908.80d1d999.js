"use strict";(self["webpackChunkdelivery_vue"]=self["webpackChunkdelivery_vue"]||[]).push([[908],{2908:function(t,e,a){a.r(e),a.d(e,{default:function(){return f}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("header",[a("UserNav",{attrs:{page:"Restaurante",login:"true",clas:"header-navegator"}})],1),a("section",{staticClass:"header-restaurant"},[a("div",{staticClass:"photo-restaurante"},[a("img",{attrs:{id:"restaurantBanner",src:[t.RestoImg],alt:""}})]),a("h3",{staticClass:"title-header-restaurant",attrs:{id:"restaurantName"}},[t._v(t._s(t.RestoName))])]),a("section",{staticClass:"body-restaurant"},[a("section",{attrs:{id:"restaurantFood"}},[a("h2",{staticClass:"h2BodyRestaurant"},[t._v("Comidas")]),t._l(t.food,(function(e,s){return a("ProductItem",{attrs:{img:e.img,price:e.costo,name:e.nombre,resto:t.RestoName}})}))],2),""!=t.drinks?a("section",{staticClass:"aqua-sodas",attrs:{id:"restaurantDrinks"}},[a("h2",[t._v("Bebidas")]),t._l(t.drinks,(function(e,s){return a("ProductItem",{attrs:{img:e.img,price:e.costo,name:e.nombre,resto:t.restoLink}})}))],2):t._e()]),a("Cart")],1)},r=[],i=a(1659),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{staticStyle:{color:"#000","text-decoration":"none"},attrs:{to:{name:"Plato",params:{id:t.linkResto+"--"+t.name}}}},[a("article",{staticClass:"article-product"},[a("div",{staticClass:"product-photo"},[a("img",{attrs:{"data-productimg":"",src:[t.img],alt:""}})]),a("div",{staticClass:"product-container product-container-restaurant"},[a("p",{staticClass:"p-product",attrs:{"data-productname":""}},[t._v(t._s(t.name))]),a("div",[a("h6",{staticClass:"price-item"},[t._v("$"),a("span",{attrs:{"data-productprice":""}},[t._v(t._s(t.price))])]),a("div",{staticClass:"moreLess-products-container circule"},[a("button",{staticClass:"more padding-change ",attrs:{"data-addcartbutton":""}},[a("span",[t._v("+")])])])])])])])},o=[],c={name:"ProductItem",props:["img","name","price","resto"],data(){let t="";return{linkResto:t}},methods:{noSpaces:function(){this.linkResto=this.resto.split(" ").join("")}},mounted(){this.noSpaces()}},u=c,d=a(1001),l=(0,d.Z)(u,n,o,!1,null,null,null),m=l.exports,p=a(985),h={name:"USERindex",components:{UserNav:i.Z,ProductItem:m,Cart:p.Z},data(){let t=[],e=[],a="",s="",r="";return{food:t,drinks:e,RestoName:a,RestoImg:s,RestoLink:r}},methods:{completePage:function(){firebase.database().ref(`restaurantes/${this.$route.params.id.split(" ").join("")}`).on("value",(t=>{let e=Object.values(t.val());this.RestoName=e[0],this.RestoImg=e[1].banner,e.forEach((t=>{"Bebidas"!=t.categoria&&null!=t.categoria?this.food.push(t):"Bebidas"===t.categoria&&this.drinks.push(t)})),this.restoLink=this.$route.params.id.split(" ").join("")}))}},mounted(){this.completePage()}},v=h,g=(0,d.Z)(v,s,r,!1,null,null,null),f=g.exports}}]);
//# sourceMappingURL=908.80d1d999.js.map