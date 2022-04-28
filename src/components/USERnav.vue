<template>
	<nav class="navbar navbar-light fixed-top">

    <div :class="[clas]">

      <div class="w-100 d-flex" v-if="clas === 'container-fluid'">
      <h2 class="navbar-brand">{{ page }}</h2>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>


      <div class="w-100 d-flex" v-else-if="clas === 'header-navegator'">
        <button class="back-icon" v-on:click="backPage"></button>
        <h2 class="navbar-brand title-restaurant">{{page}}</h2>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Mi Barrio</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>


        <div class="offcanvas-body" v-if="islogued">
          <div class="user-nav">
            <div v-if="userObject.photoURL != null" class="nav-photo-logued" :style="{'background-image': `url(${userObject.photoURL})`}"></div>
            <div v-if="userObject.photoURL === null" class="nav-photo"></div>
            <h2>{{ userObject.displayName }}</h2>
          </div>
          <div class="nav-sections-container">
            <ul class="navbar-nav">
              <li class="nav-item">
               <div class="icon home"></div><router-link to="/" class="nav-link">Inicio</router-link>
              </li>
              <li class="nav-item">
                <div class="icon ask"></div><router-link to="/mispedidos" class="nav-link" >Mis pedidos</router-link>
              </li>
              <li class="nav-item">
                <div class="icon support"></div><router-link to="/soporte" class="nav-link">Soporte</router-link>
              </li>
              <li class="nav-item">
                <div class="icon userRed"></div><router-link to="/registroNegocio" class="nav-link">Trabaja con nosotros</router-link>
              </li>
              <li class="nav-item" v-if="isRider">
                <div class="icon bike"></div><router-link to="/riderIndex" class="nav-link">Inicio repartidor</router-link>
              </li>
              <li class="nav-item" v-if="isRestaurante">
                <div class="icon market"></div><router-link to="/partnerIndex" class="nav-link">Inicio aliado</router-link>
              </li>
            </ul>
            <div class="logOutContainer">
              <button @click="logOut"><span>Cerrar Sesión</span></button>
            </div>
          </div>
        </div>


        <div class="offcanvas-body" v-else>
          <div class="user-nav">
            <div class="nav-photo"></div>
          </div>
          <ul class="navbar-nav">
            <li class="nav-item">
             <div class="icon home"></div><router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item login">
              <div class="icon user"></div><router-link to="/login" class="nav-link">Ingresar-Registrarse</router-link>
            </li>
          </ul>
      </div>
      </div>
    </div>
  </nav>
</template>

<script>  
  import { mapMutations } from 'vuex';
export default {
  name: 'UserNav',
  props: ['page', 'login', 'back', 'clas'],
  data(){
    let isRider = false;
    let isRestaurante = false
    return{
      islogued: "", userObject: {}, isRider, isRestaurante
    }
  },
  methods:{
    ...mapMutations(['setUser', 'setIsLogin']),
    backPage: function(){
      window.history.back()
    },
    overflowSolve: function(){
      var label = document.querySelector("#offcanvasNavbar")
      var body = document.querySelector("body")
      if (label.style.visibility != "visible"){
        body.style.overflow = "auto"
      }
    },
    dataUser: function(){
      firebase.auth().onAuthStateChanged(firebaseUser=>{
        if (firebaseUser) {
          this.userObject = firebaseUser;
          this.islogued = true;
          this.setUser(firebaseUser);
          this.setIsLogin(true)
        } else{
            this.islogued = false;
            this.setIsLogin(false)
        }
      });
    },
    logOut: function(){
      firebase.auth().signOut().then(() => {
        this.islogued = false;
        this.setIsLogin(false)
        this.setUser({});
        this.$router.push('/')
      }).catch((error) => {
       console.log(`Ocurrio un error, el error es ${error}`)
      });
    },
    isLoginPartners: function(){
          firebase.auth().onAuthStateChanged(firebaseUser=>{
          if (firebaseUser) {
            firebase.database().ref(`USERSriders`).on('value', (sampshot)=>{
              var restoArray = sampshot.val()
              var isLoged = false;
              restoArray.forEach((e)=>{
                if (e.mail.toLowerCase() === firebaseUser.email) {
                  this.isRider = true;
                }
              })
            })
            firebase.database().ref(`USERSrestaurantes`).on('value', (sampshot)=>{
              var restoArray = sampshot.val()
              restoArray.forEach((e)=>{
                if (e.mail.toLowerCase() === firebaseUser.email) {
                  this.isRestaurante = true;
                }
              })
            })      
          }
        });
    }
  },
  mounted(){
    this.dataUser()
    this.overflowSolve()
    this.isLoginPartners()
  }
}
</script>
<style scoped>
  nav{
    background-color: rgba(255, 255, 255, 0.933);
  }
  .nav-sections-container{
    display: flex;
    flex-direction: column;
    place-content: space-between;
    flex-grow: 1;
    padding-bottom: 5%;
  }
  .logOutContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;
  }
  .logOutContainer button{
    border: none;
    border-radius: 50px;
    outline: 2px solid #aaa;
    background: #ffd5d5;
    box-shadow: 1px 3px 4px;
    padding: 4%;
    font-size: 1.4em;
    font-weight: 600;
  }
  .offcanvas-body{
    display: flex;
    flex-direction: column;
  }
  .nav-photo-logued{
    width: 150px;
    height: 150px;
    margin: auto;
    background: #dadada;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    outline: 1px solid #888;
  }
  nav{
    background-color: #ffffffee;
  }
  @media screen and (min-width: 850px){

  .title-restaurant{
    padding-right: 1.3em;
  }

  }

</style>