<template>
<div>
	<header>
		<UserNav page="Mis pedidos" login='true' clas="header-navegator"></UserNav>
	</header>
	<section class="ask-container">
		<article class="ask-header">
			<button id="inProcess" :class="[classActual]" v-on:click="changeSection('actual')"><h3>En proceso</h3></button>
			<button id="ended" :class="[classOld]" v-on:click="changeSection('old')"><h3>Finalizados</h3></button>
		</article>
		<article class="ask-body-previous" id="ask-body-previous" v-if="state === 'old'">
			<PedidoMaquet v-for="(ped, index) in oldAsks"
				:product= ped
				state="old"
			></PedidoMaquet>
			<div class="div-noResults" v-if="oldAsks.length === 0">
				<h1>Aún no tiene ningun pedido finalizado</h1>
			</div>
		</article>
		<article class="ask-body-previous" id="ask-body-previous" v-if="state === 'actual'">
			<PedidoMaquet v-for="(ped, index) in newAsks"
				:product= ped
				state="actual"
			></PedidoMaquet>
			<div class="div-noResults" v-if="newAsks.length === 0">
				<h1>No tiene pedidos en proceso</h1>
			</div>
		</article>
	</section>
	<Cart/>
</div>
</template>

<script>
	import UserNav from '../components/USERnav.vue'
	import PedidoMaquet from '@/components/pedido.vue'
	import Cart from '@/components/cart.vue'
	export default{
		name: 'USERpedidos',
		data(){
			let newAsks = [];
			let oldAsks = [];
			let state = "old";
			let productState = "El repartidor esta esperando en el local";
			let classOld = "ask-checked";
			let classActual = "";
			let user = {}
			return {newAsks, oldAsks, state, productState, classOld, classActual, user}
		},
		components: {
			UserNav, PedidoMaquet, Cart
		},
		methods:{
			changeSection: function(e){
				this.state = e;
				if (e === 'old') {
					this.classOld = "ask-checked"
					this.classActual = ""
				} else if (e === 'actual') {
					this.classOld = ""
					this.classActual = "ask-checked"
				}
			},
			asksOrder: function(){
				firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						this.user = firebaseUser
						console.log(this.user.uid)
						firebase.database().ref(`pedidos/${firebaseUser.uid}`).on('value', (sampshot)=>{
							if (sampshot.val() != null && sampshot.val() != undefined) {
								var asksArray = Object.values(sampshot.val())
			    				this.oldAsks.length = 0
			    				this.newAsks.length = 0 
			    				asksArray.forEach((e)=>{
			    					if (e.estado != "Entregado") {
			    						this.newAsks.push(e)
			    					} else {
			    						this.oldAsks.push(e)
			    					}
			    				})
							}
		    				
		    			})
					}
					console.log(this.newAsks)
					console.log(this.oldAsks)
				})	
			}
		},
		mounted(){
			this.asksOrder()
		}
	}
</script>
<style>
	.div-noResults{
		width: 80%;
	    outline: 1px solid;
	    margin: auto;
	    padding: 5%;
	    border-radius: 50px;
	    background-color: #f9f9f9;
	    text-align: center;
	    box-shadow: 3px 5px 12px 0px;
	}
	.div-noResults h1{
		font-size: 2em;
		line-height: 1.4em;
	}
	@media screen and (min-width: 850px){
		.ask-container {
	    	margin-top: 8%;
		}
		.ask-header{
			width: 40%;
			margin-bottom: 5%;
		}
		.product-ask {
		    width: 45% !important;
		    margin-bottom: 5%;
		    border-radius: 40px;
		    padding-top: 2%;
		}
		.ask-body-previous{
			display: flex;
		    flex-wrap: wrap;
		}
		.p-product[data-v-68ca9256] {
		    font-weight: 600 !important;
		    padding-left: 5% !important;
		    font-size: 1.5em !important;
		    line-height: 1em !important;
		}
		.div-noResults{
			width: 30%;
			padding: 2%;
		}
	}
</style>