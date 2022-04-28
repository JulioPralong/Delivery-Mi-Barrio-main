<template>
<div>
	<header>
		<PartnerNav tittle="Productos"/>
	</header>
	<section class="body-restaurant section-container">
		<section class="restaurantFood">
			<itemEdit v-for="(foodItem, index) in food" :key="index"
				:product= foodItem 
				:resto= restoObject
				:refresh= completePage
			/>
		</section>
		<section class="restaurantDrinks" v-if="drinks.length != 0">
			<h2>Bebidas</h2>
			<itemEdit v-for="(drinkItem, index) in drinks" :key="index"
				:product= drinkItem 
				:resto= restoObject
				:refresh= completePage
			/>
		</section>
		<article class="more d-flex">
			<button class="button-more-products" @click="showMoreProducts = true"></button>
		</article>
	</section>
	<MoreProducts
		:show= showMoreProducts
		:hide= hideMoreProducts
		:resto= restoObject
		:refresh= completePage
	/>
</div>
</template>
<script>
	import PartnerNav from '@/components/PARTNERnav.vue'
	import itemEdit from '@/components/PARTNERItemsEdit.vue'
	import MoreProducts from '@/components/moreProducts.vue'
	export default{
		name: 'PartnerIndex',
		components:{
			PartnerNav, itemEdit, MoreProducts
		},
		data(){
			let food = []
			let drinks = []
			let showMoreProducts = false
			let restoObject = {}
			let user = ""
			let isRestaurant = false;
			return { food, drinks, showMoreProducts, restoObject, user }
		},
		methods:{
			completePage: function(displayName){
		      firebase.database().ref(`restaurantes/${displayName}`).on('value', (sampshot)=>{
		        let restaurant = Object.values(sampshot.val())
		        this.restoObject = sampshot.val()
		        this.food = []
		        this.drinks = []
		        restaurant.forEach((e)=>{
		          if (e.categoria != "Bebidas" && e.categoria != null) {
		            this.food.push(e)
		          } else if (e.categoria === "Bebidas") {
		            this.drinks.push(e)
		          }
		        })
		    })
		    console.log(this.user)
		    },
		    hideMoreProducts: function(){
		    	let modalMoreProducts = document.querySelector(".modal-more-products")
		    	modalMoreProducts.style.animation = "closeCart .5s"
		    	window.setTimeout(e=>{
					this.showMoreProducts = false
				}, 400)
		    },
		    isLogin: function(){
		    	firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						firebase.database().ref(`USERSrestaurantes`).on('value', (sampshot)=>{
    						var restoArray = sampshot.val()
    						var isLoged = false;
    						restoArray.forEach((e)=>{
    							if (e.mail.toLowerCase() === firebaseUser.email) {
    								this.user = firebaseUser
					    			this.isLogin = true;
					    			isLoged = true;
					    			var displayName = firebaseUser.displayName.split(' ').join('')
					    			this.completePage(displayName)
    							}
    						})
    						if (!isLoged) {
    							this.$router.push('/PartnerLogin')
    						}
    					})
					    
					} else{
						this.$router.push('/PartnerLogin')
					}
				});
		    }
		},
		mounted(){
			this.isLogin()
		}
	}
</script>
<style>
	.restaurantDrinks h2{
		font-size: 1.7em;
	    padding-left: 5%;
	    padding-bottom: 3%;
	    padding-top: 2%;
	    border-top: 1px solid #ccc;
	}
	@media screen and (min-width: 850px){
	.article-product-container{
		width: 40vw;
    	margin: auto;
	}
	.article-product{
		width: 100%;
    	height: 10vw;
	}
	.restaurantFood{
		display: flex;
    	flex-wrap: wrap;
    	justify-content: center;
	}
	.restaurantDrinks{
		display: flex;
	    justify-content: center;
	    flex-direction: column;
	    align-items: center;
	}
	.restaurantDrinks h2 {
	    font-size: 1.7em;
	    padding-left: 5%;
	    padding-bottom: 3%;
	    padding-top: 2%;
	    font-size: 2.1em;
	    border-top: 1px solid #ccc;
	    padding-left: 0;
	}
	.section-container{
		margin-top: 8%;
	}
	.modal-more-products, .edit-modal{
		width: 30%;
    	left: 35%;
	}
	.modal-more-products::-webkit-scrollbar{
		display: none;
	}
	}
	
</style>