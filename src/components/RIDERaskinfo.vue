<template>
	<article class="disponible-ask-container-info">
		<div class="disponible-ask-info-header">
			<h2>{{ ask.restaurant }}</h2>
		</div>
		<div class="disponible-ask-body-info mt-3">
			<div class="directions-ask-info">
				<div class="delivery-directions-info">
					<h4>Retiro</h4>
					<p>{{ ask.partnerDir }}</p>
				</div>
				<div class="delivery-directions-info">
					<h4>Entrega</h4>
					<p>{{ ask.direction }}</p>
				</div>
				<RiderPayType
				:ask= ask
				/>
				</div>
				<div class="proffit-money mb-4">
					<h3>Ganancia $110</h3>
				</div>
			</div>			
		</div>
		<button class="conditionPedido" v-if="state === 'pendingAcept'" @click="changeStatus('acepted')">
			<h2>Aceptar pedido</h2>
		</button>
		<button class="conditionPedido acept" v-else-if="state === 'goingRestaurant'" @click="changeStatus('inRestaurante')">
			<h2>Llegue al local</h2>
		</button>
		<button class="conditionPedido acept" v-else-if="state === 'aceptedNoDelivered'" @click="changeStatus('retiredOfRestaurant')">
			<h2>Retiré del local</h2>
		</button>
		<button class="conditionPedido acept" v-else-if="state === 'isdelivered'" @click="changeStatus('delivered')" >
			<h2>Entregué el pedido</h2>
		</button>
		<button class="conditionPedido acept" v-else-if="state === 'delivered'" >
			<h2>Entregado</h2>
		</button>
	</article>
</template>
<script>
	import RiderPayType from '@/components/riderInfoPay.vue'
	export default{
		name: 'RiderAskInfo',
		data(){
			let state = ""
			let ask = {};
			let user = {}
			return { ask, state, user}
		},
		components:{
			RiderPayType
		},
		methods:{
			changeStatus: function(condition){
				if (condition === "acepted") {
					this.state = "goingRestaurant"
					let askObject = this.ask

					firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						askObject.riderName = firebaseUser.displayName
						askObject.riderID = firebaseUser.uid
						askObject.estado = "Repartidor llegando al restaurante"
						firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).set(askObject)
					}
					})
					
					
					console.log(askObject)
					
					this.completeAsk()

				} else if(condition === "inRestaurante"){
					this.state = 'aceptedNoDelivered'
					let askObject = this.ask
					firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						askObject.estado = "Repartidor esperando en el restaurante"
						askObject.riderName = this.user.displayName
						askObject.riderID = this.user.uid
						firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).set(askObject)
					}
					})

					this.completeAsk()
				} else if(condition === 'retiredOfRestaurant'){
					this.state = 'isdelivered'
					let askObject = this.ask
					firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
					askObject.estado = "Retirado del local, en camino"
					askObject.riderName = this.user.displayName
					askObject.riderID = this.user.uid

					firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).set(askObject)
					}})
					

					this.completeAsk()
				} else if(condition === 'delivered'){
					this.state = 'delivered'
					let askObject = this.ask
					firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
					askObject.estado = "Entregado"
					askObject.riderName = this.user.displayName
					askObject.riderID = this.user.uid

					firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).set(askObject)
					}})
					

					this.completeAsk()

				}
			},
			completeAsk: function(){
				let idAsk = this.$route.params.id
				firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						this.user = firebaseUser
					}
				})
				firebase.database().ref(`pedidos`).on('value', (sampshot)=>{
					let pedidos = []
    				Object.values(sampshot.val()).forEach((e)=>{
					Object.values(e).forEach((y)=>{
						if (y.askID === idAsk) {
							this.ask = y;
							if (y.estado === "Entregado") {
								this.state = 'delivered'
							} else if (y.estado === "Buscando repartidores") {
								this.state = 'pendingAcept'
							} else if (y.estado === "Repartidor llegando al restaurante") {
								this.state = 'goingRestaurant'
							} else if (y.estado === "Repartidor esperando en el restaurante") {
								this.state = 'aceptedNoDelivered'
							} else if (y.estado === "Retirado del local, en camino") {
								this.state = 'isdelivered'
							} else if (y.estado === "Entregado") {
								this.state = 'delivered'
							}
						}
					})
    				})
	    		})
			}
		},
		mounted(){
			this.completeAsk()
		}
	}
</script>
<style scoped>
	.acept{
		animation: 0.2s ease 0s 1 normal none running show;
	}
	.proffit-money{
    	justify-content: center;
	}
	.proffit-money h3{
		font-size: 2.6em;
	}
	.delivery-directions-info:nth-child(1){
		    border-bottom: 1px solid #999;
    		padding-bottom: 2.5%;
	}
	.delivery-directions-info:nth-child(2){
		    padding-top: 2.5%;
		    padding-bottom: 5%;
		    border-bottom: 1px solid #999;
	}
	.delivery-directions-info h4{
		flex: 1;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    margin: 0;
	}
	.delivery-directions-info p{
		flex: 1;
		margin: 0;
	}
		
</style>