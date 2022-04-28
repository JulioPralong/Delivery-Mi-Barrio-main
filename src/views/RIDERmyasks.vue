<template>
	<div>
		<header>
			<RiderNav tittle="Mis pedidos"/>
		</header>
		<section class="rider-index">
			<RiderAsk v-for="(askItem, index) in asks" :key="index"
			:ask= askItem
			/>
			<div class="div-noResults" v-if="asks.length === 0">
				<h1>No tiene ningun pedido en curso</h1>
			</div>
		</section>
	</div>
</template>
<script>
	import RiderNav from '@/components/RIDERnav'
	import RiderAsk from '@/components/RIDERask.vue'
	export default{
		name: 'RiderMyAsks',
		components:{
			RiderNav, RiderAsk
		},
		data(){
			let users = {}
			let asks = []
			return{ users, asks }
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
		    showAsk: function(){
		    	firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
					this.user = firebaseUser
					this.asks.length = 0
					firebase.database().ref(`pedidos`).on('value', (sampshot)=>{
	    				Object.values(sampshot.val()).forEach((e)=>{
    					Object.values(e).forEach((y)=>{
    						if (y.riderID === firebaseUser.uid && y.estado != "Entregado") {
    							this.asks.push(y)
    						}
    					})
	    				})
	    			})
	    			}
	    		})
		    }
		},
		mounted(){
			this.isLogin()
			this.showAsk()
		}
	}
</script>