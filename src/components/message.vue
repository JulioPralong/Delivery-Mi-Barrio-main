<template>
	<div class="d-flex" :style="{'place-content': placeContent}">
		<article class="white-message first-message" id="first-message" v-if="messageColor === 'white'">
	        <p class="message-text" v-html="MessageContent"></p>	
			<div class="time-white-message">
				<span class="hour">{{ time }}</span>
			</div>
     	</article>
     	<article class="green-message first-message" v-if="messageColor === 'green'">
			<p class="message-text-green">{{ MessageContent }}</p>
			<div>
			<div class="time" style="padding-right: 6px;">
				<span class="hour">{{ time }}</span>
				<span class="see-tick _3l4_3" data-testid="msg-dblcheck" aria-label=" Leído " data-icon="msg-dblcheck"><svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="m15.01 3.316-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span></div>
			</div>
		</article>
	</div>
</template>
<script>
	export default{
		name: 'MessageComponent',
		props: ['messageColor', 'MessageContent'],
		data(){
			var today = new Date();
			var hour = today.getHours()
			var time = hour + ':' + today.getMinutes()

			var placeContent = ""

				return { time, placeContent }
		},
		methods:{
			placeContentCondition: function(){
				if (this.messageColor === 'white' || this.messageColor === 'wantHumanOption' || this.messageColor === 'wantHumanWrite') {
					this.placeContent = "flex-start"
				} else if (this.messageColor === 'green') {
					this.placeContent = "end"
				}
			}
		},
		mounted(){
			this.placeContentCondition()
		}
	}
</script>
<style scoped>
	.green-message{
		align-items: end;
	}
	.message-text-green{
		overflow-wrap: anywhere;
	}
	.time-white-message{
		margin-top: 0;
	}
</style>