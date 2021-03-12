const express = require("express");
const router = express.Router();
const CartController = require("../controllers/carro");
const Order = require("../models/Order")
const Cart = require("../models/Cart")


//AGREGAR UN CARRO NI BIEN SE LOGGEA

//añadir un producto al carrito
router.post("/addproduct", CartController.addProduct)

//actualizar la cantidad de un producto
//router.post("/modifycart", CartController.updateProduct)

router.post("/modifycart", (req, res, next) => {
  const {productId, orderId} = req.body
  console.log(req.body)
  Cart.findOne(orderId)
  .then((order) => {
    console.log(order)
    res.send("probando update")
  })
})




/* router.post("/newcart", (req, res) => {
  console.log(req.body);
  const newCart = Cart.create(req.body).then((cart) =>
    res.status(201).json(cart)
  );
}); */





/*
cart pasa a status complete
se pasa el total 
se updetea el stock    
  */
module.exports = router;