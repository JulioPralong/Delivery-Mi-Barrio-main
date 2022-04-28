<template>
	<div >
		<header>
			<PartnerNav tittle="Historial"/>
		</header>
		<section class="d-flex flex-column section-container">
			<PartnerAsk v-for="(askItem, index) in asks" :key="index"
			:refresh= refresh
			:ask= askItem
			/>
			<article class="article-ask-business mt-4" v-if="asks.length === 0">
				<h2>No hay pedidos para mostrar</h2>
			</article>
		</section>
	</div>
</template>
<script>
	import PartnerNav from '@/components/PARTNERnav.vue'
	import PartnerAsk from '@/components/PARTNERask.vue'
	export default{
		name: 'PartnerHistory',
		components:{
			PartnerNav, PartnerAsk
		},
		data(){
			let noAskToShow = false
			let asks = []
			return { noAskToShow, asks }
		},
		methods:{
			refresh: function(){
				firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
					this.user = firebaseUser
					firebase.database().ref(`pedidos`).on('value', (sampshot)=>{
						let pedidos = []
	    				Object.values(sampshot.val()).forEach((e)=>{
    					Object.values(e).forEach((y)=>{
    						if (y.restaurant === firebaseUser.displayName.split(' ').join('') && (y.estado === "Retirado del local, en camino" || y.estado === "Entregado") && y.estado != "Rechazado por el local") {
    							pedidos.push(y)
    						}
    					})
	    				})		    			
	    				var numbers = []
	    				if ( pedidos.length != 0) {
	    					for (;;) {
		    					var numberRandom = parseInt(Math.random()*100)
		    					if (!numbers.includes(numberRandom)) {
		    						numbers.push(numberRandom)
		    					}
		    					if (parseInt(pedidos.length*3) === numbers.length) {
		    						break
		    					}
		    				}
	    				}
	    				
	    				for (var i = 0; i < pedidos.length; i++) {
	    					var numObject = {
	    						tittle: numbers[i],
	    						notes: ""
	    					}
	    					pedidos[i].numObject = numObject
	    				}
	    				var item = 0
	    				for (var i = pedidos.length; i < numbers.length*3; i++) {
	    					item++
	    					if (pedidos[item] === undefined || pedidos[item] === null) {
	    						break
	    					} else{
	    						pedidos[item].numObject.notes = numbers[i]
	    					}
	    					
	    				}
	    				this.asks = pedidos

	    			})
					}
				})	
			},
			isLogin: function(){
		    	firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						firebase.database().ref(`USERSrestaurantes`).on('value', (sampshot)=>{
    						var restoArray = sampshot.val()
    						var isLoged = false;
    						restoArray.forEach((e)=>{
    							if (e.mail.toLowerCase() === firebaseUser.email) {
    								this.user = firebaseUser
					    			this.isLogin = true;
					    			isLoged = true;
    							}
    						})
    						if (!isLoged) {
    							this.$router.push('/PartnerLogin')
    						}
    					})
					    
					} else{
						this.$router.push('/PartnerLogin')
					}
				});
		    }
		},
		mounted(){
			this.isLogin()
			this.refresh()
		}
	}
</script>