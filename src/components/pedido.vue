<template>
	<div class="product-container product-ask" v-if="state === 'old'">
		<p class="p-product p-product-ask" v-for="(item, index) in nameProducts " :key="index">
		-{{ item }}</p>
		<div>
			<h6 class="price-item">${{ product.riderDbt + 110 }}</h6>
			<div class="moreLess-products-container ask-div">
				<button class="more button-ask " @click="goToResto()"><span>Volverlo a pedir</span></button>
			</div>
		</div>
	</div>
		<div class="product-container product-ask" v-else-if="state === 'actual'">
			<p class="p-product p-product-ask" v-for="(item, index) in product.pedido ">
				-{{ item.productName }}</p>
			<div class="align-items-center">
				<h6 class="price-item m-0">${{ product.riderDbt + 110 }}</h6>
				<div class="moreLess-products-container ask-div-actual">
					<button class="more button-ask "><span>{{ product.estado }}</span></button>
				</div>
			</div>
		</div>
</template>
<script>
	export default {
		name: 'PedidoMaquet',
		props: ['product', 'state'],
		data(){
			let price = ""
			let nameProducts = []
			return{price, nameProducts}
		},
		methods:{
			setPrice: function(){
				this.price = 0;
				this.product.pedido.forEach((e)=>{
					this.price += e.productPrice
					this.nameProducts.push(e.productName)
				})
			},
			goToResto: function(){
				var resto = this.product.askID.split('-')[1]
				this.$router.push(`/restaurant/${resto}`)
			}
		},
		mounted(){
			this.setPrice()
		}
	}
</script>
<style scoped>
	.p-product{
	    font-weight: 600 !important; 
	    padding-left: 5% !important;
	    font-size: 1.3em !important;
	    line-height: 1em !important;
	}
	.button-ask span{
		font-size: 1.1em;
	}
	div[data-v-68ca9256] h6{
		font-size: 1.7em !important;
	}
</style>