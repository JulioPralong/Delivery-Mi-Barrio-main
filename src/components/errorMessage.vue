<template>
	<div class="error-container">
		<button class="icon exit exit-modal-add" style="padding: 5%;" @click="closeButton"></button>
		<h3>{{message}}</h3>
	</div>
</template>
<script>
	export default{
		name: 'ErrorMessage',
		props: ['message', 'close'],
		methods:{
			hide: function(){
				let divContainer = document.querySelector(".error-container")
				window.setTimeout(e=>{
					divContainer.style.animation = "hide .5s"
				}, 3000)
				window.setTimeout(e=>{
					divContainer.style.animation = ""
					this.close()
				}, 3400)
			},
			closeButton: function(){
				let divContainer = document.querySelector(".error-container")
				divContainer.style.animation = ""
				this.close()
			}
		},
		mounted(){
			this.hide()
		}
	}
</script>