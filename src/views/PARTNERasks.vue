<template>
	<div >
		<header>
			<PartnerNav tittle="Pedidos"/>
		</header>
		<section class="d-flex sectionContainer section-container">
			<PartnerAsk v-for="(askItem, index) in asks" :key="index"
			:refresh= refreshPage
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
		name: 'PartnerAsks',
		components:{
			PartnerNav, PartnerAsk
		},
		data(){
			let isReject = false
			let noAskToShow = false
			let user = {}
			let asks = []
			return { isReject, noAskToShow, user, asks }
		},
		methods:{
			refreshPage: function(){
				let sectionContainer = document.querySelector("section")
				window.setTimeout(e=>{
					if (sectionContainer.children.length === 0) {
					this.noAskToShow = true
				}
				}, 10)
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
		    },
		    returnAsks: function(){
				firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
					this.user = firebaseUser
					firebase.database().ref(`pedidos`).on('value', (sampshot)=>{
						let pedidos = []
						if (sampshot.val() != null && sampshot.val() != undefined) {
						Object.values(sampshot.val()).forEach((e)=>{
    					Object.values(e).forEach((y)=>{
    						if (y.restaurant === firebaseUser.displayName.split(' ').join('') && y.estado!= "Retirado del local, en camino" && y.estado != "Entregado" && y.estado != "Rechazado por el local") {
    							pedidos.push(y)
    						}
    					})
	    				})		
						}
	    					    			
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
	    				console.log(pedidos)
	    				this.asks = pedidos

	    			})
					}
				})	
			}
		},
		mounted(){
			this.isLogin()
			this.returnAsks()
		}
	}
</script>