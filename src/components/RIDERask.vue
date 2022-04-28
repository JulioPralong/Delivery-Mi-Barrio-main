<template>
	<article class="disponible-ask-container" @click="goToAsk">
		<div class="disponible-ask-header">
			<h2>{{ask.restaurant}}</h2>
			<div class="icon arrowAsk"></div>
		</div>
		<div class="disponible-ask-body mt-3">
			<div class="directions-ask">
				<div>
					<h4>Retiro</h4>
					<p>{{ask.partnerDir}}</p>
				</div>
				<div>
					<h4>Entrega</h4>
					<p>{{ask.direction}}</p>
				</div>
			</div>			
		</div>
	</article>
</template>
<script>
	export default{
		name: 'RiderAsk',
		props:['ask'],
		methods:{
			goToAsk: function(){
				this.$router.push({name: 'RiderAskInfo', params: { id: this.ask.askID}})
			}
		}
	}
</script>