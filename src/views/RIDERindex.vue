<template>
	<div>
		<header>
			<RiderNav tittle="Pedidos disponibles"/>
		</header>
		<section class="rider-index">
			<RiderAsk v-for="(askItem, index) in asks" :key="index"
			:ask= askItem
			/>
			<div class="div-noResults" v-if="asks.length === 0">
				<h1>No hay pedidos disponibles</h1>
			</div>
		</section>
	</div>
</template>
<script>
	import RiderNav from '@/components/RIDERnav.vue'
	import RiderAsk from '@/components/RIDERask.vue'
	export default{
		name: 'RiderIndex',
		components:{
			RiderAsk, RiderNav
		},
		data(){
			let user = {}
			let asks = []
			return{ user, asks }
		},
		methods:{
			isLogin: function(){
		    	firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
						firebase.database().ref(`USERSriders`).on('value', (sampshot)=>{
    						var restoArray = sampshot.val()
    						var isLoged = false;
    						restoArray.forEach((e)=>{
    							if (e.mail.toLowerCase() === firebaseUser.email) {
    								this.user = firebaseUser;
					    			isLoged = true;
    							}
    						})
    						if (!isLoged) {
    							this.$router.push('/RiderLogin')
    						}
    					})					    
					} else{
						this.$router.push('/RiderLogin')
					}
				});
		    },
		    showAsks: function(){
				firebase.database().ref(`pedidos`).on('value', (sampshot)=>{
					let pedidos = []
					this.asks.length = 0
    				Object.values(sampshot.val()).forEach((e)=>{
					Object.values(e).forEach((y)=>{
						if (y.aceptado === true && y.estado === "Buscando repartidores") {
							this.asks.push(y)
						}
					})
    				})
    			})
	    		console.log(this.asks)
		    }
		},
		mounted(){
			this.isLogin()
			this.showAsks()
		}
	}
</script>
<style>
@media screen and (min-width: 850px){

.rider-index{
	display: flex;
    flex-wrap: wrap;
    margin-top: 10%;
}

.disponible-ask-container{
	width: 45%;
	cursor: pointer;
}

}
</style>