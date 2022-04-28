<template>
	<article class="article-ask-business mt-4" v-if="!isReject">
		<div id="accordionExample" class="accordion" style="">


			<div class="accordion-item">
				<h2 :id="[`heading${ask.numObject.tittle}`]" class="accordion-header">
					<button type="button" data-bs-toggle="collapse" :data-bs-target="[`#collapse${ask.numObject.tittle}`]" aria-expanded="false" :aria-controls="[`collapse${ask.numObject.tittle}`]" class="accordion-button collapsed">
						<h1>Pedidos</h1>
					</button>
				</h2>
				<div :id="[`collapse${ask.numObject.tittle}`]" :aria-labelledby="[`heading${ask.numObject.tittle}`]" data-bs-parent="#accordionExample" class="accordion-collapse collapse">
					<div class="accordion-body">
						<h2 v-for="(askName, index) in ask.pedido" :key="index" class="h2-productName">
							{{ askName.productName }} 
							<span class="spanTittle" v-if="askName.productQuantity === 1"> ({{ askName.productQuantity }} unidad)</span>
							<span class="spanTittle" v-else> ({{ askName.productQuantity }} unidades) </span>
						</h2>
					</div>
				</div>
			</div>


			<div class="accordion-item" v-if="notes.length != 0">
				<h2 :id="[`heading${ask.numObject.notes}`]" class="accordion-header">
					<button type="button" data-bs-toggle="collapse" :data-bs-target="[`#collapse${ask.numObject.notes}`]" aria-expanded="false" :aria-controls="[`collapse${ask.numObject.notes}`]" class="accordion-button collapsed">
						<h3>Notas</h3>
					</button>
				</h2>
				<div :id="[`collapse${ask.numObject.notes}`]" :aria-labelledby="[`heading${ask.numObject.notes}`]" data-bs-parent="#accordionExample" class="accordion-collapse collapse" style="">
					<div class="accordion-body accordion-notes">
						<p v-for="(noteItem, index) in notes" :key="index" class="notes-p"><span class="spanTittle"> {{ noteItem.product }} </span>{{noteItem.note}}</p>
					</div>
				</div>
			</div>
		</div>
		

		<div class="notes-ask-business">
			<p>Repartidor</p>
			<p v-if="ask.riderName != undefined || ask.riderName != null">{{ask.riderName}}</p>
			<p v-else>No aceptado aún</p>

		</div>

		<div class="total-price-ask-business">
			<p>Total</p>
			<p>${{ ask.riderDbt }}</p>
		</div>

		<PartnerAceptReject
		:reject= rejectAsk
		:ask= askObj
		/>
	</article>
</template>
<script>
	import PartnerAceptReject from '@/components/PARTNERAceptReject.vue'
	export default{
		name: 'PartnerAsk',
		components:{
			PartnerAceptReject
		},
		data(){
			let isReject = false
			let notes = []
			let price = 0
			let askObj = {}
			return { isReject, notes, price, askObj}
		},
		props:['refresh', 'ask'],
		methods:{
			rejectAsk: function(){
				var askDuplicate = this.ask
				askDuplicate.estado = "Rechazado por el local"

				firebase.database().ref(`pedidos/${this.ask.clientID}/${this.ask.askID}`).set(askDuplicate)

				this.isReject = true
				this.refresh()
			},
			askItem: function(){
				console.log(this.ask)
			},
			filtrerAndOperations: function(){
				this.price = 0;
				if (this.ask != null && this.ask != undefined) {
					this.ask.pedido.forEach((e)=>{
						if (e.userNotes != null && e.userNotes != undefined && e.userNotes != "") {
							var obj = {
								note: e.userNotes,
								product: e.productName
							}
							this.notes.push(obj)

						}
						this.price += (parseInt(e.productPrice) * parseInt(e.productQuantity))
						this.askObj = this.ask
						console.log(this.ask)
					})	
				}
				
			}
		},
		mounted(){
			this.askItem()
			this.filtrerAndOperations()
		}
	}
</script>
<style scoped>
	.accordion-item{
		background: transparent;
		border: none;
	}
	.accordion-header button{
		text-align: center;
		width: 100%;
		background: transparent;
	}
	.accordion-header button h1{
		text-align: center;
		width: 100%;
		font-size: 2em;
	}
	.accordion-button:focus{
		box-shadow: none;
		border: none;
	}
	.notes-p{
		font-style: italic;
	    border-bottom: 1px solid #777;
	    font-size: 1.3em;
	    padding-bottom: 5%;
	}
	.accordion-button h3{
		width: 100%;
    	font-size: 1.7em;
	} 
	.accordion-body{
		border-top: 1px solid #999;
   		border-bottom: 1px solid #999;
	}
	.accordion-notes{
		padding: 2%;
	}
	.h2-productName{
		border-bottom: 1px solid #555; 
		padding: 6% 0;
	}
	.spanTittle{
		color: #0c63e4;
	}
</style>