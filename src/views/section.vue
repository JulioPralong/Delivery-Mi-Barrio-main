<template>
	<div>
		<header>
			<UserNav :page=$route.params.id login='true' clas="header-navegator"></UserNav>
		</header>
		<section class="section-container d-flex sectionContainer">
			<SectionItem v-for="(resto, index) in arrayComplete"
			:restoArray= resto
			></SectionItem>
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
			return {arrayComplete}
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
   							for (var i = 2; i < e.length; i++) {
   								if (e[i].categoria === this.$route.params.id){
   									restoItem.push(e[i])
   									contain = true;
   								}
   							}
   							if (contain) {
   								this.arrayComplete.push(restoItem)
   							}
   						})
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
	.sectionContainer{
		flex-direction: column;
	}
	@media screen and (min-width: 850px){

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