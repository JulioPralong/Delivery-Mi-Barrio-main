<template>
	<div>
		<header>
			<UserNav page="Producto" login='true' clas="header-navegator"></UserNav>
		</header>
		<section class="dish-container">
			<div class="dish-photo" :style="{'background-image': `url(${product.img})`, 'background-size':'cover', 'background-position': 'center'}"></div>
			<article class="dish-body">
				<h3>{{ product.nombre }}</h3>
				<p>${{ product.costo }}</p>
			</article>
			<div class="unity" >
				<h5>Unidades</h5>
				<div class="moreLess-products-container">
					<button class="less" v-on:click="changeQuanty('subtract')"><span>-</span></button>
					<span id="amountPrice" class="amount">{{countUnitys}}</span>
					<button class="more" v-on:click="changeQuanty('add')"><span>+</span></button>
				</div>
			</div>
			<div class="restaurant-notes">
				<h4>Notas para este producto</h4>
				<p>El restaurante lo tendra en cuenta cuando lo prepare</p>
				<div class="notes-input">
					<textarea type="text" name="restaurant-notes" placeholder="Sin mayonesa y sin sal." maxlength="100" v-on:beforeinput="funcCountKeys" ></textarea>
					<span id="countKeys">{{ countKeys }}/100</span>
				</div>
			</div>
		</section>
		<section class="send-ask">
			<div>
				<button @click="addProducts">Agregar al pedido ${{ product.costo * countUnitys }}</button>
			</div>
		</section>
	</div>
</template>

<script>
	import UserNav from '@/components/USERnav.vue'
	export default{
		name: 'Plato',
		data(){
			let countUnitys = 1
			let countKeys = 0
			let palabraSeparada = ""
			let product = {}
			let directionResto = ""
			let productsInTheCart = []
			return{countUnitys, countKeys, palabraSeparada, product, productsInTheCart, directionResto}
		},
		components:{
			UserNav
		},
		methods:{
			completePage: function(){
				var nav = document.querySelector("nav")
				var marginTopPx = (parseInt(nav.scrollHeight));
				var dishContainer = document.querySelector(".dish-container")
				dishContainer.style.marginTop = `${marginTopPx}px`

				
				this.palabraSeparada = this.$route.params.id.split('--')
				firebase.database().ref(`restaurantes/${this.palabraSeparada[0]}`).on('value', (sampshot)=>{
    				var restoArray = Object.values(sampshot.val())	
    				restoArray.forEach((e)=>{
    					if (e.dir != null && e.dir != undefined) {
    						this.directionResto = e.dir
    					}
    					if (e.nombre === this.palabraSeparada[1]) {
    						this.product = e;
    					}
    				})				
    				console.log(this.directionResto)
 				})					
			},
			changeQuanty: function(e){
				if (e === 'add') {
					this.countUnitys++
				} else if(e === 'subtract'){
					if (this.countUnitys != 1) {
						this.countUnitys--
					}
				}
			},
			funcCountKeys: function(){
				let input = event.target
				window.setTimeout(e=>{
					this.countKeys = input.value.split('').length
				}, 5)
				
			},
			verifyProducts: function(){
				JSON.parse(localStorage.getItem('miBarrio')) == null ? localStorage.setItem('miBarrio', JSON.stringify([])) : 
				JSON.parse(localStorage.getItem('miBarrio')).forEach(item =>{
					if (item != '-') {
						this.productsInTheCart.push(item)
					}
				});
			},
			addProducts: function(){
				var textArea = document.querySelector("textarea[name='restaurant-notes']")
				let productChosen = {

					restaurantName: this.palabraSeparada[0], 
					productName: this.product.nombre,
	 				productPrice: this.product.costo, 
					productImg: this.product.img,
					productQuantity : this.countUnitys,
					userNotes: textArea.value,
					restaurantDirection: this.directionResto

				}
				if (this.productsInTheCart.length === 0) {
					this.productsInTheCart.push(productChosen)
				} else{
					var repite = 'no';
					this.productsInTheCart.forEach(product => {
						if (product.restaurantName == productChosen.restaurantName && product.productName == productChosen.productName) {
							repite = 'si'
						}
					})
					if (repite == 'no') {
						this.productsInTheCart.push(productChosen)
				}
					}
				localStorage.setItem('miBarrio', JSON.stringify(this.productsInTheCart))
				window.history.back()
				console.log(this.productsInTheCart)
			}
		},
		mounted(){
			this.completePage()
			this.verifyProducts()
		}
	}
</script>
<style>
	.send-ask{
		border-top: 1px solid #bbb;
	    position: fixed;
	    padding: 2%;
	    background: linear-gradient(to bottom, #eee, transparent);
	    width: 100%;
	}
	@media screen and (min-width: 850px){

		.dish-container {
		    margin-top: 10%;
		    height: 75vh;
		    overflow-y: auto;
		    display: flex;
    		flex-wrap: wrap;
		}
		.dish-photo {
		    width: 50%;
		    height: 45vh;
		    background: #f4d4d4;
		}
		.dish-body{
			width: 50%;
		    display: flex;
		    justify-content: center;
		    flex-direction: column;
		    align-items: center;
		    background: linear-gradient(335deg, #ff9c9c, transparent);
		}
		.dish-body h3{
			margin: 2% 0;
		    font-size: 1.9em;
		    text-align: center;
		    margin-top: 5%;
		    padding-bottom: 3%;
		    margin-bottom: 0;
		}
		.dish-body p{
			font-size: 2em;
		    font-weight: 500;
		    padding-left: 5%;
		    margin: 0;
		    padding-bottom: 3%;
		    margin-bottom: 4%;
		    color: #555;
		}
		.unity{
			display: flex;
		    place-content: stretch space-between;
		    outline: 1px solid #999;
		    padding: 0 5%;
		    align-items: center;
		    width: 50%;
		    margin: auto;
		    margin-right: 0;
		    outline: 0;
		    padding-top: 2%;
		    padding-bottom: 2%;
		}
		.unity h5{
			font-size: 1.5em;
		}
		.restaurant-notes{
			display: flex;
		    justify-content: center;
		    align-items: center;
		    border-top: 1px solid #aaa;
		    width: 100%;
		    margin-bottom: 10%;
		}
		.restaurant-notes h4{
			font-size: 1.5em;
		    padding-left: 5%;
		    margin-top: 0;
		    margin-bottom: 0;
		}
		.send-ask div button {
		    border: none;
		    background: linear-gradient(to bottom, #f90050, #cf0043);
		    color: #fff;
		    border-radius: 15px;
		    font-weight: 700;
		    outline: 2px solid #555;
		    height: 70px;
		    width: 30%;
		    margin: auto;
		    font-size: 1.4em;
		}
		.send-ask div {
		    display: flex;
		    margin: 5% 0%;
		    align-items: center;
		    margin-top: -5%;
		}
	}


</style>