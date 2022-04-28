<template>
	<div id="accordionExample" class="accordion" style="">
		<div class="accordion-item">
			<h2 :id="[`heading`]" class="accordion-header">
				<button type="button" data-bs-toggle="collapse" :data-bs-target="[`#collapse`]" aria-expanded="false" :aria-controls="[`collapse`]" class="accordion-button collapsed">
					<h1>Medio de pago</h1>
				</button>
			</h2>
			<div :id="[`collapse`]" :aria-labelledby="[`heading`]" data-bs-parent="#accordionExample" class="accordion-collapse collapse">
				<div class="accordion-body" v-if="ask.method === 'method-cash'">
					<h4>Efectivo</h4>
					<p>Cobrar ${{ ask.riderDbt + 110 }}</p>
				</div>
				<div class="accordion-body" v-if="ask.method === 'method-mp'">
					<h4>Tarjeta</h4>
					<p>No cobrar</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'RiderPayType',
		props: ['ask']
	}
</script>
<style scoped>
	#accordionExample{
		flex-direction: column;
    	background: transparent;
	}
	.accordion-item{
		flex-direction: column;
	    border: none;
	    background: transparent;
	    width: 100%;
	}
	.accordion-item h2{
		width: 100%;
	}
	.accordion-item button{
		background: transparent;
		box-shadow: none;
	}
	.accordion-item button h1{
		text-align: center;
    	width: 100%;
	}
	.accordion-body{
	    background: #c9c9c999;
	    padding-top: 4%;
	    align-items: center;
	    padding-bottom: 5%;
	    width: 100%;
	}
	.accordion-body h4{
		flex: 1;
		margin: 0;
	}
	.accordion-body p{
		border-left: 1px solid #555;
    	flex: 1;
    	margin: 0;
	}
</style>