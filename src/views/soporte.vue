<template>
	<div style="height: 100%">
	<UserNav page="Soporte" login='true' clas="header-navegator"></UserNav>	
	<section class="chat-body" >
      <article class="questions" id="questionsContainer" v-on:click="seeQuestion('hide')">
        <button v-if="questions.one" class="question-container" id="1" value="Si salgo de la página, mi pedido en progreso se pierde?" v-on:click="askQuestion('one')">
          <p class="question-p">Si salgo de la página, mi pedido en progreso se pierde?</p>
        </button>
        <button v-if="questions.two" class="question-container" id="2" value="Donde esta mi pedido?" v-on:click="askQuestion('two')">
          <p class="question-p">Donde esta mi pedido?</p>
        </button>
        <button v-if="questions.three" class="question-container" id="3" value="Puedo repetir un pedido anterior?" v-on:click="askQuestion('three')">
          <p class="question-p">Puedo repetir un pedido anterior?</p>
        </button>
        <button v-if="questions.four" class="question-container" id="4" value="Debo darle propina al repartidor?" v-on:click="askQuestion('four')">
          <p class="question-p">Debo darle propina al repartidor?</p>
        </button>
        <button v-if="questions.five" class="question-container" id="5" value="Quiero trabajar en mi barrio." v-on:click="askQuestion('five')">
          <p class="question-p">Quiero trabajar en mi barrio.</p>
        </button>
        <button v-if="questions.six" class="question-container" id="6" value="Necesito hablar con un ser humano." v-on:click="askQuestion('six')">
          <p class="question-p">Necesito hablar con un ser humano.</p>
        </button>
        <button v-if="questions.seven" class="question-container" id="7">
          <p class="question-p">Disculpe, no quedan mas preguntas para realizar</p>
        </button>
      </article>

      <article class="show-questions">
        <button class="show-text-container" v-on:click="seeQuestion('show')">
          <p class="show-text">Ver preguntas</p>
        </button>
      </article>

      <MessageComponent v-for="(mess, index) in messages"
      :messageColor= mess.color
      :MessageContent= mess.message
      />

    </section>
    <section class="chat-textarea">
      <article class="text-area">
        <input v-on:keyup.enter="sendWhriteMessage" class="input-chat"type="text" name="chat" placeholder="Escribe un mensaje aquí" autocomplete="off">
      </article>
      <article class="audio">
        <div v-on:click="sendWhriteMessage"></div>
      </article>
    </section>
  </section>
