<template>
	<div class="d-flex" v-if="!isRemoved">
		<div class="product-container">
			<p>{{product.productName}}</p>
			<div>
				<h6>$<span data-productPrice>{{product.productPrice}} </span></h6>
				<div class="moreLess-products-container">
					<button class="less" data-lessQuantity @click="resta"><span>-</span></button>
					<span data-productQuantity class="amount">{{product.productQuantity}}</span>
					<button class="more" data-moreQuantity @click="suma"><span>+</span></button>
				</div>
			</div>
		</div>
		<button data-deleteProduct class="quit-product" @click="detele"></button>
	</div>
</template>
<script>
	export default{
		name: 'CartItem',
		props: ['product', 'totalValue', 'refresh'],
		data(){
			return{quantity: 1, isRemoved: false}
		},
		methods:{
			changeUnitys: function(){
				let productsInTheCart = []
				JSON.parse(localStorage.getItem('miBarrio')) == null ? localStorage.setItem('miBarrio', JSON.stringify([])) : 
				JSON.parse(localStorage.getItem('miBarrio')).forEach(item =>{
					if (item != '-') {
						productsInTheCart.push(item)
					}
				});

				productsInTheCart.forEach(product => {
					if (product.restaurantName === this.product.restaurantName && product.productName === this.product.productName) {
						product.productQuantity = this.product.productQuantity
					}
				})

				localStorage.setItem('miBarrio', JSON.stringify(productsInTheCart))
				console.log(productsInTheCart)
			},
			resta: function(){
				if (this.product.productQuantity != 1) {
					this.product.productQuantity--
					this.changeUnitys()
					this.totalValue()
					this.refresh()
				}
			},
			suma: function(){
				this.product.productQuantity++
				this.totalValue()
				this.changeUnitys()
				this.refresh()
			},
			valueTotal: function(){
				this.totalValue()
			},
			detele: function(){
				let productsInTheCart = []
				JSON.parse(localStorage.getItem('miBarrio')) == null ? localStorage.setItem('miBarrio', JSON.stringify([])) : 
				JSON.parse(localStorage.getItem('miBarrio')).forEach(item =>{
					if (item != '-') {
						productsInTheCart.push(item)
					}
				});
				var index = ''
				for (var i = 0; i < productsInTheCart.length; i++) {
					if (productsInTheCart[i].restaurantName === this.product.restaurantName && productsInTheCart[i].productName === this.product.productName) {
						index = i
					}
				}
				productsInTheCart.splice(index,1,'-')
				localStorage.setItem('miBarrio', JSON.stringify(productsInTheCart))
				this.refresh()
			}

		},
		mounted(){
		}
	}

</script>