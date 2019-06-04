var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

var fetchCategories_query = 'select distinct parent_category from Categories';


router.get('/', function (req, res, next) {
  console.log(req.body);

  product.categories.distinct(("parent_category"), function (error, results, fields) {
    console.log(results);
    if (error) throw error;
    res.json(results);  
  });

});

module.exports = router;