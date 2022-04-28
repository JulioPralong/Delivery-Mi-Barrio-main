<template>
<div>
	<header>
		<UserNav page="Trabaja con nosotros" login='true' clas="header-navegator"></UserNav>
	</header>
	<section class="ask-header">
		<button id="inProcess" :class="[classActual]" v-on:click="changeSection('actual')"><h3>Repartidores</h3></button>
		<button id="ended" :class="[classOld]" v-on:click="changeSection('old')"><h3>Restaurantes</h3></button>
	</section>
	<form if="form" class="login-container" @submit="sendMail" v-if="classOld === 'ask-checked'">
		<h1>Registro Restaurantes</h1>
		<div class="form-floating mb-3 mt-3">
	    <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required="required">
	    <label for="floatingInput">Correo Electronico</label>
	  </div>
	  <div class="form-floating">
	    <input name="NombreNegocio" type="text" class="form-control" id="floatingPassword" placeholder="Nombre negocio" required="required">
	    <label for="floatingPassword">Nombre del negocio</label>
	  </div>
	  <div class="form-floating mt-3">
	    <input name="name" type="text" class="form-control" id="floatingName" placeholder="Inserte su nombre aquí" required="required">
	    <label for="floatingPassword">Nombre responsable del negocio</label>
	  </div>
	  <input type="submit" class="login-button mb-4" id="sendRegistrerData">
	</form>
	<form if="form" class="login-container" @submit="sendMailRider" v-if="classActual === 'ask-checked'">
		<h1>Registro Repartidores</h1>
		<div class="form-floating mb-3 mt-3">
	    <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required="required">
	    <label for="floatingInput">Correo Electronico</label>
	  </div>
	  <div class="form-floating mt-3">
	    <input name="name" type="text" class="form-control" id="floatingName" placeholder="Inserte su nombre aquí" required="required">
	    <label for="floatingPassword">Nombre del repartidor</label>
	  </div>
	  <input type="submit" class="login-button mb-4" id="sendRegistrerData">
	</form>
	<div class="loading-container" v-if="showLoading">
		<div class="lds-dual-ring"></div>
	</div>
	

	<section class="thanks-registrer" id="thanks-registrer-container" v-show="showModal">
	  <h1>¡Muchas gracias!</h1>
	  <p>Ha enviado los datos con éxito, en su casilla de mail se le enviará la documentacion para completar el registro.<br> En caso de no encontrar el mail verifique en pestaña de spam</p>
	</section>

</div>
</template>

<script>
	import UserNav from '../components/USERnav.vue'
	export default{
		name: 'RegistroNegocio',
		components: {
			UserNav
		},
		data(){
			let classOld = "ask-checked";
			let classActual = "";
			let showLoading = false
			return{
				showModal: false, classOld, classActual, showLoading
			}
		},
		methods:{
			sendDataModal: function(){
				let container = document.querySelector("#thanks-registrer-container")
				this.showModal = true 
				window.setTimeout(e=>{
					container.style.animation = "hide 1s"
				}, 5000)
				window.setTimeout(e=>{
					this.showModal = false;
					container.style.animation = ""
				}, 5800)
			},
			sendMail: function(){
				const alert = this.sendDataModal
				const quitLoading = this.quitLoading
				this.showLoading = true

					event.preventDefault();

				   const serviceID = 'default_service';
				   const templateID = 'template_x9b4wwu';
				   
					var inputMail = document.querySelector("input[name='email']")
					var inputName = document.querySelector("input[name='name']")
					var inputNameLocal = document.querySelector("input[name='NombreNegocio']")
					
				   emailjs.send(serviceID, templateID, {"email": inputMail.value, "name": inputName.value, "local": inputNameLocal.value})
    				.then(function(response) {
	    				  	inputMail.value = ""
							inputName.value = ""
							inputNameLocal.value = ""
							quitLoading()
							alert()
					}, function(error) {
	     				  quitLoading()
	    			});
			},
			sendMailRider: function(){
				const alert = this.sendDataModal
				const quitLoading = this.quitLoading
				this.showLoading = true

					event.preventDefault();

				   const serviceID = 'default_service';
				   const templateID = 'template_u364r07';
				   
					var inputMail = document.querySelector("input[name='email']")
					var inputName = document.querySelector("input[name='name']")

				   emailjs.send(serviceID, templateID, {"email": inputMail.value, "name": inputName.value})
    				.then(function(response) {
	    				  	inputMail.value = ""
							inputName.value = ""
							quitLoading()
							alert()
					}, function(error) {
	     				  quitLoading()
	    			});
			},
			quitLoading: function(){
				this.showLoading = false
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
		}
	}
</script>

<style>
	.ask-header{
		margin-top: 25%
	}
	.login-container{
		margin-top: 0
	}
	.lds-dual-ring {
	  display: inline-block;
      width: 100px;
      height: 100px;
	}
	.lds-dual-ring:after {
	  	content: " ";
	    display: block;
	    width: 100px;
	    height: 100px;
	    margin: 8px;
	    border-radius: 50%;
	    border: 6px solid #fff;
	    border-color: #f00 transparent #f00 transparent;
	    -webkit-animation: lds-dual-ring 1.2s linear infinite;
	    animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
	.loading-container{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    top: 0;
	}
	@media screen and (min-width: 850px){

		.ask-header {
		    display: flex;
		    height: 67px;
		    outline: 1px solid #00000047;
		    border-radius: 30px;
		    width: 40%;
		    margin: auto;
		    margin-bottom: 5%;
		    margin-top: 10%;
		}
		.login-container {
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    width: 35%;
		    margin: auto;
		    background: #eee;
		    border-radius: 50px;
		    height: -webkit-fit-content;
		    height: -moz-fit-content;
		    height: fit-content;
		    outline: 1px solid #666;
		    margin-bottom: 5%;
		}
		.thanks-registrer{
			width: 30%;
			left: 35%;
		}
	}

</style>