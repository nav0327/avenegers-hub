var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

// var insertProduct_query = 'INSERT INTO ProductDetails SET ?';

router.post('/', function (req, res, next) {
  console.log(req.body.size);
  console.log(req.body.brand);
  var productDetails = {
    "product_name": req.body.product_name,
    "product_desc": req.body.product_desc,
    "price": req.body.price,
    "quantity": req.body.quantity,
    "gender": req.body.gender,
    "category_id": req.body.category_id,
    "size": req.body.size,
    "brand": req.body.brand
  }

  // res.locals.connection.query(insertProduct_query,[productDetails]
    product.productDetails.insertOne({productDetails},function (error, results, fields){
    console.log(results);
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
        res.send({
          "code": 200,
          "message": "Product successfully inserted "
        });
    }
  });

});

module.exports = router;