var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

// var fetchSubCategories_query = 'select category_id,sub_category from Categories where parent_category=?';

router.post('/', function (req, res, next) {
  console.log(req.body);

  // res.locals.connection.query(fetchSubCategories_query,[req.body.parent_category]
  product.categories.find({"parent_category":req.body.parent_category},{"category_id":1,"sub_category":1,"_id":0}
    , function (error, results, fields) {
    console.log(req.body.parent_category);
    console.log(results);
    if (error) throw error;
    res.send(JSON.stringify(results));
  });

});

module.exports = router;