<template>
	<div class="d-flex justify-content-center">
		<input type="text" name="delivery-direction" id="origin">
	</div>
</template>
<script>
	export default{
		name: 'SearchDirection',
		data(){
			var argencords = { lat:-34.0, lng:-64.0};
			let map;
			let marker;
			let autocomplete;
			let input = document.getElementById("origin")
			const mapdiv = document.getElementById("map");
			return{
				argencords, map, marker, autocomplete, input, mapdiv
			}
		}
		
	}
</script>
