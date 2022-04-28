<template>
	<section class="food-select">
	    <div class="food-select-header">
	      <h5>Comidas</h5>
	    </div>
		<div class="food-select-body">
	      <router-link to="/section/Carnes" style="text-decoration: none; color: #000;">
	        <button>
	        <div></div>
	        <p>Carnes</p>
	      </button>
	      </router-link>
	      </router-link>
	      <router-link to="/section/Vegana" style="text-decoration: none; color: #000;">
	      <button>
	        <div></div>
	        <p>Vegana</p>
	      </button>
	      </router-link>
	      <router-link to="/section/Hamburguesas" style="text-decoration: none; color: #000;">
	      <button>
	        <div></div>
	        <p>Hamburguesas</p>
	      </button>
	      </router-link>
	      <router-link to="/section/Helados" style="text-decoration: none; color: #000;">
	      <button>
	        <div></div>
	        <p>Helados</p>
	      </button>
	      </router-link>
	      <router-link to="/section/Milanesas" style="text-decoration: none; color: #000;">
	      <button>
	        <div></div>
	        <p>Milanesas</p>
	      </button>
	      </router-link>
	      <router-link to="/section/Pizzas" style="text-decoration: none; color: #000;">
	      <button>
	        <div></div>
	        <p>Pizzas</p>
	      </button>
	      </router-link>
	      <router-link to="/section/Sushi" style="text-decoration: none; color: #000;">
	      <button>
	        <div></div>
	        <p>Sushi</p>
	      </button>  
	      </router-link> 
	    </div>
	</section>
</template>
<script>
	export default{
		name: 'FoodSelectBody'
	}
</script>
<style scoped>
	@media screen and (min-width: 850px){
    .food-select{
      display: flex;
      flex-direction: column;
      width: 50%;
    }
    .food-select-header{
      justify-content: center;
    }
    .food-select-header h5{
      font-size: 2em;
    }
    .food-select-body{
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: auto;
      margin-top: 2%;
      flex-wrap: wrap;
      justify-content: center;
    }
    .food-select-body button p{
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
      font-size: 1.2em;
      word-break: keep-all;
    }
    .food-select-header h5{
    	padding: 0
    }
  }
</style>