var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

// var updateCartDetailsQuery = 'UPDATE CART SET isPurchased = 1 where user_id = ?';
// var insertOrderDetails = 'INSERT INTO Orders SET ?';

router.post('/', function (req, res, next) {
    var userId = req.body.user_id;
    var productIds = '';
    
    var order = {
      "user_id": userId,
      "first_name": req.body.first_name,
      "email": req.body.email,
      "phoneNo":req.body.phoneNo,
      "Address":req.body.Address,
      "City":req.body.City,
      "State":req.body.State,
      "Zip":req.body.Zip,
      "productNames": [req.body.productIds].toString,
      "creditCardName":req.body.creditCardName,
      "creditCardNumber":req.body.creditCardNumber,
      "totalPrice":req.body.totalPrice
    }
    console.log("product"+req.body.productIds+typeof productIds)
    var productNames = req.body.productIds.toString();
    product.orders.insertMany({"user_id": userId,
    "first_name": req.body.first_name,
    "email": req.body.email,
    "phoneNo":req.body.phoneNo,
    "Address":req.body.Address,
    "City":req.body.City,
    "State":req.body.State,
    "Zip":req.body.Zip,
    "productNames": productNames,
    "creditCardName":req.body.creditCardName,
    "creditCardNumber":req.body.creditCardNumber,
    "totalPrice":req.body.totalPrice}, function (error, results) {
    console.log("Inside results" + results);
      if (error) {
        console.log(error);
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        console.log('The solution is: ', results); 
        product.cart.update({"user_id":userId},{$set:{"isPurchased":1}}, function (error, results, fields) {
          if (error) {
            console.log(error);
            res.send({
              "code": 400,
              "failed": "error ocurred"
            })
          }else{
            res.send({
              "code": 200,
              "success": "Order placed successfully"
            })
          }
        })
         
      }
    });
  
  });


module.exports = router;