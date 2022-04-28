<template>
<div>
	<div class="acept-div" v-if="noChoice && !finalized">
		<button class="reject" @click="reject">Rechazar</button>
		<button class="acept" @click="acept">Aceptar</button>
	</div>
	<div class="acept-div" v-if="acepted && !finalized">
		<button class="acept">Aceptado</button>	
	</div>
	<div class="acept-div" v-if="finalized">
		<button class="acept">Entregado</button>	
	</div>
</div>
</template>
<script>
	export default{
		name: 'PartnerAceptReject',
		data(){
			let noChoice = true
			let acepted = false
			let finalized = false
			return{ noChoice, acepted, finalized }
		},
		props:['reject', 'ask'],
		methods:{
			acept: function(){
				var askDuplicate = this.ask
				askDuplicate.estado = "Buscando repartidores"
				askDuplicate.aceptado = true


				firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).set(askDuplicate)

				this.acepted = true
				this.noChoice = false
			},
			isAcept: function(){
				window.setTimeout(e=>{
					firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).on('value', (sampshot)=>{
	    				if (sampshot.val().aceptado === true && sampshot.val().aceptado != null) {
							this.acepted = true
							this.noChoice = false    				
	    				}
	    				if (sampshot.val().estado === "Entregado" || sampshot.val().estado === "Retirado del local, en camino") {
	    					this.finalized = true
	    				}
	    			})				
				}, 10)

			}
		},
		mounted(){
			this.isAcept()
		}
		
	}
</script>