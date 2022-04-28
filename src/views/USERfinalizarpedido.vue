<template>
	<div>
		<header>
			<UserNav page="Finalizar pedido" login='true' clas="header-navegator"></UserNav>
		</header>
		<section class="end-ask-container">	
			<article class="delivery-details">
				<h3>Direccion de entrega</h3>
				<SearchDirection/>
			</article>
			<article class="pay-method" >
				<h3 class="mb-3">Método de pago</h3>
			<div class="inputs-pay-container" v-if="!isPay">
				<div class="second-pay-container">
					<div><input type="radio" name="method-pay" id="method-cash" v-on:click="MPpayShow('hide')" checked><label>Efectivo</label></div>
					<div><input type="radio" name="method-pay" id="method-mp" v-on:click="MPpayShow('show')"><label>MercadoPago</label></div>
				</div>
				<form class="mercadopago-method" id="mp-pay-container" v-show="MP" action="https://us-central1-delivery-6c0fd.cloudfunctions.net/app/checkout" method="POST">
					<div class="img-mp"></div>
					<input type="hidden" name="totalPrice" :value="totalPriceProducts + priceDelivery">
					<input type="submit" value="Realizar pago">
				</form>
			</div>
			<div class="inputs-pay-container" v-if="isPay">
				<h2 class="h2PayAlert">Pagado mediante mercadopago</h2>
			</div>
			</article>
			<article class="resume-price">
				<h3 class="mb-4">Resumen del pedido</h3>
				<div class="resume-item">
					<p class="m-0">Productos</p>
					<p class="m-0">${{ totalPriceProducts }}</p>
				</div>
				<div class="resume-item">
					<p>Envio</p>
					<p>${{ priceDelivery }}</p>
				</div>
				<div class="resume-item total">
					<p>Total a pagar</p>
					<p>$ {{ totalPriceProducts + priceDelivery}} </p>
				</div>
			</article>
			<div class="send-delivery">
				<button @click="sendOrder">Enviar pedido</button>
			</div>
		</section>
		<ErrorMessage v-if="showError"
		:message="messageError"
		:close= quitError
		/>
	</div>
</template>

