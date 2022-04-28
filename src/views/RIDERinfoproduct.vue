<template>
	<div>
		<header>
			<RiderNav tittle="Pedido"/>
		</header>
		<section class="rider-ask-more-info">
			<AskInfo/>
		</section>
	</div>
</template>
<script>
	import RiderNav from '@/components/RIDERnav'
	import AskInfo from '@/components/RIDERaskinfo'
	export default{
		name: 'RiderAskInfo',
		components:{
			RiderNav, AskInfo
		},
		data(){
			let user = {}
			return{ user }
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
		    }
		},
		mounted(){
			this.isLogin()
		}
	}
</script>