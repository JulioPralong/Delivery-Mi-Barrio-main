<template>
	<section class="categories">
    <article class="top-options">
      <router-link :to="{name: 'Section', params: { id: 'Restaurantes'} }" style="text-decoration: none; display: flex; flex: 1; color: #000;">
        <div><h6>Restaurantes</h6></div>
      </router-link>
      <router-link to="/section/Mercado" style="text-decoration: none; display: flex; flex: 1; color: #000;">
      <div><h6>Mercado</h6></div>
      </router-link>
      <router-link to="/section/Cafe" style="text-decoration: none; display: flex; flex: 1; color: #000;">
      <div><h6>Cafe & Deli</h6></div>
      </router-link>
    </article>
    <article class="down-options">
      <router-link to="/section/Helados" style="text-decoration: none; color: #000;">
      <div><h6>Helados</h6></div>
      </router-link>
      <router-link to="/section/Kiosco" style="text-decoration: none; color: #000;">
      <div><h6>Kiosco</h6></div>
      </router-link>
      <router-link to="/section/Bebidas" style="text-decoration: none; color: #000;">
      <div><h6>Bebidas</h6></div>
      </router-link>
      <router-link to="/section/Mascotas" style="text-decoration: none; color: #000;">
      <div><h6>Mascotas</h6></div>    
      </router-link>
    </article>
  </section>
</template>
<script>
	export default{
		name: 'CategoriesIndex'
	}
</script>

<style scoped>
@media screen and (min-width: 850px){
  .categories{
    width: 50%;
    margin: 0;
  }  
  .down-options{
    height: 40%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: hidden;
    margin: 0;
  }
  .down-options a{
    flex: 1;
  }
  .down-options div{
    min-width: 0;

  }
}
</style>