</div>
</template>
<script>
	import UserNav from '@/components/USERnav.vue'
	import MessageComponent from '@/components/message.vue'
	export default{
		name: 'Soporte',
		components:{
			UserNav, MessageComponent
		},
		data(){
			let questions = {
				one: true,
				two: true,
				three: true,
				four: true,
				five: true,
				six: true,
				seven: false
			}
			let messages = []
			return {questions, messages}
		},
		methods:{
			paddingTop: function(){
				var nav = document.querySelector("nav")
				var containerChat = document.querySelector(".chat-body")
				var buttonSeeQuestions = document.querySelector(".show-questions")
				var questions = document.querySelector("#questionsContainer")
				var marginTop = (parseInt(nav.scrollHeight) - 5);
				var top = (parseInt(nav.scrollHeight) + 15);
				buttonSeeQuestions.style.top = `${top}px`
				questions.style.top = `${top}px`
				containerChat.style.paddingTop = `${marginTop}px`
			},
			seeQuestion: function(condition){
				var questContainer = document.querySelector("#questionsContainer")
				if (condition === 'hide') {
					questContainer.style.zIndex = -1;
				}
				else{
					questContainer.style.zIndex = 1;
					if(questContainer.children.length === 0){
						this.questions.seven = true
					}
				}
			},
			scrollBack: function(){
				var chatbody = document.querySelector(".chat-body")
				var heightChat = chatbody.scrollHeight
				window.setTimeout(y=>{
					chatbody.scroll(0, heightChat)
				}, 50)
			},
			askQuestion: function(number){
				if (number === "one") {
					var question = document.getElementById("1")
					var messAsk = {
						message: "No, usted puede salir, entrar y navegar dentro de la página que si tiene un pedido que no esta finalizado se le mantendrá en el carrito hasta que lo finalice o lo borre",
						color: "white"
					}
					var messQuestion = {
						message: question.value,
						color: "green"
					}
					this.messages.push(messQuestion)
					this.scrollBack()
					this.questions.one = false
					window.setTimeout(e=>{
						this.messages.push(messAsk)
						this.scrollBack()
					}, 1500)
				}
				else if (number === "two") {
					var question = document.getElementById("2")
					var messAsk = {
						message: `El estado del pedido en tiempo real se puede encontrar en "Mis Pedidos" en la seccion "En proceso" <br><br> De todas formas, si necesita hablar con un representante puede hacerlo desde <a href="https://wa.me/5491126807861"  target="_blank">Este link</a>`,
						color: "white"
					}
					var messQuestion = {
						message: question.value,
						color: "green"
					}
					this.messages.push(messQuestion)
					this.questions.two = false
					this.scrollBack()
					window.setTimeout(e=>{
						this.messages.push(messAsk)
						this.scrollBack()
					}, 1500)
				}
				else if (number === "three") {
					var question = document.getElementById("3")
					var messAsk = {
						message: `Si, desde la sección de historial de pedidos puedes entrar al pedido y hacer click en "Volver a pedir" `,
						color: "white"
					}
					var messQuestion = {
						message: question.value,
						color: "green"
					}
					this.messages.push(messQuestion)
					this.questions.three = false
					this.scrollBack()
					window.setTimeout(e=>{
						this.messages.push(messAsk)
						this.scrollBack()
					}, 1500)
				}
				else if (number === "four") {
					var question = document.getElementById("4")
					var messAsk = {
						message: "La propina es voluntaria, pero desde el equipo de Mi Barrio agradeceríamos si así lo hicieras, ya que es un gran estimulo a nuestros socios repartidores",
						color: "white"
					}
					var messQuestion = {
						message: question.value,
						color: "green"
					}
					this.messages.push(messQuestion)
					this.questions.four = false
					this.scrollBack()
					window.setTimeout(e=>{
						this.messages.push(messAsk)
						this.scrollBack()
					}, 1500)
				}
				else if (number === "five") {
					var question = document.getElementById("5")
					var messAsk = {
						message: `Muchas gracias por queres formar parte de esta gran familia!<br><br>Puede inscribirse entrando a la pestaña "Trabaja con nosotros" desde el navegador`,
						color: "white"
					}
					var messQuestion = {
						message: question.value,
						color: "green"
					}
					this.messages.push(messQuestion)
					this.questions.five = false
					this.scrollBack()
					window.setTimeout(e=>{
						this.messages.push(messAsk)
						this.scrollBack()
					}, 1500)
				}
				else if (number === "six") {
					var question = document.getElementById("6")
					var messAsk = {
						message: `En ese caso puede contactarse con un representante desde WhatSapp usando <a href="https://wa.me/5491126807861"  target="_blank">Este link</a> o agendando manualmente el numero 11-2680-7861`,
						color: "white"
					}
					var messQuestion = {
						message: question.value,
						color: "green"
					}
					this.messages.push(messQuestion)
					this.questions.six = false
					this.scrollBack()
					window.setTimeout(e=>{
						this.messages.push(messAsk)
						this.scrollBack()
					}, 1500)
				}
			},
			sendWhriteMessage: function(){
				let inputChat = document.querySelector("input[name='chat']")
				let messageUser = {
					message: inputChat.value,
					color: "green"
				}
				let messageComputer = {
					message: `Lo siento! No estoy programado para responder eso,
	        intente con alguna de las preguntas predeterminadas. <br><br>
	        Si desea hablar con un representante puede hacerlo ingresando a <a href="https://wa.me/5491126807861"  target="_blank">Este link</a> o agendando manualmente el numero 11-2680-7861`,
					color: "white"
				}
				this.messages.push(messageUser)
				inputChat.value = ""
				this.scrollBack()
				window.setTimeout(e=>{
					this.messages.push(messageComputer)
					this.scrollBack()
				}, 1500)
			},
			firstMessage: function(){
				var pMessage = ""
				var today = new Date();
				var hour = today.getHours()
				var time = hour + ':' + today.getMinutes()

				if (hour >= 6 && hour < 12) {
					pMessage = "Hola buen dia! Elije una pregunta y con gusto la responderé"
				} else if(hour >= 12 && hour < 20){
					pMessage = "Hola buenas tardes! Elije una pregunta y con gusto la responderé"
				} else if((hour >= 20 && hour <= 23) || (hour >= 0 && hour < 6)){
					pMessage = "Hola buenas noches! Elije una pregunta y con gusto la responderé"
				}

				this.messages.push({message: pMessage, color: "white"})
			}
		},
		mounted(){
			this.paddingTop();
			this.firstMessage();
		}
	}
</script>
<style>
	@import '@/assets/styleChatbot.css';
	#app{
		height: 100vh;
	}
	.questions{
		height: 80%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: end;
	}
	.time, .time-white-message{
			font-size: .94rem;
		}
	@media screen and (min-width: 850px){

		.audio{
			flex: .5;	
		}
		.time span:nth-child(1){
			min-width: 40px;
		}
	}
</style>