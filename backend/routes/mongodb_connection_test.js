// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/e-commerce');
// mongoose.connect(url, function(error){
//     if(error) console.log(error);
// });
var express = require('express');
var router = express.Router();
var MyModel = mongoose.model('Test', new Schema
({
      product_name: { type: String, Required:  'Product name cannot be left blank.' },
      price:        { type: Number, Required:  'Product price cannot be left blank.'},
      category_id : { type: Number, Required:  'Product category cannot be left blank'}
    
    })
);

router.get('/',function(req, res, next) {
    MyModel.find({} , function(err, product) {
            if (err){
            res.send(err);
            }
            res.json(product);
        })
});
module.exports = router;
//,function(error, result){console.log(result)}