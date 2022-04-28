<template>
  <router-link :to="{name: 'Plato', params: { id: `${linkResto}--${name}`} }" style="color: #000; text-decoration: none;">
	<article class="article-product">
      <div class="product-photo">
        <img data-productimg="" :src="[img]" alt="">
      </div>
      <div class="product-container product-container-restaurant">
        <p data-productname="" class="p-product">{{ name }}</p>
        <div>
          <h6 class="price-item">$<span data-productprice="">{{ price }}</span></h6>
          <div class="moreLess-products-container circule">
            <button data-addcartbutton="" class="more padding-change "><span>+</span></button>
          </div>
        </div>
      </div>
     </article>
  </router-link>
</template>
<script>
	export default{
		name: 'ProductItem',
		props: ['img', 'name', 'price', 'resto'],
    data(){
      let linkResto = ""
      return{linkResto}
    },
    methods:{
      noSpaces: function(){
        this.linkResto = this.resto.split(' ').join('')
      }
    },
    mounted(){
      this.noSpaces()
    }
	}
</script>
