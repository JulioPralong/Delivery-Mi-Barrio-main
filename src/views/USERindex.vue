<template>
  <div>

    <header>
      <UserNav page="Mi barrio" login='true' clas="container-fluid"></UserNav>

    <article class="search">
        <input type="text" list="foodOptions" name="search-principal" placeholder="¿Que queres comer?" v-on:keyup.enter="searchFood" v-on:change="searchFood">
        <datalist id="foodOptions">
          <option>Empanada</option>
          <option>Hamburguesa</option>
          <option>Ensalada</option>
        </datalist>
    </article>
    </header>
    <div class="d-flex w-100 containerCategories">
    <CategoriesIndex/>

    <FoodSelectBody/>
    </div>


    <section class="recomendations">
      <article class="recomendations-header food-select-header">
        <h5>Recomendaciones</h5>  
      </article>
      <article class="recomendations-body ">
        <FoodItem v-for="(resto, index) in arrayFoods"
          :arrayFood=resto.food
          :restoSeller=resto.restaurant
        ></FoodItem>
      </article>
    </section>

    <Cart/>

  </div>
</template>

<script>  
  import UserNav from '@/components/USERnav.vue'
  import FoodItem from '@/components/foodItemSection.vue'
  import FoodSelectBody from '@/components/foodSelectBody.vue'
  import CategoriesIndex from '@/components/categoriesIndex.vue'
  import Cart from '@/components/cart.vue'
  import { mapState } from 'vuex';

export default {
  name: 'USERIndexDeskop',
  data(){
    let arrayFoods = []
    return{arrayFoods}
  },
  components: {
    UserNav, FoodItem, FoodSelectBody, CategoriesIndex, Cart
  },
  computed:{
    ...mapState(['user', 'isLogin'])
  },
  methods:{
    completeArray: function(){
      firebase.database().ref('restaurantes').on('value', (sampshot)=>{          
        let allRestaurantes = Object.values(sampshot.val())
        var numberNoMore40 = []
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < 10; i++) {
            var number = getRandomInt(1, 40)
            numberNoMore40.push(number)
        }
        let foodContainer = []
        numberNoMore40.forEach((e)=>{
          var foodNumber = getRandomInt(3, 6)
          var objectContainer = {
            food: allRestaurantes[e][foodNumber],
            restaurant: allRestaurantes[e][0].split(' ').join('')
          }  
          foodContainer.push(objectContainer)
        })
        this.arrayFoods = foodContainer
      })  

    },
    searchFood: function(){
      var input = document.querySelector("input[name='search-principal']")
      this.$router.push({ name: 'SearchFood', params: { id: `${input.value}` } })
    },
    consol: function(e, y){
      console.log(e)
      console.log(y)
    }
  },
  mounted(){
    this.completeArray();
  }
}
</script>
<style>
@media screen and (max-width: 845px){
  .containerCategories{
    flex-direction: column;
  } 
}
@media screen and (min-width: 850px){
  .containerCategories{
    flex-direction: row;
    max-width: 95%;
      margin: auto;
  } 
  .search input{
    width: 70%;
      text-align: center;
      border-radius: 30px;
      border: none;
      outline: 1px solid #bbb;
      background: #fff;
      padding: 1%;
      font-size: 1.3em;
  }
  .search{
    margin-top: 10%;
  }
  .food-select-header h5{
    font-size: 2em;
  }
  .recomendations-body::-webkit-scrollbar{
    display: block;
      width: 50px;
      color: #000;
  }
  .navbar-brand{
    padding-left: 0
  }
}

</style>