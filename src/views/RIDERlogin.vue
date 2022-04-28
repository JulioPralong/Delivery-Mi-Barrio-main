<template>
	<div>
		<nav class="navbar navbar-light fixed-top">
			<div class="container-fluid"><div class="w-100 d-flex"><h2 style="padding: 0;" class="navbar-brand">Mi barrio</h2></div></div>
		</nav>
		<section class="login-container">
			<h1>Ingreso Repartidores</h1>
			<div class="form-floating mb-3 mt-3">
				<input name="email" type="email" id="floatingInput" placeholder="name@example.com" class="form-control">
				<label for="floatingInput">Correo Electronico</label>
			</div>
			<div class="form-floating">
				<input name="password" type="password" id="floatingPassword" placeholder="Password" class="form-control">
				<label for="floatingPassword">Contraseña</label>
			</div>
			<button class="login-button mb-4" @click="loginMail">Ingresar</button>
		</section>
		<ErrorMessage v-if="showError"
		:message="messageError"
		:close= quitError
		/>	
	</div>
</template>
<script>
	import ErrorMessage from '@/components/errorMessage.vue'
	export default{
		name: 'LoginRider',
		data(){
			let messageError = ""
			let showError = false
			return { messageError, showError }
		},
		components:{
			ErrorMessage
		},
		methods:{
			loginMail: function(){
		    	var inputMail = document.querySelector('input[name="email"]')
			    var inputPassword = document.querySelector('input[name="password"]')
			    

			    var mail = inputMail.value;
			    var password = inputPassword.value;

			    firebase.database().ref(`USERSriders`).on('value', (sampshot)=>{
    				var restoArray = sampshot.val()
    				restoArray.forEach((e)=>{
    					if (e.mail === mail) {
    						console.log("se encontro el mail")
    						firebase.auth().signInWithEmailAndPassword(mail, password)
							    .then((userCredential) => {
							      var user = userCredential.user;
							        inputMail.value = ""
							        inputPassword.value = ""
							        this.$router.push('/RiderIndex')
							      })
							    .catch((error) => {
							    this.messageError = "Usuario o contraseña incorrectos"
    							this.showError = true
							      var errorCode = error.code;
							      var errorMessage = error.message;
							});
    					} else{
    						window.setTimeout(e=>{
    							this.messageError = "Usuario o contraseña incorrectos"
    							this.showError = true
    						}, 1000)
    					}
    				})			
 				})		
		
		    },
		    quitError: function(){
		    	this.showError = false;
		    }
		}
		
	}
</script>
<style scoped>
	.login-container h1{
		line-height: 1.4em;
	}
	nav{
		background-color: #fefefe
	}
</style>