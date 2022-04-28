<template>
	<div>
		<header>
			<UserNav page="Ingresar" login='false' clas="header-navegator"></UserNav>
		</header>
		<section class="login-container">
			<h1>Ingresar</h1>
			<div class="form-floating mb-3 mt-3">
		    <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
		    <label for="floatingInput">Correo Electronico</label>
		  </div>
		  <div class="form-floating">
		    <input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
		    <label for="floatingPassword">Contraseña</label>
		  </div>
		  <button class="login-button" @click="loginMail">Ingresar</button>
		  <button class="button-google" @click="logInGoogle"><span class="google-img" ></span><span>Acceder con Google</span> </button>
		</section>
		<section class="button-sign-in">
		  <router-link to="/signin"><button>Registrarse</button></router-link>
		</section>
		<ErrorMessage v-if="showError"
			:message="messageError"
			:close= quitError
		/>	
	</div>
</template>
<script>
	import UserNav from '@/components/USERnav.vue';
	import { mapMutations, mapState } from 'vuex';
	import ErrorMessage from '@/components/errorMessage.vue'
	export default{
		name: 'USERlogin',
		components:{
			UserNav, ErrorMessage
		},
		computed:{
			...mapState(['user', 'isLogin'])
		},
		data(){
			let messageError = ""
			let showError = false
			return{ messageError, showError }
		},
		methods:{
			...mapMutations(['setUser', 'setIsLogin']),
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
		          firebase.auth().onAuthStateChanged(firebaseUser=>{
					if (firebaseUser) {
					    this.setUser(firebaseUser)
					    this.setIsLogin(true)
					}
					});
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
		    loginMail: function(){
		    	var inputMail = document.querySelector('input[name="email"]')
			    var inputPassword = document.querySelector('input[name="password"]')
			    

			    var mail = inputMail.value;
			    var password = inputPassword.value;

			   	firebase.auth().signInWithEmailAndPassword(mail, password)
			    .then((userCredential) => {
			      var user = userCredential.user;
			        inputMail.value = ""
			        inputPassword.value = ""
			        this.$router.push('/')
			      })
			    .catch((error) => {
			    	this.messageError = "Mail o contraseña incorrectos"
			    	this.showError = true;
			      var errorCode = error.code;
			      var errorMessage = error.message;
			  });
		    },
		    quitError: function(){
		    	this.showError = false;
		    }

		}
	}
</script>