<template>
	<article class="section-item d-flex flex-column mb-4">
		<router-link :to="{name: 'restaurant', params: { id: `${restoArray[0]}`} }" class="section-tittle-restaurant" style="text-decoration: none; color: #000;">
			<div><div :style="{'background-image': `url(${restoArray[1].banner})`, 'background-size':'cover', 'background-position': 'center'}"></div></div>
			<h2>{{restoArray[0]}}</h2>
		</router-link>
		<div class="section-food-restaurant">
			<article class="recomendations-body marg-left">
				<FoodItem v-for="(resto, index) in restoItem"
				:arrayFood=resto
				:restoSeller=restoSellerName
				></FoodItem>
			</article>
		</div>
	</article>
</template>
<script>
	import FoodItem from '@/components/foodItemSection.vue'
	export default{
		name: 'SectionItem',
		props: ['restoArray'],
		components:{
			FoodItem
		},
		data(){
			let restoItem = []
			let restoSellerName = ""
			return{restoItem, restoSellerName}
		},
		methods: {
			completeRestoItem: function(){
				this.restoArray.forEach((e)=>{
					if (e.img != null) {
						this.restoItem.push(e)
					}
				})
				this.restoSellerName = this.restoArray[0].split(' ').join('')
			}
		},
		mounted(){
			this.completeRestoItem()
		}
	}
</script>