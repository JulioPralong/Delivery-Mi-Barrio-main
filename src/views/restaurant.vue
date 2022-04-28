<template>
<div>
    <header>
      <UserNav page="Restaurante" login='true' clas="header-navegator"></UserNav>
    </header>
    <section class="header-restaurant">
      <div class="photo-restaurante">
        <img id="restaurantBanner" :src="[RestoImg]" alt="">
      </div>
      <h3 id="restaurantName" class="title-header-restaurant">{{ RestoName }}</h3>
    </section>

  <section class="body-restaurant">
    <section id="restaurantFood">
      <h2 class="h2BodyRestaurant">Comidas</h2>
      <ProductItem v-for="(foodItem, index) in food"
      :img= foodItem.img
      :price= foodItem.costo
      :name= foodItem.nombre
      :resto= RestoName
      ></ProductItem>
    </section>
    <section id="restaurantDrinks" class="aqua-sodas" v-if="drinks != ''">
      <h2>Bebidas</h2>
      <ProductItem v-for="(drink, index) in drinks"
      :img= drink.img
      :price= drink.costo
      :name= drink.nombre 
      :resto= restoLink
      ></ProductItem>
    </section>    
</section>    
<Cart/>
</div>
</template>

<script>  
  import UserNav from '../components/USERnav.vue'
  import ProductItem from '../components/productItem.vue'
  import Cart from '@/components/cart.vue'
export default {
  name: 'USERindex',
  components: {
    UserNav, ProductItem, Cart
  },
  data(){
    let food = []
    let drinks = []
    let RestoName = ""
    let RestoImg = ""
    let RestoLink = ""
    return {food, drinks, RestoName, RestoImg, RestoLink}
  },
  methods:{
    completePage: function(){
      firebase.database().ref(`restaurantes/${this.$route.params.id.split(' ').join('')}`).on('value', (sampshot)=>{                    
        let restaurant = Object.values(sampshot.val())
        this.RestoName = restaurant[0]
        this.RestoImg = restaurant[1].banner
        restaurant.forEach((e)=>{
          if (e.categoria != "Bebidas" && e.categoria != null) {
            this.food.push(e)
          } else if (e.categoria === "Bebidas") {
            this.drinks.push(e)
          }
        })
        this.restoLink = this.$route.params.id.split(' ').join('')
    })
    }
  },
  mounted(){
    this.completePage()
  }
}
</script>
<style>
  .h2BodyRestaurant{
    font-size: 1.7em;
    padding-left: 5%;
    padding-bottom: 3%;
    padding-top: 2%;
    border-top: 1px solid #ccc;
  }
  @media screen and (min-width: 850px){
    .body-restaurant{
      display: flex;
    }
    .h2BodyRestaurant, .aqua-sodas h2{
      font-size: 2em;
      padding-left: 5%;
      padding-bottom: 3%;
      padding-top: 2%;
      border-top: 1px solid #ccc;
      text-align: center;
    }
    .header-restaurant{
      width: 100%;
      height: 180px;
      margin-top: 10%;
      align-items: center;
      display: flex;
      padding-left: 4%;
      border-top: 1px solid #aaa;
      border-bottom: none;
      background: linear-gradient(270deg, #ff5757, transparent);
    }
    #restaurantFood, #restaurantDrinks{
      width: 50%;
      margin: auto;
      margin-top: 0;
    }
    #restaurantName{
      flex-grow: 1;
      text-align: center;
      font-size: 3.5em;
    }
    .photo-restaurante{
      width: 150px;
      height: 150px;
      background: #f4d4d4;
      border-radius: 50%;
      outline: 1px solid #999;
      margin-right: 5%;
    }
    .product-container p{
      font-size: 1.3em;
    }
  }

</style>
