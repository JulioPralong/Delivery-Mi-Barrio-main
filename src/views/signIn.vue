<template>
	<div>
		<header>
			<UserNav page="Registrarse" login='false' clas="header-navegator"></UserNav>
		</header>
		<section class="login-container">
			<h1>Registrarse</h1>
			<div class="form-floating mb-3 mt-3">
		    <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
		    <label for="floatingInput">Correo Electronico</label>
		  </div>
		  <div class="form-floating">
		    <input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
		    <label for="floatingPassword">Contraseña</label>
		  </div>
		  <div class="form-floating mt-3">
		    <input name="name" type="text" class="form-control" id="floatingName" placeholder="Inserte su nombre aquí">
		    <label for="floatingPassword">Inserte nombre aquí</label>
		  </div>
		  <button class="login-button" @click="signIn">Registrarse</button>
		  <button class="button-google" @click="logInGoogle" ><span class="google-img"></span><span>Registrarse con Google</span> </button>
		</section>
	</div>
</template>
<script>
	import UserNav from '@/components/USERnav.vue'
	export default{
		name: 'USERlogin',
		methods:{
			logInGoogle: function(){
		      var provider = new firebase.auth.GoogleAuthProvider();
		      provider.addScope('profile');
		      provider.addScope('email');
		      
		      firebase.auth()
		        .signInWithPopup(provider)
		        .then((result) => {
		          var credential = result.credential;
		          var token = credential.accessToken;
		          var user = result.user;
		          this.$router.push('/')
		        }).catch((error) => {
		          var errorCode = error.code;
		          var errorMessage = error.message;
		          var email = error.email;  
		          var credential = error.credential;
		          console.log(errorCode)
		          console.log(email)
		          console.log(errorMessage)
		          console.log(credential)
		        });
		    },
		    signIn: function(){
		    	var inputMail = document.querySelector('input[name="email"]')
			    var inputPassword = document.querySelector('input[name="password"]')
			    var inputName = document.querySelector('input[name="name"]')
			    
			    var mail = inputMail.value;
			    var password = inputPassword.value;
			    var name = inputName.value;

			    firebase.auth().createUserWithEmailAndPassword(mail, password)
			      .then((userCredential) => {
			          userCredential.user.updateProfile({
			          displayName: inputName.value
			        })
			          inputMail.value = ""
			          inputPassword.value = ""
			          this.$router.push('/') 
			      })
			      .catch((error) => {
			        var errorCode = error.code;
			        var errorMessage = error.message;
			        console.log(errorCode)
			        console.log(errorMessage)
			      });
		    }
		},
		components:{
			UserNav
		}
	}
</script>