<script>
	import ErrorMessage from '@/components/errorMessage.vue'
	import SearchDirection from '@/components/inputFinalizarPedido.vue'
	import UserNav from '@/components/USERnav.vue'
	export default{
		name: 'FinalizarPedido',
		components:{
			UserNav, SearchDirection, ErrorMessage
		},
		data(){
			let MP = false;
			let productsInTheCart = []
			let priceDelivery = ""
			let numberOfRestaurants = ""
			let totalPriceProducts = ""
			let restaurantsInTheCart = []
			let user = {}
			let isPay = false;
			let messageError = ""
			let showError = false
			return {MP, productsInTheCart, priceDelivery, totalPriceProducts, restaurantsInTheCart, user, isPay, messageError, showError}
		},
		methods:{
			MPpayShow: function(e){
				if (e === 'show') {
					this.MP = true;
				} else if (e === 'hide') {
					this.MP = false
				}
			},
			verifyProducts: function(){
				JSON.parse(localStorage.getItem('miBarrio')) == null ? localStorage.setItem('miBarrio', JSON.stringify([])) : 
				JSON.parse(localStorage.getItem('miBarrio')).forEach(item =>{
					if (item != '-') {
						this.productsInTheCart.push(item)
					}
				});
			},
			sendOrder: function(){
			var inputDirec = document.querySelector("input[name='delivery-direction']")
			var inputCash = document.querySelector("#method-cash")
			if (inputDirec.value === '') {
				this.messageError = "Debe indicar direccion de envio para enviar el pedido"
				this.showError = true;
			} else if(!this.isPay && !inputCash.checked ){
				this.messageError = "Debe realizar el pago mediante MercadoPago"
				this.showError = true;
			} else{
				this.restaurantsInTheCart.forEach((restaurant,index) => {
				let productsInTheRestaurant = [];
				let randomNumber = `${(new Date).getTime()}-${restaurant}`

				this.productsInTheCart.forEach(product => {
					if (product.restaurantName == restaurant) {
						productsInTheRestaurant.push(product)
					}
				})
				var methodPay = ""
				var direction = document.querySelector("input[name='delivery-direction']")
				var inputCheckedArray = document.querySelectorAll("input[name='method-pay']")
				inputCheckedArray.forEach(e=>{
					if (e.checked) {
						methodPay = e.id
					}
				})
				var month = ((new Date()).getMonth() + 1)
				var Riderdebt = 0;
				var RestaurantDirectionString = ""

				if (!this.isPay) {
					if (methodPay === "method-cash") {
						productsInTheRestaurant.forEach((e)=>{
							Riderdebt += (e.productPrice * e.productQuantity) ;
							if (RestaurantDirectionString === "" && e.restaurantDirection != null && e.restaurantDirection != undefined) {
								RestaurantDirectionString = e.restaurantDirection
							}
						})
					}
				} else{
					productsInTheRestaurant.forEach((e)=>{
						if (RestaurantDirectionString === "" && e.restaurantDirection != null && e.restaurantDirection != undefined) {
							RestaurantDirectionString = e.restaurantDirection
						}
					})
				}
				
				let order = {
							'pedido': productsInTheRestaurant,
							'estado': 'Pendiente de aceptacion del restaurante',
							'aceptado': false,
							'restaurant': restaurant,
							'direction': direction.value,
							'method': methodPay,
							'riderName': "No aceptado aún",
							'riderID': "No aceptado aún",
							'riderDbt': Riderdebt,
							'clientID': this.user.uid,
							'askID': randomNumber,
							'monthAsk': month,
							'partnerDir': RestaurantDirectionString
						};

				firebase.database().ref(`pedidos/${this.user.uid}/${randomNumber}`).set(order)
				localStorage.setItem('miBarrio', JSON.stringify([]))
				this.$router.push({ name: 'home' })
			})
			}
				
			},
			divideOrder: function () {
				let restaurantsInTheCart = []
				this.productsInTheCart.forEach(product => {
					restaurantsInTheCart.push(product.restaurantName)
				})
				this.restaurantsInTheCart = [...new Set(restaurantsInTheCart)]
				this.priceDelivery = (parseInt(restaurantsInTheCart.length) * 110)
			},
			totalValueProducts: function(){
				var total = 0;
				this.productsInTheCart.forEach(e=>{
					total += (parseInt(e.productPrice) * parseInt(e.productQuantity) )
				})
				this.totalPriceProducts = total
			},
			userData: function(){
				firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						this.user = firebaseUser
						console.log(this.user)
					}
				})
				if (window.location.href.includes(`status=approved`)) {
					this.isPay = true;
				} else{
					console.log(window.location.href)
				}	
			},
			quitError: function(){
				this.showError = false;
			}
		},
		mounted(){
			this.verifyProducts()
			this.divideOrder()
			this.totalValueProducts()
			this.userData()
		}
	}
</script>

<style>
#mp-pay-container input{
	flex: 1;
    background: #fff;
    border: none;
    border-top: 1px solid #999;
    font-size: 1.5em;
    margin: 0;
    padding: 0;
    font-weight: 600;
}
@media screen and (min-width: 850px){

.end-ask-container{
	margin: auto;
    display: flex;
    margin-top: 10%;
    flex-wrap: wrap;
    width: 70%;
}

.end-ask-container article {
    width: 50%;
}

.delivery-details {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    background: linear-gradient(to bottom, #ddd, #ddd, #ddd, #ddd, #efefef);
    padding: 5%;
    border-top: 1px solid #999;
}

.resume-price{
	width: 100% !important;
}

.send-delivery{
	margin: auto;
	margin-bottom: 5%;
}

p, label{
	font-size: 1.2em
}

}
.h2PayAlert{
	text-align: center;
    border-radius: 30px;
    font-size: 1.4em;
    outline: 1px solid #555;
    background: linear-gradient(to bottom, #f90050, #cf0043);
    color: #fff;
    padding: 2%;
}
</style>