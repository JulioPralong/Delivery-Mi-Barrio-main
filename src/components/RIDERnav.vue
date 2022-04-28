<template>
	<nav class="navbar navbar-light fixed-top" style="">
	  <div class="container-fluid">
	    <h2 class="navbar-brand">{{ tittle }}</h2>
	    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
	      <span class="navbar-toggler-icon"></span>
	    </button>
	    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" aria-hidden="true" style="visibility: hidden;">
	      <div class="offcanvas-header">
	        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Mi Barrio</h5>
	        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	      </div>
	      <div class="offcanvas-body">
	      	<div class="nav-container-partner" >
		        <ul class="navbar-nav">
		          <li class="nav-item" @click="goTo('disponibleAsks')">
		           <div class="icon home"></div><a class="nav-link" aria-current="page">Pedidos disponibles</a>
		          </li>
		          <li class="nav-item" @click="goTo('myAsks')">
		            <div class="icon ask"></div><a class="nav-link">Mis pedidos</a>
		          </li>
		          <li class="nav-item padding-correction" @click="goTo('history')">
		            <div class="icon history"></div><a class="nav-link">Historial</a>
		          </li>
		          <li class="nav-item padding-correction" @click="goTo('profit')">
		            <div class="icon money"></div><a class="nav-link">Ganancias</a>
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
	  </div>
	</nav>
</template>
<script>
	export default{
		name: 'RiderNav',
		props:['tittle'],
		methods:{
			goTo: function(condition){
				if (condition === "disponibleAsks") {
					this.$router.push({name: 'RiderIndex'})
				} else if (condition === "myAsks") {
					this.$router.push({name: 'RiderMyAsks'})
				} else if (condition === "history") {
					this.$router.push({name: 'RiderHistory'})
				} else if (condition === "profit") {
					this.$router.push({name: 'RiderProfit'})
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
		        this.$router.push('/RiderLogin')
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
	.nav-container-partner{
		flex-grow: 1;
	    place-content: space-between;
	    display: flex;
	    flex-direction: column;
	    padding-top: 10%;
	    padding-bottom: 10%;
	}
	.nav-container-partner{
		height: 100%
	}
</style>