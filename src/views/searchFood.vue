<template>
	<div>
		<header>
			<UserNav page="Búsqueda" login='true' clas="header-navegator"></UserNav>
		</header>
		<h1 class="tittle-search-page">"{{ $route.params.id }}"</h1>
		<section class="d-flex sectionContainer">
			<SectionItem v-for="(resto, index) in arrayComplete"
			:restoArray= resto
			></SectionItem>
			<div class="div-noResults" v-if="noResults">
				<h1>No se encontraron resultados para <b>{{ $route.params.id }}</b></h1>
			</div>
		</section>	
		<Cart/>
	</div>
</template>

<script>
	import UserNav from '@/components/USERnav.vue'
	import SectionItem from '@/components/sectionItem.vue'
	import Cart from '@/components/cart.vue'
	export default{
		name: 'Section',
		data(){
			let arrayComplete = []
			let noResults = false
			return {arrayComplete, noResults}
		},
		components:{
			SectionItem, UserNav, Cart
		},
		methods:{
			completeArray: function(){
				firebase.database().ref('restaurantes').on('value', (sampshot)=>{	
   					var allRestos = Object.values(sampshot.val())
   					if (this.$route.params.id === "Restaurantes") {
   						this.arrayComplete = allRestos
   					}
   					else {
   						allRestos.forEach((e)=>{
   							var contain = false;
   							var restoItem = [e[0], e[1]]
   							for (var i = 0; i < e.length; i++) {
   								if (e[i].nombre != undefined && e[i].nombre != null) {
   								var nameFood = e[i].nombre.toUpperCase()
   								if (this.$route.params.id.toUpperCase().includes("HAMBURGUESA"))
   									{
   									if (nameFood.includes(this.$route.params.id.toUpperCase()) || nameFood.includes("BURGUER")){
	   									restoItem.push(e[i])
	   									contain = true;
   									}	
   								}
   								
   								if (nameFood.includes(this.$route.params.id.toUpperCase())){
   									restoItem.push(e[i])
   									contain = true;
   								}
   								}
   								
   							}
   							if (contain) {
   								this.arrayComplete.push(restoItem)
   							}
   						})
   						if (this.arrayComplete.length === 0) { this.noResults = true }
   					}			
  				})	
			}
		},
		mounted(){
			this.completeArray()
		}
	}
</script>
<style>
	.tittle-search-page{
		margin-top: 30%;
	    text-align: center;
	    margin-bottom: 10%;
	    font-size: 2.5em;
	}
	.div-noResults{
		width: 80%;
	    outline: 1px solid;
	    margin: auto;
	    padding: 5%;
	    border-radius: 50px;
	    background-color: #fff;
	    text-align: center;
	    box-shadow: 3px 5px 12px 0px;
	}
	.div-noResults h1{
		font-size: 2em
	}
	.sectionContainer{
		flex-direction: column;
	}
	@media screen and (min-width: 850px){
		.tittle-search-page{
			margin-top: 10%;
		}
		.section-item{
			width: 50%;
		}
		.sectionContainer{
			flex-direction: row;
			flex-wrap: wrap;
			margin-top: 10%;
		}
		.food-select-body::-webkit-scrollbar, .recomendations-body::-webkit-scrollbar, .down-options::-webkit-scrollbar, body::-webkit-scrollbar{
			display: block;
		}
		.food-select-body::-webkit-scrollbar-thumb, .recomendations-body::-webkit-scrollbar-thumb, .down-options::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb{
			background-color: #ff00003d;
			border-radius: 30px;
		}	
	}
</style>