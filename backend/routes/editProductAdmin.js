var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

// var deleteProduct_query = 'DELETE FROM ProductDetails where product_id = ?';

router.post('/', function (req, res, next) {
  console.log(req.body);
  var pid = req.body.product_id;
  
  // res.locals.connection.query(deleteProduct_query,[pid]
    product.productdetails.deleteMany({"product_id":pid},function (error, results, fields){
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
          "message": "Product successfully deleted "
        });
    }
  });

});

module.exports = router;