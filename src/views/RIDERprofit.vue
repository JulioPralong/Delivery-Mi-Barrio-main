<template>
	<div>
		<header>
			<RiderNav tittle="Ganancias"/>
		</header>
		<section class="ask-header">
			<button id="inProcess" :class="[classActual]" v-on:click="changeSection('actual')"><h3>Deudas</h3></button>
			<button id="ended" :class="[classOld]" v-on:click="changeSection('old')"><h3>Ganancias</h3></button>
		</section>
		<section class="rider-profit">
			<article class="proffit" v-if="classOld === 'ask-checked'">
				<h1>Ganancias de este mes</h1>
				<h3>${{ proffit }}</h3>
			</article>
			<article class="proffit" v-if="classOld === ''">
				<h1>Deudas de este mes</h1>
				<h3>${{ dbt }}</h3>
			</article>
		</section>
	</div>
</template>
<script>
	import RiderNav from '@/components/RIDERnav'
	export default{
		name: 'RiderProfit',
		components:{
			RiderNav
		},
		data(){
			let users = {}
			let proffit = 0
			let dbt = 0
			let classOld = "ask-checked";
			let classActual = "";
			return{ users, proffit, dbt, classOld, classActual }
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
					this.proffit = 0
					this.dbt = 0
					var proffitCount = 0
					var dbtCount = 0 
					let actualMonth = ((new Date).getMonth() + 1)
					firebase.database().ref(`pedidos`).on('value', (sampshot)=>{
	    				Object.values(sampshot.val()).forEach((e)=>{
    					Object.values(e).forEach((y)=>{
    						var conditionTwo = (y.estado === "Entregado" || y.estado === "Retirado del local, en camino")
    						if (y.riderID === firebaseUser.uid && conditionTwo && actualMonth === y.monthAsk) {
    							dbtCount += y.riderDbt
    						}
    						if (y.riderID === firebaseUser.uid && y.estado === "Entregado" && actualMonth === y.monthAsk) {
    							proffitCount += 110
    						}
    					})
	    				})
	    				this.dbt = dbtCount
	    				this.proffit = proffitCount
	    			})
	    			}
	    		})
		    },
		    changeSection: function(e){
				this.state = e;
				if (e === 'old') {
					this.classOld = "ask-checked"
					this.classActual = ""
				} else if (e === 'actual') {
					this.classOld = ""
					this.classActual = "ask-checked"
				}
			}
		},
		mounted(){
			this.isLogin()
			this.showAsk()
		}
	}
</script>
<style scoped>
	.ask-header{
		margin-top: 25%;
	}
	.rider-profit{
		margin-top: 10%;
	}
	@media screen and (min-width: 850px){
		.ask-header{
			width: 45%;
		    margin-top: 8%;
		    margin-bottom: 0;
		}
		.rider-profit{
			height: 50vh;
		    outline: 1px solid;
		    width: 30%;
		    margin: auto;
		    border-radius: 50px;
		    display: flex;
		    flex-direction: column;
		    box-shadow: 1px 1px 5px;
		    justify-content: center;
		    background: #ededed;
		    margin-top: 5%;
		    padding: 0 5%;
		}
	}
</style>