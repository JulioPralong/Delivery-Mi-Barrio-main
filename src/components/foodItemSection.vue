<template>
	<router-link :to="{name: 'Plato', params: { id: `${restoSeller}--${arrayFood.nombre}`} }" style="display: flex; text-decoration: none; color: #000;">
		<button>
			<div :style="{'background-image': `url(${arrayFood.img})`, 'background-size':'cover', 'background-position': 'center'}"></div>
			<p>{{ arrayFood.nombre }}</p>
			<p class="price">${{ arrayFood.costo }}</p>
			<article class="add-cart-container"><div><span>+</span></div></article>
		</button>
	</router-link>
</template>
<script>
	export default{
		name: 'FoodItem',
		props: ['arrayFood', 'restoSeller']
	}
</script>