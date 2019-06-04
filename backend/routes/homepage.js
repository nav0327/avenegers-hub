var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

router.get('/',function(req, res, next) {
    console.log("query part");
    product.categories.distinct(("parent_category"),function(err,docs){  
      if(err){  
          res.json(err);  
      }  
      else{  
          res.json(docs);  
      }  
  });  
      
      });
module.exports = router;