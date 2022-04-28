<template>
<div class="article-product-container">
	<article class="article-product">
		<div class="product-photo product-photo-restaurant">
			<img data-productimg="" :src="[product.img]" alt="">
		</div>
		<div class="product-container product-container-restaurant">
			<div>
				<p data-productname="" class="p-product">{{ product.nombre }}</p>
				<button class="button-edit icon pencil" @click="editModal = true"></button>
			</div>
			<div>
				<h6 class="price-item">$<span data-productprice="">{{ product.costo }}</span></h6>
			</div>
		</div>
	</article>

	<div class="edit-modal" v-if="editModal">
		<div class="exit-modal">
			<h4>Editar</h4>
			<button class="icon exit" @click="quit"></button>
		</div>
		<div class="edit-container">
			<h5>Editar titulo</h5>
			<div class="tittle-edit-container">
				<input type="text" name="tittle" placeholder="Ingresar cambio">
			<button @click="editProduct('tittle')">Guardar</button>
			</div>
		</div>
		<div class="edit-container">
			<h5>Editar precio</h5>
			<div class="tittle-edit-container">
				<input type="number" name="price" placeholder="Ingresar cambio">
			<button @click="editProduct('price')">Guardar</button>
			</div>
		</div>
		<div class="edit-container">
			<h5>Editar imagen</h5>
			<div class="upload-image">
				<div class="charge-div" :style="{'width': percentajeWidth}"></div>
				<input type="file" @change="editImage"> 
				<h4>{{ percentaje }}</h4>
			</div>
		</div>
		<div class="edit-container">
			<button class="detele-product" @click="deteleProduct">Eliminar producto</button>
		</div>

	</div>
</div>
</template>
<script>
	export default{
		name: 'itemEdit',
		props: ['product', 'resto', 'refresh'],
		data(){
			let editModal = false
			let restoArray = []
			let percentaje = "Seleccionar Archivo"
			let percentajeWidth = "0%"
			let imgLink = ""
			return{ editModal, restoArray, percentaje, percentajeWidth, imgLink }
		},
		methods:{
			quit: function(){
				var cart = document.querySelector(".edit-modal")
				cart.style.animation = "closeCart .5s"
				window.setTimeout(e=>{
					cart.style.animation = ''
					this.editModal = false
				}, 400)
			},
			editProduct: function(e){
				this.restoArray = this.resto
				let tittle = document.querySelector("input[name='tittle'")
				let price = document.querySelector("input[name='price'")
				for (var i = this.restoArray.length - 1; i >= 0; i--) {
					if(this.restoArray[i].nombre === this.product.nombre && this.restoArray[i].costo === this.product.costo){
						if (e === 'tittle') {
							this.restoArray[i].nombre = tittle.value
						} else if(e === 'price'){
							this.restoArray[i].costo = parseInt(price.value)
						} else if(e === 'image'){
							this.restoArray[i].img = this.imgLink
						}
					}
				}
				console.log(this.restoArray)
				firebase.database().ref(`restaurantes/${this.restoArray[0]}`).set(this.restoArray)
				this.refresh()
				this.editModal = false
			},
			deteleProduct: function(){
				this.restoArray = this.resto
				let withOutProductArray = []
				withOutProductArray = this.restoArray.filter((item) => item.nombre != this.product.nombre)
				firebase.database().ref(`restaurantes/${this.restoArray[0]}`).set(withOutProductArray)
				this.refresh()
				this.editModal = false
			},
			editImage: function(){
				var input = document.querySelector("input[type='file']")
				var id = (new Date).getTime()
				let file = input.files[0]
				try{
					let storageRef = firebase.storage().ref(`images/${id}`)
					let task = storageRef.put(file)
					task.on('state_changed', (snapshot)=>{
						this.percentaje = `${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`;
						this.percentajeWidth = `${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`
						})
					task.on('load', e=>{
						storageRef.getDownloadURL().then((url)=>{
						this.imgLink = url
						this.editProduct('image')
						this.percentaje = "Seleccionar archivo"
						this.percentajeWidth = "0%"
					})
					})

				} catch(e){
					console.log(e)
				}
			}
		}
	}
</script>
<style scoped>
	.product-container button{
			background-color: transparent;
		    border: none;
		    opacity: .8;
		    outline: 1px solid #bbb;
	}
	.tittle-edit-container{
		display: flex;
		justify-content: space-around;
	    height: 100%;
	    align-items: center;
	}
	.edit-container h5{
		margin: 0;
	    text-align: start;
	    width: 100%;
	    padding-left: 5%;
	    font-size: 1.5em;
	}
	.upload-image{
		position: relative;
		width: 80%;
	    height: 100%;
	    margin-top: 5%;
	    border: 5px dashed grey;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    flex-direction: column;
	}
	.upload-image h4{
		font-size: 1.5em;
    	color: #555;
	}
	.upload-image input{
		top: 0;
	    position: absolute;
	    height: 100%;
	    width: 100%;
	    opacity: 0;
	}
	.detele-product{
		background: #e90000;
	    font-size: 1.5em;
	    color: #fff;
	    outline: 1px solid #000;
	    border-radius: 30px;
	    box-shadow: 0px 3px 5px #999696;
	}
	.charge-div{
		position: absolute;
	    height: 100%;
	    background: #a3e1a366;
	    display: flex;
	    left: 0;
	}
</style>