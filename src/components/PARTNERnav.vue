<template>
	<nav class="navbar navbar-light fixed-top">
	  <div class="container-fluid">
	    <h2 class="navbar-brand">{{ tittle }}</h2>
	    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
	      <span class="navbar-toggler-icon"></span>
	    </button>
	    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style="visibility: hidden;" aria-hidden="true">
	      <div class="offcanvas-header">
	        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Mi Barrio</h5>
	        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	      </div>
	      <div class="nav-container-partner">
	      	<ul class="navbar-nav mt-4">
	          <li class="nav-item" @click="goTo('product')">
	           <div class="icon home"></div><a class="nav-link" aria-current="page">Productos</a>
	          </li>
	          <li class="nav-item" @click="goTo('asks')">
	            <div class="icon ask"></div><a class="nav-link">Pedidos</a>
	          </li>
	          <li class="nav-item padding-correction" @click="goTo('history')"> 
	            <div class="icon history"></div><a class="nav-link">Historial</a>
	          </li>
	        </ul>
	        <div data-v-79df3b98="" class="logOutContainer">
	        	<button data-v-79df3b98="" @click="logOut">
	        		<span data-v-79df3b98="">Cerrar Sesión</span>
	        	</button>
	        </div>
	      </div>
	        
	      </div>
	    </div>	  
	</nav>
</template>
<script>
	export default{
		name: 'PartnerNav',
		props: ['tittle'],
		methods:{
			goTo: function(page){
				if (page === "product") {
					this.$router.push({name: 'partnerIndex'})
				} else if(page === "history"){
					this.$router.push({name: 'PartnerHistory'})
				} else if(page === "asks"){
					this.$router.push({name: 'PartnerAsks'})
				}
			},
			overflowSolve: function(){
		      var label = document.querySelector("#offcanvasNavbar")
		      var body = document.querySelector("body")
		      if (label.style.visibility != "visible"){
		        body.style.overflow = "auto"
		      }
		    },
		    logOut: function(){
		      firebase.auth().signOut().then(() => {
		        this.$router.push('/PartnerLogin')
		      }).catch((error) => {
		       console.log(`Ocurrio un error, el error es ${error}`)
		      });
		    }
		},
		mounted(){
			this.overflowSolve()
		}
	}
</script>
<style scoped>
	nav{
		background-color: #ffffffee;
	}
	.offcanvas-header{
		border-bottom: none !important
	}
	.nav-container-partner{
		flex-grow: 1;
	    place-content: space-between;
	    display: flex;
	    flex-direction: column;
	    padding-top: 10%;
	    padding-bottom: 10%;
	}
</style>