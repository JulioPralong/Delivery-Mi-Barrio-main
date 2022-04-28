<template>
<div class="modal-more-products" v-if="show">
	<h2 class="tittle-modal-more" @click="consol">Agregar producto</h2>
	<div class="more-products-inputs">
		<div class="form-floating mb-3 mt-3 input-more">
		  <input name="nameProduct" type="text" class="form-control" id="floatingInput" placeholder="Milanesa con papas">
		  <label for="floatingInput">Nombre producto</label>
		</div>
		<div class="form-floating input-more mb-4">
		   <input name="priceProduct" type="number" class="form-control" id="floatingPassword" placeholder="Price">
		   <label for="floatingPassword">Precio</label>
		</div>
		<div class="category-div">
			<h3>Seleccionar categoria</h3>
			<select>
				<option v-for="(item, index) in categories" :key="index" 
				:value="[item]">{{ item }}</option>
			</select>
		</div>
		<h3>Seleccionar imagen</h3>
		<div class="input-group mb-4 upload-container">
			<div class="charge-div" :style="{'width': percentajeWidth}"></div>
			<h5 v-if="percentaje != '100%'">{{percentaje}}</h5>
			<h5 v-if="percentaje === '100%' && !readyImg">Aguarde...</h5>
			<h5 v-if="readyImg">Imagen cargada</h5>
		  	<input type="file" @change="uploadImage">
		</div>
	</div>
	<div class="div-add-products d-flex mb-4">
		<button @click="addNewProduct">Agregar producto</button>
	</div>
	<ErrorMessage v-if="showError"
	message="Complete los campos"
	:close= quitError
	/>
	<button class="icon exit exit-modal-add" @click="hide"></button>
</div>
</template>
<script>
	import ErrorMessage from '@/components/errorMessage.vue'
	export default{
		name: 'MoreProducts',
		props:['show', 'hide', 'resto', 'refresh'],
		components: {
			ErrorMessage
		},
		data(){
			let imgLink = ""
			let percentaje = "Seleccionar Archivo"
			let restoArray = []
			let percentajeWidth = '0%'
			let readyImg = false
			let categories = ["Hamburguesas", "Bebidas", "Helados", "Vegana", "Pizzas", "Milanesas", "Carnes", "Sushi", "Kiosco", "Mascotas"]
			let showError = false;
			return{ imgLink, percentaje, restoArray, percentajeWidth, categories, showError, readyImg }
		},
		methods:{
			uploadImage: async function(){
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
						this.readyImg = true
						console.log(url)
						this.imgLink = url
					})
					})

				} catch(e){
					console.log(e)
				}
			},
			consol: function(){
				console.log(this.imgLink)
			},
			addNewProduct: function(){
				let price = document.querySelector("input[name='priceProduct']")
				let name = document.querySelector("input[name='nameProduct']")
				let category = document.querySelector("select")
				if (price.value != '' && name.value != '' && this.imgLink != "") {
					this.restoArray = this.resto
					this.restoArray.push({
						nombre: name.value,
						costo: parseInt(price.value),
						img: this.imgLink,
						categoria: category.value
					})
					console.log(this.restoArray)
					firebase.database().ref(`restaurantes/${this.restoArray[0]}`).set(this.restoArray)
					this.refresh()
					this.hide()
				} else{ this.showError = true }
			},
			quitError: function(){
				this.showError = false
			}
		}
	}
</script>
<style scoped>
	.upload-container{
		display: flex;
	    justify-content: center;
	    position: relative;
	    height: 11vh;
	    align-items: center;
	    width: 80%;
	    margin: auto;
	    border: 5px dashed grey;
	}
	.upload-container h5{
		margin: 0;
	    font-size: 1.5em;
	    color: #555;
	}
	.upload-container input{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    opacity: 0;
	    cursor: pointer;
	}
	.charge-div{
		position: absolute;
	    height: 100%;
	    background: #a3e1a366;
	    display: flex;
	    left: 0;
	}
	.category-div h3{
		margin-bottom: .5em;
	}
	.category-div select{
		display: flex;
	    width: 60%;
	    text-align: center;
	    font-size: 1.5em;
	    margin: auto;
	    margin-bottom: 1em;
	    border: none;
	    background: #dbdbdb;
	    outline: 1px solid #555;
	    padding-bottom: 1%;
	    border-radius: 10px;
	    font-weight: 500;
	}
</style>