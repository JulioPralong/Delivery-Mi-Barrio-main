<template>
	<div v-if="isVisible">
		<button class="cart-button" v-show="!cartOpen" @click="cartOpen = true">
			<div class="icon cart"></div><h5>Ver Carrito</h5>
		</button>
		<section class="cart-open" v-show="cartOpen">
		    <article class="cart-header">
		        <h2>Carrito</h2>
		        <button class="icon arrow" @click="quit"></button>
		    </article>
		    <article class="cart-body">
		        <h3>Estas llevando</h3>
		        <div class="products d-flex flex-column" id="cartproducts">
		        	<CartItems v-for="(item, index) in productsInTheCart" :key="index"
		        	:product= item
		        	:totalValue= totalVal
		        	:refresh= verifyProducts
		        	/>
		        </div>
		        <div class="total-price"><h2>Total</h2><span data-carttotalprice="">{{totalPrice}}</span></div>
		        <div class="send-container"><button @click="goFinishAsk"><span>Finalizar compra</span></button></div>
		    </article>
		</section>
	</div>
</template>
<script>
	import CartItems from '@/components/cartItems.vue'
	import { mapState } from 'vuex'
	export default{
		name: 'Cart',
		data(){
			var cartOpen = false
			var totalPrice = []
			var productsInTheCart = []
			var isVisible = true;
			var totalPriceProduct = []
			var totalPrice = ""
			return{cartOpen, totalPrice, isVisible, productsInTheCart, totalPriceProduct, totalPrice}
		},
		components:{
			CartItems
		},
		computed:{
			...mapState(['isLogin'])
		},
		methods:{
			quit: function(){
				var cart = document.querySelector(".cart-open")
				cart.style.animation = "closeCart .8s"
				window.setTimeout(e=>{
					cart.style.animation = ''
					this.cartOpen = false
				}, 750)
			},
			verifyProducts: function(){
				this.productsInTheCart = []
				JSON.parse(localStorage.getItem('miBarrio')) == null ? localStorage.setItem('miBarrio', JSON.stringify([])) : 
				JSON.parse(localStorage.getItem('miBarrio')).forEach(item =>{
					if (item != '-') {
						this.productsInTheCart.push(item)
					}
				});
				if (this.productsInTheCart.length != 0) {
					this.isVisible = true
				} else{
					this.isVisible = false
				}
				this.totalVal()
			},
			totalVal: function(){
				var allItems = []
				JSON.parse(localStorage.getItem('miBarrio')) == null ? localStorage.setItem('miBarrio', JSON.stringify([])) : 
				JSON.parse(localStorage.getItem('miBarrio')).forEach(item =>{
					if (item != '-') {
						allItems.push(item)
					}
				});
				if (this.productsInTheCart.length != 0) {
					this.isVisible = true
				} else{
					this.isVisible = false
				}
				var total = 0;
				allItems.forEach(e=>{
					total += (parseInt(e.productPrice) * parseInt(e.productQuantity) )
				})
				this.totalPrice = total
			},
			goFinishAsk: function(){
				if (this.isLogin) {
					this.$router.push({ name: 'finalizarPedido' })
				} else{
					this.$router.push({ name: 'login' })
				}
				
			}
		},
		mounted(){
			this.verifyProducts()
			this.totalVal()
		}
	}
</script>
<style>
@media screen and (min-width: 850px){
	.cart-button{
		width: 15%;
		right: 42.5%;
	}
	.cart-open{
		width: 30%;
		left: 35%;
	}
}
</style>