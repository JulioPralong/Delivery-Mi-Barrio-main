const functions = require("firebase-functions");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// SDK de Mercado Pago
const mercadopago = require("mercadopago");

//middleware

app.use(bodyParser.urlencoded({ extended: false }))

// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-4563026597118329-040922-764b53c20cffb8bc56b48dd4da4fe24b-1104346035",
});

//routes

app.post('/checkout', (req, res) => {

    // Crea el objeto que vamos a comprar
let preference = {
    items: [{
      title: 'Mi Barrio',
      unit_price: parseInt(req.body.totalPrice),
      quantity: 1,
    }],
    "back_urls": {
        "success": "https://delivery-6c0fd.web.app/finalizarPedido",
        "failure": "https://delivery-6c0fd.web.app/finalizarPedido",
    },
    "auto_return": "approved",
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      //redirigir a la pagina de mercado pago
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
})

app.get('/prueba123', (req, res) =>{
  return res.status(200).json('adasdasdasdasdasd')
})

exports.app = functions.https.onRequest(app);

