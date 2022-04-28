<template>
	<article class="disponible-ask-container" @click="goToAsk">
		<div class="disponible-ask-header">
			<h2>Mc Poland</h2>
			<div class="icon arrowAsk"></div>
		</div>
		<div class="disponible-ask-body mt-3">
			<div class="directions-ask">
				<div>
					<h4>Retiro</h4>
					<p>Avellaneda 33</p>
				</div>
				<div>
					<h4>Entrega</h4>
					<p>Directorio 1050</p>
				</div>
			</div>			
		</div>
	</article>
</template>
<script>
	export default{
		name: 'AsksHistory',
		methods:{
			goToAsk: function(){
				this.$router.push({name: 'RiderAskInfo'})
			}
		}
	}
</script>